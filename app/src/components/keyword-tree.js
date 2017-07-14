import React, { Component } from 'react';

import D3KeywordThree from './d3-keyword-tree';
import Navigation from './navigation';

export default class KeywordTree extends Component {
  render() {
    return (
      <div className="container">
            <Navigation />
            <p>Keyword tree</p>
            <select id="search" className="search"></select>
            <D3KeywordThree />
      </div>
    );
  }
}
