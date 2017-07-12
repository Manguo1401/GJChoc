import { Injectable } from '@angular/core'
import { Http, Headers } from '@angular/http'

import { Type } from './../objects/type'

import 'rxjs/add/operator/toPromise'

@Injectable()

export class TypesService {

  private headers = new Headers({'Content-Type': 'application/json'});

  constructor(private http: Http) { }

  getTypes(): Promise<Type[]> {
      return this.http.get('http://localhost/gjchoc/server/web/app_dev.php/types')
      .toPromise()
      .then(response => {response.json() as Type[]; console.log(response.json())})
      .catch(this.handleError);
  }

  private handleError(error: any): Promise<any> {
      console.error('An error occurred', error); // for demo purposes only
       return Promise.reject(error.message || error);
    }

}