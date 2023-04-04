import {Injectable} from '@angular/core';
import {UserSignup} from "./userSignup.model";
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class SignUpService {

  constructor(private http: HttpClient) { }

  createUserCall(userSignup: UserSignup) {
    return this.http.post('/api/createUserForExistingHouse', userSignup)
  }

  createUserAndHouseCall(user: any) {
    return this.http.post('/api/createUserAndHouse', user)
  }
}
