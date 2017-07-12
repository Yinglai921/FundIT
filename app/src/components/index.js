import React, { Component } from 'react';
import SearchBar from '../containers/search-bar';
import TopicsList from '../containers/topics-list';

export default class Index extends Component {
  render() {
    return (
      <div>
        <SearchBar />
        <TopicsList />
      </div>
    );
  }
}
