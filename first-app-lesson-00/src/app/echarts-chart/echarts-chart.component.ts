import { Component, OnInit } from '@angular/core';
import * as echarts from 'echarts/core';
import { GridComponent, GridComponentOption } from 'echarts/components';
import { LineChart, LineSeriesOption } from 'echarts/charts';
import { UniversalTransition } from 'echarts/features';
import { CanvasRenderer } from 'echarts/renderers';
import {EChartsOption} from "echarts";

echarts.use([GridComponent, LineChart, CanvasRenderer, UniversalTransition]);
@Component({
  selector: 'app-echarts-chart',
  templateUrl: './echarts-chart.component.html',
  styleUrls: ['./echarts-chart.component.css'],
  standalone:true,
  imports:[]
})
export class EchartsChartComponent {

}
