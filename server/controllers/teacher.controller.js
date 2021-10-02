const Teacher = require("../models/teacher.model");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");

function isAuthenticated(req, res) {
  let authHeader = req.headers["authorization"];
  let token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
    return decoded;
  } catch (err) {
    res.status(401).send("badtoken");
  }
}

module.exports = {
  createANewTeacher: function (req, res) {
    // can use a findone method here and if the username is found then respond with no you cannot create a new username with this username
    Teacher.findOne({ username: req.body.username }).exec(function (
      error,
      teacher
    ) {
      if (error) {
        //   error with the mongoose findone function
        res.send("error with the mongoose findone function");
      } else if (!teacher) {
        //   no username with that name found

        let teacherModel = new Teacher({
          username: req.body.username,
          password: req.body.password,
          studentsArray: [],
        });

        teacherModel.save(function (error, teacher) {
          if (error) {
            res.send("error saving the teacher");
          } else {
            // Make the JWT Token that will be sent to the client side
            res.status(200).send({
              username: teacher.username,
              token: teacher.getSignedJwtToken(),
            });
          }
        });
      } else {
        // username found and need to respond with that username already exists
        res.status(401).send("that username already exists, try another one");
      }
    });
  },

  getTeachersClass: function (req, res) {
    // we will have the auth token in the header here, so we send it to the isauthenticated function to get the teacher username
    // then we find them in the teachers model and get their list of students ID's
    // then we get each of the students data and pass it all back one time in a big object for the teacher, make an array of objects with
    // the data from the wirefram mock up

    let userObject = isAuthenticated(req, res);

    Teacher.findOne({ username: userObject.username }).exec(function (
      error,
      teacher
    ) {
      if (error) {
        //   error with the mongoose findone function
        res.status(401).send("error with the mongoose findone function");
      } else if (!teacher) {
        //   no username with that name found
        res.status(401).send("no username with that name found");
      } else {
        //   found the teacher and now comparing
        res.send(teacher.studentsArray);
      }
    });
  },

  authorizeTeacher: function (req, res) {
    let userObject = isAuthenticated(req, res);

    res.send(userObject);
  },

  loginTeacher: function (req, res) {
    Teacher.findOne({ username: req.body.username }).exec(function (
      error,
      teacher
    ) {
      if (error) {
        //   error with the mongoose findone function
        res.status(401).send("error with the mongoose findone function");
      } else if (!teacher) {
        //   no username with that name found
        res.status(401).send("no username with that name found");
      } else {
        //   found the username and now comparing
        teacher.comparePassword(
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
                username: teacher.username,
                token: teacher.getSignedJwtToken(),
                isTeacher: true,
              });
            }
          }
        );
      }
    });
  },
};
