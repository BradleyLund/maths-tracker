import React from "react";
import TextField from "@material-ui/core/TextField";

class Question extends React.Component {
  constructor(props) {
    super(props);

    this.state = { answerInput: "" };

    this.handleInputChange = this.handleInputChange.bind(this);
  }

  handleInputChange(event) {
    this.setState({ answerInput: event.target.value });
  }

  render() {
    return (
      <div>
        <div>Question {this.props.questionCount} of 10</div>
        {/* question in a string which is in state which is passed to this component */}
        <div>{this.props.question}</div>

        {/* mui input box */}
        <TextField
          variant="outlined"
          margin="normal"
          required
          fullWidth
          name="answerInput"
          id="answerInput"
          value={this.state.answerInput}
          onChange={this.handleInputChange}
        />
        <button
          onClick={() => this.props.handleSubmitAnswer(this.state.answerInput)}>
          Submit Answer
        </button>
      </div>
    );
  }
}

export default Question;
