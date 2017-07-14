import { Component, OnInit } from '@angular/core'

import { Type } from './../../objects/type'

import { TypesService } from './../../services/types.service'

@Component ({
	selector: 'my-accueil',
	templateUrl: 'home.component.html'
})

export class HomeComponent {
	types;

	constructor(
		private typesService: TypesService
	) {}

	ngOnInit(): void {
		this.typesService.getTypes()
		.subscribe(types => {
			this.types = types;
		});
	}
}