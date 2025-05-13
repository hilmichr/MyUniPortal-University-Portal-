import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class EvenementService {
  private apiUrl = 'http://localhost:8080/api/evenement/';
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    }),
  };
  constructor(private http: HttpClient) {}

  getAllEvent(): Observable<Event[]> {
    return this.http.get<Event[]>(this.apiUrl + 'getAll', this.httpOptions);
  }

  getEvent(idEvent: number): Observable<Event> {
    const url = `${this.apiUrl + 'get'}/${idEvent}`;
    return this.http.get<Event>(url, this.httpOptions);
  }

  getEventsByUserOrderByParticipation(userId: number): Observable<Event[]> {
    return this.http.get<Event[]>(`${this.apiUrl}eventsByUser/${userId}`);
  }

  countAvisByStatus(id: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}${id}/countAvisByStatus`);
  }
}
