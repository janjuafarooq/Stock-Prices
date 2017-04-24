import React from 'react';
import ReactDOM from 'react-dom';
import Main from './Main.component.js';

it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<Main />, div);
});
