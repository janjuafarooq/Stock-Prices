import React from 'react';
import ReactDOM from 'react-dom';
import Main from './Main.component.js';
import expect from 'expect';
import { mount } from 'enzyme';

describe('/components/main/Main.component.js', () => {
    let main;
    beforeEach(() => {
        main = mount(<Main />);
    });

    it('it should render without crashing', () => {
        expect(main).toExist();
    });

    it('it should update companies to search', () => {
        main.instance().updateSearchText('apple');
        expect(main.state().searchText).toEqual('apple');
    });

    it('it should update stock symbol to search', () => {
        main.instance().updateSymbol('aapl');
        expect(main.state().symbol).toEqual('aapl');
    });
});