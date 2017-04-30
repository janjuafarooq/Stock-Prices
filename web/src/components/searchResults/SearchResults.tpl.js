import React from 'react';
import { Table, Button } from 'react-bootstrap';
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
                    <Table bordered hover>
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
                    </Table>
                    <span>
                        {
                            currentPage > 1 &&
                            <Button className="btn pageButtons" value={-1} onClick={component.updatePage} name={"previous-page"}>Previous Page</Button>
                        }
                        {component.state.resultsText}
                        {
                            currentPage < pages &&
                            <Button className="btn pageButtons" value={1} onClick={component.updatePage} name={"next-page"}>Next Page</Button>
                        }
                    </span>
                </div>
            }
        </div>
    );
}
