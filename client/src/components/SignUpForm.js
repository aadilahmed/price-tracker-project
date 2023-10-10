import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { useFormik } from "formik";
import { Form, Grid, Segment } from "semantic-ui-react";
import * as yup from "yup";

function SignUpForm({ onLogin }) {
  const history = useHistory();

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
      fetch("/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      }).then((response) => {
          response.json().then((user) => onLogin(user));
      });
      history.push("/");
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
          <h3>Sign Up</h3>
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
            <button type="submit">Sign Up</button>
          </form>
        </Segment>
      </Grid.Column>
    </Grid>
  );
}

export default SignUpForm;
