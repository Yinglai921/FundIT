import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Link } from 'react-router-dom';
import { Alert } from 'reactstrap';
//import SwitchButton from 'react-switch-button';

import D3KeywordThree from './d3-keyword-tree';
import D3KeywordColorLegend from './d3-keyword-color-legend';

import Navigation from './navigation';
import { changeFilterTerm, setNavigationToggle, selectKeywords, setColorToggle, fetchKeywordTree } from '../actions';

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
    this.addOneKeyword = this.addOneKeyword.bind(this);
  }
  


  componentDidMount(){
    this.setState({
      toggle: this.props.navigationToggle,
    });

    this.props.fetchKeywordTree();
  }

  toggleMenu(e){
    e.preventDefault();
    const currentState = this.state.toggle;
    this.setState({toggle: !currentState});

    this.props.setNavigationToggle(!currentState);
  }
  
  // when clicking a node of the tree graph, get the keyword
  changeKeyword(keyword){

    keyword = `"${keyword}"`;
    this.props.changeFilterTerm(keyword); // just another name, change the searched term
    this.setState({keyword: keyword});
    this.jumpToIndex();
  }

  selectKeywords(keywordsList){
    
    let newKeywordsList = [];
    keywordsList.forEach((keyword) => {
       let lastOccuranceIndex = keyword.lastIndexOf("(") - 1;
       let word = keyword.substring(0, lastOccuranceIndex);
       newKeywordsList.push(word);
    })

    console.log("keywordsList: ", newKeywordsList)
    this.props.selectKeywords(newKeywordsList);
    this.setState({keywords: newKeywordsList});
  }

  addOneKeyword(keyword, callback){
    let newKeywordsList = this.state.keywords;
    newKeywordsList.push(keyword);
    this.setState({keywords: newKeywordsList});
    this.props.selectKeywords(newKeywordsList);
    callback(keyword);
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
    if (this.props.keywordTree.length === 0){
      return (<p> Loading ... </p>)
    }else{
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
                          <D3KeywordThree onChangeKeyword={this.changeKeyword} data={this.props.keywordTree} keywords={this.state.keywords} onSelectKeywords={this.addOneKeyword} colorToggle={this.state.colorCheck}/>
                        </div>
                    </div>
                </div>
            </div>
          </div>
      );
    }

  }
}

function mapStateToProps(state){
    return{ 
        navigationToggle: state.navigationToggle,
        searchTerm: state.searchTerm,
        selectedKeywords: state.selectedKeywords,
        colorToggle: state.colorToggle,
        keywordTree: state.keywordTree,

    };
}


function mapDispatchToProps(dispatch){
    return bindActionCreators({changeFilterTerm, setNavigationToggle, selectKeywords, setColorToggle, fetchKeywordTree}, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(KeywordTree);
