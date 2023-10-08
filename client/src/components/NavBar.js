import React from "react";
import { NavLink } from "react-router-dom";
import { Header, Button } from "semantic-ui-react";

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
      <Header>Price Tracker</Header>
      <NavLink to="/products" exact>
        All Products
      </NavLink>
      {!user ? (
        <>
          <NavLink to="/login" exact>
            Log In
          </NavLink>
          <NavLink to="/signup" exact>
            Sign Up
          </NavLink>
        </>
      ) : (
        <>
          <NavLink to="/wishlists" exact>
            Wishlists
          </NavLink>
          <Button onClick={handleLogoutClick}>Logout</Button>
        </>
      )}
    </div>
  );
}

export default NavBar;
