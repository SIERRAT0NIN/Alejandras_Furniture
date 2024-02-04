from flask import Flask, request
from flask_restful import Api, Resource
from werkzeug.security import generate_password_hash, check_password_hash
import sqlalchemy
from .models import User
from flask_cors import CORS
from flask_migrate import Migrate
from flask_jwt_extended import JWTManager, create_access_token
from dotenv import load_dotenv
from .app_config import db
import os

load_dotenv()


def create_app():

    app = Flask(__name__)

    jwt_secret = os.getenv("JWT_SECRET")
    app.config["SQLALCHEMY_DATABASE_URI"] = "sqlite:///Alex-store.db"
    app.config["JWT_SECRET_KEY"] = jwt_secret
    jwt = JWTManager(app)

    db.init_app(app)
    # Migrate(app, db)
    migrate = Migrate(app, db)

    return app


if __name__ == "__main__":
    app = create_app()
    app.run(debug=True)
