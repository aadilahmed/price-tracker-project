import React from "react";
import { Card } from "semantic-ui-react";
import WishlistCard from "./WishlistCard";

function WishlistCollection({wishlists, onHandleDelete}) {
    const wishlistsToDisplay = wishlists.map((wishlist) => (
        <WishlistCard
          key={wishlist.id}
          id={wishlist.id}
          title={wishlist.title}
          products={wishlist.products}
          onHandleDelete={onHandleDelete}
        />
      ));
    
      return <Card.Group itemsPerRow={1}>{wishlistsToDisplay}</Card.Group>;
}

export default WishlistCollection