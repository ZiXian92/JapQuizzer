import React from 'react';
import Dialog from 'material-ui/lib/dialog';
import FlatButton from 'material-ui/lib/flat-button';
import TextField from 'material-ui/lib/text-field';
import { QuizStore } from './quiz-store.js';

const textFieldStyle = {
  color: 'white'
};

var timer = undefined;

const Quiz = React.createClass({
  componentWillMount(){
    timer = setInterval(() => {
      var mins = this.state.minutes;
      var secs = this.state.seconds;
      if(!secs && !mins){
        clearInterval(timer);
        this.setState({ open: true });
        return;
      }
      if(!secs){
        secs = 60;
        mins--;
      }
      secs--;
      this.setState({
        minutes: mins,
        seconds: secs
      });
    }, 1000);
  },
  getInitialState(){
    const duration = QuizStore.getDuration();
    return {
      open: false,
      counter: 0,
      score: 0,
      minutes: duration.minutes,
      seconds: duration.seconds,
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
      clearInterval(timer);
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
      minutes: QuizStore.getDuration().minutes,
      seconds: QuizStore.getDuration().seconds,
      questions: QuizStore.getQuiz()
    });
    timer = setInterval(() => {
      var mins = this.state.minutes;
      var secs = this.state.seconds;
      if(!secs && !mins){
        clearInterval(timer);
        this.setState({ open: true });
        return;
      }
      if(!secs){
        secs = 60;
        mins--;
      }
      secs--;
      this.setState({
        minutes: mins,
        seconds: secs
      });
    }, 1000);
  },
  startNewQuiz(){
    window.location.href = '#/create';
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
        <h2>Time Remaining:</h2>
        <h2>{this.state.minutes}m {this.state.seconds}s</h2>
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
