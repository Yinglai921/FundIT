import React, { Component } from 'react';
import { connect } from 'react-redux';
//import FixedDataTable from 'fixed-data-table';
import FilterSidebar from './filter-sidebar';
import { BootstrapTable, TableHeaderColumn, BSTable } from 'react-bootstrap-table';

let order = 'desc';

// order planedOpenDate, not a good solution, but can't write it more general because of the data structure


class TopicsList extends Component {
    constructor(props) {
        super(props);
        
        this.state = {
            filteredTopics: this.props.searchedTopics,
            onFilterChange: false,
            filterTerm: this.props.filterTerm,
            cols:[] 
        };

        this._onColumnHeaderChange = this._onColumnHeaderChange.bind(this);

    }

    componentDidUpdate(){
        const { filteredTopics, onFilterChange } = this.state;
        console.log("searched topics:" + this.props.searchedTopics.length)
        console.log("filtered topics:" + filteredTopics.length)
        if( !onFilterChange ){
            if(this.props.searchedTopics !== filteredTopics){
                this.setState({
                    filteredTopics: this.props.searchedTopics
                })
            }
        }
    }
    
    _onColumnHeaderChange(event){
        let col = event.target.value;
        let cols = this.state.cols;
        if(event.target.checked){
            if(cols.includes(col)){
                return;
            }else{
                cols.push(col)
            }
        }else{
            if(cols.includes(col)){
                cols.splice(cols.indexOf(col), 1);
            }
        }
        this.setState({
            cols: cols
        })
    }

    revertSortOpenDate(a, b, order) {   
    a = new Date(a.plannedOpeningDate);
    b = new Date(b.plannedOpeningDate);
    if (order === 'desc') {
        return a - b;
    } else {
        return b - a;
    }
    }

    revertSortDeadlineDate(a, b, order) {   
        a = new Date(a.deadlineDates[0]);
        b = new Date(b.deadlineDates[0]);
        if (order === 'desc') {
            return a - b;
        } else {
            return b - a;
        }
    }


    renderColumn(col){
        
        if(col === 'plannedOpeningDate'){
            return(
                <TableHeaderColumn dataField={col} dataSort sortFunc={ this.revertSortOpenDate }>{col}</TableHeaderColumn>
            ) 
        }
        else if(col === 'deadlineDates'){
            return(
                <TableHeaderColumn dataField={col} dataSort sortFunc={ this.revertSortDeadlineDate }>{col}</TableHeaderColumn>
            )
        }
        
        else{
            return(
                <TableHeaderColumn dataField={col} filter={ { type: 'RegexFilter', delay: 1000 } } >{col}</TableHeaderColumn>      
            )
        }
        
    }

    // isExpandableRow(row) {
    // if (row.callStatus === 'Open') return true;
    // else return false;
    // }

    // expandComponent(row) {
    //     return (
    //     <BSTable data={ row.tags } />
    //     );
    // }

    render(){
        const { filteredTopics, onFilterChange, cols } = this.state;
        const options = {
            expandRowBgColor: 'rgb(242, 255, 163)'
            };
        return (

            <div className="row">
                <div className="search-bar col-sm-12">
                    <p> Number of topics: {filteredTopics.length} </p>
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
                        data={ filteredTopics }
                            striped
                        >
                        
                        <TableHeaderColumn dataField='title' isKey>Title</TableHeaderColumn>
                        <TableHeaderColumn dataField='callStatus' dataSort>Call Status</TableHeaderColumn>
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
