import { Component } from 'react';
import { GraphTemplate } from './Graph.tpl.js';

export default class GraphComponent extends Component {
    render() {
        return GraphTemplate(this);
    }
}
