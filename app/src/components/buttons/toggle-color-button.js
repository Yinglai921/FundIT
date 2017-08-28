import React, { Component } from 'react';


export default class ToggleColorButton extends Component{

    constructor(props){
        super(props);
    }

    render(){
        console.log(this.props.colorCheck)
        return(
            <div>
                <label className="switch">
                    <input type="checkbox" defaultChecked={this.props.colorCheck} onChange={this.props.onColorCheck} />
                    <span className="slider round"></span>
                </label>
            </div>
        )
    }
}
