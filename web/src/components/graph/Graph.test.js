import React from 'react';
import ReactDOM from 'react-dom';
import Graph from './Graph.component.js';
import expect from 'expect';
import { mount } from 'enzyme';
import sinon from 'sinon';

describe('/components/graph/Graph.component.js', () => {
    let graph;
    const receivePropsSpy = sinon.spy(Graph.prototype, 'componentWillReceiveProps');
    const props = {
        symbol: 'aapl'
    };

    beforeEach(() => {
        graph = mount(<Graph {...props} />);
    });

    it('it should render without crashing', () => {
        expect(graph).toExist();
        expect(graph.state().symbol).toEqual('aapl');
    });

    it('it should updates when receiving props', () => {
        graph.setProps({ symbol: "goog" });
        expect(receivePropsSpy.calledOnce).toBe(true);
    });

});