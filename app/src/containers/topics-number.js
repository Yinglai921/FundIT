import React, {Component} from 'react';
import { connect } from 'react-redux';
//import { bindActionCreators } from 'redux';


class TopicsNumber extends Component {
    constructor(props){
        super(props);
        this.state = {
            filterNumber: this.props.filterNumber,
            searchedNumber: this.props.searchedTopics.length
        }
    }

    

    render(){
        
        const {searchedTopics, filterNumber} = this.props;
        let filtered = filterNumber;
        if (filtered > searchedTopics.length){
            filtered = searchedTopics.length;
        }

        return(
            <div>
                <p> Number of searched topics: {searchedTopics.length} </p>
                <p> Number of filtered topics: {filtered} </p> 
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