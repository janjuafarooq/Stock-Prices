import { Component } from 'react';
import { SearchResultsTemplate } from './SearchResults.tpl.js';
import { getcompanyList } from '../../services/companyList.js';

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
        getcompanyList(this.state.searchText, nextPage, this.pageSize).then((res) => {
            this.setState(() => ({
                searchResults: res.data,
                currentPage: nextPage
            }), () => {
                this.formatResultsText();
            });
        });
    }

    componentWillReceiveProps(props) {
        if (props.searchText !== this.state.searchText) {
            // Only want to fetch when the search text changes
            getcompanyList(props.searchText).then((res) => {
                this.setState(() => ({
                    searchText: props.searchText,
                    searchResults: res.data,
                    noResults: res.data.length === 0,
                    totalCount: res.count,
                    pages: res.pages,
                    currentPage: 1
                }), () => {
                    this.formatResultsText();
                });
            });
        }
    }

    formatResultsText() {
        let text = 'Showing results ' + (this.pageSize * (this.state.currentPage - 1) + 1) + '-'
        if (this.state.currentPage < this.state.pages) {
            text += this.pageSize * this.state.currentPage;
        } else if (this.state.currentPage === this.state.pages) {
            text += this.state.totalCount;
        }
        text += ' of ' + this.state.totalCount;
        this.setState({
            resultsText: text
        });
    }

    getStockHistory(symbol) {
        this.props.getStockData(symbol);
    }

    render() {
        return SearchResultsTemplate(this);
    }
}
