import React from 'react';
import ReactDOM from 'react-dom';
import SearchResults from './SearchResults.component.js';
import expect from 'expect';
import { renderIntoDocument } from 'react-addons-test-utils';
import fetchMock from 'fetch-mock';

describe('/components/searchResults/SearchResults.component.js', () => {
    let searchResults;
    const props = {
        pageSize: 10,
        searchText: 'apple'
    };

    beforeEach(() => {
        searchResults = renderIntoDocument(
            <SearchResults {...props} />
        );
    });

    it('it should render without crashing', () => {
        expect(searchResults).toExist();
        expect(searchResults.state.currentPage).toBe(1);        
    });

    it('it should increment page', () => {
        const e = {
            target: {
                value: 1
            }
        }
        fetchMock
            .mock('/companyData/apple?page=2&pageSize=10', 'GET', {});

        searchResults.updatePage(e);
        expect(fetchMock.called('/companyData/apple?page=2&pageSize=10')).toBe(true);
    });
});