export class UserDTO {
  username: string
  points: number
  range: number
  image: string

  constructor(username: string, points: number, range: number, image: string) {
    this.username = username;
    this.points = points;
    this.range = range;
    this.image = image;
  }
}
