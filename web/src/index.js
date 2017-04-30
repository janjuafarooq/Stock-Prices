import React from 'react';
import ReactDOM from 'react-dom';
import Main from './components/main/Main.component.js';
import config from './config.js'
import 'bootstrap/dist/css/bootstrap.min.css';

ReactDOM.render(
  <Main {...config} />,
  document.getElementById('root')
);
