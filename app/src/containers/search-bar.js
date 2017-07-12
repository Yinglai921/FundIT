import React, {Component} from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { fetchTopics } from '../actions/index';

class SearchBar extends Component{
    constructor(props){
        super(props);

        this.state = {
            term: "",
            keys: ["title"]
        };

        this.onInputChange = this.onInputChange.bind(this);
        this.onFormSubmit = this.onFormSubmit.bind(this);
        this.onSearchScopeChange = this.onSearchScopeChange.bind(this);
    }

    onInputChange(event){
        this.setState({term: event.target.value});
    }

    onFormSubmit(event){
        event.preventDefault();
        // we need to go and fetch weather data
        this.props.fetchTopics(this.state.term, this.state.keys);
        // this.setState({term: ''});
    } 

    onSearchScopeChange(event){
        let scope = event.target.value;
        let keys = this.state.keys;
        if(event.target.checked){
            if(keys.includes(scope)){
                return;
            }else{
                keys.push(scope);
            }
        }else{
            if(keys.includes(scope)){
                keys.splice(keys.indexOf(scope), 1);
            }
        }
        this.setState({
            keys: keys
        })

        this.props.fetchTopics(this.state.term, this.state.keys)
    }

    render(){
        return(

            <div className="search-bar col-sm-12">
                <form onSubmit={this.onFormSubmit}>
                    <div className="form-group row">
                        <label className="col-sm-2 col-form-label">Search topics: </label>
                        <div className="col-sm-8">
                            <input 
                            placeholder="search topics"
                            value={this.state.term}
                            className="form-control"
                            onChange={this.onInputChange}
                            />
                        </div>
                        <div className="col-sm-2">
                            <button type="submit" className="btn btn-primary"> Submit </button>
                        </div>
                    </div>
                </form>
                
                <form className="form-inline row">
                    <div className="checkbox col-2">
                        <label>
                            <input type="checkbox" value="title" checked
                                onChange={this.onSearchScopeChange}
                            /> In title
                        </label>
                    </div>
                    <div className="checkbox col-2">
                        <label>
                            <input type="checkbox" value="keywords"
                                onChange={this.onSearchScopeChange}
                            /> In keywords
                        </label>
                    </div>
                    <div className="checkbox col-2">
                        <label>
                            <input type="checkbox" value="tags"
                                onChange={this.onSearchScopeChange}
                            /> In tags
                        </label>
                    </div>
                    <div className="checkbox col-2">
                        <label>
                            <input type="checkbox" value="desc"
                                onChange={this.onSearchScopeChange}
                            /> In descriptions
                        </label>
                    </div>
                </form>
            </div>
        )
    }
}


function mapDispatchToProps(dispatch){
    return bindActionCreators({fetchTopics}, dispatch);
}

export default connect(null, mapDispatchToProps)(SearchBar);