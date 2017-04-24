import React from 'react';
import { Table, Button } from 'react-bootstrap';

export function SearchResultsTemplate(component) {
    const searchResults = component.state.searchResults.map((result, index) => {
        return (
            <tr key={index} onClick={() => component.getStockHistory(result.Symbol)}>
                {/*TODO: Cleanup the styles*/}
                <td style={{ verticalAlign: 'middle' }}> {result.Symbol}</td>
                <td style={{ verticalAlign: 'middle' }}>{result.Name}</td>
                <td style={{ verticalAlign: 'middle' }}>{result.Sector}</td>
                <td style={{ verticalAlign: 'middle' }}>{result.industry}</td>
            </tr>
        );
    });

    return (
        <div>
            {
                component.state.noResults &&
                <div>
                    No results found
                </div>
            }
            {
                component.state.searchResults.length > 0 &&
                <div>
                    <h4 style={{ marginBottom: '20px' }}>Select a row to view historical data</h4>
                    <Table striped bordered responsive hover>
                        <thead>
                            <tr>
                                {/*TODO: Cleanup the styles*/}
                                <th style={{ textAlign: 'center' }}>Company Symbol</th>
                                <th style={{ textAlign: 'center' }}>Company Name</th>
                                <th style={{ textAlign: 'center' }}>Sector</th>
                                <th style={{ textAlign: 'center' }}>Industry</th>
                            </tr>
                        </thead>
                        <tbody>
                            {searchResults}
                        </tbody>
                    </Table>
                    <span>
                        {/*TODO: Cleanup the styles*/}
                        {
                            component.state.currentPage > 1 &&
                            <Button style={{ margin: '0px 10px' }} value={-1} onClick={component.updatePage} className="btn">Previous Page</Button>
                        }
                        {component.state.resultsText}
                        {
                            component.state.currentPage < component.state.pages &&
                            <Button style={{ margin: '0px 10px' }} value={1} onClick={component.updatePage} className="btn">Next Page</Button>
                        }
                    </span>
                </div>
            }

        </div>
    );
}
