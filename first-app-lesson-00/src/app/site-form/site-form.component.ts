import { Component, ElementRef, OnDestroy, ViewChild } from '@angular/core';
import { Site } from '../site';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import * as echarts from 'echarts/core';
import { EChartsOption } from 'echarts';
import { GridComponent, GridComponentOption } from 'echarts/components';
import { LineChart, LineSeriesOption } from 'echarts/charts';
import { UniversalTransition } from 'echarts/features';
import {
  TitleComponent,
  TitleComponentOption,
  ToolboxComponent,
  ToolboxComponentOption,
  TooltipComponent,
  TooltipComponentOption,
  LegendComponent,
  LegendComponentOption,
} from 'echarts/components';
import { PieChart, PieSeriesOption } from 'echarts/charts';
import { LabelLayout } from 'echarts/features';
import { CanvasRenderer } from 'echarts/renderers';
import { generate } from 'rxjs';
import { SafeHtml } from '@angular/platform-browser';
import { Map } from '../map';
echarts.use([
  GridComponent,
  LineChart,
  CanvasRenderer,
  UniversalTransition,
  TitleComponent,
  ToolboxComponent,
  TooltipComponent,
  LegendComponent,
  PieChart,
  CanvasRenderer,
  LabelLayout,
]);
@Component({
  selector: 'site-form',
  templateUrl: './site-form.component.html',
  styleUrls: ['./site-form.component.css'],
  imports: [FormsModule, CommonModule],
  standalone: true,
})
export class SiteFormComponent implements OnDestroy {
  private mapDiv!: HTMLDivElement;
  private mapScript!: HTMLScriptElement;
  private treeDiv!: HTMLDivElement;
  private treeScript!: HTMLScriptElement;
  private wordDiv!: HTMLDivElement;
  private wordScript!: HTMLScriptElement;
  mapHtml: string = ''; // 用于存储后端返回的HTML字符串
  // dynamicHtml: SafeHtml = '';
  treeHtml: string = '';
  wordHtml: string = '';
  oriData: any;
  job_cities = [
    '全国',
    '北京',
    '上海',
    '天津',
    '重庆',
    '广州',
    '深圳',
    '苏州',
    '南京',
    '杭州',
    '大连',
    '成都',
    '武汉',
    '西安',
  ];
  wor_exp = ['实习生', '应届生', '1年以内', '1-3年', '5-10年', '10年以上'];
  loading: boolean = false;
  chartData: any = {
    地区: [],
    平均薪资: [],
    分地区: [],
    岗位个数: [],
  };
  model = new Site('产品经理', '广州', '实习生');
  // map_model = new Map(this.model.job_name, this.model.city_name);
  @ViewChild('mappDiv') mappDivRef!: ElementRef;
  @ViewChild('TreeDiv') TreeDivRef!: ElementRef;
  @ViewChild('wordDiv') wordDivRef!: ElementRef;
  constructor(private http: HttpClient) {}
  TrySubmit() {
    this.startLoadingAnimation();
    this.Get_maps();
    setTimeout(() => {
      this.Get_tree();
    }, 5000);
    setTimeout(() => {
      this.Get_word();
    }, 10000);
    let params = new HttpParams()
      .set('job_name', this.model.job_name)
      .set('city_name', this.model.city_name)
      .set('wor_exp', this.model.wor_exp);

    const headers = new HttpHeaders().set(
      'Content-Type',
      'application/x-www-form-urlencoded'
    );
    this.http
      .post('http://127.0.0.1:5000/midd', params.toString(), {
        headers: headers,
      })
      .subscribe(response => {
        // 处理响应
        this.chartData = response;
        this.chartData['分地区'] = this.chartData['分地区'];
        this.chartData['平均薪资'] = this.chartData['平均薪资'];
        this.chartData['地区'] = this.chartData['地区'];
        this.chartData['岗位个数'] = this.chartData['岗位个数'];
        this.oriData = JSON.parse(this.chartData.dataFrame);
        this.generate_echarts();
      });
  }
  //   onSubmit() {
  //   let params = new HttpParams()
  //     .set('job_name', this.model.job_name)
  //     .set('city_name', this.model.city_name);
  //
  //   const headers = new HttpHeaders()
  //     .set('Content-Type', 'application/x-www-form-urlencoded');
  //       this.http.post('http://127.0.0.1:5000/mid',params.toString(), { headers: headers }).subscribe(
  //         response => {
  //     // 处理响应
  //           this.responseData = response;
  //           this.chartData['地区'] = this.responseData['地区'];
  //         this.chartData['平均薪资'] = this.responseData['平均薪资'];
  //           this.generate_echarts()
  //         },
  // )};
  generate_echarts() {
    var AchartDom = document.getElementById('chart1')!;
    var AChart = echarts.init(AchartDom);
    var Aoption: EChartsOption;

    Aoption = {
      title: {
        text: '地区岗位分布图',
        subtext: this.model.city_name + '地区岗位分布图',
        left: 'center',
      },
      xAxis: {
        name: this.model.city_name + '各地区',
        type: 'category',
        data: this.chartData['地区'],
      },
      yAxis: {
        name: '岗位个数:个',
        type: 'value',
      },
      series: [
        {
          type: 'line',
          data: this.chartData['岗位个数'],
        },
      ],
    };

    Aoption && AChart.setOption(Aoption);
    this.generate_chart2();
  }

  // 模拟某个操作后显示加载动画
  startLoadingAnimation() {
    this.loading = true;
    setInterval(() => {
      if (this.oriData) {
        this.loading = false;
      }
    }, 60);
    // 模拟异步操作
    // 模拟异步操作
    setTimeout(() => {
      this.loading = false;
    }, 5000); // 3秒后隐藏加载动画
  }
  generate_chart2() {
    var BchartDom = document.getElementById('chart2')!;
    var BChart = echarts.init(BchartDom);
    var Boption: EChartsOption;

    Boption = {
      title: {
        text: '地区平均薪资图',
        subtext: this.chartData['分地区'][0] + '地区平均薪资图',
        left: 'center',
      },
      tooltip: {
        trigger: 'item',
        formatter: '{a} <br/>{b} : {c} ({d}%)',
      },
      legend: {
        left: 'center',
        top: 'bottom',
        data: this.oriData['分地区'],
      },
      toolbox: {
        show: true,
        feature: {
          mark: { show: true },
          dataView: { show: true, readOnly: false },
          restore: { show: true },
          saveAsImage: { show: true },
        },
      },
      series: [
        {
          name: 'Area Mode',
          type: 'pie',
          radius: [20, 140],
          center: ['50%', '50%'],
          roseType: 'area',
          itemStyle: {
            borderRadius: 5,
          },

          data: [
            {
              value: this.chartData['平均薪资'][0],
              name: this.chartData['分地区'][0],
            },
            {
              value: this.chartData['平均薪资'][1],
              name: this.chartData['分地区'][1],
            },
            {
              value: this.chartData['平均薪资'][2],
              name: this.chartData['分地区'][2],
            },
            {
              value: this.chartData['平均薪资'][3],
              name: this.chartData['分地区'][3],
            },
            {
              value: this.chartData['平均薪资'][4],
              name: this.chartData['分地区'][4],
            },
            {
              value: this.chartData['平均薪资'][5],
              name: this.chartData['分地区'][5],
            },
            {
              value: this.chartData['平均薪资'][6],
              name: this.chartData['分地区'][6],
            },
            {
              value: this.chartData['平均薪资'][7],
              name: this.chartData['分地区'][7],
            },
          ],
        },
      ],
    };

    Boption && BChart.setOption(Boption);
  }

  TrySubmit2() {
    let params = new HttpParams()
      .set('job_name', this.model.job_name)
      .set('city_name', this.model.city_name)
      .set('wor_exp', this.model.wor_exp);

    const headers = new HttpHeaders().set(
      'Content-Type',
      'application/x-www-form-urlencoded'
    );
    this.http
      .post('http://127.0.0.1:5000/midd', params.toString(), {
        headers: headers,
      })
      .subscribe(response => {
        // 处理响应
        this.chartData = response;
        this.chartData['分地区'] = this.chartData['分地区'];
        this.chartData['平均薪资'] = this.chartData['平均薪资'];
        this.chartData['地区'] = this.chartData['地区'];
        this.chartData['岗位个数'] = this.chartData['岗位个数'];
        this.oriData = JSON.parse(this.chartData.dataFrame);
        // this.generate_echart3();
      });
  }
  //   onSubmit() {
  //   let params = new HttpParams()
  //     .set('job_name', this.model.job_name)
  //     .set('city_name', this.model.city_name);
  //
  //   const headers = new HttpHeaders()
  //     .set('Content-Type', 'application/x-www-form-urlencoded');
  //       this.http.post('http://127.0.0.1:5000/mid',params.toString(), { headers: headers }).subscribe(
  //         response => {
  //     // 处理响应
  //           this.responseData = response;
  //           this.chartData['地区'] = this.responseData['地区'];
  //         this.chartData['平均薪资'] = this.responseData['平均薪资'];
  //           this.generate_echarts()
  //         },
  // )};
  //  generate_echart3() {
  //     var AchartDom = document.getElementById('chart3')!;
  //     var AChart = echarts.init(AchartDom);
  //     var Aoption: EChartsOption;
  //
  //     Aoption = {
  //       title: {
  //     text: '地区岗位分布图',
  //     subtext: this.model.city_name+'地区岗位分布图',
  //     left: 'center'
  //   },
  //       xAxis: {
  //         name:this.model.city_name+'各地区',
  //         type: 'category',
  //         data: this.chartData['地区']
  //       },
  //       yAxis: {
  //         name:'岗位个数:个',
  //         type: 'value'
  //       },
  //       series: [
  //         {
  //           type: 'line',
  //           data: this.chartData['岗位个数'],
  //         }
  //       ]
  //     };
  //
  //     Aoption && AChart.setOption(Aoption);
  //     // this.generate_chart4()
  //   };

  // 模拟某个操作后显示加载动画
  //  generate_chart4(){
  //    var BchartDom = document.getElementById('chart4')!;
  // var BChart = echarts.init(BchartDom);
  // var Boption: EChartsOption;
  //
  // Boption = {
  //   title: {
  //     text: '地区平均薪资图',
  //     subtext: this.chartData['分地区'][0]+'地区平均薪资图',
  //     left: 'center'
  //   },
  //   tooltip: {
  //     trigger: 'item',
  //     formatter: '{a} <br/>{b} : {c} ({d}%)'
  //   },
  //   legend: {
  //     left: 'center',
  //     top: 'bottom',
  //     data: this.oriData['分地区']
  //   },
  //   toolbox: {
  //     show: true,
  //     feature: {
  //       mark: { show: true },
  //       dataView: { show: true, readOnly: false },
  //       restore: { show: true },
  //       saveAsImage: { show: true }
  //     }
  //   },
  //   series: [
  //     {
  //       name: 'Area Mode',
  //       type: 'pie',
  //       radius: [20, 140],
  //       center: ['50%', '50%'],
  //       roseType: 'area',
  //       itemStyle: {
  //         borderRadius: 5
  //       },
  //
  //       data: [
  //         { value: this.chartData['平均薪资'][0], name: this.chartData['分地区'][0] },
  //         { value: this.chartData['平均薪资'][1], name: this.chartData['分地区'][1] },
  //         { value: this.chartData['平均薪资'][2], name: this.chartData['分地区'][2] },
  //         { value: this.chartData['平均薪资'][3], name: this.chartData['分地区'][3] },
  //         { value: this.chartData['平均薪资'][4], name: this.chartData['分地区'][4] },
  //         { value: this.chartData['平均薪资'][5], name: this.chartData['分地区'][5] },
  //         { value: this.chartData['平均薪资'][6], name: this.chartData['分地区'][6] },
  //         { value: this.chartData['平均薪资'][7], name: this.chartData['分地区'][7] }
  //       ]
  //     }
  //   ]
  // };
  //
  // Boption && BChart.setOption(Boption);
  //   }
  Get_maps() {
    if (this.mapHtml) {
      this.mapHtml = '';
      this.mapDiv.innerHTML = '';
    }
    var load = document.getElementById('loadings');
    if (load) {
      load.style.display = 'block';
    } else {
      console.error('Element with id "loadings" not found');
    }
    let params = new HttpParams()
      .set('job_name', this.model.job_name)
      .set('city_name', this.model.city_name);

    this.http
      .post('http://127.0.0.1:5000/get_map', params, { responseType: 'text' })
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
      '<div style="position: absolute;left: 400px;z-index: 6;top: 580px;width: 1000px;height: 550px">' +
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

  Get_tree() {
    if (this.treeHtml) {
      this.treeHtml = '';
      this.treeDiv.innerHTML = '';
    }
    var loadd = document.getElementById('loadingss')!;
    if (loadd) {
      loadd.style.display = 'block';
    } else {
      console.error('Element with id "loadings" not found');
    }
    let paramss = new HttpParams()
      .set('job_name', this.model.job_name)
      .set('city_name', this.model.city_name);

    this.http
      .post('http://127.0.0.1:5000/get_tree', paramss, { responseType: 'text' })
      .subscribe((treeHtml: string) => {
        this.treeHtml = treeHtml; // 将后端返回的 HTML 字符串保存到组件属性中
        console.log('网页获取完毕');

        // 判断 mapHtml 是否为空再执行后续的操作
        if (this.treeHtml.trim() !== '') {
          this.load_tree_Html();
          console.log('div放置完毕');

          this.put_tree_script();
          console.log('脚本放置完毕！');
        } else {
          console.log('树状图数据为空，无法执行后续操作');
        }
      });
  }

  match_tree_DivTag(): string {
    const regexx = /(<div[^>]*><\/div>)/;
    const matchh = regexx.exec(this.treeHtml);
    return matchh ? matchh[1] : '';
  }

  load_tree_Html() {
    // const rawHtml = '<div style="position: absolute;left: 260px;width: 300px;height: 500px;background-color: #8B89E6">你号呀{{what}}、{{map_div_id}}</div>'
    // const rawHtml = '<div style="position: absolute;left: 260px;width: 300px;height: 500px;background-color: #8B89E6">你号呀{{what}}、{{map_div_id}}</div>'
    // this.dynamicHtml = rawHtml.replace('{{what}}', this.mapDivId());
    // this.dynamicHtml = rawHtml.replace('{{map_div_id}}', this.matchScript());
    // this.cdRef.detectChanges();
    this.treeDiv = document.createElement('div');
    // divElement.innerHTML = '<div style="position: absolute;left: 260px">'+this.matchDivTag()+'</div>;'

    this.treeDiv.innerHTML =
      '<div style="position: absolute;left: 400px;z-index: 6;top: 1180px;width: 1000px;height: 550px">' +
      this.match_tree_DivTag() +
      '</div>';
    document.body.appendChild(this.treeDiv);
    console.log('有运行');
  }
  match_tree_Script() {
    // 假设 this.mapHtml 是一个字符串，确保它不为 null 或 undefined
    if (this.mapHtml) {
      const scriptTagPatternn = /<script>([\s\S]+?)<\/script>/i;
      const matchh = this.treeHtml.match(scriptTagPatternn);

      if (matchh) {
        const scriptContentt = matchh[1]!;
        console.log('Script content:', scriptContentt);
        return scriptContentt;
      } else {
        console.log('No script tag found in the HTML.');
        return 'null'; // 或者返回一个默认值
      }
    } else {
      console.log('this.mapHtml is null or undefined.');
      return 'null'; // 或者返回一个默认值
    }
  }
  put_tree_script() {
    this.treeScript = document.createElement('script');
    this.treeScript.type = 'text/javascript';
    this.treeScript.innerHTML = this.match_tree_Script();
    document.body.appendChild(this.treeScript);
  }

  Get_word() {
    if (this.wordHtml) {
      this.wordHtml = '';
      this.wordDiv.innerHTML = '';
    }
    var loadd3 = document.getElementById('loadingss3')!;
    if (loadd3) {
      loadd3.style.display = 'block';
    } else {
      console.error('Element with id "loadings" not found');
    }
    let paramss3 = new HttpParams()
      .set('job_name', this.model.job_name)
      .set('city_name', this.model.city_name);

    this.http
      .post('http://127.0.0.1:5000/get_word', paramss3, {
        responseType: 'text',
      })
      .subscribe((wordHtml: string) => {
        this.wordHtml = wordHtml; // 将后端返回的 HTML 字符串保存到组件属性中
        console.log('网页获取完毕');

        // 判断 mapHtml 是否为空再执行后续的操作
        if (this.wordHtml.trim() !== '') {
          this.load_word_Html();
          console.log('div放置完毕');

          this.put_word_script();
          console.log('脚本放置完毕！');
        } else {
          console.log('词云图数据为空，无法执行后续操作');
        }
      });
  }

  match_word_DivTag(): string {
    const regexx3 = /(<div[^>]*><\/div>)/;
    const matchh3 = regexx3.exec(this.wordHtml);
    return matchh3 ? matchh3[1] : '';
  }

  load_word_Html() {
    this.wordDiv = document.createElement('div');
    this.wordDiv.innerHTML =
      '<div style="position: absolute;left: 400px;z-index: 6;top: 1780px;width: 1000px;height: 550px">' +
      this.match_word_DivTag() +
      '</div>';
    document.body.appendChild(this.wordDiv);
    console.log('有运行');
  }
  match_word_Script() {
    if (this.wordHtml) {
      const scriptTagPatternn3 = /<script>([\s\S]+?)<\/script>/i;
      const matchh3 = this.wordHtml.match(scriptTagPatternn3);

      if (matchh3) {
        const scriptContentt3 = matchh3[1]!;
        console.log('Script content:', scriptContentt3);
        return scriptContentt3;
      } else {
        console.log('No script tag found in the HTML.');
        return 'null'; // 或者返回一个默认值
      }
    } else {
      console.log('this.wordHtml is null or undefined.');
      return 'null'; // 或者返回一个默认值
    }
  }
  put_word_script() {
    this.wordScript = document.createElement('script');
    this.wordScript.type = 'text/javascript';
    this.wordScript.innerHTML = this.match_word_Script();
    document.body.appendChild(this.wordScript);
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
    if (this.treeDiv && this.treeDiv.parentNode) {
      this.treeDiv.parentNode.removeChild(this.treeDiv);
    }
    // 销毁 script 元素
    if (this.treeScript && this.treeScript.parentNode) {
      this.treeScript.parentNode.removeChild(this.treeScript);
    }
    if (this.wordDiv && this.wordDiv.parentNode) {
      this.wordDiv.parentNode.removeChild(this.wordDiv);
    }
    if (this.wordScript && this.wordScript.parentNode) {
      this.wordScript.parentNode.removeChild(this.wordScript);
    }
  }
}
// TODO: 完成后移除
