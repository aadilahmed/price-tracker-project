import React from "react";
import { NavLink } from "react-router-dom";
import { Header } from "semantic-ui-react";

function NavBar() {
    return (
        // Sidebar includes routes to Home and Create pages
        <div className="sidebar">
          <Header>
            Price Tracker
          </Header>
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
        </div>
      );
}

export default NavBar
