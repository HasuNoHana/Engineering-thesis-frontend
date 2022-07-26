import {Component} from '@angular/core';
import {AppService} from "./app.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent {

  constructor(private appService: AppService) {
    this.appService.authenticate({username: '', password: ''}, () => {
      console.log("logout");
    });
  }
}
