import {Injectable} from '@angular/core';
import {Subject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ModalInformationService {

  deleteUserSignal = new Subject<boolean>();
  passwordChangeSignal = new Subject<boolean>();

  onDeleteUser() {
    this.deleteUserSignal.next(true);
  }

  onPasswordChange() {
    this.passwordChangeSignal.next(true);
  }
}
