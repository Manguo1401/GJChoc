import {Component} from '@angular/core'

import { fadeInAnimation } from './../../animations/routerFader.component';

@Component ({
	selector: 'my-basket',
	templateUrl: 'basket.component.html',
    animations: [fadeInAnimation],
    host: { '[@fadeInAnimation]': '' }
})

export class BasketComponent {

}