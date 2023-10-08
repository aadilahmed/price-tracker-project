import React from "react";
import { NavLink } from "react-router-dom";
import { Header } from "semantic-ui-react";

function NavBar({user}) {
    return (
        // Sidebar includes routes to Home and Create pages
        <div className="sidebar">
          <Header>
            Price Tracker
          </Header>
          { !user ?
          <NavLink
            to="/login"
            exact
          >
           Log In
          </NavLink> : null}
          <NavLink
            to="/products"
            exact
          >
            All Products
          </NavLink>
          <NavLink
            to="/wishlists"
            exact
          >
            Wishlists
          </NavLink>
          <NavLink
            to="/signup"
            exact
          >
            Sign Up
          </NavLink>
        </div>
      );
}

export default NavBar
