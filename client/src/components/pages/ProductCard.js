import React from "react";
import { Card, Image } from "semantic-ui-react";
import { useNavigate } from "react-router-dom";

function ProductCard({ id, name, image, url, current_price }) {
  const navigate = useNavigate();

  function routeChange() {
    let path = `/products/${id}`;
    navigate(path);
  }

  return (
    <div className="productcard-container">
      <Card textalign="center" onClick={routeChange} className="card">
          <Image src={image} alt="" fluid/>
      </Card>
      <div className="name">{name.length > 30 ? `${name.substring(0, 30)} ...` : name}</div>
      <div className="current-price">$ {current_price / Math.pow(10, 2)}</div>
    </div>
  );
}

export default ProductCard;
