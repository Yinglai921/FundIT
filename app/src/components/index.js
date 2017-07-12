import React, { Component } from 'react';
import SearchBar from '../containers/search-bar';
import TopicsList from '../containers/topics-list';
import FilterSidebar from '../containers/filter-sidebar';

export default class Index extends Component {
  render() {
    return (
      <div className="container">
        <SearchBar />
        <div className="row">
            <TopicsList />
            <FilterSidebar />
        </div>
      </div>
    );
  }
}
