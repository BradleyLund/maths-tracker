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
import Spinner from "react-bootstrap/Spinner";
import LessonPage from "./LessonPage";
import LessonHistoryTable from "./LessonHistoryTable";

class PrivateStudentApp extends React.Component {
  constructor(props) {
    super(props);

    // initialise the state:
    this.state = {
      isLoading: false,
      lessonHistoryArray: [],
      difficultyLevel: null,
    };
  }

  componentDidMount() {
    // send a get request to the backend with the token
    this.setState({ isLoading: true });
    let access_token = window.localStorage.getItem("AuthToken");
    axios
      .get("/getstudenthistory", {
        headers: {
          Authorization: `Bearer ${access_token}`,
        },
      })
      .then((res) => {
        console.log(res);
        // getting the list of students once the teacher has logged in
        this.setState({
          lessonHistoryArray: res.data.lessonHistoryArray,
          isLoading: false,
          difficultyLevel: res.data.difficultyLevel,
        });
      })
      .catch((error) => {
        console.error(error);
        this.setState({ isLoading: false });
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
                  <Link to="/nextlesson">
                    <span className="navbarLink">Start your next lesson</span>
                  </Link>

                  <Nav.Link onClick={this.props.handleLogout}>
                    <span className="navbarLink">Log out</span>
                  </Nav.Link>
                </Nav>
              </Navbar.Collapse>
            </Container>
          </Navbar>

          <Switch>
            <Route path="/nextlesson">
              {/* add a student component here */}
              <LessonPage
                username={this.props.username}
                difficultyLevel={this.state.difficultyLevel}
              />
              {/* <AddStudent teacherID={this.props.teacherID} /> */}
            </Route>

            {/* home needs to be at the bottom as the switch displays the first route that matches the link */}
            <Route path="/">
              <LessonHistoryTable
                lessonHistoryArray={this.state.lessonHistoryArray}
              />
              {/* react bootstrap table here */}
              {/* we want a lessonHistory table below */}
              {/* {this.state.isLoading ? (
                <div id="loadingSpinner">
                  <Spinner animation="border" role="status" variant="primary">
                    <span className="visually-hidden">Loading...</span>
                  </Spinner>
                </div>
              ) : this.state.studentsArray.length > 0 ? (
                <StudentTable studentsArray={this.state.studentsArray} />
              ) : (
                `You don't have any students in your class yet, click add a student`
              )} */}
            </Route>
          </Switch>
        </Router>
      </div>
    );
  }
}

export default PrivateStudentApp;
