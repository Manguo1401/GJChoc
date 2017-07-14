import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core'
import { HttpModule, Http, RequestOptions } from '@angular/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

//Import des bibliothèques annexes

import { AgmCoreModule } from '@agm/core'

//Import des pages

import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { ProfileComponent} from './components/profile/profile.component'
import { ContactComponent} from './components/contact/contact.component'
import { BasketComponent} from './components/basket/basket.component'


//Import des composants

import { PageNotFound } from './components/pageNotFound/page_not_found.component'
import { AppRoutes } from './app.routes'
import { HeaderComponent } from './components/header/header.component'
import { ContentComponent } from './components/content/content.component'
import { FooterComponent } from './components/footer/footer.component'
import { NavigationTreeComponent } from './components/content/navigationTree/navigationTree.component'
import { CategoryListComponent } from './components/content/navigationTree/categoryList/categoryList.component'
import { ProductListComponent } from './components/content/navigationTree/productList/productList.component'
import { ProductDescriptionComponent } from './components/content/navigationTree/productDescription/productDescription.component'
import { PostComponent } from './post/post.component'


// Import des services

import { AuthHttp, AuthConfig } from 'angular2-jwt';
import { TypesService } from './services/types.service';
import { PostRepository } from './post/post-repository.service';

// Import security
import { AuthGuard } from './_guard/index';
import { AuthenticationComponent } from './authentication/authentication.component';
import { AuthenticationService } from './authentication/authentication.service';

// Import admin components
import { AdminHomeComponent} from './admin/home/home.component'

export function authHttpServiceFactory(http: Http, options: RequestOptions) {
    return new AuthHttp( new AuthConfig({}), http, options);
}

// Import des filtres et transformeurs (pipes)

import { CapitalizePipe } from './pipes/capitalize.pipe';

@NgModule({
// <<<<<<< HEAD
	declarations: [
		AppComponent,
		HomeComponent,
		ProfileComponent,
		ContactComponent,
		BasketComponent,
		HeaderComponent,
		ContentComponent,
		FooterComponent,
		NavigationTreeComponent,
		CategoryListComponent,
		ProductListComponent,
		ProductDescriptionComponent,
		PageNotFound,
		AuthenticationComponent,
		PostComponent,
		AdminHomeComponent,
		CapitalizePipe //Added from master
	],
	imports: [
		BrowserModule,
		AppRoutes,
		HttpModule,
		AgmCoreModule.forRoot({
			apiKey: 'AIzaSyD-28apoLg5KsGw9h4jAJ-IoEpN79HH42o'
		}),
		FormsModule,
		ReactiveFormsModule
	],
	providers: [
		{
			provide: AuthHttp,
			useFactory: authHttpServiceFactory,
			deps: [ Http, RequestOptions ]
		},
		TypesService,
		AuthGuard,
		AuthenticationService,
		PostRepository
	],
	bootstrap: [AppComponent]
// =======
//   declarations: [
//     AppComponent,
//     HomeComponent,
//     ProfileComponent,
//     ContactComponent,
//     BasketComponent,
//     HeaderComponent,
//     ContentComponent,
//     FooterComponent,
//     NavigationTreeComponent,
//     CategoryListComponent,
//     ProductListComponent,
//     ProductDescriptionComponent,
//     PageNotFound,
//     CapitalizePipe
//   ],
//   imports: [
//     BrowserModule,
//     AppRoutes,
//     HttpModule,
//     AgmCoreModule.forRoot({
//       apiKey: 'AIzaSyD-28apoLg5KsGw9h4jAJ-IoEpN79HH42o'
//     })
//   ],
//   providers: [
//     TypesService
//   ],
//   bootstrap: [AppComponent]
// >>>>>>> refs/remotes/origin/master
})
export class AppModule { }
