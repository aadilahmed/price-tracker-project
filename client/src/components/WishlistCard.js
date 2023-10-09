import React from "react";
import { Card } from "semantic-ui-react";
import { useHistory } from "react-router-dom";
import ProductCard from "./ProductCard";

function WishlistCard({ id, title, products, onHandleDelete }) {
  const history = useHistory();
  const productsToDisplay = products.map((product) => (
    <ProductCard
      key={product.id}
      name={product.name}
      image={product.image}
      url={product.url}
      current_price={product.current_price}
    />
  ));

  function handleDelete() {
    fetch(`/wishlists/${id}`, {
      method: "DELETE",
    }).then(() => onHandleDelete(id));

    history.push("/wishlists");
  }

  return (
    <Card className="wishlist-card">
      <div className="wishlistcard">
        <div className="wishlist-info">
        <div className="name">{title}</div>
        <i
          className="close icon"
          onClick={handleDelete}
          style={{ color: "red" }}
        />
        </div>
        <Card.Group itemsPerRow={5}>{productsToDisplay}</Card.Group>
      </div>
    </Card>
  );
}

export default WishlistCard;
