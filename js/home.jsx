import React from 'react';
import { Link } from 'react-router';
import RaisedButton from 'material-ui/lib/raised-button';

const Home = React.createClass({
  render(){
    return (
      <div id="home-content">
        <h2 className="white-text">Need help remembering Japanese vocabulary? Drill yourself with speed quizzes until you are satisfied. Test yourself only on what you need to remember.</h2>
        <Link to="/create" className="link"><RaisedButton label="Start a Quiz" primary={true}></RaisedButton></Link>
      </div>
    );
  }
});

module.exports = {
  Home: Home
};
