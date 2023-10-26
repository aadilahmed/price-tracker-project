import React from "react";
import { useNavigate } from "react-router-dom";
import { Icon, Image } from "semantic-ui-react";

function ProductListing({
  id,
  name,
  image,
  url,
  current_price,
  wishlist_id,
  onUpdateWishlist,
}) {
  const navigate = useNavigate();

  function routeChange() {
    let path = `/products/${id}`;
    navigate(path);
  }

  function handleProductDeleteFromWishlist(e, id) {
    e.preventDefault();
    fetch(`/wishlists/${wishlist_id}/products`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        product_id: id,
      }),
    }).then((response) => {
      response.json().then((data) => onUpdateWishlist(data));
    });
  }

  return (
    <div className="productlisting-container">
      <div className="image-and-info-container">
        <Image size="small" src={image} alt="" fluid onClick={routeChange} />
        <div className="product-listing-info-container">
          <h3 className="name">{name}</h3>
          <div className="current-price">
            $ {current_price / Math.pow(10, 2)}
          </div>
        </div>
      </div>
      <div
        className="remove-product-div"
        onClick={(e) => handleProductDeleteFromWishlist(e, id)}
      >
        <Icon className="trash-icon" link name="trash alternate outline"></Icon>
        <div>Remove</div>
      </div>
    </div>
  );
}

export default ProductListing;
