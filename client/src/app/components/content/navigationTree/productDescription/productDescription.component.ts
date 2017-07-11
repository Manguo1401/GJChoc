import { Component, Input } from '@angular/core'

@Component ({
	selector: 'my-product-description',
	templateUrl: 'productDescription.component.html'
})

export class ProductDescriptionComponent {
	@Input() product: string;
}