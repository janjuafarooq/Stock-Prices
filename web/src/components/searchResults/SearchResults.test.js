import React from 'react';
import SearchResults from './SearchResults.component.js';
import expect from 'expect';
import fetchMock from 'fetch-mock';
import { mount } from 'enzyme';
import sinon from 'sinon';

describe('/components/searchResults/SearchResults.component.js', () => {
    const receivePropsSpy = sinon.spy(SearchResults.prototype, 'componentWillReceiveProps');
    const updatePageSpy = sinon.spy();

    let searchResults;
    const props = {
        pageSize: 10,
        searchText: 'apple'
    };

    beforeEach(() => {
        searchResults = mount(<SearchResults {...props} />);
        searchResults.instance().updatePage = updatePageSpy;
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

    it('it should change pages', () => {
        searchResults
        searchResults.setState({
            currentPage: 2,
            pages: 3,
            searchResults: new Array(1)
        }, () => {
            const previousButton = searchResults.find('[name="previous-page"]');
            const nextButton = searchResults.find('[name="next-page"]');
            expect(previousButton).toExist();
            expect(nextButton).toExist();
            previousButton.simulate('click');
            nextButton.simulate('click');
            expect(updatePageSpy.calledTwice).toBe(true);
        });
    });
});