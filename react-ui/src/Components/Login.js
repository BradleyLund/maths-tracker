import React, { useState } from "react";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import axios from "axios";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleRegister = (event) => {
    event.preventDefault();

    axios
      .post("/newuser", {
        username: username,
        password: password,
      })
      .then(
        (response) => {
          // in here we can set the token in local storage which can then be sent in the authorization header for the future requests and will then let us see the privatepage
          const token = response.data.token;
          window.localStorage.setItem("AuthToken", token);
          window.location.reload();
        },
        (error) => {
          alert(error.response.data);
        }
      );
  };

  const handleLogin = (event) => {
    event.preventDefault();
    //   take the state and post a request to the backend with the details
    axios
      .post("/login", {
        username: username,
        password: password,
      })
      .then(
        (response) => {
          // in here we can set the token in local storage which can then be sent in the authorization header for the future requests and will then let us see the privatepage
          const token = response.data.token;
          window.localStorage.setItem("AuthToken", token);
          window.location.reload();
        },
        (error) => {
          alert(error.response.data);
        }
      );
  };

  return (
    <Container component="main" maxWidth="xs">
      <div>
        <Typography component="h1" variant="h5">
          Log in
        </Typography>
        <form noValidate>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="username"
            label="Username"
            name="username"
            autoComplete="username"
            autoFocus
            value={username}
            onChange={handleUsernameChange}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
            value={password}
            onChange={handlePasswordChange}
          />

          <Button
            id="logInButton"
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            onClick={handleLogin}>
            Log In
          </Button>
          <Button
            id="registerButton"
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            onClick={handleRegister}>
            Register
          </Button>
        </form>
      </div>
    </Container>
  );
}
