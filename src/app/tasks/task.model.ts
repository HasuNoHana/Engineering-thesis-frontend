import {Room} from "../rooms/room.model";

export class Task {

  public id: number;
  public name: string;
  public price: number;
  public room: Room;
  public done: boolean;

  constructor(id: number, name: string, price: number, room: Room, done: boolean) {
    this.id = id;
    this.name = name;
    this.price = price;
    this.room = room;
    this.done = done;
  }
}
