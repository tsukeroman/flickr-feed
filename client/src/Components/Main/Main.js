import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import PropTypes from 'prop-types';
import './Main.css';
import Feed from '../Feed/Feed';
import Explore from '../Explore/Explore';
import Favorites from '../Favorites/Favorites';
import Settings from '../Settings/Settings';
import Login from '../Login/Login';

/* 
These two functions are actually stateless components that are designed to help us 
to pass props to components via react router.
In order to use them, we use <PropsRoute> instead of <Route> inside the Switch statement.
More information can be found in this link:
https://github.com/ReactTraining/react-router/issues/4105#issuecomment-289195202
comment by 'tchaffee'
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
This component routes between the different areas in the app when the user is logged in. 
*/ 
class Main extends Component {
  static propTypes = {
    Username: PropTypes.string,
    getWidth: PropTypes.func
  };

  render() {
    return (
      <div className="Main">
          <Switch>
            <PropsRoute exact path='/' component={Feed} Username={this.props.Username} getWidth={this.props.getWidth} />
            <PropsRoute path='/Explore' component={Explore} Username={this.props.Username} getWidth={this.props.getWidth} />
            <PropsRoute path='/Favorites' component={Favorites} Username={this.props.Username} getWidth={this.props.getWidth} />
            <PropsRoute path='/Settings' component={Settings} Username={this.props.Username} />
            <Route path='/Login' component={Login} />
          </Switch>
      </div>
    );
  }
}

export default Main;
