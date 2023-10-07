import React from "react";
import { Card } from "semantic-ui-react";

function ProductCard({ name, url, current_price }) {
    return (
      <Card textAlign="center">
        <div className="productcard">
          <div className="name">{name}</div>
          <div className="current-price">
            $ {current_price.toFixed(2)}
          </div>
        </div>
      </Card>
    );
}

export default ProductCard