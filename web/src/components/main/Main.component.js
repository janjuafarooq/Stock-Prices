import { Component } from 'react';
import { MainTemplate } from './Main.tpl.js';
import { getCompanyData } from '../../services/companyDataService.js';
import { getStockHistory } from '../../services/stockHistoryService.js';
import PropTypes from 'prop-types';

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

  searchForCompanies({ textToSearch, currentPage = 1 }) {
    getCompanyData(textToSearch, currentPage, this.props.pageSize)
      .then((res) => {
        this.setState({
          companies: {
            searchText: textToSearch,
            searchResults: res.data,
            totalCount: res.count,
            pages: res.pages,
            currentPage: currentPage,
            noResults: false
          }
        });
      })
      .catch((error) => {
        this.setState({
          companies: {
            searchResults: [],
            noResults: true,
            currentPage: currentPage
          }
        });
      });
  }

  updatePage(nextPage) {
    this.searchForCompanies({ textToSearch: this.state.companies.searchText, currentPage: nextPage });
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
          window.scrollTo(0, document.body.scrollHeight);
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
};

Main.propTypes = {
  pageSize: PropTypes.number.isRequired,
};