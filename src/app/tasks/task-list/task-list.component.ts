import {Component, OnInit} from '@angular/core';
import {Subscription} from "rxjs";
import {TaskService} from "../task.service";
import {Task} from "../task.model";
import {ActivatedRoute, Params, Router} from "@angular/router";
import {ModalInformationService} from "../../shared/modal-information.service";
import {debugLogOnlyMessage} from "../../app.component";

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html'
})
export class TaskListComponent implements OnInit {
  toDoTasks: Task[] = [];
  doneTasks: Task[] = [];
  subDoneTasks: Subscription;
  subToDoTasks: Subscription;
  isFetching = false;
  taskToUserMap = new Map();
  roomDetails: boolean = false;

  roomId: number;

  constructor(private taskService: TaskService,
              private route: ActivatedRoute,
              private router: Router,
              private modalInformationService: ModalInformationService) {}

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      this.roomId = +params['id'];
      if(this.roomId){
        this.roomDetails = true;
        this.getTasksForRoom();
      } else {
        this.getAllTasks();
      }
      this.getUsersForTasks()
    })
  }

  private getAllTasks() {
    this.toDoTasks = this.taskService.getToDoTasks();
    this.doneTasks = this.taskService.getDoneTasks();
    this.subToDoTasks = this.taskService.toDoTasksChanged.subscribe((tasks: Task[]) => {
      this.toDoTasks = tasks;
    });
    this.subDoneTasks = this.taskService.doneTasksChanged.subscribe((tasks: Task[]) => {
      this.doneTasks = tasks;
    });
  }

  private getTasksForRoom() {
    this.toDoTasks = this.taskService.getTasksToDoForRoom(this.roomId);
    this.doneTasks = this.taskService.getTasksDoneForRoom(this.roomId);
    this.subToDoTasks = this.taskService.toDoTasksForRoomIdChanged.subscribe((tasks: Task[]) => {
      this.toDoTasks = tasks;
    });
    this.subDoneTasks = this.taskService.doneTasksForRoomIdChanged.subscribe((tasks: Task[]) => {
      this.doneTasks = tasks;
    });
  }

  onChangeToDoneTask(taskId: number) {
    this.taskService.makeTaskDone(taskId);
  }

  onChangeToToDoTask(taskId: number) {
    this.taskService.makeTaskToDo(taskId);

  }

  onDeleteTask(taskId: number) {
    this.taskService.deleteTask(taskId);
  }

  onCreateNewTask() {
    if(this.roomDetails) {
      console.log("onCreateNerTask")
      this.modalInformationService.onRoomDetails(this.roomId);
    } else {
      debugLogOnlyMessage("create new task button clicked");
      this.modalInformationService.onNewTask();
    }
  }

  private getUsersForTasks() {
    this.taskToUserMap = this.taskService.getTaskToUserMap();
    this.taskService.taskToUserMapChanged.subscribe((taskToUserMap: Map<number, string>) => {
      this.taskToUserMap = taskToUserMap;
    });
  }

  onEditTask(task: Task) {
    this.modalInformationService.onEditTask(task);
  }

  openSureDeleteModal(taskId: number) {
    this.modalInformationService.onDeleteTask(taskId);
  }
}
