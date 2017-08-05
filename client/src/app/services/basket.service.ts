import { Injectable } from '@angular/core'
import { Http, Headers, Response, RequestOptions } from '@angular/http'

import { Product } from './../objects/product'

import { Observable } from 'rxjs/Rx'

@Injectable()

export class BasketService {

  private headers = new Headers({'Content-Type': 'application/json'});

  private baseUrl = "http://localhost/gjchoc/server/web/app_dev.php/api/"

  //private types;
  private basketProducts : Product[];

  constructor(private http: Http) { }


  // testPostType()
  // {
  //   let typedata = [
  //     {type: "testType"},
  //     {description: "desctype"}
  //   ]
  //   console.log("post: " + JSON.stringify(typedata));
  //   let headers = new Headers({ 'Content-Type': 'application/json' });
  //   let options = new RequestOptions({ headers: headers });
  //   return this.http.post("http://localhost/GJchoc/server/web/app_dev.php/api/admin/types", "", options)
  //     .map(res => res.json())
  //     .subscribe(data => console.log(data),
  //       error => console.log(error));
  //     // .do(data => {console.log(data);})
  //     // .catch((error:any) => Observable.throw(error.json().error || 'Server error'));

  // }
  //*************************
  //Avec une gestion du Panier dans la $Session côté server
  // EXEMPLE, NOUS OPTONS PLUTOT POUR UNE GESTION DU BASKET COTE CLIENT UNIQUEMENT
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
      .do(data => {
        this.basketProducts = data;
        //console.log(data);
      })
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
    //console.log(basketSession)
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
    .do(data => {
      this.basketProducts = data;
      //console.log(data);
    })
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
