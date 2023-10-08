import React from "react";
import { Card, Image } from "semantic-ui-react";
import { useHistory } from "react-router-dom";

function ProductCard({ key, name, image, url, current_price }) {
    const history = useHistory();
  
    function routeChange() { 
      let path = `/products/${key}`; 
      history.push(path);
    }

    return (
      <Card textAlign="center" onClick={routeChange}>
        <div className="productcard">
          <Image className="image" src={image} alt="" />
          <div className="name">{name}</div>
          <div className="current-price">
            $ {current_price / Math.pow(10, 2)}
          </div>
        </div>
      </Card>
    );
}

export default ProductCard