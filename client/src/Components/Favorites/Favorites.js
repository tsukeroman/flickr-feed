import React, { Component } from 'react';
import uuid from 'uuid';
import Image from '../Image/Image';
import './Favorites.css';

class Favorites extends Component {
  constructor(props){
    super(props);
    this.state = {
      list: [],
      favoritesWidth: this.getFavoritesWidth()
    }
  }

  onRemoveImage = () => {
    this.getFavorites();
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

  handleResize = () => this.setState({
      favoritesWidth: this.getFavoritesWidth()
  });

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

  render() {
  	const { list } = this.state;
    return (
      	<div className="Favorites">
	      	<h1>Favorites</h1>
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
