import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Ressources } from '../model/ressources';

@Injectable({
  providedIn: 'root',
})
export class RessourcesService {
  private apiUrl = 'http://localhost:8080/api/v1/ressources'; // Replace with your API URL

  constructor(private http: HttpClient) {}

  getRessourcesByService(serviceId: number): Observable<Ressources[]> {
    return this.http.get<Ressources[]>(
      `${this.apiUrl}/getressourcesbyservice/${serviceId}`
    );
  }

  uploadImage(file: any, serviceId: number): Observable<any> {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('serviceId', serviceId.toString());

    return this.http.post<any>(`${this.apiUrl}/uploadimage`, formData);
  }

  getAllRessources(): Observable<any> {
    return this.http.get(`${this.apiUrl}/getallressource`);
  }

  deleteRessources(id: any): Observable<any> {
    return this.http.delete(`${this.apiUrl}/deleteressource/${id}`);
  }
}
