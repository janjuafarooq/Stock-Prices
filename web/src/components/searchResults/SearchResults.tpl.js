import React from 'react';
import '../../styles/css/searchResults.css';

export const SearchResultsTemplate = (component) => {
    const { noResults, currentPage, pages, searchResults } = component.props;
    const companyRows = searchResults.map((result, index) => {
        return (
            <tr className="stockRow" key={index} onClick={() => component.showGraph(result.Symbol)}>
                <td> {result.Symbol}</td>
                <td>{result.Name}</td>
                <td>{result.Sector}</td>
                <td>{result.industry}</td>
            </tr>
        );
    });

    return (
        <div className="searchResults">
            {
                noResults &&
                <div>
                    No results found
                </div>
            }
            {
                searchResults.length > 0 &&
                <div>
                    <h4 className="instructions">Select a row to view historical data</h4>
                    <table className="table table-bordered table-hover">
                        <thead>
                            <tr className="headerRow">
                                <th>Company Symbol</th>
                                <th>Company Name</th>
                                <th>Sector</th>
                                <th>Industry</th>
                            </tr>
                        </thead>
                        <tbody>
                            {companyRows}
                        </tbody>
                    </table>
                    <span>
                        {
                            currentPage > 1 &&
                            <button className="btn btn-default pageButtons" value={-1} onClick={component.updatePage} name={"previous-page"}>Previous Page</button>
                        }
                        {component.state.resultsText}
                        {
                            currentPage < pages &&
                            <button className="btn btn-default pageButtons" value={1} onClick={component.updatePage} name={"next-page"}>Next Page</button>
                        }
                    </span>
                </div>
            }
        </div>
    );
}
