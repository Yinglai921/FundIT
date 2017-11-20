import React, { Component } from 'react';
import {findDOMNode} from 'react-dom';
import ReactTooltip from 'react-tooltip';

  
export default class Tooltip extends Component{

    constructor(props){
        super(props);
    }

    render(){
        return(
            <div>
                <a data-tip={this.props.explain} data-html={true}>{this.props.term}</a>
                <ReactTooltip className="tooltipExtraStyle" type='warning' place="top" effect="float"/>
            </div>
        )
    }
}
