import React from 'react';
import Dialog from 'material-ui/lib/dialog';
import FlatButton from 'material-ui/lib/flat-button';
import TextField from 'material-ui/lib/text-field';
import { QuizStore } from './quiz-store.js';

const textFieldStyle = {
  color: 'white'
};

const Quiz = React.createClass({
  getInitialState(){
    return {
      open: false,
      counter: 0,
      score: 0,
      questions: QuizStore.getQuiz()
    };
  },
  answer(){
    const qIdx = this.state.counter;
    const correctAnswer = this.state.questions[qIdx].ans;
    const ans = this.refs.answer.getValue();
    const curScore = this.state.score+(ans===correctAnswer);
    this.refs.answer.clearValue();
    this.setState({ score: curScore });
    if((qIdx+1)===this.state.questions.length){
      this.setState({ open: true });
    } else {
      this.setState({
        counter: qIdx+1
      });
    }
  },
  restartQuiz(){
    this.setState({
      open: false,
      counter: 0,
      score: 0,
      questions: QuizStore.getQuiz()
    });
  },
  startNewQuiz(){
    window.location.href = '/#/create';
  },
  render(){
    const actions = [
      <FlatButton label="Try Again" secondary={true}
        onTouchTap={this.restartQuiz} />,
      <FlatButton label="Start New Quiz" primary={true}
        onTouchTap={this.startNewQuiz} />
    ];
    return (
      <div id="quiz-content" className="white-text">
        <h3>{this.state.questions[this.state.counter].qn}</h3>
        <TextField ref="answer" floatingLabelText="Answer"
          floatingLabelStyle={textFieldStyle}
          inputStyle={textFieldStyle}
          onEnterKeyDown={this.answer} />
        <Dialog title="Your Score" modal={true}
          open={this.state.open} actions={actions}>
          {this.state.score} out of {this.state.questions.length}
        </Dialog>
      </div>
    );
  }
});

module.exports = {
  Quiz: Quiz
};
