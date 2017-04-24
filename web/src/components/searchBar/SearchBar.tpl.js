import React from 'react';
import { InputGroup, Button } from 'react-bootstrap';
import styles from './SearchBar.style.js'

export function SearchBarTemplate(component) {
    return (
        <div className="col-sm-8" style={styles.searchBar}>
            <h2 style={styles.titleText}>Search for companies</h2>
            <InputGroup>
                <input type="text" name="searchText" className="form-control input-lg" placeholder="Enter company name or symbol" onChange={component.handleSearchTextChange} onKeyPress={component.handleSearchTextChange} />
                <div className="input-group-btn">
                    <Button className="btn btn-info btn-lg" onClick={component.handleSearch}>
                        <i className="glyphicon glyphicon-search"></i>
                    </Button>
                </div>
            </InputGroup>
            <div className="checkbox">
                <label><input type="checkbox" defaultChecked={false} onChange={component.toggleAutocomplete} value="" />Autocomplete search results</label>
            </div>
            {
                component.state.showError &&
                <div className="alert alert-danger">
                    Please enter in some text
                </div>
            }
        </div>
    );
}
