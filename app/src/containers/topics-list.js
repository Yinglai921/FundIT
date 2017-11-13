import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
//import FixedDataTable from 'fixed-data-table';
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';
import { Collapse, Button, CardBlock, Card } from 'reactstrap';
import { changeColumnSettings, setFilterNumber } from '../actions/index';
import TopicsNumber from './topics-number';
import Tooltip from '../components/tools/tooltip';

class BSTable extends React.Component {
    render() {
        if (this.props.data.keywords && this.props.data.tags) {
            return (
                <div className="row">
                    <div className="col-md-6">
                        <p> Keywords </p>
                        <ul className="list-group">
                            {this.props.data.keywords.map((keyword) =>{ return( <li className="list-group-item"> {keyword} </li> )})}
                        </ul>
                    </div>
                    <div className="col-md-6">
                        <p> Tags </p>
                        <ul className="list-group">
                            {this.props.data.tags.map((tag) => { return( <li className="list-group-item"> {tag} </li> )})}
                        </ul>
                    </div>
                </div>
            )
        } else if( this.props.data.keywords && !this.props.data.tags){
            return (
                <div className="row">
                    <div className="col-md-6">
                        <p> Keywords </p>
                        <ul className="list-group">
                            {this.props.data.keywords.map((keyword) =>{ return( <li className="list-group-item"> {keyword} </li> )})}
                        </ul>
                    </div>
                </div>
            )
        } else if(!this.props.data.keywords && this.props.data.tags){
            return (
                <div className="row">
                    <div className="col-md-6">
                        <p> Tags </p>
                        <ul className="list-group">
                            {this.props.data.tags.map((tag) =>{ return( <li className="list-group-item"> {tag} </li> )})}
                        </ul>
                    </div>
                </div>
            )
        }
        
        else {
            return (<p>?</p>);
        }
    }
}



class TopicsList extends Component {
    constructor(props) {
        super(props);
        
        this.state = {
            cols:[],
            filterNumber: this.props.searchedTopics.length

        };

        this.onColumnHeaderChange = this.onColumnHeaderChange.bind(this);
        this.afterColumnFilter = this.afterColumnFilter.bind(this);

    }



    // set the columns according to the columnSettings if has one
    componentDidMount(){
        const { columnSettings, searchedTopics, scopes } = this.props;
        let cols = [];
        if (columnSettings !== null){
            if (columnSettings.plannedOpeningDate)
                cols.push('plannedOpeningDate')
            if (columnSettings.keywords)
                cols.push('keywords')
            if (columnSettings.tags)
                cols.push('tags')
            if (columnSettings.mainSpecificProgrammeLevelDesc)
                cols.push('mainSpecificProgrammeLevelDesc')
            if (columnSettings.callTitle)
                cols.push('callTitle')
            if (columnSettings.actions)
                cols.push('actions')
            if (columnSettings.budget)
                cols.push('budget')
        }
        
        if (columnSettings.plannedOpeningDate == undefined){
            cols.push('actions');
            cols.push('callTitle');
        }

        this.setState({cols:cols})
        this.props.setFilterNumber(searchedTopics.length)
        
    }
    
    // change the headers of the columns, checkboxes event
    onColumnHeaderChange(event){
        let col = event.target.value;
        let currentCols = this.state.cols;
        if(event.target.checked){
            if(currentCols.includes(col)){
                return;
            }else{
                currentCols.push(col)
            }
        }else{
            if(currentCols.includes(col)){
                currentCols.splice(currentCols.indexOf(col), 1);
            }
        }

        const columnOrder = ['mainSpecificProgrammeLevelDesc','actions', 'callTitle', 'plannedOpeningDate', 'budget', 'keywords', 'tags'];
        currentCols.sort(function(a, b){
            return columnOrder.indexOf(a) - columnOrder.indexOf(b);
        });

        this.setState({
            cols: currentCols
        })

        this.props.changeColumnSettings(this.state.cols);
    }

    // --- sort by date
    revertSortOpenDate(a, b, order) {   
        a = new Date(a.plannedOpeningDate);
        b = new Date(b.plannedOpeningDate);
        if (order === 'asc') {
            return b - a;
        } else {
            return a - b;
        }
    }

    revertSortDeadlineDate(a, b, order) {   
        a = new Date(a.deadlineDates[0]);
        b = new Date(b.deadlineDates[0]);
        if (order === 'asc') {
            return b - a;
        } else {
            return a - b;
        }
    }

    // --- end of sort by date functions

    // format of the expandable rows (keywords and tags)
    keywordFormatter(cell, row){
        if(cell !== undefined){
            let content = cell.join(" ; ");
            return (<div className="expandable-row">{content}</div>)
        }
    }

    // in order to get nested data from 'actions', use dataFormatter
    actionsFormatter(cell, row){
        return (`${cell[0].types}`)
    }

    // render column according to the checkboxes
    renderColumn(col){

        switch (col){
            case 'plannedOpeningDate':
                return(
                    <TableHeaderColumn 
                    dataField={col} 
                    dataSort 
                    sortFunc={ this.revertSortOpenDate } 
                    expandable={ false }
                    width='200'
                    >
                    Planned Opening Date
                    </TableHeaderColumn>
                );
            case 'keywords':
                return(
                    <TableHeaderColumn 
                    headerText='The portal keyword service provides all official keywords which are used in the proposals, projects and expert profiles in the context of EU grants.'
                    dataField={col} 
                    filter={ { type: 'TextFilter', delay: 1000 } } 
                    expandable={ true }
                    dataFormat={ this.keywordFormatter }
                    >
                    Keywords 
                    </TableHeaderColumn> 
                );
            case 'tags':
                return(
                    <TableHeaderColumn 
                    headerText='List of tags associated with the topic.'
                    dataField={col} 
                    filter={ { type: 'TextFilter', delay: 1000 } } 
                    expandable={ true }
                    dataFormat={ this.keywordFormatter }
                    >
                    Tags
                    </TableHeaderColumn> 
                );
            case 'mainSpecificProgrammeLevelDesc':
                return(
                    <TableHeaderColumn 
                    dataField={col}
                    tdStyle={ { whiteSpace: 'normal' } } 
                    expandable={ false }
                    width='250'
                    >
                    Pillar
                    </TableHeaderColumn> 
                );
            case 'callTitle':
                return(
                    <TableHeaderColumn 
                        dataField='callTitle'
                        tdStyle={ { whiteSpace: 'normal' } } 
                        filter={ { type: 'TextFilter', delay: 1000 } } 
                        expandable={ false }
                        >
                        Call Title
                    </TableHeaderColumn> 
                );
            case 'actions':
                return(
                    <TableHeaderColumn 
                        dataField='actions'
                        tdStyle={ { whiteSpace: 'normal' } } 
                        expandable={ false }
                        dataFormat={ this.actionsFormatter }
                        width='200'
                        >
                        Types of Actions
                    </TableHeaderColumn> 
                );
            case 'budget':
                return(
                    <TableHeaderColumn 
                        dataField='budget'
                        expandable={ false }
                        >
                        Topic Budget History
                    </TableHeaderColumn> 
                );
        }

    }

    expandComponent(row) {
        let data = {keywords: [], tags: []}
        data.keywords = row.keywords;
        data.tags = row.tags;
        return (
            <BSTable data={ data } />
        );
    }

    linkFormatter(cell, row) {
        return <a target="_blank" href={`https://ec.europa.eu/research/participants/portal/desktop/en/opportunities/h2020/topics/${row.identifier.toLowerCase()}.html`}>{cell}</a>
    }

    afterColumnFilter(filterConds, result) {
        // if (result.length < this.props.searchedTopics.length) {
        //     this.props.setFilterNumber(result.length);
        // }
        
        this.props.setFilterNumber(result.length) // !!! it may lower the time, seems this callback will keep running 
    }

    render(){
        const { searchedTopics } = this.props;
        const { cols, filterNumber } = this.state;
        

        if ( searchedTopics == null){
            return(
                <div>
                    Loading...
                </div>
            )
        } else{

            let results = [];
            searchedTopics.forEach((topic) =>{
                // results.push(topic._source);
                results.push(topic);
            })
    
            // some custom settings for react-bootstrap-table
            const options = {
                    expandRowBgColor: 'rgb(219,230,236)',
                    expandBy: 'column',  // Currently, available value is row and column, default is row
                    afterColumnFilter: this.afterColumnFilter, // a callback to get filtered result
                    defaultSortName: 'callStatus',
                    defaultSortOrder: 'desc',
                };
    
            return (
                <div>
                    <div className="topics-list">
                        <TopicsNumber />
                        <div id="settingBtn">
                            <span>Table columns: </span>
                            <label className="checkbox-inline">
                                <input type="checkbox" value="mainSpecificProgrammeLevelDesc" style={{marginLeft: '-50px'}}
                                    onChange={this.onColumnHeaderChange}
                                /> <Tooltip 
                                    term="Pillar" 
                                    explain="H2020 is built around three pillars: Excellent Science, Industrial Leadership and Societal Challenges.</br> Click here to <a> Read more </a>"/>
                            </label>

                            <label className="checkbox-inline">
                                <input type="checkbox" value="actions" defaultChecked={this.state.cols.indexOf('actions')} style={{marginLeft: '-115px'}}
                                    onChange={this.onColumnHeaderChange}
                                /> <Tooltip 
                                    term="Type of actions" 
                                    explain="H2020 has three types of actions: RIA, IA and CSA.</br> Click here to <a> Read more </a>"/>
                            </label>

                            <label className="checkbox-inline">
                                <input type="checkbox" value="callTitle" defaultChecked={this.state.cols.indexOf('callTitle')} style={{marginLeft: '-70px'}}
                                    onChange={this.onColumnHeaderChange}
                                /> <Tooltip 
                                    term="Call title" 
                                    explain="call summary that describes the common scientific field or societal challenge or innovation that the topics of this call are tackling."/>
                            </label>
    
                            <label className="checkbox-inline">
                                <input type="checkbox" value="plannedOpeningDate" style={{marginLeft: '-160px'}}
                                    onChange={this.onColumnHeaderChange}
                                /> <Tooltip 
                                    term="Planned opening date" 
                                    explain="The planned opening date of a specific topic."/>
                            </label>
    
                            <label className="checkbox-inline">
                                <input type="checkbox" value="budget" style={{marginLeft: '-113px'}}
                                    onChange={this.onColumnHeaderChange}
                                /> <Tooltip 
                                    term="Budget history" 
                                    explain="The budget history of a specific topic, this topic was opened before."/>
                            </label>
    
                            <label className="checkbox-inline">
                                <input type="checkbox" value="keywords" style={{marginLeft: '-80px'}}
                                    onChange={this.onColumnHeaderChange}
                                /> <Tooltip 
                                    term="Keywords" 
                                    explain="The official keywords which are used in the proposals, projects and expert profiles in the context of EU grants.</br> Click here to <a> Read more </a>"/>
                            </label>
    
                            <label className="checkbox-inline">
                                <input type="checkbox" value="tags" style={{marginLeft: '-46px'}}
                                    onChange={this.onColumnHeaderChange}
                                /> <Tooltip 
                                    term="Tags" 
                                    explain="List of tags associated with the topic."/>
                            </label>
                        </div>
                        <BootstrapTable 
                            data={ results }
                            replace
                            pagination
                            options={ options }
                            expandableRow={ () => { return true; } }
                            expandComponent={ this.expandComponent }
                            >
                            <TableHeaderColumn 
                                dataField='topicId' 
                                isKey
                                hidden
                                >
                                ID
                            </TableHeaderColumn>
                            <TableHeaderColumn 
                                dataField='title' 
                                expandable={ false } 
                                tdStyle={ { whiteSpace: 'normal' } }
                                dataFormat={ this.linkFormatter }
                                >
                                Topic Title
                            </TableHeaderColumn>
                            <TableHeaderColumn 
                                dataField='callStatus' 
                                expandable={ false }
                                //filter={ { type: 'CustomFilter', getElement: getCustomFilter, customFilterParameters: { textOK: 'Open', textNOK: 'Closed' } } }
                                dataSort 
                                width='150'
                                >
                                Call Status
                            </TableHeaderColumn>
                            <TableHeaderColumn 
                                dataField='deadlineDates'
                                dataSort 
                                sortFunc={ this.revertSortDeadlineDate }
                                tdStyle={ { whiteSpace: 'normal' } }
                                expandable={ false }
                                >
                                Deadline Dates
                            </TableHeaderColumn>
                            

                            {cols.map((col) => {
                                return this.renderColumn(col)
                            })}
    
                        </BootstrapTable>
                    </div>
                </div>
            );

        }
        
    }
}


function mapStateToProps(state){
    return{ 
        searchedTopics: state.searchedTopics,
        columnSettings: state.columnSettings
    };
}

function mapDispatchToProps(dispatch){
    return bindActionCreators({changeColumnSettings, setFilterNumber}, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(TopicsList);
