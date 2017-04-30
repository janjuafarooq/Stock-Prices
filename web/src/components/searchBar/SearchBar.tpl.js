import React from 'react';
import '../../styles/css/searchBar.css';

export const SearchBarTemplate = (component) => {
    return (
        <div className="searchBar">
            <div className="col-xs-10 col-sm-8 col-lg-6 centered">
                <h2>Search for companies</h2>
                <div className="input-group">
                    <input type="text" name="searchText" className="form-control input-lg" placeholder="Enter company name or symbol" onChange={component.handleSearchTextChange} onKeyPress={component.handleSearchTextChange} />
                    <div className="input-group-btn">
                        <button className="btn btn-info btn-lg" onClick={component.handleSearch}>
                            <i className="glyphicon glyphicon-search"></i>
                        </button>
                    </div>
                </div>
                <div className="checkbox text-left">
                    <label><input type="checkbox" checked={component.state.autocomplete} onChange={component.toggleAutocomplete} />Autocomplete search results</label>
                </div>
                {
                    component.state.showError &&
                    <div className="alert alert-danger">
                        Please enter in some text
                </div>
                }
            </div>
        </div>
    );
}
