import {Component} from '@angular/core';
import {AuthenticationService} from '../authentication/authentication.service';
import {HttpClient} from '@angular/common/http';

@Component({
  templateUrl: './home.component.html'
})
export class HomeComponent {

  title = 'Demo';
  greeting: any = {id:String,content:String};

  constructor(private app: AuthenticationService, private http: HttpClient) {
    http.get('resource').subscribe(data => this.greeting = data);
  }

  authenticated() { return localStorage.getItem("authenticated") == "true" }

}
