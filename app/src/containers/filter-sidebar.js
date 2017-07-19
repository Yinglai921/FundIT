import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { changeFilterState } from '../actions/index';
import { searchTopics } from '../actions/index';

class FilterSidebar extends Component{
     constructor(props){
        super(props);
        this.state = {
            filters: [],
            open: false
        };

        this.onCheckboxChange = this.onCheckboxChange.bind(this);
    }

     //if the global filters has already set, initial the current local filter with global filter state
    componentWillMount(){

        const { filters } = this.props;
        console.log("this.prop.filters: ", filters)
        let currentFilters = [];
        if(filters.length > 0){
            console.log("filter, initial filter state")
            if(filters.indexOf('Open') !== -1){
                currentFilters.push('Open');
                this.setState({
                    open:true
                })
            }
        }
        this.setState({
            filters: currentFilters,
        })
        console.log("this.state.open: ", this.state.open)

    }

    onCheckboxChange(event){
        const { value, checked } = event.target;
        const { filters } = this.state;

        let currentFilters = filters;
        if(checked){
            if(currentFilters.includes(value)){
                return;
            }else{
                currentFilters.push(value);
            }
        }else{
            if(currentFilters.includes(value)){
                currentFilters.splice(currentFilters.indexOf(value), 1);
            }
        }
        this.setState({
            filters: currentFilters
        })

        console.log("On check box change currentFilters: " + filters)
        
        this.props.changeFilterState(filters)
        this.props.searchTopics(this.props.topics, this.props.searchTerm, this.props.scopes, this.state.filters, false);
    }

    render(){
        return (
            <div className="search-bar col-sm-12">
                <form className="form">
                    <div className="checkbox">
                        <label>
                            <input type="checkbox" 
                                value="Open"
                                defaultChecked={this.state.open}
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