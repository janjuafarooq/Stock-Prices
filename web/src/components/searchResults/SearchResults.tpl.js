import React from 'react';
import { Table } from 'react-bootstrap';

export function SearchResultsTemplate(component) {
    const searchResults = component.state.searchResults.map((result, index) => {
        return (
            <tr key={index}>
                <td>
                    <button className="btn btn-xs" type="button" value={result.Symbol} onClick={component.getStockHistory}>
                        {result.Symbol}
                    </button>
                </td>
                <td>{result.Name}</td>
                <td>{result.Sector}</td>
                <td>{result.industry}</td>
            </tr>
        );
    });

    return (
        <Table>
            <thead>
                {
                    component.state.searchResults.length > 0 &&
                    <tr>
                        {/*TODO: Cleanup the styles*/}
                        <th style={{ textAlign: 'center' }}>Company Symbol</th>
                        <th style={{ textAlign: 'center' }}>Company Name</th>
                        <th style={{ textAlign: 'center' }}>Sector</th>
                        <th style={{ textAlign: 'center' }}>Industry</th>
                    </tr>
                }
            </thead>
            <tbody>
                {searchResults}
            </tbody>
        </Table>
    );
}
