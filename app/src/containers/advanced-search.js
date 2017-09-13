import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';


import Navigation from '../components/navigation';
import ToggleMenuButton from '../components/buttons/toggle-menu-button';
import TopicsList from './topics-list';
import AdvancedSearchForm from './advanced-search-form';

import { setNavigationToggle, setAdvancedSearchQueries, advancedSearchTopics } from '../actions/index';

import help1 from '../styles/img/help1.gif'

class AdvancedSearch extends Component {

  constructor(props){
    super(props);
    this.toggleMenu = this.toggleMenu.bind(this);
    this.state ={
      toggle: true
    }
    this.advancedSearchSubmit = this.advancedSearchSubmit.bind(this);
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

  advancedSearchSubmit(values){
    // store the values in redux
    this.props.setAdvancedSearchQueries(values);
    // advanced search topics
    this.props.advancedSearchTopics(values);
  }

  render() {

    return(
       <div id="wrapper" className={this.state.toggle ? "toggled" : null}>
            <Navigation active={"advanced-search"}/>
            <div id="page-content-wrapper">
              <div className="container-fluid">
                  <div className="row">
                    <ToggleMenuButton toggleMenu={this.toggleMenu} />
                    <AdvancedSearchForm onSubmit={this.advancedSearchSubmit} initialData={this.props.advancedSearchQueries}/>
                  </div>
                  <div className="row">
                    {this.props.searchedTopics.length == 0 ? "No results found." : <TopicsList />}
                </div>
              </div>
          </div>
        </div>
    )
  }
}


function mapStateToProps(state){
    return{ 
        navigationToggle: state.navigationToggle,
        searchedTopics: state.searchedTopics,
        advancedSearchQueries: state.advancedSearchQueries
    };
}


function mapDispatchToProps(dispatch){
    return bindActionCreators({setNavigationToggle, setAdvancedSearchQueries, advancedSearchTopics}, dispatch);
}
  
export default connect(mapStateToProps, mapDispatchToProps)(AdvancedSearch);

