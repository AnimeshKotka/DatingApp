import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { BehaviorSubject, catchError, map, Observable, ReplaySubject, tap, throwError } from 'rxjs';
import HelperUtils from '../Common/utils/helper-utils';
import { UserModel } from '../models';

@Injectable({
  providedIn: 'root'
})
export class AccountService {

  private readonly baseUrl: string = "https://localhost:7195/api";
  private currentUser: ReplaySubject<UserModel> = new ReplaySubject<UserModel>(1);
  public currentUser$ = this.currentUser.asObservable();
  private clearTimer: any;

  constructor(private http: HttpClient,
    private toastr: ToastrService,
    private router: Router) { }

  public login(model: UserModel): Observable<UserModel> {
    return this.http.post<UserModel>(`${this.baseUrl}/account/login`, model).pipe(
      tap(this.handleUsers.bind(this))
    );
  }

  public register(model: UserModel): Observable<UserModel> {
    return this.http.post<UserModel>(`${this.baseUrl}/account/register`, model).pipe(
      tap(this.handleUsers.bind(this))
    )
  }

  public setCurrentUser(user: UserModel) {
    this.currentUser.next(user);
  }

  public logout() {
    localStorage.removeItem("user");
    this.currentUser.next(null);
    this.router.navigateByUrl('/');
    if (this.clearTimer) {
      clearTimeout(this.clearTimer);
    }
  }

  public autoLogout(expiryDate: number) {
    console.log(expiryDate, new Date().getTime());

    this.clearTimer = setTimeout(() => {
      this.logout();
    }, expiryDate)
  }



  //#region Handle User Data

  private handleUsers(res: UserModel) {
    if (res) {
      const expiryIn = new Date(new Date().getTime() + +HelperUtils.getExpiryDate(res)).getTime();
      res.expiryIn = expiryIn;
      localStorage.setItem("user", JSON.stringify(res));
      this.currentUser.next(res);

      this.autoLogout(HelperUtils.getExpiryDate(res));
    }
  }
  //#endregion

}
