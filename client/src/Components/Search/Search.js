import React from 'react';
import PropTypes from 'prop-types';
import './Search.css';


/*
  This component is rendered inside Explore, and is responsible for taking a search value
  from the user as an input.
*/
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

  // Any time the user presses a suggestion button, the value in the search bar is being updated.
  // It happens by setting this value in state, since Search is a controlled component.
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

