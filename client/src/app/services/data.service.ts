import { Injectable } from '@angular/core'
import { Http, Headers, RequestOptions } from '@angular/http'
import { Response } from '@angular/http'
import { AuthHttp } from 'angular2-jwt'

import { Observable } from 'rxjs/Rx'
//import 'rxjs/add/observable/throw';

// Import RxJs required methods
//import 'rxjs/add/operator/map'
//import 'rxjs/add/operator/catch'

import { Subject } from 'rxjs/Subject'


import { Type } from './../objects/type'
import { Product } from './../objects/product'
/*import 'rxjs/add/operator/toPromise'
*/
@Injectable()

export class DataService {

	private headers = new Headers({'Content-Type': 'application/json'});
  private baseUrl = "http://localhost/gjchoc/server/web/app_dev.php/api/"
  private urldatatypes = "types"
  private data : Type[];
  private subject = new Subject<any>();
  private category$ = new Subject<any>();
  private basketProducts : Product[];


  constructor(private http: Http/*, private authHttp: AuthHttp*/) { }

  loadData() : Observable<Type[]> {


		/*Au moment du chargement le l'App on recherche les données soit sur
		le serveur soit dans le service si elles sont déjà téléchargées */
		if (this.data) {
			return Observable.of(this.data);

		} else {
			return this.http.get(this.baseUrl+this.urldatatypes)
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
    return this.subject.asObservable();
  }

  initData() {
    this.subject.next(this.data);
  }

  //On envoit les données à tous les subscribes de l'observer "subject"
  sendData(data) {
    this.subject.next(data);
  }

  getCategorySubscribed(): Observable<any> {
    return this.category$.asObservable();
  }

  sendCategory(category) {
    this.category$.next(category);
  }

  getType()
  {
    return this.data;
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


  //*************************
  //Avec une gestion du Panier dans la $Session côté server
  // A CHANGER POUR UNE GESTION DU BASKET COTE CLIENT UNIQUEMENT
  postBasket(productid, qte)
  {
    //@Rest\Post("/basket/add/{productid}/{qte}, defaults={"qte" = 1}")
    let postAddBasket = this.baseUrl +"basket/add";
    if(productid)
    {
      postAddBasket = postAddBasket+'/'+productid;

      if(qte)
        postAddBasket = postAddBasket+"/"+qte;
      return this.http.put(postAddBasket, null)
      .map(res => res.json())
      .do(data => {this.basketProducts = data; console.log(data);})
      .catch((error:any) => Observable.throw(error.json().error || 'Server error'));
    }

    // let headers = new Headers({ 'Content-Type': 'application/json' });
    // let options = new RequestOptions({ headers: headers });
  }

  addProductBasket(productId, qte)
  {
    //console.log("addProduct("+productId+","+qte+")")
    //let types = this.dataService.getType()
    let basket;


    basket = JSON.parse(localStorage.getItem('basket'));
    if(basket==undefined) basket=[];
    if(qte == undefined) qte = 1;
    if(qte!=undefined && qte>=0)
    {
      basket[productId] = qte;
      localStorage.setItem('basket', JSON.stringify(basket))
      //console.log(basket)
    }
    return basket;
  }

  getBasketProducts(basketSession)
  {
    let getBasketUrl = this.baseUrl +"basket/products";
    console.log(basketSession)
    //let params: URLSearchParams = new URLSearchParams();
    //let requestOptions = new RequestOptionsArgs();
    let params = new URLSearchParams();

    //let tabPid = Object.keys(basketSession);
    let paramsStr = ""
    if(basketSession)
    {
      paramsStr = "?productsid=";
      basketSession.forEach((val, i) => {
        if(val) paramsStr = paramsStr + i +';';
      })
    }
    //console.log(basketSession.toString()+" toString = "+paramsStr)
    //params.set("productsid", paramsStr)
    // let options = new RequestOptions({
    //   search: params
    // });
    // console.log(getBasketUrl)
    return this.http.get(getBasketUrl+paramsStr)
    .map(res => res.json())
    .do(data => {this.basketProducts = data; console.log(data);})
    .catch(this.handleServerError);
  }

  private handleServerError(error: Response) {
    console.log('sever error:', error)
    if(error instanceof Response) {
      return Observable.throw(error.json().error || 'backend server error');
    }
    return Observable.throw(error || 'backend server error2');
  }
}
