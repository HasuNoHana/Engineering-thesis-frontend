import {Component} from '@angular/core';
import {AuthenticationService} from "./authentication/authentication.service";

export function debugLog(message: String, object: any) {
  let DEBUG_ON = true;
  if (DEBUG_ON){
    console.log(message ," ", object)
  }
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent {

  constructor(public appService: AuthenticationService){
  }

  authenticated() { return localStorage.getItem("authenticated") == "true" }
}
