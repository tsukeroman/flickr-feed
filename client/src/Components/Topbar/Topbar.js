/*
This components is the top bar of the app. When the user is logged the top bar is fixed on the 
top of the page, and it includes links to any area of the app. Since the app uses a react router,
the transition from page to page is very fast. Also, the topbar is responsive to the screen size
*/

import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBars } from '@fortawesome/free-solid-svg-icons'
import './Topbar.css';
import logo from '../../logo.png';

library.add(faBars);

class Topbar extends Component {

  static propTypes = {
    AppLogout: PropTypes.func
  };

  constructor(props) {
    super(props);
    this.state = {
      width: this.getBarWidth(),
      littleWidth: false,
      responsiveBar: false
    }
  }

  componentDidMount() {
    window.addEventListener('resize', this.handleResize);
    this.setState({ width: this.getBarWidth() });
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.handleResize);
    this.isUnmounted = true; // Kills not returned promises
  }

  // this function is responsible for the log-out link at the top bar.
  AppLogout = () => {
    this.props.AppLogout();
  }

  getBarWidth = () => {
    try {
      return document.body.clientWidth;
    } catch (e) {
      return 1000;
    }
  }

  handleResize = () => {
    const width = this.getBarWidth();
    if (width < 700) {
      this.setState({ width: width, littleWidth: true })
    } else {
      this.setState({ width: width, littleWidth: false, responsiveBar: false })
    }
  }

  toggleResponsive = () => {
    this.setState(prevState => ({ responsiveBar: !prevState.responsiveBar}))
  }


  /*
  The topbar is responsive to size changes, i.e. when the screen width is larger then 600px it 
  shows all the links, but whenever the width goes below 600px, the links dissapear and instead 
  it shows an icon which is responsible for showing the links when the user clicks on it
  */
  render() {
    if (this.state.littleWidth === false) {
      return (
      	<div className="Topbar">
      		    <Link to="/">
            		<img src={logo} className="logo" alt="logo" />
            	</Link>
            	<div className="routes">
            		<Link to="/" className="route"> Home </Link>
            		<Link to="/Explore" className="route"> Explore </Link>
                <Link to="/Favorites" className="route"> Favorites </Link>
                <Link to="/Settings" className="settings"> Settings </Link>
            		<Link to="/" className="logout" onClick={this.AppLogout}> Log Out </Link>
            	</div>
  		</div>
      );
    } else {
        return (
          <div className="Topbar">
            <Link to="/">
              <img src={logo} className="logo" alt="logo" />
            </Link>
            <div className="routes">
              <FontAwesomeIcon icon="bars" className='responsive' onClick={this.toggleResponsive} />
              {this.state.responsiveBar ? 
                (
                  <div className='responsiveMenu'>
                      <div>
                        <Link to="/" className='responsiveRoute' onClick={this.toggleResponsive}> Home </Link>
                      </div>
                      <div>
                        <Link to="/Explore" className='responsiveRoute' onClick={this.toggleResponsive}> Explore </Link>
                      </div>
                      <div>
                        <Link to="/Favorites" className='responsiveRoute' onClick={this.toggleResponsive}> Favorites </Link>
                      </div>
                      <div>
                        <Link to="/Settings" className='responsiveRoute'> Settings </Link>
                      </div>
                      <div>
                        <Link to="/" onClick={this.AppLogout} className='responsiveRoute'> Log Out </Link>
                      </div>
                  </div>
                ) : (<div></div>)
              }
            </div>
          </div>
        );
    }
  }
}

export default Topbar;
