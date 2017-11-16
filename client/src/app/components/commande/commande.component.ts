import { Component, OnInit, AfterViewInit } from '@angular/core'
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

import * as $ from 'jquery'
import { Vicopo } from 'vicopo'


@Component({
  selector: 'my-commande',
  templateUrl: 'commande.component.html',
  styleUrls: ['commande.style.scss'],
  animations: [Fader()]
})

export class CommandeComponent {
  loader = 'true';

  products;
  basketlist = []
  basket = [];
  totalHT = 0;
  tva = 0;
  totalTTC = 0;
  totalTva = 0;
  public commande: Commande = new Commande();
  //finishchanged;

  submitted = false;
  errorMessage = "";

  constructor(
    //private dataService: DataService,
    private paymentService: PaymentService,
    private basketService: BasketService,
    private router: Router
  ) {

    // this.commande.firstname = 'Louis'
    // this.commande.lastname = 'Watrin'
    // this.commande.email = "votre@email.fr"
    // this.commande.phone = "0115151501"
    // this.commande.adresse = "1 rue ou tabite"

    // this.commande.postalcode = 12345
    // this.commande.city = "VILLE"
    this.getTva();
  }


  ngAfterViewInit() {
    // var ville = 'Lille';
    // // var System: any;
    // // System.import('/assets/js/regular-expresions.js').then(file => {
    // //   // perform additional interactions after the resource has been asynchronously fetched
    // //   console.log('we called test');
    // // });
    // //var vicopo = require('vicopo');
    // vicopo(ville, function (err, cities) {
    // if (err) {
    //     throw err;
    // } else {
    //     console.log(cities);
    // }
    // });

    $( document ).ready(function() {
      $('#ville2').keyup(function (e) {
        if(e.keyCode == 13) {
          var $ville = $(this);
          Vicopo($ville.val(), function (input, cities) {
            if(input == $ville.val() && cities[0]) {
              //$ville.val(cities[0].city).vicopoTargets().vicopoClean();
            }
          });
          e.preventDefault();
          e.stopPropagation();
        }
      });
    })

    // jQuery( document ).ready(function() {
    //   var ville = 'Lille';
    //   // var vicopo = require('vicopo');
    //   // vicopo(ville, function (err, cities) {
    //   // if (err) {
    //   //     throw err;
    //   // } else {
    //   //     console.log(cities);
    //   // }
    //   // });

    //   // $('#ville').keyup(function (e) {
    //   //   if(e.keyCode == 13) {
    //   //     var $ville = $(this);
    //   //     $.vicopo($ville.val(), function (input, cities) {
    //   //       if(input == $ville.val() && cities[0]) {
    //   //         $ville.val(cities[0].city).vicopoTargets().vicopoClean();
    //   //       }
    //   //     });
    //   //     e.preventDefault();
    //   //     e.stopPropagation();
    //   //   }
    //   // });
    // })
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
    this.getTva()
  }

  getTva() {
    this.basketService.getTva()
      .subscribe(data => {
        console.log("getTva in comp "+data)
        if (data) {
          this.tva = data
        }
      },
      err => {
        // Log errors if any
        console.log(err);
      });
  }

  getBasket() {
    this.basketService.getBasketlistProducts()//this.basket)
      .subscribe(data => {
        if (data) {
          this.products = data
          //console.log(this.products)
          this.basket = this.basketService.getBasket()
          this.refreshTotal()
          this.loader = 'false'

          //Assign product qte from basket
          this.basket.forEach(basketItem => {
            this.products.forEach(product => {
              if (basketItem.id == product.id)
                product.qte = basketItem.qte
            });
          });
        }
      })
  }

  refreshTotal() {
    this.totalHT = this.basketService.getBasketPrice();
    this.totalTva = this.totalHT * this.tva;//.00000001 apparait de temps en temps!?? c'est quoi ce délire
    //this.totalTva.toFixed(2) //Ne résoud pas le problème
    this.totalTva = +(Math.round(this.totalTva * 100)  / 100);//résoud le problème
    //console.log(this.totalTva)
    this.totalTTC = this.totalHT + this.totalTva;
  }

  addclass(element, className) {

    element.addClass(className);

  }

}
