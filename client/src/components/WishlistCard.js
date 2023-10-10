import React from "react";
import { Card, Container } from "semantic-ui-react";
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
    <Container className="wishlist-card-container">
      <div className="wishlist-info">
        <h3 className="name">{title}</h3>
        <i
          className="close icon"
          onClick={handleDelete}
          style={{ color: "red" }}
        />{" "}
        Delete Wishlist
      </div>
      <Card.Group itemsPerRow={5}>{productsToDisplay}</Card.Group>
    </Container>
  );
}

export default WishlistCard;
