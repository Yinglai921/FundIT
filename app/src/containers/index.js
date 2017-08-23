import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import SearchBar from './search-bar';
import TopicsList from './topics-list';

import Navigation from '../components/navigation';
import ToggleMenuButton from '../components/buttons/toggle-menu-button';

import { setNavigationToggle } from '../actions/index';

class Index extends Component {

  constructor(props){
    super(props);
    this.toggleMenu = this.toggleMenu.bind(this);
    this.state ={
      toggle: true
    }
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

  render() {

    return(
       <div id="wrapper" className={this.state.toggle ? "toggled" : null}>
            <Navigation active={"index"}/>
            <div id="page-content-wrapper">
              <div className="container-fluid">
                  <div className="row">
                    <ToggleMenuButton toggleMenu={this.toggleMenu} />
                    <SearchBar />
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
        searchedTopics: state.searchedTopics,
        navigationToggle: state.navigationToggle,
    };
}


function mapDispatchToProps(dispatch){
    return bindActionCreators({setNavigationToggle}, dispatch);
}
  
export default connect(mapStateToProps, mapDispatchToProps)(Index);