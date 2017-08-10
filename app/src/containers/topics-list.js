import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
//import FixedDataTable from 'fixed-data-table';
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';
import { Collapse, Button, CardBlock, Card } from 'reactstrap';
import { changeColumnSettings, setFilterNumber } from '../actions/index';
import TopicsNumber from './topics-number';

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
            collapse: false,
            filterNumber: this.props.searchedTopics.length
        };

        this.onColumnHeaderChange = this.onColumnHeaderChange.bind(this);
        this.toggle = this.toggle.bind(this);
        this.afterColumnFilter = this.afterColumnFilter.bind(this);

    }

    toggle(){
        this.setState({ collapse: !this.state.collapse });
    }

    // set the columns according to the columnSettings if has one
    componentWillMount(){
        const { columnSettings, searchedTopics } = this.props;
        let cols = [];
        if (columnSettings !== null){
            if (columnSettings.callTitle)
                cols.push('callTitle')
            if (columnSettings.plannedOpeningDate)
                cols.push('plannedOpeningDate')
            if (columnSettings.deadlineDates)
                cols.push('deadlineDates')
            if (columnSettings.keywords)
                cols.push('keywords')
            if (columnSettings.tags)
                cols.push('tags')
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

        const columnOrder = ['callTitle', 'plannedOpeningDate', 'deadlineDates', 'keywords', 'tags'];
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
            case 'deadlineDates':
                return(
                    <TableHeaderColumn 
                    dataField={col} 
                    dataSort 
                    sortFunc={ this.revertSortDeadlineDate }
                    expandable={ false }
                    width='200'
                    >
                    Deadline Dates
                    </TableHeaderColumn>
                );
            case 'keywords':
                return(
                    <TableHeaderColumn 
                    dataField={col} 
                    filter={ { type: 'RegexFilter', delay: 1000 } } 
                    expandable={ true }
                    dataFormat={ this.keywordFormatter }
                    >
                    Keywords
                    </TableHeaderColumn> 
                );
            case 'tags':
                return(
                    <TableHeaderColumn 
                    dataField={col} 
                    filter={ { type: 'RegexFilter', delay: 1000 } } 
                    expandable={ true }
                    dataFormat={ this.keywordFormatter }
                    >
                    Tags
                    </TableHeaderColumn> 
                );
            case 'callTitle':
                return(
                    <TableHeaderColumn 
                    dataField={col}
                    tdStyle={ { whiteSpace: 'normal' } } 
                    filter={ { type: 'RegexFilter', delay: 1000 } } 
                    expandable={ false }
                    >
                    Call Title
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
        return <a target="_blank" href={`http://ec.europa.eu/research/participants/portal4/desktop/en/opportunities/h2020/topics/${row.topicFileName}.html`}>{cell}</a>
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

        // some custom settings for react-bootstrap-table
        const options = {
            expandRowBgColor: 'rgb(219,230,236)',
            expandBy: 'column',  // Currently, available value is row and column, default is row
            afterColumnFilter: this.afterColumnFilter // a callback to get filtered result
            };

        console.log("render: ", cols)
        return (
            <div className="row">
                <div className="topics-list col-sm-12">
                    <TopicsNumber />
                    <div id="settingBtn">
                        <Button onClick={this.toggle} style={{ marginBottom: '1rem'}}>
                            <span className="fa fa-cog" aria-hidden="true"></span>
                        </Button>
                        <Collapse isOpen={this.state.collapse}>
                            <Card>
                                <CardBlock>

                                            <label className="checkbox-inline">
                                                <input type="checkbox" value="callTitle" defaultChecked={this.props.columnSettings.callTitle}
                                                    onChange={this.onColumnHeaderChange}
                                                /> Call Title
                                            </label>

  
                                            <label className="checkbox-inline">
                                                <input type="checkbox" value="plannedOpeningDate" defaultChecked={this.props.columnSettings.plannedOpeningDate}
                                                    onChange={this.onColumnHeaderChange}
                                                /> Planned Opening Date
                                            </label>

                                            <label className="checkbox-inline">
                                                <input type="checkbox" value="deadlineDates" defaultChecked={this.props.columnSettings.deadlineDates}
                                                    onChange={this.onColumnHeaderChange}
                                                /> Deadline Dates
                                            </label>

                                            <label className="checkbox-inline">
                                                <input type="checkbox" value="keywords" defaultChecked={this.props.columnSettings.keywords}
                                                    onChange={this.onColumnHeaderChange}
                                                /> Keywords
                                            </label>

                                            <label className="checkbox-inline">
                                                <input type="checkbox" value="tags" defaultChecked={this.props.columnSettings.tags}
                                                    onChange={this.onColumnHeaderChange}
                                                /> Tags
                                            </label>
                                </CardBlock>
                            </Card>
                        </Collapse>
                    </div>
                    <BootstrapTable 
                        data={ searchedTopics }
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
                            dataSort 
                            width='150'
                            >
                            Call Status
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
