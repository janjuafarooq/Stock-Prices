import React from 'react';
import SearchBar from '../searchBar/SearchBar.component.js';
import SearchResults from '../searchResults/SearchResults.component.js';
import Graph from '../graph/Graph.component.js';
import styles from './Main.style.js'

export function MainTemplate(component) {
    const searchBarProps = {
        getCompanies: component.getCompanies
    };

    const searchResultsProps = {
        pageSize: component.state.pageSize,
        searchText: component.state.searchText,
        getStockData: component.getStockData
    };

    const graphProps = {
        symbol: component.state.symbol
    }

    return (
        <div style={styles.main}>
            <SearchBar {...searchBarProps} />
            <SearchResults {...searchResultsProps} />
            <Graph {...graphProps} />
        </div>
    );
}
