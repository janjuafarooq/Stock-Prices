import React from 'react';
import ReactDOM from 'react-dom';
import Main from './Main.component.js';
import expect from 'expect';
import { renderIntoDocument } from 'react-addons-test-utils';

describe('/components/main/Main.component.js', () => {
    let main;
    beforeEach(() => {
        main = renderIntoDocument(
            <Main />
        );
    });

    it('it should render without crashing', () => {
        expect(main).toExist();
    });

    it('it should update companies to search', () => {
        main.getCompanies('apple');
        expect(main.state.searchText).toEqual('apple');
    });

    it('it should update stock symbol to search', () => {
        main.getStockData('aapl');
        expect(main.state.symbol).toEqual('aapl');
    });
});