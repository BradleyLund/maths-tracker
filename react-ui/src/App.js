import "./App.css";
import PrivateTeacherApp from "./Components/PrivateTeacherApp";
import Login from "./Components/Login";
import React from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";

class App extends React.Component {
  constructor(props) {
    super(props);

    // initialise the state:
    this.state = {
      loggedin: false,
      username: "",
      isTeacher: null,
    };
  }

  componentDidMount() {
    if (window.localStorage.getItem("AuthToken") !== null) {
      // check the authtoken on the backend, and if the auth token is valid set loggedin to true otherwise say not logged in
      // and if authorized make sure what type of authorization, teacher or student. then display different private apps depending
      let access_token = window.localStorage.getItem("AuthToken");
      axios
        .get("/authorize", {
          headers: {
            Authorization: `Bearer ${access_token}`,
          },
        })
        .then((res) => {
          // handling getting the initial data once the user is logged in
          this.setState({
            username: res.data.username,
            isTeacher: true,
            loggedin: true,
          });
        })
        .catch((error) => {
          console.error(error);
        });
    } else {
      this.setState({ username: "", isTeacher: null, loggedin: false });
    }
  }

  handleLogout = (event) => {
    event.preventDefault();
    window.localStorage.removeItem("AuthToken");
    window.location.reload();
  };
  // here we want to put if logged in then show private app otherwise show the login screen
  // we need to authorize the token properly.
  render() {
    return (
      <div id="parentDiv">
        {this.state.loggedin ? (
          <PrivateTeacherApp
            handleLogout={this.handleLogout}
            username={this.state.username}
          />
        ) : (
          <Login />
        )}
      </div>
    );
  }
}

export default App;
