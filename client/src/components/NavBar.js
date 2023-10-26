import React from "react";
import { NavLink } from "react-router-dom";
import { Header } from "semantic-ui-react";

const linkStyles = {
  display: "block",
  width: "100%",
  padding: "10px",
  background: "rgba(11, 11, 11, 0)",
  textDecoration: "none",
  color: "black",
};

function NavBar({ user, setUser }) {
  function handleLogoutClick() {
    fetch("/logout", { method: "DELETE" }).then((r) => {
      if (r.ok) {
        setUser(null);
      }
    });
  }
  
  return (
    <div className="sidebar">
      <Header style={linkStyles}>Price Tracker</Header>
      <NavLink to="/products" end style={linkStyles}>
        All Products
      </NavLink>
      {!user ? (
        <>
          <NavLink to="/login" end style={linkStyles}>
            Log In
          </NavLink>
          <NavLink to="/signup" end style={linkStyles}>
            Sign Up
          </NavLink>
        </>
      ) : (
        <>
          <NavLink to="/wishlists" end style={linkStyles}>
            Wishlists
          </NavLink>
          <NavLink to="/create" end style={linkStyles}>
            Create Wishlist
          </NavLink>
          <NavLink to="/login" end style={linkStyles} onClick={handleLogoutClick}>
            Logout
          </NavLink>
        </>
      )}
    </div>
  );
}

export default NavBar;
