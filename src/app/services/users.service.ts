import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { catchError, interval, Observable, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { User } from '../model';
import { HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  private readonly apiUrl = environment.myAPI
  source = interval(1000)

  httpOptions = {
    headers: new HttpHeaders({
      Authorization: 'Bearer ' + localStorage.getItem('token')
    })
  };

  constructor(private httpClient: HttpClient) { }


  getUsers(): Observable<User[]> {
    return this.httpClient.get<User[]>(`${this.apiUrl}/home/users`,this.httpOptions);
  }

  deleteUser(userId: number): Observable<unknown> {
    const url = `${this.apiUrl}/home/users/${userId}`;
    return this.httpClient.delete(url, this.httpOptions);
  }

}
