import { Component } from 'react';
import { SearchResultsTemplate } from './SearchResults.tpl.js';
import PropTypes from 'prop-types';

export default class SearchResultsComponent extends Component {
    constructor(props) {
        super(props);
        this.showGraph = this.showGraph.bind(this);
        this.updatePage = this.updatePage.bind(this);
        this.state = {
            resultsText: ''
        };
    }

    updatePage(e) {
        const nextPage = this.props.currentPage + parseInt(e.target.value, 10);
        this.props.updatePage(nextPage);
    }

    componentWillReceiveProps(props) {
        let text = `Showing results ${(props.pageSize * (props.currentPage - 1) + 1)}-`
        if (props.currentPage < props.pages) {
            text += props.pageSize * props.currentPage;
        } else if (props.currentPage === props.pages) {
            text += props.totalCount;
        }
        text += ` of ${props.totalCount}`;
        this.setState({
            resultsText: text
        });
    }

    showGraph(symbol) {
        this.props.showGraph(symbol);
    }

    render() {
        return SearchResultsTemplate(this);
    }
};

SearchResultsComponent.propTypes = {
    currentPage: PropTypes.number.isRequired,
    noResults: PropTypes.bool.isRequired,
    pageSize: PropTypes.number.isRequired,
    searchResults: PropTypes.array.isRequired,
    showGraph: PropTypes.func.isRequired,
    updatePage: PropTypes.func.isRequired,
    searchText: PropTypes.string,
    totalCount: PropTypes.number,
    pages: PropTypes.number
}
