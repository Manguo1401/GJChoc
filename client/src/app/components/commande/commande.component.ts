import { Component, OnInit, AfterViewInit } from '@angular/core'
// import { DataService } from './../../services/data.service'
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

import * as jQuery from 'jquery'
// import * as $ from 'jquery'
// import {vicopo} from 'vicopo'
// import {vicopo, vicopoTargets, vicopoClean } from 'vicopo'
import { element } from 'protractor';
// declare var jquery:any;
// declare var vicopo:any;

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


 /*  ngAfterViewInit() { */

    //////////////////////////////
    //VICOPO//
    //////////
    
    /* jQuery(function ($) {
      var _code = $('#code'), _city = $('#city');
      var _outCode = $('#outputcode'), _outCity = $('#outputcity')
      var _cache = {};
      var _host = (~(location.protocol + '').indexOf('s')
        ? 'https'
        : 'http'
      ) + '://vicopo.selfbuild.fr';
      _code.keyup(function () {
        var _val = $(this).val().toString();
        if (/^[^0-9]/.test(_val)) {
          _code.val('');
          _city.val(_val).focus().trigger('keyup');
        }
      });
      _city.keyup(function () {
        var _val = $(this).val().toString();
        if (/^[0-9]/.test(_val)) {
          _city.val('');
          _code.val(_val).focus().trigger('keyup');
        }
      });
      function _done(_cities, output) {
        if (output == 'code')
          _outCode.html(_cities.map(function (_data) {
            return '<a href="#"><div>' + _data.code + ' &nbsp; ' + _data.city + '</div></a>';
          }).join(''));
        if (output == 'city')
          _outCity.html(_cities.map(function (_data) {
            return '<a href="#"><div>' + _data.code + ' &nbsp; ' + _data.city + '</div></a>';
          }).join(''));
      }
      $.each(['code', 'city'], function (i, _name) {
        var _input = $('#' + _name).on('keyup', function () {
          var _val = _input.val().toString();
          if (_val.length > 1) {
            _cache[_name] = _cache[_name] || {};
            if (_cache[_name][_val]) {
              _done(_cache[_name][_val], _name);
            }
            var _data = {};
            _data[_name] = _val;
            $.getJSON(_host, _data, function (_answear) {
              _cache[_name][_answear.input] = _answear.cities;
              if (_input.val() == _answear.input) {
                _done(_answear.cities, _name);
              }
            });
          }
        });
      });
      $(document).on('click', '#outputcity a', function (e) {
        clickelem($(this).text(), e);
      });
      $(document).on('click', '#outputcode a', function (e) {
        clickelem($(this).text(), e);
      });

      function clickelem(_contents, event) {
        var _space = _contents.indexOf(' ');
        if (~_space) {
          _code.val(_contents.substr(0, _space));
          _city.val(_contents.substr(_space).trim());
          _outCode.empty();
          _outCity.empty();
        }
        event.preventDefault();
        event.stopPropagation();
        return false;
      }

      $("#outputcity").hover(function () {
        $(this).addClass("hovered");
      }, function () {
        $(this).removeClass("hovered");
      });
      $("#outputcode").hover(function () {
        $(this).addClass("hovered");
      }, function () {
        $(this).removeClass("hovered");
      });

      $("#outputcode").width($("#code").width());
      $("#outputcity").width($("#city").width());

    }); */
  /* } */

  onSubmitCommande(value: Commande) {
    this.submitted = true;
    // ici la Commande est enregistrée dans la variable commande via NgModel
    // Demander le service checkout pour de paiement:
    this.openCheckout();
  }

  openCheckout() {
    const _this = this; // Obligatoire pour avoir accès à notre class courante dans le handler.
    // let commandeinfo = this.commande;
    // let functP = this.sendPayment;
    const handler = (<any>window).StripeCheckout.configure({
      key: 'pk_test_oi0sKPJYLGjdvOXOM8tE8cMa', // Clef définissant la connexion au compte Stripe, à changer pour la PROD
      locale: 'auto',
      currency: 'eur',
      allowRememberMe: false, // Désactivation de 'se souvenir de moi' puisque nous faisons payer le client en direct.
      name: 'Paiement de votre panier',
      description: 'Sécurisé par Stripe.com',
      // email: 'toto@dede.de', // TRY TO ADD EMAIL
      token: function (token: any) {
        // You can access the token ID with `token.id`.
        // Get the token ID to your server-side code for use.

        // ICI Enregister la commande, puis rediriger vers le service de paiement.
        // console.log(token)
        _this.loader = 'true'
        let resp: Observable<any>
        // _this.basketService.postBasket(10,3);
        resp = _this.paymentService.postPayment(token, _this.commande, _this.basket, _this.totalTTC * 100)

        resp.subscribe(
          data => {
            // console.log("data :")
            // console.log(data)
            const ref = data.reference.substring(20);
            const navigationExtras: NavigationExtras = {
              queryParams: {
                'reference': ref
              }
            };
            _this.router.navigate(['payment'], navigationExtras);
          },
          error => {
            // console.log('error :')
            // console.log(error)
            // console.log(error.exception.message)

            // LOG ERROR
            _this.errorMessage = "Une erreur est survenue, le paiement est annulé. \nErreur =" + error.exception.message;
            _this.loader = 'false'
          }
        )
        // _this.sendPayment(token, _this.commande);

      }
    });

    handler.open({
      amount: this.totalTTC * 100 // en centimes: 100 = 1€
    });

  }



  ngOnInit() {
    this.getBasket();
    this.getTva()
  }

  getTva() {
    this.basketService.getTva()
      .subscribe(data => {
        // console.log("getTva in comp " + data)
        if (data) {
          this.tva = data
        }
      },
      err => {
        // Log errors if any
        // console.log(err);
        alert('Il y a eu une erreur. Réferrez vous à l\'administrateur')
      });
  }

  getBasket() {
    this.basketService
      .getBasketlistProducts() //this.basket)
      .subscribe(data => {
          if (data) {
            this.products = data;
            //console.log(this.products)
            this.basket = this.basketService.getBasket();
            this.refreshTotal();
            this.loader = "false";

            //Assign product qte from basket
            this.basket.forEach(basketItem => {
              this.products.forEach(product => {
                if (basketItem.id == product.id) product.qte = basketItem.qte;
              });
            });
          }
      }, err => /* console.log(err)); */alert('Il y a eu une erreur. Réferrez vous à l\'administrateur'))
  }

  refreshTotal() {
    this.totalHT = this.basketService.getBasketPrice();
    this.totalTva = this.totalHT * this.tva;//.00000001 apparait de temps en temps!?? c'est quoi ce délire
    //this.totalTva.toFixed(2) //Ne résoud pas le problème
    this.totalTva = +(Math.round(this.totalTva * 100) / 100);//résoud le problème
    //console.log(this.totalTva)
    this.totalTTC = this.totalHT + this.totalTva;
  }

  addclass(element, className) {

    element.addClass(className);

  }

}
