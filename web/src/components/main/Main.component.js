import { Component } from 'react';
import { MainTemplate } from './Main.tpl.js';
import config from '../../config.js'

export default class Main extends Component {
  constructor(props) {
    super(props);
    this.getCompanies = this.getCompanies.bind(this);
    this.getStockData = this.getStockData.bind(this);
    this.state = {
      searchText: null,
      symbol: null,
      pageSize: config.pageSize
    };
  }

  getCompanies(text) {
    this.setState({ searchText: text });
  }

  getStockData(symbolToSearch) {
    this.setState({ symbol: symbolToSearch });
  }

  render() {
    return MainTemplate(this);
  }
}