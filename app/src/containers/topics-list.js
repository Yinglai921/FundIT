import React, { Component } from 'react';
import { connect } from 'react-redux';
import FixedDataTable from 'fixed-data-table';


const { Table, Column, Cell } = FixedDataTable;

const TextCell = ({rowIndex, data, columnKey, ...props}) => (
    <Cell {...props}>
        {data[rowIndex][columnKey]}
    </Cell>
);

const LinkCell = ({rowIndex, data, columnKey, linkKey, ...props}) => (
  //let identifier = topic.identifier.toLowerCase();
  <Cell {...props}>
    <a href={`http://ec.europa.eu/research/participants/portal4/desktop/en/opportunities/h2020/topics/${data[rowIndex][linkKey]}.html`}>{data[rowIndex][columnKey]}</a>
  </Cell>
);

class TopicsList extends Component {
    constructor(props) {
        super(props);
        
        this.state = {
            filteredTopics: this.props.searchedTopics,
            onFilterChange: false,
            filterTerm: this.props.filterTerm,
            columnWidths: {
                title: 240,
                plannedOpeningDate: 100,
                deadlineDates: 100,
                callStatus: 80,
                keywords: 200,
                tags: 200

            },
            cols:[]
            
        };

        this._onColumnResizeEndCallback = this._onColumnResizeEndCallback.bind(this);
        this._onFilterChange = this._onFilterChange.bind(this);
        this.onColumnHeaderChange = this.onColumnHeaderChange.bind(this);
        this.renderColumn = this.renderColumn.bind(this)
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

    _onColumnResizeEndCallback(newColumnWidth, columnKey) {
        this.setState(({columnWidths}) => ({
        columnWidths: {
            ...columnWidths,
            [columnKey]: newColumnWidth,
        }
        }));
    }
    _onFilterChange(e) {
        if (!e.target.value) {
            this.setState({
                filteredTopics: this.props.searchedTopics,
                onFilterChange: false
            });
        }

        this.setState({
            filterTerm: e.target.value
        })

        var filterBy = e.target.value.toLowerCase();
        var size = this.props.searchedTopics.length;
        var filteredIndexes = [];
        for (var index = 0; index < size; index++) {
            var { keywords } = this.props.searchedTopics[index];
            var keywordString = " "
            if(keywords !== " "){
                keywords.forEach((keyword) => {
                    keywordString += keyword
                })
            }

            if (keywordString.indexOf(filterBy) !== -1) {
                    filteredIndexes.push(index);
                }
        }

        console.log(filteredIndexes)

        var filteredTopics = [];
        filteredIndexes.forEach((index) => {
            filteredTopics.push(this.props.searchedTopics[index]);
        })
        this.setState({
            filteredTopics: filteredTopics,
            onFilterChange: true
        });
    }
    
    onColumnHeaderChange(event){
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

    renderColumn(col, filteredTopics, columnWidths){
        
        console.log(col)
        console.log(filteredTopics.length);
        console.log(columnWidths[col])
        console.log("")

        return(
            <Column
                columnKey={col}
                header={<Cell>{col}</Cell>}
                cell={<TextCell data={filteredTopics}/>}
                fixed={true}
                width={columnWidths[col]}
                isResizable={true}
            />         

        )
        
    }

    render(){

        const { columnWidths, filteredTopics, onFilterChange, cols } = this.state;

        return(
            <div>
                <label> Filter by keywords: </label>
                <input
                onChange={this._onFilterChange}
                placeholder="Filter by keywords"
                value={this.state.filterTerm}
                />
                <br />
                <p> Number of topics: {filteredTopics.length} </p>
                <form className="form-inline row">
                    <div className="checkbox col-2">
                        <label>
                            <input type="checkbox" value="plannedOpeningDate" 
                                onChange={this.onColumnHeaderChange}
                            /> plannedOpeningDate
                        </label>
                    </div>
                    <div className="checkbox col-2">
                        <label>
                            <input type="checkbox" value="deadlineDates"
                                onChange={this.onColumnHeaderChange}
                            /> deadlineDates
                        </label>
                    </div>
                     <div className="checkbox col-2">
                        <label>
                            <input type="checkbox" value="tags"
                                onChange={this.onColumnHeaderChange}
                            /> tags
                        </label>
                    </div> 
                    <div className="checkbox col-2">
                        <label>
                            <input type="checkbox" value="keywords"
                                onChange={this.onColumnHeaderChange}
                            /> keywords
                        </label>
                    </div>
                </form>
                <Table
                    rowHeight={80}
                    headerHeight={50}
                    rowsCount={filteredTopics.length}
                    onColumnResizeEndCallback={this._onColumnResizeEndCallback}
                    isColumnResizing={false}
                    width={1020}
                    height={600}
                    {...this.props}>

                    <Column
                        columnKey="title"
                        header={<Cell>Title</Cell>}
                        cell={<LinkCell data={filteredTopics} linkKey="identifier"/>}
                        fixed={true}
                        width={columnWidths.title}
                        isResizable={true}
                    /> 

                     {this.renderColumn("callStatus", filteredTopics, columnWidths)}
                    
                    {cols.map((col) => {
                        return this.renderColumn(col, filteredTopics, columnWidths)
                    })}

                </Table>

            </div>
        )
    }



}


function mapStateToProps(state){
    return{ 
        searchedTopics: state.searchedTopics,
        filterTerm: state.filterTerm
    };
}

export default connect(mapStateToProps)(TopicsList);



    // renderTopic(topic){
    //     let identifier = topic.identifier.toLowerCase();
    //     return(
    //         <tr key={topic.topicId}>
    //             <td><a href={`http://ec.europa.eu/research/participants/portal4/desktop/en/opportunities/h2020/topics/${identifier}.html`}>{topic.title}</a></td>
    //             <td>{topic.callStatus}</td>
    //             <td>{topic.plannedOpeningDate}</td>
    //             <td>{topic.deadlineDates[0]}</td>
    //         </tr>
    //     )
    // }




    // render(){

    //     if(!this.props.searchedTopics){
    //         return <div> Loading... </div>
    //     }
    //     return(
    //         <div className="col-md-10">
    //             <div>
    //                 topics number: {this.props.searchedTopics.length}
    //             </div>
    //             <table className="table">
    //                 <thead>
    //                 <tr>
    //                     <th>Title</th>
    //                     <th>Call Status</th>
    //                     <th>Open Date</th>
    //                     <th>Close Date</th>
    //                 </tr>
    //                 </thead>
    //                 <tbody>
    //                     {this.props.searchedTopics.map(this.renderTopic)}
    //                 </tbody>
    //             </table>
    //         </div>
    //     )
    // }