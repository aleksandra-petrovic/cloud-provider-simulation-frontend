import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { catchError, Observable, throwError} from 'rxjs';
import { environment } from 'src/environments/environment';
import { User } from '../model';
import { HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class EditUserService {

  private readonly apiUrl = environment.myAPI

  httpOptions = {
    headers: new HttpHeaders({
      Authorization: 'Bearer ' + localStorage.getItem('token')
    })
  };

  constructor(private httpClient: HttpClient) { }

  editUser(userId: number, name: string, surname: string, email: string, permissions: string[]): Observable<User> {
    return this.httpClient.post<User>(`${this.apiUrl}/home/users/edit-user/${userId}`, {
      name: name,
      surname: surname,
      email: email,
      permissions: permissions
    }, this.httpOptions)
 
   }


   getUser(userId: number): Observable<User> {
    return this.httpClient.get<User>(`${this.apiUrl}/home/users/edit-user/${userId}`, this.httpOptions);
  }
  
}
