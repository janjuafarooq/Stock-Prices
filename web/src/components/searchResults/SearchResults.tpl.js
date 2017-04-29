import React from 'react';
import { Table, Button } from 'react-bootstrap';
import styles from './SearchResults.style.js';

export const SearchResultsTemplate = (component) => {
    const { noResults, currentPage, pages, searchResults } = component.props;
    const companyRows = searchResults.map((result, index) => {
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
                noResults &&
                <div>
                    No results found
                </div>
            }
            {
                searchResults.length > 0 &&
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
                            {companyRows}
                        </tbody>
                    </Table>
                    <span>
                        {
                            currentPage > 1 &&
                            <Button style={styles.pageButtons} value={-1} onClick={component.updatePage} className="btn" name={"previous-page"}>Previous Page</Button>
                        }
                        {component.state.resultsText}
                        {
                            currentPage < pages &&
                            <Button style={styles.pageButtons} value={1} onClick={component.updatePage} className="btn" name={"next-page"}>Next Page</Button>
                        }
                    </span>
                </div>
            }
        </div>
    );
}
