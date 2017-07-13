import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core'
import { HttpModule } from '@angular/http';

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

// Import des services

import { TypesService } from './services/types.service'

// Import des filtres et transformeurs (pipes)

import { CapitalizePipe } from './pipes/capitalize.pipe'

@NgModule({
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
    CapitalizePipe
  ],
  imports: [
    BrowserModule,
    AppRoutes,
    HttpModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyD-28apoLg5KsGw9h4jAJ-IoEpN79HH42o'
    })
  ],
  providers: [
    TypesService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
