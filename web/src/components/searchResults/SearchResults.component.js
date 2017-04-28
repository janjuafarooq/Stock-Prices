import { Component } from 'react';
import { SearchResultsTemplate } from './SearchResults.tpl.js';

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
        let text = 'Showing results ' + (props.pageSize * (props.currentPage - 1) + 1) + '-'
        if (props.currentPage < props.pages) {
            text += props.pageSize * props.currentPage;
        } else if (props.currentPage === props.pages) {
            text += props.totalCount;
        }
        text += ' of ' + props.totalCount;
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
}
