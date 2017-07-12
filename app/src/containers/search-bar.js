import React, {Component} from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { fetchTopics } from '../actions/index';

class SearchBar extends Component{
    constructor(props){
        super(props);

        this.state = {term: ""};

        this.onInputChange = this.onInputChange.bind(this);
        this.onFormSubmit = this.onFormSubmit.bind(this);
    }

    onInputChange(event){
        this.setState({term: event.target.value});
    }

    onFormSubmit(event){
        event.preventDefault();
        // we need to go and fetch weather data
        this.props.fetchTopics(this.state.term);
        this.setState({term: ''});
    } 

    render(){
        return(
            <form onSubmit={this.onFormSubmit} className="form-inline">
            <input 
             placeholder="search topics"
             className="form-control mb-6 mr-sm-6 mb-sm-0"
             value={this.state.term}
             onChange={this.onInputChange}
            />
            <button type="submit" className="btn btn-primary"> Submit </button>
            </form>
        )
    }
}


function mapDispatchToProps(dispatch){
    return bindActionCreators({fetchTopics}, dispatch);
}

export default connect(null, mapDispatchToProps)(SearchBar);