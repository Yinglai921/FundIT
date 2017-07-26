import React, { Component } from 'react';
import { connect } from 'react-redux';
//import FixedDataTable from 'fixed-data-table';
import FilterSidebar from './filter-sidebar';
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';


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
            cols:[] 
        };

        this._onColumnHeaderChange = this._onColumnHeaderChange.bind(this);

    }

    // change the headers of the columns, checkboxes event
    _onColumnHeaderChange(event){
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
        currentCols.sort();
        this.setState({
            cols: currentCols
        })
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
                    >
                    {col}
                    </TableHeaderColumn>
                );
            case 'deadlineDates':
                return(
                    <TableHeaderColumn 
                    dataField={col} 
                    dataSort 
                    sortFunc={ this.revertSortDeadlineDate }
                    expandable={ false }
                    >
                    {col}
                    </TableHeaderColumn>
                );
            case 'keywords':
                return(
                    <TableHeaderColumn 
                    dataField={col} 
                    filter={ { type: 'RegexFilter', delay: 1000 } } 
                    expandable={ true }
                    >
                    {col}
                    </TableHeaderColumn> 
                );
            case 'tags':
                return(
                    <TableHeaderColumn 
                    dataField={col} 
                    filter={ { type: 'RegexFilter', delay: 1000 } } 
                    expandable={ true }
                    >
                    {col}
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
        return <a href={`http://ec.europa.eu/research/participants/portal4/desktop/en/opportunities/h2020/topics/${row.topicFileName}.html`}>{cell}</a>
    }


    render(){
        const { searchedTopics } = this.props;
        const { cols } = this.state;
        const options = {
            expandRowBgColor: 'rgb(255, 255, 255)',
            expandBy: 'column'  // Currently, available value is row and column, default is row
            };
        console.log("render: ", cols)
        return (

            <div className="row">
                <div className="search-bar col-sm-12">
                    <p> Number of topics: {searchedTopics.length} </p>
                    <br />
                    <form className="form-inline row">
                        <div className="checkbox col-3">
                            <label>
                                <input type="checkbox" value="plannedOpeningDate" 
                                    onChange={this._onColumnHeaderChange}
                                /> plannedOpeningDate
                            </label>
                        </div>
                        <div className="checkbox col-2">
                            <label>
                                <input type="checkbox" value="deadlineDates"
                                    onChange={this._onColumnHeaderChange}
                                /> deadlineDates
                            </label>
                        </div>
                        <div className="checkbox col-2">
                            <label>
                                <input type="checkbox" value="tags"
                                    onChange={this._onColumnHeaderChange}
                                /> tags
                            </label>
                        </div> 
                        <div className="checkbox col-2">
                            <label>
                                <input type="checkbox" value="keywords"
                                    onChange={this._onColumnHeaderChange}
                                /> keywords
                            </label>
                        </div>
                    </form>
                    <BootstrapTable 
                        data={ searchedTopics }
                            //striped
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
                            Title
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
        searchedTopics: state.searchedTopics
    };
}

export default connect(mapStateToProps)(TopicsList);
