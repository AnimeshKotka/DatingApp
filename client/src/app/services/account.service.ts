import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, map, Observable, ReplaySubject } from 'rxjs';
import { UserModel } from '../models';

@Injectable({
  providedIn: 'root'
})
export class AccountService {

  private readonly baseUrl: string = "https://localhost:7195/api";
  private currentUser: ReplaySubject<UserModel> = new ReplaySubject<UserModel>(1);
  public currentUser$ = this.currentUser.asObservable();

  constructor(private http: HttpClient) { }

  public login(model: UserModel): Observable<UserModel> {
    return this.http.post<UserModel>(`${this.baseUrl}/account/login`, model).pipe(
      map((res: UserModel) => {
        const user = res;
        if (user) {
          localStorage.setItem("user", JSON.stringify(user));
          this.currentUser.next(user);
        }
        return user;
      })
    );
  }

  public register(model: UserModel): Observable<UserModel> {
    return this.http.post<UserModel>(`${this.baseUrl}/account/register`, model).pipe(
      map((res: UserModel) => {
        if (res) {
          localStorage.setItem("user", JSON.stringify(res));
          this.currentUser.next(res);
        }
        return res;
      })
    )
  }

  public setCurrentUser(user: UserModel) {
    this.currentUser.next(user);
  }

  public logout() {
    localStorage.removeItem("user");
    this.currentUser.next(null);
  }
}
