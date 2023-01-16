import {Component, OnInit} from '@angular/core';
import {Subscription} from "rxjs";
import {TaskService} from "../task.service";
import {Task} from "../task.model";
import {ActivatedRoute, Params, Router} from "@angular/router";

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

  roomId: number;

  constructor(private taskService: TaskService,
              private route: ActivatedRoute,
              private router: Router) {}

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      this.roomId = +params['id'];
      if(this.roomId){
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

  onDelete(taskId: number) {
    this.taskService.deleteTask(taskId);
  }

  onCreateNewTask() {
    if(this.roomId){
      this.router.navigate(['newTask'], {relativeTo: this.route});
    }
    this.router.navigate(['newTask'], {relativeTo: this.route});
  }

  private getUsersForTasks() {
    this.taskToUserMap = this.taskService.getTaskToUserMap();
    this.taskService.taskToUserMapChanged.subscribe((taskToUserMap: Map<number, string>) => {
      this.taskToUserMap = taskToUserMap;
    });
  }
}
