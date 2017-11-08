import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import SearchBar from './search-bar';
import TopicsList from './topics-list';
import Help from './help';


import Navigation from '../components/navigation';
import Footer from '../components/footer';

import { setNavigationToggle } from '../actions/index';

class Index extends Component {

  constructor(props){
    super(props);
    this.state = {
      modal: false,
    }
    this.searchResultNotice = this.searchResultNotice.bind(this);
  }

  componentDidMount(){
    this.setState({toggle: this.props.navigationToggle});
    console.log(this.props)
  }

  searchResultNotice(){
    if (this.props.searchTerm == "" && this.props.location.search == ""){
      return (
        <div style={{color:"#888"}}><p>Please enter a word to start search...</p></div>
      )
    }else{
      if (this.props.searchedTopics.length == 0){
        return <div style={{color:"#888"}}><p>No results found...</p></div>
      }else{
        return ""
      }
    }
  }


  render() {

    return(
       <div className="container-fluid">

          <div className="row">
              <Navigation active={"index"}/>
          </div>

          <div className="row">
              <SearchBar history={this.props.history} queries={this.props.location.search}/>
          </div>

          <div className="row">
              <div className="col-sm-12">
                {this.searchResultNotice()}
                {this.props.searchedTopics.length == 0 ? <Help /> : <TopicsList />}
              </div>
          </div>

          <div className="row top-margin">                   
            <div className="col-sm-12" style={{textAlign: "center", marginBottom: "50px"}}>
              <p> If you want to know more about H2020 and how to use the system. Please check <a href="#">User Guide </a><br />
              </p>
            </div>
          </div>

          <Footer />
      </div>
    )
  }
}


function mapStateToProps(state){
    return{ 
        searchedTopics: state.searchedTopics,
        navigationToggle: state.navigationToggle,
        searchTerm: state.searchTerm,

    };
}


function mapDispatchToProps(dispatch){
    return bindActionCreators({setNavigationToggle}, dispatch);
}
  
export default connect(mapStateToProps, mapDispatchToProps)(Index);