import React, { Component } from 'react';
import './App.css';
import NavigationMenu from './components/NavigationMenu';
import Home from './pages/Home';
import Login from './pages/Login';
import BackofficeCategories from './pages/BackofficeCategories';
import BackofficePoints from './pages/BackofficePoints';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

class App extends Component {
  state = { loginModalShow: false }
  render() {
    let loginModalClose = () => this.setState({ loginModalShow: false });

    return (
      <Router>
        <NavigationMenu />
        <Switch>
          <Route exact path='/' component={Home} />
          <Route path='/backoffice_categories' component={BackofficeCategories} />
          <Route path='/backoffice_points' component={BackofficePoints} />
          <Route path='/login' component={Login} />
        </Switch>
      </Router>
    );
  }
}

export default App;
