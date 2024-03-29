import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private apiUrl = 'http://localhost:3000'; // Replace with your API endpoint

  constructor(private http: HttpClient) {}

  submitFormData(formData: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/api/forms`, formData);
  }
}
