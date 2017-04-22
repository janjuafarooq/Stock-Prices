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
        getStockSymbol(props.searchText).then((res) => {
            this.setState({
                searchResults: res
            });
        });
    }

    getStockHistory(e) {
        this.props.getStockData(e.target.value);
    }

    render() {
        return SearchResultsTemplate(this);
    }
}
