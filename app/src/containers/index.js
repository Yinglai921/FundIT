import React, { Component } from 'react';
import { connect } from 'react-redux';

import SearchBar from './search-bar';
import TopicsList from './topics-list';
import FilterSidebar from './filter-sidebar';

import Navigation from '../components/navigation';
import ToggleMenuButton from '../components/buttons/toggle-menu-button';

class Index extends Component {

  constructor(props){
    super(props);
    this.toggleMenu = this.toggleMenu.bind(this);
    this.state ={
      toggle: true
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
              <div className="container-fluid">
                  <div className="row">
                    <ToggleMenuButton toggleMenu={this.toggleMenu} />
                    <SearchBar />
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
              <div className="container-fluid">
                  <div className="row">
                      <ToggleMenuButton toggleMenu={this.toggleMenu} />
                      <SearchBar />
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