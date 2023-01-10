import {House} from "../houses/house.model";

export class Room {
  public id: number;
  public name: string;
  public image: string;
  public house: House;

  constructor(id: number, name: string, img: string, house: House) {
    this.id = id;
    this.name = name;
    this.image = img;
    this.house = house;
  }
}
