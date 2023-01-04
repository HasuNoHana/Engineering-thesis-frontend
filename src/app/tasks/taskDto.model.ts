export class TaskDto {

  public name: string;
  public price: number;
  public roomId: number;
  public done: boolean;

  constructor(name: string, price: number, roomId: number, done: boolean) {
    this.name = name;
    this.price = price;
    this.roomId = roomId;
    this.done = done;
  }
}
