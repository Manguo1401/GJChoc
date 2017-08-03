import { Component } from '@angular/core'

import { fadeInAnimation } from './../../animations/routerFader.component'

@Component({
	selector:'my-creations',
	templateUrl: 'creations.component.html',
    animations: [fadeInAnimation],
    host: { '[@fadeInAnimation]': '' }
})

export class CreationsComponent {
}