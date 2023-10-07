import React, { useEffect, useState } from "react";
import { Switch, Route } from "react-router-dom";
import NavBar from "./NavBar";
import WishlistForm from "./WishlistForm";
import ProductPage from "./ProductPage";

function App() {
  const [products, setProducts] = useState([]);

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
      <h1>Project Client</h1>
      <NavBar />
      <Switch>
        <Route exact path="/wishlists">
          <WishlistForm />
        </Route>
        <Route exact path="/products">
          <ProductPage products={products} />
        </Route>
      </Switch>
    </div>
  );
}

export default App;
