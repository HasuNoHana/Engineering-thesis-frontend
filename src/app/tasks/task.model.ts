import {Room} from "../rooms/room.model";

export class Task {

  public id: number;
  public name: string;
  public initialPrice: number;
  public currentPrice: number;
  public room: Room;
  public done: boolean;
  public lastDoneDate: Date;
  public repetitionRateInDays: number;

  constructor(id: number, name: string, initialPrice: number, currentPrice: number, room: Room, done: boolean, lastDoneDate: Date, repetitionRateInDays: number) {
    this.id = id;
    this.name = name;
    this.initialPrice = initialPrice;
    this.currentPrice = currentPrice;
    this.room = room;
    this.done = done;
    this.lastDoneDate = lastDoneDate;
    this.repetitionRateInDays = repetitionRateInDays;
  }
}
