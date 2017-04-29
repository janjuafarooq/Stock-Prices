import React from 'react';
import SearchResults from '../components/SearchResults/SearchResults.component.js';
import expect from 'expect';
import { shallow } from 'enzyme';
import sinon from 'sinon';
import { generateRandomString, generateNumberBetween1AndN } from './testUtilities.js';

describe('/components/searchResults/SearchResults.component.js', () => {
    const componentWillReceivePropsSpy = sinon.spy(SearchResults.prototype, 'componentWillReceiveProps');
    const updatePageSpy = sinon.spy();
    const showGraphSpy = sinon.spy();

    const setup = propOverrides => {
        componentWillReceivePropsSpy.reset();
        updatePageSpy.reset();
        showGraphSpy.reset();
        const props = {
            searchResults: [],
            currentPage: 1,
            pageSize: generateNumberBetween1AndN(100),
            noResults: false,
            updatePage: updatePageSpy,
            showGraph: showGraphSpy,
            ...propOverrides
        };
        const component = shallow(
            <SearchResults {...props} />
        );
        return component;
    };

    it('it should render without crashing', () => {
        const searchResults = setup();
        expect(searchResults).toExist();
        expect(searchResults.instance().props.currentPage).toBe(1);
        expect(searchResults.instance().props.searchResults).toBeAn('array');
        expect(searchResults.instance().props.searchResults.length).toBe(0);
    });

    it('it should not have next or buttons when initialized', () => {
        const searchResults = setup();
        const previousButton = searchResults.find('[name="previous-page"]').length;
        const nextButton = searchResults.find('[name="next-page"]').length;
        expect(previousButton).toNotExist();
        expect(nextButton).toNotExist();
    });

    it('it should the next button when current page is less than total pages', () => {
        const searchResults = setup({ pages: 2, searchResults: new Array(5) });
        const nextButton = searchResults.find('[name="next-page"]').length;
        expect(nextButton).toExist();
    });

    it('it should the previous button when current page is greater than total pages', () => {
        const searchResults = setup({ pages: 3, currentPage: 2, searchResults: new Array(1) });
        const previousButton = searchResults.find('[name="previous-page"]').length;
        expect(previousButton).toExist();
    });

    it('it should update the page when next or previous buttons are clicked', () => {
        const searchResults = setup({ pages: 3, currentPage: 2, searchResults: new Array(1) });
        const previousButton = searchResults.find('[name="previous-page"]');
        const nextButton = searchResults.find('[name="next-page"]');
        previousButton.simulate('click', { target: { value: previousButton.props().value } });
        nextButton.simulate('click', { target: { value: nextButton.props().value } });
        expect(updatePageSpy.calledTwice).toBe(true);
    });

    it('it should update search text when receiving new props', () => {
        const searchResults = setup();
        searchResults.setProps({ pages: 3, currentPage: 2, totalCount: 23, searchResults: new Array(5) });
        expect(componentWillReceivePropsSpy.calledOnce).toBe(true);
        expect(searchResults.contains('Showing results ' + (searchResults.instance().props.pageSize + 1) + '-' + searchResults.instance().props.pageSize * 2 + ' of ' + searchResults.instance().props.totalCount)).toBe(true);
    });

    it('it should show the graph when a row is clicked', () => {
        const searchResults = setup();
        searchResults.setProps({ pages: 1, searchResults: Array(1).fill({ "Name": "name", "Symbol": "symbol", "Sector": "sector", "industry": "industry" }) });
        const companyRow = searchResults.find('tr').at(1);
        companyRow.simulate('click');
        expect(showGraphSpy.calledOnce).toBe(true);
    });

});