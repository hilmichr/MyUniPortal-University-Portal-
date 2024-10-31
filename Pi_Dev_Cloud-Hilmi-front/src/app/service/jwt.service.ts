// src/app/services/jwt.service.ts

import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

const BASE_URL = 'http://localhost:8080/';

@Injectable({
  providedIn: 'root',
})
export class JwtService {
  private baseUrl = 'http://localhost:8080/';

  constructor(private http: HttpClient) {}

  login(credentials: { email: string; password: string }): Observable<any> {
    return this.http.post(`${this.baseUrl}user/auth`, credentials);
  }
  saveToken(token: string): void {
    localStorage.setItem('jwtToken', token);
  }

  getToken(): string | null {
    return localStorage.getItem('jwtToken');
  }

  isLoggedIn(): boolean {
    return !!this.getToken();
  }

  logout(): Observable<void> {
    const jwtToken = this.getToken();
    console.log(jwtToken);
    console.log(`${this.baseUrl}user/logout/${jwtToken}`);

    return this.http.post<void>(`${this.baseUrl}user/logout/${jwtToken}`, {});
  }

  clearToken(): void {
    localStorage.removeItem('jwtToken');
  }

  createAuthorizationHeader(): HttpHeaders {
    const jwtToken = this.getToken();
    return new HttpHeaders({ Authorization: `Bearer ${jwtToken}` });
  }
  register(signRequest: any): Observable<any> {
    return this.http.post(BASE_URL + 'user/add-User', signRequest);
  }
  getAllUser(): Observable<any> {
    return this.http.get(BASE_URL + 'user/retrieve-all-Users');
  }

  modifyEtatUser(userId: any, etat: any): Observable<any> {
    const formData = new FormData();
    formData.append('userId', userId);
    formData.append('etat', etat);
    return this.http.put(`${BASE_URL}user/modify-etat-User`, formData);
  }

  deleteUser(id: number): Observable<any> {
    return this.http.delete(BASE_URL + `user/remove-User/${id}`);
  }
  updateUser(user: any): Observable<any> {
    return this.http.put(`${BASE_URL}user/modify-User`, user);
  }
  getUserById(id: any): Observable<any> {
    return this.http.get(`${BASE_URL}user/retrieve-User/${id}`);
  }

  sendVerificationCode(email: string): Observable<any> {
    return this.http.post(
      `${this.baseUrl}user/send-verification-code/${email}`,
      {},
      { responseType: 'text' }
    );
  }
  verifyCode(email: string, code: string): Observable<any> {
    return this.http.post(
      `${this.baseUrl}user/verify-code/${email}/${code}`,
      {},
      {
        responseType: 'text',
      }
    );
  }

  statUsersByRole(): Observable<any> {
    return this.http.get<any>(`${BASE_URL}user/statUsersByRole`);
  }

  decodeToken(): any {
    const token = this.getToken();
    if (token) {
      const payload = token.split('.')[1];
      const decodedPayload = atob(payload);
      return JSON.parse(decodedPayload);
    }
    return null;
  }

  getUserProfile(email: string): Observable<any> {
    return this.http.get<any>(`${BASE_URL}user/user-profile`, {
      params: { email },
    });
  }

  sendResetLink(email: string, appUrl: string): Observable<any> {
    const params = new HttpParams().set('email', email).set('appUrl', appUrl);
    return this.http.post(`${BASE_URL}user/send-reset-link`, null, {
      params,
      responseType: 'text',
    });
  }

  verifyResetToken(token: string): Observable<any> {
    const params = new HttpParams().set('token', token);
    return this.http.get(`${BASE_URL}user/verify-reset-token`, {
      params,
      responseType: 'text',
    });
  }
  updatePassword(email: string, newPassword: string): Observable<any> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post<any>(
      `${BASE_URL}user/update-password`,
      { email, newPassword },
      { headers }
    );
  }

  resetPassword(token: string, newPassword: string): Observable<any> {
    const params = new HttpParams()
      .set('token', token)
      .set('newPassword', newPassword);
    return this.http.post(`${BASE_URL}user/reset-password`, null, {
      params,
      responseType: 'text',
    });
  }
}
