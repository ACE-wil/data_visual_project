/*
 Highmaps JS v10.0.0 (2022-03-07)

 (c) 2011-2021 Torstein Honsi

 License: www.highcharts.com/license
*/
(function (W, J) {
  'object' === typeof module && module.exports
    ? ((J['default'] = J), (module.exports = W.document ? J(W) : J))
    : 'function' === typeof define && define.amd
      ? define('highcharts/highmaps', function () {
          return J(W);
        })
      : (W.Highcharts && W.Highcharts.error(16, !0), (W.Highcharts = J(W)));
})('undefined' !== typeof window ? window : this, function (W) {
  function J(b, I, e, E) {
    b.hasOwnProperty(I) ||
      ((b[I] = E.apply(null, e)),
      'function' === typeof CustomEvent &&
        W.dispatchEvent(
          new CustomEvent('HighchartsModuleLoaded', {
            detail: { path: I, module: b[I] },
          })
        ));
  }
  var e = {};
  J(e, 'Core/Globals.js', [], function () {
    var b;
    (function (b) {
      b.SVG_NS = 'http://www.w3.org/2000/svg';
      b.product = 'Highcharts';
      b.version = '10.0.0';
      b.win = 'undefined' !== typeof W ? W : {};
      b.doc = b.win.document;
      b.svg =
        b.doc &&
        b.doc.createElementNS &&
        !!b.doc.createElementNS(b.SVG_NS, 'svg').createSVGRect;
      b.userAgent = (b.win.navigator && b.win.navigator.userAgent) || '';
      b.isChrome = -1 !== b.userAgent.indexOf('Chrome');
      b.isFirefox = -1 !== b.userAgent.indexOf('Firefox');
      b.isMS = /(edge|msie|trident)/i.test(b.userAgent) && !b.win.opera;
      b.isSafari = !b.isChrome && -1 !== b.userAgent.indexOf('Safari');
      b.isTouchDevice = /(Mobile|Android|Windows Phone)/.test(b.userAgent);
      b.isWebKit = -1 !== b.userAgent.indexOf('AppleWebKit');
      b.deg2rad = (2 * Math.PI) / 360;
      b.hasBidiBug =
        b.isFirefox && 4 > parseInt(b.userAgent.split('Firefox/')[1], 10);
      b.hasTouch = !!b.win.TouchEvent;
      b.marginNames = ['plotTop', 'marginRight', 'marginBottom', 'plotLeft'];
      b.noop = function () {};
      b.supportsPassiveEvents = (function () {
        var e = !1;
        if (!b.isMS) {
          var I = Object.defineProperty({}, 'passive', {
            get: function () {
              e = !0;
            },
          });
          b.win.addEventListener &&
            b.win.removeEventListener &&
            (b.win.addEventListener('testPassive', b.noop, I),
            b.win.removeEventListener('testPassive', b.noop, I));
        }
        return e;
      })();
      b.charts = [];
      b.dateFormats = {};
      b.seriesTypes = {};
      b.symbolSizes = {};
      b.chartCount = 0;
    })(b || (b = {}));
    ('');
    return b;
  });
  J(e, 'Core/Utilities.js', [e['Core/Globals.js']], function (b) {
    function e(c, u, g, h) {
      var F = u ? 'Highcharts error' : 'Highcharts warning';
      32 === c && (c = F + ': Deprecated member');
      var D = l(c),
        a = D
          ? F + ' #' + c + ': www.highcharts.com/errors/' + c + '/'
          : c.toString();
      if ('undefined' !== typeof h) {
        var m = '';
        D && (a += '?');
        B(h, function (c, u) {
          m += '\n - ' + u + ': ' + c;
          D && (a += encodeURI(u) + '=' + encodeURI(c));
        });
        a += m;
      }
      r(
        b,
        'displayError',
        { chart: g, code: c, message: a, params: h },
        function () {
          if (u) throw Error(a);
          p.console && -1 === e.messages.indexOf(a) && console.warn(a);
        }
      );
      e.messages.push(a);
    }
    function v(c, u) {
      var F = {};
      B(c, function (g, h) {
        if (C(c[h], !0) && !c.nodeType && u[h])
          (g = v(c[h], u[h])), Object.keys(g).length && (F[h] = g);
        else if (C(c[h]) || c[h] !== u[h] || (h in c && !(h in u))) F[h] = c[h];
      });
      return F;
    }
    function E(c, u) {
      return parseInt(c, u || 10);
    }
    function t(c) {
      return 'string' === typeof c;
    }
    function A(c) {
      c = Object.prototype.toString.call(c);
      return '[object Array]' === c || '[object Array Iterator]' === c;
    }
    function C(c, u) {
      return !!c && 'object' === typeof c && (!u || !A(c));
    }
    function z(c) {
      return C(c) && 'number' === typeof c.nodeType;
    }
    function q(c) {
      var u = c && c.constructor;
      return !(!C(c, !0) || z(c) || !u || !u.name || 'Object' === u.name);
    }
    function l(c) {
      return (
        'number' === typeof c && !isNaN(c) && Infinity > c && -Infinity < c
      );
    }
    function n(c) {
      return 'undefined' !== typeof c && null !== c;
    }
    function d(c, u, g) {
      var h = t(u) && !n(g),
        F,
        a = function (u, g) {
          n(u)
            ? c.setAttribute(g, u)
            : h
              ? (F = c.getAttribute(g)) ||
                'class' !== g ||
                (F = c.getAttribute(g + 'Name'))
              : c.removeAttribute(g);
        };
      t(u) ? a(g, u) : B(u, a);
      return F;
    }
    function a(c, u) {
      var g;
      c || (c = {});
      for (g in u) c[g] = u[g];
      return c;
    }
    function f() {
      for (var c = arguments, u = c.length, g = 0; g < u; g++) {
        var h = c[g];
        if ('undefined' !== typeof h && null !== h) return h;
      }
    }
    function k(c, u) {
      b.isMS &&
        !b.svg &&
        u &&
        n(u.opacity) &&
        (u.filter = 'alpha(opacity=' + 100 * u.opacity + ')');
      a(c.style, u);
    }
    function G(c, u) {
      return 1e14 < c ? c : parseFloat(c.toPrecision(u || 14));
    }
    function y(c, u, g) {
      var h = b.getStyle || y;
      if ('width' === u)
        return (
          (u = Math.min(c.offsetWidth, c.scrollWidth)),
          (g = c.getBoundingClientRect && c.getBoundingClientRect().width),
          g < u && g >= u - 1 && (u = Math.floor(g)),
          Math.max(
            0,
            u -
              (h(c, 'padding-left', !0) || 0) -
              (h(c, 'padding-right', !0) || 0)
          )
        );
      if ('height' === u)
        return Math.max(
          0,
          Math.min(c.offsetHeight, c.scrollHeight) -
            (h(c, 'padding-top', !0) || 0) -
            (h(c, 'padding-bottom', !0) || 0)
        );
      p.getComputedStyle || e(27, !0);
      if ((c = p.getComputedStyle(c, void 0))) {
        var a = c.getPropertyValue(u);
        f(g, 'opacity' !== u) && (a = E(a));
      }
      return a;
    }
    function B(c, u, g) {
      for (var h in c)
        Object.hasOwnProperty.call(c, h) && u.call(g || c[h], c[h], h, c);
    }
    function x(c, u, g) {
      function h(u, g) {
        var h = c.removeEventListener || b.removeEventListenerPolyfill;
        h && h.call(c, u, g, !1);
      }
      function a(g) {
        var a;
        if (c.nodeName) {
          if (u) {
            var F = {};
            F[u] = !0;
          } else F = g;
          B(F, function (c, u) {
            if (g[u]) for (a = g[u].length; a--; ) h(u, g[u][a].fn);
          });
        }
      }
      var F = ('function' === typeof c && c.prototype) || c;
      if (Object.hasOwnProperty.call(F, 'hcEvents')) {
        var m = F.hcEvents;
        u
          ? ((F = m[u] || []),
            g
              ? ((m[u] = F.filter(function (c) {
                  return g !== c.fn;
                })),
                h(u, g))
              : (a(m), (m[u] = [])))
          : (a(m), delete F.hcEvents);
      }
    }
    function r(c, u, g, m) {
      g = g || {};
      if (h.createEvent && (c.dispatchEvent || (c.fireEvent && c !== b))) {
        var F = h.createEvent('Events');
        F.initEvent(u, !0, !0);
        g = a(F, g);
        c.dispatchEvent ? c.dispatchEvent(g) : c.fireEvent(u, g);
      } else if (c.hcEvents) {
        g.target ||
          a(g, {
            preventDefault: function () {
              g.defaultPrevented = !0;
            },
            target: c,
            type: u,
          });
        F = [];
        for (var p = c, D = !1; p.hcEvents; )
          Object.hasOwnProperty.call(p, 'hcEvents') &&
            p.hcEvents[u] &&
            (F.length && (D = !0), F.unshift.apply(F, p.hcEvents[u])),
            (p = Object.getPrototypeOf(p));
        D &&
          F.sort(function (c, g) {
            return c.order - g.order;
          });
        F.forEach(function (u) {
          !1 === u.fn.call(c, g) && g.preventDefault();
        });
      }
      m && !g.defaultPrevented && m.call(c, g);
    }
    var m = b.charts,
      h = b.doc,
      p = b.win;
    (e || (e = {})).messages = [];
    Math.easeInOutSine = function (c) {
      return -0.5 * (Math.cos(Math.PI * c) - 1);
    };
    var c = Array.prototype.find
      ? function (c, g) {
          return c.find(g);
        }
      : function (c, g) {
          var u,
            h = c.length;
          for (u = 0; u < h; u++) if (g(c[u], u)) return c[u];
        };
    B(
      {
        map: 'map',
        each: 'forEach',
        grep: 'filter',
        reduce: 'reduce',
        some: 'some',
      },
      function (c, g) {
        b[g] = function (u) {
          var h;
          e(
            32,
            !1,
            void 0,
            ((h = {}), (h['Highcharts.' + g] = 'use Array.' + c), h)
          );
          return Array.prototype[c].apply(u, [].slice.call(arguments, 1));
        };
      }
    );
    var w,
      g = (function () {
        var c = Math.random().toString(36).substring(2, 9) + '-',
          g = 0;
        return function () {
          return 'highcharts-' + (w ? '' : c) + g++;
        };
      })();
    p.jQuery &&
      (p.jQuery.fn.highcharts = function () {
        var c = [].slice.call(arguments);
        if (this[0])
          return c[0]
            ? (new b[t(c[0]) ? c.shift() : 'Chart'](this[0], c[0], c[1]), this)
            : m[d(this[0], 'data-highcharts-chart')];
      });
    c = {
      addEvent: function (c, g, h, a) {
        void 0 === a && (a = {});
        var u = ('function' === typeof c && c.prototype) || c;
        Object.hasOwnProperty.call(u, 'hcEvents') || (u.hcEvents = {});
        u = u.hcEvents;
        b.Point &&
          c instanceof b.Point &&
          c.series &&
          c.series.chart &&
          (c.series.chart.runTrackerClick = !0);
        var m = c.addEventListener || b.addEventListenerPolyfill;
        m &&
          m.call(
            c,
            g,
            h,
            b.supportsPassiveEvents
              ? {
                  passive:
                    void 0 === a.passive
                      ? -1 !== g.indexOf('touch')
                      : a.passive,
                  capture: !1,
                }
              : !1
          );
        u[g] || (u[g] = []);
        u[g].push({
          fn: h,
          order: 'number' === typeof a.order ? a.order : Infinity,
        });
        u[g].sort(function (c, g) {
          return c.order - g.order;
        });
        return function () {
          x(c, g, h);
        };
      },
      arrayMax: function (c) {
        for (var g = c.length, h = c[0]; g--; ) c[g] > h && (h = c[g]);
        return h;
      },
      arrayMin: function (c) {
        for (var g = c.length, h = c[0]; g--; ) c[g] < h && (h = c[g]);
        return h;
      },
      attr: d,
      clamp: function (c, g, h) {
        return c > g ? (c < h ? c : h) : g;
      },
      cleanRecursively: v,
      clearTimeout: function (c) {
        n(c) && clearTimeout(c);
      },
      correctFloat: G,
      createElement: function (c, g, m, p, f) {
        c = h.createElement(c);
        g && a(c, g);
        f && k(c, { padding: '0', border: 'none', margin: '0' });
        m && k(c, m);
        p && p.appendChild(c);
        return c;
      },
      css: k,
      defined: n,
      destroyObjectProperties: function (c, g) {
        B(c, function (h, u) {
          h && h !== g && h.destroy && h.destroy();
          delete c[u];
        });
      },
      discardElement: function (c) {
        c && c.parentElement && c.parentElement.removeChild(c);
      },
      erase: function (c, g) {
        for (var h = c.length; h--; )
          if (c[h] === g) {
            c.splice(h, 1);
            break;
          }
      },
      error: e,
      extend: a,
      extendClass: function (c, g) {
        var h = function () {};
        h.prototype = new c();
        a(h.prototype, g);
        return h;
      },
      find: c,
      fireEvent: r,
      getMagnitude: function (c) {
        return Math.pow(10, Math.floor(Math.log(c) / Math.LN10));
      },
      getNestedProperty: function (c, g) {
        for (c = c.split('.'); c.length && n(g); ) {
          var h = c.shift();
          if ('undefined' === typeof h || '__proto__' === h) return;
          g = g[h];
          if (
            !n(g) ||
            'function' === typeof g ||
            'number' === typeof g.nodeType ||
            g === p
          )
            return;
        }
        return g;
      },
      getStyle: y,
      inArray: function (c, g, h) {
        e(32, !1, void 0, { 'Highcharts.inArray': 'use Array.indexOf' });
        return g.indexOf(c, h);
      },
      isArray: A,
      isClass: q,
      isDOMElement: z,
      isFunction: function (c) {
        return 'function' === typeof c;
      },
      isNumber: l,
      isObject: C,
      isString: t,
      keys: function (c) {
        e(32, !1, void 0, { 'Highcharts.keys': 'use Object.keys' });
        return Object.keys(c);
      },
      merge: function () {
        var c,
          g = arguments,
          h = {},
          a = function (c, g) {
            'object' !== typeof c && (c = {});
            B(g, function (h, u) {
              '__proto__' !== u &&
                'constructor' !== u &&
                (!C(h, !0) || q(h) || z(h)
                  ? (c[u] = g[u])
                  : (c[u] = a(c[u] || {}, h)));
            });
            return c;
          };
        !0 === g[0] && ((h = g[1]), (g = Array.prototype.slice.call(g, 2)));
        var m = g.length;
        for (c = 0; c < m; c++) h = a(h, g[c]);
        return h;
      },
      normalizeTickInterval: function (c, g, h, a, m) {
        var u = c;
        h = f(h, 1);
        var p = c / h;
        g ||
          ((g = m
            ? [1, 1.2, 1.5, 2, 2.5, 3, 4, 5, 6, 8, 10]
            : [1, 2, 2.5, 5, 10]),
          !1 === a &&
            (1 === h
              ? (g = g.filter(function (c) {
                  return 0 === c % 1;
                }))
              : 0.1 >= h && (g = [1 / h])));
        for (
          a = 0;
          a < g.length &&
          !((u = g[a]),
          (m && u * h >= c) || (!m && p <= (g[a] + (g[a + 1] || g[a])) / 2));
          a++
        );
        return (u = G(u * h, -Math.round(Math.log(0.001) / Math.LN10)));
      },
      objectEach: B,
      offset: function (c) {
        var g = h.documentElement;
        c =
          c.parentElement || c.parentNode
            ? c.getBoundingClientRect()
            : { top: 0, left: 0, width: 0, height: 0 };
        return {
          top: c.top + (p.pageYOffset || g.scrollTop) - (g.clientTop || 0),
          left: c.left + (p.pageXOffset || g.scrollLeft) - (g.clientLeft || 0),
          width: c.width,
          height: c.height,
        };
      },
      pad: function (c, g, h) {
        return (
          Array((g || 2) + 1 - String(c).replace('-', '').length).join(
            h || '0'
          ) + c
        );
      },
      pick: f,
      pInt: E,
      relativeLength: function (c, g, h) {
        return /%$/.test(c)
          ? (g * parseFloat(c)) / 100 + (h || 0)
          : parseFloat(c);
      },
      removeEvent: x,
      splat: function (c) {
        return A(c) ? c : [c];
      },
      stableSort: function (c, g) {
        var h = c.length,
          u,
          a;
        for (a = 0; a < h; a++) c[a].safeI = a;
        c.sort(function (c, h) {
          u = g(c, h);
          return 0 === u ? c.safeI - h.safeI : u;
        });
        for (a = 0; a < h; a++) delete c[a].safeI;
      },
      syncTimeout: function (c, g, h) {
        if (0 < g) return setTimeout(c, g, h);
        c.call(0, h);
        return -1;
      },
      timeUnits: {
        millisecond: 1,
        second: 1e3,
        minute: 6e4,
        hour: 36e5,
        day: 864e5,
        week: 6048e5,
        month: 24192e5,
        year: 314496e5,
      },
      uniqueKey: g,
      useSerialIds: function (c) {
        return (w = f(c, w));
      },
      wrap: function (c, g, h) {
        var a = c[g];
        c[g] = function () {
          var c = Array.prototype.slice.call(arguments),
            g = arguments,
            u = this;
          u.proceed = function () {
            a.apply(u, arguments.length ? arguments : g);
          };
          c.unshift(a);
          c = h.apply(this, c);
          u.proceed = null;
          return c;
        };
      },
    };
    ('');
    return c;
  });
  J(e, 'Core/Chart/ChartDefaults.js', [], function () {
    return {
      alignThresholds: !1,
      panning: { enabled: !1, type: 'x' },
      styledMode: !1,
      borderRadius: 0,
      colorCount: 10,
      defaultSeriesType: 'line',
      ignoreHiddenSeries: !0,
      spacing: [10, 10, 15, 10],
      resetZoomButton: {
        theme: { zIndex: 6 },
        position: { align: 'right', x: -10, y: 10 },
      },
      zoomBySingleTouch: !1,
      width: null,
      height: null,
      borderColor: '#335cad',
      backgroundColor: '#ffffff',
      plotBorderColor: '#cccccc',
    };
  });
  J(
    e,
    'Core/Color/Color.js',
    [e['Core/Globals.js'], e['Core/Utilities.js']],
    function (b, e) {
      var I = e.isNumber,
        E = e.merge,
        t = e.pInt;
      e = (function () {
        function e(C) {
          this.rgba = [NaN, NaN, NaN, NaN];
          this.input = C;
          var z = b.Color;
          if (z && z !== e) return new z(C);
          if (!(this instanceof e)) return new e(C);
          this.init(C);
        }
        e.parse = function (b) {
          return b ? new e(b) : e.None;
        };
        e.prototype.init = function (b) {
          var z;
          if ('object' === typeof b && 'undefined' !== typeof b.stops)
            this.stops = b.stops.map(function (d) {
              return new e(d[1]);
            });
          else if ('string' === typeof b) {
            this.input = b = e.names[b.toLowerCase()] || b;
            if ('#' === b.charAt(0)) {
              var q = b.length;
              var l = parseInt(b.substr(1), 16);
              7 === q
                ? (z = [(l & 16711680) >> 16, (l & 65280) >> 8, l & 255, 1])
                : 4 === q &&
                  (z = [
                    ((l & 3840) >> 4) | ((l & 3840) >> 8),
                    ((l & 240) >> 4) | (l & 240),
                    ((l & 15) << 4) | (l & 15),
                    1,
                  ]);
            }
            if (!z)
              for (l = e.parsers.length; l-- && !z; ) {
                var n = e.parsers[l];
                (q = n.regex.exec(b)) && (z = n.parse(q));
              }
          }
          z && (this.rgba = z);
        };
        e.prototype.get = function (b) {
          var z = this.input,
            q = this.rgba;
          if ('object' === typeof z && 'undefined' !== typeof this.stops) {
            var l = E(z);
            l.stops = [].slice.call(l.stops);
            this.stops.forEach(function (n, d) {
              l.stops[d] = [l.stops[d][0], n.get(b)];
            });
            return l;
          }
          return q && I(q[0])
            ? 'rgb' === b || (!b && 1 === q[3])
              ? 'rgb(' + q[0] + ',' + q[1] + ',' + q[2] + ')'
              : 'a' === b
                ? '' + q[3]
                : 'rgba(' + q.join(',') + ')'
            : z;
        };
        e.prototype.brighten = function (b) {
          var z = this.rgba;
          if (this.stops)
            this.stops.forEach(function (l) {
              l.brighten(b);
            });
          else if (I(b) && 0 !== b)
            for (var q = 0; 3 > q; q++)
              (z[q] += t(255 * b)),
                0 > z[q] && (z[q] = 0),
                255 < z[q] && (z[q] = 255);
          return this;
        };
        e.prototype.setOpacity = function (b) {
          this.rgba[3] = b;
          return this;
        };
        e.prototype.tweenTo = function (b, z) {
          var q = this.rgba,
            l = b.rgba;
          if (!I(q[0]) || !I(l[0])) return b.input || 'none';
          b = 1 !== l[3] || 1 !== q[3];
          return (
            (b ? 'rgba(' : 'rgb(') +
            Math.round(l[0] + (q[0] - l[0]) * (1 - z)) +
            ',' +
            Math.round(l[1] + (q[1] - l[1]) * (1 - z)) +
            ',' +
            Math.round(l[2] + (q[2] - l[2]) * (1 - z)) +
            (b ? ',' + (l[3] + (q[3] - l[3]) * (1 - z)) : '') +
            ')'
          );
        };
        e.names = { white: '#ffffff', black: '#000000' };
        e.parsers = [
          {
            regex:
              /rgba\(\s*([0-9]{1,3})\s*,\s*([0-9]{1,3})\s*,\s*([0-9]{1,3})\s*,\s*([0-9]?(?:\.[0-9]+)?)\s*\)/,
            parse: function (b) {
              return [t(b[1]), t(b[2]), t(b[3]), parseFloat(b[4], 10)];
            },
          },
          {
            regex:
              /rgb\(\s*([0-9]{1,3})\s*,\s*([0-9]{1,3})\s*,\s*([0-9]{1,3})\s*\)/,
            parse: function (b) {
              return [t(b[1]), t(b[2]), t(b[3]), 1];
            },
          },
        ];
        e.None = new e('');
        return e;
      })();
      ('');
      return e;
    }
  );
  J(e, 'Core/Color/Palettes.js', [], function () {
    return {
      colors:
        '#7cb5ec #434348 #90ed7d #f7a35c #8085e9 #f15c80 #e4d354 #2b908f #f45b5b #91e8e1'.split(
          ' '
        ),
    };
  });
  J(
    e,
    'Core/Time.js',
    [e['Core/Globals.js'], e['Core/Utilities.js']],
    function (b, e) {
      var I = b.win,
        E = e.defined,
        t = e.error,
        A = e.extend,
        C = e.isObject,
        z = e.merge,
        q = e.objectEach,
        l = e.pad,
        n = e.pick,
        d = e.splat,
        a = e.timeUnits,
        f = b.isSafari && I.Intl && I.Intl.DateTimeFormat.prototype.formatRange,
        k =
          b.isSafari && I.Intl && !I.Intl.DateTimeFormat.prototype.formatRange;
      e = (function () {
        function G(a) {
          this.options = {};
          this.variableTimezone = this.useUTC = !1;
          this.Date = I.Date;
          this.getTimezoneOffset = this.timezoneOffsetFunction();
          this.update(a);
        }
        G.prototype.get = function (a, f) {
          if (this.variableTimezone || this.timezoneOffset) {
            var d = f.getTime(),
              r = d - this.getTimezoneOffset(f);
            f.setTime(r);
            a = f['getUTC' + a]();
            f.setTime(d);
            return a;
          }
          return this.useUTC ? f['getUTC' + a]() : f['get' + a]();
        };
        G.prototype.set = function (a, d, k) {
          if (this.variableTimezone || this.timezoneOffset) {
            if (
              'Milliseconds' === a ||
              'Seconds' === a ||
              ('Minutes' === a && 0 === this.getTimezoneOffset(d) % 36e5)
            )
              return d['setUTC' + a](k);
            var r = this.getTimezoneOffset(d);
            r = d.getTime() - r;
            d.setTime(r);
            d['setUTC' + a](k);
            a = this.getTimezoneOffset(d);
            r = d.getTime() + a;
            return d.setTime(r);
          }
          return this.useUTC || (f && 'FullYear' === a)
            ? d['setUTC' + a](k)
            : d['set' + a](k);
        };
        G.prototype.update = function (a) {
          var f = n(a && a.useUTC, !0);
          this.options = a = z(!0, this.options || {}, a);
          this.Date = a.Date || I.Date || Date;
          this.timezoneOffset = (this.useUTC = f) && a.timezoneOffset;
          this.getTimezoneOffset = this.timezoneOffsetFunction();
          this.variableTimezone = f && !(!a.getTimezoneOffset && !a.timezone);
        };
        G.prototype.makeTime = function (a, f, d, r, m, h) {
          if (this.useUTC) {
            var p = this.Date.UTC.apply(0, arguments);
            var c = this.getTimezoneOffset(p);
            p += c;
            var w = this.getTimezoneOffset(p);
            c !== w
              ? (p += w - c)
              : c - 36e5 !== this.getTimezoneOffset(p - 36e5) ||
                k ||
                (p -= 36e5);
          } else
            p = new this.Date(
              a,
              f,
              n(d, 1),
              n(r, 0),
              n(m, 0),
              n(h, 0)
            ).getTime();
          return p;
        };
        G.prototype.timezoneOffsetFunction = function () {
          var a = this,
            f = this.options,
            d = f.getTimezoneOffset,
            k = f.moment || I.moment;
          if (!this.useUTC)
            return function (a) {
              return 6e4 * new Date(a.toString()).getTimezoneOffset();
            };
          if (f.timezone) {
            if (k)
              return function (a) {
                return 6e4 * -k.tz(a, f.timezone).utcOffset();
              };
            t(25);
          }
          return this.useUTC && d
            ? function (a) {
                return 6e4 * d(a.valueOf());
              }
            : function () {
                return 6e4 * (a.timezoneOffset || 0);
              };
        };
        G.prototype.dateFormat = function (a, f, d) {
          if (!E(f) || isNaN(f))
            return (
              (b.defaultOptions.lang && b.defaultOptions.lang.invalidDate) || ''
            );
          a = n(a, '%Y-%m-%d %H:%M:%S');
          var k = this,
            m = new this.Date(f),
            h = this.get('Hours', m),
            p = this.get('Day', m),
            c = this.get('Date', m),
            w = this.get('Month', m),
            g = this.get('FullYear', m),
            F = b.defaultOptions.lang,
            u = F && F.weekdays,
            D = F && F.shortWeekdays;
          m = A(
            {
              a: D ? D[p] : u[p].substr(0, 3),
              A: u[p],
              d: l(c),
              e: l(c, 2, ' '),
              w: p,
              b: F.shortMonths[w],
              B: F.months[w],
              m: l(w + 1),
              o: w + 1,
              y: g.toString().substr(2, 2),
              Y: g,
              H: l(h),
              k: h,
              I: l(h % 12 || 12),
              l: h % 12 || 12,
              M: l(this.get('Minutes', m)),
              p: 12 > h ? 'AM' : 'PM',
              P: 12 > h ? 'am' : 'pm',
              S: l(m.getSeconds()),
              L: l(Math.floor(f % 1e3), 3),
            },
            b.dateFormats
          );
          q(m, function (c, g) {
            for (; -1 !== a.indexOf('%' + g); )
              a = a.replace(
                '%' + g,
                'function' === typeof c ? c.call(k, f) : c
              );
          });
          return d ? a.substr(0, 1).toUpperCase() + a.substr(1) : a;
        };
        G.prototype.resolveDTLFormat = function (a) {
          return C(a, !0)
            ? a
            : ((a = d(a)), { main: a[0], from: a[1], to: a[2] });
        };
        G.prototype.getTimeTicks = function (f, d, k, r) {
          var m = this,
            h = [],
            p = {},
            c = new m.Date(d),
            w = f.unitRange,
            g = f.count || 1,
            F;
          r = n(r, 1);
          if (E(d)) {
            m.set(
              'Milliseconds',
              c,
              w >= a.second ? 0 : g * Math.floor(m.get('Milliseconds', c) / g)
            );
            w >= a.second &&
              m.set(
                'Seconds',
                c,
                w >= a.minute ? 0 : g * Math.floor(m.get('Seconds', c) / g)
              );
            w >= a.minute &&
              m.set(
                'Minutes',
                c,
                w >= a.hour ? 0 : g * Math.floor(m.get('Minutes', c) / g)
              );
            w >= a.hour &&
              m.set(
                'Hours',
                c,
                w >= a.day ? 0 : g * Math.floor(m.get('Hours', c) / g)
              );
            w >= a.day &&
              m.set(
                'Date',
                c,
                w >= a.month
                  ? 1
                  : Math.max(1, g * Math.floor(m.get('Date', c) / g))
              );
            if (w >= a.month) {
              m.set(
                'Month',
                c,
                w >= a.year ? 0 : g * Math.floor(m.get('Month', c) / g)
              );
              var u = m.get('FullYear', c);
            }
            w >= a.year && m.set('FullYear', c, u - (u % g));
            w === a.week &&
              ((u = m.get('Day', c)),
              m.set('Date', c, m.get('Date', c) - u + r + (u < r ? -7 : 0)));
            u = m.get('FullYear', c);
            r = m.get('Month', c);
            var D = m.get('Date', c),
              x = m.get('Hours', c);
            d = c.getTime();
            (!m.variableTimezone && m.useUTC) ||
              !E(k) ||
              (F =
                k - d > 4 * a.month ||
                m.getTimezoneOffset(d) !== m.getTimezoneOffset(k));
            d = c.getTime();
            for (c = 1; d < k; )
              h.push(d),
                (d =
                  w === a.year
                    ? m.makeTime(u + c * g, 0)
                    : w === a.month
                      ? m.makeTime(u, r + c * g)
                      : !F || (w !== a.day && w !== a.week)
                        ? F && w === a.hour && 1 < g
                          ? m.makeTime(u, r, D, x + c * g)
                          : d + w * g
                        : m.makeTime(u, r, D + c * g * (w === a.day ? 1 : 7))),
                c++;
            h.push(d);
            w <= a.hour &&
              1e4 > h.length &&
              h.forEach(function (c) {
                0 === c % 18e5 &&
                  '000000000' === m.dateFormat('%H%M%S%L', c) &&
                  (p[c] = 'day');
              });
          }
          h.info = A(f, { higherRanks: p, totalRange: w * g });
          return h;
        };
        G.prototype.getDateFormat = function (f, d, k, r) {
          var m = this.dateFormat('%m-%d %H:%M:%S.%L', d),
            h = { millisecond: 15, second: 12, minute: 9, hour: 6, day: 3 },
            p = 'millisecond';
          for (c in a) {
            if (
              f === a.week &&
              +this.dateFormat('%w', d) === k &&
              '00:00:00.000' === m.substr(6)
            ) {
              var c = 'week';
              break;
            }
            if (a[c] > f) {
              c = p;
              break;
            }
            if (h[c] && m.substr(h[c]) !== '01-01 00:00:00.000'.substr(h[c]))
              break;
            'week' !== c && (p = c);
          }
          if (c) var w = this.resolveDTLFormat(r[c]).main;
          return w;
        };
        return G;
      })();
      ('');
      return e;
    }
  );
  J(
    e,
    'Core/DefaultOptions.js',
    [
      e['Core/Chart/ChartDefaults.js'],
      e['Core/Color/Color.js'],
      e['Core/Globals.js'],
      e['Core/Color/Palettes.js'],
      e['Core/Time.js'],
      e['Core/Utilities.js'],
    ],
    function (b, e, v, E, t, A) {
      e = e.parse;
      var I = A.merge,
        z = {
          colors: E.colors,
          symbols: ['circle', 'diamond', 'square', 'triangle', 'triangle-down'],
          lang: {
            loading: 'Loading...',
            months:
              'January February March April May June July August September October November December'.split(
                ' '
              ),
            shortMonths:
              'Jan Feb Mar Apr May Jun Jul Aug Sep Oct Nov Dec'.split(' '),
            weekdays:
              'Sunday Monday Tuesday Wednesday Thursday Friday Saturday'.split(
                ' '
              ),
            decimalPoint: '.',
            numericSymbols: 'kMGTPE'.split(''),
            resetZoom: 'Reset zoom',
            resetZoomTitle: 'Reset zoom level 1:1',
            thousandsSep: ' ',
          },
          global: {},
          time: {
            Date: void 0,
            getTimezoneOffset: void 0,
            timezone: void 0,
            timezoneOffset: 0,
            useUTC: !0,
          },
          chart: b,
          title: {
            text: 'Chart title',
            align: 'center',
            margin: 15,
            widthAdjust: -44,
          },
          subtitle: { text: '', align: 'center', widthAdjust: -44 },
          caption: {
            margin: 15,
            text: '',
            align: 'left',
            verticalAlign: 'bottom',
          },
          plotOptions: {},
          labels: { style: { position: 'absolute', color: '#333333' } },
          legend: {
            enabled: !0,
            align: 'center',
            alignColumns: !0,
            className: 'highcharts-no-tooltip',
            layout: 'horizontal',
            labelFormatter: function () {
              return this.name;
            },
            borderColor: '#999999',
            borderRadius: 0,
            navigation: { activeColor: '#003399', inactiveColor: '#cccccc' },
            itemStyle: {
              color: '#333333',
              cursor: 'pointer',
              fontSize: '12px',
              fontWeight: 'bold',
              textOverflow: 'ellipsis',
            },
            itemHoverStyle: { color: '#000000' },
            itemHiddenStyle: { color: '#cccccc' },
            shadow: !1,
            itemCheckboxStyle: {
              position: 'absolute',
              width: '13px',
              height: '13px',
            },
            squareSymbol: !0,
            symbolPadding: 5,
            verticalAlign: 'bottom',
            x: 0,
            y: 0,
            title: { style: { fontWeight: 'bold' } },
          },
          loading: {
            labelStyle: {
              fontWeight: 'bold',
              position: 'relative',
              top: '45%',
            },
            style: {
              position: 'absolute',
              backgroundColor: '#ffffff',
              opacity: 0.5,
              textAlign: 'center',
            },
          },
          tooltip: {
            enabled: !0,
            animation: v.svg,
            borderRadius: 3,
            dateTimeLabelFormats: {
              millisecond: '%A, %b %e, %H:%M:%S.%L',
              second: '%A, %b %e, %H:%M:%S',
              minute: '%A, %b %e, %H:%M',
              hour: '%A, %b %e, %H:%M',
              day: '%A, %b %e, %Y',
              week: 'Week from %A, %b %e, %Y',
              month: '%B %Y',
              year: '%Y',
            },
            footerFormat: '',
            headerShape: 'callout',
            hideDelay: 500,
            padding: 8,
            shape: 'callout',
            shared: !1,
            snap: v.isTouchDevice ? 25 : 10,
            headerFormat:
              '<span style="font-size: 10px">{point.key}</span><br/>',
            pointFormat:
              '<span style="color:{point.color}">\u25cf</span> {series.name}: <b>{point.y}</b><br/>',
            backgroundColor: e('#f7f7f7').setOpacity(0.85).get(),
            borderWidth: 1,
            shadow: !0,
            stickOnContact: !1,
            style: {
              color: '#333333',
              cursor: 'default',
              fontSize: '12px',
              whiteSpace: 'nowrap',
            },
            useHTML: !1,
          },
          credits: {
            enabled: !0,
            href: 'https://www.highcharts.com?credits',
            position: {
              align: 'right',
              x: -10,
              verticalAlign: 'bottom',
              y: -5,
            },
            style: { cursor: 'pointer', color: '#999999', fontSize: '9px' },
            text: 'Highcharts.com',
          },
        };
      z.chart.styledMode = !1;
      ('');
      var q = new t(I(z.global, z.time));
      b = {
        defaultOptions: z,
        defaultTime: q,
        getOptions: function () {
          return z;
        },
        setOptions: function (l) {
          I(!0, z, l);
          if (l.time || l.global)
            v.time
              ? v.time.update(I(z.global, z.time, l.global, l.time))
              : (v.time = q);
          return z;
        },
      };
      ('');
      return b;
    }
  );
  J(
    e,
    'Core/Animation/Fx.js',
    [e['Core/Color/Color.js'], e['Core/Globals.js'], e['Core/Utilities.js']],
    function (b, e, v) {
      var I = b.parse,
        t = e.win,
        A = v.isNumber,
        C = v.objectEach;
      return (function () {
        function b(b, l, n) {
          this.pos = NaN;
          this.options = l;
          this.elem = b;
          this.prop = n;
        }
        b.prototype.dSetter = function () {
          var b = this.paths,
            l = b && b[0];
          b = b && b[1];
          var n = this.now || 0,
            d = [];
          if (1 !== n && l && b)
            if (l.length === b.length && 1 > n)
              for (var a = 0; a < b.length; a++) {
                for (var f = l[a], k = b[a], G = [], y = 0; y < k.length; y++) {
                  var B = f[y],
                    x = k[y];
                  A(B) && A(x) && ('A' !== k[0] || (4 !== y && 5 !== y))
                    ? (G[y] = B + n * (x - B))
                    : (G[y] = x);
                }
                d.push(G);
              }
            else d = b;
          else d = this.toD || [];
          this.elem.attr('d', d, void 0, !0);
        };
        b.prototype.update = function () {
          var b = this.elem,
            l = this.prop,
            n = this.now,
            d = this.options.step;
          if (this[l + 'Setter']) this[l + 'Setter']();
          else
            b.attr
              ? b.element && b.attr(l, n, null, !0)
              : (b.style[l] = n + this.unit);
          d && d.call(b, n, this);
        };
        b.prototype.run = function (q, l, n) {
          var d = this,
            a = d.options,
            f = function (a) {
              return f.stopped ? !1 : d.step(a);
            },
            k =
              t.requestAnimationFrame ||
              function (a) {
                setTimeout(a, 13);
              },
            G = function () {
              for (var a = 0; a < b.timers.length; a++)
                b.timers[a]() || b.timers.splice(a--, 1);
              b.timers.length && k(G);
            };
          q !== l || this.elem['forceAnimate:' + this.prop]
            ? ((this.startTime = +new Date()),
              (this.start = q),
              (this.end = l),
              (this.unit = n),
              (this.now = this.start),
              (this.pos = 0),
              (f.elem = this.elem),
              (f.prop = this.prop),
              f() && 1 === b.timers.push(f) && k(G))
            : (delete a.curAnim[this.prop],
              a.complete &&
                0 === Object.keys(a.curAnim).length &&
                a.complete.call(this.elem));
        };
        b.prototype.step = function (b) {
          var l = +new Date(),
            n = this.options,
            d = this.elem,
            a = n.complete,
            f = n.duration,
            k = n.curAnim;
          if (d.attr && !d.element) b = !1;
          else if (b || l >= f + this.startTime) {
            this.now = this.end;
            this.pos = 1;
            this.update();
            var G = (k[this.prop] = !0);
            C(k, function (a) {
              !0 !== a && (G = !1);
            });
            G && a && a.call(d);
            b = !1;
          } else
            (this.pos = n.easing((l - this.startTime) / f)),
              (this.now = this.start + (this.end - this.start) * this.pos),
              this.update(),
              (b = !0);
          return b;
        };
        b.prototype.initPath = function (b, l, n) {
          function d(a, h) {
            for (; a.length < r; ) {
              var f = a[0],
                c = h[r - a.length];
              c &&
                'M' === f[0] &&
                (a[0] =
                  'C' === c[0]
                    ? ['C', f[1], f[2], f[1], f[2], f[1], f[2]]
                    : ['L', f[1], f[2]]);
              a.unshift(f);
              G && ((f = a.pop()), a.push(a[a.length - 1], f));
            }
          }
          function a(a, h) {
            for (; a.length < r; )
              if (
                ((h = a[Math.floor(a.length / y) - 1].slice()),
                'C' === h[0] && ((h[1] = h[5]), (h[2] = h[6])),
                G)
              ) {
                var f = a[Math.floor(a.length / y)].slice();
                a.splice(a.length / 2, 0, h, f);
              } else a.push(h);
          }
          var f = b.startX,
            k = b.endX;
          n = n.slice();
          var G = b.isArea,
            y = G ? 2 : 1;
          l = l && l.slice();
          if (!l) return [n, n];
          if (f && k && k.length) {
            for (b = 0; b < f.length; b++)
              if (f[b] === k[0]) {
                var B = b;
                break;
              } else if (f[0] === k[k.length - f.length + b]) {
                B = b;
                var x = !0;
                break;
              } else if (f[f.length - 1] === k[k.length - f.length + b]) {
                B = f.length - b;
                break;
              }
            'undefined' === typeof B && (l = []);
          }
          if (l.length && A(B)) {
            var r = n.length + B * y;
            x ? (d(l, n), a(n, l)) : (d(n, l), a(l, n));
          }
          return [l, n];
        };
        b.prototype.fillSetter = function () {
          b.prototype.strokeSetter.apply(this, arguments);
        };
        b.prototype.strokeSetter = function () {
          this.elem.attr(
            this.prop,
            I(this.start).tweenTo(I(this.end), this.pos),
            void 0,
            !0
          );
        };
        b.timers = [];
        return b;
      })();
    }
  );
  J(
    e,
    'Core/Animation/AnimationUtilities.js',
    [e['Core/Animation/Fx.js'], e['Core/Utilities.js']],
    function (b, e) {
      function I(a) {
        return q(a)
          ? l({ duration: 500, defer: 0 }, a)
          : { duration: a ? 500 : 0, defer: 0 };
      }
      function E(a, f) {
        for (var d = b.timers.length; d--; )
          b.timers[d].elem !== a ||
            (f && f !== b.timers[d].prop) ||
            (b.timers[d].stopped = !0);
      }
      var t = e.defined,
        A = e.getStyle,
        C = e.isArray,
        z = e.isNumber,
        q = e.isObject,
        l = e.merge,
        n = e.objectEach,
        d = e.pick;
      return {
        animate: function (a, f, d) {
          var k,
            y = '',
            B,
            x;
          if (!q(d)) {
            var r = arguments;
            d = { duration: r[2], easing: r[3], complete: r[4] };
          }
          z(d.duration) || (d.duration = 400);
          d.easing =
            'function' === typeof d.easing
              ? d.easing
              : Math[d.easing] || Math.easeInOutSine;
          d.curAnim = l(f);
          n(f, function (m, h) {
            E(a, h);
            x = new b(a, d, h);
            B = void 0;
            'd' === h && C(f.d)
              ? ((x.paths = x.initPath(a, a.pathArray, f.d)),
                (x.toD = f.d),
                (k = 0),
                (B = 1))
              : a.attr
                ? (k = a.attr(h))
                : ((k = parseFloat(A(a, h)) || 0),
                  'opacity' !== h && (y = 'px'));
            B || (B = m);
            'string' === typeof B &&
              B.match('px') &&
              (B = B.replace(/px/g, ''));
            x.run(k, B, y);
          });
        },
        animObject: I,
        getDeferredAnimation: function (a, f, d) {
          var k = I(f),
            y = 0,
            B = 0;
          (d ? [d] : a.series).forEach(function (a) {
            a = I(a.options.animation);
            y = f && t(f.defer) ? k.defer : Math.max(y, a.duration + a.defer);
            B = Math.min(k.duration, a.duration);
          });
          a.renderer.forExport && (y = 0);
          return { defer: Math.max(0, y - B), duration: Math.min(y, B) };
        },
        setAnimation: function (a, f) {
          f.renderer.globalAnimation = d(a, f.options.chart.animation, !0);
        },
        stop: E,
      };
    }
  );
  J(
    e,
    'Core/Renderer/HTML/AST.js',
    [e['Core/Globals.js'], e['Core/Utilities.js']],
    function (b, e) {
      var I = b.SVG_NS,
        E = e.attr,
        t = e.createElement,
        A = e.css,
        C = e.error,
        z = e.isFunction,
        q = e.isString,
        l = e.objectEach,
        n = e.splat,
        d =
          (e = b.win.trustedTypes) &&
          z(e.createPolicy) &&
          e.createPolicy('highcharts', {
            createHTML: function (a) {
              return a;
            },
          }),
        a = d ? d.createHTML('') : '';
      try {
        var f = !!new DOMParser().parseFromString(a, 'text/html');
      } catch (k) {
        f = !1;
      }
      z = (function () {
        function k(a) {
          this.nodes = 'string' === typeof a ? this.parseMarkup(a) : a;
        }
        k.filterUserAttributes = function (a) {
          l(a, function (f, d) {
            var x = !0;
            -1 === k.allowedAttributes.indexOf(d) && (x = !1);
            -1 !==
              ['background', 'dynsrc', 'href', 'lowsrc', 'src'].indexOf(d) &&
              (x =
                q(f) &&
                k.allowedReferences.some(function (a) {
                  return 0 === f.indexOf(a);
                }));
            x ||
              (C("Highcharts warning: Invalid attribute '" + d + "' in config"),
              delete a[d]);
          });
          return a;
        };
        k.parseStyle = function (a) {
          return a.split(';').reduce(function (a, f) {
            f = f.split(':').map(function (a) {
              return a.trim();
            });
            var d = f[0].replace(/-([a-z])/g, function (a) {
              return a[1].toUpperCase();
            });
            f[1] && (a[d] = f[1]);
            return a;
          }, {});
        };
        k.setElementHTML = function (a, f) {
          a.innerHTML = k.emptyHTML;
          f && new k(f).addToDOM(a);
        };
        k.prototype.addToDOM = function (a) {
          function f(a, d) {
            var r;
            n(a).forEach(function (a) {
              var h = a.tagName,
                p = a.textContent
                  ? b.doc.createTextNode(a.textContent)
                  : void 0,
                c = k.bypassHTMLFiltering;
              if (h)
                if ('#text' === h) var m = p;
                else if (-1 !== k.allowedTags.indexOf(h) || c) {
                  h = b.doc.createElementNS(
                    'svg' === h ? I : d.namespaceURI || I,
                    h
                  );
                  var g = a.attributes || {};
                  l(a, function (c, a) {
                    'tagName' !== a &&
                      'attributes' !== a &&
                      'children' !== a &&
                      'style' !== a &&
                      'textContent' !== a &&
                      (g[a] = c);
                  });
                  E(h, c ? g : k.filterUserAttributes(g));
                  a.style && A(h, a.style);
                  p && h.appendChild(p);
                  f(a.children || [], h);
                  m = h;
                } else
                  C('Highcharts warning: Invalid tagName ' + h + ' in config');
              m && d.appendChild(m);
              r = m;
            });
            return r;
          }
          return f(this.nodes, a);
        };
        k.prototype.parseMarkup = function (a) {
          var y = [];
          a = a.trim().replace(/ style="/g, ' data-style="');
          if (f)
            a = new DOMParser().parseFromString(
              d ? d.createHTML(a) : a,
              'text/html'
            );
          else {
            var B = t('div');
            B.innerHTML = a;
            a = { body: B };
          }
          var x = function (a, f) {
            var h = a.nodeName.toLowerCase(),
              d = { tagName: h };
            '#text' === h && (d.textContent = a.textContent || '');
            if ((h = a.attributes)) {
              var c = {};
              [].forEach.call(h, function (a) {
                'data-style' === a.name
                  ? (d.style = k.parseStyle(a.value))
                  : (c[a.name] = a.value);
              });
              d.attributes = c;
            }
            if (a.childNodes.length) {
              var m = [];
              [].forEach.call(a.childNodes, function (c) {
                x(c, m);
              });
              m.length && (d.children = m);
            }
            f.push(d);
          };
          [].forEach.call(a.body.childNodes, function (a) {
            return x(a, y);
          });
          return y;
        };
        k.allowedAttributes =
          'aria-controls aria-describedby aria-expanded aria-haspopup aria-hidden aria-label aria-labelledby aria-live aria-pressed aria-readonly aria-roledescription aria-selected class clip-path color colspan cx cy d dx dy disabled fill height href id in markerHeight markerWidth offset opacity orient padding paddingLeft paddingRight patternUnits r refX refY role scope slope src startOffset stdDeviation stroke stroke-linecap stroke-width style tableValues result rowspan summary target tabindex text-align textAnchor textLength title type valign width x x1 x2 y y1 y2 zIndex'.split(
            ' '
          );
        k.allowedReferences = 'https:// http:// mailto: / ../ ./ #'.split(' ');
        k.allowedTags =
          'a abbr b br button caption circle clipPath code dd defs div dl dt em feComponentTransfer feFuncA feFuncB feFuncG feFuncR feGaussianBlur feOffset feMerge feMergeNode filter h1 h2 h3 h4 h5 h6 hr i img li linearGradient marker ol p path pattern pre rect small span stop strong style sub sup svg table text thead tbody tspan td th tr u ul #text'.split(
            ' '
          );
        k.emptyHTML = a;
        k.bypassHTMLFiltering = !1;
        return k;
      })();
      ('');
      return z;
    }
  );
  J(
    e,
    'Core/FormatUtilities.js',
    [e['Core/DefaultOptions.js'], e['Core/Utilities.js']],
    function (b, e) {
      function I(l, n, d, a) {
        l = +l || 0;
        n = +n;
        var f = E.lang,
          k = (l.toString().split('.')[1] || '').split('e')[0].length,
          G = l.toString().split('e'),
          y = n;
        if (-1 === n) n = Math.min(k, 20);
        else if (!C(n)) n = 2;
        else if (n && G[1] && 0 > G[1]) {
          var B = n + +G[1];
          0 <= B
            ? ((G[0] = (+G[0]).toExponential(B).split('e')[0]), (n = B))
            : ((G[0] = G[0].split('.')[0] || 0),
              (l = 20 > n ? (G[0] * Math.pow(10, G[1])).toFixed(n) : 0),
              (G[1] = 0));
        }
        B = (
          Math.abs(G[1] ? G[0] : l) + Math.pow(10, -Math.max(n, k) - 1)
        ).toFixed(n);
        k = String(q(B));
        var x = 3 < k.length ? k.length % 3 : 0;
        d = z(d, f.decimalPoint);
        a = z(a, f.thousandsSep);
        l = (0 > l ? '-' : '') + (x ? k.substr(0, x) + a : '');
        l =
          0 > +G[1] && !y
            ? '0'
            : l + k.substr(x).replace(/(\d{3})(?=\d)/g, '$1' + a);
        n && (l += d + B.slice(-n));
        G[1] && 0 !== +l && (l += 'e' + G[1]);
        return l;
      }
      var E = b.defaultOptions,
        t = b.defaultTime,
        A = e.getNestedProperty,
        C = e.isNumber,
        z = e.pick,
        q = e.pInt;
      return {
        dateFormat: function (l, n, d) {
          return t.dateFormat(l, n, d);
        },
        format: function (l, n, d) {
          var a = '{',
            f = !1,
            k = /f$/,
            G = /\.([0-9])/,
            y = E.lang,
            B = (d && d.time) || t;
          d = (d && d.numberFormatter) || I;
          for (var x = []; l; ) {
            var r = l.indexOf(a);
            if (-1 === r) break;
            var m = l.slice(0, r);
            if (f) {
              m = m.split(':');
              a = A(m.shift() || '', n);
              if (m.length && 'number' === typeof a)
                if (((m = m.join(':')), k.test(m))) {
                  var h = parseInt((m.match(G) || ['', '-1'])[1], 10);
                  null !== a &&
                    (a = d(
                      a,
                      h,
                      y.decimalPoint,
                      -1 < m.indexOf(',') ? y.thousandsSep : ''
                    ));
                } else a = B.dateFormat(m, a);
              x.push(a);
            } else x.push(m);
            l = l.slice(r + 1);
            a = (f = !f) ? '}' : '{';
          }
          x.push(l);
          return x.join('');
        },
        numberFormat: I,
      };
    }
  );
  J(
    e,
    'Core/Renderer/RendererUtilities.js',
    [e['Core/Utilities.js']],
    function (b) {
      var e = b.clamp,
        v = b.pick,
        E = b.stableSort,
        t;
      (function (b) {
        function t(b, q, l) {
          var n = b,
            d = n.reducedLen || q,
            a = function (a, f) {
              return (f.rank || 0) - (a.rank || 0);
            },
            f = function (a, f) {
              return a.target - f.target;
            },
            k,
            G = !0,
            y = [],
            B = 0;
          for (k = b.length; k--; ) B += b[k].size;
          if (B > d) {
            E(b, a);
            for (B = k = 0; B <= d; ) (B += b[k].size), k++;
            y = b.splice(k - 1, b.length);
          }
          E(b, f);
          for (
            b = b.map(function (a) {
              return {
                size: a.size,
                targets: [a.target],
                align: v(a.align, 0.5),
              };
            });
            G;

          ) {
            for (k = b.length; k--; )
              (d = b[k]),
                (a =
                  (Math.min.apply(0, d.targets) +
                    Math.max.apply(0, d.targets)) /
                  2),
                (d.pos = e(a - d.size * d.align, 0, q - d.size));
            k = b.length;
            for (G = !1; k--; )
              0 < k &&
                b[k - 1].pos + b[k - 1].size > b[k].pos &&
                ((b[k - 1].size += b[k].size),
                (b[k - 1].targets = b[k - 1].targets.concat(b[k].targets)),
                (b[k - 1].align = 0.5),
                b[k - 1].pos + b[k - 1].size > q &&
                  (b[k - 1].pos = q - b[k - 1].size),
                b.splice(k, 1),
                (G = !0));
          }
          n.push.apply(n, y);
          k = 0;
          b.some(function (a) {
            var f = 0;
            return (a.targets || []).some(function () {
              n[k].pos = a.pos + f;
              if (
                'undefined' !== typeof l &&
                Math.abs(n[k].pos - n[k].target) > l
              )
                return (
                  n.slice(0, k + 1).forEach(function (a) {
                    return delete a.pos;
                  }),
                  (n.reducedLen = (n.reducedLen || q) - 0.1 * q),
                  n.reducedLen > 0.1 * q && t(n, q, l),
                  !0
                );
              f += n[k].size;
              k++;
              return !1;
            });
          });
          E(n, f);
          return n;
        }
        b.distribute = t;
      })(t || (t = {}));
      return t;
    }
  );
  J(
    e,
    'Core/Renderer/SVG/SVGElement.js',
    [
      e['Core/Animation/AnimationUtilities.js'],
      e['Core/Renderer/HTML/AST.js'],
      e['Core/Color/Color.js'],
      e['Core/Globals.js'],
      e['Core/Utilities.js'],
    ],
    function (b, e, v, E, t) {
      var I = b.animate,
        C = b.animObject,
        z = b.stop,
        q = E.deg2rad,
        l = E.doc,
        n = E.noop,
        d = E.svg,
        a = E.SVG_NS,
        f = E.win,
        k = t.addEvent,
        G = t.attr,
        y = t.createElement,
        B = t.css,
        x = t.defined,
        r = t.erase,
        m = t.extend,
        h = t.fireEvent,
        p = t.isArray,
        c = t.isFunction,
        w = t.isNumber,
        g = t.isString,
        F = t.merge,
        u = t.objectEach,
        D = t.pick,
        H = t.pInt,
        L = t.syncTimeout,
        P = t.uniqueKey;
      b = (function () {
        function b() {
          this.element = void 0;
          this.onEvents = {};
          this.opacity = 1;
          this.renderer = void 0;
          this.SVG_NS = a;
          this.symbolCustomAttribs =
            'x y width height r start end innerR anchorX anchorY rounded'.split(
              ' '
            );
        }
        b.prototype._defaultGetter = function (c) {
          c = D(
            this[c + 'Value'],
            this[c],
            this.element ? this.element.getAttribute(c) : null,
            0
          );
          /^[\-0-9\.]+$/.test(c) && (c = parseFloat(c));
          return c;
        };
        b.prototype._defaultSetter = function (c, a, g) {
          g.setAttribute(a, c);
        };
        b.prototype.add = function (c) {
          var a = this.renderer,
            g = this.element;
          c && (this.parentGroup = c);
          this.parentInverted = c && c.inverted;
          'undefined' !== typeof this.textStr &&
            'text' === this.element.nodeName &&
            a.buildText(this);
          this.added = !0;
          if (!c || c.handleZ || this.zIndex) var h = this.zIndexSetter();
          h || (c ? c.element : a.box).appendChild(g);
          if (this.onAdd) this.onAdd();
          return this;
        };
        b.prototype.addClass = function (c, a) {
          var g = a ? '' : this.attr('class') || '';
          c = (c || '')
            .split(/ /g)
            .reduce(
              function (c, a) {
                -1 === g.indexOf(a) && c.push(a);
                return c;
              },
              g ? [g] : []
            )
            .join(' ');
          c !== g && this.attr('class', c);
          return this;
        };
        b.prototype.afterSetters = function () {
          this.doTransform && (this.updateTransform(), (this.doTransform = !1));
        };
        b.prototype.align = function (c, a, h) {
          var u = {},
            f = this.renderer,
            d = f.alignedObjects,
            m,
            p,
            w;
          if (c) {
            if (
              ((this.alignOptions = c), (this.alignByTranslate = a), !h || g(h))
            )
              (this.alignTo = m = h || 'renderer'),
                r(d, this),
                d.push(this),
                (h = void 0);
          } else
            (c = this.alignOptions),
              (a = this.alignByTranslate),
              (m = this.alignTo);
          h = D(h, f[m], 'scrollablePlotBox' === m ? f.plotBox : void 0, f);
          m = c.align;
          var k = c.verticalAlign;
          f = (h.x || 0) + (c.x || 0);
          d = (h.y || 0) + (c.y || 0);
          'right' === m ? (p = 1) : 'center' === m && (p = 2);
          p && (f += (h.width - (c.width || 0)) / p);
          u[a ? 'translateX' : 'x'] = Math.round(f);
          'bottom' === k ? (w = 1) : 'middle' === k && (w = 2);
          w && (d += (h.height - (c.height || 0)) / w);
          u[a ? 'translateY' : 'y'] = Math.round(d);
          this[this.placed ? 'animate' : 'attr'](u);
          this.placed = !0;
          this.alignAttr = u;
          return this;
        };
        b.prototype.alignSetter = function (c) {
          var a = { left: 'start', center: 'middle', right: 'end' };
          a[c] &&
            ((this.alignValue = c),
            this.element.setAttribute('text-anchor', a[c]));
        };
        b.prototype.animate = function (c, a, g) {
          var h = this,
            f = C(D(a, this.renderer.globalAnimation, !0));
          a = f.defer;
          D(l.hidden, l.msHidden, l.webkitHidden, !1) && (f.duration = 0);
          0 !== f.duration
            ? (g && (f.complete = g),
              L(function () {
                h.element && I(h, c, f);
              }, a))
            : (this.attr(c, void 0, g || f.complete),
              u(
                c,
                function (c, a) {
                  f.step &&
                    f.step.call(this, c, { prop: a, pos: 1, elem: this });
                },
                this
              ));
          return this;
        };
        b.prototype.applyTextOutline = function (c) {
          var g = this.element;
          -1 !== c.indexOf('contrast') &&
            (c = c.replace(
              /contrast/g,
              this.renderer.getContrast(g.style.fill)
            ));
          var h = c.split(' ');
          c = h[h.length - 1];
          if ((h = h[0]) && 'none' !== h && E.svg) {
            this.fakeTS = !0;
            this.ySetter = this.xSetter;
            h = h.replace(/(^[\d\.]+)(.*?)$/g, function (c, a, g) {
              return 2 * Number(a) + g;
            });
            this.removeTextOutline();
            var u = l.createElementNS(a, 'tspan');
            G(u, {
              class: 'highcharts-text-outline',
              fill: c,
              stroke: c,
              'stroke-width': h,
              'stroke-linejoin': 'round',
            });
            [].forEach.call(g.childNodes, function (c) {
              var a = c.cloneNode(!0);
              a.removeAttribute &&
                ['fill', 'stroke', 'stroke-width', 'stroke'].forEach(
                  function (c) {
                    return a.removeAttribute(c);
                  }
                );
              u.appendChild(a);
            });
            var f = l.createElementNS(a, 'tspan');
            f.textContent = '\u200b';
            ['x', 'y'].forEach(function (c) {
              var a = g.getAttribute(c);
              a && f.setAttribute(c, a);
            });
            u.appendChild(f);
            g.insertBefore(u, g.firstChild);
          }
        };
        b.prototype.attr = function (c, a, g, h) {
          var f = this.element,
            d = this.symbolCustomAttribs,
            m,
            p = this,
            w,
            k;
          if ('string' === typeof c && 'undefined' !== typeof a) {
            var D = c;
            c = {};
            c[D] = a;
          }
          'string' === typeof c
            ? (p = (this[c + 'Getter'] || this._defaultGetter).call(this, c, f))
            : (u(
                c,
                function (a, g) {
                  w = !1;
                  h || z(this, g);
                  this.symbolName &&
                    -1 !== d.indexOf(g) &&
                    (m || (this.symbolAttr(c), (m = !0)), (w = !0));
                  !this.rotation ||
                    ('x' !== g && 'y' !== g) ||
                    (this.doTransform = !0);
                  w ||
                    ((k = this[g + 'Setter'] || this._defaultSetter),
                    k.call(this, a, g, f),
                    !this.styledMode &&
                      this.shadows &&
                      /^(width|height|visibility|x|y|d|transform|cx|cy|r)$/.test(
                        g
                      ) &&
                      this.updateShadows(g, a, k));
                },
                this
              ),
              this.afterSetters());
          g && g.call(this);
          return p;
        };
        b.prototype.clip = function (c) {
          return this.attr(
            'clip-path',
            c ? 'url(' + this.renderer.url + '#' + c.id + ')' : 'none'
          );
        };
        b.prototype.crisp = function (c, a) {
          a = a || c.strokeWidth || 0;
          var g = (Math.round(a) % 2) / 2;
          c.x = Math.floor(c.x || this.x || 0) + g;
          c.y = Math.floor(c.y || this.y || 0) + g;
          c.width = Math.floor((c.width || this.width || 0) - 2 * g);
          c.height = Math.floor((c.height || this.height || 0) - 2 * g);
          x(c.strokeWidth) && (c.strokeWidth = a);
          return c;
        };
        b.prototype.complexColor = function (c, a, g) {
          var f = this.renderer,
            d,
            m,
            w,
            k,
            D,
            Y,
            r,
            b,
            B,
            H,
            y = [],
            l;
          h(this.renderer, 'complexColor', { args: arguments }, function () {
            c.radialGradient
              ? (m = 'radialGradient')
              : c.linearGradient && (m = 'linearGradient');
            if (m) {
              w = c[m];
              D = f.gradients;
              Y = c.stops;
              B = g.radialReference;
              p(w) &&
                (c[m] = w =
                  {
                    x1: w[0],
                    y1: w[1],
                    x2: w[2],
                    y2: w[3],
                    gradientUnits: 'userSpaceOnUse',
                  });
              'radialGradient' === m &&
                B &&
                !x(w.gradientUnits) &&
                ((k = w),
                (w = F(w, f.getRadialAttr(B, k), {
                  gradientUnits: 'userSpaceOnUse',
                })));
              u(w, function (c, a) {
                'id' !== a && y.push(a, c);
              });
              u(Y, function (c) {
                y.push(c);
              });
              y = y.join(',');
              if (D[y]) H = D[y].attr('id');
              else {
                w.id = H = P();
                var h = (D[y] = f.createElement(m).attr(w).add(f.defs));
                h.radAttr = k;
                h.stops = [];
                Y.forEach(function (c) {
                  0 === c[1].indexOf('rgba')
                    ? ((d = v.parse(c[1])),
                      (r = d.get('rgb')),
                      (b = d.get('a')))
                    : ((r = c[1]), (b = 1));
                  c = f
                    .createElement('stop')
                    .attr({ offset: c[0], 'stop-color': r, 'stop-opacity': b })
                    .add(h);
                  h.stops.push(c);
                });
              }
              l = 'url(' + f.url + '#' + H + ')';
              g.setAttribute(a, l);
              g.gradient = y;
              c.toString = function () {
                return l;
              };
            }
          });
        };
        b.prototype.css = function (c) {
          var a = this.styles,
            g = {},
            h = this.element,
            f = !a;
          c.color && (c.fill = c.color);
          a &&
            u(c, function (c, h) {
              a && a[h] !== c && ((g[h] = c), (f = !0));
            });
          if (f) {
            a && (c = m(a, g));
            if (null === c.width || 'auto' === c.width) delete this.textWidth;
            else if ('text' === h.nodeName.toLowerCase() && c.width)
              var p = (this.textWidth = H(c.width));
            this.styles = c;
            p && !d && this.renderer.forExport && delete c.width;
            var w = F(c);
            h.namespaceURI === this.SVG_NS &&
              ['textOutline', 'textOverflow', 'width'].forEach(function (c) {
                return w && delete w[c];
              });
            B(h, w);
            this.added &&
              ('text' === this.element.nodeName &&
                this.renderer.buildText(this),
              c.textOutline && this.applyTextOutline(c.textOutline));
          }
          return this;
        };
        b.prototype.dashstyleSetter = function (c) {
          var a = this['stroke-width'];
          'inherit' === a && (a = 1);
          if ((c = c && c.toLowerCase())) {
            var g = c
              .replace('shortdashdotdot', '3,1,1,1,1,1,')
              .replace('shortdashdot', '3,1,1,1')
              .replace('shortdot', '1,1,')
              .replace('shortdash', '3,1,')
              .replace('longdash', '8,3,')
              .replace(/dot/g, '1,3,')
              .replace('dash', '4,3,')
              .replace(/,$/, '')
              .split(',');
            for (c = g.length; c--; ) g[c] = '' + H(g[c]) * D(a, NaN);
            c = g.join(',').replace(/NaN/g, 'none');
            this.element.setAttribute('stroke-dasharray', c);
          }
        };
        b.prototype.destroy = function () {
          var c = this,
            a = c.element || {},
            g = c.renderer,
            h = a.ownerSVGElement,
            f = (g.isSVG && 'SPAN' === a.nodeName && c.parentGroup) || void 0;
          a.onclick =
            a.onmouseout =
            a.onmouseover =
            a.onmousemove =
            a.point =
              null;
          z(c);
          if (c.clipPath && h) {
            var d = c.clipPath;
            [].forEach.call(
              h.querySelectorAll('[clip-path],[CLIP-PATH]'),
              function (c) {
                -1 < c.getAttribute('clip-path').indexOf(d.element.id) &&
                  c.removeAttribute('clip-path');
              }
            );
            c.clipPath = d.destroy();
          }
          if (c.stops) {
            for (h = 0; h < c.stops.length; h++) c.stops[h].destroy();
            c.stops.length = 0;
            c.stops = void 0;
          }
          c.safeRemoveChild(a);
          for (
            g.styledMode || c.destroyShadows();
            f && f.div && 0 === f.div.childNodes.length;

          )
            (a = f.parentGroup),
              c.safeRemoveChild(f.div),
              delete f.div,
              (f = a);
          c.alignTo && r(g.alignedObjects, c);
          u(c, function (a, g) {
            c[g] && c[g].parentGroup === c && c[g].destroy && c[g].destroy();
            delete c[g];
          });
        };
        b.prototype.destroyShadows = function () {
          (this.shadows || []).forEach(function (c) {
            this.safeRemoveChild(c);
          }, this);
          this.shadows = void 0;
        };
        b.prototype.destroyTextPath = function (c, a) {
          var g = c.getElementsByTagName('text')[0];
          if (g) {
            if (
              (g.removeAttribute('dx'),
              g.removeAttribute('dy'),
              a.element.setAttribute('id', ''),
              this.textPathWrapper && g.getElementsByTagName('textPath').length)
            ) {
              for (c = this.textPathWrapper.element.childNodes; c.length; )
                g.appendChild(c[0]);
              g.removeChild(this.textPathWrapper.element);
            }
          } else if (c.getAttribute('dx') || c.getAttribute('dy'))
            c.removeAttribute('dx'), c.removeAttribute('dy');
          this.textPathWrapper &&
            (this.textPathWrapper = this.textPathWrapper.destroy());
        };
        b.prototype.dSetter = function (c, a, g) {
          p(c) &&
            ('string' === typeof c[0] && (c = this.renderer.pathToSegments(c)),
            (this.pathArray = c),
            (c = c.reduce(function (c, a, g) {
              return a && a.join
                ? (g ? c + ' ' : '') + a.join(' ')
                : (a || '').toString();
            }, '')));
          /(NaN| {2}|^$)/.test(c) && (c = 'M 0 0');
          this[a] !== c && (g.setAttribute(a, c), (this[a] = c));
        };
        b.prototype.fadeOut = function (c) {
          var a = this;
          a.animate(
            { opacity: 0 },
            {
              duration: D(c, 150),
              complete: function () {
                a.attr({ y: -9999 }).hide();
              },
            }
          );
        };
        b.prototype.fillSetter = function (c, a, g) {
          'string' === typeof c
            ? g.setAttribute(a, c)
            : c && this.complexColor(c, a, g);
        };
        b.prototype.getBBox = function (a, g) {
          var h = this.renderer,
            f = this.element,
            u = this.styles,
            d = this.textStr,
            p = h.cache,
            w = h.cacheKeys,
            k = f.namespaceURI === this.SVG_NS;
          g = D(g, this.rotation, 0);
          var F = h.styledMode
              ? f && b.prototype.getStyle.call(f, 'font-size')
              : u && u.fontSize,
            r;
          if (x(d)) {
            var y = d.toString();
            -1 === y.indexOf('<') && (y = y.replace(/[0-9]/g, '0'));
            y += [
              '',
              g,
              F,
              this.textWidth,
              u && u.textOverflow,
              u && u.fontWeight,
            ].join();
          }
          y && !a && (r = p[y]);
          if (!r) {
            if (k || h.forExport) {
              try {
                var H =
                  this.fakeTS &&
                  function (c) {
                    var a = f.querySelector('.highcharts-text-outline');
                    a && B(a, { display: c });
                  };
                c(H) && H('none');
                r = f.getBBox
                  ? m({}, f.getBBox())
                  : { width: f.offsetWidth, height: f.offsetHeight };
                c(H) && H('');
              } catch (V) {
                ('');
              }
              if (!r || 0 > r.width) r = { width: 0, height: 0 };
            } else r = this.htmlGetBBox();
            h.isSVG &&
              ((a = r.width),
              (h = r.height),
              k &&
                (r.height = h =
                  { '11px,17': 14, '13px,20': 16 }[
                    (F || '') + ',' + Math.round(h)
                  ] || h),
              g &&
                ((k = g * q),
                (r.width =
                  Math.abs(h * Math.sin(k)) + Math.abs(a * Math.cos(k))),
                (r.height =
                  Math.abs(h * Math.cos(k)) + Math.abs(a * Math.sin(k)))));
            if (y && ('' === d || 0 < r.height)) {
              for (; 250 < w.length; ) delete p[w.shift()];
              p[y] || w.push(y);
              p[y] = r;
            }
          }
          return r;
        };
        b.prototype.getStyle = function (c) {
          return f
            .getComputedStyle(this.element || this, '')
            .getPropertyValue(c);
        };
        b.prototype.hasClass = function (c) {
          return -1 !== ('' + this.attr('class')).split(' ').indexOf(c);
        };
        b.prototype.hide = function (c) {
          c ? this.attr({ y: -9999 }) : this.attr({ visibility: 'hidden' });
          return this;
        };
        b.prototype.htmlGetBBox = function () {
          return { height: 0, width: 0, x: 0, y: 0 };
        };
        b.prototype.init = function (c, a) {
          this.element =
            'span' === a ? y(a) : l.createElementNS(this.SVG_NS, a);
          this.renderer = c;
          h(this, 'afterInit');
        };
        b.prototype.invert = function (c) {
          this.inverted = c;
          this.updateTransform();
          return this;
        };
        b.prototype.on = function (c, a) {
          var g = this.onEvents;
          if (g[c]) g[c]();
          g[c] = k(this.element, c, a);
          return this;
        };
        b.prototype.opacitySetter = function (c, a, g) {
          this.opacity = c = Number(Number(c).toFixed(3));
          g.setAttribute(a, c);
        };
        b.prototype.removeClass = function (c) {
          return this.attr(
            'class',
            ('' + this.attr('class'))
              .replace(g(c) ? new RegExp('(^| )' + c + '( |$)') : c, ' ')
              .replace(/ +/g, ' ')
              .trim()
          );
        };
        b.prototype.removeTextOutline = function () {
          var c = this.element.querySelector('tspan.highcharts-text-outline');
          c && this.safeRemoveChild(c);
        };
        b.prototype.safeRemoveChild = function (c) {
          var a = c.parentNode;
          a && a.removeChild(c);
        };
        b.prototype.setRadialReference = function (c) {
          var a =
            this.element.gradient &&
            this.renderer.gradients[this.element.gradient];
          this.element.radialReference = c;
          a &&
            a.radAttr &&
            a.animate(this.renderer.getRadialAttr(c, a.radAttr));
          return this;
        };
        b.prototype.setTextPath = function (c, a) {
          var g = this.element,
            h = this.text ? this.text.element : g,
            d = { textAnchor: 'text-anchor' },
            m = !1,
            p = this.textPathWrapper,
            k = !p;
          a = F(
            !0,
            {
              enabled: !0,
              attributes: { dy: -5, startOffset: '50%', textAnchor: 'middle' },
            },
            a
          );
          var D = e.filterUserAttributes(a.attributes);
          if (c && a && a.enabled) {
            p && null === p.element.parentNode
              ? ((k = !0), (p = p.destroy()))
              : p && this.removeTextOutline.call(p.parentGroup);
            this.options &&
              this.options.padding &&
              (D.dx = -this.options.padding);
            p ||
              ((this.textPathWrapper = p =
                this.renderer.createElement('textPath')),
              (m = !0));
            var r = p.element;
            (a = c.element.getAttribute('id')) ||
              c.element.setAttribute('id', (a = P()));
            if (k)
              for (
                h.setAttribute('y', 0),
                  w(D.dx) && h.setAttribute('x', -D.dx),
                  c = [].slice.call(h.childNodes),
                  k = 0;
                k < c.length;
                k++
              ) {
                var b = c[k];
                (b.nodeType !== f.Node.TEXT_NODE && 'tspan' !== b.nodeName) ||
                  r.appendChild(b);
              }
            m && p && p.add({ element: h });
            r.setAttributeNS(
              'http://www.w3.org/1999/xlink',
              'href',
              this.renderer.url + '#' + a
            );
            x(D.dy) && (r.parentNode.setAttribute('dy', D.dy), delete D.dy);
            x(D.dx) && (r.parentNode.setAttribute('dx', D.dx), delete D.dx);
            u(D, function (c, a) {
              r.setAttribute(d[a] || a, c);
            });
            g.removeAttribute('transform');
            this.removeTextOutline.call(p);
            this.text &&
              !this.renderer.styledMode &&
              this.attr({ fill: 'none', 'stroke-width': 0 });
            this.applyTextOutline = this.updateTransform = n;
          } else
            p &&
              (delete this.updateTransform,
              delete this.applyTextOutline,
              this.destroyTextPath(g, c),
              this.updateTransform(),
              this.options &&
                this.options.rotation &&
                this.applyTextOutline(this.options.style.textOutline));
          return this;
        };
        b.prototype.shadow = function (c, a, g) {
          var h = [],
            f = this.element,
            d = this.oldShadowOptions,
            p = {
              color: '#000000',
              offsetX: this.parentInverted ? -1 : 1,
              offsetY: this.parentInverted ? -1 : 1,
              opacity: 0.15,
              width: 3,
            },
            w = !1,
            k;
          !0 === c ? (k = p) : 'object' === typeof c && (k = m(p, c));
          k &&
            (k &&
              d &&
              u(k, function (c, a) {
                c !== d[a] && (w = !0);
              }),
            w && this.destroyShadows(),
            (this.oldShadowOptions = k));
          if (!k) this.destroyShadows();
          else if (!this.shadows) {
            var D = k.opacity / k.width;
            var r = this.parentInverted
              ? 'translate(' + k.offsetY + ', ' + k.offsetX + ')'
              : 'translate(' + k.offsetX + ', ' + k.offsetY + ')';
            for (p = 1; p <= k.width; p++) {
              var F = f.cloneNode(!1);
              var b = 2 * k.width + 1 - 2 * p;
              G(F, {
                stroke: c.color || '#000000',
                'stroke-opacity': D * p,
                'stroke-width': b,
                transform: r,
                fill: 'none',
              });
              F.setAttribute(
                'class',
                (F.getAttribute('class') || '') + ' highcharts-shadow'
              );
              g &&
                (G(F, 'height', Math.max(G(F, 'height') - b, 0)),
                (F.cutHeight = b));
              a
                ? a.element.appendChild(F)
                : f.parentNode && f.parentNode.insertBefore(F, f);
              h.push(F);
            }
            this.shadows = h;
          }
          return this;
        };
        b.prototype.show = function (c) {
          return this.attr({ visibility: c ? 'inherit' : 'visible' });
        };
        b.prototype.strokeSetter = function (c, a, g) {
          this[a] = c;
          this.stroke && this['stroke-width']
            ? (b.prototype.fillSetter.call(this, this.stroke, 'stroke', g),
              g.setAttribute('stroke-width', this['stroke-width']),
              (this.hasStroke = !0))
            : 'stroke-width' === a && 0 === c && this.hasStroke
              ? (g.removeAttribute('stroke'), (this.hasStroke = !1))
              : this.renderer.styledMode &&
                this['stroke-width'] &&
                (g.setAttribute('stroke-width', this['stroke-width']),
                (this.hasStroke = !0));
        };
        b.prototype.strokeWidth = function () {
          if (!this.renderer.styledMode) return this['stroke-width'] || 0;
          var c = this.getStyle('stroke-width'),
            g = 0;
          if (c.indexOf('px') === c.length - 2) g = H(c);
          else if ('' !== c) {
            var h = l.createElementNS(a, 'rect');
            G(h, { width: c, 'stroke-width': 0 });
            this.element.parentNode.appendChild(h);
            g = h.getBBox().width;
            h.parentNode.removeChild(h);
          }
          return g;
        };
        b.prototype.symbolAttr = function (c) {
          var a = this;
          'x y r start end width height innerR anchorX anchorY clockwise'
            .split(' ')
            .forEach(function (g) {
              a[g] = D(c[g], a[g]);
            });
          a.attr({
            d: a.renderer.symbols[a.symbolName](a.x, a.y, a.width, a.height, a),
          });
        };
        b.prototype.textSetter = function (c) {
          c !== this.textStr &&
            (delete this.textPxLength,
            (this.textStr = c),
            this.added && this.renderer.buildText(this));
        };
        b.prototype.titleSetter = function (c) {
          var a = this.element,
            g =
              a.getElementsByTagName('title')[0] ||
              l.createElementNS(this.SVG_NS, 'title');
          a.insertBefore ? a.insertBefore(g, a.firstChild) : a.appendChild(g);
          g.textContent = String(D(c, ''))
            .replace(/<[^>]*>/g, '')
            .replace(/&lt;/g, '<')
            .replace(/&gt;/g, '>');
        };
        b.prototype.toFront = function () {
          var c = this.element;
          c.parentNode.appendChild(c);
          return this;
        };
        b.prototype.translate = function (c, a) {
          return this.attr({ translateX: c, translateY: a });
        };
        b.prototype.updateShadows = function (c, a, g) {
          var h = this.shadows;
          if (h)
            for (var f = h.length; f--; )
              g.call(
                h[f],
                'height' === c
                  ? Math.max(a - (h[f].cutHeight || 0), 0)
                  : 'd' === c
                    ? this.d
                    : a,
                c,
                h[f]
              );
        };
        b.prototype.updateTransform = function () {
          var c = this.scaleX,
            a = this.scaleY,
            g = this.inverted,
            h = this.rotation,
            f = this.matrix,
            u = this.element,
            d = this.translateX || 0,
            p = this.translateY || 0;
          g && ((d += this.width), (p += this.height));
          d = ['translate(' + d + ',' + p + ')'];
          x(f) && d.push('matrix(' + f.join(',') + ')');
          g
            ? d.push('rotate(90) scale(-1,1)')
            : h &&
              d.push(
                'rotate(' +
                  h +
                  ' ' +
                  D(this.rotationOriginX, u.getAttribute('x'), 0) +
                  ' ' +
                  D(this.rotationOriginY, u.getAttribute('y') || 0) +
                  ')'
              );
          (x(c) || x(a)) && d.push('scale(' + D(c, 1) + ' ' + D(a, 1) + ')');
          d.length && u.setAttribute('transform', d.join(' '));
        };
        b.prototype.visibilitySetter = function (c, a, g) {
          'inherit' === c
            ? g.removeAttribute(a)
            : this[a] !== c && g.setAttribute(a, c);
          this[a] = c;
        };
        b.prototype.xGetter = function (c) {
          'circle' === this.element.nodeName &&
            ('x' === c ? (c = 'cx') : 'y' === c && (c = 'cy'));
          return this._defaultGetter(c);
        };
        b.prototype.zIndexSetter = function (c, a) {
          var g = this.renderer,
            h = this.parentGroup,
            f = (h || g).element || g.box,
            u = this.element;
          g = f === g.box;
          var d = !1;
          var p = this.added;
          var m;
          x(c)
            ? (u.setAttribute('data-z-index', c),
              (c = +c),
              this[a] === c && (p = !1))
            : x(this[a]) && u.removeAttribute('data-z-index');
          this[a] = c;
          if (p) {
            (c = this.zIndex) && h && (h.handleZ = !0);
            a = f.childNodes;
            for (m = a.length - 1; 0 <= m && !d; m--) {
              h = a[m];
              p = h.getAttribute('data-z-index');
              var w = !x(p);
              if (h !== u)
                if (0 > c && w && !g && !m) f.insertBefore(u, a[m]), (d = !0);
                else if (H(p) <= c || (w && (!x(c) || 0 <= c)))
                  f.insertBefore(u, a[m + 1] || null), (d = !0);
            }
            d || (f.insertBefore(u, a[g ? 3 : 0] || null), (d = !0));
          }
          return d;
        };
        return b;
      })();
      b.prototype['stroke-widthSetter'] = b.prototype.strokeSetter;
      b.prototype.yGetter = b.prototype.xGetter;
      b.prototype.matrixSetter =
        b.prototype.rotationOriginXSetter =
        b.prototype.rotationOriginYSetter =
        b.prototype.rotationSetter =
        b.prototype.scaleXSetter =
        b.prototype.scaleYSetter =
        b.prototype.translateXSetter =
        b.prototype.translateYSetter =
        b.prototype.verticalAlignSetter =
          function (c, a) {
            this[a] = c;
            this.doTransform = !0;
          };
      ('');
      return b;
    }
  );
  J(
    e,
    'Core/Renderer/RendererRegistry.js',
    [e['Core/Globals.js']],
    function (b) {
      var e;
      (function (e) {
        e.rendererTypes = {};
        var I;
        e.getRendererType = function (b) {
          void 0 === b && (b = I);
          return e.rendererTypes[b] || e.rendererTypes[I];
        };
        e.registerRendererType = function (t, A, C) {
          e.rendererTypes[t] = A;
          if (!I || C) (I = t), (b.Renderer = A);
        };
      })(e || (e = {}));
      return e;
    }
  );
  J(
    e,
    'Core/Renderer/SVG/SVGLabel.js',
    [e['Core/Renderer/SVG/SVGElement.js'], e['Core/Utilities.js']],
    function (b, e) {
      var I =
          (this && this.__extends) ||
          (function () {
            var b = function (l, d) {
              b =
                Object.setPrototypeOf ||
                ({ __proto__: [] } instanceof Array &&
                  function (a, f) {
                    a.__proto__ = f;
                  }) ||
                function (a, f) {
                  for (var d in f) f.hasOwnProperty(d) && (a[d] = f[d]);
                };
              return b(l, d);
            };
            return function (l, d) {
              function a() {
                this.constructor = l;
              }
              b(l, d);
              l.prototype =
                null === d
                  ? Object.create(d)
                  : ((a.prototype = d.prototype), new a());
            };
          })(),
        E = e.defined,
        t = e.extend,
        A = e.isNumber,
        C = e.merge,
        z = e.pick,
        q = e.removeEvent;
      return (function (l) {
        function n(d, a, f, k, b, y, B, x, r, m) {
          var h = l.call(this) || this;
          h.paddingLeftSetter = h.paddingSetter;
          h.paddingRightSetter = h.paddingSetter;
          h.init(d, 'g');
          h.textStr = a;
          h.x = f;
          h.y = k;
          h.anchorX = y;
          h.anchorY = B;
          h.baseline = r;
          h.className = m;
          h.addClass(
            'button' === m ? 'highcharts-no-tooltip' : 'highcharts-label'
          );
          m && h.addClass('highcharts-' + m);
          h.text = d.text(void 0, 0, 0, x).attr({ zIndex: 1 });
          var p;
          'string' === typeof b &&
            ((p = /^url\((.*?)\)$/.test(b)) || h.renderer.symbols[b]) &&
            (h.symbolKey = b);
          h.bBox = n.emptyBBox;
          h.padding = 3;
          h.baselineOffset = 0;
          h.needsBox = d.styledMode || p;
          h.deferredAttr = {};
          h.alignFactor = 0;
          return h;
        }
        I(n, l);
        n.prototype.alignSetter = function (d) {
          d = { left: 0, center: 0.5, right: 1 }[d];
          d !== this.alignFactor &&
            ((this.alignFactor = d),
            this.bBox && A(this.xSetting) && this.attr({ x: this.xSetting }));
        };
        n.prototype.anchorXSetter = function (d, a) {
          this.anchorX = d;
          this.boxAttr(
            a,
            Math.round(d) - this.getCrispAdjust() - this.xSetting
          );
        };
        n.prototype.anchorYSetter = function (d, a) {
          this.anchorY = d;
          this.boxAttr(a, d - this.ySetting);
        };
        n.prototype.boxAttr = function (d, a) {
          this.box ? this.box.attr(d, a) : (this.deferredAttr[d] = a);
        };
        n.prototype.css = function (d) {
          if (d) {
            var a = {};
            d = C(d);
            n.textProps.forEach(function (f) {
              'undefined' !== typeof d[f] && ((a[f] = d[f]), delete d[f]);
            });
            this.text.css(a);
            var f = 'width' in a;
            'fontSize' in a || 'fontWeight' in a
              ? this.updateTextPadding()
              : f && this.updateBoxSize();
          }
          return b.prototype.css.call(this, d);
        };
        n.prototype.destroy = function () {
          q(this.element, 'mouseenter');
          q(this.element, 'mouseleave');
          this.text && this.text.destroy();
          this.box && (this.box = this.box.destroy());
          b.prototype.destroy.call(this);
        };
        n.prototype.fillSetter = function (d, a) {
          d && (this.needsBox = !0);
          this.fill = d;
          this.boxAttr(a, d);
        };
        n.prototype.getBBox = function () {
          this.textStr &&
            0 === this.bBox.width &&
            0 === this.bBox.height &&
            this.updateBoxSize();
          var d = this.padding,
            a = z(this.paddingLeft, d);
          return {
            width: this.width,
            height: this.height,
            x: this.bBox.x - a,
            y: this.bBox.y - d,
          };
        };
        n.prototype.getCrispAdjust = function () {
          return this.renderer.styledMode && this.box
            ? (this.box.strokeWidth() % 2) / 2
            : ((this['stroke-width'] ? parseInt(this['stroke-width'], 10) : 0) %
                2) /
                2;
        };
        n.prototype.heightSetter = function (d) {
          this.heightSetting = d;
        };
        n.prototype.onAdd = function () {
          var d = this.textStr;
          this.text.add(this);
          this.attr({ text: E(d) ? d : '', x: this.x, y: this.y });
          this.box &&
            E(this.anchorX) &&
            this.attr({ anchorX: this.anchorX, anchorY: this.anchorY });
        };
        n.prototype.paddingSetter = function (d, a) {
          A(d)
            ? d !== this[a] && ((this[a] = d), this.updateTextPadding())
            : (this[a] = void 0);
        };
        n.prototype.rSetter = function (d, a) {
          this.boxAttr(a, d);
        };
        n.prototype.shadow = function (d) {
          d &&
            !this.renderer.styledMode &&
            (this.updateBoxSize(), this.box && this.box.shadow(d));
          return this;
        };
        n.prototype.strokeSetter = function (d, a) {
          this.stroke = d;
          this.boxAttr(a, d);
        };
        n.prototype['stroke-widthSetter'] = function (d, a) {
          d && (this.needsBox = !0);
          this['stroke-width'] = d;
          this.boxAttr(a, d);
        };
        n.prototype['text-alignSetter'] = function (d) {
          this.textAlign = d;
        };
        n.prototype.textSetter = function (d) {
          'undefined' !== typeof d && this.text.attr({ text: d });
          this.updateTextPadding();
        };
        n.prototype.updateBoxSize = function () {
          var d = this.text.element.style,
            a = {},
            f = this.padding,
            k = (this.bBox =
              (A(this.widthSetting) &&
                A(this.heightSetting) &&
                !this.textAlign) ||
              !E(this.text.textStr)
                ? n.emptyBBox
                : this.text.getBBox());
          this.width = this.getPaddedWidth();
          this.height = (this.heightSetting || k.height || 0) + 2 * f;
          d = this.renderer.fontMetrics(d && d.fontSize, this.text);
          this.baselineOffset =
            f +
            Math.min((this.text.firstLineMetrics || d).b, k.height || Infinity);
          this.heightSetting &&
            (this.baselineOffset += (this.heightSetting - d.h) / 2);
          this.needsBox &&
            (this.box ||
              ((f = this.box =
                this.symbolKey
                  ? this.renderer.symbol(this.symbolKey)
                  : this.renderer.rect()),
              f.addClass(
                ('button' === this.className ? '' : 'highcharts-label-box') +
                  (this.className
                    ? ' highcharts-' + this.className + '-box'
                    : '')
              ),
              f.add(this)),
            (f = this.getCrispAdjust()),
            (a.x = f),
            (a.y = (this.baseline ? -this.baselineOffset : 0) + f),
            (a.width = Math.round(this.width)),
            (a.height = Math.round(this.height)),
            this.box.attr(t(a, this.deferredAttr)),
            (this.deferredAttr = {}));
        };
        n.prototype.updateTextPadding = function () {
          var d = this.text;
          this.updateBoxSize();
          var a = this.baseline ? 0 : this.baselineOffset,
            f = z(this.paddingLeft, this.padding);
          E(this.widthSetting) &&
            this.bBox &&
            ('center' === this.textAlign || 'right' === this.textAlign) &&
            (f +=
              { center: 0.5, right: 1 }[this.textAlign] *
              (this.widthSetting - this.bBox.width));
          if (f !== d.x || a !== d.y)
            d.attr('x', f),
              d.hasBoxWidthChanged && (this.bBox = d.getBBox(!0)),
              'undefined' !== typeof a && d.attr('y', a);
          d.x = f;
          d.y = a;
        };
        n.prototype.widthSetter = function (d) {
          this.widthSetting = A(d) ? d : void 0;
        };
        n.prototype.getPaddedWidth = function () {
          var d = this.padding,
            a = z(this.paddingLeft, d);
          d = z(this.paddingRight, d);
          return (this.widthSetting || this.bBox.width || 0) + a + d;
        };
        n.prototype.xSetter = function (d) {
          this.x = d;
          this.alignFactor &&
            ((d -= this.alignFactor * this.getPaddedWidth()),
            (this['forceAnimate:x'] = !0));
          this.xSetting = Math.round(d);
          this.attr('translateX', this.xSetting);
        };
        n.prototype.ySetter = function (d) {
          this.ySetting = this.y = Math.round(d);
          this.attr('translateY', this.ySetting);
        };
        n.emptyBBox = { width: 0, height: 0, x: 0, y: 0 };
        n.textProps =
          'color direction fontFamily fontSize fontStyle fontWeight lineHeight textAlign textDecoration textOutline textOverflow width'.split(
            ' '
          );
        return n;
      })(b);
    }
  );
  J(e, 'Core/Renderer/SVG/Symbols.js', [e['Core/Utilities.js']], function (b) {
    function e(b, e, l, n, d) {
      var a = [];
      if (d) {
        var f = d.start || 0,
          k = C(d.r, l);
        l = C(d.r, n || l);
        var G = (d.end || 0) - 0.001;
        n = d.innerR;
        var y = C(d.open, 0.001 > Math.abs((d.end || 0) - f - 2 * Math.PI)),
          B = Math.cos(f),
          x = Math.sin(f),
          r = Math.cos(G),
          m = Math.sin(G);
        f = C(d.longArc, 0.001 > G - f - Math.PI ? 0 : 1);
        a.push(
          ['M', b + k * B, e + l * x],
          ['A', k, l, 0, f, C(d.clockwise, 1), b + k * r, e + l * m]
        );
        t(n) &&
          a.push(
            y ? ['M', b + n * r, e + n * m] : ['L', b + n * r, e + n * m],
            [
              'A',
              n,
              n,
              0,
              f,
              t(d.clockwise) ? 1 - d.clockwise : 0,
              b + n * B,
              e + n * x,
            ]
          );
        y || a.push(['Z']);
      }
      return a;
    }
    function v(b, e, l, n, d) {
      return d && d.r
        ? E(b, e, l, n, d)
        : [
            ['M', b, e],
            ['L', b + l, e],
            ['L', b + l, e + n],
            ['L', b, e + n],
            ['Z'],
          ];
    }
    function E(b, e, l, n, d) {
      d = (d && d.r) || 0;
      return [
        ['M', b + d, e],
        ['L', b + l - d, e],
        ['C', b + l, e, b + l, e, b + l, e + d],
        ['L', b + l, e + n - d],
        ['C', b + l, e + n, b + l, e + n, b + l - d, e + n],
        ['L', b + d, e + n],
        ['C', b, e + n, b, e + n, b, e + n - d],
        ['L', b, e + d],
        ['C', b, e, b, e, b + d, e],
      ];
    }
    var t = b.defined,
      A = b.isNumber,
      C = b.pick;
    return {
      arc: e,
      callout: function (b, e, l, n, d) {
        var a = Math.min((d && d.r) || 0, l, n),
          f = a + 6,
          k = d && d.anchorX;
        d = (d && d.anchorY) || 0;
        var G = E(b, e, l, n, { r: a });
        if (!A(k)) return G;
        b + k >= l
          ? d > e + f && d < e + n - f
            ? G.splice(
                3,
                1,
                ['L', b + l, d - 6],
                ['L', b + l + 6, d],
                ['L', b + l, d + 6],
                ['L', b + l, e + n - a]
              )
            : G.splice(
                3,
                1,
                ['L', b + l, n / 2],
                ['L', k, d],
                ['L', b + l, n / 2],
                ['L', b + l, e + n - a]
              )
          : 0 >= b + k
            ? d > e + f && d < e + n - f
              ? G.splice(
                  7,
                  1,
                  ['L', b, d + 6],
                  ['L', b - 6, d],
                  ['L', b, d - 6],
                  ['L', b, e + a]
                )
              : G.splice(
                  7,
                  1,
                  ['L', b, n / 2],
                  ['L', k, d],
                  ['L', b, n / 2],
                  ['L', b, e + a]
                )
            : d && d > n && k > b + f && k < b + l - f
              ? G.splice(
                  5,
                  1,
                  ['L', k + 6, e + n],
                  ['L', k, e + n + 6],
                  ['L', k - 6, e + n],
                  ['L', b + a, e + n]
                )
              : d &&
                0 > d &&
                k > b + f &&
                k < b + l - f &&
                G.splice(
                  1,
                  1,
                  ['L', k - 6, e],
                  ['L', k, e - 6],
                  ['L', k + 6, e],
                  ['L', l - a, e]
                );
        return G;
      },
      circle: function (b, q, l, n) {
        return e(b + l / 2, q + n / 2, l / 2, n / 2, {
          start: 0.5 * Math.PI,
          end: 2.5 * Math.PI,
          open: !1,
        });
      },
      diamond: function (b, e, l, n) {
        return [
          ['M', b + l / 2, e],
          ['L', b + l, e + n / 2],
          ['L', b + l / 2, e + n],
          ['L', b, e + n / 2],
          ['Z'],
        ];
      },
      rect: v,
      roundedRect: E,
      square: v,
      triangle: function (b, e, l, n) {
        return [
          ['M', b + l / 2, e],
          ['L', b + l, e + n],
          ['L', b, e + n],
          ['Z'],
        ];
      },
      'triangle-down': function (b, e, l, n) {
        return [['M', b, e], ['L', b + l, e], ['L', b + l / 2, e + n], ['Z']];
      },
    };
  });
  J(
    e,
    'Core/Renderer/SVG/TextBuilder.js',
    [
      e['Core/Renderer/HTML/AST.js'],
      e['Core/Globals.js'],
      e['Core/Utilities.js'],
    ],
    function (b, e, v) {
      var I = e.doc,
        t = e.SVG_NS,
        A = e.win,
        C = v.attr,
        z = v.extend,
        q = v.isString,
        l = v.objectEach,
        n = v.pick;
      return (function () {
        function d(a) {
          var f = a.styles;
          this.renderer = a.renderer;
          this.svgElement = a;
          this.width = a.textWidth;
          this.textLineHeight = f && f.lineHeight;
          this.textOutline = f && f.textOutline;
          this.ellipsis = !(!f || 'ellipsis' !== f.textOverflow);
          this.noWrap = !(!f || 'nowrap' !== f.whiteSpace);
          this.fontSize = f && f.fontSize;
        }
        d.prototype.buildSVG = function () {
          var a = this.svgElement,
            f = a.element,
            d = a.renderer,
            l = n(a.textStr, '').toString(),
            y = -1 !== l.indexOf('<'),
            B = f.childNodes;
          d = this.width && !a.added && d.box;
          var x = /<br.*?>/g,
            r = [
              l,
              this.ellipsis,
              this.noWrap,
              this.textLineHeight,
              this.textOutline,
              this.fontSize,
              this.width,
            ].join();
          if (r !== a.textCache) {
            a.textCache = r;
            delete a.actualWidth;
            for (r = B.length; r--; ) f.removeChild(B[r]);
            y ||
            this.ellipsis ||
            this.width ||
            (-1 !== l.indexOf(' ') && (!this.noWrap || x.test(l)))
              ? '' !== l &&
                (d && d.appendChild(f),
                (l = new b(l)),
                this.modifyTree(l.nodes),
                l.addToDOM(a.element),
                this.modifyDOM(),
                this.ellipsis &&
                  -1 !== (f.textContent || '').indexOf('\u2026') &&
                  a.attr(
                    'title',
                    this.unescapeEntities(a.textStr || '', ['&lt;', '&gt;'])
                  ),
                d && d.removeChild(f))
              : f.appendChild(I.createTextNode(this.unescapeEntities(l)));
            q(this.textOutline) &&
              a.applyTextOutline &&
              a.applyTextOutline(this.textOutline);
          }
        };
        d.prototype.modifyDOM = function () {
          var a = this,
            f = this.svgElement,
            d = C(f.element, 'x');
          f.firstLineMetrics = void 0;
          for (var b; (b = f.element.firstChild); )
            if (/^[\s\u200B]*$/.test(b.textContent || ' '))
              f.element.removeChild(b);
            else break;
          [].forEach.call(
            f.element.querySelectorAll('tspan.highcharts-br'),
            function (b, m) {
              b.nextSibling &&
                b.previousSibling &&
                (0 === m &&
                  1 === b.previousSibling.nodeType &&
                  (f.firstLineMetrics = f.renderer.fontMetrics(
                    void 0,
                    b.previousSibling
                  )),
                C(b, { dy: a.getLineHeight(b.nextSibling), x: d }));
            }
          );
          var y = this.width || 0;
          if (y) {
            var B = function (b, m) {
                var h = b.textContent || '',
                  p = h.replace(/([^\^])-/g, '$1- ').split(' '),
                  c =
                    !a.noWrap &&
                    (1 < p.length || 1 < f.element.childNodes.length),
                  w = a.getLineHeight(m),
                  g = 0,
                  k = f.actualWidth;
                if (a.ellipsis)
                  h &&
                    a.truncate(
                      b,
                      h,
                      void 0,
                      0,
                      Math.max(0, y - parseInt(a.fontSize || 12, 10)),
                      function (c, a) {
                        return c.substring(0, a) + '\u2026';
                      }
                    );
                else if (c) {
                  h = [];
                  for (c = []; m.firstChild && m.firstChild !== b; )
                    c.push(m.firstChild), m.removeChild(m.firstChild);
                  for (; p.length; )
                    p.length &&
                      !a.noWrap &&
                      0 < g &&
                      (h.push(b.textContent || ''),
                      (b.textContent = p.join(' ').replace(/- /g, '-'))),
                      a.truncate(
                        b,
                        void 0,
                        p,
                        0 === g ? k || 0 : 0,
                        y,
                        function (c, a) {
                          return p.slice(0, a).join(' ').replace(/- /g, '-');
                        }
                      ),
                      (k = f.actualWidth),
                      g++;
                  c.forEach(function (c) {
                    m.insertBefore(c, b);
                  });
                  h.forEach(function (c) {
                    m.insertBefore(I.createTextNode(c), b);
                    c = I.createElementNS(t, 'tspan');
                    c.textContent = '\u200b';
                    C(c, { dy: w, x: d });
                    m.insertBefore(c, b);
                  });
                }
              },
              x = function (a) {
                [].slice.call(a.childNodes).forEach(function (d) {
                  d.nodeType === A.Node.TEXT_NODE
                    ? B(d, a)
                    : (-1 !== d.className.baseVal.indexOf('highcharts-br') &&
                        (f.actualWidth = 0),
                      x(d));
                });
              };
            x(f.element);
          }
        };
        d.prototype.getLineHeight = function (a) {
          var f;
          a = a.nodeType === A.Node.TEXT_NODE ? a.parentElement : a;
          this.renderer.styledMode ||
            (f =
              a && /(px|em)$/.test(a.style.fontSize)
                ? a.style.fontSize
                : this.fontSize || this.renderer.style.fontSize || 12);
          return this.textLineHeight
            ? parseInt(this.textLineHeight.toString(), 10)
            : this.renderer.fontMetrics(f, a || this.svgElement.element).h;
        };
        d.prototype.modifyTree = function (a) {
          var f = this,
            d = function (b, k) {
              var y = b.attributes;
              y = void 0 === y ? {} : y;
              var x = b.children,
                r = b.style;
              r = void 0 === r ? {} : r;
              var m = b.tagName,
                h = f.renderer.styledMode;
              if ('b' === m || 'strong' === m)
                h
                  ? (y['class'] = 'highcharts-strong')
                  : (r.fontWeight = 'bold');
              else if ('i' === m || 'em' === m)
                h
                  ? (y['class'] = 'highcharts-emphasized')
                  : (r.fontStyle = 'italic');
              r && r.color && (r.fill = r.color);
              'br' === m
                ? ((y['class'] = 'highcharts-br'),
                  (b.textContent = '\u200b'),
                  (k = a[k + 1]) &&
                    k.textContent &&
                    (k.textContent = k.textContent.replace(/^ +/gm, '')))
                : 'a' === m &&
                  x &&
                  x.some(function (a) {
                    return '#text' === a.tagName;
                  }) &&
                  (b.children = [{ children: x, tagName: 'tspan' }]);
              '#text' !== m && 'a' !== m && (b.tagName = 'tspan');
              z(b, { attributes: y, style: r });
              x &&
                x
                  .filter(function (a) {
                    return '#text' !== a.tagName;
                  })
                  .forEach(d);
            };
          a.forEach(d);
        };
        d.prototype.truncate = function (a, f, d, b, y, l) {
          var k = this.svgElement,
            r = k.renderer,
            m = k.rotation,
            h = [],
            p = d ? 1 : 0,
            c = (f || d || '').length,
            w = c,
            g,
            F = function (c, g) {
              g = g || c;
              var u = a.parentNode;
              if (u && 'undefined' === typeof h[g])
                if (u.getSubStringLength)
                  try {
                    h[g] = b + u.getSubStringLength(0, d ? g + 1 : g);
                  } catch (P) {
                    ('');
                  }
                else
                  r.getSpanWidth &&
                    ((a.textContent = l(f || d, c)),
                    (h[g] = b + r.getSpanWidth(k, a)));
              return h[g];
            };
          k.rotation = 0;
          var u = F(a.textContent.length);
          if (b + u > y) {
            for (; p <= c; )
              (w = Math.ceil((p + c) / 2)),
                d && (g = l(d, w)),
                (u = F(w, g && g.length - 1)),
                p === c ? (p = c + 1) : u > y ? (c = w - 1) : (p = w);
            0 === c
              ? (a.textContent = '')
              : (f && c === f.length - 1) ||
                (a.textContent = g || l(f || d, w));
          }
          d && d.splice(0, w);
          k.actualWidth = u;
          k.rotation = m;
        };
        d.prototype.unescapeEntities = function (a, f) {
          l(this.renderer.escapes, function (d, b) {
            (f && -1 !== f.indexOf(d)) ||
              (a = a.toString().replace(new RegExp(d, 'g'), b));
          });
          return a;
        };
        return d;
      })();
    }
  );
  J(
    e,
    'Core/Renderer/SVG/SVGRenderer.js',
    [
      e['Core/Renderer/HTML/AST.js'],
      e['Core/Color/Color.js'],
      e['Core/Globals.js'],
      e['Core/Renderer/RendererRegistry.js'],
      e['Core/Renderer/SVG/SVGElement.js'],
      e['Core/Renderer/SVG/SVGLabel.js'],
      e['Core/Renderer/SVG/Symbols.js'],
      e['Core/Renderer/SVG/TextBuilder.js'],
      e['Core/Utilities.js'],
    ],
    function (b, e, v, E, t, A, C, z, q) {
      var l = v.charts,
        n = v.deg2rad,
        d = v.doc,
        a = v.isFirefox,
        f = v.isMS,
        k = v.isWebKit,
        G = v.noop,
        y = v.SVG_NS,
        B = v.symbolSizes,
        x = v.win,
        r = q.addEvent,
        m = q.attr,
        h = q.createElement,
        p = q.css,
        c = q.defined,
        w = q.destroyObjectProperties,
        g = q.extend,
        F = q.isArray,
        u = q.isNumber,
        D = q.isObject,
        H = q.isString,
        L = q.merge,
        P = q.pick,
        K = q.pInt,
        I = q.uniqueKey,
        X;
      v = (function () {
        function y(c, a, g, h, f, d, u) {
          this.width =
            this.url =
            this.style =
            this.isSVG =
            this.imgCount =
            this.height =
            this.gradients =
            this.globalAnimation =
            this.defs =
            this.chartIndex =
            this.cacheKeys =
            this.cache =
            this.boxWrapper =
            this.box =
            this.alignedObjects =
              void 0;
          this.init(c, a, g, h, f, d, u);
        }
        y.prototype.init = function (c, g, h, f, u, b, w) {
          var k = this.createElement('svg').attr({
              version: '1.1',
              class: 'highcharts-root',
            }),
            D = k.element;
          w || k.css(this.getStyle(f));
          c.appendChild(D);
          m(c, 'dir', 'ltr');
          -1 === c.innerHTML.indexOf('xmlns') && m(D, 'xmlns', this.SVG_NS);
          this.isSVG = !0;
          this.box = D;
          this.boxWrapper = k;
          this.alignedObjects = [];
          this.url = this.getReferenceURL();
          this.createElement('desc')
            .add()
            .element.appendChild(
              d.createTextNode('Created with Highcharts 10.0.0')
            );
          this.defs = this.createElement('defs').add();
          this.allowHTML = b;
          this.forExport = u;
          this.styledMode = w;
          this.gradients = {};
          this.cache = {};
          this.cacheKeys = [];
          this.imgCount = 0;
          this.setSize(g, h, !1);
          var F;
          a &&
            c.getBoundingClientRect &&
            ((g = function () {
              p(c, { left: 0, top: 0 });
              F = c.getBoundingClientRect();
              p(c, {
                left: Math.ceil(F.left) - F.left + 'px',
                top: Math.ceil(F.top) - F.top + 'px',
              });
            }),
            g(),
            (this.unSubPixelFix = r(x, 'resize', g)));
        };
        y.prototype.definition = function (c) {
          return new b([c]).addToDOM(this.defs.element);
        };
        y.prototype.getReferenceURL = function () {
          if ((a || k) && d.getElementsByTagName('base').length) {
            if (!c(X)) {
              var g = I();
              g = new b([
                {
                  tagName: 'svg',
                  attributes: { width: 8, height: 8 },
                  children: [
                    {
                      tagName: 'defs',
                      children: [
                        {
                          tagName: 'clipPath',
                          attributes: { id: g },
                          children: [
                            {
                              tagName: 'rect',
                              attributes: { width: 4, height: 4 },
                            },
                          ],
                        },
                      ],
                    },
                    {
                      tagName: 'rect',
                      attributes: {
                        id: 'hitme',
                        width: 8,
                        height: 8,
                        'clip-path': 'url(#' + g + ')',
                        fill: 'rgba(0,0,0,0.001)',
                      },
                    },
                  ],
                },
              ]).addToDOM(d.body);
              p(g, { position: 'fixed', top: 0, left: 0, zIndex: 9e5 });
              var h = d.elementFromPoint(6, 6);
              X = 'hitme' === (h && h.id);
              d.body.removeChild(g);
            }
            if (X)
              return x.location.href
                .split('#')[0]
                .replace(/<[^>]*>/g, '')
                .replace(/([\('\)])/g, '\\$1')
                .replace(/ /g, '%20');
          }
          return '';
        };
        y.prototype.getStyle = function (c) {
          return (this.style = g(
            {
              fontFamily:
                '"Lucida Grande", "Lucida Sans Unicode", Arial, Helvetica, sans-serif',
              fontSize: '12px',
            },
            c
          ));
        };
        y.prototype.setStyle = function (c) {
          this.boxWrapper.css(this.getStyle(c));
        };
        y.prototype.isHidden = function () {
          return !this.boxWrapper.getBBox().width;
        };
        y.prototype.destroy = function () {
          var c = this.defs;
          this.box = null;
          this.boxWrapper = this.boxWrapper.destroy();
          w(this.gradients || {});
          this.gradients = null;
          c && (this.defs = c.destroy());
          this.unSubPixelFix && this.unSubPixelFix();
          return (this.alignedObjects = null);
        };
        y.prototype.createElement = function (c) {
          var a = new this.Element();
          a.init(this, c);
          return a;
        };
        y.prototype.getRadialAttr = function (c, a) {
          return {
            cx: c[0] - c[2] / 2 + (a.cx || 0) * c[2],
            cy: c[1] - c[2] / 2 + (a.cy || 0) * c[2],
            r: (a.r || 0) * c[2],
          };
        };
        y.prototype.buildText = function (c) {
          new z(c).buildSVG();
        };
        y.prototype.getContrast = function (c) {
          c = e.parse(c).rgba;
          c[0] *= 1;
          c[1] *= 1.2;
          c[2] *= 0.5;
          return 459 < c[0] + c[1] + c[2] ? '#000000' : '#FFFFFF';
        };
        y.prototype.button = function (c, a, h, d, u, p, m, w, k, F) {
          var y = this.label(c, a, h, k, void 0, void 0, F, void 0, 'button'),
            x = this.styledMode,
            l = 0,
            H = u ? L(u) : {},
            B = L(
              { color: '#333333', cursor: 'pointer', fontWeight: 'normal' },
              H.style
            );
          delete H.style;
          H = b.filterUserAttributes(H);
          y.attr(L({ padding: 8, r: 2 }, H));
          if (!x) {
            H = L({ fill: '#f7f7f7', stroke: '#cccccc', 'stroke-width': 1 }, H);
            p = L(H, { fill: '#e6e6e6' }, b.filterUserAttributes(p || {}));
            var n = p.style;
            delete p.style;
            m = L(
              H,
              {
                fill: '#e6ebf5',
                style: { color: '#000000', fontWeight: 'bold' },
              },
              b.filterUserAttributes(m || {})
            );
            var e = m.style;
            delete m.style;
            w = L(
              H,
              { style: { color: '#cccccc' } },
              b.filterUserAttributes(w || {})
            );
            var Y = w.style;
            delete w.style;
          }
          r(y.element, f ? 'mouseover' : 'mouseenter', function () {
            3 !== l && y.setState(1);
          });
          r(y.element, f ? 'mouseout' : 'mouseleave', function () {
            3 !== l && y.setState(l);
          });
          y.setState = function (c) {
            1 !== c && (y.state = l = c);
            y.removeClass(
              /highcharts-button-(normal|hover|pressed|disabled)/
            ).addClass(
              'highcharts-button-' +
                ['normal', 'hover', 'pressed', 'disabled'][c || 0]
            );
            x ||
              (y.attr([H, p, m, w][c || 0]),
              (c = [B, n, e, Y][c || 0]),
              D(c) && y.css(c));
          };
          x || y.attr(H).css(g({ cursor: 'default' }, B));
          return y
            .on('touchstart', function (c) {
              return c.stopPropagation();
            })
            .on('click', function (c) {
              3 !== l && d.call(y, c);
            });
        };
        y.prototype.crispLine = function (a, g, h) {
          void 0 === h && (h = 'round');
          var f = a[0],
            d = a[1];
          c(f[1]) &&
            f[1] === d[1] &&
            (f[1] = d[1] = Math[h](f[1]) - (g % 2) / 2);
          c(f[2]) &&
            f[2] === d[2] &&
            (f[2] = d[2] = Math[h](f[2]) + (g % 2) / 2);
          return a;
        };
        y.prototype.path = function (c) {
          var a = this.styledMode ? {} : { fill: 'none' };
          F(c) ? (a.d = c) : D(c) && g(a, c);
          return this.createElement('path').attr(a);
        };
        y.prototype.circle = function (c, a, g) {
          c = D(c) ? c : 'undefined' === typeof c ? {} : { x: c, y: a, r: g };
          a = this.createElement('circle');
          a.xSetter = a.ySetter = function (c, a, g) {
            g.setAttribute('c' + a, c);
          };
          return a.attr(c);
        };
        y.prototype.arc = function (c, a, g, h, f, d) {
          D(c)
            ? ((h = c), (a = h.y), (g = h.r), (c = h.x))
            : (h = { innerR: h, start: f, end: d });
          c = this.symbol('arc', c, a, g, g, h);
          c.r = g;
          return c;
        };
        y.prototype.rect = function (c, a, g, h, f, d) {
          f = D(c) ? c.r : f;
          var u = this.createElement('rect');
          c = D(c)
            ? c
            : 'undefined' === typeof c
              ? {}
              : { x: c, y: a, width: Math.max(g, 0), height: Math.max(h, 0) };
          this.styledMode ||
            ('undefined' !== typeof d &&
              ((c['stroke-width'] = d), (c = u.crisp(c))),
            (c.fill = 'none'));
          f && (c.r = f);
          u.rSetter = function (c, a, g) {
            u.r = c;
            m(g, { rx: c, ry: c });
          };
          u.rGetter = function () {
            return u.r || 0;
          };
          return u.attr(c);
        };
        y.prototype.setSize = function (c, a, g) {
          this.width = c;
          this.height = a;
          this.boxWrapper.animate(
            { width: c, height: a },
            {
              step: function () {
                this.attr({
                  viewBox:
                    '0 0 ' + this.attr('width') + ' ' + this.attr('height'),
                });
              },
              duration: P(g, !0) ? void 0 : 0,
            }
          );
          this.alignElements();
        };
        y.prototype.g = function (c) {
          var a = this.createElement('g');
          return c ? a.attr({ class: 'highcharts-' + c }) : a;
        };
        y.prototype.image = function (c, a, g, h, f, d) {
          var p = { preserveAspectRatio: 'none' },
            m = function (c, a) {
              c.setAttributeNS
                ? c.setAttributeNS('http://www.w3.org/1999/xlink', 'href', a)
                : c.setAttribute('hc-svg-href', a);
            };
          u(a) && (p.x = a);
          u(g) && (p.y = g);
          u(h) && (p.width = h);
          u(f) && (p.height = f);
          var b = this.createElement('image').attr(p);
          a = function (a) {
            m(b.element, c);
            d.call(b, a);
          };
          d
            ? (m(
                b.element,
                'data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw=='
              ),
              (g = new x.Image()),
              r(g, 'load', a),
              (g.src = c),
              g.complete && a({}))
            : m(b.element, c);
          return b;
        };
        y.prototype.symbol = function (a, f, u, m, b, w) {
          var k = this,
            D = /^url\((.*?)\)$/,
            F = D.test(a),
            r = !F && (this.symbols[a] ? a : 'circle'),
            y = r && this.symbols[r],
            x;
          if (y) {
            'number' === typeof f &&
              (x = y.call(
                this.symbols,
                Math.round(f || 0),
                Math.round(u || 0),
                m || 0,
                b || 0,
                w
              ));
            var H = this.path(x);
            k.styledMode || H.attr('fill', 'none');
            g(H, { symbolName: r || void 0, x: f, y: u, width: m, height: b });
            w && g(H, w);
          } else if (F) {
            var n = a.match(D)[1];
            var e = (H = this.image(n));
            e.imgwidth = P(B[n] && B[n].width, w && w.width);
            e.imgheight = P(B[n] && B[n].height, w && w.height);
            var Y = function (c) {
              return c.attr({ width: c.width, height: c.height });
            };
            ['width', 'height'].forEach(function (a) {
              e[a + 'Setter'] = function (a, g) {
                var h = this['img' + g];
                this[g] = a;
                c(h) &&
                  (w &&
                    'within' === w.backgroundSize &&
                    this.width &&
                    this.height &&
                    (h = Math.round(
                      h *
                        Math.min(
                          this.width / this.imgwidth,
                          this.height / this.imgheight
                        )
                    )),
                  this.element && this.element.setAttribute(g, h),
                  this.alignByTranslate ||
                    ((a = ((this[g] || 0) - h) / 2),
                    this.attr(
                      'width' === g ? { translateX: a } : { translateY: a }
                    )));
              };
            });
            c(f) && e.attr({ x: f, y: u });
            e.isImg = !0;
            c(e.imgwidth) && c(e.imgheight)
              ? Y(e)
              : (e.attr({ width: 0, height: 0 }),
                h('img', {
                  onload: function () {
                    var c = l[k.chartIndex];
                    0 === this.width &&
                      (p(this, { position: 'absolute', top: '-999em' }),
                      d.body.appendChild(this));
                    B[n] = { width: this.width, height: this.height };
                    e.imgwidth = this.width;
                    e.imgheight = this.height;
                    e.element && Y(e);
                    this.parentNode && this.parentNode.removeChild(this);
                    k.imgCount--;
                    if (!k.imgCount && c && !c.hasLoaded) c.onload();
                  },
                  src: n,
                }),
                this.imgCount++);
          }
          return H;
        };
        y.prototype.clipRect = function (c, a, g, h) {
          var f = I() + '-',
            d = this.createElement('clipPath').attr({ id: f }).add(this.defs);
          c = this.rect(c, a, g, h, 0).add(d);
          c.id = f;
          c.clipPath = d;
          c.count = 0;
          return c;
        };
        y.prototype.text = function (a, g, h, f) {
          var d = {};
          if (f && (this.allowHTML || !this.forExport))
            return this.html(a, g, h);
          d.x = Math.round(g || 0);
          h && (d.y = Math.round(h));
          c(a) && (d.text = a);
          a = this.createElement('text').attr(d);
          if (!f || (this.forExport && !this.allowHTML))
            a.xSetter = function (c, a, g) {
              for (
                var h = g.getElementsByTagName('tspan'),
                  f = g.getAttribute(a),
                  d = 0,
                  u;
                d < h.length;
                d++
              )
                (u = h[d]), u.getAttribute(a) === f && u.setAttribute(a, c);
              g.setAttribute(a, c);
            };
          return a;
        };
        y.prototype.fontMetrics = function (c, a) {
          c =
            (!this.styledMode && /px/.test(c)) || !x.getComputedStyle
              ? c ||
                (a && a.style && a.style.fontSize) ||
                (this.style && this.style.fontSize)
              : a && t.prototype.getStyle.call(a, 'font-size');
          c = /px/.test(c) ? K(c) : 12;
          a = 24 > c ? c + 3 : Math.round(1.2 * c);
          return { h: a, b: Math.round(0.8 * a), f: c };
        };
        y.prototype.rotCorr = function (c, a, g) {
          var h = c;
          a && g && (h = Math.max(h * Math.cos(a * n), 4));
          return { x: (-c / 3) * Math.sin(a * n), y: h };
        };
        y.prototype.pathToSegments = function (c) {
          for (
            var a = [],
              g = [],
              h = { A: 8, C: 7, H: 2, L: 3, M: 3, Q: 5, S: 5, T: 3, V: 2 },
              f = 0;
            f < c.length;
            f++
          )
            H(g[0]) &&
              u(c[f]) &&
              g.length === h[g[0].toUpperCase()] &&
              c.splice(f, 0, g[0].replace('M', 'L').replace('m', 'l')),
              'string' === typeof c[f] &&
                (g.length && a.push(g.slice(0)), (g.length = 0)),
              g.push(c[f]);
          a.push(g.slice(0));
          return a;
        };
        y.prototype.label = function (c, a, g, h, f, d, u, p, m) {
          return new A(this, c, a, g, h, f, d, u, p, m);
        };
        y.prototype.alignElements = function () {
          this.alignedObjects.forEach(function (c) {
            return c.align();
          });
        };
        return y;
      })();
      g(v.prototype, {
        Element: t,
        SVG_NS: y,
        escapes: {
          '&': '&amp;',
          '<': '&lt;',
          '>': '&gt;',
          "'": '&#39;',
          '"': '&quot;',
        },
        symbols: C,
        draw: G,
      });
      E.registerRendererType('svg', v, !0);
      ('');
      return v;
    }
  );
  J(
    e,
    'Core/Renderer/HTML/HTMLElement.js',
    [
      e['Core/Globals.js'],
      e['Core/Renderer/SVG/SVGElement.js'],
      e['Core/Utilities.js'],
    ],
    function (b, e, v) {
      var I =
          (this && this.__extends) ||
          (function () {
            var a = function (f, d) {
              a =
                Object.setPrototypeOf ||
                ({ __proto__: [] } instanceof Array &&
                  function (a, f) {
                    a.__proto__ = f;
                  }) ||
                function (a, f) {
                  for (var d in f) f.hasOwnProperty(d) && (a[d] = f[d]);
                };
              return a(f, d);
            };
            return function (f, d) {
              function b() {
                this.constructor = f;
              }
              a(f, d);
              f.prototype =
                null === d
                  ? Object.create(d)
                  : ((b.prototype = d.prototype), new b());
            };
          })(),
        t = b.isFirefox,
        A = b.isMS,
        C = b.isWebKit,
        z = b.win,
        q = v.css,
        l = v.defined,
        n = v.extend,
        d = v.pick,
        a = v.pInt;
      return (function (f) {
        function b() {
          return (null !== f && f.apply(this, arguments)) || this;
        }
        I(b, f);
        b.compose = function (a) {
          if (-1 === b.composedClasses.indexOf(a)) {
            b.composedClasses.push(a);
            var f = b.prototype,
              d = a.prototype;
            d.getSpanCorrection = f.getSpanCorrection;
            d.htmlCss = f.htmlCss;
            d.htmlGetBBox = f.htmlGetBBox;
            d.htmlUpdateTransform = f.htmlUpdateTransform;
            d.setSpanRotation = f.setSpanRotation;
          }
          return a;
        };
        b.prototype.getSpanCorrection = function (a, f, d) {
          this.xCorr = -a * d;
          this.yCorr = -f;
        };
        b.prototype.htmlCss = function (a) {
          var f = 'SPAN' === this.element.tagName && a && 'width' in a,
            b = d(f && a.width, void 0);
          if (f) {
            delete a.width;
            this.textWidth = b;
            var k = !0;
          }
          a &&
            'ellipsis' === a.textOverflow &&
            ((a.whiteSpace = 'nowrap'), (a.overflow = 'hidden'));
          this.styles = n(this.styles, a);
          q(this.element, a);
          k && this.htmlUpdateTransform();
          return this;
        };
        b.prototype.htmlGetBBox = function () {
          var a = this.element;
          return {
            x: a.offsetLeft,
            y: a.offsetTop,
            width: a.offsetWidth,
            height: a.offsetHeight,
          };
        };
        b.prototype.htmlUpdateTransform = function () {
          if (this.added) {
            var f = this.renderer,
              d = this.element,
              b = this.translateX || 0,
              k = this.translateY || 0,
              r = this.x || 0,
              m = this.y || 0,
              h = this.textAlign || 'left',
              p = { left: 0, center: 0.5, right: 1 }[h],
              c = this.styles;
            c = c && c.whiteSpace;
            q(d, { marginLeft: b, marginTop: k });
            !f.styledMode &&
              this.shadows &&
              this.shadows.forEach(function (c) {
                q(c, { marginLeft: b + 1, marginTop: k + 1 });
              });
            this.inverted &&
              [].forEach.call(d.childNodes, function (c) {
                f.invertChild(c, d);
              });
            if ('SPAN' === d.tagName) {
              var w = this.rotation,
                g = this.textWidth && a(this.textWidth),
                F = [w, h, d.innerHTML, this.textWidth, this.textAlign].join(),
                u = void 0;
              u = !1;
              if (g !== this.oldTextWidth) {
                if (this.textPxLength) var D = this.textPxLength;
                else
                  q(d, { width: '', whiteSpace: c || 'nowrap' }),
                    (D = d.offsetWidth);
                (g > this.oldTextWidth || D > g) &&
                  (/[ \-]/.test(d.textContent || d.innerText) ||
                    'ellipsis' === d.style.textOverflow) &&
                  (q(d, {
                    width: D > g || w ? g + 'px' : 'auto',
                    display: 'block',
                    whiteSpace: c || 'normal',
                  }),
                  (this.oldTextWidth = g),
                  (u = !0));
              }
              this.hasBoxWidthChanged = u;
              F !== this.cTT &&
                ((u = f.fontMetrics(d.style.fontSize, d).b),
                !l(w) ||
                  (w === (this.oldRotation || 0) && h === this.oldAlign) ||
                  this.setSpanRotation(w, p, u),
                this.getSpanCorrection(
                  (!l(w) && this.textPxLength) || d.offsetWidth,
                  u,
                  p,
                  w,
                  h
                ));
              q(d, {
                left: r + (this.xCorr || 0) + 'px',
                top: m + (this.yCorr || 0) + 'px',
              });
              this.cTT = F;
              this.oldRotation = w;
              this.oldAlign = h;
            }
          } else this.alignOnAdd = !0;
        };
        b.prototype.setSpanRotation = function (a, f, d) {
          var b = {},
            k =
              A && !/Edge/.test(z.navigator.userAgent)
                ? '-ms-transform'
                : C
                  ? '-webkit-transform'
                  : t
                    ? 'MozTransform'
                    : z.opera
                      ? '-o-transform'
                      : void 0;
          k &&
            ((b[k] = b.transform = 'rotate(' + a + 'deg)'),
            (b[k + (t ? 'Origin' : '-origin')] = b.transformOrigin =
              100 * f + '% ' + d + 'px'),
            q(this.element, b));
        };
        b.composedClasses = [];
        return b;
      })(e);
    }
  );
  J(
    e,
    'Core/Renderer/HTML/HTMLRenderer.js',
    [
      e['Core/Renderer/HTML/AST.js'],
      e['Core/Renderer/SVG/SVGElement.js'],
      e['Core/Renderer/SVG/SVGRenderer.js'],
      e['Core/Utilities.js'],
    ],
    function (b, e, v, E) {
      var t =
          (this && this.__extends) ||
          (function () {
            var b = function (l, d) {
              b =
                Object.setPrototypeOf ||
                ({ __proto__: [] } instanceof Array &&
                  function (a, f) {
                    a.__proto__ = f;
                  }) ||
                function (a, f) {
                  for (var d in f) f.hasOwnProperty(d) && (a[d] = f[d]);
                };
              return b(l, d);
            };
            return function (l, d) {
              function a() {
                this.constructor = l;
              }
              b(l, d);
              l.prototype =
                null === d
                  ? Object.create(d)
                  : ((a.prototype = d.prototype), new a());
            };
          })(),
        I = E.attr,
        C = E.createElement,
        z = E.extend,
        q = E.pick;
      return (function (l) {
        function n() {
          return (null !== l && l.apply(this, arguments)) || this;
        }
        t(n, l);
        n.compose = function (d) {
          -1 === n.composedClasses.indexOf(d) &&
            (n.composedClasses.push(d), (d.prototype.html = n.prototype.html));
          return d;
        };
        n.prototype.html = function (d, a, f) {
          var k = this.createElement('span'),
            l = k.element,
            y = k.renderer,
            n = y.isSVG,
            x = function (a, f) {
              ['opacity', 'visibility'].forEach(function (h) {
                a[h + 'Setter'] = function (d, c, b) {
                  var g = a.div ? a.div.style : f;
                  e.prototype[h + 'Setter'].call(this, d, c, b);
                  g && (g[c] = d);
                };
              });
              a.addedSetters = !0;
            };
          k.textSetter = function (a) {
            a !== this.textStr &&
              (delete this.bBox,
              delete this.oldTextWidth,
              b.setElementHTML(this.element, q(a, '')),
              (this.textStr = a),
              (k.doTransform = !0));
          };
          n && x(k, k.element.style);
          k.xSetter =
            k.ySetter =
            k.alignSetter =
            k.rotationSetter =
              function (a, f) {
                'align' === f ? (k.alignValue = k.textAlign = a) : (k[f] = a);
                k.doTransform = !0;
              };
          k.afterSetters = function () {
            this.doTransform &&
              (this.htmlUpdateTransform(), (this.doTransform = !1));
          };
          k.attr({ text: d, x: Math.round(a), y: Math.round(f) }).css({
            position: 'absolute',
          });
          y.styledMode ||
            k.css({
              fontFamily: this.style.fontFamily,
              fontSize: this.style.fontSize,
            });
          l.style.whiteSpace = 'nowrap';
          k.css = k.htmlCss;
          n &&
            (k.add = function (a) {
              var f = y.box.parentNode,
                h = [];
              if ((this.parentGroup = a)) {
                var d = a.div;
                if (!d) {
                  for (; a; ) h.push(a), (a = a.parentGroup);
                  h.reverse().forEach(function (c) {
                    function a(a, g) {
                      c[g] = a;
                      'translateX' === g
                        ? (u.left = a + 'px')
                        : (u.top = a + 'px');
                      c.doTransform = !0;
                    }
                    var g = I(c.element, 'class'),
                      b = c.styles || {};
                    d = c.div =
                      c.div ||
                      C(
                        'div',
                        g ? { className: g } : void 0,
                        {
                          position: 'absolute',
                          left: (c.translateX || 0) + 'px',
                          top: (c.translateY || 0) + 'px',
                          display: c.display,
                          opacity: c.opacity,
                          cursor: b.cursor,
                          pointerEvents: b.pointerEvents,
                          visibility: c.visibility,
                        },
                        d || f
                      );
                    var u = d.style;
                    z(c, {
                      classSetter: (function (c) {
                        return function (a) {
                          this.element.setAttribute('class', a);
                          c.className = a;
                        };
                      })(d),
                      on: function () {
                        h[0].div &&
                          k.on.apply(
                            { element: h[0].div, onEvents: c.onEvents },
                            arguments
                          );
                        return c;
                      },
                      translateXSetter: a,
                      translateYSetter: a,
                    });
                    c.addedSetters || x(c);
                  });
                }
              } else d = f;
              d.appendChild(l);
              k.added = !0;
              k.alignOnAdd && k.htmlUpdateTransform();
              return k;
            });
          return k;
        };
        n.composedClasses = [];
        return n;
      })(v);
    }
  );
  J(e, 'Core/Axis/AxisDefaults.js', [], function () {
    var b;
    (function (b) {
      b.defaultXAxisOptions = {
        alignTicks: !0,
        allowDecimals: void 0,
        panningEnabled: !0,
        zIndex: 2,
        zoomEnabled: !0,
        dateTimeLabelFormats: {
          millisecond: { main: '%H:%M:%S.%L', range: !1 },
          second: { main: '%H:%M:%S', range: !1 },
          minute: { main: '%H:%M', range: !1 },
          hour: { main: '%H:%M', range: !1 },
          day: { main: '%e. %b' },
          week: { main: '%e. %b' },
          month: { main: "%b '%y" },
          year: { main: '%Y' },
        },
        endOnTick: !1,
        gridLineDashStyle: 'Solid',
        gridZIndex: 1,
        labels: {
          autoRotation: void 0,
          autoRotationLimit: 80,
          distance: void 0,
          enabled: !0,
          indentation: 10,
          overflow: 'justify',
          padding: 5,
          reserveSpace: void 0,
          rotation: void 0,
          staggerLines: 0,
          step: 0,
          useHTML: !1,
          x: 0,
          zIndex: 7,
          style: { color: '#666666', cursor: 'default', fontSize: '11px' },
        },
        maxPadding: 0.01,
        minorGridLineDashStyle: 'Solid',
        minorTickLength: 2,
        minorTickPosition: 'outside',
        minPadding: 0.01,
        offset: void 0,
        opposite: !1,
        reversed: void 0,
        reversedStacks: !1,
        showEmpty: !0,
        showFirstLabel: !0,
        showLastLabel: !0,
        startOfWeek: 1,
        startOnTick: !1,
        tickLength: 10,
        tickPixelInterval: 100,
        tickmarkPlacement: 'between',
        tickPosition: 'outside',
        title: {
          align: 'middle',
          rotation: 0,
          useHTML: !1,
          x: 0,
          y: 0,
          style: { color: '#666666' },
        },
        type: 'linear',
        uniqueNames: !0,
        visible: !0,
        minorGridLineColor: '#f2f2f2',
        minorGridLineWidth: 1,
        minorTickColor: '#999999',
        lineColor: '#ccd6eb',
        lineWidth: 1,
        gridLineColor: '#e6e6e6',
        gridLineWidth: void 0,
        tickColor: '#ccd6eb',
      };
      b.defaultYAxisOptions = {
        reversedStacks: !0,
        endOnTick: !0,
        maxPadding: 0.05,
        minPadding: 0.05,
        tickPixelInterval: 72,
        showLastLabel: !0,
        labels: { x: -8 },
        startOnTick: !0,
        title: { rotation: 270, text: 'Values' },
        stackLabels: {
          animation: {},
          allowOverlap: !1,
          enabled: !1,
          crop: !0,
          overflow: 'justify',
          formatter: function () {
            var b = this.axis.chart.numberFormatter;
            return b(this.total, -1);
          },
          style: {
            color: '#000000',
            fontSize: '11px',
            fontWeight: 'bold',
            textOutline: '1px contrast',
          },
        },
        gridLineWidth: 1,
        lineWidth: 0,
      };
      b.defaultLeftAxisOptions = {
        labels: { x: -15 },
        title: { rotation: 270 },
      };
      b.defaultRightAxisOptions = {
        labels: { x: 15 },
        title: { rotation: 90 },
      };
      b.defaultBottomAxisOptions = {
        labels: { autoRotation: [-45], x: 0 },
        margin: 15,
        title: { rotation: 0 },
      };
      b.defaultTopAxisOptions = {
        labels: { autoRotation: [-45], x: 0 },
        margin: 15,
        title: { rotation: 0 },
      };
    })(b || (b = {}));
    return b;
  });
  J(e, 'Core/Foundation.js', [e['Core/Utilities.js']], function (b) {
    var e = b.addEvent,
      v = b.isFunction,
      E = b.objectEach,
      t = b.removeEvent,
      A;
    (function (b) {
      b.registerEventOptions = function (b, q) {
        b.eventOptions = b.eventOptions || {};
        E(q.events, function (l, n) {
          b.eventOptions[n] !== l &&
            (b.eventOptions[n] &&
              (t(b, n, b.eventOptions[n]), delete b.eventOptions[n]),
            v(l) && ((b.eventOptions[n] = l), e(b, n, l)));
        });
      };
    })(A || (A = {}));
    return A;
  });
  J(
    e,
    'Core/Axis/Tick.js',
    [
      e['Core/FormatUtilities.js'],
      e['Core/Globals.js'],
      e['Core/Utilities.js'],
    ],
    function (b, e, v) {
      var I = e.deg2rad,
        t = v.clamp,
        A = v.correctFloat,
        C = v.defined,
        z = v.destroyObjectProperties,
        q = v.extend,
        l = v.fireEvent,
        n = v.isNumber,
        d = v.merge,
        a = v.objectEach,
        f = v.pick;
      e = (function () {
        function k(a, f, d, b, k) {
          this.isNewLabel = this.isNew = !0;
          this.axis = a;
          this.pos = f;
          this.type = d || '';
          this.parameters = k || {};
          this.tickmarkOffset = this.parameters.tickmarkOffset;
          this.options = this.parameters.options;
          l(this, 'init');
          d || b || this.addLabel();
        }
        k.prototype.addLabel = function () {
          var a = this,
            d = a.axis,
            k = d.options,
            x = d.chart,
            r = d.categories,
            m = d.logarithmic,
            h = d.names,
            p = a.pos,
            c = f(a.options && a.options.labels, k.labels),
            w = d.tickPositions,
            g = p === w[0],
            F = p === w[w.length - 1],
            u = (!c.step || 1 === c.step) && 1 === d.tickInterval;
          w = w.info;
          var D = a.label,
            H;
          r = this.parameters.category || (r ? f(r[p], h[p], p) : p);
          m && n(r) && (r = A(m.lin2log(r)));
          if (d.dateTime)
            if (w) {
              var e = x.time.resolveDTLFormat(
                k.dateTimeLabelFormats[
                  (!k.grid && w.higherRanks[p]) || w.unitName
                ]
              );
              var P = e.main;
            } else
              n(r) &&
                (P = d.dateTime.getXDateFormat(
                  r,
                  k.dateTimeLabelFormats || {}
                ));
          a.isFirst = g;
          a.isLast = F;
          var K = {
            axis: d,
            chart: x,
            dateTimeLabelFormat: P,
            isFirst: g,
            isLast: F,
            pos: p,
            tick: a,
            tickPositionInfo: w,
            value: r,
          };
          l(this, 'labelFormat', K);
          var t = function (a) {
            return c.formatter
              ? c.formatter.call(a, a)
              : c.format
                ? ((a.text = d.defaultLabelFormatter.call(a)),
                  b.format(c.format, a, x))
                : d.defaultLabelFormatter.call(a, a);
          };
          k = t.call(K, K);
          var z = e && e.list;
          a.shortenLabel = z
            ? function () {
                for (H = 0; H < z.length; H++)
                  if (
                    (q(K, { dateTimeLabelFormat: z[H] }),
                    D.attr({ text: t.call(K, K) }),
                    D.getBBox().width < d.getSlotWidth(a) - 2 * c.padding)
                  )
                    return;
                D.attr({ text: '' });
              }
            : void 0;
          u && d._addedPlotLB && a.moveLabel(k, c);
          C(D) || a.movedLabel
            ? D &&
              D.textStr !== k &&
              !u &&
              (!D.textWidth ||
                c.style.width ||
                D.styles.width ||
                D.css({ width: null }),
              D.attr({ text: k }),
              (D.textPxLength = D.getBBox().width))
            : ((a.label = D = a.createLabel({ x: 0, y: 0 }, k, c)),
              (a.rotation = 0));
        };
        k.prototype.createLabel = function (a, f, b) {
          var k = this.axis,
            r = k.chart;
          if (
            (a =
              C(f) && b.enabled
                ? r.renderer.text(f, a.x, a.y, b.useHTML).add(k.labelGroup)
                : null)
          )
            r.styledMode || a.css(d(b.style)),
              (a.textPxLength = a.getBBox().width);
          return a;
        };
        k.prototype.destroy = function () {
          z(this, this.axis);
        };
        k.prototype.getPosition = function (a, f, d, b) {
          var k = this.axis,
            m = k.chart,
            h = (b && m.oldChartHeight) || m.chartHeight;
          a = {
            x: a
              ? A(k.translate(f + d, null, null, b) + k.transB)
              : k.left +
                k.offset +
                (k.opposite
                  ? ((b && m.oldChartWidth) || m.chartWidth) - k.right - k.left
                  : 0),
            y: a
              ? h - k.bottom + k.offset - (k.opposite ? k.height : 0)
              : A(h - k.translate(f + d, null, null, b) - k.transB),
          };
          a.y = t(a.y, -1e5, 1e5);
          l(this, 'afterGetPosition', { pos: a });
          return a;
        };
        k.prototype.getLabelPosition = function (a, f, d, b, k, m, h, p) {
          var c = this.axis,
            w = c.transA,
            g =
              c.isLinked && c.linkedParent
                ? c.linkedParent.reversed
                : c.reversed,
            F = c.staggerLines,
            u = c.tickRotCorr || { x: 0, y: 0 },
            D =
              b || c.reserveSpaceDefault
                ? 0
                : -c.labelOffset * ('center' === c.labelAlign ? 0.5 : 1),
            r = {},
            e = k.y;
          C(e) ||
            (e =
              0 === c.side
                ? d.rotation
                  ? -8
                  : -d.getBBox().height
                : 2 === c.side
                  ? u.y + 8
                  : Math.cos(d.rotation * I) *
                    (u.y - d.getBBox(!1, 0).height / 2));
          a = a + k.x + D + u.x - (m && b ? m * w * (g ? -1 : 1) : 0);
          f = f + e - (m && !b ? m * w * (g ? 1 : -1) : 0);
          F &&
            ((d = (h / (p || 1)) % F),
            c.opposite && (d = F - d - 1),
            (f += (c.labelOffset / F) * d));
          r.x = a;
          r.y = Math.round(f);
          l(this, 'afterGetLabelPosition', {
            pos: r,
            tickmarkOffset: m,
            index: h,
          });
          return r;
        };
        k.prototype.getLabelSize = function () {
          return this.label
            ? this.label.getBBox()[this.axis.horiz ? 'height' : 'width']
            : 0;
        };
        k.prototype.getMarkPath = function (a, f, d, b, k, m) {
          return m.crispLine(
            [
              ['M', a, f],
              ['L', a + (k ? 0 : -d), f + (k ? d : 0)],
            ],
            b
          );
        };
        k.prototype.handleOverflow = function (a) {
          var d = this.axis,
            b = d.options.labels,
            k = a.x,
            r = d.chart.chartWidth,
            m = d.chart.spacing,
            h = f(d.labelLeft, Math.min(d.pos, m[3]));
          m = f(
            d.labelRight,
            Math.max(d.isRadial ? 0 : d.pos + d.len, r - m[1])
          );
          var p = this.label,
            c = this.rotation,
            w = { left: 0, center: 0.5, right: 1 }[
              d.labelAlign || p.attr('align')
            ],
            g = p.getBBox().width,
            F = d.getSlotWidth(this),
            u = {},
            D = F,
            l = 1,
            e;
          if (c || 'justify' !== b.overflow)
            0 > c && k - w * g < h
              ? (e = Math.round(k / Math.cos(c * I) - h))
              : 0 < c &&
                k + w * g > m &&
                (e = Math.round((r - k) / Math.cos(c * I)));
          else if (
            ((r = k + (1 - w) * g),
            k - w * g < h
              ? (D = a.x + D * (1 - w) - h)
              : r > m && ((D = m - a.x + D * w), (l = -1)),
            (D = Math.min(F, D)),
            D < F &&
              'center' === d.labelAlign &&
              (a.x += l * (F - D - w * (F - Math.min(g, D)))),
            g > D || (d.autoRotation && (p.styles || {}).width))
          )
            e = D;
          e &&
            (this.shortenLabel
              ? this.shortenLabel()
              : ((u.width = Math.floor(e) + 'px'),
                (b.style || {}).textOverflow || (u.textOverflow = 'ellipsis'),
                p.css(u)));
        };
        k.prototype.moveLabel = function (d, f) {
          var b = this,
            k = b.label,
            r = b.axis,
            m = r.reversed,
            h = !1;
          k && k.textStr === d
            ? ((b.movedLabel = k), (h = !0), delete b.label)
            : a(r.ticks, function (c) {
                h ||
                  c.isNew ||
                  c === b ||
                  !c.label ||
                  c.label.textStr !== d ||
                  ((b.movedLabel = c.label),
                  (h = !0),
                  (c.labelPos = b.movedLabel.xy),
                  delete c.label);
              });
          if (!h && (b.labelPos || k)) {
            var p = b.labelPos || k.xy;
            k = r.horiz ? (m ? 0 : r.width + r.left) : p.x;
            r = r.horiz ? p.y : m ? r.width + r.left : 0;
            b.movedLabel = b.createLabel({ x: k, y: r }, d, f);
            b.movedLabel && b.movedLabel.attr({ opacity: 0 });
          }
        };
        k.prototype.render = function (a, d, b) {
          var k = this.axis,
            r = k.horiz,
            m = this.pos,
            h = f(this.tickmarkOffset, k.tickmarkOffset);
          m = this.getPosition(r, m, h, d);
          h = m.x;
          var p = m.y;
          k = (r && h === k.pos + k.len) || (!r && p === k.pos) ? -1 : 1;
          r = f(b, this.label && this.label.newOpacity, 1);
          b = f(b, 1);
          this.isActive = !0;
          this.renderGridLine(d, b, k);
          this.renderMark(m, b, k);
          this.renderLabel(m, d, r, a);
          this.isNew = !1;
          l(this, 'afterRender');
        };
        k.prototype.renderGridLine = function (a, d, b) {
          var k = this.axis,
            r = k.options,
            m = {},
            h = this.pos,
            p = this.type,
            c = f(this.tickmarkOffset, k.tickmarkOffset),
            w = k.chart.renderer,
            g = this.gridLine,
            F = r.gridLineWidth,
            u = r.gridLineColor,
            D = r.gridLineDashStyle;
          'minor' === this.type &&
            ((F = r.minorGridLineWidth),
            (u = r.minorGridLineColor),
            (D = r.minorGridLineDashStyle));
          g ||
            (k.chart.styledMode ||
              ((m.stroke = u), (m['stroke-width'] = F || 0), (m.dashstyle = D)),
            p || (m.zIndex = 1),
            a && (d = 0),
            (this.gridLine = g =
              w
                .path()
                .attr(m)
                .addClass('highcharts-' + (p ? p + '-' : '') + 'grid-line')
                .add(k.gridGroup)));
          if (
            g &&
            (b = k.getPlotLinePath({
              value: h + c,
              lineWidth: g.strokeWidth() * b,
              force: 'pass',
              old: a,
            }))
          )
            g[a || this.isNew ? 'attr' : 'animate']({ d: b, opacity: d });
        };
        k.prototype.renderMark = function (a, d, b) {
          var k = this.axis,
            r = k.options,
            m = k.chart.renderer,
            h = this.type,
            p = k.tickSize(h ? h + 'Tick' : 'tick'),
            c = a.x;
          a = a.y;
          var w = f(
            r['minor' !== h ? 'tickWidth' : 'minorTickWidth'],
            !h && k.isXAxis ? 1 : 0
          );
          r = r['minor' !== h ? 'tickColor' : 'minorTickColor'];
          var g = this.mark,
            F = !g;
          p &&
            (k.opposite && (p[0] = -p[0]),
            g ||
              ((this.mark = g =
                m
                  .path()
                  .addClass('highcharts-' + (h ? h + '-' : '') + 'tick')
                  .add(k.axisGroup)),
              k.chart.styledMode || g.attr({ stroke: r, 'stroke-width': w })),
            g[F ? 'attr' : 'animate']({
              d: this.getMarkPath(c, a, p[0], g.strokeWidth() * b, k.horiz, m),
              opacity: d,
            }));
        };
        k.prototype.renderLabel = function (a, d, b, k) {
          var r = this.axis,
            m = r.horiz,
            h = r.options,
            p = this.label,
            c = h.labels,
            w = c.step;
          r = f(this.tickmarkOffset, r.tickmarkOffset);
          var g = a.x;
          a = a.y;
          var F = !0;
          p &&
            n(g) &&
            ((p.xy = a = this.getLabelPosition(g, a, p, m, c, r, k, w)),
            (this.isFirst && !this.isLast && !h.showFirstLabel) ||
            (this.isLast && !this.isFirst && !h.showLastLabel)
              ? (F = !1)
              : !m ||
                c.step ||
                c.rotation ||
                d ||
                0 === b ||
                this.handleOverflow(a),
            w && k % w && (F = !1),
            F && n(a.y)
              ? ((a.opacity = b),
                p[this.isNewLabel ? 'attr' : 'animate'](a),
                (this.isNewLabel = !1))
              : (p.attr('y', -9999), (this.isNewLabel = !0)));
        };
        k.prototype.replaceMovedLabel = function () {
          var a = this.label,
            d = this.axis,
            f = d.reversed;
          if (a && !this.isNew) {
            var b = d.horiz ? (f ? d.left : d.width + d.left) : a.xy.x;
            f = d.horiz ? a.xy.y : f ? d.width + d.top : d.top;
            a.animate({ x: b, y: f, opacity: 0 }, void 0, a.destroy);
            delete this.label;
          }
          d.isDirty = !0;
          this.label = this.movedLabel;
          delete this.movedLabel;
        };
        return k;
      })();
      ('');
      return e;
    }
  );
  J(
    e,
    'Core/Axis/Axis.js',
    [
      e['Core/Animation/AnimationUtilities.js'],
      e['Core/Axis/AxisDefaults.js'],
      e['Core/Color/Color.js'],
      e['Core/DefaultOptions.js'],
      e['Core/Foundation.js'],
      e['Core/Globals.js'],
      e['Core/Axis/Tick.js'],
      e['Core/Utilities.js'],
    ],
    function (b, e, v, E, t, A, C, z) {
      var q = b.animObject,
        l = E.defaultOptions,
        n = t.registerEventOptions,
        d = A.deg2rad,
        a = z.arrayMax,
        f = z.arrayMin,
        k = z.clamp,
        G = z.correctFloat,
        y = z.defined,
        B = z.destroyObjectProperties,
        x = z.erase,
        r = z.error,
        m = z.extend,
        h = z.fireEvent,
        p = z.getMagnitude,
        c = z.isArray,
        w = z.isNumber,
        g = z.isString,
        F = z.merge,
        u = z.normalizeTickInterval,
        D = z.objectEach,
        H = z.pick,
        L = z.relativeLength,
        P = z.removeEvent,
        K = z.splat,
        S = z.syncTimeout;
      b = (function () {
        function b(c, a) {
          this.zoomEnabled =
            this.width =
            this.visible =
            this.userOptions =
            this.translationSlope =
            this.transB =
            this.transA =
            this.top =
            this.ticks =
            this.tickRotCorr =
            this.tickPositions =
            this.tickmarkOffset =
            this.tickInterval =
            this.tickAmount =
            this.side =
            this.series =
            this.right =
            this.positiveValuesOnly =
            this.pos =
            this.pointRangePadding =
            this.pointRange =
            this.plotLinesAndBandsGroups =
            this.plotLinesAndBands =
            this.paddedTicks =
            this.overlap =
            this.options =
            this.offset =
            this.names =
            this.minPixelPadding =
            this.minorTicks =
            this.minorTickInterval =
            this.min =
            this.maxLabelLength =
            this.max =
            this.len =
            this.left =
            this.labelFormatter =
            this.labelEdge =
            this.isLinked =
            this.height =
            this.hasVisibleSeries =
            this.hasNames =
            this.eventOptions =
            this.coll =
            this.closestPointRange =
            this.chart =
            this.bottom =
            this.alternateBands =
              void 0;
          this.init(c, a);
        }
        b.prototype.init = function (c, a) {
          var g = a.isX;
          this.chart = c;
          this.horiz = c.inverted && !this.isZAxis ? !g : g;
          this.isXAxis = g;
          this.coll = this.coll || (g ? 'xAxis' : 'yAxis');
          h(this, 'init', { userOptions: a });
          this.opposite = H(a.opposite, this.opposite);
          this.side = H(
            a.side,
            this.side,
            this.horiz ? (this.opposite ? 0 : 2) : this.opposite ? 1 : 3
          );
          this.setOptions(a);
          var d = this.options,
            f = d.labels,
            b = d.type;
          this.userOptions = a;
          this.minPixelPadding = 0;
          this.reversed = H(d.reversed, this.reversed);
          this.visible = d.visible;
          this.zoomEnabled = d.zoomEnabled;
          this.hasNames = 'category' === b || !0 === d.categories;
          this.categories = d.categories || (this.hasNames ? [] : void 0);
          this.names || ((this.names = []), (this.names.keys = {}));
          this.plotLinesAndBandsGroups = {};
          this.positiveValuesOnly = !!this.logarithmic;
          this.isLinked = y(d.linkedTo);
          this.ticks = {};
          this.labelEdge = [];
          this.minorTicks = {};
          this.plotLinesAndBands = [];
          this.alternateBands = {};
          this.len = 0;
          this.minRange = this.userMinRange = d.minRange || d.maxZoom;
          this.range = d.range;
          this.offset = d.offset || 0;
          this.min = this.max = null;
          a = H(d.crosshair, K(c.options.tooltip.crosshairs)[g ? 0 : 1]);
          this.crosshair = !0 === a ? {} : a;
          -1 === c.axes.indexOf(this) &&
            (g ? c.axes.splice(c.xAxis.length, 0, this) : c.axes.push(this),
            c[this.coll].push(this));
          this.series = this.series || [];
          c.inverted &&
            !this.isZAxis &&
            g &&
            'undefined' === typeof this.reversed &&
            (this.reversed = !0);
          this.labelRotation = w(f.rotation) ? f.rotation : void 0;
          n(this, d);
          h(this, 'afterInit');
        };
        b.prototype.setOptions = function (c) {
          this.options = F(
            e.defaultXAxisOptions,
            'yAxis' === this.coll && e.defaultYAxisOptions,
            [
              e.defaultTopAxisOptions,
              e.defaultRightAxisOptions,
              e.defaultBottomAxisOptions,
              e.defaultLeftAxisOptions,
            ][this.side],
            F(l[this.coll], c)
          );
          h(this, 'afterSetOptions', { userOptions: c });
        };
        b.prototype.defaultLabelFormatter = function (c) {
          var a = this.axis;
          c = this.chart.numberFormatter;
          var g = w(this.value) ? this.value : NaN,
            h = a.chart.time,
            d = this.dateTimeLabelFormat,
            f = l.lang,
            b = f.numericSymbols;
          f = f.numericSymbolMagnitude || 1e3;
          var u = a.logarithmic ? Math.abs(g) : a.tickInterval,
            p = b && b.length;
          if (a.categories) var m = '' + this.value;
          else if (d) m = h.dateFormat(d, g);
          else if (p && 1e3 <= u)
            for (; p-- && 'undefined' === typeof m; )
              (a = Math.pow(f, p + 1)),
                u >= a &&
                  0 === (10 * g) % a &&
                  null !== b[p] &&
                  0 !== g &&
                  (m = c(g / a, -1) + b[p]);
          'undefined' === typeof m &&
            (m = 1e4 <= Math.abs(g) ? c(g, -1) : c(g, -1, void 0, ''));
          return m;
        };
        b.prototype.getSeriesExtremes = function () {
          var c = this,
            a = c.chart,
            g;
          h(this, 'getSeriesExtremes', null, function () {
            c.hasVisibleSeries = !1;
            c.dataMin = c.dataMax = c.threshold = null;
            c.softThreshold = !c.isXAxis;
            c.stacking && c.stacking.buildStacks();
            c.series.forEach(function (h) {
              if (h.visible || !a.options.chart.ignoreHiddenSeries) {
                var d = h.options,
                  f = d.threshold;
                c.hasVisibleSeries = !0;
                c.positiveValuesOnly && 0 >= f && (f = null);
                if (c.isXAxis) {
                  if (((d = h.xData), d.length)) {
                    d = c.logarithmic ? d.filter(c.validatePositiveValue) : d;
                    g = h.getXExtremes(d);
                    var b = g.min;
                    var u = g.max;
                    w(b) ||
                      b instanceof Date ||
                      ((d = d.filter(w)),
                      (g = h.getXExtremes(d)),
                      (b = g.min),
                      (u = g.max));
                    d.length &&
                      ((c.dataMin = Math.min(H(c.dataMin, b), b)),
                      (c.dataMax = Math.max(H(c.dataMax, u), u)));
                  }
                } else if (
                  ((h = h.applyExtremes()),
                  w(h.dataMin) &&
                    ((b = h.dataMin),
                    (c.dataMin = Math.min(H(c.dataMin, b), b))),
                  w(h.dataMax) &&
                    ((u = h.dataMax),
                    (c.dataMax = Math.max(H(c.dataMax, u), u))),
                  y(f) && (c.threshold = f),
                  !d.softThreshold || c.positiveValuesOnly)
                )
                  c.softThreshold = !1;
              }
            });
          });
          h(this, 'afterGetSeriesExtremes');
        };
        b.prototype.translate = function (c, a, g, h, d, f) {
          var b = this.linkedParent || this,
            u = h && b.old ? b.old.min : b.min,
            p = b.minPixelPadding;
          d =
            (b.isOrdinal ||
              (b.brokenAxis && b.brokenAxis.hasBreaks) ||
              (b.logarithmic && d)) &&
            b.lin2val;
          var m = 1,
            k = 0;
          h = h && b.old ? b.old.transA : b.transA;
          h || (h = b.transA);
          g && ((m *= -1), (k = b.len));
          b.reversed && ((m *= -1), (k -= m * (b.sector || b.len)));
          a
            ? ((f = (c * m + k - p) / h + u), d && (f = b.lin2val(f)))
            : (d && (c = b.val2lin(c)),
              (c = m * (c - u) * h),
              (f = w(u)
                ? (b.isRadial ? c : G(c)) + k + m * p + (w(f) ? h * f : 0)
                : void 0));
          return f;
        };
        b.prototype.toPixels = function (c, a) {
          return (
            this.translate(c, !1, !this.horiz, null, !0) + (a ? 0 : this.pos)
          );
        };
        b.prototype.toValue = function (c, a) {
          return this.translate(
            c - (a ? 0 : this.pos),
            !0,
            !this.horiz,
            null,
            !0
          );
        };
        b.prototype.getPlotLinePath = function (c) {
          function a(c, a, g) {
            if (('pass' !== l && c < a) || c > g)
              l ? (c = k(c, a, g)) : (L = !0);
            return c;
          }
          var g = this,
            d = g.chart,
            f = g.left,
            b = g.top,
            u = c.old,
            p = c.value,
            m = c.lineWidth,
            D = (u && d.oldChartHeight) || d.chartHeight,
            F = (u && d.oldChartWidth) || d.chartWidth,
            r = g.transB,
            e = c.translatedValue,
            l = c.force,
            n,
            y,
            x,
            B,
            L;
          c = {
            value: p,
            lineWidth: m,
            old: u,
            force: l,
            acrossPanes: c.acrossPanes,
            translatedValue: e,
          };
          h(this, 'getPlotLinePath', c, function (c) {
            e = H(e, g.translate(p, null, null, u));
            e = k(e, -1e5, 1e5);
            n = x = Math.round(e + r);
            y = B = Math.round(D - e - r);
            w(e)
              ? g.horiz
                ? ((y = b), (B = D - g.bottom), (n = x = a(n, f, f + g.width)))
                : ((n = f), (x = F - g.right), (y = B = a(y, b, b + g.height)))
              : ((L = !0), (l = !1));
            c.path =
              L && !l
                ? null
                : d.renderer.crispLine(
                    [
                      ['M', n, y],
                      ['L', x, B],
                    ],
                    m || 1
                  );
          });
          return c.path;
        };
        b.prototype.getLinearTickPositions = function (c, a, g) {
          var h = G(Math.floor(a / c) * c);
          g = G(Math.ceil(g / c) * c);
          var d = [],
            f;
          G(h + c) === h && (f = 20);
          if (this.single) return [a];
          for (a = h; a <= g; ) {
            d.push(a);
            a = G(a + c, f);
            if (a === b) break;
            var b = a;
          }
          return d;
        };
        b.prototype.getMinorTickInterval = function () {
          var c = this.options;
          return !0 === c.minorTicks
            ? H(c.minorTickInterval, 'auto')
            : !1 === c.minorTicks
              ? null
              : c.minorTickInterval;
        };
        b.prototype.getMinorTickPositions = function () {
          var c = this.options,
            a = this.tickPositions,
            g = this.minorTickInterval,
            h = this.pointRangePadding || 0,
            d = this.min - h;
          h = this.max + h;
          var f = h - d,
            b = [];
          if (f && f / g < this.len / 3) {
            var u = this.logarithmic;
            if (u)
              this.paddedTicks.forEach(function (c, a, h) {
                a &&
                  b.push.apply(b, u.getLogTickPositions(g, h[a - 1], h[a], !0));
              });
            else if (this.dateTime && 'auto' === this.getMinorTickInterval())
              b = b.concat(
                this.getTimeTicks(
                  this.dateTime.normalizeTimeTickInterval(g),
                  d,
                  h,
                  c.startOfWeek
                )
              );
            else
              for (c = d + ((a[0] - d) % g); c <= h && c !== b[0]; c += g)
                b.push(c);
          }
          0 !== b.length && this.trimTicks(b);
          return b;
        };
        b.prototype.adjustForMinRange = function () {
          var c = this.options,
            g = this.logarithmic,
            h = this.min,
            d = this.max,
            b = 0,
            u,
            p,
            m,
            k;
          this.isXAxis &&
            'undefined' === typeof this.minRange &&
            !g &&
            (y(c.min) || y(c.max) || y(c.floor) || y(c.ceiling)
              ? (this.minRange = null)
              : (this.series.forEach(function (c) {
                  m = c.xData;
                  k = c.xIncrement ? 1 : m.length - 1;
                  if (1 < m.length)
                    for (u = k; 0 < u; u--)
                      if (((p = m[u] - m[u - 1]), !b || p < b)) b = p;
                }),
                (this.minRange = Math.min(
                  5 * b,
                  this.dataMax - this.dataMin
                ))));
          if (d - h < this.minRange) {
            var w = this.dataMax - this.dataMin >= this.minRange;
            var D = this.minRange;
            var F = (D - d + h) / 2;
            F = [h - F, H(c.min, h - F)];
            w &&
              (F[2] = this.logarithmic
                ? this.logarithmic.log2lin(this.dataMin)
                : this.dataMin);
            h = a(F);
            d = [h + D, H(c.max, h + D)];
            w && (d[2] = g ? g.log2lin(this.dataMax) : this.dataMax);
            d = f(d);
            d - h < D && ((F[0] = d - D), (F[1] = H(c.min, d - D)), (h = a(F)));
          }
          this.min = h;
          this.max = d;
        };
        b.prototype.getClosest = function () {
          var c;
          this.categories
            ? (c = 1)
            : this.series.forEach(function (a) {
                var g = a.closestPointRange,
                  h = a.visible || !a.chart.options.chart.ignoreHiddenSeries;
                !a.noSharedTooltip &&
                  y(g) &&
                  h &&
                  (c = y(c) ? Math.min(c, g) : g);
              });
          return c;
        };
        b.prototype.nameToX = function (a) {
          var g = c(this.options.categories),
            h = g ? this.categories : this.names,
            d = a.options.x;
          a.series.requireSorting = !1;
          y(d) ||
            (d =
              this.options.uniqueNames && h
                ? g
                  ? h.indexOf(a.name)
                  : H(h.keys[a.name], -1)
                : a.series.autoIncrement());
          if (-1 === d) {
            if (!g && h) var f = h.length;
          } else f = d;
          'undefined' !== typeof f &&
            ((this.names[f] = a.name), (this.names.keys[a.name] = f));
          return f;
        };
        b.prototype.updateNames = function () {
          var c = this,
            a = this.names;
          0 < a.length &&
            (Object.keys(a.keys).forEach(function (c) {
              delete a.keys[c];
            }),
            (a.length = 0),
            (this.minRange = this.userMinRange),
            (this.series || []).forEach(function (a) {
              a.xIncrement = null;
              if (!a.points || a.isDirtyData)
                (c.max = Math.max(c.max, a.xData.length - 1)),
                  a.processData(),
                  a.generatePoints();
              a.data.forEach(function (g, h) {
                if (g && g.options && 'undefined' !== typeof g.name) {
                  var d = c.nameToX(g);
                  'undefined' !== typeof d &&
                    d !== g.x &&
                    ((g.x = d), (a.xData[h] = d));
                }
              });
            }));
        };
        b.prototype.setAxisTranslation = function () {
          var c = this,
            a = c.max - c.min,
            d = c.linkedParent,
            f = !!c.categories,
            b = c.isXAxis,
            u = c.axisPointRange || 0,
            m = 0,
            p = 0,
            k = c.transA;
          if (b || f || u) {
            var w = c.getClosest();
            d
              ? ((m = d.minPointOffset), (p = d.pointRangePadding))
              : c.series.forEach(function (a) {
                  var h = f
                      ? 1
                      : b
                        ? H(a.options.pointRange, w, 0)
                        : c.axisPointRange || 0,
                    d = a.options.pointPlacement;
                  u = Math.max(u, h);
                  if (!c.single || f)
                    (a = a.is('xrange') ? !b : b),
                      (m = Math.max(m, a && g(d) ? 0 : h / 2)),
                      (p = Math.max(p, a && 'on' === d ? 0 : h));
                });
            d = c.ordinal && c.ordinal.slope && w ? c.ordinal.slope / w : 1;
            c.minPointOffset = m *= d;
            c.pointRangePadding = p *= d;
            c.pointRange = Math.min(u, c.single && f ? 1 : a);
            b && (c.closestPointRange = w);
          }
          c.translationSlope =
            c.transA =
            k =
              c.staticScale || c.len / (a + p || 1);
          c.transB = c.horiz ? c.left : c.bottom;
          c.minPixelPadding = k * m;
          h(this, 'afterSetAxisTranslation');
        };
        b.prototype.minFromRange = function () {
          return this.max - this.range;
        };
        b.prototype.setTickInterval = function (c) {
          var a = this.chart,
            g = this.logarithmic,
            d = this.options,
            f = this.isXAxis,
            b = this.isLinked,
            m = d.tickPixelInterval,
            k = this.categories,
            D = this.softThreshold,
            F = d.maxPadding,
            e = d.minPadding,
            l =
              w(d.tickInterval) && 0 <= d.tickInterval
                ? d.tickInterval
                : void 0,
            n = w(this.threshold) ? this.threshold : null;
          this.dateTime || k || b || this.getTickAmount();
          var x = H(this.userMin, d.min);
          var B = H(this.userMax, d.max);
          if (b) {
            this.linkedParent = a[this.coll][d.linkedTo];
            var L = this.linkedParent.getExtremes();
            this.min = H(L.min, L.dataMin);
            this.max = H(L.max, L.dataMax);
            d.type !== this.linkedParent.options.type && r(11, 1, a);
          } else {
            if (D && y(n))
              if (this.dataMin >= n) (L = n), (e = 0);
              else if (this.dataMax <= n) {
                var q = n;
                F = 0;
              }
            this.min = H(x, L, this.dataMin);
            this.max = H(B, q, this.dataMax);
          }
          g &&
            (this.positiveValuesOnly &&
              !c &&
              0 >= Math.min(this.min, H(this.dataMin, this.min)) &&
              r(10, 1, a),
            (this.min = G(g.log2lin(this.min), 16)),
            (this.max = G(g.log2lin(this.max), 16)));
          this.range &&
            y(this.max) &&
            ((this.userMin =
              this.min =
              x =
                Math.max(this.dataMin, this.minFromRange())),
            (this.userMax = B = this.max),
            (this.range = null));
          h(this, 'foundExtremes');
          this.beforePadding && this.beforePadding();
          this.adjustForMinRange();
          !(
            k ||
            this.axisPointRange ||
            (this.stacking && this.stacking.usePercentage) ||
            b
          ) &&
            y(this.min) &&
            y(this.max) &&
            (a = this.max - this.min) &&
            (!y(x) && e && (this.min -= a * e),
            !y(B) && F && (this.max += a * F));
          w(this.userMin) ||
            (w(d.softMin) && d.softMin < this.min && (this.min = x = d.softMin),
            w(d.floor) && (this.min = Math.max(this.min, d.floor)));
          w(this.userMax) ||
            (w(d.softMax) && d.softMax > this.max && (this.max = B = d.softMax),
            w(d.ceiling) && (this.max = Math.min(this.max, d.ceiling)));
          D &&
            y(this.dataMin) &&
            ((n = n || 0),
            !y(x) && this.min < n && this.dataMin >= n
              ? (this.min = this.options.minRange
                  ? Math.min(n, this.max - this.minRange)
                  : n)
              : !y(B) &&
                this.max > n &&
                this.dataMax <= n &&
                (this.max = this.options.minRange
                  ? Math.max(n, this.min + this.minRange)
                  : n));
          w(this.min) &&
            w(this.max) &&
            !this.chart.polar &&
            this.min > this.max &&
            (y(this.options.min)
              ? (this.max = this.min)
              : y(this.options.max) && (this.min = this.max));
          this.tickInterval =
            this.min === this.max ||
            'undefined' === typeof this.min ||
            'undefined' === typeof this.max
              ? 1
              : b &&
                  this.linkedParent &&
                  !l &&
                  m === this.linkedParent.options.tickPixelInterval
                ? (l = this.linkedParent.tickInterval)
                : H(
                    l,
                    this.tickAmount
                      ? (this.max - this.min) / Math.max(this.tickAmount - 1, 1)
                      : void 0,
                    k ? 1 : ((this.max - this.min) * m) / Math.max(this.len, m)
                  );
          if (f && !c) {
            var Y =
              this.min !== (this.old && this.old.min) ||
              this.max !== (this.old && this.old.max);
            this.series.forEach(function (c) {
              c.forceCrop = c.forceCropping && c.forceCropping();
              c.processData(Y);
            });
            h(this, 'postProcessData', { hasExtemesChanged: Y });
          }
          this.setAxisTranslation();
          h(this, 'initialAxisTranslation');
          this.pointRange &&
            !l &&
            (this.tickInterval = Math.max(this.pointRange, this.tickInterval));
          c = H(
            d.minTickInterval,
            this.dateTime &&
              !this.series.some(function (c) {
                return c.noSharedTooltip;
              })
              ? this.closestPointRange
              : 0
          );
          !l && this.tickInterval < c && (this.tickInterval = c);
          this.dateTime ||
            this.logarithmic ||
            l ||
            (this.tickInterval = u(
              this.tickInterval,
              void 0,
              p(this.tickInterval),
              H(
                d.allowDecimals,
                0.5 > this.tickInterval || void 0 !== this.tickAmount
              ),
              !!this.tickAmount
            ));
          this.tickAmount || (this.tickInterval = this.unsquish());
          this.setTickPositions();
        };
        b.prototype.setTickPositions = function () {
          var c = this.options,
            a = c.tickPositions,
            g = this.getMinorTickInterval(),
            d = this.hasVerticalPanning(),
            f = 'colorAxis' === this.coll,
            b = (f || !d) && c.startOnTick;
          d = (f || !d) && c.endOnTick;
          f = c.tickPositioner;
          this.tickmarkOffset =
            this.categories &&
            'between' === c.tickmarkPlacement &&
            1 === this.tickInterval
              ? 0.5
              : 0;
          this.minorTickInterval =
            'auto' === g && this.tickInterval ? this.tickInterval / 5 : g;
          this.single =
            this.min === this.max &&
            y(this.min) &&
            !this.tickAmount &&
            (parseInt(this.min, 10) === this.min || !1 !== c.allowDecimals);
          this.tickPositions = g = a && a.slice();
          !g &&
            ((this.ordinal && this.ordinal.positions) ||
            !(
              (this.max - this.min) / this.tickInterval >
              Math.max(2 * this.len, 200)
            )
              ? (g = this.dateTime
                  ? this.getTimeTicks(
                      this.dateTime.normalizeTimeTickInterval(
                        this.tickInterval,
                        c.units
                      ),
                      this.min,
                      this.max,
                      c.startOfWeek,
                      this.ordinal && this.ordinal.positions,
                      this.closestPointRange,
                      !0
                    )
                  : this.logarithmic
                    ? this.logarithmic.getLogTickPositions(
                        this.tickInterval,
                        this.min,
                        this.max
                      )
                    : this.getLinearTickPositions(
                        this.tickInterval,
                        this.min,
                        this.max
                      ))
              : ((g = [this.min, this.max]), r(19, !1, this.chart)),
            g.length > this.len &&
              ((g = [g[0], g.pop()]), g[0] === g[1] && (g.length = 1)),
            (this.tickPositions = g),
            f && (f = f.apply(this, [this.min, this.max]))) &&
            (this.tickPositions = g = f);
          this.paddedTicks = g.slice(0);
          this.trimTicks(g, b, d);
          this.isLinked ||
            (this.single &&
              2 > g.length &&
              !this.categories &&
              !this.series.some(function (c) {
                return (
                  c.is('heatmap') && 'between' === c.options.pointPlacement
                );
              }) &&
              ((this.min -= 0.5), (this.max += 0.5)),
            a || f || this.adjustTickAmount());
          h(this, 'afterSetTickPositions');
        };
        b.prototype.trimTicks = function (c, a, g) {
          var d = c[0],
            f = c[c.length - 1],
            b = (!this.isOrdinal && this.minPointOffset) || 0;
          h(this, 'trimTicks');
          if (!this.isLinked) {
            if (a && -Infinity !== d) this.min = d;
            else for (; this.min - b > c[0]; ) c.shift();
            if (g) this.max = f;
            else for (; this.max + b < c[c.length - 1]; ) c.pop();
            0 === c.length &&
              y(d) &&
              !this.options.tickPositions &&
              c.push((f + d) / 2);
          }
        };
        b.prototype.alignToOthers = function () {
          var c = this,
            a = [this],
            g = c.options,
            d =
              'yAxis' === this.coll && this.chart.options.chart.alignThresholds,
            h = [],
            f;
          c.thresholdAlignment = void 0;
          if (
            ((!1 !== this.chart.options.chart.alignTicks && g.alignTicks) ||
              d) &&
            !1 !== g.startOnTick &&
            !1 !== g.endOnTick &&
            !c.logarithmic
          ) {
            var b = function (c) {
                var a = c.options;
                return [
                  c.horiz ? a.left : a.top,
                  a.width,
                  a.height,
                  a.pane,
                ].join();
              },
              u = b(this);
            this.chart[this.coll].forEach(function (g) {
              var d = g.series;
              d.length &&
                d.some(function (c) {
                  return c.visible;
                }) &&
                g !== c &&
                b(g) === u &&
                ((f = !0), a.push(g));
            });
          }
          if (f && d) {
            a.forEach(function (a) {
              a = a.getThresholdAlignment(c);
              w(a) && h.push(a);
            });
            var m =
              1 < h.length
                ? h.reduce(function (c, a) {
                    return c + a;
                  }, 0) / h.length
                : void 0;
            a.forEach(function (c) {
              c.thresholdAlignment = m;
            });
          }
          return f;
        };
        b.prototype.getThresholdAlignment = function (c) {
          (!w(this.dataMin) ||
            (this !== c &&
              this.series.some(function (c) {
                return c.isDirty || c.isDirtyData;
              }))) &&
            this.getSeriesExtremes();
          if (w(this.threshold))
            return (
              (c = k(
                (this.threshold - (this.dataMin || 0)) /
                  ((this.dataMax || 0) - (this.dataMin || 0)),
                0,
                1
              )),
              this.options.reversed && (c = 1 - c),
              c
            );
        };
        b.prototype.getTickAmount = function () {
          var c = this.options,
            a = c.tickPixelInterval,
            g = c.tickAmount;
          !y(c.tickInterval) &&
            !g &&
            this.len < a &&
            !this.isRadial &&
            !this.logarithmic &&
            c.startOnTick &&
            c.endOnTick &&
            (g = 2);
          !g && this.alignToOthers() && (g = Math.ceil(this.len / a) + 1);
          4 > g && ((this.finalTickAmt = g), (g = 5));
          this.tickAmount = g;
        };
        b.prototype.adjustTickAmount = function () {
          var c = this,
            a = c.finalTickAmt,
            g = c.max,
            d = c.min,
            h = c.options,
            f = c.tickPositions,
            b = c.tickAmount,
            u = c.thresholdAlignment,
            m = f && f.length,
            p = H(c.threshold, c.softThreshold ? 0 : null);
          var k = c.tickInterval;
          if (w(u)) {
            var D = 0.5 > u ? Math.ceil(u * (b - 1)) : Math.floor(u * (b - 1));
            h.reversed && (D = b - 1 - D);
          }
          if (c.hasData() && w(d) && w(g)) {
            u = function () {
              c.transA *= (m - 1) / (b - 1);
              c.min = h.startOnTick ? f[0] : Math.min(d, f[0]);
              c.max = h.endOnTick
                ? f[f.length - 1]
                : Math.max(g, f[f.length - 1]);
            };
            if (w(D) && w(c.threshold)) {
              for (
                ;
                f[D] !== p || f.length !== b || f[0] > d || f[f.length - 1] < g;

              ) {
                f.length = 0;
                for (f.push(c.threshold); f.length < b; )
                  void 0 === f[D] || f[D] > c.threshold
                    ? f.unshift(G(f[0] - k))
                    : f.push(G(f[f.length - 1] + k));
                if (k > 8 * c.tickInterval) break;
                k *= 2;
              }
              u();
            } else if (m < b) {
              for (; f.length < b; )
                f.length % 2 || d === p
                  ? f.push(G(f[f.length - 1] + k))
                  : f.unshift(G(f[0] - k));
              u();
            } else m > b && ((c.tickInterval *= 2), c.setTickPositions());
            if (y(a)) {
              for (k = p = f.length; k--; )
                ((3 === a && 1 === k % 2) || (2 >= a && 0 < k && k < p - 1)) &&
                  f.splice(k, 1);
              c.finalTickAmt = void 0;
            }
          }
        };
        b.prototype.setScale = function () {
          var c = !1,
            a = !1;
          this.series.forEach(function (g) {
            c = c || g.isDirtyData || g.isDirty;
            a = a || (g.xAxis && g.xAxis.isDirty) || !1;
          });
          this.setAxisSize();
          var g = this.len !== (this.old && this.old.len);
          g ||
          c ||
          a ||
          this.isLinked ||
          this.forceRedraw ||
          this.userMin !== (this.old && this.old.userMin) ||
          this.userMax !== (this.old && this.old.userMax) ||
          this.alignToOthers()
            ? (this.stacking && this.stacking.resetStacks(),
              (this.forceRedraw = !1),
              this.getSeriesExtremes(),
              this.setTickInterval(),
              this.isDirty ||
                (this.isDirty =
                  g ||
                  this.min !== (this.old && this.old.min) ||
                  this.max !== (this.old && this.old.max)))
            : this.stacking && this.stacking.cleanStacks();
          c && this.panningState && (this.panningState.isDirty = !0);
          h(this, 'afterSetScale');
        };
        b.prototype.setExtremes = function (c, a, g, d, f) {
          var b = this,
            u = b.chart;
          g = H(g, !0);
          b.series.forEach(function (c) {
            delete c.kdTree;
          });
          f = m(f, { min: c, max: a });
          h(b, 'setExtremes', f, function () {
            b.userMin = c;
            b.userMax = a;
            b.eventArgs = f;
            g && u.redraw(d);
          });
        };
        b.prototype.zoom = function (c, a) {
          var g = this,
            d = this.dataMin,
            f = this.dataMax,
            b = this.options,
            u = Math.min(d, H(b.min, d)),
            m = Math.max(f, H(b.max, f));
          c = { newMin: c, newMax: a };
          h(this, 'zoom', c, function (c) {
            var a = c.newMin,
              h = c.newMax;
            if (a !== g.min || h !== g.max)
              g.allowZoomOutside ||
                (y(d) && (a < u && (a = u), a > m && (a = m)),
                y(f) && (h < u && (h = u), h > m && (h = m))),
                (g.displayBtn =
                  'undefined' !== typeof a || 'undefined' !== typeof h),
                g.setExtremes(a, h, !1, void 0, { trigger: 'zoom' });
            c.zoomed = !0;
          });
          return c.zoomed;
        };
        b.prototype.setAxisSize = function () {
          var c = this.chart,
            a = this.options,
            g = a.offsets || [0, 0, 0, 0],
            d = this.horiz,
            h = (this.width = Math.round(
              L(H(a.width, c.plotWidth - g[3] + g[1]), c.plotWidth)
            )),
            f = (this.height = Math.round(
              L(H(a.height, c.plotHeight - g[0] + g[2]), c.plotHeight)
            )),
            b = (this.top = Math.round(
              L(H(a.top, c.plotTop + g[0]), c.plotHeight, c.plotTop)
            ));
          a = this.left = Math.round(
            L(H(a.left, c.plotLeft + g[3]), c.plotWidth, c.plotLeft)
          );
          this.bottom = c.chartHeight - f - b;
          this.right = c.chartWidth - h - a;
          this.len = Math.max(d ? h : f, 0);
          this.pos = d ? a : b;
        };
        b.prototype.getExtremes = function () {
          var c = this.logarithmic;
          return {
            min: c ? G(c.lin2log(this.min)) : this.min,
            max: c ? G(c.lin2log(this.max)) : this.max,
            dataMin: this.dataMin,
            dataMax: this.dataMax,
            userMin: this.userMin,
            userMax: this.userMax,
          };
        };
        b.prototype.getThreshold = function (c) {
          var a = this.logarithmic,
            g = a ? a.lin2log(this.min) : this.min;
          a = a ? a.lin2log(this.max) : this.max;
          null === c || -Infinity === c
            ? (c = g)
            : Infinity === c
              ? (c = a)
              : g > c
                ? (c = g)
                : a < c && (c = a);
          return this.translate(c, 0, 1, 0, 1);
        };
        b.prototype.autoLabelAlign = function (c) {
          var a = (H(c, 0) - 90 * this.side + 720) % 360;
          c = { align: 'center' };
          h(this, 'autoLabelAlign', c, function (c) {
            15 < a && 165 > a
              ? (c.align = 'right')
              : 195 < a && 345 > a && (c.align = 'left');
          });
          return c.align;
        };
        b.prototype.tickSize = function (c) {
          var a = this.options,
            g = H(
              a['tick' === c ? 'tickWidth' : 'minorTickWidth'],
              'tick' === c && this.isXAxis && !this.categories ? 1 : 0
            ),
            d = a['tick' === c ? 'tickLength' : 'minorTickLength'];
          if (g && d) {
            'inside' === a[c + 'Position'] && (d = -d);
            var f = [d, g];
          }
          c = { tickSize: f };
          h(this, 'afterTickSize', c);
          return c.tickSize;
        };
        b.prototype.labelMetrics = function () {
          var c = (this.tickPositions && this.tickPositions[0]) || 0;
          return this.chart.renderer.fontMetrics(
            this.options.labels.style.fontSize,
            this.ticks[c] && this.ticks[c].label
          );
        };
        b.prototype.unsquish = function () {
          var c = this.options.labels,
            a = this.horiz,
            g = this.tickInterval,
            h =
              this.len /
              (((this.categories ? 1 : 0) + this.max - this.min) / g),
            f = c.rotation,
            b = this.labelMetrics(),
            u = Math.max(this.max - this.min, 0),
            m = function (c) {
              var a = c / (h || 1);
              a = 1 < a ? Math.ceil(a) : 1;
              a * g > u &&
                Infinity !== c &&
                Infinity !== h &&
                u &&
                (a = Math.ceil(u / g));
              return G(a * g);
            },
            p = g,
            k,
            D,
            F = Number.MAX_VALUE;
          if (a) {
            if (!c.staggerLines && !c.step)
              if (w(f)) var e = [f];
              else h < c.autoRotationLimit && (e = c.autoRotation);
            e &&
              e.forEach(function (c) {
                if (c === f || (c && -90 <= c && 90 >= c)) {
                  D = m(Math.abs(b.h / Math.sin(d * c)));
                  var a = D + Math.abs(c / 360);
                  a < F && ((F = a), (k = c), (p = D));
                }
              });
          } else c.step || (p = m(b.h));
          this.autoRotation = e;
          this.labelRotation = H(k, w(f) ? f : 0);
          return p;
        };
        b.prototype.getSlotWidth = function (c) {
          var a = this.chart,
            g = this.horiz,
            d = this.options.labels,
            h = Math.max(
              this.tickPositions.length - (this.categories ? 0 : 1),
              1
            ),
            f = a.margin[3];
          if (c && w(c.slotWidth)) return c.slotWidth;
          if (g && 2 > d.step)
            return d.rotation ? 0 : ((this.staggerLines || 1) * this.len) / h;
          if (!g) {
            c = d.style.width;
            if (void 0 !== c) return parseInt(String(c), 10);
            if (f) return f - a.spacing[3];
          }
          return 0.33 * a.chartWidth;
        };
        b.prototype.renderUnsquish = function () {
          var c = this.chart,
            a = c.renderer,
            d = this.tickPositions,
            h = this.ticks,
            f = this.options.labels,
            b = f.style,
            u = this.horiz,
            m = this.getSlotWidth(),
            p = Math.max(1, Math.round(m - 2 * f.padding)),
            k = {},
            w = this.labelMetrics(),
            D = b.textOverflow,
            F = 0;
          g(f.rotation) || (k.rotation = f.rotation || 0);
          d.forEach(function (c) {
            c = h[c];
            c.movedLabel && c.replaceMovedLabel();
            c &&
              c.label &&
              c.label.textPxLength > F &&
              (F = c.label.textPxLength);
          });
          this.maxLabelLength = F;
          if (this.autoRotation)
            F > p && F > w.h
              ? (k.rotation = this.labelRotation)
              : (this.labelRotation = 0);
          else if (m) {
            var e = p;
            if (!D) {
              var l = 'clip';
              for (p = d.length; !u && p--; ) {
                var r = d[p];
                if ((r = h[r].label))
                  r.styles && 'ellipsis' === r.styles.textOverflow
                    ? r.css({ textOverflow: 'clip' })
                    : r.textPxLength > m && r.css({ width: m + 'px' }),
                    r.getBBox().height > this.len / d.length - (w.h - w.f) &&
                      (r.specificTextOverflow = 'ellipsis');
              }
            }
          }
          k.rotation &&
            ((e = F > 0.5 * c.chartHeight ? 0.33 * c.chartHeight : F),
            D || (l = 'ellipsis'));
          if (
            (this.labelAlign =
              f.align || this.autoLabelAlign(this.labelRotation))
          )
            k.align = this.labelAlign;
          d.forEach(function (c) {
            var a = (c = h[c]) && c.label,
              g = b.width,
              d = {};
            a &&
              (a.attr(k),
              c.shortenLabel
                ? c.shortenLabel()
                : e &&
                    !g &&
                    'nowrap' !== b.whiteSpace &&
                    (e < a.textPxLength || 'SPAN' === a.element.tagName)
                  ? ((d.width = e + 'px'),
                    D || (d.textOverflow = a.specificTextOverflow || l),
                    a.css(d))
                  : a.styles &&
                    a.styles.width &&
                    !d.width &&
                    !g &&
                    a.css({ width: null }),
              delete a.specificTextOverflow,
              (c.rotation = k.rotation));
          }, this);
          this.tickRotCorr = a.rotCorr(
            w.b,
            this.labelRotation || 0,
            0 !== this.side
          );
        };
        b.prototype.hasData = function () {
          return (
            this.series.some(function (c) {
              return c.hasData();
            }) ||
            (this.options.showEmpty && y(this.min) && y(this.max))
          );
        };
        b.prototype.addTitle = function (c) {
          var a = this.chart.renderer,
            g = this.horiz,
            d = this.opposite,
            h = this.options.title,
            f = this.chart.styledMode,
            b;
          this.axisTitle ||
            ((b = h.textAlign) ||
              (b = (
                g
                  ? { low: 'left', middle: 'center', high: 'right' }
                  : {
                      low: d ? 'right' : 'left',
                      middle: 'center',
                      high: d ? 'left' : 'right',
                    }
              )[h.align]),
            (this.axisTitle = a
              .text(h.text || '', 0, 0, h.useHTML)
              .attr({ zIndex: 7, rotation: h.rotation, align: b })
              .addClass('highcharts-axis-title')),
            f || this.axisTitle.css(F(h.style)),
            this.axisTitle.add(this.axisGroup),
            (this.axisTitle.isNew = !0));
          f ||
            h.style.width ||
            this.isRadial ||
            this.axisTitle.css({ width: this.len + 'px' });
          this.axisTitle[c ? 'show' : 'hide'](c);
        };
        b.prototype.generateTick = function (c) {
          var a = this.ticks;
          a[c] ? a[c].addLabel() : (a[c] = new C(this, c));
        };
        b.prototype.getOffset = function () {
          var c = this,
            a = this,
            g = a.chart,
            d = a.horiz,
            f = a.options,
            b = a.side,
            u = a.ticks,
            m = a.tickPositions,
            p = a.coll,
            k = a.axisParent,
            w = g.renderer,
            F = g.inverted && !a.isZAxis ? [1, 0, 3, 2][b] : b,
            e = a.hasData(),
            r = f.title,
            l = f.labels,
            n = g.axisOffset;
          g = g.clipOffset;
          var x = [-1, 1, 1, -1][b],
            B = f.className,
            L,
            G = 0,
            q = 0,
            P = 0;
          a.showAxis = L = e || f.showEmpty;
          a.staggerLines = (a.horiz && l.staggerLines) || void 0;
          if (!a.axisGroup) {
            var K = function (a, g, d) {
              return w
                .g(a)
                .attr({ zIndex: d })
                .addClass(
                  'highcharts-' +
                    p.toLowerCase() +
                    g +
                    ' ' +
                    (c.isRadial ? 'highcharts-radial-axis' + g + ' ' : '') +
                    (B || '')
                )
                .add(k);
            };
            a.gridGroup = K('grid', '-grid', f.gridZIndex);
            a.axisGroup = K('axis', '', f.zIndex);
            a.labelGroup = K('axis-labels', '-labels', l.zIndex);
          }
          e || a.isLinked
            ? (m.forEach(function (c) {
                a.generateTick(c);
              }),
              a.renderUnsquish(),
              (a.reserveSpaceDefault =
                0 === b ||
                2 === b ||
                { 1: 'left', 3: 'right' }[b] === a.labelAlign),
              H(
                l.reserveSpace,
                'center' === a.labelAlign ? !0 : null,
                a.reserveSpaceDefault
              ) &&
                m.forEach(function (c) {
                  P = Math.max(u[c].getLabelSize(), P);
                }),
              a.staggerLines && (P *= a.staggerLines),
              (a.labelOffset = P * (a.opposite ? -1 : 1)))
            : D(u, function (c, a) {
                c.destroy();
                delete u[a];
              });
          if (
            r &&
            r.text &&
            !1 !== r.enabled &&
            (a.addTitle(L), L && !1 !== r.reserveSpace)
          ) {
            a.titleOffset = G = a.axisTitle.getBBox()[d ? 'height' : 'width'];
            var t = r.offset;
            q = y(t) ? 0 : H(r.margin, d ? 5 : 10);
          }
          a.renderLine();
          a.offset = x * H(f.offset, n[b] ? n[b] + (f.margin || 0) : 0);
          a.tickRotCorr = a.tickRotCorr || { x: 0, y: 0 };
          r = 0 === b ? -a.labelMetrics().h : 2 === b ? a.tickRotCorr.y : 0;
          e = Math.abs(P) + q;
          P && (e = e - r + x * (d ? H(l.y, a.tickRotCorr.y + 8 * x) : l.x));
          a.axisTitleMargin = H(t, e);
          a.getMaxLabelDimensions &&
            (a.maxLabelDimensions = a.getMaxLabelDimensions(u, m));
          'colorAxis' !== p &&
            ((d = this.tickSize('tick')),
            (n[b] = Math.max(
              n[b],
              (a.axisTitleMargin || 0) + G + x * a.offset,
              e,
              m && m.length && d ? d[0] + x * a.offset : 0
            )),
            (f =
              !a.axisLine || f.offset
                ? 0
                : 2 * Math.floor(a.axisLine.strokeWidth() / 2)),
            (g[F] = Math.max(g[F], f)));
          h(this, 'afterGetOffset');
        };
        b.prototype.getLinePath = function (c) {
          var a = this.chart,
            g = this.opposite,
            d = this.offset,
            h = this.horiz,
            f = this.left + (g ? this.width : 0) + d;
          d = a.chartHeight - this.bottom - (g ? this.height : 0) + d;
          g && (c *= -1);
          return a.renderer.crispLine(
            [
              ['M', h ? this.left : f, h ? d : this.top],
              [
                'L',
                h ? a.chartWidth - this.right : f,
                h ? d : a.chartHeight - this.bottom,
              ],
            ],
            c
          );
        };
        b.prototype.renderLine = function () {
          this.axisLine ||
            ((this.axisLine = this.chart.renderer
              .path()
              .addClass('highcharts-axis-line')
              .add(this.axisGroup)),
            this.chart.styledMode ||
              this.axisLine.attr({
                stroke: this.options.lineColor,
                'stroke-width': this.options.lineWidth,
                zIndex: 7,
              }));
        };
        b.prototype.getTitlePosition = function () {
          var c = this.horiz,
            a = this.left,
            g = this.top,
            d = this.len,
            f = this.options.title,
            b = c ? a : g,
            u = this.opposite,
            m = this.offset,
            p = f.x,
            k = f.y,
            w = this.axisTitle,
            D = this.chart.renderer.fontMetrics(f.style.fontSize, w);
          w = Math.max(w.getBBox(null, 0).height - D.h - 1, 0);
          d = {
            low: b + (c ? 0 : d),
            middle: b + d / 2,
            high: b + (c ? d : 0),
          }[f.align];
          a =
            (c ? g + this.height : a) +
            (c ? 1 : -1) * (u ? -1 : 1) * this.axisTitleMargin +
            [-w, w, D.f, -w][this.side];
          c = {
            x: c ? d + p : a + (u ? this.width : 0) + m + p,
            y: c ? a + k - (u ? this.height : 0) + m : d + k,
          };
          h(this, 'afterGetTitlePosition', { titlePosition: c });
          return c;
        };
        b.prototype.renderMinorTick = function (c, a) {
          var g = this.minorTicks;
          g[c] || (g[c] = new C(this, c, 'minor'));
          a && g[c].isNew && g[c].render(null, !0);
          g[c].render(null, !1, 1);
        };
        b.prototype.renderTick = function (c, a, g) {
          var d = this.ticks;
          if (
            !this.isLinked ||
            (c >= this.min && c <= this.max) ||
            (this.grid && this.grid.isColumn)
          )
            d[c] || (d[c] = new C(this, c)),
              g && d[c].isNew && d[c].render(a, !0, -1),
              d[c].render(a);
        };
        b.prototype.render = function () {
          var c = this,
            a = c.chart,
            g = c.logarithmic,
            d = c.options,
            f = c.isLinked,
            b = c.tickPositions,
            u = c.axisTitle,
            m = c.ticks,
            p = c.minorTicks,
            k = c.alternateBands,
            F = d.stackLabels,
            e = d.alternateGridColor,
            r = c.tickmarkOffset,
            l = c.axisLine,
            n = c.showAxis,
            H = q(a.renderer.globalAnimation),
            x,
            y;
          c.labelEdge.length = 0;
          c.overlap = !1;
          [m, p, k].forEach(function (c) {
            D(c, function (c) {
              c.isActive = !1;
            });
          });
          if (c.hasData() || f) {
            var B = c.chart.hasRendered && c.old && w(c.old.min);
            c.minorTickInterval &&
              !c.categories &&
              c.getMinorTickPositions().forEach(function (a) {
                c.renderMinorTick(a, B);
              });
            b.length &&
              (b.forEach(function (a, g) {
                c.renderTick(a, g, B);
              }),
              r &&
                (0 === c.min || c.single) &&
                (m[-1] || (m[-1] = new C(c, -1, null, !0)), m[-1].render(-1)));
            e &&
              b.forEach(function (d, h) {
                y = 'undefined' !== typeof b[h + 1] ? b[h + 1] + r : c.max - r;
                0 === h % 2 &&
                  d < c.max &&
                  y <= c.max + (a.polar ? -r : r) &&
                  (k[d] || (k[d] = new A.PlotLineOrBand(c)),
                  (x = d + r),
                  (k[d].options = {
                    from: g ? g.lin2log(x) : x,
                    to: g ? g.lin2log(y) : y,
                    color: e,
                    className: 'highcharts-alternate-grid',
                  }),
                  k[d].render(),
                  (k[d].isActive = !0));
              });
            c._addedPlotLB ||
              ((c._addedPlotLB = !0),
              (d.plotLines || [])
                .concat(d.plotBands || [])
                .forEach(function (a) {
                  c.addPlotBandOrLine(a);
                }));
          }
          [m, p, k].forEach(function (c) {
            var g = [],
              d = H.duration;
            D(c, function (c, a) {
              c.isActive || (c.render(a, !1, 0), (c.isActive = !1), g.push(a));
            });
            S(
              function () {
                for (var a = g.length; a--; )
                  c[g[a]] &&
                    !c[g[a]].isActive &&
                    (c[g[a]].destroy(), delete c[g[a]]);
              },
              c !== k && a.hasRendered && d ? d : 0
            );
          });
          l &&
            (l[l.isPlaced ? 'animate' : 'attr']({
              d: this.getLinePath(l.strokeWidth()),
            }),
            (l.isPlaced = !0),
            l[n ? 'show' : 'hide'](n));
          u &&
            n &&
            ((d = c.getTitlePosition()),
            w(d.y)
              ? (u[u.isNew ? 'attr' : 'animate'](d), (u.isNew = !1))
              : (u.attr('y', -9999), (u.isNew = !0)));
          F && F.enabled && c.stacking && c.stacking.renderStackTotals();
          c.old = {
            len: c.len,
            max: c.max,
            min: c.min,
            transA: c.transA,
            userMax: c.userMax,
            userMin: c.userMin,
          };
          c.isDirty = !1;
          h(this, 'afterRender');
        };
        b.prototype.redraw = function () {
          this.visible &&
            (this.render(),
            this.plotLinesAndBands.forEach(function (c) {
              c.render();
            }));
          this.series.forEach(function (c) {
            c.isDirty = !0;
          });
        };
        b.prototype.getKeepProps = function () {
          return this.keepProps || b.keepProps;
        };
        b.prototype.destroy = function (c) {
          var a = this,
            g = a.plotLinesAndBands,
            d = this.eventOptions;
          h(this, 'destroy', { keepEvents: c });
          c || P(a);
          [a.ticks, a.minorTicks, a.alternateBands].forEach(function (c) {
            B(c);
          });
          if (g) for (c = g.length; c--; ) g[c].destroy();
          'axisLine axisTitle axisGroup gridGroup labelGroup cross scrollbar'
            .split(' ')
            .forEach(function (c) {
              a[c] && (a[c] = a[c].destroy());
            });
          for (var f in a.plotLinesAndBandsGroups)
            a.plotLinesAndBandsGroups[f] =
              a.plotLinesAndBandsGroups[f].destroy();
          D(a, function (c, g) {
            -1 === a.getKeepProps().indexOf(g) && delete a[g];
          });
          this.eventOptions = d;
        };
        b.prototype.drawCrosshair = function (c, a) {
          var g = this.crosshair,
            d = H(g && g.snap, !0),
            f = this.chart,
            b,
            u = this.cross;
          h(this, 'drawCrosshair', { e: c, point: a });
          c || (c = this.cross && this.cross.e);
          if (g && !1 !== (y(a) || !d)) {
            d
              ? y(a) &&
                (b = H(
                  'colorAxis' !== this.coll ? a.crosshairPos : null,
                  this.isXAxis ? a.plotX : this.len - a.plotY
                ))
              : (b =
                  c &&
                  (this.horiz
                    ? c.chartX - this.pos
                    : this.len - c.chartY + this.pos));
            if (y(b)) {
              var p = {
                value: a && (this.isXAxis ? a.x : H(a.stackY, a.y)),
                translatedValue: b,
              };
              f.polar &&
                m(p, {
                  isCrosshair: !0,
                  chartX: c && c.chartX,
                  chartY: c && c.chartY,
                  point: a,
                });
              p = this.getPlotLinePath(p) || null;
            }
            if (!y(p)) {
              this.hideCrosshair();
              return;
            }
            d = this.categories && !this.isRadial;
            u ||
              ((this.cross = u =
                f.renderer
                  .path()
                  .addClass(
                    'highcharts-crosshair highcharts-crosshair-' +
                      (d ? 'category ' : 'thin ') +
                      (g.className || '')
                  )
                  .attr({ zIndex: H(g.zIndex, 2) })
                  .add()),
              f.styledMode ||
                (u
                  .attr({
                    stroke:
                      g.color ||
                      (d
                        ? v.parse('#ccd6eb').setOpacity(0.25).get()
                        : '#cccccc'),
                    'stroke-width': H(g.width, 1),
                  })
                  .css({ 'pointer-events': 'none' }),
                g.dashStyle && u.attr({ dashstyle: g.dashStyle })));
            u.show().attr({ d: p });
            d && !g.width && u.attr({ 'stroke-width': this.transA });
            this.cross.e = c;
          } else this.hideCrosshair();
          h(this, 'afterDrawCrosshair', { e: c, point: a });
        };
        b.prototype.hideCrosshair = function () {
          this.cross && this.cross.hide();
          h(this, 'afterHideCrosshair');
        };
        b.prototype.hasVerticalPanning = function () {
          var c = this.chart.options.chart.panning;
          return !!(c && c.enabled && /y/.test(c.type));
        };
        b.prototype.validatePositiveValue = function (c) {
          return w(c) && 0 < c;
        };
        b.prototype.update = function (c, a) {
          var g = this.chart;
          c = F(this.userOptions, c);
          this.destroy(!0);
          this.init(g, c);
          g.isDirtyBox = !0;
          H(a, !0) && g.redraw();
        };
        b.prototype.remove = function (c) {
          for (
            var a = this.chart, g = this.coll, d = this.series, h = d.length;
            h--;

          )
            d[h] && d[h].remove(!1);
          x(a.axes, this);
          x(a[g], this);
          a[g].forEach(function (c, a) {
            c.options.index = c.userOptions.index = a;
          });
          this.destroy();
          a.isDirtyBox = !0;
          H(c, !0) && a.redraw();
        };
        b.prototype.setTitle = function (c, a) {
          this.update({ title: c }, a);
        };
        b.prototype.setCategories = function (c, a) {
          this.update({ categories: c }, a);
        };
        b.defaultOptions = e.defaultXAxisOptions;
        b.keepProps = 'extKey hcEvents names series userMax userMin'.split(' ');
        return b;
      })();
      ('');
      return b;
    }
  );
  J(e, 'Core/Axis/DateTimeAxis.js', [e['Core/Utilities.js']], function (b) {
    var e = b.addEvent,
      v = b.getMagnitude,
      E = b.normalizeTickInterval,
      t = b.timeUnits,
      A;
    (function (b) {
      function z() {
        return this.chart.time.getTimeTicks.apply(this.chart.time, arguments);
      }
      function q(d) {
        'datetime' !== d.userOptions.type
          ? (this.dateTime = void 0)
          : this.dateTime || (this.dateTime = new n(this));
      }
      var l = [];
      b.compose = function (d) {
        -1 === l.indexOf(d) &&
          (l.push(d),
          d.keepProps.push('dateTime'),
          (d.prototype.getTimeTicks = z),
          e(d, 'init', q));
        return d;
      };
      var n = (function () {
        function d(a) {
          this.axis = a;
        }
        d.prototype.normalizeTimeTickInterval = function (a, d) {
          var f = d || [
            ['millisecond', [1, 2, 5, 10, 20, 25, 50, 100, 200, 500]],
            ['second', [1, 2, 5, 10, 15, 30]],
            ['minute', [1, 2, 5, 10, 15, 30]],
            ['hour', [1, 2, 3, 4, 6, 8, 12]],
            ['day', [1, 2]],
            ['week', [1, 2]],
            ['month', [1, 2, 3, 4, 6]],
            ['year', null],
          ];
          d = f[f.length - 1];
          var b = t[d[0]],
            e = d[1],
            l;
          for (
            l = 0;
            l < f.length &&
            !((d = f[l]),
            (b = t[d[0]]),
            (e = d[1]),
            f[l + 1] && a <= (b * e[e.length - 1] + t[f[l + 1][0]]) / 2);
            l++
          );
          b === t.year && a < 5 * b && (e = [1, 2, 5]);
          a = E(a / b, e, 'year' === d[0] ? Math.max(v(a / b), 1) : 1);
          return { unitRange: b, count: a, unitName: d[0] };
        };
        d.prototype.getXDateFormat = function (a, d) {
          var f = this.axis;
          return f.closestPointRange
            ? f.chart.time.getDateFormat(
                f.closestPointRange,
                a,
                f.options.startOfWeek,
                d
              ) || d.year
            : d.day;
        };
        return d;
      })();
      b.Additions = n;
    })(A || (A = {}));
    return A;
  });
  J(e, 'Core/Axis/LogarithmicAxis.js', [e['Core/Utilities.js']], function (b) {
    var e = b.addEvent,
      v = b.getMagnitude,
      E = b.normalizeTickInterval,
      t = b.pick,
      A;
    (function (b) {
      function z(d) {
        var a = this.logarithmic;
        'logarithmic' !== d.userOptions.type
          ? (this.logarithmic = void 0)
          : a || (this.logarithmic = new n(this));
      }
      function q() {
        var d = this.logarithmic;
        d &&
          ((this.lin2val = function (a) {
            return d.lin2log(a);
          }),
          (this.val2lin = function (a) {
            return d.log2lin(a);
          }));
      }
      var l = [];
      b.compose = function (d) {
        -1 === l.indexOf(d) &&
          (l.push(d),
          d.keepProps.push('logarithmic'),
          e(d, 'init', z),
          e(d, 'afterInit', q));
        return d;
      };
      var n = (function () {
        function d(a) {
          this.axis = a;
        }
        d.prototype.getLogTickPositions = function (a, d, b, e) {
          var f = this.axis,
            k = f.len,
            l = f.options,
            r = [];
          e || (this.minorAutoInterval = void 0);
          if (0.5 <= a)
            (a = Math.round(a)), (r = f.getLinearTickPositions(a, d, b));
          else if (0.08 <= a) {
            var m = Math.floor(d),
              h,
              p = (l = void 0);
            for (
              k =
                0.3 < a
                  ? [1, 2, 4]
                  : 0.15 < a
                    ? [1, 2, 4, 6, 8]
                    : [1, 2, 3, 4, 5, 6, 7, 8, 9];
              m < b + 1 && !p;
              m++
            ) {
              var c = k.length;
              for (h = 0; h < c && !p; h++) {
                var w = this.log2lin(this.lin2log(m) * k[h]);
                w > d &&
                  (!e || l <= b) &&
                  'undefined' !== typeof l &&
                  r.push(l);
                l > b && (p = !0);
                l = w;
              }
            }
          } else
            (d = this.lin2log(d)),
              (b = this.lin2log(b)),
              (a = e ? f.getMinorTickInterval() : l.tickInterval),
              (a = t(
                'auto' === a ? null : a,
                this.minorAutoInterval,
                ((l.tickPixelInterval / (e ? 5 : 1)) * (b - d)) /
                  ((e ? k / f.tickPositions.length : k) || 1)
              )),
              (a = E(a, void 0, v(a))),
              (r = f.getLinearTickPositions(a, d, b).map(this.log2lin)),
              e || (this.minorAutoInterval = a / 5);
          e || (f.tickInterval = a);
          return r;
        };
        d.prototype.lin2log = function (a) {
          return Math.pow(10, a);
        };
        d.prototype.log2lin = function (a) {
          return Math.log(a) / Math.LN10;
        };
        return d;
      })();
      b.Additions = n;
    })(A || (A = {}));
    return A;
  });
  J(
    e,
    'Core/Axis/PlotLineOrBand/PlotLineOrBandAxis.js',
    [e['Core/Utilities.js']],
    function (b) {
      var e = b.erase,
        v = b.extend,
        E = b.isNumber,
        t;
      (function (b) {
        var t = [],
          z;
        b.compose = function (b, e) {
          z || (z = b);
          -1 === t.indexOf(e) && (t.push(e), v(e.prototype, q.prototype));
          return e;
        };
        var q = (function () {
          function b() {}
          b.prototype.getPlotBandPath = function (b, d, a) {
            void 0 === a && (a = this.options);
            var f = this.getPlotLinePath({
                value: d,
                force: !0,
                acrossPanes: a.acrossPanes,
              }),
              k = [],
              e = this.horiz;
            d =
              !E(this.min) ||
              !E(this.max) ||
              (b < this.min && d < this.min) ||
              (b > this.max && d > this.max);
            b = this.getPlotLinePath({
              value: b,
              force: !0,
              acrossPanes: a.acrossPanes,
            });
            a = 1;
            if (b && f) {
              if (d) {
                var l = b.toString() === f.toString();
                a = 0;
              }
              for (d = 0; d < b.length; d += 2) {
                var n = b[d],
                  x = b[d + 1],
                  r = f[d],
                  m = f[d + 1];
                ('M' !== n[0] && 'L' !== n[0]) ||
                  ('M' !== x[0] && 'L' !== x[0]) ||
                  ('M' !== r[0] && 'L' !== r[0]) ||
                  ('M' !== m[0] && 'L' !== m[0]) ||
                  (e && r[1] === n[1]
                    ? ((r[1] += a), (m[1] += a))
                    : e || r[2] !== n[2] || ((r[2] += a), (m[2] += a)),
                  k.push(
                    ['M', n[1], n[2]],
                    ['L', x[1], x[2]],
                    ['L', m[1], m[2]],
                    ['L', r[1], r[2]],
                    ['Z']
                  ));
                k.isFlat = l;
              }
            }
            return k;
          };
          b.prototype.addPlotBand = function (b) {
            return this.addPlotBandOrLine(b, 'plotBands');
          };
          b.prototype.addPlotLine = function (b) {
            return this.addPlotBandOrLine(b, 'plotLines');
          };
          b.prototype.addPlotBandOrLine = function (b, d) {
            var a = this,
              f = this.userOptions,
              k = new z(this, b);
            this.visible && (k = k.render());
            if (k) {
              this._addedPlotLB ||
                ((this._addedPlotLB = !0),
                (f.plotLines || [])
                  .concat(f.plotBands || [])
                  .forEach(function (d) {
                    a.addPlotBandOrLine(d);
                  }));
              if (d) {
                var e = f[d] || [];
                e.push(b);
                f[d] = e;
              }
              this.plotLinesAndBands.push(k);
            }
            return k;
          };
          b.prototype.removePlotBandOrLine = function (b) {
            var d = this.plotLinesAndBands,
              a = this.options,
              f = this.userOptions;
            if (d) {
              for (var k = d.length; k--; ) d[k].id === b && d[k].destroy();
              [
                a.plotLines || [],
                f.plotLines || [],
                a.plotBands || [],
                f.plotBands || [],
              ].forEach(function (a) {
                for (k = a.length; k--; ) (a[k] || {}).id === b && e(a, a[k]);
              });
            }
          };
          b.prototype.removePlotBand = function (b) {
            this.removePlotBandOrLine(b);
          };
          b.prototype.removePlotLine = function (b) {
            this.removePlotBandOrLine(b);
          };
          return b;
        })();
      })(t || (t = {}));
      return t;
    }
  );
  J(
    e,
    'Core/Axis/PlotLineOrBand/PlotLineOrBand.js',
    [
      e['Core/Axis/PlotLineOrBand/PlotLineOrBandAxis.js'],
      e['Core/Utilities.js'],
    ],
    function (b, e) {
      var v = e.arrayMax,
        E = e.arrayMin,
        t = e.defined,
        A = e.destroyObjectProperties,
        C = e.erase,
        z = e.fireEvent,
        q = e.merge,
        l = e.objectEach,
        n = e.pick;
      e = (function () {
        function d(a, d) {
          this.axis = a;
          d && ((this.options = d), (this.id = d.id));
        }
        d.compose = function (a) {
          return b.compose(d, a);
        };
        d.prototype.render = function () {
          z(this, 'render');
          var a = this,
            d = a.axis,
            b = d.horiz,
            e = d.logarithmic,
            y = a.options,
            B = y.color,
            x = n(y.zIndex, 0),
            r = y.events,
            m = {},
            h = d.chart.renderer,
            p = y.label,
            c = a.label,
            w = y.to,
            g = y.from,
            F = y.value,
            u = a.svgElem,
            D = [],
            H = t(g) && t(w);
          D = t(F);
          var L = !u,
            P = {
              class:
                'highcharts-plot-' +
                (H ? 'band ' : 'line ') +
                (y.className || ''),
            },
            K = H ? 'bands' : 'lines';
          e && ((g = e.log2lin(g)), (w = e.log2lin(w)), (F = e.log2lin(F)));
          d.chart.styledMode ||
            (D
              ? ((P.stroke = B || '#999999'),
                (P['stroke-width'] = n(y.width, 1)),
                y.dashStyle && (P.dashstyle = y.dashStyle))
              : H &&
                ((P.fill = B || '#e6ebf5'),
                y.borderWidth &&
                  ((P.stroke = y.borderColor),
                  (P['stroke-width'] = y.borderWidth))));
          m.zIndex = x;
          K += '-' + x;
          (e = d.plotLinesAndBandsGroups[K]) ||
            (d.plotLinesAndBandsGroups[K] = e =
              h
                .g('plot-' + K)
                .attr(m)
                .add());
          L && (a.svgElem = u = h.path().attr(P).add(e));
          if (D)
            D = d.getPlotLinePath({
              value: F,
              lineWidth: u.strokeWidth(),
              acrossPanes: y.acrossPanes,
            });
          else if (H) D = d.getPlotBandPath(g, w, y);
          else return;
          !a.eventsAdded &&
            r &&
            (l(r, function (c, g) {
              u.on(g, function (c) {
                r[g].apply(a, [c]);
              });
            }),
            (a.eventsAdded = !0));
          (L || !u.d) && D && D.length
            ? u.attr({ d: D })
            : u &&
              (D
                ? (u.show(!0), u.animate({ d: D }))
                : u.d && (u.hide(), c && (a.label = c = c.destroy())));
          p &&
          (t(p.text) || t(p.formatter)) &&
          D &&
          D.length &&
          0 < d.width &&
          0 < d.height &&
          !D.isFlat
            ? ((p = q(
                {
                  align: b && H && 'center',
                  x: b ? !H && 4 : 10,
                  verticalAlign: !b && H && 'middle',
                  y: b ? (H ? 16 : 10) : H ? 6 : -4,
                  rotation: b && !H && 90,
                },
                p
              )),
              this.renderLabel(p, D, H, x))
            : c && c.hide();
          return a;
        };
        d.prototype.renderLabel = function (a, d, b, e) {
          var f = this.axis,
            k = f.chart.renderer,
            l = this.label;
          l ||
            ((this.label = l =
              k
                .text(this.getLabelText(a), 0, 0, a.useHTML)
                .attr({
                  align: a.textAlign || a.align,
                  rotation: a.rotation,
                  class:
                    'highcharts-plot-' +
                    (b ? 'band' : 'line') +
                    '-label ' +
                    (a.className || ''),
                  zIndex: e,
                })
                .add()),
            f.chart.styledMode ||
              l.css(q({ textOverflow: 'ellipsis' }, a.style)));
          e = d.xBounds || [d[0][1], d[1][1], b ? d[2][1] : d[0][1]];
          d = d.yBounds || [d[0][2], d[1][2], b ? d[2][2] : d[0][2]];
          b = E(e);
          k = E(d);
          l.align(a, !1, { x: b, y: k, width: v(e) - b, height: v(d) - k });
          (l.alignValue && 'left' !== l.alignValue) ||
            l.css({
              width:
                (90 === l.rotation
                  ? f.height - (l.alignAttr.y - f.top)
                  : f.width - (l.alignAttr.x - f.left)) + 'px',
            });
          l.show(!0);
        };
        d.prototype.getLabelText = function (a) {
          return t(a.formatter) ? a.formatter.call(this) : a.text;
        };
        d.prototype.destroy = function () {
          C(this.axis.plotLinesAndBands, this);
          delete this.axis;
          A(this);
        };
        return d;
      })();
      ('');
      ('');
      return e;
    }
  );
  J(
    e,
    'Core/Tooltip.js',
    [
      e['Core/FormatUtilities.js'],
      e['Core/Globals.js'],
      e['Core/Renderer/RendererUtilities.js'],
      e['Core/Renderer/RendererRegistry.js'],
      e['Core/Utilities.js'],
    ],
    function (b, e, v, E, t) {
      var A = b.format,
        C = e.doc,
        z = v.distribute,
        q = t.addEvent,
        l = t.clamp,
        n = t.css,
        d = t.defined,
        a = t.discardElement,
        f = t.extend,
        k = t.fireEvent,
        G = t.isArray,
        y = t.isNumber,
        B = t.isString,
        x = t.merge,
        r = t.pick,
        m = t.splat,
        h = t.syncTimeout;
      b = (function () {
        function b(c, a) {
          this.allowShared = !0;
          this.container = void 0;
          this.crosshairs = [];
          this.distance = 0;
          this.isHidden = !0;
          this.isSticky = !1;
          this.now = {};
          this.options = {};
          this.outside = !1;
          this.chart = c;
          this.init(c, a);
        }
        b.prototype.applyFilter = function () {
          var c = this.chart;
          c.renderer.definition({
            tagName: 'filter',
            attributes: { id: 'drop-shadow-' + c.index, opacity: 0.5 },
            children: [
              {
                tagName: 'feGaussianBlur',
                attributes: { in: 'SourceAlpha', stdDeviation: 1 },
              },
              { tagName: 'feOffset', attributes: { dx: 1, dy: 1 } },
              {
                tagName: 'feComponentTransfer',
                children: [
                  {
                    tagName: 'feFuncA',
                    attributes: { type: 'linear', slope: 0.3 },
                  },
                ],
              },
              {
                tagName: 'feMerge',
                children: [
                  { tagName: 'feMergeNode' },
                  {
                    tagName: 'feMergeNode',
                    attributes: { in: 'SourceGraphic' },
                  },
                ],
              },
            ],
          });
        };
        b.prototype.bodyFormatter = function (c) {
          return c.map(function (c) {
            var a = c.series.tooltipOptions;
            return (
              a[(c.point.formatPrefix || 'point') + 'Formatter'] ||
              c.point.tooltipFormatter
            ).call(
              c.point,
              a[(c.point.formatPrefix || 'point') + 'Format'] || ''
            );
          });
        };
        b.prototype.cleanSplit = function (c) {
          this.chart.series.forEach(function (a) {
            var g = a && a.tt;
            g && (!g.isActive || c ? (a.tt = g.destroy()) : (g.isActive = !1));
          });
        };
        b.prototype.defaultFormatter = function (c) {
          var a = this.points || m(this);
          var g = [c.tooltipFooterHeaderFormatter(a[0])];
          g = g.concat(c.bodyFormatter(a));
          g.push(c.tooltipFooterHeaderFormatter(a[0], !0));
          return g;
        };
        b.prototype.destroy = function () {
          this.label && (this.label = this.label.destroy());
          this.split &&
            this.tt &&
            (this.cleanSplit(!0), (this.tt = this.tt.destroy()));
          this.renderer &&
            ((this.renderer = this.renderer.destroy()), a(this.container));
          t.clearTimeout(this.hideTimer);
          t.clearTimeout(this.tooltipTimeout);
        };
        b.prototype.getAnchor = function (c, a) {
          var g = this.chart,
            d = g.pointer,
            b = g.inverted,
            h = g.plotTop,
            f = g.plotLeft,
            p,
            k,
            w = 0,
            e = 0;
          c = m(c);
          this.followPointer && a
            ? ('undefined' === typeof a.chartX && (a = d.normalize(a)),
              (d = [a.chartX - f, a.chartY - h]))
            : c[0].tooltipPos
              ? (d = c[0].tooltipPos)
              : (c.forEach(function (c) {
                  p = c.series.yAxis;
                  k = c.series.xAxis;
                  w += c.plotX || 0;
                  e += c.plotLow
                    ? (c.plotLow + (c.plotHigh || 0)) / 2
                    : c.plotY || 0;
                  k &&
                    p &&
                    (b
                      ? ((w += h + g.plotHeight - k.len - k.pos),
                        (e += f + g.plotWidth - p.len - p.pos))
                      : ((w += k.pos - f), (e += p.pos - h)));
                }),
                (w /= c.length),
                (e /= c.length),
                (d = [b ? g.plotWidth - e : w, b ? g.plotHeight - w : e]),
                this.shared &&
                  1 < c.length &&
                  a &&
                  (b ? (d[0] = a.chartX - f) : (d[1] = a.chartY - h)));
          return d.map(Math.round);
        };
        b.prototype.getLabel = function () {
          var c = this,
            a = this.chart.styledMode,
            g = this.options,
            b = this.split && this.allowShared,
            h = 'tooltip' + (d(g.className) ? ' ' + g.className : ''),
            f =
              g.style.pointerEvents ||
              (!this.followPointer && g.stickOnContact ? 'auto' : 'none'),
            m = function () {
              c.inContact = !0;
            },
            p = function (a) {
              var g = c.chart.hoverSeries;
              c.inContact =
                c.shouldStickOnContact() &&
                c.chart.pointer.inClass(a.relatedTarget, 'highcharts-tooltip');
              if (!c.inContact && g && g.onMouseOut) g.onMouseOut();
            },
            k,
            l = this.chart.renderer;
          if (c.label) {
            var r = !c.label.hasClass('highcharts-label');
            ((b && !r) || (!b && r)) && c.destroy();
          }
          if (!this.label) {
            if (this.outside) {
              r = this.chart.options.chart.style;
              var x = E.getRendererType();
              this.container = k = e.doc.createElement('div');
              k.className = 'highcharts-tooltip-container';
              n(k, {
                position: 'absolute',
                top: '1px',
                pointerEvents: f,
                zIndex: Math.max(
                  this.options.style.zIndex || 0,
                  ((r && r.zIndex) || 0) + 3
                ),
              });
              q(k, 'mouseenter', m);
              q(k, 'mouseleave', p);
              e.doc.body.appendChild(k);
              this.renderer = l = new x(
                k,
                0,
                0,
                r,
                void 0,
                void 0,
                l.styledMode
              );
            }
            b
              ? (this.label = l.g(h))
              : ((this.label = l
                  .label(
                    '',
                    0,
                    0,
                    g.shape,
                    void 0,
                    void 0,
                    g.useHTML,
                    void 0,
                    h
                  )
                  .attr({ padding: g.padding, r: g.borderRadius })),
                a ||
                  this.label
                    .attr({
                      fill: g.backgroundColor,
                      'stroke-width': g.borderWidth,
                    })
                    .css(g.style)
                    .css({ pointerEvents: f })
                    .shadow(g.shadow));
            a &&
              g.shadow &&
              (this.applyFilter(),
              this.label.attr({
                filter: 'url(#drop-shadow-' + this.chart.index + ')',
              }));
            if (c.outside && !c.split) {
              var y = this.label,
                B = y.xSetter,
                G = y.ySetter;
              y.xSetter = function (a) {
                B.call(y, c.distance);
                k.style.left = a + 'px';
              };
              y.ySetter = function (a) {
                G.call(y, c.distance);
                k.style.top = a + 'px';
              };
            }
            this.label
              .on('mouseenter', m)
              .on('mouseleave', p)
              .attr({ zIndex: 8 })
              .add();
          }
          return this.label;
        };
        b.prototype.getPosition = function (c, a, g) {
          var d = this.chart,
            b = this.distance,
            h = {},
            f = (d.inverted && g.h) || 0,
            m = this.outside,
            p = m ? C.documentElement.clientWidth - 2 * b : d.chartWidth,
            k = m
              ? Math.max(
                  C.body.scrollHeight,
                  C.documentElement.scrollHeight,
                  C.body.offsetHeight,
                  C.documentElement.offsetHeight,
                  C.documentElement.clientHeight
                )
              : d.chartHeight,
            w = d.pointer.getChartPosition(),
            e = function (h) {
              var f = 'x' === h;
              return [h, f ? p : k, f ? c : a].concat(
                m
                  ? [
                      f ? c * w.scaleX : a * w.scaleY,
                      f
                        ? w.left - b + (g.plotX + d.plotLeft) * w.scaleX
                        : w.top - b + (g.plotY + d.plotTop) * w.scaleY,
                      0,
                      f ? p : k,
                    ]
                  : [
                      f ? c : a,
                      f ? g.plotX + d.plotLeft : g.plotY + d.plotTop,
                      f ? d.plotLeft : d.plotTop,
                      f ? d.plotLeft + d.plotWidth : d.plotTop + d.plotHeight,
                    ]
              );
            },
            l = e('y'),
            n = e('x'),
            x;
          e = !!g.negative;
          !d.polar &&
            d.hoverSeries &&
            d.hoverSeries.yAxis &&
            d.hoverSeries.yAxis.reversed &&
            (e = !e);
          var y = !this.followPointer && r(g.ttBelow, !d.inverted === e),
            B = function (c, a, g, d, u, p, k) {
              var e = m ? ('y' === c ? b * w.scaleY : b * w.scaleX) : b,
                D = (g - d) / 2,
                F = d < u - b,
                l = u + b + d < a,
                r = u - e - g + D;
              u = u + e - D;
              if (y && l) h[c] = u;
              else if (!y && F) h[c] = r;
              else if (F) h[c] = Math.min(k - d, 0 > r - f ? r : r - f);
              else if (l) h[c] = Math.max(p, u + f + g > a ? u : u + f);
              else return !1;
            },
            q = function (c, a, g, d, f) {
              var u;
              f < b || f > a - b
                ? (u = !1)
                : (h[c] =
                    f < g / 2 ? 1 : f > a - d / 2 ? a - d - 2 : f - g / 2);
              return u;
            },
            G = function (c) {
              var a = l;
              l = n;
              n = a;
              x = c;
            },
            t = function () {
              !1 !== B.apply(0, l)
                ? !1 !== q.apply(0, n) || x || (G(!0), t())
                : x
                  ? (h.x = h.y = 0)
                  : (G(!0), t());
            };
          (d.inverted || 1 < this.len) && G();
          t();
          return h;
        };
        b.prototype.hide = function (c) {
          var a = this;
          t.clearTimeout(this.hideTimer);
          c = r(c, this.options.hideDelay);
          this.isHidden ||
            (this.hideTimer = h(function () {
              a.getLabel().fadeOut(c ? void 0 : c);
              a.isHidden = !0;
            }, c));
        };
        b.prototype.init = function (c, a) {
          this.chart = c;
          this.options = a;
          this.crosshairs = [];
          this.now = { x: 0, y: 0 };
          this.isHidden = !0;
          this.split = a.split && !c.inverted && !c.polar;
          this.shared = a.shared || this.split;
          this.outside = r(
            a.outside,
            !(!c.scrollablePixelsX && !c.scrollablePixelsY)
          );
        };
        b.prototype.shouldStickOnContact = function () {
          return !(this.followPointer || !this.options.stickOnContact);
        };
        b.prototype.isStickyOnContact = function () {
          return !(!this.shouldStickOnContact() || !this.inContact);
        };
        b.prototype.move = function (c, a, g, d) {
          var b = this,
            h = b.now,
            m =
              !1 !== b.options.animation &&
              !b.isHidden &&
              (1 < Math.abs(c - h.x) || 1 < Math.abs(a - h.y)),
            p = b.followPointer || 1 < b.len;
          f(h, {
            x: m ? (2 * h.x + c) / 3 : c,
            y: m ? (h.y + a) / 2 : a,
            anchorX: p ? void 0 : m ? (2 * h.anchorX + g) / 3 : g,
            anchorY: p ? void 0 : m ? (h.anchorY + d) / 2 : d,
          });
          b.getLabel().attr(h);
          b.drawTracker();
          m &&
            (t.clearTimeout(this.tooltipTimeout),
            (this.tooltipTimeout = setTimeout(function () {
              b && b.move(c, a, g, d);
            }, 32)));
        };
        b.prototype.refresh = function (c, a) {
          var g = this.chart,
            d = this.options,
            b = m(c),
            h = b[0],
            f = [],
            p = d.formatter || this.defaultFormatter,
            w = this.shared,
            e = g.styledMode,
            l = {};
          if (d.enabled && h.series) {
            t.clearTimeout(this.hideTimer);
            this.allowShared = !(!G(c) && c.series && c.series.noSharedTooltip);
            this.followPointer =
              !this.split && h.series.tooltipOptions.followPointer;
            c = this.getAnchor(c, a);
            var n = c[0],
              x = c[1];
            w && this.allowShared
              ? (g.pointer.applyInactiveState(b),
                b.forEach(function (c) {
                  c.setState('hover');
                  f.push(c.getLabelConfig());
                }),
                (l = { x: h.category, y: h.y }),
                (l.points = f))
              : (l = h.getLabelConfig());
            this.len = f.length;
            p = p.call(l, this);
            w = h.series;
            this.distance = r(w.tooltipOptions.distance, 16);
            if (!1 === p) this.hide();
            else {
              if (this.split && this.allowShared) this.renderSplit(p, b);
              else {
                var y = n,
                  B = x;
                a &&
                  g.pointer.isDirectTouch &&
                  ((y = a.chartX - g.plotLeft), (B = a.chartY - g.plotTop));
                if (
                  g.polar ||
                  !1 === w.options.clip ||
                  b.some(function (c) {
                    return c.series.shouldShowTooltip(y, B);
                  })
                )
                  (a = this.getLabel()),
                    (d.style.width && !e) ||
                      a.css({ width: this.chart.spacingBox.width + 'px' }),
                    a.attr({ text: p && p.join ? p.join('') : p }),
                    a
                      .removeClass(/highcharts-color-[\d]+/g)
                      .addClass(
                        'highcharts-color-' + r(h.colorIndex, w.colorIndex)
                      ),
                    e ||
                      a.attr({
                        stroke:
                          d.borderColor || h.color || w.color || '#666666',
                      }),
                    this.updatePosition({
                      plotX: n,
                      plotY: x,
                      negative: h.negative,
                      ttBelow: h.ttBelow,
                      h: c[2] || 0,
                    });
                else {
                  this.hide();
                  return;
                }
              }
              this.isHidden &&
                this.label &&
                this.label.attr({ opacity: 1 }).show();
              this.isHidden = !1;
            }
            k(this, 'refresh');
          }
        };
        b.prototype.renderSplit = function (c, a) {
          function g(c, a, g, b, h) {
            void 0 === h && (h = !0);
            g
              ? ((a = V ? 0 : J),
                (c = l(c - b / 2, Q.left, Q.right - b - (d.outside ? O : 0))))
              : ((a -= da),
                (c = h ? c - b - A : c + A),
                (c = l(c, h ? c : Q.left, Q.right)));
            return { x: c, y: a };
          }
          var d = this,
            b = d.chart,
            h = d.chart,
            m = h.chartWidth,
            p = h.chartHeight,
            k = h.plotHeight,
            w = h.plotLeft,
            e = h.plotTop,
            n = h.pointer,
            x = h.scrollablePixelsY;
          x = void 0 === x ? 0 : x;
          var y = h.scrollablePixelsX,
            q = h.scrollingContainer;
          q = void 0 === q ? { scrollLeft: 0, scrollTop: 0 } : q;
          var G = q.scrollLeft;
          q = q.scrollTop;
          var t = h.styledMode,
            A = d.distance,
            R = d.options,
            v = d.options.positioner,
            Q =
              d.outside && 'number' !== typeof y
                ? C.documentElement.getBoundingClientRect()
                : { left: G, right: G + m, top: q, bottom: q + p },
            E = d.getLabel(),
            I = this.renderer || b.renderer,
            V = !(!b.xAxis[0] || !b.xAxis[0].opposite);
          b = n.getChartPosition();
          var O = b.left;
          b = b.top;
          var da = e + q,
            ea = 0,
            J = k - x;
          B(c) && (c = [!1, c]);
          c = c.slice(0, a.length + 1).reduce(function (c, b, h) {
            if (!1 !== b && '' !== b) {
              h = a[h - 1] || {
                isHeader: !0,
                plotX: a[0].plotX,
                plotY: k,
                series: {},
              };
              var f = h.isHeader,
                u = f ? d : h.series;
              b = b.toString();
              var m = u.tt,
                p = h.isHeader;
              var D = h.series;
              var F =
                'highcharts-color-' + r(h.colorIndex, D.colorIndex, 'none');
              m ||
                ((m = { padding: R.padding, r: R.borderRadius }),
                t ||
                  ((m.fill = R.backgroundColor),
                  (m['stroke-width'] = R.borderWidth)),
                (m = I.label(
                  '',
                  0,
                  0,
                  R[p ? 'headerShape' : 'shape'],
                  void 0,
                  void 0,
                  R.useHTML
                )
                  .addClass(
                    (p ? 'highcharts-tooltip-header ' : '') +
                      'highcharts-tooltip-box ' +
                      F
                  )
                  .attr(m)
                  .add(E)));
              m.isActive = !0;
              m.attr({ text: b });
              t ||
                m
                  .css(R.style)
                  .shadow(R.shadow)
                  .attr({
                    stroke: R.borderColor || h.color || D.color || '#333333',
                  });
              u = u.tt = m;
              p = u.getBBox();
              b = p.width + u.strokeWidth();
              f && ((ea = p.height), (J += ea), V && (da -= ea));
              D = h.plotX;
              D = void 0 === D ? 0 : D;
              F = h.plotY;
              F = void 0 === F ? 0 : F;
              m = h.series;
              if (h.isHeader) {
                D = w + D;
                var n = e + k / 2;
              } else {
                var H = m.xAxis,
                  x = m.yAxis;
                D = H.pos + l(D, -A, H.len + A);
                m.shouldShowTooltip(0, x.pos - e + F, { ignoreX: !0 }) &&
                  (n = x.pos + F);
              }
              D = l(D, Q.left - A, Q.right + A);
              'number' === typeof n
                ? ((p = p.height + 1),
                  (F = v ? v.call(d, b, p, h) : g(D, n, f, b)),
                  c.push({
                    align: v ? 0 : void 0,
                    anchorX: D,
                    anchorY: n,
                    boxWidth: b,
                    point: h,
                    rank: r(F.rank, f ? 1 : 0),
                    size: p,
                    target: F.y,
                    tt: u,
                    x: F.x,
                  }))
                : (u.isActive = !1);
            }
            return c;
          }, []);
          !v &&
            c.some(function (c) {
              var a = (d.outside ? O : 0) + c.anchorX;
              return a < Q.left && a + c.boxWidth < Q.right
                ? !0
                : a < O - Q.left + c.boxWidth && Q.right - a > a;
            }) &&
            (c = c.map(function (c) {
              var a = g(c.anchorX, c.anchorY, c.point.isHeader, c.boxWidth, !1);
              return f(c, { target: a.y, x: a.x });
            }));
          d.cleanSplit();
          z(c, J);
          var ba = O,
            fa = O;
          c.forEach(function (c) {
            var a = c.x,
              g = c.boxWidth;
            c = c.isHeader;
            c ||
              (d.outside && O + a < ba && (ba = O + a),
              !c && d.outside && ba + g > fa && (fa = O + a));
          });
          c.forEach(function (c) {
            var a = c.x,
              g = c.anchorX,
              b = c.pos,
              h = c.point.isHeader;
            b = {
              visibility: 'undefined' === typeof b ? 'hidden' : 'inherit',
              x: a,
              y: b + da,
              anchorX: g,
              anchorY: c.anchorY,
            };
            if (d.outside && a < g) {
              var f = O - ba;
              0 < f &&
                (h || ((b.x = a + f), (b.anchorX = g + f)),
                h && ((b.x = (fa - ba) / 2), (b.anchorX = g + f)));
            }
            c.tt.attr(b);
          });
          c = d.container;
          x = d.renderer;
          d.outside &&
            c &&
            x &&
            ((h = E.getBBox()),
            x.setSize(h.width + h.x, h.height + h.y, !1),
            (c.style.left = ba + 'px'),
            (c.style.top = b + 'px'));
        };
        b.prototype.drawTracker = function () {
          if (this.followPointer || !this.options.stickOnContact)
            this.tracker && this.tracker.destroy();
          else {
            var c = this.chart,
              a = this.label,
              g = this.shared ? c.hoverPoints : c.hoverPoint;
            if (a && g) {
              var d = { x: 0, y: 0, width: 0, height: 0 };
              g = this.getAnchor(g);
              var b = a.getBBox();
              g[0] += c.plotLeft - a.translateX;
              g[1] += c.plotTop - a.translateY;
              d.x = Math.min(0, g[0]);
              d.y = Math.min(0, g[1]);
              d.width =
                0 > g[0]
                  ? Math.max(Math.abs(g[0]), b.width - g[0])
                  : Math.max(Math.abs(g[0]), b.width);
              d.height =
                0 > g[1]
                  ? Math.max(Math.abs(g[1]), b.height - Math.abs(g[1]))
                  : Math.max(Math.abs(g[1]), b.height);
              this.tracker
                ? this.tracker.attr(d)
                : ((this.tracker = a.renderer
                    .rect(d)
                    .addClass('highcharts-tracker')
                    .add(a)),
                  c.styledMode || this.tracker.attr({ fill: 'rgba(0,0,0,0)' }));
            }
          }
        };
        b.prototype.styledModeFormat = function (c) {
          return c
            .replace('style="font-size: 10px"', 'class="highcharts-header"')
            .replace(
              /style="color:{(point|series)\.color}"/g,
              'class="highcharts-color-{$1.colorIndex}"'
            );
        };
        b.prototype.tooltipFooterHeaderFormatter = function (c, a) {
          var g = c.series,
            d = g.tooltipOptions,
            b = g.xAxis,
            h = b && b.dateTime;
          b = { isFooter: a, labelConfig: c };
          var f = d.xDateFormat,
            m = d[a ? 'footerFormat' : 'headerFormat'];
          k(this, 'headerFormatter', b, function (a) {
            h &&
              !f &&
              y(c.key) &&
              (f = h.getXDateFormat(c.key, d.dateTimeLabelFormats));
            h &&
              f &&
              ((c.point && c.point.tooltipDateKeys) || ['key']).forEach(
                function (c) {
                  m = m.replace(
                    '{point.' + c + '}',
                    '{point.' + c + ':' + f + '}'
                  );
                }
              );
            g.chart.styledMode && (m = this.styledModeFormat(m));
            a.text = A(m, { point: c, series: g }, this.chart);
          });
          return b.text;
        };
        b.prototype.update = function (c) {
          this.destroy();
          x(!0, this.chart.options.tooltip.userOptions, c);
          this.init(this.chart, x(!0, this.options, c));
        };
        b.prototype.updatePosition = function (c) {
          var a = this.chart,
            g = this.options,
            d = a.pointer,
            b = this.getLabel();
          d = d.getChartPosition();
          var h = (g.positioner || this.getPosition).call(
              this,
              b.width,
              b.height,
              c
            ),
            f = c.plotX + a.plotLeft;
          c = c.plotY + a.plotTop;
          if (this.outside) {
            g = g.borderWidth + 2 * this.distance;
            this.renderer.setSize(b.width + g, b.height + g, !1);
            if (1 !== d.scaleX || 1 !== d.scaleY)
              n(this.container, {
                transform: 'scale(' + d.scaleX + ', ' + d.scaleY + ')',
              }),
                (f *= d.scaleX),
                (c *= d.scaleY);
            f += d.left - h.x;
            c += d.top - h.y;
          }
          this.move(Math.round(h.x), Math.round(h.y || 0), f, c);
        };
        return b;
      })();
      ('');
      return b;
    }
  );
  J(
    e,
    'Core/Series/Point.js',
    [
      e['Core/Renderer/HTML/AST.js'],
      e['Core/Animation/AnimationUtilities.js'],
      e['Core/DefaultOptions.js'],
      e['Core/FormatUtilities.js'],
      e['Core/Utilities.js'],
    ],
    function (b, e, v, E, t) {
      var A = e.animObject,
        C = v.defaultOptions,
        z = E.format,
        q = t.addEvent,
        l = t.defined,
        n = t.erase,
        d = t.extend,
        a = t.fireEvent,
        f = t.getNestedProperty,
        k = t.isArray,
        G = t.isFunction,
        y = t.isNumber,
        B = t.isObject,
        x = t.merge,
        r = t.objectEach,
        m = t.pick,
        h = t.syncTimeout,
        p = t.removeEvent,
        c = t.uniqueKey;
      e = (function () {
        function e() {
          this.colorIndex = this.category = void 0;
          this.formatPrefix = 'point';
          this.id = void 0;
          this.isNull = !1;
          this.percentage = this.options = this.name = void 0;
          this.selected = !1;
          this.total = this.series = void 0;
          this.visible = !0;
          this.x = void 0;
        }
        e.prototype.animateBeforeDestroy = function () {
          var c = this,
            a = { x: c.startXPos, opacity: 0 },
            b = c.getGraphicalProps();
          b.singular.forEach(function (g) {
            c[g] = c[g].animate(
              'dataLabel' === g
                ? { x: c[g].startXPos, y: c[g].startYPos, opacity: 0 }
                : a
            );
          });
          b.plural.forEach(function (a) {
            c[a].forEach(function (a) {
              a.element &&
                a.animate(
                  d(
                    { x: c.startXPos },
                    a.startYPos ? { x: a.startXPos, y: a.startYPos } : {}
                  )
                );
            });
          });
        };
        e.prototype.applyOptions = function (c, a) {
          var g = this.series,
            b = g.options.pointValKey || g.pointValKey;
          c = e.prototype.optionsToObject.call(this, c);
          d(this, c);
          this.options = this.options ? d(this.options, c) : c;
          c.group && delete this.group;
          c.dataLabels && delete this.dataLabels;
          b && (this.y = e.prototype.getNestedProperty.call(this, b));
          this.formatPrefix = (this.isNull = m(
            this.isValid && !this.isValid(),
            null === this.x || !y(this.y)
          ))
            ? 'null'
            : 'point';
          this.selected && (this.state = 'select');
          'name' in this &&
            'undefined' === typeof a &&
            g.xAxis &&
            g.xAxis.hasNames &&
            (this.x = g.xAxis.nameToX(this));
          'undefined' === typeof this.x && g
            ? (this.x = 'undefined' === typeof a ? g.autoIncrement() : a)
            : y(c.x) &&
              g.options.relativeXValue &&
              (this.x = g.autoIncrement(c.x));
          return this;
        };
        e.prototype.destroy = function () {
          function c() {
            if (a.graphic || a.dataLabel || a.dataLabels)
              p(a), a.destroyElements();
            for (k in a) a[k] = null;
          }
          var a = this,
            d = a.series,
            b = d.chart;
          d = d.options.dataSorting;
          var f = b.hoverPoints,
            m = A(a.series.chart.renderer.globalAnimation),
            k;
          a.legendItem && b.legend.destroyItem(a);
          f && (a.setState(), n(f, a), f.length || (b.hoverPoints = null));
          if (a === b.hoverPoint) a.onMouseOut();
          d && d.enabled
            ? (this.animateBeforeDestroy(), h(c, m.duration))
            : c();
          b.pointCount--;
        };
        e.prototype.destroyElements = function (c) {
          var a = this;
          c = a.getGraphicalProps(c);
          c.singular.forEach(function (c) {
            a[c] = a[c].destroy();
          });
          c.plural.forEach(function (c) {
            a[c].forEach(function (c) {
              c.element && c.destroy();
            });
            delete a[c];
          });
        };
        e.prototype.firePointEvent = function (c, d, b) {
          var g = this,
            h = this.series.options;
          (h.point.events[c] ||
            (g.options && g.options.events && g.options.events[c])) &&
            g.importEvents();
          'click' === c &&
            h.allowPointSelect &&
            (b = function (c) {
              g.select && g.select(null, c.ctrlKey || c.metaKey || c.shiftKey);
            });
          a(g, c, d, b);
        };
        e.prototype.getClassName = function () {
          return (
            'highcharts-point' +
            (this.selected ? ' highcharts-point-select' : '') +
            (this.negative ? ' highcharts-negative' : '') +
            (this.isNull ? ' highcharts-null-point' : '') +
            ('undefined' !== typeof this.colorIndex
              ? ' highcharts-color-' + this.colorIndex
              : '') +
            (this.options.className ? ' ' + this.options.className : '') +
            (this.zone && this.zone.className
              ? ' ' + this.zone.className.replace('highcharts-negative', '')
              : '')
          );
        };
        e.prototype.getGraphicalProps = function (c) {
          var a = this,
            g = [],
            d = { singular: [], plural: [] },
            b;
          c = c || { graphic: 1, dataLabel: 1 };
          c.graphic && g.push('graphic', 'upperGraphic', 'shadowGroup');
          c.dataLabel && g.push('dataLabel', 'dataLabelUpper', 'connector');
          for (b = g.length; b--; ) {
            var h = g[b];
            a[h] && d.singular.push(h);
          }
          ['dataLabel', 'connector'].forEach(function (g) {
            var b = g + 's';
            c[g] && a[b] && d.plural.push(b);
          });
          return d;
        };
        e.prototype.getLabelConfig = function () {
          return {
            x: this.category,
            y: this.y,
            color: this.color,
            colorIndex: this.colorIndex,
            key: this.name || this.category,
            series: this.series,
            point: this,
            percentage: this.percentage,
            total: this.total || this.stackTotal,
          };
        };
        e.prototype.getNestedProperty = function (c) {
          if (c)
            return 0 === c.indexOf('custom.') ? f(c, this.options) : this[c];
        };
        e.prototype.getZone = function () {
          var c = this.series,
            a = c.zones;
          c = c.zoneAxis || 'y';
          var d,
            b = 0;
          for (d = a[b]; this[c] >= d.value; ) d = a[++b];
          this.nonZonedColor || (this.nonZonedColor = this.color);
          this.color =
            d && d.color && !this.options.color ? d.color : this.nonZonedColor;
          return d;
        };
        e.prototype.hasNewShapeType = function () {
          return (
            (this.graphic &&
              (this.graphic.symbolName || this.graphic.element.nodeName)) !==
            this.shapeType
          );
        };
        e.prototype.init = function (g, d, b) {
          this.series = g;
          this.applyOptions(d, b);
          this.id = l(this.id) ? this.id : c();
          this.resolveColor();
          g.chart.pointCount++;
          a(this, 'afterInit');
          return this;
        };
        e.prototype.optionsToObject = function (c) {
          var a = this.series,
            g = a.options.keys,
            d = g || a.pointArrayMap || ['y'],
            b = d.length,
            h = {},
            f = 0,
            m = 0;
          if (y(c) || null === c) h[d[0]] = c;
          else if (k(c))
            for (
              !g &&
              c.length > b &&
              ((a = typeof c[0]),
              'string' === a ? (h.name = c[0]) : 'number' === a && (h.x = c[0]),
              f++);
              m < b;

            )
              (g && 'undefined' === typeof c[f]) ||
                (0 < d[m].indexOf('.')
                  ? e.prototype.setNestedProperty(h, c[f], d[m])
                  : (h[d[m]] = c[f])),
                f++,
                m++;
          else
            'object' === typeof c &&
              ((h = c),
              c.dataLabels && (a._hasPointLabels = !0),
              c.marker && (a._hasPointMarkers = !0));
          return h;
        };
        e.prototype.resolveColor = function () {
          var c = this.series,
            a = c.chart.styledMode;
          var d = c.chart.options.chart.colorCount;
          delete this.nonZonedColor;
          if (c.options.colorByPoint) {
            if (!a) {
              d = c.options.colors || c.chart.options.colors;
              var b = d[c.colorCounter];
              d = d.length;
            }
            a = c.colorCounter;
            c.colorCounter++;
            c.colorCounter === d && (c.colorCounter = 0);
          } else a || (b = c.color), (a = c.colorIndex);
          this.colorIndex = m(this.options.colorIndex, a);
          this.color = m(this.options.color, b);
        };
        e.prototype.setNestedProperty = function (c, a, d) {
          d.split('.').reduce(function (c, d, g, b) {
            c[d] = b.length - 1 === g ? a : B(c[d], !0) ? c[d] : {};
            return c[d];
          }, c);
          return c;
        };
        e.prototype.tooltipFormatter = function (c) {
          var a = this.series,
            d = a.tooltipOptions,
            g = m(d.valueDecimals, ''),
            b = d.valuePrefix || '',
            h = d.valueSuffix || '';
          a.chart.styledMode && (c = a.chart.tooltip.styledModeFormat(c));
          (a.pointArrayMap || ['y']).forEach(function (a) {
            a = '{point.' + a;
            if (b || h) c = c.replace(RegExp(a + '}', 'g'), b + a + '}' + h);
            c = c.replace(RegExp(a + '}', 'g'), a + ':,.' + g + 'f}');
          });
          return z(c, { point: this, series: this.series }, a.chart);
        };
        e.prototype.update = function (c, a, d, b) {
          function g() {
            h.applyOptions(c);
            var g = p && h.hasDummyGraphic;
            g = null === h.y ? !g : g;
            p && g && ((h.graphic = p.destroy()), delete h.hasDummyGraphic);
            B(c, !0) &&
              (p &&
                p.element &&
                c &&
                c.marker &&
                'undefined' !== typeof c.marker.symbol &&
                (h.graphic = p.destroy()),
              c &&
                c.dataLabels &&
                h.dataLabel &&
                (h.dataLabel = h.dataLabel.destroy()),
              h.connector && (h.connector = h.connector.destroy()));
            e = h.index;
            f.updateParallelArrays(h, e);
            k.data[e] =
              B(k.data[e], !0) || B(c, !0) ? h.options : m(c, k.data[e]);
            f.isDirty = f.isDirtyData = !0;
            !f.fixedBox && f.hasCartesianSeries && (u.isDirtyBox = !0);
            'point' === k.legendType && (u.isDirtyLegend = !0);
            a && u.redraw(d);
          }
          var h = this,
            f = h.series,
            p = h.graphic,
            u = f.chart,
            k = f.options,
            e;
          a = m(a, !0);
          !1 === b ? g() : h.firePointEvent('update', { options: c }, g);
        };
        e.prototype.remove = function (c, a) {
          this.series.removePoint(this.series.data.indexOf(this), c, a);
        };
        e.prototype.select = function (c, a) {
          var d = this,
            g = d.series,
            b = g.chart;
          this.selectedStaging = c = m(c, !d.selected);
          d.firePointEvent(
            c ? 'select' : 'unselect',
            { accumulate: a },
            function () {
              d.selected = d.options.selected = c;
              g.options.data[g.data.indexOf(d)] = d.options;
              d.setState(c && 'select');
              a ||
                b.getSelectedPoints().forEach(function (c) {
                  var a = c.series;
                  c.selected &&
                    c !== d &&
                    ((c.selected = c.options.selected = !1),
                    (a.options.data[a.data.indexOf(c)] = c.options),
                    c.setState(
                      b.hoverPoints && a.options.inactiveOtherPoints
                        ? 'inactive'
                        : ''
                    ),
                    c.firePointEvent('unselect'));
                });
            }
          );
          delete this.selectedStaging;
        };
        e.prototype.onMouseOver = function (c) {
          var a = this.series.chart,
            d = a.pointer;
          c = c
            ? d.normalize(c)
            : d.getChartCoordinatesFromPoint(this, a.inverted);
          d.runPointActions(c, this);
        };
        e.prototype.onMouseOut = function () {
          var c = this.series.chart;
          this.firePointEvent('mouseOut');
          this.series.options.inactiveOtherPoints ||
            (c.hoverPoints || []).forEach(function (c) {
              c.setState();
            });
          c.hoverPoints = c.hoverPoint = null;
        };
        e.prototype.importEvents = function () {
          if (!this.hasImportedEvents) {
            var c = this,
              a = x(c.series.options.point, c.options).events;
            c.events = a;
            r(a, function (a, d) {
              G(a) && q(c, d, a);
            });
            this.hasImportedEvents = !0;
          }
        };
        e.prototype.setState = function (c, h) {
          var g = this.series,
            f = this.state,
            p = g.options.states[c || 'normal'] || {},
            k = C.plotOptions[g.type].marker && g.options.marker,
            e = k && !1 === k.enabled,
            w = (k && k.states && k.states[c || 'normal']) || {},
            l = !1 === w.enabled,
            r = this.marker || {},
            n = g.chart,
            x = k && g.markerAttribs,
            F = g.halo,
            B,
            q = g.stateMarkerGraphic;
          c = c || '';
          if (
            !(
              (c === this.state && !h) ||
              (this.selected && 'select' !== c) ||
              !1 === p.enabled ||
              (c && (l || (e && !1 === w.enabled))) ||
              (c && r.states && r.states[c] && !1 === r.states[c].enabled)
            )
          ) {
            this.state = c;
            x && (B = g.markerAttribs(this, c));
            if (this.graphic && !this.hasDummyGraphic) {
              f && this.graphic.removeClass('highcharts-point-' + f);
              c && this.graphic.addClass('highcharts-point-' + c);
              if (!n.styledMode) {
                var G = g.pointAttribs(this, c);
                var R = m(n.options.chart.animation, p.animation);
                g.options.inactiveOtherPoints &&
                  y(G.opacity) &&
                  ((this.dataLabels || []).forEach(function (c) {
                    c && c.animate({ opacity: G.opacity }, R);
                  }),
                  this.connector &&
                    this.connector.animate({ opacity: G.opacity }, R));
                this.graphic.animate(G, R);
              }
              B &&
                this.graphic.animate(
                  B,
                  m(n.options.chart.animation, w.animation, k.animation)
                );
              q && q.hide();
            } else {
              if (c && w) {
                f = r.symbol || g.symbol;
                q && q.currentSymbol !== f && (q = q.destroy());
                if (B)
                  if (q) q[h ? 'animate' : 'attr']({ x: B.x, y: B.y });
                  else
                    f &&
                      ((g.stateMarkerGraphic = q =
                        n.renderer
                          .symbol(f, B.x, B.y, B.width, B.height)
                          .add(g.markerGroup)),
                      (q.currentSymbol = f));
                !n.styledMode &&
                  q &&
                  'inactive' !== this.state &&
                  q.attr(g.pointAttribs(this, c));
              }
              q &&
                (q[c && this.isInside ? 'show' : 'hide'](),
                (q.element.point = this),
                q.addClass(this.getClassName(), !0));
            }
            p = p.halo;
            B = ((q = this.graphic || q) && q.visibility) || 'inherit';
            p && p.size && q && 'hidden' !== B && !this.isCluster
              ? (F || (g.halo = F = n.renderer.path().add(q.parentGroup)),
                F.show()[h ? 'animate' : 'attr']({ d: this.haloPath(p.size) }),
                F.attr({
                  class:
                    'highcharts-halo highcharts-color-' +
                    m(this.colorIndex, g.colorIndex) +
                    (this.className ? ' ' + this.className : ''),
                  visibility: B,
                  zIndex: -1,
                }),
                (F.point = this),
                n.styledMode ||
                  F.attr(
                    d(
                      {
                        fill: this.color || g.color,
                        'fill-opacity': p.opacity,
                      },
                      b.filterUserAttributes(p.attributes || {})
                    )
                  ))
              : F &&
                F.point &&
                F.point.haloPath &&
                F.animate({ d: F.point.haloPath(0) }, null, F.hide);
            a(this, 'afterSetState', { state: c });
          }
        };
        e.prototype.haloPath = function (c) {
          return this.series.chart.renderer.symbols.circle(
            Math.floor(this.plotX) - c,
            this.plotY - c,
            2 * c,
            2 * c
          );
        };
        return e;
      })();
      ('');
      return e;
    }
  );
  J(
    e,
    'Core/Pointer.js',
    [
      e['Core/Color/Color.js'],
      e['Core/Globals.js'],
      e['Core/Tooltip.js'],
      e['Core/Utilities.js'],
    ],
    function (b, e, v, E) {
      var t = b.parse,
        A = e.charts,
        C = e.noop,
        z = E.addEvent,
        q = E.attr,
        l = E.css,
        n = E.defined,
        d = E.extend,
        a = E.find,
        f = E.fireEvent,
        k = E.isNumber,
        G = E.isObject,
        y = E.objectEach,
        B = E.offset,
        x = E.pick,
        r = E.splat;
      b = (function () {
        function b(a, d) {
          this.lastValidTouch = {};
          this.pinchDown = [];
          this.runChartClick = !1;
          this.eventsToUnbind = [];
          this.chart = a;
          this.hasDragged = !1;
          this.options = d;
          this.init(a, d);
        }
        b.prototype.applyInactiveState = function (a) {
          var d = [],
            c;
          (a || []).forEach(function (a) {
            c = a.series;
            d.push(c);
            c.linkedParent && d.push(c.linkedParent);
            c.linkedSeries && (d = d.concat(c.linkedSeries));
            c.navigatorSeries && d.push(c.navigatorSeries);
          });
          this.chart.series.forEach(function (c) {
            -1 === d.indexOf(c)
              ? c.setState('inactive', !0)
              : c.options.inactiveOtherPoints &&
                c.setAllPointsToState('inactive');
          });
        };
        b.prototype.destroy = function () {
          var a = this;
          this.eventsToUnbind.forEach(function (a) {
            return a();
          });
          this.eventsToUnbind = [];
          e.chartCount ||
            (b.unbindDocumentMouseUp &&
              (b.unbindDocumentMouseUp = b.unbindDocumentMouseUp()),
            b.unbindDocumentTouchEnd &&
              (b.unbindDocumentTouchEnd = b.unbindDocumentTouchEnd()));
          clearInterval(a.tooltipTimeout);
          y(a, function (d, c) {
            a[c] = void 0;
          });
        };
        b.prototype.drag = function (a) {
          var d = this.chart,
            c = d.options.chart,
            b = this.zoomHor,
            g = this.zoomVert,
            h = d.plotLeft,
            f = d.plotTop,
            k = d.plotWidth,
            m = d.plotHeight,
            e = this.mouseDownX || 0,
            l = this.mouseDownY || 0,
            r = G(c.panning) ? c.panning && c.panning.enabled : c.panning,
            n = c.panKey && a[c.panKey + 'Key'],
            x = a.chartX,
            y = a.chartY,
            B = this.selectionMarker;
          if (!B || !B.touch)
            if (
              (x < h ? (x = h) : x > h + k && (x = h + k),
              y < f ? (y = f) : y > f + m && (y = f + m),
              (this.hasDragged = Math.sqrt(
                Math.pow(e - x, 2) + Math.pow(l - y, 2)
              )),
              10 < this.hasDragged)
            ) {
              var q = d.isInsidePlot(e - h, l - f, { visiblePlotOnly: !0 });
              (!d.hasCartesianSeries && !d.mapView) ||
                (!this.zoomX && !this.zoomY) ||
                !q ||
                n ||
                B ||
                ((this.selectionMarker = B =
                  d.renderer
                    .rect(h, f, b ? 1 : k, g ? 1 : m, 0)
                    .attr({ class: 'highcharts-selection-marker', zIndex: 7 })
                    .add()),
                d.styledMode ||
                  B.attr({
                    fill:
                      c.selectionMarkerFill ||
                      t('#335cad').setOpacity(0.25).get(),
                  }));
              B &&
                b &&
                ((b = x - e),
                B.attr({ width: Math.abs(b), x: (0 < b ? 0 : b) + e }));
              B &&
                g &&
                ((b = y - l),
                B.attr({ height: Math.abs(b), y: (0 < b ? 0 : b) + l }));
              q && !B && r && d.pan(a, c.panning);
            }
        };
        b.prototype.dragStart = function (a) {
          var d = this.chart;
          d.mouseIsDown = a.type;
          d.cancelClick = !1;
          d.mouseDownX = this.mouseDownX = a.chartX;
          d.mouseDownY = this.mouseDownY = a.chartY;
        };
        b.prototype.drop = function (a) {
          var b = this,
            c = this.chart,
            h = this.hasPinched;
          if (this.selectionMarker) {
            var g = this.selectionMarker,
              m = g.attr ? g.attr('x') : g.x,
              u = g.attr ? g.attr('y') : g.y,
              e = g.attr ? g.attr('width') : g.width,
              r = g.attr ? g.attr('height') : g.height,
              x = {
                originalEvent: a,
                xAxis: [],
                yAxis: [],
                x: m,
                y: u,
                width: e,
                height: r,
              },
              y = !!c.mapView;
            if (this.hasDragged || h)
              c.axes.forEach(function (c) {
                if (
                  c.zoomEnabled &&
                  n(c.min) &&
                  (h || b[{ xAxis: 'zoomX', yAxis: 'zoomY' }[c.coll]]) &&
                  k(m) &&
                  k(u)
                ) {
                  var d = c.horiz,
                    g = 'touchend' === a.type ? c.minPixelPadding : 0,
                    f = c.toValue((d ? m : u) + g);
                  d = c.toValue((d ? m + e : u + r) - g);
                  x[c.coll].push({
                    axis: c,
                    min: Math.min(f, d),
                    max: Math.max(f, d),
                  });
                  y = !0;
                }
              }),
                y &&
                  f(c, 'selection', x, function (a) {
                    c.zoom(d(a, h ? { animation: !1 } : null));
                  });
            k(c.index) &&
              (this.selectionMarker = this.selectionMarker.destroy());
            h && this.scaleGroups();
          }
          c &&
            k(c.index) &&
            (l(c.container, { cursor: c._cursor }),
            (c.cancelClick = 10 < this.hasDragged),
            (c.mouseIsDown = this.hasDragged = this.hasPinched = !1),
            (this.pinchDown = []));
        };
        b.prototype.findNearestKDPoint = function (a, d, c) {
          var b = this.chart,
            g = b.hoverPoint;
          b = b.tooltip;
          if (g && b && b.isStickyOnContact()) return g;
          var h;
          a.forEach(function (a) {
            var b =
              !(a.noSharedTooltip && d) &&
              0 > a.options.findNearestPointBy.indexOf('y');
            a = a.searchPoint(c, b);
            if ((b = G(a, !0) && a.series) && !(b = !G(h, !0))) {
              b = h.distX - a.distX;
              var g = h.dist - a.dist,
                f =
                  (a.series.group && a.series.group.zIndex) -
                  (h.series.group && h.series.group.zIndex);
              b =
                0 <
                (0 !== b && d
                  ? b
                  : 0 !== g
                    ? g
                    : 0 !== f
                      ? f
                      : h.series.index > a.series.index
                        ? -1
                        : 1);
            }
            b && (h = a);
          });
          return h;
        };
        b.prototype.getChartCoordinatesFromPoint = function (a, d) {
          var c = a.series,
            b = c.xAxis;
          c = c.yAxis;
          var g = a.shapeArgs;
          if (b && c) {
            var h = x(a.clientX, a.plotX),
              f = a.plotY || 0;
            a.isNode && g && k(g.x) && k(g.y) && ((h = g.x), (f = g.y));
            return d
              ? { chartX: c.len + c.pos - f, chartY: b.len + b.pos - h }
              : { chartX: h + b.pos, chartY: f + c.pos };
          }
          if (g && g.x && g.y) return { chartX: g.x, chartY: g.y };
        };
        b.prototype.getChartPosition = function () {
          if (this.chartPosition) return this.chartPosition;
          var a = this.chart.container,
            d = B(a);
          this.chartPosition = {
            left: d.left,
            top: d.top,
            scaleX: 1,
            scaleY: 1,
          };
          var c = a.offsetWidth;
          a = a.offsetHeight;
          2 < c &&
            2 < a &&
            ((this.chartPosition.scaleX = d.width / c),
            (this.chartPosition.scaleY = d.height / a));
          return this.chartPosition;
        };
        b.prototype.getCoordinates = function (a) {
          var d = { xAxis: [], yAxis: [] };
          this.chart.axes.forEach(function (c) {
            d[c.isXAxis ? 'xAxis' : 'yAxis'].push({
              axis: c,
              value: c.toValue(a[c.horiz ? 'chartX' : 'chartY']),
            });
          });
          return d;
        };
        b.prototype.getHoverData = function (d, b, c, m, g, k) {
          var h = [];
          m = !(!m || !d);
          var p = {
            chartX: k ? k.chartX : void 0,
            chartY: k ? k.chartY : void 0,
            shared: g,
          };
          f(this, 'beforeGetHoverData', p);
          var e =
            b && !b.stickyTracking
              ? [b]
              : c.filter(function (c) {
                  return p.filter
                    ? p.filter(c)
                    : c.visible &&
                        !(!g && c.directTouch) &&
                        x(c.options.enableMouseTracking, !0) &&
                        c.stickyTracking;
                });
          var l = m || !k ? d : this.findNearestKDPoint(e, g, k);
          b = l && l.series;
          l &&
            (g && !b.noSharedTooltip
              ? ((e = c.filter(function (c) {
                  return p.filter
                    ? p.filter(c)
                    : c.visible &&
                        !(!g && c.directTouch) &&
                        x(c.options.enableMouseTracking, !0) &&
                        !c.noSharedTooltip;
                })),
                e.forEach(function (c) {
                  var d = a(c.points, function (c) {
                    return c.x === l.x && !c.isNull;
                  });
                  G(d) &&
                    (c.chart.isBoosting && (d = c.getPoint(d)), h.push(d));
                }))
              : h.push(l));
          p = { hoverPoint: l };
          f(this, 'afterGetHoverData', p);
          return { hoverPoint: p.hoverPoint, hoverSeries: b, hoverPoints: h };
        };
        b.prototype.getPointFromEvent = function (a) {
          a = a.target;
          for (var d; a && !d; ) (d = a.point), (a = a.parentNode);
          return d;
        };
        b.prototype.onTrackerMouseOut = function (a) {
          a = a.relatedTarget || a.toElement;
          var d = this.chart.hoverSeries;
          this.isDirectTouch = !1;
          if (
            !(
              !d ||
              !a ||
              d.stickyTracking ||
              this.inClass(a, 'highcharts-tooltip') ||
              (this.inClass(a, 'highcharts-series-' + d.index) &&
                this.inClass(a, 'highcharts-tracker'))
            )
          )
            d.onMouseOut();
        };
        b.prototype.inClass = function (a, d) {
          for (var c; a; ) {
            if ((c = q(a, 'class'))) {
              if (-1 !== c.indexOf(d)) return !0;
              if (-1 !== c.indexOf('highcharts-container')) return !1;
            }
            a = a.parentElement;
          }
        };
        b.prototype.init = function (a, d) {
          this.options = d;
          this.chart = a;
          this.runChartClick = !(!d.chart.events || !d.chart.events.click);
          this.pinchDown = [];
          this.lastValidTouch = {};
          v &&
            ((a.tooltip = new v(a, d.tooltip)),
            (this.followTouchMove = x(d.tooltip.followTouchMove, !0)));
          this.setDOMEvents();
        };
        b.prototype.normalize = function (a, b) {
          var c = a.touches,
            h = c
              ? c.length
                ? c.item(0)
                : x(c.changedTouches, a.changedTouches)[0]
              : a;
          b || (b = this.getChartPosition());
          c = h.pageX - b.left;
          h = h.pageY - b.top;
          c /= b.scaleX;
          h /= b.scaleY;
          return d(a, { chartX: Math.round(c), chartY: Math.round(h) });
        };
        b.prototype.onContainerClick = function (a) {
          var b = this.chart,
            c = b.hoverPoint;
          a = this.normalize(a);
          var h = b.plotLeft,
            g = b.plotTop;
          b.cancelClick ||
            (c && this.inClass(a.target, 'highcharts-tracker')
              ? (f(c.series, 'click', d(a, { point: c })),
                b.hoverPoint && c.firePointEvent('click', a))
              : (d(a, this.getCoordinates(a)),
                b.isInsidePlot(a.chartX - h, a.chartY - g, {
                  visiblePlotOnly: !0,
                }) && f(b, 'click', a)));
        };
        b.prototype.onContainerMouseDown = function (a) {
          var d = 1 === ((a.buttons || a.button) & 1);
          a = this.normalize(a);
          if (e.isFirefox && 0 !== a.button) this.onContainerMouseMove(a);
          if ('undefined' === typeof a.button || d)
            this.zoomOption(a),
              d && a.preventDefault && a.preventDefault(),
              this.dragStart(a);
        };
        b.prototype.onContainerMouseLeave = function (a) {
          var d = A[x(b.hoverChartIndex, -1)],
            c = this.chart.tooltip;
          (c &&
            c.shouldStickOnContact() &&
            this.inClass(a.relatedTarget, 'highcharts-tooltip-container')) ||
            ((a = this.normalize(a)),
            d &&
              (a.relatedTarget || a.toElement) &&
              (d.pointer.reset(), (d.pointer.chartPosition = void 0)),
            c && !c.isHidden && this.reset());
        };
        b.prototype.onContainerMouseEnter = function (a) {
          delete this.chartPosition;
        };
        b.prototype.onContainerMouseMove = function (a) {
          var d = this.chart;
          a = this.normalize(a);
          this.setHoverChartIndex();
          a.preventDefault || (a.returnValue = !1);
          ('mousedown' === d.mouseIsDown || this.touchSelect(a)) &&
            this.drag(a);
          d.openMenu ||
            (!this.inClass(a.target, 'highcharts-tracker') &&
              !d.isInsidePlot(a.chartX - d.plotLeft, a.chartY - d.plotTop, {
                visiblePlotOnly: !0,
              })) ||
            (this.inClass(a.target, 'highcharts-no-tooltip')
              ? this.reset(!1, 0)
              : this.runPointActions(a));
        };
        b.prototype.onDocumentTouchEnd = function (a) {
          var d = A[x(b.hoverChartIndex, -1)];
          d && d.pointer.drop(a);
        };
        b.prototype.onContainerTouchMove = function (a) {
          if (this.touchSelect(a)) this.onContainerMouseMove(a);
          else this.touch(a);
        };
        b.prototype.onContainerTouchStart = function (a) {
          if (this.touchSelect(a)) this.onContainerMouseDown(a);
          else this.zoomOption(a), this.touch(a, !0);
        };
        b.prototype.onDocumentMouseMove = function (a) {
          var d = this.chart,
            c = this.chartPosition;
          a = this.normalize(a, c);
          var b = d.tooltip;
          !c ||
            (b && b.isStickyOnContact()) ||
            d.isInsidePlot(a.chartX - d.plotLeft, a.chartY - d.plotTop, {
              visiblePlotOnly: !0,
            }) ||
            this.inClass(a.target, 'highcharts-tracker') ||
            this.reset();
        };
        b.prototype.onDocumentMouseUp = function (a) {
          var d = A[x(b.hoverChartIndex, -1)];
          d && d.pointer.drop(a);
        };
        b.prototype.pinch = function (a) {
          var b = this,
            c = b.chart,
            h = b.pinchDown,
            g = a.touches || [],
            k = g.length,
            m = b.lastValidTouch,
            e = b.hasZoom,
            l = {},
            r =
              1 === k &&
              ((b.inClass(a.target, 'highcharts-tracker') &&
                c.runTrackerClick) ||
                b.runChartClick),
            n = {},
            y = b.selectionMarker;
          1 < k
            ? (b.initiated = !0)
            : 1 === k && this.followTouchMove && (b.initiated = !1);
          e && b.initiated && !r && !1 !== a.cancelable && a.preventDefault();
          [].map.call(g, function (c) {
            return b.normalize(c);
          });
          'touchstart' === a.type
            ? ([].forEach.call(g, function (c, a) {
                h[a] = { chartX: c.chartX, chartY: c.chartY };
              }),
              (m.x = [h[0].chartX, h[1] && h[1].chartX]),
              (m.y = [h[0].chartY, h[1] && h[1].chartY]),
              c.axes.forEach(function (a) {
                if (a.zoomEnabled) {
                  var d = c.bounds[a.horiz ? 'h' : 'v'],
                    b = a.minPixelPadding,
                    g = a.toPixels(
                      Math.min(x(a.options.min, a.dataMin), a.dataMin)
                    ),
                    f = a.toPixels(
                      Math.max(x(a.options.max, a.dataMax), a.dataMax)
                    ),
                    h = Math.max(g, f);
                  d.min = Math.min(a.pos, Math.min(g, f) - b);
                  d.max = Math.max(a.pos + a.len, h + b);
                }
              }),
              (b.res = !0))
            : b.followTouchMove && 1 === k
              ? this.runPointActions(b.normalize(a))
              : h.length &&
                (f(c, 'touchpan', { originalEvent: a }, function () {
                  y ||
                    (b.selectionMarker = y =
                      d({ destroy: C, touch: !0 }, c.plotBox));
                  b.pinchTranslate(h, g, l, y, n, m);
                  b.hasPinched = e;
                  b.scaleGroups(l, n);
                }),
                b.res && ((b.res = !1), this.reset(!1, 0)));
        };
        b.prototype.pinchTranslate = function (a, d, c, b, g, f) {
          this.zoomHor && this.pinchTranslateDirection(!0, a, d, c, b, g, f);
          this.zoomVert && this.pinchTranslateDirection(!1, a, d, c, b, g, f);
        };
        b.prototype.pinchTranslateDirection = function (
          a,
          d,
          c,
          b,
          g,
          f,
          k,
          m
        ) {
          var h = this.chart,
            e = a ? 'x' : 'y',
            u = a ? 'X' : 'Y',
            p = 'chart' + u,
            l = a ? 'width' : 'height',
            r = h['plot' + (a ? 'Left' : 'Top')],
            w = h.inverted,
            n = h.bounds[a ? 'h' : 'v'],
            D = 1 === d.length,
            x = d[0][p],
            y = !D && d[1][p];
          d = function () {
            'number' === typeof t &&
              20 < Math.abs(x - y) &&
              (q = m || Math.abs(G - t) / Math.abs(x - y));
            B = (r - G) / q + x;
            F = h['plot' + (a ? 'Width' : 'Height')] / q;
          };
          var F,
            B,
            q = m || 1,
            G = c[0][p],
            t = !D && c[1][p];
          d();
          c = B;
          if (c < n.min) {
            c = n.min;
            var z = !0;
          } else c + F > n.max && ((c = n.max - F), (z = !0));
          z
            ? ((G -= 0.8 * (G - k[e][0])),
              'number' === typeof t && (t -= 0.8 * (t - k[e][1])),
              d())
            : (k[e] = [G, t]);
          w || ((f[e] = B - r), (f[l] = F));
          f = w ? 1 / q : q;
          g[l] = F;
          g[e] = c;
          b[w ? (a ? 'scaleY' : 'scaleX') : 'scale' + u] = q;
          b['translate' + u] = f * r + (G - f * x);
        };
        b.prototype.reset = function (a, d) {
          var c = this.chart,
            b = c.hoverSeries,
            g = c.hoverPoint,
            f = c.hoverPoints,
            h = c.tooltip,
            k = h && h.shared ? f : g;
          a &&
            k &&
            r(k).forEach(function (c) {
              c.series.isCartesian &&
                'undefined' === typeof c.plotX &&
                (a = !1);
            });
          if (a)
            h &&
              k &&
              r(k).length &&
              (h.refresh(k),
              h.shared && f
                ? f.forEach(function (c) {
                    c.setState(c.state, !0);
                    c.series.isCartesian &&
                      (c.series.xAxis.crosshair &&
                        c.series.xAxis.drawCrosshair(null, c),
                      c.series.yAxis.crosshair &&
                        c.series.yAxis.drawCrosshair(null, c));
                  })
                : g &&
                  (g.setState(g.state, !0),
                  c.axes.forEach(function (c) {
                    c.crosshair &&
                      g.series[c.coll] === c &&
                      c.drawCrosshair(null, g);
                  })));
          else {
            if (g) g.onMouseOut();
            f &&
              f.forEach(function (c) {
                c.setState();
              });
            if (b) b.onMouseOut();
            h && h.hide(d);
            this.unDocMouseMove &&
              (this.unDocMouseMove = this.unDocMouseMove());
            c.axes.forEach(function (c) {
              c.hideCrosshair();
            });
            this.hoverX = c.hoverPoints = c.hoverPoint = null;
          }
        };
        b.prototype.runPointActions = function (d, f) {
          var c = this.chart,
            h = c.tooltip && c.tooltip.options.enabled ? c.tooltip : void 0,
            g = h ? h.shared : !1,
            k = f || c.hoverPoint,
            m = (k && k.series) || c.hoverSeries;
          f = this.getHoverData(
            k,
            m,
            c.series,
            (!d || 'touchmove' !== d.type) &&
              (!!f || (m && m.directTouch && this.isDirectTouch)),
            g,
            d
          );
          k = f.hoverPoint;
          m = f.hoverSeries;
          var e = f.hoverPoints;
          f = m && m.tooltipOptions.followPointer && !m.tooltipOptions.split;
          var p = g && m && !m.noSharedTooltip;
          if (k && (k !== c.hoverPoint || (h && h.isHidden))) {
            (c.hoverPoints || []).forEach(function (c) {
              -1 === e.indexOf(c) && c.setState();
            });
            if (c.hoverSeries !== m) m.onMouseOver();
            this.applyInactiveState(e);
            (e || []).forEach(function (c) {
              c.setState('hover');
            });
            c.hoverPoint && c.hoverPoint.firePointEvent('mouseOut');
            if (!k.series) return;
            c.hoverPoints = e;
            c.hoverPoint = k;
            k.firePointEvent('mouseOver', void 0, function () {
              h && k && h.refresh(p ? e : k, d);
            });
          } else
            f &&
              h &&
              !h.isHidden &&
              ((g = h.getAnchor([{}], d)),
              c.isInsidePlot(g[0], g[1], { visiblePlotOnly: !0 }) &&
                h.updatePosition({ plotX: g[0], plotY: g[1] }));
          this.unDocMouseMove ||
            ((this.unDocMouseMove = z(
              c.container.ownerDocument,
              'mousemove',
              function (c) {
                var a = A[b.hoverChartIndex];
                if (a) a.pointer.onDocumentMouseMove(c);
              }
            )),
            this.eventsToUnbind.push(this.unDocMouseMove));
          c.axes.forEach(function (b) {
            var g = x((b.crosshair || {}).snap, !0),
              f;
            g &&
              (((f = c.hoverPoint) && f.series[b.coll] === b) ||
                (f = a(e, function (c) {
                  return c.series && c.series[b.coll] === b;
                })));
            f || !g ? b.drawCrosshair(d, f) : b.hideCrosshair();
          });
        };
        b.prototype.scaleGroups = function (a, d) {
          var c = this.chart;
          c.series.forEach(function (b) {
            var g = a || b.getPlotBox();
            b.group &&
              ((b.xAxis && b.xAxis.zoomEnabled) || c.mapView) &&
              (b.group.attr(g),
              b.markerGroup &&
                (b.markerGroup.attr(g),
                b.markerGroup.clip(d ? c.clipRect : null)),
              b.dataLabelsGroup && b.dataLabelsGroup.attr(g));
          });
          c.clipRect.attr(d || c.clipBox);
        };
        b.prototype.setDOMEvents = function () {
          var a = this,
            d = this.chart.container,
            c = d.ownerDocument;
          d.onmousedown = this.onContainerMouseDown.bind(this);
          d.onmousemove = this.onContainerMouseMove.bind(this);
          d.onclick = this.onContainerClick.bind(this);
          this.eventsToUnbind.push(
            z(d, 'mouseenter', this.onContainerMouseEnter.bind(this))
          );
          this.eventsToUnbind.push(
            z(d, 'mouseleave', this.onContainerMouseLeave.bind(this))
          );
          b.unbindDocumentMouseUp ||
            (b.unbindDocumentMouseUp = z(
              c,
              'mouseup',
              this.onDocumentMouseUp.bind(this)
            ));
          for (
            var f = this.chart.renderTo.parentElement;
            f && 'BODY' !== f.tagName;

          )
            this.eventsToUnbind.push(
              z(f, 'scroll', function () {
                delete a.chartPosition;
              })
            ),
              (f = f.parentElement);
          e.hasTouch &&
            (this.eventsToUnbind.push(
              z(d, 'touchstart', this.onContainerTouchStart.bind(this), {
                passive: !1,
              })
            ),
            this.eventsToUnbind.push(
              z(d, 'touchmove', this.onContainerTouchMove.bind(this), {
                passive: !1,
              })
            ),
            b.unbindDocumentTouchEnd ||
              (b.unbindDocumentTouchEnd = z(
                c,
                'touchend',
                this.onDocumentTouchEnd.bind(this),
                { passive: !1 }
              )));
        };
        b.prototype.setHoverChartIndex = function () {
          var a = this.chart,
            d = e.charts[x(b.hoverChartIndex, -1)];
          if (d && d !== a)
            d.pointer.onContainerMouseLeave({ relatedTarget: a.container });
          (d && d.mouseIsDown) || (b.hoverChartIndex = a.index);
        };
        b.prototype.touch = function (a, d) {
          var c = this.chart,
            b;
          this.setHoverChartIndex();
          if (1 === a.touches.length)
            if (
              ((a = this.normalize(a)),
              (b = c.isInsidePlot(a.chartX - c.plotLeft, a.chartY - c.plotTop, {
                visiblePlotOnly: !0,
              })) && !c.openMenu)
            ) {
              d && this.runPointActions(a);
              if ('touchmove' === a.type) {
                d = this.pinchDown;
                var g = d[0]
                  ? 4 <=
                    Math.sqrt(
                      Math.pow(d[0].chartX - a.chartX, 2) +
                        Math.pow(d[0].chartY - a.chartY, 2)
                    )
                  : !1;
              }
              x(g, !0) && this.pinch(a);
            } else d && this.reset();
          else 2 === a.touches.length && this.pinch(a);
        };
        b.prototype.touchSelect = function (a) {
          return !(
            !this.chart.options.chart.zoomBySingleTouch ||
            !a.touches ||
            1 !== a.touches.length
          );
        };
        b.prototype.zoomOption = function (a) {
          var d = this.chart,
            c = d.options.chart;
          d = d.inverted;
          var b = c.zoomType || '';
          /touch/.test(a.type) && (b = x(c.pinchType, b));
          this.zoomX = a = /x/.test(b);
          this.zoomY = c = /y/.test(b);
          this.zoomHor = (a && !d) || (c && d);
          this.zoomVert = (c && !d) || (a && d);
          this.hasZoom = a || c;
        };
        return b;
      })();
      ('');
      return b;
    }
  );
  J(
    e,
    'Core/MSPointer.js',
    [e['Core/Globals.js'], e['Core/Pointer.js'], e['Core/Utilities.js']],
    function (b, e, v) {
      function E() {
        var d = [];
        d.item = function (a) {
          return this[a];
        };
        a(k, function (a) {
          d.push({ pageX: a.pageX, pageY: a.pageY, target: a.target });
        });
        return d;
      }
      function t(a, d, b, f) {
        var k = C[e.hoverChartIndex || NaN];
        ('touch' !== a.pointerType &&
          a.pointerType !== a.MSPOINTER_TYPE_TOUCH) ||
          !k ||
          ((k = k.pointer),
          f(a),
          k[d]({
            type: b,
            target: a.currentTarget,
            preventDefault: q,
            touches: E(),
          }));
      }
      var A =
          (this && this.__extends) ||
          (function () {
            var a = function (d, b) {
              a =
                Object.setPrototypeOf ||
                ({ __proto__: [] } instanceof Array &&
                  function (a, d) {
                    a.__proto__ = d;
                  }) ||
                function (a, d) {
                  for (var b in d) d.hasOwnProperty(b) && (a[b] = d[b]);
                };
              return a(d, b);
            };
            return function (d, b) {
              function f() {
                this.constructor = d;
              }
              a(d, b);
              d.prototype =
                null === b
                  ? Object.create(b)
                  : ((f.prototype = b.prototype), new f());
            };
          })(),
        C = b.charts,
        z = b.doc,
        q = b.noop,
        l = b.win,
        n = v.addEvent,
        d = v.css,
        a = v.objectEach,
        f = v.removeEvent,
        k = {},
        G = !!l.PointerEvent;
      return (function (a) {
        function e() {
          return (null !== a && a.apply(this, arguments)) || this;
        }
        A(e, a);
        e.isRequired = function () {
          return !(b.hasTouch || (!l.PointerEvent && !l.MSPointerEvent));
        };
        e.prototype.batchMSEvents = function (a) {
          a(
            this.chart.container,
            G ? 'pointerdown' : 'MSPointerDown',
            this.onContainerPointerDown
          );
          a(
            this.chart.container,
            G ? 'pointermove' : 'MSPointerMove',
            this.onContainerPointerMove
          );
          a(z, G ? 'pointerup' : 'MSPointerUp', this.onDocumentPointerUp);
        };
        e.prototype.destroy = function () {
          this.batchMSEvents(f);
          a.prototype.destroy.call(this);
        };
        e.prototype.init = function (b, f) {
          a.prototype.init.call(this, b, f);
          this.hasZoom &&
            d(b.container, {
              '-ms-touch-action': 'none',
              'touch-action': 'none',
            });
        };
        e.prototype.onContainerPointerDown = function (a) {
          t(a, 'onContainerTouchStart', 'touchstart', function (a) {
            k[a.pointerId] = {
              pageX: a.pageX,
              pageY: a.pageY,
              target: a.currentTarget,
            };
          });
        };
        e.prototype.onContainerPointerMove = function (a) {
          t(a, 'onContainerTouchMove', 'touchmove', function (a) {
            k[a.pointerId] = { pageX: a.pageX, pageY: a.pageY };
            k[a.pointerId].target || (k[a.pointerId].target = a.currentTarget);
          });
        };
        e.prototype.onDocumentPointerUp = function (a) {
          t(a, 'onDocumentTouchEnd', 'touchend', function (a) {
            delete k[a.pointerId];
          });
        };
        e.prototype.setDOMEvents = function () {
          a.prototype.setDOMEvents.call(this);
          (this.hasZoom || this.followTouchMove) && this.batchMSEvents(n);
        };
        return e;
      })(e);
    }
  );
  J(
    e,
    'Core/Legend/Legend.js',
    [
      e['Core/Animation/AnimationUtilities.js'],
      e['Core/FormatUtilities.js'],
      e['Core/Globals.js'],
      e['Core/Series/Point.js'],
      e['Core/Renderer/RendererUtilities.js'],
      e['Core/Utilities.js'],
    ],
    function (b, e, v, E, t, A) {
      var C = b.animObject,
        z = b.setAnimation,
        q = e.format;
      b = v.isFirefox;
      var l = v.marginNames;
      v = v.win;
      var n = t.distribute,
        d = A.addEvent,
        a = A.createElement,
        f = A.css,
        k = A.defined,
        G = A.discardElement,
        y = A.find,
        B = A.fireEvent,
        x = A.isNumber,
        r = A.merge,
        m = A.pick,
        h = A.relativeLength,
        p = A.stableSort,
        c = A.syncTimeout;
      t = A.wrap;
      A = (function () {
        function b(c, a) {
          this.allItems = [];
          this.contentGroup = this.box = void 0;
          this.display = !1;
          this.group = void 0;
          this.offsetWidth =
            this.maxLegendWidth =
            this.maxItemWidth =
            this.legendWidth =
            this.legendHeight =
            this.lastLineHeight =
            this.lastItemY =
            this.itemY =
            this.itemX =
            this.itemMarginTop =
            this.itemMarginBottom =
            this.itemHeight =
            this.initialItemY =
              0;
          this.options = void 0;
          this.padding = 0;
          this.pages = [];
          this.proximate = !1;
          this.scrollGroup = void 0;
          this.widthOption =
            this.totalItemWidth =
            this.titleHeight =
            this.symbolWidth =
            this.symbolHeight =
              0;
          this.chart = c;
          this.init(c, a);
        }
        b.prototype.init = function (c, a) {
          this.chart = c;
          this.setOptions(a);
          a.enabled &&
            (this.render(),
            d(this.chart, 'endResize', function () {
              this.legend.positionCheckboxes();
            }),
            this.proximate
              ? (this.unchartrender = d(this.chart, 'render', function () {
                  this.legend.proximatePositions();
                  this.legend.positionItems();
                }))
              : this.unchartrender && this.unchartrender());
        };
        b.prototype.setOptions = function (c) {
          var a = m(c.padding, 8);
          this.options = c;
          this.chart.styledMode ||
            ((this.itemStyle = c.itemStyle),
            (this.itemHiddenStyle = r(this.itemStyle, c.itemHiddenStyle)));
          this.itemMarginTop = c.itemMarginTop || 0;
          this.itemMarginBottom = c.itemMarginBottom || 0;
          this.padding = a;
          this.initialItemY = a - 5;
          this.symbolWidth = m(c.symbolWidth, 16);
          this.pages = [];
          this.proximate = 'proximate' === c.layout && !this.chart.inverted;
          this.baseline = void 0;
        };
        b.prototype.update = function (c, a) {
          var d = this.chart;
          this.setOptions(r(!0, this.options, c));
          this.destroy();
          d.isDirtyLegend = d.isDirtyBox = !0;
          m(a, !0) && d.redraw();
          B(this, 'afterUpdate');
        };
        b.prototype.colorizeItem = function (c, a) {
          c.legendGroup[a ? 'removeClass' : 'addClass'](
            'highcharts-legend-item-hidden'
          );
          if (!this.chart.styledMode) {
            var d = this.options,
              b = c.legendItem,
              g = c.legendLine,
              f = c.legendSymbol,
              h = this.itemHiddenStyle.color;
            d = a ? d.itemStyle.color : h;
            var k = a ? c.color || h : h,
              m = c.options && c.options.marker,
              e = { fill: k };
            b && b.css({ fill: d, color: d });
            g && g.attr({ stroke: k });
            f &&
              (m &&
                f.isMarker &&
                ((e = c.pointAttribs()), a || (e.stroke = e.fill = h)),
              f.attr(e));
          }
          B(this, 'afterColorizeItem', { item: c, visible: a });
        };
        b.prototype.positionItems = function () {
          this.allItems.forEach(this.positionItem, this);
          this.chart.isResizing || this.positionCheckboxes();
        };
        b.prototype.positionItem = function (c) {
          var a = this,
            d = this.options,
            b = d.symbolPadding,
            g = !d.rtl,
            f = c._legendItemPos;
          d = f[0];
          f = f[1];
          var h = c.checkbox,
            m = c.legendGroup;
          m &&
            m.element &&
            ((b = {
              translateX: g ? d : this.legendWidth - d - 2 * b - 4,
              translateY: f,
            }),
            (g = function () {
              B(a, 'afterPositionItem', { item: c });
            }),
            k(m.translateY) ? m.animate(b, void 0, g) : (m.attr(b), g()));
          h && ((h.x = d), (h.y = f));
        };
        b.prototype.destroyItem = function (c) {
          var a = c.checkbox;
          ['legendItem', 'legendLine', 'legendSymbol', 'legendGroup'].forEach(
            function (a) {
              c[a] && (c[a] = c[a].destroy());
            }
          );
          a && G(c.checkbox);
        };
        b.prototype.destroy = function () {
          function c(c) {
            this[c] && (this[c] = this[c].destroy());
          }
          this.getAllItems().forEach(function (a) {
            ['legendItem', 'legendGroup'].forEach(c, a);
          });
          'clipRect up down pager nav box title group'
            .split(' ')
            .forEach(c, this);
          this.display = null;
        };
        b.prototype.positionCheckboxes = function () {
          var c = this.group && this.group.alignAttr,
            a = this.clipHeight || this.legendHeight,
            d = this.titleHeight;
          if (c) {
            var b = c.translateY;
            this.allItems.forEach(function (g) {
              var h = g.checkbox;
              if (h) {
                var k = b + d + h.y + (this.scrollOffset || 0) + 3;
                f(h, {
                  left: c.translateX + g.checkboxOffset + h.x - 20 + 'px',
                  top: k + 'px',
                  display:
                    this.proximate || (k > b - 6 && k < b + a - 6)
                      ? ''
                      : 'none',
                });
              }
            }, this);
          }
        };
        b.prototype.renderTitle = function () {
          var c = this.options,
            a = this.padding,
            d = c.title,
            b = 0;
          d.text &&
            (this.title ||
              ((this.title = this.chart.renderer
                .label(
                  d.text,
                  a - 3,
                  a - 4,
                  void 0,
                  void 0,
                  void 0,
                  c.useHTML,
                  void 0,
                  'legend-title'
                )
                .attr({ zIndex: 1 })),
              this.chart.styledMode || this.title.css(d.style),
              this.title.add(this.group)),
            d.width || this.title.css({ width: this.maxLegendWidth + 'px' }),
            (c = this.title.getBBox()),
            (b = c.height),
            (this.offsetWidth = c.width),
            this.contentGroup.attr({ translateY: b }));
          this.titleHeight = b;
        };
        b.prototype.setText = function (c) {
          var a = this.options;
          c.legendItem.attr({
            text: a.labelFormat
              ? q(a.labelFormat, c, this.chart)
              : a.labelFormatter.call(c),
          });
        };
        b.prototype.renderItem = function (c) {
          var a = this.chart,
            d = a.renderer,
            b = this.options,
            g = this.symbolWidth,
            f = b.symbolPadding || 0,
            h = this.itemStyle,
            k = this.itemHiddenStyle,
            e = 'horizontal' === b.layout ? m(b.itemDistance, 20) : 0,
            p = !b.rtl,
            l = !c.series,
            n = !l && c.series.drawLegendSymbol ? c.series : c,
            w = n.options,
            x = this.createCheckboxForItem && w && w.showCheckbox,
            y = b.useHTML,
            B = c.options.className,
            q = c.legendItem;
          w = g + f + e + (x ? 20 : 0);
          q ||
            ((c.legendGroup = d
              .g('legend-item')
              .addClass(
                'highcharts-' +
                  n.type +
                  '-series highcharts-color-' +
                  c.colorIndex +
                  (B ? ' ' + B : '') +
                  (l ? ' highcharts-series-' + c.index : '')
              )
              .attr({ zIndex: 1 })
              .add(this.scrollGroup)),
            (c.legendItem = q =
              d.text('', p ? g + f : -f, this.baseline || 0, y)),
            a.styledMode || q.css(r(c.visible ? h : k)),
            q
              .attr({ align: p ? 'left' : 'right', zIndex: 2 })
              .add(c.legendGroup),
            this.baseline ||
              ((this.fontMetrics = d.fontMetrics(
                a.styledMode ? 12 : h.fontSize,
                q
              )),
              (this.baseline = this.fontMetrics.f + 3 + this.itemMarginTop),
              q.attr('y', this.baseline),
              (this.symbolHeight = b.symbolHeight || this.fontMetrics.f),
              b.squareSymbol &&
                ((this.symbolWidth = m(
                  b.symbolWidth,
                  Math.max(this.symbolHeight, 16)
                )),
                (w = this.symbolWidth + f + e + (x ? 20 : 0)),
                p && q.attr('x', this.symbolWidth + f))),
            n.drawLegendSymbol(this, c),
            this.setItemEvents && this.setItemEvents(c, q, y));
          x &&
            !c.checkbox &&
            this.createCheckboxForItem &&
            this.createCheckboxForItem(c);
          this.colorizeItem(c, c.visible);
          (!a.styledMode && h.width) ||
            q.css({
              width:
                (b.itemWidth || this.widthOption || a.spacingBox.width) -
                w +
                'px',
            });
          this.setText(c);
          a = q.getBBox();
          d = (this.fontMetrics && this.fontMetrics.h) || 0;
          c.itemWidth = c.checkboxOffset =
            b.itemWidth || c.legendItemWidth || a.width + w;
          this.maxItemWidth = Math.max(this.maxItemWidth, c.itemWidth);
          this.totalItemWidth += c.itemWidth;
          this.itemHeight = c.itemHeight = Math.round(
            c.legendItemHeight || (a.height > 1.5 * d ? a.height : d)
          );
        };
        b.prototype.layoutItem = function (c) {
          var a = this.options,
            d = this.padding,
            b = 'horizontal' === a.layout,
            g = c.itemHeight,
            f = this.itemMarginBottom,
            h = this.itemMarginTop,
            k = b ? m(a.itemDistance, 20) : 0,
            e = this.maxLegendWidth;
          a =
            a.alignColumns && this.totalItemWidth > e
              ? this.maxItemWidth
              : c.itemWidth;
          b &&
            this.itemX - d + a > e &&
            ((this.itemX = d),
            this.lastLineHeight && (this.itemY += h + this.lastLineHeight + f),
            (this.lastLineHeight = 0));
          this.lastItemY = h + this.itemY + f;
          this.lastLineHeight = Math.max(g, this.lastLineHeight);
          c._legendItemPos = [this.itemX, this.itemY];
          b
            ? (this.itemX += a)
            : ((this.itemY += h + g + f), (this.lastLineHeight = g));
          this.offsetWidth =
            this.widthOption ||
            Math.max(
              (b ? this.itemX - d - (c.checkbox ? 0 : k) : a) + d,
              this.offsetWidth
            );
        };
        b.prototype.getAllItems = function () {
          var c = [];
          this.chart.series.forEach(function (a) {
            var d = a && a.options;
            a &&
              m(d.showInLegend, k(d.linkedTo) ? !1 : void 0, !0) &&
              (c = c.concat(
                a.legendItems || ('point' === d.legendType ? a.data : a)
              ));
          });
          B(this, 'afterGetAllItems', { allItems: c });
          return c;
        };
        b.prototype.getAlignment = function () {
          var c = this.options;
          return this.proximate
            ? c.align.charAt(0) + 'tv'
            : c.floating
              ? ''
              : c.align.charAt(0) +
                c.verticalAlign.charAt(0) +
                c.layout.charAt(0);
        };
        b.prototype.adjustMargins = function (c, a) {
          var d = this.chart,
            b = this.options,
            f = this.getAlignment();
          f &&
            [
              /(lth|ct|rth)/,
              /(rtv|rm|rbv)/,
              /(rbh|cb|lbh)/,
              /(lbv|lm|ltv)/,
            ].forEach(function (g, h) {
              g.test(f) &&
                !k(c[h]) &&
                (d[l[h]] = Math.max(
                  d[l[h]],
                  d.legend[(h + 1) % 2 ? 'legendHeight' : 'legendWidth'] +
                    [1, -1, -1, 1][h] * b[h % 2 ? 'x' : 'y'] +
                    m(b.margin, 12) +
                    a[h] +
                    (d.titleOffset[h] || 0)
                ));
            });
        };
        b.prototype.proximatePositions = function () {
          var c = this.chart,
            a = [],
            d = 'left' === this.options.align;
          this.allItems.forEach(function (b) {
            var f;
            var g = d;
            if (b.yAxis) {
              b.xAxis.options.reversed && (g = !g);
              b.points &&
                (f = y(
                  g ? b.points : b.points.slice(0).reverse(),
                  function (c) {
                    return x(c.plotY);
                  }
                ));
              g =
                this.itemMarginTop +
                b.legendItem.getBBox().height +
                this.itemMarginBottom;
              var h = b.yAxis.top - c.plotTop;
              b.visible
                ? ((f = f ? f.plotY : b.yAxis.height), (f += h - 0.3 * g))
                : (f = h + b.yAxis.height);
              a.push({ target: f, size: g, item: b });
            }
          }, this);
          n(a, c.plotHeight).forEach(function (a) {
            a.item._legendItemPos &&
              (a.item._legendItemPos[1] = c.plotTop - c.spacing[0] + a.pos);
          });
        };
        b.prototype.render = function () {
          var c = this.chart,
            a = c.renderer,
            d = this.options,
            b = this.padding,
            f = this.getAllItems(),
            k = this.group,
            m = this.box;
          this.itemX = b;
          this.itemY = this.initialItemY;
          this.lastItemY = this.offsetWidth = 0;
          this.widthOption = h(d.width, c.spacingBox.width - b);
          var e = c.spacingBox.width - 2 * b - d.x;
          -1 < ['rm', 'lm'].indexOf(this.getAlignment().substring(0, 2)) &&
            (e /= 2);
          this.maxLegendWidth = this.widthOption || e;
          k ||
            ((this.group = k =
              a
                .g('legend')
                .addClass(d.className || '')
                .attr({ zIndex: 7 })
                .add()),
            (this.contentGroup = a.g().attr({ zIndex: 1 }).add(k)),
            (this.scrollGroup = a.g().add(this.contentGroup)));
          this.renderTitle();
          p(f, function (c, a) {
            return (
              ((c.options && c.options.legendIndex) || 0) -
              ((a.options && a.options.legendIndex) || 0)
            );
          });
          d.reversed && f.reverse();
          this.allItems = f;
          this.display = e = !!f.length;
          this.itemHeight =
            this.totalItemWidth =
            this.maxItemWidth =
            this.lastLineHeight =
              0;
          f.forEach(this.renderItem, this);
          f.forEach(this.layoutItem, this);
          f = (this.widthOption || this.offsetWidth) + b;
          var l = this.lastItemY + this.lastLineHeight + this.titleHeight;
          l = this.handleOverflow(l);
          l += b;
          m ||
            (this.box = m =
              a
                .rect()
                .addClass('highcharts-legend-box')
                .attr({ r: d.borderRadius })
                .add(k));
          c.styledMode ||
            m
              .attr({
                stroke: d.borderColor,
                'stroke-width': d.borderWidth || 0,
                fill: d.backgroundColor || 'none',
              })
              .shadow(d.shadow);
          if (0 < f && 0 < l)
            m[m.placed ? 'animate' : 'attr'](
              m.crisp.call(
                {},
                { x: 0, y: 0, width: f, height: l },
                m.strokeWidth()
              )
            );
          m[e ? 'show' : 'hide']();
          c.styledMode && 'none' === k.getStyle('display') && (f = l = 0);
          this.legendWidth = f;
          this.legendHeight = l;
          e && this.align();
          this.proximate || this.positionItems();
          B(this, 'afterRender');
        };
        b.prototype.align = function (c) {
          void 0 === c && (c = this.chart.spacingBox);
          var a = this.chart,
            d = this.options,
            b = c.y;
          /(lth|ct|rth)/.test(this.getAlignment()) && 0 < a.titleOffset[0]
            ? (b += a.titleOffset[0])
            : /(lbh|cb|rbh)/.test(this.getAlignment()) &&
              0 < a.titleOffset[2] &&
              (b -= a.titleOffset[2]);
          b !== c.y && (c = r(c, { y: b }));
          a.hasRendered || (this.group.placed = !1);
          this.group.align(
            r(d, {
              width: this.legendWidth,
              height: this.legendHeight,
              verticalAlign: this.proximate ? 'top' : d.verticalAlign,
            }),
            !0,
            c
          );
        };
        b.prototype.handleOverflow = function (c) {
          var a = this,
            d = this.chart,
            b = d.renderer,
            f = this.options,
            g = f.y,
            h = 'top' === f.verticalAlign,
            k = this.padding,
            e = f.maxHeight,
            p = f.navigation,
            l = m(p.animation, !0),
            r = p.arrowSize || 12,
            n = this.pages,
            w = this.allItems,
            x = function (c) {
              'number' === typeof c
                ? t.attr({ height: c })
                : t && ((a.clipRect = t.destroy()), a.contentGroup.clip());
              a.contentGroup.div &&
                (a.contentGroup.div.style.clip = c
                  ? 'rect(' + k + 'px,9999px,' + (k + c) + 'px,0)'
                  : 'auto');
            },
            y = function (c) {
              a[c] = b
                .circle(0, 0, 1.3 * r)
                .translate(r / 2, r / 2)
                .add(G);
              d.styledMode || a[c].attr('fill', 'rgba(0,0,0,0.0001)');
              return a[c];
            },
            B,
            q;
          g = d.spacingBox.height + (h ? -g : g) - k;
          var G = this.nav,
            t = this.clipRect;
          'horizontal' !== f.layout ||
            'middle' === f.verticalAlign ||
            f.floating ||
            (g /= 2);
          e && (g = Math.min(g, e));
          n.length = 0;
          c && 0 < g && c > g && !1 !== p.enabled
            ? ((this.clipHeight = B =
                Math.max(g - 20 - this.titleHeight - k, 0)),
              (this.currentPage = m(this.currentPage, 1)),
              (this.fullHeight = c),
              w.forEach(function (c, a) {
                var d = c._legendItemPos[1],
                  b = Math.round(c.legendItem.getBBox().height),
                  f = n.length;
                if (!f || (d - n[f - 1] > B && (q || d) !== n[f - 1]))
                  n.push(q || d), f++;
                c.pageIx = f - 1;
                q && (w[a - 1].pageIx = f - 1);
                a === w.length - 1 &&
                  d + b - n[f - 1] > B &&
                  b <= B &&
                  (n.push(d), (c.pageIx = f));
                d !== q && (q = d);
              }),
              t ||
                ((t = a.clipRect = b.clipRect(0, k, 9999, 0)),
                a.contentGroup.clip(t)),
              x(B),
              G ||
                ((this.nav = G = b.g().attr({ zIndex: 1 }).add(this.group)),
                (this.up = b.symbol('triangle', 0, 0, r, r).add(G)),
                y('upTracker').on('click', function () {
                  a.scroll(-1, l);
                }),
                (this.pager = b
                  .text('', 15, 10)
                  .addClass('highcharts-legend-navigation')),
                !d.styledMode && p.style && this.pager.css(p.style),
                this.pager.add(G),
                (this.down = b.symbol('triangle-down', 0, 0, r, r).add(G)),
                y('downTracker').on('click', function () {
                  a.scroll(1, l);
                })),
              a.scroll(0),
              (c = g))
            : G &&
              (x(),
              (this.nav = G.destroy()),
              this.scrollGroup.attr({ translateY: 1 }),
              (this.clipHeight = 0));
          return c;
        };
        b.prototype.scroll = function (a, d) {
          var b = this,
            f = this.chart,
            g = this.pages,
            h = g.length,
            k = this.clipHeight,
            e = this.options.navigation,
            p = this.pager,
            l = this.padding,
            r = this.currentPage + a;
          r > h && (r = h);
          0 < r &&
            ('undefined' !== typeof d && z(d, f),
            this.nav.attr({
              translateX: l,
              translateY: k + this.padding + 7 + this.titleHeight,
              visibility: 'visible',
            }),
            [this.up, this.upTracker].forEach(function (c) {
              c.attr({
                class:
                  1 === r
                    ? 'highcharts-legend-nav-inactive'
                    : 'highcharts-legend-nav-active',
              });
            }),
            p.attr({ text: r + '/' + h }),
            [this.down, this.downTracker].forEach(function (c) {
              c.attr({
                x: 18 + this.pager.getBBox().width,
                class:
                  r === h
                    ? 'highcharts-legend-nav-inactive'
                    : 'highcharts-legend-nav-active',
              });
            }, this),
            f.styledMode ||
              (this.up.attr({
                fill: 1 === r ? e.inactiveColor : e.activeColor,
              }),
              this.upTracker.css({ cursor: 1 === r ? 'default' : 'pointer' }),
              this.down.attr({
                fill: r === h ? e.inactiveColor : e.activeColor,
              }),
              this.downTracker.css({
                cursor: r === h ? 'default' : 'pointer',
              })),
            (this.scrollOffset = -g[r - 1] + this.initialItemY),
            this.scrollGroup.animate({ translateY: this.scrollOffset }),
            (this.currentPage = r),
            this.positionCheckboxes(),
            (a = C(m(d, f.renderer.globalAnimation, !0))),
            c(function () {
              B(b, 'afterScroll', { currentPage: r });
            }, a.duration));
        };
        b.prototype.setItemEvents = function (c, a, d) {
          var b = this,
            f = b.chart.renderer.boxWrapper,
            g = c instanceof E,
            h = 'highcharts-legend-' + (g ? 'point' : 'series') + '-active',
            k = b.chart.styledMode,
            m = function (a) {
              b.allItems.forEach(function (d) {
                c !== d &&
                  [d].concat(d.linkedSeries || []).forEach(function (c) {
                    c.setState(a, !g);
                  });
              });
            };
          (d ? [a, c.legendSymbol] : [c.legendGroup]).forEach(function (d) {
            if (d)
              d.on('mouseover', function () {
                c.visible && m('inactive');
                c.setState('hover');
                c.visible && f.addClass(h);
                k || a.css(b.options.itemHoverStyle);
              })
                .on('mouseout', function () {
                  b.chart.styledMode ||
                    a.css(r(c.visible ? b.itemStyle : b.itemHiddenStyle));
                  m('');
                  f.removeClass(h);
                  c.setState();
                })
                .on('click', function (a) {
                  var d = function () {
                    c.setVisible && c.setVisible();
                    m(c.visible ? 'inactive' : '');
                  };
                  f.removeClass(h);
                  a = { browserEvent: a };
                  c.firePointEvent
                    ? c.firePointEvent('legendItemClick', a, d)
                    : B(c, 'legendItemClick', a, d);
                });
          });
        };
        b.prototype.createCheckboxForItem = function (c) {
          c.checkbox = a(
            'input',
            {
              type: 'checkbox',
              className: 'highcharts-legend-checkbox',
              checked: c.selected,
              defaultChecked: c.selected,
            },
            this.options.itemCheckboxStyle,
            this.chart.container
          );
          d(c.checkbox, 'click', function (a) {
            B(
              c.series || c,
              'checkboxClick',
              { checked: a.target.checked, item: c },
              function () {
                c.select();
              }
            );
          });
        };
        return b;
      })();
      (/Trident\/7\.0/.test(v.navigator && v.navigator.userAgent) || b) &&
        t(A.prototype, 'positionItem', function (c, a) {
          var d = this,
            b = function () {
              a._legendItemPos && c.call(d, a);
            };
          b();
          d.bubbleLegend || setTimeout(b);
        });
      ('');
      return A;
    }
  );
  J(
    e,
    'Core/Series/SeriesRegistry.js',
    [
      e['Core/Globals.js'],
      e['Core/DefaultOptions.js'],
      e['Core/Series/Point.js'],
      e['Core/Utilities.js'],
    ],
    function (b, e, v, E) {
      var t = e.defaultOptions,
        A = E.error,
        C = E.extendClass,
        z = E.merge,
        q;
      (function (e) {
        function l(d, a) {
          var b = t.plotOptions || {},
            k = a.defaultOptions;
          a.prototype.pointClass || (a.prototype.pointClass = v);
          a.prototype.type = d;
          k && (b[d] = k);
          e.seriesTypes[d] = a;
        }
        e.seriesTypes = b.seriesTypes;
        e.getSeries = function (d, a) {
          void 0 === a && (a = {});
          var b = d.options.chart;
          b = a.type || b.type || b.defaultSeriesType || '';
          var k = e.seriesTypes[b];
          e || A(17, !0, d, { missingModuleFor: b });
          b = new k();
          'function' === typeof b.init && b.init(d, a);
          return b;
        };
        e.registerSeriesType = l;
        e.seriesType = function (d, a, b, k, n) {
          var f = t.plotOptions || {};
          a = a || '';
          f[d] = z(f[a], b);
          l(d, C(e.seriesTypes[a] || function () {}, k));
          e.seriesTypes[d].prototype.type = d;
          n && (e.seriesTypes[d].prototype.pointClass = C(v, n));
          return e.seriesTypes[d];
        };
      })(q || (q = {}));
      return q;
    }
  );
  J(
    e,
    'Core/Chart/Chart.js',
    [
      e['Core/Animation/AnimationUtilities.js'],
      e['Core/Axis/Axis.js'],
      e['Core/FormatUtilities.js'],
      e['Core/Foundation.js'],
      e['Core/Globals.js'],
      e['Core/Legend/Legend.js'],
      e['Core/MSPointer.js'],
      e['Core/DefaultOptions.js'],
      e['Core/Pointer.js'],
      e['Core/Renderer/RendererRegistry.js'],
      e['Core/Series/SeriesRegistry.js'],
      e['Core/Renderer/SVG/SVGRenderer.js'],
      e['Core/Time.js'],
      e['Core/Utilities.js'],
      e['Core/Renderer/HTML/AST.js'],
    ],
    function (b, e, v, E, t, A, C, z, q, l, n, d, a, f, k) {
      var G = b.animate,
        y = b.animObject,
        B = b.setAnimation,
        x = v.numberFormat,
        r = E.registerEventOptions,
        m = t.charts,
        h = t.doc,
        p = t.marginNames,
        c = t.svg,
        w = t.win,
        g = z.defaultOptions,
        F = z.defaultTime,
        u = n.seriesTypes,
        D = f.addEvent,
        H = f.attr,
        L = f.cleanRecursively,
        I = f.createElement,
        K = f.css,
        S = f.defined,
        X = f.discardElement,
        J = f.erase,
        M = f.error,
        ca = f.extend,
        ha = f.find,
        N = f.fireEvent,
        Z = f.getStyle,
        R = f.isArray,
        aa = f.isNumber,
        Q = f.isObject,
        U = f.isString,
        T = f.merge,
        V = f.objectEach,
        O = f.pick,
        da = f.pInt,
        ea = f.relativeLength,
        ia = f.removeEvent,
        ba = f.splat,
        fa = f.syncTimeout,
        ja = f.uniqueKey;
      b = (function () {
        function b(c, a, d) {
          this.series =
            this.renderTo =
            this.renderer =
            this.pointer =
            this.pointCount =
            this.plotWidth =
            this.plotTop =
            this.plotLeft =
            this.plotHeight =
            this.plotBox =
            this.options =
            this.numberFormatter =
            this.margin =
            this.legend =
            this.labelCollectors =
            this.isResizing =
            this.index =
            this.eventOptions =
            this.container =
            this.colorCounter =
            this.clipBox =
            this.chartWidth =
            this.chartHeight =
            this.bounds =
            this.axisOffset =
            this.axes =
              void 0;
          this.sharedClips = {};
          this.yAxis =
            this.xAxis =
            this.userOptions =
            this.titleOffset =
            this.time =
            this.symbolCounter =
            this.spacingBox =
            this.spacing =
              void 0;
          this.getArgs(c, a, d);
        }
        b.chart = function (c, a, d) {
          return new b(c, a, d);
        };
        b.prototype.getArgs = function (c, a, d) {
          U(c) || c.nodeName
            ? ((this.renderTo = c), this.init(a, d))
            : this.init(c, a);
        };
        b.prototype.init = function (c, d) {
          var b = c.plotOptions || {};
          N(this, 'init', { args: arguments }, function () {
            var f = T(g, c),
              h = f.chart;
            V(f.plotOptions, function (c, a) {
              Q(c) && (c.tooltip = (b[a] && T(b[a].tooltip)) || void 0);
            });
            f.tooltip.userOptions =
              (c.chart && c.chart.forExport && c.tooltip.userOptions) ||
              c.tooltip;
            this.userOptions = c;
            this.margin = [];
            this.spacing = [];
            this.bounds = { h: {}, v: {} };
            this.labelCollectors = [];
            this.callback = d;
            this.isResizing = 0;
            this.options = f;
            this.axes = [];
            this.series = [];
            this.time =
              c.time && Object.keys(c.time).length ? new a(c.time) : t.time;
            this.numberFormatter = h.numberFormatter || x;
            this.styledMode = h.styledMode;
            this.hasCartesianSeries = h.showAxes;
            this.index = m.length;
            m.push(this);
            t.chartCount++;
            r(this, h);
            this.xAxis = [];
            this.yAxis = [];
            this.pointCount = this.colorCounter = this.symbolCounter = 0;
            N(this, 'afterInit');
            this.firstRender();
          });
        };
        b.prototype.initSeries = function (c) {
          var a = this.options.chart;
          a = c.type || a.type || a.defaultSeriesType;
          var d = u[a];
          d || M(17, !0, this, { missingModuleFor: a });
          a = new d();
          'function' === typeof a.init && a.init(this, c);
          return a;
        };
        b.prototype.setSeriesData = function () {
          this.getSeriesOrderByLinks().forEach(function (c) {
            c.points ||
              c.data ||
              !c.enabledDataSorting ||
              c.setData(c.options.data, !1);
          });
        };
        b.prototype.getSeriesOrderByLinks = function () {
          return this.series.concat().sort(function (c, a) {
            return c.linkedSeries.length || a.linkedSeries.length
              ? a.linkedSeries.length - c.linkedSeries.length
              : 0;
          });
        };
        b.prototype.orderSeries = function (c) {
          var a = this.series;
          c = c || 0;
          for (var d = a.length; c < d; ++c)
            a[c] && ((a[c].index = c), (a[c].name = a[c].getName()));
        };
        b.prototype.isInsidePlot = function (c, a, d) {
          void 0 === d && (d = {});
          var b = this.inverted,
            f = this.plotBox,
            g = this.plotLeft,
            h = this.plotTop,
            k = this.scrollablePlotBox,
            m = 0;
          var e = 0;
          d.visiblePlotOnly &&
            this.scrollingContainer &&
            ((e = this.scrollingContainer),
            (m = e.scrollLeft),
            (e = e.scrollTop));
          var p = d.series;
          f = (d.visiblePlotOnly && k) || f;
          k = d.inverted ? a : c;
          a = d.inverted ? c : a;
          c = { x: k, y: a, isInsidePlot: !0 };
          if (!d.ignoreX) {
            var l = (p && (b ? p.yAxis : p.xAxis)) || { pos: g, len: Infinity };
            k = d.paneCoordinates ? l.pos + k : g + k;
            (k >= Math.max(m + g, l.pos) &&
              k <= Math.min(m + g + f.width, l.pos + l.len)) ||
              (c.isInsidePlot = !1);
          }
          !d.ignoreY &&
            c.isInsidePlot &&
            ((b = (p && (b ? p.xAxis : p.yAxis)) || { pos: h, len: Infinity }),
            (d = d.paneCoordinates ? b.pos + a : h + a),
            (d >= Math.max(e + h, b.pos) &&
              d <= Math.min(e + h + f.height, b.pos + b.len)) ||
              (c.isInsidePlot = !1));
          N(this, 'afterIsInsidePlot', c);
          return c.isInsidePlot;
        };
        b.prototype.redraw = function (c) {
          N(this, 'beforeRedraw');
          var a = this.hasCartesianSeries ? this.axes : this.colorAxis || [],
            d = this.series,
            b = this.pointer,
            f = this.legend,
            g = this.userOptions.legend,
            h = this.renderer,
            k = h.isHidden(),
            m = [],
            e = this.isDirtyBox,
            p = this.isDirtyLegend;
          this.setResponsive && this.setResponsive(!1);
          B(this.hasRendered ? c : !1, this);
          k && this.temporaryDisplay();
          this.layOutTitles();
          for (c = d.length; c--; ) {
            var l = d[c];
            if (l.options.stacking || l.options.centerInCategory) {
              var u = !0;
              if (l.isDirty) {
                var r = !0;
                break;
              }
            }
          }
          if (r)
            for (c = d.length; c--; )
              (l = d[c]), l.options.stacking && (l.isDirty = !0);
          d.forEach(function (c) {
            c.isDirty &&
              ('point' === c.options.legendType
                ? ('function' === typeof c.updateTotals && c.updateTotals(),
                  (p = !0))
                : g && (g.labelFormatter || g.labelFormat) && (p = !0));
            c.isDirtyData && N(c, 'updatedData');
          });
          p &&
            f &&
            f.options.enabled &&
            (f.render(), (this.isDirtyLegend = !1));
          u && this.getStacks();
          a.forEach(function (c) {
            c.updateNames();
            c.setScale();
          });
          this.getMargins();
          a.forEach(function (c) {
            c.isDirty && (e = !0);
          });
          a.forEach(function (c) {
            var a = c.min + ',' + c.max;
            c.extKey !== a &&
              ((c.extKey = a),
              m.push(function () {
                N(c, 'afterSetExtremes', ca(c.eventArgs, c.getExtremes()));
                delete c.eventArgs;
              }));
            (e || u) && c.redraw();
          });
          e && this.drawChartBox();
          N(this, 'predraw');
          d.forEach(function (c) {
            (e || c.isDirty) && c.visible && c.redraw();
            c.isDirtyData = !1;
          });
          b && b.reset(!0);
          h.draw();
          N(this, 'redraw');
          N(this, 'render');
          k && this.temporaryDisplay(!0);
          m.forEach(function (c) {
            c.call();
          });
        };
        b.prototype.get = function (c) {
          function a(a) {
            return a.id === c || (a.options && a.options.id === c);
          }
          for (
            var d = this.series,
              b = ha(this.axes, a) || ha(this.series, a),
              f = 0;
            !b && f < d.length;
            f++
          )
            b = ha(d[f].points || [], a);
          return b;
        };
        b.prototype.getAxes = function () {
          var c = this,
            a = this.options,
            d = (a.xAxis = ba(a.xAxis || {}));
          a = a.yAxis = ba(a.yAxis || {});
          N(this, 'getAxes');
          d.forEach(function (c, a) {
            c.index = a;
            c.isX = !0;
          });
          a.forEach(function (c, a) {
            c.index = a;
          });
          d.concat(a).forEach(function (a) {
            new e(c, a);
          });
          N(this, 'afterGetAxes');
        };
        b.prototype.getSelectedPoints = function () {
          return this.series.reduce(function (c, a) {
            a.getPointsCollection().forEach(function (a) {
              O(a.selectedStaging, a.selected) && c.push(a);
            });
            return c;
          }, []);
        };
        b.prototype.getSelectedSeries = function () {
          return this.series.filter(function (c) {
            return c.selected;
          });
        };
        b.prototype.setTitle = function (c, a, d) {
          this.applyDescription('title', c);
          this.applyDescription('subtitle', a);
          this.applyDescription('caption', void 0);
          this.layOutTitles(d);
        };
        b.prototype.applyDescription = function (c, a) {
          var d = this,
            b =
              'title' === c
                ? {
                    color: '#333333',
                    fontSize: this.options.isStock ? '16px' : '18px',
                  }
                : { color: '#666666' };
          b = this.options[c] = T(
            !this.styledMode && { style: b },
            this.options[c],
            a
          );
          var f = this[c];
          f && a && (this[c] = f = f.destroy());
          b &&
            !f &&
            ((f = this.renderer
              .text(b.text, 0, 0, b.useHTML)
              .attr({
                align: b.align,
                class: 'highcharts-' + c,
                zIndex: b.zIndex || 4,
              })
              .add()),
            (f.update = function (a) {
              d[
                {
                  title: 'setTitle',
                  subtitle: 'setSubtitle',
                  caption: 'setCaption',
                }[c]
              ](a);
            }),
            this.styledMode || f.css(b.style),
            (this[c] = f));
        };
        b.prototype.layOutTitles = function (c) {
          var a = [0, 0, 0],
            d = this.renderer,
            b = this.spacingBox;
          ['title', 'subtitle', 'caption'].forEach(function (c) {
            var f = this[c],
              g = this.options[c],
              h = g.verticalAlign || 'top';
            c =
              'title' === c
                ? 'top' === h
                  ? -3
                  : 0
                : 'top' === h
                  ? a[0] + 2
                  : 0;
            var k;
            if (f) {
              this.styledMode || (k = g.style && g.style.fontSize);
              k = d.fontMetrics(k, f).b;
              f.css({
                width: (g.width || b.width + (g.widthAdjust || 0)) + 'px',
              });
              var m = Math.round(f.getBBox(g.useHTML).height);
              f.align(
                ca({ y: 'bottom' === h ? k : c + k, height: m }, g),
                !1,
                'spacingBox'
              );
              g.floating ||
                ('top' === h
                  ? (a[0] = Math.ceil(a[0] + m))
                  : 'bottom' === h && (a[2] = Math.ceil(a[2] + m)));
            }
          }, this);
          a[0] &&
            'top' === (this.options.title.verticalAlign || 'top') &&
            (a[0] += this.options.title.margin);
          a[2] &&
            'bottom' === this.options.caption.verticalAlign &&
            (a[2] += this.options.caption.margin);
          var f =
            !this.titleOffset || this.titleOffset.join(',') !== a.join(',');
          this.titleOffset = a;
          N(this, 'afterLayOutTitles');
          !this.isDirtyBox &&
            f &&
            ((this.isDirtyBox = this.isDirtyLegend = f),
            this.hasRendered && O(c, !0) && this.isDirtyBox && this.redraw());
        };
        b.prototype.getChartSize = function () {
          var c = this.options.chart,
            a = c.width;
          c = c.height;
          var d = this.renderTo;
          S(a) || (this.containerWidth = Z(d, 'width'));
          S(c) || (this.containerHeight = Z(d, 'height'));
          this.chartWidth = Math.max(0, a || this.containerWidth || 600);
          this.chartHeight = Math.max(
            0,
            ea(c, this.chartWidth) ||
              (1 < this.containerHeight ? this.containerHeight : 400)
          );
        };
        b.prototype.temporaryDisplay = function (c) {
          var a = this.renderTo;
          if (c)
            for (; a && a.style; )
              a.hcOrigStyle && (K(a, a.hcOrigStyle), delete a.hcOrigStyle),
                a.hcOrigDetached &&
                  (h.body.removeChild(a), (a.hcOrigDetached = !1)),
                (a = a.parentNode);
          else
            for (; a && a.style; ) {
              h.body.contains(a) ||
                a.parentNode ||
                ((a.hcOrigDetached = !0), h.body.appendChild(a));
              if ('none' === Z(a, 'display', !1) || a.hcOricDetached)
                (a.hcOrigStyle = {
                  display: a.style.display,
                  height: a.style.height,
                  overflow: a.style.overflow,
                }),
                  (c = { display: 'block', overflow: 'hidden' }),
                  a !== this.renderTo && (c.height = 0),
                  K(a, c),
                  a.offsetWidth ||
                    a.style.setProperty('display', 'block', 'important');
              a = a.parentNode;
              if (a === h.body) break;
            }
        };
        b.prototype.setClassName = function (c) {
          this.container.className = 'highcharts-container ' + (c || '');
        };
        b.prototype.getContainer = function () {
          var a = this.options,
            b = a.chart,
            f = ja(),
            g,
            e = this.renderTo;
          e || (this.renderTo = e = b.renderTo);
          U(e) && (this.renderTo = e = h.getElementById(e));
          e || M(13, !0, this);
          var p = da(H(e, 'data-highcharts-chart'));
          aa(p) && m[p] && m[p].hasRendered && m[p].destroy();
          H(e, 'data-highcharts-chart', this.index);
          e.innerHTML = k.emptyHTML;
          b.skipClone || e.offsetWidth || this.temporaryDisplay();
          this.getChartSize();
          p = this.chartWidth;
          var u = this.chartHeight;
          K(e, { overflow: 'hidden' });
          this.styledMode ||
            (g = ca(
              {
                position: 'relative',
                overflow: 'hidden',
                width: p + 'px',
                height: u + 'px',
                textAlign: 'left',
                lineHeight: 'normal',
                zIndex: 0,
                '-webkit-tap-highlight-color': 'rgba(0,0,0,0)',
                userSelect: 'none',
                'touch-action': 'manipulation',
                outline: 'none',
              },
              b.style || {}
            ));
          this.container = f = I('div', { id: f }, g, e);
          this._cursor = f.style.cursor;
          this.renderer = new (
            b.renderer || !c ? l.getRendererType(b.renderer) : d
          )(
            f,
            p,
            u,
            void 0,
            b.forExport,
            a.exporting && a.exporting.allowHTML,
            this.styledMode
          );
          B(void 0, this);
          this.setClassName(b.className);
          if (this.styledMode)
            for (var r in a.defs) this.renderer.definition(a.defs[r]);
          else this.renderer.setStyle(b.style);
          this.renderer.chartIndex = this.index;
          N(this, 'afterGetContainer');
        };
        b.prototype.getMargins = function (c) {
          var a = this.spacing,
            d = this.margin,
            b = this.titleOffset;
          this.resetMargins();
          b[0] &&
            !S(d[0]) &&
            (this.plotTop = Math.max(this.plotTop, b[0] + a[0]));
          b[2] &&
            !S(d[2]) &&
            (this.marginBottom = Math.max(this.marginBottom, b[2] + a[2]));
          this.legend && this.legend.display && this.legend.adjustMargins(d, a);
          N(this, 'getMargins');
          c || this.getAxisMargins();
        };
        b.prototype.getAxisMargins = function () {
          var c = this,
            a = (c.axisOffset = [0, 0, 0, 0]),
            d = c.colorAxis,
            b = c.margin,
            f = function (c) {
              c.forEach(function (c) {
                c.visible && c.getOffset();
              });
            };
          c.hasCartesianSeries ? f(c.axes) : d && d.length && f(d);
          p.forEach(function (d, f) {
            S(b[f]) || (c[d] += a[f]);
          });
          c.setChartSize();
        };
        b.prototype.reflow = function (c) {
          var a = this,
            d = a.options.chart,
            b = a.renderTo,
            g = S(d.width) && S(d.height),
            k = d.width || Z(b, 'width');
          d = d.height || Z(b, 'height');
          b = c ? c.target : w;
          delete a.pointer.chartPosition;
          if (!g && !a.isPrinting && k && d && (b === w || b === h)) {
            if (k !== a.containerWidth || d !== a.containerHeight)
              f.clearTimeout(a.reflowTimeout),
                (a.reflowTimeout = fa(
                  function () {
                    a.container && a.setSize(void 0, void 0, !1);
                  },
                  c ? 100 : 0
                ));
            a.containerWidth = k;
            a.containerHeight = d;
          }
        };
        b.prototype.setReflow = function (c) {
          var a = this;
          !1 === c || this.unbindReflow
            ? !1 === c &&
              this.unbindReflow &&
              (this.unbindReflow = this.unbindReflow())
            : ((this.unbindReflow = D(w, 'resize', function (c) {
                a.options && a.reflow(c);
              })),
              D(this, 'destroy', this.unbindReflow));
        };
        b.prototype.setSize = function (c, a, d) {
          var b = this,
            f = b.renderer;
          b.isResizing += 1;
          B(d, b);
          d = f.globalAnimation;
          b.oldChartHeight = b.chartHeight;
          b.oldChartWidth = b.chartWidth;
          'undefined' !== typeof c && (b.options.chart.width = c);
          'undefined' !== typeof a && (b.options.chart.height = a);
          b.getChartSize();
          b.styledMode ||
            (d ? G : K)(
              b.container,
              { width: b.chartWidth + 'px', height: b.chartHeight + 'px' },
              d
            );
          b.setChartSize(!0);
          f.setSize(b.chartWidth, b.chartHeight, d);
          b.axes.forEach(function (c) {
            c.isDirty = !0;
            c.setScale();
          });
          b.isDirtyLegend = !0;
          b.isDirtyBox = !0;
          b.layOutTitles();
          b.getMargins();
          b.redraw(d);
          b.oldChartHeight = null;
          N(b, 'resize');
          fa(function () {
            b &&
              N(b, 'endResize', null, function () {
                --b.isResizing;
              });
          }, y(d).duration);
        };
        b.prototype.setChartSize = function (c) {
          var a = this.inverted,
            d = this.renderer,
            b = this.chartWidth,
            f = this.chartHeight,
            g = this.options.chart,
            h = this.spacing,
            k = this.clipOffset,
            m,
            e,
            p,
            l;
          this.plotLeft = m = Math.round(this.plotLeft);
          this.plotTop = e = Math.round(this.plotTop);
          this.plotWidth = p = Math.max(
            0,
            Math.round(b - m - this.marginRight)
          );
          this.plotHeight = l = Math.max(
            0,
            Math.round(f - e - this.marginBottom)
          );
          this.plotSizeX = a ? l : p;
          this.plotSizeY = a ? p : l;
          this.plotBorderWidth = g.plotBorderWidth || 0;
          this.spacingBox = d.spacingBox = {
            x: h[3],
            y: h[0],
            width: b - h[3] - h[1],
            height: f - h[0] - h[2],
          };
          this.plotBox = d.plotBox = { x: m, y: e, width: p, height: l };
          a = 2 * Math.floor(this.plotBorderWidth / 2);
          b = Math.ceil(Math.max(a, k[3]) / 2);
          f = Math.ceil(Math.max(a, k[0]) / 2);
          this.clipBox = {
            x: b,
            y: f,
            width: Math.floor(this.plotSizeX - Math.max(a, k[1]) / 2 - b),
            height: Math.max(
              0,
              Math.floor(this.plotSizeY - Math.max(a, k[2]) / 2 - f)
            ),
          };
          c ||
            (this.axes.forEach(function (c) {
              c.setAxisSize();
              c.setAxisTranslation();
            }),
            d.alignElements());
          N(this, 'afterSetChartSize', { skipAxes: c });
        };
        b.prototype.resetMargins = function () {
          N(this, 'resetMargins');
          var c = this,
            a = c.options.chart;
          ['margin', 'spacing'].forEach(function (d) {
            var b = a[d],
              f = Q(b) ? b : [b, b, b, b];
            ['Top', 'Right', 'Bottom', 'Left'].forEach(function (b, g) {
              c[d][g] = O(a[d + b], f[g]);
            });
          });
          p.forEach(function (a, d) {
            c[a] = O(c.margin[d], c.spacing[d]);
          });
          c.axisOffset = [0, 0, 0, 0];
          c.clipOffset = [0, 0, 0, 0];
        };
        b.prototype.drawChartBox = function () {
          var c = this.options.chart,
            a = this.renderer,
            d = this.chartWidth,
            b = this.chartHeight,
            f = this.styledMode,
            g = this.plotBGImage,
            h = c.backgroundColor,
            k = c.plotBackgroundColor,
            m = c.plotBackgroundImage,
            e = this.plotLeft,
            p = this.plotTop,
            l = this.plotWidth,
            u = this.plotHeight,
            r = this.plotBox,
            n = this.clipRect,
            w = this.clipBox,
            x = this.chartBackground,
            y = this.plotBackground,
            B = this.plotBorder,
            D,
            q = 'animate';
          x ||
            ((this.chartBackground = x =
              a.rect().addClass('highcharts-background').add()),
            (q = 'attr'));
          if (f) var H = (D = x.strokeWidth());
          else {
            H = c.borderWidth || 0;
            D = H + (c.shadow ? 8 : 0);
            h = { fill: h || 'none' };
            if (H || x['stroke-width'])
              (h.stroke = c.borderColor), (h['stroke-width'] = H);
            x.attr(h).shadow(c.shadow);
          }
          x[q]({
            x: D / 2,
            y: D / 2,
            width: d - D - (H % 2),
            height: b - D - (H % 2),
            r: c.borderRadius,
          });
          q = 'animate';
          y ||
            ((q = 'attr'),
            (this.plotBackground = y =
              a.rect().addClass('highcharts-plot-background').add()));
          y[q](r);
          f ||
            (y.attr({ fill: k || 'none' }).shadow(c.plotShadow),
            m &&
              (g
                ? (m !== g.attr('href') && g.attr('href', m), g.animate(r))
                : (this.plotBGImage = a.image(m, e, p, l, u).add())));
          n
            ? n.animate({ width: w.width, height: w.height })
            : (this.clipRect = a.clipRect(w));
          q = 'animate';
          B ||
            ((q = 'attr'),
            (this.plotBorder = B =
              a
                .rect()
                .addClass('highcharts-plot-border')
                .attr({ zIndex: 1 })
                .add()));
          f ||
            B.attr({
              stroke: c.plotBorderColor,
              'stroke-width': c.plotBorderWidth || 0,
              fill: 'none',
            });
          B[q](B.crisp({ x: e, y: p, width: l, height: u }, -B.strokeWidth()));
          this.isDirtyBox = !1;
          N(this, 'afterDrawChartBox');
        };
        b.prototype.propFromSeries = function () {
          var c = this,
            a = c.options.chart,
            d = c.options.series,
            b,
            f,
            g;
          ['inverted', 'angular', 'polar'].forEach(function (h) {
            f = u[a.type || a.defaultSeriesType];
            g = a[h] || (f && f.prototype[h]);
            for (b = d && d.length; !g && b--; )
              (f = u[d[b].type]) && f.prototype[h] && (g = !0);
            c[h] = g;
          });
        };
        b.prototype.linkSeries = function () {
          var c = this,
            a = c.series;
          a.forEach(function (c) {
            c.linkedSeries.length = 0;
          });
          a.forEach(function (a) {
            var d = a.options.linkedTo;
            U(d) &&
              (d = ':previous' === d ? c.series[a.index - 1] : c.get(d)) &&
              d.linkedParent !== a &&
              (d.linkedSeries.push(a),
              (a.linkedParent = d),
              d.enabledDataSorting && a.setDataSortingOptions(),
              (a.visible = O(a.options.visible, d.options.visible, a.visible)));
          });
          N(this, 'afterLinkSeries');
        };
        b.prototype.renderSeries = function () {
          this.series.forEach(function (c) {
            c.translate();
            c.render();
          });
        };
        b.prototype.renderLabels = function () {
          var c = this,
            a = c.options.labels;
          a.items &&
            a.items.forEach(function (d) {
              var b = ca(a.style, d.style),
                f = da(b.left) + c.plotLeft,
                g = da(b.top) + c.plotTop + 12;
              delete b.left;
              delete b.top;
              c.renderer.text(d.html, f, g).attr({ zIndex: 2 }).css(b).add();
            });
        };
        b.prototype.render = function () {
          var c = this.axes,
            a = this.colorAxis,
            d = this.renderer,
            b = this.options,
            f = function (c) {
              c.forEach(function (c) {
                c.visible && c.render();
              });
            },
            g = 0;
          this.setTitle();
          this.legend = new A(this, b.legend);
          this.getStacks && this.getStacks();
          this.getMargins(!0);
          this.setChartSize();
          b = this.plotWidth;
          c.some(function (c) {
            if (
              c.horiz &&
              c.visible &&
              c.options.labels.enabled &&
              c.series.length
            )
              return (g = 21), !0;
          });
          var h = (this.plotHeight = Math.max(this.plotHeight - g, 0));
          c.forEach(function (c) {
            c.setScale();
          });
          this.getAxisMargins();
          var k = 1.1 < b / this.plotWidth,
            m = 1.05 < h / this.plotHeight;
          if (k || m)
            c.forEach(function (c) {
              ((c.horiz && k) || (!c.horiz && m)) && c.setTickInterval(!0);
            }),
              this.getMargins();
          this.drawChartBox();
          this.hasCartesianSeries ? f(c) : a && a.length && f(a);
          this.seriesGroup ||
            (this.seriesGroup = d.g('series-group').attr({ zIndex: 3 }).add());
          this.renderSeries();
          this.renderLabels();
          this.addCredits();
          this.setResponsive && this.setResponsive();
          this.hasRendered = !0;
        };
        b.prototype.addCredits = function (c) {
          var a = this,
            d = T(!0, this.options.credits, c);
          d.enabled &&
            !this.credits &&
            ((this.credits = this.renderer
              .text(d.text + (this.mapCredits || ''), 0, 0)
              .addClass('highcharts-credits')
              .on('click', function () {
                d.href && (w.location.href = d.href);
              })
              .attr({ align: d.position.align, zIndex: 8 })),
            a.styledMode || this.credits.css(d.style),
            this.credits.add().align(d.position),
            (this.credits.update = function (c) {
              a.credits = a.credits.destroy();
              a.addCredits(c);
            }));
        };
        b.prototype.destroy = function () {
          var c = this,
            a = c.axes,
            d = c.series,
            b = c.container,
            f = b && b.parentNode,
            g;
          N(c, 'destroy');
          c.renderer.forExport ? J(m, c) : (m[c.index] = void 0);
          t.chartCount--;
          c.renderTo.removeAttribute('data-highcharts-chart');
          ia(c);
          for (g = a.length; g--; ) a[g] = a[g].destroy();
          this.scroller && this.scroller.destroy && this.scroller.destroy();
          for (g = d.length; g--; ) d[g] = d[g].destroy();
          'title subtitle chartBackground plotBackground plotBGImage plotBorder seriesGroup clipRect credits pointer rangeSelector legend resetZoomButton tooltip renderer'
            .split(' ')
            .forEach(function (a) {
              var d = c[a];
              d && d.destroy && (c[a] = d.destroy());
            });
          b && ((b.innerHTML = k.emptyHTML), ia(b), f && X(b));
          V(c, function (a, d) {
            delete c[d];
          });
        };
        b.prototype.firstRender = function () {
          var c = this,
            a = c.options;
          if (!c.isReadyToRender || c.isReadyToRender()) {
            c.getContainer();
            c.resetMargins();
            c.setChartSize();
            c.propFromSeries();
            c.getAxes();
            (R(a.series) ? a.series : []).forEach(function (a) {
              c.initSeries(a);
            });
            c.linkSeries();
            c.setSeriesData();
            N(c, 'beforeRender');
            q &&
              (C.isRequired()
                ? (c.pointer = new C(c, a))
                : (c.pointer = new q(c, a)));
            c.render();
            c.pointer.getChartPosition();
            if (!c.renderer.imgCount && !c.hasLoaded) c.onload();
            c.temporaryDisplay(!0);
          }
        };
        b.prototype.onload = function () {
          this.callbacks.concat([this.callback]).forEach(function (c) {
            c && 'undefined' !== typeof this.index && c.apply(this, [this]);
          }, this);
          N(this, 'load');
          N(this, 'render');
          S(this.index) && this.setReflow(this.options.chart.reflow);
          this.hasLoaded = !0;
        };
        b.prototype.addSeries = function (c, a, d) {
          var b = this,
            f;
          c &&
            ((a = O(a, !0)),
            N(b, 'addSeries', { options: c }, function () {
              f = b.initSeries(c);
              b.isDirtyLegend = !0;
              b.linkSeries();
              f.enabledDataSorting && f.setData(c.data, !1);
              N(b, 'afterAddSeries', { series: f });
              a && b.redraw(d);
            }));
          return f;
        };
        b.prototype.addAxis = function (c, a, d, b) {
          return this.createAxis(a ? 'xAxis' : 'yAxis', {
            axis: c,
            redraw: d,
            animation: b,
          });
        };
        b.prototype.addColorAxis = function (c, a, d) {
          return this.createAxis('colorAxis', {
            axis: c,
            redraw: a,
            animation: d,
          });
        };
        b.prototype.createAxis = function (c, a) {
          c = new e(
            this,
            T(a.axis, { index: this[c].length, isX: 'xAxis' === c })
          );
          O(a.redraw, !0) && this.redraw(a.animation);
          return c;
        };
        b.prototype.showLoading = function (c) {
          var a = this,
            d = a.options,
            b = d.loading,
            f = function () {
              g &&
                K(g, {
                  left: a.plotLeft + 'px',
                  top: a.plotTop + 'px',
                  width: a.plotWidth + 'px',
                  height: a.plotHeight + 'px',
                });
            },
            g = a.loadingDiv,
            h = a.loadingSpan;
          g ||
            (a.loadingDiv = g =
              I(
                'div',
                { className: 'highcharts-loading highcharts-loading-hidden' },
                null,
                a.container
              ));
          h ||
            ((a.loadingSpan = h =
              I('span', { className: 'highcharts-loading-inner' }, null, g)),
            D(a, 'redraw', f));
          g.className = 'highcharts-loading';
          k.setElementHTML(h, O(c, d.lang.loading, ''));
          a.styledMode ||
            (K(g, ca(b.style, { zIndex: 10 })),
            K(h, b.labelStyle),
            a.loadingShown ||
              (K(g, { opacity: 0, display: '' }),
              G(
                g,
                { opacity: b.style.opacity || 0.5 },
                { duration: b.showDuration || 0 }
              )));
          a.loadingShown = !0;
          f();
        };
        b.prototype.hideLoading = function () {
          var c = this.options,
            a = this.loadingDiv;
          a &&
            ((a.className = 'highcharts-loading highcharts-loading-hidden'),
            this.styledMode ||
              G(
                a,
                { opacity: 0 },
                {
                  duration: c.loading.hideDuration || 100,
                  complete: function () {
                    K(a, { display: 'none' });
                  },
                }
              ));
          this.loadingShown = !1;
        };
        b.prototype.update = function (c, d, b, f) {
          var g = this,
            h = {
              credits: 'addCredits',
              title: 'setTitle',
              subtitle: 'setSubtitle',
              caption: 'setCaption',
            },
            k = c.isResponsiveOptions,
            m = [],
            e,
            p;
          N(g, 'update', { options: c });
          k || g.setResponsive(!1, !0);
          c = L(c, g.options);
          g.userOptions = T(g.userOptions, c);
          var l = c.chart;
          if (l) {
            T(!0, g.options.chart, l);
            'className' in l && g.setClassName(l.className);
            'reflow' in l && g.setReflow(l.reflow);
            if ('inverted' in l || 'polar' in l || 'type' in l) {
              g.propFromSeries();
              var u = !0;
            }
            'alignTicks' in l && (u = !0);
            'events' in l && r(this, l);
            V(l, function (c, a) {
              -1 !== g.propsRequireUpdateSeries.indexOf('chart.' + a) &&
                (e = !0);
              -1 !== g.propsRequireDirtyBox.indexOf(a) && (g.isDirtyBox = !0);
              -1 !== g.propsRequireReflow.indexOf(a) &&
                (k ? (g.isDirtyBox = !0) : (p = !0));
            });
            !g.styledMode &&
              l.style &&
              g.renderer.setStyle(g.options.chart.style || {});
          }
          !g.styledMode && c.colors && (this.options.colors = c.colors);
          c.time &&
            (this.time === F && (this.time = new a(c.time)),
            T(!0, g.options.time, c.time));
          V(c, function (a, d) {
            if (g[d] && 'function' === typeof g[d].update) g[d].update(a, !1);
            else if ('function' === typeof g[h[d]]) g[h[d]](a);
            else
              'colors' !== d &&
                -1 === g.collectionsWithUpdate.indexOf(d) &&
                T(!0, g.options[d], c[d]);
            'chart' !== d &&
              -1 !== g.propsRequireUpdateSeries.indexOf(d) &&
              (e = !0);
          });
          this.collectionsWithUpdate.forEach(function (a) {
            if (c[a]) {
              var d = [];
              g[a].forEach(function (c, a) {
                c.options.isInternal || d.push(O(c.options.index, a));
              });
              ba(c[a]).forEach(function (c, f) {
                var h = S(c.id),
                  k;
                h && (k = g.get(c.id));
                !k &&
                  g[a] &&
                  (k = g[a][d ? d[f] : f]) &&
                  h &&
                  S(k.options.id) &&
                  (k = void 0);
                k && k.coll === a && (k.update(c, !1), b && (k.touched = !0));
                !k &&
                  b &&
                  g.collectionsWithInit[a] &&
                  (g.collectionsWithInit[a][0].apply(
                    g,
                    [c].concat(g.collectionsWithInit[a][1] || []).concat([!1])
                  ).touched = !0);
              });
              b &&
                g[a].forEach(function (c) {
                  c.touched || c.options.isInternal
                    ? delete c.touched
                    : m.push(c);
                });
            }
          });
          m.forEach(function (c) {
            c.chart && c.remove && c.remove(!1);
          });
          u &&
            g.axes.forEach(function (c) {
              c.update({}, !1);
            });
          e &&
            g.getSeriesOrderByLinks().forEach(function (c) {
              c.chart && c.update({}, !1);
            }, this);
          u = l && l.width;
          l = l && (U(l.height) ? ea(l.height, u || g.chartWidth) : l.height);
          p || (aa(u) && u !== g.chartWidth) || (aa(l) && l !== g.chartHeight)
            ? g.setSize(u, l, f)
            : O(d, !0) && g.redraw(f);
          N(g, 'afterUpdate', { options: c, redraw: d, animation: f });
        };
        b.prototype.setSubtitle = function (c, a) {
          this.applyDescription('subtitle', c);
          this.layOutTitles(a);
        };
        b.prototype.setCaption = function (c, a) {
          this.applyDescription('caption', c);
          this.layOutTitles(a);
        };
        b.prototype.showResetZoom = function () {
          function c() {
            a.zoomOut();
          }
          var a = this,
            d = g.lang,
            b = a.options.chart.resetZoomButton,
            f = b.theme,
            h = f.states,
            k =
              'chart' === b.relativeTo || 'spacingBox' === b.relativeTo
                ? null
                : 'scrollablePlotBox';
          N(this, 'beforeShowResetZoom', null, function () {
            a.resetZoomButton = a.renderer
              .button(d.resetZoom, null, null, c, f, h && h.hover)
              .attr({ align: b.position.align, title: d.resetZoomTitle })
              .addClass('highcharts-reset-zoom')
              .add()
              .align(b.position, !1, k);
          });
          N(this, 'afterShowResetZoom');
        };
        b.prototype.zoomOut = function () {
          N(this, 'selection', { resetSelection: !0 }, this.zoom);
        };
        b.prototype.zoom = function (c) {
          var a = this,
            d = a.pointer,
            b = a.inverted ? d.mouseDownX : d.mouseDownY,
            f = !1,
            g;
          !c || c.resetSelection
            ? (a.axes.forEach(function (c) {
                g = c.zoom();
              }),
              (d.initiated = !1))
            : c.xAxis.concat(c.yAxis).forEach(function (c) {
                var h = c.axis,
                  k = a.inverted ? h.left : h.top,
                  m = a.inverted ? k + h.width : k + h.height,
                  e = h.isXAxis,
                  l = !1;
                if ((!e && b >= k && b <= m) || e || !S(b)) l = !0;
                d[e ? 'zoomX' : 'zoomY'] &&
                  l &&
                  ((g = h.zoom(c.min, c.max)), h.displayBtn && (f = !0));
              });
          var h = a.resetZoomButton;
          f && !h
            ? a.showResetZoom()
            : !f && Q(h) && (a.resetZoomButton = h.destroy());
          g &&
            a.redraw(
              O(a.options.chart.animation, c && c.animation, 100 > a.pointCount)
            );
        };
        b.prototype.pan = function (c, a) {
          var d = this,
            b = d.hoverPoints;
          a = 'object' === typeof a ? a : { enabled: a, type: 'x' };
          var f = d.options.chart,
            g = d.options.mapNavigation && d.options.mapNavigation.enabled;
          f && f.panning && (f.panning = a);
          var h = a.type,
            k;
          N(this, 'pan', { originalEvent: c }, function () {
            b &&
              b.forEach(function (c) {
                c.setState();
              });
            var a = d.xAxis;
            'xy' === h ? (a = a.concat(d.yAxis)) : 'y' === h && (a = d.yAxis);
            var f = {};
            a.forEach(function (a) {
              if (a.options.panningEnabled && !a.options.isInternal) {
                var b = a.horiz,
                  m = c[b ? 'chartX' : 'chartY'];
                b = b ? 'mouseDownX' : 'mouseDownY';
                var e = d[b],
                  l = a.minPointOffset || 0,
                  p =
                    (a.reversed && !d.inverted) || (!a.reversed && d.inverted)
                      ? -1
                      : 1,
                  u = a.getExtremes(),
                  r = a.toValue(e - m, !0) + l * p,
                  n =
                    a.toValue(e + a.len - m, !0) -
                    (l * p || (a.isXAxis && a.pointRangePadding) || 0),
                  w = n < r;
                p = a.hasVerticalPanning();
                e = w ? n : r;
                r = w ? r : n;
                var x = a.panningState;
                !p ||
                  a.isXAxis ||
                  (x && !x.isDirty) ||
                  a.series.forEach(function (c) {
                    var a = c.getProcessedData(!0);
                    a = c.getExtremes(a.yData, !0);
                    x ||
                      (x = {
                        startMin: Number.MAX_VALUE,
                        startMax: -Number.MAX_VALUE,
                      });
                    aa(a.dataMin) &&
                      aa(a.dataMax) &&
                      ((x.startMin = Math.min(
                        O(c.options.threshold, Infinity),
                        a.dataMin,
                        x.startMin
                      )),
                      (x.startMax = Math.max(
                        O(c.options.threshold, -Infinity),
                        a.dataMax,
                        x.startMax
                      )));
                  });
                p = Math.min(
                  O(x && x.startMin, u.dataMin),
                  l ? u.min : a.toValue(a.toPixels(u.min) - a.minPixelPadding)
                );
                n = Math.max(
                  O(x && x.startMax, u.dataMax),
                  l ? u.max : a.toValue(a.toPixels(u.max) + a.minPixelPadding)
                );
                a.panningState = x;
                a.isOrdinal ||
                  ((l = p - e),
                  0 < l && ((r += l), (e = p)),
                  (l = r - n),
                  0 < l && ((r = n), (e -= l)),
                  a.series.length &&
                    e !== u.min &&
                    r !== u.max &&
                    e >= p &&
                    r <= n &&
                    (a.setExtremes(e, r, !1, !1, { trigger: 'pan' }),
                    d.resetZoomButton ||
                      g ||
                      e === p ||
                      r === n ||
                      !h.match('y') ||
                      (d.showResetZoom(), (a.displayBtn = !1)),
                    (k = !0)),
                  (f[b] = m));
              }
            });
            V(f, function (c, a) {
              d[a] = c;
            });
            k && d.redraw(!1);
            K(d.container, { cursor: 'move' });
          });
        };
        return b;
      })();
      ca(b.prototype, {
        callbacks: [],
        collectionsWithInit: {
          xAxis: [b.prototype.addAxis, [!0]],
          yAxis: [b.prototype.addAxis, [!1]],
          series: [b.prototype.addSeries],
        },
        collectionsWithUpdate: ['xAxis', 'yAxis', 'series'],
        propsRequireDirtyBox:
          'backgroundColor borderColor borderWidth borderRadius plotBackgroundColor plotBackgroundImage plotBorderColor plotBorderWidth plotShadow shadow'.split(
            ' '
          ),
        propsRequireReflow:
          'margin marginTop marginRight marginBottom marginLeft spacing spacingTop spacingRight spacingBottom spacingLeft'.split(
            ' '
          ),
        propsRequireUpdateSeries:
          'chart.inverted chart.polar chart.ignoreHiddenSeries chart.type colors plotOptions time tooltip'.split(
            ' '
          ),
      });
      ('');
      return b;
    }
  );
  J(e, 'Core/Legend/LegendSymbol.js', [e['Core/Utilities.js']], function (b) {
    var e = b.merge,
      v = b.pick,
      E;
    (function (b) {
      b.drawLineMarker = function (b) {
        var t = this.options,
          z = b.symbolWidth,
          q = b.symbolHeight,
          l = q / 2,
          n = this.chart.renderer,
          d = this.legendGroup;
        b = b.baseline - Math.round(0.3 * b.fontMetrics.b);
        var a = {},
          f = t.marker;
        this.chart.styledMode ||
          ((a = { 'stroke-width': t.lineWidth || 0 }),
          t.dashStyle && (a.dashstyle = t.dashStyle));
        this.legendLine = n
          .path([
            ['M', 0, b],
            ['L', z, b],
          ])
          .addClass('highcharts-graph')
          .attr(a)
          .add(d);
        f &&
          !1 !== f.enabled &&
          z &&
          ((t = Math.min(v(f.radius, l), l)),
          0 === this.symbol.indexOf('url') &&
            ((f = e(f, { width: q, height: q })), (t = 0)),
          (this.legendSymbol = z =
            n
              .symbol(this.symbol, z / 2 - t, b - t, 2 * t, 2 * t, f)
              .addClass('highcharts-point')
              .add(d)),
          (z.isMarker = !0));
      };
      b.drawRectangle = function (b, e) {
        var t = b.symbolHeight,
          q = b.options.squareSymbol;
        e.legendSymbol = this.chart.renderer
          .rect(
            q ? (b.symbolWidth - t) / 2 : 0,
            b.baseline - t + 1,
            q ? t : b.symbolWidth,
            t,
            v(b.options.symbolRadius, t / 2)
          )
          .addClass('highcharts-point')
          .attr({ zIndex: 3 })
          .add(e.legendGroup);
      };
    })(E || (E = {}));
    return E;
  });
  J(e, 'Core/Series/SeriesDefaults.js', [], function () {
    return {
      lineWidth: 2,
      allowPointSelect: !1,
      crisp: !0,
      showCheckbox: !1,
      animation: { duration: 1e3 },
      events: {},
      marker: {
        enabledThreshold: 2,
        lineColor: '#ffffff',
        lineWidth: 0,
        radius: 4,
        states: {
          normal: { animation: !0 },
          hover: {
            animation: { duration: 50 },
            enabled: !0,
            radiusPlus: 2,
            lineWidthPlus: 1,
          },
          select: { fillColor: '#cccccc', lineColor: '#000000', lineWidth: 2 },
        },
      },
      point: { events: {} },
      dataLabels: {
        animation: {},
        align: 'center',
        defer: !0,
        formatter: function () {
          var b = this.series.chart.numberFormatter;
          return 'number' !== typeof this.y ? '' : b(this.y, -1);
        },
        padding: 5,
        style: {
          fontSize: '11px',
          fontWeight: 'bold',
          color: 'contrast',
          textOutline: '1px contrast',
        },
        verticalAlign: 'bottom',
        x: 0,
        y: 0,
      },
      cropThreshold: 300,
      opacity: 1,
      pointRange: 0,
      softThreshold: !0,
      states: {
        normal: { animation: !0 },
        hover: {
          animation: { duration: 50 },
          lineWidthPlus: 1,
          marker: {},
          halo: { size: 10, opacity: 0.25 },
        },
        select: { animation: { duration: 0 } },
        inactive: { animation: { duration: 50 }, opacity: 0.2 },
      },
      stickyTracking: !0,
      turboThreshold: 1e3,
      findNearestPointBy: 'x',
    };
  });
  J(
    e,
    'Core/Series/Series.js',
    [
      e['Core/Animation/AnimationUtilities.js'],
      e['Core/DefaultOptions.js'],
      e['Core/Foundation.js'],
      e['Core/Globals.js'],
      e['Core/Legend/LegendSymbol.js'],
      e['Core/Series/Point.js'],
      e['Core/Series/SeriesDefaults.js'],
      e['Core/Series/SeriesRegistry.js'],
      e['Core/Renderer/SVG/SVGElement.js'],
      e['Core/Utilities.js'],
    ],
    function (b, e, v, E, t, A, C, z, q, l) {
      var n = b.animObject,
        d = b.setAnimation,
        a = e.defaultOptions,
        f = v.registerEventOptions,
        k = E.hasTouch,
        G = E.svg,
        y = E.win,
        B = z.seriesTypes,
        x = l.addEvent,
        r = l.arrayMax,
        m = l.arrayMin,
        h = l.clamp,
        p = l.cleanRecursively,
        c = l.correctFloat,
        w = l.defined,
        g = l.erase,
        F = l.error,
        u = l.extend,
        D = l.find,
        H = l.fireEvent,
        L = l.getNestedProperty,
        I = l.isArray,
        K = l.isNumber,
        S = l.isString,
        X = l.merge,
        J = l.objectEach,
        M = l.pick,
        ca = l.removeEvent,
        ha = l.splat,
        N = l.syncTimeout;
      b = (function () {
        function b() {
          this.zones =
            this.yAxis =
            this.xAxis =
            this.userOptions =
            this.tooltipOptions =
            this.processedYData =
            this.processedXData =
            this.points =
            this.options =
            this.linkedSeries =
            this.index =
            this.eventsToUnbind =
            this.eventOptions =
            this.data =
            this.chart =
            this._i =
              void 0;
        }
        b.prototype.init = function (c, a) {
          H(this, 'init', { options: a });
          var b = this,
            d = c.series;
          this.eventsToUnbind = [];
          b.chart = c;
          b.options = b.setOptions(a);
          a = b.options;
          b.linkedSeries = [];
          b.bindAxes();
          u(b, {
            name: a.name,
            state: '',
            visible: !1 !== a.visible,
            selected: !0 === a.selected,
          });
          f(this, a);
          var g = a.events;
          if (
            (g && g.click) ||
            (a.point && a.point.events && a.point.events.click) ||
            a.allowPointSelect
          )
            c.runTrackerClick = !0;
          b.getColor();
          b.getSymbol();
          b.parallelArrays.forEach(function (c) {
            b[c + 'Data'] || (b[c + 'Data'] = []);
          });
          b.isCartesian && (c.hasCartesianSeries = !0);
          var h;
          d.length && (h = d[d.length - 1]);
          b._i = M(h && h._i, -1) + 1;
          b.opacity = b.options.opacity;
          c.orderSeries(this.insert(d));
          a.dataSorting && a.dataSorting.enabled
            ? b.setDataSortingOptions()
            : b.points || b.data || b.setData(a.data, !1);
          H(this, 'afterInit');
        };
        b.prototype.is = function (c) {
          return B[c] && this instanceof B[c];
        };
        b.prototype.insert = function (c) {
          var a = this.options.index,
            b;
          if (K(a)) {
            for (b = c.length; b--; )
              if (a >= M(c[b].options.index, c[b]._i)) {
                c.splice(b + 1, 0, this);
                break;
              }
            -1 === b && c.unshift(this);
            b += 1;
          } else c.push(this);
          return M(b, c.length - 1);
        };
        b.prototype.bindAxes = function () {
          var c = this,
            a = c.options,
            b = c.chart,
            d;
          H(this, 'bindAxes', null, function () {
            (c.axisTypes || []).forEach(function (f) {
              var g = 0;
              b[f].forEach(function (b) {
                d = b.options;
                if (
                  (a[f] === g && !d.isInternal) ||
                  ('undefined' !== typeof a[f] && a[f] === d.id) ||
                  ('undefined' === typeof a[f] && 0 === d.index)
                )
                  c.insert(b.series), (c[f] = b), (b.isDirty = !0);
                d.isInternal || g++;
              });
              c[f] || c.optionalAxis === f || F(18, !0, b);
            });
          });
          H(this, 'afterBindAxes');
        };
        b.prototype.updateParallelArrays = function (c, a) {
          var b = c.series,
            d = arguments,
            f = K(a)
              ? function (d) {
                  var f = 'y' === d && b.toYData ? b.toYData(c) : c[d];
                  b[d + 'Data'][a] = f;
                }
              : function (c) {
                  Array.prototype[a].apply(
                    b[c + 'Data'],
                    Array.prototype.slice.call(d, 2)
                  );
                };
          b.parallelArrays.forEach(f);
        };
        b.prototype.hasData = function () {
          return (
            (this.visible &&
              'undefined' !== typeof this.dataMax &&
              'undefined' !== typeof this.dataMin) ||
            (this.visible && this.yData && 0 < this.yData.length)
          );
        };
        b.prototype.autoIncrement = function (c) {
          var a = this.options,
            b = a.pointIntervalUnit,
            d = a.relativeXValue,
            f = this.chart.time,
            g = this.xIncrement,
            h;
          g = M(g, a.pointStart, 0);
          this.pointInterval = h = M(this.pointInterval, a.pointInterval, 1);
          d && K(c) && (h *= c);
          b &&
            ((a = new f.Date(g)),
            'day' === b
              ? f.set('Date', a, f.get('Date', a) + h)
              : 'month' === b
                ? f.set('Month', a, f.get('Month', a) + h)
                : 'year' === b &&
                  f.set('FullYear', a, f.get('FullYear', a) + h),
            (h = a.getTime() - g));
          if (d && K(c)) return g + h;
          this.xIncrement = g + h;
          return g;
        };
        b.prototype.setDataSortingOptions = function () {
          var c = this.options;
          u(this, {
            requireSorting: !1,
            sorted: !1,
            enabledDataSorting: !0,
            allowDG: !1,
          });
          w(c.pointRange) || (c.pointRange = 1);
        };
        b.prototype.setOptions = function (c) {
          var b = this.chart,
            d = b.options,
            f = d.plotOptions,
            g = b.userOptions || {};
          c = X(c);
          b = b.styledMode;
          var h = { plotOptions: f, userOptions: c };
          H(this, 'setOptions', h);
          var k = h.plotOptions[this.type],
            e = g.plotOptions || {};
          this.userOptions = h.userOptions;
          g = X(k, f.series, g.plotOptions && g.plotOptions[this.type], c);
          this.tooltipOptions = X(
            a.tooltip,
            a.plotOptions.series && a.plotOptions.series.tooltip,
            a.plotOptions[this.type].tooltip,
            d.tooltip.userOptions,
            f.series && f.series.tooltip,
            f[this.type].tooltip,
            c.tooltip
          );
          this.stickyTracking = M(
            c.stickyTracking,
            e[this.type] && e[this.type].stickyTracking,
            e.series && e.series.stickyTracking,
            this.tooltipOptions.shared && !this.noSharedTooltip
              ? !0
              : g.stickyTracking
          );
          null === k.marker && delete g.marker;
          this.zoneAxis = g.zoneAxis;
          f = this.zones = (g.zones || []).slice();
          (!g.negativeColor && !g.negativeFillColor) ||
            g.zones ||
            ((d = {
              value: g[this.zoneAxis + 'Threshold'] || g.threshold || 0,
              className: 'highcharts-negative',
            }),
            b ||
              ((d.color = g.negativeColor),
              (d.fillColor = g.negativeFillColor)),
            f.push(d));
          f.length &&
            w(f[f.length - 1].value) &&
            f.push(b ? {} : { color: this.color, fillColor: this.fillColor });
          H(this, 'afterSetOptions', { options: g });
          return g;
        };
        b.prototype.getName = function () {
          return M(this.options.name, 'Series ' + (this.index + 1));
        };
        b.prototype.getCyclic = function (c, a, b) {
          var d = this.chart,
            f = this.userOptions,
            g = c + 'Index',
            h = c + 'Counter',
            k = b ? b.length : M(d.options.chart[c + 'Count'], d[c + 'Count']);
          if (!a) {
            var e = M(f[g], f['_' + g]);
            w(e) ||
              (d.series.length || (d[h] = 0),
              (f['_' + g] = e = d[h] % k),
              (d[h] += 1));
            b && (a = b[e]);
          }
          'undefined' !== typeof e && (this[g] = e);
          this[c] = a;
        };
        b.prototype.getColor = function () {
          this.chart.styledMode
            ? this.getCyclic('color')
            : this.options.colorByPoint
              ? (this.color = '#cccccc')
              : this.getCyclic(
                  'color',
                  this.options.color || a.plotOptions[this.type].color,
                  this.chart.options.colors
                );
        };
        b.prototype.getPointsCollection = function () {
          return (this.hasGroupedData ? this.points : this.data) || [];
        };
        b.prototype.getSymbol = function () {
          this.getCyclic(
            'symbol',
            this.options.marker.symbol,
            this.chart.options.symbols
          );
        };
        b.prototype.findPointIndex = function (c, a) {
          var b = c.id,
            d = c.x,
            f = this.points,
            g = this.options.dataSorting,
            h,
            k;
          if (b) (g = this.chart.get(b)), g instanceof A && (h = g);
          else if (
            this.linkedParent ||
            this.enabledDataSorting ||
            this.options.relativeXValue
          )
            if (
              ((h = function (a) {
                return !a.touched && a.index === c.index;
              }),
              g && g.matchByName
                ? (h = function (a) {
                    return !a.touched && a.name === c.name;
                  })
                : this.options.relativeXValue &&
                  (h = function (a) {
                    return !a.touched && a.options.x === c.x;
                  }),
              (h = D(f, h)),
              !h)
            )
              return;
          if (h) {
            var e = h && h.index;
            'undefined' !== typeof e && (k = !0);
          }
          'undefined' === typeof e && K(d) && (e = this.xData.indexOf(d, a));
          -1 !== e &&
            'undefined' !== typeof e &&
            this.cropped &&
            (e = e >= this.cropStart ? e - this.cropStart : e);
          !k && K(e) && f[e] && f[e].touched && (e = void 0);
          return e;
        };
        b.prototype.updateData = function (c, a) {
          var b = this.options,
            d = b.dataSorting,
            f = this.points,
            g = [],
            h = this.requireSorting,
            k = c.length === f.length,
            e,
            m,
            l,
            p = !0;
          this.xIncrement = null;
          c.forEach(function (c, a) {
            var m =
                (w(c) &&
                  this.pointClass.prototype.optionsToObject.call(
                    { series: this },
                    c
                  )) ||
                {},
              p = m.x;
            if (m.id || K(p)) {
              if (
                ((m = this.findPointIndex(m, l)),
                -1 === m || 'undefined' === typeof m
                  ? g.push(c)
                  : f[m] && c !== b.data[m]
                    ? (f[m].update(c, !1, null, !1),
                      (f[m].touched = !0),
                      h && (l = m + 1))
                    : f[m] && (f[m].touched = !0),
                !k || a !== m || (d && d.enabled) || this.hasDerivedData)
              )
                e = !0;
            } else g.push(c);
          }, this);
          if (e)
            for (c = f.length; c--; )
              (m = f[c]) && !m.touched && m.remove && m.remove(!1, a);
          else
            !k || (d && d.enabled)
              ? (p = !1)
              : (c.forEach(function (c, a) {
                  c !== f[a].y && f[a].update && f[a].update(c, !1, null, !1);
                }),
                (g.length = 0));
          f.forEach(function (c) {
            c && (c.touched = !1);
          });
          if (!p) return !1;
          g.forEach(function (c) {
            this.addPoint(c, !1, null, null, !1);
          }, this);
          null === this.xIncrement &&
            this.xData &&
            this.xData.length &&
            ((this.xIncrement = r(this.xData)), this.autoIncrement());
          return !0;
        };
        b.prototype.setData = function (c, a, b, d) {
          var f = this,
            g = f.points,
            h = (g && g.length) || 0,
            k = f.options,
            e = f.chart,
            m = k.dataSorting,
            l = f.xAxis,
            p = k.turboThreshold,
            u = this.xData,
            r = this.yData,
            n = f.pointArrayMap;
          n = n && n.length;
          var w = k.keys,
            x,
            y = 0,
            B = 1,
            D = null;
          c = c || [];
          var q = c.length;
          a = M(a, !0);
          m && m.enabled && (c = this.sortData(c));
          !1 !== d &&
            q &&
            h &&
            !f.cropped &&
            !f.hasGroupedData &&
            f.visible &&
            !f.isSeriesBoosting &&
            (x = this.updateData(c, b));
          if (!x) {
            f.xIncrement = null;
            f.colorCounter = 0;
            this.parallelArrays.forEach(function (c) {
              f[c + 'Data'].length = 0;
            });
            if (p && q > p)
              if (((D = f.getFirstValidPoint(c)), K(D)))
                for (b = 0; b < q; b++)
                  (u[b] = this.autoIncrement()), (r[b] = c[b]);
              else if (I(D))
                if (n)
                  if (D.length === n)
                    for (b = 0; b < q; b++)
                      (u[b] = this.autoIncrement()), (r[b] = c[b]);
                  else
                    for (b = 0; b < q; b++)
                      (d = c[b]), (u[b] = d[0]), (r[b] = d.slice(1, n + 1));
                else if (
                  (w &&
                    ((y = w.indexOf('x')),
                    (B = w.indexOf('y')),
                    (y = 0 <= y ? y : 0),
                    (B = 0 <= B ? B : 1)),
                  1 === D.length && (B = 0),
                  y === B)
                )
                  for (b = 0; b < q; b++)
                    (u[b] = this.autoIncrement()), (r[b] = c[b][B]);
                else
                  for (b = 0; b < q; b++)
                    (d = c[b]), (u[b] = d[y]), (r[b] = d[B]);
              else F(12, !1, e);
            else
              for (b = 0; b < q; b++)
                'undefined' !== typeof c[b] &&
                  ((d = { series: f }),
                  f.pointClass.prototype.applyOptions.apply(d, [c[b]]),
                  f.updateParallelArrays(d, b));
            r && S(r[0]) && F(14, !0, e);
            f.data = [];
            f.options.data = f.userOptions.data = c;
            for (b = h; b--; ) g[b] && g[b].destroy && g[b].destroy();
            l && (l.minRange = l.userMinRange);
            f.isDirty = e.isDirtyBox = !0;
            f.isDirtyData = !!g;
            b = !1;
          }
          'point' === k.legendType &&
            (this.processData(), this.generatePoints());
          a && e.redraw(b);
        };
        b.prototype.sortData = function (c) {
          var a = this,
            b = a.options.dataSorting.sortKey || 'y',
            d = function (c, a) {
              return (
                (w(a) &&
                  c.pointClass.prototype.optionsToObject.call(
                    { series: c },
                    a
                  )) ||
                {}
              );
            };
          c.forEach(function (b, f) {
            c[f] = d(a, b);
            c[f].index = f;
          }, this);
          c.concat()
            .sort(function (c, a) {
              c = L(b, c);
              a = L(b, a);
              return a < c ? -1 : a > c ? 1 : 0;
            })
            .forEach(function (c, a) {
              c.x = a;
            }, this);
          a.linkedSeries &&
            a.linkedSeries.forEach(function (a) {
              var b = a.options,
                f = b.data;
              (b.dataSorting && b.dataSorting.enabled) ||
                !f ||
                (f.forEach(function (b, g) {
                  f[g] = d(a, b);
                  c[g] && ((f[g].x = c[g].x), (f[g].index = g));
                }),
                a.setData(f, !1));
            });
          return c;
        };
        b.prototype.getProcessedData = function (c) {
          var a = this.xAxis,
            b = this.options,
            d = b.cropThreshold,
            f = c || this.getExtremesFromAll || b.getExtremesFromAll,
            g = this.isCartesian;
          c = a && a.val2lin;
          b = !(!a || !a.logarithmic);
          var h = 0,
            k = this.xData,
            e = this.yData,
            m = this.requireSorting;
          var l = !1;
          var p = k.length;
          if (a) {
            l = a.getExtremes();
            var u = l.min;
            var r = l.max;
            l = !(!a.categories || a.names.length);
          }
          if (g && this.sorted && !f && (!d || p > d || this.forceCrop))
            if (k[p - 1] < u || k[0] > r) (k = []), (e = []);
            else if (this.yData && (k[0] < u || k[p - 1] > r)) {
              var n = this.cropData(this.xData, this.yData, u, r);
              k = n.xData;
              e = n.yData;
              h = n.start;
              n = !0;
            }
          for (d = k.length || 1; --d; )
            if (
              ((a = b ? c(k[d]) - c(k[d - 1]) : k[d] - k[d - 1]),
              0 < a && ('undefined' === typeof w || a < w))
            )
              var w = a;
            else 0 > a && m && !l && (F(15, !1, this.chart), (m = !1));
          return {
            xData: k,
            yData: e,
            cropped: n,
            cropStart: h,
            closestPointRange: w,
          };
        };
        b.prototype.processData = function (c) {
          var a = this.xAxis;
          if (
            this.isCartesian &&
            !this.isDirty &&
            !a.isDirty &&
            !this.yAxis.isDirty &&
            !c
          )
            return !1;
          c = this.getProcessedData();
          this.cropped = c.cropped;
          this.cropStart = c.cropStart;
          this.processedXData = c.xData;
          this.processedYData = c.yData;
          this.closestPointRange = this.basePointRange = c.closestPointRange;
          H(this, 'afterProcessData');
        };
        b.prototype.cropData = function (c, a, b, d, f) {
          var g = c.length,
            h,
            k = 0,
            e = g;
          f = M(f, this.cropShoulder);
          for (h = 0; h < g; h++)
            if (c[h] >= b) {
              k = Math.max(0, h - f);
              break;
            }
          for (b = h; b < g; b++)
            if (c[b] > d) {
              e = b + f;
              break;
            }
          return {
            xData: c.slice(k, e),
            yData: a.slice(k, e),
            start: k,
            end: e,
          };
        };
        b.prototype.generatePoints = function () {
          var c = this.options,
            a = this.processedData || c.data,
            b = this.processedXData,
            d = this.processedYData,
            f = this.pointClass,
            g = b.length,
            h = this.cropStart || 0,
            k = this.hasGroupedData,
            e = c.keys,
            m = [];
          c = c.dataGrouping && c.dataGrouping.groupAll ? h : 0;
          var l,
            p,
            r = this.data;
          if (!r && !k) {
            var n = [];
            n.length = a.length;
            r = this.data = n;
          }
          e && k && (this.options.keys = !1);
          for (p = 0; p < g; p++) {
            n = h + p;
            if (k) {
              var w = new f().init(this, [b[p]].concat(ha(d[p])));
              w.dataGroup = this.groupMap[c + p];
              w.dataGroup.options &&
                ((w.options = w.dataGroup.options),
                u(w, w.dataGroup.options),
                delete w.dataLabels);
            } else
              (w = r[n]) ||
                'undefined' === typeof a[n] ||
                (r[n] = w = new f().init(this, a[n], b[p]));
            w && ((w.index = k ? c + p : n), (m[p] = w));
          }
          this.options.keys = e;
          if (r && (g !== (l = r.length) || k))
            for (p = 0; p < l; p++)
              p !== h || k || (p += g),
                r[p] && (r[p].destroyElements(), (r[p].plotX = void 0));
          this.data = r;
          this.points = m;
          H(this, 'afterGeneratePoints');
        };
        b.prototype.getXExtremes = function (c) {
          return { min: m(c), max: r(c) };
        };
        b.prototype.getExtremes = function (c, a) {
          var b = this.xAxis,
            d = this.yAxis,
            f = this.processedXData || this.xData,
            g = [],
            h = this.requireSorting ? this.cropShoulder : 0;
          d = d ? d.positiveValuesOnly : !1;
          var k,
            e = 0,
            p = 0,
            l = 0;
          c = c || this.stackedYData || this.processedYData || [];
          var u = c.length;
          if (b) {
            var n = b.getExtremes();
            e = n.min;
            p = n.max;
          }
          for (k = 0; k < u; k++) {
            var w = f[k];
            n = c[k];
            var x = (K(n) || I(n)) && (n.length || 0 < n || !d);
            w =
              a ||
              this.getExtremesFromAll ||
              this.options.getExtremesFromAll ||
              this.cropped ||
              !b ||
              ((f[k + h] || w) >= e && (f[k - h] || w) <= p);
            if (x && w)
              if ((x = n.length)) for (; x--; ) K(n[x]) && (g[l++] = n[x]);
              else g[l++] = n;
          }
          c = { activeYData: g, dataMin: m(g), dataMax: r(g) };
          H(this, 'afterGetExtremes', { dataExtremes: c });
          return c;
        };
        b.prototype.applyExtremes = function () {
          var c = this.getExtremes();
          this.dataMin = c.dataMin;
          this.dataMax = c.dataMax;
          return c;
        };
        b.prototype.getFirstValidPoint = function (c) {
          for (var a = c.length, b = 0, d = null; null === d && b < a; )
            (d = c[b]), b++;
          return d;
        };
        b.prototype.translate = function () {
          this.processedXData || this.processData();
          this.generatePoints();
          var a = this.options,
            b = a.stacking,
            d = this.xAxis,
            f = d.categories,
            g = this.enabledDataSorting,
            k = this.yAxis,
            e = this.points,
            m = e.length,
            p = this.pointPlacementToXValue(),
            l = !!p,
            u = a.threshold,
            r = a.startFromThreshold ? u : 0,
            n = this.zoneAxis || 'y',
            x,
            y,
            B = Number.MAX_VALUE;
          for (x = 0; x < m; x++) {
            var D = e[x],
              q = D.x,
              F = void 0,
              G = void 0,
              t = D.y,
              z = D.low,
              L =
                b &&
                k.stacking &&
                k.stacking.stacks[
                  (this.negStacks && t < (r ? 0 : u) ? '-' : '') + this.stackKey
                ];
            if (
              (k.positiveValuesOnly && !k.validatePositiveValue(t)) ||
              (d.positiveValuesOnly && !d.validatePositiveValue(q))
            )
              D.isNull = !0;
            D.plotX = y = c(
              h(d.translate(q, 0, 0, 0, 1, p, 'flags' === this.type), -1e5, 1e5)
            );
            if (b && this.visible && L && L[q]) {
              var v = this.getStackIndicator(v, q, this.index);
              D.isNull || ((F = L[q]), (G = F.points[v.key]));
            }
            I(G) &&
              ((z = G[0]),
              (t = G[1]),
              z === r && v.key === L[q].base && (z = M(K(u) && u, k.min)),
              k.positiveValuesOnly && 0 >= z && (z = null),
              (D.total = D.stackTotal = F.total),
              (D.percentage = F.total && (D.y / F.total) * 100),
              (D.stackY = t),
              this.irregularWidths ||
                F.setOffset(this.pointXOffset || 0, this.barW || 0));
            D.yBottom = w(z) ? h(k.translate(z, 0, 1, 0, 1), -1e5, 1e5) : null;
            this.dataModify && (t = this.dataModify.modifyValue(t, x));
            D.plotY = void 0;
            K(t) &&
              ((F = k.translate(t, !1, !0, !1, !0)),
              'undefined' !== typeof F && (D.plotY = h(F, -1e5, 1e5)));
            D.isInside = this.isPointInside(D);
            D.clientX = l ? c(d.translate(q, 0, 0, 0, 1, p)) : y;
            D.negative = D[n] < (a[n + 'Threshold'] || u || 0);
            D.category = M(f && f[D.x], D.x);
            if (!D.isNull && !1 !== D.visible) {
              'undefined' !== typeof A && (B = Math.min(B, Math.abs(y - A)));
              var A = y;
            }
            D.zone = this.zones.length ? D.getZone() : void 0;
            !D.graphic && this.group && g && (D.isNew = !0);
          }
          this.closestPointRangePx = B;
          H(this, 'afterTranslate');
        };
        b.prototype.getValidPoints = function (c, a, b) {
          var d = this.chart;
          return (c || this.points || []).filter(function (c) {
            return a &&
              !d.isInsidePlot(c.plotX, c.plotY, { inverted: d.inverted })
              ? !1
              : !1 !== c.visible && (b || !c.isNull);
          });
        };
        b.prototype.getClipBox = function () {
          var c = this.chart,
            a = this.xAxis,
            b = this.yAxis,
            d = X(c.clipBox);
          a && a.len !== c.plotSizeX && (d.width = a.len);
          b && b.len !== c.plotSizeY && (d.height = b.len);
          return d;
        };
        b.prototype.getSharedClipKey = function () {
          return (this.sharedClipKey =
            (this.options.xAxis || 0) + ',' + (this.options.yAxis || 0));
        };
        b.prototype.setClip = function () {
          var c = this.chart,
            a = this.group,
            b = this.markerGroup,
            d = c.sharedClips;
          c = c.renderer;
          var f = this.getClipBox(),
            g = this.getSharedClipKey(),
            h = d[g];
          h ? h.animate(f) : (d[g] = h = c.clipRect(f));
          a && a.clip(!1 === this.options.clip ? void 0 : h);
          b && b.clip();
        };
        b.prototype.animate = function (c) {
          var a = this.chart,
            b = this.group,
            d = this.markerGroup,
            f = a.inverted,
            g = n(this.options.animation),
            h = [this.getSharedClipKey(), g.duration, g.easing, g.defer].join(),
            k = a.sharedClips[h],
            e = a.sharedClips[h + 'm'];
          if (c && b)
            (g = this.getClipBox()),
              k
                ? k.attr('height', g.height)
                : ((g.width = 0),
                  f && (g.x = a.plotHeight),
                  (k = a.renderer.clipRect(g)),
                  (a.sharedClips[h] = k),
                  (e = a.renderer.clipRect({
                    x: f ? (a.plotSizeX || 0) + 99 : -99,
                    y: f ? -a.plotLeft : -a.plotTop,
                    width: 99,
                    height: f ? a.chartWidth : a.chartHeight,
                  })),
                  (a.sharedClips[h + 'm'] = e)),
              b.clip(k),
              d && d.clip(e);
          else if (k && !k.hasClass('highcharts-animating')) {
            a = this.getClipBox();
            var m = g.step;
            d &&
              d.element.childNodes.length &&
              (g.step = function (c, a) {
                m && m.apply(a, arguments);
                e &&
                  e.element &&
                  e.attr(a.prop, 'width' === a.prop ? c + 99 : c);
              });
            k.addClass('highcharts-animating').animate(a, g);
          }
        };
        b.prototype.afterAnimate = function () {
          var c = this;
          this.setClip();
          J(this.chart.sharedClips, function (a, b, d) {
            a &&
              !c.chart.container.querySelector(
                '[clip-path="url(#' + a.id + ')"]'
              ) &&
              (a.destroy(), delete d[b]);
          });
          this.finishedAnimating = !0;
          H(this, 'afterAnimate');
        };
        b.prototype.drawPoints = function () {
          var c = this.points,
            a = this.chart,
            b = this.options.marker,
            d = this[this.specialGroup] || this.markerGroup,
            f = this.xAxis,
            g = M(
              b.enabled,
              !f || f.isRadial ? !0 : null,
              this.closestPointRangePx >= b.enabledThreshold * b.radius
            ),
            h,
            k;
          if (!1 !== b.enabled || this._hasPointMarkers)
            for (h = 0; h < c.length; h++) {
              var e = c[h];
              var m = (k = e.graphic) ? 'animate' : 'attr';
              var p = e.marker || {};
              var l = !!e.marker;
              if (
                ((g && 'undefined' === typeof p.enabled) || p.enabled) &&
                !e.isNull &&
                !1 !== e.visible
              ) {
                var u = M(p.symbol, this.symbol, 'rect');
                var r = this.markerAttribs(e, e.selected && 'select');
                this.enabledDataSorting &&
                  (e.startXPos = f.reversed ? -(r.width || 0) : f.width);
                var n = !1 !== e.isInside;
                k
                  ? k[n ? 'show' : 'hide'](n).animate(r)
                  : n &&
                    (0 < (r.width || 0) || e.hasImage) &&
                    ((e.graphic = k =
                      a.renderer
                        .symbol(u, r.x, r.y, r.width, r.height, l ? p : b)
                        .add(d)),
                    this.enabledDataSorting &&
                      a.hasRendered &&
                      (k.attr({ x: e.startXPos }), (m = 'animate')));
                k && 'animate' === m && k[n ? 'show' : 'hide'](n).animate(r);
                if (k && !a.styledMode)
                  k[m](this.pointAttribs(e, e.selected && 'select'));
                k && k.addClass(e.getClassName(), !0);
              } else k && (e.graphic = k.destroy());
            }
        };
        b.prototype.markerAttribs = function (c, a) {
          var b = this.options,
            d = b.marker,
            f = c.marker || {},
            g = f.symbol || d.symbol,
            h = M(f.radius, d && d.radius);
          a &&
            ((d = d.states[a]),
            (a = f.states && f.states[a]),
            (h = M(
              a && a.radius,
              d && d.radius,
              h && h + ((d && d.radiusPlus) || 0)
            )));
          c.hasImage = g && 0 === g.indexOf('url');
          c.hasImage && (h = 0);
          c = K(h)
            ? {
                x: b.crisp ? Math.floor(c.plotX - h) : c.plotX - h,
                y: c.plotY - h,
              }
            : {};
          h && (c.width = c.height = 2 * h);
          return c;
        };
        b.prototype.pointAttribs = function (c, a) {
          var b = this.options.marker,
            d = c && c.options,
            f = (d && d.marker) || {},
            g = d && d.color,
            h = c && c.color,
            k = c && c.zone && c.zone.color,
            e = this.color;
          c = M(f.lineWidth, b.lineWidth);
          d = 1;
          e = g || k || h || e;
          g = f.fillColor || b.fillColor || e;
          h = f.lineColor || b.lineColor || e;
          a = a || 'normal';
          b = b.states[a] || {};
          a = (f.states && f.states[a]) || {};
          c = M(
            a.lineWidth,
            b.lineWidth,
            c + M(a.lineWidthPlus, b.lineWidthPlus, 0)
          );
          g = a.fillColor || b.fillColor || g;
          h = a.lineColor || b.lineColor || h;
          d = M(a.opacity, b.opacity, d);
          return { stroke: h, 'stroke-width': c, fill: g, opacity: d };
        };
        b.prototype.destroy = function (c) {
          var a = this,
            b = a.chart,
            d = /AppleWebKit\/533/.test(y.navigator.userAgent),
            f = a.data || [],
            h,
            k,
            e,
            m;
          H(a, 'destroy', { keepEventsForUpdate: c });
          this.removeEvents(c);
          (a.axisTypes || []).forEach(function (c) {
            (m = a[c]) &&
              m.series &&
              (g(m.series, a), (m.isDirty = m.forceRedraw = !0));
          });
          a.legendItem && a.chart.legend.destroyItem(a);
          for (k = f.length; k--; ) (e = f[k]) && e.destroy && e.destroy();
          a.clips &&
            a.clips.forEach(function (c) {
              return c.destroy();
            });
          l.clearTimeout(a.animationTimeout);
          J(a, function (c, a) {
            c instanceof q &&
              !c.survive &&
              ((h = d && 'group' === a ? 'hide' : 'destroy'), c[h]());
          });
          b.hoverSeries === a && (b.hoverSeries = void 0);
          g(b.series, a);
          b.orderSeries();
          J(a, function (b, d) {
            (c && 'hcEvents' === d) || delete a[d];
          });
        };
        b.prototype.applyZones = function () {
          var c = this,
            a = this.chart,
            b = a.renderer,
            d = this.zones,
            f = this.clips || [],
            g = this.graph,
            k = this.area,
            e = Math.max(a.chartWidth, a.chartHeight),
            m = this[(this.zoneAxis || 'y') + 'Axis'],
            p = a.inverted,
            l,
            u,
            r,
            n,
            w,
            x,
            y,
            D,
            B = !1;
          if (d.length && (g || k) && m && 'undefined' !== typeof m.min) {
            var q = m.reversed;
            var F = m.horiz;
            g && !this.showLine && g.hide();
            k && k.hide();
            var H = m.getExtremes();
            d.forEach(function (d, G) {
              l = q ? (F ? a.plotWidth : 0) : F ? 0 : m.toPixels(H.min) || 0;
              l = h(M(u, l), 0, e);
              u = h(Math.round(m.toPixels(M(d.value, H.max), !0) || 0), 0, e);
              B && (l = u = m.toPixels(H.max));
              n = Math.abs(l - u);
              w = Math.min(l, u);
              x = Math.max(l, u);
              m.isXAxis
                ? ((r = { x: p ? x : w, y: 0, width: n, height: e }),
                  F || (r.x = a.plotHeight - r.x))
                : ((r = { x: 0, y: p ? x : w, width: e, height: n }),
                  F && (r.y = a.plotWidth - r.y));
              p &&
                b.isVML &&
                (r = m.isXAxis
                  ? { x: 0, y: q ? w : x, height: r.width, width: a.chartWidth }
                  : {
                      x: r.y - a.plotLeft - a.spacingBox.x,
                      y: 0,
                      width: r.height,
                      height: a.chartHeight,
                    });
              f[G] ? f[G].animate(r) : (f[G] = b.clipRect(r));
              y = c['zone-area-' + G];
              D = c['zone-graph-' + G];
              g && D && D.clip(f[G]);
              k && y && y.clip(f[G]);
              B = d.value > H.max;
              c.resetZones && 0 === u && (u = void 0);
            });
            this.clips = f;
          } else c.visible && (g && g.show(!0), k && k.show(!0));
        };
        b.prototype.invertGroups = function (c) {
          function a() {
            ['group', 'markerGroup'].forEach(function (a) {
              b[a] &&
                (d.renderer.isVML &&
                  b[a].attr({ width: b.yAxis.len, height: b.xAxis.len }),
                (b[a].width = b.yAxis.len),
                (b[a].height = b.xAxis.len),
                b[a].invert(b.isRadialSeries ? !1 : c));
            });
          }
          var b = this,
            d = b.chart;
          b.xAxis &&
            (b.eventsToUnbind.push(x(d, 'resize', a)),
            a(),
            (b.invertGroups = a));
        };
        b.prototype.plotGroup = function (c, a, b, d, f) {
          var g = this[c],
            h = !g;
          b = { visibility: b, zIndex: d || 0.1 };
          'undefined' === typeof this.opacity ||
            this.chart.styledMode ||
            'inactive' === this.state ||
            (b.opacity = this.opacity);
          h && (this[c] = g = this.chart.renderer.g().add(f));
          g.addClass(
            'highcharts-' +
              a +
              ' highcharts-series-' +
              this.index +
              ' highcharts-' +
              this.type +
              '-series ' +
              (w(this.colorIndex)
                ? 'highcharts-color-' + this.colorIndex + ' '
                : '') +
              (this.options.className || '') +
              (g.hasClass('highcharts-tracker') ? ' highcharts-tracker' : ''),
            !0
          );
          g.attr(b)[h ? 'attr' : 'animate'](this.getPlotBox());
          return g;
        };
        b.prototype.getPlotBox = function () {
          var c = this.chart,
            a = this.xAxis,
            b = this.yAxis;
          c.inverted && ((a = b), (b = this.xAxis));
          return {
            translateX: a ? a.left : c.plotLeft,
            translateY: b ? b.top : c.plotTop,
            scaleX: 1,
            scaleY: 1,
          };
        };
        b.prototype.removeEvents = function (c) {
          c || ca(this);
          this.eventsToUnbind.length &&
            (this.eventsToUnbind.forEach(function (c) {
              c();
            }),
            (this.eventsToUnbind.length = 0));
        };
        b.prototype.render = function () {
          var c = this,
            a = c.chart,
            b = c.options,
            d = n(b.animation),
            f = c.visible ? 'inherit' : 'hidden',
            g = b.zIndex,
            h = c.hasRendered,
            k = a.seriesGroup,
            e = a.inverted;
          a = !c.finishedAnimating && a.renderer.isSVG ? d.duration : 0;
          H(this, 'render');
          var m = c.plotGroup('group', 'series', f, g, k);
          c.markerGroup = c.plotGroup('markerGroup', 'markers', f, g, k);
          !1 !== b.clip && c.setClip();
          c.animate && a && c.animate(!0);
          m.inverted = M(c.invertible, c.isCartesian) ? e : !1;
          c.drawGraph && (c.drawGraph(), c.applyZones());
          c.visible && c.drawPoints();
          c.drawDataLabels && c.drawDataLabels();
          c.redrawPoints && c.redrawPoints();
          c.drawTracker &&
            !1 !== c.options.enableMouseTracking &&
            c.drawTracker();
          c.invertGroups(e);
          c.animate && a && c.animate();
          h ||
            (a && d.defer && (a += d.defer),
            (c.animationTimeout = N(function () {
              c.afterAnimate();
            }, a || 0)));
          c.isDirty = !1;
          c.hasRendered = !0;
          H(c, 'afterRender');
        };
        b.prototype.redraw = function () {
          var c = this.chart,
            a = this.isDirty || this.isDirtyData,
            b = this.group,
            d = this.xAxis,
            f = this.yAxis;
          b &&
            (c.inverted && b.attr({ width: c.plotWidth, height: c.plotHeight }),
            b.animate({
              translateX: M(d && d.left, c.plotLeft),
              translateY: M(f && f.top, c.plotTop),
            }));
          this.translate();
          this.render();
          a && delete this.kdTree;
        };
        b.prototype.searchPoint = function (c, a) {
          var b = this.xAxis,
            d = this.yAxis,
            f = this.chart.inverted;
          return this.searchKDTree(
            {
              clientX: f ? b.len - c.chartY + b.pos : c.chartX - b.pos,
              plotY: f ? d.len - c.chartX + d.pos : c.chartY - d.pos,
            },
            a,
            c
          );
        };
        b.prototype.buildKDTree = function (c) {
          function a(c, d, f) {
            var g = c && c.length;
            if (g) {
              var h = b.kdAxisArray[d % f];
              c.sort(function (c, a) {
                return c[h] - a[h];
              });
              g = Math.floor(g / 2);
              return {
                point: c[g],
                left: a(c.slice(0, g), d + 1, f),
                right: a(c.slice(g + 1), d + 1, f),
              };
            }
          }
          this.buildingKdTree = !0;
          var b = this,
            d = -1 < b.options.findNearestPointBy.indexOf('y') ? 2 : 1;
          delete b.kdTree;
          N(
            function () {
              b.kdTree = a(b.getValidPoints(null, !b.directTouch), d, d);
              b.buildingKdTree = !1;
            },
            b.options.kdNow || (c && 'touchstart' === c.type) ? 0 : 1
          );
        };
        b.prototype.searchKDTree = function (c, a, b) {
          function d(c, a, b, e) {
            var m = a.point,
              p = f.kdAxisArray[b % e],
              l = m,
              u = w(c[g]) && w(m[g]) ? Math.pow(c[g] - m[g], 2) : null;
            var r = w(c[h]) && w(m[h]) ? Math.pow(c[h] - m[h], 2) : null;
            r = (u || 0) + (r || 0);
            m.dist = w(r) ? Math.sqrt(r) : Number.MAX_VALUE;
            m.distX = w(u) ? Math.sqrt(u) : Number.MAX_VALUE;
            p = c[p] - m[p];
            r = 0 > p ? 'left' : 'right';
            u = 0 > p ? 'right' : 'left';
            a[r] && ((r = d(c, a[r], b + 1, e)), (l = r[k] < l[k] ? r : m));
            a[u] &&
              Math.sqrt(p * p) < l[k] &&
              ((c = d(c, a[u], b + 1, e)), (l = c[k] < l[k] ? c : l));
            return l;
          }
          var f = this,
            g = this.kdAxisArray[0],
            h = this.kdAxisArray[1],
            k = a ? 'distX' : 'dist';
          a = -1 < f.options.findNearestPointBy.indexOf('y') ? 2 : 1;
          this.kdTree || this.buildingKdTree || this.buildKDTree(b);
          if (this.kdTree) return d(c, this.kdTree, a, a);
        };
        b.prototype.pointPlacementToXValue = function () {
          var c = this.options,
            a = c.pointRange,
            b = this.xAxis;
          c = c.pointPlacement;
          'between' === c && (c = b.reversed ? -0.5 : 0.5);
          return K(c) ? c * (a || b.pointRange) : 0;
        };
        b.prototype.isPointInside = function (c) {
          var a = this.chart,
            b = this.xAxis,
            d = this.yAxis;
          return (
            'undefined' !== typeof c.plotY &&
            'undefined' !== typeof c.plotX &&
            0 <= c.plotY &&
            c.plotY <= (d ? d.len : a.plotHeight) &&
            0 <= c.plotX &&
            c.plotX <= (b ? b.len : a.plotWidth)
          );
        };
        b.prototype.drawTracker = function () {
          var c = this,
            a = c.options,
            b = a.trackByArea,
            d = [].concat(b ? c.areaPath : c.graphPath),
            f = c.chart,
            g = f.pointer,
            h = f.renderer,
            e = f.options.tooltip.snap,
            m = c.tracker,
            p = function (a) {
              if (f.hoverSeries !== c) c.onMouseOver();
            },
            l = 'rgba(192,192,192,' + (G ? 0.0001 : 0.002) + ')';
          m
            ? m.attr({ d: d })
            : c.graph &&
              ((c.tracker = h
                .path(d)
                .attr({
                  visibility: c.visible ? 'visible' : 'hidden',
                  zIndex: 2,
                })
                .addClass(
                  b ? 'highcharts-tracker-area' : 'highcharts-tracker-line'
                )
                .add(c.group)),
              f.styledMode ||
                c.tracker.attr({
                  'stroke-linecap': 'round',
                  'stroke-linejoin': 'round',
                  stroke: l,
                  fill: b ? l : 'none',
                  'stroke-width': c.graph.strokeWidth() + (b ? 0 : 2 * e),
                }),
              [c.tracker, c.markerGroup, c.dataLabelsGroup].forEach(
                function (c) {
                  if (
                    c &&
                    (c
                      .addClass('highcharts-tracker')
                      .on('mouseover', p)
                      .on('mouseout', function (c) {
                        g.onTrackerMouseOut(c);
                      }),
                    a.cursor && !f.styledMode && c.css({ cursor: a.cursor }),
                    k)
                  )
                    c.on('touchstart', p);
                }
              ));
          H(this, 'afterDrawTracker');
        };
        b.prototype.addPoint = function (c, a, b, d, f) {
          var g = this.options,
            h = this.data,
            k = this.chart,
            e = this.xAxis;
          e = e && e.hasNames && e.names;
          var m = g.data,
            p = this.xData,
            l;
          a = M(a, !0);
          var r = { series: this };
          this.pointClass.prototype.applyOptions.apply(r, [c]);
          var u = r.x;
          var n = p.length;
          if (this.requireSorting && u < p[n - 1])
            for (l = !0; n && p[n - 1] > u; ) n--;
          this.updateParallelArrays(r, 'splice', n, 0, 0);
          this.updateParallelArrays(r, n);
          e && r.name && (e[u] = r.name);
          m.splice(n, 0, c);
          if (l || this.processedData)
            this.data.splice(n, 0, null), this.processData();
          'point' === g.legendType && this.generatePoints();
          b &&
            (h[0] && h[0].remove
              ? h[0].remove(!1)
              : (h.shift(), this.updateParallelArrays(r, 'shift'), m.shift()));
          !1 !== f && H(this, 'addPoint', { point: r });
          this.isDirtyData = this.isDirty = !0;
          a && k.redraw(d);
        };
        b.prototype.removePoint = function (c, a, b) {
          var f = this,
            g = f.data,
            h = g[c],
            k = f.points,
            e = f.chart,
            m = function () {
              k && k.length === g.length && k.splice(c, 1);
              g.splice(c, 1);
              f.options.data.splice(c, 1);
              f.updateParallelArrays(h || { series: f }, 'splice', c, 1);
              h && h.destroy();
              f.isDirty = !0;
              f.isDirtyData = !0;
              a && e.redraw();
            };
          d(b, e);
          a = M(a, !0);
          h ? h.firePointEvent('remove', null, m) : m();
        };
        b.prototype.remove = function (c, a, b, d) {
          function f() {
            g.destroy(d);
            h.isDirtyLegend = h.isDirtyBox = !0;
            h.linkSeries();
            M(c, !0) && h.redraw(a);
          }
          var g = this,
            h = g.chart;
          !1 !== b ? H(g, 'remove', null, f) : f();
        };
        b.prototype.update = function (c, a) {
          c = p(c, this.userOptions);
          H(this, 'update', { options: c });
          var b = this,
            d = b.chart,
            f = b.userOptions,
            g = b.initialType || b.type,
            h = d.options.plotOptions,
            k = B[g].prototype,
            e = b.finishedAnimating && { animation: !1 },
            m = {},
            l,
            r = ['eventOptions', 'navigatorSeries', 'baseSeries'],
            n = c.type || f.type || d.options.chart.type,
            w = !(
              this.hasDerivedData ||
              (n && n !== this.type) ||
              'undefined' !== typeof c.pointStart ||
              'undefined' !== typeof c.pointInterval ||
              'undefined' !== typeof c.relativeXValue ||
              c.joinBy ||
              c.mapData ||
              b.hasOptionChanged('dataGrouping') ||
              b.hasOptionChanged('pointStart') ||
              b.hasOptionChanged('pointInterval') ||
              b.hasOptionChanged('pointIntervalUnit') ||
              b.hasOptionChanged('keys')
            );
          n = n || g;
          w &&
            (r.push(
              'data',
              'isDirtyData',
              'points',
              'processedXData',
              'processedYData',
              'xIncrement',
              'cropped',
              '_hasPointMarkers',
              '_hasPointLabels',
              'clips',
              'nodes',
              'layout',
              'level',
              'mapMap',
              'mapData',
              'minY',
              'maxY',
              'minX',
              'maxX'
            ),
            !1 !== c.visible && r.push('area', 'graph'),
            b.parallelArrays.forEach(function (c) {
              r.push(c + 'Data');
            }),
            c.data &&
              (c.dataSorting && u(b.options.dataSorting, c.dataSorting),
              this.setData(c.data, !1)));
          c = X(
            f,
            e,
            {
              index: 'undefined' === typeof f.index ? b.index : f.index,
              pointStart: M(
                h && h.series && h.series.pointStart,
                f.pointStart,
                b.xData[0]
              ),
            },
            !w && { data: b.options.data },
            c
          );
          w && c.data && (c.data = b.options.data);
          r = [
            'group',
            'markerGroup',
            'dataLabelsGroup',
            'transformGroup',
          ].concat(r);
          r.forEach(function (c) {
            r[c] = b[c];
            delete b[c];
          });
          h = !1;
          if (B[n]) {
            if (((h = n !== b.type), b.remove(!1, !1, !1, !0), h))
              if (Object.setPrototypeOf)
                Object.setPrototypeOf(b, B[n].prototype);
              else {
                e = Object.hasOwnProperty.call(b, 'hcEvents') && b.hcEvents;
                for (l in k) b[l] = void 0;
                u(b, B[n].prototype);
                e ? (b.hcEvents = e) : delete b.hcEvents;
              }
          } else F(17, !0, d, { missingModuleFor: n });
          r.forEach(function (c) {
            b[c] = r[c];
          });
          b.init(d, c);
          if (w && this.points) {
            var x = b.options;
            !1 === x.visible
              ? ((m.graphic = 1), (m.dataLabel = 1))
              : b._hasPointLabels ||
                ((c = x.marker),
                (k = x.dataLabels),
                !c ||
                  (!1 !== c.enabled &&
                    (f.marker && f.marker.symbol) === c.symbol) ||
                  (m.graphic = 1),
                k && !1 === k.enabled && (m.dataLabel = 1));
            this.points.forEach(function (c) {
              c &&
                c.series &&
                (c.resolveColor(),
                Object.keys(m).length && c.destroyElements(m),
                !1 === x.showInLegend &&
                  c.legendItem &&
                  d.legend.destroyItem(c));
            }, this);
          }
          b.initialType = g;
          d.linkSeries();
          h && b.linkedSeries.length && (b.isDirtyData = !0);
          H(this, 'afterUpdate');
          M(a, !0) && d.redraw(w ? void 0 : !1);
        };
        b.prototype.setName = function (c) {
          this.name = this.options.name = this.userOptions.name = c;
          this.chart.isDirtyLegend = !0;
        };
        b.prototype.hasOptionChanged = function (c) {
          var a = this.options[c],
            b = this.chart.options.plotOptions,
            d = this.userOptions[c];
          return d
            ? a !== d
            : a !==
                M(
                  b && b[this.type] && b[this.type][c],
                  b && b.series && b.series[c],
                  a
                );
        };
        b.prototype.onMouseOver = function () {
          var c = this.chart,
            a = c.hoverSeries;
          c.pointer.setHoverChartIndex();
          if (a && a !== this) a.onMouseOut();
          this.options.events.mouseOver && H(this, 'mouseOver');
          this.setState('hover');
          c.hoverSeries = this;
        };
        b.prototype.onMouseOut = function () {
          var c = this.options,
            a = this.chart,
            b = a.tooltip,
            d = a.hoverPoint;
          a.hoverSeries = null;
          if (d) d.onMouseOut();
          this && c.events.mouseOut && H(this, 'mouseOut');
          !b ||
            this.stickyTracking ||
            (b.shared && !this.noSharedTooltip) ||
            b.hide();
          a.series.forEach(function (c) {
            c.setState('', !0);
          });
        };
        b.prototype.setState = function (c, a) {
          var b = this,
            d = b.options,
            f = b.graph,
            g = d.inactiveOtherPoints,
            h = d.states,
            k = M(
              h[c || 'normal'] && h[c || 'normal'].animation,
              b.chart.options.chart.animation
            ),
            e = d.lineWidth,
            m = 0,
            p = d.opacity;
          c = c || '';
          if (
            b.state !== c &&
            ([b.group, b.markerGroup, b.dataLabelsGroup].forEach(function (a) {
              a &&
                (b.state && a.removeClass('highcharts-series-' + b.state),
                c && a.addClass('highcharts-series-' + c));
            }),
            (b.state = c),
            !b.chart.styledMode)
          ) {
            if (h[c] && !1 === h[c].enabled) return;
            c &&
              ((e = h[c].lineWidth || e + (h[c].lineWidthPlus || 0)),
              (p = M(h[c].opacity, p)));
            if (f && !f.dashstyle)
              for (
                d = { 'stroke-width': e }, f.animate(d, k);
                b['zone-graph-' + m];

              )
                b['zone-graph-' + m].animate(d, k), (m += 1);
            g ||
              [
                b.group,
                b.markerGroup,
                b.dataLabelsGroup,
                b.labelBySeries,
              ].forEach(function (c) {
                c && c.animate({ opacity: p }, k);
              });
          }
          a && g && b.points && b.setAllPointsToState(c || void 0);
        };
        b.prototype.setAllPointsToState = function (c) {
          this.points.forEach(function (a) {
            a.setState && a.setState(c);
          });
        };
        b.prototype.setVisible = function (c, a) {
          var b = this,
            d = b.chart,
            f = b.legendItem,
            g = d.options.chart.ignoreHiddenSeries,
            h = b.visible,
            k = (b.visible =
              c =
              b.options.visible =
              b.userOptions.visible =
                'undefined' === typeof c ? !h : c)
              ? 'show'
              : 'hide';
          ['group', 'dataLabelsGroup', 'markerGroup', 'tracker', 'tt'].forEach(
            function (c) {
              if (b[c]) b[c][k]();
            }
          );
          if (
            d.hoverSeries === b ||
            (d.hoverPoint && d.hoverPoint.series) === b
          )
            b.onMouseOut();
          f && d.legend.colorizeItem(b, c);
          b.isDirty = !0;
          b.options.stacking &&
            d.series.forEach(function (c) {
              c.options.stacking && c.visible && (c.isDirty = !0);
            });
          b.linkedSeries.forEach(function (a) {
            a.setVisible(c, !1);
          });
          g && (d.isDirtyBox = !0);
          H(b, k);
          !1 !== a && d.redraw();
        };
        b.prototype.show = function () {
          this.setVisible(!0);
        };
        b.prototype.hide = function () {
          this.setVisible(!1);
        };
        b.prototype.select = function (c) {
          this.selected =
            c =
            this.options.selected =
              'undefined' === typeof c ? !this.selected : c;
          this.checkbox && (this.checkbox.checked = c);
          H(this, c ? 'select' : 'unselect');
        };
        b.prototype.shouldShowTooltip = function (c, a, b) {
          void 0 === b && (b = {});
          b.series = this;
          b.visiblePlotOnly = !0;
          return this.chart.isInsidePlot(c, a, b);
        };
        b.defaultOptions = C;
        return b;
      })();
      u(b.prototype, {
        axisTypes: ['xAxis', 'yAxis'],
        coll: 'series',
        colorCounter: 0,
        cropShoulder: 1,
        directTouch: !1,
        drawLegendSymbol: t.drawLineMarker,
        isCartesian: !0,
        kdAxisArray: ['clientX', 'plotY'],
        parallelArrays: ['x', 'y'],
        pointClass: A,
        requireSorting: !0,
        sorted: !0,
      });
      z.series = b;
      ('');
      ('');
      return b;
    }
  );
  J(
    e,
    'Extensions/ScrollablePlotArea.js',
    [
      e['Core/Animation/AnimationUtilities.js'],
      e['Core/Axis/Axis.js'],
      e['Core/Chart/Chart.js'],
      e['Core/Series/Series.js'],
      e['Core/Renderer/RendererRegistry.js'],
      e['Core/Utilities.js'],
    ],
    function (b, e, v, E, t, A) {
      var C = b.stop,
        z = A.addEvent,
        q = A.createElement,
        l = A.merge,
        n = A.pick;
      z(v, 'afterSetChartSize', function (b) {
        var a = this.options.chart.scrollablePlotArea,
          d = a && a.minWidth;
        a = a && a.minHeight;
        if (!this.renderer.forExport) {
          if (d) {
            if (
              (this.scrollablePixelsX = d = Math.max(0, d - this.chartWidth))
            ) {
              this.scrollablePlotBox = this.renderer.scrollablePlotBox = l(
                this.plotBox
              );
              this.plotBox.width = this.plotWidth += d;
              this.inverted
                ? (this.clipBox.height += d)
                : (this.clipBox.width += d);
              var k = { 1: { name: 'right', value: d } };
            }
          } else
            a &&
              (this.scrollablePixelsY = d =
                Math.max(0, a - this.chartHeight)) &&
              ((this.scrollablePlotBox = this.renderer.scrollablePlotBox =
                l(this.plotBox)),
              (this.plotBox.height = this.plotHeight += d),
              this.inverted
                ? (this.clipBox.width += d)
                : (this.clipBox.height += d),
              (k = { 2: { name: 'bottom', value: d } }));
          k &&
            !b.skipAxes &&
            this.axes.forEach(function (a) {
              k[a.side]
                ? (a.getPlotLinePath = function () {
                    var b = k[a.side].name,
                      d = this[b];
                    this[b] = d - k[a.side].value;
                    var f = e.prototype.getPlotLinePath.apply(this, arguments);
                    this[b] = d;
                    return f;
                  })
                : (a.setAxisSize(), a.setAxisTranslation());
            });
        }
      });
      z(v, 'render', function () {
        this.scrollablePixelsX || this.scrollablePixelsY
          ? (this.setUpScrolling && this.setUpScrolling(), this.applyFixed())
          : this.fixedDiv && this.applyFixed();
      });
      v.prototype.setUpScrolling = function () {
        var b = this,
          a = {
            WebkitOverflowScrolling: 'touch',
            overflowX: 'hidden',
            overflowY: 'hidden',
          };
        this.scrollablePixelsX && (a.overflowX = 'auto');
        this.scrollablePixelsY && (a.overflowY = 'auto');
        this.scrollingParent = q(
          'div',
          { className: 'highcharts-scrolling-parent' },
          { position: 'relative' },
          this.renderTo
        );
        this.scrollingContainer = q(
          'div',
          { className: 'highcharts-scrolling' },
          a,
          this.scrollingParent
        );
        z(this.scrollingContainer, 'scroll', function () {
          b.pointer && delete b.pointer.chartPosition;
        });
        this.innerContainer = q(
          'div',
          { className: 'highcharts-inner-container' },
          null,
          this.scrollingContainer
        );
        this.innerContainer.appendChild(this.container);
        this.setUpScrolling = null;
      };
      v.prototype.moveFixedElements = function () {
        var b = this.container,
          a = this.fixedRenderer,
          f =
            '.highcharts-contextbutton .highcharts-credits .highcharts-legend .highcharts-legend-checkbox .highcharts-navigator-series .highcharts-navigator-xaxis .highcharts-navigator-yaxis .highcharts-navigator .highcharts-reset-zoom .highcharts-drillup-button .highcharts-scrollbar .highcharts-subtitle .highcharts-title'.split(
              ' '
            ),
          k;
        this.scrollablePixelsX && !this.inverted
          ? (k = '.highcharts-yaxis')
          : this.scrollablePixelsX && this.inverted
            ? (k = '.highcharts-xaxis')
            : this.scrollablePixelsY && !this.inverted
              ? (k = '.highcharts-xaxis')
              : this.scrollablePixelsY &&
                this.inverted &&
                (k = '.highcharts-yaxis');
        k &&
          f.push(
            k + ':not(.highcharts-radial-axis)',
            k + '-labels:not(.highcharts-radial-axis-labels)'
          );
        f.forEach(function (d) {
          [].forEach.call(b.querySelectorAll(d), function (b) {
            (b.namespaceURI === a.SVG_NS
              ? a.box
              : a.box.parentNode
            ).appendChild(b);
            b.style.pointerEvents = 'auto';
          });
        });
      };
      v.prototype.applyFixed = function () {
        var b = !this.fixedDiv,
          a = this.options.chart,
          f = a.scrollablePlotArea,
          k = t.getRendererType();
        b
          ? ((this.fixedDiv = q(
              'div',
              { className: 'highcharts-fixed' },
              {
                position: 'absolute',
                overflow: 'hidden',
                pointerEvents: 'none',
                zIndex: ((a.style && a.style.zIndex) || 0) + 2,
                top: 0,
              },
              null,
              !0
            )),
            this.scrollingContainer &&
              this.scrollingContainer.parentNode.insertBefore(
                this.fixedDiv,
                this.scrollingContainer
              ),
            (this.renderTo.style.overflow = 'visible'),
            (this.fixedRenderer = a =
              new k(
                this.fixedDiv,
                this.chartWidth,
                this.chartHeight,
                this.options.chart.style
              )),
            (this.scrollableMask = a
              .path()
              .attr({
                fill: this.options.chart.backgroundColor || '#fff',
                'fill-opacity': n(f.opacity, 0.85),
                zIndex: -1,
              })
              .addClass('highcharts-scrollable-mask')
              .add()),
            z(this, 'afterShowResetZoom', this.moveFixedElements),
            z(this, 'afterApplyDrilldown', this.moveFixedElements),
            z(this, 'afterLayOutTitles', this.moveFixedElements))
          : this.fixedRenderer.setSize(this.chartWidth, this.chartHeight);
        if (this.scrollableDirty || b)
          (this.scrollableDirty = !1), this.moveFixedElements();
        a = this.chartWidth + (this.scrollablePixelsX || 0);
        k = this.chartHeight + (this.scrollablePixelsY || 0);
        C(this.container);
        this.container.style.width = a + 'px';
        this.container.style.height = k + 'px';
        this.renderer.boxWrapper.attr({
          width: a,
          height: k,
          viewBox: [0, 0, a, k].join(' '),
        });
        this.chartBackground.attr({ width: a, height: k });
        this.scrollingContainer.style.height = this.chartHeight + 'px';
        b &&
          (f.scrollPositionX &&
            (this.scrollingContainer.scrollLeft =
              this.scrollablePixelsX * f.scrollPositionX),
          f.scrollPositionY &&
            (this.scrollingContainer.scrollTop =
              this.scrollablePixelsY * f.scrollPositionY));
        k = this.axisOffset;
        b = this.plotTop - k[0] - 1;
        f = this.plotLeft - k[3] - 1;
        a = this.plotTop + this.plotHeight + k[2] + 1;
        k = this.plotLeft + this.plotWidth + k[1] + 1;
        var e = this.plotLeft + this.plotWidth - (this.scrollablePixelsX || 0),
          l = this.plotTop + this.plotHeight - (this.scrollablePixelsY || 0);
        b = this.scrollablePixelsX
          ? [
              ['M', 0, b],
              ['L', this.plotLeft - 1, b],
              ['L', this.plotLeft - 1, a],
              ['L', 0, a],
              ['Z'],
              ['M', e, b],
              ['L', this.chartWidth, b],
              ['L', this.chartWidth, a],
              ['L', e, a],
              ['Z'],
            ]
          : this.scrollablePixelsY
            ? [
                ['M', f, 0],
                ['L', f, this.plotTop - 1],
                ['L', k, this.plotTop - 1],
                ['L', k, 0],
                ['Z'],
                ['M', f, l],
                ['L', f, this.chartHeight],
                ['L', k, this.chartHeight],
                ['L', k, l],
                ['Z'],
              ]
            : [['M', 0, 0]];
        'adjustHeight' !== this.redrawTrigger &&
          this.scrollableMask.attr({ d: b });
      };
      z(e, 'afterInit', function () {
        this.chart.scrollableDirty = !0;
      });
      z(E, 'show', function () {
        this.chart.scrollableDirty = !0;
      });
      ('');
    }
  );
  J(
    e,
    'Core/Axis/StackingAxis.js',
    [
      e['Core/Animation/AnimationUtilities.js'],
      e['Core/Axis/Axis.js'],
      e['Core/Utilities.js'],
    ],
    function (b, e, v) {
      var E = b.getDeferredAnimation,
        t = v.addEvent,
        A = v.destroyObjectProperties,
        C = v.fireEvent,
        z = v.isNumber,
        q = v.objectEach,
        l;
      (function (b) {
        function d() {
          var a = this.stacking;
          if (a) {
            var b = a.stacks;
            q(b, function (a, d) {
              A(a);
              b[d] = null;
            });
            a && a.stackTotalGroup && a.stackTotalGroup.destroy();
          }
        }
        function a() {
          this.stacking || (this.stacking = new k(this));
        }
        var f = [];
        b.compose = function (b) {
          -1 === f.indexOf(b) &&
            (f.push(b), t(b, 'init', a), t(b, 'destroy', d));
          return b;
        };
        var k = (function () {
          function a(a) {
            this.oldStacks = {};
            this.stacks = {};
            this.stacksTouched = 0;
            this.axis = a;
          }
          a.prototype.buildStacks = function () {
            var a = this.axis,
              b = a.series,
              d = a.options.reversedStacks,
              f = b.length,
              k;
            if (!a.isXAxis) {
              this.usePercentage = !1;
              for (k = f; k--; ) {
                var h = b[d ? k : f - k - 1];
                h.setStackedPoints();
                h.setGroupedPoints();
              }
              for (k = 0; k < f; k++) b[k].modifyStacks();
              C(a, 'afterBuildStacks');
            }
          };
          a.prototype.cleanStacks = function () {
            if (!this.axis.isXAxis) {
              if (this.oldStacks) var a = (this.stacks = this.oldStacks);
              q(a, function (a) {
                q(a, function (a) {
                  a.cumulative = a.total;
                });
              });
            }
          };
          a.prototype.resetStacks = function () {
            var a = this,
              b = a.stacks;
            a.axis.isXAxis ||
              q(b, function (b) {
                q(b, function (d, f) {
                  z(d.touched) && d.touched < a.stacksTouched
                    ? (d.destroy(), delete b[f])
                    : ((d.total = null), (d.cumulative = null));
                });
              });
          };
          a.prototype.renderStackTotals = function () {
            var a = this.axis,
              b = a.chart,
              d = b.renderer,
              f = this.stacks;
            a = E(
              b,
              (a.options.stackLabels && a.options.stackLabels.animation) || !1
            );
            var k = (this.stackTotalGroup =
              this.stackTotalGroup ||
              d
                .g('stack-labels')
                .attr({ visibility: 'visible', zIndex: 6, opacity: 0 })
                .add());
            k.translate(b.plotLeft, b.plotTop);
            q(f, function (a) {
              q(a, function (a) {
                a.render(k);
              });
            });
            k.animate({ opacity: 1 }, a);
          };
          return a;
        })();
        b.Additions = k;
      })(l || (l = {}));
      return l;
    }
  );
  J(
    e,
    'Extensions/Stacking.js',
    [
      e['Core/Axis/Axis.js'],
      e['Core/Chart/Chart.js'],
      e['Core/FormatUtilities.js'],
      e['Core/Globals.js'],
      e['Core/Series/Series.js'],
      e['Core/Axis/StackingAxis.js'],
      e['Core/Utilities.js'],
    ],
    function (b, e, v, E, t, A, C) {
      var z = v.format,
        q = C.correctFloat,
        l = C.defined,
        n = C.destroyObjectProperties,
        d = C.isArray,
        a = C.isNumber,
        f = C.objectEach,
        k = C.pick,
        G = (function () {
          function b(a, b, d, f, h) {
            var k = a.chart.inverted;
            this.axis = a;
            this.isNegative = d;
            this.options = b = b || {};
            this.x = f;
            this.total = null;
            this.points = {};
            this.hasValidPoints = !1;
            this.stack = h;
            this.rightCliff = this.leftCliff = 0;
            this.alignOptions = {
              align: b.align || (k ? (d ? 'left' : 'right') : 'center'),
              verticalAlign:
                b.verticalAlign || (k ? 'middle' : d ? 'bottom' : 'top'),
              y: b.y,
              x: b.x,
            };
            this.textAlign =
              b.textAlign || (k ? (d ? 'right' : 'left') : 'center');
          }
          b.prototype.destroy = function () {
            n(this, this.axis);
          };
          b.prototype.render = function (a) {
            var b = this.axis.chart,
              d = this.options,
              f = d.format;
            f = f ? z(f, this, b) : d.formatter.call(this);
            this.label
              ? this.label.attr({ text: f, visibility: 'hidden' })
              : ((this.label = b.renderer.label(
                  f,
                  null,
                  null,
                  d.shape,
                  null,
                  null,
                  d.useHTML,
                  !1,
                  'stack-labels'
                )),
                (f = {
                  r: d.borderRadius || 0,
                  text: f,
                  rotation: d.rotation,
                  padding: k(d.padding, 5),
                  visibility: 'hidden',
                }),
                b.styledMode ||
                  ((f.fill = d.backgroundColor),
                  (f.stroke = d.borderColor),
                  (f['stroke-width'] = d.borderWidth),
                  this.label.css(d.style)),
                this.label.attr(f),
                this.label.added || this.label.add(a));
            this.label.labelrank = b.plotSizeY;
          };
          b.prototype.setOffset = function (b, d, f, e, h) {
            var m = this.axis,
              c = m.chart;
            e = m.translate(
              m.stacking.usePercentage ? 100 : e ? e : this.total,
              0,
              0,
              0,
              1
            );
            f = m.translate(f ? f : 0);
            f = l(e) && Math.abs(e - f);
            b = k(h, c.xAxis[0].translate(this.x)) + b;
            m = l(e) && this.getStackBox(c, this, b, e, d, f, m);
            d = this.label;
            f = this.isNegative;
            b = 'justify' === k(this.options.overflow, 'justify');
            var r = this.textAlign;
            d &&
              m &&
              ((h = d.getBBox()),
              (e = d.padding),
              (r =
                'left' === r
                  ? c.inverted
                    ? -e
                    : e
                  : 'right' === r
                    ? h.width
                    : c.inverted && 'center' === r
                      ? h.width / 2
                      : c.inverted
                        ? f
                          ? h.width + e
                          : -e
                        : h.width / 2),
              (f = c.inverted ? h.height / 2 : f ? -e : h.height),
              (this.alignOptions.x = k(this.options.x, 0)),
              (this.alignOptions.y = k(this.options.y, 0)),
              (m.x -= r),
              (m.y -= f),
              d.align(this.alignOptions, null, m),
              c.isInsidePlot(
                d.alignAttr.x + r - this.alignOptions.x,
                d.alignAttr.y + f - this.alignOptions.y
              )
                ? d.show()
                : ((d.alignAttr.y = -9999), (b = !1)),
              b &&
                t.prototype.justifyDataLabel.call(
                  this.axis,
                  d,
                  this.alignOptions,
                  d.alignAttr,
                  h,
                  m
                ),
              d.attr({ x: d.alignAttr.x, y: d.alignAttr.y }),
              k(!b && this.options.crop, !0) &&
                ((c =
                  a(d.x) &&
                  a(d.y) &&
                  c.isInsidePlot(d.x - e + d.width, d.y) &&
                  c.isInsidePlot(d.x + e, d.y)) ||
                  d.hide()));
          };
          b.prototype.getStackBox = function (a, b, d, f, h, k, c) {
            var e = b.axis.reversed,
              g = a.inverted,
              m = c.height + c.pos - (g ? a.plotLeft : a.plotTop);
            b = (b.isNegative && !e) || (!b.isNegative && e);
            return {
              x: g
                ? b
                  ? f - c.right
                  : f - k + c.pos - a.plotLeft
                : d + a.xAxis[0].transB - a.plotLeft,
              y: g ? c.height - d - h : b ? m - f - k : m - f,
              width: g ? k : h,
              height: g ? h : k,
            };
          };
          return b;
        })();
      e.prototype.getStacks = function () {
        var a = this,
          b = a.inverted;
        a.yAxis.forEach(function (a) {
          a.stacking &&
            a.stacking.stacks &&
            a.hasVisibleSeries &&
            (a.stacking.oldStacks = a.stacking.stacks);
        });
        a.series.forEach(function (d) {
          var f = (d.xAxis && d.xAxis.options) || {};
          !d.options.stacking ||
            (!0 !== d.visible && !1 !== a.options.chart.ignoreHiddenSeries) ||
            (d.stackKey = [
              d.type,
              k(d.options.stack, ''),
              b ? f.top : f.left,
              b ? f.height : f.width,
            ].join());
        });
      };
      A.compose(b);
      t.prototype.setGroupedPoints = function () {
        var a = this.yAxis.stacking;
        this.options.centerInCategory &&
        (this.is('column') || this.is('columnrange')) &&
        !this.options.stacking &&
        1 < this.chart.series.length
          ? t.prototype.setStackedPoints.call(this, 'group')
          : a &&
            f(a.stacks, function (b, d) {
              'group' === d.slice(-5) &&
                (f(b, function (a) {
                  return a.destroy();
                }),
                delete a.stacks[d]);
            });
      };
      t.prototype.setStackedPoints = function (a) {
        var b = a || this.options.stacking;
        if (
          b &&
          (!0 === this.visible ||
            !1 === this.chart.options.chart.ignoreHiddenSeries)
        ) {
          var f = this.processedXData,
            e = this.processedYData,
            m = [],
            h = e.length,
            p = this.options,
            c = p.threshold,
            n = k(p.startFromThreshold && c, 0);
          p = p.stack;
          a = a ? this.type + ',' + b : this.stackKey;
          var g = '-' + a,
            y = this.negStacks,
            u = this.yAxis,
            D = u.stacking.stacks,
            H = u.stacking.oldStacks,
            t,
            z;
          u.stacking.stacksTouched += 1;
          for (z = 0; z < h; z++) {
            var v = f[z];
            var A = e[z];
            var C = this.getStackIndicator(C, v, this.index);
            var E = C.key;
            var I = (t = y && A < (n ? 0 : c)) ? g : a;
            D[I] || (D[I] = {});
            D[I][v] ||
              (H[I] && H[I][v]
                ? ((D[I][v] = H[I][v]), (D[I][v].total = null))
                : (D[I][v] = new G(u, u.options.stackLabels, t, v, p)));
            I = D[I][v];
            null !== A
              ? ((I.points[E] = I.points[this.index] = [k(I.cumulative, n)]),
                l(I.cumulative) || (I.base = E),
                (I.touched = u.stacking.stacksTouched),
                0 < C.index &&
                  !1 === this.singleStacks &&
                  (I.points[E][0] = I.points[this.index + ',' + v + ',0'][0]))
              : (I.points[E] = I.points[this.index] = null);
            'percent' === b
              ? ((t = t ? a : g),
                y && D[t] && D[t][v]
                  ? ((t = D[t][v]),
                    (I.total = t.total =
                      Math.max(t.total, I.total) + Math.abs(A) || 0))
                  : (I.total = q(I.total + (Math.abs(A) || 0))))
              : 'group' === b
                ? (d(A) && (A = A[0]),
                  null !== A && (I.total = (I.total || 0) + 1))
                : (I.total = q(I.total + (A || 0)));
            I.cumulative =
              'group' === b
                ? (I.total || 1) - 1
                : k(I.cumulative, n) + (A || 0);
            null !== A &&
              (I.points[E].push(I.cumulative),
              (m[z] = I.cumulative),
              (I.hasValidPoints = !0));
          }
          'percent' === b && (u.stacking.usePercentage = !0);
          'group' !== b && (this.stackedYData = m);
          u.stacking.oldStacks = {};
        }
      };
      t.prototype.modifyStacks = function () {
        var a = this,
          b = a.stackKey,
          d = a.yAxis.stacking.stacks,
          f = a.processedXData,
          k,
          h = a.options.stacking;
        a[h + 'Stacker'] &&
          [b, '-' + b].forEach(function (b) {
            for (var c = f.length, e, g; c--; )
              if (
                ((e = f[c]),
                (k = a.getStackIndicator(k, e, a.index, b)),
                (g = (e = d[b] && d[b][e]) && e.points[k.key]))
              )
                a[h + 'Stacker'](g, e, c);
          });
      };
      t.prototype.percentStacker = function (a, b, d) {
        b = b.total ? 100 / b.total : 0;
        a[0] = q(a[0] * b);
        a[1] = q(a[1] * b);
        this.stackedYData[d] = a[1];
      };
      t.prototype.getStackIndicator = function (a, b, d, f) {
        !l(a) || a.x !== b || (f && a.stackKey !== f)
          ? (a = { x: b, index: 0, key: f, stackKey: f })
          : a.index++;
        a.key = [d, b, a.index].join();
        return a;
      };
      E.StackItem = G;
      ('');
      return E.StackItem;
    }
  );
  J(
    e,
    'Series/Line/LineSeries.js',
    [
      e['Core/Series/Series.js'],
      e['Core/Series/SeriesRegistry.js'],
      e['Core/Utilities.js'],
    ],
    function (b, e, v) {
      var I =
          (this && this.__extends) ||
          (function () {
            var b = function (e, q) {
              b =
                Object.setPrototypeOf ||
                ({ __proto__: [] } instanceof Array &&
                  function (b, e) {
                    b.__proto__ = e;
                  }) ||
                function (b, e) {
                  for (var d in e) e.hasOwnProperty(d) && (b[d] = e[d]);
                };
              return b(e, q);
            };
            return function (e, q) {
              function l() {
                this.constructor = e;
              }
              b(e, q);
              e.prototype =
                null === q
                  ? Object.create(q)
                  : ((l.prototype = q.prototype), new l());
            };
          })(),
        t = v.defined,
        A = v.merge;
      v = (function (e) {
        function z() {
          var b = (null !== e && e.apply(this, arguments)) || this;
          b.data = void 0;
          b.options = void 0;
          b.points = void 0;
          return b;
        }
        I(z, e);
        z.prototype.drawGraph = function () {
          var b = this,
            e = this.options,
            n = (this.gappedPath || this.getGraphPath).call(this),
            d = this.chart.styledMode,
            a = [['graph', 'highcharts-graph']];
          d || a[0].push(e.lineColor || this.color || '#cccccc', e.dashStyle);
          a = b.getZonesGraphs(a);
          a.forEach(function (a, k) {
            var f = a[0],
              l = b[f],
              q = l ? 'animate' : 'attr';
            l
              ? ((l.endX = b.preventGraphAnimation ? null : n.xMap),
                l.animate({ d: n }))
              : n.length &&
                (b[f] = l =
                  b.chart.renderer
                    .path(n)
                    .addClass(a[1])
                    .attr({ zIndex: 1 })
                    .add(b.group));
            l &&
              !d &&
              ((f = {
                stroke: a[2],
                'stroke-width': e.lineWidth,
                fill: (b.fillGraph && b.color) || 'none',
              }),
              a[3]
                ? (f.dashstyle = a[3])
                : 'square' !== e.linecap &&
                  (f['stroke-linecap'] = f['stroke-linejoin'] = 'round'),
              l[q](f).shadow(2 > k && e.shadow));
            l && ((l.startX = n.xMap), (l.isArea = n.isArea));
          });
        };
        z.prototype.getGraphPath = function (b, e, n) {
          var d = this,
            a = d.options,
            f = [],
            k = [],
            l,
            y = a.step;
          b = b || d.points;
          var q = b.reversed;
          q && b.reverse();
          (y = { right: 1, center: 2 }[y] || (y && 3)) && q && (y = 4 - y);
          b = this.getValidPoints(b, !1, !(a.connectNulls && !e && !n));
          b.forEach(function (x, r) {
            var m = x.plotX,
              h = x.plotY,
              p = b[r - 1];
            (x.leftCliff || (p && p.rightCliff)) && !n && (l = !0);
            x.isNull && !t(e) && 0 < r
              ? (l = !a.connectNulls)
              : x.isNull && !e
                ? (l = !0)
                : (0 === r || l
                    ? (r = [['M', x.plotX, x.plotY]])
                    : d.getPointSpline
                      ? (r = [d.getPointSpline(b, x, r)])
                      : y
                        ? ((r =
                            1 === y
                              ? [['L', p.plotX, h]]
                              : 2 === y
                                ? [
                                    ['L', (p.plotX + m) / 2, p.plotY],
                                    ['L', (p.plotX + m) / 2, h],
                                  ]
                                : [['L', m, p.plotY]]),
                          r.push(['L', m, h]))
                        : (r = [['L', m, h]]),
                  k.push(x.x),
                  y && (k.push(x.x), 2 === y && k.push(x.x)),
                  f.push.apply(f, r),
                  (l = !1));
          });
          f.xMap = k;
          return (d.graphPath = f);
        };
        z.prototype.getZonesGraphs = function (b) {
          this.zones.forEach(function (e, n) {
            n = [
              'zone-graph-' + n,
              'highcharts-graph highcharts-zone-graph-' +
                n +
                ' ' +
                (e.className || ''),
            ];
            this.chart.styledMode ||
              n.push(
                e.color || this.color,
                e.dashStyle || this.options.dashStyle
              );
            b.push(n);
          }, this);
          return b;
        };
        z.defaultOptions = A(b.defaultOptions, {});
        return z;
      })(b);
      e.registerSeriesType('line', v);
      ('');
      return v;
    }
  );
  J(
    e,
    'Series/Area/AreaSeries.js',
    [
      e['Core/Color/Color.js'],
      e['Core/Legend/LegendSymbol.js'],
      e['Core/Series/SeriesRegistry.js'],
      e['Core/Utilities.js'],
    ],
    function (b, e, v, E) {
      var t =
          (this && this.__extends) ||
          (function () {
            var b = function (d, a) {
              b =
                Object.setPrototypeOf ||
                ({ __proto__: [] } instanceof Array &&
                  function (a, b) {
                    a.__proto__ = b;
                  }) ||
                function (a, b) {
                  for (var d in b) b.hasOwnProperty(d) && (a[d] = b[d]);
                };
              return b(d, a);
            };
            return function (d, a) {
              function f() {
                this.constructor = d;
              }
              b(d, a);
              d.prototype =
                null === a
                  ? Object.create(a)
                  : ((f.prototype = a.prototype), new f());
            };
          })(),
        A = b.parse,
        I = v.seriesTypes.line;
      b = E.extend;
      var z = E.merge,
        q = E.objectEach,
        l = E.pick;
      E = (function (b) {
        function d() {
          var a = (null !== b && b.apply(this, arguments)) || this;
          a.data = void 0;
          a.options = void 0;
          a.points = void 0;
          return a;
        }
        t(d, b);
        d.prototype.drawGraph = function () {
          this.areaPath = [];
          b.prototype.drawGraph.apply(this);
          var a = this,
            d = this.areaPath,
            e = this.options,
            n = [['area', 'highcharts-area', this.color, e.fillColor]];
          this.zones.forEach(function (b, d) {
            n.push([
              'zone-area-' + d,
              'highcharts-area highcharts-zone-area-' + d + ' ' + b.className,
              b.color || a.color,
              b.fillColor || e.fillColor,
            ]);
          });
          n.forEach(function (b) {
            var f = b[0],
              k = a[f],
              r = k ? 'animate' : 'attr',
              m = {};
            k
              ? ((k.endX = a.preventGraphAnimation ? null : d.xMap),
                k.animate({ d: d }))
              : ((m.zIndex = 0),
                (k = a[f] =
                  a.chart.renderer.path(d).addClass(b[1]).add(a.group)),
                (k.isArea = !0));
            a.chart.styledMode ||
              (m.fill = l(
                b[3],
                A(b[2]).setOpacity(l(e.fillOpacity, 0.75)).get()
              ));
            k[r](m);
            k.startX = d.xMap;
            k.shiftUnit = e.step ? 2 : 1;
          });
        };
        d.prototype.getGraphPath = function (a) {
          var b = I.prototype.getGraphPath,
            d = this.options,
            e = d.stacking,
            n = this.yAxis,
            q,
            x = [],
            r = [],
            m = this.index,
            h = n.stacking.stacks[this.stackKey],
            p = d.threshold,
            c = Math.round(n.getThreshold(d.threshold));
          d = l(d.connectNulls, 'percent' === e);
          var w = function (b, d, f) {
            var g = a[b];
            b = e && h[g.x].points[m];
            var k = g[f + 'Null'] || 0;
            f = g[f + 'Cliff'] || 0;
            g = !0;
            if (f || k) {
              var l = (k ? b[0] : b[1]) + f;
              var u = b[0] + f;
              g = !!k;
            } else !e && a[d] && a[d].isNull && (l = u = p);
            'undefined' !== typeof l &&
              (r.push({
                plotX: F,
                plotY: null === l ? c : n.getThreshold(l),
                isNull: g,
                isCliff: !0,
              }),
              x.push({
                plotX: F,
                plotY: null === u ? c : n.getThreshold(u),
                doCurve: !1,
              }));
          };
          a = a || this.points;
          e && (a = this.getStackPoints(a));
          for (q = 0; q < a.length; q++) {
            e ||
              (a[q].leftCliff =
                a[q].rightCliff =
                a[q].leftNull =
                a[q].rightNull =
                  void 0);
            var g = a[q].isNull;
            var F = l(a[q].rectPlotX, a[q].plotX);
            var u = e ? l(a[q].yBottom, c) : c;
            if (!g || d)
              d || w(q, q - 1, 'left'),
                (g && !e && d) ||
                  (r.push(a[q]), x.push({ x: q, plotX: F, plotY: u })),
                d || w(q, q + 1, 'right');
          }
          q = b.call(this, r, !0, !0);
          x.reversed = !0;
          g = b.call(this, x, !0, !0);
          (u = g[0]) && 'M' === u[0] && (g[0] = ['L', u[1], u[2]]);
          g = q.concat(g);
          g.length && g.push(['Z']);
          b = b.call(this, r, !1, d);
          g.xMap = q.xMap;
          this.areaPath = g;
          return b;
        };
        d.prototype.getStackPoints = function (a) {
          var b = this,
            d = [],
            e = [],
            n = this.xAxis,
            B = this.yAxis,
            x = B.stacking.stacks[this.stackKey],
            r = {},
            m = B.series,
            h = m.length,
            p = B.options.reversedStacks ? 1 : -1,
            c = m.indexOf(b);
          a = a || this.points;
          if (this.options.stacking) {
            for (var w = 0; w < a.length; w++)
              (a[w].leftNull = a[w].rightNull = void 0), (r[a[w].x] = a[w]);
            q(x, function (c, a) {
              null !== c.total && e.push(a);
            });
            e.sort(function (c, a) {
              return c - a;
            });
            var g = m.map(function (c) {
              return c.visible;
            });
            e.forEach(function (a, f) {
              var k = 0,
                u,
                w;
              if (r[a] && !r[a].isNull)
                d.push(r[a]),
                  [-1, 1].forEach(function (d) {
                    var k = 1 === d ? 'rightNull' : 'leftNull',
                      l = 0,
                      n = x[e[f + d]];
                    if (n)
                      for (var D = c; 0 <= D && D < h; ) {
                        var q = m[D].index;
                        u = n.points[q];
                        u ||
                          (q === b.index
                            ? (r[a][k] = !0)
                            : g[D] &&
                              (w = x[a].points[q]) &&
                              (l -= w[1] - w[0]));
                        D += p;
                      }
                    r[a][1 === d ? 'rightCliff' : 'leftCliff'] = l;
                  });
              else {
                for (var q = c; 0 <= q && q < h; ) {
                  if ((u = x[a].points[m[q].index])) {
                    k = u[1];
                    break;
                  }
                  q += p;
                }
                k = l(k, 0);
                k = B.translate(k, 0, 1, 0, 1);
                d.push({
                  isNull: !0,
                  plotX: n.translate(a, 0, 0, 0, 1),
                  x: a,
                  plotY: k,
                  yBottom: k,
                });
              }
            });
          }
          return d;
        };
        d.defaultOptions = z(I.defaultOptions, { threshold: 0 });
        return d;
      })(I);
      b(E.prototype, { singleStacks: !1, drawLegendSymbol: e.drawRectangle });
      v.registerSeriesType('area', E);
      ('');
      return E;
    }
  );
  J(
    e,
    'Series/Spline/SplineSeries.js',
    [e['Core/Series/SeriesRegistry.js'], e['Core/Utilities.js']],
    function (b, e) {
      var v =
          (this && this.__extends) ||
          (function () {
            var b = function (e, q) {
              b =
                Object.setPrototypeOf ||
                ({ __proto__: [] } instanceof Array &&
                  function (b, e) {
                    b.__proto__ = e;
                  }) ||
                function (b, e) {
                  for (var d in e) e.hasOwnProperty(d) && (b[d] = e[d]);
                };
              return b(e, q);
            };
            return function (e, q) {
              function l() {
                this.constructor = e;
              }
              b(e, q);
              e.prototype =
                null === q
                  ? Object.create(q)
                  : ((l.prototype = q.prototype), new l());
            };
          })(),
        I = b.seriesTypes.line,
        t = e.merge,
        A = e.pick;
      e = (function (b) {
        function e() {
          var e = (null !== b && b.apply(this, arguments)) || this;
          e.data = void 0;
          e.options = void 0;
          e.points = void 0;
          return e;
        }
        v(e, b);
        e.prototype.getPointSpline = function (b, e, n) {
          var d = e.plotX || 0,
            a = e.plotY || 0,
            f = b[n - 1];
          n = b[n + 1];
          if (
            f &&
            !f.isNull &&
            !1 !== f.doCurve &&
            !e.isCliff &&
            n &&
            !n.isNull &&
            !1 !== n.doCurve &&
            !e.isCliff
          ) {
            b = f.plotY || 0;
            var k = n.plotX || 0;
            n = n.plotY || 0;
            var l = 0;
            var q = (1.5 * d + (f.plotX || 0)) / 2.5;
            var B = (1.5 * a + b) / 2.5;
            k = (1.5 * d + k) / 2.5;
            var x = (1.5 * a + n) / 2.5;
            k !== q && (l = ((x - B) * (k - d)) / (k - q) + a - x);
            B += l;
            x += l;
            B > b && B > a
              ? ((B = Math.max(b, a)), (x = 2 * a - B))
              : B < b && B < a && ((B = Math.min(b, a)), (x = 2 * a - B));
            x > n && x > a
              ? ((x = Math.max(n, a)), (B = 2 * a - x))
              : x < n && x < a && ((x = Math.min(n, a)), (B = 2 * a - x));
            e.rightContX = k;
            e.rightContY = x;
          }
          e = [
            'C',
            A(f.rightContX, f.plotX, 0),
            A(f.rightContY, f.plotY, 0),
            A(q, d, 0),
            A(B, a, 0),
            d,
            a,
          ];
          f.rightContX = f.rightContY = void 0;
          return e;
        };
        e.defaultOptions = t(I.defaultOptions);
        return e;
      })(I);
      b.registerSeriesType('spline', e);
      ('');
      return e;
    }
  );
  J(
    e,
    'Series/AreaSpline/AreaSplineSeries.js',
    [
      e['Series/Area/AreaSeries.js'],
      e['Series/Spline/SplineSeries.js'],
      e['Core/Legend/LegendSymbol.js'],
      e['Core/Series/SeriesRegistry.js'],
      e['Core/Utilities.js'],
    ],
    function (b, e, v, E, t) {
      var A =
          (this && this.__extends) ||
          (function () {
            var b = function (e, d) {
              b =
                Object.setPrototypeOf ||
                ({ __proto__: [] } instanceof Array &&
                  function (a, b) {
                    a.__proto__ = b;
                  }) ||
                function (a, b) {
                  for (var d in b) b.hasOwnProperty(d) && (a[d] = b[d]);
                };
              return b(e, d);
            };
            return function (e, d) {
              function a() {
                this.constructor = e;
              }
              b(e, d);
              e.prototype =
                null === d
                  ? Object.create(d)
                  : ((a.prototype = d.prototype), new a());
            };
          })(),
        I = b.prototype,
        z = t.extend,
        q = t.merge;
      t = (function (l) {
        function n() {
          var b = (null !== l && l.apply(this, arguments)) || this;
          b.data = void 0;
          b.points = void 0;
          b.options = void 0;
          return b;
        }
        A(n, l);
        n.defaultOptions = q(e.defaultOptions, b.defaultOptions);
        return n;
      })(e);
      z(t.prototype, {
        getGraphPath: I.getGraphPath,
        getStackPoints: I.getStackPoints,
        drawGraph: I.drawGraph,
        drawLegendSymbol: v.drawRectangle,
      });
      E.registerSeriesType('areaspline', t);
      ('');
      return t;
    }
  );
  J(
    e,
    'Series/Column/ColumnSeries.js',
    [
      e['Core/Animation/AnimationUtilities.js'],
      e['Core/Color/Color.js'],
      e['Core/Globals.js'],
      e['Core/Legend/LegendSymbol.js'],
      e['Core/Series/Series.js'],
      e['Core/Series/SeriesRegistry.js'],
      e['Core/Utilities.js'],
    ],
    function (b, e, v, E, t, A, C) {
      var z =
          (this && this.__extends) ||
          (function () {
            var a = function (b, c) {
              a =
                Object.setPrototypeOf ||
                ({ __proto__: [] } instanceof Array &&
                  function (c, a) {
                    c.__proto__ = a;
                  }) ||
                function (c, a) {
                  for (var b in a) a.hasOwnProperty(b) && (c[b] = a[b]);
                };
              return a(b, c);
            };
            return function (b, c) {
              function d() {
                this.constructor = b;
              }
              a(b, c);
              b.prototype =
                null === c
                  ? Object.create(c)
                  : ((d.prototype = c.prototype), new d());
            };
          })(),
        q = b.animObject,
        l = e.parse,
        n = v.hasTouch;
      b = v.noop;
      var d = C.clamp,
        a = C.css,
        f = C.defined,
        k = C.extend,
        G = C.fireEvent,
        y = C.isArray,
        B = C.isNumber,
        x = C.merge,
        r = C.pick,
        m = C.objectEach;
      C = (function (b) {
        function h() {
          var c = (null !== b && b.apply(this, arguments)) || this;
          c.borderWidth = void 0;
          c.data = void 0;
          c.group = void 0;
          c.options = void 0;
          c.points = void 0;
          return c;
        }
        z(h, b);
        h.prototype.animate = function (c) {
          var a = this,
            b = this.yAxis,
            f = a.options,
            h = this.chart.inverted,
            e = {},
            m = h ? 'translateX' : 'translateY';
          if (c)
            (e.scaleY = 0.001),
              (c = d(b.toPixels(f.threshold), b.pos, b.pos + b.len)),
              h ? (e.translateX = c - b.len) : (e.translateY = c),
              a.clipBox && a.setClip(),
              a.group.attr(e);
          else {
            var l = Number(a.group.attr(m));
            a.group.animate(
              { scaleY: 1 },
              k(q(a.options.animation), {
                step: function (c, d) {
                  a.group &&
                    ((e[m] = l + d.pos * (b.pos - l)), a.group.attr(e));
                },
              })
            );
          }
        };
        h.prototype.init = function (c, a) {
          b.prototype.init.apply(this, arguments);
          var d = this;
          c = d.chart;
          c.hasRendered &&
            c.series.forEach(function (c) {
              c.type === d.type && (c.isDirty = !0);
            });
        };
        h.prototype.getColumnMetrics = function () {
          var c = this,
            a = c.options,
            b = c.xAxis,
            d = c.yAxis,
            f = b.options.reversedStacks;
          f = (b.reversed && !f) || (!b.reversed && f);
          var h = {},
            e,
            k = 0;
          !1 === a.grouping
            ? (k = 1)
            : c.chart.series.forEach(function (a) {
                var b = a.yAxis,
                  f = a.options;
                if (
                  a.type === c.type &&
                  (a.visible || !c.chart.options.chart.ignoreHiddenSeries) &&
                  d.len === b.len &&
                  d.pos === b.pos
                ) {
                  if (f.stacking && 'group' !== f.stacking) {
                    e = a.stackKey;
                    'undefined' === typeof h[e] && (h[e] = k++);
                    var g = h[e];
                  } else !1 !== f.grouping && (g = k++);
                  a.columnIndex = g;
                }
              });
          var m = Math.min(
              Math.abs(b.transA) *
                ((b.ordinal && b.ordinal.slope) ||
                  a.pointRange ||
                  b.closestPointRange ||
                  b.tickInterval ||
                  1),
              b.len
            ),
            l = m * a.groupPadding,
            p = (m - 2 * l) / (k || 1);
          a = Math.min(
            a.maxPointWidth || b.len,
            r(a.pointWidth, p * (1 - 2 * a.pointPadding))
          );
          c.columnMetrics = {
            width: a,
            offset:
              (p - a) / 2 +
              (l + ((c.columnIndex || 0) + (f ? 1 : 0)) * p - m / 2) *
                (f ? -1 : 1),
            paddedWidth: p,
            columnCount: k,
          };
          return c.columnMetrics;
        };
        h.prototype.crispCol = function (c, a, b, d) {
          var f = this.chart,
            g = this.borderWidth,
            h = -(g % 2 ? 0.5 : 0);
          g = g % 2 ? 0.5 : 1;
          f.inverted && f.renderer.isVML && (g += 1);
          this.options.crisp &&
            ((b = Math.round(c + b) + h), (c = Math.round(c) + h), (b -= c));
          d = Math.round(a + d) + g;
          h = 0.5 >= Math.abs(a) && 0.5 < d;
          a = Math.round(a) + g;
          d -= a;
          h && d && (--a, (d += 1));
          return { x: c, y: a, width: b, height: d };
        };
        h.prototype.adjustForMissingColumns = function (c, a, b, d) {
          var f = this,
            g = this.options.stacking;
          if (!b.isNull && 1 < d.columnCount) {
            var h = this.yAxis.options.reversedStacks,
              e = 0,
              k = h ? 0 : -d.columnCount;
            m(this.yAxis.stacking && this.yAxis.stacking.stacks, function (c) {
              if ('number' === typeof b.x && (c = c[b.x.toString()])) {
                var a = c.points[f.index],
                  d = c.total;
                g
                  ? (a && (e = k), c.hasValidPoints && (h ? k++ : k--))
                  : y(a) && ((e = a[1]), (k = d || 0));
              }
            });
            c =
              (b.plotX || 0) +
              ((k - 1) * d.paddedWidth + a) / 2 -
              a -
              e * d.paddedWidth;
          }
          return c;
        };
        h.prototype.translate = function () {
          var c = this,
            a = c.chart,
            b = c.options,
            h = (c.dense = 2 > c.closestPointRange * c.xAxis.transA);
          h = c.borderWidth = r(b.borderWidth, h ? 0 : 1);
          var e = c.xAxis,
            k = c.yAxis,
            m = b.threshold,
            l = (c.translatedThreshold = k.getThreshold(m)),
            p = r(b.minPointLength, 5),
            n = c.getColumnMetrics(),
            x = n.width,
            q = (c.pointXOffset = n.offset),
            y = c.dataMin,
            G = c.dataMax,
            z = (c.barW = Math.max(x, 1 + 2 * h));
          a.inverted && (l -= 0.5);
          b.pointPadding && (z = Math.ceil(z));
          t.prototype.translate.apply(c);
          c.points.forEach(function (g) {
            var h = r(g.yBottom, l),
              u = 999 + Math.abs(h),
              w = g.plotX || 0;
            u = d(g.plotY, -u, k.len + u);
            var D = Math.min(u, h),
              t = Math.max(u, h) - D,
              H = x,
              F = w + q,
              v = z;
            p &&
              Math.abs(t) < p &&
              ((t = p),
              (w = (!k.reversed && !g.negative) || (k.reversed && g.negative)),
              B(m) &&
                B(G) &&
                g.y === m &&
                G <= m &&
                (k.min || 0) < m &&
                (y !== G || (k.max || 0) <= m) &&
                (w = !w),
              (D = Math.abs(D - l) > p ? h - p : l - (w ? p : 0)));
            f(g.options.pointWidth) &&
              ((H = v = Math.ceil(g.options.pointWidth)),
              (F -= Math.round((H - x) / 2)));
            b.centerInCategory && (F = c.adjustForMissingColumns(F, H, g, n));
            g.barX = F;
            g.pointWidth = H;
            g.tooltipPos = a.inverted
              ? [
                  d(
                    k.len + k.pos - a.plotLeft - u,
                    k.pos - a.plotLeft,
                    k.len + k.pos - a.plotLeft
                  ),
                  e.len + e.pos - a.plotTop - F - v / 2,
                  t,
                ]
              : [
                  e.left - a.plotLeft + F + v / 2,
                  d(
                    u + k.pos - a.plotTop,
                    k.pos - a.plotTop,
                    k.len + k.pos - a.plotTop
                  ),
                  t,
                ];
            g.shapeType = c.pointClass.prototype.shapeType || 'rect';
            g.shapeArgs = c.crispCol.apply(
              c,
              g.isNull ? [F, l, v, 0] : [F, D, v, t]
            );
          });
        };
        h.prototype.drawGraph = function () {
          this.group[this.dense ? 'addClass' : 'removeClass'](
            'highcharts-dense-data'
          );
        };
        h.prototype.pointAttribs = function (c, a) {
          var b = this.options,
            d = this.pointAttrToOptions || {},
            f = d.stroke || 'borderColor',
            h = d['stroke-width'] || 'borderWidth',
            e = (c && c.color) || this.color,
            k = (c && c[f]) || b[f] || e;
          d = (c && c.options.dashStyle) || b.dashStyle;
          var m = (c && c[h]) || b[h] || this[h] || 0,
            p = r(c && c.opacity, b.opacity, 1);
          if (c && this.zones.length) {
            var n = c.getZone();
            e =
              c.options.color ||
              (n && (n.color || c.nonZonedColor)) ||
              this.color;
            n &&
              ((k = n.borderColor || k),
              (d = n.dashStyle || d),
              (m = n.borderWidth || m));
          }
          a &&
            c &&
            ((c = x(
              b.states[a],
              (c.options.states && c.options.states[a]) || {}
            )),
            (a = c.brightness),
            (e =
              c.color ||
              ('undefined' !== typeof a && l(e).brighten(c.brightness).get()) ||
              e),
            (k = c[f] || k),
            (m = c[h] || m),
            (d = c.dashStyle || d),
            (p = r(c.opacity, p)));
          f = { fill: e, stroke: k, 'stroke-width': m, opacity: p };
          d && (f.dashstyle = d);
          return f;
        };
        h.prototype.drawPoints = function () {
          var c = this,
            a = this.chart,
            b = c.options,
            d = a.renderer,
            f = b.animationLimit || 250,
            h;
          c.points.forEach(function (g) {
            var e = g.graphic,
              k = !!e,
              m = e && a.pointCount < f ? 'animate' : 'attr';
            if (B(g.plotY) && null !== g.y) {
              h = g.shapeArgs;
              e && g.hasNewShapeType() && (e = e.destroy());
              c.enabledDataSorting &&
                (g.startXPos = c.xAxis.reversed
                  ? -(h ? h.width || 0 : 0)
                  : c.xAxis.width);
              e ||
                ((g.graphic = e = d[g.shapeType](h).add(g.group || c.group)) &&
                  c.enabledDataSorting &&
                  a.hasRendered &&
                  a.pointCount < f &&
                  (e.attr({ x: g.startXPos }), (k = !0), (m = 'animate')));
              if (e && k) e[m](x(h));
              if (b.borderRadius) e[m]({ r: b.borderRadius });
              a.styledMode ||
                e[m](c.pointAttribs(g, g.selected && 'select')).shadow(
                  !1 !== g.allowShadow && b.shadow,
                  null,
                  b.stacking && !b.borderRadius
                );
              e &&
                (e.addClass(g.getClassName(), !0),
                e.attr({ visibility: g.visible ? 'inherit' : 'hidden' }));
            } else e && (g.graphic = e.destroy());
          });
        };
        h.prototype.drawTracker = function () {
          var c = this,
            b = c.chart,
            d = b.pointer,
            f = function (c) {
              var a = d.getPointFromEvent(c);
              'undefined' !== typeof a &&
                ((d.isDirectTouch = !0), a.onMouseOver(c));
            },
            h;
          c.points.forEach(function (c) {
            h = y(c.dataLabels)
              ? c.dataLabels
              : c.dataLabel
                ? [c.dataLabel]
                : [];
            c.graphic && (c.graphic.element.point = c);
            h.forEach(function (a) {
              a.div ? (a.div.point = c) : (a.element.point = c);
            });
          });
          c._hasTracking ||
            (c.trackerGroups.forEach(function (g) {
              if (c[g]) {
                c[g]
                  .addClass('highcharts-tracker')
                  .on('mouseover', f)
                  .on('mouseout', function (c) {
                    d.onTrackerMouseOut(c);
                  });
                if (n) c[g].on('touchstart', f);
                !b.styledMode &&
                  c.options.cursor &&
                  c[g].css(a).css({ cursor: c.options.cursor });
              }
            }),
            (c._hasTracking = !0));
          G(this, 'afterDrawTracker');
        };
        h.prototype.remove = function () {
          var c = this,
            a = c.chart;
          a.hasRendered &&
            a.series.forEach(function (a) {
              a.type === c.type && (a.isDirty = !0);
            });
          t.prototype.remove.apply(c, arguments);
        };
        h.defaultOptions = x(t.defaultOptions, {
          borderRadius: 0,
          centerInCategory: !1,
          groupPadding: 0.2,
          marker: null,
          pointPadding: 0.1,
          minPointLength: 0,
          cropThreshold: 50,
          pointRange: null,
          states: {
            hover: { halo: !1, brightness: 0.1 },
            select: { color: '#cccccc', borderColor: '#000000' },
          },
          dataLabels: { align: void 0, verticalAlign: void 0, y: void 0 },
          startFromThreshold: !0,
          stickyTracking: !1,
          tooltip: { distance: 6 },
          threshold: 0,
          borderColor: '#ffffff',
        });
        return h;
      })(t);
      k(C.prototype, {
        cropShoulder: 0,
        directTouch: !0,
        drawLegendSymbol: E.drawRectangle,
        getSymbol: b,
        negStacks: !0,
        trackerGroups: ['group', 'dataLabelsGroup'],
      });
      A.registerSeriesType('column', C);
      ('');
      ('');
      return C;
    }
  );
  J(
    e,
    'Core/Series/DataLabel.js',
    [
      e['Core/Animation/AnimationUtilities.js'],
      e['Core/FormatUtilities.js'],
      e['Core/Utilities.js'],
    ],
    function (b, e, v) {
      var I = b.getDeferredAnimation,
        t = e.format,
        A = v.defined,
        C = v.extend,
        z = v.fireEvent,
        q = v.isArray,
        l = v.merge,
        n = v.objectEach,
        d = v.pick,
        a = v.splat,
        f;
      (function (b) {
        function f(a, c, b, f, h) {
          var g = this,
            e = this.chart,
            k = this.isCartesian && e.inverted,
            m = this.enabledDataSorting,
            l = d(a.dlBox && a.dlBox.centerX, a.plotX, -9999),
            p = d(a.plotY, -9999),
            r = c.getBBox(),
            n = b.rotation,
            w = b.align,
            x = e.isInsidePlot(l, Math.round(p), {
              inverted: k,
              paneCoordinates: !0,
              series: g,
            }),
            q = function (b) {
              m && g.xAxis && !y && g.setDataLabelStartPos(a, c, h, x, b);
            },
            y = 'justify' === d(b.overflow, m ? 'none' : 'justify'),
            B =
              this.visible &&
              !1 !== a.visible &&
              (a.series.forceDL ||
                (m && !y) ||
                x ||
                (d(b.inside, !!this.options.stacking) &&
                  f &&
                  e.isInsidePlot(l, k ? f.x + 1 : f.y + f.height - 1, {
                    inverted: k,
                    paneCoordinates: !0,
                    series: g,
                  })));
          if (B) {
            var t = e.renderer.fontMetrics(
              e.styledMode ? void 0 : b.style.fontSize,
              c
            ).b;
            f = C(
              {
                x: k ? this.yAxis.len - p : l,
                y: Math.round(k ? this.xAxis.len - l : p),
                width: 0,
                height: 0,
              },
              f
            );
            C(b, { width: r.width, height: r.height });
            n
              ? ((y = !1),
                (l = e.renderer.rotCorr(t, n)),
                (l = {
                  x: f.x + (b.x || 0) + f.width / 2 + l.x,
                  y:
                    f.y +
                    (b.y || 0) +
                    { top: 0, middle: 0.5, bottom: 1 }[b.verticalAlign] *
                      f.height,
                }),
                q(l),
                c[h ? 'attr' : 'animate'](l).attr({ align: w }),
                (q = (n + 720) % 360),
                (q = 180 < q && 360 > q),
                'left' === w
                  ? (l.y -= q ? r.height : 0)
                  : 'center' === w
                    ? ((l.x -= r.width / 2), (l.y -= r.height / 2))
                    : 'right' === w &&
                      ((l.x -= r.width), (l.y -= q ? 0 : r.height)),
                (c.placed = !0),
                (c.alignAttr = l))
              : (q(f), c.align(b, void 0, f), (l = c.alignAttr));
            y && 0 <= f.height
              ? this.justifyDataLabel(c, b, l, r, f, h)
              : d(b.crop, !0) &&
                (B =
                  e.isInsidePlot(l.x, l.y, {
                    paneCoordinates: !0,
                    series: g,
                  }) &&
                  e.isInsidePlot(l.x + r.width, l.y + r.height, {
                    paneCoordinates: !0,
                    series: g,
                  }));
            if (b.shape && !n)
              c[h ? 'attr' : 'animate']({
                anchorX: k ? e.plotWidth - a.plotY : a.plotX,
                anchorY: k ? e.plotHeight - a.plotX : a.plotY,
              });
          }
          h && m && (c.placed = !1);
          B || (m && !y) || (c.hide(!0), (c.placed = !1));
        }
        function e(a, c) {
          var b = c.filter;
          return b
            ? ((c = b.operator),
              (a = a[b.property]),
              (b = b.value),
              ('>' === c && a > b) ||
              ('<' === c && a < b) ||
              ('>=' === c && a >= b) ||
              ('<=' === c && a <= b) ||
              ('==' === c && a == b) ||
              ('===' === c && a === b)
                ? !0
                : !1)
            : !0;
        }
        function k() {
          var b = this,
            c = b.chart,
            f = b.options,
            g = b.points,
            h = b.hasRendered || 0,
            k = c.renderer,
            m = f.dataLabels,
            l,
            x = m.animation;
          x = m.defer ? I(c, x, b) : { defer: 0, duration: 0 };
          m = r(
            r(
              c.options.plotOptions &&
                c.options.plotOptions.series &&
                c.options.plotOptions.series.dataLabels,
              c.options.plotOptions &&
                c.options.plotOptions[b.type] &&
                c.options.plotOptions[b.type].dataLabels
            ),
            m
          );
          z(this, 'drawDataLabels');
          if (q(m) || m.enabled || b._hasPointLabels) {
            var y = b.plotGroup(
              'dataLabelsGroup',
              'data-labels',
              h ? 'inherit' : 'hidden',
              m.zIndex || 6
            );
            y.attr({ opacity: +h });
            !h &&
              (h = b.dataLabelsGroup) &&
              (b.visible && y.show(!0),
              h[f.animation ? 'animate' : 'attr']({ opacity: 1 }, x));
            g.forEach(function (g) {
              l = a(r(m, g.dlOptions || (g.options && g.options.dataLabels)));
              l.forEach(function (a, h) {
                var m =
                    a.enabled && (!g.isNull || g.dataLabelOnNull) && e(g, a),
                  l = g.connectors ? g.connectors[h] : g.connector,
                  p = g.dataLabels ? g.dataLabels[h] : g.dataLabel,
                  r = !p,
                  u = d(a.distance, g.labelDistance);
                if (m) {
                  var x = g.getLabelConfig();
                  var w = d(a[g.formatPrefix + 'Format'], a.format);
                  x = A(w)
                    ? t(w, x, c)
                    : (a[g.formatPrefix + 'Formatter'] || a.formatter).call(
                        x,
                        a
                      );
                  w = a.style;
                  var q = a.rotation;
                  c.styledMode ||
                    ((w.color = d(a.color, w.color, b.color, '#000000')),
                    'contrast' === w.color
                      ? ((g.contrastColor = k.getContrast(g.color || b.color)),
                        (w.color =
                          (!A(u) && a.inside) || 0 > u || f.stacking
                            ? g.contrastColor
                            : '#000000'))
                      : delete g.contrastColor,
                    f.cursor && (w.cursor = f.cursor));
                  var D = {
                    r: a.borderRadius || 0,
                    rotation: q,
                    padding: a.padding,
                    zIndex: 1,
                  };
                  c.styledMode ||
                    ((D.fill = a.backgroundColor),
                    (D.stroke = a.borderColor),
                    (D['stroke-width'] = a.borderWidth));
                  n(D, function (c, a) {
                    'undefined' === typeof c && delete D[a];
                  });
                }
                !p ||
                  (m &&
                    A(x) &&
                    !!p.div === !!a.useHTML &&
                    ((p.rotation && a.rotation) ||
                      p.rotation === a.rotation)) ||
                  ((r = !0),
                  (g.dataLabel = p = g.dataLabel && g.dataLabel.destroy()),
                  g.dataLabels &&
                    (1 === g.dataLabels.length
                      ? delete g.dataLabels
                      : delete g.dataLabels[h]),
                  h || delete g.dataLabel,
                  l &&
                    ((g.connector = g.connector.destroy()),
                    g.connectors &&
                      (1 === g.connectors.length
                        ? delete g.connectors
                        : delete g.connectors[h])));
                m &&
                  A(x) &&
                  (p
                    ? (D.text = x)
                    : ((g.dataLabels = g.dataLabels || []),
                      (p = g.dataLabels[h] =
                        q
                          ? k
                              .text(x, 0, -9999, a.useHTML)
                              .addClass('highcharts-data-label')
                          : k.label(
                              x,
                              0,
                              -9999,
                              a.shape,
                              null,
                              null,
                              a.useHTML,
                              null,
                              'data-label'
                            )),
                      h || (g.dataLabel = p),
                      p.addClass(
                        ' highcharts-data-label-color-' +
                          g.colorIndex +
                          ' ' +
                          (a.className || '') +
                          (a.useHTML ? ' highcharts-tracker' : '')
                      )),
                  (p.options = a),
                  p.attr(D),
                  c.styledMode || p.css(w).shadow(a.shadow),
                  p.added || p.add(y),
                  a.textPath &&
                    !a.useHTML &&
                    (p.setTextPath(
                      (g.getDataLabelPath && g.getDataLabelPath(p)) ||
                        g.graphic,
                      a.textPath
                    ),
                    g.dataLabelPath &&
                      !a.textPath.enabled &&
                      (g.dataLabelPath = g.dataLabelPath.destroy())),
                  b.alignDataLabel(g, p, a, null, r));
              });
            });
          }
          z(this, 'afterDrawDataLabels');
        }
        function x(a, c, b, d, f, h) {
          var g = this.chart,
            e = c.align,
            k = c.verticalAlign,
            m = a.box ? 0 : a.padding || 0,
            l = c.x;
          l = void 0 === l ? 0 : l;
          var p = c.y;
          p = void 0 === p ? 0 : p;
          var r = (b.x || 0) + m;
          if (0 > r) {
            'right' === e && 0 <= l
              ? ((c.align = 'left'), (c.inside = !0))
              : (l -= r);
            var u = !0;
          }
          r = (b.x || 0) + d.width - m;
          r > g.plotWidth &&
            ('left' === e && 0 >= l
              ? ((c.align = 'right'), (c.inside = !0))
              : (l += g.plotWidth - r),
            (u = !0));
          r = b.y + m;
          0 > r &&
            ('bottom' === k && 0 <= p
              ? ((c.verticalAlign = 'top'), (c.inside = !0))
              : (p -= r),
            (u = !0));
          r = (b.y || 0) + d.height - m;
          r > g.plotHeight &&
            ('top' === k && 0 >= p
              ? ((c.verticalAlign = 'bottom'), (c.inside = !0))
              : (p += g.plotHeight - r),
            (u = !0));
          u && ((c.x = l), (c.y = p), (a.placed = !h), a.align(c, void 0, f));
          return u;
        }
        function r(a, c) {
          var b = [],
            d;
          if (q(a) && !q(c))
            b = a.map(function (a) {
              return l(a, c);
            });
          else if (q(c) && !q(a))
            b = c.map(function (c) {
              return l(a, c);
            });
          else if (q(a) || q(c))
            for (d = Math.max(a.length, c.length); d--; ) b[d] = l(a[d], c[d]);
          else b = l(a, c);
          return b;
        }
        function m(a, c, b, d, f) {
          var g = this.chart,
            h = g.inverted,
            e = this.xAxis,
            k = e.reversed,
            m = h ? c.height / 2 : c.width / 2;
          a = (a = a.pointWidth) ? a / 2 : 0;
          c.startXPos = h ? f.x : k ? -m - a : e.width - m + a;
          c.startYPos = h ? (k ? this.yAxis.height - m + a : -m - a) : f.y;
          d
            ? 'hidden' === c.visibility &&
              (c.show(), c.attr({ opacity: 0 }).animate({ opacity: 1 }))
            : c.attr({ opacity: 1 }).animate({ opacity: 0 }, void 0, c.hide);
          g.hasRendered &&
            (b && c.attr({ x: c.startXPos, y: c.startYPos }), (c.placed = !0));
        }
        var h = [];
        b.compose = function (a) {
          if (-1 === h.indexOf(a)) {
            var c = a.prototype;
            h.push(a);
            c.alignDataLabel = f;
            c.drawDataLabels = k;
            c.justifyDataLabel = x;
            c.setDataLabelStartPos = m;
          }
        };
      })(f || (f = {}));
      ('');
      return f;
    }
  );
  J(
    e,
    'Series/Column/ColumnDataLabel.js',
    [
      e['Core/Series/DataLabel.js'],
      e['Core/Series/SeriesRegistry.js'],
      e['Core/Utilities.js'],
    ],
    function (b, e, v) {
      var I = e.series,
        t = v.merge,
        A = v.pick,
        C;
      (function (e) {
        function q(b, d, a, f, e) {
          var k = this.chart.inverted,
            l = b.series,
            n = (l.xAxis ? l.xAxis.len : this.chart.plotSizeX) || 0;
          l = (l.yAxis ? l.yAxis.len : this.chart.plotSizeY) || 0;
          var x = b.dlBox || b.shapeArgs,
            r = A(b.below, b.plotY > A(this.translatedThreshold, l)),
            m = A(a.inside, !!this.options.stacking);
          x &&
            ((f = t(x)),
            0 > f.y && ((f.height += f.y), (f.y = 0)),
            (x = f.y + f.height - l),
            0 < x && x < f.height && (f.height -= x),
            k &&
              (f = {
                x: l - f.y - f.height,
                y: n - f.x - f.width,
                width: f.height,
                height: f.width,
              }),
            m ||
              (k
                ? ((f.x += r ? 0 : f.width), (f.width = 0))
                : ((f.y += r ? f.height : 0), (f.height = 0))));
          a.align = A(a.align, !k || m ? 'center' : r ? 'right' : 'left');
          a.verticalAlign = A(
            a.verticalAlign,
            k || m ? 'middle' : r ? 'top' : 'bottom'
          );
          I.prototype.alignDataLabel.call(this, b, d, a, f, e);
          a.inside && b.contrastColor && d.css({ color: b.contrastColor });
        }
        var l = [];
        e.compose = function (e) {
          b.compose(I);
          -1 === l.indexOf(e) && (l.push(e), (e.prototype.alignDataLabel = q));
        };
      })(C || (C = {}));
      return C;
    }
  );
  J(
    e,
    'Series/Bar/BarSeries.js',
    [
      e['Series/Column/ColumnSeries.js'],
      e['Core/Series/SeriesRegistry.js'],
      e['Core/Utilities.js'],
    ],
    function (b, e, v) {
      var I =
          (this && this.__extends) ||
          (function () {
            var b = function (e, q) {
              b =
                Object.setPrototypeOf ||
                ({ __proto__: [] } instanceof Array &&
                  function (b, e) {
                    b.__proto__ = e;
                  }) ||
                function (b, e) {
                  for (var d in e) e.hasOwnProperty(d) && (b[d] = e[d]);
                };
              return b(e, q);
            };
            return function (e, q) {
              function l() {
                this.constructor = e;
              }
              b(e, q);
              e.prototype =
                null === q
                  ? Object.create(q)
                  : ((l.prototype = q.prototype), new l());
            };
          })(),
        t = v.extend,
        A = v.merge;
      v = (function (e) {
        function t() {
          var b = (null !== e && e.apply(this, arguments)) || this;
          b.data = void 0;
          b.options = void 0;
          b.points = void 0;
          return b;
        }
        I(t, e);
        t.defaultOptions = A(b.defaultOptions, {});
        return t;
      })(b);
      t(v.prototype, { inverted: !0 });
      e.registerSeriesType('bar', v);
      ('');
      return v;
    }
  );
  J(
    e,
    'Series/Scatter/ScatterSeries.js',
    [
      e['Series/Column/ColumnSeries.js'],
      e['Series/Line/LineSeries.js'],
      e['Core/Series/SeriesRegistry.js'],
      e['Core/Utilities.js'],
    ],
    function (b, e, v, E) {
      var t =
          (this && this.__extends) ||
          (function () {
            var b = function (e, n) {
              b =
                Object.setPrototypeOf ||
                ({ __proto__: [] } instanceof Array &&
                  function (b, a) {
                    b.__proto__ = a;
                  }) ||
                function (b, a) {
                  for (var d in a) a.hasOwnProperty(d) && (b[d] = a[d]);
                };
              return b(e, n);
            };
            return function (e, n) {
              function d() {
                this.constructor = e;
              }
              b(e, n);
              e.prototype =
                null === n
                  ? Object.create(n)
                  : ((d.prototype = n.prototype), new d());
            };
          })(),
        A = E.addEvent,
        I = E.extend,
        z = E.merge;
      E = (function (b) {
        function l() {
          var e = (null !== b && b.apply(this, arguments)) || this;
          e.data = void 0;
          e.options = void 0;
          e.points = void 0;
          return e;
        }
        t(l, b);
        l.prototype.applyJitter = function () {
          var b = this,
            d = this.options.jitter,
            a = this.points.length;
          d &&
            this.points.forEach(function (f, e) {
              ['x', 'y'].forEach(function (k, l) {
                var n = 'plot' + k.toUpperCase();
                if (d[k] && !f.isNull) {
                  var x = b[k + 'Axis'];
                  var r = d[k] * x.transA;
                  if (x && !x.isLog) {
                    var m = Math.max(0, f[n] - r);
                    x = Math.min(x.len, f[n] + r);
                    l = 1e4 * Math.sin(e + l * a);
                    f[n] = m + (x - m) * (l - Math.floor(l));
                    'x' === k && (f.clientX = f.plotX);
                  }
                }
              });
            });
        };
        l.prototype.drawGraph = function () {
          this.options.lineWidth
            ? b.prototype.drawGraph.call(this)
            : this.graph && (this.graph = this.graph.destroy());
        };
        l.defaultOptions = z(e.defaultOptions, {
          lineWidth: 0,
          findNearestPointBy: 'xy',
          jitter: { x: 0, y: 0 },
          marker: { enabled: !0 },
          tooltip: {
            headerFormat:
              '<span style="color:{point.color}">\u25cf</span> <span style="font-size: 10px"> {series.name}</span><br/>',
            pointFormat: 'x: <b>{point.x}</b><br/>y: <b>{point.y}</b><br/>',
          },
        });
        return l;
      })(e);
      I(E.prototype, {
        drawTracker: b.prototype.drawTracker,
        sorted: !1,
        requireSorting: !1,
        noSharedTooltip: !0,
        trackerGroups: ['group', 'markerGroup', 'dataLabelsGroup'],
        takeOrdinalPosition: !1,
      });
      A(E, 'afterTranslate', function () {
        this.applyJitter();
      });
      v.registerSeriesType('scatter', E);
      ('');
      return E;
    }
  );
  J(
    e,
    'Series/CenteredUtilities.js',
    [e['Core/Globals.js'], e['Core/Series/Series.js'], e['Core/Utilities.js']],
    function (b, e, v) {
      var I = b.deg2rad,
        t = v.isNumber,
        A = v.pick,
        C = v.relativeLength,
        z;
      (function (b) {
        b.getCenter = function () {
          var b = this.options,
            n = this.chart,
            d = 2 * (b.slicedOffset || 0),
            a = n.plotWidth - 2 * d,
            f = n.plotHeight - 2 * d,
            k = b.center,
            q = Math.min(a, f),
            y = b.size,
            B = b.innerSize || 0;
          'string' === typeof y && (y = parseFloat(y));
          'string' === typeof B && (B = parseFloat(B));
          b = [
            A(k[0], '50%'),
            A(k[1], '50%'),
            A(y && 0 > y ? void 0 : b.size, '100%'),
            A(B && 0 > B ? void 0 : b.innerSize || 0, '0%'),
          ];
          !n.angular || this instanceof e || (b[3] = 0);
          for (k = 0; 4 > k; ++k)
            (y = b[k]),
              (n = 2 > k || (2 === k && /%$/.test(y))),
              (b[k] = C(y, [a, f, q, b[2]][k]) + (n ? d : 0));
          b[3] > b[2] && (b[3] = b[2]);
          return b;
        };
        b.getStartAndEndRadians = function (b, e) {
          b = t(b) ? b : 0;
          e = t(e) && e > b && 360 > e - b ? e : b + 360;
          return { start: I * (b + -90), end: I * (e + -90) };
        };
      })(z || (z = {}));
      ('');
      return z;
    }
  );
  J(
    e,
    'Series/Pie/PiePoint.js',
    [
      e['Core/Animation/AnimationUtilities.js'],
      e['Core/Series/Point.js'],
      e['Core/Utilities.js'],
    ],
    function (b, e, v) {
      var I =
          (this && this.__extends) ||
          (function () {
            var b = function (d, a) {
              b =
                Object.setPrototypeOf ||
                ({ __proto__: [] } instanceof Array &&
                  function (a, b) {
                    a.__proto__ = b;
                  }) ||
                function (a, b) {
                  for (var d in b) b.hasOwnProperty(d) && (a[d] = b[d]);
                };
              return b(d, a);
            };
            return function (d, a) {
              function f() {
                this.constructor = d;
              }
              b(d, a);
              d.prototype =
                null === a
                  ? Object.create(a)
                  : ((f.prototype = a.prototype), new f());
            };
          })(),
        t = b.setAnimation,
        A = v.addEvent,
        C = v.defined;
      b = v.extend;
      var z = v.isNumber,
        q = v.pick,
        l = v.relativeLength;
      e = (function (b) {
        function d() {
          var a = (null !== b && b.apply(this, arguments)) || this;
          a.labelDistance = void 0;
          a.options = void 0;
          a.series = void 0;
          return a;
        }
        I(d, b);
        d.prototype.getConnectorPath = function () {
          var a = this.labelPosition,
            b = this.series.options.dataLabels,
            d = this.connectorShapes,
            e = b.connectorShape;
          d[e] && (e = d[e]);
          return e.call(
            this,
            { x: a.final.x, y: a.final.y, alignment: a.alignment },
            a.connectorPosition,
            b
          );
        };
        d.prototype.getTranslate = function () {
          return this.sliced
            ? this.slicedTranslation
            : { translateX: 0, translateY: 0 };
        };
        d.prototype.haloPath = function (a) {
          var b = this.shapeArgs;
          return this.sliced || !this.visible
            ? []
            : this.series.chart.renderer.symbols.arc(
                b.x,
                b.y,
                b.r + a,
                b.r + a,
                { innerR: b.r - 1, start: b.start, end: b.end }
              );
        };
        d.prototype.init = function () {
          var a = this;
          b.prototype.init.apply(this, arguments);
          this.name = q(this.name, 'Slice');
          var d = function (b) {
            a.slice('select' === b.type);
          };
          A(this, 'select', d);
          A(this, 'unselect', d);
          return this;
        };
        d.prototype.isValid = function () {
          return z(this.y) && 0 <= this.y;
        };
        d.prototype.setVisible = function (a, b) {
          var d = this,
            f = this.series,
            e = f.chart,
            l = f.options.ignoreHiddenPoint;
          b = q(b, l);
          a !== this.visible &&
            ((this.visible =
              this.options.visible =
              a =
                'undefined' === typeof a ? !this.visible : a),
            (f.options.data[f.data.indexOf(this)] = this.options),
            ['graphic', 'dataLabel', 'connector', 'shadowGroup'].forEach(
              function (b) {
                if (d[b]) d[b][a ? 'show' : 'hide'](a);
              }
            ),
            this.legendItem && e.legend.colorizeItem(this, a),
            a || 'hover' !== this.state || this.setState(''),
            l && (f.isDirty = !0),
            b && e.redraw());
        };
        d.prototype.slice = function (a, b, d) {
          var f = this.series;
          t(d, f.chart);
          q(b, !0);
          this.sliced = this.options.sliced = C(a) ? a : !this.sliced;
          f.options.data[f.data.indexOf(this)] = this.options;
          this.graphic && this.graphic.animate(this.getTranslate());
          this.shadowGroup && this.shadowGroup.animate(this.getTranslate());
        };
        return d;
      })(e);
      b(e.prototype, {
        connectorShapes: {
          fixedOffset: function (b, d, a) {
            var f = d.breakAt;
            d = d.touchingSliceAt;
            return [
              ['M', b.x, b.y],
              a.softConnector
                ? [
                    'C',
                    b.x + ('left' === b.alignment ? -5 : 5),
                    b.y,
                    2 * f.x - d.x,
                    2 * f.y - d.y,
                    f.x,
                    f.y,
                  ]
                : ['L', f.x, f.y],
              ['L', d.x, d.y],
            ];
          },
          straight: function (b, d) {
            d = d.touchingSliceAt;
            return [
              ['M', b.x, b.y],
              ['L', d.x, d.y],
            ];
          },
          crookedLine: function (b, d, a) {
            d = d.touchingSliceAt;
            var f = this.series,
              e = f.center[0],
              n = f.chart.plotWidth,
              q = f.chart.plotLeft;
            f = b.alignment;
            var B = this.shapeArgs.r;
            a = l(a.crookDistance, 1);
            n =
              'left' === f
                ? e + B + (n + q - e - B) * (1 - a)
                : q + (e - B) * a;
            a = ['L', n, b.y];
            e = !0;
            if ('left' === f ? n > b.x || n < d.x : n < b.x || n > d.x) e = !1;
            b = [['M', b.x, b.y]];
            e && b.push(a);
            b.push(['L', d.x, d.y]);
            return b;
          },
        },
      });
      return e;
    }
  );
  J(
    e,
    'Series/Pie/PieSeries.js',
    [
      e['Series/CenteredUtilities.js'],
      e['Series/Column/ColumnSeries.js'],
      e['Core/Globals.js'],
      e['Core/Legend/LegendSymbol.js'],
      e['Series/Pie/PiePoint.js'],
      e['Core/Series/Series.js'],
      e['Core/Series/SeriesRegistry.js'],
      e['Core/Renderer/SVG/Symbols.js'],
      e['Core/Utilities.js'],
    ],
    function (b, e, v, E, t, A, C, z, q) {
      var l =
          (this && this.__extends) ||
          (function () {
            var a = function (b, d) {
              a =
                Object.setPrototypeOf ||
                ({ __proto__: [] } instanceof Array &&
                  function (a, b) {
                    a.__proto__ = b;
                  }) ||
                function (a, b) {
                  for (var d in b) b.hasOwnProperty(d) && (a[d] = b[d]);
                };
              return a(b, d);
            };
            return function (b, d) {
              function f() {
                this.constructor = b;
              }
              a(b, d);
              b.prototype =
                null === d
                  ? Object.create(d)
                  : ((f.prototype = d.prototype), new f());
            };
          })(),
        n = b.getStartAndEndRadians;
      v = v.noop;
      var d = q.clamp,
        a = q.extend,
        f = q.fireEvent,
        k = q.merge,
        G = q.pick,
        y = q.relativeLength;
      q = (function (a) {
        function b() {
          var b = (null !== a && a.apply(this, arguments)) || this;
          b.center = void 0;
          b.data = void 0;
          b.maxLabelDistance = void 0;
          b.options = void 0;
          b.points = void 0;
          return b;
        }
        l(b, a);
        b.prototype.animate = function (a) {
          var b = this,
            d = b.points,
            f = b.startAngleRad;
          a ||
            d.forEach(function (c) {
              var a = c.graphic,
                d = c.shapeArgs;
              a &&
                d &&
                (a.attr({
                  r: G(c.startR, b.center && b.center[3] / 2),
                  start: f,
                  end: f,
                }),
                a.animate(
                  { r: d.r, start: d.start, end: d.end },
                  b.options.animation
                ));
            });
        };
        b.prototype.drawEmpty = function () {
          var a = this.startAngleRad,
            b = this.endAngleRad,
            d = this.options;
          if (0 === this.total && this.center) {
            var f = this.center[0];
            var c = this.center[1];
            this.graph ||
              (this.graph = this.chart.renderer
                .arc(f, c, this.center[1] / 2, 0, a, b)
                .addClass('highcharts-empty-series')
                .add(this.group));
            this.graph.attr({
              d: z.arc(f, c, this.center[2] / 2, 0, {
                start: a,
                end: b,
                innerR: this.center[3] / 2,
              }),
            });
            this.chart.styledMode ||
              this.graph.attr({
                'stroke-width': d.borderWidth,
                fill: d.fillColor || 'none',
                stroke: d.color || '#cccccc',
              });
          } else this.graph && (this.graph = this.graph.destroy());
        };
        b.prototype.drawPoints = function () {
          var a = this.chart.renderer;
          this.points.forEach(function (b) {
            b.graphic &&
              b.hasNewShapeType() &&
              (b.graphic = b.graphic.destroy());
            b.graphic ||
              ((b.graphic = a[b.shapeType](b.shapeArgs).add(b.series.group)),
              (b.delayedRendering = !0));
          });
        };
        b.prototype.generatePoints = function () {
          a.prototype.generatePoints.call(this);
          this.updateTotals();
        };
        b.prototype.getX = function (a, b, f) {
          var h = this.center,
            c = this.radii ? this.radii[f.index] || 0 : h[2] / 2;
          a = Math.asin(d((a - h[1]) / (c + f.labelDistance), -1, 1));
          return (
            h[0] +
            (b ? -1 : 1) * Math.cos(a) * (c + f.labelDistance) +
            (0 < f.labelDistance
              ? (b ? -1 : 1) * this.options.dataLabels.padding
              : 0)
          );
        };
        b.prototype.hasData = function () {
          return !!this.processedXData.length;
        };
        b.prototype.redrawPoints = function () {
          var a = this,
            b = a.chart,
            d = b.renderer,
            f = a.options.shadow,
            c,
            e,
            g,
            l;
          this.drawEmpty();
          !f ||
            a.shadowGroup ||
            b.styledMode ||
            (a.shadowGroup = d.g('shadow').attr({ zIndex: -1 }).add(a.group));
          a.points.forEach(function (h) {
            var m = {};
            e = h.graphic;
            if (!h.isNull && e) {
              var p = void 0;
              l = h.shapeArgs;
              c = h.getTranslate();
              b.styledMode ||
                ((p = h.shadowGroup),
                f &&
                  !p &&
                  (p = h.shadowGroup = d.g('shadow').add(a.shadowGroup)),
                p && p.attr(c),
                (g = a.pointAttribs(h, h.selected && 'select')));
              h.delayedRendering
                ? (e.setRadialReference(a.center).attr(l).attr(c),
                  b.styledMode ||
                    e.attr(g).attr({ 'stroke-linejoin': 'round' }).shadow(f, p),
                  (h.delayedRendering = !1))
                : (e.setRadialReference(a.center),
                  b.styledMode || k(!0, m, g),
                  k(!0, m, l, c),
                  e.animate(m));
              e.attr({ visibility: h.visible ? 'inherit' : 'hidden' });
              e.addClass(h.getClassName(), !0);
            } else e && (h.graphic = e.destroy());
          });
        };
        b.prototype.sortByAngle = function (a, b) {
          a.sort(function (a, d) {
            return 'undefined' !== typeof a.angle && (d.angle - a.angle) * b;
          });
        };
        b.prototype.translate = function (a) {
          this.generatePoints();
          var b = this.options,
            d = b.slicedOffset,
            e = d + (b.borderWidth || 0),
            c = n(b.startAngle, b.endAngle),
            k = (this.startAngleRad = c.start);
          c = (this.endAngleRad = c.end) - k;
          var g = this.points,
            l = b.dataLabels.distance;
          b = b.ignoreHiddenPoint;
          var u = g.length,
            r,
            x = 0;
          a || (this.center = a = this.getCenter());
          for (r = 0; r < u; r++) {
            var q = g[r];
            var t = k + x * c;
            !q.isValid() || (b && !q.visible) || (x += q.percentage / 100);
            var B = k + x * c;
            var v = {
              x: a[0],
              y: a[1],
              r: a[2] / 2,
              innerR: a[3] / 2,
              start: Math.round(1e3 * t) / 1e3,
              end: Math.round(1e3 * B) / 1e3,
            };
            q.shapeType = 'arc';
            q.shapeArgs = v;
            q.labelDistance = G(
              q.options.dataLabels && q.options.dataLabels.distance,
              l
            );
            q.labelDistance = y(q.labelDistance, v.r);
            this.maxLabelDistance = Math.max(
              this.maxLabelDistance || 0,
              q.labelDistance
            );
            B = (B + t) / 2;
            B > 1.5 * Math.PI
              ? (B -= 2 * Math.PI)
              : B < -Math.PI / 2 && (B += 2 * Math.PI);
            q.slicedTranslation = {
              translateX: Math.round(Math.cos(B) * d),
              translateY: Math.round(Math.sin(B) * d),
            };
            v = (Math.cos(B) * a[2]) / 2;
            var z = (Math.sin(B) * a[2]) / 2;
            q.tooltipPos = [a[0] + 0.7 * v, a[1] + 0.7 * z];
            q.half = B < -Math.PI / 2 || B > Math.PI / 2 ? 1 : 0;
            q.angle = B;
            t = Math.min(e, q.labelDistance / 5);
            q.labelPosition = {
              natural: {
                x: a[0] + v + Math.cos(B) * q.labelDistance,
                y: a[1] + z + Math.sin(B) * q.labelDistance,
              },
              final: {},
              alignment:
                0 > q.labelDistance ? 'center' : q.half ? 'right' : 'left',
              connectorPosition: {
                breakAt: {
                  x: a[0] + v + Math.cos(B) * t,
                  y: a[1] + z + Math.sin(B) * t,
                },
                touchingSliceAt: { x: a[0] + v, y: a[1] + z },
              },
            };
          }
          f(this, 'afterTranslate');
        };
        b.prototype.updateTotals = function () {
          var a = this.points,
            b = a.length,
            d = this.options.ignoreHiddenPoint,
            f,
            c = 0;
          for (f = 0; f < b; f++) {
            var e = a[f];
            !e.isValid() || (d && !e.visible) || (c += e.y);
          }
          this.total = c;
          for (f = 0; f < b; f++)
            (e = a[f]),
              (e.percentage = 0 < c && (e.visible || !d) ? (e.y / c) * 100 : 0),
              (e.total = c);
        };
        b.defaultOptions = k(A.defaultOptions, {
          center: [null, null],
          clip: !1,
          colorByPoint: !0,
          dataLabels: {
            allowOverlap: !0,
            connectorPadding: 5,
            connectorShape: 'fixedOffset',
            crookDistance: '70%',
            distance: 30,
            enabled: !0,
            formatter: function () {
              return this.point.isNull ? void 0 : this.point.name;
            },
            softConnector: !0,
            x: 0,
          },
          fillColor: void 0,
          ignoreHiddenPoint: !0,
          inactiveOtherPoints: !0,
          legendType: 'point',
          marker: null,
          size: null,
          showInLegend: !1,
          slicedOffset: 10,
          stickyTracking: !1,
          tooltip: { followPointer: !0 },
          borderColor: '#ffffff',
          borderWidth: 1,
          lineWidth: void 0,
          states: { hover: { brightness: 0.1 } },
        });
        return b;
      })(A);
      a(q.prototype, {
        axisTypes: [],
        directTouch: !0,
        drawGraph: void 0,
        drawLegendSymbol: E.drawRectangle,
        drawTracker: e.prototype.drawTracker,
        getCenter: b.getCenter,
        getSymbol: v,
        isCartesian: !1,
        noSharedTooltip: !0,
        pointAttribs: e.prototype.pointAttribs,
        pointClass: t,
        requireSorting: !1,
        searchPoint: v,
        trackerGroups: ['group', 'dataLabelsGroup'],
      });
      C.registerSeriesType('pie', q);
      ('');
      return q;
    }
  );
  J(
    e,
    'Series/Pie/PieDataLabel.js',
    [
      e['Core/Series/DataLabel.js'],
      e['Core/Globals.js'],
      e['Core/Renderer/RendererUtilities.js'],
      e['Core/Series/SeriesRegistry.js'],
      e['Core/Utilities.js'],
    ],
    function (b, e, v, E, t) {
      var A = e.noop,
        I = v.distribute,
        z = E.series,
        q = t.arrayMax,
        l = t.clamp,
        n = t.defined,
        d = t.merge,
        a = t.pick,
        f = t.relativeLength,
        k;
      (function (e) {
        function k() {
          var b = this,
            f = b.data,
            c = b.chart,
            e = b.options.dataLabels || {},
            g = e.connectorPadding,
            k = c.plotWidth,
            m = c.plotHeight,
            l = c.plotLeft,
            r = Math.round(c.chartWidth / 3),
            x = b.center,
            y = x[2] / 2,
            B = x[1],
            t = [[], []],
            v = [0, 0, 0, 0],
            G = b.dataLabelPositioners,
            A,
            E,
            C,
            J,
            Z,
            R,
            aa,
            Q,
            U,
            T,
            V,
            O;
          b.visible &&
            (e.enabled || b._hasPointLabels) &&
            (f.forEach(function (c) {
              c.dataLabel &&
                c.visible &&
                c.dataLabel.shortened &&
                (c.dataLabel
                  .attr({ width: 'auto' })
                  .css({ width: 'auto', textOverflow: 'clip' }),
                (c.dataLabel.shortened = !1));
            }),
            z.prototype.drawDataLabels.apply(b),
            f.forEach(function (c) {
              c.dataLabel &&
                (c.visible
                  ? (t[c.half].push(c),
                    (c.dataLabel._pos = null),
                    !n(e.style.width) &&
                      !n(
                        c.options.dataLabels &&
                          c.options.dataLabels.style &&
                          c.options.dataLabels.style.width
                      ) &&
                      c.dataLabel.getBBox().width > r &&
                      (c.dataLabel.css({ width: Math.round(0.7 * r) + 'px' }),
                      (c.dataLabel.shortened = !0)))
                  : ((c.dataLabel = c.dataLabel.destroy()),
                    c.dataLabels &&
                      1 === c.dataLabels.length &&
                      delete c.dataLabels));
            }),
            t.forEach(function (d, f) {
              var h = d.length,
                p = [],
                u;
              if (h) {
                b.sortByAngle(d, f - 0.5);
                if (0 < b.maxLabelDistance) {
                  var r = Math.max(0, B - y - b.maxLabelDistance);
                  var q = Math.min(B + y + b.maxLabelDistance, c.plotHeight);
                  d.forEach(function (a) {
                    0 < a.labelDistance &&
                      a.dataLabel &&
                      ((a.top = Math.max(0, B - y - a.labelDistance)),
                      (a.bottom = Math.min(
                        B + y + a.labelDistance,
                        c.plotHeight
                      )),
                      (u = a.dataLabel.getBBox().height || 21),
                      (a.distributeBox = {
                        target: a.labelPosition.natural.y - a.top + u / 2,
                        size: u,
                        rank: a.y,
                      }),
                      p.push(a.distributeBox));
                  });
                  r = q + u - r;
                  I(p, r, r / 5);
                }
                for (V = 0; V < h; V++) {
                  A = d[V];
                  R = A.labelPosition;
                  J = A.dataLabel;
                  T = !1 === A.visible ? 'hidden' : 'inherit';
                  U = r = R.natural.y;
                  p &&
                    n(A.distributeBox) &&
                    ('undefined' === typeof A.distributeBox.pos
                      ? (T = 'hidden')
                      : ((aa = A.distributeBox.size),
                        (U = G.radialDistributionY(A))));
                  delete A.positionIndex;
                  if (e.justify) Q = G.justify(A, y, x);
                  else
                    switch (e.alignTo) {
                      case 'connectors':
                        Q = G.alignToConnectors(d, f, k, l);
                        break;
                      case 'plotEdges':
                        Q = G.alignToPlotEdges(J, f, k, l);
                        break;
                      default:
                        Q = G.radialDistributionX(b, A, U, r);
                    }
                  J._attr = { visibility: T, align: R.alignment };
                  O = A.options.dataLabels || {};
                  J._pos = {
                    x:
                      Q +
                      a(O.x, e.x) +
                      ({ left: g, right: -g }[R.alignment] || 0),
                    y: U + a(O.y, e.y) - 10,
                  };
                  R.final.x = Q;
                  R.final.y = U;
                  a(e.crop, !0) &&
                    ((Z = J.getBBox().width),
                    (r = null),
                    Q - Z < g && 1 === f
                      ? ((r = Math.round(Z - Q + g)),
                        (v[3] = Math.max(r, v[3])))
                      : Q + Z > k - g &&
                        0 === f &&
                        ((r = Math.round(Q + Z - k + g)),
                        (v[1] = Math.max(r, v[1]))),
                    0 > U - aa / 2
                      ? (v[0] = Math.max(Math.round(-U + aa / 2), v[0]))
                      : U + aa / 2 > m &&
                        (v[2] = Math.max(Math.round(U + aa / 2 - m), v[2])),
                    (J.sideOverflow = r));
                }
              }
            }),
            0 === q(v) || this.verifyDataLabelOverflow(v)) &&
            (this.placeDataLabels(),
            this.points.forEach(function (f) {
              O = d(e, f.options.dataLabels);
              if ((E = a(O.connectorWidth, 1))) {
                var g;
                C = f.connector;
                if (
                  (J = f.dataLabel) &&
                  J._pos &&
                  f.visible &&
                  0 < f.labelDistance
                ) {
                  T = J._attr.visibility;
                  if ((g = !C))
                    (f.connector = C =
                      c.renderer
                        .path()
                        .addClass(
                          'highcharts-data-label-connector  highcharts-color-' +
                            f.colorIndex +
                            (f.className ? ' ' + f.className : '')
                        )
                        .add(b.dataLabelsGroup)),
                      c.styledMode ||
                        C.attr({
                          'stroke-width': E,
                          stroke: O.connectorColor || f.color || '#666666',
                        });
                  C[g ? 'attr' : 'animate']({ d: f.getConnectorPath() });
                  C.attr('visibility', T);
                } else C && (f.connector = C.destroy());
              }
            }));
        }
        function B() {
          this.points.forEach(function (a) {
            var b = a.dataLabel,
              c;
            b &&
              a.visible &&
              ((c = b._pos)
                ? (b.sideOverflow &&
                    ((b._attr.width = Math.max(
                      b.getBBox().width - b.sideOverflow,
                      0
                    )),
                    b.css({
                      width: b._attr.width + 'px',
                      textOverflow:
                        (this.options.dataLabels.style || {}).textOverflow ||
                        'ellipsis',
                    }),
                    (b.shortened = !0)),
                  b.attr(b._attr),
                  b[b.moved ? 'animate' : 'attr'](c),
                  (b.moved = !0))
                : b && b.attr({ y: -9999 }));
            delete a.distributeBox;
          }, this);
        }
        function x(a) {
          var b = this.center,
            c = this.options,
            d = c.center,
            g = c.minSize || 80,
            h = null !== c.size;
          if (!h) {
            if (null !== d[0]) var e = Math.max(b[2] - Math.max(a[1], a[3]), g);
            else
              (e = Math.max(b[2] - a[1] - a[3], g)),
                (b[0] += (a[3] - a[1]) / 2);
            null !== d[1]
              ? (e = l(e, g, b[2] - Math.max(a[0], a[2])))
              : ((e = l(e, g, b[2] - a[0] - a[2])),
                (b[1] += (a[0] - a[2]) / 2));
            e < b[2]
              ? ((b[2] = e),
                (b[3] = Math.min(f(c.innerSize || 0, e), e)),
                this.translate(b),
                this.drawDataLabels && this.drawDataLabels())
              : (h = !0);
          }
          return h;
        }
        var r = [],
          m = {
            radialDistributionY: function (a) {
              return a.top + a.distributeBox.pos;
            },
            radialDistributionX: function (a, b, c, d) {
              return a.getX(
                c < b.top + 2 || c > b.bottom - 2 ? d : c,
                b.half,
                b
              );
            },
            justify: function (a, b, c) {
              return c[0] + (a.half ? -1 : 1) * (b + a.labelDistance);
            },
            alignToPlotEdges: function (a, b, c, d) {
              a = a.getBBox().width;
              return b ? a + d : c - a - d;
            },
            alignToConnectors: function (a, b, c, d) {
              var f = 0,
                h;
              a.forEach(function (c) {
                h = c.dataLabel.getBBox().width;
                h > f && (f = h);
              });
              return b ? f + d : c - f - d;
            },
          };
        e.compose = function (a) {
          b.compose(z);
          -1 === r.indexOf(a) &&
            (r.push(a),
            (a = a.prototype),
            (a.dataLabelPositioners = m),
            (a.alignDataLabel = A),
            (a.drawDataLabels = k),
            (a.placeDataLabels = B),
            (a.verifyDataLabelOverflow = x));
        };
      })(k || (k = {}));
      return k;
    }
  );
  J(
    e,
    'Extensions/OverlappingDataLabels.js',
    [e['Core/Chart/Chart.js'], e['Core/Utilities.js']],
    function (b, e) {
      function v(b, e) {
        var d = !1;
        if (b) {
          var a = b.newOpacity;
          b.oldOpacity !== a &&
            (b.alignAttr && b.placed
              ? (b[a ? 'removeClass' : 'addClass'](
                  'highcharts-data-label-hidden'
                ),
                (d = !0),
                (b.alignAttr.opacity = a),
                b[b.isOld ? 'animate' : 'attr'](b.alignAttr, null, function () {
                  e.styledMode || b.css({ pointerEvents: a ? 'auto' : 'none' });
                }),
                t(e, 'afterHideOverlappingLabel'))
              : b.attr({ opacity: a }));
          b.isOld = !0;
        }
        return d;
      }
      var I = e.addEvent,
        t = e.fireEvent,
        A = e.isArray,
        C = e.isNumber,
        z = e.objectEach,
        q = e.pick;
      I(b, 'render', function () {
        var b = this,
          e = [];
        (this.labelCollectors || []).forEach(function (b) {
          e = e.concat(b());
        });
        (this.yAxis || []).forEach(function (b) {
          b.stacking &&
            b.options.stackLabels &&
            !b.options.stackLabels.allowOverlap &&
            z(b.stacking.stacks, function (a) {
              z(a, function (a) {
                a.label && 'hidden' !== a.label.visibility && e.push(a.label);
              });
            });
        });
        (this.series || []).forEach(function (d) {
          var a = d.options.dataLabels;
          d.visible &&
            (!1 !== a.enabled || d._hasPointLabels) &&
            ((a = function (a) {
              return a.forEach(function (a) {
                a.visible &&
                  (A(a.dataLabels)
                    ? a.dataLabels
                    : a.dataLabel
                      ? [a.dataLabel]
                      : []
                  ).forEach(function (d) {
                    var f = d.options;
                    d.labelrank = q(
                      f.labelrank,
                      a.labelrank,
                      a.shapeArgs && a.shapeArgs.height
                    );
                    f.allowOverlap
                      ? ((d.oldOpacity = d.opacity),
                        (d.newOpacity = 1),
                        v(d, b))
                      : e.push(d);
                  });
              });
            }),
            a(d.nodes || []),
            a(d.points));
        });
        this.hideOverlappingLabels(e);
      });
      b.prototype.hideOverlappingLabels = function (b) {
        var e = this,
          d = b.length,
          a = e.renderer,
          f,
          k,
          l,
          q = !1;
        var B = function (b) {
          var d,
            f = b.box ? 0 : b.padding || 0,
            c = (d = 0),
            e;
          if (b && (!b.alignAttr || b.placed)) {
            var g = b.alignAttr || { x: b.attr('x'), y: b.attr('y') };
            var k = b.parentGroup;
            b.width ||
              ((d = b.getBBox()),
              (b.width = d.width),
              (b.height = d.height),
              (d = a.fontMetrics(null, b.element).h));
            var m = b.width - 2 * f;
            (e = { left: '0', center: '0.5', right: '1' }[b.alignValue])
              ? (c = +e * m)
              : C(b.x) &&
                Math.round(b.x) !== b.translateX &&
                (c = b.x - b.translateX);
            return {
              x: g.x + (k.translateX || 0) + f - (c || 0),
              y: g.y + (k.translateY || 0) + f - d,
              width: b.width - 2 * f,
              height: b.height - 2 * f,
            };
          }
        };
        for (k = 0; k < d; k++)
          if ((f = b[k]))
            (f.oldOpacity = f.opacity),
              (f.newOpacity = 1),
              (f.absoluteBox = B(f));
        b.sort(function (a, b) {
          return (b.labelrank || 0) - (a.labelrank || 0);
        });
        for (k = 0; k < d; k++) {
          var x = (B = b[k]) && B.absoluteBox;
          for (f = k + 1; f < d; ++f) {
            var r = (l = b[f]) && l.absoluteBox;
            !x ||
              !r ||
              B === l ||
              0 === B.newOpacity ||
              0 === l.newOpacity ||
              r.x >= x.x + x.width ||
              r.x + r.width <= x.x ||
              r.y >= x.y + x.height ||
              r.y + r.height <= x.y ||
              ((B.labelrank < l.labelrank ? B : l).newOpacity = 0);
          }
        }
        b.forEach(function (a) {
          v(a, e) && (q = !0);
        });
        q && t(e, 'afterHideAllOverlappingLabels');
      };
    }
  );
  J(e, 'Core/Responsive.js', [e['Core/Utilities.js']], function (b) {
    var e = b.extend,
      v = b.find,
      E = b.isArray,
      t = b.isObject,
      A = b.merge,
      C = b.objectEach,
      z = b.pick,
      q = b.splat,
      l = b.uniqueKey,
      n;
    (function (b) {
      var a = [];
      b.compose = function (b) {
        -1 === a.indexOf(b) && (a.push(b), e(b.prototype, d.prototype));
        return b;
      };
      var d = (function () {
        function a() {}
        a.prototype.currentOptions = function (a) {
          function b(a, f, h, e) {
            var c;
            C(a, function (a, g) {
              if (!e && -1 < d.collectionsWithUpdate.indexOf(g) && f[g])
                for (
                  a = q(a), h[g] = [], c = 0;
                  c < Math.max(a.length, f[g].length);
                  c++
                )
                  f[g][c] &&
                    (void 0 === a[c]
                      ? (h[g][c] = f[g][c])
                      : ((h[g][c] = {}), b(a[c], f[g][c], h[g][c], e + 1)));
              else
                t(a)
                  ? ((h[g] = E(a) ? [] : {}), b(a, f[g] || {}, h[g], e + 1))
                  : (h[g] = 'undefined' === typeof f[g] ? null : f[g]);
            });
          }
          var d = this,
            f = {};
          b(a, this.options, f, 0);
          return f;
        };
        a.prototype.matchResponsiveRule = function (a, b) {
          var d = a.condition;
          (
            d.callback ||
            function () {
              return (
                this.chartWidth <= z(d.maxWidth, Number.MAX_VALUE) &&
                this.chartHeight <= z(d.maxHeight, Number.MAX_VALUE) &&
                this.chartWidth >= z(d.minWidth, 0) &&
                this.chartHeight >= z(d.minHeight, 0)
              );
            }
          ).call(this) && b.push(a._id);
        };
        a.prototype.setResponsive = function (a, b) {
          var d = this,
            f = this.options.responsive,
            e = this.currentResponsive,
            k = [];
          !b &&
            f &&
            f.rules &&
            f.rules.forEach(function (a) {
              'undefined' === typeof a._id && (a._id = l());
              d.matchResponsiveRule(a, k);
            }, this);
          b = A.apply(
            void 0,
            k
              .map(function (a) {
                return v((f || {}).rules || [], function (b) {
                  return b._id === a;
                });
              })
              .map(function (a) {
                return a && a.chartOptions;
              })
          );
          b.isResponsiveOptions = !0;
          k = k.toString() || void 0;
          k !== (e && e.ruleIds) &&
            (e && this.update(e.undoOptions, a, !0),
            k
              ? ((e = this.currentOptions(b)),
                (e.isResponsiveOptions = !0),
                (this.currentResponsive = {
                  ruleIds: k,
                  mergedOptions: b,
                  undoOptions: e,
                }),
                this.update(b, a, !0))
              : (this.currentResponsive = void 0));
        };
        return a;
      })();
    })(n || (n = {}));
    ('');
    ('');
    return n;
  });
  J(
    e,
    'masters/highcharts.src.js',
    [
      e['Core/Globals.js'],
      e['Core/Utilities.js'],
      e['Core/DefaultOptions.js'],
      e['Core/Animation/Fx.js'],
      e['Core/Animation/AnimationUtilities.js'],
      e['Core/Renderer/HTML/AST.js'],
      e['Core/FormatUtilities.js'],
      e['Core/Renderer/RendererUtilities.js'],
      e['Core/Renderer/SVG/SVGElement.js'],
      e['Core/Renderer/SVG/SVGRenderer.js'],
      e['Core/Renderer/HTML/HTMLElement.js'],
      e['Core/Renderer/HTML/HTMLRenderer.js'],
      e['Core/Axis/Axis.js'],
      e['Core/Axis/DateTimeAxis.js'],
      e['Core/Axis/LogarithmicAxis.js'],
      e['Core/Axis/PlotLineOrBand/PlotLineOrBand.js'],
      e['Core/Axis/Tick.js'],
      e['Core/Tooltip.js'],
      e['Core/Series/Point.js'],
      e['Core/Pointer.js'],
      e['Core/MSPointer.js'],
      e['Core/Legend/Legend.js'],
      e['Core/Chart/Chart.js'],
      e['Core/Series/Series.js'],
      e['Core/Series/SeriesRegistry.js'],
      e['Series/Column/ColumnSeries.js'],
      e['Series/Column/ColumnDataLabel.js'],
      e['Series/Pie/PieSeries.js'],
      e['Series/Pie/PieDataLabel.js'],
      e['Core/Series/DataLabel.js'],
      e['Core/Responsive.js'],
      e['Core/Color/Color.js'],
      e['Core/Time.js'],
    ],
    function (
      b,
      e,
      v,
      E,
      t,
      A,
      C,
      z,
      q,
      l,
      n,
      d,
      a,
      f,
      k,
      G,
      y,
      B,
      x,
      r,
      m,
      h,
      p,
      c,
      w,
      g,
      F,
      u,
      D,
      H,
      L,
      P,
      K
    ) {
      b.animate = t.animate;
      b.animObject = t.animObject;
      b.getDeferredAnimation = t.getDeferredAnimation;
      b.setAnimation = t.setAnimation;
      b.stop = t.stop;
      b.timers = E.timers;
      b.AST = A;
      b.Axis = a;
      b.Chart = p;
      b.chart = p.chart;
      b.Fx = E;
      b.Legend = h;
      b.PlotLineOrBand = G;
      b.Point = x;
      b.Pointer = m.isRequired() ? m : r;
      b.Series = c;
      b.SVGElement = q;
      b.SVGRenderer = l;
      b.Tick = y;
      b.Time = K;
      b.Tooltip = B;
      b.Color = P;
      b.color = P.parse;
      d.compose(l);
      n.compose(q);
      b.defaultOptions = v.defaultOptions;
      b.getOptions = v.getOptions;
      b.time = v.defaultTime;
      b.setOptions = v.setOptions;
      b.dateFormat = C.dateFormat;
      b.format = C.format;
      b.numberFormat = C.numberFormat;
      b.addEvent = e.addEvent;
      b.arrayMax = e.arrayMax;
      b.arrayMin = e.arrayMin;
      b.attr = e.attr;
      b.clearTimeout = e.clearTimeout;
      b.correctFloat = e.correctFloat;
      b.createElement = e.createElement;
      b.css = e.css;
      b.defined = e.defined;
      b.destroyObjectProperties = e.destroyObjectProperties;
      b.discardElement = e.discardElement;
      b.distribute = z.distribute;
      b.erase = e.erase;
      b.error = e.error;
      b.extend = e.extend;
      b.extendClass = e.extendClass;
      b.find = e.find;
      b.fireEvent = e.fireEvent;
      b.getMagnitude = e.getMagnitude;
      b.getStyle = e.getStyle;
      b.inArray = e.inArray;
      b.isArray = e.isArray;
      b.isClass = e.isClass;
      b.isDOMElement = e.isDOMElement;
      b.isFunction = e.isFunction;
      b.isNumber = e.isNumber;
      b.isObject = e.isObject;
      b.isString = e.isString;
      b.keys = e.keys;
      b.merge = e.merge;
      b.normalizeTickInterval = e.normalizeTickInterval;
      b.objectEach = e.objectEach;
      b.offset = e.offset;
      b.pad = e.pad;
      b.pick = e.pick;
      b.pInt = e.pInt;
      b.relativeLength = e.relativeLength;
      b.removeEvent = e.removeEvent;
      b.seriesType = w.seriesType;
      b.splat = e.splat;
      b.stableSort = e.stableSort;
      b.syncTimeout = e.syncTimeout;
      b.timeUnits = e.timeUnits;
      b.uniqueKey = e.uniqueKey;
      b.useSerialIds = e.useSerialIds;
      b.wrap = e.wrap;
      F.compose(g);
      H.compose(c);
      f.compose(a);
      k.compose(a);
      D.compose(u);
      G.compose(a);
      L.compose(p);
      return b;
    }
  );
  J(
    e,
    'Core/Axis/Color/ColorAxisComposition.js',
    [e['Core/Color/Color.js'], e['Core/Utilities.js']],
    function (b, e) {
      var v = b.parse,
        E = e.addEvent,
        t = e.extend,
        A = e.merge,
        C = e.pick,
        z = e.splat,
        q;
      (function (b) {
        function e() {
          var c = this,
            a = this.options;
          this.colorAxis = [];
          a.colorAxis &&
            ((a.colorAxis = z(a.colorAxis)),
            a.colorAxis.forEach(function (a, b) {
              a.index = b;
              new p(c, a);
            }));
        }
        function d(c) {
          var a = this,
            b = function (b) {
              b = c.allItems.indexOf(b);
              -1 !== b &&
                (a.destroyItem(c.allItems[b]), c.allItems.splice(b, 1));
            },
            d = [],
            f,
            e;
          (this.chart.colorAxis || []).forEach(function (c) {
            (f = c.options) &&
              f.showInLegend &&
              (f.dataClasses && f.visible
                ? (d = d.concat(c.getDataClassLegendSymbols()))
                : f.visible && d.push(c),
              c.series.forEach(function (c) {
                if (!c.options.showInLegend || f.dataClasses)
                  'point' === c.options.legendType
                    ? c.points.forEach(function (c) {
                        b(c);
                      })
                    : b(c);
              }));
          });
          for (e = d.length; e--; ) c.allItems.unshift(d[e]);
        }
        function a(c) {
          c.visible &&
            c.item.legendColor &&
            c.item.legendSymbol.attr({ fill: c.item.legendColor });
        }
        function f() {
          var c = this.chart.colorAxis;
          c &&
            c.forEach(function (c, a, b) {
              c.update({}, b);
            });
        }
        function k() {
          ((this.chart.colorAxis && this.chart.colorAxis.length) ||
            this.colorAttribs) &&
            this.translateColors();
        }
        function l() {
          var c = this.axisTypes;
          c
            ? -1 === c.indexOf('colorAxis') && c.push('colorAxis')
            : (this.axisTypes = ['colorAxis']);
        }
        function q(c) {
          var a = this,
            b = c ? 'show' : 'hide';
          a.visible = a.options.visible = !!c;
          ['graphic', 'dataLabel'].forEach(function (c) {
            if (a[c]) a[c][b]();
          });
          this.series.buildKDTree();
        }
        function B() {
          var c = this,
            a = this.options.nullColor,
            b = this.colorAxis,
            d = this.colorKey;
          (this.data.length ? this.data : this.points).forEach(function (f) {
            var g = f.getNestedProperty(d);
            (g =
              f.options.color ||
              (f.isNull || null === f.value
                ? a
                : b && 'undefined' !== typeof g
                  ? b.toColor(g, f)
                  : f.color || c.color)) &&
              f.color !== g &&
              ((f.color = g),
              'point' === c.options.legendType &&
                f.legendItem &&
                c.chart.legend.colorizeItem(f, f.visible));
          });
        }
        function x(c) {
          var a = c.prototype.createAxis;
          c.prototype.createAxis = function (c, b) {
            if ('colorAxis' !== c) return a.apply(this, arguments);
            var d = new p(this, A(b.axis, { index: this[c].length, isX: !1 }));
            this.isDirtyLegend = !0;
            this.axes.forEach(function (c) {
              c.series = [];
            });
            this.series.forEach(function (c) {
              c.bindAxes();
              c.isDirtyData = !0;
            });
            C(b.redraw, !0) && this.redraw(b.animation);
            return d;
          };
        }
        function r() {
          this.elem.attr(
            'fill',
            v(this.start).tweenTo(v(this.end), this.pos),
            void 0,
            !0
          );
        }
        function m() {
          this.elem.attr(
            'stroke',
            v(this.start).tweenTo(v(this.end), this.pos),
            void 0,
            !0
          );
        }
        var h = [],
          p;
        b.compose = function (c, b, g, n, u) {
          p || (p = c);
          -1 === h.indexOf(b) &&
            (h.push(b),
            (c = b.prototype),
            c.collectionsWithUpdate.push('colorAxis'),
            (c.collectionsWithInit.colorAxis = [c.addColorAxis]),
            E(b, 'afterGetAxes', e),
            x(b));
          -1 === h.indexOf(g) &&
            (h.push(g),
            (b = g.prototype),
            (b.fillSetter = r),
            (b.strokeSetter = m));
          -1 === h.indexOf(n) &&
            (h.push(n),
            E(n, 'afterGetAllItems', d),
            E(n, 'afterColorizeItem', a),
            E(n, 'afterUpdate', f));
          -1 === h.indexOf(u) &&
            (h.push(u),
            t(u.prototype, { optionalAxis: 'colorAxis', translateColors: B }),
            t(u.prototype.pointClass.prototype, { setVisible: q }),
            E(u, 'afterTranslate', k),
            E(u, 'bindAxes', l));
        };
        b.pointSetVisible = q;
      })(q || (q = {}));
      return q;
    }
  );
  J(e, 'Core/Axis/Color/ColorAxisDefaults.js', [], function () {
    return {
      lineWidth: 0,
      minPadding: 0,
      maxPadding: 0,
      gridLineWidth: 1,
      tickPixelInterval: 72,
      startOnTick: !0,
      endOnTick: !0,
      offset: 0,
      marker: { animation: { duration: 50 }, width: 0.01, color: '#999999' },
      labels: { overflow: 'justify', rotation: 0 },
      minColor: '#e6ebf5',
      maxColor: '#003399',
      tickLength: 5,
      showInLegend: !0,
    };
  });
  J(
    e,
    'Core/Axis/Color/ColorAxis.js',
    [
      e['Core/Axis/Axis.js'],
      e['Core/Color/Color.js'],
      e['Core/Axis/Color/ColorAxisComposition.js'],
      e['Core/Axis/Color/ColorAxisDefaults.js'],
      e['Core/Globals.js'],
      e['Core/Legend/LegendSymbol.js'],
      e['Core/Series/SeriesRegistry.js'],
      e['Core/Utilities.js'],
    ],
    function (b, e, v, E, t, A, C, z) {
      var q =
          (this && this.__extends) ||
          (function () {
            var a = function (b, d) {
              a =
                Object.setPrototypeOf ||
                ({ __proto__: [] } instanceof Array &&
                  function (a, b) {
                    a.__proto__ = b;
                  }) ||
                function (a, b) {
                  for (var d in b) b.hasOwnProperty(d) && (a[d] = b[d]);
                };
              return a(b, d);
            };
            return function (b, d) {
              function f() {
                this.constructor = b;
              }
              a(b, d);
              b.prototype =
                null === d
                  ? Object.create(d)
                  : ((f.prototype = d.prototype), new f());
            };
          })(),
        l = e.parse,
        n = t.noop,
        d = C.series,
        a = z.extend,
        f = z.isNumber,
        k = z.merge,
        G = z.pick;
      e = (function (b) {
        function e(a, d) {
          var f = b.call(this, a, d) || this;
          f.beforePadding = !1;
          f.chart = void 0;
          f.coll = 'colorAxis';
          f.dataClasses = void 0;
          f.legendItem = void 0;
          f.legendItems = void 0;
          f.name = '';
          f.options = void 0;
          f.stops = void 0;
          f.visible = !0;
          f.init(a, d);
          return f;
        }
        q(e, b);
        e.compose = function (a, b, d, f) {
          v.compose(e, a, b, d, f);
        };
        e.prototype.init = function (a, d) {
          var f = a.options.legend || {},
            h = d.layout ? 'vertical' !== d.layout : 'vertical' !== f.layout,
            l = d.visible;
          f = k(e.defaultColorAxisOptions, d, {
            showEmpty: !1,
            title: null,
            visible: f.enabled && !1 !== l,
          });
          this.coll = 'colorAxis';
          this.side = d.side || h ? 2 : 1;
          this.reversed = d.reversed || !h;
          this.opposite = !h;
          b.prototype.init.call(this, a, f);
          this.userOptions.visible = l;
          d.dataClasses && this.initDataClasses(d);
          this.initStops();
          this.horiz = h;
          this.zoomEnabled = !1;
        };
        e.prototype.initDataClasses = function (a) {
          var b = this.chart,
            d = this.options,
            f = a.dataClasses.length,
            e,
            c = 0,
            n = b.options.chart.colorCount;
          this.dataClasses = e = [];
          this.legendItems = [];
          (a.dataClasses || []).forEach(function (a, h) {
            a = k(a);
            e.push(a);
            if (b.styledMode || !a.color)
              'category' === d.dataClassColor
                ? (b.styledMode ||
                    ((h = b.options.colors), (n = h.length), (a.color = h[c])),
                  (a.colorIndex = c),
                  c++,
                  c === n && (c = 0))
                : (a.color = l(d.minColor).tweenTo(
                    l(d.maxColor),
                    2 > f ? 0.5 : h / (f - 1)
                  ));
          });
        };
        e.prototype.hasData = function () {
          return !!(this.tickPositions || []).length;
        };
        e.prototype.setTickPositions = function () {
          if (!this.dataClasses) return b.prototype.setTickPositions.call(this);
        };
        e.prototype.initStops = function () {
          this.stops = this.options.stops || [
            [0, this.options.minColor],
            [1, this.options.maxColor],
          ];
          this.stops.forEach(function (a) {
            a.color = l(a[1]);
          });
        };
        e.prototype.setOptions = function (a) {
          b.prototype.setOptions.call(this, a);
          this.options.crosshair = this.options.marker;
        };
        e.prototype.setAxisSize = function () {
          var a = this.legendSymbol,
            b = this.chart,
            d = b.options.legend || {},
            f,
            k;
          a
            ? ((this.left = d = a.attr('x')),
              (this.top = f = a.attr('y')),
              (this.width = k = a.attr('width')),
              (this.height = a = a.attr('height')),
              (this.right = b.chartWidth - d - k),
              (this.bottom = b.chartHeight - f - a),
              (this.len = this.horiz ? k : a),
              (this.pos = this.horiz ? d : f))
            : (this.len =
                (this.horiz ? d.symbolWidth : d.symbolHeight) ||
                e.defaultLegendLength);
        };
        e.prototype.normalizedValue = function (a) {
          this.logarithmic && (a = this.logarithmic.log2lin(a));
          return 1 - (this.max - a) / (this.max - this.min || 1);
        };
        e.prototype.toColor = function (a, b) {
          var d = this.dataClasses,
            f = this.stops,
            e;
          if (d)
            for (e = d.length; e--; ) {
              var c = d[e];
              var k = c.from;
              f = c.to;
              if (
                ('undefined' === typeof k || a >= k) &&
                ('undefined' === typeof f || a <= f)
              ) {
                var g = c.color;
                b && ((b.dataClass = e), (b.colorIndex = c.colorIndex));
                break;
              }
            }
          else {
            a = this.normalizedValue(a);
            for (e = f.length; e-- && !(a > f[e][0]); );
            k = f[e] || f[e + 1];
            f = f[e + 1] || k;
            a = 1 - (f[0] - a) / (f[0] - k[0] || 1);
            g = k.color.tweenTo(f.color, a);
          }
          return g;
        };
        e.prototype.getOffset = function () {
          var a = this.legendGroup,
            d = this.chart.axisOffset[this.side];
          if (a) {
            this.axisParent = a;
            b.prototype.getOffset.call(this);
            var f = this.chart.legend;
            f.allItems.forEach(function (a) {
              a instanceof e && a.drawLegendSymbol(f, a);
            });
            f.render();
            this.chart.getMargins(!0);
            this.added ||
              ((this.added = !0),
              (this.labelLeft = 0),
              (this.labelRight = this.width));
            this.chart.axisOffset[this.side] = d;
          }
        };
        e.prototype.setLegendColor = function () {
          var a = this.reversed,
            b = a ? 1 : 0;
          a = a ? 0 : 1;
          b = this.horiz ? [b, 0, a, 0] : [0, a, 0, b];
          this.legendColor = {
            linearGradient: { x1: b[0], y1: b[1], x2: b[2], y2: b[3] },
            stops: this.stops,
          };
        };
        e.prototype.drawLegendSymbol = function (a, b) {
          var d = a.padding,
            f = a.options,
            k = this.horiz,
            c = G(f.symbolWidth, k ? e.defaultLegendLength : 12),
            l = G(f.symbolHeight, k ? 12 : e.defaultLegendLength),
            g = G(f.labelPadding, k ? 16 : 30);
          f = G(f.itemDistance, 10);
          this.setLegendColor();
          b.legendSymbol ||
            (b.legendSymbol = this.chart.renderer
              .rect(0, a.baseline - 11, c, l)
              .attr({ zIndex: 1 })
              .add(b.legendGroup));
          this.legendItemWidth =
            c + d + (k ? f : this.options.labels.x + this.maxLabelLength);
          this.legendItemHeight = l + d + (k ? g : 0);
        };
        e.prototype.setState = function (a) {
          this.series.forEach(function (b) {
            b.setState(a);
          });
        };
        e.prototype.setVisible = function () {};
        e.prototype.getSeriesExtremes = function () {
          var a = this.series,
            b = a.length,
            f;
          this.dataMin = Infinity;
          for (this.dataMax = -Infinity; b--; ) {
            var e = a[b];
            var k = (e.colorKey = G(
              e.options.colorKey,
              e.colorKey,
              e.pointValKey,
              e.zoneAxis,
              'y'
            ));
            var c = e.pointArrayMap;
            var l = e[k + 'Min'] && e[k + 'Max'];
            if (e[k + 'Data']) var g = e[k + 'Data'];
            else if (c) {
              g = [];
              c = c.indexOf(k);
              var n = e.yData;
              if (0 <= c && n)
                for (f = 0; f < n.length; f++) g.push(G(n[f][c], n[f]));
            } else g = e.yData;
            l
              ? ((e.minColorValue = e[k + 'Min']),
                (e.maxColorValue = e[k + 'Max']))
              : ((g = d.prototype.getExtremes.call(e, g)),
                (e.minColorValue = g.dataMin),
                (e.maxColorValue = g.dataMax));
            'undefined' !== typeof e.minColorValue &&
              ((this.dataMin = Math.min(this.dataMin, e.minColorValue)),
              (this.dataMax = Math.max(this.dataMax, e.maxColorValue)));
            l || d.prototype.applyExtremes.call(e);
          }
        };
        e.prototype.drawCrosshair = function (a, d) {
          var f = d && d.plotX,
            e = d && d.plotY,
            k = this.pos,
            c = this.len;
          if (d) {
            var l = this.toPixels(d.getNestedProperty(d.series.colorKey));
            l < k ? (l = k - 2) : l > k + c && (l = k + c + 2);
            d.plotX = l;
            d.plotY = this.len - l;
            b.prototype.drawCrosshair.call(this, a, d);
            d.plotX = f;
            d.plotY = e;
            this.cross &&
              !this.cross.addedToColorAxis &&
              this.legendGroup &&
              (this.cross
                .addClass('highcharts-coloraxis-marker')
                .add(this.legendGroup),
              (this.cross.addedToColorAxis = !0),
              this.chart.styledMode ||
                'object' !== typeof this.crosshair ||
                this.cross.attr({ fill: this.crosshair.color }));
          }
        };
        e.prototype.getPlotLinePath = function (a) {
          var d = this.left,
            e = a.translatedValue,
            h = this.top;
          return f(e)
            ? this.horiz
              ? [['M', e - 4, h - 6], ['L', e + 4, h - 6], ['L', e, h], ['Z']]
              : [['M', d, e], ['L', d - 6, e + 6], ['L', d - 6, e - 6], ['Z']]
            : b.prototype.getPlotLinePath.call(this, a);
        };
        e.prototype.update = function (a, d) {
          var f = this.chart.legend;
          this.series.forEach(function (a) {
            a.isDirtyData = !0;
          });
          ((a.dataClasses && f.allItems) || this.dataClasses) &&
            this.destroyItems();
          b.prototype.update.call(this, a, d);
          this.legendItem && (this.setLegendColor(), f.colorizeItem(this, !0));
        };
        e.prototype.destroyItems = function () {
          var a = this.chart;
          this.legendItem
            ? a.legend.destroyItem(this)
            : this.legendItems &&
              this.legendItems.forEach(function (b) {
                a.legend.destroyItem(b);
              });
          a.isDirtyLegend = !0;
        };
        e.prototype.destroy = function () {
          this.chart.isDirtyLegend = !0;
          this.destroyItems();
          b.prototype.destroy.apply(this, [].slice.call(arguments));
        };
        e.prototype.remove = function (a) {
          this.destroyItems();
          b.prototype.remove.call(this, a);
        };
        e.prototype.getDataClassLegendSymbols = function () {
          var b = this,
            d = b.chart,
            f = b.legendItems,
            e = d.options.legend,
            k = e.valueDecimals,
            c = e.valueSuffix || '',
            l;
          f.length ||
            b.dataClasses.forEach(function (e, h) {
              var g = e.from,
                m = e.to,
                p = d.numberFormatter,
                r = !0;
              l = '';
              'undefined' === typeof g
                ? (l = '< ')
                : 'undefined' === typeof m && (l = '> ');
              'undefined' !== typeof g && (l += p(g, k) + c);
              'undefined' !== typeof g &&
                'undefined' !== typeof m &&
                (l += ' - ');
              'undefined' !== typeof m && (l += p(m, k) + c);
              f.push(
                a(
                  {
                    chart: d,
                    name: l,
                    options: {},
                    drawLegendSymbol: A.drawRectangle,
                    visible: !0,
                    setState: n,
                    isDataClass: !0,
                    setVisible: function () {
                      r = b.visible = !r;
                      b.series.forEach(function (a) {
                        a.points.forEach(function (a) {
                          a.dataClass === h && a.setVisible(r);
                        });
                      });
                      d.legend.colorizeItem(this, r);
                    },
                  },
                  e
                )
              );
            });
          return f;
        };
        e.defaultColorAxisOptions = E;
        e.defaultLegendLength = 200;
        e.keepProps = [
          'legendGroup',
          'legendItemHeight',
          'legendItemWidth',
          'legendItem',
          'legendSymbol',
        ];
        return e;
      })(b);
      Array.prototype.push.apply(b.keepProps, e.keepProps);
      ('');
      return e;
    }
  );
  J(
    e,
    'Maps/MapNavigationOptionsDefault.js',
    [e['Core/DefaultOptions.js'], e['Core/Utilities.js']],
    function (b, e) {
      e = e.extend;
      var v = {
        buttonOptions: {
          alignTo: 'plotBox',
          align: 'left',
          verticalAlign: 'top',
          x: 0,
          width: 18,
          height: 18,
          padding: 5,
          style: { fontSize: '15px', fontWeight: 'bold' },
          theme: { 'stroke-width': 1, 'text-align': 'center' },
        },
        buttons: {
          zoomIn: {
            onclick: function () {
              this.mapZoom(0.5);
            },
            text: '+',
            y: 0,
          },
          zoomOut: {
            onclick: function () {
              this.mapZoom(2);
            },
            text: '-',
            y: 28,
          },
        },
        mouseWheelSensitivity: 1.1,
      };
      e(b.defaultOptions.lang, { zoomIn: 'Zoom in', zoomOut: 'Zoom out' });
      return (b.defaultOptions.mapNavigation = v);
    }
  );
  J(
    e,
    'Maps/MapNavigation.js',
    [e['Core/Chart/Chart.js'], e['Core/Globals.js'], e['Core/Utilities.js']],
    function (b, e, v) {
      function E(a) {
        a &&
          (a.preventDefault && a.preventDefault(),
          a.stopPropagation && a.stopPropagation(),
          (a.cancelBubble = !0));
      }
      function t(a) {
        this.navButtons = [];
        this.init(a);
      }
      var A = e.doc,
        C = v.addEvent,
        z = v.extend,
        q = v.isNumber,
        l = v.merge,
        n = v.objectEach,
        d = v.pick;
      t.prototype.init = function (a) {
        this.chart = a;
      };
      t.prototype.update = function (a) {
        var b = this,
          e = this.chart,
          q = e.options.mapNavigation,
          t,
          B,
          x,
          r,
          m = function (a) {
            this.handler.call(e, a);
            E(a);
          },
          h = b.navButtons;
        a && (q = e.options.mapNavigation = l(e.options.mapNavigation, a));
        for (; h.length; ) h.pop().destroy();
        d(q.enableButtons, q.enabled) &&
          !e.renderer.forExport &&
          (b.navButtonsGroup ||
            (b.navButtonsGroup = e.renderer.g().attr({ zIndex: 4 }).add()),
          n(q.buttons, function (a, c) {
            a = l(q.buttonOptions, a);
            !e.styledMode &&
              a.theme &&
              ((t = a.theme),
              (t.style = l(a.theme.style, a.style)),
              (x = (B = t.states) && B.hover),
              (r = B && B.select),
              delete t.states);
            var d = e.renderer
              .button(
                a.text || '',
                0,
                0,
                m,
                t,
                x,
                r,
                void 0,
                'zoomIn' === c ? 'topbutton' : 'bottombutton'
              )
              .addClass(
                'highcharts-map-navigation highcharts-' +
                  { zoomIn: 'zoom-in', zoomOut: 'zoom-out' }[c]
              )
              .attr({
                width: a.width,
                height: a.height,
                title: e.options.lang[c],
                padding: a.padding,
                zIndex: 5,
              })
              .add(b.navButtonsGroup);
            d.handler = a.onclick;
            C(d.element, 'dblclick', E);
            h.push(d);
            z(a, { width: d.width, height: 2 * d.height });
            if (e.hasLoaded) d.align(a, !1, a.alignTo);
            else
              var f = C(e, 'load', function () {
                d.element && d.align(a, !1, a.alignTo);
                f();
              });
          }),
          (a = function () {
            var a = e.exportingGroup && e.exportingGroup.getBBox();
            if (a) {
              var c = b.navButtonsGroup.getBBox();
              if (
                !(
                  c.x >= a.x + a.width ||
                  c.x + c.width <= a.x ||
                  c.y >= a.y + a.height ||
                  c.y + c.height <= a.y
                )
              ) {
                var d = -c.y - c.height + a.y - 5;
                a = a.y + a.height - c.y + 5;
                b.navButtonsGroup.attr({
                  translateY:
                    'bottom' ===
                    (q.buttonOptions && q.buttonOptions.verticalAlign)
                      ? d
                      : a,
                });
              }
            }
          }),
          e.hasLoaded || C(e, 'render', a));
        this.updateEvents(q);
      };
      t.prototype.updateEvents = function (a) {
        var b = this.chart;
        d(a.enableDoubleClickZoom, a.enabled) || a.enableDoubleClickZoomTo
          ? (this.unbindDblClick =
              this.unbindDblClick ||
              C(b.container, 'dblclick', function (a) {
                b.pointer.onContainerDblClick(a);
              }))
          : this.unbindDblClick &&
            (this.unbindDblClick = this.unbindDblClick());
        d(a.enableMouseWheelZoom, a.enabled)
          ? (this.unbindMouseWheel =
              this.unbindMouseWheel ||
              C(
                b.container,
                void 0 !== A.onwheel
                  ? 'wheel'
                  : void 0 !== A.onmousewheel
                    ? 'mousewheel'
                    : 'DOMMouseScroll',
                function (a) {
                  b.pointer.inClass(a.target, 'highcharts-no-mousewheel') ||
                    (b.pointer.onContainerMouseWheel(a), E(a));
                  return !1;
                }
              ))
          : this.unbindMouseWheel &&
            (this.unbindMouseWheel = this.unbindMouseWheel());
      };
      z(b.prototype, {
        fitToBox: function (a, b) {
          [
            ['x', 'width'],
            ['y', 'height'],
          ].forEach(function (d) {
            var f = d[0];
            d = d[1];
            a[f] + a[d] > b[f] + b[d] &&
              (a[d] > b[d]
                ? ((a[d] = b[d]), (a[f] = b[f]))
                : (a[f] = b[f] + b[d] - a[d]));
            a[d] > b[d] && (a[d] = b[d]);
            a[f] < b[f] && (a[f] = b[f]);
          });
          return a;
        },
        mapZoom: function (a, b, d, e, l) {
          this.mapView &&
            (q(a) && (a = Math.log(a) / Math.log(0.5)),
            this.mapView.zoomBy(
              a,
              q(b) && q(d) ? this.mapView.projection.inverse([b, d]) : void 0,
              q(e) && q(l) ? [e, l] : void 0
            ));
        },
      });
      C(b, 'beforeRender', function () {
        this.mapNavigation = new t(this);
        this.mapNavigation.update();
      });
      e.MapNavigation = t;
    }
  );
  J(
    e,
    'Maps/MapPointer.js',
    [e['Core/Pointer.js'], e['Core/Utilities.js']],
    function (b, e) {
      var v = e.defined,
        E = e.extend,
        t = e.pick;
      e = e.wrap;
      var A = b.prototype.normalize,
        C = 0,
        z;
      E(b.prototype, {
        normalize: function (b, e) {
          var l = this.chart;
          b = A.call(this, b, e);
          l &&
            l.mapView &&
            (e = l.mapView.pixelsToLonLat({
              x: b.chartX - l.plotLeft,
              y: b.chartY - l.plotTop,
            })) &&
            E(b, e);
          return b;
        },
        onContainerDblClick: function (b) {
          var e = this.chart;
          b = this.normalize(b);
          e.options.mapNavigation.enableDoubleClickZoomTo
            ? e.pointer.inClass(b.target, 'highcharts-tracker') &&
              e.hoverPoint &&
              e.hoverPoint.zoomTo()
            : e.isInsidePlot(b.chartX - e.plotLeft, b.chartY - e.plotTop) &&
              e.mapZoom(0.5, void 0, void 0, b.chartX, b.chartY);
        },
        onContainerMouseWheel: function (b) {
          var e = this.chart;
          b = this.normalize(b);
          var n =
            (v(b.wheelDelta) && -b.wheelDelta / 120) || b.deltaY || b.detail;
          1 <= Math.abs(n) &&
            ((C += Math.abs(n)),
            z && clearTimeout(z),
            (z = setTimeout(function () {
              C = 0;
            }, 50)));
          10 > C &&
            e.isInsidePlot(b.chartX - e.plotLeft, b.chartY - e.plotTop) &&
            e.mapView &&
            e.mapView.zoomBy(
              (e.options.mapNavigation.mouseWheelSensitivity - 1) * -n,
              void 0,
              [b.chartX, b.chartY],
              1 > Math.abs(n) ? !1 : void 0
            );
        },
      });
      e(b.prototype, 'zoomOption', function (b) {
        var e = this.chart.options.mapNavigation;
        t(e.enableTouchZoom, e.enabled) &&
          (this.chart.options.chart.pinchType = 'xy');
        b.apply(this, [].slice.call(arguments, 1));
      });
      e(b.prototype, 'pinchTranslate', function (b, e, n, d, a, f, k) {
        b.call(this, e, n, d, a, f, k);
        'map' === this.chart.options.chart.type &&
          this.hasZoom &&
          ((b = d.scaleX > d.scaleY),
          this.pinchTranslateDirection(
            !b,
            e,
            n,
            d,
            a,
            f,
            k,
            b ? d.scaleX : d.scaleY
          ));
      });
    }
  );
  J(
    e,
    'Series/ColorMapMixin.js',
    [e['Core/Globals.js'], e['Core/Series/Point.js'], e['Core/Utilities.js']],
    function (b, e, v) {
      var E = b.noop;
      b = b.seriesTypes;
      var t = v.defined;
      v = v.addEvent;
      v(e, 'afterSetState', function (b) {
        this.moveToTopOnHover &&
          this.graphic &&
          this.graphic.attr({ zIndex: b && 'hover' === b.state ? 1 : 0 });
      });
      return {
        PointMixin: {
          dataLabelOnNull: !0,
          moveToTopOnHover: !0,
          isValid: function () {
            return (
              null !== this.value &&
              Infinity !== this.value &&
              -Infinity !== this.value
            );
          },
        },
        SeriesMixin: {
          pointArrayMap: ['value'],
          axisTypes: ['xAxis', 'yAxis', 'colorAxis'],
          trackerGroups: ['group', 'markerGroup', 'dataLabelsGroup'],
          getSymbol: E,
          parallelArrays: ['x', 'y', 'value'],
          colorKey: 'value',
          pointAttribs: b.column.prototype.pointAttribs,
          colorAttribs: function (b) {
            var e = {};
            !t(b.color) ||
              (b.state && 'normal' !== b.state) ||
              (e[this.colorProp || 'fill'] = b.color);
            return e;
          },
        },
      };
    }
  );
  J(
    e,
    'Maps/MapSymbols.js',
    [e['Core/Renderer/SVG/SVGRenderer.js']],
    function (b) {
      function e(b, e, t, A, C, z, q, l) {
        return [
          ['M', b + C, e],
          ['L', b + t - z, e],
          ['C', b + t - z / 2, e, b + t, e + z / 2, b + t, e + z],
          ['L', b + t, e + A - q],
          ['C', b + t, e + A - q / 2, b + t - q / 2, e + A, b + t - q, e + A],
          ['L', b + l, e + A],
          ['C', b + l / 2, e + A, b, e + A - l / 2, b, e + A - l],
          ['L', b, e + C],
          ['C', b, e + C / 2, b + C / 2, e, b + C, e],
          ['Z'],
        ];
      }
      b = b.prototype.symbols;
      b.bottombutton = function (b, E, t, A, C) {
        C = (C && C.r) || 0;
        return e(b - 1, E - 1, t, A, 0, 0, C, C);
      };
      b.topbutton = function (b, E, t, A, C) {
        C = (C && C.r) || 0;
        return e(b - 1, E - 1, t, A, C, C, 0, 0);
      };
      return b;
    }
  );
  J(
    e,
    'Core/Chart/MapChart.js',
    [
      e['Core/Chart/Chart.js'],
      e['Core/DefaultOptions.js'],
      e['Core/Renderer/SVG/SVGRenderer.js'],
      e['Core/Utilities.js'],
    ],
    function (b, e, v, E) {
      var t =
          (this && this.__extends) ||
          (function () {
            var b = function (e, n) {
              b =
                Object.setPrototypeOf ||
                ({ __proto__: [] } instanceof Array &&
                  function (b, a) {
                    b.__proto__ = a;
                  }) ||
                function (b, a) {
                  for (var d in a) a.hasOwnProperty(d) && (b[d] = a[d]);
                };
              return b(e, n);
            };
            return function (e, n) {
              function d() {
                this.constructor = e;
              }
              b(e, n);
              e.prototype =
                null === n
                  ? Object.create(n)
                  : ((d.prototype = n.prototype), new d());
            };
          })(),
        A = e.getOptions,
        C = E.merge,
        z = E.pick;
      b = (function (b) {
        function e() {
          return (null !== b && b.apply(this, arguments)) || this;
        }
        t(e, b);
        e.prototype.init = function (e, d) {
          var a = A().credits;
          e = C(
            {
              chart: { panning: { enabled: !0, type: 'xy' }, type: 'map' },
              credits: {
                mapText: z(
                  a.mapText,
                  ' \u00a9 <a href="{geojson.copyrightUrl}">{geojson.copyrightShort}</a>'
                ),
                mapTextFull: z(a.mapTextFull, '{geojson.copyright}'),
              },
              mapView: {},
              tooltip: { followTouchMove: !1 },
            },
            e
          );
          b.prototype.init.call(this, e, d);
        };
        return e;
      })(b);
      (function (b) {
        b.maps = {};
        b.mapChart = function (e, n, d) {
          return new b(e, n, d);
        };
        b.splitPath = function (b) {
          'string' === typeof b &&
            ((b = b
              .replace(/([A-Za-z])/g, ' $1 ')
              .replace(/^\s*/, '')
              .replace(/\s*$/, '')),
            (b = b.split(/[ ,;]+/).map(function (b) {
              return /[A-za-z]/.test(b) ? b : parseFloat(b);
            })));
          return v.prototype.pathToSegments(b);
        };
      })(b || (b = {}));
      return b;
    }
  );
  J(e, 'Maps/MapUtilities.js', [], function () {
    return {
      boundsFromPath: function (b) {
        var e = -Number.MAX_VALUE,
          v = Number.MAX_VALUE,
          E = -Number.MAX_VALUE,
          t = Number.MAX_VALUE,
          A;
        b.forEach(function (b) {
          var z = b[b.length - 2];
          b = b[b.length - 1];
          'number' === typeof z &&
            'number' === typeof b &&
            ((v = Math.min(v, z)),
            (e = Math.max(e, z)),
            (t = Math.min(t, b)),
            (E = Math.max(E, b)),
            (A = !0));
        });
        if (A) return { x1: v, y1: t, x2: e, y2: E };
      },
      pointInPolygon: function (b, e) {
        var v,
          E = !1,
          t = b.x,
          A = b.y;
        b = 0;
        for (v = e.length - 1; b < e.length; v = b++) {
          var C = e[b][1] > A;
          var z = e[v][1] > A;
          C !== z &&
            t <
              ((e[v][0] - e[b][0]) * (A - e[b][1])) / (e[v][1] - e[b][1]) +
                e[b][0] &&
            (E = !E);
        }
        return E;
      },
    };
  });
  J(
    e,
    'Series/Map/MapPoint.js',
    [
      e['Series/ColorMapMixin.js'],
      e['Maps/MapUtilities.js'],
      e['Core/Series/SeriesRegistry.js'],
      e['Core/Utilities.js'],
    ],
    function (b, e, v, E) {
      var t =
          (this && this.__extends) ||
          (function () {
            var b = function (e, d) {
              b =
                Object.setPrototypeOf ||
                ({ __proto__: [] } instanceof Array &&
                  function (a, b) {
                    a.__proto__ = b;
                  }) ||
                function (a, b) {
                  for (var d in b) b.hasOwnProperty(d) && (a[d] = b[d]);
                };
              return b(e, d);
            };
            return function (e, d) {
              function a() {
                this.constructor = e;
              }
              b(e, d);
              e.prototype =
                null === d
                  ? Object.create(d)
                  : ((a.prototype = d.prototype), new a());
            };
          })(),
        A = e.boundsFromPath,
        C = E.extend,
        z = E.isNumber,
        q = E.pick;
      e = (function (b) {
        function e() {
          var d = (null !== b && b.apply(this, arguments)) || this;
          d.options = void 0;
          d.path = void 0;
          d.series = void 0;
          return d;
        }
        t(e, b);
        e.getProjectedPath = function (b, a) {
          b.projectedPath ||
            (a && b.geometry
              ? ((a.hasCoordinates = !0),
                (b.projectedPath = a.path(b.geometry)))
              : (b.projectedPath = b.path));
          return b.projectedPath || [];
        };
        e.prototype.applyOptions = function (d, a) {
          var f = this.series;
          d = b.prototype.applyOptions.call(this, d, a);
          a = f.joinBy;
          f.mapData &&
            f.mapMap &&
            ((a = b.prototype.getNestedProperty.call(d, a[1])),
            (f = 'undefined' !== typeof a && f.mapMap[a])
              ? C(d, f)
              : (d.value = d.value || null));
          return d;
        };
        e.prototype.getProjectedBounds = function (b) {
          b = e.getProjectedPath(this, b);
          b = A(b);
          var a = this.properties;
          if (b) {
            var d = a && a['hc-middle-x'];
            a = a && a['hc-middle-y'];
            b.midX = b.x1 + (b.x2 - b.x1) * q(this.middleX, z(d) ? d : 0.5);
            d = q(this.middleY, z(a) ? a : 0.5);
            this.geometry || (d = 1 - d);
            b.midY = b.y2 - (b.y2 - b.y1) * d;
            return b;
          }
        };
        e.prototype.onMouseOver = function (d) {
          E.clearTimeout(this.colorInterval);
          if (null !== this.value || this.series.options.nullInteraction)
            b.prototype.onMouseOver.call(this, d);
          else this.series.onMouseOut(d);
        };
        e.prototype.zoomTo = function () {
          var b = this.series.chart;
          b.mapView &&
            this.bounds &&
            (b.mapView.fitToBounds(this.bounds, void 0, !1),
            (this.series.isDirty = !0),
            b.redraw());
        };
        return e;
      })(v.seriesTypes.scatter.prototype.pointClass);
      C(e.prototype, {
        dataLabelOnNull: b.PointMixin.dataLabelOnNull,
        isValid: b.PointMixin.isValid,
        moveToTopOnHover: b.PointMixin.moveToTopOnHover,
      });
      return e;
    }
  );
  J(e, 'Maps/MapViewOptionsDefault.js', [], function () {
    return {
      center: [0, 0],
      maxZoom: void 0,
      padding: 0,
      projection: { name: void 0, parallels: void 0, rotation: void 0 },
      zoom: void 0,
    };
  });
  J(e, 'Maps/MapViewInsetsOptionsDefault.js', [], function () {
    return {
      borderColor: '#cccccc',
      borderWidth: 1,
      center: [0, 0],
      padding: '10%',
      relativeTo: 'mapBoundingBox',
      units: 'percent',
    };
  });
  J(
    e,
    'Extensions/GeoJSON.js',
    [
      e['Core/Chart/Chart.js'],
      e['Core/FormatUtilities.js'],
      e['Core/Globals.js'],
      e['Maps/MapUtilities.js'],
      e['Core/Utilities.js'],
    ],
    function (b, e, v, E, t) {
      function A(a, b) {
        b || (b = Object.keys(a.objects)[0]);
        b = a.objects[b];
        if (b['hc-decoded-geojson']) return b['hc-decoded-geojson'];
        var d = a.arcs;
        if (a.transform) {
          var f = a.transform,
            e = f.scale,
            l = f.translate;
          d = a.arcs.map(function (a) {
            var b = 0,
              d = 0;
            return a.map(function (a) {
              a = a.slice();
              a[0] = (b += a[0]) * e[0] + l[0];
              a[1] = (d += a[1]) * e[1] + l[1];
              return a;
            });
          });
        }
        var n = function (a) {
          return 'number' === typeof a[0]
            ? a.reduce(function (a, b, f) {
                var c = 0 > b ? d[~b] : d[b];
                0 > b
                  ? ((c = c.slice(0, 0 === f ? c.length : c.length - 1)),
                    c.reverse())
                  : f && (c = c.slice(1));
                return a.concat(c);
              }, [])
            : a.map(n);
        };
        f = b.geometries.map(function (a) {
          return {
            type: 'Feature',
            properties: a.properties,
            geometry: { type: a.type, coordinates: a.coordinates || n(a.arcs) },
          };
        });
        a = {
          type: 'FeatureCollection',
          copyright: a.copyright,
          copyrightShort: a.copyrightShort,
          copyrightUrl: a.copyrightUrl,
          features: f,
          'hc-recommended-mapview': b['hc-recommended-mapview'],
          bbox: a.bbox,
        };
        return (b['hc-decoded-geojson'] = a);
      }
      function C(a, b, d) {
        void 0 === b && (b = 'map');
        var f = [];
        a = 'Topology' === a.type ? A(a) : a;
        a.features.forEach(function (a) {
          var d = a.geometry || {},
            e = d.type;
          d = d.coordinates;
          a = a.properties;
          var k;
          ('map' !== b && 'mapbubble' !== b) ||
          ('Polygon' !== e && 'MultiPolygon' !== e)
            ? 'mapline' !== b || ('LineString' !== e && 'MultiLineString' !== e)
              ? 'mappoint' === b &&
                'Point' === e &&
                d.length &&
                (k = { geometry: { coordinates: d, type: e } })
              : d.length && (k = { geometry: { coordinates: d, type: e } })
            : d.length && (k = { geometry: { coordinates: d, type: e } });
          k &&
            ((e = a && (a.name || a.NAME)),
            f.push(
              n(k, { name: 'string' === typeof e ? e : void 0, properties: a })
            ));
        });
        d &&
          a.copyrightShort &&
          ((d.chart.mapCredits = z(d.chart.options.credits.mapText, {
            geojson: a,
          })),
          (d.chart.mapCreditsFull = z(d.chart.options.credits.mapTextFull, {
            geojson: a,
          })));
        return f;
      }
      var z = e.format,
        q = v.win,
        l = t.error,
        n = t.extend,
        d = t.merge;
      e = t.wrap;
      ('');
      b.prototype.transformFromLatLon = function (a, b) {
        var d = this.options.chart.proj4 || q.proj4;
        if (d) {
          var f = b.jsonmarginX;
          f = void 0 === f ? 0 : f;
          var e = b.jsonmarginY;
          e = void 0 === e ? 0 : e;
          var n = b.jsonres;
          n = void 0 === n ? 1 : n;
          var t = b.scale;
          t = void 0 === t ? 1 : t;
          var r = b.xoffset;
          r = void 0 === r ? 0 : r;
          var m = b.xpan;
          m = void 0 === m ? 0 : m;
          var h = b.yoffset;
          h = void 0 === h ? 0 : h;
          var p = b.ypan;
          p = void 0 === p ? 0 : p;
          a = d(b.crs, [a.lon, a.lat]);
          d = b.cosAngle || (b.rotation && Math.cos(b.rotation));
          var c = b.sinAngle || (b.rotation && Math.sin(b.rotation));
          b = b.rotation ? [a[0] * d + a[1] * c, -a[0] * c + a[1] * d] : a;
          return {
            x: ((b[0] - r) * t + m) * n + f,
            y: -(((h - b[1]) * t + p) * n - e),
          };
        }
        l(21, !1, this);
      };
      b.prototype.transformToLatLon = function (a, b) {
        if (!this.options.chart.proj4 && !q.proj4) l(21, !1, this);
        else if (null !== a.y) {
          var d = b.jsonmarginX,
            f = b.jsonmarginY,
            e = b.jsonres;
          e = void 0 === e ? 1 : e;
          var n = b.scale;
          n = void 0 === n ? 1 : n;
          var t = b.xoffset,
            r = b.xpan,
            m = b.yoffset,
            h = b.ypan;
          a = {
            x:
              ((a.x - (void 0 === d ? 0 : d)) / e - (void 0 === r ? 0 : r)) /
                n +
              (void 0 === t ? 0 : t),
            y:
              ((a.y - (void 0 === f ? 0 : f)) / e + (void 0 === h ? 0 : h)) /
                n +
              (void 0 === m ? 0 : m),
          };
          d = b.cosAngle || (b.rotation && Math.cos(b.rotation));
          f = b.sinAngle || (b.rotation && Math.sin(b.rotation));
          b = q.proj4(
            b.crs,
            'WGS84',
            b.rotation ? { x: a.x * d + a.y * -f, y: a.x * f + a.y * d } : a
          );
          return { lat: b.y, lon: b.x };
        }
      };
      b.prototype.fromPointToLatLon = function (a) {
        return this.mapView && this.mapView.projectedUnitsToLonLat(a);
      };
      b.prototype.fromLatLonToPoint = function (a) {
        return this.mapView && this.mapView.lonLatToProjectedUnits(a);
      };
      e(b.prototype, 'addCredits', function (a, b) {
        b = d(!0, this.options.credits, b);
        this.mapCredits && (b.href = null);
        a.call(this, b);
        this.credits &&
          this.mapCreditsFull &&
          this.credits.attr({ title: this.mapCreditsFull });
      });
      v.geojson = C;
      return { geojson: C, topo2geo: A };
    }
  );
  J(e, 'Core/Geometry/PolygonClip.js', [], function () {
    var b = function (b, e, v) {
        return (e[0] - b[0]) * (v[1] - b[1]) > (e[1] - b[1]) * (v[0] - b[0]);
      },
      e = function (b, e, v, C) {
        var t = [b[0] - e[0], b[1] - e[1]],
          q = [v[0] - C[0], v[1] - C[1]];
        b = b[0] * e[1] - b[1] * e[0];
        v = v[0] * C[1] - v[1] * C[0];
        C = 1 / (t[0] * q[1] - t[1] * q[0]);
        t = [(b * q[0] - v * t[0]) * C, (b * q[1] - v * t[1]) * C];
        t.isIntersection = !0;
        return t;
      },
      v;
    (function (v) {
      v.clipLineString = function (b, e) {
        var t = [];
        b = v.clipPolygon(b, e, !1);
        for (e = 1; e < b.length; e++)
          b[e].isIntersection &&
            b[e - 1].isIntersection &&
            (t.push(b.splice(0, e)), (e = 0)),
            e === b.length - 1 && t.push(b);
        return t;
      };
      v.clipPolygon = function (t, v, C) {
        void 0 === C && (C = !0);
        for (var z = v[v.length - 1], q, l, n = t, d = 0; d < v.length; d++) {
          var a = n;
          t = v[d];
          n = [];
          q = C ? a[a.length - 1] : a[0];
          for (var f = 0; f < a.length; f++)
            (l = a[f]),
              b(z, t, l)
                ? (b(z, t, q) || n.push(e(z, t, q, l)), n.push(l))
                : b(z, t, q) && n.push(e(z, t, q, l)),
              (q = l);
          z = t;
        }
        return n;
      };
    })(v || (v = {}));
    return v;
  });
  J(e, 'Maps/Projections/LambertConformalConic.js', [], function () {
    var b =
        Math.sign ||
        function (b) {
          return 0 === b ? 0 : 0 < b ? 1 : -1;
        },
      e = Math.PI / 180,
      v = Math.PI / 2;
    return (function () {
      function E(t) {
        var A,
          C = (t.parallels || []).map(function (b) {
            return b * e;
          }),
          z = C[0] || 0;
        C = null !== (A = C[1]) && void 0 !== A ? A : z;
        A = Math.cos(z);
        'object' === typeof t.projectedBounds &&
          (this.projectedBounds = t.projectedBounds);
        t =
          z === C
            ? Math.sin(z)
            : Math.log(A / Math.cos(C)) /
              Math.log(Math.tan((v + C) / 2) / Math.tan((v + z) / 2));
        1e-10 > Math.abs(t) && (t = 1e-10 * (b(t) || 1));
        this.n = t;
        this.c = (A * Math.pow(Math.tan((v + z) / 2), t)) / t;
      }
      E.prototype.forward = function (b) {
        var t = b[0] * e,
          C = this.c,
          z = this.n,
          q = this.projectedBounds;
        b = b[1] * e;
        0 < C
          ? b < -v + 0.000001 && (b = -v + 0.000001)
          : b > v - 0.000001 && (b = v - 0.000001);
        var l = C / Math.pow(Math.tan((v + b) / 2), z);
        b = l * Math.sin(z * t) * 63.78137;
        t = 63.78137 * (C - l * Math.cos(z * t));
        C = [b, t];
        q && (b < q.x1 || b > q.x2 || t < q.y1 || t > q.y2) && (C.outside = !0);
        return C;
      };
      E.prototype.inverse = function (t) {
        var A = t[0] / 63.78137,
          C = this.c,
          z = this.n;
        t = C - t[1] / 63.78137;
        var q = b(z) * Math.sqrt(A * A + t * t),
          l = Math.atan2(A, Math.abs(t)) * b(t);
        0 > t * z && (l -= Math.PI * b(A) * b(t));
        return [l / z / e, (2 * Math.atan(Math.pow(C / q, 1 / z)) - v) / e];
      };
      return E;
    })();
  });
  J(e, 'Maps/Projections/EqualEarth.js', [], function () {
    var b = Math.sqrt(3) / 2;
    return (function () {
      function e() {
        this.bounds = {
          x1: -200.37508342789243,
          x2: 200.37508342789243,
          y1: -97.52595454902263,
          y2: 97.52595454902263,
        };
      }
      e.prototype.forward = function (e) {
        var v = Math.PI / 180,
          t = Math.asin(b * Math.sin(e[1] * v)),
          A = t * t,
          C = A * A * A;
        return [
          (e[0] * v * Math.cos(t) * 74.03120656864502) /
            (b *
              (1.340264 +
                3 * -0.081106 * A +
                C * (7 * 0.000893 + 0.034164 * A))),
          74.03120656864502 *
            t *
            (1.340264 + -0.081106 * A + C * (0.000893 + 0.003796 * A)),
        ];
      };
      e.prototype.inverse = function (e) {
        var v = e[0] / 74.03120656864502;
        e = e[1] / 74.03120656864502;
        var t = 180 / Math.PI,
          A = e,
          C;
        for (C = 0; 12 > C; ++C) {
          var z = A * A;
          var q = z * z * z;
          var l =
            A * (1.340264 + -0.081106 * z + q * (0.000893 + 0.003796 * z)) - e;
          z = 1.340264 + 3 * -0.081106 * z + q * (7 * 0.000893 + 0.034164 * z);
          A -= l /= z;
          if (1e-9 > Math.abs(l)) break;
        }
        z = A * A;
        return [
          (t *
            b *
            v *
            (1.340264 +
              3 * -0.081106 * z +
              z * z * z * (7 * 0.000893 + 0.034164 * z))) /
            Math.cos(A),
          t * Math.asin(Math.sin(A) / b),
        ];
      };
      return e;
    })();
  });
  J(e, 'Maps/Projections/Miller.js', [], function () {
    var b = Math.PI / 4,
      e = Math.PI / 180;
    return (function () {
      function v() {
        this.bounds = {
          x1: -200.37508342789243,
          x2: 200.37508342789243,
          y1: -146.91480769173063,
          y2: 146.91480769173063,
        };
      }
      v.prototype.forward = function (v) {
        return [
          v[0] * e * 63.78137,
          79.7267125 * Math.log(Math.tan(b + 0.4 * v[1] * e)),
        ];
      };
      v.prototype.inverse = function (v) {
        return [
          v[0] / 63.78137 / e,
          (2.5 * (Math.atan(Math.exp((v[1] / 63.78137) * 0.8)) - b)) / e,
        ];
      };
      return v;
    })();
  });
  J(e, 'Maps/Projections/Orthographic.js', [], function () {
    var b = Math.PI / 180;
    return (function () {
      function e() {
        this.antimeridianCutting = !1;
        this.bounds = {
          x1: -63.78460826781007,
          x2: 63.78460826781007,
          y1: -63.78460826781007,
          y2: 63.78460826781007,
        };
      }
      e.prototype.forward = function (e) {
        var v = e[0];
        e = e[1] * b;
        e = [
          Math.cos(e) * Math.sin(v * b) * 63.78460826781007,
          63.78460826781007 * Math.sin(e),
        ];
        if (-90 > v || 90 < v) e.outside = !0;
        return e;
      };
      e.prototype.inverse = function (e) {
        var v = e[0] / 63.78460826781007;
        e = e[1] / 63.78460826781007;
        var t = Math.sqrt(v * v + e * e),
          A = Math.asin(t),
          C = Math.sin(A);
        return [
          Math.atan2(v * C, t * Math.cos(A)) / b,
          Math.asin(t && (e * C) / t) / b,
        ];
      };
      return e;
    })();
  });
  J(e, 'Maps/Projections/WebMercator.js', [], function () {
    var b = Math.PI / 180;
    return (function () {
      function e() {
        this.bounds = {
          x1: -200.37508342789243,
          x2: 200.37508342789243,
          y1: -200.3750834278071,
          y2: 200.3750834278071,
        };
        this.maxLatitude = 85.0511287798;
      }
      e.prototype.forward = function (e) {
        var v = Math.sin(e[1] * b);
        v = [63.78137 * e[0] * b, (63.78137 * Math.log((1 + v) / (1 - v))) / 2];
        85.0511287798 < Math.abs(e[1]) && (v.outside = !0);
        return v;
      };
      e.prototype.inverse = function (e) {
        return [
          e[0] / (63.78137 * b),
          (2 * Math.atan(Math.exp(e[1] / 63.78137)) - Math.PI / 2) / b,
        ];
      };
      return e;
    })();
  });
  J(
    e,
    'Maps/Projections/ProjectionRegistry.js',
    [
      e['Maps/Projections/LambertConformalConic.js'],
      e['Maps/Projections/EqualEarth.js'],
      e['Maps/Projections/Miller.js'],
      e['Maps/Projections/Orthographic.js'],
      e['Maps/Projections/WebMercator.js'],
    ],
    function (b, e, v, E, t) {
      return {
        EqualEarth: e,
        LambertConformalConic: b,
        Miller: v,
        Orthographic: E,
        WebMercator: t,
      };
    }
  );
  J(
    e,
    'Maps/Projection.js',
    [
      e['Core/Geometry/PolygonClip.js'],
      e['Maps/Projections/ProjectionRegistry.js'],
      e['Core/Utilities.js'],
    ],
    function (b, e, v) {
      var E =
          (this && this.__spreadArrays) ||
          function () {
            for (var b = 0, d = 0, a = arguments.length; d < a; d++)
              b += arguments[d].length;
            b = Array(b);
            var e = 0;
            for (d = 0; d < a; d++)
              for (var k = arguments[d], l = 0, q = k.length; l < q; l++, e++)
                b[e] = k[l];
            return b;
          },
        t = b.clipLineString,
        A = b.clipPolygon,
        C = v.clamp,
        z = v.erase,
        q = (2 * Math.PI) / 360,
        l = function (b) {
          -180 > b && (b += 360);
          180 < b && (b -= 360);
          return b;
        };
      return (function () {
        function b(d) {
          void 0 === d && (d = {});
          this.hasGeoProjection = this.hasCoordinates = !1;
          this.maxLatitude = 90;
          this.options = d;
          var a = d.name,
            e = d.projectedBounds,
            k = d.rotation;
          this.rotator = k ? this.getRotator(k) : void 0;
          if ((a = a ? b.registry[a] : void 0)) this.def = new a(d);
          var l = this.def,
            n = this.rotator;
          l &&
            ((this.maxLatitude = l.maxLatitude || 90),
            (this.hasGeoProjection = !0));
          n && l
            ? ((this.forward = function (a) {
                return l.forward(n.forward(a));
              }),
              (this.inverse = function (a) {
                return n.inverse(l.inverse(a));
              }))
            : l
              ? ((this.forward = function (a) {
                  return l.forward(a);
                }),
                (this.inverse = function (a) {
                  return l.inverse(a);
                }))
              : n && ((this.forward = n.forward), (this.inverse = n.inverse));
          this.bounds = 'world' === e ? l && l.bounds : e;
        }
        b.add = function (d, a) {
          b.registry[d] = a;
        };
        b.greatCircle = function (b, a, e) {
          var d = Math.atan2,
            f = Math.cos,
            l = Math.sin,
            n = Math.sqrt,
            t = b[1] * q,
            r = b[0] * q,
            m = a[1] * q,
            h = a[0] * q,
            p = m - t,
            c = h - r;
          p = l(p / 2) * l(p / 2) + f(t) * f(m) * l(c / 2) * l(c / 2);
          p = 2 * d(n(p), n(1 - p));
          var w = Math.round((6371e3 * p) / 5e5);
          c = [];
          e && c.push(b);
          if (1 < w)
            for (w = b = 1 / w; 0.999 > w; w += b) {
              var g = l((1 - w) * p) / l(p),
                v = l(w * p) / l(p),
                u = g * f(t) * f(r) + v * f(m) * f(h),
                D = g * f(t) * l(r) + v * f(m) * l(h);
              g = g * l(t) + v * l(m);
              g = d(g, n(u * u + D * D));
              u = d(D, u);
              c.push([u / q, g / q]);
            }
          e && c.push(a);
          return c;
        };
        b.insertGreatCircles = function (d) {
          for (var a = d.length - 1; a--; )
            if (
              10 <
              Math.max(
                Math.abs(d[a][0] - d[a + 1][0]),
                Math.abs(d[a][1] - d[a + 1][1])
              )
            ) {
              var e = b.greatCircle(d[a], d[a + 1]);
              e.length && d.splice.apply(d, E([a + 1, 0], e));
            }
        };
        b.toString = function (b) {
          b = b || {};
          var a = b.rotation;
          return [b.name, a && a.join(',')].join(';');
        };
        b.prototype.lineIntersectsBounds = function (b) {
          var a = this.bounds || {},
            d = a.x2,
            e = a.y1,
            l = a.y2,
            n = function (a, b, d) {
              var e = a[0];
              a = a[1];
              var f = b ? 0 : 1;
              if ('number' === typeof d && e[b] >= d !== a[b] >= d)
                return (
                  (e = e[f] + ((d - e[b]) / (a[b] - e[b])) * (a[f] - e[f])),
                  b ? [e, d] : [d, e]
                );
            },
            q = b[0];
          if ((a = n(b, 0, a.x1))) (q = a), (b[1] = a);
          else if ((a = n(b, 0, d))) (q = a), (b[1] = a);
          if ((a = n(b, 1, e))) q = a;
          else if ((a = n(b, 1, l))) q = a;
          return q;
        };
        b.prototype.getRotator = function (b) {
          var a = b[0] * q,
            d = (b[1] || 0) * q;
          b = (b[2] || 0) * q;
          var e = Math.cos(d),
            l = Math.sin(d),
            n = Math.cos(b),
            t = Math.sin(b);
          if (0 !== a || 0 !== d || 0 !== b)
            return {
              forward: function (b) {
                var d = b[0] * q + a,
                  f = b[1] * q,
                  h = Math.cos(f);
                b = Math.cos(d) * h;
                d = Math.sin(d) * h;
                f = Math.sin(f);
                h = f * e + b * l;
                return [
                  Math.atan2(d * n - h * t, b * e - f * l) / q,
                  Math.asin(h * n + d * t) / q,
                ];
              },
              inverse: function (b) {
                var d = b[0] * q,
                  f = b[1] * q,
                  h = Math.cos(f);
                b = Math.cos(d) * h;
                d = Math.sin(d) * h;
                f = Math.sin(f);
                h = f * n - d * t;
                return [
                  (Math.atan2(d * n + f * t, b * e + h * l) - a) / q,
                  Math.asin(h * e - b * l) / q,
                ];
              },
            };
        };
        b.prototype.forward = function (b) {
          return b;
        };
        b.prototype.inverse = function (b) {
          return b;
        };
        b.prototype.cutOnAntimeridian = function (d, a) {
          var e = [],
            k = [d];
          d.forEach(function (c, b) {
            var f = d[b - 1];
            if (!b) {
              if (!a) return;
              f = d[d.length - 1];
            }
            var h = f[0],
              k = c[0];
            (-90 > h || 90 < h) &&
              (-90 > k || 90 < k) &&
              0 < h !== 0 < k &&
              ((k = C(
                (180 - ((h + 360) % 360)) /
                  (((k + 360) % 360) - ((h + 360) % 360)),
                0,
                1
              )),
              e.push({
                i: b,
                lat: f[1] + k * (c[1] - f[1]),
                direction: 0 > h ? 1 : -1,
                previousLonLat: f,
                lonLat: c,
              }));
          });
          if (e.length)
            if (a) {
              if (1 === e.length % 2) {
                var n = e.slice().sort(function (a, b) {
                  return Math.abs(b.lat) - Math.abs(a.lat);
                })[0];
                z(e, n);
              }
              for (var q = e.length - 2; 0 <= q; ) {
                var t = e[q].i,
                  x = l(180 + 0.000001 * e[q].direction),
                  r = l(180 - 0.000001 * e[q].direction);
                t = d.splice.apply(
                  d,
                  E(
                    [t, e[q + 1].i - t],
                    b.greatCircle([x, e[q].lat], [x, e[q + 1].lat], !0)
                  )
                );
                t.push.apply(
                  t,
                  b.greatCircle([r, e[q + 1].lat], [r, e[q].lat], !0)
                );
                k.push(t);
                q -= 2;
              }
              if (n)
                for (x = 0; x < k.length; x++) {
                  q = n.direction;
                  var m = n.lat;
                  r = k[x];
                  t = r.indexOf(n.lonLat);
                  if (-1 < t) {
                    x = (0 > m ? -1 : 1) * this.maxLatitude;
                    var h = l(180 + 0.000001 * q),
                      p = l(180 - 0.000001 * q);
                    m = b.greatCircle([h, m], [h, x], !0);
                    for (h += 120 * q; -180 < h && 180 > h; h += 120 * q)
                      m.push([h, x]);
                    m.push.apply(m, b.greatCircle([p, x], [p, n.lat], !0));
                    r.splice.apply(r, E([t, 0], m));
                    break;
                  }
                }
            } else
              for (q = e.length; q--; )
                (t = e[q].i),
                  (t = d.splice(t, d.length, [
                    l(180 + 0.000001 * e[q].direction),
                    e[q].lat,
                  ])),
                  t.unshift([l(180 - 0.000001 * e[q].direction), e[q].lat]),
                  k.push(t);
          return k;
        };
        b.prototype.path = function (d) {
          var a = this,
            e = this.bounds,
            k = this.def,
            l = this.rotator,
            n = [],
            q = 'Polygon' === d.type || 'MultiPolygon' === d.type,
            x = this.hasGeoProjection,
            r = !k || !1 !== k.antimeridianCutting,
            m = r ? l : void 0,
            h = r ? k || this : this,
            p;
          e &&
            (p = [
              [e.x1, e.y1],
              [e.x2, e.y1],
              [e.x2, e.y2],
              [e.x1, e.y2],
            ]);
          var c = function (c) {
            c = c.map(function (a) {
              if (r) {
                m && (a = m.forward(a));
                var c = a[0];
                0.000001 > Math.abs(c - 180) &&
                  (c = 180 > c ? 179.999999 : 180.000001);
                a = [c, a[1]];
              }
              return a;
            });
            var d = [c];
            x &&
              (b.insertGreatCircles(c), r && (d = a.cutOnAntimeridian(c, q)));
            d.forEach(function (a) {
              if (!(2 > a.length)) {
                var c = !1,
                  d = !1,
                  f = function (a) {
                    c
                      ? n.push(['L', a[0], a[1]])
                      : (n.push(['M', a[0], a[1]]), (c = !0));
                  },
                  g = !1,
                  k = !1,
                  l = a.map(function (a) {
                    a = h.forward(a);
                    a.outside ? (g = !0) : (k = !0);
                    Infinity === a[1]
                      ? (a[1] = 1e10)
                      : -Infinity === a[1] && (a[1] = -1e10);
                    return a;
                  });
                if (r) {
                  q && l.push(l[0]);
                  if (g) {
                    if (!k) return;
                    if (p)
                      if (q) l = A(l, p);
                      else if (e) {
                        t(l, p).forEach(function (a) {
                          c = !1;
                          a.forEach(f);
                        });
                        return;
                      }
                  }
                  l.forEach(f);
                } else
                  for (var m = 0; m < l.length; m++) {
                    var w = a[m],
                      y = l[m];
                    if (y.outside) d = !0;
                    else {
                      if (q && !v) {
                        var v = w;
                        a.push(w);
                        l.push(y);
                      }
                      d &&
                        B &&
                        (q && x
                          ? b.greatCircle(B, w).forEach(function (a) {
                              return f(h.forward(a));
                            })
                          : (c = !1));
                      f(y);
                      var B = w;
                      d = !1;
                    }
                  }
              }
            });
          };
          'LineString' === d.type
            ? c(d.coordinates)
            : 'MultiLineString' === d.type
              ? d.coordinates.forEach(function (a) {
                  return c(a);
                })
              : 'Polygon' === d.type
                ? (d.coordinates.forEach(function (a) {
                    return c(a);
                  }),
                  n.length && n.push(['Z']))
                : 'MultiPolygon' === d.type &&
                  (d.coordinates.forEach(function (a) {
                    a.forEach(function (a) {
                      return c(a);
                    });
                  }),
                  n.length && n.push(['Z']));
          return n;
        };
        b.registry = e;
        return b;
      })();
    }
  );
  J(
    e,
    'Maps/MapView.js',
    [
      e['Maps/MapViewOptionsDefault.js'],
      e['Maps/MapViewInsetsOptionsDefault.js'],
      e['Extensions/GeoJSON.js'],
      e['Core/Chart/MapChart.js'],
      e['Maps/MapUtilities.js'],
      e['Maps/Projection.js'],
      e['Core/Utilities.js'],
    ],
    function (b, e, v, E, t, A, C) {
      var z =
          (this && this.__extends) ||
          (function () {
            var a = function (c, b) {
              a =
                Object.setPrototypeOf ||
                ({ __proto__: [] } instanceof Array &&
                  function (a, c) {
                    a.__proto__ = c;
                  }) ||
                function (a, c) {
                  for (var b in c) c.hasOwnProperty(b) && (a[b] = c[b]);
                };
              return a(c, b);
            };
            return function (c, b) {
              function d() {
                this.constructor = c;
              }
              a(c, b);
              c.prototype =
                null === b
                  ? Object.create(b)
                  : ((d.prototype = b.prototype), new d());
            };
          })(),
        q =
          (this && this.__spreadArrays) ||
          function () {
            for (var a = 0, c = 0, b = arguments.length; c < b; c++)
              a += arguments[c].length;
            a = Array(a);
            var d = 0;
            for (c = 0; c < b; c++)
              for (var e = arguments[c], f = 0, g = e.length; f < g; f++, d++)
                a[d] = e[f];
            return a;
          },
        l = v.topo2geo,
        n = E.maps,
        d = t.boundsFromPath,
        a = t.pointInPolygon,
        f = C.addEvent,
        k = C.clamp,
        G = C.fireEvent,
        y = C.isArray,
        B = C.isNumber,
        x = C.isObject,
        r = C.isString,
        m = C.merge,
        h = C.pick,
        p = C.relativeLength,
        c = function (a, c) {
          return (
            Math.log(
              400.979322 /
                Math.max(
                  (a.x2 - a.x1) / (c.width / 256),
                  (a.y2 - a.y1) / (c.height / 256)
                )
            ) / Math.log(2)
          );
        },
        w = (function () {
          function d(a, c) {
            var e = this;
            this.insets = [];
            this.padding = [0, 0, 0, 0];
            this.eventsToUnbind = [];
            var h;
            if (!(this instanceof g)) {
              var k = q(
                  [a.options.chart.map],
                  (a.options.series || []).map(function (a) {
                    return a.mapData;
                  })
                ).map(function (a) {
                  return e.getGeoMap(a);
                }),
                l = [];
              k.forEach(function (a) {
                a &&
                  (h || (h = a['hc-recommended-mapview']),
                  a.bbox &&
                    ((a = a.bbox),
                    l.push({ x1: a[0], y1: a[1], x2: a[2], y2: a[3] })));
              });
              var n = l.length && d.compositeBounds(l);
              if (n) {
                var u = n.x1;
                var p = n.y1,
                  r = n.x2;
                n = n.y2;
                u =
                  180 < r - u && 90 < n - p
                    ? { name: 'EqualEarth' }
                    : {
                        name: 'LambertConformalConic',
                        parallels: [p, n],
                        rotation: [-(u + r) / 2],
                      };
              }
              this.geoMap = k[0];
            }
            this.userOptions = c || {};
            k = m(b, { projection: u }, h, c);
            n = h && h.insets;
            c = c && c.insets;
            n && c && (k.insets = d.mergeInsets(n, c));
            this.chart = a;
            this.center = k.center;
            this.options = k;
            this.projection = new A(k.projection);
            this.playingField = a.plotBox;
            this.zoom = k.zoom || 0;
            this.createInsets();
            this.eventsToUnbind.push(
              f(a, 'afterSetChartSize', function () {
                e.playingField = e.getField();
                if (void 0 === e.minZoom || e.minZoom === e.zoom)
                  e.fitToBounds(void 0, void 0, !1),
                    B(e.userOptions.zoom) && (e.zoom = e.userOptions.zoom),
                    e.userOptions.center &&
                      m(!0, e.center, e.userOptions.center);
              })
            );
            this.setUpEvents();
          }
          d.mergeInsets = function (a, c) {
            var b = function (a) {
                var c = {};
                a.forEach(function (a, b) {
                  c[(a && a.id) || 'i' + b] = a;
                });
                return c;
              },
              d = m(b(a), b(c));
            return Object.keys(d).map(function (a) {
              return d[a];
            });
          };
          d.prototype.createInsets = function () {
            var a = this,
              c = this.options,
              b = c.insets;
            b &&
              b.forEach(function (b) {
                b = new g(a, m(c.insetOptions, b));
                a.insets.push(b);
              });
          };
          d.prototype.fitToBounds = function (a, b, d, e) {
            void 0 === d && (d = !0);
            var f = a || this.getProjectedBounds();
            if (f) {
              var g = h(b, a ? 0 : this.options.padding);
              b = this.getField(!1);
              g = y(g) ? g : [g, g, g, g];
              this.padding = [
                p(g[0], b.height),
                p(g[1], b.width),
                p(g[2], b.height),
                p(g[3], b.width),
              ];
              this.playingField = this.getField();
              b = c(f, this.playingField);
              a || (this.minZoom = b);
              a = this.projection.inverse([
                (f.x2 + f.x1) / 2,
                (f.y2 + f.y1) / 2,
              ]);
              this.setView(a, b, d, e);
            }
          };
          d.prototype.getField = function (a) {
            void 0 === a && (a = !0);
            a = a ? this.padding : [0, 0, 0, 0];
            return {
              x: a[3],
              y: a[0],
              width: this.chart.plotWidth - a[1] - a[3],
              height: this.chart.plotHeight - a[0] - a[2],
            };
          };
          d.prototype.getGeoMap = function (a) {
            if (r(a)) return n[a];
            if (x(a, !0)) {
              if ('FeatureCollection' === a.type) return a;
              if ('Topology' === a.type) return l(a);
            }
          };
          d.prototype.getMapBBox = function () {
            var a = this.getProjectedBounds(),
              c = this.getScale();
            if (a) {
              var b = this.padding,
                d = this.projectedUnitsToPixels({ x: a.x1, y: a.y2 });
              return {
                width: (a.x2 - a.x1) * c + b[1] + b[3],
                height: (a.y2 - a.y1) * c + b[0] + b[2],
                x: d.x - b[3],
                y: d.y - b[0],
              };
            }
          };
          d.prototype.getProjectedBounds = function () {
            var a = this.chart.series.reduce(function (a, c) {
              var b = c.getProjectedBounds && c.getProjectedBounds();
              b && !1 !== c.options.affectsMapView && a.push(b);
              return a;
            }, []);
            return this.projection.bounds || d.compositeBounds(a);
          };
          d.prototype.getScale = function () {
            return (256 / 400.979322) * Math.pow(2, this.zoom);
          };
          d.prototype.getSVGTransform = function () {
            var a = this.playingField,
              c = a.x,
              b = a.y,
              d = a.width;
            a = a.height;
            var e = this.projection.forward(this.center),
              f = this.projection.hasCoordinates ? -1 : 1,
              g = this.getScale();
            f *= g;
            return {
              scaleX: g,
              scaleY: f,
              translateX: c + d / 2 - e[0] * g,
              translateY: b + a / 2 - e[1] * f,
            };
          };
          d.prototype.lonLatToPixels = function (a) {
            if ((a = this.lonLatToProjectedUnits(a)))
              return this.projectedUnitsToPixels(a);
          };
          d.prototype.lonLatToProjectedUnits = function (c) {
            var b = this.chart,
              d = b.mapTransforms;
            if (d) {
              for (var e in d)
                if (Object.hasOwnProperty.call(d, e) && d[e].hitZone) {
                  var f = b.transformFromLatLon(c, d[e]);
                  if (f && a(f, d[e].hitZone.coordinates[0])) return f;
                }
              return b.transformFromLatLon(c, d['default']);
            }
            d = 0;
            for (e = this.insets; d < e.length; d++)
              if (
                ((b = e[d]),
                b.options.geoBounds &&
                  a({ x: c.lon, y: c.lat }, b.options.geoBounds.coordinates[0]))
              )
                return (
                  (c = b.projection.forward([c.lon, c.lat])),
                  (c = b.projectedUnitsToPixels({ x: c[0], y: c[1] })),
                  this.pixelsToProjectedUnits(c)
                );
            c = this.projection.forward([c.lon, c.lat]);
            if (!c.outside) return { x: c[0], y: c[1] };
          };
          d.prototype.projectedUnitsToLonLat = function (c) {
            var b = this.chart,
              d = b.mapTransforms;
            if (d) {
              for (var e in d)
                if (
                  Object.hasOwnProperty.call(d, e) &&
                  d[e].hitZone &&
                  a(c, d[e].hitZone.coordinates[0])
                )
                  return b.transformToLatLon(c, d[e]);
              return b.transformToLatLon(c, d['default']);
            }
            d = this.projectedUnitsToPixels(c);
            e = 0;
            for (var f = this.insets; e < f.length; e++)
              if (((b = f[e]), b.hitZone && a(d, b.hitZone.coordinates[0])))
                return (
                  (c = b.pixelsToProjectedUnits(d)),
                  (c = b.projection.inverse([c.x, c.y])),
                  { lon: c[0], lat: c[1] }
                );
            c = this.projection.inverse([c.x, c.y]);
            return { lon: c[0], lat: c[1] };
          };
          d.prototype.redraw = function (a) {
            this.chart.series.forEach(function (a) {
              a.useMapGeometry && (a.isDirty = !0);
            });
            this.chart.redraw(a);
          };
          d.prototype.setView = function (a, c, b, d) {
            void 0 === b && (b = !0);
            a && (this.center = a);
            'number' === typeof c &&
              ('number' === typeof this.minZoom &&
                (c = Math.max(c, this.minZoom)),
              'number' === typeof this.options.maxZoom &&
                (c = Math.min(c, this.options.maxZoom)),
              (this.zoom = c));
            var e = this.getProjectedBounds();
            if (e) {
              a = this.projection.forward(this.center);
              var f = this.playingField;
              c = f.x;
              var g = f.y,
                h = f.width;
              f = f.height;
              var k = this.getScale(),
                l = this.projectedUnitsToPixels({ x: e.x1, y: e.y1 }),
                m = this.projectedUnitsToPixels({ x: e.x2, y: e.y2 });
              e = [(e.x1 + e.x2) / 2, (e.y1 + e.y2) / 2];
              var n = l.x,
                p = m.y;
              m = m.x;
              l = l.y;
              m - n < h
                ? (a[0] = e[0])
                : n < c && m < c + h
                  ? (a[0] += Math.max(n - c, m - h - c) / k)
                  : m > c + h &&
                    n > c &&
                    (a[0] += Math.min(m - h - c, n - c) / k);
              l - p < f
                ? (a[1] = e[1])
                : p < g && l < g + f
                  ? (a[1] -= Math.max(p - g, l - f - g) / k)
                  : l > g + f &&
                    p > g &&
                    (a[1] -= Math.min(l - f - g, p - g) / k);
              this.center = this.projection.inverse(a);
              this.insets.forEach(function (a) {
                a.options.field &&
                  ((a.hitZone = a.getHitZone()),
                  (a.playingField = a.getField()));
              });
              this.render();
            }
            G(this, 'afterSetView');
            b && this.redraw(d);
          };
          d.prototype.projectedUnitsToPixels = function (a) {
            var c = this.getScale(),
              b = this.projection.forward(this.center),
              d = this.playingField;
            return {
              x: d.x + d.width / 2 - c * (b[0] - a.x),
              y: d.y + d.height / 2 + c * (b[1] - a.y),
            };
          };
          d.prototype.pixelsToLonLat = function (a) {
            return this.projectedUnitsToLonLat(this.pixelsToProjectedUnits(a));
          };
          d.prototype.pixelsToProjectedUnits = function (a) {
            var c = a.x;
            a = a.y;
            var b = this.getScale(),
              d = this.projection.forward(this.center),
              e = this.playingField;
            return {
              x: d[0] + (c - (e.x + e.width / 2)) / b,
              y: d[1] - (a - (e.y + e.height / 2)) / b,
            };
          };
          d.prototype.setUpEvents = function () {
            var a = this,
              b = this.chart,
              d,
              e,
              g,
              h = function (f) {
                var h = b.pointer.pinchDown,
                  l = a.projection,
                  m = b.mouseDownX,
                  n = b.mouseDownY;
                1 === h.length && ((m = h[0].chartX), (n = h[0].chartY));
                if ('number' === typeof m && 'number' === typeof n) {
                  var p = m + ',' + n,
                    r = f.originalEvent;
                  h = r.chartX;
                  r = r.chartY;
                  p !== e &&
                    ((e = p),
                    (d = a.projection.forward(a.center)),
                    (g = (a.projection.options.rotation || [0, 0]).slice()));
                  p =
                    ((p = l.def && l.def.bounds) && c(p, a.playingField)) ||
                    -Infinity;
                  'Orthographic' === l.options.name &&
                  (a.minZoom || Infinity) < 1.1 * p
                    ? ((l =
                        440 /
                        (a.getScale() * Math.min(b.plotWidth, b.plotHeight))),
                      g &&
                        ((m = (m - h) * l - g[0]),
                        (n = k(-g[1] - (n - r) * l, -80, 80)),
                        (h = a.zoom),
                        a.update({ projection: { rotation: [-m, -n] } }, !1),
                        (a.zoom = h),
                        b.redraw(!1)))
                    : ((l = a.getScale()),
                      (n = a.projection.inverse([
                        d[0] + (m - h) / l,
                        d[1] - (n - r) / l,
                      ])),
                      a.setView(n, void 0, !0, !1));
                  f.preventDefault();
                }
              };
            f(b, 'pan', h);
            f(b, 'touchpan', h);
            f(b, 'selection', function (c) {
              if (c.resetSelection) a.zoomBy();
              else {
                var d = c.x - b.plotLeft,
                  e = c.y - b.plotTop,
                  f = a.pixelsToProjectedUnits({ x: d, y: e }),
                  g = f.y;
                f = f.x;
                d = a.pixelsToProjectedUnits({
                  x: d + c.width,
                  y: e + c.height,
                });
                a.fitToBounds(
                  { x1: f, y1: g, x2: d.x, y2: d.y },
                  void 0,
                  !0,
                  c.originalEvent.touches ? !1 : void 0
                );
                /^touch/.test(c.originalEvent.type) || b.showResetZoom();
                c.preventDefault();
              }
            });
          };
          d.prototype.render = function () {
            this.group ||
              (this.group = this.chart.renderer
                .g('map-view')
                .attr({ zIndex: 4 })
                .add());
          };
          d.prototype.update = function (a, c, b) {
            void 0 === c && (c = !0);
            var d = a.projection;
            d = d && A.toString(d) !== A.toString(this.options.projection);
            var e = !1;
            m(!0, this.userOptions, a);
            m(!0, this.options, a);
            'insets' in a &&
              (this.insets.forEach(function (a) {
                return a.destroy();
              }),
              (this.insets.length = 0),
              (e = !0));
            if (d || e)
              this.chart.series.forEach(function (a) {
                var c = a.transformGroups;
                a.clearBounds && a.clearBounds();
                a.isDirty = !0;
                a.isDirtyData = !0;
                if (e && c) for (; 1 < c.length; ) (a = c.pop()) && a.destroy();
              }),
                d && (this.projection = new A(this.options.projection)),
                e && this.createInsets(),
                a.center || B(a.zoom) || this.fitToBounds(void 0, void 0, !1);
            (a.center || B(a.zoom)) &&
              this.setView(this.options.center, a.zoom, !1);
            c && this.chart.redraw(b);
          };
          d.prototype.zoomBy = function (a, c, b, d) {
            var e = this.chart,
              f = this.projection.forward(this.center);
            c = c ? this.projection.forward(c) : [];
            var g = c[0],
              h = c[1];
            'number' === typeof a
              ? ((a = this.zoom + a),
                (c = void 0),
                b &&
                  ((g = b[0]),
                  (h = b[1]),
                  (b = this.getScale()),
                  (g = g - e.plotLeft - e.plotWidth / 2),
                  (e = h - e.plotTop - e.plotHeight / 2),
                  (g = f[0] + g / b),
                  (h = f[1] + e / b)),
                'number' === typeof g &&
                  'number' === typeof h &&
                  ((b = 1 - Math.pow(2, this.zoom) / Math.pow(2, a)),
                  (g = f[0] - g),
                  (e = f[1] - h),
                  (f[0] -= g * b),
                  (f[1] += e * b),
                  (c = this.projection.inverse(f))),
                this.setView(c, a, void 0, d))
              : this.fitToBounds(void 0, void 0, void 0, d);
          };
          d.compositeBounds = function (a) {
            if (a.length)
              return a.slice(1).reduce(function (a, c) {
                a.x1 = Math.min(a.x1, c.x1);
                a.y1 = Math.min(a.y1, c.y1);
                a.x2 = Math.max(a.x2, c.x2);
                a.y2 = Math.max(a.y2, c.y2);
                return a;
              }, m(a[0]));
          };
          return d;
        })(),
        g = (function (c) {
          function b(a, b) {
            var f = c.call(this, a.chart, b) || this;
            f.id = b.id;
            f.mapView = a;
            f.options = m(e, b);
            f.allBounds = [];
            f.options.geoBounds &&
              ((a = a.projection.path(f.options.geoBounds)),
              (f.geoBoundsProjectedBox = d(a)),
              (f.geoBoundsProjectedPolygon = a.map(function (a) {
                return [a[1] || 0, a[2] || 0];
              })));
            return f;
          }
          z(b, c);
          b.prototype.getField = function (a) {
            void 0 === a && (a = !0);
            var b = this.hitZone;
            if (b) {
              var d = a ? this.padding : [0, 0, 0, 0];
              b = b.coordinates[0];
              var e = b.map(function (a) {
                  return a[0];
                }),
                f = b.map(function (a) {
                  return a[1];
                });
              b = Math.min.apply(0, e) + d[3];
              e = Math.max.apply(0, e) - d[1];
              var g = Math.min.apply(0, f) + d[0];
              d = Math.max.apply(0, f) - d[2];
              if (B(b) && B(g))
                return { x: b, y: g, width: e - b, height: d - g };
            }
            return c.prototype.getField.call(this, a);
          };
          b.prototype.getHitZone = function () {
            var a = this.chart,
              c = this.mapView,
              b = this.options,
              d = (b.field || {}).coordinates;
            if (d) {
              d = d[0];
              if ('percent' === b.units) {
                var e =
                  ('mapBoundingBox' === b.relativeTo && c.getMapBBox()) ||
                  m(a.plotBox, { x: 0, y: 0 });
                d = d.map(function (a) {
                  return [
                    p(a[0] + '%', e.width, e.x),
                    p(a[1] + '%', e.height, e.y),
                  ];
                });
              }
              return { type: 'Polygon', coordinates: [d] };
            }
          };
          b.prototype.getProjectedBounds = function () {
            return w.compositeBounds(this.allBounds);
          };
          b.prototype.isInside = function (c) {
            var b = this.geoBoundsProjectedBox,
              d = this.geoBoundsProjectedPolygon;
            return !!(
              b &&
              c.x >= b.x1 &&
              c.x <= b.x2 &&
              c.y >= b.y1 &&
              c.y <= b.y2 &&
              d &&
              a(c, d)
            );
          };
          b.prototype.render = function () {
            var a = this.chart,
              c = this.mapView,
              b = this.options,
              d = b.borderPath || b.field;
            if (d && c.group) {
              var e = !0;
              this.border ||
                ((this.border = a.renderer
                  .path()
                  .addClass('highcharts-mapview-inset-border')
                  .add(c.group)),
                (e = !1));
              a.styledMode ||
                this.border.attr({
                  stroke: b.borderColor,
                  'stroke-width': b.borderWidth,
                });
              var f = (Math.round(this.border.strokeWidth()) % 2) / 2,
                g =
                  ('mapBoundingBox' === b.relativeTo && c.getMapBBox()) ||
                  c.playingField;
              c = (d.coordinates || []).reduce(function (c, d) {
                return d.reduce(function (c, d, e) {
                  var h = d[0];
                  d = d[1];
                  'percent' === b.units &&
                    ((h = a.plotLeft + p(h + '%', g.width, g.x)),
                    (d = a.plotTop + p(d + '%', g.height, g.y)));
                  h = Math.floor(h) + f;
                  d = Math.floor(d) + f;
                  c.push(0 === e ? ['M', h, d] : ['L', h, d]);
                  return c;
                }, c);
              }, []);
              this.border[e ? 'animate' : 'attr']({ d: c });
            }
          };
          b.prototype.destroy = function () {
            this.border && (this.border = this.border.destroy());
            this.eventsToUnbind.forEach(function (a) {
              return a();
            });
          };
          b.prototype.setUpEvents = function () {};
          return b;
        })(w);
      f(E, 'afterInit', function () {
        this.mapView = new w(this, this.options.mapView);
      });
      return w;
    }
  );
  J(
    e,
    'Series/Map/MapSeries.js',
    [
      e['Core/Animation/AnimationUtilities.js'],
      e['Series/ColorMapMixin.js'],
      e['Series/CenteredUtilities.js'],
      e['Core/Globals.js'],
      e['Core/Legend/LegendSymbol.js'],
      e['Core/Chart/MapChart.js'],
      e['Series/Map/MapPoint.js'],
      e['Maps/MapView.js'],
      e['Core/Series/Series.js'],
      e['Core/Series/SeriesRegistry.js'],
      e['Core/Renderer/SVG/SVGRenderer.js'],
      e['Core/Utilities.js'],
    ],
    function (b, e, v, E, t, A, C, z, q, l, n, d) {
      var a =
          (this && this.__extends) ||
          (function () {
            var a = function (c, b) {
              a =
                Object.setPrototypeOf ||
                ({ __proto__: [] } instanceof Array &&
                  function (a, c) {
                    a.__proto__ = c;
                  }) ||
                function (a, c) {
                  for (var b in c) c.hasOwnProperty(b) && (a[b] = c[b]);
                };
              return a(c, b);
            };
            return function (c, b) {
              function d() {
                this.constructor = c;
              }
              a(c, b);
              c.prototype =
                null === b
                  ? Object.create(b)
                  : ((d.prototype = b.prototype), new d());
            };
          })(),
        f = b.animObject;
      b = E.noop;
      var k = A.splitPath;
      A = l.seriesTypes;
      var G = A.column,
        y = A.scatter;
      A = d.extend;
      var B = d.find,
        x = d.fireEvent,
        r = d.getNestedProperty,
        m = d.isArray,
        h = d.isNumber,
        p = d.isObject,
        c = d.merge,
        w = d.objectEach,
        g = d.pick,
        F = d.splat;
      d = (function (b) {
        function d() {
          var a = (null !== b && b.apply(this, arguments)) || this;
          a.chart = void 0;
          a.data = void 0;
          a.group = void 0;
          a.joinBy = void 0;
          a.options = void 0;
          a.points = void 0;
          a.processedData = [];
          return a;
        }
        a(d, b);
        d.prototype.animate = function (a) {
          var c = this.chart,
            b = this.group,
            d = f(this.options.animation);
          c.renderer.isSVG &&
            (a
              ? b.attr({
                  translateX: c.plotLeft + c.plotWidth / 2,
                  translateY: c.plotTop + c.plotHeight / 2,
                  scaleX: 0.001,
                  scaleY: 0.001,
                })
              : b.animate(
                  {
                    translateX: c.plotLeft,
                    translateY: c.plotTop,
                    scaleX: 1,
                    scaleY: 1,
                  },
                  d
                ));
        };
        d.prototype.animateDrilldown = function (a) {
          var c = this.chart,
            b = this.group;
          c.renderer.isSVG &&
            (a
              ? b.attr({
                  translateX: c.plotLeft + c.plotWidth / 2,
                  translateY: c.plotTop + c.plotHeight / 2,
                  scaleX: 0.1,
                  scaleY: 0.1,
                  opacity: 0.01,
                })
              : (b.animate(
                  {
                    translateX: c.plotLeft,
                    translateY: c.plotTop,
                    scaleX: 1,
                    scaleY: 1,
                    opacity: 1,
                  },
                  this.chart.options.drilldown.animation
                ),
                c.drilldown && c.drilldown.fadeInGroup(this.dataLabelsGroup)));
        };
        d.prototype.animateDrillupFrom = function () {
          var a = this.chart;
          a.renderer.isSVG &&
            this.group.animate({
              translateX: a.plotLeft + a.plotWidth / 2,
              translateY: a.plotTop + a.plotHeight / 2,
              scaleX: 0.1,
              scaleY: 0.1,
              opacity: 0.01,
            });
        };
        d.prototype.animateDrillupTo = function (a) {
          G.prototype.animateDrillupTo.call(this, a);
        };
        d.prototype.clearBounds = function () {
          this.points.forEach(function (a) {
            delete a.bounds;
            delete a.insetIndex;
            delete a.projectedPath;
          });
          delete this.bounds;
        };
        d.prototype.doFullTranslate = function () {
          return !(
            !(
              this.isDirtyData ||
              this.chart.isResizing ||
              this.chart.renderer.isVML
            ) && this.hasRendered
          );
        };
        d.prototype.drawMapDataLabels = function () {
          q.prototype.drawDataLabels.call(this);
          this.dataLabelsGroup &&
            this.dataLabelsGroup.clip(this.chart.clipRect);
        };
        d.prototype.drawPoints = function () {
          var a = this,
            c = this.chart,
            b = this.group,
            d = this.transformGroups,
            e = void 0 === d ? [] : d,
            f = c.mapView,
            h = c.renderer;
          f &&
            ((this.transformGroups = e),
            e[0] || (e[0] = h.g().add(b)),
            f.insets.forEach(function (a, c) {
              e[c + 1] || e.push(h.g().add(b));
            }),
            this.doFullTranslate() &&
              (this.points.forEach(function (b) {
                var d = b.graphic,
                  f = b.shapeArgs;
                b.group =
                  e['number' === typeof b.insetIndex ? b.insetIndex + 1 : 0];
                d && d.parentGroup !== b.group && d.add(b.group);
                f &&
                  c.hasRendered &&
                  !c.styledMode &&
                  (f.fill = a.pointAttribs(b, b.state).fill);
              }),
              G.prototype.drawPoints.apply(this),
              this.points.forEach(function (b) {
                if (b.graphic) {
                  var d = '';
                  b.name &&
                    (d +=
                      'highcharts-name-' +
                      b.name.replace(/ /g, '-').toLowerCase());
                  b.properties &&
                    b.properties['hc-key'] &&
                    (d +=
                      ' highcharts-key-' +
                      b.properties['hc-key'].toString().toLowerCase());
                  d && b.graphic.addClass(d);
                  c.styledMode &&
                    b.graphic.css(
                      a.pointAttribs(b, (b.selected && 'select') || void 0)
                    );
                }
              })),
            e.forEach(function (b, d) {
              var e = (0 === d ? f : f.insets[d - 1]).getSVGTransform(),
                k = g(
                  a.options[
                    (a.pointAttrToOptions &&
                      a.pointAttrToOptions['stroke-width']) ||
                      'borderWidth'
                  ],
                  1
                ),
                l = e.scaleX,
                m = 0 < e.scaleY ? 1 : -1;
              if (h.globalAnimation && c.hasRendered) {
                var n = Number(b.attr('translateX')),
                  p = Number(b.attr('translateY')),
                  r = Number(b.attr('scaleX'));
                b.attr({ animator: 0 }).animate(
                  { animator: 1 },
                  {
                    step: function (a, c) {
                      a = r + (l - r) * c.pos;
                      b.attr({
                        translateX: n + (e.translateX - n) * c.pos,
                        translateY: p + (e.translateY - p) * c.pos,
                        scaleX: a,
                        scaleY: a * m,
                      });
                      b.element.setAttribute('stroke-width', k / a);
                    },
                  }
                );
              } else b.attr(e), b.element.setAttribute('stroke-width', k / l);
            }),
            this.drawMapDataLabels());
        };
        d.prototype.getProjectedBounds = function () {
          if (!this.bounds && this.chart.mapView) {
            var a = this.chart.mapView,
              c = a.insets,
              b = a.projection,
              d = [];
            (this.points || []).forEach(function (a) {
              if (a.path || a.geometry) {
                'string' === typeof a.path
                  ? (a.path = k(a.path))
                  : m(a.path) &&
                    'M' === a.path[0] &&
                    (a.path = n.prototype.pathToSegments(a.path));
                if (!a.bounds) {
                  var e = a.getProjectedBounds(b);
                  if (e) {
                    a.labelrank = g(a.labelrank, (e.x2 - e.x1) * (e.y2 - e.y1));
                    var f = e.midX,
                      l = e.midY;
                    if (c && h(f) && h(l)) {
                      var p = B(c, function (a) {
                        return a.isInside({ x: f, y: l });
                      });
                      p &&
                        (delete a.projectedPath,
                        (e = a.getProjectedBounds(p.projection)) &&
                          p.allBounds.push(e),
                        (a.insetIndex = c.indexOf(p)));
                    }
                    a.bounds = e;
                  }
                }
                a.bounds && void 0 === a.insetIndex && d.push(a.bounds);
              }
            });
            this.bounds = z.compositeBounds(d);
          }
          return this.bounds;
        };
        d.prototype.hasData = function () {
          return !!this.processedXData.length;
        };
        d.prototype.pointAttribs = function (a, c) {
          var b = a.series.chart,
            d = b.mapView;
          c = b.styledMode
            ? this.colorAttribs(a)
            : G.prototype.pointAttribs.call(this, a, c);
          (a =
            a.options[
              (this.pointAttrToOptions &&
                this.pointAttrToOptions['stroke-width']) ||
                'borderWidth'
            ]) &&
            d &&
            (a /= d.getScale());
          c.dashstyle &&
            d &&
            this.options.borderWidth &&
            (a = this.options.borderWidth / d.getScale());
          c['stroke-width'] = g(a, 'inherit');
          return c;
        };
        d.prototype.setData = function () {
          b.prototype.setData.apply(this, arguments);
          this.processData();
          this.generatePoints();
        };
        d.prototype.processData = function () {
          var a = this.options,
            b = a.data,
            d = this.chart.options.chart,
            e = this.joinBy,
            f = a.keys || this.pointArrayMap,
            g = [],
            k = {},
            l = this.chart.mapView;
          l = l && (p(a.mapData, !0) ? l.getGeoMap(a.mapData) : l.geoMap);
          var n = this.chart.mapTransforms;
          (this.chart.mapTransforms = n =
            d.mapTransforms || (l && l['hc-transform']) || n) &&
            w(n, function (a) {
              a.rotation &&
                ((a.cosAngle = Math.cos(a.rotation)),
                (a.sinAngle = Math.sin(a.rotation)));
            });
          if (m(a.mapData)) var q = a.mapData;
          else
            l &&
              'FeatureCollection' === l.type &&
              ((this.mapTitle = l.title), (q = E.geojson(l, this.type, this)));
          var u = (this.processedData = []);
          b &&
            b.forEach(function (c, d) {
              var g = 0;
              if (h(c)) u[d] = { value: c };
              else if (m(c)) {
                u[d] = {};
                !a.keys &&
                  c.length > f.length &&
                  'string' === typeof c[0] &&
                  ((u[d]['hc-key'] = c[0]), ++g);
                for (var k = 0; k < f.length; ++k, ++g)
                  f[k] &&
                    'undefined' !== typeof c[g] &&
                    (0 < f[k].indexOf('.')
                      ? C.prototype.setNestedProperty(u[d], c[g], f[k])
                      : (u[d][f[k]] = c[g]));
              } else u[d] = b[d];
              e && '_i' === e[0] && (u[d]._i = d);
            });
          if (q) {
            this.mapData = q;
            this.mapMap = {};
            for (n = 0; n < q.length; n++)
              (d = q[n]),
                (l = d.properties),
                (d._i = n),
                e[0] && l && l[e[0]] && (d[e[0]] = l[e[0]]),
                (k[d[e[0]]] = d);
            this.mapMap = k;
            if (e[1]) {
              var t = e[1];
              u.forEach(function (a) {
                a = r(t, a);
                k[a] && g.push(k[a]);
              });
            }
            if (a.allAreas) {
              if (e[1]) {
                var x = e[1];
                u.forEach(function (a) {
                  g.push(r(x, a));
                });
              }
              var y =
                '|' +
                g
                  .map(function (a) {
                    return a && a[e[0]];
                  })
                  .join('|') +
                '|';
              q.forEach(function (a) {
                (e[0] && -1 !== y.indexOf('|' + a[e[0]] + '|')) ||
                  u.push(c(a, { value: null }));
              });
            }
          }
          this.processedXData = Array(u.length);
        };
        d.prototype.setOptions = function (a) {
          a = q.prototype.setOptions.call(this, a);
          var c = a.joinBy;
          null === c && (c = '_i');
          c = this.joinBy = F(c);
          c[1] || (c[1] = c[0]);
          return a;
        };
        d.prototype.translate = function () {
          var a = this.doFullTranslate(),
            c = this.chart.mapView,
            b = c && c.projection;
          !this.chart.hasRendered ||
            (!this.isDirtyData && this.hasRendered) ||
            (this.processData(),
            this.generatePoints(),
            delete this.bounds,
            this.getProjectedBounds());
          if (c) {
            var d = c.getSVGTransform();
            this.points.forEach(function (e) {
              var f =
                (h(e.insetIndex) && c.insets[e.insetIndex].getSVGTransform()) ||
                d;
              f &&
                e.bounds &&
                h(e.bounds.midX) &&
                h(e.bounds.midY) &&
                ((e.plotX = e.bounds.midX * f.scaleX + f.translateX),
                (e.plotY = e.bounds.midY * f.scaleY + f.translateY));
              a &&
                ((e.shapeType = 'path'),
                (e.shapeArgs = { d: C.getProjectedPath(e, b) }));
            });
          }
          x(this, 'afterTranslate');
        };
        d.defaultOptions = c(y.defaultOptions, {
          affectsMapView: !0,
          animation: !1,
          dataLabels: {
            crop: !1,
            formatter: function () {
              var a = this.series.chart.numberFormatter,
                c = this.point.value;
              return h(c) ? a(c, -1) : '';
            },
            inside: !0,
            overflow: !1,
            padding: 0,
            verticalAlign: 'middle',
          },
          marker: null,
          nullColor: '#f7f7f7',
          stickyTracking: !1,
          tooltip: {
            followPointer: !0,
            pointFormat: '{point.name}: {point.value}<br/>',
          },
          turboThreshold: 0,
          allAreas: !0,
          borderColor: '#cccccc',
          borderWidth: 1,
          joinBy: 'hc-key',
          states: {
            hover: { halo: null, brightness: 0.2 },
            normal: { animation: !0 },
            select: { color: '#cccccc' },
            inactive: { opacity: 1 },
          },
        });
        return d;
      })(y);
      A(d.prototype, {
        type: 'map',
        axisTypes: e.SeriesMixin.axisTypes,
        colorAttribs: e.SeriesMixin.colorAttribs,
        colorKey: e.SeriesMixin.colorKey,
        directTouch: !0,
        drawDataLabels: b,
        drawGraph: b,
        drawLegendSymbol: t.drawRectangle,
        forceDL: !0,
        getCenter: v.getCenter,
        getExtremesFromAll: !0,
        getSymbol: e.SeriesMixin.getSymbol,
        isCartesian: !1,
        parallelArrays: e.SeriesMixin.parallelArrays,
        pointArrayMap: e.SeriesMixin.pointArrayMap,
        pointClass: C,
        preserveAspectRatio: !0,
        searchPoint: b,
        trackerGroups: e.SeriesMixin.trackerGroups,
        useMapGeometry: !0,
      });
      l.registerSeriesType('map', d);
      ('');
      return d;
    }
  );
  J(
    e,
    'Series/MapLine/MapLineSeries.js',
    [
      e['Series/Map/MapSeries.js'],
      e['Core/Series/SeriesRegistry.js'],
      e['Core/Utilities.js'],
    ],
    function (b, e, v) {
      var E =
          (this && this.__extends) ||
          (function () {
            var b = function (e, l) {
              b =
                Object.setPrototypeOf ||
                ({ __proto__: [] } instanceof Array &&
                  function (b, d) {
                    b.__proto__ = d;
                  }) ||
                function (b, d) {
                  for (var a in d) d.hasOwnProperty(a) && (b[a] = d[a]);
                };
              return b(e, l);
            };
            return function (e, l) {
              function n() {
                this.constructor = e;
              }
              b(e, l);
              e.prototype =
                null === l
                  ? Object.create(l)
                  : ((n.prototype = l.prototype), new n());
            };
          })(),
        t = e.series,
        A = v.extend,
        C = v.merge;
      v = (function (e) {
        function q() {
          var b = (null !== e && e.apply(this, arguments)) || this;
          b.data = void 0;
          b.options = void 0;
          b.points = void 0;
          return b;
        }
        E(q, e);
        q.prototype.pointAttribs = function (e, n) {
          e = b.prototype.pointAttribs.call(this, e, n);
          e.fill = this.options.fillColor;
          return e;
        };
        q.defaultOptions = C(b.defaultOptions, {
          lineWidth: 1,
          fillColor: 'none',
        });
        return q;
      })(b);
      A(v.prototype, {
        type: 'mapline',
        colorProp: 'stroke',
        drawLegendSymbol: t.prototype.drawLegendSymbol,
        pointAttrToOptions: { stroke: 'color', 'stroke-width': 'lineWidth' },
      });
      e.registerSeriesType('mapline', v);
      ('');
      return v;
    }
  );
  J(
    e,
    'Series/MapPoint/MapPointPoint.js',
    [e['Core/Series/SeriesRegistry.js'], e['Core/Utilities.js']],
    function (b, e) {
      var v =
          (this && this.__extends) ||
          (function () {
            var b = function (e, t) {
              b =
                Object.setPrototypeOf ||
                ({ __proto__: [] } instanceof Array &&
                  function (b, e) {
                    b.__proto__ = e;
                  }) ||
                function (b, e) {
                  for (var l in e) e.hasOwnProperty(l) && (b[l] = e[l]);
                };
              return b(e, t);
            };
            return function (e, t) {
              function v() {
                this.constructor = e;
              }
              b(e, t);
              e.prototype =
                null === t
                  ? Object.create(t)
                  : ((v.prototype = t.prototype), new v());
            };
          })(),
        E = e.isNumber;
      return (function (b) {
        function e() {
          var e = (null !== b && b.apply(this, arguments)) || this;
          e.options = void 0;
          e.series = void 0;
          return e;
        }
        v(e, b);
        e.prototype.isValid = function () {
          return !!(
            this.options.geometry ||
            (E(this.x) && E(this.y)) ||
            (E(this.options.lon) && E(this.options.lat))
          );
        };
        return e;
      })(b.seriesTypes.scatter.prototype.pointClass);
    }
  );
  J(
    e,
    'Series/MapPoint/MapPointSeries.js',
    [
      e['Core/Globals.js'],
      e['Series/MapPoint/MapPointPoint.js'],
      e['Core/Series/SeriesRegistry.js'],
      e['Core/Utilities.js'],
    ],
    function (b, e, v, E) {
      var t =
        (this && this.__extends) ||
        (function () {
          var b = function (d, a) {
            b =
              Object.setPrototypeOf ||
              ({ __proto__: [] } instanceof Array &&
                function (a, b) {
                  a.__proto__ = b;
                }) ||
              function (a, b) {
                for (var d in b) b.hasOwnProperty(d) && (a[d] = b[d]);
              };
            return b(d, a);
          };
          return function (d, a) {
            function e() {
              this.constructor = d;
            }
            b(d, a);
            d.prototype =
              null === a
                ? Object.create(a)
                : ((e.prototype = a.prototype), new e());
          };
        })();
      b = b.noop;
      var A = v.seriesTypes.scatter,
        C = E.extend,
        z = E.fireEvent,
        q = E.isNumber,
        l = E.merge;
      E = (function (b) {
        function d() {
          var a = (null !== b && b.apply(this, arguments)) || this;
          a.chart = void 0;
          a.data = void 0;
          a.options = void 0;
          a.points = void 0;
          return a;
        }
        t(d, b);
        d.prototype.drawDataLabels = function () {
          b.prototype.drawDataLabels.call(this);
          this.dataLabelsGroup &&
            this.dataLabelsGroup.clip(this.chart.clipRect);
        };
        d.prototype.projectPoint = function (a) {
          var b = this.chart.mapView;
          if (b) {
            var d = a.geometry,
              e = a.lon;
            a = a.lat;
            d = d && 'Point' === d.type && d.coordinates;
            q(e) && q(a) && (d = [e, a]);
            if (d) return b.lonLatToProjectedUnits({ lon: d[0], lat: d[1] });
          }
        };
        d.prototype.translate = function () {
          var a = this,
            b = this.chart.mapView;
          this.processedXData || this.processData();
          this.generatePoints();
          if (b) {
            var d = b.projection.hasCoordinates;
            this.points.forEach(function (e) {
              var f = e.x;
              f = void 0 === f ? void 0 : f;
              var k = e.y;
              k = void 0 === k ? void 0 : k;
              var l = a.projectPoint(e.options);
              l
                ? ((f = l.x), (k = l.y))
                : e.bounds && ((f = e.bounds.midX), (k = e.bounds.midY));
              q(f) && q(k)
                ? ((f = b.projectedUnitsToPixels({ x: f, y: k })),
                  (e.plotX = f.x),
                  (e.plotY = d ? f.y : a.chart.plotHeight - f.y))
                : (e.y = e.plotX = e.plotY = void 0);
              e.isInside = a.isPointInside(e);
              e.zone = a.zones.length ? e.getZone() : void 0;
            });
          }
          z(this, 'afterTranslate');
        };
        d.defaultOptions = l(A.defaultOptions, {
          dataLabels: {
            crop: !1,
            defer: !1,
            enabled: !0,
            formatter: function () {
              return this.point.name;
            },
            overflow: !1,
            style: { color: '#000000' },
          },
        });
        return d;
      })(A);
      C(E.prototype, {
        type: 'mappoint',
        axisTypes: ['colorAxis'],
        forceDL: !0,
        isCartesian: !1,
        pointClass: e,
        searchPoint: b,
        useMapGeometry: !0,
      });
      v.registerSeriesType('mappoint', E);
      ('');
      return E;
    }
  );
  J(e, 'Series/Bubble/BubbleLegendDefaults.js', [], function () {
    return {
      borderColor: void 0,
      borderWidth: 2,
      className: void 0,
      color: void 0,
      connectorClassName: void 0,
      connectorColor: void 0,
      connectorDistance: 60,
      connectorWidth: 1,
      enabled: !1,
      labels: {
        className: void 0,
        allowOverlap: !1,
        format: '',
        formatter: void 0,
        align: 'right',
        style: { fontSize: '10px', color: '#000000' },
        x: 0,
        y: 0,
      },
      maxSize: 60,
      minSize: 10,
      legendIndex: 0,
      ranges: {
        value: void 0,
        borderColor: void 0,
        color: void 0,
        connectorColor: void 0,
      },
      sizeBy: 'area',
      sizeByAbsoluteValue: !1,
      zIndex: 1,
      zThreshold: 0,
    };
  });
  J(
    e,
    'Series/Bubble/BubbleLegendItem.js',
    [
      e['Core/Color/Color.js'],
      e['Core/FormatUtilities.js'],
      e['Core/Globals.js'],
      e['Core/Utilities.js'],
    ],
    function (b, e, v, E) {
      var t = b.parse,
        A = v.noop,
        C = E.arrayMax,
        z = E.arrayMin,
        q = E.isNumber,
        l = E.merge,
        n = E.pick,
        d = E.stableSort;
      ('');
      return (function () {
        function a(a, b) {
          this.options =
            this.symbols =
            this.visible =
            this.selected =
            this.ranges =
            this.movementX =
            this.maxLabel =
            this.legendSymbol =
            this.legendItemWidth =
            this.legendItemHeight =
            this.legendItem =
            this.legendGroup =
            this.legend =
            this.fontMetrics =
            this.chart =
              void 0;
          this.setState = A;
          this.init(a, b);
        }
        a.prototype.init = function (a, b) {
          this.options = a;
          this.visible = !0;
          this.chart = b.chart;
          this.legend = b;
        };
        a.prototype.addToLegend = function (a) {
          a.splice(this.options.legendIndex, 0, this);
        };
        a.prototype.drawLegendSymbol = function (a) {
          var b = this.chart,
            e = this.options,
            f = n(a.options.itemDistance, 20),
            l = e.ranges,
            t = e.connectorDistance;
          this.fontMetrics = b.renderer.fontMetrics(e.labels.style.fontSize);
          l && l.length && q(l[0].value)
            ? (d(l, function (a, b) {
                return b.value - a.value;
              }),
              (this.ranges = l),
              this.setOptions(),
              this.render(),
              (a = this.getMaxLabelSize()),
              (l = this.ranges[0].radius),
              (b = 2 * l),
              (t = t - l + a.width),
              (t = 0 < t ? t : 0),
              (this.maxLabel = a),
              (this.movementX = 'left' === e.labels.align ? t : 0),
              (this.legendItemWidth = b + t + f),
              (this.legendItemHeight = b + this.fontMetrics.h / 2))
            : (a.options.bubbleLegend.autoRanges = !0);
        };
        a.prototype.setOptions = function () {
          var a = this.ranges,
            b = this.options,
            d = this.chart.series[b.seriesIndex],
            e = this.legend.baseline,
            q = { zIndex: b.zIndex, 'stroke-width': b.borderWidth },
            x = { zIndex: b.zIndex, 'stroke-width': b.connectorWidth },
            r = {
              align:
                this.legend.options.rtl || 'left' === b.labels.align
                  ? 'right'
                  : 'left',
              zIndex: b.zIndex,
            },
            m = d.options.marker.fillOpacity,
            h = this.chart.styledMode;
          a.forEach(function (f, c) {
            h ||
              ((q.stroke = n(f.borderColor, b.borderColor, d.color)),
              (q.fill = n(
                f.color,
                b.color,
                1 !== m ? t(d.color).setOpacity(m).get('rgba') : d.color
              )),
              (x.stroke = n(f.connectorColor, b.connectorColor, d.color)));
            a[c].radius = this.getRangeRadius(f.value);
            a[c] = l(a[c], { center: a[0].radius - a[c].radius + e });
            h ||
              l(!0, a[c], {
                bubbleAttribs: l(q),
                connectorAttribs: l(x),
                labelAttribs: r,
              });
          }, this);
        };
        a.prototype.getRangeRadius = function (a) {
          var b = this.options;
          return this.chart.series[this.options.seriesIndex].getRadius.call(
            this,
            b.ranges[b.ranges.length - 1].value,
            b.ranges[0].value,
            b.minSize,
            b.maxSize,
            a
          );
        };
        a.prototype.render = function () {
          var a = this.chart.renderer,
            b = this.options.zThreshold;
          this.symbols ||
            (this.symbols = { connectors: [], bubbleItems: [], labels: [] });
          this.legendSymbol = a.g('bubble-legend');
          this.legendItem = a.g('bubble-legend-item');
          this.legendSymbol.translateX = 0;
          this.legendSymbol.translateY = 0;
          this.ranges.forEach(function (a) {
            a.value >= b && this.renderRange(a);
          }, this);
          this.legendSymbol.add(this.legendItem);
          this.legendItem.add(this.legendGroup);
          this.hideOverlappingLabels();
        };
        a.prototype.renderRange = function (a) {
          var b = this.options,
            d = b.labels,
            e = this.chart,
            f = e.series[b.seriesIndex],
            l = e.renderer,
            n = this.symbols;
          e = n.labels;
          var m = a.center,
            h = Math.abs(a.radius),
            p = b.connectorDistance || 0,
            c = d.align,
            q = b.connectorWidth,
            g = this.ranges[0].radius || 0,
            t = m - h - b.borderWidth / 2 + q / 2,
            u = this.fontMetrics;
          u = u.f / 2 - (u.h - u.f) / 2;
          var v = l.styledMode;
          p = this.legend.options.rtl || 'left' === c ? -p : p;
          'center' === c &&
            ((p = 0),
            (b.connectorDistance = 0),
            (a.labelAttribs.align = 'center'));
          c = t + b.labels.y;
          var z = g + p + b.labels.x;
          n.bubbleItems.push(
            l
              .circle(g, m + ((t % 1 ? 1 : 0.5) - (q % 2 ? 0 : 0.5)), h)
              .attr(v ? {} : a.bubbleAttribs)
              .addClass(
                (v ? 'highcharts-color-' + f.colorIndex + ' ' : '') +
                  'highcharts-bubble-legend-symbol ' +
                  (b.className || '')
              )
              .add(this.legendSymbol)
          );
          n.connectors.push(
            l
              .path(
                l.crispLine(
                  [
                    ['M', g, t],
                    ['L', g + p, t],
                  ],
                  b.connectorWidth
                )
              )
              .attr(v ? {} : a.connectorAttribs)
              .addClass(
                (v
                  ? 'highcharts-color-' + this.options.seriesIndex + ' '
                  : '') +
                  'highcharts-bubble-legend-connectors ' +
                  (b.connectorClassName || '')
              )
              .add(this.legendSymbol)
          );
          a = l
            .text(this.formatLabel(a), z, c + u)
            .attr(v ? {} : a.labelAttribs)
            .css(v ? {} : d.style)
            .addClass(
              'highcharts-bubble-legend-labels ' + (b.labels.className || '')
            )
            .add(this.legendSymbol);
          e.push(a);
          a.placed = !0;
          a.alignAttr = { x: z, y: c + u };
        };
        a.prototype.getMaxLabelSize = function () {
          var a, b;
          this.symbols.labels.forEach(function (d) {
            b = d.getBBox(!0);
            a = a ? (b.width > a.width ? b : a) : b;
          });
          return a || {};
        };
        a.prototype.formatLabel = function (a) {
          var b = this.options,
            d = b.labels.formatter;
          b = b.labels.format;
          var f = this.chart.numberFormatter;
          return b ? e.format(b, a) : d ? d.call(a) : f(a.value, 1);
        };
        a.prototype.hideOverlappingLabels = function () {
          var a = this.chart,
            b = this.symbols;
          !this.options.labels.allowOverlap &&
            b &&
            (a.hideOverlappingLabels(b.labels),
            b.labels.forEach(function (a, d) {
              a.newOpacity
                ? a.newOpacity !== a.oldOpacity && b.connectors[d].show()
                : b.connectors[d].hide();
            }));
        };
        a.prototype.getRanges = function () {
          var a = this.legend.bubbleLegend,
            b = a.options.ranges,
            d,
            e = Number.MAX_VALUE,
            t = -Number.MAX_VALUE;
          a.chart.series.forEach(function (a) {
            a.isBubble &&
              !a.ignoreSeries &&
              ((d = a.zData.filter(q)),
              d.length &&
                ((e = n(
                  a.options.zMin,
                  Math.min(
                    e,
                    Math.max(
                      z(d),
                      !1 === a.options.displayNegative
                        ? a.options.zThreshold
                        : -Number.MAX_VALUE
                    )
                  )
                )),
                (t = n(a.options.zMax, Math.max(t, C(d))))));
          });
          var x =
            e === t
              ? [{ value: t }]
              : [
                  { value: e },
                  { value: (e + t) / 2 },
                  { value: t, autoRanges: !0 },
                ];
          b.length && b[0].radius && x.reverse();
          x.forEach(function (a, d) {
            b && b[d] && (x[d] = l(b[d], a));
          });
          return x;
        };
        a.prototype.predictBubbleSizes = function () {
          var a = this.chart,
            b = this.fontMetrics,
            d = a.legend.options,
            e = d.floating,
            l = (d = 'horizontal' === d.layout) ? a.legend.lastLineHeight : 0,
            n = a.plotSizeX,
            r = a.plotSizeY,
            m = a.series[this.options.seriesIndex],
            h = m.getPxExtremes();
          a = Math.ceil(h.minPxSize);
          h = Math.ceil(h.maxPxSize);
          var p = Math.min(r, n);
          m = m.options.maxSize;
          if (e || !/%$/.test(m)) b = h;
          else if (
            ((m = parseFloat(m)),
            (b = ((p + l - b.h / 2) * m) / 100 / (m / 100 + 1)),
            (d && r - b >= n) || (!d && n - b >= r))
          )
            b = h;
          return [a, Math.ceil(b)];
        };
        a.prototype.updateRanges = function (a, b) {
          var d = this.legend.options.bubbleLegend;
          d.minSize = a;
          d.maxSize = b;
          d.ranges = this.getRanges();
        };
        a.prototype.correctSizes = function () {
          var a = this.legend,
            b = this.chart.series[this.options.seriesIndex].getPxExtremes();
          1 < Math.abs(Math.ceil(b.maxPxSize) - this.options.maxSize) &&
            (this.updateRanges(this.options.minSize, b.maxPxSize), a.render());
        };
        return a;
      })();
    }
  );
  J(
    e,
    'Series/Bubble/BubbleLegendComposition.js',
    [
      e['Series/Bubble/BubbleLegendDefaults.js'],
      e['Series/Bubble/BubbleLegendItem.js'],
      e['Core/DefaultOptions.js'],
      e['Core/Utilities.js'],
    ],
    function (b, e, v, E) {
      var t = v.setOptions,
        A = E.addEvent,
        C = E.objectEach,
        z = E.wrap,
        q;
      (function (l) {
        function n(b, e, f) {
          var k = this.legend,
            h = 0 <= d(this);
          if (
            k &&
            k.options.enabled &&
            k.bubbleLegend &&
            k.options.bubbleLegend.autoRanges &&
            h
          ) {
            var l = k.bubbleLegend.options;
            h = k.bubbleLegend.predictBubbleSizes();
            k.bubbleLegend.updateRanges(h[0], h[1]);
            l.placed ||
              ((k.group.placed = !1),
              k.allItems.forEach(function (a) {
                a.legendGroup.translateY = null;
              }));
            k.render();
            this.getMargins();
            this.axes.forEach(function (a) {
              a.visible && a.render();
              l.placed ||
                (a.setScale(),
                a.updateNames(),
                C(a.ticks, function (a) {
                  a.isNew = !0;
                  a.isNewLabel = !0;
                }));
            });
            l.placed = !0;
            this.getMargins();
            b.call(this, e, f);
            k.bubbleLegend.correctSizes();
            q(k, a(k));
          } else
            b.call(this, e, f),
              k &&
                k.options.enabled &&
                k.bubbleLegend &&
                (k.render(), q(k, a(k)));
        }
        function d(a) {
          a = a.series;
          for (var b = 0; b < a.length; ) {
            if (a[b] && a[b].isBubble && a[b].visible && a[b].zData.length)
              return b;
            b++;
          }
          return -1;
        }
        function a(a) {
          a = a.allItems;
          var b = [],
            d = a.length,
            e,
            f = 0;
          for (e = 0; e < d; e++)
            if (
              (a[e].legendItemHeight &&
                (a[e].itemHeight = a[e].legendItemHeight),
              a[e] === a[d - 1] ||
                (a[e + 1] &&
                  a[e]._legendItemPos[1] !== a[e + 1]._legendItemPos[1]))
            ) {
              b.push({ height: 0 });
              var k = b[b.length - 1];
              for (f; f <= e; f++)
                a[f].itemHeight > k.height && (k.height = a[f].itemHeight);
              k.step = e;
            }
          return b;
        }
        function f(a) {
          var b = this.bubbleLegend,
            f = this.options,
            k = f.bubbleLegend,
            h = d(this.chart);
          b &&
            b.ranges &&
            b.ranges.length &&
            (k.ranges.length && (k.autoRanges = !!k.ranges[0].autoRanges),
            this.destroyItem(b));
          0 <= h &&
            f.enabled &&
            k.enabled &&
            ((k.seriesIndex = h),
            (this.bubbleLegend = new e(k, this)),
            this.bubbleLegend.addToLegend(a.allItems));
        }
        function k() {
          var a = this.chart,
            b = this.visible,
            e = this.chart.legend;
          e &&
            e.bubbleLegend &&
            ((this.visible = !b),
            (this.ignoreSeries = b),
            (a = 0 <= d(a)),
            e.bubbleLegend.visible !== a &&
              (e.update({ bubbleLegend: { enabled: a } }),
              (e.bubbleLegend.visible = a)),
            (this.visible = b));
        }
        function q(a, b) {
          var d = a.options.rtl,
            e,
            f,
            k,
            c = 0;
          a.allItems.forEach(function (a, g) {
            e = a.legendGroup.translateX;
            f = a._legendItemPos[1];
            if ((k = a.movementX) || (d && a.ranges))
              (k = d ? e - a.options.maxSize / 2 : e + k),
                a.legendGroup.attr({ translateX: k });
            g > b[c].step && c++;
            a.legendGroup.attr({ translateY: Math.round(f + b[c].height / 2) });
            a._legendItemPos[1] = f + b[c].height / 2;
          });
        }
        var v = [];
        l.compose = function (a, d, e) {
          -1 === v.indexOf(a) &&
            (v.push(a),
            t({ legend: { bubbleLegend: b } }),
            z(a.prototype, 'drawChartBox', n));
          -1 === v.indexOf(d) && (v.push(d), A(d, 'afterGetAllItems', f));
          -1 === v.indexOf(e) && (v.push(e), A(e, 'legendItemClick', k));
        };
      })(q || (q = {}));
      return q;
    }
  );
  J(
    e,
    'Series/Bubble/BubblePoint.js',
    [
      e['Core/Series/Point.js'],
      e['Core/Series/SeriesRegistry.js'],
      e['Core/Utilities.js'],
    ],
    function (b, e, v) {
      var E =
        (this && this.__extends) ||
        (function () {
          var b = function (e, t) {
            b =
              Object.setPrototypeOf ||
              ({ __proto__: [] } instanceof Array &&
                function (b, e) {
                  b.__proto__ = e;
                }) ||
              function (b, e) {
                for (var l in e) e.hasOwnProperty(l) && (b[l] = e[l]);
              };
            return b(e, t);
          };
          return function (e, t) {
            function v() {
              this.constructor = e;
            }
            b(e, t);
            e.prototype =
              null === t
                ? Object.create(t)
                : ((v.prototype = t.prototype), new v());
          };
        })();
      v = v.extend;
      e = (function (e) {
        function t() {
          var b = (null !== e && e.apply(this, arguments)) || this;
          b.options = void 0;
          b.series = void 0;
          return b;
        }
        E(t, e);
        t.prototype.haloPath = function (e) {
          return b.prototype.haloPath.call(
            this,
            0 === e ? 0 : (this.marker ? this.marker.radius || 0 : 0) + e
          );
        };
        return t;
      })(e.seriesTypes.scatter.prototype.pointClass);
      v(e.prototype, { ttBelow: !1 });
      return e;
    }
  );
  J(
    e,
    'Series/Bubble/BubbleSeries.js',
    [
      e['Core/Axis/Axis.js'],
      e['Series/Bubble/BubbleLegendComposition.js'],
      e['Series/Bubble/BubblePoint.js'],
      e['Core/Color/Color.js'],
      e['Core/Globals.js'],
      e['Core/Series/Series.js'],
      e['Core/Series/SeriesRegistry.js'],
      e['Core/Utilities.js'],
    ],
    function (b, e, v, E, t, A, C, z) {
      var q =
          (this && this.__extends) ||
          (function () {
            var a = function (b, d) {
              a =
                Object.setPrototypeOf ||
                ({ __proto__: [] } instanceof Array &&
                  function (a, b) {
                    a.__proto__ = b;
                  }) ||
                function (a, b) {
                  for (var c in b) b.hasOwnProperty(c) && (a[c] = b[c]);
                };
              return a(b, d);
            };
            return function (b, d) {
              function e() {
                this.constructor = b;
              }
              a(b, d);
              b.prototype =
                null === d
                  ? Object.create(d)
                  : ((e.prototype = d.prototype), new e());
            };
          })(),
        l = E.parse;
      E = t.noop;
      var n = C.seriesTypes;
      t = n.column;
      var d = n.scatter;
      n = z.addEvent;
      var a = z.arrayMax,
        f = z.arrayMin,
        k = z.clamp,
        G = z.extend,
        y = z.isNumber,
        B = z.merge,
        x = z.pick;
      z = (function (b) {
        function m() {
          var a = (null !== b && b.apply(this, arguments)) || this;
          a.data = void 0;
          a.maxPxSize = void 0;
          a.minPxSize = void 0;
          a.options = void 0;
          a.points = void 0;
          a.radii = void 0;
          a.yData = void 0;
          a.zData = void 0;
          return a;
        }
        q(m, b);
        m.prototype.animate = function (a) {
          !a &&
            this.points.length < this.options.animationLimit &&
            this.points.forEach(function (a) {
              var b = a.graphic;
              b &&
                b.width &&
                (this.hasRendered ||
                  b.attr({ x: a.plotX, y: a.plotY, width: 1, height: 1 }),
                b.animate(this.markerAttribs(a), this.options.animation));
            }, this);
        };
        m.prototype.getRadii = function () {
          var a = this,
            b = this.zData,
            c = this.yData,
            d = [],
            e = this.chart.bubbleZExtremes;
          var f = this.getPxExtremes();
          var k = f.minPxSize,
            l = f.maxPxSize;
          if (!e) {
            var m = Number.MAX_VALUE,
              n = -Number.MAX_VALUE,
              r;
            this.chart.series.forEach(function (b) {
              b.bubblePadding &&
                (b.visible || !a.chart.options.chart.ignoreHiddenSeries) &&
                (b = b.getZExtremes()) &&
                ((m = Math.min(m || b.zMin, b.zMin)),
                (n = Math.max(n || b.zMax, b.zMax)),
                (r = !0));
            });
            r
              ? ((e = { zMin: m, zMax: n }), (this.chart.bubbleZExtremes = e))
              : (e = { zMin: 0, zMax: 0 });
          }
          var q = 0;
          for (f = b.length; q < f; q++) {
            var t = b[q];
            d.push(this.getRadius(e.zMin, e.zMax, k, l, t, c[q]));
          }
          this.radii = d;
        };
        m.prototype.getRadius = function (a, b, c, d, e, f) {
          var g = this.options,
            h = 'width' !== g.sizeBy,
            k = g.zThreshold,
            l = b - a,
            m = 0.5;
          if (null === f || null === e) return null;
          if (y(e)) {
            g.sizeByAbsoluteValue &&
              ((e = Math.abs(e - k)),
              (l = Math.max(b - k, Math.abs(a - k))),
              (a = 0));
            if (e < a) return c / 2 - 1;
            0 < l && (m = (e - a) / l);
          }
          h && 0 <= m && (m = Math.sqrt(m));
          return Math.ceil(c + m * (d - c)) / 2;
        };
        m.prototype.hasData = function () {
          return !!this.processedXData.length;
        };
        m.prototype.pointAttribs = function (a, b) {
          var c = this.options.marker.fillOpacity;
          a = A.prototype.pointAttribs.call(this, a, b);
          1 !== c && (a.fill = l(a.fill).setOpacity(c).get('rgba'));
          return a;
        };
        m.prototype.translate = function () {
          b.prototype.translate.call(this);
          this.getRadii();
          this.translateBubble();
        };
        m.prototype.translateBubble = function () {
          for (
            var a = this.data,
              b = this.radii,
              c = this.getPxExtremes().minPxSize,
              d = a.length;
            d--;

          ) {
            var e = a[d],
              f = b ? b[d] : 0;
            y(f) && f >= c / 2
              ? ((e.marker = G(e.marker, {
                  radius: f,
                  width: 2 * f,
                  height: 2 * f,
                })),
                (e.dlBox = {
                  x: e.plotX - f,
                  y: e.plotY - f,
                  width: 2 * f,
                  height: 2 * f,
                }))
              : (e.shapeArgs = e.plotY = e.dlBox = void 0);
          }
        };
        m.prototype.getPxExtremes = function () {
          var a = Math.min(this.chart.plotWidth, this.chart.plotHeight),
            b = function (b) {
              if ('string' === typeof b) {
                var c = /%$/.test(b);
                b = parseInt(b, 10);
              }
              return c ? (a * b) / 100 : b;
            },
            c = b(x(this.options.minSize, 8));
          b = Math.max(b(x(this.options.maxSize, '20%')), c);
          return { minPxSize: c, maxPxSize: b };
        };
        m.prototype.getZExtremes = function () {
          var b = this.options,
            d = (this.zData || []).filter(y);
          if (d.length) {
            var c = x(
              b.zMin,
              k(
                f(d),
                !1 === b.displayNegative
                  ? b.zThreshold || 0
                  : -Number.MAX_VALUE,
                Number.MAX_VALUE
              )
            );
            b = x(b.zMax, a(d));
            if (y(c) && y(b)) return { zMin: c, zMax: b };
          }
        };
        m.compose = e.compose;
        m.defaultOptions = B(d.defaultOptions, {
          dataLabels: {
            formatter: function () {
              var a = this.series.chart.numberFormatter,
                b = this.point.z;
              return y(b) ? a(b, -1) : '';
            },
            inside: !0,
            verticalAlign: 'middle',
          },
          animationLimit: 250,
          marker: {
            lineColor: null,
            lineWidth: 1,
            fillOpacity: 0.5,
            radius: null,
            states: { hover: { radiusPlus: 0 } },
            symbol: 'circle',
          },
          minSize: 8,
          maxSize: '20%',
          softThreshold: !1,
          states: { hover: { halo: { size: 5 } } },
          tooltip: { pointFormat: '({point.x}, {point.y}), Size: {point.z}' },
          turboThreshold: 0,
          zThreshold: 0,
          zoneAxis: 'z',
        });
        return m;
      })(d);
      G(z.prototype, {
        alignDataLabel: t.prototype.alignDataLabel,
        applyZones: E,
        bubblePadding: !0,
        buildKDTree: E,
        directTouch: !0,
        isBubble: !0,
        pointArrayMap: ['y', 'z'],
        pointClass: v,
        parallelArrays: ['x', 'y', 'z'],
        trackerGroups: ['group', 'dataLabelsGroup'],
        specialGroup: 'group',
        zoneAxis: 'z',
      });
      n(z, 'updatedData', function (a) {
        delete a.target.chart.bubbleZExtremes;
      });
      b.prototype.beforePadding = function () {
        var a = this,
          b = this.len,
          d = this.chart,
          e = 0,
          c = b,
          f = this.isXAxis,
          g = f ? 'xData' : 'yData',
          k = this.min,
          l = this.max - k,
          n = b / l,
          q;
        this.series.forEach(function (b) {
          if (
            b.bubblePadding &&
            (b.visible || !d.options.chart.ignoreHiddenSeries)
          ) {
            q = a.allowZoomOutside = !0;
            var h = b[g];
            f && b.getRadii(0, 0, b);
            if (0 < l)
              for (var m = h.length; m--; )
                if (y(h[m]) && a.dataMin <= h[m] && h[m] <= a.max) {
                  var p = (b.radii && b.radii[m]) || 0;
                  e = Math.min((h[m] - k) * n - p, e);
                  c = Math.max((h[m] - k) * n + p, c);
                }
          }
        });
        q &&
          0 < l &&
          !this.logarithmic &&
          ((c -= b),
          (n *= (b + Math.max(0, e) - Math.min(c, b)) / b),
          [
            ['min', 'userMin', e],
            ['max', 'userMax', c],
          ].forEach(function (b) {
            'undefined' === typeof x(a.options[b[0]], a[b[1]]) &&
              (a[b[0]] += b[2] / n);
          }));
      };
      C.registerSeriesType('bubble', z);
      ('');
      ('');
      return z;
    }
  );
  J(
    e,
    'Series/MapBubble/MapBubblePoint.js',
    [e['Series/Map/MapPoint.js'], e['Core/Series/SeriesRegistry.js']],
    function (b, e) {
      var v =
        (this && this.__extends) ||
        (function () {
          var b = function (e, t) {
            b =
              Object.setPrototypeOf ||
              ({ __proto__: [] } instanceof Array &&
                function (b, e) {
                  b.__proto__ = e;
                }) ||
              function (b, e) {
                for (var l in e) e.hasOwnProperty(l) && (b[l] = e[l]);
              };
            return b(e, t);
          };
          return function (e, t) {
            function v() {
              this.constructor = e;
            }
            b(e, t);
            e.prototype =
              null === t
                ? Object.create(t)
                : ((v.prototype = t.prototype), new v());
          };
        })();
      e = e.seriesTypes;
      var E = e.map;
      return (function (e) {
        function t() {
          var t = (null !== e && e.apply(this, arguments)) || this;
          t.applyOptions = E.prototype.pointClass.prototype.applyOptions;
          t.getProjectedBounds = b.prototype.getProjectedBounds;
          return t;
        }
        v(t, e);
        t.prototype.isValid = function () {
          return 'number' === typeof this.z;
        };
        return t;
      })(e.bubble.prototype.pointClass);
    }
  );
  J(
    e,
    'Series/MapBubble/MapBubbleSeries.js',
    [
      e['Series/Bubble/BubbleSeries.js'],
      e['Series/MapBubble/MapBubblePoint.js'],
      e['Series/Map/MapSeries.js'],
      e['Core/Series/SeriesRegistry.js'],
      e['Core/Globals.js'],
      e['Core/Utilities.js'],
    ],
    function (b, e, v, E, t, A) {
      var C =
          (this && this.__extends) ||
          (function () {
            var b = function (e, d) {
              b =
                Object.setPrototypeOf ||
                ({ __proto__: [] } instanceof Array &&
                  function (a, b) {
                    a.__proto__ = b;
                  }) ||
                function (a, b) {
                  for (var d in b) b.hasOwnProperty(d) && (a[d] = b[d]);
                };
              return b(e, d);
            };
            return function (e, d) {
              function a() {
                this.constructor = e;
              }
              b(e, d);
              e.prototype =
                null === d
                  ? Object.create(d)
                  : ((a.prototype = d.prototype), new a());
            };
          })(),
        z = E.seriesTypes.mappoint;
      t = A.extend;
      var q = A.merge;
      A = (function (e) {
        function l() {
          var b = (null !== e && e.apply(this, arguments)) || this;
          b.data = void 0;
          b.options = void 0;
          b.points = void 0;
          return b;
        }
        C(l, e);
        l.prototype.searchPoint = function (b, a) {
          return this.searchKDTree(
            {
              clientX: b.chartX - this.chart.plotLeft,
              plotY: b.chartY - this.chart.plotTop,
            },
            a,
            b
          );
        };
        l.prototype.translate = function () {
          z.prototype.translate.call(this);
          this.getRadii();
          this.translateBubble();
        };
        l.compose = b.compose;
        l.defaultOptions = q(b.defaultOptions, {
          animationLimit: 500,
          joinBy: 'hc-key',
          tooltip: { pointFormat: '{point.name}: {point.z}' },
        });
        return l;
      })(b);
      t(A.prototype, {
        type: 'mapbubble',
        axisTypes: ['colorAxis'],
        getProjectedBounds: v.prototype.getProjectedBounds,
        isCartesian: !1,
        pointArrayMap: ['z'],
        pointClass: e,
        processData: v.prototype.processData,
        projectPoint: z.prototype.projectPoint,
        setData: v.prototype.setData,
        setOptions: v.prototype.setOptions,
        useMapGeometry: !0,
        xyFromShape: !0,
      });
      E.registerSeriesType('mapbubble', A);
      ('');
      return A;
    }
  );
  J(
    e,
    'Series/Heatmap/HeatmapPoint.js',
    [e['Core/Series/SeriesRegistry.js'], e['Core/Utilities.js']],
    function (b, e) {
      var v =
          (this && this.__extends) ||
          (function () {
            var b = function (e, l) {
              b =
                Object.setPrototypeOf ||
                ({ __proto__: [] } instanceof Array &&
                  function (b, d) {
                    b.__proto__ = d;
                  }) ||
                function (b, d) {
                  for (var a in d) d.hasOwnProperty(a) && (b[a] = d[a]);
                };
              return b(e, l);
            };
            return function (e, l) {
              function n() {
                this.constructor = e;
              }
              b(e, l);
              e.prototype =
                null === l
                  ? Object.create(l)
                  : ((n.prototype = l.prototype), new n());
            };
          })(),
        E = e.clamp,
        t = e.defined,
        A = e.extend,
        C = e.pick;
      b = (function (b) {
        function e() {
          var e = (null !== b && b.apply(this, arguments)) || this;
          e.options = void 0;
          e.series = void 0;
          e.value = void 0;
          e.x = void 0;
          e.y = void 0;
          return e;
        }
        v(e, b);
        e.prototype.applyOptions = function (e, n) {
          e = b.prototype.applyOptions.call(this, e, n);
          e.formatPrefix = e.isNull || null === e.value ? 'null' : 'point';
          return e;
        };
        e.prototype.getCellAttributes = function () {
          var b = this.series,
            e = b.options,
            d = (e.colsize || 1) / 2,
            a = (e.rowsize || 1) / 2,
            f = b.xAxis,
            k = b.yAxis,
            q = this.options.marker || b.options.marker;
          b = b.pointPlacementToXValue();
          var v = C(this.pointPadding, e.pointPadding, 0),
            z = {
              x1: E(
                Math.round(
                  f.len - (f.translate(this.x - d, !1, !0, !1, !0, -b) || 0)
                ),
                -f.len,
                2 * f.len
              ),
              x2: E(
                Math.round(
                  f.len - (f.translate(this.x + d, !1, !0, !1, !0, -b) || 0)
                ),
                -f.len,
                2 * f.len
              ),
              y1: E(
                Math.round(k.translate(this.y - a, !1, !0, !1, !0) || 0),
                -k.len,
                2 * k.len
              ),
              y2: E(
                Math.round(k.translate(this.y + a, !1, !0, !1, !0) || 0),
                -k.len,
                2 * k.len
              ),
            };
          [
            ['width', 'x'],
            ['height', 'y'],
          ].forEach(function (a) {
            var b = a[0];
            a = a[1];
            var d = a + '1',
              e = a + '2',
              f = Math.abs(z[d] - z[e]),
              c = (q && q.lineWidth) || 0,
              k = Math.abs(z[d] + z[e]) / 2;
            b = q && q[b];
            t(b) &&
              b < f &&
              ((b = b / 2 + c / 2), (z[d] = k - b), (z[e] = k + b));
            v &&
              ('y' === a && ((d = e), (e = a + '1')), (z[d] += v), (z[e] -= v));
          });
          return z;
        };
        e.prototype.haloPath = function (b) {
          if (!b) return [];
          var e = this.shapeArgs;
          return [
            'M',
            e.x - b,
            e.y - b,
            'L',
            e.x - b,
            e.y + e.height + b,
            e.x + e.width + b,
            e.y + e.height + b,
            e.x + e.width + b,
            e.y - b,
            'Z',
          ];
        };
        e.prototype.isValid = function () {
          return Infinity !== this.value && -Infinity !== this.value;
        };
        return e;
      })(b.seriesTypes.scatter.prototype.pointClass);
      A(b.prototype, {
        dataLabelOnNull: !0,
        moveToTopOnHover: !0,
        ttBelow: !1,
      });
      return b;
    }
  );
  J(
    e,
    'Series/Heatmap/HeatmapSeries.js',
    [
      e['Core/Color/Color.js'],
      e['Series/ColorMapMixin.js'],
      e['Series/Heatmap/HeatmapPoint.js'],
      e['Core/Legend/LegendSymbol.js'],
      e['Core/Series/SeriesRegistry.js'],
      e['Core/Renderer/SVG/SVGRenderer.js'],
      e['Core/Utilities.js'],
    ],
    function (b, e, v, E, t, A, C) {
      var z =
          (this && this.__extends) ||
          (function () {
            var a = function (b, d) {
              a =
                Object.setPrototypeOf ||
                ({ __proto__: [] } instanceof Array &&
                  function (a, b) {
                    a.__proto__ = b;
                  }) ||
                function (a, b) {
                  for (var c in b) b.hasOwnProperty(c) && (a[c] = b[c]);
                };
              return a(b, d);
            };
            return function (b, d) {
              function e() {
                this.constructor = b;
              }
              a(b, d);
              b.prototype =
                null === d
                  ? Object.create(d)
                  : ((e.prototype = d.prototype), new e());
            };
          })(),
        q = t.series,
        l = t.seriesTypes,
        n = l.column,
        d = l.scatter,
        a = A.prototype.symbols,
        f = C.extend,
        k = C.fireEvent,
        G = C.isNumber,
        y = C.merge,
        B = C.pick;
      A = (function (e) {
        function l() {
          var a = (null !== e && e.apply(this, arguments)) || this;
          a.colorAxis = void 0;
          a.data = void 0;
          a.options = void 0;
          a.points = void 0;
          a.valueMax = NaN;
          a.valueMin = NaN;
          return a;
        }
        z(l, e);
        l.prototype.drawPoints = function () {
          var a = this;
          if ((this.options.marker || {}).enabled || this._hasPointMarkers)
            q.prototype.drawPoints.call(this),
              this.points.forEach(function (b) {
                b.graphic &&
                  (b.graphic[a.chart.styledMode ? 'css' : 'animate'](
                    a.colorAttribs(b)
                  ),
                  a.options.borderRadius &&
                    b.graphic.attr({ r: a.options.borderRadius }),
                  ((b.shapeArgs || {}).r = a.options.borderRadius),
                  ((b.shapeArgs || {}).d = b.graphic.pathArray),
                  null === b.value &&
                    b.graphic.addClass('highcharts-null-point'));
              });
        };
        l.prototype.getExtremes = function () {
          var a = q.prototype.getExtremes.call(this, this.valueData),
            b = a.dataMin;
          a = a.dataMax;
          G(b) && (this.valueMin = b);
          G(a) && (this.valueMax = a);
          return q.prototype.getExtremes.call(this);
        };
        l.prototype.getValidPoints = function (a, b) {
          return q.prototype.getValidPoints.call(this, a, b, !0);
        };
        l.prototype.hasData = function () {
          return !!this.processedXData.length;
        };
        l.prototype.init = function () {
          q.prototype.init.apply(this, arguments);
          var b = this.options;
          b.pointRange = B(b.pointRange, b.colsize || 1);
          this.yAxis.axisPointRange = b.rowsize || 1;
          a.ellipse = a.circle;
        };
        l.prototype.markerAttribs = function (a, b) {
          var d = a.marker || {},
            c = this.options.marker || {},
            e = a.shapeArgs || {},
            f = {};
          if (a.hasImage) return { x: a.plotX, y: a.plotY };
          if (b) {
            var h = c.states[b] || {};
            var k = (d.states && d.states[b]) || {};
            [
              ['width', 'x'],
              ['height', 'y'],
            ].forEach(function (a) {
              f[a[0]] =
                (k[a[0]] || h[a[0]] || e[a[0]]) +
                (k[a[0] + 'Plus'] || h[a[0] + 'Plus'] || 0);
              f[a[1]] = e[a[1]] + (e[a[0]] - f[a[0]]) / 2;
            });
          }
          return b ? f : e;
        };
        l.prototype.pointAttribs = function (a, d) {
          var e = q.prototype.pointAttribs.call(this, a, d),
            c = this.options || {},
            f = this.chart.options.plotOptions || {},
            g = f.series || {},
            h = f.heatmap || {};
          f =
            (a && a.options.borderColor) ||
            c.borderColor ||
            h.borderColor ||
            g.borderColor;
          g =
            (a && a.options.borderWidth) ||
            c.borderWidth ||
            h.borderWidth ||
            g.borderWidth ||
            e['stroke-width'];
          e.stroke =
            (a && a.marker && a.marker.lineColor) ||
            (c.marker && c.marker.lineColor) ||
            f ||
            this.color;
          e['stroke-width'] = g;
          d &&
            ((a = y(
              c.states[d],
              c.marker && c.marker.states[d],
              (a && a.options.states && a.options.states[d]) || {}
            )),
            (d = a.brightness),
            (e.fill =
              a.color ||
              b
                .parse(e.fill)
                .brighten(d || 0)
                .get()),
            (e.stroke = a.lineColor));
          return e;
        };
        l.prototype.setClip = function (a) {
          var b = this.chart;
          q.prototype.setClip.apply(this, arguments);
          (!1 !== this.options.clip || a) &&
            this.markerGroup.clip(
              (a || this.clipBox) && this.sharedClipKey
                ? b.sharedClips[this.sharedClipKey]
                : b.clipRect
            );
        };
        l.prototype.translate = function () {
          var b = this.options,
            d = (b.marker && b.marker.symbol) || 'rect',
            e = a[d] ? d : 'rect',
            c = -1 !== ['circle', 'square'].indexOf(e);
          this.generatePoints();
          this.points.forEach(function (b) {
            var g = b.getCellAttributes(),
              h = {};
            h.x = Math.min(g.x1, g.x2);
            h.y = Math.min(g.y1, g.y2);
            h.width = Math.max(Math.abs(g.x2 - g.x1), 0);
            h.height = Math.max(Math.abs(g.y2 - g.y1), 0);
            var k = (b.hasImage =
              0 === ((b.marker && b.marker.symbol) || d || '').indexOf('url'));
            if (c) {
              var l = Math.abs(h.width - h.height);
              h.x = Math.min(g.x1, g.x2) + (h.width < h.height ? 0 : l / 2);
              h.y = Math.min(g.y1, g.y2) + (h.width < h.height ? l / 2 : 0);
              h.width = h.height = Math.min(h.width, h.height);
            }
            l = {
              plotX: (g.x1 + g.x2) / 2,
              plotY: (g.y1 + g.y2) / 2,
              clientX: (g.x1 + g.x2) / 2,
              shapeType: 'path',
              shapeArgs: y(!0, h, { d: a[e](h.x, h.y, h.width, h.height) }),
            };
            k && (b.marker = { width: h.width, height: h.height });
            f(b, l);
          });
          k(this, 'afterTranslate');
        };
        l.defaultOptions = y(d.defaultOptions, {
          animation: !1,
          borderRadius: 0,
          borderWidth: 0,
          nullColor: '#f7f7f7',
          dataLabels: {
            formatter: function () {
              var a = this.series.chart.numberFormatter,
                b = this.point.value;
              return G(b) ? a(b, -1) : '';
            },
            inside: !0,
            verticalAlign: 'middle',
            crop: !1,
            overflow: !1,
            padding: 0,
          },
          marker: {
            symbol: 'rect',
            radius: 0,
            lineColor: void 0,
            states: { hover: { lineWidthPlus: 0 }, select: {} },
          },
          clip: !0,
          pointRange: null,
          tooltip: { pointFormat: '{point.x}, {point.y}: {point.value}<br/>' },
          states: { hover: { halo: !1, brightness: 0.2 } },
        });
        return l;
      })(d);
      f(A.prototype, {
        alignDataLabel: n.prototype.alignDataLabel,
        axisTypes: e.SeriesMixin.axisTypes,
        colorAttribs: e.SeriesMixin.colorAttribs,
        colorKey: e.SeriesMixin.colorKey,
        directTouch: !0,
        drawLegendSymbol: E.drawRectangle,
        getExtremesFromAll: !0,
        getSymbol: q.prototype.getSymbol,
        parallelArrays: e.SeriesMixin.parallelArrays,
        pointArrayMap: ['y', 'value'],
        pointClass: v,
        trackerGroups: e.SeriesMixin.trackerGroups,
      });
      t.registerSeriesType('heatmap', A);
      ('');
      ('');
      return A;
    }
  );
  J(
    e,
    'masters/modules/map.src.js',
    [
      e['Core/Globals.js'],
      e['Core/Axis/Color/ColorAxis.js'],
      e['Series/MapBubble/MapBubbleSeries.js'],
      e['Core/Chart/MapChart.js'],
      e['Maps/MapView.js'],
      e['Maps/Projection.js'],
    ],
    function (b, e, v, E, t, A) {
      b.ColorAxis = e;
      b.MapChart = E;
      b.mapChart = b.Map = E.mapChart;
      b.MapView = t;
      b.maps = E.maps;
      b.Projection = A;
      e.compose(b.Chart, b.Fx, b.Legend, b.Series);
      v.compose(b.Chart, b.Legend, b.Series);
    }
  );
  J(
    e,
    'masters/highmaps.src.js',
    [e['masters/highcharts.src.js']],
    function (b) {
      b.product = 'Highmaps';
      return b;
    }
  );
  e['masters/highmaps.src.js']._modules = e;
  return e['masters/highmaps.src.js'];
});
//# sourceMappingURL=highmaps.js.map
