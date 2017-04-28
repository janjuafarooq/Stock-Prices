import React from 'react';
import ReactDOM from 'react-dom';
import Main from './components/main/Main.component.js';
import 'bootstrap/dist/css/bootstrap.css';
import config from './config.js'
ReactDOM.render(
  <Main {...config} />,
  document.getElementById('root')
);
