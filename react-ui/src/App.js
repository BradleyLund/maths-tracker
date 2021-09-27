import "./App.css";
import PrivateTeacherApp from "./Components/PrivateTeacherApp";
import Login from "./Components/Login";
import React from "react";

class App extends React.Component {
  // here we want to put if logged in then show private app otherwise show the login screen
  // we need to authorize the token properly.
  render() {
    let loggedin;
    if (window.localStorage.getItem("AuthToken") !== null) {
      // check the authtoken on the backend, and if the auth token is valid set loggedin to true otherwise say not logged in
      // and if authorized make sure what type of authorization, teacher or student. then display different private apps depending
      loggedin = true;
    } else {
      loggedin = false;
    }
    return (
      <div id="parentDiv">{loggedin ? <PrivateTeacherApp /> : <Login />}</div>
    );
  }
}

export default App;
