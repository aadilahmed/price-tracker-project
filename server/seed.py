#!/usr/bin/env python3

# Standard library imports
from random import randint, choice as rc

# Remote library imports
from faker import Faker

# Local imports
from app import app
from models import db, User, Product, Price

if __name__ == '__main__':
    fake = Faker()
    with app.app_context():
        print("Starting seed...")
        # Seed code goes here!

        User.query.delete()
        Product.query.delete()
        Price.query.delete()

        users = [
            User(username="baby123"),
            User(username="pandalover"),
            User(username="abc"),
            User(username="jofff"),
            User(username="heykky"),
            User(username="solaire123"),
            User(username="asdfasdf")
        ]

        products = [
            Product(name="Laptop", current_price=79999, url="https://www.amazon.com/laptop"),
            Product(name="Headphones", current_price=5999, url="https://www.amazon.com/headphones"),
            Product(name="Smartphone", current_price=69999, url="https://www.amazon.com/smartphone"),
            Product(name="Coffee Maker", current_price=2999, url="https://www.amazon.com/coffee_maker"),
            Product(name="Fitness Tracker", current_price=4999, url="https://www.amazon.com/fitness_tracker")
        ]

        laptop_prices = [
            Price(amount=65000, date="2022-09-13"),
            Price(amount=55000, date="2022-09-20"),
            Price(amount=75000, date="2022-09-30"),
            Price(amount=85000, date="2022-10-05")
        ]

        headphone_prices = [
            Price(amount=8000, date="2022-01-10"),
            Price(amount=7500, date="2022-02-20"),
            Price(amount=6999, date="2022-02-25"),
            Price(amount=5999, date="2022-04-15")
        ]

        smartphone_prices = [
            Price(amount=79999, date="2023-03-13"),
            Price(amount=75000, date="2023-04-20"),
            Price(amount=75000, date="2023-04-22"),
            Price(amount=60000, date="2023-06-05")
        ]

        coffee_maker_prices = [
            Price(amount=2999, date="2022-09-13"),
            Price(amount=3499, date="2022-09-20"),
            Price(amount=2499, date="2022-09-30"),
            Price(amount=3499, date="2022-10-05")
        ]

        fitness_tracker_prices = [
            Price(amount=6000, date="2022-09-13"),
            Price(amount=5500, date="2022-09-20"),
            Price(amount=5500, date="2022-09-30"),
            Price(amount=5500, date="2022-10-05")
        ]

        products[0].prices = laptop_prices
        products[1].prices = headphone_prices
        products[2].prices = smartphone_prices
        products[3].prices = coffee_maker_prices
        products[4].prices = fitness_tracker_prices

        db.session.add_all(users)
        db.session.add_all(products)
        db.session.add_all(laptop_prices + headphone_prices + smartphone_prices + coffee_maker_prices + fitness_tracker_prices)
        db.session.commit()

        print("Complete.")
