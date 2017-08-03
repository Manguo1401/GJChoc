import { Component, Input, OnInit, OnChanges, SimpleChanges } from '@angular/core'
import { ActivatedRoute, Params } from '@angular/router'
import { Fader } from './../../../animations/fader.animation'
import { TranslaterX } from './../../../animations/translateX.animation'

import { DataService } from './../../../services/data.service'

@Component ({
	selector: 'my-product-list',
	templateUrl: 'productList.component.html',
	animations: [
		Fader(),
		TranslaterX()
	]
})

export class ProductListComponent {
	@Input() data: any
	private products: any
	private type : string
	private category: string
	private overlay: number
	private visibility= []
	private loader= "true"

	constructor(
		private activatedRoute: ActivatedRoute,
		private dataService: DataService
		) {}

	ngOnChanges(changes: SimpleChanges) {
		if(this.data) {
			this.products = this.getProducts(this.data, this.type)
			this.loader = "false"
		}
	}

	ngOnInit() {
		this.activatedRoute.params.subscribe((params: Params) => {
			this.type = params['type']
			this.category = undefined
			this.products = this.getProducts(this.data, this.type)
		});

		this.dataService.getCategorySubscribed().subscribe(category => {
			this.category = category;
			this.products = this.getProducts(this.data, this.type)
		})
	}

	getProducts(data, selectedType) {
		let categories = []
		let products = []
		if(data) {
			data.forEach((e) => {
				if (e.type === selectedType) {
					categories = e.categories
					categories.forEach((e) => {
						if(this.category) {
							if(this.category === e.category) {
								products = e.products
								return products
							}
						} else {
							products = products.concat(e.products)
						}
					})
				}
			})
		}
		return products
	}

}

    addProduct(productId, qte)
    {
      this.dataService.addProductBasket(productId,qte);
    }
}
