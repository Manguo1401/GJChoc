import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { Type } from './objects/type'

import { DataService } from './services/data.service'

// import { AuthenticationService } from './authentication/authentication.service';

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.scss']
})
export class AppComponent {
	title = 'app';

	data;
	error: string = '';

	constructor(
		private dataService: DataService
		) {

	}

	ngOnInit(): void {
		this.dataService.loadData()
		.subscribe(
			data => {
				this.data = data;
			}
		),
		err => console.log(err);
	}

	 /* constructor(){
			console.log("app.component.ts hastoken = " + (localStorage.getItem('token') !== null));
		}*/
		// constructor(private authenticationService: AuthenticationService, private router: Router) {}

		//   hasAuthToken() {
			//       return localStorage.getItem('id_token') !== null;
			//   }

			//   logout() {
				//        this.authenticationService.logout();
				//            this.router.navigate(['home']);
				//   }
			}
