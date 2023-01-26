export class HouseBuddy {
  id: number
  username: string
  currentPoints: number
  weeklyContribution: number
  avatarImageUrl: string

  constructor(id: number, username: string, currentPoints: number, weeklyContribution: number, avatarImageUrl: string) {
    this.id = id;
    this.username = username;
    this.currentPoints = currentPoints;
    this.weeklyContribution = weeklyContribution;
    this.avatarImageUrl = avatarImageUrl;
  }
}
