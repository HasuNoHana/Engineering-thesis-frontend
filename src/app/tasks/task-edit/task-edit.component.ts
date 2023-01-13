import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {ActivatedRoute, Params, Router} from "@angular/router";
import {TaskService} from "../task.service";
import {Task} from "../task.model";
import {RoomService} from "../../rooms/room.service";
import {Room} from "../../rooms/room.model";
import {debugLog} from "../../app.component";

@Component({
  selector: 'app-task-edit',
  templateUrl: './task-edit.component.html',
  styleUrls: ['task-edit.component.css']
})
export class TaskEditComponent implements OnInit {

  taskForm: FormGroup;
  editMode = false;
  currentTaskId: number;
  editTableToDo: boolean;
  rooms: Room[];
  defaultRoom: string;

  detailsMode: boolean;
  roomId: number;
  room: Room;

  constructor(private route: ActivatedRoute,
              private taskService: TaskService,
              private roomService: RoomService,
              private router: Router) { }

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      this.rooms = this.roomService.getRooms();
      this.roomService.roomsChanged.subscribe((rooms: Room[]) => {
        this.rooms = rooms;
      })
      this.currentTaskId = +params['currentTaskId'];
      this.editTableToDo = this.router.url.includes('todo');
      this.editMode = params['currentTaskId'] != null;

      this.detailsMode = this.router.url.includes('details');
      this.roomId = params['roomId'];
      console.log("room id: ", this.roomId);
      // @ts-ignore
      this.room = this.roomService.getRoom(this.roomId);
      console.log("detailsmode ",this.detailsMode);
      this.initForm();
    })
  }

  onSubmit() {
    let room = this.roomService.getRoomByName(this.taskForm.value['roomName'])
    let t:Task = new Task(-1, this.taskForm.value['name'],this.taskForm.value['price'],
      room ,this.taskForm.value['done']);
    if(this.editMode) {
      debugLog("Task to be edited: ", t);
      this.taskService.updateTask(this. currentTaskId, t);
    } else {
      debugLog("Task to be added: ", t);
      this.taskService.addTask(t);
    }
    this.onCancel();
  }

  onCancel() {
    if(this.editMode) {
      this.editMode = false;
      this.router.navigate(['../../'], {relativeTo: this.route});
    } else if(this.detailsMode) {
      this.detailsMode = false;
      this.router.navigate(['../'], {relativeTo: this.route});
    } else {
      this.router.navigate(['../'], {relativeTo: this.route});
    }
  }

  private initForm() {
    let taskName = '';
    let taskPrice: number = 0;
    let taskRoomName: any;

    if(this.editMode) {
      let task = this.taskService.getTask(this.currentTaskId);
      if(task === undefined) {
        console.error("Edited task does not exist");
      } else {
        taskName = task.name;
        taskPrice = task.initialPrice;
        taskRoomName = task.room.name;
        this.defaultRoom = taskRoomName;
      }
    } else if(this.detailsMode) {
        taskRoomName = this.room?.name;
        this.defaultRoom = this.room?.name;
    }

    this.taskForm = new FormGroup({
      'name': new FormControl(taskName, Validators.required),
      'price': new FormControl(taskPrice,
        [Validators.required, Validators.min(1)]),
      'roomName': new FormControl(taskRoomName, Validators.required),
    });
    this.taskForm.controls['roomName'].setValue(this.defaultRoom, {onlySelf: true});
  }

}
