import React, { Component } from 'react';
import { connect } from 'react-redux';

import SearchBar from './search-bar';
import TopicsList from './topics-list';
import FilterSidebar from './filter-sidebar';

import Navigation from '../components/navigation';

class Index extends Component {
  render() {

    if(this.props.searchedTopics.length == 0){
      return(
        <div className="container">
          <Navigation />
          <div className="row">
            <SearchBar />
            <FilterSidebar />
          </div>
          <div className="row">
            <p> No result </p>
          </div>
        </div>
      )
    }

    return (
      <div className="container">
        <Navigation />
        <div className="row">
          <SearchBar />
          <FilterSidebar />
        </div>
        <div className="row">
            <TopicsList />
        </div>
      </div>
    );
  }
}


function mapStateToProps(state){
    return{ 
        searchedTopics: state.searchedTopics
    };
}


export default connect(mapStateToProps, null)(Index);