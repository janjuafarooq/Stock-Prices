import React from 'react';
import { Table, Button } from 'react-bootstrap';
import styles from './SearchResults.style.js';

export function SearchResultsTemplate(component) {
    const searchResults = component.props.searchResults.map((result, index) => {
        return (
            <tr key={index} onClick={() => component.showGraph(result.Symbol)} style={{ cursor: 'pointer' }}>
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
                component.props.noResults &&
                <div>
                    No results found
                </div>
            }
            {
                component.props.searchResults.length > 0 &&
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
                            component.props.currentPage > 1 &&
                            <Button style={styles.pageButtons} value={-1} onClick={component.updatePage} className="btn" name={"previous-page"}>Previous Page</Button>
                        }
                        {component.state.resultsText}
                        {
                            component.props.currentPage < component.props.pages &&
                            <Button style={styles.pageButtons} value={1} onClick={component.updatePage} className="btn" name={"next-page"}>Next Page</Button>
                        }
                    </span>
                </div>
            }
        </div>
    );
}
