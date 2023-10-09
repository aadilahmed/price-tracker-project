import React from "react";
import { Card } from "semantic-ui-react";
import WishlistCard from "./WishlistCard";

function WishlistCollection({wishlists}) {
    const wishlistsToDisplay = wishlists.map((wishlist) => (
        <WishlistCard
          key={wishlist.id}
          id={wishlist.id}
          title={wishlist.title}
          products={wishlist.products}
        />
      ));
    
      return <Card.Group itemsPerRow={1}>{wishlistsToDisplay}</Card.Group>;
}

export default WishlistCollection