import "../App.css";
import React from "react";
import axios from "axios";
import Navbar from "react-bootstrap/Navbar";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import AddStudent from "./AddStudent";
import EditStudent from "./EditStudent";
import DifficultyExamples from "./DifficultyExamples";
import StudentTable from "./StudentTable";

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
        <Router>
          <Navbar bg="primary" expand="lg" variant="dark">
            <Container>
              <Navbar.Brand>Welcome, {this.props.username} </Navbar.Brand>
              <Navbar.Toggle aria-controls="basic-navbar-nav" />
              <Navbar.Collapse id="basic-navbar-nav">
                <Nav>
                  <Link to="/">
                    <span className="navbarLink">Home</span>
                  </Link>
                  <Link to="/addstudent">
                    <span className="navbarLink">Add a student</span>
                  </Link>
                  <Link to="/editstudent">
                    <span className="navbarLink">Edit a student</span>
                  </Link>
                  <Link to="/difficultyexamples">
                    <span className="navbarLink">Difficulty Examples</span>
                  </Link>
                  <Nav.Link onClick={this.props.handleLogout}>
                    <span className="navbarLink">Log out</span>
                  </Nav.Link>
                </Nav>
              </Navbar.Collapse>
            </Container>
          </Navbar>

          <Switch>
            <Route path="/addstudent">
              {/* add a student component here */}
              <AddStudent teacherID={this.props.teacherID} />
            </Route>
            <Route path="/editstudent">
              {/* edit a student component here */}
              <EditStudent />
            </Route>
            <Route path="/difficultyexamples">
              {/* difficulty examples component here */}
              <DifficultyExamples />
            </Route>
            {/* home needs to be at the bottom as the switch displays the first route that matches the link */}
            <Route path="/">
              {/* react bootstrap table here */}

              {this.state.studentsArray.length > 0 ? (
                <StudentTable />
              ) : (
                `You don't have any students in your class yet, click add a student`
              )}
            </Route>
          </Switch>
        </Router>
      </div>
    );
  }
}

export default PrivateTeacherApp;
