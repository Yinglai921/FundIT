import React, {Component} from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';


class TopicsNumber extends Component {
    constructor(props){
        super(props);
        this.state = {
            filterNumber: this.props.filterNumber,
            searchedNumber: this.props.searchedTopics.length
        }
    }


    render(){
        console.log(this.props.searchedTopics.length, this.props.filterNumber)
        return(
            <div>
                <p> Number of searched topics: {this.props.searchedTopics.length - 1} </p>
                <p> Number of filtered topics: {this.props.filterNumber <= this.props.searchedTopics.length ? this.props.filterNumber - 1: this.props.searchedTopics.length - 1 } </p> 
            </div>
        )
    }
}

function mapStateToProps(state){
    return{ 
        searchedTopics: state.searchedTopics,
        filterNumber: state.filterNumber
    };
}


export default connect(mapStateToProps)(TopicsNumber);