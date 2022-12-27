import {Component} from '@angular/core';
import {AuthenticationService} from "./authentication/authentication.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent {

  constructor(public appService: AuthenticationService){
  }

  authenticated() { return localStorage.getItem("authenticated") == "true" }
}
