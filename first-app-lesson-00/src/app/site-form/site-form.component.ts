import { Component } from '@angular/core';
import {Site} from "../site";
import {FormsModule} from "@angular/forms";
import {CommonModule} from "@angular/common";
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import * as echarts from "echarts/core";
import {EChartsOption} from "echarts";
import { GridComponent, GridComponentOption } from 'echarts/components';
import { LineChart, LineSeriesOption } from 'echarts/charts';
import { UniversalTransition } from 'echarts/features';
import { CanvasRenderer } from 'echarts/renderers';
echarts.use([GridComponent, LineChart, CanvasRenderer, UniversalTransition]);
@Component({
  selector: 'site-form',
  templateUrl: './site-form.component.html',
  styleUrls: ['./site-form.component.css'],
  imports:[FormsModule,CommonModule],
  standalone:true,
})
export class SiteFormComponent {
  responseData:any;
  chartData: any = {
    '地区': [],
    '平均薪资': []
  };
  model = new Site('产品经理','广州')
  constructor(private http:HttpClient) {
  }

  onSubmit() {
  let params = new HttpParams()
    .set('job_name', this.model.job_name)
    .set('city_name', this.model.city_name);

  const headers = new HttpHeaders()
    .set('Content-Type', 'application/x-www-form-urlencoded');
      this.http.post('http://127.0.0.1:5000/mid',params.toString(), { headers: headers }).subscribe(
        response => {
    // 处理响应
          this.responseData = response;
          this.chartData['地区'] = this.responseData['地区'];
        this.chartData['平均薪资'] = this.responseData['平均薪资'];
          this.generate_echarts()
        },
)};
 generate_echarts() {
    var chartDom = document.getElementById('main')!;
    var myChart = echarts.init(chartDom);
    var option: EChartsOption;

    option = {
      xAxis: {
        type: 'category',
        data: this.chartData['地区']
      },
      yAxis: {
        type: 'value'
      },
      series: [
        {
          data: this.chartData['平均薪资'],
          type: 'line'
        }
      ]
    };

    option && myChart.setOption(option);
  }
}
  // TODO: 完成后移除

