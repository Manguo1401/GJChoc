import { Component, OnInit } from '@angular/core'

import { DataService } from './../../services/data.service'

import { Type } from './../../objects/type'

@Component ({
	selector: 'my-shop',
	templateUrl: 'shop.component.html'
})

export class ShopComponent {
	data: Type[];
	error: string = '';
	type: Type;
	public categories: string[]

	constructor(
		private dataService: DataService
	) {
		
	}

	ngOnInit() {
		this.dataService.getDataSubscribed().subscribe(data => {
			if(data) {
				this.data = data;
			}
		})

		this.dataService.initData()
	}
}