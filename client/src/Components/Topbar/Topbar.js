import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBars } from '@fortawesome/free-solid-svg-icons'
import './Topbar.css';
import logo from '../../logo.png';

library.add(faBars); //adding an icon from FontAwesome to it's library


/*
This components is the top bar of the app. When the user is logged the top bar is fixed on the 
top of the page, and it includes links to any area of the app and the logout button. Since the app 
uses a react router, the transition from page to page is very fast. Also, the topbar is responsive 
to the screen size, i.e. when screen size goes below 700px, all the links dissapear and a menu 
button appears on the right corner of the bar. 
*/
class Topbar extends Component {

  static propTypes = {
    AppLogout: PropTypes.func
  };

  constructor(props) {
    super(props);
    this.state = {
      width: this.screenWidth(),
      littleWidth: false,
      responsiveBar: false
    }
  }


  // This function is responsible for checking the screen width in order to 
  // optimally fit the images size to the screen
  screenWidth = () => {
    try {
      return document.body.clientWidth;
    } catch (err) {
      return 950;
    }
  }

  componentDidMount() {
    window.addEventListener('resize', this.handleResize);
    this.setState({ width: this.screenWidth() });
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.handleResize);
    this.isUnmounted = true; // Kills not returned promises
  }

  // This function is responsible for the log-out link at the top bar.
  AppLogout = () => {
    this.props.AppLogout();
  }

  // This function is the 'resize' event handler. It is responsible for updating the state 
  // with the current screen width after every resize, and also updates 'littleWidth' in the 
  // state to true if the width went below 700px
  handleResize = () => {
    const width = this.screenWidth();
    if (width < 700) {
      this.setState({ width: width, littleWidth: true })
    } else {
      this.setState({ width: width, littleWidth: false, responsiveBar: false })
    }
  }

  // This function toggles 'responsiveBar' value in the state, which is responsible for showing
  // and hiding the menu when the user clicks on the menu button when the screen width is 
  // under 700px
  toggleResponsive = () => {
    this.setState(prevState => ({ responsiveBar: !prevState.responsiveBar}))
  }


  /*
  The topbar is responsive to size changes, i.e. when the screen width is larger then 700px it 
  shows all the links, but whenever the width goes below 700px, the links dissapear and instead 
  it shows a button which is responsible for showing the links whenever the user clicks on it
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
