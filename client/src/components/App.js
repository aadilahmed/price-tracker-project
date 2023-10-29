import React, { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";
import NavBar from "./NavBar";
import WishlistPage from "./pages/WishlistPage";
import ProductPage from "./pages/ProductPage";
import ProductDetail from "./pages/ProductDetail";
import LoginForm from "./LoginForm";
import SignUpForm from "./SignUpForm";
import WishlistForm from "./pages/WishlistForm";

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

  useEffect(() => {
    const query = `
  query amazonProduct {
    amazonProduct(input: {asin: "B0B3JBVDYP"}) {
      title
      mainImageUrl
      rating
      price {
        display
      }
    }
  }
`;
    fetch("https://graphql.canopyapi.co/", {
      method: "POST",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
        "API-KEY": proccess.env.REACT_APP_API_KEY,
      },
      body: JSON.stringify({ query }),
    })
      .then((response) => response.json())
      .then((data) => setProducts(data));
  }, []);

  useEffect(() => {
    fetch("/wishlists")
      .then((response) => response.json())
      .then((data) => setWishlists(data));
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

  return (
    <div className="App">
      <NavBar user={user} setUser={setUser} />
      <Routes>
        <Route
          path="wishlists"
          element={
            <WishlistPage
              user={user}
              wishlists={wishlists}
              onDeleteWishlist={handleDeleteWishlist}
              onUpdateWishlist={handleUpdateWishlist}
            />
          }
        />
        <Route path="products" element={<ProductPage products={products} />} />
        <Route
          path="products/:id"
          element={
            <ProductDetail
              wishlists={wishlists}
              onUpdateWishlist={handleUpdateWishlist}
            />
          }
        />
        <Route path="login" element={<LoginForm onLogin={setUser} />} />
        <Route path="signup" element={<SignUpForm onLogin={setUser} />} />
        <Route
          path="create"
          element={<WishlistForm onCreateWishlist={handleCreateWishlist} />}
        />
      </Routes>
    </div>
  );
}

export default App;
