import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'Dating App';
  public users: any[] = [];

  constructor(private http: HttpClient) { }
  ngOnInit() {
    this.getUsers();
  }

  private getUsers() {
    this.http.get('https://localhost:7195/api/Users').subscribe((res: any[]) => {
      this.users = res;
    })
  }
}
