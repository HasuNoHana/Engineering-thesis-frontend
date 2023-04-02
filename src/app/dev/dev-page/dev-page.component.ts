import {Component} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {debugLogOnlyMessage} from "../../app.component";
import {HouseService} from "../../houses/house.service";

@Component({
  selector: 'app-dev-page',
  templateUrl: './dev-page.component.html'
})
export class DevPageComponent {

  constructor(private http: HttpClient,
              private houseService: HouseService) {
  }

  undoneTask() {
    this.http.get<string>('http://localhost:8080/api/dev/undoneTask', {withCredentials: true})
      .subscribe((answer: string) => {
        console.log("answer")
        debugLogOnlyMessage("dupa")
        this.houseService.fetchData();
      }, error => {
        this.houseService.fetchData();
      });

  }

  getTaxes() {
    this.http.get<string>('http://localhost:8080/api/dev/getTaxes', {withCredentials: true})
      .subscribe((answer: string) => {
        console.log("answer")
        debugLogOnlyMessage("dupa")
        this.houseService.fetchData();
      }, error => {
        this.houseService.fetchData();
      })

  }
}
