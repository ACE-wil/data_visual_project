import { Component, OnInit } from '@angular/core';
import * as echarts from 'echarts/core';
import { GridComponent, GridComponentOption } from 'echarts/components';
import { LineChart, LineSeriesOption } from 'echarts/charts';
import { UniversalTransition } from 'echarts/features';
import { CanvasRenderer } from 'echarts/renderers';
import { EChartsOption } from 'echarts';
import { Chart, ChartModule } from 'angular-highcharts';
import * as $ from 'jquery';
import 'highcharts';
import * as Highcharts from 'highcharts';
import { HighchartsChartModule } from 'highcharts-angular';
echarts.use([GridComponent, LineChart, CanvasRenderer, UniversalTransition]);
import '../house';
import { House } from '../house';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { NgForOf, NgIf } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

declare var housechart: any;

@Component({
  selector: 'find-house',
  templateUrl: './find-houses.component.html',
  styleUrls: ['./find-houses.component.css'],
  standalone: true,
  imports: [
    HighchartsChartModule,
    ChartModule,
    NgIf,
    NgForOf,
    FormsModule,
    CommonModule,
  ],
})
export class FindHousesComponent implements OnInit {
  ngOnInit() {
    housechart();
  }
  house_data: any;

  gz_city = [
    '天河',
    '越秀',
    '海珠',
    '番禺',
    '白云',
    '黄埔',
    '从化',
    '增城',
    '花都',
    '南沙',
  ];

  gz_hous_pri = [
    '小于1000',
    '1000-2000',
    '1500-2000',
    '2000-2500',
    '2500-3000',
  ];
  house_model = new House('从化', '1000-1500');

  constructor(private http: HttpClient) {}

  house_data_request() {
    let params = new HttpParams()
      .set('gz_where', this.house_model.gz_where)
      .set('ren_pri', this.house_model.ren_pri);
    const headers = new HttpHeaders().set(
      'Content-Type',
      'application/x-www-form-urlencoded'
    );
    this.http
      .post('http://127.0.0.1:5000/house_datas', params.toString(), {
        headers: headers,
      })
      .subscribe(house_response => {
        // 处理响应
        this.house_data = house_response;
      });
  }

  Linechart = new Chart({
    chart: {
      type: 'line',
    },
    title: {
      text: '广州市历年租房平均价格图',
    },
    credits: {
      enabled: false,
    },
    xAxis: {
      categories: ['2019', '2020', '2021', '2022', '2023'],
    },
    yAxis: {
      title: {
        text: '薪资:元',
      },
    },
    series: [
      {
        name: '广州市',
        data: [1500, 1680, 1582, 1783, 1505],
      } as any,
    ],
  });

  Piechart = new Chart({
    chart: {
      type: 'area',
    },
    title: {
      text: '深圳市与广州市历年平均房价对比',
    },
    subtitle: {
      style: {
        position: 'absolute',
        right: '0px',
        bottom: '10px',
      },
    },
    legend: {
      layout: 'vertical',
      align: 'left',
      verticalAlign: 'top',
      x: -150,
      y: 100,
      floating: true,
      borderWidth: 1,
      backgroundColor: 'red' || '#FFFFFF',
    },
    xAxis: {
      categories: ['2019', '2020', '2021', '2022', '2023'],
    },
    yAxis: {
      title: {
        text: '平均租房价格:元',
      },
    },
    plotOptions: {
      area: {
        fillOpacity: 0.5,
      },
    },
    credits: {
      enabled: false,
    },
    series: [
      {
        name: '深圳市租房平均价格',
        data: [1500, 1680, 1582, 1783, 1505],
      },
      {
        name: '广州市租房平均价格',
        data: [1600, 1480, 1582, 1683, 1805],
      },
    ] as any,
  });
}
