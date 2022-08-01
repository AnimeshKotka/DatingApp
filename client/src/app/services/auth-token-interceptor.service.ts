import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { exhaustMap, Observable, take } from "rxjs";
import { AccountService } from ".";

@Injectable()
export class AuthTokenInterceptor implements HttpInterceptor {

  constructor(private authService: AccountService) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return this.authService.currentUser$.pipe(take(1), exhaustMap(user => {
      if (!user) {
        return next.handle(req);
      }
      let modifiedReq = req.clone({
        headers: req.headers.append('auth', user.token),
      })
      return next.handle(modifiedReq);

    }))
  }

}
