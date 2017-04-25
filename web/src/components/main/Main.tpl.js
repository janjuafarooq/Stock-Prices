import React from 'react';
import SearchBar from '../searchBar/SearchBar.component.js';
import SearchResults from '../searchResults/SearchResults.component.js';
import Graph from '../graph/Graph.component.js';
import styles from './Main.style.js'

export function MainTemplate(component) {
    const searchBarProps = {
        updateSearchText: component.updateSearchText
    };

    const searchResultsProps = {
        pageSize: component.state.pageSize,
        searchText: component.state.searchText,
        updateSymbol: component.updateSymbol
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
