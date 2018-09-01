import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './Topbar.css';
import logo from '../../logo.png';

class Topbar extends Component {
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
          		<Link to="/Login" className="log"> Log Log </Link>
          	</div>
		</div>
    );
  }
}

export default Topbar;