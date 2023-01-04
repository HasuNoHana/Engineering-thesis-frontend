export class RoomDto {
  public name: string;
  public image: string;

  constructor(name: string, img: string) {
    this.name = name;
    this.image = img;
  }
}
