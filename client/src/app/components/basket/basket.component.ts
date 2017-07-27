import {Component} from '@angular/core'
import { DataService } from './../../services/data.service'
import { NgModule } from '@angular/core';
// import { BrowserModule } from '@angular/platform-browser';
// import { FormsModule } from '@angular/forms';
import { Product } from '../../objects/product'

@Component ({
	selector: 'my-basket',
	templateUrl: 'basket.component.html'
})

export class BasketComponent {
  products;
  basket = [];
  counter = Array;
  totalHT = 0;
  tva = 0.2;

  constructor(
    private dataService: DataService
    ) {
    this.getBasket();
  }

  //Function to check storage validity (1day)
  checkValidity () {

    var lastclear = localStorage.getItem('lastclear'),
    time_now  = (new Date()).getTime();

    // .getTime() returns milliseconds so 1000 * 60 * 60 * 24 = 24 days
    if ((time_now - Number(lastclear)) > (1000 * 60 * 60 * 24)) {

      localStorage.clear();

      localStorage.setItem('lastclear', time_now.toString());
    }
  }

  clearSession()
  {
    localStorage.clear();
  }

  //private oldbasket = [{"id":"2","qte":"1"},{"id":"3","qte":"3"}];

  //preferer un tableau de clé/valeur:

  addProduct(productId, qte)
  {
    this.basket = this.dataService.addProductBasket(productId,qte);
  }

  getBasket()
  {
    //console.log(productId)
    //let types = this.dataService.getType()

    this.basket = JSON.parse(localStorage.getItem('basket'))
    console.log("basket= "+this.basket)
    this.dataService.getBasketProducts(this.basket)
    .subscribe(data => {
      if(data) {
        this.products = data;
        // this.products.forEach((p) =>{
        //   console.log("product Name= "+p.name)
        // })
        // console.log("products= "+this.products)
        this.refreshTotal()
      }
    })
  }


  quantityChange(product:Product,newQ)
  {
    this.addProduct(product.id, newQ);
    this.refreshTotal();
  }

  refreshTotal()
  {
    this.totalHT = 0;
    for (var i = this.basket.length - 1; i >= 0; i--) {
      //console.log("this.basket[i "+i+"]= " + this.basket[i])
      if(this.basket[i] && this.basket[i] >= 0 && this.products)
      {
        for (var p = this.products.length - 1; p >= 0; p--) {
          //console.log("this.products[p "+p+"].id = " + this.products[p].id + " == i :"+i+" > "+(this.products[p].id == i));
          if(this.products[p].id == i)
          {
            //console.log(this.products[p]);
            this.totalHT = this.totalHT + (Number(this.products[p].pricekg) * Number(this.basket[i]));
            //console.log("this.products[p].priceKg "+this.products[p].pricekg+" * this.basket[i] "+this.basket[i]+"="+this.totalHT);
          }
        }
      }
    }
    return this.totalHT;
  }

  deleteformbasket(productId){
    //console.log("delete "+productId)
    //console.log("basket before:"+this.basket)
    delete this.basket[productId];
    //console.log("basket after:"+this.basket)
    //console.log("products before:"+this.products)
    for (var i = this.products.length - 1; i >= 0; i--) {
      if( this.products[i].id == productId)
      {
        //console.log("products to delete:"+ this.products[i])
        this.products.splice(i,1);

      }
    }
    //console.log("products after:"+this.products)
    localStorage.setItem('basket', JSON.stringify(this.basket))
    this.refreshTotal();
  }

}
