import {Component} from '@angular/core'
import { DataService } from './../../services/data.service'

@Component ({
	selector: 'my-basket',
	templateUrl: 'basket.component.html'
})

export class BasketComponent {

  constructor(
    private dataService: DataService
  ) {
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

  //private oldbasket = [{"id":"2","qte":"1"},{"id":"3","qte":"3"}];

  //preferer un tableau de clé/valeur:
  private basket = [];
  addProduct(productId, qte)
  {

    console.log("addProduct("+productId+","+qte+")")
    //let types = this.dataService.getType()



    this.basket = JSON.parse(localStorage.getItem('basket'));
    if(this.basket==undefined) this.basket=[];
    if(qte == undefined) qte = 1;
    if(qte!=undefined && qte>=0)
    {
      this.basket[productId] = qte;
      localStorage.setItem('basket', JSON.stringify(this.basket))
      console.log(this.basket)
    }
  }

  getBasket()
  {
    //console.log(productId)
    //let types = this.dataService.getType()

    this.basket = JSON.parse(localStorage.getItem('basket'))
    console.log(this.basket)
  }

  clearSession()
  {
    localStorage.clear();
  }
}
