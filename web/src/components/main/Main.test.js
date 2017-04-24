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

    it('renders without crashing', () => {
        expect(main).toExist();
    });
});