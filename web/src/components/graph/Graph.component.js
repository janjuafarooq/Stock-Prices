import { Component } from 'react';
import { GraphTemplate } from './Graph.tpl.js';
import { getStockHistory } from '../../services/stockHistory.js';
import ReactDOM from 'react-dom';

export default class GraphComponent extends Component {
    constructor(props) {
        super(props);

        this.state = {
            historicalData: []
        };
    }

    componentWillReceiveProps(props) {
        // Only want to fetch when a new symbol is selected
        if (props.symbol && props.symbol !== this.state.symbol) {
            getStockHistory(props.symbol).then((res) => {
                this.setState(() => ({
                    symbol: props.symbol,
                    historicalData: res
                }), () => {
                    const node = ReactDOM.findDOMNode(this.bottomOfGraph);
                    node.scrollIntoView({ behavior: "smooth" });
                });
            });
        }
    }

    render() {
        return GraphTemplate(this);
    }
}
