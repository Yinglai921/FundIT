import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchMessage, saveUserSearchQueries } from '../../actions/index';
import Navigation from '../../components/navigation';


class QueryContent extends Component{

    constructor(props){
        super(props);
        this.state = {
            isEditing: false,
            query:this.props.query.query
        }
        this.toggleEdit = this.toggleEdit.bind(this);
        this.delete = this.delete.bind(this);
        this.setQuery = this.setQuery.bind(this);
        this.save = this.save.bind(this);
        this.renderTopics = this.renderTopics.bind(this);
    }

    componentDidMount(){
        // if the user want to add a new query, then show the edit mode first
        if(this.props.query.query == ""){
            this.setState({isEditing: true})
        }
    }

    setQuery(e){
        console.log(e.target.value);
        this.setState({query: e.target.value});
    }
    toggleEdit(){
        // toggle editing state
        this.setState({ isEditing: !this.state.isEditing })
        // save the current query state to DB
        //this.props.saveRow(this.state.query, this.props.index);
    }

    save(){
        this.props.saveRow(this.state.query, this.props.index);
        this.setState({ isEditing: !this.state.isEditing })
    }

    delete(){
        this.props.deleteRow(this.props.index);
        // toggle editing state
        this.setState({ isEditing: !this.state.isEditing })
    }

    renderTopics(topics){
        return(
            <div>
                {topics.map((topic, i) => {
                    return(
                    <p key={i}>
                        <a target="_blank" href={`https://ec.europa.eu/research/participants/portal/desktop/en/opportunities/h2020/topics/${topic.identifier.toLowerCase()}.html`}>{topic.title}</a>
                    </p>
                    )
                })}
            </div>
        )
    }

    render(){
        if (this.state.isEditing){
            return(
                <div className="row">
                    <form className="form-inline">
                        <div className="form-group">
                            <label> Search query: </label>
                            <input type="text" className="form-control" onChange={this.setQuery} value={this.state.query}/>
                        </div>
                        <button type="submit" className="btn btn-default" onClick={this.save}> Save </button>
                        <button className="btn btn-default" onClick={this.delete}> Delete </button>
                    </form>
                    <div className="col-sm-12">
                        {this.renderTopics(this.props.query.topics)}
                    </div>
                </div>
            )
        } else {
            return(
                <div className="row">
                    <div className="col-sm-4">
                        Search query: {this.props.query.query}
                    </div>
                    <div className="col-sm-4">
                        Number of open and forthcoming topics: {this.props.query.topics.length}
                    </div>
                    <div className="col-sm-4">
                        <button className="btn btn-default" onClick={this.toggleEdit}> Edit </button>
                    </div>
                    <div className="col-sm-12">
                        {this.renderTopics(this.props.query.topics)}
                    </div>
                </div>
            )
        }
    }
}





class MyPage extends Component{

    constructor(props){
        super(props);
        this.state = {
            queries:[]
        }

        this.addQueryRow = this.addQueryRow.bind(this);
        this.deleteQueryRow = this.deleteQueryRow.bind(this);
        this.saveQueryRow = this.saveQueryRow.bind(this);
    }

    componentWillMount(){
        this.props.fetchMessage();
    }

    componentWillReceiveProps(nextProps){
        if (this.props.user !== nextProps.user){
            this.setState({queries: nextProps.user.message.searchQueries});
        }
    }

    addQueryRowBtn(){
        if(this.state.queries.length < 3){
            return(
                <button className="btn btn-default" onClick={this.addQueryRow}> Add query </button>
            )
        }else{
            return(
                <p> Maximun 3 queries </p>
            )
        }
    }

    addQueryRow(){
        let query = {query:"", topics:[]}
        let queries = this.state.queries;
        queries.push(query);
        this.setState({queries});
    }

    // delete one query row, save the queries state to db
    deleteQueryRow(index){
        let queries = this.state.queries;
        queries.splice(index, 1);
        this.setState({queries});
        // save queries to db
        this.props.saveUserSearchQueries(queries);

    }

    // save the current row, save the queries state to db
    saveQueryRow(value, index){
        let queries = this.state.queries;
        queries[index].query = value;
        this.setState({queries});
        // save queries to db
        this.props.saveUserSearchQueries(queries);
    }

    render(){

        let { user } = this.props;
        let { queries } = this.state;
        if (this.props.user.message == undefined){
             return(<div> Loading... </div>)
        }else {
            return(
                <div className="container-fluid">
                    <div className="row">
                        <Navigation />
                    </div>
                    <div className="row">
                        <h1> My page </h1>
                        <h4> Welcome! {user.message.email} </h4>
                    </div>
                    {queries.map((query, i) => {
                        return <QueryContent query={query} key={i} index={i} deleteRow={this.deleteQueryRow} saveRow={this.saveQueryRow}/>
                    })}
                    {this.addQueryRowBtn()}
                </div>
            )
        }

    }
}

function mapStateToProps(state){
    return { user: state.user };
}

export default connect(mapStateToProps, {fetchMessage, saveUserSearchQueries})(MyPage);