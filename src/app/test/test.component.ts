import { Component, OnInit } from '@angular/core';
import { Topic } from '../modal/topic';
import { TopicService } from '../services/topic.service';

@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.css']
})
export class TestComponent implements OnInit {
  
  // initial topic data from http, haven't used it now
  topics: Topic[] = [];
  
  // data for chart
  private chartData: Array<any>;

  private topicData: Array<any>;
  
  // criterion of the topics
  private criterion: Array<any>;
  // default xAxis and yAxis
  private xAxisCriteria: string;
  private yAxisCriteria: string;

  // haven't used the service now
  constructor(private topicService: TopicService) {}

  ngOnInit(): void{

    this.topicData = [
      {id: 0, topicName:'xxx', complexity: 0.5, budget: 100, deadline: 1, partners: 30},
      {id: 1, topicName:'xxx', complexity: 0.6, budget: 200, deadline: 2, partners: 20},
      {id: 2, topicName:'xxx', complexity: 0.2, budget: 400, deadline: 3, partners: 3},
      {id: 3, topicName:'xxx', complexity: 0.1, budget: 500, deadline: 4, partners: 2},
      {id: 4, topicName:'xxx', complexity: 0.7, budget: 230, deadline: 5, partners: 1},
      {id: 5, topicName:'xxx', complexity: 0.3, budget: 150, deadline: 6, partners: 4},
      {id: 6, topicName:'xxx', complexity: 0.7, budget: 600, deadline: 7, partners: 3},
      {id: 7, topicName:'xxx', complexity: 0.8, budget: 970, deadline: 8, partners: 2},
      {id: 8, topicName:'xxx', complexity: 0.1, budget: 50, deadline: 9, partners: 2},
      {id: 9, topicName:'xxx', complexity: 0.9, budget: 600, deadline: 10, partners: 2}
    ];

    this.criterion = ['Complexity', 'Budget', 'Deadline', 'Partners'];

    this.xAxisCriteria = 'Budget';
    this.yAxisCriteria = 'Complexity';

    setTimeout(() => {
      this.generateData(this.xAxisCriteria, this.yAxisCriteria);
    }, 1000);

  }

  generateData(xCriteria: string, yCriteria: string): void{

    this.chartData = [];

    for (let i = 0; i < this.topicData.length; i++){
        let item = {cx: 0, cy: 0, radius: i}
        switch(xCriteria) { 
                case "Complexity": { 
                    item.cx = this.topicData[i].complexity;
                    break; 
                } 
                case "Budget": { 
                    item.cx = this.topicData[i].budget;
                    break; 
                } 
                case "Deadline": {
                    item.cx = this.topicData[i].deadline;
                    break;    
                } 
                case "Partners": { 
                    item.cx = this.topicData[i].partners;
                    break; 
                }  
                default: { 
                    item.cx = this.topicData[i].budget;
                    break;              
                } 
              }

        switch(yCriteria) { 
                case "Complexity": { 
                    item.cy = this.topicData[i].complexity;
                    break; 
                } 
                case "Budget": { 
                    item.cy = this.topicData[i].budget; 
                    break; 
                } 
                case "Deadline": {
                    item.cy = this.topicData[i].deadline;
                    break;    
                } 
                case "Partners": { 
                    item.cy = this.topicData[i].partners;
                    break; 
                }  
                default: { 
                    item.cy = this.topicData[i].complexity;
                    break;              
                } 
              }
        this.chartData.push(item);
      }

    console.log(this.chartData);
  }
  
  onSelectX(criteria: string): void {
    this.xAxisCriteria = criteria;
    this.generateData(this.xAxisCriteria, this.yAxisCriteria);
  }

  onSelectY(criteria: string): void {
    this.yAxisCriteria = criteria;
    this.generateData(this.xAxisCriteria, this.yAxisCriteria);
  }
}
