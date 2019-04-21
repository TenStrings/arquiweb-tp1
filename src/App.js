import React, { Component } from 'react';
import './App.css';
import NavigationMenu from './components/NavigationMenu';
import Home from './pages/Home';
import Login from './pages/Login';
import BackOffice from './pages/Backoffice';

import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

class App extends Component {
  state = {}
  render() {
    return (
      <Router>
        <NavigationMenu />
        <Switch>
          <Route exact path='/' component={Home} />
          <Route path='/login' component={Login} />
          <Route path='/backoffice' component={BackOffice} />
        </Switch>
      </Router>
    );
  }
}

export default App;
