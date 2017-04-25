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
            .mock('/companyData/apple?page=2&pageSize=10', 'GET', {
                data: [{ "data": [{ "_id": "58fab0313f2ef659952953cf", "Symbol": "APLE", "Name": "Apple Hospitality REIT, Inc.", "LastSale": 19.18, "MarketCap": "$4.28B", "IPOyear": "n/a", "Sector": "Consumer Services", "industry": "Real Estate Investment Trusts", "Summary Quote": "http://www.nasdaq.com/symbol/aple", "": "" }, { "_id": "58fab02e3f2ef6599529473d", "Symbol": "AAPL", "Name": "Apple Inc.", "LastSale": 142.44, "MarketCap": "$747.32B", "IPOyear": "n/a", "Sector": "Technology", "industry": "Computer Manufacturing", "Summary Quote": "http://www.nasdaq.com/symbol/aapl", "": "" }, { "_id": "58fab0313f2ef6599529569e", "Symbol": "DPS", "Name": "Dr Pepper Snapple Group, Inc", "LastSale": 98.09, "MarketCap": "$18.03B", "IPOyear": "n/a", "Sector": "Consumer Non-Durables", "industry": "Beverages (Production/Distribution)", "Summary Quote": "http://www.nasdaq.com/symbol/dps", "": "" }, { "_id": "58fab0313f2ef65995295a05", "Symbol": "MLP", "Name": "Maui Land & Pineapple Company, Inc.", "LastSale": 13.6, "MarketCap": "$258.63M", "IPOyear": "n/a", "Sector": "Finance", "industry": "Real Estate", "Summary Quote": "http://www.nasdaq.com/symbol/mlp", "": "" }], "pages": 1, "count": 4 }]
            });

        searchResults.updatePage(e);
        expect(fetchMock.called('/companyData/apple?page=2&pageSize=10')).toBe(true);
    });
});