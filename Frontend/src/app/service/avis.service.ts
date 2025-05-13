import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, catchError, throwError } from 'rxjs';
import { Avis } from '../model/Avis';

@Injectable({
  providedIn: 'root',
})
export class AvisService {
  private apiUrl = 'http://localhost:8080/Avis/';
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    }),
  };
  constructor(private http: HttpClient) {}

  addAvisAndAssignEvent(avis: Avis, idEvent: number): Observable<any> {
    return this.http.post<Avis>(`${this.apiUrl}assign/${idEvent}`, avis).pipe(
      catchError((error) => {
        console.error('Error adding comment:', error);

        if (error && error.error && error.error.message) {
          const errorMessage = error.error.message.toLowerCase();

          if (
            errorMessage.includes('inappropriate content') ||
            errorMessage.includes('should not be posted')
          ) {
            // Replace the generic error message with your custom message
            const customErrorMessage =
              'Comment contains inappropriate content or contains a subject that should not be posted here. Please review your comment before submitting.';
            console.error('Server error message:', customErrorMessage);
            return throwError(customErrorMessage);
          }
        }

        return throwError(error);
      })
    );
  }

  //---------------------Filter badword----------------------

  containsBadWord(inputString: string): Observable<boolean> {
    return this.http.post<boolean>(`${this.apiUrl}/checkBadWord`, {
      inputString,
    });
  }

  getEvent(idEvent: number): Observable<Event> {
    const url = `${this.apiUrl + 'get'}/${idEvent}`;
    return this.http.get<Event>(url, this.httpOptions);
  }

  //containsBadWord(inputString: string): Observable<boolean> {
  //return this.http.post<boolean>(`${this.baseUrl}/checkBadWord`, { inputString });
  //}

  getAvisByEvent(idEvent: number): Observable<any> {
    const url = `${this.apiUrl + 'retrieve-avis-by-event'}/${idEvent}`;
    return this.http.get<any>(url, this.httpOptions);
  }
}
