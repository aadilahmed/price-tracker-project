import React, {useState} from "react"
import { Form, Grid, Segment } from "semantic-ui-react";
import { useHistory } from "react-router-dom";

function WishlistForm({onCreateWishlist}) {
    const [title, setTitle] = useState("")
    
    const history = useHistory()

    function handleSubmit(e) {
        e.preventDefault();
        fetch("/wishlists", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            title,
          }),
        }).then((response) => {
            response.json().then((data) => onCreateWishlist(data));
        });

        history.push("/wishlists");
      }

    return (
        <Grid
        textAlign="center"
        style={{ height: "50vh", margin: "0"}}
        verticalAlign="middle"
      >
        <Grid.Column style={{ maxWidth: 450 }}>
          <Segment stacked>
            <h3>Create a Wishlist!</h3>
            <Form onSubmit={handleSubmit}>
              <Form.Group widths="equal" grouped>
                <Form.Input
                  fluid
                  label="Wishlist Title"
                  placeholder="Enter Title"
                  name="title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                />
              </Form.Group>
              <Form.Button
                style={{ background: "#dc3545", color: "aliceblue" }}
              >
                Submit
              </Form.Button>
            </Form>
          </Segment>
        </Grid.Column>
      </Grid>
    )
}

export default WishlistForm;