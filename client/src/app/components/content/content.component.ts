import { Component, OnInit } from '@angular/core'

import { Type } from './../../objects/type'

import { TypesService } from './../../services/types.service'

@Component ({
	selector: 'my-content',
	templateUrl: 'content.component.html'
})


export class ContentComponent implements OnInit{
	types: any[];
	error: string = '';

	constructor(
		private typesService: TypesService
	) {}

	ngOnInit(): void {

		this.typesService.getTypesOnly()
		.subscribe(types => {
			this.types = types;
		});

		// this.typesService.getTypes()
		// .then(types => {
		// 	this.types = types
		// });

		// this.typesService
  //           .getTypesOnly()
  //           .subscribe(
  //               data => {this.types = data;console.log(data);},
  //               error => {this.error = error.message;console.log(error.message);}
  //           );

		// this.typesService.getTypes()
		// .then(types => {
		// 	this.types = types;
		// 	console.log(types)
		// });

	}
}
