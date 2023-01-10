export class User {
  id: number
  username: string
  points: number
  range: number
  image: string

  constructor(id: number, username: string, points: number, range: number, image: string) {
    this.username = username;
    this.points = points;
    this.range = range;
    this.image = image;
  }
}
