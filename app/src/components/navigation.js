import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import logo from '../styles/img/kth.png';

export default class Navigation extends Component {
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
                    <Link className="nav-item nav-link" to="/" className="nav-link"> Index </Link>
                </li>
                <li>
                    <Link className="nav-item nav-link" to="/keywords" className="nav-link"> Keywords </Link>
                </li>
                <li>
                   {/* <Link className="nav-item nav-link" to="/tags" className="nav-link"> tags </Link> */}
                </li>
            </ul>
        </div>
    );
  }
}
