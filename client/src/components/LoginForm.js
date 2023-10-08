import React, {useState} from "react";
import { useHistory } from "react-router-dom";
import { Form, Grid, Segment } from "semantic-ui-react";

function LoginForm({onLogin}) {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const history = useHistory()

    function handleSubmit(e) {
      e.preventDefault();
      fetch("/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
      })
      .then((response) => response.json())
      .then((user) => onLogin(user))

      history.push("/");
    }

    return (
      <Grid
        textAlign="center"
        style={{ height: "100vh", margin: "0", marginLeft: "200px" }}
        verticalAlign="middle"
      >
        <Grid.Column style={{ maxWidth: 650 }}>
          <Segment stacked>
            <h3>Log In</h3>
            <Form onSubmit={handleSubmit}>
              <Form.Group widths="equal" grouped>
                <Form.Input
                  fluid
                  label="Username"
                  placeholder="Enter username"
                  name="username"
                  value={formData.username}
                  onChange={(e) => setUsername(e.target.value)}
                />
                <Form.Input
                  fluid
                  label="Password"
                  placeholder="Enter password"
                  name="password"
                  value={formData.password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </Form.Group>
              <Form.Button
                style={{ background: "#dc3545", color: "aliceblue" }}
              >
                Log In
              </Form.Button>
            </Form>
          </Segment>
        </Grid.Column>
      </Grid>
    );
}

export default LoginForm