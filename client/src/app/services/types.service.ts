import { Injectable } from '@angular/core'
import { Http, Headers } from '@angular/http'
import { Response } from '@angular/http';
import { AuthHttp } from 'angular2-jwt';

import { Type } from './../objects/type'

import 'rxjs/add/operator/toPromise'

@Injectable()

export class TypesService {

  private headers = new Headers({'Content-Type': 'application/json'});
  //private types : Type[];

  constructor(private http: Http, private authHttp: AuthHttp) { }



  getTypes(): Promise<any> {
    return this.http.get('http://localhost/gjchoc/server/web/app_dev.php/api/typesOnly')
    .toPromise()
    .then(response => {response.json() as Type[]; console.log(response.json())})
    .catch(this.handleError);
  }

  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error); // for demo purposes only
    return Promise.reject(error.message || error);
  }

   getTypesOnly() {
    return this.http.get('http://localhost/gjchoc/server/web/app_dev.php/api/typesOnly')
    .map((data: Response) => data.json());
  }

  getTypesList() {
    let url = 'http://localhost/GJchoc/server/web/app_dev.php/api/typesOnly';

    return this.authHttp
    .get(url)
    .map((data: Response) => data.json());
  }

}
