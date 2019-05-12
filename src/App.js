import React, { Component } from 'react';
import './App.css';
import NavigationMenu from './components/NavigationMenu';
import Home from './pages/Home';
import Login from './pages/Login';
import BackofficeCategories from './pages/BackofficeCategories';
import BackofficePoints from './pages/BackofficePoints';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { withUserContext } from './context/withUserContext';
import UserProvider from './context/UserProvider';

const ContextLogin = withUserContext(Login)
const AuthenticatedNavigationMenu = withUserContext(NavigationMenu)
const ContextBackofficePoints = withUserContext(BackofficePoints)

class App extends Component {
  state = { loginModalShow: false }
  render() {
    let loginModalClose = () => this.setState({ loginModalShow: false });

    return (
      <UserProvider>
        <Router>
          <AuthenticatedNavigationMenu />
          <Switch>
            <Route exact path='/' component={Home} />
            <Route path='/backoffice_categories' component={BackofficeCategories} />
            <Route path='/backoffice_points' component={ContextBackofficePoints} />
            <Route path='/login' component={ContextLogin} />
          </Switch>
        </Router>
      </UserProvider>
    );
  }
}

export default App;
