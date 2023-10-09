import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Image, Dropdown } from "semantic-ui-react";
import PricesGraph from "./PricesGraph";

function ProductDetail() {
  const [product, setProduct] = useState({});
  const { id } = useParams();

  useEffect(() => {
    fetch(`/products/${id}`)
      .then((response) => response.json())
      .then((data) => setProduct(data));
  }, [id]);

  return (
    <div className="productdetailpage-container">
      <h1>{product.name}</h1>
      <h2>$ {product.current_price / Math.pow(10, 2)}</h2>
      <Image className="ui large image" src={product.image} alt="" />
      {product.prices ? <PricesGraph prices={product.prices} /> : null}
    </div>
  );
}

export default ProductDetail;
