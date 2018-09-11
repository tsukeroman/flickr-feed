import React, { Component } from 'react';
import PropTypes from 'prop-types';
import uuid from 'uuid';
import Image from '../Image/Image';
import './Favorites.css';


/*
This component is responsible for fetching the favorites from the server and viewing 
them to the user in the Favorites area. The view is responsive and is sensetive to screen 
size changes.
*/
class Favorites extends Component {
  constructor(props){
    super(props);
    this.state = {
      list: [],
      favoritesWidth: this.getFavoritesWidth()
    }
  }

  static propTypes = {
    Username: PropTypes.string
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

  getFavoritesWidth(){
    try {
      return document.body.clientWidth;
    } catch (e) {
      return 1000;
    }
  }

  getFavorites = () => {
    fetch('/Favorites')
    .then(res => res.json())
    .then(list => this.setState({ list }))
  }

  onRemoveImage = () => {
    this.getFavorites();
  }

  handleResize = () => this.setState({
      favoritesWidth: this.getFavoritesWidth()
  });

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
