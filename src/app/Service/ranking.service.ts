import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class RankingService {

  constructor(private httpClient: HttpClient) { }

  fixedPlayers(): Observable<any> {
    return this.httpClient.get<any>('http://localhost:8080/api/' + "fixed-players")
      .pipe(
        retry(2)
      )
  };

  insertPlayer(player: any): Observable<any> {
    return this.httpClient.post<any>('http://localhost:8080/api/' + "new-player", player)
      .pipe(
        retry(2)
      )
  };

  changePlayer(id: any, player: any): Observable<any> {
    return this.httpClient.put<any>('http://localhost:8080/api/' + id, player)
      .pipe(
        retry(2)
      )
  };

  deletePlayer(id: any): Observable<any> {
    return this.httpClient.delete<any>('http://localhost:8080/api/' + id)
      .pipe(
        retry(2)
      )
  };


}


