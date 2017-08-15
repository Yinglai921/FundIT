import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import logo from '../styles/img/kth.png';

export default class Navigation extends Component {

  constructor(props){
      super(props);
  }
  render() {
      //const currentLocation = this.props.location.pathname
      //const navLinkClassName = `nav-item nav-link ${touched && error ? 'has-danger' : ''}`;
    return (


        <div id="sidebar-wrapper">
            <ul className="sidebar-nav">
                <li className="sidebar-brand">
                     <img src={logo} alt="Logo" />
                     <Link className="navbar-brand" to="/"> FundIT </Link>
                </li>
                <li>
                    <Link className={ this.props.active == "index" ? "nav-item nav-link active" : "nav-item nav-link" } to="/" > Index </Link>
                </li>
                <li>
                    <Link className={ this.props.active == "keyword" ? "nav-item nav-link active" : "nav-item nav-link" } to="/keywords" > Keywords </Link>
                </li>
                <li>
                   <Link className={ this.props.active == "help" ? "nav-item nav-link active" : "nav-item nav-link" } to="/help" > Help </Link>
                </li>
            </ul>
        </div>
    );
  }
}
