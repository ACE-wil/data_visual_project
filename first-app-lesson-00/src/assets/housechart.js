function housechart() {
  console.log('你好友阿');
  var chart = Highcharts.chart('housechart', {
    chart: {
      zoomType: 'xy',
    },
    title: {
      text: '广州2022年天河区租房平均价格',
    },
    subtitle: {
      text: '数据来源: WorldClimate.com',
    },
    xAxis: [
      {
        categories: [
          '一月',
          '二月',
          '三月',
          '四月',
          '五月',
          '六月',
          '七月',
          '八月',
          '九月',
          '十月',
          '十一月',
          '十二月',
        ],
        crosshair: true,
      },
    ],
    yAxis: [
      {
        // Primary yAxis
        labels: {
          format: '{value} 比率',
          style: {
            color: Highcharts.getOptions().colors[2],
          },
        },
        title: {
          text: '准确度',
          style: {
            color: Highcharts.getOptions().colors[2],
          },
        },
        opposite: true,
      },
      {
        // Secondary yAxis
        gridLineWidth: 0,
        title: {
          text: '租房价格',
          style: {
            color: Highcharts.getOptions().colors[0],
          },
        },
        labels: {
          format: '{value} 元',
          style: {
            color: Highcharts.getOptions().colors[0],
          },
        },
      },
      {
        // Tertiary yAxis
        gridLineWidth: 0,
        title: {
          text: '房子每平价格',
          style: {
            color: Highcharts.getOptions().colors[1],
          },
        },
        labels: {
          format: '{value} 万/平方',
          style: {
            color: Highcharts.getOptions().colors[1],
          },
        },
        opposite: true,
      },
    ],
    tooltip: {
      shared: true,
    },
    legend: {
      layout: 'vertical',
      align: 'left',
      x: 80,
      verticalAlign: 'top',
      y: 55,
      floating: true,
      backgroundColor:
        (Highcharts.theme && Highcharts.theme.legendBackgroundColor) ||
        '#FFFFFF',
    },
    series: [
      {
        name: '租房价格：元',
        type: 'column',
        yAxis: 1,
        data: [
          2135, 2230, 2135, 2230, 2435, 2530, 2235, 2030, 2135, 2230, 2135,
          2230,
        ],
        tooltip: {
          valueSuffix: ' 元',
        },
      },
      {
        name: '房子每平价格',
        type: 'spline',
        yAxis: 2,
        data: [8.5, 8.9, 9, 8, 8.2, 8.5, 8.9, 9, 8],
        marker: {
          enabled: false,
        },
        dashStyle: 'shortdot',
        tooltip: {
          valueSuffix: ' mb',
        },
      },
      {
        name: '准确度',
        type: 'spline',
        data: [1.0, 0.6, 0.3, 0.5, 0.6, 0.8, 0.2, 1.0, 0.6, 0.3, 0.5, 0.6],
        tooltip: {
          valueSuffix: ' 比率',
        },
      },
    ],
  });
}
