export class Room {
  public id: number;
  public name: string;
  public image: string;
  public tasksNotDone: number;

  constructor(id: number, name: string, img: string, tasksNotDone: number) {
    this.id = id;
    this.name = name;
    this.image = img;
    this.tasksNotDone = tasksNotDone;
  }
}
