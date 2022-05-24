import {Injectable} from "@angular/core";
import {Task} from "./task.model";
import {Subject} from "rxjs";
import {HttpClient} from "@angular/common/http";

@Injectable()
export class TaskService {

  toDoTasksChanged = new Subject<Task[]>();
  doneTasksChanged = new Subject<Task[]>();
  private toDoTasks: Task[] = [];
  private doneTasks: Task[] = [];

  constructor(private http: HttpClient) {
    this.fetchTasks();
  }

  getToDoTasks(){
    return this.toDoTasks.slice();
  }

  getDoneTasks(){
    return this.doneTasks.slice();
  }

  fetchTasks() {
    this.http.get<Task[]>('http://localhost:8080/api/todo_tasks')
      .subscribe((tasks: Task[]) => {
        this.toDoTasks = tasks;
        this.toDoTasksChanged.next(this.toDoTasks.slice());
    });

    this.http.get<{ [key: string]: Task }>('http://localhost:8080/api/done_tasks')
      .subscribe((tasks: any) => {
        this.doneTasks = tasks;
        this.doneTasksChanged.next(this.doneTasks.slice());
    });
  }

  makeTaskDone(taskNumberInList: number) {
    return this.toDoTasks[taskNumberInList];
  }

  moveTaskToDone(taskNumberInList: number) {
    let task = this.toDoTasks[taskNumberInList];
    this.toDoTasks.splice(taskNumberInList,1);
    this.doneTasks.push(task);
    this.toDoTasksChanged.next(this.toDoTasks.slice());
    this.doneTasksChanged.next(this.doneTasks.slice());
  }

  makeTaskToDo(taskNumberInList: number) {
    this.doneTasks[taskNumberInList].done = false;
  }

  moveTaskToToDo(taskNumberInList: number) {
    let task = this.doneTasks[taskNumberInList];
    this.doneTasks.splice(taskNumberInList,1);
    this.toDoTasks.push(task);
    this.toDoTasksChanged.next(this.toDoTasks.slice());
    this.doneTasksChanged.next(this.doneTasks.slice());
  }

  addTask(task: Task) {
    this.toDoTasks.push(task);
    this.toDoTasksChanged.next(this.toDoTasks.slice());
  }

  getTaskFromToDo(index: number) {
    return this.toDoTasks[index];
  }

  updateToDoTask(index: number, task: Task) {
    this.toDoTasks[index] = task;
    this.toDoTasksChanged.next(this.toDoTasks.slice());
  }

  updateDoneTask(index: number, task: Task) {
    this.doneTasks[index] = task;
    this.doneTasksChanged.next(this.doneTasks.slice());
  }

  getTaskFromDone(index: number) {
    return this.doneTasks[index];
  }

  deleteDoneTask(index: number) {
    this.doneTasks.splice(index,1);
    this.doneTasksChanged.next(this.doneTasks.slice());
  }

  deleteToDoTask(index: number) {
    this.toDoTasks.splice(index,1);
    this.toDoTasksChanged.next(this.toDoTasks.slice());
  }
}
