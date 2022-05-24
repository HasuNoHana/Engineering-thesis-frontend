export class Room {
  public id: number;
  public name: string;
  public image: string;

  constructor(id: number, name: string, img: string) {
    this.id = id;
    this.name = name;
    this.image = img;
  }
}
