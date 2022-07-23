// import { Injectable } from '@angular/core';
// import {HttpClient, HttpHeaders} from "@angular/common/http";
// import {map} from "rxjs";
//
// export class User {
//   constructor(
//     public status: string,
//   ) { }
//
// }
//
// @Injectable({
//   providedIn: 'root'
// })
// export class AppService {
//
//   constructor(
//     private httpClient: HttpClient
//   ) {
//   }
//
//   authenticate(username: string, password: string) {
//     console.log(username);
//     console.log(password);
//     const headers = new HttpHeaders({ Authorization: 'Basic ' + btoa(username + ':' + password) });
//     return this.httpClient.get<User>('http://localhost:8080/employees/validateLogin', { headers }).pipe(
//       map(
//         userData => {
//           sessionStorage.setItem('username', username);
//           let authString = 'Basic ' + btoa(username + ':' + password);
//           sessionStorage.setItem('basicauth', authString);
//           return userData;
//         }
//       )
//
//     );
//   }
//
//   isUserLoggedIn() {
//     let user = sessionStorage.getItem('username')
//     console.log(!(user === null))
//     return !(user === null)
//   }
//
//   logOut() {
//     sessionStorage.removeItem('username')
//   }
//
// }
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable()
export class AppService {

  authenticated = false;

  constructor(private http: HttpClient) {
  }

  authenticate(credentials: { username: string; password: string; }, callback: () => any) {

    const headers = new HttpHeaders(credentials ? {
      authorization : 'Basic ' + btoa(credentials.username + ':' + credentials.password)
    } : {});

    this.http.get('http://localhost:8080/api/user', {headers: headers}).subscribe(response => {
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
