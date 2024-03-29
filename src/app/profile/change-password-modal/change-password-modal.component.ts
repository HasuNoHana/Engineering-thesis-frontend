import {Component, ElementRef, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {ProfileService} from "../profile.service";
import {ModalInformationService} from "../../shared/modal-information.service";

@Component({
  selector: 'app-change-password-modal',
  templateUrl: './change-password-modal.component.html'
})
export class ChangePasswordModalComponent implements OnInit, OnDestroy {
  closeResult = '';
  changePasswordForm: FormGroup;
  @ViewChild("content",{static:true}) content:ElementRef;

  subscriptions: Array<any> = [];

  constructor(private modalService: NgbModal,
              private profileService: ProfileService,
              private modalInformationService: ModalInformationService) { }

  ngOnDestroy() {
    this.subscriptions.forEach(subscription => subscription.unsubscribe());
  }

  ngOnInit(): void {
    this.subscriptions.push(this.modalInformationService.passwordChangeSignal.subscribe((_: any) => {
      this.initForm();
      this.open(this.content)
    }))
  }

  open(content:any) {
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' }).result.then(
      (result) => {
        this.profileService.changePassword(this.changePasswordForm.value.currentPassword,
          this.changePasswordForm.value.password)
      },
      (reason) => {
      },
    );
  }

  private initForm() {

    this.changePasswordForm = new FormGroup({
      'currentPassword': new FormControl("", Validators.required),
      'password': new FormControl("", Validators.required),
      'repeatedPassword': new FormControl("", [Validators.required])
    });
  }


}
