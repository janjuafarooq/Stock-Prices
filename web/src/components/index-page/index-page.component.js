'use strict';
import React, { Component } from 'react';
import { IndexPageTemplate } from './index-page.tpl.js';

export default class IndexPageComponent extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return IndexPageTemplate(this);
  }
}
