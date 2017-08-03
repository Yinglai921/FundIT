import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Link } from 'react-router-dom';

import D3KeywordThree from './d3-keyword-tree';
import Navigation from './navigation';
import { changeFilterTerm } from '../actions';

import ToggleMenuButton from '../components/buttons/toggle-menu-button';


class KeywordTree extends Component {
  constructor(props){
    super(props);
    this.state = {
      keyword:"",
      toggle: true
    }
    this.changeKeyword = this.changeKeyword.bind(this);
    this.jumpToIndex = this.jumpToIndex.bind(this);
    this.toggleMenu = this.toggleMenu.bind(this);
  }
  
  toggleMenu(e){
    e.preventDefault();
    const currentState = this.state.toggle;
    this.setState({toggle: !currentState});
  }

  changeKeyword(keyword){
    let index = keyword.indexOf('(') - 1;
    keyword = keyword.slice(0, index)
    
    console.log(index, keyword)
    this.props.changeFilterTerm(keyword);
    this.setState({keyword: keyword});
  }

  jumpToIndex(){
    this.props.history.push('/')
  }


  render() {
    return (

      <div id="wrapper" className={this.state.toggle ? "toggled" : null}>
            <Navigation />
            <div id="page-content-wrapper">
              <div className="container-fluid">
                  <div className="row">
                      <ToggleMenuButton toggleMenu={this.toggleMenu} />
                      <h3>Keyword tree</h3>
                      <select id="search" className="search"></select>
                      <D3KeywordThree onChangeKeyword={this.changeKeyword}/>
                      <div className="container">
                        keyword: {this.state.keyword} 
                        <button className="btn btn-primary" onClick={this.jumpToIndex} style={{marginLeft: '20px'}}> Set search keyword </button>
                      </div>
                  </div>
              </div>
          </div>
        </div>
    );
  }
}




function mapDispatchToProps(dispatch){
    return bindActionCreators({changeFilterTerm}, dispatch);
}

export default connect(null, mapDispatchToProps)(KeywordTree);
