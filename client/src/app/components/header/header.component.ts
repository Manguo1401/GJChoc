import { Component } from '@angular/core'
import { Router } from '@angular/router';

import { AuthenticationService } from '../../authentication/authentication.service';

@Component({
	selector: 'my-header',
	templateUrl: 'header.component.html'
})

export class HeaderComponent {

  constructor(private authenticationService: AuthenticationService, private router: Router) {}

    hasAuthToken() {
        return localStorage.getItem('token') !== null;
    }

    logout() {
         this.authenticationService.logout();
             this.router.navigate(['home']);
    }
}
