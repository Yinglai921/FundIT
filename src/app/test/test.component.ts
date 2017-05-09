import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.css']
})
export class TestComponent implements OnInit {
  // data for chart
  private chartData: Array<any>;
 
  // initial data
  


  constructor() {}

  ngOnInit() {
    // give everything a chance to get loaded before starting the animation to reduce choppiness
    setTimeout(() => {
      this.generateData();

      // change the data periodically
      setInterval(() => this.generateData(), 3000);
    }, 1000);
  }

  generateData() {
    this.chartData = [
      { cx: 100, cy: 110, radius: 5 },
      { cx: 83,  cy: 43, radius: 5  },
      { cx: 92,  cy: 28, radius: 5  },
      { cx: 49,  cy: 74, radius: 5  },
      { cx: 51,  cy: 10, radius: 5  },
      { cx: 25,  cy: 98, radius: 5  },
      { cx: 77,  cy: 30, radius: 5  },
      { cx: 20,  cy: 83, radius: 5  },
      { cx: 11,  cy: 63, radius: 5  },
      { cx:  4,  cy: 55, radius: 5  },
      { cx:  0,  cy: 0, radius: 5   },
      { cx: 85,  cy: 100, radius: 5 },
      { cx: 60,  cy: 40, radius: 5  },
      { cx: 70,  cy: 80, radius: 5  },
      { cx: 10,  cy: 20, radius: 5  },
      { cx: 40,  cy: 50, radius: 5  },
      { cx: 25,  cy: 31, radius: 5  }
      ];
    // for (let i = 0; i < (8 + Math.floor(Math.random() * 10)); i++) {
    //   this.chartData.push([
    //     `Index ${i}`,
    //     Math.floor(Math.random() * 100)
    //   ]);
    // }
  }
}
