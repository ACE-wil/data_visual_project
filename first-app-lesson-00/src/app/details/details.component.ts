import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
// import { ApiService } from '../service.service';
import { ConfigService } from '../config.service';
import { Router } from '@angular/router';
import { SiteFormComponent } from '../site-form/site-form.component';
import { EchartsChartComponent } from '../echarts-chart/echarts-chart.component';
@Component({
  selector: 'app-details',
  standalone: true,
  imports: [CommonModule, SiteFormComponent, EchartsChartComponent],
  templateUrl: 'details.component.html',
  styleUrls: ['details.component.css'],
})
export class DetailsComponent {}
