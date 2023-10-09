import React from "react";
import { NavLink } from "react-router-dom";
import { Header, Button } from "semantic-ui-react";

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
      <NavLink to="/products" exact style={linkStyles}>
        All Products
      </NavLink>
      {!user ? (
        <>
          <NavLink to="/login" exact style={linkStyles}>
            Log In
          </NavLink>
          <NavLink to="/signup" exact style={linkStyles}>
            Sign Up
          </NavLink>
        </>
      ) : (
        <>
          <NavLink to="/wishlists" exact style={linkStyles}>
            Wishlists
          </NavLink>
          <Button onClick={handleLogoutClick}>Logout</Button>
        </>
      )}
    </div>
  );
}

export default NavBar;
