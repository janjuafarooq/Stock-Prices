import React from 'react';
import { Table, Button } from 'react-bootstrap';

export function SearchResultsTemplate(component) {
    const searchResults = component.state.searchResults.map((result, index) => {
        return (
            <tr key={index}>
                {/*TODO: Cleanup the styles*/}
                <td style={{ verticalAlign: 'middle' }}>
                    <Button className="btn-s" type="button" value={result.Symbol} onClick={component.getStockHistory}>
                        {result.Symbol}
                    </Button>
                </td>
                <td style={{ verticalAlign: 'middle' }}>{result.Name}</td>
                <td style={{ verticalAlign: 'middle' }}>{result.Sector}</td>
                <td style={{ verticalAlign: 'middle' }}>{result.industry}</td>
            </tr>
        );
    });

    return (
        <Table striped bordered responsive hover>
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
