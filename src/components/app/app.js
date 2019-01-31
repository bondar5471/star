import React, { Component } from 'react';

import Header from '../header';
import RandomPlanet from '../random-planet';
import ErrorBoundry from '../error-boundry';
import { SwapiServiceProvider } from '../swapi-service-context'
import SwapiService from "../../services/swapi-service";
import DummySwapiService from '../../services/dummy-swapi-service'
import { PeoplePage, 
         PlanetPage, 
         StarshipPage,
         LoginPage,
         SecretPage } from '../pages'

import './app.css';

import {BrowserRouter as Router, Switch, Route, Redirect} from 'react-router-dom'
import { StarshipDetails } from '../sw-components';


export default class App extends Component {

  state = {
    swapiService: new SwapiService(),
    isLoggedIn: false
  };

  onLogin = () => {
    this.setState({
      isLoggedIn: true
    })
  }

  onServiceCgange = () => {
    this.setState(({ swapiService }) => {
      const Service = swapiService instanceof SwapiService ?
        DummySwapiService : SwapiService
      console.log(Service.name)

      return {
        swapiService: new Service()
      }
    })
  }

  render() {
    const  {isLoggedIn} = this.state
    return (

      <SwapiServiceProvider value={this.state.swapiService} >
        <ErrorBoundry>
        <Router>  
          <div className="stardb-app">
            <Header onServiceCgange={this.onServiceCgange} />
            <RandomPlanet/>
              <Switch>
              <Route path="/" 
                    render = {()=> <h2>Welcome to Star-DB</h2>} 
                    exact={true}/>
              <Route path="/people/:id?" component={PeoplePage} />
              <Route path="/planets" component={PlanetPage} />
              <Route path="/starships" exact component={StarshipPage} />
              <Route path="/starships/:id" 
                    render= {({match})=>{
                      const { id } = match.params;
                      return (
                        <StarshipDetails itemId={id} />
                      )
                    }}/>
              <Route 
              path="/login" 
              render={()=>(
                <LoginPage isLoggedIn={isLoggedIn} 
                            onLogin={this.onLogin}/>
                )} 
                /> 
              <Route path="/secret"
              render={()=>(
                <SecretPage isLoggedIn={isLoggedIn} />)} />      
            <Route render={()=> <h2 className="jumbotron">404 PAGE NOT FOUND</h2>}/>
            </Switch>
          </div>
          </Router>
        </ErrorBoundry>
      </SwapiServiceProvider>

    );
  }
}
