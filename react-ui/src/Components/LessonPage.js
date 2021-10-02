import React from "react";

// welcome to your next lesson, we need to set up a react timer like from minesweeper
// generate a random question, once they are finished they can click finish lesson and that will post all the results to the backend

// andthey can click submit answer which will take them to the next randomly generate question depending on the difficulty level they have.
// set the state of the difficulty level in the private student app
class LessonPage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      questionCount: 0,
      correctCount: 0,
      elapsedTime: null,
    };

    this.startTimer = this.startTimer.bind(this);
    this.countUp = this.countUp.bind(this);
  }

  // start the elapsed time clock
  startTimer() {
    // run the countup function which adds one to the elapsedtime and setinterval to run every second
    setInterval(this.countUp, 1000);
  }

  // add 1 second to the clock after each second
  countUp() {
    // check if game is lost already, then don't count up otherwise carry on ticking
    this.setState(({ elapsedTime }) => ({ elapsedTime: elapsedTime + 1 }));
  }
  render() {
    return (
      <div id="lessonPageContainer">
        Welcome to your next lesson {this.props.username}{" "}
        <button onClick={this.startTimer}>Start Quiz</button>
        <div>{this.state.elapsedTime}</div>
      </div>
    );
  }
}

export default LessonPage;
