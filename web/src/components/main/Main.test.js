import React from 'react';
import ReactDOM from 'react-dom';
import Main from './Main.component.js';
import expect from 'expect';
import { shallow } from 'enzyme';
import fetchMock from 'fetch-mock';

describe('/components/main/Main.component.js', () => {
    const setup = propOverrides => {
        const props = {
            pageSize: 10,
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
        const textToSearch = 'apple';
        fetchMock.mock({ matcher: '/stockHistory/' + textToSearch, response: { "data": new Array(5), "pages": 1, "count": 1 } });
        const main = setup();
        main.instance().showGraph(textToSearch);
        expect(fetchMock.called('/stockHistory/' + textToSearch)).toBe(true);
    });

    it('it should get company data when searching for companies', () => {
        const symbolToSearch = 'appl';
        const main = setup();
        fetchMock.mock({ matcher: '/companyData/' + symbolToSearch + '?page=' + main.state().companies.currentPage + '&pageSize=' + main.instance().props.pageSize, response: { "data": new Array(5), "pages": 1, "count": 1 } });
        main.instance().searchForCompanies(symbolToSearch);
        expect(fetchMock.called('/companyData/' + symbolToSearch + '?page=' + main.state().companies.currentPage + '&pageSize=' + main.instance().props.pageSize)).toBe(true);
    });

    it('it should get company data when changing pages', () => {
        let nextPage = 2;
        const main = setup();
        main.setState({
            companies: {
                searchText: 'goog'
            }
        });
        fetchMock.mock({ matcher: '/companyData/' + main.state().companies.searchText + '?page=' + nextPage + '&pageSize=' + main.instance().props.pageSize, response: { "data": new Array(5), "pages": 1, "count": 1 } });
        main.instance().updatePage(nextPage);
        expect(fetchMock.called('/companyData/' + main.state().companies.searchText + '?page=' + nextPage + '&pageSize=' + main.instance().props.pageSize)).toBe(true);
        nextPage = 1;
        fetchMock.mock({ matcher: '/companyData/' + main.state().companies.searchText + '?page=' + nextPage + '&pageSize=' + main.instance().props.pageSize, response: { "data": new Array(5), "pages": 1, "count": 1 } });
        main.instance().updatePage(nextPage);
        expect(fetchMock.called('/companyData/' + main.state().companies.searchText + '?page=' + nextPage + '&pageSize=' + main.instance().props.pageSize)).toBe(true);
    });
});