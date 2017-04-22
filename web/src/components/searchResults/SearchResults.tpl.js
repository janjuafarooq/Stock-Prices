import React from 'react';

export function SearchResultsTemplate(component) {
    const searchResults = component.state.searchResults.map((result, index) => {
        return (
            <div key={index} style={{height: '50px'}}>
                <div className="col-xs-3">
                    <button className="btn btn-xs" type="button" value={result.Symbol} onClick={component.getStockHistory}>
                        {result.Symbol}
                    </button>
                </div>
                <div className="col-xs-3">
                    {result.Name}
                </div>
                <div className="col-xs-3">
                    {result.Sector}
                </div>
                <div className="col-xs-3">
                    {result.industry}
                </div>
            </div>
        );
    });

    return (
        <div className="row">
            <div className="col-xs-3">
                Symbol
            </div>
            <div className="col-xs-3">
                Name
            </div>
            <div className="col-xs-3">
                Sector
            </div>
            <div className="col-xs-3">
                Industry
            </div>

            {searchResults}
        </div>
    );
}
