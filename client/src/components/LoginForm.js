import React from "react";
import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import { Grid, Segment } from "semantic-ui-react";
import * as yup from "yup";

function LoginForm({ onLogin }) {
  const navigate = useNavigate();

  const formSchema = yup.object().shape({
    username: yup.string().required("Must enter username"),
    password: yup.string().required("Must enter a password"),
  });

  const formik = useFormik({
    initialValues: {
      username: "",
      password: "",
    },
    validationSchema: formSchema,
    onSubmit: (values) => {
      fetch("/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values, null, 2),
      }).then((response) => {
        if (response.ok) {
          response.json().then((user) => onLogin(user));
          navigate("/products");
        } 
      });
    },
  });

  return (
    <Grid
      textAlign="center"
      style={{ height: "100vh", margin: "0" }}
      verticalAlign="middle"
    >
      <Grid.Column style={{ maxWidth: 450 }}>
        <Segment stacked>
          <h3>Log In</h3>
          <form onSubmit={formik.handleSubmit} style={{ margin: "30px" }}>
            <label htmlFor="username">Username</label>
            <br />
            <input
              id="username"
              name="username"
              onChange={formik.handleChange}
              value={formik.values.username}
            />
            <p style={{ color: "red" }}> {formik.errors.username}</p>
            <label htmlFor="password">Password</label>
            <br />
            <input
              id="password"
              password="password"
              onChange={formik.handleChange}
              value={formik.values.password}
            />
            <p style={{ color: "red" }}> {formik.errors.password}</p>
            <button type="submit">Log In</button>
          </form>
        </Segment>
      </Grid.Column>
    </Grid>
  );
}

export default LoginForm;
