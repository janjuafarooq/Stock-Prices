import { Component } from 'react';
import { MainTemplate } from './Main.tpl.js';
import config from '../../config.js'

export default class Main extends Component {
  constructor(props) {
    super(props);
    this.updateSearchText = this.updateSearchText.bind(this);
    this.updateSymbol = this.updateSymbol.bind(this);
    this.state = {
      searchText: null,
      symbol: null,
      pageSize: config.pageSize
    };
  }

  updateSearchText(text) {
    this.setState({ searchText: text });
  }

  updateSymbol(symbol) {
    this.setState({ symbol: symbol });
  }

  render() {
    return MainTemplate(this);
  }
}