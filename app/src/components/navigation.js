import React, { Component } from 'react';
import { Link } from 'react-router-dom';


export default class Navigation extends Component {
  render() {
      //const currentLocation = this.props.location.pathname
      //const navLinkClassName = `nav-item nav-link ${touched && error ? 'has-danger' : ''}`;
    return (

        <nav className="navbar navbar-toggleable-md navbar-light bg-faded">
            <button className="navbar-toggler navbar-toggler-right" type="button" data-toggle="collapse" data-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </button>
            <Link className="navbar-brand" to="/"> FundIT </Link>
            <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
                <div className="navbar-nav">
                <Link className="nav-item nav-link" to="/" className="nav-link"> Index </Link>
                <Link className="nav-item nav-link" to="/keywords" className="nav-link"> Keywords </Link>
                <Link className="nav-item nav-link" to="/tags" className="nav-link"> tags </Link>
                </div>
            </div>
        </nav>

        // <ul className="nav justify-content-end">
        //     <li className="nav-item">
        //         <Link to="/" className="nav-link"> Index </Link>
        //     </li>
        //     <li className="nav-item">
        //         <Link to="/keywords" className="nav-link"> Keywords </Link>
        //     </li>
        //     <li className="nav-item">
        //         <Link to="/tags" className="nav-link"> tags </Link>
        //     </li>
        // </ul>
    );
  }
}
