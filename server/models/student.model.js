const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// I used a tutorial at this website to implement saving the password as a hash and implementing comparison function
// https://coderrocketfuel.com/article/store-passwords-in-mongodb-with-node-js-mongoose-and-bcrypt

// create a subschema for the todo list array, this will allow us to save the todolist item and let it have an id for deleting
let lessonHistorySubSchema = mongoose.Schema({
  date: Date,
  difficultyLevel: Number,
  score: Number,
  totalTime: Date,
});

let StudentSchema = mongoose.Schema({
  username: String,
  password: String,
  difficultyLevel: Number,
  fullname: String,
  teacherID: String,
  lessonHistoryArray: [lessonHistorySubSchema],
});

StudentSchema.pre("save", function (next) {
  const student = this;

  if (this.isModified("password") || this.isNew) {
    bcrypt.genSalt(10, function (saltError, salt) {
      if (saltError) {
        console.log(saltError);
        return next(saltError);
      } else {
        bcrypt.hash(student.password, salt, function (hashError, hash) {
          if (hashError) {
            console.log(hashError);
            return next(hashError);
          }

          student.password = hash;
          next();
        });
      }
    });
  } else {
    return next();
  }
});

StudentSchema.methods.comparePassword = function (password, callback) {
  bcrypt.compare(password, this.password, function (error, isMatch) {
    if (error) {
      return callback(error);
    } else {
      callback(null, isMatch);
    }
  });
};

StudentSchema.methods.getSignedJwtToken = function () {
  return jwt.sign(
    JSON.stringify({ username: this.username, isTeacher: false }),
    process.env.ACCESS_TOKEN_SECRET,
    { algorithm: "HS256" }
  );
};

module.exports = mongoose.model("Students", StudentSchema);
