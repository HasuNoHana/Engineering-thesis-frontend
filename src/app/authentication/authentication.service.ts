import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Router} from "@angular/router";
import {finalize} from "rxjs";

@Injectable()
export class AuthenticationService {

  afterLogout = false;
  authenticated = false;

  constructor(private http: HttpClient, private router: Router) {
  }

  logout() {
    this.http.post('api/logout', {}).pipe(finalize(() => {
      localStorage.setItem("authenticated","false")
      this.authenticated = false;
      this.afterLogout = true;
      this.router.navigateByUrl('/login');
    })).subscribe();

  }


  authenticate(credentials: { username: string; password: string; }, callback: () => any) {

    const headers = new HttpHeaders(credentials ? {
      authorization: 'Basic ' + btoa(credentials.username + ':' + credentials.password)
    } : {});

    this.http.get('http://localhost:4200/api/user', {headers: headers}).subscribe(response => {
      // @ts-ignore
      if (response['name']) {
        localStorage.setItem("authenticated","true")
        this.authenticated = true;
        this.afterLogout = true;
      } else {
        this.authenticated = false;
      }
      return callback && callback();
    });

  }

  }
