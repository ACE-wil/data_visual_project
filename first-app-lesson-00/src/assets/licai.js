function licai() {
  $(function () {
    /**
     * Create a constructor for sparklines that takes some sensible defaults and merges in the individual
     * chart options. This function is also available from the jQuery plugin as $(element).highcharts('SparkLine').
     */
    Highcharts.SparkLine = function (a, b, c) {
      var hasRenderToArg = typeof a === 'string' || a.nodeName,
        options = arguments[hasRenderToArg ? 1 : 0],
        defaultOptions = {
          chart: {
            renderTo: (options.chart && options.chart.renderTo) || this,
            backgroundColor: null,
            borderWidth: 0,
            type: 'area',
            margin: [2, 0, 2, 0],
            width: 120,
            height: 20,
            style: {
              overflow: 'visible',
            },
            // small optimalization, saves 1-2 ms each sparkline
            skipClone: true,
          },
          title: {
            text: '',
          },
          credits: {
            enabled: false,
          },
          xAxis: {
            labels: {
              enabled: false,
            },
            title: {
              text: null,
            },
            startOnTick: false,
            endOnTick: false,
            tickPositions: [],
          },
          yAxis: {
            endOnTick: false,
            startOnTick: false,
            labels: {
              enabled: false,
            },
            title: {
              text: null,
            },
            tickPositions: [0],
          },
          legend: {
            enabled: false,
          },
          tooltip: {
            hideDelay: 0,
            outside: true,
            shared: true,
          },
          plotOptions: {
            series: {
              animation: false,
              lineWidth: 1,
              shadow: false,
              states: {
                hover: {
                  lineWidth: 1,
                },
              },
              marker: {
                radius: 1,
                states: {
                  hover: {
                    radius: 2,
                  },
                },
              },
              fillOpacity: 0.25,
            },
            column: {
              negativeColor: '#910000',
              borderColor: 'silver',
            },
          },
        };
      options = Highcharts.merge(defaultOptions, options);
      return hasRenderToArg
        ? new Highcharts.Chart(a, options, c)
        : new Highcharts.Chart(options, b);
    };
    var start = +new Date(),
      $tds = $('td[data-sparkline]'),
      fullLen = $tds.length,
      n = 0;
    // Creating 153 sparkline charts is quite fast in modern browsers, but IE8 and mobile
    // can take some seconds, so we split the input into chunks and apply them in timeouts
    // in order avoid locking up the browser process and allow interaction.
    function doChunk() {
      var time = +new Date(),
        i,
        len = $tds.length,
        $td,
        stringdata,
        arr,
        data,
        chart;
      for (i = 0; i < len; i += 1) {
        $td = $($tds[i]);
        stringdata = $td.data('sparkline');
        arr = stringdata.split('; ');
        data = $.map(arr[0].split(', '), parseFloat);
        chart = {};
        if (arr[1]) {
          chart.type = arr[1];
        }
        $td.highcharts('SparkLine', {
          series: [
            {
              data: data,
              pointStart: 1,
            },
          ],
          tooltip: {
            headerFormat:
              '<span>' +
              $td.parent().find('th').html() +
              ', Q{point.x}:</span><br/>',
            pointFormat: '<b>{point.y}.000</b> USD',
          },
          chart: chart,
        });
        n += 1;
        // If the process takes too much time, run a timeout to allow interaction with the browser
        if (new Date() - time > 500) {
          $tds.splice(0, i + 1);
          setTimeout(doChunk, 0);
          break;
        }
        // 打印耗时
        if (n === fullLen) {
          $('#result').html(
            '生成' +
              fullLen +
              '个迷你图，耗时 ' +
              (new Date() - start) +
              ' 毫秒'
          );
        }
      }
    }
    doChunk();
  });
}
