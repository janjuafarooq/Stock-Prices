import React from 'react';
import ReactDOM from 'react-dom';
import Graph from './Graph.component.js';
import expect from 'expect';
import { renderIntoDocument } from 'react-addons-test-utils';

describe('/components/graph/Graph.component.js', () => {
    let graph;
    const props = {
        symbol: 'aapl'
    };

    beforeEach(() => {
        graph = renderIntoDocument(
            <Graph {...props} />
        );
    });

    it('it should render without crashing', () => {
        expect(graph).toExist();
        expect(graph.state.symbol).toEqual('aapl');
    });
});