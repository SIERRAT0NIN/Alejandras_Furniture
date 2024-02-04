from marshmallow import Schema, fields, validate, ValidationError


class UserSchema(Schema):
    username = fields.Str(required=True, validate=validate.Length(min=6))
    email = fields.Email(required=True)
    password = fields.Str(required=True, validate=[validate.Length(min=6)])


class CartSchema(Schema):
    user_id = fields.Int(required=True)
    product_id = fields.Int(required=True)
    quantity = fields.Int(required=True)


class ProductSchema(Schema):
    name = fields.Str(required=True)
    price = fields.Float(required=True)
    description = fields.Str(required=True)
    image = fields.Str(required=True)
