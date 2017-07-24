import { Component, Input, OnInit, OnChanges, SimpleChanges } from '@angular/core'
import { ActivatedRoute, Params } from '@angular/router'

import { DataService } from './../../../services/data.service'

import { Type } from './../../../objects/type'

@Component ({
	selector: 'my-category-list',
	templateUrl: 'categoryList.component.html'
})

export class CategoryListComponent {

	@Input() data: any;
	private categories: any;
	private type : string;
	private filteredCategory: number;

	constructor(
		private activatedRoute: ActivatedRoute,
		private dataService: DataService
		) {}

	ngOnChanges(changes: SimpleChanges) {
		if(this.data) {
			this.categories = this.getCategories(this.data, this.type);
		}
	}

	ngOnInit() {
		this.activatedRoute.params.subscribe((params: Params) => {
			this.type = params['type'];
			this.categories = this.getCategories(this.data, this.type)
		});
	}

	getCategories(data, selectedType) {
		let categories = []
		if(data) 
			data.forEach((e) => {
				if (e.type === selectedType) {
					categories = e.categories
				}
			})
		return categories
	}

	filterCategory(category, id) {
		this.dataService.sendCategory(category);

		//application du style pour le focus
		this.filteredCategory = id;
	}

}