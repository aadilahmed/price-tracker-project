import React, { useEffect, useState } from "react";
import { Switch, Route } from "react-router-dom";
import NavBar from "./NavBar";
import WishlistPage from "./WishlistPage";
import ProductPage from "./ProductPage";
import ProductDetail from "./ProductDetail";
import LoginForm from "./LoginForm";
import SignUpForm from "./SignUpForm";

function App() {
  const [products, setProducts] = useState([]);
  const [user, setUser] = useState(null);

  useEffect(() => {
    fetch("/check_session").then((response) => {
      if (response.ok) {
        response.json().then((user) => setUser(user));
      }
    });
  }, []);

  useEffect(() => {
    fetch('/products')
    .then((response) => response.json())
    .then((data) => setProducts(data))
  }, [])

  /* function handleAddProduct(newProduct) {
    setProducts([...products, newProduct]);
  } */

  return (
    <div className="App">
      <NavBar user={user} setUser={setUser}/>
      <Switch>
        <Route exact path="/wishlists">
          <WishlistPage user={user}/>
        </Route>
        <Route exact path="/products">
          <ProductPage products={products} />
        </Route>
        <Route exact path="/products/:id">
          <ProductDetail />
        </Route>
        <Route exact path="/login">
          <LoginForm onLogin={setUser}/>
        </Route>
        <Route exact path="/signup">
          <SignUpForm onLogin={setUser}/>
        </Route>
      </Switch>
    </div>
  );
}

export default App;
