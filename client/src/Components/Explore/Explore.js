import React, { Component } from 'react';
import './Explore.css';
import Search from '../Search/Search';
import Gallery from '../Gallery/Gallery';

class Explore extends Component {
	constructor() {
		super();
		this.state = {
			tag: ' '
		};
	}
	
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
				<Search onSearchChange={this.onSearchChange} />
				<Gallery tag={this.state.tag} />
			</div>
		);
	}
}

export default Explore;
