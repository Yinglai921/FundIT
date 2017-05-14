import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

// Bootstrap
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';

// Imports for loading & configuring the in-memory web api
import { InMemoryWebApiModule } from 'angular-in-memory-web-api';
import { InMemoryDataService }  from './services/in-memory-data.service';

import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { TestComponent } from './test/test.component';
import { BarchartComponent } from './shared/barchart/barchart.component';
import { ScatterplotComponent } from './shared/scatterplot/scatterplot.component';
import { routing, appRoutingProviders } from './app.routes';
import { TopicService } from './services/topic.service';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    TestComponent,
    BarchartComponent,
    ScatterplotComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    routing,
    BsDropdownModule.forRoot(),
    InMemoryWebApiModule.forRoot(InMemoryDataService)
  ],
  providers: [appRoutingProviders, TopicService ],
  bootstrap: [AppComponent]
})
export class AppModule { }
