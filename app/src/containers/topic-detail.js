import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators, compose } from 'redux';
import { fetchOneTopic, fetchCalls } from '../actions/index';
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';

import Navigation from '../components/navigation';
import Footer from '../components/footer';

class TopicDetail extends Component{

    constructor(props){
        super(props);
        this.state={
            topic: {}
        }
    }

    componentDidMount(){
        const {match: {params}} = this.props;
        // get current topic
        this.props.fetchOneTopic(params.id);
        this.props.fetchCalls();

    }

    formTopics(call, keys, topicID){
        let topics = [];
        keys.forEach((key) => {
            const topic = call['CallBudgetOverview'][0][`${key}`];
            // array of topics, sometimes this arrray only contain one topic
            topic['Topic'].forEach((item) => {
                let temp = item.split(" ");
                if (temp[0] == topicID){
                    let topicData = {}
                    topicData.topic = topic['Topic']; 
                    // string
                    topicData.year = topic['BudgetYearAmount'][0];
                    // string
                    topicData.budget = topic['BudgetYearAmount'][1];
                    // string
                    topicData.stage = topic['Stages'];
                    // opening date, string
                    topicData.openDate = topic['Opening date'];
                    // array
                    topicData.deadline = topic['Deadline'];
                    topics.push(topicData);
                }
            })
        })
        return topics;
    }

    render(){

        if (this.props.topic.callFileName === undefined || this.props.calls.Calls === undefined){
            return(<p> Loading... </p>)
        } else{
            const { topic } = this.props;
            const call = this.props.calls.Calls[`${topic.callFileName}`];
            // get keys of the topic budgets, array
            const topicBudgetKeys = Object.keys(call['CallBudgetOverview'][0]);
            const topics = this.formTopics(call, topicBudgetKeys, topic.identifier);

            return(
                <div className="container-fluid">
                    <div className="row">
                        <Navigation/>
                    </div>
                    <div className="row">
                        <div className="col-sm-12">
                            <h2>Topic title: {topic.title}</h2>
                            <div> 
                                <a className="btn btn-primary" target="_blank" href={`https://ec.europa.eu/research/participants/portal/desktop/en/opportunities/h2020/topics/${topic.topicFileName}.html`}>Link to the H2020 portal</a>
                                <p>Have decided to apply? Contact KTH research office LINK.</p>
                            </div>
                        </div>
                        

                        <div className="col-sm-12">
                            <p> Call: {topic.callIdentifier} </p>
                            <p> Call Title: {topic.callTitle} </p>
                            <p> Topic Identifier: {topic.identifier}</p>
                            <p> Type of action: {topic.actions[0].types} </p>
                        </div>

                        <div className="col-sm-12">
                            <BootstrapTable data={ topics } striped hover>
                                <TableHeaderColumn dataField='topic' isKey>Topic title</TableHeaderColumn>
                                <TableHeaderColumn width='50' dataField='year'>Year</TableHeaderColumn>
                                <TableHeaderColumn width='100' dataField='budget'>Budget*</TableHeaderColumn>
                                <TableHeaderColumn width='100' dataField='stage'>Stage</TableHeaderColumn>
                                <TableHeaderColumn width='150' dataField='openDate'>Open Date</TableHeaderColumn>
                                <TableHeaderColumn dataField='deadline'>Deadlines</TableHeaderColumn>
                            </BootstrapTable>
                            <p>*Budget is the total budget for all projects which will be funded under this topic. More detailed information is available in the topic description.</p>
                        </div>

                        <div className="col-sm-12"> 
                            <div dangerouslySetInnerHTML={{__html: topic.description}} />
                        </div>
                        
                    </div>
                    <Footer />
                </div>
            )
        }
    }
    
}


function mapStateToProps(state){
    return{ 
        topic: state.topic,
        calls: state.calls
    };
}

function mapDispatchToProps(dispatch){
    return bindActionCreators({fetchOneTopic, fetchCalls}, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(TopicDetail);