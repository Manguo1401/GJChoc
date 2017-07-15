import { Injectable } from '@angular/core'
import { Http, Headers } from '@angular/http'
import { Response } from '@angular/http';
import { AuthHttp } from 'angular2-jwt';

import { Observable } from 'rxjs/Rx'
import { Type } from './../objects/type'

import 'rxjs/add/operator/toPromise'

@Injectable()

export class TypesService {

	private headers = new Headers({'Content-Type': 'application/json'});
	private url = "http://localhost/gjchoc/server/web/app_dev.php/api/typesOnly"
	private types : Type[];

	constructor(private http: Http, private authHttp: AuthHttp) { }

	getTypesOnly() {
		if (this.types) {
			return Observable.of(this.types);
		} else {
			// ...using get request
			return this.http.get(this.url)
			.map(res => res.json())
			//.do(data => this.types = data)
			.do(data => {this.types = data; console.log(data);})
			.catch((error:any) => Observable.throw(error.json().error || 'Server error'));
		}
	}

	getTypesAuth() {
		if (this.types) {
			return Observable.of(this.types);
		} else {
			// ...using get request
			return this.authHttp.get(this.url)
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
