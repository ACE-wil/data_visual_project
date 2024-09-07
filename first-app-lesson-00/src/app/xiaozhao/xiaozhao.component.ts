import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Schmodel } from '../schmodel';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ChangeDetectorRef } from '@angular/core';
@Injectable({
  providedIn: 'root',
})
@Component({
  selector: 'app-xiaozhao',
  templateUrl: './xiaozhao.component.html',
  styleUrls: ['./xiaozhao.component.css'],
  imports: [FormsModule, CommonModule],
  standalone: true,
})
export class XiaozhaoComponent implements OnInit {
  sch_data: any;

  loading: boolean = false;
  sch_model = new Schmodel('广州');
  constructor(private http: HttpClient) {}
  ngOnInit() {
    this.startLoadingAnimation();
    let params = new HttpParams().set('sch_where', this.sch_model.sch_where);
    const headers = new HttpHeaders().set(
      'Content-Type',
      'application/x-www-form-urlencoded'
    );
    this.http
      .post('http://127.0.0.1:5000/niu_sch_default', params.toString(), {
        headers: headers,
      })
      .subscribe(response => {
        // 处理响应
        this.sch_data = response;
      });
  }

  startLoadingAnimation() {
    this.loading = true;

    // 模拟异步操作
    setTimeout(() => {
      this.loading = false;
    }, 2400); // 2.4秒后隐藏加载动画
  }
  startLoadingAnimation2() {
    this.loading = true;

    // 模拟异步操作
    setTimeout(() => {
      this.loading = false;
    }, 2000); // 2.4秒后隐藏加载动画
  }
  Sch_data_request() {
    this.startLoadingAnimation2();
    let params = new HttpParams().set('sch_where', this.sch_model.sch_where);
    const headers = new HttpHeaders().set(
      'Content-Type',
      'application/x-www-form-urlencoded'
    );
    this.http
      .post('http://127.0.0.1:5000/niu_sch', params.toString(), {
        headers: headers,
      })
      .subscribe(response => {
        // 处理响应
        this.sch_data = response;
      });
  }
}
