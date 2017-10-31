import React, { Component } from 'react';
import ReactDOM from 'react-dom'; // render to DOM
import * as select2 from 'select2';
import $ from 'jquery';

import VirtualizedSelect from 'react-virtualized-select';

import 'react-select/dist/react-select.css';
import 'react-virtualized/styles.css';
import 'react-virtualized-select/styles.css';






//select2_data.unshift({id: 0, text: "select a keyword"})


export default class KeywordTreeSearch extends Component{

    constructor(props){
        super(props);
        this.state={
            multi: true,
            selectValue: [...new Set(this.props.keywords)], // get the unique array 
        }
        this.handleSelectChange = this.handleSelectChange.bind(this);
        this.extract_select2_data = this.extract_select2_data.bind(this);
    }

    handleSelectChange (selectValue) {
        let value = selectValue.value;
		console.log('You\'ve selected:', selectValue);
        this.setState({ selectValue });
        let list = [];
        selectValue.map((value) => {
            list.push(value.label)
        })
        this.props.onSelectKeywords(list);
    }

    extract_select2_data(node, leaves, index){ // extract all the nodes for 'select2_data'
        if(node.value){
            var name = `${node.description} (${node.value})`;
            //leaves.push({id:++index,text:name});
            leaves.push({label:name, value:name})
        }else{
            var name = `${node.description} (0)`;
            //leaves.push({id:++index,text:name});
            leaves.push({label:name, value:name})	
        }
        if (node.children.length > 0){

            for(var i = 0; i<node.children.length; i++){
                index = this.extract_select2_data(node.children[i],leaves,index)[0];
            }
        }
        return [index,leaves];
    }


    render(){

        const select2_data = this.extract_select2_data(this.props.data,[],0)[1];//I know, not the prettiest...
        
        select2_data.sort(function(a, b){ // sort the object array by alphabetic order
            var textA = a.value.toUpperCase();
            var textB = b.value.toUpperCase();
            return (textA < textB) ? -1 : (textA > textB) ? 1 : 0;
        })

        const options = select2_data;
        return(

                <VirtualizedSelect
                    options={options}
                    multi={this.state.multi}
                    onChange={this.handleSelectChange}
                    value={this.state.selectValue}
                />

        )}
    }
