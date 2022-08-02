import {Component, OnDestroy} from '@angular/core';
import {AuthenticationService} from "./authentication/authentication.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent implements OnDestroy{

  constructor(public appService: AuthenticationService){
  }

  ngOnDestroy() {
    localStorage.clear();
  }

  authenticated() { return localStorage.getItem("authenticated") == "true" }
}
