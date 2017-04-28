import React from 'react';
import SearchBar from '../searchBar/SearchBar.component.js';
import SearchResults from '../searchResults/SearchResults.component.js';
import Graph from '../graph/Graph.component.js';
import styles from './Main.style.js'

export function MainTemplate(component) {
    const searchBarProps = {
        searchForCompanies: component.searchForCompanies
    };

    const searchResultsProps = {
        pageSize: component.props.pageSize,
        showGraph: component.showGraph,
        updatePage: component.updatePage,
        ...component.state.companies
    };

    const graphProps = {
        ...component.state.stockHistory
    }

    return (
        <div style={styles.main}>
            <SearchBar {...searchBarProps} />
            <SearchResults {...searchResultsProps} />
            <Graph {...graphProps} />
        </div>
    );
}
