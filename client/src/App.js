import React, { Component } from 'react';
import { createBrowserHistory } from 'history';
import { Route, Switch, Router } from 'react-router-dom';
import { AuthPage, StartPage, GamePage } from './containers';
import { Toolbar } from './componets';
import './App.css';

class App extends Component {
  componentWillUnmount() {
    localStorage.removeItem('persist:root');
  }

  render() {
    return (
      <div>
        <Router history={createBrowserHistory()}>
          <Toolbar />
          <Switch>
            <Route exact path="/" component={StartPage} />
            <Route exact path="/auth" component={AuthPage} />
            <Route path="/game/:room" component={GamePage} />
          </Switch>
        </Router>
      </div>
    );
  }
}

export default App;
