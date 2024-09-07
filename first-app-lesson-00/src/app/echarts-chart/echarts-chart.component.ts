import {
  Component,
  OnInit,
  ElementRef,
  ViewChild,
  ChangeDetectorRef,
  OnDestroy,
} from '@angular/core';
// import * as echarts from 'echarts/core';
// import { GridComponent} from 'echarts/components';
// import { LineChart, LineSeriesOption } from 'echarts/charts';
// import { UniversalTransition } from 'echarts/features';
// import { CanvasRenderer } from 'echarts/renderers';
// import {EChartsOption} from "echarts";
import { Chart, ChartModule } from 'angular-highcharts';
import * as $ from 'jquery';
import 'highcharts';
import * as Highcharts from 'highcharts';
import { HighchartsChartModule } from 'highcharts-angular';
// echarts.use([GridComponent, LineChart, CanvasRenderer, UniversalTransition]);
import '../house';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Map } from '../map';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { timeInterval, timer } from 'rxjs';
@Component({
  selector: 'app-echarts-chart',
  templateUrl: './echarts-chart.component.html',
  styleUrls: ['./echarts-chart.component.css'],
  standalone: true,
  imports: [HighchartsChartModule, ChartModule],
})
export class EchartsChartComponent implements OnDestroy {
  private mapDiv!: HTMLDivElement;
  private mapScript!: HTMLScriptElement;

  title = 'myHighchart';
  mapHtml: string = ''; // 用于存储后端返回的HTML字符串

  dynamicHtml: SafeHtml = '';

  map_div_id: string = '';

  mapIds: any;
  map_model = new Map('产品经理', '广州');

  @ViewChild('mappDiv') mappDivRef!: ElementRef;

  constructor(
    private http: HttpClient,
    private sanitizer: DomSanitizer,
    private cdRef: ChangeDetectorRef
  ) {}

  // Get_maps() {
  //   let params = new HttpParams()
  //     .set('job_name', this.map_model.job_name)
  //     .set('city_name', this.map_model.city_name)
  //
  //   this.http.get('http://127.0.0.1:5000/get_map', {responseType: 'text'}).subscribe((mapHtml: string) => {
  //     this.mapHtml = mapHtml; // 将后端返回的HTML字符串保存到组件属性中
  //     console.log("网页获取完毕")
  //   });
  //
  //   timer(9000).subscribe(() => {
  //     this.loadDynamicHtml();
  //     // 在这里写下你希望在等待10秒后执行的代码
  //     console.log('div放置完毕');
  //   });
  //   // timer(10000).subscribe(() => {
  //   //   this.mapDivId();
  //   //   // 在这里写下你希望在等待10秒后执行的代码
  //   //   console.log('ID提取完毕！');
  //   // });
  //   timer(9000).subscribe(() => {
  //     this.put_script()
  //     // 在这里写下你希望在等待10秒后执行的代码
  //     console.log('脚本放置完毕！');
  //   });
  // }
  Get_maps() {
    let params = new HttpParams()
      .set('job_name', this.map_model.job_name)
      .set('city_name', this.map_model.city_name);

    this.http
      .get('http://127.0.0.1:5000/get_map', { responseType: 'text' })
      .subscribe((mapHtml: string) => {
        this.mapHtml = mapHtml; // 将后端返回的 HTML 字符串保存到组件属性中
        console.log('网页获取完毕');

        // 判断 mapHtml 是否为空再执行后续的操作
        if (this.mapHtml.trim() !== '') {
          this.loadDynamicHtml();
          console.log('div放置完毕');

          this.put_script();
          console.log('脚本放置完毕！');
        } else {
          console.log('地图数据为空，无法执行后续操作');
        }
      });
  }

  matchDivTag(): string {
    const regex = /(<div[^>]*><\/div>)/;
    const match = regex.exec(this.mapHtml);
    return match ? match[1] : '';
  }

  // mapDivId() {
  //   const regex_id = /id="([^"]*)"/;
  //   const mapDiv_Id = regex_id.exec(this.mapHtml);
  //   return mapDiv_Id ? mapDiv_Id[1] : ''
  // }

  loadDynamicHtml() {
    // const rawHtml = '<div style="position: absolute;left: 260px;width: 300px;height: 500px;background-color: #8B89E6">你号呀{{what}}、{{map_div_id}}</div>'
    // const rawHtml = '<div style="position: absolute;left: 260px;width: 300px;height: 500px;background-color: #8B89E6">你号呀{{what}}、{{map_div_id}}</div>'
    // this.dynamicHtml = rawHtml.replace('{{what}}', this.mapDivId());
    // this.dynamicHtml = rawHtml.replace('{{map_div_id}}', this.matchScript());
    // this.cdRef.detectChanges();
    this.mapDiv = document.createElement('div');
    // divElement.innerHTML = '<div style="position: absolute;left: 260px">'+this.matchDivTag()+'</div>;'
    this.mapDiv.innerHTML =
      '<div style="position: fixed;left: 260px;z-index: 6">' +
      this.matchDivTag() +
      '</div>';
    document.body.appendChild(this.mapDiv);
    console.log('有运行');
  }
  matchScript() {
    // 假设 this.mapHtml 是一个字符串，确保它不为 null 或 undefined
    if (this.mapHtml) {
      const scriptTagPattern = /<script>([\s\S]+?)<\/script>/i;
      const match = this.mapHtml.match(scriptTagPattern);

      if (match) {
        const scriptContent = match[1]!;
        console.log('Script content:', scriptContent);
        return scriptContent;
      } else {
        console.log('No script tag found in the HTML.');
        return 'null'; // 或者返回一个默认值
      }
    } else {
      console.log('this.mapHtml is null or undefined.');
      return 'null'; // 或者返回一个默认值
    }
  }
  put_script() {
    this.mapScript = document.createElement('script');
    this.mapScript.type = 'text/javascript';
    this.mapScript.innerHTML = this.matchScript();
    document.body.appendChild(this.mapScript);
  }

  ngOnDestroy() {
    // 销毁 div 元素
    if (this.mapDiv && this.mapDiv.parentNode) {
      this.mapDiv.parentNode.removeChild(this.mapDiv);
    }
    // 销毁 script 元素
    if (this.mapScript && this.mapScript.parentNode) {
      this.mapScript.parentNode.removeChild(this.mapScript);
    }
  }
}

//     const regex = /<script(.*?)script>/g;
//   let matches = [];
//   let match;
//   while ((match = regex.exec(this.mapHtml)) !== null) {
//     matches.push(match[0]);  // 存储整个匹配字符串
//   // matches.push(match[1]);  // 如果需要存储括号中的内容，可以取消注释这一行
// }
// const mappDiv = this.mappDivRef.nativeElement;
// return matches ? matches[0]:''
//  this.mapIds = mat_scr ? mat_scr[1]:''
// const ScriContent = 'mappDiv.innerHTML = <p>你好</p>';
// eval(ScriContent);
// }

//   Linechart = new Chart({
//   chart: {
//     type: 'line'
//   },
//   title: {
//     text: '广州市历年平均薪资图'
//   },
//   credits: {
//     enabled: false
//   },
//     xAxis:{
//        categories: ['2019','2020','2021','2022','2023']
//     },
//          yAxis : {
//        title: {
//           text: '薪资:元'
//        },
//        },
//   series: [
//     {
//       name: '广州市',
//       data: [11300, 12083, 11002,13552,10155]
//     } as any
//   ]
// });
//
//   Piechart = new Chart({
//     chart: {
//        type: 'area'
//     },
//     title: {
//        text: '深圳市与广州市历年平均薪资对比'
//     },
//     subtitle : {
//        style: {
//           position: 'absolute',
//           right: '0px',
//           bottom: '10px'
//        }
//     },
//     legend : {
//        layout: 'vertical',
//        align: 'left',
//        verticalAlign: 'top',
//        x: -150,
//        y: 100,
//        floating: true,
//        borderWidth: 1,
//        backgroundColor: 'red' || '#FFFFFF'
//     },
//     xAxis:{
//        categories: ['2019','2020','2021','2022','2023']
//     },
//     yAxis : {
//        title: {
//           text: '平均薪资:元'
//        },
//        },
//     plotOptions : {
//        area: {
//           fillOpacity: 0.5
//        }
//     },
//     credits:{
//        enabled: false
//     },
//     series: [
//        {
//           name: '深圳市',
//           data: [ 11300, 12083, 11002,13552,10155]
//        },
//        {
//           name: '广州市',
//           data: [ 11002,13552,10155,11300, 12083,]
//        }
//     ] as any
//   })
