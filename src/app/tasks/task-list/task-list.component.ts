import {Component, OnDestroy, OnInit} from '@angular/core';
import {Subscription} from "rxjs";
import {TaskService} from "../task.service";
import { Task } from "../task.model";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.css']
})
export class TaskListComponent implements OnInit, OnDestroy {
  tasks: Task[] = [];
  subTasks: Subscription;

  constructor(private taskService: TaskService,
              private router: Router,
              private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.tasks = this.taskService.getTasks();
    this.subTasks = this.taskService.tasksChanged.subscribe(
      (tasks: Task[]) => {
        this.tasks = tasks;
      }
    );
  }

  ngOnDestroy() {
    this.subTasks.unsubscribe();
  }

}
