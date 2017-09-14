import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Link } from 'react-router-dom';
import { Alert } from 'reactstrap';
//import SwitchButton from 'react-switch-button';

import D3KeywordThree from './d3-keyword-tree';
import D3KeywordColorLegend from './d3-keyword-color-legend';

import Navigation from './navigation';
import { changeFilterTerm, setNavigationToggle, selectKeywords, setColorToggle } from '../actions';

import ToggleMenuButton from '../components/buttons/toggle-menu-button';
import ToggleColorButton from '../components/buttons/toggle-color-button';
import KeywordTreeSearch from '../containers/keyword-tree-search';


class KeywordTree extends Component {
  constructor(props){
    super(props);
    this.state = {
      keyword: this.props.searchTerm,
      keywords: this.props.selectedKeywords,
      toggle: true,
      alertVisible: true,
      colorCheck: this.props.colorToggle,
    }
    this.changeKeyword = this.changeKeyword.bind(this);
    this.selectKeywords = this.selectKeywords.bind(this);
    this.jumpToIndex = this.jumpToIndex.bind(this);
    this.toggleMenu = this.toggleMenu.bind(this);
    this.onDismiss = this.onDismiss.bind(this);
    this.onColorCheck = this.onColorCheck.bind(this);
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
    keyword = `"${keyword}"`;
    this.props.changeFilterTerm(keyword);
    this.setState({keyword: keyword});
    this.jumpToIndex();
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

  onColorCheck(e){
    e.preventDefault();
    this.setState({colorCheck: !this.state.colorCheck});
    this.props.setColorToggle(!this.state.colorCheck);
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

                      <div className="btn-group" role="group" style={{float: "right", top: "10px"}}>
                          <button type="button" className={this.state.colorCheck ? "btn btn-default" : "btn btn-primary active"} onClick={this.onColorCheck}>Default Graph</button>
                          <button type="button" className={this.state.colorCheck ? "btn btn-primary active" : "btn btn-default"} onClick={this.onColorCheck}>Colored Graph</button>
                      </div>

                      <div style={{marginTop: "30px", marginLeft: "20px"}} className={this.state.colorCheck? " " : "hidden"}>
                        <p> Number of topics that includes this keyword: </p>
                        <D3KeywordColorLegend />
                      </div>
                      
                      <div id="keyword-tree-graph">
                        <D3KeywordThree onChangeKeyword={this.changeKeyword} keywords={this.state.keywords} onSelectKeywords={this.selectKeywords} colorToggle={this.state.colorCheck}/>
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
        colorToggle: state.colorToggle,

    };
}


function mapDispatchToProps(dispatch){
    return bindActionCreators({changeFilterTerm, setNavigationToggle, selectKeywords, setColorToggle}, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(KeywordTree);
