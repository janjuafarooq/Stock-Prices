import { Component } from 'react';
import { GraphTemplate } from './Graph.tpl.js';
import PropTypes from 'prop-types';

export default class GraphComponent extends Component {
    render() {
        return GraphTemplate(this);
    }
};

GraphComponent.propTypes = {
    error: PropTypes.bool.isRequired,
    historicalData: PropTypes.array.isRequired,
    symbol: PropTypes.string
};