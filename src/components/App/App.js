import React from 'react';
//import logo from '';
import './App.css';

import BusinessList from '../BusinessList/BusinessList';
import SearchBar from '../SearchBar/SearchBar';
import { Yelp } from '../../util/Yelp';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      businesses: [],
      errorState: false,
      errorMessage: ''
    };
    this.searchYelp = this.searchYelp.bind(this);
    this.setErrorState = this.setErrorState.bind(this);
  }

  searchYelp(term, location, sortBy) {
    Yelp.search(term, location, sortBy)
      .then((businesses) => {
        this.setState({
          businesses: businesses
        })
      })
      .catch((error) => {
        if (error.message === '400') {
          this.setErrorState(true, 'Invalid business or location, please correct them and try again!');
          this.setState({
            businesses: []
          })
        }
        else if (error.message === '500') {
          this.setErrorState(true, 'Server is not responding. Please try after sometime!');
        }
        else{
          this.setErrorState(true, 'Unable to fetch the results. Please contact support team!');
        }
      })
  }

  setErrorState(state, message) {
    this.setState({
      errorState: state,
      errorMessage: message
    })
  }

  render() {
    return (
      <div className="App">
        <h1>ravenous</h1>
        <SearchBar searchYelp={this.searchYelp} setErrorState={this.setErrorState} />
        <BusinessList businesses={this.state.businesses} errorState={this.state.errorState} errorMessage={this.state.errorMessage} />
      </div>
    );
  }
}

export default App;
