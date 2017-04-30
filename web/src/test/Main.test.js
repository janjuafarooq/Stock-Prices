import React from 'react';
import Main from '../components/Main/Main.component.js';
import expect from 'expect';
import { shallow } from 'enzyme';
import fetchMock from 'fetch-mock';
import { generateRandomString, generateNumberBetween1AndN } from './testUtilities.js';

describe('/components/main/Main.component.js', () => {
    const setup = propOverrides => {
        fetchMock.restore();
        const props = {
            pageSize: generateNumberBetween1AndN(100),
            ...propOverrides
        };

        const component = shallow(
            <Main {...props} />
        );
        return component;
    };

    it('it should render without crashing', () => {
        const main = setup();
        expect(main).toExist();
        expect(main.instance().state.companies.searchResults).toBeAn('array');
        expect(main.instance().state.companies.searchResults.length).toBe(0);
        expect(main.instance().state.stockHistory.historicalData).toBeAn('array');
        expect(main.instance().state.stockHistory.historicalData.length).toBe(0);
        expect(main.instance().state.stockHistory.error).toBe(false);
        expect(main.instance().state.companies.noResults).toBe(false);
    });

    it('it should have SearchBarComponent, SearchResultsComponent, and GraphComponent', () => {
        const main = setup();
        const SearchBarComponent = main.find('SearchBarComponent').length;
        const SearchResultsComponent = main.find('SearchResultsComponent').length;
        const GraphComponent = main.find('GraphComponent').length;
        expect(SearchBarComponent).toExist();
        expect(SearchResultsComponent).toExist();
        expect(GraphComponent).toExist();
        expect(main).toExist();
    });

    it('it should get stock history before showing the graph', (done) => {
        const textToSearch = generateRandomString();
        const main = setup();
        const responseLength = generateNumberBetween1AndN(10);
        fetchMock.mock({ matcher: '/stockHistory/' + textToSearch, response: Array(responseLength).fill({}) });
        main.instance().showGraph(textToSearch);
        // There doesn't seem to be a way currently to spy on setState calls so 
        // using the setTimeout call is used to make sure the state has been updated.
        // The try catch is necessary since the failures inside the timeout function are not
        // currently caught by jest during Async tests. 
        // This same pattern is used for the other tests.
        setTimeout(() => {
            try {
                expect(fetchMock.called('/stockHistory/' + textToSearch)).toBe(true);
                expect(main.instance().state.stockHistory.historicalData.length).toBe(responseLength);
                expect(main.state().stockHistory.symbol).toBe(textToSearch);
                expect(main.state().stockHistory.error).toBe(false);
                done();
            } catch (err) {
                done.fail(err);
            }
        });
    });

    it('it should show an error when the stock history call fails', (done) => {
        const textToSearch = generateRandomString();
        const main = setup();
        fetchMock.mock({ matcher: '/stockHistory/' + textToSearch, response: 404 });
        main.instance().showGraph(textToSearch);
        setTimeout(() => {
            try {
                expect(fetchMock.called('/stockHistory/' + textToSearch)).toBe(true);
                expect(main.instance().state.stockHistory.historicalData.length).toBe(0);
                expect(main.state().stockHistory.symbol).toBe(textToSearch);
                expect(main.state().stockHistory.error).toBe(true);
                done();
            } catch (err) {
                done.fail(err);
            }
        });
    });

    it('it should get company data when searching for companies', (done) => {
        const symbolToSearch = generateRandomString();
        const responseSize = generateNumberBetween1AndN(10);
        const responsePages = generateNumberBetween1AndN(10);
        const responseCount = generateNumberBetween1AndN(10);
        const main = setup();
        fetchMock.mock({
            matcher: '/companyData/' + symbolToSearch + '?page=' + main.state().companies.currentPage + '&pageSize=' + main.instance().props.pageSize,
            response: { "data": Array(responseSize).fill({}), "pages": responsePages, "count": responseCount }
        });
        main.instance().searchForCompanies(symbolToSearch);
        setTimeout(() => {
            try {
                expect(fetchMock.called('/companyData/' + symbolToSearch + '?page=' + main.state().companies.currentPage + '&pageSize=' + main.instance().props.pageSize)).toBe(true);
                expect(main.state().companies.searchText).toBe(symbolToSearch);
                expect(main.state().companies.searchResults.length).toBe(responseSize);
                expect(main.state().companies.pages).toBe(responsePages);
                expect(main.state().companies.totalCount).toBe(responseCount);
                expect(main.state().companies.noResults).toBe(false);
                done();
            } catch (err) {
                done.fail(err);
            }
        });
    });

    it('it should show an error when the companies call fails', (done) => {
        const symbolToSearch = generateRandomString();
        const main = setup();
        fetchMock.mock({
            matcher: '/companyData/' + symbolToSearch + '?page=' + main.state().companies.currentPage + '&pageSize=' + main.instance().props.pageSize,
            response: 400
        });
        main.instance().searchForCompanies(symbolToSearch);
        setTimeout(() => {
            try {
                expect(main.state().companies.searchResults.length).toBe(0);
                expect(main.state().companies.noResults).toBe(true);
                done();
            } catch (err) {
                done.fail(err);
            }
        });
    });

    it('it should get company data when changing pages', () => {
        let nextPage = generateNumberBetween1AndN(5);
        const searchForCompaniesSpy = expect.spyOn(Main.prototype, "searchForCompanies");
        const main = setup();
        main.instance().updatePage(nextPage);
        expect(searchForCompaniesSpy.getLastCall().arguments[1]).toEqual(nextPage);
        nextPage = generateNumberBetween1AndN(5);
        main.instance().updatePage(nextPage);
        expect(searchForCompaniesSpy.getLastCall().arguments[1]).toEqual(nextPage);
    });
});