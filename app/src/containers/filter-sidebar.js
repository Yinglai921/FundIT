import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { changeFilterState } from '../actions/index';
import { searchTopics } from '../actions/index';

class FilterSidebar extends Component{
     constructor(props){
        super(props);

        this.onCheckboxChange = this.onCheckboxChange.bind(this);
    }

    onCheckboxChange(event){
        if(event.target.checked){
            this.props.changeFilterState(this.props.filters, event.target.value, true);           
        }else{
            this.props.changeFilterState(this.props.filters, event.target.value, false);
        }
        this.props.searchTopics(this.props.topics, this.props.searchTerm, this.props.scopes, this.props.filters);
    }

    render(){
        return (
            <div className="col-md-2">
                <form className="form">
                    <div className="checkbox">
                        <label>
                            <input type="checkbox" 
                                value="Open"
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
    return{ 
        topics: state.topics,
        scopes: state.scopes,
        filters: state.filters,
        searchTerm: state.searchTerm
    };
}

function mapDispatchToProps(dispatch){
    return bindActionCreators({searchTopics, changeFilterState}, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(FilterSidebar);