import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NeituiService } from '../neitui.service';
@Injectable({
  providedIn: 'root',
})
@Component({
  selector: 'app-neitui',
  templateUrl: './neitui.component.html',
  styleUrls: ['./neitui.component.css'],
  imports: [CommonModule],
  standalone: true,
})
export class NeituiComponent implements OnInit {
  neitui_data: any;
  constructor(private neituiService: NeituiService) {}
  ngOnInit() {
    this.neituiService.getNeituiData().subscribe(response => {
      // 处理响应
      this.neitui_data = response.body;
    });
  }
}
