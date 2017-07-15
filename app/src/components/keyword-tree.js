import React, { Component } from 'react';

import D3KeywordThree from './d3-keyword-tree';
import Navigation from './navigation';

export default class KeywordTree extends Component {
  constructor(props){
    super(props);
    this.state = {
      keyword: ''
    }
    this.changeKeyword = this.changeKeyword.bind(this);
  }
  
  changeKeyword(keyword){
    //console.log(keyword)
    this.setState({keyword: keyword});
  }
  render() {
    return (
      <div className="container">
            <Navigation />
            <h3>Keyword tree</h3>
            <select id="search" className="search"></select>
            <D3KeywordThree onChangeKeyword={this.changeKeyword}/>
            <div className="container">
               Search keyword: {this.state.keyword} 
               <button className="btn btn-primary"> Search </button>
            </div>
      </div>
    );
  }
}
