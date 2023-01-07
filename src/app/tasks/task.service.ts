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
        console.log("tasks ",this.tasks);
      });

    // this.http.get<Task[]>('http://localhost:4200/api/todo_tasks',{withCredentials: true})
    //   .subscribe((tasks: Task[]) => {
    //     this.toDoTasks = tasks;
    //     this.toDoTasksChanged.next(this.toDoTasks.slice());
    // });
    //
    // this.http.get<{ [key: string]: Task }>('http://localhost:4200/api/done_tasks',{withCredentials: true})
    //   .subscribe((tasks: any) => {
    //     this.doneTasks = tasks;
    //     this.doneTasksChanged.next(this.doneTasks.slice());
    // });
  }

  // makeTaskDone(taskNumberInList: number) {
  //   return this.toDoTasks[taskNumberInList];
  // }
  //
  // moveTaskToDone(taskNumberInList: number) {
  //   let task = this.toDoTasks[taskNumberInList];
  //   this.toDoTasks.splice(taskNumberInList,1);
  //   this.doneTasks.push(task);
  //   this.toDoTasksChanged.next(this.toDoTasks.slice());
  //   this.doneTasksChanged.next(this.doneTasks.slice());
  // }

  // makeTaskToDo(taskNumberInList: number) {
  //   this.doneTasks[taskNumberInList].done = false;
  // }
  //
  // moveTaskToToDo(taskNumberInList: number) {
  //   let task = this.doneTasks[taskNumberInList];
  //   this.doneTasks.splice(taskNumberInList,1);
  //   this.toDoTasks.push(task);
  //   this.toDoTasksChanged.next(this.toDoTasks.slice());
  //   this.doneTasksChanged.next(this.doneTasks.slice());
  // }

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

  // updateToDoTask(index: number, task: Task) {
  //   this.toDoTasks[index] = task;
  //   this.toDoTasksChanged.next(this.toDoTasks.slice());
  // }

  // updateDoneTask(index: number, task: Task) {
  //   this.doneTasks[index] = task;
  //   this.doneTasksChanged.next(this.doneTasks.slice());
  // }

  // getTaskFromDone(index: number) {
  //   return this.doneTasks[index];
  // }

  // deleteDoneTask(index: number) {
  //   this.doneTasks.splice(index,1);
  //   this.doneTasksChanged.next(this.doneTasks.slice());
  // }
  //
  // deleteToDoTask(index: number) {
  //   this.toDoTasks.splice(index,1);
  //   this.toDoTasksChanged.next(this.toDoTasks.slice());
  // }

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
