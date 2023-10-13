import React, { useEffect, useState } from "react";
import { Switch, Route } from "react-router-dom";
import NavBar from "./NavBar";
import WishlistPage from "./WishlistPage";
import ProductPage from "./ProductPage";
import ProductDetail from "./ProductDetail";
import LoginForm from "./LoginForm";
import SignUpForm from "./SignUpForm";
import WishlistForm from "./WishlistForm"

function App() {
  const [products, setProducts] = useState([]);
  const [wishlists, setWishlists] = useState([]);
  const [user, setUser] = useState(null);

  useEffect(() => {
    fetch("/check_session").then((response) => {
      if (response.ok) {
        response.json().then((user) => setUser(user));
      }
    });
  }, []);

  useEffect(() => {
    fetch("/products")
      .then((response) => response.json())
      .then((data) => setProducts(data));
  }, []);

  function handleCreateWishlist(newWishlist) {
    setWishlists([...wishlists, newWishlist]);
  }

  function handleDeleteWishlist(id) {
    setWishlists((wishlists) => wishlists.filter((item) => item.id !== id));
  }

  function handleUpdateWishlist(updatedWishlist) {
    const updatedWishlists = wishlists.map((wishlist) => {
      if (wishlist.id === updatedWishlist.id) {
        return updatedWishlist;
      } else {
        return wishlist;
      }
    });
    setWishlists(updatedWishlists);
  }

  useEffect(() => {
    fetch("/wishlists")
      .then((response) => response.json())
      .then((data) => setWishlists(data));
  }, []);

  return (
    <div className="App">
      <NavBar user={user} setUser={setUser} />
      <Switch>
        <Route exact path="/wishlists">
          <WishlistPage user={user} wishlists={wishlists} onDeleteWishlist={handleDeleteWishlist} />
        </Route>
        <Route exact path="/products">
          <ProductPage products={products} />
        </Route>
        <Route exact path="/products/:id">
          <ProductDetail wishlists={wishlists} onUpdateWishlist={handleUpdateWishlist}/>
        </Route>
        <Route exact path="/login">
          <LoginForm onLogin={setUser} />
        </Route>
        <Route exact path="/signup">
          <SignUpForm onLogin={setUser} />
        </Route>
        <Route exact path="/create">
          <WishlistForm onCreateWishlist={handleCreateWishlist} />
        </Route>
      </Switch>
    </div>
  );
}

export default App;
