import {TaskService} from "./task.service";
import {Room} from "../rooms/room.model";
import {House} from "../houses/house.model";
import {Task} from "./task.model";
import {TestBed} from "@angular/core/testing";
import {HttpClientTestingModule, HttpTestingController} from "@angular/common/http/testing";
import {TaskDto} from "./taskDto.model";

describe('TaskService', () => {
  let httpTestingController: HttpTestingController;
  let service: TaskService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        TaskService
      ]
    });
    httpTestingController = TestBed.inject(HttpTestingController);
    service = TestBed.inject(TaskService);
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  it('#fetchTasksCall should fetch all tasks', () => {
  let house = new House(1, '1234');
  let room = new Room(1, 'Room 1', 'image_url', house);
  let room2 = new Room(2, 'Room 2', 'image_url_2', house);
  const expectedTasks: Task[] =
    [new Task(1, 'Task 1', 10, room, false),
    new Task(2, 'Task 2', 20, room2, true)];

    service.fetchTasksCall().subscribe(tasks => {
      expect(tasks).toEqual(expectedTasks);
    });

    const requests = httpTestingController.match('http://localhost:4200/api/tasks');
    expect(requests.length).toBe(2);
  });

  it('#addTaskCall should add task', () => {
    let house = new House(1, '1234');
    let room = new Room(1, 'Room 1', 'image_url', house);
    const expectedTask: Task = new Task(1, 'Task 1', 10, room, false);
    const taskDTO = new TaskDto(expectedTask.name, expectedTask.initialPrice, expectedTask.room.id, expectedTask.done);

    service.addTaskCall(taskDTO).subscribe((actualTask: Task) => {
      expect(actualTask).toEqual(expectedTask);
    });

    let requests = httpTestingController.match('http://localhost:4200/api/tasks');
    expect(requests.length).toBe(1);
    requests = httpTestingController.match('http://localhost:4200/api/addTask');
    expect(requests.length).toBe(1);
  });

  it('#updateTaskCall should update task', () => {
    let taskId = 1
    let house = new House(1, '1234');
    let room = new Room(1, 'Room 1', 'image_url', house);
    const expectedTask: Task = new Task(taskId, 'Task 1', 10, room, false);
    const taskDTO = new TaskDto(expectedTask.name, expectedTask.initialPrice, expectedTask.room.id, expectedTask.done);

    service.updateTaskCall(taskId, taskDTO).subscribe((actualTask: Task) => {
      expect(actualTask).toEqual(expectedTask);
    });

    let requests = httpTestingController.match('http://localhost:4200/api/tasks');
    expect(requests.length).toBe(1);
    requests = httpTestingController.match('http://localhost:4200/api/updateTask?id='+taskId);
    expect(requests.length).toBe(1);
  });

  it('#deleteTaskCall should delete task', () => {
    let taskId = 1;

    service.deleteTaskCall(1).subscribe((actualTaskId: any) => {
      expect(actualTaskId).toEqual(taskId);
    });

    let requests = httpTestingController.match('http://localhost:4200/api/tasks');
    expect(requests.length).toBe(1);
    requests = httpTestingController.match('http://localhost:4200/api/task?id='+taskId);
    expect(requests.length).toBe(1);
  });

  it('#makeTaskDoneCall should make task done', () => {
    let taskId = 1;

    service.makeTaskDoneCall(1).subscribe((actualTaskId: any) => {
      expect(actualTaskId).toEqual(taskId);
    });

    let requests = httpTestingController.match('http://localhost:4200/api/tasks');
    expect(requests.length).toBe(1);
    requests = httpTestingController.match('http://localhost:4200/api/makeTaskDone?id=' + taskId);
    expect(requests.length).toBe(1);
  });

  it('#makeTaskToDoCall should make task todo', () => {
    let taskId = 1;

    service.makeTaskToDoCall(1).subscribe((actualTaskId: any) => {
      expect(actualTaskId).toEqual(taskId);
    });

    let requests = httpTestingController.match('http://localhost:4200/api/tasks');
    expect(requests.length).toBe(1);
    requests = httpTestingController.match('http://localhost:4200/api/makeTaskToDo?id=' + taskId);
    expect(requests.length).toBe(1);
  });

});


