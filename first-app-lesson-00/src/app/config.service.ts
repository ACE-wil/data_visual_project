import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class ConfigService {
  constructor(private http: HttpClient) {} // 用你的Flask API的URL替换这里

  fetchData() {
    return this.http.get('http://127.0.0.1:5000/api/data'); // 替换为你的API URL
  }
}
