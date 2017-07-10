import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core'

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
    PageNotFound
  ],
  imports: [
    BrowserModule,
    AppRoutes,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyD-28apoLg5KsGw9h4jAJ-IoEpN79HH42o'
    })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
