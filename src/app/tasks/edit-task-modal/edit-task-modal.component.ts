import {Component, ElementRef, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {ModalInformationService} from "../../shared/modal-information.service";
import {Room} from "../../rooms/room.model";
import {RoomService} from "../../rooms/room.service";
import {Task, TaskBuilder} from "../task.model";
import {debugLog, debugLogOnlyMessage} from "../../app.component";
import {TaskService} from "../task.service";

@Component({
  selector: 'app-edit-task-modal',
  templateUrl: './edit-task-modal.component.html'
})
export class EditTaskModalComponent implements OnInit, OnDestroy {
  closeResult = '';
  taskForm: FormGroup;
  @ViewChild("content",{static:true}) content:ElementRef;

  acceptMessage: string;
  header: string;

  rooms: Room[];
  task: Task | undefined;
  room: Room | undefined;

  subscriptions: Array<any> = [];


  constructor(private modalService: NgbModal,
              private modalInformationService: ModalInformationService,
              private roomService: RoomService,
              private taskService: TaskService) { }

  ngOnDestroy() {
    this.subscriptions.forEach(subscription => subscription.unsubscribe())
  }

  ngOnInit(): void {
    this.rooms = this.roomService.getRooms();
    this.roomService.roomsChanged.subscribe((rooms: Room[]) => {
      this.rooms = rooms;
    })

    this.subscribeToEditModalEvent();
    this.subscribeToNewModalEvent();
    this.subscribeToDetailModalEvent();
  }

  private subscribeToDetailModalEvent() {
    this.subscriptions.push(this.modalInformationService.newTaskDetailSignal.subscribe((roomId: number) => {
      this.header = "Stwórz nowe zadanie"
      this.acceptMessage = "Stwórz zadanie"
      let foundRoom = this.roomService.getRoom(roomId);
      if (foundRoom === undefined) {
        debugLogOnlyMessage("Room with id " + roomId + " not found")
      }
      this.room = foundRoom;
      debugLog("adding task to room: ", this.room)
      this.initFormWithRoom();
      this.open(this.content)
    }))
  }

  private subscribeToNewModalEvent() {
    this.subscriptions.push(this.modalInformationService.newTaskSignal.subscribe((_: any) => {
      this.header = "Stwórz nowe zadanie"
      this.acceptMessage = "Stwórz zadanie"
      debugLogOnlyMessage("open new task modal")
      this.initFormEmpty();
      this.open(this.content)
    }))
  }

  private subscribeToEditModalEvent() {
    this.subscriptions.push(this.modalInformationService.editTaskSignal.subscribe((task: Task) => {
      this.header = "Zmień istniejące zadanie"
      this.acceptMessage = "zmień zadanie"
      this.task = task;
      debugLog("edit task modal received task with id: ", task.id)
      this.initFormWithTask();
      this.open(this.content)
    }))
  }

  open(content:any) {
    debugLogOnlyMessage("opening modal")
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' }).result.then(
      (result) => {
        let room = this.roomService.getRoomByName(this.taskForm.value['roomName'])
        let taskBuilder: TaskBuilder = new TaskBuilder()
          .setName(this.taskForm.value['name'])
          .setInitialPrice(this.taskForm.value['initialPrice'])
          .setRepetitionRateInDays(this.taskForm.value['repetitionRateInDays'])
          .setRoom(room)

        if(this.task) {
          let t:Task = taskBuilder
            .setId(this.task.id)
            .setDone(this.task.done)
            .setCurrentPrice(this.task.currentPrice)
            .setLastDoneDate(this.task.lastDoneDate)
            .setPreviousLastDoneDate(this.task.previousLastDoneDate)
            .setLastDoneUserId(this.task.lastDoneUserId)
            .setPreviousLastDoneUserId(this.task.previousLastDoneUserId)
            .build()

          debugLog("Task to be edited: ", t);
          this.resetModal();
          this.taskService.updateTask(t);
        } else {
          let t:Task = taskBuilder.build()
          debugLog("Task to be added: ", t);
          this.resetModal();
          this.taskService.addTask(t);
        }
      },
      (reason) => {
      },
    );
  }

  private initFormEmpty() {
    let taskName = '';
    let taskInitialPrice: number = 10;
    let taskRoomName: string = '';
    let repetitionRateInDays: number = 7;

    this.taskForm = new FormGroup({
      'name': new FormControl(taskName, Validators.required),
      'initialPrice': new FormControl(taskInitialPrice,
        [Validators.required, Validators.min(1), Validators.pattern(/^-?\d+$/)]),
      'roomName': new FormControl(taskRoomName, Validators.required),
      'repetitionRateInDays': new FormControl(repetitionRateInDays,
        [Validators.required, Validators.min(1), Validators.pattern(/^-?\d+$/)])
    });
  }

  private initFormWithTask() {
    if(this.task === undefined) {
      return;
    }
    let taskName = this.task.name;
    let taskInitialPrice = this.task.initialPrice;
    let taskRoomName = this.task.room.name;
    let defaultRoomName = taskRoomName;
    let repetitionRateInDays = this.task.repetitionRateInDays;

    this.taskForm = new FormGroup({
      'name': new FormControl(taskName, Validators.required),
      'initialPrice': new FormControl(taskInitialPrice,
        [Validators.required, Validators.min(1), Validators.pattern(/^-?\d+$/)]),
      'roomName': new FormControl(taskRoomName, Validators.required),
      'repetitionRateInDays': new FormControl(repetitionRateInDays,
        [Validators.required, Validators.min(1), Validators.pattern(/^-?\d+$/)])
    });
    this.taskForm.controls['roomName'].setValue(defaultRoomName, {onlySelf: true});
  }

  private initFormWithRoom() {
    let taskName = '';
    let taskInitialPrice: number = 10;
    let repetitionRateInDays: number = 7;
    let taskRoomName = this.room?.name;
    let defaultRoomName = this.room?.name ?? "";

    this.taskForm = new FormGroup({
      'name': new FormControl(taskName, Validators.required),
      'initialPrice': new FormControl(taskInitialPrice,
        [Validators.required, Validators.min(1), Validators.pattern(/^-?\d+$/)]),
      'roomName': new FormControl(taskRoomName, Validators.required),
      'repetitionRateInDays': new FormControl(repetitionRateInDays,
        [Validators.required, Validators.min(1), Validators.pattern(/^-?\d+$/)])
    });
    this.taskForm.controls['roomName'].setValue(defaultRoomName, {onlySelf: true});
  }

  private resetModal() {
    this.task = undefined;
  }
}
