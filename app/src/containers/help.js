import React, { Component } from 'react';

export default class Help extends Component{

    
    SearchGuide(){
        return(
            <div className="row" id="SearchGuide"> 
                <h3> Search guideline</h3>                    
                <div className="col-sm-6 border-right">
                    <h4> Search any of these words </h4>
                    <p>
                        <span className="label label-info">Search</span> Find topics that contain "information technology" or "security" or "data".
                    </p>
                    <form>
                        <div className="form-group">
                            <input type="text" className="form-control" value="e.g. information technology OR security OR data" disabled/>
                        </div>
                    </form>
                    <p>
                        <span className="label label-default">Tips</span> You can concat as many words as you want.
                    </p>
                </div>
                <div className="col-sm-6">
                    <h4> Search without these unwanted words </h4>
                    <p>
                        <span className="label label-info">Search</span> Find topic titles that contain "information", but excludes
                        "space", "business" and "commercial".
                    </p>
                    <form>
                        <div className="form-group">
                            <input type="text" className="form-control" value='e.g. information NOT space business commercial' disabled/>
                        </div>
                    </form>
                    <p> 
                        <span className="label label-danger">Warning</span> Please add NOT at the end of the query. If you write "information NOT chemistry OR security"
                        it will be interpreted as to exclude the words "chemistry", "OR" and "security".
                    </p>
                </div>
            </div>  
        )
    }

    CallsAndTopics(){
        return(
            <div className="row" id="CallsAndTopics">
                <div className="col-sl-12">
                    <h3> Calls and Topics </h3>
                    <p>
                        Most of the Horizon 2020 calls are divided into topics. When searching with free keywords, the result is a list of topics of open calls, and when you click on a topic title, you arrive on the topic page.
                    </p>
                    <h4> Calls </h4>
                    <ul>
                        <li>
                        call summary that describes the common scientific field or societal challenge or innovation that the topics of this call are tackling.
                        </li>
                    </ul>
                    <h4> Topics </h4>
                    <ul>
                        <li>
                        detailed description of the topic scope, expected impact of projects and its type of action.
                        </li>
                        <li>
                        topic conditions and documents, including its eligibility and evaluation criteria, pdf-templates of the forms that you will have in the electronic submission system.
                        </li>
                        <li>
                        access to the submission system.
                        </li>
                        <li>
                        support services that you can use when preparing your proposal for this topic.
                        </li>
                    </ul>
                </div>
            </div>
        )
    }

    TopicDeadline(){
        return(
            <div className="row" id="TopicDeadline">
                <div className="col-sl-12">
                    <h3> Deadlines of topics </h3>
                    <p>
                        A topic is considered ‘open’ until the deadline stated in the topic header.
                        Each topic will specify deadlines and/or cut-off dates.
                    </p>
                    <h4> 1-stage topics </h4>
                    <p> For most topics, you submit a full proposal by the given deadline.</p>
                    <h4> 2-stage topics </h4>
                    <p> Some topics have a 2-stage submission procedure. </p>
                    <p> <strong> Stage 1 </strong> </p>
                    <p> You submit an outline proposal (standard maximum 10 pages, unless otherwise specified in the submission system). This is evaluated against criteria set out in the topic conditions.</p>
                    <p> <strong> Stage 2 </strong> </p>
                    <p> If your proposal passes stage 1, you will be invited to submit your full proposal within a given period.
                        If required by the relevant work programme, at this stage you will also receive the stage-1 Evaluation summary report (ESR).
                        Rejected proposals: If your proposal does not pass stage 1, you will be informed of this in writing, along with the evaluation summary report.
                    </p>
                    <p> <strong> Continuously open topics with cut-off dates </strong> </p>
                    <p> Some topics are continuously open, like the SME instrument topics, where you can submit a proposal at any time, and cut-off dates mean that all proposals received by a given cut-off date will be evaluated after that deadline. </p>
                </div>
            </div>
        )
    }

    TypesOfActions(){
        return(
            <div className="row" id="TypesOfActions">
                <div className="col-sl-12">
                    <h3> Types of Actions</h3>
                    <p>
                        Horizon 2020 calls can have different types of action (funding schemes),The type of action specifies:
                    </p>
                    <ul>
                        <li> the scope of what is funded </li>
                        <li> the reimbursement rate </li>
                        <li> specific evaluation criteria to qualify for funding </li>
                    </ul>

                    <h4> RIA - Research and Innovation Action </h4>
                    <ul>
                        <li> Min 3 entities from 3 countries </li>
                        <li> Funding rate: 100% direct project costs (+25% OH) </li>
                    </ul>
                    <h4> IA - Innovation Action </h4>
                    <ul>
                        <li> Min 3 entities from 3 countries </li>
                        <li> Funding rate: Universities: 100% direct project consts (+25% OH); Industry 70% direct project consts (+25% OH) </li>
                    </ul>
                    <h4> CSA - Coordination and Support Action </h4>
                    <ul>
                        <li> Min 1 entity </li>
                        <li> Funding rate: 100% direct project costs (+25% OH) </li>
                    </ul>
                </div>
            </div>
        )
    }

    Pillars(){}

    TRL(){
        return(
            <div className="row" id="TRL">
                <div className="col-sl-12">
                    <h3> TRL-level</h3>
                    <ul>
                        <li> TRL 1 – basic principles observed </li>
                        <li> TRL 2 - technology concept formulated </li>
                        <li> TRL 3 – experimental proof of concept </li>
                        <li> TRL 4 – technology validated in lab </li>
                        <li> TRL 5 – technology validated in relevant environment (industrially
relevant environment in the case of key enabling technologies) </li>
                        <li> TRL 6 – technology demonstrated in relevant environment
(industrially relevant environment in the case of key enabling
technologies)</li>
                        <li> TRL 7 – system prototype demonstration in operational environment </li>
                        <li> TRL 8 – system complete and qualified</li>
                        <li> TRL 9 – actual system proven in operational environment (competitive
manufacturing in the case of key enabling technologies; or in space) </li>
                    </ul>
                </div>
            </div>
        )
    }

    
    render(){
        return(
            <div className="container-fluid">
                <div className="row">
                    <h2>User Guide</h2>  
                </div>
                {this.SearchGuide()}
                {this.CallsAndTopics()}
                {this.TopicDeadline()}
                {this.TypesOfActions()}
                {this.TRL()}
            </div>
        )
    }
}