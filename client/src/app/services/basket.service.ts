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
  private basketlist: any[];
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
  //************************* NON utilisé
  //Avec une gestion du Panier dans la $Session côté server
  // c'est un exemple, NOUS OPTONS PLUTOT POUR UNE GESTION DU BASKET COTE CLIENT, qui sera envoyé coté server dans la commande
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

  }

  addProductBasket(productId, qte)
  {
    //console.log("addProduct("+productId+","+qte+")")
    //let types = this.dataService.getType()
    // let basket;
    // basket = JSON.parse(localStorage.getItem('basket'));
    // console.log(basket)
    // if( !basket ) basket=[];

    this.basketlist = JSON.parse(localStorage.getItem('basketlist'));
    //console.log(basketlist)
    if( !this.basketlist ) this.basketlist=[];

    if( !qte ) qte = 1;
    if( qte && qte >=0 )
    {
      // basket[productId] = qte;
      // localStorage.setItem('basket', JSON.stringify(basket))
      let basketItem = {id:productId,qte:qte};
      if(this.basketlist)
        this.basketlist = this.basketlist.filter(myObj => myObj.id !== productId);
      this.basketlist.push(basketItem);

      localStorage.setItem('basketlist', JSON.stringify(this.basketlist))
      //console.log(basket)
      console.log(this.basketlist);
    }
    return this.basketlist;
  }

  getBasket(){
    return this.basketlist
  }

  getBasketlistProducts()
  {
    this.basketlist = JSON.parse(localStorage.getItem('basketlist'))
    let getBasketUrl = this.baseUrl +"basket/products";
    let params = new URLSearchParams();
    let paramsStr = ""
    if(this.basketlist)
    {
      paramsStr = "?productsid=";
      this.basketlist.forEach(elem => {
        if(elem.qte>0) paramsStr = paramsStr + elem.id +';';
      })
    }
    //console.log(basketlist.toString()+" toString = "+paramsStr)

    return this.http.get(getBasketUrl+paramsStr)
    .map(res => res.json())
    .do(data => {
      this.basketProducts = data;
    })
    .catch(this.handleServerError);
  }

  // getBasketProducts(basketSession)
  // {
  //   let getBasketUrl = this.baseUrl +"basket/products";
  //   //console.log(basketSession)
  //   //let params: URLSearchParams = new URLSearchParams();
  //   //let requestOptions = new RequestOptionsArgs();
  //   let params = new URLSearchParams();

  //   //let tabPid = Object.keys(basketSession);
  //   let paramsStr = ""
  //   if(basketSession)
  //   {
  //     paramsStr = "?productsid=";
  //     basketSession.forEach((val, i) => {
  //       if(val) paramsStr = paramsStr + i +';';
  //     })
  //   }
  //   //console.log(basketSession.toString()+" toString = "+paramsStr)
  //   //params.set("productsid", paramsStr)
  //   // let options = new RequestOptions({
  //   //   search: params
  //   // });
  //   // console.log(getBasketUrl)
  //   return this.http.get(getBasketUrl+paramsStr)
  //   .map(res => res.json())
  //   .do(data => {
  //     this.basketProducts = data;
  //     //console.log(data);
  //   })
  //   .catch(this.handleServerError);
  // }


  private handleServerError(error: Response) {
    console.log('sever error:', error)
    if(error instanceof Response) {
      return Observable.throw(error.json().error || 'backend server error');
    }
    return Observable.throw(error || 'backend server error2');
  }

}
