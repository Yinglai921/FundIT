import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { filterOpenTopics } from '../actions/index';

class FilterSidebar extends Component{
     constructor(props){
        super(props);

        this.onCheckboxChange = this.onCheckboxChange.bind(this);
    }

    onCheckboxChange(event){
        if(event.target.checked){
            this.props.filterOpenTopics(this.props.topics, true);
        }else{
            this.props.filterOpenTopics(this.props.topics, false);
        }
    }

    render(){
        return (
            <div className="col-md-2">
                <form className="form">
                    <div className="checkbox">
                        <label>
                            <input type="checkbox" 
                                onChange={this.onCheckboxChange}
                            /> Only open topics
                        </label>
                    </div>
                </form>
            </div>
        )
    }
}


function mapStateToProps(state){
    return{ topics: state.topics };
}

function mapDispatchToProps(dispatch){
    return bindActionCreators({filterOpenTopics}, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(FilterSidebar);