import {Component, ElementRef, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {HouseBuddy} from "../house-buddy.model";
import {HouseService} from "../house.service";
import {ModalInformationService} from "../../shared/modal-information.service";
import {debugLog} from "../../app.component";

@Component({
  selector: 'app-edit-user-modal',
  templateUrl: './edit-user-modal.component.html'
})
export class EditUserModalComponent implements OnInit, OnDestroy {
  closeResult = '';
  userForm: FormGroup;
  @ViewChild("content",{static:true}) content:ElementRef;
  user: HouseBuddy;
  subscriptions: Array<any> = [];

  constructor(private modalService: NgbModal,
              private houseService: HouseService,
              private modalInformationService: ModalInformationService) { }

  ngOnDestroy() {
    this.subscriptions.forEach(subscription => subscription.unsubscribe());
  }

  ngOnInit(): void {
    this.subscriptions.push(this.modalInformationService.editUserRangeSignal.subscribe((user: HouseBuddy) => {
      this.user = user;
      debugLog("open modal for user: ", user?.username)
      this.initForm();
      this.open(this.content)
    }))
  }

  open(content:any) {
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' }).result.then(
      (result) => {
        this.houseService.editRange(this.user.id, this.userForm.value['range'])
      },
      (reason) => {
      },
    );
  }

  private initForm() {
    let range = this.user?.weeklyContribution

    this.userForm = new FormGroup({
      'range': new FormControl(range, [Validators.required, Validators.min(1),
        Validators.pattern(/^-?\d+$/)])
    });
  }


}
