import { Component, OnInit } from '@angular/core'

import { ActivatedRoute, Params } from '@angular/router'

import { DataService } from './../../../services/data.service'
import { BasketService } from './../../../services/basket.service'

import { Product } from './../../../objects/product'

import { fadeInAnimation } from './../../../animations/routerFader.component'

@Component ({
	selector: 'my-productList',
	templateUrl: 'productDetails.component.html',
	animations: [fadeInAnimation],
    host: { '[@fadeInAnimation]': '' }
})

export class ProductDetailsComponent {
	private product: Product;
	private searchedProductID;

	constructor(
		private activatedRoute: ActivatedRoute,
		private dataService: DataService,
		private basketService: BasketService
	) {}

	ngOnInit() {
		this.activatedRoute.params.subscribe((params: Params) => {
			this.searchedProductID = parseInt(params['id'])
		})

		this.dataService.getDataSubscribed().subscribe(() => {
			
			this.product = this.dataService.getProduct(this.searchedProductID)
		})
		
		this.dataService.initData()
	}

	addProduct(productId, qte) {
      this.basketService.addProductBasket(productId,qte);
    }

}