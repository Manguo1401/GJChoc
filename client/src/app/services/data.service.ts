import { Injectable } from '@angular/core'
import { Http, Headers } from '@angular/http'
import { Response } from '@angular/http'
import { AuthHttp } from 'angular2-jwt'

import { Observable } from 'rxjs/Rx'

// Import RxJs required methods
import 'rxjs/add/operator/map'
import 'rxjs/add/operator/catch'

import { Subject } from 'rxjs/Subject'


import { Type } from './../objects/type'

/*import 'rxjs/add/operator/toPromise'
*/
@Injectable()

export class DataService {

	private headers = new Headers({'Content-Type': 'application/json'});
	private url = "http://localhost/gjchoc/server/web/app_dev.php/api/types"
	private data : Type[];
	private data$ = new Subject<any>();
	private category$ = new Subject<any>();



	constructor(private http: Http/*, private authHttp: AuthHttp*/) { }

	loadData() : Observable<Type[]> {


		/*Au moment du chargement le l'App on recherche les données soit sur 
		le serveur soit dans le service si elles sont déjà téléchargées */
		if (this.data) {
			return Observable.of(this.data);

		} else {
			return this.http.get(this.url)
			.map((res: Response) => 
				res.json())
			.do(data => {
				//On enregistre sur une variable localle toutes les données chargées
				this.data = data
				//On envoit les données à tous les subscribes de l'observer "subject"
				this.sendData(data)
			})
			.catch((error:any) => Observable.throw(error.json().error || 'Server error'));
		}
	}

	//Permet à tous les components d'appeler le subscribe sur les data une fois le sendData lancé
    getDataSubscribed(): Observable<any> {
        return this.data$.asObservable();
    }

    initData() {
    	this.data$.next(this.data);
    }

    //On envoit les données à tous les subscribes de l'observer "subject"
    sendData(data) {
    	this.data$.next(data);
    }

    getCategorySubscribed(): Observable<any> {
    	return this.category$.asObservable();
    }

    sendCategory(category) {
    	this.category$.next(category);
    }

	/*getDataAuth() {
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
	}*/

	private handleError(error: any): Promise<any> {
		console.error('An error occurred', error); // for demo purposes only
		return Promise.reject(error.message || error);
	}
}
