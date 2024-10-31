import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

const BASIC_URL = 'http://localhost:8080/';

@Injectable({
  providedIn: 'root',
})
export class RendezvousService {
  constructor(private http: HttpClient) {}
  getRendezVousById(rendezVousID: number): Observable<any> {
    return this.http.get(
      BASIC_URL + `api/rendezvous/retrieve-rendezvous/${rendezVousID}`
    );
  }

  addRendezVous(rendezVous: any): Observable<any> {
    return this.http.post(
      BASIC_URL + `api/rendezvous/add-rendez-vous`,
      rendezVous
    );
  }
}
