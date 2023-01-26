export class HouseBuddy {
  id: number
  currentPoints: number
  weeklyContribution: number
  avatarImageUrl: string

  constructor(id: number, firewoodStackSize: number, weeklyFirewoodContribution: number, avatarImageUrl: string) {
    this.id = id;
    this.currentPoints = firewoodStackSize;
    this.weeklyContribution = weeklyFirewoodContribution;
    this.avatarImageUrl = avatarImageUrl;
  }
}
