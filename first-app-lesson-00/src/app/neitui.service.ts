import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class NeituiService {
  private neituiUrl = 'http://127.0.0.1:5000/niu_neitui';

  constructor(private http: HttpClient) {}

  getNeituiData() {
    const headers = new HttpHeaders().set(
      'Content-Type',
      'application/x-www-form-urlencoded'
    );
    return this.http.post(this.neituiUrl, { headers }, { observe: 'response' });
  }
}
