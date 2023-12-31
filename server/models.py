from sqlalchemy_serializer import SerializerMixin
from sqlalchemy.ext.hybrid import hybrid_property
from sqlalchemy.ext.associationproxy import association_proxy
from sqlalchemy.orm import validates
import re

from config import db, bcrypt

wishlist_product = db.Table(
    'wishlist_products',
    db.Column('product_id', db.ForeignKey('products.id'), primary_key=True),
    db.Column('wishlist_id', db.ForeignKey('wishlists.id'), primary_key=True),
    extend_existing=True,
)

class User(db.Model, SerializerMixin):
    __tablename__ = 'users'

    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String, nullable=False, unique=True)
    _password_hash = db.Column(db.String)

    wishlists = db.relationship('Wishlist', backref='user')

    serialize_rules = ("-wishlists", "-_password_hash",)

    @validates('username') 
    def validate_username(self, key, username):
        if not username:
            raise ValueError('No username provided')  
        return username 

    @hybrid_property
    def password_hash(self):
        raise AttributeError('Password hashes may not be viewed.')
    
    @password_hash.setter
    def password_hash(self, password):
        password_hash = bcrypt.generate_password_hash(
            password.encode('utf-8'))
        self._password_hash = password_hash.decode('utf-8')

    def authenticate(self, password):
        return bcrypt.check_password_hash(
            self._password_hash, password.encode('utf-8'))

    def __repr__(self):
        return f"\n<User " + \
            f"id={self.id}, " + \
            f"username={self.username}, " \
            + ">"
    
class Product(db.Model, SerializerMixin):
    __tablename__ = 'products'

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String, nullable=False)
    current_price = db.Column(db.Integer)
    image = db.Column(db.String)
    url = db.Column(db.String)

    prices = db.relationship('Price', backref='product')
    wishlists = db.relationship('Wishlist', secondary=wishlist_product, back_populates='products')

    serialize_rules = ("-prices.product", "-wishlists.products",)

    @validates('name') 
    def validate_name(self, key, name):
        if not name:
            raise ValueError('No name provided')  
        return name 
    
    @validates('url') 
    def validate_url(self, key, url):
        if not re.match("^https:\/\/[0-9A-z.]+.[0-9A-z.]+.[a-z]+$", url):
            raise ValueError('Provided url is not an url address')   
        return url

    def __repr__(self):
        return f"\n<Product " + \
            f"id={self.id}, " + \
            f"name={self.name}, " \
            + ">"

class Price(db.Model, SerializerMixin):
    __tablename__ = 'prices'

    id = db.Column(db.Integer, primary_key=True)
    amount = db.Column(db.Integer)
    date = db.Column(db.String)

    product_id = db.Column(db.Integer(), db.ForeignKey('products.id'))

    def __repr__(self):
        return f"\n<Price " + \
            f"id={self.id}, " + \
            f"amount={self.amount} " \
            + ">"

class Wishlist(db.Model, SerializerMixin):
    __tablename__ = 'wishlists'

    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String, nullable=False)

    products = db.relationship('Product', secondary=wishlist_product, back_populates='wishlists')
    user_id = db.Column(db.Integer(), db.ForeignKey('users.id'))

    @validates('title') 
    def validate_title(self, key, title):
        if not title:
            raise ValueError('No title provided')  
        return title

    def __repr__(self):
        return f"\n<Wishlist " + \
            f"id={self.id}, " + \
            f"title={self.title} " \
            + ">"