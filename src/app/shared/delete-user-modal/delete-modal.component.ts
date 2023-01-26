import {Component, ElementRef, EventEmitter, Input, OnDestroy, OnInit, Output, ViewChild} from '@angular/core';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {ProfileService} from "../../profile/profile.service";
import {ModalInformationService} from "../modal-information.service";

@Component({
  selector: 'app-delete-modal',
  templateUrl: './delete-modal.component.html'
})
export class DeleteModal implements OnInit, OnDestroy {
  closeResult = '';
  @ViewChild("content",{static:true}) content:ElementRef;

  subscriptions: Array<any> = [];

  @Input() buttonInfo: string = ""
  @Input() messageObject: string = ""
  @Input() title: string = ""
  id: number = -1;

  @Output("sureThatDelete") sureThatDelete = new EventEmitter<number>();

  constructor(private modalService: NgbModal,
              private profileService: ProfileService,
              private modalInformationService: ModalInformationService) {}

  ngOnDestroy() {
    this.subscriptions.forEach(subscription => subscription.unsubscribe())
  }

  ngOnInit() {
    this.modalInformationService.deleteSignal.subscribe((id: number) => {
      this.id = id
      this.open(this.content)
    })
  }

  open(content:any) {
    this.subscriptions.push(this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' }).result.then(
      (result) => {
        this.sureThatDelete.emit(this.id);
      },
      (reason) => {
      },
    ));
  }
}
