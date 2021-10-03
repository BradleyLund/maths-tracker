let app = require("./index.js");
let expect = require("chai").expect;
let request = require("request");

// Test that the server is up and running

describe("Backend is online and itunes responds", () => {
  it("Backend responds to a call", function (completed) {
    request("http://localhost:5000/", function (error, response, body) {
      expect(response.statusCode).to.equal(200);
      completed();
    });
  });

  // //   Testing an api call to the itunes api
  // it("fetches data from the itunes API", () => {
  //   request(
  //     `https://itunes.apple.com/search?term=yellow+submarine&media=movie&limit=20`,
  //     function (error, response, body) {
  //       expect(response.statusCode).to.equal(200);
  //     }
  //   );
  // });
});
