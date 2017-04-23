import React, { Component } from 'react';
import './styles/app.css';
import SearchBar from './components/searchBar/SearchBar.component.js';
import SearchResults from './components/searchResults/SearchResults.component.js';
import Graph from './components/graph/Graph.component.js';

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchText: '',
      symbol: '',
      // TODO: Add a settings file for page size
      pageSize: 10
    };
  }

  getCompanies(text) {
    this.setState({ searchText: text });
  }

  getStockData(symbolToSearch) {
    this.setState({ symbol: symbolToSearch });
  }

  render() {
    return (
      <div className="App">
        <SearchBar getCompanies={this.getCompanies.bind(this)} />
        <SearchResults pageSize={this.state.pageSize} searchText={this.state.searchText} getStockData={this.getStockData.bind(this)} />
        <Graph symbol={this.state.symbol} />
      </div>
    );
  }
}