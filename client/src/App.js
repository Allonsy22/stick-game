import React, { Component } from 'react';
import { createBrowserHistory } from 'history';
import { Route, Switch, Router } from 'react-router-dom';
import { AuthPage, StartPage } from './containers';
import './App.css';

class App extends Component {
  render() {
    return (
      <div>
        <Router history={createBrowserHistory()}>
          <Switch>
            <Route exact path="/" component={StartPage} />
            <Route exact path="/auth" component={AuthPage} />
          </Switch>
        </Router>
      </div>
    );
  }
}

export default App;
