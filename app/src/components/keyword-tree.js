import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Link } from 'react-router-dom';

import D3KeywordThree from './d3-keyword-tree';
import Navigation from './navigation';
import { changeFilterTerm, setNavigationToggle } from '../actions';

import ToggleMenuButton from '../components/buttons/toggle-menu-button';


class KeywordTree extends Component {
  constructor(props){
    super(props);
    this.state = {
      keyword:"",
      toggle: true,
    }
    this.changeKeyword = this.changeKeyword.bind(this);
    this.jumpToIndex = this.jumpToIndex.bind(this);
    this.toggleMenu = this.toggleMenu.bind(this);
  }
  
  componentDidMount(){
    this.setState({toggle: this.props.navigationToggle});
  }

  toggleMenu(e){
    e.preventDefault();
    const currentState = this.state.toggle;
    this.setState({toggle: !currentState});

    this.props.setNavigationToggle(!currentState);
  }

  changeKeyword(keyword){
    if (keyword.indexOf('(') !== -1){
      let index = keyword.indexOf('(') - 1;
      keyword = keyword.slice(0, index)
    }
    this.props.changeFilterTerm(keyword);
    this.setState({keyword: keyword});
  }

  jumpToIndex(){
    this.props.history.push('/')
  }


  render() {
    return (

      <div id="wrapper" className={this.state.toggle ? "toggled" : null}>
            <Navigation active={"keyword"}/>
            <div id="page-content-wrapper">
              <div className="container-fluid">
                  <div className="row">
                      <ToggleMenuButton toggleMenu={this.toggleMenu} />
                      <h3>Keyword tree</h3>
                      <select id="search" className="search"></select>
                      <div className="set-search-word-row">
                         Selected keyword: <b>{this.state.keyword}</b>
                        <button className="btn btn-primary" onClick={this.jumpToIndex} style={{marginLeft: '20px'}}> Search topics</button>
                      </div>
                      <div id="keyword-tree-graph">
                        <D3KeywordThree onChangeKeyword={this.changeKeyword}/>
                      </div>
                  </div>
              </div>
          </div>
        </div>
    );
  }
}

function mapStateToProps(state){
    return{ 
        navigationToggle: state.navigationToggle,
    };
}


function mapDispatchToProps(dispatch){
    return bindActionCreators({changeFilterTerm, setNavigationToggle}, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(KeywordTree);
