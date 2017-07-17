import React, { Component } from 'react';
import ReactDOM from 'react-dom'; // render to DOM
import { hierarchy, tree} from 'd3-hierarchy';
import * as d3 from "d3";
import * as select2 from 'select2';
import $ from 'jquery';

class D3BubbleChart extends Component{
    constructor(props){
      super(props)
      this.createBubbleChart = this.createBubbleChart.bind(this);
    }

   componentDidMount() {
      const mountNode = ReactDOM.findDOMNode(this);
      this.createBubbleChart(mountNode)
   }

   componentDidUpdate() {
      //this.createTreeChart(ReactDOM.findDOMNode(this));
   }

   createBubbleChart(svgDomNode) {
        var diameter = 960,
            format = d3.format(",d"),
            color = d3.scaleOrdinal(d3.schemeCategory20c);

        var bubble = d3.pack()
            .size([diameter, diameter])
            .padding(1.5);

        var svg = d3.select(svgDomNode)
            .attr("width", diameter)
            .attr("height", diameter)
            .attr("class", "bubble");


        var root = d3.hierarchy(classes(this.props.data))
            .sum(function(d) { return d.value; })
            .sort(function(a, b) { return b.value - a.value; });
        
        bubble(root);

        var node = svg.selectAll(".node")
            .data(root.children)
            .enter().append("g")
            .attr("class", "node")
            .attr("transform", function(d) { return "translate(" + d.x + "," + d.y + ")"; });

        node.append("title")
            .text(function(d) { return d.data.term + ": " + format(d.value); });

        node.append("circle")
            .attr("r", function(d) { return d.r; })
            .style("fill", function(d) { 
                return color(d.data.term); 
            })
            .style("stroke-width", "0px")

        node.append("text")
            .attr("dy", ".3em")
            .style("text-anchor", "middle")
            .text(function(d) { return d.data.term.substring(0, d.r / 3); });


        // Returns a flattened hierarchy containing all leaf nodes under the root.
        function classes(root) {
            //var classes = [];
            root.sort((a, b) => {
                return b.value - a.value;
            })
            var classes = root
            // function recurse(name, node) {
            //     if (node.children) node.children.forEach(function(child) { recurse(node.name, child); });
            //     else classes.push({packageName: name, className: node.name, value: node.size});
            // }
            console.log(classes)
            // recurse(null, root);
            return {children: classes};
            }

       //d3.select(self.frameElement).style("height", diameter + "px");
      
   }

   render() {
      return (
	  		<svg></svg>
		  )
    }
}

export default D3BubbleChart;