import React, { Component } from 'react';
import ReactDOM from 'react-dom'; // render to DOM
import {scaleLinear, max, select} from 'd3';
import { hierarchy, tree} from 'd3-hierarchy';
import * as d3 from "d3";
import * as d3Chromatic from 'd3-scale-chromatic';
import $ from 'jquery';
import { selectAll } from 'd3-selection';


class D3KeywordTree extends Component{
    constructor(props){
      super(props)
	  this.createTreeChart = this.createTreeChart.bind(this);
	  this.updateDimensions = this.updateDimensions.bind(this);
	  this.state = {
		  keyword: '',
		  graphWidth: 0,
		  graphHeight: 0
	  }
	}


   updateDimensions(){
	   this.setState({graphWidth: $(window).width() * 0.8, graphHeight: $(window).height() * 0.8})	   
   }

   componentWillMount(){
	   this.updateDimensions();
   }
   componentDidMount() {
	  const mountNode = ReactDOM.findDOMNode(this);
	  window.addEventListener("resize", this.updateDimensions);
      this.createTreeChart(mountNode, this.props.onChangeKeyword, this.props.data, this.props.keywords, this.props.onSelectKeywords, this.props.colorToggle);
   }

   componentWillUnmount(){
	   window.removeEventListener("resize", this.updateDimensions)
   }
   
   componentDidUpdate() {
	   console.log("graph updated")
	   const mountNode = ReactDOM.findDOMNode(this);
       this.createTreeChart(mountNode, this.props.onChangeKeyword, this.props.data, this.props.keywords, this.props.onSelectKeywords, this.props.colorToggle)
   }

   createTreeChart(svgDomNode, onChangeKeyword, data, selectedKeywords, onSelectKeywords, colorToggle) {

		d3.select("#keyword-tree-graph svg").html(`  
		<text x="10" y="20" >Horizon 2020 Keyword Tree
			<tspan x="10" y="45">Selected keywords:</tspan>
			<tspan x="10" y="70">${selectedKeywords}</tspan>
	    </text>`);

		function searchTree(obj,search,path){
			var name;
			name = obj.data.description;
						
			if(name === search){ //if search is found return, add the object to the path and return it
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
		
		// initial tree data
		// console.log("treehierarcy: ", data );
		// draw tree

        // Set the dimensions and margins of the diagram
		var margin = {top: this.state.graphHeight * 0.05, right: this.state.graphWidth * 0.1, bottom: this.state.graphHeight * 0.05, left: this.state.graphWidth * 0.1},
			width = this.state.graphWidth - margin.left - margin.right,
			height = this.state.graphHeight - margin.top - margin.bottom;

		var zoom = d3.zoom()
		.scaleExtent([0.7, 2])
		.on('zoom', zoomFn)
		

		function zoomFn() {
			d3.select(svgDomNode).select("g")
				.attr('transform', 'translate(' + d3.event.transform.x + ',' + d3.event.transform.y + ') scale(' + d3.event.transform.k + ')');
		}

		function reset(){
			d3.zoomTransform(this).x = 0;
			d3.zoomTransform(this).y = 0;
			d3.zoomTransform(this).k = 1;
			d3.select(svgDomNode).select("g").transition().duration(750)
				.attr('transform', 'translate(' + d3.zoomTransform(this).x + ',' + d3.zoomTransform(this).y + ') scale(' + d3.zoomTransform(this).k + ')');
			
			//console.log(d3.zoomTransform(this))
		}

		// tooltips
		var tooltip = d3.select("body").append("div")
		.attr("class", "tooltip")
		.style("opacity", 0);


		var colorScale = d3.scaleSequential(d3Chromatic.interpolateGreens)
		.domain([0, 50])
		// append the svg object to the body of the page
		// appends a 'group' element to 'svg'
		// moves the 'group' element to the top left margin
		var svg = d3.select(svgDomNode)
			.attr("width", width + margin.right + margin.left)
			.attr("height", height + margin.top + margin.bottom)
			.call(zoom)
			.on('dblclick.zoom', reset)
			.append("g")
				.attr("id", "svgGroup")
				.attr("transform", "translate("
				+ margin.left + "," + margin.top * 0.5 + ")");


		var i = 0,
			duration = 750,
			root;

		// declares a tree layout and assigns the size
		var treemap = d3.tree().size([height, width]);

		// Assigns parent, children, height, depth
		
		root = d3.hierarchy(data, function(d) { return d.children; });
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

		console.log("selectedKeywords: ", selectedKeywords)
		if(selectedKeywords.length !== 0){
			selectedKeywords.forEach((keyword) =>{
				let lastOccuranceIndex = keyword.lastIndexOf("(") - 1;
		    	keyword = keyword.substring(0, lastOccuranceIndex);
				var paths = searchTree(root, keyword, []);
				openPaths(paths);
			});
		}



		function update(source) {

			// compute the new height
			// from https://stackoverflow.com/questions/13103748/dynamically-resize-the-d3-tree-layout-based-on-number-of-childnodes

			var levelWidth = [1];
			var childCount = function(level, n) {
				
				if(n.children && n.children.length > 0) {
				if(levelWidth.length <= level + 1) levelWidth.push(0);
				
				levelWidth[level+1] += n.children.length;
				n.children.forEach(function(d) {
					childCount(level + 1, d);
				});
				}
			};
			childCount(0, root);  
			if(levelWidth.length > 4){ // don't apply it if the tree is not too big
				var newHeight = d3.max(levelWidth) * 30; // 20 pixels per line  
				treemap = d3.tree().size([newHeight, width]);
			}
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
					if(colorToggle === false){
						return d._children ? "lightsteelblue" : "#fff";
					}
					else{
						if(d.data.value === undefined){
							d.data.value = 0;
						}
						return colorScale(d.data.value)
					}
				})


			// Add labels for the nodes
			nodeEnter.append('text')
				.attr("dy", ".35em")
				.attr("x", function(d) {
					return d.children || d._children ? -13 : 13;
				})
				.attr("text-anchor", function(d) {
					return d.children || d._children ? "end" : "start";
				})
				.attr("class", "treeGraphLabel")
				.text(function(d) { 
					if (d.data.name !== undefined){
						if (d.data.name.length <= 20){
							return d.data.name;
						} else {
							return `${d.data.name.substring(0, 20)}...`; 
						}
					}

				})
				.on("click", setSearchWordFromTree)
				.on("mouseover", function(d) {
					if(d.data.value === undefined){
						d.data.value = 0;
					}
					tooltip.transition()
					  .duration(200)
					  .style("opacity", .9);
					tooltip.html(d.data.description + "<br/> Number of topics:" + d.data.value + "<br/> Number of open topics:" + d.data.open_value)
					  .style("left", (d3.event.pageX + 38) + "px")
					  .style("top", (d3.event.pageY - 28) + "px");
					})
				  .on("mouseout", function(d) {
					tooltip.transition()
					  .duration(500)
					  .style("opacity", 0);
					});

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
					if(colorToggle === false){
						if(d.class === "found"){
							return "#ff4136"; // red
						}else if(d._children){
							return "lightsteelblue"
						}
						else{
							return "#fff"
						}
					}else{
						
						if(d.class === "found"){
							//return "#ff4136"; // red
							return colorScale(d.data.value)
						}else if(d.data.value === undefined ){
							d.data.value = 0;
							return colorScale(d.data.value)
						}
						else{
							return colorScale(d.data.value)
						}
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


		// click tree to setSearchWord
		function setSearchWordFromTree(d){
			tooltip.transition()
			.duration(500)
			.style("opacity", 0);

			if (d.data.value == undefined){
				d.data.value = 0;
			}
			let name = `${d.data.description} (${d.data.value})`
			console.log(name)
			//onChangeKeyword(d.data.name);
			onSelectKeywords(name, onChangeKeyword);
		}
   }
    render() {
      return (
	  		<svg width={this.state.graphWidth} height={this.state.graphHeight} id="diagram">
			</svg>
		  )
    }
}

export default D3KeywordTree;