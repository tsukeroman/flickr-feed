import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import './Main.css';
import Feed from '../Feed/Feed';
import Explore from '../Explore/Explore';
import Favorites from '../Favorites/Favorites';
import Login from '../Login/Login';



/* 
The Main component routes between the different areas in the app, links to all of them 
are in the topbar.
*/ 
class Main extends Component {
  render() {
    return (
      <div className="Main">
          <Switch>
            <Route exact path='/' component={Feed} />
            <Route path='/Explore' component={Explore} />
            <Route path='/Favorites' component={Favorites} />
            <Route path='/Login' component={Login} />
          </Switch>
      </div>
    );
  }
}

export default Main;
