import { Injectable } from '@angular/core'
import { Http, Headers } from '@angular/http'

import { Type } from './../objects/type'

import { Observable } from 'rxjs/Rx'

@Injectable()

export class TypesService {

  private headers = new Headers({'Content-Type': 'application/json'});

  private url = 'http://localhost/gjchoc/server/web/app_dev.php/types'

  private types;

  constructor(private http: Http) { }

   getTypes() {
        if (this.types) {
          return Observable.of(this.types);
        } else {
         // ...using get request
         return this.http.get(this.url)
           .map(res => res.json())
           .do(data => this.types = data)
           .catch((error:any) => Observable.throw(error.json().error || 'Server error'));
        }
  }

  private handleError(error: any): Promise<any> {
      console.error('An error occurred', error); // for demo purposes only
       return Promise.reject(error.message || error);
    }

}