import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Link } from 'react-router-dom';

import D3KeywordThree from './d3-keyword-tree';
import Navigation from './navigation';
import { changeFilterTerm } from '../actions';

class KeywordTree extends Component {
  constructor(props){
    super(props);
    this.state = {
      keyword:""
    }
    this.changeKeyword = this.changeKeyword.bind(this);
  }
  
  changeKeyword(keyword){
    //console.log(keyword)
    this.props.changeFilterTerm(keyword, () => {
      this.props.history.push('/')
    });
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
               keyword: {this.state.keyword} 
               <button className="btn btn-primary"> Set search keyword </button>
            </div>
      </div>
    );
  }
}




function mapDispatchToProps(dispatch){
    return bindActionCreators({changeFilterTerm}, dispatch);
}

export default connect(null, mapDispatchToProps)(KeywordTree);
