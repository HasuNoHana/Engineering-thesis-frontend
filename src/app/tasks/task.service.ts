import {Injectable} from "@angular/core";
import {Task} from "./task.model";
import {Subject} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {TaskDto} from "./taskDto.model";

@Injectable()
export class TaskService {

  toDoTasksChanged = new Subject<Task[]>();
  doneTasksChanged = new Subject<Task[]>();
  tasksChanged = new Subject<Task[]>();
  private toDoTasks: Task[] = [];
  private doneTasks: Task[] = [];
  private tasks: Task[] = [];

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
    this.http.get<Task[]>('http://localhost:4200/api/tasks',{withCredentials: true})
      .subscribe((tasks: Task[]) => {
        this.tasks = tasks;
        this.toDoTasks = this.tasks.filter(task => !task.done);
        this.doneTasks = this.tasks.filter(task => task.done);
        this.tasksChanged.next(this.tasks.slice());
        this.toDoTasksChanged.next(this.toDoTasks.slice());
        this.doneTasksChanged.next(this.doneTasks.slice());
      });
  }

  addTask(task: Task) {
    console.log(task);
    let taskDto: TaskDto = new TaskDto(task.name, task.initialPrice, task.room.id, task.done);
    this.http.post<Task>('http://localhost:4200/api/addTask', taskDto,{withCredentials: true})
      .subscribe((_: any) => {
        this.fetchTasks()
      });
  }

  getTask(id: number): Task | undefined {
    return this.tasks.find(task => task.id === id);
  }

  deleteTask(taskId: number) {
    this.http.delete('http://localhost:4200/api/task?id='+taskId,{withCredentials: true})
      .subscribe((_: any) => {
        this.fetchTasks();
      });
  }

  makeTaskDone(taskId: number) {
    this.http.post('http://localhost:4200/api/makeTaskDone?id='+taskId,{withCredentials: true})
      .subscribe((_: any) => {
        this.fetchTasks();
      });
  }

  makeTaskToDo(taskId: number) {
    this.http.post('http://localhost:4200/api/makeTaskToDo?id='+taskId,{withCredentials: true})
      .subscribe((_: any) => {
        this.fetchTasks();
      });
  }

  updateTask(taskId: number, updatedTask: Task) {
    let taskDto: TaskDto = new TaskDto(updatedTask.name, updatedTask.initialPrice, updatedTask.room.id, updatedTask.done);
    this.http.post('http://localhost:4200/api/updateTask?id='+taskId, taskDto,{withCredentials: true})
      .subscribe((_: any) => {
        this.fetchTasks();
      });
  }
}
