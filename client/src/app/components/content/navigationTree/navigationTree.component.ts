import { Component, Input, OnInit } from '@angular/core'
import { ActivatedRoute } from '@angular/router'

@Component({
	selector:'my-nav-tree',
	templateUrl: 'navigationTree.component.html',
	styleUrls: ['navigationTree.style.scss']
})

export class NavigationTreeComponent implements OnInit {
	private type: string;
	private category: string;
	private product: string;

	@Input('parentType') parentType: string;

	constructor(private route: ActivatedRoute) {}

	ngOnInit() {
		this.route.params.subscribe((params: any) => {
			this.type = params['type'];
			this.category = params['category'];
			this.product = params['product'];
		});
	}
}