import React, { Component } from 'react';
import ReactDOM from 'react-dom'; // render to DOM
import * as d3 from "d3";

class D3KeywordColorLegend extends Component{
    constructor(props){
      super(props)
      this.createKeywordLegend = this.createKeywordLegend.bind(this);
    }

   componentDidMount() {
      const mountNode = ReactDOM.findDOMNode(this);
      this.createKeywordLegend(mountNode)
   }

   componentDidUpdate() {
      //this.createTreeChart(ReactDOM.findDOMNode(this));
   }

   createKeywordLegend(svgDomNode) {
    var w = 300, h = 50;
    
    var key = d3.select(svgDomNode)
    .attr("width", w)
    .attr("height", h);

    var legend = key.append("defs")
    .append("svg:linearGradient")
    .attr("id", "gradient")
    .attr("x1", "0%")
    .attr("y1", "100%")
    .attr("x2", "100%")
    .attr("y2", "100%")
    .attr("spreadMethod", "pad");

    legend.append("stop")
    .attr("offset", "0%")
    .attr("stop-color", "#f7fcf0")
    .attr("stop-opacity", 1);

    legend.append("stop")
    .attr("offset", "33%")
    .attr("stop-color", "#bae4bc")
    .attr("stop-opacity", 1);

    legend.append("stop")
    .attr("offset", "66%")
    .attr("stop-color", "#00c172")
    .attr("stop-opacity", 1);

    legend.append("stop")
    .attr("offset", "100%")
    .attr("stop-color", "#004529")
    .attr("stop-opacity", 1);

    key.append("rect")
    .attr("width", w)
    .attr("height", h - 30)
    .style("fill", "url(#gradient)")
    .attr("transform", "translate(0,10)");

    var y = d3.scaleLinear()
    .range([300, 0])
    .domain([45, 0]);

    var yAxis = d3.axisBottom()
    .scale(y)
    .ticks(5);

    key.append("g")
    .attr("class", "y axis")
    .attr("transform", "translate(0,30)")
    .call(yAxis)
    .append("text")
    .attr("transform", "rotate(-90)")
    .attr("y", 0)
    .attr("dy", ".71em")
    .style("text-anchor", "end")
    .text("axis title");
      
   }

   render() {
      return (
	  		<svg></svg>
		  )
    }
}

export default D3KeywordColorLegend;