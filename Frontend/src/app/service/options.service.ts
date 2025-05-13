import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

const BASIC_URL = 'http://localhost:8080/api/specialite';

@Injectable({
  providedIn: 'root',
})
export class OptionsService {
  constructor(private http: HttpClient) {}
  getAllOptions(): Observable<any> {
    return this.http.get(BASIC_URL);
  }
  getOptionById(optionId: number): Observable<any> {
    return this.http.get(BASIC_URL + `/${optionId}`);
  }

  addSpecialite(option: any, PDF: any): Observable<any> {
    const formData = new FormData();
    formData.append('specialite', JSON.stringify(option));
    formData.append('PDF', PDF);
    return this.http.post(BASIC_URL, formData);
  }

  removeSpecialite(id: number): Observable<any> {
    return this.http.delete(BASIC_URL + '/remove/' + id);
  }
  modifySpecialite(option: any): Observable<any> {
    return this.http.put(BASIC_URL + '/modify', option);
  }

  calculeScore(list: any, moyGen: any): Observable<any> {
    return this.http.post(
      BASIC_URL + '/calcule-score?moyenneGeneral=' + moyGen,
      list
    );
  }
}
