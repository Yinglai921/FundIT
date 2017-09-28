import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import SearchBar from './search-bar';
import TopicsList from './topics-list';


import Navigation from '../components/navigation';

import { setNavigationToggle } from '../actions/index';

class Index extends Component {

  constructor(props){
    super(props);
  }

  componentDidMount(){
    this.setState({toggle: this.props.navigationToggle});
  }


  render() {

    return(
       <div className="container-fluid">
         <div className="row">
            <Navigation active={"index"}/>
          </div>
          <div className="row">
            <SearchBar />
          </div>
          <div className="row">
            <div className="col-sm-12">
              {this.props.searchedTopics.length == 0 ? "No results found." : <TopicsList />}
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