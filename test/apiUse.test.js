let app = require("../server/index.js");
let expect = require("chai").expect;
let request = require("request");

// Test that the server is up and running

describe("Backend is online responds when logging in", () => {
  it("Backend responds to a call", function (completed) {
    request("http://localhost:5000/api", function (error, response, body) {
      expect(response.statusCode).to.equal(200);
      completed();
    });
  });
});
