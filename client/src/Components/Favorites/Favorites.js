import React, { Component } from 'react';
import PropTypes from 'prop-types';
import uuid from 'uuid';
import Image from '../Image/Image';
import './Favorites.css';


/*
  This component is responsible for fetching the favorites from the server and viewing 
  them to the user in the Favorites area. The view is responsive to screen size changes.
*/
class Favorites extends Component {
  constructor(props){
    super(props);
    this.state = {
      list: [],
      favoritesWidth: this.props.getWidth()
    }
  }

  static propTypes = {
    Username: PropTypes.string,
    getWidth: PropTypes.func
  };

  componentDidMount() {
    window.addEventListener('resize', this.handleResize);
    this.getFavorites();
    this.setState({
      favoritesWidth: document.body.clientWidth
    });
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.handleResize);
    this.isUnmounted = true; // Kills not returned promises
  }

  // This function fetches user's favorites list and puts it in the state
  getFavorites = () => {
    fetch('/Favorites')
    .then(res => res.json())
    .then(list => this.setState({ list }))
  }

  // This function calls to getFavorites after the user had removed an image
  // from favorites
  onRemoveImage = () => {
    this.getFavorites();
  }

  // This handler is called every time that the screen size changes
  handleResize = () => this.setState({
      favoritesWidth: this.props.getWidth()
  });

  // React keeps track of the object in the DOM, so it needs that we'll use an 
  // unique key id for every element that we render by Array.map method, and we 
  // use the uuid package for generating such unique id's.
  render() {
    const { list } = this.state;
    return (
        <div className="Favorites">
          <h2>Take a look at the images you have liked</h2>
          <div className="FromServer">    
          {list.map((item) => {
                  return(
                      <Image 
                        dto={item} 
                        key={uuid.v4()} 
                        screenWidth={this.state.favoritesWidth} 
                        base='Favorites' 
                        onRemoveImage={this.onRemoveImage}
                      />
                  );
              })}
          </div>
      </div>
    );
  }
}

export default Favorites;
