import {Component} from '@angular/core'
import { DataService } from './../../services/data.service'
import { NgModule } from '@angular/core';
// import { BrowserModule } from '@angular/platform-browser';
// import { FormsModule } from '@angular/forms';
import { Commande } from './../../objects/commande'

@Component ({
  selector: 'my-payment',
  templateUrl: 'payment.component.html',
  styleUrls: ['payment.style.scss']

})

export class PaymentComponent {
  amount:number=100; //en centimes: 100 = 1€

  openCheckout() {
    var handler = (<any>window).StripeCheckout.configure({
      key: 'pk_test_Y92Alt338tkbbLpXNm0EockN',
      locale: 'auto',
      allowRememberMe: false,
      token: function (token: any) {
        // You can access the token ID with `token.id`.
        // Get the token ID to your server-side code for use.
        console.log(token);
      }
    });

    handler.open({
      name: 'Paiement de votre panier',
      description: 'Sécurisé par Stripe.com',
      amount: this.amount,
      currency: 'eur',
    });

  }
}
