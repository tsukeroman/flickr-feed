/*
This component is responsible for the Explore area of the app. On it's top there is a search field,
represented by the Search component, and below the search there is the Gallery component which shows
the images that was fetched from Flickr accordingly to the search value.
It's a good practise to have such a "container" component for search and gallery, since it allows us
to add more complexed features to each of them and keep the code organaized.
*/

import React, { Component } from 'react';
import './Explore.css';
import Search from '../Search/Search';
import Gallery from '../Gallery/Gallery';

class Explore extends Component {

	constructor() {
		super();
		this.state = {
			tag: ''
		};
	}
	
	/* this function is responsible for passing the search value to the gallery, but it does it 
	   in a delayed manner, i.e. it waits 0.5sec after the user stops typing before it looks 
	   for the image it's a good practise that helps us to avoid unnecessary calls to a remote 
	   API after each key press
	*/
	onSearchChange = (value) => {
    if (this.typingTimeout) {
      clearTimeout(this.typingTimeout);
    }
    this.typingTimeout = setTimeout(function() {
      this.setState({ tag: value })
      }.bind(this), 500);
  	};

	render() {
		return (
			<div className="Explore">
				<Search onSearchChange={this.onSearchChange} onSuggestion={this.state.tag} />
				<div className='Suggestions'> 
					<button className='sug button' onClick={()=>this.setState({tag: 'culture'})}>Culture</button>
					<button className='sug button' onClick={()=>this.setState({tag: 'science'})}>Science</button>
					<button className='sug button hide4' onClick={()=>this.setState({tag: 'music'})}>Music</button>
					<button className='sug button hide3' onClick={()=>this.setState({tag: 'business'})}>Business</button>
					<button className='sug button hide2' onClick={()=>this.setState({tag: 'sports'})}>Sports</button>
					<button className='sug button hide1' onClick={()=>this.setState({tag: 'tourism'})}>Tourism</button>
				</div>
				<Gallery tag={this.state.tag} />
			</div>
		);
	}
}

export default Explore;
