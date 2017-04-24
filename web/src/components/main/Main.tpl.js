import React from 'react';
import SearchBar from '../searchBar/SearchBar.component.js';
import SearchResults from '../searchResults/SearchResults.component.js';
import Graph from '../graph/Graph.component.js';
import styles from './Main.style.js'

export function MainTemplate(component) {
    return (
        <div style={styles.main}>
            <SearchBar getCompanies={component.getCompanies} />
            <SearchResults pageSize={component.state.pageSize} searchText={component.state.searchText} getStockData={component.getStockData} />
            <Graph symbol={component.state.symbol} />
        </div>
    );
}
