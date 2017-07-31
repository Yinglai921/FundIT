import React, { Component } from 'react';
import { Button } from 'reactstrap';


export default class ToggleMenuButton extends Component{

    constructor(props){
        super(props);
    }

    render(){
        return(
            <Button onClick={this.props.toggleMenu}>
                <span className="fa fa-bars" aria-hidden="true"></span>
            </Button>
        )
    }
}