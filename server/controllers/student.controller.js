const Student = require("../models/student.model");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");

function isAuthenticated(req, res) {
  let authHeader = req.headers["authorization"];
  let token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
    return decoded;
  } catch (err) {
    res.send("badtoken");
  }
}

module.exports = {
  createANewStudent: function (req, res) {
    // can use a findone method here and if the username is found then respond with no you cannot create a new username with this username
    Student.findOne({ username: req.body.username }).exec(function (
      error,
      student
    ) {
      if (error) {
        //   error with the mongoose findone function
        res.send("error with the mongoose findone function");
      } else if (!student) {
        //   no username with that name found

        let fullName = `${req.body.firstName} ${req.body.surname}`;

        let studentModel = new Student({
          username: req.body.username,
          password: req.body.password,
          difficultyLevel: req.body.difficultyLevel,
          fullName: fullName,
          teacherID: req.body.teacherID,
        });

        studentModel.save(function (error, student) {
          if (error) {
            res.send("error saving the student");
          } else {
            // Make the JWT Token that will be sent to the client side
            res.status(200).send({
              username: student.username,
              token: student.getSignedJwtToken(),
            });
          }
        });
      } else {
        // username found and need to respond with that username already exists
        res.status(401).send("that username already exists, try another one");
      }
    });
  },
  submitLessonResults: function (req, res) {
    console.log("first test route");
    // here we will receive the difficulty level, date, score and time spent for a lesson done by the student
    let userObject = isAuthenticated(req, res);

    // we need to find the student
    Student.findOne({ username: req.body.username }).exec(function (
      error,
      student
    ) {
      if (error) {
        //   error with the mongoose findone function
        res.status(401).send("error with the mongoose findone function");
      } else if (!student) {
        //   no username with that name found
        res.status(401).send("no username with that name found");
      } else {
        //   found the student and now need to add to the lessonhistory array
        student.toDoArray.push({ date: Date.now() });
        // // // save the user
        user.save(function (error, data) {
          if (error) {
            console.log(error);
            res.send("some error ocurred while adding the todo");
          } else {
            // maybe send back in res.json (username and the todoarray? or just the todoarray)
            res.send(data.toDoArray);
          }
        });
      }
    });
  },

  getTeachersClass: function (req, res) {
    // we will have the auth token in the header here, so we send it to the isauthenticated function to get the teacher username
    // then we find them in the teachers model and get their list of students ID's
    // then we get each of the students data and pass it all back one time in a big object for the teacher, make an array of objects with
    // the data from the wirefram mock up
    let userObject = isAuthenticated(req, res);
    console.log(userObject);

    Student.find({ teacherID: userObject.teacherID }).exec(function (
      error,
      student
    ) {
      if (error) {
        //   error with the mongoose findone function
        res.status(401).send("error with the mongoose findone function");
      } else if (!student) {
        //   no username with that name found
        res.status(401).send("no username with that name found");
      } else {
        //   found the teacher and now comparing
        res.send(student);
      }
    });
  },
  getStudentHistory: function (req, res) {
    // we will have the auth token in the header here, so we send it to the isauthenticated function to get the teacher username
    // then we find them in the teachers model and get their list of students ID's
    // then we get each of the students data and pass it all back one time in a big object for the teacher, make an array of objects with
    // the data from the wirefram mock up

    let userObject = isAuthenticated(req, res);

    Student.findOne({ username: userObject.username }).exec(function (
      error,
      student
    ) {
      if (error) {
        //   error with the mongoose findone function
        res.status(401).send("error with the mongoose findone function");
      } else if (!student) {
        //   no username with that name found
        res.status(401).send("no username with that name found");
      } else {
        //   found the teacher and now comparing
        res.send(student);
      }
    });
  },

  loginStudent: function (req, res) {
    Student.findOne({ username: req.body.username }).exec(function (
      error,
      student
    ) {
      if (error) {
        //   error with the mongoose findone function
        res.status(401).send("error with the mongoose findone function");
      } else if (!student) {
        //   no username with that name found
        res.status(401).send("no username with that name found");
      } else {
        //   found the username and now comparing
        student.comparePassword(
          req.body.password,
          function (matchError, isMatch) {
            if (matchError) {
              //   error with the compare function
              res.status(401).send("error with the compare function");
            } else if (!isMatch) {
              //   the password did not match, please re enter your password
              res
                .status(401)
                .send(
                  "the password did not match, please re enter your password"
                );
            } else {
              //   the password did match welcom you are logged in
              // make the token and send back the user id
              res.status(200).send({
                username: student.username,
                token: student.getSignedJwtToken(),
                isTeacher: false,
              });
            }
          }
        );
      }
    });
  },
};
