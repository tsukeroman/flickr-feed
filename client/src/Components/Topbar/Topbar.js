import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import './Topbar.css';
import logo from '../../logo.png';

class Topbar extends Component {

  static propTypes = {
    AppLogout: PropTypes.func
  };

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
