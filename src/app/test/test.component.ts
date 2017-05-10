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


  constructor(private topicService: TopicService) {}


  ngOnInit(): void{
    setTimeout(() => {
      this.generateData();
    }, 1000);
  }

  generateData(): void{

    let topicData = [
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
    this.chartData = [];

    for (let i = 0; i < topicData.length; i++){
        let item = {
              cx: topicData[i].budget,
              cy: topicData[i].deadline,
              radius: i
        }
        this.chartData.push(item);
      }
  }
}
