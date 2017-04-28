import { Component } from 'react';
import { MainTemplate } from './Main.tpl.js';
import { getCompanyData } from '../../services/companyDataService.js';
import { getStockHistory } from '../../services/stockHistoryService.js';

export default class Main extends Component {
  constructor(props) {
    super(props);

    this.searchForCompanies = this.searchForCompanies.bind(this);
    this.showGraph = this.showGraph.bind(this);
    this.updatePage = this.updatePage.bind(this);

    this.state = {
      companies: {
        searchResults: [],
        currentPage: 1,
        noResults: false
      },
      stockHistory: {
        historicalData: [],
        error: false
      }
    };
  }

  searchForCompanies(textToSearch, page) {
    const cur = page || 1;
    getCompanyData(textToSearch, cur, this.props.pageSize)
      .then((res) => {
        this.setState({
          companies: {
            searchText: textToSearch,
            searchResults: res.data,
            totalCount: res.count,
            pages: res.pages,
            currentPage: cur,
            noResults: false
          }
        });
      })
      .catch((error) => {
        this.setState({
          companies: {
            searchResults: [],
            noResults: true
          }
        });
      });
  }

  updatePage(nextPage) {
    this.searchForCompanies(this.state.companies.searchText, nextPage);
  }

  showGraph(symbol) {
    if (this.state.stockHistory.symbol !== symbol) {
      getStockHistory(symbol)
        .then((res) => {
          this.setState({
            stockHistory: {
              symbol: symbol,
              historicalData: res,
              error: false
            }
          });
        })
        .catch((error) => {
          this.setState({
            stockHistory: {
              symbol: symbol,
              historicalData: [],
              error: true
            }
          });
        });
    }
  }

  render() {
    return MainTemplate(this);
  }
}