import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};
const apiUrl = "https://aprims.herokuapp.com/";

@Injectable({
  providedIn: 'root'
})
export class MaillingService {

  constructor(private http: HttpClient) { }
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      console.error(error); // log to console instead

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

  sendmail(): Observable<any> {
    const url = `${apiUrl}`;
    return this.http.post(url , httpOptions).pipe(
      tap(_ => console.log(`mail sent `)),
      catchError(this.handleError<any>('sent'))
    );
  }
}
