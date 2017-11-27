import React, { Component } from 'react';
import ReactTooltip from 'react-tooltip';

  
export default class Tooltip extends Component{

    render(){
        return(
            <div>
                <a data-tip={this.props.explain} data-html={true}>{this.props.term}</a>
                <ReactTooltip className="tooltipExtraStyle" type='warning' place="top" effect="float"/>
            </div>
        )
    }
}
