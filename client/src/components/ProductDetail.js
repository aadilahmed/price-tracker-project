import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Image, Dropdown } from "semantic-ui-react";
import PricesGraph from "./PricesGraph";

function ProductDetail({ wishlists, onUpdateProduct }) {
  const [product, setProduct] = useState({});
  const { id } = useParams();

  useEffect(() => {
    fetch(`/products/${id}`)
      .then((response) => response.json())
      .then((data) => setProduct(data));
  }, [id]);

  function handleClick(e, wishlist) {
    e.preventDefault()
    const updatedWishlists = [...wishlists, wishlist]
    handleUpdateProduct(updatedWishlists)
  }

  // Adding product to wishlist functionality ---- still work-in-progress -----
  function handleUpdateProduct(newWishlists) {
    fetch(`/products/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({wishlists: newWishlists}),
    })
      .then((r) => r.json())
      .then((updatedProduct) => onUpdateProduct(updatedProduct));
  }

  return (
    <div className="productdetailpage-container">
      <div className="product-info-container">
        <h1>{product.name}</h1>
        <h2>$ {product.current_price / Math.pow(10, 2)}</h2>
        <Dropdown
          icon="plus"
          text="Add to Wishlist"
          style={{ color: "green" }}
          className="dropdown"
        >
          <Dropdown.Menu>
            {wishlists && wishlists.length ? wishlists.map((wishlist) => (
              <Dropdown.Item
                key={wishlist.id}
                text={wishlist.title}
                onClick={(e) => handleClick(e, wishlist)}
              />
            )): <p>No wishlists!</p>}
          </Dropdown.Menu>
        </Dropdown>
      </div>
      <div className="image-graph-container">
        <Image
          className="detail-image"
          size="medium"
          src={product.image}
          alt=""
        />
        <div className="graph-container">
          {product.prices ? <PricesGraph prices={product.prices} /> : null}
        </div>
      </div>
    </div>
  );
}

export default ProductDetail;
