import {Injectable} from '@angular/core';
import {Subject} from "rxjs";
import {Task} from "../tasks/task.model";
import {debugLogOnlyMessage} from "../app.component";
import {User} from "../houses/user.model";

@Injectable({
  providedIn: 'root'
})
export class ModalInformationService {

  deleteUserSignal = new Subject<boolean>();
  passwordChangeSignal = new Subject<boolean>();
  newTaskSignal = new Subject<boolean>();
  editTaskSignal = new Subject<Task>();
  newTaskDetailSignal = new Subject<number>();
  editUserRangeSignal = new Subject<User>();

  onDeleteUser() {
    this.deleteUserSignal.next(true);
  }

  onPasswordChange() {
    this.passwordChangeSignal.next(true);
  }

  onNewTask() {
    debugLogOnlyMessage("emitting event new task");
    this.newTaskSignal.next(true);
  }

  onEditTask(task: Task) {
    this.editTaskSignal.next(task);
  }

  onRoomDetails(roomId: number) {
    this.newTaskDetailSignal.next(roomId);
  }

  onEditUserRange(user: User) {
    debugLogOnlyMessage("send event edit user range")
    this.editUserRangeSignal.next(user);
  }
}
