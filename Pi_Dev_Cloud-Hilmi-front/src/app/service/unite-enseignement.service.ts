import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
const BASIC_URL = 'http://localhost:8080/api/uniteEnseignement';

@Injectable({
  providedIn: 'root',
})
export class UniteEnseignementService {
  constructor(private http: HttpClient) {}

  getAllUniteEnseignements(): Observable<any> {
    return this.http.get(BASIC_URL);
  }
  getUniteEnseignementById(uniteEnseignementId: number): Observable<any> {
    return this.http.get(BASIC_URL + `/${uniteEnseignementId}`);
  }

  addUniteEnseignement(uniteEnseignement: any): Observable<any> {
    return this.http.post(BASIC_URL, uniteEnseignement);
  }

  removeUniteEnseignement(id: number): Observable<any> {
    return this.http.delete(BASIC_URL + '/remove/' + id);
  }
  modifyUniteEnseignement(uniteEnseignement: any): Observable<any> {
    return this.http.put(BASIC_URL + '/modify', uniteEnseignement);
  }
}
