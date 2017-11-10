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
        return[
            <p className="navbar-text" key={1}>
                <Link to="/mypage" className="navbar-link">My page</Link>
            </p>,
            <p className="navbar-text" key={2}>
                 <Link to="/signout" className="navbar-link">Log out</Link>
            </p>
        ];
    } else {
        // show sign in or sign up

        return [
            <p className="navbar-text" key={1}>
                <Link to="/signup" className="navbar-link">Sign up</Link>
            </p>,
            <p className="navbar-text" key={2}>
                <Link to="/signin" className="navbar-link">Log in</Link>
            </p>
        ];
    }
  }


  render() {
      //const currentLocation = this.props.location.pathname
      //const navLinkClassName = `nav-item nav-link ${touched && error ? 'has-danger' : ''}`;
    return (
        <nav className="navbar navbar-fixed-top" style={{backgroundColor: 'white'}}>
            <div className="container-fluid">
                <div className="navbar-header">
                    
                    <a className="navbar-brand" href="#"><span><img alt="Brand" src={logo} style={{width: "25%"}}/></span>FundIT</a>
                </div>
                <div>
                    <ul className="nav navbar-nav nav-tabs">
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
                </div>
                <div className="navbar-right">
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