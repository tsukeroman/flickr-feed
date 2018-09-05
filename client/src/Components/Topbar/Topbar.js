/*
This components is the top bar of the app. When the user is logged the top bar is fixed on the 
top of the page, and it includes links to any area of the app. Since the app uses a react router,
the transition from page to page is very fast
*/

import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import './Topbar.css';
import logo from '../../logo.png';

class Topbar extends Component {

  static propTypes = {
    AppLogout: PropTypes.func
  };

  // this function is responsible for the log-out link at the top bar.
  AppLogout = () => {
    this.props.AppLogout();
  }

  render() {
    return (
    	<div className="Topbar">
    		    <Link to="/">
          		<img src={logo} className="logo" alt="logo" />
          	</Link>
          	<div className="routes">
          		<Link to="/" className="route"> Home </Link>
          		<Link to="/Explore" className="route"> Explore </Link>
              <Link to="/Favorites" className="route"> Favorites </Link>
          		<Link to="/" className="logout" onClick={this.AppLogout}> Log Out </Link>
          	</div>
		</div>
    );
  }
}

export default Topbar;
