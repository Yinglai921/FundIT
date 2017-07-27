import React, { Component } from 'react';
import ReactDOM from 'react-dom'; // render to DOM
import {scaleLinear, max, select} from 'd3';
import { hierarchy, tree} from 'd3-hierarchy';
import * as d3 from "d3";
import * as select2 from 'select2';
import $ from 'jquery';

import keywords from '../data/keywords.json';

class D3KeywordTree extends Component{
    constructor(props){
      super(props)
      this.createTreeChart = this.createTreeChart.bind(this);
	  this.state = {
		  keyword: ''
	  }
    }

   componentDidMount() {
      const mountNode = ReactDOM.findDOMNode(this);
      this.createTreeChart(mountNode, this.props.onChangeKeyword)
   }

   componentDidUpdate() {
      //this.createTreeChart(ReactDOM.findDOMNode(this));
   }

   createTreeChart(svgDomNode, onChangeKeyword) {

		function searchTree(obj,search,path){
			if(obj.data.name === search){ //if search is found return, add the object to the path and return it
				path.push(obj);
				return path;
			}
			else if(obj.children || obj._children){ //if children are collapsed d3 object will have them instantiated as _children
				var children = (obj.children) ? obj.children : obj._children;
				for(var i=0;i<children.length;i++){
					path.push(obj);// we assume this path is the right one
					var found = searchTree(children[i],search,path);
					if(found){// we were right, this should return the bubbled-up path from the first if statement
						return found;
					}
					else{//we were wrong, remove this parent from the path and continue iterating
						path.pop();
					}
				}
			}
			else{//not the right object, return false so it will continue to iterate in the loop
				return false;
			}
		}		

		function extract_select2_data(node,leaves,index){
	        if (node.children.length > 0){
	            for(var i = 0;i<node.children.length;i++){
	                index = extract_select2_data(node.children[i],leaves,index)[0];
	            }
	        }
	        else {
	            leaves.push({id:++index,text:node.name});
	        }
	        return [index,leaves];
		}	
	    // draw tree
        // Set the dimensions and margins of the diagram
		var margin = {top: 20, right: 90, bottom: 30, left: 90},
			width = 960 - margin.left - margin.right,
			height = 500 - margin.top - margin.bottom;

		var zoom = d3.zoom()
		.scaleExtent([0.5, 100])
		.on('zoom', zoomFn);

		function zoomFn() {
		d3.select(svgDomNode).select("g")
			.attr('transform', 'translate(' + d3.event.transform.x + ',' + d3.event.transform.y + ') scale(' + d3.event.transform.k + ')');
		}
		// append the svg object to the body of the page
		// appends a 'group' element to 'svg'
		// moves the 'group' element to the top left margin
		var svg = d3.select(svgDomNode)
			.attr("width", width + margin.right + margin.left)
			.attr("height", height + margin.top + margin.bottom)
			.call(zoom)
			.append("g")
				.attr("transform", "translate("
				+ margin.left + "," + margin.top + ")");

		var i = 0,
			duration = 750,
			root,
			select2_data;

		// declares a tree layout and assigns the size
		var treemap = d3.tree().size([height, width]);

		// Assigns parent, children, height, depth
		root = d3.hierarchy(keywords, function(d) { return d.children; });
		root.x0 = height / 2;
		root.y0 = 0;

		// Collapse after the second level
		root.children.forEach(collapse);

		update(root);

		// Collapse the node and all it's children
		function collapse(d) {
		if(d.children) {
				d._children = d.children
				d._children.forEach(collapse)
				d.children = null
			}
		}

		function openPaths(paths){
			for(var i =0;i<paths.length;i++){
				if(paths[i].id !== "1"){//i.e. not root
					paths[i].class = 'found';
					if(paths[i]._children){ //if children are hidden: open them, otherwise: don't do anything
						paths[i].children = paths[i]._children;
						paths[i]._children = null;
					}
					update(paths[i]);
				}
			}
		}

		//root = keywords;
		select2_data = extract_select2_data(keywords,[],0)[1];//I know, not the prettiest...
		select2_data.unshift({id: 0, text: "select a keyword"})
		//root.x0 = height / 2;
		//root.y0 = 0;
		//root.children.forEach(collapse);
		//update(root);

		//init search box
		$("#search").select2({
			placeholder: "Select a keyword",
			data: select2_data
			//containerCssClass: "search"
		});


		//attach search box listener
		$("select").on("select2:select", function(e) {
			var text = $("#select2-search-container").attr("title").toString();
			var paths = searchTree(root,text,[]);
			if(typeof(paths) !== "undefined"){
				openPaths(paths);
				setSearchWord(text);
			}
			else{
				alert(text+" not found!");
			}
		})

		function update(source) {

		// Assigns the x and y position for the nodes
		var treeData = treemap(root);

		// Compute the new tree layout.
		var nodes = treeData.descendants(),
			links = treeData.descendants().slice(1);

		// Normalize for fixed-depth.
		nodes.forEach(function(d){ d.y = d.depth * 180});

		// ****************** Nodes section ***************************

		// Update the nodes...
		var node = svg.selectAll('g.node')
			.data(nodes, function(d) {return d.id || (d.id = ++i); });

		// Enter any new modes at the parent's previous position.
		var nodeEnter = node.enter().append('g')
			.attr('class', 'node')
			.attr("transform", function(d) {
				return "translate(" + source.y0 + "," + source.x0 + ")";
			})
			.on('click', click);

		// Add Circle for the nodes
		nodeEnter.append('circle')
			.attr('class', 'node')
			.attr('r', 1e-6)
			.style("fill", function(d) {
				return d._children ? "lightsteelblue" : "#fff";
			});

		// Add labels for the nodes
		nodeEnter.append('text')
			.attr("dy", ".35em")
			.attr("x", function(d) {
				return d.children || d._children ? -13 : 13;
			})
			.attr("text-anchor", function(d) {
				return d.children || d._children ? "end" : "start";
			})
			.text(function(d) { return d.data.name; });

		// UPDATE
		var nodeUpdate = nodeEnter.merge(node);

		// Transition to the proper position for the node
		nodeUpdate.transition()
			.duration(duration)
			.attr("transform", function(d) { 
				return "translate(" + d.y + "," + d.x + ")";
			});

		// Update the node attributes and style
		nodeUpdate.select('circle.node')
			.attr('r', 10)
			.style("fill", function(d) {
				if(d.class === "found"){
					return "#ff4136"; // red
				}else if(d._children){
					return "lightsteelblue"
				}else{
					return "#fff"
				}
			})
			.style("stroke", function(d) {
				if(d.class === 'found'){
					return '#ff4136' //red
				}
			})
			.attr('cursor', 'pointer');


		// Remove any exiting nodes
		var nodeExit = node.exit().transition()
			.duration(duration)
			.attr("transform", function(d) {
				return "translate(" + source.y + "," + source.x + ")";
			})
			.remove();

		// On exit reduce the node circles size to 0
		nodeExit.select('circle')
			.attr('r', 1e-6);

		// On exit reduce the opacity of text labels
		nodeExit.select('text')
			.style('fill-opacity', 1e-6);

		// ****************** links section ***************************

		// Update the links...
		var link = svg.selectAll('path.link')
			.data(links, function(d) { return d.id; });

		// Enter any new links at the parent's previous position.
		var linkEnter = link.enter().insert('path', "g")
			.attr("class", "link")
			.attr('d', function(d){
				var o = {x: source.x0, y: source.y0}
				return diagonal(o, o)
			});

		// UPDATE
		var linkUpdate = linkEnter.merge(link);

		// Transition back to the parent element position
		linkUpdate.transition()
			.duration(duration)
			.attr('d', function(d){return diagonal(d, d.parent) })
			.style('stroke', function(d){
				if(d.class === 'found'){
					return '#ff4136';
				}
			});

		// Remove any exiting links
		var linkExit = link.exit().transition()
			.duration(duration)
			.attr('d', function(d) {
				var o = {x: source.x, y: source.y}
				return diagonal(o, o)
			})
			.remove();

		// Store the old positions for transition.
		nodes.forEach(function(d){
			d.x0 = d.x;
			d.y0 = d.y;
		});

		// Creates a curved (diagonal) path from parent to the child nodes
		function diagonal(s, d) {

			let path = `M ${s.y} ${s.x}
					C ${(s.y + d.y) / 2} ${s.x},
					${(s.y + d.y) / 2} ${d.x},
					${d.y} ${d.x}`

			return path
		}

		// Toggle children on click.
		function click(d) {
			if (d.children) {
				d._children = d.children;
				d.children = null;
			} else {
				d.children = d._children;
				d._children = null;
			}
			update(d);
			}
		}

		// click to setSearchWord
		function setSearchWord(d){
			onChangeKeyword(d);
		}
   }
    render() {
      return (
	  		<svg></svg>
		  )
    }
}

export default D3KeywordTree;