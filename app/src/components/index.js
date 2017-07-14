import React, { Component } from 'react';

import SearchBar from '../containers/search-bar';
import TopicsList from '../containers/topics-list';
import FilterSidebar from '../containers/filter-sidebar';

import Navigation from './navigation';

export default class Index extends Component {
  render() {
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
