import React from 'react';
import ReactDOM from 'react-dom';
import Graph from './Graph.component.js';
import expect from 'expect';
import { shallow } from 'enzyme';
import sinon from 'sinon';

describe('/components/graph/Graph.component.js', () => {
    const setup = propOverrides => {
        const props = {
            symbol: '',
            historicalData: [],
            error: false,
            ...propOverrides
        };
        const component = shallow(
            <Graph {...props} />
        );
        return component;
    };

    it('it should render without crashing', () => {
        const graph = setup();
        expect(graph).toExist();
        expect(graph.instance().props.symbol).toBe('');
        expect(graph.instance().props.historicalData.length).toBe(0);
        expect(graph.instance().props.historicalData).toBeAn('array');
        expect(graph.instance().props.error).toBe(false);
    });

    it('it should not have an error or chart displayed by default', () => {
        const graph = setup();
        const error = graph.find('h3').length;
        expect(error).toNotExist();
        const chart = graph.find('CandlestickChart').length;
        expect(chart).toNotExist();
    });

    it('it should not have an error displayed when received', () => {
        const graph = setup({ error: true });
        expect(graph.instance().props.error).toBe(true);
        const error = graph.find('h3').length;
        expect(error).toExist();
    });

    it('it should display a chart when it has historical data', () => {
        const graph = setup({ historicalData: new Array(10) });
        expect(graph.instance().props.historicalData.length).toBe(10);
        const chart = graph.find('CandleStickChart').length;
        expect(chart).toExist();
    });
});