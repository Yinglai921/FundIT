import React, { Component } from 'react';
import { connect } from 'react-redux';

import SearchBar from './search-bar';
import TopicsList from './topics-list';
import FilterSidebar from './filter-sidebar';

import Navigation from '../components/navigation';

class Index extends Component {

  constructor(props){
    super(props);
    this.toggleMenu = this.toggleMenu.bind(this);
    this.state ={
      toggle: false
    }
  }

  toggleMenu(e){
    e.preventDefault();
    const currentState = this.state.toggle;
    this.setState({toggle: !currentState});
  }

  render() {

    if(this.props.searchedTopics.length == 0){
      return(
        <div id="wrapper" className={this.state.toggle ? "toggled" : null}>
            <Navigation />
            <div id="page-content-wrapper">
              <div class="container-fluid">
                  <div class="row">
                      <a href="#menu-toggle" className="btn btn-default" id="menu-toggle" onClick={this.toggleMenu}>Toggle Menu</a>
                      <SearchBar />
                      <FilterSidebar />
                  </div>
                  <div className="row">
                    <p> No result </p>
                </div>
              </div>
          </div>
        </div>
      )
    }

    return (
      <div id="wrapper" className={this.state.toggle ? "toggled" : null}>
            <Navigation />
            <div id="page-content-wrapper">
              <div class="container-fluid">
                  <div class="row">
                      <a href="#menu-toggle" className="btn btn-default" id="menu-toggle" onClick={this.toggleMenu}>Toggle Menu</a>
                      <SearchBar />
                      <FilterSidebar />
                  </div>
                  <div className="row">
                    <TopicsList />
                </div>
              </div>
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