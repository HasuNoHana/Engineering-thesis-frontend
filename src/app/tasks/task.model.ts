import {Room} from "../rooms/room.model";

export class Task {

  public id: number;
  public name: string;
  public initialPrice: number;
  public room: Room;
  public done: boolean;

  constructor(id: number, name: string, currentPrice: number, room: Room, done: boolean) {
    this.id = id;
    this.name = name;
    this.initialPrice = currentPrice;
    this.room = room;
    this.done = done;
  }
}
