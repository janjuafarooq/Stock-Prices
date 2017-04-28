import React from 'react';
import SearchBar from './SearchBar.component.js';
import expect from 'expect';
import { shallow } from 'enzyme';
import sinon from 'sinon';

describe('/components/SearchBar/SearchBar.component.js', () => {
    const toggleAutocompleteSpy = expect.spyOn(SearchBar.prototype, "toggleAutocomplete");
    const searchForCompaniesSpy = sinon.spy();

    const setup = propOverrides => {
        toggleAutocompleteSpy.reset();
        searchForCompaniesSpy.reset();

        const props = {
            searchForCompanies: searchForCompaniesSpy,
            ...propOverrides
        };

        const component = shallow(
            <SearchBar {...props} />
        );
        return component;
    };

    it('it should render without crashing', () => {
        const searchBar = setup();
        expect(searchBar).toExist();
    });

    it('it should have autocomplete disabled by default', () => {
        const searchBar = setup();
        expect(searchBar.state().autocomplete).toEqual(false);
        const checkbox = searchBar.find({ type: 'checkbox' });
        expect(checkbox.props().checked).toEqual(false);
    });

    it('it should not search when there is no text entered', () => {
        const searchBar = setup();
        const input = searchBar.find('input').at(0);
        searchBar.find('Button').simulate('click');
        expect(searchForCompaniesSpy.called).toBe(false);
    });

    it('it should add text to searchbar and should not auto search by default', () => {
        const textToSearch = 'nalgene'
        const searchBar = setup();
        const input = searchBar.find('input').at(0);
        input.simulate('keyPress', { target: { value: textToSearch } });
        expect(searchBar.state().searchText).toEqual(textToSearch);
        expect(searchForCompaniesSpy.called).toBe(false);
    });


    it('it should search when hitting the search button or enter', () => {
        const textToSearch = 'yahoo';
        const searchBar = setup();
        const input = searchBar.find('input').at(0);
        input.simulate('keyPress', { target: { value: textToSearch } });
        searchBar.find('Button').simulate('click');
        input.simulate('keyPress', { charCode: 13, target: { value: textToSearch }, preventDefault: () => { } });

        expect(searchForCompaniesSpy.calledTwice).toBe(true);
    })

    it('it should have auto complete enabled when clicked and call search', () => {
        const searchBar = setup();
        const checkbox = searchBar.find({ type: 'checkbox' });
        checkbox.simulate('change', { target: { checked: false } });
        expect(toggleAutocompleteSpy).toHaveBeenCalled();
    });

    it('it should search automatically when auto complete is enabled', () => {
        const textToSearch = 'microsoft';
        const searchBar = setup();
        searchBar.setState({
            autocomplete: true
        });
        const input = searchBar.find('input').at(0);
        input.simulate('keyPress', { target: { value: textToSearch } });
        expect(searchBar.state().searchText).toEqual(textToSearch);
        expect(searchForCompaniesSpy.called).toBe(true);
    });
});