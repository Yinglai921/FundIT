import { Component, OnInit , AfterContentInit} from '@angular/core';
import { Topic } from '../modal/topic';
import { TopicService } from '../services/topic.service';

@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.css']
})
export class TestComponent implements OnInit , AfterContentInit{
  
  // initial topic data from http, haven't used it now
  private topics: Topic[] = [];
  
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

    this.topicService.getTopics()
                     .then(topics => {
                         //console.log(topics);
                         this.topics = topics;
                        });


    this.criterion = ['Complexity', 'Budget', 'Deadline', 'Partners'];

    this.xAxisCriteria = 'Budget';
    this.yAxisCriteria = 'Complexity';


  }
  ngAfterContentInit(){
      setTimeout(() => {
            this.generateData(this.xAxisCriteria, this.yAxisCriteria);
        }, 1000);
  }

  generateData(xCriteria: string, yCriteria: string): void{

    this.chartData = [];

    for (let i = 0; i < this.topics.length; i++){
        let item = {cx: 0, cy: 0, radius: i, topicName: 'NaN'}
        switch(xCriteria) { 
                case "Complexity": { 
                    item.cx = this.topics[i].complexity;
                    break; 
                } 
                case "Budget": { 
                    item.cx = this.topics[i].budget;
                    break; 
                } 
                case "Deadline": {
                    item.cx = this.topics[i].deadline;
                    break;    
                } 
                case "Partners": { 
                    item.cx = this.topics[i].partners;
                    break; 
                }  
                default: { 
                    item.cx = this.topics[i].budget;
                    break;              
                } 
              }

        switch(yCriteria) { 
                case "Complexity": { 
                    item.cy = this.topics[i].complexity;
                    break; 
                } 
                case "Budget": { 
                    item.cy = this.topics[i].budget; 
                    break; 
                } 
                case "Deadline": {
                    item.cy = this.topics[i].deadline;
                    break;    
                } 
                case "Partners": { 
                    item.cy = this.topics[i].partners;
                    break; 
                }  
                default: { 
                    item.cy = this.topics[i].complexity;
                    break;              
                } 
              }
        
        item.topicName = this.topics[i].topicName;
        item.radius = this.topics[i].complexity;
        this.chartData.push(item);
      }
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
