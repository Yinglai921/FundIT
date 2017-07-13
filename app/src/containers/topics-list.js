import React, { Component } from 'react';
import { connect } from 'react-redux';


class TopicsList extends Component {

    renderTopic(topic){
        return(
            <tr key={topic.identifier}>
                <td><a href={topic.url}>{topic.title}</a></td>
                <td>{topic.callStatus}</td>
                <td>{topic.plannedOpeningDate}</td>
                <td>{topic.deadlineDates[0]}</td>
            </tr>
        )
    }

    render(){
        return(
            <div className="col-md-10">
                <div>
                    topics number: {this.props.searchedTopics.length}
                </div>
                <table className="table">
                    <thead>
                    <tr>
                        <th>Title</th>
                        <th>Call Status</th>
                        <th>Open Date</th>
                        <th>Close Date</th>
                    </tr>
                    </thead>
                    <tbody>
                        {this.props.searchedTopics.map(this.renderTopic)}
                    </tbody>
                </table>
            </div>
        )
    }

}


function mapStateToProps(state){
    return{ searchedTopics: state.searchedTopics };
}

export default connect(mapStateToProps)(TopicsList);