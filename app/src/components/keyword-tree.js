import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Link } from 'react-router-dom';

import D3KeywordThree from './d3-keyword-tree';
import Navigation from './navigation';
import { changeFilterTerm, setNavigationToggle, selectKeywords } from '../actions';

import ToggleMenuButton from '../components/buttons/toggle-menu-button';
import KeywordTreeSearch from '../containers/keyword-tree-search';


class KeywordTree extends Component {
  constructor(props){
    super(props);
    this.state = {
      keyword: this.props.searchTerm,
      keywords: this.props.selectedKeywords,
      toggle: true,
    }
    this.changeKeyword = this.changeKeyword.bind(this);
    this.selectKeywords = this.selectKeywords.bind(this);
    this.jumpToIndex = this.jumpToIndex.bind(this);
    this.toggleMenu = this.toggleMenu.bind(this);
  }
  
  componentDidMount(){
    this.setState({
      toggle: this.props.navigationToggle,
    });
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

  selectKeywords(keywordsList){
    this.setState({keywords: keywordsList});
    this.props.selectKeywords(keywordsList);
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
                      <KeywordTreeSearch onChangeKeyword={this.changeKeyword} onSelectKeywords={this.selectKeywords}/>
                      <div className="set-search-word-row">
                         Selected keyword: <b>{this.state.keyword}</b>
                         <p>Searched keywords: {this.state.keywords}</p>
                        <button className="btn btn-primary" onClick={this.jumpToIndex} style={{marginLeft: '20px'}}> Search topics</button>
                      </div>
                      <div id="keyword-tree-graph">
                        <D3KeywordThree onChangeKeyword={this.changeKeyword} keywords={this.state.keywords} onSelectKeywords={this.selectKeywords} />
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
        searchTerm: state.searchTerm,
        selectedKeywords: state.selectedKeywords,
    };
}


function mapDispatchToProps(dispatch){
    return bindActionCreators({changeFilterTerm, setNavigationToggle, selectKeywords}, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(KeywordTree);
