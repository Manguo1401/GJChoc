import { Injectable } from '@angular/core'
import { Http, Headers, RequestOptions } from '@angular/http'

import { Commande } from './../objects/commande'

import { Observable } from 'rxjs/Rx'


@Injectable()

export class PaymentService {

  private headers = new Headers({ 'Content-Type': 'application/json' });
  private baseUrl = "http://localhost/gjchoc/server/web/api/"

  private types;
  private data;
  private error;
  constructor(private http: Http) { }

  //*************************

  postPayment(token, commande: Commande, basket: Array<any>, amount: number) {
    let postPayment = this.baseUrl + "payment";
    //console.log("commande"+ commande.firstname);
    //console.log("send to server the payment with token = ");
    //console.log(token)
    let postdata = {
      token: token,
      commande: commande,
      basket: basket,
      amount: amount
    };
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });
    return this.http.post(postPayment, postdata)
      .map(res => res.json())
      .catch(this.handleError);//(error:any) => Observable.throw(error.json().error || 'Server error'));

  }

  // private handleErrorPromise (error: Response | any) {
  // console.error(error.message || error);
  // return Promise.reject(error.message || error);
  //   }



  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error); // for demo purposes only
    return Promise.reject(error.message || error);
  }

}
