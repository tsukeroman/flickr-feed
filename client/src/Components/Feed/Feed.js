import React, { Component } from 'react';
import './Feed.css';

class Feed extends Component {

  constructor(props){
    super(props);
    this.state = {
      list: []
    }
  }

  componentDidMount() {
    this.getList();
  }

  getList = () => {
    fetch('/api/getList')
    .then(res => res.json())
    .then(list => this.setState({ list }))
  }

  render() {
  	const { list } = this.state;
    return (
      	<div className="Feed">
	      	Feed
	      	<div className="FromServer">
		      	<h1>List of Items</h1>
		      	<div>
			      	{list.length ? (
			      		<div>
			      			{list.map((item) => {
			      				return(
			      					<div>
			      						{item}
			      					</div>
			      				);
			      			})}
			      		</div>
			      	) : (
			      		<div>
			      			<h2>No List Items Found</h2>
			      		</div>
			      	)}
		      	</div>
	      	</div>
      </div>
    );
  }
}

export default Feed;
