import React, { Component } from 'react';
import { Button } from 'reactstrap';


export default class ToggleMenuButton extends Component{

    constructor(props){
        super(props);
    }

    render(){
        return(
            <Button onClick={this.props.toggleMenu}>
                <span className="glyphicon glyphicon-th-list" aria-hidden="true"></span>
            </Button>
            // <button onClick={this.props.toggleMenu} type="button" className="btn btn-default" aria-label="Left Align">
            //     <span className="glyphicon glyphicon-menu-hamburge" aria-hidden="true"></span>
            // </button>
        )
    }
}

