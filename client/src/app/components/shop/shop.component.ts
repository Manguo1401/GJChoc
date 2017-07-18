import { Component, OnInit } from '@angular/core'
import { ActivatedRoute, Router, NavigationStart, Event as NavigationEvent } from '@angular/router'

import { DataService } from './../../services/data.service'

import { Type } from './../../objects/type'

@Component ({
	selector: 'my-shop',
	templateUrl: 'shop.component.html'
})

export class ShopComponent {
	data: Type[];
	error: string = '';
	selectedType: string;
	type: Type;

	constructor(
		private dataService: DataService
	) {
		
	}

	ngOnInit() {
		this.dataService.getDataSubscribed().subscribe(data => { 
			this.data = data;
			console.log("data loaded in shop")
		});

		this.dataService.initData();
	}
}