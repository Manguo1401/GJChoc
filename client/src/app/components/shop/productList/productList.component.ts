import { Component, Input } from '@angular/core'

@Component ({
	selector: 'my-product-list',
	templateUrl: 'productList.component.html'
})

export class ProductListComponent {
	@Input() type: string;
}