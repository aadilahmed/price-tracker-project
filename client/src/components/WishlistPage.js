import React from "react";
import { Container} from "semantic-ui-react";
import WishlistCollection from "./WishlistCollection";

function WishlistPage({ user, wishlists, onDeleteWishlist, onUpdateWishlist }) {
  const wishlistsToDisplay = wishlists;

  return (
    <div className="wishlistpage-container">
      <Container>
        <h1 className="header">Wishlists</h1>
        <br />
        <WishlistCollection
          wishlists={wishlistsToDisplay}
          onHandleDelete={onDeleteWishlist}
          onUpdateWishlist={onUpdateWishlist}
        />
      </Container>
    </div>
  );
}

export default WishlistPage;
