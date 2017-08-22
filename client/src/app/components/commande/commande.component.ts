import { Component, OnInit } from '@angular/core'
//import { DataService } from './../../services/data.service'
import { PaymentService } from './../../services/payment.service'
import { BasketService } from './../../services/basket.service'

import { NgModule } from '@angular/core';
// import { BrowserModule } from '@angular/platform-browser';
// import { FormsModule } from '@angular/forms';
import { Commande } from './../../objects/commande'
import { Router, NavigationExtras } from '@angular/router'

import { Observable } from 'rxjs/Rx'
import { Subscription } from 'rxjs/Subscription';

import { Fader } from './../../animations/fader.animation'

@Component({
  selector: 'my-commande',
  templateUrl: 'commande.component.html',
  styleUrls: ['commande.style.scss'],
  animations: [Fader()]
})

export class CommandeComponent {
  loader = 'true';

  products;
  basket = [];
  totalHT = 0;
  tva = 0.2;
  totalTTC = 0;
  public commande: Commande = new Commande();
  finishchanged;

  submitted = false;
  errorMessage = "";

  constructor(
    //private dataService: DataService,
    private paymentService: PaymentService,
    private basketService: BasketService,
    private router: Router
  ) {

    this.commande.firstname = 'Louis'
    this.commande.lastname = 'Watrin'
    this.commande.email = "votre@email.fr"
    this.commande.phone = "0115151501"
    this.commande.adresse = "1 rue ou tabite"

    this.commande.postalcode = 12345
    this.commande.city = "VILLE"

  }

  onSubmitCommande(value: Commande) {
    this.submitted = true;

    //ici la Commande est enregistrée dans la variable commande via NgModel

    // Demander le service checkout pour de paiement:
    this.openCheckout();
  }

  openCheckout() {
    let _this = this; //Obligatoire pour avoir accès à notre class courante dans le handler.
    // let commandeinfo = this.commande;
    // let functP = this.sendPayment;
    var handler = (<any>window).StripeCheckout.configure({
      key: 'pk_test_Y92Alt338tkbbLpXNm0EockN', //Clef définissant la connexion au compte Stripe, à changer pour la PROD
      locale: 'auto',
      currency: 'eur',
      allowRememberMe: false, //Désactivation de 'se souvenir de moi' puisque nous faisons payer le client en direct.
      name: 'Paiement de votre panier',
      description: 'Sécurisé par Stripe.com',
      token: function (token: any) {
        // You can access the token ID with `token.id`.
        // Get the token ID to your server-side code for use.

        //ICI Enregister la commande, puis rediriger vers le service de paiement.
        //console.log(token);
        _this.loader = 'true'
        let resp: Observable<any>
        //_this.basketService.postBasket(10,3);
        resp = _this.paymentService.postPayment(token, _this.commande, _this.basket, _this.totalTTC * 100)

        resp.subscribe(
          data => {
            //console.log("data :")
            //console.log(data)
            let ref = data.reference.substring(20);
            let navigationExtras: NavigationExtras = {
              queryParams: {
                  "reference": ref
              }
            };
            _this.router.navigate(['payment'],navigationExtras);
          },
          error => {
            console.log("error :")
            console.log(error)
            console.log(error.exception.message)

            //LOG ERROR
            _this.errorMessage = "Une erreur est survenue, le paiement est annulé. \nErreur ="+error.exception.message;
            _this.loader = 'false'
          }
        )
        //_this.sendPayment(token, _this.commande);

      }
    });

    handler.open({
      amount: this.totalTTC * 100 //en centimes: 100 = 1€
    });

  }



  ngOnInit() {
    this.getBasket();
  }

  getBasket() {
    this.basket = JSON.parse(localStorage.getItem('basket'))
    this.basketService.getBasketProducts(this.basket)
      .subscribe(data => {
        if (data) {
          this.products = data;
          this.refreshTotal()
          this.loader = 'false'
        }
      })
  }

  refreshTotal() {
    this.totalHT = 0;
    for (var i = this.basket.length - 1; i >= 0; i--) {
      //console.log("this.basket[i "+i+"]= " + this.basket[i])
      if (this.basket[i] && this.basket[i] >= 0 && this.products) {
        for (var p = this.products.length - 1; p >= 0; p--) {
          //console.log("this.products[p "+p+"].id = " + this.products[p].id + " == i :"+i+" > "+(this.products[p].id == i));
          if (this.products[p].id == i) {
            //console.log(this.products[p]);
            this.totalHT = this.totalHT + (Number(this.products[p].pricekg) * Number(this.basket[i]));
            //console.log("this.products[p].priceKg "+this.products[p].pricekg+" * this.basket[i] "+this.basket[i]+"="+this.totalHT);
          }
        }
      }
    }
    this.totalTTC = this.totalHT + (this.totalHT * this.tva);
    return this.totalHT;
  }

  addclass(element, className) {

    element.addClass(className);

  }

}
