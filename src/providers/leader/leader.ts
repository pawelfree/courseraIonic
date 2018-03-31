import { Http } from '@angular/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { baseURL } from '../../shared/baseurl';
import { ProcessHttpmsgProvider } from '../process-httpmsg/process-httpmsg';
import { Leader } from '../../shared/leader';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

/*
  Generated class for the LeaderProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class LeaderProvider {

  constructor(public http: Http,
    private processHttpmsgService: ProcessHttpmsgProvider) {
    console.log('Hello LeaderProvider Provider');
  }

  getLeaders(): Observable<Leader>{
    return this.http.get(baseURL + 'leaders')
              .map(res => { return this.processHttpmsgService.extractData(res)})
              .catch(err => {return this.processHttpmsgService.handleError(err)});
  }

  getLeader(id: number): Observable<Leader> {
    return this.http.get(baseURL + 'leaders/' + id)
              .map(res => { return this.processHttpmsgService.extractData(res)})
              .catch(err => {return this.processHttpmsgService.handleError(err)});
  }

  getFeaturedLeader(): Observable<Leader> {
    return this.http.get(baseURL + 'leaders?featured=true')
                .map(res => { return this.processHttpmsgService.extractData(res)[0]})
                .catch(err => {return this.processHttpmsgService.handleError(err)});
  }

}
