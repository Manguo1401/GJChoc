import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core'
import { ActivatedRoute } from '@angular/router'

import { DataService } from './../../../services/data.service'

import { Type } from './../../../objects/type'

@Component ({
	selector: 'my-category-list',
	templateUrl: 'categoryList.component.html'
})

export class CategoryListComponent {

	@Input() type: string;
	@Input() data: any;
	private categories: string[];
	private selectedType : string;

}