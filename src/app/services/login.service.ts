import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { LoginRequest, LoginResponse } from '../model';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  private readonly apiUrl = environment.myAPI
  private permissions: string[] = [];

  constructor(private httpClient: HttpClient) { }

  loginUser(username: string, password: string): Observable<LoginResponse> {
    return this.httpClient.post<LoginResponse>(`${this.apiUrl}/auth/login`, {
      username: username,
      password: password
    });
  }

}
