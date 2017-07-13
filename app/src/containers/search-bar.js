import React, {Component} from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { fetchTopics, searchTopics, setSearchTerm, changeSearchScope } from '../actions/index';

class SearchBar extends Component{
    constructor(props){
        super(props);

        this.state = {
            term: "",
            scopes: ["title"]
        };

        this.onInputChange = this.onInputChange.bind(this);
        this.onFormSubmit = this.onFormSubmit.bind(this);
        this.onSearchScopeChange = this.onSearchScopeChange.bind(this);
    }

    // get all the topics after the render
    componentDidMount(){
        this.props.fetchTopics();
        this.props.changeSearchScope(this.state.scopes);
    }

    onInputChange(event){
        this.setState({term: event.target.value});
    }

    onFormSubmit(event){
        event.preventDefault();
        // set search term globally 
        this.props.setSearchTerm(this.state.term);
        // search topics
        this.props.searchTopics(this.props.topics, this.state.term, this.props.scopes, this.props.filters, false);
    } 

    onSearchScopeChange(event){
        let scope = event.target.value;
        let keys = this.state.scopes;
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
            scopes: keys
        })
        this.props.changeSearchScope(this.state.scopes);
        this.props.searchTopics(this.props.topics, this.state.term, this.state.scopes, this.props.filters, true);
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

function mapStatetoProps(state){
    return { 
        topics: state.topics,
        scopes: state.scopes,
        filters: state.filters,
        searchTerm: state.searchTerm
     }
}
function mapDispatchToProps(dispatch){
    return bindActionCreators({fetchTopics, searchTopics, setSearchTerm, changeSearchScope}, dispatch);
}

export default connect(mapStatetoProps, mapDispatchToProps)(SearchBar);