import { Component } from 'react';
import { SearchBarTemplate } from './SearchBar.tpl.js';

export default class SearchBarComponent extends Component {
    constructor(props) {
        super(props);
        this.handleSearch = this.handleSearch.bind(this);
        this.handleSearchTextChange = this.handleSearchTextChange.bind(this);
        this.state = {
            searchText: '',
            showError: false
        };
    }

    handleSearch() {
        if (this.state.searchText.length > 0) {
            this.props.getCompanies(this.state.searchText);
        } else {
            this.setState({
                showError: true
            })
        }
    }

    handleSearchTextChange(event) {
        if (event.charCode === 13) {
            // Handle search on 'enter' or 'return' key
            event.preventDefault();
            this.handleSearch(event.target.value);
        } else {
            this.setState({
                searchText: event.target.value,
                showError: false
            })
        }
    }

    render() {
        return SearchBarTemplate(this);
    }
}
