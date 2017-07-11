import { Component, OnInit } from '@angular/core'

import { Type } from './../../objects/type'

import { TypesService } from './../../services/types.service'

const TYPES: Type[] = [
	{id: 1, type: 'chocolats'},
	{id: 2, type: 'confiseries'}
];

@Component ({
	selector: 'my-content',
	templateUrl: 'content.component.html'
})

export class ContentComponent {
	types = TYPES;

	constructor(
		private typesService: TypesService
	) {}

	ngOnInit(): void {
		this.typesService.getTypes()
		.then(types => {
			this.types = types
		});
	}
}