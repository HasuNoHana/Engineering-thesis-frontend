import {Component} from '@angular/core';
import {AppService} from "./app.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent {

  constructor(private appService: AppService) {
    // if( localStorage.getItem("authenticated") === "true"){
    //
    // }
    // this.appService.authenticate({username: '', password: ''}, () => {
    //   console.log("logout");
    // });
  }
}
