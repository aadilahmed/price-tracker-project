#!/usr/bin/env python3

# Standard library imports

# Remote library imports
from flask import request, session, make_response
from flask_restful import Resource
from sqlalchemy.exc import IntegrityError

# Local imports
from config import app, db, api
# Add your model imports
from models import *

# Views go here!
@app.route('/')
def index():
    return '<h1>Project Server </h1>'

class Signup(Resource):
    def post(self):
        username = request.get_json().get('username')
        password = request.get_json().get('password')

        if username and password:
            new_user = User(username=username)
            new_user.password_hash = password

            db.session.add(new_user)
            db.session.commit()

            session['user_id'] = new_user.id
            
            return new_user.to_dict(), 201

        return {'error': '422 Unprocessable Entity'}, 422
    
class CheckSession(Resource):
    def get(self):
        if session.get('user_id'):
            user = User.query.filter(User.id == session['user_id']).first()
            return user.to_dict(), 200
        return {'error': '401 Resource not found'}, 401

class Login(Resource):
    def post(self):
        username = request.get_json()['username']
        password = request.get_json()['password']

        user = User.query.filter(User.username == username).first()
        if user and user.authenticate(password):
            session['user_id'] = user.id
            return user.to_dict(), 200
        else:
            return {'error': '401 Unauthorized'}, 401
        
class Logout(Resource):
    def delete(self):
        if session.get('user_id'):
            session['user_id'] = None
            return {}, 204
        else:
            return {'error': '401 Unauthorized'}, 401
        
class ProductIndex(Resource):
    def get(self):
        products = Product.query.all()
        return [product.to_dict() for product in products], 200
    
    def post(self):
        name = request.get_json()['name']
        current_price = request.get_json()['price']
        url = request.get_json()['url']

        try:
            product = Product(name = name, current_price = current_price, url = url)
                
            db.session.add(product)
            db.session.commit()

            return product.to_dict(), 201
        except IntegrityError:
            return {'error': '422 Unprocessable entity'}, 422

class ProductByID(Resource):
    def get(self, id):
        product = Product.query.filter(Product.id == id).first().to_dict()

        return product, 200
    
    def patch(self, id):
        product = Product.query.filter(Product.id==id).first()
        for attr in request.form:
            setattr(product, attr, request.form[attr])

        db.session.add(product)
        db.session.commit()

        return product.to_dict(), 200

class WishlistIndex(Resource):
    def get(self):
        if session.get('user_id'):
            wishlists = Wishlist.query.filter(Wishlist.user_id == session['user_id']).all()
            return [wishlist.to_dict() for wishlist in wishlists], 200
        return {'error': '401 Unauthorized'}, 401
    
    def post(self):
        if session.get('user_id'):
            title = request.get_json()['title']

            try:
                wishlist = Wishlist(title = title, user_id = session['user_id'])
                    
                db.session.add(wishlist)
                db.session.commit()

                return wishlist.to_dict(), 201
            except IntegrityError:
                return {'error': '422 Unprocessable entity'}, 422
        else:
            return {'error': '401 Unauthorized'}, 401

class WishlistByID(Resource):
    def get(self, id):
        if session.get('user_id'):
            wishlist = Wishlist.query.filter(Wishlist.id == id).first().to_dict()
            return wishlist, 200
        else:
            return {'error': '401 Unauthorized'}, 401

    def patch(self, id):
        if session.get('user_id'):
            wishlist = Wishlist.query.filter(Wishlist.id==id).first()
            for attr in request.form:
                setattr(wishlist, attr, request.form[attr])

            db.session.add(wishlist)
            db.session.commit()

            return wishlist.to_dict(), 200
        else:
            return {'error': '401 Unauthorized'}, 401

    def delete(self, id):
        if session.get('user_id'):
            wishlist = Wishlist.query.filter(Wishlist.id==id).first()

            db.session.delete(wishlist)
            db.session.commit()

            response_dict = {"message": "Wishlist successfully deleted"}

            return response_dict, 200
        else:
            return {'error': '401 Unauthorized'}, 401

api.add_resource(Signup, '/signup', endpoint='signup')
api.add_resource(CheckSession, '/check_session', endpoint='check_session')
api.add_resource(Login, '/login', endpoint='login')
api.add_resource(Logout, '/logout', endpoint='logout')
api.add_resource(ProductIndex, '/products', endpoint='products')
api.add_resource(ProductByID, '/products/<int:id>', endpoint='product')
api.add_resource(WishlistIndex, '/wishlists', endpoint='wishlists')
api.add_resource(WishlistByID, '/wishlists/<int:id>', endpoint='wishlist')

if __name__ == '__main__':
    app.run(port=5555, debug=True)

