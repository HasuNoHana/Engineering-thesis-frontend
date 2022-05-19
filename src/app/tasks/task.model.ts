
export class Task {

  public id: number;
  public name: string;
  public price: number;
  public done: boolean;

  constructor(id: number, name: string, price: number, done: boolean) {
    this.id = id;
    this.name = name;
    this.price = price;
    this.done = done;
  }
}
