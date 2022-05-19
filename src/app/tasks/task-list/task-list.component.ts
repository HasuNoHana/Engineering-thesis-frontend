import {Component, OnDestroy, OnInit} from '@angular/core';
import {Subscription} from "rxjs";
import {TaskService} from "../task.service";
import {Task} from "../task.model";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html'
})
export class TaskListComponent implements OnInit, OnDestroy {
  toDoTasks: Task[] = [];
  doneTasks: Task[] = [];
  subDoneTasks: Subscription;
  subToDoTasks: Subscription;
  isFetching = false;

  constructor(private taskService: TaskService,
              private router: Router,
              private route: ActivatedRoute) {}

  ngOnInit(): void {
    console.log("elo");
    this.getTasks();
    this.subToDoTasks = this.taskService.toDoTasksChanged.subscribe((tasks: Task[]) => {
      this.toDoTasks = tasks;
    });
    this.subDoneTasks = this.taskService.doneTasksChanged.subscribe((tasks: Task[]) => {
      this.doneTasks = tasks;
    });
  }

  ngOnDestroy() {
    this.subDoneTasks.unsubscribe();
    this.subDoneTasks.unsubscribe();
  }

  private getTasks() {
    this.toDoTasks = this.taskService.getToDoTasks();
    this.doneTasks = this.taskService.getDoneTasks();
  }

  onChangeToDoneTask(taskNumberInList: number) {
    this.taskService.makeTaskDone(taskNumberInList);
    this.taskService.moveTaskToDone(taskNumberInList);
  }

  onChangeToToDoTask(taskNumberInList: number) {
    this.taskService.makeTaskToDo(taskNumberInList);
    this.taskService.moveTaskToToDo(taskNumberInList);

  }
}
