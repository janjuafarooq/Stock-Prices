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

    it('it should get stock history before showing the graph', () => {
        const textToSearch = generateRandomString();
        const main = setup();
        const responseLength = generateNumberBetween1AndN(10);
        fetchMock.mock({ matcher: '/stockHistory/' + textToSearch, response: Array(responseLength).fill({}) });
        main.instance().showGraph(textToSearch)
        expect(fetchMock.called('/stockHistory/' + textToSearch)).toBe(true);
    });

    it('it should get company data when searching for companies', () => {
        const symbolToSearch = generateRandomString();
        const responseSize = generateNumberBetween1AndN(10);
        const responsePages = generateNumberBetween1AndN(10);
        const responseCount = generateNumberBetween1AndN(10);
        const main = setup();
        fetchMock.mock({
            matcher: '/companyData/' + symbolToSearch + '?page=' + main.state().companies.currentPage + '&pageSize=' + main.instance().props.pageSize,
            response: { "data": Array(responseSize).fill({}), "pages": responsePages, "count": responseCount }
        });
        main.instance().searchForCompanies(symbolToSearch)
        expect(fetchMock.called('/companyData/' + symbolToSearch + '?page=' + main.state().companies.currentPage + '&pageSize=' + main.instance().props.pageSize)).toBe(true);
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