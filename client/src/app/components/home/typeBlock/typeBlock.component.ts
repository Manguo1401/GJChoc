import { Component, Input, OnInit } from '@angular/core'
import { ActivatedRoute } from '@angular/router'

@Component({
	selector:'my-nav-tree',
	templateUrl: 'typeBlock.component.html',
	styleUrls: ['typeBlock.style.scss']
})

export class TypeBlockComponent implements OnInit {
	private type: string;
	private category: string;
	private product: string;

	@Input('parentType') parentType: string;

	constructor(private route: ActivatedRoute) {}

	ngOnInit() {
		this.route.params.subscribe((params: any) => {
			this.type = params['type'];
		});
	}
}