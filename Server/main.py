from flask import Flask, request, make_response
from flask_restful import Api, Resource
from werkzeug.security import generate_password_hash, check_password_hash
from sqlalchemy import or_
from datetime import datetime, timedelta
from app.models import User
from app.app_config import db
from flask_cors import CORS
from flask_migrate import Migrate
from flask_jwt_extended import (
    JWTManager,
    create_access_token,
    create_refresh_token,
    set_access_cookies,
    set_refresh_cookies,
    jwt_required,
    get_jwt_identity,
    unset_access_cookies,
    unset_refresh_cookies,
)
from dotenv import load_dotenv
import os
from app.schemas import UserSchema, CartSchema, ProductSchema
from marshmallow import ValidationError
from app.__init__ import create_app

app = create_app()

load_dotenv()


# app = Flask(__name__)
# Configure your app
jwt_secret = os.getenv("JWT_SECRET_KEY")
stripe_secret = os.getenv("STRIPE_SECRET_KEY")
app.config["JWT_SECRET_KEY"] = jwt_secret
app.config["JWT_TOKEN_LOCATION"] = ["cookies", "headers"]
app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False
cors = CORS(app)  # Add cors with new routes
migrate = Migrate(app, db)
api = Api(app)
jwt = JWTManager(app)


class SignUp(Resource):
    def post(self):
        user_schema = UserSchema()

        data = request.get_json()

        username = data.get("username")
        email = data.get("email")
        password = data.get("password")

        if not all([username, email, password]):
            return {"message": "Missing data"}, 400

        existing_user = User.query.filter(
            (User.username == username) | (User.email == email)
        ).first()
        if existing_user:
            return {"message": "Username or email already taken"}, 400

        hashed_password = generate_password_hash(password)
        new_user = User(username=username, email=email, password_hash=hashed_password)

        try:
            data = user_schema.load(request.get_json())

            db.session.add(new_user)
            db.session.commit()

            access_token = create_access_token(identity=email)

            refresh_token = create_refresh_token(identity=email)

            response = make_response(
                new_user.to_dict(only=("id", "username", "email")), 200
            )

            set_access_cookies(response, access_token)
            set_refresh_cookies(response, refresh_token)

            return response
        except ValidationError as err:
            db.session.rollback()
            return {"errors": err.messages}, 400


api.add_resource(SignUp, "/signup")


class Login(Resource):
    def post(self):
        data = request.get_json()
        email = data.get("email")
        password = data.get("password")

        if not email or not password:
            return {"message": "Email and password are required"}, 400

        user = User.query.filter_by(email=email).first()
        print(user)
        if user and check_password_hash(user.password_hash, password):
            access_token = create_access_token(identity=email)

            refresh_token = create_refresh_token(identity=email)

            response = make_response(
                user.to_dict(only=("id", "username", "email")), 200
            )
            set_access_cookies(response, access_token)
            set_refresh_cookies(response, refresh_token)

            return response
        else:
            return {"message": "Invalid username or password"}, 401


api.add_resource(Login, "/login")


class RefreshToken(Resource):
    @jwt_required(refresh=True)
    def get(self):
        try:
            email = get_jwt_identity()

            new_access_token = create_access_token(identity=email)

            user = User.query.filter_by(email=email).first()
            u = user.to_dict(only=("id", "username", "email"))
            response = make_response(u, 200)
            set_access_cookies(response, new_access_token)

            return response
        except Exception as e:
            return {"error": e.args}, 500


api.add_resource(RefreshToken, "/refresh")


class MyUser(Resource):
    @jwt_required()
    def get(self):
        if user := User.query.filter_by(email=get_jwt_identity()).first():
            u = user.to_dict(only=("id", "username", "email"))
            return u, 200
        else:
            return {"error": "User not found"}, 404


api.add_resource(MyUser, "/user")


class Logout(Resource):
    def delete(self):
        response = make_response({}, 204)
        unset_access_cookies(response)
        unset_refresh_cookies(response)
        return response


api.add_resource(Logout, "/user/logout")


if __name__ == "__main__":
    app.run(debug=True, port=3000)
