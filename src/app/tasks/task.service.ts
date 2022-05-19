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

  getTask(taskNumberInList: number) {
    return this.toDoTasks[taskNumberInList];
  }

  makeTaskDone(taskNumberInList: number) {
    let task = this.toDoTasks[taskNumberInList];
    this.toDoTasks.splice(taskNumberInList);
    this.doneTasks.push(task);
    this.toDoTasksChanged.next(this.toDoTasks.slice());
    this.doneTasksChanged.next(this.doneTasks.slice());
  }
}
