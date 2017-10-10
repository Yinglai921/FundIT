import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';


import Navigation from '../components/navigation';
import TopicsList from './topics-list';
import AdvancedSearchForm from './advanced-search-form';

import { setNavigationToggle, setAdvancedSearchQueries, advancedSearchTopics } from '../actions/index';


class AdvancedSearch extends Component {

  constructor(props){
    super(props);
    this.state ={
      initial: true
    }
    this.advancedSearchSubmit = this.advancedSearchSubmit.bind(this);
  }

  componentDidMount(){
    // advanced search topics
    // this.props.advancedSearchTopics(this.props.advancedSearchQueries);
  }

  advancedSearchSubmit(values){
    // store the values in redux
    this.props.setAdvancedSearchQueries(values);
    // advanced search topics
    this.props.advancedSearchTopics(values);
    this.setState({initial: false});
  }

  render() {

    return(
       <div className="container-fluid">
         <div className="row">
            <Navigation active={"advanced-search"}/>
          </div>
          <div className="row">
            <div className="col-sm-12">
              <p> Hints: Search a phrase with quotes, for example: "Collection of local data" </p>
              <p> Hints: Search several words with semicolon to separate them: for example: data; security; bioinformatics </p>
            </div>
            <AdvancedSearchForm onSubmit={this.advancedSearchSubmit} initialData={this.props.advancedSearchQueries}/>
          </div>
          <div className="row">
            <div className="col-sm-12">
              {this.state.initial? "No results found." : <TopicsList />}
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

