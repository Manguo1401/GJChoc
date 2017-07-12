import { Component, OnInit } from '@angular/core'

import { Type } from './../../objects/type'

import { TypesService } from './../../services/types.service'

@Component ({
	selector: 'my-content',
	templateUrl: 'content.component.html'
})

export class ContentComponent {
	types;

	constructor(
		private typesService: TypesService
	) {}

	ngOnInit(): void {
		this.typesService.getTypes()
		.then(types => {
			this.types = types;
			console.log(types)
		});
	}
}