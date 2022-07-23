import {Component} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Router} from "@angular/router";
import {AppService} from "./app.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent {

  // constructor(private app: AppService, private http: HttpClient, private router: Router) {
  //   this.app.authenticate(undefined, undefined);
  // }
  // logout() {
  //   // this.http.post('http://localhost:8080/api/logout', {}).finally(() => {
  //   //   this.app.authenticated = false;
  //   //   this.router.navigateByUrl('/login');
  //   // }).subscribe();
  // }

  // constructor(private http: HttpClient) {
  //   http.get('http://localhost:8080/api/todo_tasks').subscribe(data => console.log("hi",data));
  // }
}
