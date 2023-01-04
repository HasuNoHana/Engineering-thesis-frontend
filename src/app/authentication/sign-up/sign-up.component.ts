import {Component, OnInit} from '@angular/core';
import {AuthenticationService} from '../authentication.service';
import {HttpClient} from '@angular/common/http';
import {Router} from '@angular/router';
import {UserSignup} from "./userSignup.model";
import {FormControl, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html'
})
export class SignUpComponent implements OnInit {

  houseCheckbox = false;
  badJoinCode = false;
  badRequest = false;
  signUpForm: FormGroup;

  constructor(public authService: AuthenticationService,
              private http: HttpClient,
              private router: Router) {
  }

  ngOnInit() {
    this.createForm();
  }

  createForm() {
    this.signUpForm = new FormGroup({
      'username': new FormControl("", [Validators.required]),
      'password': new FormControl("", [Validators.required]),
      'passwordConfirmation': new FormControl("", [Validators.required]),
      'houseJoinCode': new FormControl("", [])
    });
    console.log("ji")
  }

  signup() {
    this.badJoinCode = false;
    if(!this.signUpForm.valid) {
      return;
    }
    if(this.houseCheckbox) {
      if(this.signUpForm.controls['houseJoinCode'].value === '') {
        this.badJoinCode = true;
        return;
      }
      let userSignup: UserSignup = new UserSignup(this.signUpForm.controls['username'].value,
        this.signUpForm.controls['password'].value, this.signUpForm.controls['houseJoinCode'].value);

      this.http.post('api/createUserForExistingHouse', userSignup).subscribe(() => {
        this.badRequest = false;
        this.router.navigateByUrl('/login');
      }, error => {
        if(error.status === 400) {
          console.log(error);
          this.badRequest = true;
        }
      });

    } else {
      let user = {"username": this.signUpForm.controls['username'].value, "password": this.signUpForm.controls['password'].value};

      this.http.post('api/createUserAndHouse', user).subscribe(() => {
        this.router.navigateByUrl('/login');
      }, error => {
        if(error.status === 400) {
          console.log(error);
          this.badRequest = true;
        }
      });
    }

  }

  houseCheckboxChanged() {
    this.houseCheckbox = !this.houseCheckbox;
    console.log(this.houseCheckbox);
  }
}
