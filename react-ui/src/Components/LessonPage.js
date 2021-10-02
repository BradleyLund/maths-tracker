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
      elapsedTime: 0,
    };

    this.startTimer = this.startTimer.bind(this);
    this.countUp = this.countUp.bind(this);
    this.handleStart = this.handleStart.bind(this);
  }

  //   function to handle the start of the quiz
  handleStart() {
    this.startTimer();
    this.setState({ questionCount: this.state.questionCount + 1 });
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
        <div>{this.state.elapsedTime}</div>
        {this.state.questionCount === 0 ? (
          <div>
            <button className="button-66" onClick={this.handleStart}>
              Start Quiz
            </button>
          </div>
        ) : (
          <div>question component</div>
        )}
      </div>
    );
  }
}

export default LessonPage;
