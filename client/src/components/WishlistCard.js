import React from "react";
import { Card, Container } from "semantic-ui-react";
import ProductListing from "./ProductListing";

function WishlistCard({ id, title, products, onHandleDelete, onUpdateWishlist }) {
  const productsToDisplay = products.map((product) => (
    <ProductListing
      key={product.id}
      id={product.id}
      name={product.name}
      image={product.image}
      url={product.url}
      current_price={product.current_price}
      wishlist_id={id}
      onUpdateWishlist={onUpdateWishlist}
    />
  ));

  function handleDelete() {
    fetch(`/wishlists/${id}`, {
      method: "DELETE",
    }).then(() => onHandleDelete(id));
  }

  return (
    <Container className="wishlist-card-container">
      <div className="wishlist-info">
        <h1 className="wishlist-name">{title}</h1>
        <i
          className="close icon"
          onClick={handleDelete}
          style={{ color: "red" }}
        />{" "}
        Delete Wishlist
      </div>
      <Card.Group itemsPerRow={1} className="product-listings">{productsToDisplay}</Card.Group>
    </Container>
  );
}

export default WishlistCard;
