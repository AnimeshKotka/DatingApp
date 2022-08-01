import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import HelperUtils from './Common/utils/helper-utils';
import { UserModel } from './models';
import { AccountService } from './services';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'Dating App';
  public users: any[] = [];

  constructor(private accountService: AccountService) { }
  ngOnInit() {
    this.setCurrentUser();
  }

  setCurrentUser() {
    const user: UserModel = JSON.parse(localStorage.getItem('user'));
    if (HelperUtils.isTokenValid(user)) {
      this.accountService.setCurrentUser(user);

      this.accountService.autoLogout(user.expiryIn - HelperUtils.getExpiryDate(user));
    } else {
      this.accountService.logout();
    }
  }
}
