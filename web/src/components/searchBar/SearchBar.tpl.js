import React from 'react';

export function SearchBarTemplate(component) {
    return (
        <div className="row" style={{ textAlign: 'center' }}>
            <div className="col-sm-8" style={{ display: 'inline-block', float: 'none', textAlign: 'left', marginRight: '-4px', marginBottom: '30px' }}>
                <h2 style={{ textAlign: 'center' }}>Search for companies</h2>
                <div className="input-group col-md-12">
                    <input type="text" name="searchText" className="form-control input-lg" placeholder="Enter company name or symbol" onChange={component.handleSearchTextChange} onKeyPress={component.handleSearchTextChange} />
                    <div className="input-group-btn">
                        <button className="btn btn-info btn-lg" type="button" value="Search" onClick={component.handleSearch}>
                            <i className="glyphicon glyphicon-search"></i>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
