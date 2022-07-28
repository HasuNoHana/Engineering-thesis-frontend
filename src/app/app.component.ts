import {Component} from '@angular/core';
import {AuthenticationService} from "./authentication/authentication.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent {

  constructor(private appService: AuthenticationService) {
    // if( localStorage.getItem("authenticated") === "true"){
    //
    // }
    // this.appService.authenticate({username: '', password: ''}, () => {
    //   console.log("logout");
    // });
  }
}
