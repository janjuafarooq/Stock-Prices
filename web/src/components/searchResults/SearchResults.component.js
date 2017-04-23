import { Component } from 'react';
import { SearchResultsTemplate } from './SearchResults.tpl.js';
import { getStockSymbol } from '../../services/stockSymbol.js';

export default class SearchResultsComponent extends Component {
    constructor(props) {
        super(props);
        this.getStockHistory = this.getStockHistory.bind(this);

        this.state = {
            searchResults: []
        };
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
                this.setState({
                    searchText: props.searchText,
                    searchResults: res.data,
                    noResults: res.data.length === 0
                });
            });
        }
    }

    getStockHistory(e) {
        this.props.getStockData(e.target.value);
    }

    render() {
        return SearchResultsTemplate(this);
    }
}
