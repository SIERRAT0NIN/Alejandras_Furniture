from flask_sqlalchemy import SQLAlchemy  # cSpell:ignore SQLAlchemy
from sqlalchemy_serializer import SerializerMixin
from sqlalchemy.sql import func
from app.app_config import db
from app.schemas import UserSchema, CartSchema, ProductSchema


class User(db.Model, SerializerMixin, UserSchema):
    __tablename__ = "users"
    __table_args__ = {"extend_existing": True}

    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(80), unique=True, nullable=False)
    email = db.Column(db.String(80), unique=True, nullable=False)
    password_hash = db.Column(db.String(128))

    related_cart = db.relationship("Cart", backref="user", lazy=True)

    def __repr__(self):
        return f"<User {self.username}>"


class Cart(db.Model, SerializerMixin, CartSchema):
    __tablename__ = "cart"
    __table_args__ = {"extend_existing": True}

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey("users.id"))
    product_id = db.Column(db.Integer, db.ForeignKey("products.id"))
    quantity = db.Column(db.Integer, default=1)
    created_at = db.Column(db.DateTime(timezone=True), server_default=func.now())
    updated_at = db.Column(db.DateTime(timezone=True), onupdate=func.now())

    related_user = db.relationship("User", backref="cart", lazy=True)
    related_product = db.relationship("Product", backref="cart", lazy=True)

    def __repr__(self):
        return f"<Cart {self.id}>"


class Product(db.Model, SerializerMixin, ProductSchema):
    __tablename__ = "products"
    __table_args__ = {"extend_existing": True}

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(80), unique=True, nullable=False)
    price = db.Column(db.Float, nullable=False)
    description = db.Column(db.Text, nullable=False)
    image = db.Column(db.String(80), nullable=False)
    stripe_id = db.Column(db.String(80), nullable=False)
    stripe_price_id = db.Column(db.String(80), nullable=False)
    created_at = db.Column(db.DateTime(timezone=True), server_default=func.now())
    updated_at = db.Column(db.DateTime(timezone=True), onupdate=func.now())

    related_cart = db.relationship("Cart", backref="product", lazy=True)

    def __init__(self, *args, **kwargs):
        super(Product, self).__init__(*args, **kwargs)
        self.create_stripe_product_and_price()

    def create_stripe_product_and_price(self):
        stripe.api_key = os.environ.get("STRIPE_SECRET_KEY")

        # Check if Stripe IDs already exist
        if not self.stripe_product_id or not self.stripe_price_id:
            # Create product on Stripe
            stripe_product = stripe.Product.create(
                name=self.title,
                description=self.description,
                type="service",
            )

            # Create price on Stripe
            stripe_price = stripe.Price.create(
                product=stripe_product.id,
                unit_amount=int(self.price * 100),  # Convert to cents
                currency="usd",
            )

            # Update artwork record with Stripe IDs
            self.stripe_product_id = stripe_product.id
            self.stripe_price_id = stripe_price.id

            db.session.commit()

    def __repr__(self):
        return f"<Product {self.name}>"
