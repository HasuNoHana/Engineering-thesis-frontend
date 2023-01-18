import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Router} from "@angular/router";
import {finalize} from "rxjs";

@Injectable()
export class AuthenticationService {

  authenticated = false;

  constructor(private http: HttpClient, private router: Router) {
  }

  logout() {
    this.http.post('api/logout', {}).pipe(finalize(() => {
      localStorage.setItem("authenticated","false")
      this.authenticated = false;
      this.router.navigateByUrl('/login').then(()=>{window.location.reload()})
    })).subscribe();

  }


  authenticate(credentials: { username: string; password: string; }, callback: (b: boolean) => any) {

    const headers = new HttpHeaders(credentials ? {
      authorization: 'Basic ' + btoa(credentials.username + ':' + credentials.password)
    } : {});

    this.http.get('http://localhost:4200/api/user', {headers: headers}).subscribe((response: {name?: string}) => {
      if (response['name']) {
        localStorage.setItem("authenticated","true")
        localStorage.setItem("username",credentials.username);
        this.authenticated = true;
      } else {
        this.authenticated = false;
      }
      return callback && callback(true);
    }, error => {
      return callback && callback(false);
    });
  }

}
