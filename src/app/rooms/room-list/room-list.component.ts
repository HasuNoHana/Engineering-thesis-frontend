import {Component} from '@angular/core';
import {Room} from "../room";

@Component({
  selector: 'app-room-list',
  templateUrl: './room-list.component.html'
})
export class RoomListComponent {

  rooms: Room[] = [
    new Room("Kuchnia", 'https://upload.wikimedia.org/wikipedia/commons/b/b8/L_K%C3%BCche_2015.jpg'),
    new Room("Kuchnia", 'https://upload.wikimedia.org/wikipedia/commons/b/b8/L_K%C3%BCche_2015.jpg'),
    new Room("Łazienka", 'https://upload.wikimedia.org/wikipedia/commons/8/8a/Bathroom_with_tub_and_fireplace_%28Pleasure_Point_Roadhouse%2C_Monterey_Bay%2C_California_-_30_September%2C_2002%29.jpg'),
    new Room("Łazienka", 'https://upload.wikimedia.org/wikipedia/commons/8/8a/Bathroom_with_tub_and_fireplace_%28Pleasure_Point_Roadhouse%2C_Monterey_Bay%2C_California_-_30_September%2C_2002%29.jpg'),
    new Room("Łazienka", 'https://upload.wikimedia.org/wikipedia/commons/8/8a/Bathroom_with_tub_and_fireplace_%28Pleasure_Point_Roadhouse%2C_Monterey_Bay%2C_California_-_30_September%2C_2002%29.jpg'),
  ]
}
