module.exports = function (app) {
  const teacher = require("../controllers/teacher.controller.js");
  app.post("/login", teacher.loginTeacher);
};
