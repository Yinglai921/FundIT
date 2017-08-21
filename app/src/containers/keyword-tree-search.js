import React, { Component } from 'react';
import ReactDOM from 'react-dom'; // render to DOM
import * as select2 from 'select2';
import $ from 'jquery';

import VirtualizedSelect from 'react-virtualized-select';

import 'react-select/dist/react-select.css';
import 'react-virtualized/styles.css';
import 'react-virtualized-select/styles.css';

import keywords from '../data/keywords.json';



function extract_select2_data(node, leaves, index){ // extract all the nodes for 'select2_data'
    if(node.value){
        var name = `${node.name} (${node.value})`;
        //leaves.push({id:++index,text:name});
        leaves.push({label:name, value:name})
    }else{
        var name = `${node.name} (0)`;
        //leaves.push({id:++index,text:name});
        leaves.push({label:name, value:name})	
    }
    if (node.children.length > 0){

        for(var i = 0; i<node.children.length; i++){
            index = extract_select2_data(node.children[i],leaves,index)[0];
        }
    }
    return [index,leaves];
}

const select2_data = extract_select2_data(keywords,[],0)[1];//I know, not the prettiest...
select2_data.sort(function(a, b){ // sort the object array by alphabetic order
    var textA = a.value.toUpperCase();
    var textB = b.value.toUpperCase();
    return (textA < textB) ? -1 : (textA > textB) ? 1 : 0;
})
//select2_data.unshift({id: 0, text: "select a keyword"})


export default class KeywordTreeSearch extends Component{

    constructor(props){
        super(props);
        this.state={
            disabled: false,
            //options: select2_data,
            selectValue: "",
        }
        this.handleSelectChange = this.handleSelectChange.bind(this);
    }

    handleSelectChange (selectValue) {
        let value = selectValue.value;
		console.log('You\'ve selected:', selectValue);
        this.setState({ value });
        this.props.onSelectKeywords(value);
	}


    render(){

        const options = select2_data;
        return(
            <VirtualizedSelect
                options={options}
                onChange={this.handleSelectChange}
                value={this.state.selectValue}
            />
        )}
    }

// export default class KeywordTreeSearch extends Component{

//     constructor(props){
//         super(props);
//         this.createKeywordTreeSearch = this.createKeywordTreeSearch.bind(this);
//     }

//     componentDidMount() {
//         const mountNode = ReactDOM.findDOMNode(this);
//         //window.addEventListener("resize", this.updateDimensions);
//         this.createKeywordTreeSearch(mountNode, this.props.onChangeKeyword, this.props.onSelectKeywords)
//      }


//     createKeywordTreeSearch(select2DomNode, onChangeKeyword, onSelectKeywords){

//         function extract_select2_data(node, leaves, index){ // extract all the nodes for 'select2_data'
//             if(node.value){
//                 var name = `${node.name} (${node.value})`;
//                 leaves.push({id:++index,text:name});
//             }else{
//                 var name = `${node.name} (0)`;
//                 leaves.push({id:++index,text:name});	
//             }
//             if (node.children.length > 0){

//                 for(var i = 0; i<node.children.length; i++){
//                     index = extract_select2_data(node.children[i],leaves,index)[0];
//                 }
//             }
//             return [index,leaves];
//         }
        
        
//         let select2_data = extract_select2_data(keywords,[],0)[1];//I know, not the prettiest...
//         select2_data.sort(function(a, b){ // sort the object array by alphabetic order
//             var textA = a.text.toUpperCase();
//             var textB = b.text.toUpperCase();
//             return (textA < textB) ? -1 : (textA > textB) ? 1 : 0;
//         })
//         select2_data.unshift({id: 0, text: "select a keyword"})
        
//         //console.log(select2_data);
    
//         //init search box
//         $(select2DomNode).select2({
//             placeholder: "Select a keyword",
//             data: select2_data
//         });
    
    
//         //attach search box listener
//         $(select2DomNode).on("select2:select", function(e) {
//             var text = $("#select2-search-container").attr("title").toString();
//             //var paths = searchTree(root,text,[]);
//             onChangeKeyword(text);
//             onSelectKeywords(text);
//             // if(typeof(paths) !== "undefined"){
//             //     //openPaths(paths);
//             //     //setSearchWord(text);
//             //     //this.props.onChangeKeyword(text)
//             // }
//             // else{
//             //     alert(text+" not found!");
//             // }
//         })

//     } 
    

//     render(){
//         return (<select id="search" className="search js-example-basic-multiple" multiple="multiple"></select>);
//     }

// }