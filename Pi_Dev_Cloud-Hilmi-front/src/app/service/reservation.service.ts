import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Reservation } from '../model/Reservation';

@Injectable({
  providedIn: 'root',
})
export class ReservationService {
  private apiUrl = 'http://localhost:8080/api/reservation/';
  private apiBase = 'http://localhost:8080/api/evenement/';
  private apiServer: string = 'http://localhost:8080/api/reservation/';
  private baseURL: string = 'http://127.0.0.1:8080/api/user/';

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    }),
  };
  constructor(private http: HttpClient) {}

  addReservationAndAssignEvent(
    reservation: Reservation,
    idEvent: number
  ): Observable<Reservation> {
    return this.http.post<Reservation>(
      `${this.apiUrl}assign/${idEvent}`,
      reservation
    );
  }

  getEvent(idEvent: number): Observable<Event> {
    const url = `${this.apiBase + 'get'}/${idEvent}`;
    return this.http.get<Event>(url, this.httpOptions);
  }
  reserve(eventId: number, reservation: any): Observable<any> {
    return this.http.post(`${this.apiUrl}reserve/${eventId}`, reservation);
  }
  getAllReservation(): Observable<Reservation[]> {
    return this.http.get<[Reservation]>(
      this.apiServer + 'getAlll',
      this.httpOptions
    );
  }

  deleteReservation(id: number) {
    const url = `${this.apiServer}delete/${id}`;
    return this.http.delete(url, this.httpOptions);
  }

  addReservation(reservation: Reservation) {
    return this.http.post<Reservation>(
      this.apiServer + 'add',
      reservation,
      this.httpOptions
    );
  }

  updateReservation(reservation: Reservation) {
    return this.http.put<Reservation>(
      this.apiServer + 'update',
      reservation,
      this.httpOptions
    );
  }

  getReservationById(idReserv: number): Observable<Reservation> {
    const url = `${this.baseURL + 'get'}/${idReserv}`;
    return this.http.get<Reservation>(url, this.httpOptions);
  }

  exportUniversitesPdf(): Observable<Blob> {
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/pdf' }),
      responseType: 'blob' as 'json', // Spécifiez le type de réponse en tant que blob
    };

    return this.http.get<Blob>(this.apiServer + 'pdf', httpOptions);
  }

  getMonthlyReservationCounts(year: number) {
    return this.http.get(`${this.apiServer}statistics/${year}`);
  }
  statEnseignatParSpecialite(): Observable<any> {
    return this.http.get<any>(`${this.apiServer}statReservationParEvent`);
  }
}
