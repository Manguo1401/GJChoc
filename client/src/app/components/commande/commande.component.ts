import {Component} from '@angular/core'
import { DataService } from './../../services/data.service'
import { NgModule } from '@angular/core';
// import { BrowserModule } from '@angular/platform-browser';
// import { FormsModule } from '@angular/forms';
import { Commande } from './../../objects/commande'

@Component ({
  selector: 'my-commande',
  templateUrl: 'commande.component.html',
  styleUrls: ['commande.style.scss']

})

export class CommandeComponent {
  products;
  basket = [];
  totalHT = 0;
  tva = 0.2;
  public commande: Commande = new Commande();

  submitted = false;

  onSubmitCommande(value: Commande) {
    this.submitted = true;

    //ICI Enregister la commande, puis rediriger vers le service de paiement.
  }


  constructor(
    private dataService: DataService
    ) {
    this.getBasket();
  }

  getBasket()
  {
    this.basket = JSON.parse(localStorage.getItem('basket'))
    this.dataService.getBasketProducts(this.basket)
    .subscribe(data => {
      if(data) {
        this.products = data;
        this.refreshTotal()
      }
    })
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

}
