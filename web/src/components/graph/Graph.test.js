import React from 'react';
import ReactDOM from 'react-dom';
import Graph from './Graph.component.js';

it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<Graph />, div);
});
