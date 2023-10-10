import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Image, Dropdown } from "semantic-ui-react";
import PricesGraph from "./PricesGraph";

function ProductDetail({wishlists, onUpdateProduct}) {
  const [product, setProduct] = useState({});
  const { id } = useParams();

  useEffect(() => {
    fetch(`/products/${id}`)
      .then((response) => response.json())
      .then((data) => setProduct(data));
  }, [id]);

  function handleUpdateProduct(wishlist) {
    /* fetch(`/products/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        url: wishlist,
      }),
    })
      .then((r) => r.json())
      .then((updatedProduct) => onUpdateProduct(updatedProduct)); */
  } 

  const dropdownItems = wishlists.map((wishlist) =>  <Dropdown.Item key={wishlist.id} text={wishlist.title} onClick={handleUpdateProduct(wishlist)}/>);

  return (
    <div className="productdetailpage-container">
      <h1>{product.name}</h1>
      <h2>$ {product.current_price / Math.pow(10, 2)}</h2>
      <Dropdown icon="plus icon" text="Add to Wishlist" style={{ color: "green" }}>
        <Dropdown.Menu>
          {dropdownItems}
        </Dropdown.Menu>
      </Dropdown>
      <Image className="ui large image" src={product.image} alt="" />
      {product.prices ? <PricesGraph prices={product.prices} /> : null}
    </div>
  );
}

export default ProductDetail;
