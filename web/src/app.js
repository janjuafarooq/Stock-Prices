import React from 'react';
import ReactDOM from 'react-dom';

import IndexPageComponent from './components/index-page/index-page.component.js';
import styles from './styles/main.scss';

const App = React.createClass({
  render() {
    return (
      <IndexPageComponent />
    );
  },
});

ReactDOM.render(<App />, document.getElementById('mount'));
