import "../App.css";
import React from "react";
import axios from "axios";
import Navbar from "react-bootstrap/Navbar";

class PrivateTeacherApp extends React.Component {
  constructor(props) {
    super(props);

    // initialise the state:
    this.state = {
      studentsArray: [],
    };
  }

  componentDidMount() {
    // send a get request to the backend with the token
    let access_token = window.localStorage.getItem("AuthToken");
    axios
      .get("/getteachersclass", {
        headers: {
          Authorization: `Bearer ${access_token}`,
        },
      })
      .then((res) => {
        // getting the list of students once the teacher has logged in
        this.setState({ studentsArray: res.data });
      })
      .catch((error) => {
        console.error(error);
      });
  }

  // the function for handling the submition of the form

  render() {
    return (
      <div>
        <div id="header">
          <h1>Welcome, {this.props.username} </h1>
          <button className="button-66">Add a student</button>
          <button className="button-66">Edit a student</button>
          <button className="button-66">Show Difficulty level examples</button>

          <button className="button-66" onClick={this.props.handleLogout}>
            Log out
          </button>
        </div>

        <Navbar bg="light" expand="lg">
          <Container>
            <Navbar.Brand href="#home">React-Bootstrap</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
              <Nav className="me-auto">
                <Nav.Link href="#home">Home</Nav.Link>
                <Nav.Link href="#link">Link</Nav.Link>
                <NavDropdown title="Dropdown" id="basic-nav-dropdown">
                  <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
                  <NavDropdown.Item href="#action/3.2">
                    Another action
                  </NavDropdown.Item>
                  <NavDropdown.Item href="#action/3.3">
                    Something
                  </NavDropdown.Item>
                  <NavDropdown.Divider />
                  <NavDropdown.Item href="#action/3.4">
                    Separated link
                  </NavDropdown.Item>
                </NavDropdown>
              </Nav>
            </Navbar.Collapse>
          </Container>
        </Navbar>
      </div>
    );
  }
}

export default PrivateTeacherApp;
