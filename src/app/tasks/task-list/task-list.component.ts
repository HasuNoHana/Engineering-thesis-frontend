import {Component, OnInit} from '@angular/core';
import {Subscription} from "rxjs";
import {TaskService} from "../task.service";
import {Task} from "../task.model";

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

  constructor(private taskService: TaskService) {}

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
    // this.taskService.makeTaskDone(taskNumberInList);
    // this.taskService.moveTaskToDone(taskNumberInList);
    this.taskService.makeTaskDone(taskId);
  }

  onChangeToToDoTask(taskId: number) {
    // this.taskService.makeTaskToDo(taskNumberInList);
    // this.taskService.moveTaskToToDo(taskNumberInList);
    this.taskService.makeTaskToDo(taskId);

  }

  onDeleteDone(index: number) {
    this.taskService.deleteDoneTask(index);
  }

  onDeleteToDo(index: number) {
    this.taskService.deleteToDoTask(index);
  }

}
