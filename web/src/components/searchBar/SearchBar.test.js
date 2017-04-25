import React from 'react';
import SearchBar from './SearchBar.component.js';
import expect from 'expect';
import { mount } from 'enzyme';
import sinon from 'sinon';

describe('/components/SearchBar/SearchBar.component.js', () => {
    let searchBar;
    const toggleAutocompleteSpy = expect.spyOn(SearchBar.prototype, "toggleAutocomplete");
    const updateSearchTextSpy = sinon.spy();
    const props = {
        updateSearchText: updateSearchTextSpy
    };

    beforeEach(() => {
        searchBar = mount(<SearchBar {...props} />);
    });

    it('it should render without crashing', () => {
        expect(searchBar).toExist();
    });

    it('it should have autocomplete disabled by default', () => {
        expect(searchBar.state().autocomplete).toEqual(false);
        const checkbox = searchBar.find({ type: 'checkbox' });
        expect(checkbox.props().checked).toEqual(false);
    });

    it('it should add text to searchbar and should not auto search by default', () => {
        const input = searchBar.find('input').at(0);
        input.simulate('keyPress', { target: { value: 'aapl' } });
        expect(searchBar.state().searchText).toEqual('aapl');
        expect(updateSearchTextSpy.called).toBe(false);
    });

    it('it should search when hitting the search button or enter', () => {
        const input = searchBar.find('input').at(0);
        input.simulate('keyPress', { target: { value: 'aapl' } });
        expect(searchBar.state().searchText).toEqual('aapl');
        searchBar.find('Button').simulate('click');

        input.simulate('keyPress', { target: { value: 'goog' } });
        expect(searchBar.state().searchText).toEqual('goog');
        input.simulate('keyPress', { charCode: 13 });

        expect(updateSearchTextSpy.calledTwice).toBe(true);
    })

    it('it should have auto complete enabled when clicked and call search', () => {
        const checkbox = searchBar.find({ type: 'checkbox' });
        checkbox.simulate('change', { target: { checked: false } });
        expect(toggleAutocompleteSpy).toHaveBeenCalled();
        const input = searchBar.find('input').at(0);
        input.simulate('keyPress', { target: { value: 'aapl' } });
        expect(searchBar.state().searchText).toEqual('aapl');
        expect(updateSearchTextSpy.called).toBe(true);
    });
})