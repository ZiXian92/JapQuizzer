import React from 'react';
import { Link } from 'react-router';
import Dialog from 'material-ui/lib/dialog';
import SelectField from 'material-ui/lib/select-field';
import MenuItem from 'material-ui/lib/menus/menu-item';
import TextField from 'material-ui/lib/text-field';
import FlatButton from 'material-ui/lib/flat-button';
import RaisedButton from 'material-ui/lib/raised-button';
import { QuizStore } from './quiz-store.js';

const textFieldContainerStyle = {
  display: 'inline-block',
  width: '49%',
  marginLeft: 'auto',
  marginRight: 'auto'
};

const textFieldStyle = {
  color: 'white'
};

const Create = React.createClass({
  getInitialState(){
    return {
      open: false,
      minutes: 5,
      seconds: 0,
      questions: []
    };
  },

  addQuestion(){
    const newQuestion = {
      qn: this.refs.meaning.getValue(),
      ans: this.refs.answer.getValue()
    };
    this.refs.meaning.clearValue();
    this.refs.answer.clearValue();
    this.refs.answer.blur();
    this.refs.meaning.focus();
    this.state.questions.push(newQuestion);
    this.setState({ question: this.state.questions });
  },

  updateMinutes(e, i, minutes){
    this.setState({ minutes: minutes });
  },

  updateSeconds(e, i, seconds){
    this.setState({ seconds: seconds});
  },

  startQuiz(){
    const qn = this.refs.meaning.getValue().trim();
    const ans = this.refs.answer.getValue().trim();
    if(qn || ans){
      this.state.questions.push({
        qn: qn,
        ans: ans
      });
    }
    if(!this.state.questions.length){
      this.openDialog();
      return;
    }
    QuizStore.setQuiz(this.state.questions);
    QuizStore.setDuration(this.state.minutes, this.state.seconds);
    window.location.href = '#/quiz';
  },

  openDialog(){
    this.setState({ open: true });
  },

  closeDialog(){
    this.setState({ open: false });
  },

  render(){
    var minutesArr = [];
    var secondsArr = [];
    for(var i=0; i<60; i++){
      minutesArr.push((<MenuItem value={i} primaryText={i} />));
      secondsArr.push((<MenuItem value={i} primaryText={i} />));
    }
    const actions = [
      <FlatButton label="Ok" primary={true} onTouchTap={this.closeDialog} />
    ];

    return (
      <div id="create-content" className="white-text">
        <h2 className="centered-text">Fill in the questions(meanings) and correct answers accordingly. Click 'Start' to begin.</h2>
        <div className="bolded">
          <span className="half-width centered-text quiz-list-item">Question</span>
          <span className="half-width centered-text quiz-list-item">Answer</span>
        </div>
        {this.state.questions.map((question, idx) => (
          <div>
            <span className="half-width centered-text quiz-list-item">{question.qn}</span>
            <span className="half-width centered-text quiz-list-item">{question.ans}</span>
          </div>
        ))}
        <div>
          <TextField ref="meaning" floatingLabelText="Meaning" hintText="I"
            hintStyle={textFieldStyle} floatingLabelStyle={textFieldStyle}
            inputStyle={textFieldStyle} style={textFieldContainerStyle}
            onEnterKeyDown={this.addQuestion} />
          <TextField ref="answer" floatingLabelText="Answer" hintText="watashi"
            hintStyle={textFieldStyle} floatingLabelStyle={textFieldStyle}
            inputStyle={textFieldStyle} style={textFieldContainerStyle}
            onEnterKeyDown={this.addQuestion} />
        </div>
        <div className="full-width centered-text">
          <span className="bolded">Time Limit: </span>
          <SelectField value={this.state.minutes} onChange={this.updateMinutes}
            labelStyle={{color: "white"}}>
            {minutesArr}
          </SelectField>
          m
          <SelectField value={this.state.seconds} onChange={this.updateSeconds}
            labelStyle={{color: "white"}}>
            {secondsArr}
          </SelectField>
          s
        </div>
        <div className="full-width centered-text">
          <RaisedButton label="Start" primary={true}
            backgroundColor="#00e676" labelColor="black"
            onTouchTap={this.startQuiz}></RaisedButton>
        </div>
        <Dialog title="Empty Quiz" actions={actions}
          modal={false} open={this.state.open}
          onRequestClose={this.closeDialog}>
          Please provide at least 1 question.
        </Dialog>
      </div>
    );
  }
});

module.exports = {
  Create: Create
};
