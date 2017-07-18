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
          <SearchBar />
          <p> No result </p>
        </div>
      )
    }

    return (
      <div className="container">
        <Navigation />
        <SearchBar />
        <div className="row">
            <TopicsList />
            <FilterSidebar />
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