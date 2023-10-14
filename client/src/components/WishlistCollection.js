import React from "react";
import { Card } from "semantic-ui-react";
import WishlistCard from "./WishlistCard";

function WishlistCollection({ wishlists, onHandleDelete, onUpdateWishlist }) {
  return (
    <Card.Group itemsPerRow={1}>
      {wishlists &&
        wishlists.length ?
        wishlists.map((wishlist) => (
          <WishlistCard
            key={wishlist.id}
            id={wishlist.id}
            title={wishlist.title}
            products={wishlist.products}
            onHandleDelete={onHandleDelete}
            onUpdateWishlist={onUpdateWishlist}
          />
        )) : <h2>No wishlists!</h2>}
    </Card.Group>
  );
}

export default WishlistCollection;
