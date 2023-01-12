export class HouseBuddy {
  id: number
  firewoodStackSize: number
  weeklyFirewoodContribution: number
  avatarImageUrl: string

  constructor(id: number, firewoodStackSize: number, weeklyFirewoodContribution: number, avatarImageUrl: string) {
    this.id = id;
    this.firewoodStackSize = firewoodStackSize;
    this.weeklyFirewoodContribution = weeklyFirewoodContribution;
    this.avatarImageUrl = avatarImageUrl;
  }
}
