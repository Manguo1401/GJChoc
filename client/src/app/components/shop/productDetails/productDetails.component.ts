import { Component, OnInit } from '@angular/core'

import { ActivatedRoute, Params } from '@angular/router'

import { DataService } from './../../../services/data.service'

import { Product } from './../../../objects/product'

@Component ({
	selector: 'my-productList',
	templateUrl: 'productDetails.component.html'
})

export class ProductDetailsComponent {
	private product: Product;
	private searchedProductID;

	constructor(
		private activatedRoute: ActivatedRoute,
		private dataService: DataService
	) {}

	ngOnInit() {
		this.activatedRoute.params.subscribe((params: Params) => {
			this.searchedProductID = parseInt(params['id'])
		})

		this.dataService.getDataSubscribed().subscribe(() => {
			
			this.product = this.dataService.getProduct(this.searchedProductID)
			console.log(this.product)	
		})
		
		this.dataService.initData()
	}

	addProduct(productId, qte) {
      this.dataService.addProductBasket(productId,qte);
    }

}