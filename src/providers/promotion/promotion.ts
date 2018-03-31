import { Http } from '@angular/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { baseURL } from '../../shared/baseurl';
import { Promotion } from '../../shared/promotion';
import { ProcessHttpmsgProvider } from '../process-httpmsg/process-httpmsg';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

/*
  Generated class for the PromotionProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class PromotionProvider {

  constructor(public http: Http,
    private processHttpmsgService: ProcessHttpmsgProvider) {
    console.log('Hello PromotionProvider Provider');
  }

  getPromotions(): Observable<Promotion>{
    return this.http.get(baseURL + 'promotions')
                .map(res => { return this.processHttpmsgService.extractData(res)})
                .catch(err => {return this.processHttpmsgService.handleError(err)});
  }

  getPromotion(id: number): Observable<Promotion> {
    return this.http.get(baseURL + 'promotions/' + id)
                .map(res => { return this.processHttpmsgService.extractData(res)})
                .catch(err => {return this.processHttpmsgService.handleError(err)});
  }

  getFeaturedPromotion(): Observable<Promotion> {
    return this.http.get(baseURL + 'promotions?featured=true')
                .map(res => { return this.processHttpmsgService.extractData(res)[0]})
                .catch(err => {return this.processHttpmsgService.handleError(err)});
  }

}
