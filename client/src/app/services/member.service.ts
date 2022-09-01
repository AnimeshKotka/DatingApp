import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { MemberDto } from '../models';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class MembersService {
  private readonly baseUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }

  getMembers(): Observable<MemberDto[]> {
    return this.http.get<MemberDto[]>(this.baseUrl + '/users');
  }

  getMember(username: string): Observable<MemberDto> {
    return this.http.get<MemberDto>(this.baseUrl + 'users/' + username);
  }
}
