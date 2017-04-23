import { Component } from 'react';
import { SearchResultsTemplate } from './SearchResults.tpl.js';
import { getStockSymbol } from '../../services/stockSymbol.js';

export default class SearchResultsComponent extends Component {
    constructor(props) {
        super(props);
        this.pageSize = props.pageSize;
        this.resultsText = '';
        this.getStockHistory = this.getStockHistory.bind(this);
        this.updatePage = this.updatePage.bind(this);

        this.state = {
            searchResults: [],
            currentPage: 1
        };
    }

    updatePage(e) {
        const nextPage = this.state.currentPage + parseInt(e.target.value, 10);
        getStockSymbol(this.state.searchText, nextPage, this.pageSize).then((res) => {
            this.setState(() => ({
                searchResults: res.data,
                currentPage: nextPage
            }), () => {
                console.log(this.state);
                this.formatResultsText();
            });
        });
    }

    componentWillReceiveProps(props) {
        if (props.searchText.length === 0) {
            this.setState({
                searchText: '',
                searchResults: []
            });
        } else if (props.searchText !== this.state.searchText) {
            // Only want to fetch when the search text changes, not when other properties change
            getStockSymbol(props.searchText).then((res) => {
                this.setState(() => ({
                    searchText: props.searchText,
                    searchResults: res.data,
                    noResults: res.data.length === 0,
                    totalCount: res.count,
                    pages: res.pages,
                    currentPage: 1
                }), () => {
                    console.log(this.state);
                    this.formatResultsText();
                });
            });
        }
    }

    formatResultsText() {
        let text = 'Showing results ';
        if (this.state.pages === 1) {
            text += '1-' + this.state.totalCount;
        } else if (this.state.currentPage < this.state.pages) {
            text += (this.pageSize * (this.state.currentPage - 1) + 1) + '-' + this.pageSize * this.state.currentPage;
        } else if (this.state.currentPage === this.state.pages) {
            text += (this.pageSize * (this.state.currentPage - 1) + 1) + '-' + this.state.totalCount;
        }
        console.log(this.pageSize * this.state.currentPage);

        text += ' of ' + this.state.totalCount;
        this.setState({
            resultsText: text
        });
    }

    getStockHistory(e) {
        this.props.getStockData(e.target.value);
    }

    render() {
        return SearchResultsTemplate(this);
    }
}
