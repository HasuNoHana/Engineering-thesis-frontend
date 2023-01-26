import {Injectable} from '@angular/core';
import {Subject} from "rxjs";
import {Task} from "../tasks/task.model";
import {debugLogOnlyMessage} from "../app.component";
import {HouseBuddy} from "../houses/house-buddy.model";
import {Room} from "../rooms/room.model";

@Injectable({
  providedIn: 'root'
})
export class ModalInformationService {

  deleteSignal = new Subject<number>();
  passwordChangeSignal = new Subject<boolean>();
  newTaskSignal = new Subject<boolean>();
  editTaskSignal = new Subject<Task>();
  newTaskDetailSignal = new Subject<number>();
  editUserRangeSignal = new Subject<HouseBuddy>();
  newRoomSignal = new Subject<boolean>();
  editRoomSignal = new Subject<Room>();
  editPhotoSignal = new Subject<boolean>();

  onDeleteUser() {
    this.deleteSignal.next(-1);
  }

  onPasswordChange() {
    this.passwordChangeSignal.next(true);
  }

  onNewTask() {
    debugLogOnlyMessage("emitting event new task");
    this.newTaskSignal.next(true);
  }

  onNewRoom() {
    debugLogOnlyMessage("emitting event new room");
    this.newRoomSignal.next(true);
  }

  onEditTask(task: Task) {
    this.editTaskSignal.next(task);
  }

  onRoomDetails(roomId: number) {
    this.newTaskDetailSignal.next(roomId);
  }

  onEditUserRange(user: HouseBuddy) {
    debugLogOnlyMessage("send event edit user range")
    this.editUserRangeSignal.next(user);
  }

  onEditRoom(room: Room) {
    debugLogOnlyMessage("send event edit room")
    this.editRoomSignal.next(room);
  }

  onDeleteTask(taskId: number) {
    this.deleteSignal.next(taskId);
  }

  onEditPhoto() {
    this.editPhotoSignal.next(true);
  }
}
