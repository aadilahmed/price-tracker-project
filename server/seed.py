#!/usr/bin/env python3

# Standard library imports
from random import randint, choice as rc

# Remote library imports
from faker import Faker

# Local imports
from app import app
from models import db, User, Product, Price, Wishlist

if __name__ == '__main__':
    fake = Faker()
    with app.app_context():
        print("Starting seed...")
        # Seed code goes here!

        User.query.delete()
        Product.query.delete()
        Price.query.delete()
        Wishlist.query.delete()

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
            Product(name="Laptop", current_price=79999, url="https://www.amazon.com/laptop", image="https://upload.wikimedia.org/wikipedia/commons/3/37/Schenker_VIA14_Laptop_asv2021-01.jpg"),
            Product(name="Headphones", current_price=5999, url="https://www.amazon.com/headphones", image="https://upload.wikimedia.org/wikipedia/commons/1/1d/AudioQuest_NightHawk_Carbon_headphones_%2833582571334%29.jpg"),
            Product(name="Smartphone", current_price=69999, url="https://www.amazon.com/smartphone", image="https://upload.wikimedia.org/wikipedia/commons/4/41/Hitech_Air_A1i.jpg"),
            Product(name="Coffee Maker", current_price=2999, url="https://www.amazon.com/coffee_maker", image="https://upload.wikimedia.org/wikipedia/commons/6/69/Melitta_Thermal_coffee_maker.jpg"),
            Product(name="Fitness Tracker", current_price=4999, url="https://www.amazon.com/fitness_tracker", image="https://upload.wikimedia.org/wikipedia/commons/2/22/Cardiac_Sense_Latest_Pic.png")
        ]

        wishlists = [
            Wishlist(title="practice", user_id=8),
            Wishlist(title="practice2", user_id=8),
            Wishlist(title="practice3", user_id=8)
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

        products[2].wishlists.append(wishlists[0])
        products[3].wishlists.append(wishlists[1])

        db.session.add_all(users)
        db.session.add_all(products)
        db.session.add_all(laptop_prices + headphone_prices + smartphone_prices + coffee_maker_prices + fitness_tracker_prices)
        db.session.commit()

        print("Complete.")
