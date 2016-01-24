import React from 'react';
import { render } from 'react-dom';
import injectTapEventPlugin from 'react-tap-event-plugin';
import { Router, Route, IndexRoute, hashHistory } from 'react-router';
import { Header } from './header.jsx';
import { Home } from './home.jsx';
import { Create } from './create.jsx';

import { Quiz } from './quiz.jsx';
import { About } from './about.jsx';

injectTapEventPlugin();

const App = React.createClass({
  render(){
    return (
      <div>
        <Header></Header>
        {this.props.children}
      </div>
    );
  }
});

render((
  <Router history={hashHistory}>
    <Route path="/" component={App}>
      <IndexRoute component={Home} />
      <Route path="create" component={Create} />
      <Route path="quiz" component={Quiz} />
      <Route path="about" component={About} />
    </Route>
  </Router>
), document.getElementById('content'));
