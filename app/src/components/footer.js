import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import logo from '../styles/img/kth.png';

export default class Footer extends Component {

  constructor(props){
      super(props);
  }
  render() {

    return (
        <div className="row">
            <nav className="navbar navbar-default navbar-fixed-bottom">
                <div className="container-fluid">
                    <div className="copyright row">
                        <div className="col-md-5 col-md-offset-2" style={{textAlign: "center"}}>
                            <p>The website is a Beta version, please be so kind and give us feedback! </p>
                        </div>
                        <div className="col-md-4">
                            <a className="btn btn-warning" href="https://goo.gl/forms/fjQ6zwEynPzJBWAF2"> Send Feedback </a>
                        </div> 
                            {/* <div className="col-md-6">
                            <p>© 2017 - All Rights with FundIT</p>
                            </div>
                            <div className="col-md-6">
                                <ul className="bottom_ul">
                                    <li><a href="#">fundit.proj.kth.se</a></li>
                                    <li><a href="#">About the project</a></li>
                                    <li><a href="#">Github</a></li>
                                    <li><a href="#">Contact us</a></li>
                                </ul>
                            </div> */}
                    </div>
                </div>
            </nav>
        </div>
    );
  }
}
