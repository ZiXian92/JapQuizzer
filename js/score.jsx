import React from 'react';
import RaisedButton from 'material-ui/lib/raised-button';
import { QuizStore } from './quiz-store.js';

const Score = React.createClass({
  getInitialState(){
    return {
      score: QuizStore.getScore()
      maxScore: QuizStore.getMaxScore()
    };
  },
  render(){
    return (
      <div id="score-content" class="white-text">
        <h1>Your score:</h1>
        <h1>{this.state.score} out of {this.state.maxScore}</h1>
        <Link to="/quiz" className="link">
          <RaisedButton label="Try Again" primary={true}></raisedButton>
        </Link>
        <Link to="/create" className="link">
          <RaisedButton label="Start New Quiz" primary={true}
            backgroundColor="white" labelColor="#f44336"></raisedButton>
        </Link>
      </div>
    );
  }
});
