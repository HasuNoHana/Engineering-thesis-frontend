import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {ActivatedRoute, Params, Router} from "@angular/router";
import {TaskService} from "../task.service";
import {Task} from "../task.model";
import {RoomService} from "../../rooms/room.service";
import {Room} from "../../rooms/room.model";

@Component({
  selector: 'app-task-edit',
  templateUrl: './task-edit.component.html',
  styleUrls: ['task-edit.component.css']
})
export class TaskEditComponent implements OnInit {

  taskForm: FormGroup;
  editMode = false;
  index: number;
  editTableToDo: boolean;
  rooms: Room[];
  defaultRoom: string;

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
      this.index = +params['index'];
      this.editTableToDo = this.router.url.includes('todo');
      this.editMode = params['index'] != null;
      this.initForm();
    })
  }

  onSubmit() {
    let room = this.roomService.getRoomByName(this.taskForm.value['roomName'])
    console.log(room);
    let t:Task = new Task(-1, this.taskForm.value['name'],this.taskForm.value['price'],
      room ,this.taskForm.value['done']);
    if(this.editMode) {
      if(this.editTableToDo) {
        this.taskService.updateToDoTask(this.index, t);
      } else {
        this.taskService.updateDoneTask(this.index, t);
      }
    } else {
      this.taskService.addTask(t);
    }
    this.onCancel();
  }

  onCancel() {
    if(this.editMode) {
      this.editMode = false;
      this.router.navigate(['../../'], {relativeTo: this.route});
    } else {
      this.router.navigate(['../'], {relativeTo: this.route});
    }
  }

  private initForm() {
    let taskName = '';
    let taskPrice: number = 0;
    let taskRoomName: any;

    if(this.editMode) {
      let task: Task;
      if(this.editTableToDo) {
        task = this.taskService.getTaskFromToDo(this.index);
      } else {
        task = this.taskService.getTaskFromDone(this.index);
      }
      taskName = task.name;
      taskPrice = task.initialPrice;
      taskRoomName = task.room.name;
      this.defaultRoom = taskRoomName;
    }

    this.taskForm = new FormGroup({
      'name': new FormControl(taskName, Validators.required),
      'price': new FormControl(taskPrice,
        [Validators.required, Validators.min(1)]),
      'roomName': new FormControl(taskRoomName, Validators.required),
    });
    this.taskForm.controls['roomName'].setValue(this.defaultRoom, {onlySelf: true});
  }

  get getTaskFormNameControl() {return this.taskForm.get('name') as FormControl;}
}
