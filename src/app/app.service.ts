import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Router} from "@angular/router";
import {finalize} from "rxjs";

@Injectable()
export class AppService {

  authenticated = false;

  constructor(private http: HttpClient, private router: Router) {
  }

  logout() {
    this.http.post('logout', {}).pipe(finalize(() => {
      this.authenticated = false;
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
        this.authenticated = true;
      } else {
        this.authenticated = false;
      }
      return callback && callback();
    });

  }

  }
