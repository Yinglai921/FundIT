import { InMemoryDbService } from 'angular-in-memory-web-api';
export class InMemoryDataService implements InMemoryDbService {
  createDb() {
    let topics = [
      {id: 0, topicName:'xxx', complexity: 0.5, budget: 100, deadline: 10, partners: 3},
      {id: 1, topicName:'xxx', complexity: 0.6, budget: 200, deadline: 6, partners: 2},
      {id: 2, topicName:'xxx', complexity: 0.2, budget: 400, deadline: 20, partners: 3},
      {id: 3, topicName:'xxx', complexity: 0.1, budget: 500, deadline: 30, partners: 2},
      {id: 4, topicName:'xxx', complexity: 0.7, budget: 230, deadline: 42, partners: 1},
      {id: 5, topicName:'xxx', complexity: 0.3, budget: 150, deadline: 23, partners: 4},
      {id: 6, topicName:'xxx', complexity: 0.7, budget: 600, deadline: 34, partners: 3},
      {id: 7, topicName:'xxx', complexity: 0.8, budget: 970, deadline: 15, partners: 2},
      {id: 8, topicName:'xxx', complexity: 0.1, budget: 50, deadline: 13, partners: 2},
      {id: 9, topicName:'xxx', complexity: 0.9, budget: 600, deadline: 36, partners: 2}
    ];
    return {topics};
  }
}
