import React from "react";
import { Card } from "semantic-ui-react";
import { useHistory } from "react-router-dom";

function ProductCard({ id, name, image, url, current_price }) {
  const history = useHistory();

  function routeChange() {
    let path = `/products/${id}`;
    history.push(path);
  }

  return (
    <div className="productCard-container">
      <Card textalign="center" onClick={routeChange} className="card">
        <div className="productcard">
          <img className="ui fluid image" src={image} alt="" height={158} width={158} />
        </div>
      </Card>
      <div className="name">{name}</div>
      <div className="current-price">$ {current_price / Math.pow(10, 2)}</div>
      <i className="plus icon" style={{ color: "green" }} /> Add to Wishlist
    </div>
  );
}

export default ProductCard;
