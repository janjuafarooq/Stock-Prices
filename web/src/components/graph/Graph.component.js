import { Component } from 'react';
import { GraphTemplate } from './Graph.tpl.js';
import { getStockHistory } from '../../services/stockHistory.js';

export default class GraphComponent extends Component {
    constructor(props) {
        super(props);

        this.state = {
            symbol: props.symbol,
            historicalData: []
        };
    }

    componentWillReceiveProps(props) {
        // Only want to fetch when a new symbol is selected, not when other properties change
        if (props.symbol && props.symbol !== this.state.symbol) {
            getStockHistory(props.symbol).then((res) => {
                this.setState({
                    symbol: props.symbol,
                    historicalData: res
                });
            });
        }
    }

    render() {
        return GraphTemplate(this);
    }
}