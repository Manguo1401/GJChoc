import { Component } from '@angular/core'
import { BasketService } from './../../services/basket.service'
import { NgModule } from '@angular/core';
// import { BrowserModule } from '@angular/platform-browser';
// import { FormsModule } from '@angular/forms';
import { Product } from '../../objects/product'

import { fadeInAnimation } from './../../animations/routerFader.component';
import { Fader } from './../../animations/fader.animation'

@Component({
  selector: 'my-basket',
  templateUrl: 'basket.component.html',
  animations: [fadeInAnimation, Fader()],
  host: { '[@fadeInAnimation]': '' }
})

export class BasketComponent {
  loader = 'true';

  products;
  basket = [];
  //basketItems = [];
  counter = Array;
  totalHT = 0;
  tva = 0.2;
  totalTTC = 0;

  constructor(
    private basketService: BasketService
  ) {
    this.getBasket();
  }


  //Function to check storage validity (1day)
  checkValidity() {

    var lastclear = localStorage.getItem('lastclear'),
      time_now = (new Date()).getTime();

    // .getTime() returns milliseconds so 1000 * 60 * 60 * 24 = 24 days
    if ((time_now - Number(lastclear)) > (1000 * 60 * 60 * 24)) {

      localStorage.clear();

      localStorage.setItem('lastclear', time_now.toString());
    }
  }

  clearSession() {
    localStorage.clear();
  }

  //private oldbasket = [{"id":"2","qte":"1"},{"id":"3","qte":"3"}];

  //preferer un tableau de clé/valeur:
  addProduct(productId, qte) {
    this.basket = this.basketService.addProductBasket(productId, qte);
  }

  getBasket() {
    this.basketService.getBasketlistProducts()//this.basket)
      .subscribe(data => {
        if (data) {
          this.products = data.products
          this.basket = this.basketService.getBasket()
          this.refreshTotal()
          this.loader = 'false'
        }
      })
  }


  quantityChange(product: Product, newQ) {
    this.addProduct(product.id, newQ);
    this.refreshTotal();
  }

  refreshTotal() {
    this.totalHT = 0;
    this.basket.forEach(basketItem => {
      if (basketItem.qte && basketItem.qte >= 0 && this.products) {
        for (var p = this.products.length - 1; p >= 0; p--) {
          //console.log("this.products[p "+p+"].id = " + this.products[p].id + " == i :"+i+" > "+(this.products[p].id == i));
          if (this.products[p].id == basketItem.id) {
            //console.log(this.products[p]);
            this.totalHT = this.totalHT + (Number(this.products[p].price) * Number(basketItem.qte));
            //console.log("this.products[p].price "+this.products[p].price+" * this.basket[i] "+this.basket[i]+"="+this.totalHT);
          }
        }
      }
    })
    this.totalTTC = this.totalHT + (this.totalHT * this.tva);
    return this.totalHT;
  }

  deleteformbasket(productId) {
    if(this.basket)
        this.basket = this.basket.filter(basketItem => basketItem.id !== productId);
    //delete this.basket[productId];

    for (var i = this.products.length - 1; i >= 0; i--) {
      if (this.products[i].id == productId) {
        //console.log("products to delete:"+ this.products[i])
        this.products.splice(i, 1);
      }
    }
    //console.log("products after:"+this.products)
    localStorage.setItem('basketlist', JSON.stringify(this.basket))
    this.refreshTotal();
  }

}
