import { Component, OnInit, OnChanges, ViewChild, ElementRef, Input, ViewEncapsulation } from '@angular/core';
import * as d3 from 'd3';

@Component({
  selector: 'app-scatterplot',
  templateUrl: './scatterplot.component.html',
  styleUrls: ['./scatterplot.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class ScatterplotComponent implements OnInit, OnChanges {
  @ViewChild('chart') private chartContainer: ElementRef;
  @Input() private data: Array<any>;

  private margin: any = { top: 40, right: 20, bottom: 60, left: 60};
  private chart: any;
  private width: number;
  private height: number;
  private xScale: any;
  private yScale: any;
  private colorScale: any;
  private xAxis: any;
  private yAxis: any;

  private sizeDomain: any;
  private sizeRange: any;
  private sizeScale: any;

  private fillColor: any;

  constructor() { }

  ngOnInit() {
    this.createChart();
    if (this.data) {
      this.updateChart();
    }
  }

  ngOnChanges() {
    if (this.chart) {
      this.updateChart();
    }
  }

  createChart() {
    let element = this.chartContainer.nativeElement;
    this.width = element.offsetWidth - this.margin.left - this.margin.right;
    this.height = element.offsetHeight - this.margin.top - this.margin.bottom;
  
    // plot(bubble) size scale
    this.sizeDomain = d3.extent(this.data, (d) => d.radius);
    this.sizeRange = [4, 16];
    this.sizeScale = d3.scaleLinear().domain(this.sizeDomain).range(this.sizeRange);

    // x scale
    let xDomain = d3.extent(this.data, (d) => d.cx);
    let xRange = [0, this.width];
    let xPadding = d3.mean(this.data, (d) => d.cx);
    this.xScale = d3.scaleLinear().domain(xDomain).range(xRange).nice(10);

    // y scale
    let yDomain = d3.extent(this.data, (d) => d.cy);
    let yRange = [this.height, 0];
    this.yScale = d3.scaleLinear().domain(yDomain).range(yRange).nice(5);


    // svg group hierarchy
    let svg = d3.select(element).append('svg')
      .attr('id', 'scatterplot')
      .attr('width', element.offsetWidth)
      .attr('height', element.offsetHeight);
    
    let mainGroup = svg.append('g').attr('id', 'mainGroup')
                       .attr('transform', 'translate(' + this.margin.left + ', ' + this.margin.top + ')');

    
        // x & y axis
    this.xAxis = svg.append('g')
      .attr('class', 'axis axis-x')
      .attr('transform', `translate(${this.margin.left}, ${this.margin.top + this.height})`)
      .call(d3.axisBottom(this.xScale));

    this.yAxis = svg.append('g')
      .attr('class', 'axis axis-y')
      .attr('transform', `translate(${this.margin.left}, ${this.margin.top})`)
      .call(d3.axisLeft(this.yScale));
    
    
    this.fillColor = '#8D95C9';

    // transition visualization
    const circles = mainGroup.selectAll('circle')
      .data(this.data)
      .enter()
      .append('circle')
        .attr('cx', this.xScale(0))
        .attr('cy', this.yScale(0))
        .attr('r', 5)
        .attr('fill', this.fillColor)

    circles.transition()
      .delay(function (d, i) {
        return i * 50;
      })
      .duration(1500)
      .attr('cx', (d) => this.xScale(d.cx))
      .attr('cy', (d) => this.yScale(d.cy))

  }

  updateChart() {
    console.log("update")
    // // update scales & axis
    // this.xScale.domain(this.data.map(d => d.cx));
    // this.yScale.domain([0, d3.max(this.data, d => d.cy)]);
    // //this.colors.domain([0, this.data.length]);
    // this.xAxis.transition().call(d3.axisBottom(this.xScale));
    // this.yAxis.transition().call(d3.axisLeft(this.yScale));

    // let update = this.chart.selectAll('.circle')
    //   .data(this.data);

    // // remove exiting bars
    // update.exit().remove();

    // // update existing bars
    // this.chart.selectAll('.circle').transition()
    //   .attr('cx', (d) => this.xScale(d.cx))
    //   .attr('cy', (d) => this.yScale(d.cy))
    //   .attr('fill', this.fillColor)

    // add new bars
    // update
    //   .enter()
    //   .append('circle')
    //   .attr('class', 'circle')
    //   .attr('cx', (d) => this.xScale(d.cx))
    //   .attr('cy', (d) => this.yScale(d.cy))
    //   .attr('fill', this.fillColor)
  }
}
