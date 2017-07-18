import { Injectable } from '@angular/core'
import { Http, Headers } from '@angular/http'
import { Response } from '@angular/http';
import { AuthHttp } from 'angular2-jwt';

import { Observable } from 'rxjs/Rx'
import { Type } from './../objects/type'

import 'rxjs/add/operator/toPromise'

@Injectable()

export class DataService {

  private headers = new Headers({'Content-Type': 'application/json'});
  private url = "http://localhost/gjchoc/server/web/app_dev.php/api/types"
  private data : Type[];

  constructor(private http: Http, private authHttp: AuthHttp) { }

  getData() {
    if (this.data) {
      return Observable.of(this.data);
    } else {
      // ...using get request
      return this.http.get(this.url)
      .map(res => res.json())
      //.do(data => this.data = data)
      .do(data => {this.data = data; console.log(data);})
      .catch((error:any) => Observable.throw(error.json().error || 'Server error'));
    }
  }

  getDataAuth() {
    if (this.data) {
      return Observable.of(this.data);
    } else {
      // ...using get request
      return this.authHttp.get(this.url)
      .map(res => res.json())
      //.do(data => this.data = data)
      .do(data => {this.data = data; console.log(data);})
      .catch((error:any) => Observable.throw(error.json().error || 'Server error'));
    }
  }


  //@Rest\Post("/basket/add/{productid}/{qte}, defaults={"qte" = 1}")
  postBasket(productid, qte)
  {
    let posturl = "http://localhost/gjchoc/server/web/app_dev.php/api/basket";
    if(productid)
      posturl = posturl+productid;
    if(qte)
      posturl = posturl+"/"+qte;

    // let headers = new Headers({ 'Content-Type': 'application/json' });
    // let options = new RequestOptions({ headers: headers });
    return this.http.put(posturl, null)
      .map(res => res.json())
      .do(data => {this.data = data; console.log(data);})
      .catch((error:any) => Observable.throw(error.json().error || 'Server error'));
  }

  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error); // for demo purposes only
    return Promise.reject(error.message || error);
  }
}
