import React, { Component } from 'react';

import Header from '../header';
import RandomAnime from '../random-anime';
import AnimePage  from '../pages/anime-page';
import ErrorBoundry from '../error-boundry';
import { SwapiProvider } from "../swapi-service-context";

import SwapiService, { TestService } from "../../services";

import './app.css';

export default class App extends Component {

  state = {
    service: new SwapiService()
  };

  onServiceChanged = () => {
    this.setState(({service}) => {
      const Service = service instanceof SwapiService ?
                      new TestService(): new SwapiService();
      return {
        service: Service
      }                      
    })      
  }

  render() {
    
    return (
      <ErrorBoundry>
        <SwapiProvider value={this.state.service}>
          <div className="animedb-app">

            <Header onServiceChanged={this.onServiceChanged}/>
            <RandomAnime/>
            <AnimePage />
            
          </div>
        </SwapiProvider>
      </ErrorBoundry>
    );
  }
}
