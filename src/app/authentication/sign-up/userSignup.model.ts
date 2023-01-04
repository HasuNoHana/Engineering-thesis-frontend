
export class UserSignup {

  public username: string;
  public password: string;
  public houseJoinCode: string;

  constructor(username: string, password: string, houseJoinCode: string) {
    this.username = username;
    this.password = password;
    this.houseJoinCode = houseJoinCode;
  }
}
