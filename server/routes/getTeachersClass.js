module.exports = function (app) {
  const teacher = require("../controllers/teacher.controller.js");
  app.get("/getteachersclass", teacher.getTeachersClass);
};
