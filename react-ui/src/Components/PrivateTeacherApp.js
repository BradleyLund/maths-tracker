import "../App.css";
import React from "react";
import axios from "axios";

class PrivateTeacherApp extends React.Component {
  constructor(props) {
    super(props);

    // initialise the state:
    this.state = {
      tasks: [],
      input: "",
    };
  }

  // we don't need to bind this when using an arrow function

  handleLogout = (event) => {
    event.preventDefault();
    window.localStorage.removeItem("AuthToken");
    window.location.reload();
  };

  componentDidMount() {
    // send a get request to the backend with the token
    // let access_token = window.localStorage.getItem("AuthToken");
    // axios
    //   .get("/getlist", {
    //     headers: {
    //       Authorization: `Bearer ${access_token}`,
    //     },
    //   })
    //   .then((res) => {
    //
    //  // handling getting the initial data once the user is logged in
    //   })
    //   .catch((error) => {
    //     console.error(error);
    //   });
  }

  // the function for handling the submition of the form

  render() {
    return (
      <div>
        <button className="button-66" onClick={this.handleLogout}>
          Log out
        </button>
      </div>
    );
  }
}

export default PrivateTeacherApp;
