import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {ActivatedRoute, Params, Router} from "@angular/router";
import {TaskService} from "../task.service";
import {Task} from "../task.model";
import {RoomService} from "../../rooms/room.service";
import {Room} from "../../rooms/room.model";
import {debugLog, debugLogOnlyMessage} from "../../app.component";

@Component({
  selector: 'app-task-edit',
  templateUrl: './task-edit.component.html',
  styleUrls: ['task-edit.component.css']
})
export class TaskEditComponent implements OnInit {

  taskForm: FormGroup;
  defaultRoomName: string;

  editMode = false;
  currentTaskId: number;
  task: Task;
  editTableToDo: boolean;
  rooms: Room[];

  detailsMode: boolean;
  roomId: number;
  room: Room | undefined;

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
      this.roomId = +params['roomId'];
      if(this.detailsMode){
        let foundRoom = this.roomService.getRoom(this.roomId);
        if (foundRoom === undefined) {
          debugLogOnlyMessage("Room with id " + this.roomId + " not found")
        }
        this.room = foundRoom;
      }

      this.initForm();
    })
  }

  onSubmit() {
    let room = this.roomService.getRoomByName(this.taskForm.value['roomName'])
    if(this.editMode) {
      let t:Task = new Task(this. currentTaskId, this.taskForm.value['name'], this.taskForm.value['initialPrice'], this.task.currentPrice,
        room, this.taskForm.value['done'], this.task.lastDoneDate, this.task.repetitionRateInDays);
      debugLog("Task to be edited: ", t);
      this.taskService.updateTask(t);
    } else {
      let t:Task = new Task(-1, this.taskForm.value['name'],this.taskForm.value['initialPrice'], -1,
        room ,this.taskForm.value['done'], new Date(), -1);
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
    let taskInitialPrice: number = 0;
    let taskRoomName: any;

    if(this.editMode) {
      let task = this.taskService.getTask(this.currentTaskId);
      if(task === undefined) {
        console.error("Edited task does not exist");
      } else {
        this.task = task;
        taskName = this.task.name;
        taskInitialPrice = this.task.initialPrice;
        taskRoomName = this.task.room.name;
        this.defaultRoomName = taskRoomName;
      }
    } else if(this.detailsMode) {
        taskRoomName = this.room?.name;
        this.defaultRoomName = this.room?.name ?? "";
    }

    this.taskForm = new FormGroup({
      'name': new FormControl(taskName, Validators.required),
      'initialPrice': new FormControl(taskInitialPrice,
        [Validators.required, Validators.min(1)]),
      'roomName': new FormControl(taskRoomName, Validators.required),
    });
    this.taskForm.controls['roomName'].setValue(this.defaultRoomName, {onlySelf: true});
  }

}
