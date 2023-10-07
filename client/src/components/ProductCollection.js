import React from "react";
import ProductCard from "./ProductCard";
import { Card } from "semantic-ui-react";

function ProductCollection({ products }) {
  const productsToDisplay = products.map((product) => (
    <ProductCard
      key={product.id}
      name={product.name}
      url={product.url}
      current_price={product.current_price}
    />
  ));

  return <Card.Group itemsPerRow={4}>{productsToDisplay}</Card.Group>;
}

export default ProductCollection;
