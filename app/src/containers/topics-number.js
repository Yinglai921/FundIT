import React, {Component} from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';


class TopicsNumber extends Component {
    constructor(props){
        super(props);
        this.state = {
            // filterNumber: this.props.filterNumber,
            // searchedNumber: this.props.searchedTopics.length
        }
    }

    render(){
        return(
            <div>
                <p> Number of searched topics: {this.props.searchedTopics.length} </p>
                <p> Number of filtered topics: {this.props.filterNumber <= this.props.searchedTopics.length ? this.props.filterNumber: this.props.searchedTopics.length} </p> 
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