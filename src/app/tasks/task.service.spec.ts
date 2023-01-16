import {HttpClient} from '@angular/common/http';
import {TestBed} from '@angular/core/testing';
import {createSpyFromClass, Spy} from 'jasmine-auto-spies';
import {TaskService} from "./task.service";
import {House} from "../houses/house.model";
import {Room} from "../rooms/room.model";
import {Task, TaskBuilder} from "./task.model";

describe('CustomersService', () => {
  let service: TaskService;
  let httpSpy: Spy<HttpClient>;

  let house = new House(1, '1234');
  let room = new Room(1, 'Room 1', 'image_url', house);
  let room2 = new Room(2, 'Room 2', 'image_url_2', house);

  let expectedTask: Task = new TaskBuilder().setId(1).setName('Task 1').setDone(false).setInitialPrice(10)
      .setCurrentPrice(10).setRoom(room).setLastDoneDate(new Date()).setRepetitionRateInDays(7).build();
  let task2: Task = new TaskBuilder().setId(2).setName('Task 2').setDone(false).setInitialPrice(20)
      .setCurrentPrice(20).setRoom(room2).setLastDoneDate(new Date()).setRepetitionRateInDays(1).build();

  const expectedTasks: Task[] =
    [expectedTask, task2];

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        TaskService,
        { provide: HttpClient, useValue: createSpyFromClass(HttpClient) }
      ]
    });

    service = TestBed.inject(TaskService);
    httpSpy = TestBed.inject<any>(HttpClient);
  });

  it('should return an expected list of customers', (done: DoneFn) => {
    httpSpy.get.and.nextWith(expectedTasks);

    service.fetchTasksCall().subscribe(
      actualTasks => {
        expect(actualTasks).toHaveSize(expectedTasks.length);
        expect(actualTasks).toEqual(expectedTasks);
        done();
      },
      done.fail
    );

    expect(httpSpy.get.calls.count()).toBe(1);
    expect(httpSpy.get).toHaveBeenCalledOnceWith('http://localhost:4200/api/tasks',
      Object({ withCredentials: true }));
  });

  it('#addTaskCall should add task', (done: DoneFn) => {
    httpSpy.post.and.nextWith(expectedTask);

    service.addTaskCall(expectedTask).subscribe((actualTask: Task) => {
      expect(actualTask).toEqual(expectedTask);
        done();
      },
      done.fail
    );

    expect(httpSpy.post.calls.count()).toBe(1);
    expect(httpSpy.post).toHaveBeenCalledOnceWith('http://localhost:4200/api/addTask', expectedTask,
      Object({ withCredentials: true }));
  });

  it('#updateTaskCall should update task', (done: DoneFn) => {
    httpSpy.post.and.nextWith(expectedTask);

    service.updateTaskCall(expectedTask).subscribe((actualTask: Task) => {
        expect(actualTask).toEqual(expectedTask);
        done();
      },
      done.fail
    );

    expect(httpSpy.post.calls.count()).toBe(1);
    expect(httpSpy.post).toHaveBeenCalledOnceWith('http://localhost:4200/api/updateTask', expectedTask,
      Object({withCredentials: true}));
  });

  it('#deleteTaskCall should delete task', (done: DoneFn) => {
    let taskId = 1;
    httpSpy.delete.and.nextWith(taskId);

    service.deleteTaskCall(1).subscribe((actualTaskId: any) => {
      expect(actualTaskId).toEqual(taskId);
        done();
      },
      done.fail
    );

    expect(httpSpy.delete.calls.count()).toBe(1);
    expect(httpSpy.delete).toHaveBeenCalledOnceWith('http://localhost:4200/api/task?id=' + taskId,
      {withCredentials: true});
  });

  //
  it('#makeTaskDoneCall should make task done', (done: DoneFn) => {
    let taskId = 1;
    httpSpy.post.and.nextWith(taskId);

    service.makeTaskDoneCall(1).subscribe((actualTaskId: any) => {
      expect(actualTaskId).toEqual(taskId);
        done();
      },
      done.fail
    );

    expect(httpSpy.post.calls.count()).toBe(1);
    expect(httpSpy.post).toHaveBeenCalledOnceWith('http://localhost:4200/api/makeTaskDone?id=' + taskId,
      {withCredentials: true});
  });

  it('#makeTaskToDoCall should make task todo', (done: DoneFn) => {
    let taskId = 1;
    httpSpy.post.and.nextWith(taskId);

    service.makeTaskToDoCall(1).subscribe((actualTaskId: any) => {
      expect(actualTaskId).toEqual(taskId);
        done();
      },
      done.fail
    );

    expect(httpSpy.post.calls.count()).toBe(1);
    expect(httpSpy.post).toHaveBeenCalledOnceWith('http://localhost:4200/api/makeTaskToDo?id=' + taskId,
      {withCredentials: true});
  });

});


