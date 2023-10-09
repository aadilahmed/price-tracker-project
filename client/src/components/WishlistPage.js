import React, {useEffect, useState} from "react";
import { Container, Button } from "semantic-ui-react";
import WishlistCollection from "./WishlistCollection";
import WishlistForm from "./WishlistForm";

function WishlistPage({user}) {
    const [wishlists, setWishlists] = useState([])
    const [showForm, setShowForm] = useState(false)

    function showWishlistForm() {
        setShowForm(!showForm);
    }

    function handleCreateWishlist(newWishlist) {
        setWishlists([...wishlists, newWishlist]);
    }

    function handleDeleteWishlist(id) {
        setWishlists(wishlists => wishlists.filter((item) => item.id !== id));
    }

    useEffect(() => {
        fetch('/wishlists')
        .then((response) => response.json())
        .then((data) => setWishlists(data))
      }, [])

    const wishlistsToDisplay = wishlists

    return (
        <div className="wishlistpage-container">
            <Container>
                <h1 className="header">Wishlists</h1>
                <br />
                <Button onClick={showWishlistForm}>Create New Wishlist</Button>
                {showForm && (<WishlistForm onCreateWishlist={handleCreateWishlist} setShowForm={setShowForm}/>)}
                <WishlistCollection wishlists={wishlistsToDisplay} onHandleDelete={handleDeleteWishlist} />
            </Container>
        </div>
    )
}

export default WishlistPage