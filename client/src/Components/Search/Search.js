import React from 'react';
import PropTypes from 'prop-types';
import './Search.css';

class Search extends React.Component {
  static propTypes = {
    onSearchChange: PropTypes.func,
    onSuggestion:  PropTypes.string
  };

  constructor() {
    super();
    this.state = {
      value: ''
    };
  }

  componentWillReceiveProps(props) {
    this.setState({ value: props.onSuggestion })
  }

  // this function updates the search field after any tab the user typed
  tagChange = ((e) => {
    this.setState({ value: e.target.value}, () => this.props.onSearchChange(this.state.value));
  });

  render() {
    return (
      <div className="search">
        <input className="input" onChange={this.tagChange} value={this.state.value} placeholder="Search" />
      </div>
    );
  }
}


export default Search;

