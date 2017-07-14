import { NgModule } from '@angular/core'
import { RouterModule } from '@angular/router'

import { PageNotFound } from './components/pageNotFound/page_not_found.component'
import { HomeComponent } from './components/home/home.component'
import { ShopComponent } from './components/shop/shop.component'
import { ProfileComponent} from './components/profile/profile.component'
import { ContactComponent} from './components/contact/contact.component'
import { BasketComponent} from './components/basket/basket.component'

@NgModule({
	imports: [
		RouterModule.forRoot([{
			path:'accueil',
			component: HomeComponent,
		},{
			path:'shop/:type',
			component: ShopComponent
		},{
			path: 'profil',
			component: ProfileComponent
		},{
			path: 'contact',
			component: ContactComponent
		},{
			path: 'panier',
			component: BasketComponent
		},{
			path: '',
			redirectTo: '/accueil',
			pathMatch: 'full'
		},{
			path: '**',
			component: PageNotFound
		}])
	],
	exports: [
		RouterModule
	]
})

export class AppRoutes {}
