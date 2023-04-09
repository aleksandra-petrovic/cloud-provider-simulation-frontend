import { Injectable } from '@angular/core';
import { HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpParams } from '@angular/common/http';
import { catchError, interval, Observable, throwError } from 'rxjs';
import { ErrorMsg, Machine } from '../model';
import { DatePipe } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class MachinesService {

  private readonly apiUrl = environment.myAPI
  source = interval(1000)

  httpOptions = {
    headers: new HttpHeaders({
      Authorization: 'Bearer ' + localStorage.getItem('token')
    })
  };

  constructor(private httpClient: HttpClient) { }

  updateMachine(machineId: number, operation: string, date: string): Observable<any> {
    return this.httpClient.post<any>(`${this.apiUrl}/machines/update/${machineId}`, {
      operation: operation,
      date: date
    }, this.httpOptions);
  }

  createMachine(machineName: string){
    return this.httpClient.post<Machine>(`${this.apiUrl}/machines/create`, {
      machineName: machineName
    }, this.httpOptions);
  }

  destroyMachine(machineId: number){
    return this.httpClient.post<any>(`${this.apiUrl}/machines/destroy/${machineId}`, {}, this.httpOptions);
  }

  searchMachines(machineName: string, status: string[], dateFrom: string, dateTo: string): Observable<Machine[]> {
    return this.httpClient.post<Machine[]>(`${this.apiUrl}/machines/search`, {
      machineName: machineName,
      status: status,
      dateFrom: dateFrom,
      dateTo: dateTo
    }, this.httpOptions);
  }

  history(){
    return this.httpClient.get<ErrorMsg[]>(`${this.apiUrl}/machines/history`, this.httpOptions);
  }

}
