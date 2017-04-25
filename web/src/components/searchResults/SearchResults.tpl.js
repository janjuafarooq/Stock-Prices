import React from 'react';
import { Table, Button } from 'react-bootstrap';
import styles from './SearchResults.style.js';

export function SearchResultsTemplate(component) {
    const searchResults = component.state.searchResults.map((result, index) => {
        return (
            <tr key={index} onClick={() => component.updateSymbol(result.Symbol)} style={{ cursor: 'pointer' }}>
                <td style={styles.stockRow}> {result.Symbol}</td>
                <td style={styles.stockRow}>{result.Name}</td>
                <td style={styles.stockRow}>{result.Sector}</td>
                <td style={styles.stockRow}>{result.industry}</td>
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
                    <h4 style={styles.instructions}>Select a row to view historical data</h4>
                    <Table bordered hover style={styles.table}>
                        <thead>
                            <tr>
                                <th style={styles.headerRow}>Company Symbol</th>
                                <th style={styles.headerRow}>Company Name</th>
                                <th style={styles.headerRow}>Sector</th>
                                <th style={styles.headerRow}>Industry</th>
                            </tr>
                        </thead>
                        <tbody>
                            {searchResults}
                        </tbody>
                    </Table>
                    <span>
                        {
                            component.state.currentPage > 1 &&
                            <Button style={styles.pageButtons} value={-1} onClick={component.updatePage} className="btn">Previous Page</Button>
                        }
                        {component.state.resultsText}
                        {
                            component.state.currentPage < component.state.pages &&
                            <Button style={styles.pageButtons} value={1} onClick={component.updatePage} className="btn">Next Page</Button>
                        }
                    </span>
                </div>
            }
        </div>
    );
}
