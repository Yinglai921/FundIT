import { Injectable } from '@angular/core';
import {Headers, Http } from '@angular/http';

import 'rxjs/add/operator/toPromise';

import { Topic } from'../modal/topic';



@Injectable()
export class TopicService{

    private topicsUrl = 'api/topics'; // URL to web api

    constructor(private http: Http) {}

    getTopics(): Promise<Topic[]> {
        return this.http.get(this.topicsUrl)
                .toPromise()
                .then(response => response.json().data as Topic[])
                .catch(this.handleError);
    }

    private handleError(error: any): Promise<any> {
        console.error('An error occured', error);
        return Promise.reject(error.message || error);
    }

    getTopic(id: number): Promise<Topic> {
    const url = `${this.topicsUrl}/${id}`;
    return this.http.get(url)
        .toPromise()
        .then(response => response.json().data as Topic)
        .catch(this.handleError);
    }

    private headers = new Headers({'Content-type': 'application/json'});

}
