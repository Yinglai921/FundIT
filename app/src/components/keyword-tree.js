import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Link } from 'react-router-dom';
import { Alert } from 'reactstrap';

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
      alertVisible: true,
    }
    this.changeKeyword = this.changeKeyword.bind(this);
    this.selectKeywords = this.selectKeywords.bind(this);
    this.jumpToIndex = this.jumpToIndex.bind(this);
    this.toggleMenu = this.toggleMenu.bind(this);
    this.onDismiss = this.onDismiss.bind(this);
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
    this.props.selectKeywords(keywordsList);
    this.setState({keywords: keywordsList});
    console.log("select Keywords: ", this.state.keywords)
  }

  jumpToIndex(){
    this.props.history.push('/')
  }

  onDismiss(){
    this.setState({alertVisible: false});
  }


  render() {
    return (

      <div id="wrapper" className={this.state.toggle ? "toggled" : null}>
            <Navigation active={"keyword"}/>
            <div id="page-content-wrapper">
              <div className="container-fluid">
                  <div className="row">
                      <Alert color="info" isOpen={this.state.alertVisible} toggle={this.onDismiss}>
                          Double click the graph to recenter it!
                      </Alert>
                      <ToggleMenuButton toggleMenu={this.toggleMenu} />
                      <h3>Keyword tree</h3>
                      <KeywordTreeSearch 
                        onChangeKeyword={this.changeKeyword} 
                        onSelectKeywords={this.selectKeywords}
                        keywords={this.state.keywords}
                        />
                      <div className="set-search-word-row">
                         Selected keyword: <b>{this.state.keyword}</b>
                        <button className="btn btn-primary" onClick={this.jumpToIndex} style={{marginLeft: '20px'}}> Search topics</button> <i>Please click a text in the graph to set a keyword </i>
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
