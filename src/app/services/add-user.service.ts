import { Injectable, ɵgetUnknownElementStrictMode } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { User } from '../model';
import { HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AddUserService {

  private readonly apiUrl = environment.myAPI
  
  httpOptions = {
    headers: new HttpHeaders({
      Authorization: 'Bearer ' + localStorage.getItem('token')
    })
  };

  constructor(private httpClient: HttpClient) { }
  
  addUser(name: string, surname: string, email: string, password: string, permissions: string []): Observable<User> {
    return this.httpClient.post<User>(`${this.apiUrl}/home/users/add-user`, {
      name: name,
      surname: surname,
      email: email,
      password: password,
      permissions: permissions
    }, this.httpOptions);
  }

}
