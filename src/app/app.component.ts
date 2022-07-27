import {Component} from '@angular/core';
import {AuthenticationService} from "./login/authentication.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent {

  constructor(public appService: AuthenticationService) {
    this.appService.authenticate({username: '', password: ''}, () => {
      console.log("logout");
    });
  }
}
