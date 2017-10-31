import React, { Component } from 'react';
import { connect } from 'react-redux';
import { signoutUser } from '../../actions/index';
import Navigation from '../../components/navigation';

class Signout extends Component {
    componentWillMount(){
        this.props.signoutUser();
    }
    render(){
        return (
            <div className="container-fluid">
                <div className="row">
                    <Navigation active={"signin"}/>
                </div>
                <div className="row">
                    <p> Sorry to see you go... </p>
                </div>
            </div>
        )
    }
}



export default connect (null, { signoutUser })(Signout);