import {Component} from '@angular/core';
import {AuthenticationService} from "./authentication/authentication.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent {

  constructor(public appService: AuthenticationService) {
    // if( localStorage.getItem("authenticated") === "true"){
    //
    // }
    // this.appService.authenticate({username: '', password: ''}, () => {
    //   console.log("logout");
    // });
  }

  authenticated() { return localStorage.getItem("authenticated") == "true" }
}
