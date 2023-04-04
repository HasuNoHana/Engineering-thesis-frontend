import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {UserSignup} from "../userSignup.model";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {SignUpService} from "../sign-up.service";

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html'
})
export class SignUpComponent implements OnInit {

  houseCheckbox = false;
  badJoinCode = false;
  badRequest = false;
  signUpForm: FormGroup;

  constructor(private signUpService: SignUpService,
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
  }

  signup() {
    if(this.signUpForm.controls['password'].value !== this.signUpForm.controls['passwordConfirmation'].value) {
      return;
    }

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

      this.signUpService.createUserCall(userSignup).subscribe(() => {
        this.badRequest = false;
        this.router.navigateByUrl('/login');
      }, (error: any) => {
        if(error.status === 400) {
          console.log(error);
          this.badRequest = true;
        }
      });

    } else {
      let user = {"username": this.signUpForm.controls['username'].value, "password": this.signUpForm.controls['password'].value};

      this.signUpService.createUserAndHouseCall(user).subscribe((response:any) => {
        console.log(response)
        this.router.navigateByUrl('/login');
      }, (error: any) => {
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


