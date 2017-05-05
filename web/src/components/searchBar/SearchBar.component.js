import { Component } from 'react';
import { SearchBarTemplate } from './SearchBar.tpl.js';
import PropTypes from 'prop-types';

export default class SearchBarComponent extends Component {
    constructor(props) {
        super(props);
        this.handleSearch = this.handleSearch.bind(this);
        this.handleSearchTextChange = this.handleSearchTextChange.bind(this);
        this.toggleAutocomplete = this.toggleAutocomplete.bind(this);
        this.state = {
            searchText: '',
            showError: false,
            autocomplete: false
        };
    }

    handleSearch() {
        if (this.state.searchText.length > 0) {
            this.props.searchForCompanies({ textToSearch: this.state.searchText });
        } else {
            this.setState({
                showError: true
            });
        }
    }

    handleSearchTextChange(event) {
        const text = event.target.value;
        if (this.state.autocomplete) {
            this.setState(() => ({
                searchText: text,
                showError: false
            }), () => {
                this.handleSearch();
            });
        } else {
            if (event.charCode === 13) {
                // Handle search on 'enter' or 'return' key
                event.preventDefault();
                this.handleSearch(text);
            } else {
                this.setState({
                    searchText: text,
                    showError: false
                });
            }
        }
    }

    toggleAutocomplete(event) {
        const checked = event.target.checked;
        this.setState({
            autocomplete: checked
        });
    }

    render() {
        return SearchBarTemplate(this);
    }
};

SearchBarComponent.propTypes = {
    searchForCompanies: PropTypes.func.isRequired
};