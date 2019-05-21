import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import './App.css';
import Home from './pages/Home';
import Login from './pages/Login';
import BackofficePoints from './pages/BackofficePoints';
import BackofficeCategories from './pages/BackofficeCategories';
import BackofficeSugCategories from './pages/BackofficeSugCategories';
import NavigationMenu from './components/NavigationMenu';

import { withUserContext } from './context/withUserContext';
import UserProvider from './context/UserProvider';
import { poiAPI, categoriesAPI } from './api';
import axios from 'axios'

const ContextLogin = withUserContext(Login)
const AuthenticatedNavigationMenu = withUserContext(NavigationMenu)
const ContextBackofficePoints = withUserContext(BackofficePoints) //para que neceista contexto el back? si ya sabemos que es admin
const ContextBackofficeCategories = withUserContext(BackofficeCategories) //para que neceista contexto el back? si ya sabemos que es admin

//rest en nuestro caso es solo path= pero hay mas atributos
//que se le pueden pasar a Route
/*
const FadingRoute = ({ component: Component, ...rest }) => (
  <Route {...rest} render={props => (
    <FadeIn>
      <Component {...props}/>
    </FadeIn>
  )}/>
)*/

class App extends Component {

  state = {
    loginModalShow: false,
    points: [],
    categories: []
  }

  componentDidMount() {

    this.loadPointsFromAPI()
    this.loadCategoriesFromAPI()

  }

  loadPointsFromAPI = () => poiAPI.all()
    .then(res => {
      //console.log(res.data);
      this.setState({ points: res.data });
    });

  loadCategoriesFromAPI = () => categoriesAPI.all()
    .then(res => {
      //console.log(res.data);pointId
      this.setState({ categories: res.data });
    });

  onPointChange = () => {
    console.log("OnPointChange")
    this.loadPointsFromAPI()
  }

  onCategoryChange = () => {
    //TO DO: Hacer una especie de join?
    this.loadCategoriesFromAPI()
    //Porque si le cambias el nombre a la categoria le cambia el atr categorytName a todos sus puntos
    this.loadPointsFromAPI()
  }

  getPoints = () => poiAPI.all().then(points => this.setState({ points: points }))

  getCategories = () => categoriesAPI.all().then(
    categories => this.setState({ categories: categories })
  )

  //<Route path='/backoffice_points' component={ContextBackofficePoints} />
  render() {
    const { points, categories } = this.state;
    const visiblePoints = points.filter(p => p.visible)
    const visibleCategories = categories.filter(c => c.visible)

    return (
      <UserProvider>
        <Router>
          <AuthenticatedNavigationMenu />
          <Switch>

            <Route exact path='/' render={props => (
              <Home
                points={visiblePoints}
                categories={visibleCategories}
                notifyPointChange={this.onPointChange}
              />
            )} />

            {points.length > 0 && categories.length > 0 &&
              <Route path="/backoffice_points" render={props => (
                <ContextBackofficePoints
                  points={points}
                  categories={categories}
                  notifyPointChange={this.onPointChange}
                />
              )} />
            }

            <Route path='/backoffice_approved_categories' component={props => (
              <ContextBackofficeCategories
                categories={categories}
                notifyCategoryChange={this.onCategoryChange}
              />
            )} />

            <Route
              path='/backoffice_suggested_categories'
              component={BackofficeSugCategories}
            />

            <Route path='/login' component={ContextLogin} />

          </Switch>
        </Router>
      </UserProvider>
    );
  }
}

export default App;
