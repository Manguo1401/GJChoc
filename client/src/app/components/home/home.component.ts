import { Component, OnInit } from '@angular/core'

import { DataService } from './../../services/data.service'

@Component ({
	selector: 'my-accueil',
	templateUrl: 'home.component.html'
})

export class HomeComponent {

	data;
	error: string = '';

	constructor(
		private dataService: DataService
		) {

	}

	ngOnInit(): void {
		this.dataService.getDataSubscribed()
		.subscribe(data => {
			this.data = data;
			console.log(this.data)
		});

		this.dataService.initData();

	}

}
