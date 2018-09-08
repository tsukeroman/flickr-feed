import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import './Main.css';
import Feed from '../Feed/Feed';
import Explore from '../Explore/Explore';
import Favorites from '../Favorites/Favorites';
import Login from '../Login/Login';

/* 
These functions help us to pass props to components via react router.
In order to use them, we use <PropsRoute> instead of <Route>
*/
const renderMergedProps = (component, ...rest) => {
  const finalProps = Object.assign({}, ...rest);
  return (
    React.createElement(component, finalProps)
  );
}

const PropsRoute = ({ component, ...rest }) => {
  return (
    <Route {...rest} render={routeProps => {
      return renderMergedProps(component, routeProps, rest);
    }}/>
  );
}


/* 
The Main component routes between the different areas in the app, links to all of them 
are in the topbar.
*/ 
class Main extends Component {
  render() {
    return (
      <div className="Main">
          <Switch>
            <PropsRoute exact path='/' component={Feed} Username={this.props.Username} />
            <Route path='/Explore' component={Explore} />
            <PropsRoute path='/Favorites' component={Favorites} Username={this.props.Username} />
            <Route path='/Login' component={Login} />
          </Switch>
      </div>
    );
  }
}

export default Main;
