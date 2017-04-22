import { Component } from 'react';
import { SearchBarTemplate } from './SearchBar.tpl.js';

export default class SearchBarComponent extends Component {
    constructor(props) {
        super(props);
        this.handleSearch = this.handleSearch.bind(this);
        this.handleSearchTextChange = this.handleSearchTextChange.bind(this);

        this.state = {

        };
    }

    handleSearch() {
        this.props.getCompanies(this.state.searchText);
    }

    handleSearchTextChange(event) {
        if (event.charCode === 13) {
            // Handle search on 'enter' or 'return' key
            event.preventDefault();
            this.handleSearch(event.target.value);
        } else {
            this.setState({
                searchText: event.target.value
            })
        }
    }

    render() {
        return SearchBarTemplate(this);
    }
}
