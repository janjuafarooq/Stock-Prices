import React, { Component } from 'react';
import './styles/app.css';
import SearchBar from './components/searchBar/SearchBar.component.js';
import SearchResults from './components/searchResults/SearchResults.component.js';

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchText: ''
    };
  }

  getCompanies(text) {
    this.setState({ searchText: text });
  }

  getStockData(symbolToSearch) {
    this.setState({ symbol: symbolToSearch });
    console.log(this.state);
  }

  render() {
    return (
      <div className="App">
        <SearchBar getCompanies={this.getCompanies.bind(this)} />
        <SearchResults searchText={this.state.searchText} getStockData={this.getStockData.bind(this)} />
      </div>
    );
  }
}