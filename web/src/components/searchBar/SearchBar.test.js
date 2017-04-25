import React from 'react';
import ReactDOM from 'react-dom';
import SearchBar from './SearchBar.component.js';
import expect from 'expect';
import { renderIntoDocument } from 'react-addons-test-utils';
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

    it('it should render without crashing', () => {
        expect(SearchBar).toExist();
    });

    it('it should have autocomplete disabled by default', () => {
        expect(searchBar.state.autocomplete).toEqual(false);
    });

    it('it should add text to searchbar and should not auto search by default', () => {
        const e = {
            target: {
                value: 'aapl'
            }
        }
        searchBar.handleSearchTextChange(e);
        expect(searchBar.state.searchText).toEqual('aapl');
        expect(spy.called).toBe(false);
    });

    it('it should search', () => {
        const e = {
            target: {
                value: 'aapl'
            }
        }
        searchBar.handleSearchTextChange(e);
        searchBar.handleSearch();
        expect(spy.called).toBe(true);
    })

    it('it should have auto complete enabled and call search', () => {
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