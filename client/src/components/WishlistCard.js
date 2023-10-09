import React from "react";
import { Card } from "semantic-ui-react";
import ProductCard from "./ProductCard";

function WishlistCard({title, products}) {
    const productsToDisplay = products.map((product) => (
        <ProductCard
          key={product.id}
          name={product.name}
          image={product.image}
          url={product.url}
          current_price={product.current_price}
        />
      ));

    return (
        <Card textAlign="center">
          <div className="wishlistcard">
            <div className="name">{title}</div>
            <Card.Group itemsPerRow={5}>{productsToDisplay}</Card.Group>
          </div>
        </Card>
      );
}

export default WishlistCard