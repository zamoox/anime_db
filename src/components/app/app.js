import React, { Component } from 'react';

import Header from '../header';
import RandomAnime from '../random-anime';
import AnimePage  from '../pages/anime-page';
import ErrorBoundry from '../error-boundry';
import { AnimeProvider } from "../anime-service-context";

import AnimeService, { TestService } from "../../services";

import './app.css';

export default class App extends Component {

  state = {
    service: new AnimeService()
  };

  onServiceChanged = () => {
    this.setState(({service}) => {
      const Service = service instanceof AnimeService ?
                      new TestService(): new AnimeService();
      return {
        service: Service
      }                      
    })      
  }

  render() {
    
    return (
      <ErrorBoundry>
        <AnimeProvider value={this.state.service}>
          <div className="animedb-app">

            <Header onServiceChanged={this.onServiceChanged}/>
            <RandomAnime/>
            <AnimePage />
            
          </div>
        </AnimeProvider>
      </ErrorBoundry>
    );
  }
}
