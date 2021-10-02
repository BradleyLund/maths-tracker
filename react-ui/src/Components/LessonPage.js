import React from "react";
import Question from "./Question";

// welcome to your next lesson, we need to set up a react timer like from minesweeper
// generate a random question, once they are finished they can click finish lesson and that will post all the results to the backend
// declare the coutUpTimer variable so that when we clearinterval it is accessible by the handle submit answer function
var countUpTimer;
// andthey can click submit answer which will take them to the next randomly generate question depending on the difficulty level they have.
// set the state of the difficulty level in the private student app
class LessonPage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      questionCount: 0,
      correctCount: 0,
      elapsedTime: 0,
      question: "3 x 6",
      answer: 18,
    };

    this.startTimer = this.startTimer.bind(this);
    this.countUp = this.countUp.bind(this);
    this.handleStart = this.handleStart.bind(this);
    this.handleSubmitAnswer = this.handleSubmitAnswer.bind(this);
  }

  //   function to handle the next question when they submit an answer
  handleSubmitAnswer(answer) {
    // handle if it was the tenth question then submit the results to the DB and display the results for the kiddo
    if (this.state.questionCount === 10) {
      // send results to Db, display results for the quiz, I can display results in the UI
      //   clear interval
      clearInterval(countUpTimer);
    }
    this.setState({ questionCount: this.state.questionCount + 1 });
    // change the question to the next question
    let intAnswer = parseInt(answer);

    if (intAnswer === this.state.answer) {
      this.setState({ correctCount: this.state.correctCount + 1 });
    } else {
      alert("incorrect");
    }
    // change the answer to the answer received from the generated question
  }

  //   function to handle the start of the quiz
  handleStart() {
    this.startTimer();
    this.setState({ questionCount: this.state.questionCount + 1 });
    // change the first question by generating a question

    // change the answer to be the answer to the generated question
  }

  // start the elapsed time clock
  startTimer() {
    // run the countup function which adds one to the elapsedtime and setinterval to run every second
    countUpTimer = setInterval(this.countUp, 1000);
  }

  // add 1 second to the clock after each second
  countUp() {
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
        ) : this.state.questionCount === 11 ? (
          <div>
            Here are your results you got {this.state.correctCount} out of 10
          </div>
        ) : (
          <Question
            questionCount={this.state.questionCount}
            handleSubmitAnswer={this.handleSubmitAnswer}
            question={this.state.question}
          />
        )}
      </div>
    );
  }
}

export default LessonPage;
