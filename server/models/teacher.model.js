const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// I used a tutorial at this website to implement saving the password as a hash and implementing comparison function
// https://coderrocketfuel.com/article/store-passwords-in-mongodb-with-node-js-mongoose-and-bcrypt

// create a subschema for the todo list array, this will allow us to save the todolist item and let it have an id for deleting
let studentSubSchema = mongoose.Schema({
  studentID: String,
});

let TeacherSchema = mongoose.Schema({
  username: String,
  password: String,
  studentsArray: [studentSubSchema],
});

TeacherSchema.pre("save", function (next) {
  const teacher = this;

  if (this.isModified("password") || this.isNew) {
    bcrypt.genSalt(10, function (saltError, salt) {
      if (saltError) {
        console.log(saltError);
        return next(saltError);
      } else {
        bcrypt.hash(teacher.password, salt, function (hashError, hash) {
          if (hashError) {
            console.log(hashError);
            return next(hashError);
          }

          teacher.password = hash;
          next();
        });
      }
    });
  } else {
    return next();
  }
});

TeacherSchema.methods.comparePassword = function (password, callback) {
  bcrypt.compare(password, this.password, function (error, isMatch) {
    if (error) {
      return callback(error);
    } else {
      callback(null, isMatch);
    }
  });
};

TeacherSchema.methods.getSignedJwtToken = function () {
  return jwt.sign(
    // added the isTeacher boolean into the auth token, this might change the expected output of the auth function in the controller
    JSON.stringify({ username: this.username, isTeacher: true }),
    process.env.ACCESS_TOKEN_SECRET,
    { algorithm: "HS256" }
  );
};

module.exports = mongoose.model("Teachers", TeacherSchema);