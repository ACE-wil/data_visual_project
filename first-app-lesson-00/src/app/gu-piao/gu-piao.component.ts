import { Component, OnInit } from '@angular/core';
import * as echarts from 'echarts/core';
import { RouterModule } from '@angular/router';
import { Router, Event, NavigationEnd } from '@angular/router';
import Routes from '../routes';
// import {
//   TitleComponent,
//   TitleComponentOption,
//   TooltipComponent,
//   TooltipComponentOption,
//   GridComponent,
//   GridComponentOption,
//   LegendComponent,
//   LegendComponentOption,
//   DataZoomComponent,
//   DataZoomComponentOption,
//   MarkLineComponent,
//   MarkLineComponentOption,
//   MarkPointComponent,
//   MarkPointComponentOption
// } from 'echarts/components';
// import {
//   CandlestickChart,
//   CandlestickSeriesOption,
//   LineChart,
//   LineSeriesOption,
// } from 'echarts/charts';
import { UniversalTransition } from 'echarts/features';
import { CanvasRenderer } from 'echarts/renderers';
import { RouterOutlet } from '@angular/router';

// echarts.use([
//   TitleComponent,
//   TooltipComponent,
//   GridComponent,
//   LegendComponent,
//   DataZoomComponent,
//   MarkLineComponent,
//   MarkPointComponent,
//   CandlestickChart,
//   LineChart,
//   CanvasRenderer,
//   UniversalTransition
// ]);
//
// type EChartsOption = echarts.ComposeOption<
//   | TitleComponentOption
//   | TooltipComponentOption
//   | GridComponentOption
//   | LegendComponentOption
//   | DataZoomComponentOption
//   | MarkLineComponentOption
//   | MarkPointComponentOption
//   | CandlestickSeriesOption
//   | LineSeriesOption
// >;
@Component({
  standalone: true,
  selector: 'app-gupiao',
  templateUrl: './gu-piao.component.html',
  styleUrls: ['./gu-piao.component.css'],
  imports: [RouterOutlet, RouterModule],
})
export class GuPiaoComponent {
  //   ngOnInit():void{
  // var chartDom = document.getElementById('main')!;
  // var myChart = echarts.init(chartDom);
  // var option: EChartsOption;
  // const upColor = '#ec0000';
  // const upBorderColor = '#8A0000';
  // const downColor = '#00da3c';
  // const downBorderColor = '#008F28';
  //
  // // Each item: open，close，lowest，highest
  // const data0 = splitData([
  //    ['2023/9/24', 2320.26, 2320.26, 2287.3, 2362.94],
  //   ['2023/9/25', 2300, 2291.3, 2288.26, 2308.38],
  //   ['2023/9/26', 2295.35, 2346.5, 2295.35, 2346.92],
  //   ['2023/9/27', 2347.22, 2358.98, 2337.35, 2363.8],
  //   ['2023/9/28', 2360.75, 2382.48, 2347.89, 2383.76],
  //   ['2023/9/29', 2383.43, 2385.42, 2371.23, 2391.82],
  //   ['2023/9/30', 2377.41, 2419.02, 2369.57, 2421.15],
  //   ['2023/10/1', 2425.92, 2428.15, 2417.58, 2440.38],
  //   ['2023/10/2', 2411, 2433.13, 2403.3, 2437.42],
  //   ['2023/10/3', 2432.68, 2434.48, 2427.7, 2441.73],
  //   ['2023/10/4', 2430.69, 2418.53, 2394.22, 2433.89],
  //   ['2023/10/5', 2416.62, 2432.4, 2414.4, 2443.03],
  //   ['2023/10/6', 2441.91, 2421.56, 2415.43, 2444.8],
  //   ['2023/10/7', 2420.26, 2382.91, 2373.53, 2427.07],
  //   ['2023/10/8', 2383.49, 2397.18, 2370.61, 2397.94],
  //   ['2023/10/9', 2378.82, 2325.95, 2309.17, 2378.82],
  //   ['2023/10/10', 2322.94, 2314.16, 2308.76, 2330.88],
  //   ['2023/10/11', 2320.62, 2325.82, 2315.01, 2338.78],
  //   ['2023/10/12', 2313.74, 2293.34, 2289.89, 2340.71],
  //   ['2023/10/13', 2297.77, 2313.22, 2292.03, 2324.63],
  //   ['2023/10/14', 2322.32, 2365.59, 2308.92, 2366.16],
  //   ['2023/10/15', 2364.54, 2359.51, 2330.86, 2369.65],
  //   ['2023/10/16', 2332.08, 2273.4, 2259.25, 2333.54],
  //   ['2023/10/17', 2274.81, 2326.31, 2270.1, 2328.14],
  //   ['2023/10/18', 2333.61, 2347.18, 2321.6, 2351.44],
  //   ['2023/10/19', 2340.44, 2324.29, 2304.27, 2352.02],
  //   ['2023/10/20', 2326.42, 2318.61, 2314.59, 2333.67],
  //   ['2023/10/21', 2314.68, 2310.59, 2296.58, 2320.96],
  //   ['2023/10/22', 2309.16, 2286.6, 2264.83, 2333.29],
  //   ['2023/10/23', 2282.17, 2263.97, 2253.25, 2286.33],
  //   ['2023/10/24', 2255.77, 2270.28, 2253.31, 2276.22],
  //   ['2023/10/25', 2269.31, 2278.4, 2250, 2312.08],
  //   ['2023/10/26', 2267.29, 2240.02, 2239.21, 2276.05],
  //   ['2023/10/27', 2244.26, 2257.43, 2232.02, 2261.31],
  //   ['2023/10/28', 2257.74, 2317.37, 2257.42, 2317.86],
  //   ['2023/10/29', 2318.21, 2324.24, 2311.6, 2330.81],
  //   ['2023/10/30', 2321.4, 2328.28, 2314.97, 2332],
  //   ['2023/10/31', 2334.74, 2326.72, 2319.91, 2344.89],
  //   ['2023/11/1', 2318.58, 2297.67, 2281.12, 2319.99],
  //   ['2023/11/2', 2299.38, 2301.26, 2289, 2323.48],
  //   ['2023/11/3', 2273.55, 2236.3, 2232.91, 2273.55],
  //   ['2023/11/4', 2238.49, 2236.62, 2228.81, 2246.87],
  //   ['2023/11/5', 2229.46, 2234.4, 2227.31, 2243.95],
  //   ['2023/11/6', 2234.9, 2227.74, 2220.44, 2253.42],
  //   ['2023/11/7', 2232.69, 2225.29, 2217.25, 2241.34],
  //   ['2023/11/8', 2196.24, 2211.59, 2180.67, 2212.59],
  //   ['2023/11/9', 2215.47, 2225.77, 2215.47, 2234.73],
  //   ['2023/11/10', 2224.93, 2226.13, 2212.56, 2233.04],
  //   ['2023/11/11', 2236.98, 2219.55, 2217.26, 2242.48],
  //   ['2023/11/12', 2218.09, 2206.78, 2204.44, 2226.26],
  //   ['2023/11/13', 2199.91, 2181.94, 2177.39, 2204.99],
  //   ['2023/11/14', 2169.63, 2194.85, 2165.78, 2196.43],
  //   ['2023/11/15', 2195.03, 2193.8, 2178.47, 2197.51],
  //   ['2023/11/16', 2181.82, 2197.6, 2175.44, 2206.03],
  //   ['2023/11/17', 2201.12, 2244.64, 2200.58, 2250.11],
  //   ['2023/11/18', 2236.4, 2242.17, 2232.26, 2245.12],
  //   ['2023/11/19', 2242.62, 2184.54, 2182.81, 2242.62],
  //   ['2023/11/20', 2187.35, 2218.32, 2184.11, 2226.12],
  //   ['2023/11/21', 2213.19, 2199.31, 2191.85, 2224.63],
  //   ['2023/11/22', 2203.89, 2177.91, 2173.86, 2210.58],
  //   ['2023/11/23', 2170.78, 2174.12, 2161.14, 2179.65],
  //   ['2023/11/24', 2179.05, 2205.5, 2179.05, 2222.81],
  //   ['2023/11/25', 2212.5, 2231.17, 2212.5, 2236.07],
  //   ['2023/11/26', 2227.86, 2235.57, 2219.44, 2240.26],
  //   ['2023/11/27', 2242.39, 2246.3, 2235.42, 2255.21],
  //   ['2023/11/28', 2246.96, 2232.97, 2221.38, 2247.86],
  //   ['2023/11/29', 2228.82, 2246.83, 2225.81, 2247.67],
  //   ['2023/11/30', 2247.68, 2241.92, 2231.36, 2250.85],
  //   ['2023/12/1', 2238.9, 2217.01, 2205.87, 2239.93],
  //   ['2023/12/2', 2217.09, 2224.8, 2213.58, 2225.19],
  //   ['2023/12/3', 2221.34, 2251.81, 2210.77, 2252.87],
  //   ['2023/12/4', 2249.81, 2282.87, 2248.41, 2288.09],
  //   ['2023/12/5', 2286.33, 2299.99, 2281.9, 2309.39],
  //   ['2023/12/6', 2297.11, 2305.11, 2290.12, 2305.3],
  //   ['2023/12/7', 2303.75, 2302.4, 2292.43, 2314.18],
  //   ['2023/12/8', 2293.81, 2275.67, 2274.1, 2304.95],
  //   ['2023/12/9', 2281.45, 2288.53, 2270.25, 2292.59],
  //   ['2023/12/10', 2286.66, 2293.08, 2283.94, 2301.7],
  //   ['2023/12/11', 2293.4, 2321.32, 2281.47, 2322.1],
  //   ['2023/12/12', 2323.54, 2324.02, 2321.17, 2334.33],
  //   ['2023/12/13', 2316.25, 2317.75, 2310.49, 2325.72],
  //   ['2023/12/14', 2320.74, 2300.59, 2299.37, 2325.53],
  //   ['2023/12/15', 2300.21, 2299.25, 2294.11, 2313.43],
  //   ['2023/12/16', 2297.1, 2272.42, 2264.76, 2297.1],
  //   ['2023/12/17', 2270.71, 2270.93, 2260.87, 2276.86],
  //   ['2023/12/18', 2264.43, 2242.11, 2240.07, 2266.69],
  //   ['2023/12/19', 2242.26, 2210.9, 2205.07, 2250.63],
  //   ['2023/12/20', 2190.1, 2148.35, 2126.22, 2190.1]
  // ]);
  //
  // function splitData(rawData: (number | string)[][]) {
  //   const categoryData = [];
  //   const values = [];
  //   for (var i = 0; i < rawData.length; i++) {
  //     categoryData.push(rawData[i].splice(0, 1)[0]);
  //     values.push(rawData[i]);
  //   }
  //   return {
  //     categoryData: categoryData,
  //     values: values
  //   };
  // }
  //
  // function calculateMA(dayCount: number) {
  //   var result = [];
  //   for (var i = 0, len = data0.values.length; i < len; i++) {
  //     if (i < dayCount) {
  //       result.push('-');
  //       continue;
  //     }
  //     var sum = 0;
  //     for (var j = 0; j < dayCount; j++) {
  //       sum += +data0.values[i - j][1];
  //     }
  //     result.push(sum / dayCount);
  //   }
  //   return result;
  // }
  //
  // option = {
  //   title: {
  //     text: '上证指数',
  //     left: 0
  //   },
  //   tooltip: {
  //     trigger: 'axis',
  //     axisPointer: {
  //       type: 'cross'
  //     }
  //   },
  //   legend: {
  //     data: ['日K', 'MA5', 'MA10', 'MA20', 'MA30']
  //   },
  //   grid: {
  //     left: '10%',
  //     right: '10%',
  //     bottom: '15%'
  //   },
  //   xAxis: {
  //     type: 'category',
  //     data: data0.categoryData,
  //     boundaryGap: false,
  //     axisLine: { onZero: false },
  //     splitLine: { show: false },
  //     min: 'dataMin',
  //     max: 'dataMax'
  //   },
  //   yAxis: {
  //     scale: true,
  //     splitArea: {
  //       show: true
  //     }
  //   },
  //   dataZoom: [
  //     {
  //       type: 'inside',
  //       start: 50,
  //       end: 100
  //     },
  //     {
  //       show: true,
  //       type: 'slider',
  //       top: '90%',
  //       start: 50,
  //       end: 100
  //     }
  //   ],
  //   series: [
  //     {
  //       name: '日K',
  //       type: 'candlestick',
  //       data: data0.values,
  //       itemStyle: {
  //         color: upColor,
  //         color0: downColor,
  //         borderColor: upBorderColor,
  //         borderColor0: downBorderColor
  //       },
  //       markPoint: {
  //         label: {
  //           formatter: function (param: any) {
  //             return param != null ? Math.round(param.value) + '' : '';
  //           }
  //         },
  //         data: [
  //           {
  //             name: 'Mark',
  //             coord: ['2013/5/31', 2300],
  //             value: 2300,
  //             itemStyle: {
  //               color: 'rgb(41,60,85)'
  //             }
  //           },
  //           {
  //             name: 'highest value',
  //             type: 'max',
  //             valueDim: 'highest'
  //           },
  //           {
  //             name: 'lowest value',
  //             type: 'min',
  //             valueDim: 'lowest'
  //           },
  //           {
  //             name: 'average value on close',
  //             type: 'average',
  //             valueDim: 'close'
  //           }
  //         ],
  //         tooltip: {
  //           formatter: function (param: any) {
  //             return param.name + '<br>' + (param.data.coord || '');
  //           }
  //         }
  //       },
  //       markLine: {
  //         symbol: ['none', 'none'],
  //         data: [
  //           [
  //             {
  //               name: 'from lowest to highest',
  //               type: 'min',
  //               valueDim: 'lowest',
  //               symbol: 'circle',
  //               symbolSize: 10,
  //               label: {
  //                 show: false
  //               },
  //               emphasis: {
  //                 label: {
  //                   show: false
  //                 }
  //               }
  //             },
  //             {
  //               type: 'max',
  //               valueDim: 'highest',
  //               symbol: 'circle',
  //               symbolSize: 10,
  //               label: {
  //                 show: false
  //               },
  //               emphasis: {
  //                 label: {
  //                   show: false
  //                 }
  //               }
  //             }
  //           ],
  //           {
  //             name: 'min line on close',
  //             type: 'min',
  //             valueDim: 'close'
  //           },
  //           {
  //             name: 'max line on close',
  //             type: 'max',
  //             valueDim: 'close'
  //           }
  //         ]
  //       }
  //     },
  //     {
  //       name: 'MA5',
  //       type: 'line',
  //       data: calculateMA(5),
  //       smooth: true,
  //       lineStyle: {
  //         opacity: 0.5
  //       }
  //     },
  //     {
  //       name: 'MA10',
  //       type: 'line',
  //       data: calculateMA(10),
  //       smooth: true,
  //       lineStyle: {
  //         opacity: 0.5
  //       }
  //     },
  //     {
  //       name: 'MA20',
  //       type: 'line',
  //       data: calculateMA(20),
  //       smooth: true,
  //       lineStyle: {
  //         opacity: 0.5
  //       }
  //     },
  //     {
  //       name: 'MA30',
  //       type: 'line',
  //       data: calculateMA(30),
  //       smooth: true,
  //       lineStyle: {
  //         opacity: 0.5
  //       }
  //     }
  //   ]
  // };
  //
  // option && myChart.setOption(option);
  //
  //
  //   }
}
