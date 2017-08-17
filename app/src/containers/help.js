import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';


import Navigation from '../components/navigation';
import ToggleMenuButton from '../components/buttons/toggle-menu-button';

import { setNavigationToggle } from '../actions/index';

import help1 from '../styles/img/help1.gif'

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
            <Navigation active={"help"}/>
            <div id="page-content-wrapper">
              <div className="container-fluid">
                  <div className="row">
                    <ToggleMenuButton toggleMenu={this.toggleMenu} />
                  </div>
                  <div className="row">
                    {/* <img src={help1} alt="help1" /> */}
                </div>
              </div>
          </div>
        </div>
    )
  }
}


function mapStateToProps(state){
    return{ 
        navigationToggle: state.navigationToggle,
    };
}


function mapDispatchToProps(dispatch){
    return bindActionCreators({setNavigationToggle}, dispatch);
}
  
export default connect(mapStateToProps, mapDispatchToProps)(Index);