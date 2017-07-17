import React, { Component } from 'react';

import D3BubbleChart from './d3-bubble-chart';
import Navigation from './navigation';
import data from '../data/group-keywords.json';

export default class TagsGraph extends Component {
  constructor(props){
    super(props);

  }
  
  render() {
    return (
      <div className="container">
            <Navigation />
            <h3>Tags bubble graph</h3>
            <D3BubbleChart data={data}/> 
      </div>
    );
  }
}