import React from 'react';

const About = React.createClass({
  render(){
    return (
      <div id="about-content" className="white-text">
        <h3>Hi, I am Zi Xian. This site was created during Hack n Roll 2016 after wasting much time thinking of ideas and then realising that
        I have yet to prepare for my Japanese language vocabulary quiz which is on the next day. Hope this will be useful in helping you
        memorise Japanese language better.</h3>
      </div>
    );
  }
});

module.exports = {
  About: About
};
