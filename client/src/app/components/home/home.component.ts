import { Component, OnInit } from '@angular/core'

import { Type } from './../../objects/type'

import { TypesService } from './../../services/types.service'

@Component ({
	selector: 'my-accueil',
	templateUrl: 'home.component.html'
})

export class HomeComponent {
	types;
	error: string = '';

	constructor(
		private typesService: TypesService
		) {

	}

	ngOnInit(): void {
		this.typesService.getTypes()
		.subscribe(types => {
			this.types = types;
		});

		// this.typesService
		// .getTypesOnly()
		// .subscribe(
		// 	data => {this.types = data; console.log(data);},
		// 	error => {this.error = error.message; console.log(error.message);}
		// 	);
	}
}
