import {Component, OnInit} from '@angular/core';
import {Subscription} from "rxjs";
import {TaskService} from "../task.service";
import {Task} from "../task.model";
import {ActivatedRoute, Router} from "@angular/router";

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

  constructor(private taskService: TaskService,
              private route: ActivatedRoute,
              private router: Router) {}

  ngOnInit(): void {
    this.getTasks();
    this.subToDoTasks = this.taskService.toDoTasksChanged.subscribe((tasks: Task[]) => {
      this.toDoTasks = tasks;
      console.log(this.toDoTasks);
    });
    this.subDoneTasks = this.taskService.doneTasksChanged.subscribe((tasks: Task[]) => {
      this.doneTasks = tasks;
    });
  }

  private getTasks() {
    this.toDoTasks = this.taskService.getToDoTasks();
    this.doneTasks = this.taskService.getDoneTasks();
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
    this.router.navigate(['tasks','list','new']);
  }

}
