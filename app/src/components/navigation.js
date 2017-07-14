import React, { Component } from 'react';
import { Link } from 'react-router-dom';


export default class Navigation extends Component {
  render() {
    return (
        <ul className="nav justify-content-end">
            <li className="nav-item">
                <Link to="/" className="nav-link"> Index </Link>
            </li>
            <li className="nav-item">
                <Link to="/keywords" className="nav-link"> Keywords </Link>
            </li>
        </ul>
    );
  }
}
