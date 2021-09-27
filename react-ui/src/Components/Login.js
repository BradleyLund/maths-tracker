import React, { useState } from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Container from "@material-ui/core/Container";
import axios from "axios";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [checkedOption, setCheckedOption] = useState("");

  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };

  const handleCheckBoxChange = (event) => {
    setCheckedOption(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleRegister = (event) => {
    event.preventDefault();

    if (username === "" || password === "") {
      alert("Please enter a valid username and password");
    } else {
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
    }
  };

  const handleLogin = (event) => {
    event.preventDefault();

    if (username === "" || password === "") {
      alert("Please enter a valid username and password");
    } else {
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
    }
  };

  return (
    <Container component="main" maxWidth="xs">
      <div id="loginPage">
        <h1>MathsTracker</h1>
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
          <div id="radioButtons">
            <div class="inputBox">
              <input
                type="radio"
                value="teacher"
                name="isStudent"
                checked={checkedOption === "teacher"}
                onChange={handleCheckBoxChange}
              />{" "}
              Teacher
            </div>
            <div class="inputBox">
              <input
                type="radio"
                value="student"
                name="isStudent"
                checked={checkedOption === "student"}
                onChange={handleCheckBoxChange}
              />{" "}
              Student
            </div>
          </div>

          <button
            id="logInButton"
            class="button-66"
            type="submit"
            onClick={handleLogin}>
            Log In
          </button>

          {checkedOption === "teacher" ? (
            <button
              class="button-66"
              id="registerButton"
              type="submit"
              onClick={handleRegister}>
              Register
            </button>
          ) : (
            <></>
          )}
        </form>
      </div>
    </Container>
  );
}
