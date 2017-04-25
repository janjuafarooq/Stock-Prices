import React from 'react';
import ReactDOM from 'react-dom';
import SearchBar from './SearchBar.component.js';
import expect from 'expect';
import { renderIntoDocument } from 'react-addons-test-utils';
import fetchMock from 'fetch-mock';
import sinon from 'sinon';

describe('/components/SearchBar/SearchBar.component.js', () => {
    let searchBar;
    const spy = sinon.spy();
    const props = {
        getCompanies: spy
    };

    beforeEach(() => {
        searchBar = renderIntoDocument(
            <SearchBar {...props} />
        );
    });

    it('renders without crashing', () => {
        expect(SearchBar).toExist();
    });

    it('has autocomplete disabled by default', () => {
        expect(searchBar.state.autocomplete).toEqual(false);
    });

    it('adds text to searchbar and does not auto complete by default', () => {
        const e = {
            target: {
                value: 'aapl'
            }
        }
        searchBar.handleSearchTextChange(e);
        expect(searchBar.state.searchText).toEqual('aapl');
        expect(spy.called).toBe(false);
    });

    it('searches', () => {
        const e = {
            target: {
                value: 'aapl'
            }
        }
        searchBar.handleSearchTextChange(e);
        searchBar.handleSearch();
        expect(spy.called).toBe(true);
    })

    it('auto complete enables and calls search', () => {
        const e1 = {
            target: {
                checked: true
            }
        };
        const e2 = {
            target: {
                value: 'aapl'
            }
        }

        searchBar.toggleAutocomplete(e1);
        searchBar.handleSearchTextChange(e2);

        expect(searchBar.state.searchText).toEqual('aapl');
        expect(spy.called).toBe(true);
    });

})