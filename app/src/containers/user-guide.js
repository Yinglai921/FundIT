import React, { Component } from 'react';


import Navigation from '../components/navigation';
import Footer from '../components/footer';

import Help from './help';

import { } from '../actions/index';


class UserGuide extends Component {

  constructor(props){
    super(props);
    this.state ={}

  }



  render() {

    return(
       <div className="container-fluid">
            <div className="row">
                <Navigation active={"user-guide"}/>
            </div>
            <div className="row">
                <div className="col-sm-12">
                    <Help />
                </div>
            </div>
            <Footer />
      </div>
    )
  }
}


export default UserGuide;

