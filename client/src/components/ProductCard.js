import React from "react";
import { Card, Image } from "semantic-ui-react";

function ProductCard({ name, image, url, current_price }) {
    return (
      <Card textAlign="center" onClick={() => this.handleClick()}>
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