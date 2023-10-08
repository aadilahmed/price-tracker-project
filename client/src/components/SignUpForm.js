import React, {useState} from "react";
import { Form, Grid, Segment } from "semantic-ui-react";

function SignUpForm({onLogin}) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirmation, setPasswordConfirmation] = useState("");

  function handleSubmit(e) {
    e.preventDefault();
    fetch("/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username,
        password,
        password_confirmation: passwordConfirmation,
      }),
    }).then((response) => {
        response.json().then((user) => onLogin(user));
    });
  }

    return (
        <Grid
        textAlign="center"
        style={{ height: "100vh", margin: "0"}}
        verticalAlign="middle"
      >
        <Grid.Column style={{ maxWidth: 450 }}>
          <Segment stacked>
            <h3>Sign Up</h3>
            <Form onSubmit={handleSubmit}>
              <Form.Group widths="equal" grouped>
                <Form.Input
                  fluid
                  label="Username"
                  placeholder="Enter username"
                  name="username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
                <Form.Input
                  fluid
                  label="Password"
                  placeholder="Enter password"
                  name="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <Form.Input
                  fluid
                  label="Password Confirmation"
                  placeholder="Enter password"
                  name="password"
                  value={passwordConfirmation}
                  onChange={(e) => setPasswordConfirmation(e.target.value)}
                />
              </Form.Group>
              <Form.Button
                style={{ background: "#dc3545", color: "aliceblue" }}
              >
                Sign Up
              </Form.Button>
            </Form>
          </Segment>
        </Grid.Column>
      </Grid>
    )
}

export default SignUpForm