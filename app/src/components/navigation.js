import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import logo from '../styles/img/kth.png';
import { connect } from 'react-redux';

class Navigation extends Component {

  constructor(props){
      super(props);
  }

  renderLinks(){
    if(this.props.authenticated){
        // show a link to sign out
        return(
            <p className="navbar-text navbar-right">
                 <Link to="/signout" className="navbar-link">Sign out</Link>
            </p>
        )
    } else {
        // show sign in or sign up

        return [
            <p className="navbar-text navbar-right" key={1}>
                <Link to="/signup" className="navbar-link">Sign up</Link>
            </p>,
            <p className="navbar-text navbar-right" key={2}>
                <Link to="/signin" className="navbar-link">Sign in</Link>
            </p>
        ];
    }
  }


  render() {
      //const currentLocation = this.props.location.pathname
      //const navLinkClassName = `nav-item nav-link ${touched && error ? 'has-danger' : ''}`;
    return (
        <nav className="navbar navbar-inverse navbar-fixed-top">
            <div className="container-fluid">
                <div className="navbar-header">
                    <a className="navbar-brand" href="#">FundIT</a>

                    <img alt="Brand" src={logo} style={{width: "25%"}}/>
                </div>
                <div>
                    <ul className="nav navbar-nav">
                        <li className={ this.props.active == "index" ? "active" : "" }>
                            <Link  to="/" > Search Topics </Link>
                        </li>
                        <li className={ this.props.active == "keyword" ? "active" : "" }>
                            <Link  to="/keywords" > Keyword Tree Graph</Link>
                        </li>
                        <li className={ this.props.active == "user-guide" ? "active" : "" }>
                            <Link  to="/user-guide" > User Guide </Link>
                        </li>
                    </ul>
                    {this.renderLinks()}
                </div>
               
            </div>
        </nav>
    );
  }
}


function mapStateToProps(state){
    return{
        authenticated: state.auth.authenticated
    }
}

export default connect(mapStateToProps)(Navigation);