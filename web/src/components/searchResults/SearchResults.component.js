import { Component } from 'react';
import { SearchResultsTemplate } from './SearchResults.tpl.js';
import { getCompanyData } from '../../services/companyDataService.js';

export default class SearchResultsComponent extends Component {
    constructor(props) {
        super(props);
        this.pageSize = props.pageSize;
        this.resultsText = '';
        this.updateSymbol = this.updateSymbol.bind(this);
        this.updatePage = this.updatePage.bind(this);

        this.state = {
            searchResults: [],
            currentPage: 1,
            searchText: props.searchText
        };
    }

    updatePage(e) {
        const nextPage = this.state.currentPage + parseInt(e.target.value, 10);
        getCompanyData(this.state.searchText, nextPage, this.pageSize)
            .then((res) => {
                this.setState(() => ({
                    searchResults: res.data,
                    currentPage: nextPage
                }), () => {
                    this.formatResultsText();
                });
            })
    }

    componentWillReceiveProps(props) {
        if (props.searchText !== this.state.searchText) {
            // Only want to fetch when the search text changes
            getCompanyData(props.searchText, 1, this.pageSize)
                .then((res) => {
                    this.setState(() => ({
                        searchText: props.searchText,
                        searchResults: res.data,
                        noResults: false,
                        totalCount: res.count,
                        pages: res.pages,
                        currentPage: 1
                    }), () => {
                        this.formatResultsText();
                    });
                })
                .catch((error) => {
                    this.setState({
                        noResults: true,
                        searchResults: []
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

    updateSymbol(symbol) {
        this.props.updateSymbol(symbol);
    }

    render() {
        return SearchResultsTemplate(this);
    }
}
