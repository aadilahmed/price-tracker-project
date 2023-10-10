import React from "react";
import { Card, Image } from "semantic-ui-react";
import { useHistory } from "react-router-dom";

function ProductCard({ id, name, image, url, current_price }) {
  const history = useHistory();

  function routeChange() {
    let path = `/products/${id}`;
    history.push(path);
  }

  return (
    <div className="productcard-container">
      <Card textalign="center" onClick={routeChange} className="card">
          <Image size="medium" src={image} alt="" fluid/>
      </Card>
      <div className="name">{name}</div>
      <div className="current-price">$ {current_price / Math.pow(10, 2)}</div>
    </div>
  );
}

export default ProductCard;
