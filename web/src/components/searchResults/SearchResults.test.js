import React from 'react';
import SearchResults from './SearchResults.component.js';
import expect from 'expect';
import fetchMock from 'fetch-mock';
import { mount } from 'enzyme';
import sinon from 'sinon';

describe('/components/searchResults/SearchResults.component.js', () => {
    const receivePropsSpy = sinon.spy(SearchResults.prototype, 'componentWillReceiveProps');
    let searchResults;
    const props = {
        pageSize: 10,
        searchText: 'apple'
    };

    beforeEach(() => {
        searchResults = mount(<SearchResults {...props} />);
    });

    it('it should render without crashing', () => {
        expect(searchResults).toExist();
        expect(searchResults.state().currentPage).toBe(1);
        expect(searchResults.state().searchResults).toBeAn('array');
        expect(searchResults.state().searchResults.length).toBe(0);
        expect(searchResults.state().searchText).toBe('apple');
    });

    it('it should updates when receiving props', () => {
        searchResults.setProps({ searchText: "goog" });
        expect(receivePropsSpy.calledOnce).toBe(true);
    });

    it('it should increment page', () => {
        const e = {
            target: {
                value: 1
            }
        };
        fetchMock
            .mock('/companyData/apple?page=2&pageSize=10', 'GET', {});

        searchResults.instance().updatePage(e);
        expect(fetchMock.called('/companyData/apple?page=2&pageSize=10')).toBe(true);
    });
});