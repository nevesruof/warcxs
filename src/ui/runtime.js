import { createAudioComponents } from '../services/audio.js';
import { profileFetch as fetch } from '../services/profile-api.js';
var e = Object.create,
  t = Object.defineProperty,
  n = Object.getOwnPropertyDescriptor,
  r = Object.getOwnPropertyNames,
  i = Object.getPrototypeOf,
  a = Object.prototype.hasOwnProperty,
  o = (e, t, n) => () => {
    if (n) throw n[0];
    try {
      return (e && (t = e((e = 0))), t);
    } catch (e) {
      throw ((n = [e]), e);
    }
  },
  s = (e, t) => () => (
    t ||
      (e(
        (t = {
          exports: {},
        }).exports,
        t,
      ),
      (e = null)),
    t.exports
  ),
  c = (e, n) => {
    let r = {};
    for (var i in e)
      t(r, i, {
        get: e[i],
        enumerable: !0,
      });
    return (
      n ||
        t(r, Symbol.toStringTag, {
          value: `Module`,
        }),
      r
    );
  },
  l = (e, i, o, s) => {
    if ((i && typeof i == `object`) || typeof i == `function`)
      for (var c = r(i), l = 0, u = c.length, d; l < u; l++)
        ((d = c[l]),
          !a.call(e, d) &&
            d !== o &&
            t(e, d, {
              get: ((e) => i[e]).bind(null, d),
              enumerable: !(s = n(i, d)) || s.enumerable,
            }));
    return e;
  },
  u = (n, r, o) => (
    (o = n == null ? {} : e(i(n))),
    l(
      r || !n || !n.__esModule || !a.call(n, `default`)
        ? t(o, `default`, {
            value: n,
            enumerable: !0,
          })
        : o,
      n,
    )
  ),
  d = (e) =>
    a.call(e, `module.exports`)
      ? e[`module.exports`]
      : l(
          t({}, `__esModule`, {
            value: !0,
          }),
          e,
        );
(function () {
  let e = document.createElement(`link`).relList;
  if (e && e.supports && e.supports(`modulepreload`)) return;
  for (let e of document.querySelectorAll(`link[rel="modulepreload"]`)) n(e);
  new MutationObserver((e) => {
    for (let t of e)
      if (t.type === `childList`)
        for (let e of t.addedNodes) e.tagName === `LINK` && e.rel === `modulepreload` && n(e);
  }).observe(document, {
    childList: !0,
    subtree: !0,
  });
  function t(e) {
    let t = {};
    return (
      e.integrity && (t.integrity = e.integrity),
      e.referrerPolicy && (t.referrerPolicy = e.referrerPolicy),
      (t.credentials =
        e.crossOrigin === `use-credentials`
          ? `include`
          : e.crossOrigin === `anonymous`
            ? `omit`
            : `same-origin`),
      t
    );
  }
  function n(e) {
    if (e.ep) return;
    e.ep = !0;
    let n = t(e);
    fetch(e.href, n);
  }
})();
var f = s((e) => {
    var t = Symbol.for(`react.element`),
      n = Symbol.for(`react.portal`),
      r = Symbol.for(`react.fragment`),
      i = Symbol.for(`react.strict_mode`),
      a = Symbol.for(`react.profiler`),
      o = Symbol.for(`react.provider`),
      s = Symbol.for(`react.context`),
      c = Symbol.for(`react.forward_ref`),
      l = Symbol.for(`react.suspense`),
      u = Symbol.for(`react.memo`),
      d = Symbol.for(`react.lazy`),
      f = Symbol.iterator;
    function p(e) {
      return typeof e != `object` || !e
        ? null
        : ((e = (f && e[f]) || e[`@@iterator`]), typeof e == `function` ? e : null);
    }
    var m = {
        isMounted: function () {
          return !1;
        },
        enqueueForceUpdate: function () {},
        enqueueReplaceState: function () {},
        enqueueSetState: function () {},
      },
      h = Object.assign,
      g = {};
    function _(e, t, n) {
      ((this.props = e), (this.context = t), (this.refs = g), (this.updater = n || m));
    }
    ((_.prototype.isReactComponent = {}),
      (_.prototype.setState = function (e, t) {
        if (typeof e != `object` && typeof e != `function` && e != null)
          throw Error(
            `setState(...): takes an object of state variables to update or a function which returns an object of state variables.`,
          );
        this.updater.enqueueSetState(this, e, t, `setState`);
      }),
      (_.prototype.forceUpdate = function (e) {
        this.updater.enqueueForceUpdate(this, e, `forceUpdate`);
      }));
    function v() {}
    v.prototype = _.prototype;
    function y(e, t, n) {
      ((this.props = e), (this.context = t), (this.refs = g), (this.updater = n || m));
    }
    var b = (y.prototype = new v());
    ((b.constructor = y), h(b, _.prototype), (b.isPureReactComponent = !0));
    var x = Array.isArray,
      S = Object.prototype.hasOwnProperty,
      C = {
        current: null,
      },
      w = {
        key: !0,
        ref: !0,
        __self: !0,
        __source: !0,
      };
    function T(e, n, r) {
      var i,
        a = {},
        o = null,
        s = null;
      if (n != null)
        for (i in (n.ref !== void 0 && (s = n.ref), n.key !== void 0 && (o = `` + n.key), n))
          S.call(n, i) && !w.hasOwnProperty(i) && (a[i] = n[i]);
      var c = arguments.length - 2;
      if (c === 1) a.children = r;
      else if (1 < c) {
        for (var l = Array(c), u = 0; u < c; u++) l[u] = arguments[u + 2];
        a.children = l;
      }
      if (e && e.defaultProps)
        for (i in ((c = e.defaultProps), c)) a[i] === void 0 && (a[i] = c[i]);
      return {
        $$typeof: t,
        type: e,
        key: o,
        ref: s,
        props: a,
        _owner: C.current,
      };
    }
    function E(e, n) {
      return {
        $$typeof: t,
        type: e.type,
        key: n,
        ref: e.ref,
        props: e.props,
        _owner: e._owner,
      };
    }
    function D(e) {
      return typeof e == `object` && !!e && e.$$typeof === t;
    }
    function O(e) {
      var t = {
        '=': `=0`,
        ':': `=2`,
      };
      return (
        `$` +
        e.replace(/[=:]/g, function (e) {
          return t[e];
        })
      );
    }
    var k = /\/+/g;
    function A(e, t) {
      return typeof e == `object` && e && e.key != null ? O(`` + e.key) : t.toString(36);
    }
    function j(e, r, i, a, o) {
      var s = typeof e;
      (s === `undefined` || s === `boolean`) && (e = null);
      var c = !1;
      if (e === null) c = !0;
      else
        switch (s) {
          case `string`:
          case `number`:
            c = !0;
            break;
          case `object`:
            switch (e.$$typeof) {
              case t:
              case n:
                c = !0;
            }
        }
      if (c)
        return (
          (c = e),
          (o = o(c)),
          (e = a === `` ? `.` + A(c, 0) : a),
          x(o)
            ? ((i = ``),
              e != null && (i = e.replace(k, `$&/`) + `/`),
              j(o, r, i, ``, function (e) {
                return e;
              }))
            : o != null &&
              (D(o) &&
                (o = E(
                  o,
                  i +
                    (!o.key || (c && c.key === o.key) ? `` : (`` + o.key).replace(k, `$&/`) + `/`) +
                    e,
                )),
              r.push(o)),
          1
        );
      if (((c = 0), (a = a === `` ? `.` : a + `:`), x(e)))
        for (var l = 0; l < e.length; l++) {
          s = e[l];
          var u = a + A(s, l);
          c += j(s, r, i, u, o);
        }
      else if (((u = p(e)), typeof u == `function`))
        for (e = u.call(e), l = 0; !(s = e.next()).done;)
          ((s = s.value), (u = a + A(s, l++)), (c += j(s, r, i, u, o)));
      else if (s === `object`)
        throw (
          (r = String(e)),
          Error(
            `Objects are not valid as a React child (found: ` +
              (r === `[object Object]`
                ? `object with keys {` + Object.keys(e).join(`, `) + `}`
                : r) +
              `). If you meant to render a collection of children, use an array instead.`,
          )
        );
      return c;
    }
    function M(e, t, n) {
      if (e == null) return e;
      var r = [],
        i = 0;
      return (
        j(e, r, ``, ``, function (e) {
          return t.call(n, e, i++);
        }),
        r
      );
    }
    function N(e) {
      if (e._status === -1) {
        var t = e._result;
        ((t = t()),
          t.then(
            function (t) {
              (e._status === 0 || e._status === -1) && ((e._status = 1), (e._result = t));
            },
            function (t) {
              (e._status === 0 || e._status === -1) && ((e._status = 2), (e._result = t));
            },
          ),
          e._status === -1 && ((e._status = 0), (e._result = t)));
      }
      if (e._status === 1) return e._result.default;
      throw e._result;
    }
    var P = {
        current: null,
      },
      F = {
        transition: null,
      },
      I = {
        ReactCurrentDispatcher: P,
        ReactCurrentBatchConfig: F,
        ReactCurrentOwner: C,
      };
    function ee() {
      throw Error(`act(...) is not supported in production builds of React.`);
    }
    ((e.Children = {
      map: M,
      forEach: function (e, t, n) {
        M(
          e,
          function () {
            t.apply(this, arguments);
          },
          n,
        );
      },
      count: function (e) {
        var t = 0;
        return (
          M(e, function () {
            t++;
          }),
          t
        );
      },
      toArray: function (e) {
        return (
          M(e, function (e) {
            return e;
          }) || []
        );
      },
      only: function (e) {
        if (!D(e))
          throw Error(`React.Children.only expected to receive a single React element child.`);
        return e;
      },
    }),
      (e.Component = _),
      (e.Fragment = r),
      (e.Profiler = a),
      (e.PureComponent = y),
      (e.StrictMode = i),
      (e.Suspense = l),
      (e.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED = I),
      (e.act = ee),
      (e.cloneElement = function (e, n, r) {
        if (e == null)
          throw Error(
            `React.cloneElement(...): The argument must be a React element, but you passed ` +
              e +
              `.`,
          );
        var i = h({}, e.props),
          a = e.key,
          o = e.ref,
          s = e._owner;
        if (n != null) {
          if (
            (n.ref !== void 0 && ((o = n.ref), (s = C.current)),
            n.key !== void 0 && (a = `` + n.key),
            e.type && e.type.defaultProps)
          )
            var c = e.type.defaultProps;
          for (l in n)
            S.call(n, l) &&
              !w.hasOwnProperty(l) &&
              (i[l] = n[l] === void 0 && c !== void 0 ? c[l] : n[l]);
        }
        var l = arguments.length - 2;
        if (l === 1) i.children = r;
        else if (1 < l) {
          c = Array(l);
          for (var u = 0; u < l; u++) c[u] = arguments[u + 2];
          i.children = c;
        }
        return {
          $$typeof: t,
          type: e.type,
          key: a,
          ref: o,
          props: i,
          _owner: s,
        };
      }),
      (e.createContext = function (e) {
        return (
          (e = {
            $$typeof: s,
            _currentValue: e,
            _currentValue2: e,
            _threadCount: 0,
            Provider: null,
            Consumer: null,
            _defaultValue: null,
            _globalName: null,
          }),
          (e.Provider = {
            $$typeof: o,
            _context: e,
          }),
          (e.Consumer = e)
        );
      }),
      (e.createElement = T),
      (e.createFactory = function (e) {
        var t = T.bind(null, e);
        return ((t.type = e), t);
      }),
      (e.createRef = function () {
        return {
          current: null,
        };
      }),
      (e.forwardRef = function (e) {
        return {
          $$typeof: c,
          render: e,
        };
      }),
      (e.isValidElement = D),
      (e.lazy = function (e) {
        return {
          $$typeof: d,
          _payload: {
            _status: -1,
            _result: e,
          },
          _init: N,
        };
      }),
      (e.memo = function (e, t) {
        return {
          $$typeof: u,
          type: e,
          compare: t === void 0 ? null : t,
        };
      }),
      (e.startTransition = function (e) {
        var t = F.transition;
        F.transition = {};
        try {
          e();
        } finally {
          F.transition = t;
        }
      }),
      (e.unstable_act = ee),
      (e.useCallback = function (e, t) {
        return P.current.useCallback(e, t);
      }),
      (e.useContext = function (e) {
        return P.current.useContext(e);
      }),
      (e.useDebugValue = function () {}),
      (e.useDeferredValue = function (e) {
        return P.current.useDeferredValue(e);
      }),
      (e.useEffect = function (e, t) {
        return P.current.useEffect(e, t);
      }),
      (e.useId = function () {
        return P.current.useId();
      }),
      (e.useImperativeHandle = function (e, t, n) {
        return P.current.useImperativeHandle(e, t, n);
      }),
      (e.useInsertionEffect = function (e, t) {
        return P.current.useInsertionEffect(e, t);
      }),
      (e.useLayoutEffect = function (e, t) {
        return P.current.useLayoutEffect(e, t);
      }),
      (e.useMemo = function (e, t) {
        return P.current.useMemo(e, t);
      }),
      (e.useReducer = function (e, t, n) {
        return P.current.useReducer(e, t, n);
      }),
      (e.useRef = function (e) {
        return P.current.useRef(e);
      }),
      (e.useState = function (e) {
        return P.current.useState(e);
      }),
      (e.useSyncExternalStore = function (e, t, n) {
        return P.current.useSyncExternalStore(e, t, n);
      }),
      (e.useTransition = function () {
        return P.current.useTransition();
      }),
      (e.version = `18.3.1`));
  }),
  p = s((e, t) => {
    t.exports = f();
  }),
  m = s((e) => {
    function t(e, t) {
      var n = e.length;
      e.push(t);
      a: for (; 0 < n;) {
        var r = (n - 1) >>> 1,
          a = e[r];
        if (0 < i(a, t)) ((e[r] = t), (e[n] = a), (n = r));
        else break a;
      }
    }
    function n(e) {
      return e.length === 0 ? null : e[0];
    }
    function r(e) {
      if (e.length === 0) return null;
      var t = e[0],
        n = e.pop();
      if (n !== t) {
        e[0] = n;
        a: for (var r = 0, a = e.length, o = a >>> 1; r < o;) {
          var s = 2 * (r + 1) - 1,
            c = e[s],
            l = s + 1,
            u = e[l];
          if (0 > i(c, n))
            l < a && 0 > i(u, c)
              ? ((e[r] = u), (e[l] = n), (r = l))
              : ((e[r] = c), (e[s] = n), (r = s));
          else if (l < a && 0 > i(u, n)) ((e[r] = u), (e[l] = n), (r = l));
          else break a;
        }
      }
      return t;
    }
    function i(e, t) {
      var n = e.sortIndex - t.sortIndex;
      return n === 0 ? e.id - t.id : n;
    }
    if (typeof performance == `object` && typeof performance.now == `function`) {
      var a = performance;
      e.unstable_now = function () {
        return a.now();
      };
    } else {
      var o = Date,
        s = o.now();
      e.unstable_now = function () {
        return o.now() - s;
      };
    }
    var c = [],
      l = [],
      u = 1,
      d = null,
      f = 3,
      p = !1,
      m = !1,
      h = !1,
      g = typeof setTimeout == `function` ? setTimeout : null,
      _ = typeof clearTimeout == `function` ? clearTimeout : null,
      v = typeof setImmediate < `u` ? setImmediate : null;
    typeof navigator < `u` &&
      navigator.scheduling !== void 0 &&
      navigator.scheduling.isInputPending !== void 0 &&
      navigator.scheduling.isInputPending.bind(navigator.scheduling);
    function y(e) {
      for (var i = n(l); i !== null;) {
        if (i.callback === null) r(l);
        else if (i.startTime <= e) (r(l), (i.sortIndex = i.expirationTime), t(c, i));
        else break;
        i = n(l);
      }
    }
    function b(e) {
      if (((h = !1), y(e), !m)) {
        if (n(c) !== null) ((m = !0), M(x));
        else {
          var t = n(l);
          t !== null && N(b, t.startTime - e);
        }
      }
    }
    function x(t, i) {
      ((m = !1), h && ((h = !1), _(w), (w = -1)), (p = !0));
      var a = f;
      try {
        for (y(i), d = n(c); d !== null && (!(d.expirationTime > i) || (t && !D()));) {
          var o = d.callback;
          if (typeof o == `function`) {
            ((d.callback = null), (f = d.priorityLevel));
            var s = o(d.expirationTime <= i);
            ((i = e.unstable_now()),
              typeof s == `function` ? (d.callback = s) : d === n(c) && r(c),
              y(i));
          } else r(c);
          d = n(c);
        }
        if (d !== null) var u = !0;
        else {
          var g = n(l);
          (g !== null && N(b, g.startTime - i), (u = !1));
        }
        return u;
      } finally {
        ((d = null), (f = a), (p = !1));
      }
    }
    var S = !1,
      C = null,
      w = -1,
      T = 5,
      E = -1;
    function D() {
      return !(e.unstable_now() - E < T);
    }
    function O() {
      if (C !== null) {
        var t = e.unstable_now();
        E = t;
        var n = !0;
        try {
          n = C(!0, t);
        } finally {
          n ? k() : ((S = !1), (C = null));
        }
      } else S = !1;
    }
    var k;
    if (typeof v == `function`)
      k = function () {
        v(O);
      };
    else if (typeof MessageChannel < `u`) {
      var A = new MessageChannel(),
        j = A.port2;
      ((A.port1.onmessage = O),
        (k = function () {
          j.postMessage(null);
        }));
    } else
      k = function () {
        g(O, 0);
      };
    function M(e) {
      ((C = e), S || ((S = !0), k()));
    }
    function N(t, n) {
      w = g(function () {
        t(e.unstable_now());
      }, n);
    }
    ((e.unstable_IdlePriority = 5),
      (e.unstable_ImmediatePriority = 1),
      (e.unstable_LowPriority = 4),
      (e.unstable_NormalPriority = 3),
      (e.unstable_Profiling = null),
      (e.unstable_UserBlockingPriority = 2),
      (e.unstable_cancelCallback = function (e) {
        e.callback = null;
      }),
      (e.unstable_continueExecution = function () {
        m || p || ((m = !0), M(x));
      }),
      (e.unstable_forceFrameRate = function (e) {
        0 > e || 125 < e
          ? console.error(
              `forceFrameRate takes a positive int between 0 and 125, forcing frame rates higher than 125 fps is not supported`,
            )
          : (T = 0 < e ? Math.floor(1e3 / e) : 5);
      }),
      (e.unstable_getCurrentPriorityLevel = function () {
        return f;
      }),
      (e.unstable_getFirstCallbackNode = function () {
        return n(c);
      }),
      (e.unstable_next = function (e) {
        switch (f) {
          case 1:
          case 2:
          case 3:
            var t = 3;
            break;
          default:
            t = f;
        }
        var n = f;
        f = t;
        try {
          return e();
        } finally {
          f = n;
        }
      }),
      (e.unstable_pauseExecution = function () {}),
      (e.unstable_requestPaint = function () {}),
      (e.unstable_runWithPriority = function (e, t) {
        switch (e) {
          case 1:
          case 2:
          case 3:
          case 4:
          case 5:
            break;
          default:
            e = 3;
        }
        var n = f;
        f = e;
        try {
          return t();
        } finally {
          f = n;
        }
      }),
      (e.unstable_scheduleCallback = function (r, i, a) {
        var o = e.unstable_now();
        switch (
          (typeof a == `object` && a
            ? ((a = a.delay), (a = typeof a == `number` && 0 < a ? o + a : o))
            : (a = o),
          r)
        ) {
          case 1:
            var s = -1;
            break;
          case 2:
            s = 250;
            break;
          case 5:
            s = 1073741823;
            break;
          case 4:
            s = 1e4;
            break;
          default:
            s = 5e3;
        }
        return (
          (s = a + s),
          (r = {
            id: u++,
            callback: i,
            priorityLevel: r,
            startTime: a,
            expirationTime: s,
            sortIndex: -1,
          }),
          a > o
            ? ((r.sortIndex = a),
              t(l, r),
              n(c) === null && r === n(l) && (h ? (_(w), (w = -1)) : (h = !0), N(b, a - o)))
            : ((r.sortIndex = s), t(c, r), m || p || ((m = !0), M(x))),
          r
        );
      }),
      (e.unstable_shouldYield = D),
      (e.unstable_wrapCallback = function (e) {
        var t = f;
        return function () {
          var n = f;
          f = t;
          try {
            return e.apply(this, arguments);
          } finally {
            f = n;
          }
        };
      }));
  }),
  h = s((e, t) => {
    t.exports = m();
  }),
  g = s((e) => {
    var t = p(),
      n = h();
    function r(e) {
      for (
        var t = `https://reactjs.org/docs/error-decoder.html?invariant=` + e, n = 1;
        n < arguments.length;
        n++
      )
        t += `&args[]=` + encodeURIComponent(arguments[n]);
      return (
        `Minified React error #` +
        e +
        `; visit ` +
        t +
        ` for the full message or use the non-minified dev environment for full errors and additional helpful warnings.`
      );
    }
    var i = new Set(),
      a = {};
    function o(e, t) {
      (s(e, t), s(e + `Capture`, t));
    }
    function s(e, t) {
      for (a[e] = t, e = 0; e < t.length; e++) i.add(t[e]);
    }
    var c = !(
        typeof window > `u` ||
        window.document === void 0 ||
        window.document.createElement === void 0
      ),
      l = Object.prototype.hasOwnProperty,
      u =
        /^[:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD][:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD\-.0-9\u00B7\u0300-\u036F\u203F-\u2040]*$/,
      d = {},
      f = {};
    function m(e) {
      return l.call(f, e) ? !0 : l.call(d, e) ? !1 : u.test(e) ? (f[e] = !0) : ((d[e] = !0), !1);
    }
    function g(e, t, n, r) {
      if (n !== null && n.type === 0) return !1;
      switch (typeof t) {
        case `function`:
        case `symbol`:
          return !0;
        case `boolean`:
          return r
            ? !1
            : n === null
              ? ((e = e.toLowerCase().slice(0, 5)), e !== `data-` && e !== `aria-`)
              : !n.acceptsBooleans;
        default:
          return !1;
      }
    }
    function _(e, t, n, r) {
      if (t == null || g(e, t, n, r)) return !0;
      if (r) return !1;
      if (n !== null)
        switch (n.type) {
          case 3:
            return !t;
          case 4:
            return !1 === t;
          case 5:
            return isNaN(t);
          case 6:
            return isNaN(t) || 1 > t;
        }
      return !1;
    }
    function v(e, t, n, r, i, a, o) {
      ((this.acceptsBooleans = t === 2 || t === 3 || t === 4),
        (this.attributeName = r),
        (this.attributeNamespace = i),
        (this.mustUseProperty = n),
        (this.propertyName = e),
        (this.type = t),
        (this.sanitizeURL = a),
        (this.removeEmptyString = o));
    }
    var y = {};
    (`children dangerouslySetInnerHTML defaultValue defaultChecked innerHTML suppressContentEditableWarning suppressHydrationWarning style`
      .split(` `)
      .forEach(function (e) {
        y[e] = new v(e, 0, !1, e, null, !1, !1);
      }),
      [
        [`acceptCharset`, `accept-charset`],
        [`className`, `class`],
        [`htmlFor`, `for`],
        [`httpEquiv`, `http-equiv`],
      ].forEach(function (e) {
        var t = e[0];
        y[t] = new v(t, 1, !1, e[1], null, !1, !1);
      }),
      [`contentEditable`, `draggable`, `spellCheck`, `value`].forEach(function (e) {
        y[e] = new v(e, 2, !1, e.toLowerCase(), null, !1, !1);
      }),
      [`autoReverse`, `externalResourcesRequired`, `focusable`, `preserveAlpha`].forEach(
        function (e) {
          y[e] = new v(e, 2, !1, e, null, !1, !1);
        },
      ),
      `allowFullScreen async autoFocus autoPlay controls default defer disabled disablePictureInPicture disableRemotePlayback formNoValidate hidden loop noModule noValidate open playsInline readOnly required reversed scoped seamless itemScope`
        .split(` `)
        .forEach(function (e) {
          y[e] = new v(e, 3, !1, e.toLowerCase(), null, !1, !1);
        }),
      [`checked`, `multiple`, `muted`, `selected`].forEach(function (e) {
        y[e] = new v(e, 3, !0, e, null, !1, !1);
      }),
      [`capture`, `download`].forEach(function (e) {
        y[e] = new v(e, 4, !1, e, null, !1, !1);
      }),
      [`cols`, `rows`, `size`, `span`].forEach(function (e) {
        y[e] = new v(e, 6, !1, e, null, !1, !1);
      }),
      [`rowSpan`, `start`].forEach(function (e) {
        y[e] = new v(e, 5, !1, e.toLowerCase(), null, !1, !1);
      }));
    var b = /[\-:]([a-z])/g;
    function x(e) {
      return e[1].toUpperCase();
    }
    (`accent-height alignment-baseline arabic-form baseline-shift cap-height clip-path clip-rule color-interpolation color-interpolation-filters color-profile color-rendering dominant-baseline enable-background fill-opacity fill-rule flood-color flood-opacity font-family font-size font-size-adjust font-stretch font-style font-variant font-weight glyph-name glyph-orientation-horizontal glyph-orientation-vertical horiz-adv-x horiz-origin-x image-rendering letter-spacing lighting-color marker-end marker-mid marker-start overline-position overline-thickness paint-order panose-1 pointer-events rendering-intent shape-rendering stop-color stop-opacity strikethrough-position strikethrough-thickness stroke-dasharray stroke-dashoffset stroke-linecap stroke-linejoin stroke-miterlimit stroke-opacity stroke-width text-anchor text-decoration text-rendering underline-position underline-thickness unicode-bidi unicode-range units-per-em v-alphabetic v-hanging v-ideographic v-mathematical vector-effect vert-adv-y vert-origin-x vert-origin-y word-spacing writing-mode xmlns:xlink x-height`
      .split(` `)
      .forEach(function (e) {
        var t = e.replace(b, x);
        y[t] = new v(t, 1, !1, e, null, !1, !1);
      }),
      `xlink:actuate xlink:arcrole xlink:role xlink:show xlink:title xlink:type`
        .split(` `)
        .forEach(function (e) {
          var t = e.replace(b, x);
          y[t] = new v(t, 1, !1, e, `http://www.w3.org/1999/xlink`, !1, !1);
        }),
      [`xml:base`, `xml:lang`, `xml:space`].forEach(function (e) {
        var t = e.replace(b, x);
        y[t] = new v(t, 1, !1, e, `http://www.w3.org/XML/1998/namespace`, !1, !1);
      }),
      [`tabIndex`, `crossOrigin`].forEach(function (e) {
        y[e] = new v(e, 1, !1, e.toLowerCase(), null, !1, !1);
      }),
      (y.xlinkHref = new v(
        `xlinkHref`,
        1,
        !1,
        `xlink:href`,
        `http://www.w3.org/1999/xlink`,
        !0,
        !1,
      )),
      [`src`, `href`, `action`, `formAction`].forEach(function (e) {
        y[e] = new v(e, 1, !1, e.toLowerCase(), null, !0, !0);
      }));
    function S(e, t, n, r) {
      var i = y.hasOwnProperty(t) ? y[t] : null;
      (i === null
        ? r || !(2 < t.length) || (t[0] !== `o` && t[0] !== `O`) || (t[1] !== `n` && t[1] !== `N`)
        : i.type !== 0) &&
        (_(t, n, i, r) && (n = null),
        r || i === null
          ? m(t) && (n === null ? e.removeAttribute(t) : e.setAttribute(t, `` + n))
          : i.mustUseProperty
            ? (e[i.propertyName] = n === null ? i.type !== 3 && `` : n)
            : ((t = i.attributeName),
              (r = i.attributeNamespace),
              n === null
                ? e.removeAttribute(t)
                : ((i = i.type),
                  (n = i === 3 || (i === 4 && !0 === n) ? `` : `` + n),
                  r ? e.setAttributeNS(r, t, n) : e.setAttribute(t, n))));
    }
    var C = t.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED,
      w = Symbol.for(`react.element`),
      T = Symbol.for(`react.portal`),
      E = Symbol.for(`react.fragment`),
      D = Symbol.for(`react.strict_mode`),
      O = Symbol.for(`react.profiler`),
      k = Symbol.for(`react.provider`),
      A = Symbol.for(`react.context`),
      j = Symbol.for(`react.forward_ref`),
      M = Symbol.for(`react.suspense`),
      N = Symbol.for(`react.suspense_list`),
      P = Symbol.for(`react.memo`),
      F = Symbol.for(`react.lazy`),
      I = Symbol.for(`react.offscreen`),
      ee = Symbol.iterator;
    function te(e) {
      return typeof e != `object` || !e
        ? null
        : ((e = (ee && e[ee]) || e[`@@iterator`]), typeof e == `function` ? e : null);
    }
    var L = Object.assign,
      ne;
    function re(e) {
      if (ne === void 0)
        try {
          throw Error();
        } catch (e) {
          var t = e.stack.trim().match(/\n( *(at )?)/);
          ne = (t && t[1]) || ``;
        }
      return (
        `
` +
        ne +
        e
      );
    }
    var ie = !1;
    function ae(e, t) {
      if (!e || ie) return ``;
      ie = !0;
      var n = Error.prepareStackTrace;
      Error.prepareStackTrace = void 0;
      try {
        if (t) {
          if (
            ((t = function () {
              throw Error();
            }),
            Object.defineProperty(t.prototype, 'props', {
              set: function () {
                throw Error();
              },
            }),
            typeof Reflect == `object` && Reflect.construct)
          ) {
            try {
              Reflect.construct(t, []);
            } catch (e) {
              var r = e;
            }
            Reflect.construct(e, [], t);
          } else {
            try {
              t.call();
            } catch (e) {
              r = e;
            }
            e.call(t.prototype);
          }
        } else {
          try {
            throw Error();
          } catch (e) {
            r = e;
          }
          e();
        }
      } catch (t) {
        if (t && r && typeof t.stack == `string`) {
          for (
            var i = t.stack.split(`
`),
              a = r.stack.split(`
`),
              o = i.length - 1,
              s = a.length - 1;
            1 <= o && 0 <= s && i[o] !== a[s];
          )
            s--;
          for (; 1 <= o && 0 <= s; o--, s--)
            if (i[o] !== a[s]) {
              if (o !== 1 || s !== 1)
                do
                  if ((o--, s--, 0 > s || i[o] !== a[s])) {
                    var c =
                      `
` + i[o].replace(` at new `, ` at `);
                    return (
                      e.displayName &&
                        c.includes(`<anonymous>`) &&
                        (c = c.replace(`<anonymous>`, e.displayName)),
                      c
                    );
                  }
                while (1 <= o && 0 <= s);
              break;
            }
        }
      } finally {
        ((ie = !1), (Error.prepareStackTrace = n));
      }
      return (e = e ? e.displayName || e.name : ``) ? re(e) : ``;
    }
    function oe(e) {
      switch (e.tag) {
        case 5:
          return re(e.type);
        case 16:
          return re(`Lazy`);
        case 13:
          return re(`Suspense`);
        case 19:
          return re(`SuspenseList`);
        case 0:
        case 2:
        case 15:
          return ((e = ae(e.type, !1)), e);
        case 11:
          return ((e = ae(e.type.render, !1)), e);
        case 1:
          return ((e = ae(e.type, !0)), e);
        default:
          return ``;
      }
    }
    function se(e) {
      if (e == null) return null;
      if (typeof e == `function`) return e.displayName || e.name || null;
      if (typeof e == `string`) return e;
      switch (e) {
        case E:
          return `Fragment`;
        case T:
          return `Portal`;
        case O:
          return `Profiler`;
        case D:
          return `StrictMode`;
        case M:
          return `Suspense`;
        case N:
          return `SuspenseList`;
      }
      if (typeof e == `object`)
        switch (e.$$typeof) {
          case A:
            return (e.displayName || `Context`) + `.Consumer`;
          case k:
            return (e._context.displayName || `Context`) + `.Provider`;
          case j:
            var t = e.render;
            return (
              (e = e.displayName),
              (e ||=
                ((e = t.displayName || t.name || ``),
                e === `` ? `ForwardRef` : `ForwardRef(` + e + `)`)),
              e
            );
          case P:
            return ((t = e.displayName || null), t === null ? se(e.type) || `Memo` : t);
          case F:
            ((t = e._payload), (e = e._init));
            try {
              return se(e(t));
            } catch {}
        }
      return null;
    }
    function ce(e) {
      var t = e.type;
      switch (e.tag) {
        case 24:
          return `Cache`;
        case 9:
          return (t.displayName || `Context`) + `.Consumer`;
        case 10:
          return (t._context.displayName || `Context`) + `.Provider`;
        case 18:
          return `DehydratedFragment`;
        case 11:
          return (
            (e = t.render),
            (e = e.displayName || e.name || ``),
            t.displayName || (e === `` ? `ForwardRef` : `ForwardRef(` + e + `)`)
          );
        case 7:
          return `Fragment`;
        case 5:
          return t;
        case 4:
          return `Portal`;
        case 3:
          return `Root`;
        case 6:
          return `Text`;
        case 16:
          return se(t);
        case 8:
          return t === D ? `StrictMode` : `Mode`;
        case 22:
          return `Offscreen`;
        case 12:
          return `Profiler`;
        case 21:
          return `Scope`;
        case 13:
          return `Suspense`;
        case 19:
          return `SuspenseList`;
        case 25:
          return `TracingMarker`;
        case 1:
        case 0:
        case 17:
        case 2:
        case 14:
        case 15:
          if (typeof t == `function`) return t.displayName || t.name || null;
          if (typeof t == `string`) return t;
      }
      return null;
    }
    function le(e) {
      switch (typeof e) {
        case `boolean`:
        case `number`:
        case `string`:
        case `undefined`:
          return e;
        case `object`:
          return e;
        default:
          return ``;
      }
    }
    function ue(e) {
      var t = e.type;
      return (e = e.nodeName) && e.toLowerCase() === `input` && (t === `checkbox` || t === `radio`);
    }
    function de(e) {
      var t = ue(e) ? `checked` : `value`,
        n = Object.getOwnPropertyDescriptor(e.constructor.prototype, t),
        r = `` + e[t];
      if (
        !e.hasOwnProperty(t) &&
        n !== void 0 &&
        typeof n.get == `function` &&
        typeof n.set == `function`
      ) {
        var i = n.get,
          a = n.set;
        return (
          Object.defineProperty(e, t, {
            configurable: !0,
            get: function () {
              return i.call(this);
            },
            set: function (e) {
              ((r = `` + e), a.call(this, e));
            },
          }),
          Object.defineProperty(e, t, {
            enumerable: n.enumerable,
          }),
          {
            getValue: function () {
              return r;
            },
            setValue: function (e) {
              r = `` + e;
            },
            stopTracking: function () {
              ((e._valueTracker = null), delete e[t]);
            },
          }
        );
      }
    }
    function fe(e) {
      e._valueTracker ||= de(e);
    }
    function pe(e) {
      if (!e) return !1;
      var t = e._valueTracker;
      if (!t) return !0;
      var n = t.getValue(),
        r = ``;
      return (
        e && (r = ue(e) ? (e.checked ? `true` : `false`) : e.value),
        (e = r),
        e !== n && (t.setValue(e), !0)
      );
    }
    function R(e) {
      if (((e ||= typeof document < `u` ? document : void 0), e === void 0)) return null;
      try {
        return e.activeElement || e.body;
      } catch {
        return e.body;
      }
    }
    function me(e, t) {
      var n = t.checked;
      return L({}, t, {
        defaultChecked: void 0,
        defaultValue: void 0,
        value: void 0,
        checked: n ?? e._wrapperState.initialChecked,
      });
    }
    function he(e, t) {
      var n = t.defaultValue == null ? `` : t.defaultValue,
        r = t.checked == null ? t.defaultChecked : t.checked;
      ((n = le(t.value == null ? n : t.value)),
        (e._wrapperState = {
          initialChecked: r,
          initialValue: n,
          controlled:
            t.type === `checkbox` || t.type === `radio` ? t.checked != null : t.value != null,
        }));
    }
    function ge(e, t) {
      ((t = t.checked), t != null && S(e, `checked`, t, !1));
    }
    function _e(e, t) {
      ge(e, t);
      var n = le(t.value),
        r = t.type;
      if (n != null)
        r === `number`
          ? ((n === 0 && e.value === ``) || e.value != n) && (e.value = `` + n)
          : e.value !== `` + n && (e.value = `` + n);
      else if (r === `submit` || r === `reset`) {
        e.removeAttribute(`value`);
        return;
      }
      (t.hasOwnProperty(`value`)
        ? z(e, t.type, n)
        : t.hasOwnProperty(`defaultValue`) && z(e, t.type, le(t.defaultValue)),
        t.checked == null && t.defaultChecked != null && (e.defaultChecked = !!t.defaultChecked));
    }
    function ve(e, t, n) {
      if (t.hasOwnProperty(`value`) || t.hasOwnProperty(`defaultValue`)) {
        var r = t.type;
        if (!((r !== `submit` && r !== `reset`) || (t.value !== void 0 && t.value !== null)))
          return;
        ((t = `` + e._wrapperState.initialValue),
          n || t === e.value || (e.value = t),
          (e.defaultValue = t));
      }
      ((n = e.name),
        n !== `` && (e.name = ``),
        (e.defaultChecked = !!e._wrapperState.initialChecked),
        n !== `` && (e.name = n));
    }
    function z(e, t, n) {
      (t !== `number` || R(e.ownerDocument) !== e) &&
        (n == null
          ? (e.defaultValue = `` + e._wrapperState.initialValue)
          : e.defaultValue !== `` + n && (e.defaultValue = `` + n));
    }
    var ye = Array.isArray;
    function B(e, t, n, r) {
      if (((e = e.options), t)) {
        t = {};
        for (var i = 0; i < n.length; i++) t[`$` + n[i]] = !0;
        for (n = 0; n < e.length; n++)
          ((i = t.hasOwnProperty(`$` + e[n].value)),
            e[n].selected !== i && (e[n].selected = i),
            i && r && (e[n].defaultSelected = !0));
      } else {
        for (n = `` + le(n), t = null, i = 0; i < e.length; i++) {
          if (e[i].value === n) {
            ((e[i].selected = !0), r && (e[i].defaultSelected = !0));
            return;
          }
          t !== null || e[i].disabled || (t = e[i]);
        }
        t !== null && (t.selected = !0);
      }
    }
    function be(e, t) {
      if (t.dangerouslySetInnerHTML != null) throw Error(r(91));
      return L({}, t, {
        value: void 0,
        defaultValue: void 0,
        children: `` + e._wrapperState.initialValue,
      });
    }
    function V(e, t) {
      var n = t.value;
      if (n == null) {
        if (((n = t.children), (t = t.defaultValue), n != null)) {
          if (t != null) throw Error(r(92));
          if (ye(n)) {
            if (1 < n.length) throw Error(r(93));
            n = n[0];
          }
          t = n;
        }
        ((t ??= ``), (n = t));
      }
      e._wrapperState = {
        initialValue: le(n),
      };
    }
    function xe(e, t) {
      var n = le(t.value),
        r = le(t.defaultValue);
      (n != null &&
        ((n = `` + n),
        n !== e.value && (e.value = n),
        t.defaultValue == null && e.defaultValue !== n && (e.defaultValue = n)),
        r != null && (e.defaultValue = `` + r));
    }
    function H(e) {
      var t = e.textContent;
      t === e._wrapperState.initialValue && t !== `` && t !== null && (e.value = t);
    }
    function U(e) {
      switch (e) {
        case `svg`:
          return `http://www.w3.org/2000/svg`;
        case `math`:
          return `http://www.w3.org/1998/Math/MathML`;
        default:
          return `http://www.w3.org/1999/xhtml`;
      }
    }
    function Se(e, t) {
      return e == null || e === `http://www.w3.org/1999/xhtml`
        ? U(t)
        : e === `http://www.w3.org/2000/svg` && t === `foreignObject`
          ? `http://www.w3.org/1999/xhtml`
          : e;
    }
    var Ce,
      we = (function (e) {
        return typeof MSApp < `u` && MSApp.execUnsafeLocalFunction
          ? function (t, n, r, i) {
              MSApp.execUnsafeLocalFunction(function () {
                return e(t, n, r, i);
              });
            }
          : e;
      })(function (e, t) {
        if (e.namespaceURI !== `http://www.w3.org/2000/svg` || `innerHTML` in e) e.innerHTML = t;
        else {
          for (
            Ce ||= document.createElement(`div`),
              Ce.innerHTML = `<svg>` + t.valueOf().toString() + `</svg>`,
              t = Ce.firstChild;
            e.firstChild;
          )
            e.removeChild(e.firstChild);
          for (; t.firstChild;) e.appendChild(t.firstChild);
        }
      });
    function Te(e, t) {
      if (t) {
        var n = e.firstChild;
        if (n && n === e.lastChild && n.nodeType === 3) {
          n.nodeValue = t;
          return;
        }
      }
      e.textContent = t;
    }
    var Ee = {
        animationIterationCount: !0,
        aspectRatio: !0,
        borderImageOutset: !0,
        borderImageSlice: !0,
        borderImageWidth: !0,
        boxFlex: !0,
        boxFlexGroup: !0,
        boxOrdinalGroup: !0,
        columnCount: !0,
        columns: !0,
        flex: !0,
        flexGrow: !0,
        flexPositive: !0,
        flexShrink: !0,
        flexNegative: !0,
        flexOrder: !0,
        gridArea: !0,
        gridRow: !0,
        gridRowEnd: !0,
        gridRowSpan: !0,
        gridRowStart: !0,
        gridColumn: !0,
        gridColumnEnd: !0,
        gridColumnSpan: !0,
        gridColumnStart: !0,
        fontWeight: !0,
        lineClamp: !0,
        lineHeight: !0,
        opacity: !0,
        order: !0,
        orphans: !0,
        tabSize: !0,
        widows: !0,
        zIndex: !0,
        zoom: !0,
        fillOpacity: !0,
        floodOpacity: !0,
        stopOpacity: !0,
        strokeDasharray: !0,
        strokeDashoffset: !0,
        strokeMiterlimit: !0,
        strokeOpacity: !0,
        strokeWidth: !0,
      },
      De = [`Webkit`, `ms`, `Moz`, `O`];
    Object.keys(Ee).forEach(function (e) {
      De.forEach(function (t) {
        ((t = t + e.charAt(0).toUpperCase() + e.substring(1)), (Ee[t] = Ee[e]));
      });
    });
    function Oe(e, t, n) {
      return t == null || typeof t == `boolean` || t === ``
        ? ``
        : n || typeof t != `number` || t === 0 || (Ee.hasOwnProperty(e) && Ee[e])
          ? (`` + t).trim()
          : t + `px`;
    }
    function ke(e, t) {
      for (var n in ((e = e.style), t))
        if (t.hasOwnProperty(n)) {
          var r = n.indexOf(`--`) === 0,
            i = Oe(n, t[n], r);
          (n === `float` && (n = `cssFloat`), r ? e.setProperty(n, i) : (e[n] = i));
        }
    }
    var Ae = L(
      {
        menuitem: !0,
      },
      {
        area: !0,
        base: !0,
        br: !0,
        col: !0,
        embed: !0,
        hr: !0,
        img: !0,
        input: !0,
        keygen: !0,
        link: !0,
        meta: !0,
        param: !0,
        source: !0,
        track: !0,
        wbr: !0,
      },
    );
    function je(e, t) {
      if (t) {
        if (Ae[e] && (t.children != null || t.dangerouslySetInnerHTML != null))
          throw Error(r(137, e));
        if (t.dangerouslySetInnerHTML != null) {
          if (t.children != null) throw Error(r(60));
          if (
            typeof t.dangerouslySetInnerHTML != `object` ||
            !(`__html` in t.dangerouslySetInnerHTML)
          )
            throw Error(r(61));
        }
        if (t.style != null && typeof t.style != `object`) throw Error(r(62));
      }
    }
    function Me(e, t) {
      if (e.indexOf(`-`) === -1) return typeof t.is == `string`;
      switch (e) {
        case `annotation-xml`:
        case `color-profile`:
        case `font-face`:
        case `font-face-src`:
        case `font-face-uri`:
        case `font-face-format`:
        case `font-face-name`:
        case `missing-glyph`:
          return !1;
        default:
          return !0;
      }
    }
    var Ne = null;
    function Pe(e) {
      return (
        (e = e.target || e.srcElement || window),
        e.correspondingUseElement && (e = e.correspondingUseElement),
        e.nodeType === 3 ? e.parentNode : e
      );
    }
    var Fe = null,
      Ie = null,
      Le = null;
    function Re(e) {
      if ((e = Ri(e))) {
        if (typeof Fe != `function`) throw Error(r(280));
        var t = e.stateNode;
        t && ((t = Bi(t)), Fe(e.stateNode, e.type, t));
      }
    }
    function ze(e) {
      Ie ? (Le ? Le.push(e) : (Le = [e])) : (Ie = e);
    }
    function Be() {
      if (Ie) {
        var e = Ie,
          t = Le;
        if (((Le = Ie = null), Re(e), t)) for (e = 0; e < t.length; e++) Re(t[e]);
      }
    }
    function Ve(e, t) {
      return e(t);
    }
    function He() {}
    var Ue = !1;
    function We(e, t, n) {
      if (Ue) return e(t, n);
      Ue = !0;
      try {
        return Ve(e, t, n);
      } finally {
        ((Ue = !1), (Ie !== null || Le !== null) && (He(), Be()));
      }
    }
    function Ge(e, t) {
      var n = e.stateNode;
      if (n === null) return null;
      var i = Bi(n);
      if (i === null) return null;
      n = i[t];
      a: switch (t) {
        case `onClick`:
        case `onClickCapture`:
        case `onDoubleClick`:
        case `onDoubleClickCapture`:
        case `onMouseDown`:
        case `onMouseDownCapture`:
        case `onMouseMove`:
        case `onMouseMoveCapture`:
        case `onMouseUp`:
        case `onMouseUpCapture`:
        case `onMouseEnter`:
          ((i = !i.disabled) ||
            ((e = e.type),
            (i = e !== `button` && e !== `input` && e !== `select` && e !== `textarea`)),
            (e = !i));
          break a;
        default:
          e = !1;
      }
      if (e) return null;
      if (n && typeof n != `function`) throw Error(r(231, t, typeof n));
      return n;
    }
    var Ke = !1;
    if (c)
      try {
        var qe = {};
        (Object.defineProperty(qe, 'passive', {
          get: function () {
            Ke = !0;
          },
        }),
          window.addEventListener(`test`, qe, qe),
          window.removeEventListener(`test`, qe, qe));
      } catch {
        Ke = !1;
      }
    function Je(e, t, n, r, i, a, o, s, c) {
      var l = Array.prototype.slice.call(arguments, 3);
      try {
        t.apply(n, l);
      } catch (e) {
        this.onError(e);
      }
    }
    var Ye = !1,
      Xe = null,
      Ze = !1,
      Qe = null,
      $e = {
        onError: function (e) {
          ((Ye = !0), (Xe = e));
        },
      };
    function et(e, t, n, r, i, a, o, s, c) {
      ((Ye = !1), (Xe = null), Je.apply($e, arguments));
    }
    function tt(e, t, n, i, a, o, s, c, l) {
      if ((et.apply(this, arguments), Ye)) {
        if (Ye) {
          var u = Xe;
          ((Ye = !1), (Xe = null));
        } else throw Error(r(198));
        Ze || ((Ze = !0), (Qe = u));
      }
    }
    function nt(e) {
      var t = e,
        n = e;
      if (e.alternate) for (; t.return;) t = t.return;
      else {
        e = t;
        do ((t = e), t.flags & 4098 && (n = t.return), (e = t.return));
        while (e);
      }
      return t.tag === 3 ? n : null;
    }
    function rt(e) {
      if (e.tag === 13) {
        var t = e.memoizedState;
        if ((t === null && ((e = e.alternate), e !== null && (t = e.memoizedState)), t !== null))
          return t.dehydrated;
      }
      return null;
    }
    function it(e) {
      if (nt(e) !== e) throw Error(r(188));
    }
    function at(e) {
      var t = e.alternate;
      if (!t) {
        if (((t = nt(e)), t === null)) throw Error(r(188));
        return t === e ? e : null;
      }
      for (var n = e, i = t; ;) {
        var a = n.return;
        if (a === null) break;
        var o = a.alternate;
        if (o === null) {
          if (((i = a.return), i !== null)) {
            n = i;
            continue;
          }
          break;
        }
        if (a.child === o.child) {
          for (o = a.child; o;) {
            if (o === n) return (it(a), e);
            if (o === i) return (it(a), t);
            o = o.sibling;
          }
          throw Error(r(188));
        }
        if (n.return !== i.return) ((n = a), (i = o));
        else {
          for (var s = !1, c = a.child; c;) {
            if (c === n) {
              ((s = !0), (n = a), (i = o));
              break;
            }
            if (c === i) {
              ((s = !0), (i = a), (n = o));
              break;
            }
            c = c.sibling;
          }
          if (!s) {
            for (c = o.child; c;) {
              if (c === n) {
                ((s = !0), (n = o), (i = a));
                break;
              }
              if (c === i) {
                ((s = !0), (i = o), (n = a));
                break;
              }
              c = c.sibling;
            }
            if (!s) throw Error(r(189));
          }
        }
        if (n.alternate !== i) throw Error(r(190));
      }
      if (n.tag !== 3) throw Error(r(188));
      return n.stateNode.current === n ? e : t;
    }
    function ot(e) {
      return ((e = at(e)), e === null ? null : st(e));
    }
    function st(e) {
      if (e.tag === 5 || e.tag === 6) return e;
      for (e = e.child; e !== null;) {
        var t = st(e);
        if (t !== null) return t;
        e = e.sibling;
      }
      return null;
    }
    var ct = n.unstable_scheduleCallback,
      lt = n.unstable_cancelCallback,
      ut = n.unstable_shouldYield,
      dt = n.unstable_requestPaint,
      ft = n.unstable_now,
      pt = n.unstable_getCurrentPriorityLevel,
      mt = n.unstable_ImmediatePriority,
      ht = n.unstable_UserBlockingPriority,
      gt = n.unstable_NormalPriority,
      _t = n.unstable_LowPriority,
      vt = n.unstable_IdlePriority,
      yt = null,
      bt = null;
    function xt(e) {
      if (bt && typeof bt.onCommitFiberRoot == `function`)
        try {
          bt.onCommitFiberRoot(yt, e, void 0, (e.current.flags & 128) == 128);
        } catch {}
    }
    var St = Math.clz32 ? Math.clz32 : Tt,
      Ct = Math.log,
      wt = Math.LN2;
    function Tt(e) {
      return ((e >>>= 0), e === 0 ? 32 : (31 - ((Ct(e) / wt) | 0)) | 0);
    }
    var Et = 64,
      Dt = 4194304;
    function Ot(e) {
      switch (e & -e) {
        case 1:
          return 1;
        case 2:
          return 2;
        case 4:
          return 4;
        case 8:
          return 8;
        case 16:
          return 16;
        case 32:
          return 32;
        case 64:
        case 128:
        case 256:
        case 512:
        case 1024:
        case 2048:
        case 4096:
        case 8192:
        case 16384:
        case 32768:
        case 65536:
        case 131072:
        case 262144:
        case 524288:
        case 1048576:
        case 2097152:
          return e & 4194240;
        case 4194304:
        case 8388608:
        case 16777216:
        case 33554432:
        case 67108864:
          return e & 130023424;
        case 134217728:
          return 134217728;
        case 268435456:
          return 268435456;
        case 536870912:
          return 536870912;
        case 1073741824:
          return 1073741824;
        default:
          return e;
      }
    }
    function kt(e, t) {
      var n = e.pendingLanes;
      if (n === 0) return 0;
      var r = 0,
        i = e.suspendedLanes,
        a = e.pingedLanes,
        o = n & 268435455;
      if (o !== 0) {
        var s = o & ~i;
        s === 0 ? ((a &= o), a !== 0 && (r = Ot(a))) : (r = Ot(s));
      } else ((o = n & ~i), o === 0 ? a !== 0 && (r = Ot(a)) : (r = Ot(o)));
      if (r === 0) return 0;
      if (
        t !== 0 &&
        t !== r &&
        (t & i) === 0 &&
        ((i = r & -r), (a = t & -t), i >= a || (i === 16 && a & 4194240))
      )
        return t;
      if ((r & 4 && (r |= n & 16), (t = e.entangledLanes), t !== 0))
        for (e = e.entanglements, t &= r; 0 < t;)
          ((n = 31 - St(t)), (i = 1 << n), (r |= e[n]), (t &= ~i));
      return r;
    }
    function At(e, t) {
      switch (e) {
        case 1:
        case 2:
        case 4:
          return t + 250;
        case 8:
        case 16:
        case 32:
        case 64:
        case 128:
        case 256:
        case 512:
        case 1024:
        case 2048:
        case 4096:
        case 8192:
        case 16384:
        case 32768:
        case 65536:
        case 131072:
        case 262144:
        case 524288:
        case 1048576:
        case 2097152:
          return t + 5e3;
        case 4194304:
        case 8388608:
        case 16777216:
        case 33554432:
        case 67108864:
          return -1;
        case 134217728:
        case 268435456:
        case 536870912:
        case 1073741824:
          return -1;
        default:
          return -1;
      }
    }
    function jt(e, t) {
      for (
        var n = e.suspendedLanes, r = e.pingedLanes, i = e.expirationTimes, a = e.pendingLanes;
        0 < a;
      ) {
        var o = 31 - St(a),
          s = 1 << o,
          c = i[o];
        (c === -1
          ? ((s & n) === 0 || (s & r) !== 0) && (i[o] = At(s, t))
          : c <= t && (e.expiredLanes |= s),
          (a &= ~s));
      }
    }
    function Mt(e) {
      return ((e = e.pendingLanes & -1073741825), e === 0 ? (e & 1073741824 ? 1073741824 : 0) : e);
    }
    function Nt() {
      var e = Et;
      return ((Et <<= 1), !(Et & 4194240) && (Et = 64), e);
    }
    function Pt(e) {
      for (var t = [], n = 0; 31 > n; n++) t.push(e);
      return t;
    }
    function Ft(e, t, n) {
      ((e.pendingLanes |= t),
        t !== 536870912 && ((e.suspendedLanes = 0), (e.pingedLanes = 0)),
        (e = e.eventTimes),
        (t = 31 - St(t)),
        (e[t] = n));
    }
    function It(e, t) {
      var n = e.pendingLanes & ~t;
      ((e.pendingLanes = t),
        (e.suspendedLanes = 0),
        (e.pingedLanes = 0),
        (e.expiredLanes &= t),
        (e.mutableReadLanes &= t),
        (e.entangledLanes &= t),
        (t = e.entanglements));
      var r = e.eventTimes;
      for (e = e.expirationTimes; 0 < n;) {
        var i = 31 - St(n),
          a = 1 << i;
        ((t[i] = 0), (r[i] = -1), (e[i] = -1), (n &= ~a));
      }
    }
    function Lt(e, t) {
      var n = (e.entangledLanes |= t);
      for (e = e.entanglements; n;) {
        var r = 31 - St(n),
          i = 1 << r;
        ((i & t) | (e[r] & t) && (e[r] |= t), (n &= ~i));
      }
    }
    var Rt = 0;
    function zt(e) {
      return ((e &= -e), 1 < e ? (4 < e ? (e & 268435455 ? 16 : 536870912) : 4) : 1);
    }
    var Bt,
      Vt,
      Ht,
      Ut,
      Wt,
      Gt = !1,
      Kt = [],
      qt = null,
      Jt = null,
      Yt = null,
      Xt = new Map(),
      Zt = new Map(),
      Qt = [],
      $t =
        `mousedown mouseup touchcancel touchend touchstart auxclick dblclick pointercancel pointerdown pointerup dragend dragstart drop compositionend compositionstart keydown keypress keyup input textInput copy cut paste click change contextmenu reset submit`.split(
          ` `,
        );
    function en(e, t) {
      switch (e) {
        case `focusin`:
        case `focusout`:
          qt = null;
          break;
        case `dragenter`:
        case `dragleave`:
          Jt = null;
          break;
        case `mouseover`:
        case `mouseout`:
          Yt = null;
          break;
        case `pointerover`:
        case `pointerout`:
          Xt.delete(t.pointerId);
          break;
        case `gotpointercapture`:
        case `lostpointercapture`:
          Zt.delete(t.pointerId);
      }
    }
    function tn(e, t, n, r, i, a) {
      return e === null || e.nativeEvent !== a
        ? ((e = {
            blockedOn: t,
            domEventName: n,
            eventSystemFlags: r,
            nativeEvent: a,
            targetContainers: [i],
          }),
          t !== null && ((t = Ri(t)), t !== null && Vt(t)),
          e)
        : ((e.eventSystemFlags |= r),
          (t = e.targetContainers),
          i !== null && t.indexOf(i) === -1 && t.push(i),
          e);
    }
    function nn(e, t, n, r, i) {
      switch (t) {
        case `focusin`:
          return ((qt = tn(qt, e, t, n, r, i)), !0);
        case `dragenter`:
          return ((Jt = tn(Jt, e, t, n, r, i)), !0);
        case `mouseover`:
          return ((Yt = tn(Yt, e, t, n, r, i)), !0);
        case `pointerover`:
          var a = i.pointerId;
          return (Xt.set(a, tn(Xt.get(a) || null, e, t, n, r, i)), !0);
        case `gotpointercapture`:
          return ((a = i.pointerId), Zt.set(a, tn(Zt.get(a) || null, e, t, n, r, i)), !0);
      }
      return !1;
    }
    function rn(e) {
      var t = Li(e.target);
      if (t !== null) {
        var n = nt(t);
        if (n !== null) {
          if (((t = n.tag), t === 13)) {
            if (((t = rt(n)), t !== null)) {
              ((e.blockedOn = t),
                Wt(e.priority, function () {
                  Ht(n);
                }));
              return;
            }
          } else if (t === 3 && n.stateNode.current.memoizedState.isDehydrated) {
            e.blockedOn = n.tag === 3 ? n.stateNode.containerInfo : null;
            return;
          }
        }
      }
      e.blockedOn = null;
    }
    function an(e) {
      if (e.blockedOn !== null) return !1;
      for (var t = e.targetContainers; 0 < t.length;) {
        var n = gn(e.domEventName, e.eventSystemFlags, t[0], e.nativeEvent);
        if (n === null) {
          n = e.nativeEvent;
          var r = new n.constructor(n.type, n);
          ((Ne = r), n.target.dispatchEvent(r), (Ne = null));
        } else return ((t = Ri(n)), t !== null && Vt(t), (e.blockedOn = n), !1);
        t.shift();
      }
      return !0;
    }
    function on(e, t, n) {
      an(e) && n.delete(t);
    }
    function sn() {
      ((Gt = !1),
        qt !== null && an(qt) && (qt = null),
        Jt !== null && an(Jt) && (Jt = null),
        Yt !== null && an(Yt) && (Yt = null),
        Xt.forEach(on),
        Zt.forEach(on));
    }
    function cn(e, t) {
      e.blockedOn === t &&
        ((e.blockedOn = null),
        Gt || ((Gt = !0), n.unstable_scheduleCallback(n.unstable_NormalPriority, sn)));
    }
    function ln(e) {
      function t(t) {
        return cn(t, e);
      }
      if (0 < Kt.length) {
        cn(Kt[0], e);
        for (var n = 1; n < Kt.length; n++) {
          var r = Kt[n];
          r.blockedOn === e && (r.blockedOn = null);
        }
      }
      for (
        qt !== null && cn(qt, e),
          Jt !== null && cn(Jt, e),
          Yt !== null && cn(Yt, e),
          Xt.forEach(t),
          Zt.forEach(t),
          n = 0;
        n < Qt.length;
        n++
      )
        ((r = Qt[n]), r.blockedOn === e && (r.blockedOn = null));
      for (; 0 < Qt.length && ((n = Qt[0]), n.blockedOn === null);)
        (rn(n), n.blockedOn === null && Qt.shift());
    }
    var un = C.ReactCurrentBatchConfig,
      dn = !0;
    function fn(e, t, n, r) {
      var i = Rt,
        a = un.transition;
      un.transition = null;
      try {
        ((Rt = 1), mn(e, t, n, r));
      } finally {
        ((Rt = i), (un.transition = a));
      }
    }
    function pn(e, t, n, r) {
      var i = Rt,
        a = un.transition;
      un.transition = null;
      try {
        ((Rt = 4), mn(e, t, n, r));
      } finally {
        ((Rt = i), (un.transition = a));
      }
    }
    function mn(e, t, n, r) {
      if (dn) {
        var i = gn(e, t, n, r);
        if (i === null) (li(e, t, r, hn, n), en(e, r));
        else if (nn(i, e, t, n, r)) r.stopPropagation();
        else if ((en(e, r), t & 4 && -1 < $t.indexOf(e))) {
          for (; i !== null;) {
            var a = Ri(i);
            if (
              (a !== null && Bt(a), (a = gn(e, t, n, r)), a === null && li(e, t, r, hn, n), a === i)
            )
              break;
            i = a;
          }
          i !== null && r.stopPropagation();
        } else li(e, t, r, null, n);
      }
    }
    var hn = null;
    function gn(e, t, n, r) {
      if (((hn = null), (e = Pe(r)), (e = Li(e)), e !== null)) {
        if (((t = nt(e)), t === null)) e = null;
        else if (((n = t.tag), n === 13)) {
          if (((e = rt(t)), e !== null)) return e;
          e = null;
        } else if (n === 3) {
          if (t.stateNode.current.memoizedState.isDehydrated)
            return t.tag === 3 ? t.stateNode.containerInfo : null;
          e = null;
        } else t !== e && (e = null);
      }
      return ((hn = e), null);
    }
    function _n(e) {
      switch (e) {
        case `cancel`:
        case `click`:
        case `close`:
        case `contextmenu`:
        case `copy`:
        case `cut`:
        case `auxclick`:
        case `dblclick`:
        case `dragend`:
        case `dragstart`:
        case `drop`:
        case `focusin`:
        case `focusout`:
        case `input`:
        case `invalid`:
        case `keydown`:
        case `keypress`:
        case `keyup`:
        case `mousedown`:
        case `mouseup`:
        case `paste`:
        case `pause`:
        case `play`:
        case `pointercancel`:
        case `pointerdown`:
        case `pointerup`:
        case `ratechange`:
        case `reset`:
        case `resize`:
        case `seeked`:
        case `submit`:
        case `touchcancel`:
        case `touchend`:
        case `touchstart`:
        case `volumechange`:
        case `change`:
        case `selectionchange`:
        case `textInput`:
        case `compositionstart`:
        case `compositionend`:
        case `compositionupdate`:
        case `beforeblur`:
        case `afterblur`:
        case `beforeinput`:
        case `blur`:
        case `fullscreenchange`:
        case `focus`:
        case `hashchange`:
        case `popstate`:
        case `select`:
        case `selectstart`:
          return 1;
        case `drag`:
        case `dragenter`:
        case `dragexit`:
        case `dragleave`:
        case `dragover`:
        case `mousemove`:
        case `mouseout`:
        case `mouseover`:
        case `pointermove`:
        case `pointerout`:
        case `pointerover`:
        case `scroll`:
        case `toggle`:
        case `touchmove`:
        case `wheel`:
        case `mouseenter`:
        case `mouseleave`:
        case `pointerenter`:
        case `pointerleave`:
          return 4;
        case `message`:
          switch (pt()) {
            case mt:
              return 1;
            case ht:
              return 4;
            case gt:
            case _t:
              return 16;
            case vt:
              return 536870912;
            default:
              return 16;
          }
        default:
          return 16;
      }
    }
    var vn = null,
      yn = null,
      bn = null;
    function xn() {
      if (bn) return bn;
      var e,
        t = yn,
        n = t.length,
        r,
        i = `value` in vn ? vn.value : vn.textContent,
        a = i.length;
      for (e = 0; e < n && t[e] === i[e]; e++);
      var o = n - e;
      for (r = 1; r <= o && t[n - r] === i[a - r]; r++);
      return (bn = i.slice(e, 1 < r ? 1 - r : void 0));
    }
    function Sn(e) {
      var t = e.keyCode;
      return (
        `charCode` in e ? ((e = e.charCode), e === 0 && t === 13 && (e = 13)) : (e = t),
        e === 10 && (e = 13),
        32 <= e || e === 13 ? e : 0
      );
    }
    function Cn() {
      return !0;
    }
    function wn() {
      return !1;
    }
    function Tn(e) {
      function t(t, n, r, i, a) {
        for (var o in ((this._reactName = t),
        (this._targetInst = r),
        (this.type = n),
        (this.nativeEvent = i),
        (this.target = a),
        (this.currentTarget = null),
        e))
          e.hasOwnProperty(o) && ((t = e[o]), (this[o] = t ? t(i) : i[o]));
        return (
          (this.isDefaultPrevented = (
            i.defaultPrevented == null ? !1 === i.returnValue : i.defaultPrevented
          )
            ? Cn
            : wn),
          (this.isPropagationStopped = wn),
          this
        );
      }
      return (
        L(t.prototype, {
          preventDefault: function () {
            this.defaultPrevented = !0;
            var e = this.nativeEvent;
            e &&
              (e.preventDefault
                ? e.preventDefault()
                : typeof e.returnValue != `unknown` && (e.returnValue = !1),
              (this.isDefaultPrevented = Cn));
          },
          stopPropagation: function () {
            var e = this.nativeEvent;
            e &&
              (e.stopPropagation
                ? e.stopPropagation()
                : typeof e.cancelBubble != `unknown` && (e.cancelBubble = !0),
              (this.isPropagationStopped = Cn));
          },
          persist: function () {},
          isPersistent: Cn,
        }),
        t
      );
    }
    var En = {
        eventPhase: 0,
        bubbles: 0,
        cancelable: 0,
        timeStamp: function (e) {
          return e.timeStamp || Date.now();
        },
        defaultPrevented: 0,
        isTrusted: 0,
      },
      Dn = Tn(En),
      On = L({}, En, {
        view: 0,
        detail: 0,
      }),
      kn = Tn(On),
      An,
      jn,
      Mn,
      Nn = L({}, On, {
        screenX: 0,
        screenY: 0,
        clientX: 0,
        clientY: 0,
        pageX: 0,
        pageY: 0,
        ctrlKey: 0,
        shiftKey: 0,
        altKey: 0,
        metaKey: 0,
        getModifierState: Wn,
        button: 0,
        buttons: 0,
        relatedTarget: function (e) {
          return e.relatedTarget === void 0
            ? e.fromElement === e.srcElement
              ? e.toElement
              : e.fromElement
            : e.relatedTarget;
        },
        movementX: function (e) {
          return `movementX` in e
            ? e.movementX
            : (e !== Mn &&
                (Mn && e.type === `mousemove`
                  ? ((An = e.screenX - Mn.screenX), (jn = e.screenY - Mn.screenY))
                  : (jn = An = 0),
                (Mn = e)),
              An);
        },
        movementY: function (e) {
          return `movementY` in e ? e.movementY : jn;
        },
      }),
      Pn = Tn(Nn),
      Fn = Tn(
        L({}, Nn, {
          dataTransfer: 0,
        }),
      ),
      In = Tn(
        L({}, On, {
          relatedTarget: 0,
        }),
      ),
      Ln = Tn(
        L({}, En, {
          animationName: 0,
          elapsedTime: 0,
          pseudoElement: 0,
        }),
      ),
      Rn = Tn(
        L({}, En, {
          clipboardData: function (e) {
            return `clipboardData` in e ? e.clipboardData : window.clipboardData;
          },
        }),
      ),
      zn = Tn(
        L({}, En, {
          data: 0,
        }),
      ),
      Bn = {
        Esc: `Escape`,
        Spacebar: ` `,
        Left: `ArrowLeft`,
        Up: `ArrowUp`,
        Right: `ArrowRight`,
        Down: `ArrowDown`,
        Del: `Delete`,
        Win: `OS`,
        Menu: `ContextMenu`,
        Apps: `ContextMenu`,
        Scroll: `ScrollLock`,
        MozPrintableKey: `Unidentified`,
      },
      Vn = {
        8: `Backspace`,
        9: `Tab`,
        12: `Clear`,
        13: `Enter`,
        16: `Shift`,
        17: `Control`,
        18: `Alt`,
        19: `Pause`,
        20: `CapsLock`,
        27: `Escape`,
        32: ` `,
        33: `PageUp`,
        34: `PageDown`,
        35: `End`,
        36: `Home`,
        37: `ArrowLeft`,
        38: `ArrowUp`,
        39: `ArrowRight`,
        40: `ArrowDown`,
        45: `Insert`,
        46: `Delete`,
        112: `F1`,
        113: `F2`,
        114: `F3`,
        115: `F4`,
        116: `F5`,
        117: `F6`,
        118: `F7`,
        119: `F8`,
        120: `F9`,
        121: `F10`,
        122: `F11`,
        123: `F12`,
        144: `NumLock`,
        145: `ScrollLock`,
        224: `Meta`,
      },
      Hn = {
        Alt: `altKey`,
        Control: `ctrlKey`,
        Meta: `metaKey`,
        Shift: `shiftKey`,
      };
    function Un(e) {
      var t = this.nativeEvent;
      return t.getModifierState ? t.getModifierState(e) : (e = Hn[e]) ? !!t[e] : !1;
    }
    function Wn() {
      return Un;
    }
    var Gn = Tn(
        L({}, On, {
          key: function (e) {
            if (e.key) {
              var t = Bn[e.key] || e.key;
              if (t !== `Unidentified`) return t;
            }
            return e.type === `keypress`
              ? ((e = Sn(e)), e === 13 ? `Enter` : String.fromCharCode(e))
              : e.type === `keydown` || e.type === `keyup`
                ? Vn[e.keyCode] || `Unidentified`
                : ``;
          },
          code: 0,
          location: 0,
          ctrlKey: 0,
          shiftKey: 0,
          altKey: 0,
          metaKey: 0,
          repeat: 0,
          locale: 0,
          getModifierState: Wn,
          charCode: function (e) {
            return e.type === `keypress` ? Sn(e) : 0;
          },
          keyCode: function (e) {
            return e.type === `keydown` || e.type === `keyup` ? e.keyCode : 0;
          },
          which: function (e) {
            return e.type === `keypress`
              ? Sn(e)
              : e.type === `keydown` || e.type === `keyup`
                ? e.keyCode
                : 0;
          },
        }),
      ),
      Kn = Tn(
        L({}, Nn, {
          pointerId: 0,
          width: 0,
          height: 0,
          pressure: 0,
          tangentialPressure: 0,
          tiltX: 0,
          tiltY: 0,
          twist: 0,
          pointerType: 0,
          isPrimary: 0,
        }),
      ),
      qn = Tn(
        L({}, On, {
          touches: 0,
          targetTouches: 0,
          changedTouches: 0,
          altKey: 0,
          metaKey: 0,
          ctrlKey: 0,
          shiftKey: 0,
          getModifierState: Wn,
        }),
      ),
      Jn = Tn(
        L({}, En, {
          propertyName: 0,
          elapsedTime: 0,
          pseudoElement: 0,
        }),
      ),
      Yn = Tn(
        L({}, Nn, {
          deltaX: function (e) {
            return `deltaX` in e ? e.deltaX : `wheelDeltaX` in e ? -e.wheelDeltaX : 0;
          },
          deltaY: function (e) {
            return `deltaY` in e
              ? e.deltaY
              : `wheelDeltaY` in e
                ? -e.wheelDeltaY
                : `wheelDelta` in e
                  ? -e.wheelDelta
                  : 0;
          },
          deltaZ: 0,
          deltaMode: 0,
        }),
      ),
      Xn = [9, 13, 27, 32],
      Zn = c && `CompositionEvent` in window,
      Qn = null;
    c && `documentMode` in document && (Qn = document.documentMode);
    var $n = c && `TextEvent` in window && !Qn,
      er = c && (!Zn || (Qn && 8 < Qn && 11 >= Qn)),
      tr = ` `,
      nr = !1;
    function rr(e, t) {
      switch (e) {
        case `keyup`:
          return Xn.indexOf(t.keyCode) !== -1;
        case `keydown`:
          return t.keyCode !== 229;
        case `keypress`:
        case `mousedown`:
        case `focusout`:
          return !0;
        default:
          return !1;
      }
    }
    function ir(e) {
      return ((e = e.detail), typeof e == `object` && `data` in e ? e.data : null);
    }
    var ar = !1;
    function or(e, t) {
      switch (e) {
        case `compositionend`:
          return ir(t);
        case `keypress`:
          return t.which === 32 ? ((nr = !0), tr) : null;
        case `textInput`:
          return ((e = t.data), e === tr && nr ? null : e);
        default:
          return null;
      }
    }
    function sr(e, t) {
      if (ar)
        return e === `compositionend` || (!Zn && rr(e, t))
          ? ((e = xn()), (bn = yn = vn = null), (ar = !1), e)
          : null;
      switch (e) {
        case `paste`:
          return null;
        case `keypress`:
          if (!(t.ctrlKey || t.altKey || t.metaKey) || (t.ctrlKey && t.altKey)) {
            if (t.char && 1 < t.char.length) return t.char;
            if (t.which) return String.fromCharCode(t.which);
          }
          return null;
        case `compositionend`:
          return er && t.locale !== `ko` ? null : t.data;
        default:
          return null;
      }
    }
    var cr = {
      color: !0,
      date: !0,
      datetime: !0,
      'datetime-local': !0,
      email: !0,
      month: !0,
      number: !0,
      password: !0,
      range: !0,
      search: !0,
      tel: !0,
      text: !0,
      time: !0,
      url: !0,
      week: !0,
    };
    function lr(e) {
      var t = e && e.nodeName && e.nodeName.toLowerCase();
      return t === `input` ? !!cr[e.type] : t === `textarea`;
    }
    function ur(e, t, n, r) {
      (ze(r),
        (t = di(t, `onChange`)),
        0 < t.length &&
          ((n = new Dn(`onChange`, `change`, null, n, r)),
          e.push({
            event: n,
            listeners: t,
          })));
    }
    var dr = null,
      fr = null;
    function pr(e) {
      ri(e, 0);
    }
    function mr(e) {
      if (pe(zi(e))) return e;
    }
    function hr(e, t) {
      if (e === `change`) return t;
    }
    var gr = !1;
    if (c) {
      var _r;
      if (c) {
        var vr = `oninput` in document;
        if (!vr) {
          var yr = document.createElement(`div`);
          (yr.setAttribute(`oninput`, `return;`), (vr = typeof yr.oninput == `function`));
        }
        _r = vr;
      } else _r = !1;
      gr = _r && (!document.documentMode || 9 < document.documentMode);
    }
    function br() {
      dr && (dr.detachEvent(`onpropertychange`, xr), (fr = dr = null));
    }
    function xr(e) {
      if (e.propertyName === `value` && mr(fr)) {
        var t = [];
        (ur(t, fr, e, Pe(e)), We(pr, t));
      }
    }
    function Sr(e, t, n) {
      e === `focusin`
        ? (br(), (dr = t), (fr = n), dr.attachEvent(`onpropertychange`, xr))
        : e === `focusout` && br();
    }
    function Cr(e) {
      if (e === `selectionchange` || e === `keyup` || e === `keydown`) return mr(fr);
    }
    function wr(e, t) {
      if (e === `click`) return mr(t);
    }
    function Tr(e, t) {
      if (e === `input` || e === `change`) return mr(t);
    }
    function Er(e, t) {
      return (e === t && (e !== 0 || 1 / e == 1 / t)) || (e !== e && t !== t);
    }
    var Dr = typeof Object.is == `function` ? Object.is : Er;
    function Or(e, t) {
      if (Dr(e, t)) return !0;
      if (typeof e != `object` || !e || typeof t != `object` || !t) return !1;
      var n = Object.keys(e),
        r = Object.keys(t);
      if (n.length !== r.length) return !1;
      for (r = 0; r < n.length; r++) {
        var i = n[r];
        if (!l.call(t, i) || !Dr(e[i], t[i])) return !1;
      }
      return !0;
    }
    function kr(e) {
      for (; e && e.firstChild;) e = e.firstChild;
      return e;
    }
    function Ar(e, t) {
      var n = kr(e);
      e = 0;
      for (var r; n;) {
        if (n.nodeType === 3) {
          if (((r = e + n.textContent.length), e <= t && r >= t))
            return {
              node: n,
              offset: t - e,
            };
          e = r;
        }
        a: {
          for (; n;) {
            if (n.nextSibling) {
              n = n.nextSibling;
              break a;
            }
            n = n.parentNode;
          }
          n = void 0;
        }
        n = kr(n);
      }
    }
    function W(e, t) {
      return e && t
        ? e === t
          ? !0
          : e && e.nodeType === 3
            ? !1
            : t && t.nodeType === 3
              ? W(e, t.parentNode)
              : `contains` in e
                ? e.contains(t)
                : e.compareDocumentPosition
                  ? !!(e.compareDocumentPosition(t) & 16)
                  : !1
        : !1;
    }
    function jr() {
      for (var e = window, t = R(); t instanceof e.HTMLIFrameElement;) {
        try {
          var n = typeof t.contentWindow.location.href == `string`;
        } catch {
          n = !1;
        }
        if (n) e = t.contentWindow;
        else break;
        t = R(e.document);
      }
      return t;
    }
    function Mr(e) {
      var t = e && e.nodeName && e.nodeName.toLowerCase();
      return (
        t &&
        ((t === `input` &&
          (e.type === `text` ||
            e.type === `search` ||
            e.type === `tel` ||
            e.type === `url` ||
            e.type === `password`)) ||
          t === `textarea` ||
          e.contentEditable === `true`)
      );
    }
    function Nr(e) {
      var t = jr(),
        n = e.focusedElem,
        r = e.selectionRange;
      if (t !== n && n && n.ownerDocument && W(n.ownerDocument.documentElement, n)) {
        if (r !== null && Mr(n)) {
          if (((t = r.start), (e = r.end), e === void 0 && (e = t), `selectionStart` in n))
            ((n.selectionStart = t), (n.selectionEnd = Math.min(e, n.value.length)));
          else if (
            ((e = ((t = n.ownerDocument || document) && t.defaultView) || window), e.getSelection)
          ) {
            e = e.getSelection();
            var i = n.textContent.length,
              a = Math.min(r.start, i);
            ((r = r.end === void 0 ? a : Math.min(r.end, i)),
              !e.extend && a > r && ((i = r), (r = a), (a = i)),
              (i = Ar(n, a)));
            var o = Ar(n, r);
            i &&
              o &&
              (e.rangeCount !== 1 ||
                e.anchorNode !== i.node ||
                e.anchorOffset !== i.offset ||
                e.focusNode !== o.node ||
                e.focusOffset !== o.offset) &&
              ((t = t.createRange()),
              t.setStart(i.node, i.offset),
              e.removeAllRanges(),
              a > r
                ? (e.addRange(t), e.extend(o.node, o.offset))
                : (t.setEnd(o.node, o.offset), e.addRange(t)));
          }
        }
        for (t = [], e = n; (e = e.parentNode);)
          e.nodeType === 1 &&
            t.push({
              element: e,
              left: e.scrollLeft,
              top: e.scrollTop,
            });
        for (typeof n.focus == `function` && n.focus(), n = 0; n < t.length; n++)
          ((e = t[n]), (e.element.scrollLeft = e.left), (e.element.scrollTop = e.top));
      }
    }
    var Pr = c && `documentMode` in document && 11 >= document.documentMode,
      Fr = null,
      Ir = null,
      Lr = null,
      Rr = !1;
    function zr(e, t, n) {
      var r = n.window === n ? n.document : n.nodeType === 9 ? n : n.ownerDocument;
      Rr ||
        Fr == null ||
        Fr !== R(r) ||
        ((r = Fr),
        `selectionStart` in r && Mr(r)
          ? (r = {
              start: r.selectionStart,
              end: r.selectionEnd,
            })
          : ((r = ((r.ownerDocument && r.ownerDocument.defaultView) || window).getSelection()),
            (r = {
              anchorNode: r.anchorNode,
              anchorOffset: r.anchorOffset,
              focusNode: r.focusNode,
              focusOffset: r.focusOffset,
            })),
        (Lr && Or(Lr, r)) ||
          ((Lr = r),
          (r = di(Ir, `onSelect`)),
          0 < r.length &&
            ((t = new Dn(`onSelect`, `select`, null, t, n)),
            e.push({
              event: t,
              listeners: r,
            }),
            (t.target = Fr))));
    }
    function Br(e, t) {
      var n = {};
      return (
        (n[e.toLowerCase()] = t.toLowerCase()),
        (n[`Webkit` + e] = `webkit` + t),
        (n[`Moz` + e] = `moz` + t),
        n
      );
    }
    var Vr = {
        animationend: Br(`Animation`, `AnimationEnd`),
        animationiteration: Br(`Animation`, `AnimationIteration`),
        animationstart: Br(`Animation`, `AnimationStart`),
        transitionend: Br(`Transition`, `TransitionEnd`),
      },
      Hr = {},
      Ur = {};
    c &&
      ((Ur = document.createElement(`div`).style),
      `AnimationEvent` in window ||
        (delete Vr.animationend.animation,
        delete Vr.animationiteration.animation,
        delete Vr.animationstart.animation),
      `TransitionEvent` in window || delete Vr.transitionend.transition);
    function Wr(e) {
      if (Hr[e]) return Hr[e];
      if (!Vr[e]) return e;
      var t = Vr[e],
        n;
      for (n in t) if (t.hasOwnProperty(n) && n in Ur) return (Hr[e] = t[n]);
      return e;
    }
    var Gr = Wr(`animationend`),
      Kr = Wr(`animationiteration`),
      qr = Wr(`animationstart`),
      Jr = Wr(`transitionend`),
      Yr = new Map(),
      Xr =
        `abort auxClick cancel canPlay canPlayThrough click close contextMenu copy cut drag dragEnd dragEnter dragExit dragLeave dragOver dragStart drop durationChange emptied encrypted ended error gotPointerCapture input invalid keyDown keyPress keyUp load loadedData loadedMetadata loadStart lostPointerCapture mouseDown mouseMove mouseOut mouseOver mouseUp paste pause play playing pointerCancel pointerDown pointerMove pointerOut pointerOver pointerUp progress rateChange reset resize seeked seeking stalled submit suspend timeUpdate touchCancel touchEnd touchStart volumeChange scroll toggle touchMove waiting wheel`.split(
          ` `,
        );
    function Zr(e, t) {
      (Yr.set(e, t), o(t, [e]));
    }
    for (var Qr = 0; Qr < Xr.length; Qr++) {
      var $r = Xr[Qr];
      Zr($r.toLowerCase(), `on` + ($r[0].toUpperCase() + $r.slice(1)));
    }
    (Zr(Gr, `onAnimationEnd`),
      Zr(Kr, `onAnimationIteration`),
      Zr(qr, `onAnimationStart`),
      Zr(`dblclick`, `onDoubleClick`),
      Zr(`focusin`, `onFocus`),
      Zr(`focusout`, `onBlur`),
      Zr(Jr, `onTransitionEnd`),
      s(`onMouseEnter`, [`mouseout`, `mouseover`]),
      s(`onMouseLeave`, [`mouseout`, `mouseover`]),
      s(`onPointerEnter`, [`pointerout`, `pointerover`]),
      s(`onPointerLeave`, [`pointerout`, `pointerover`]),
      o(`onChange`, `change click focusin focusout input keydown keyup selectionchange`.split(` `)),
      o(
        `onSelect`,
        `focusout contextmenu dragend focusin keydown keyup mousedown mouseup selectionchange`.split(
          ` `,
        ),
      ),
      o(`onBeforeInput`, [`compositionend`, `keypress`, `textInput`, `paste`]),
      o(`onCompositionEnd`, `compositionend focusout keydown keypress keyup mousedown`.split(` `)),
      o(
        `onCompositionStart`,
        `compositionstart focusout keydown keypress keyup mousedown`.split(` `),
      ),
      o(
        `onCompositionUpdate`,
        `compositionupdate focusout keydown keypress keyup mousedown`.split(` `),
      ));
    var ei =
        `abort canplay canplaythrough durationchange emptied encrypted ended error loadeddata loadedmetadata loadstart pause play playing progress ratechange resize seeked seeking stalled suspend timeupdate volumechange waiting`.split(
          ` `,
        ),
      ti = new Set(`cancel close invalid load scroll toggle`.split(` `).concat(ei));
    function ni(e, t, n) {
      var r = e.type || `unknown-event`;
      ((e.currentTarget = n), tt(r, t, void 0, e), (e.currentTarget = null));
    }
    function ri(e, t) {
      t = !!(t & 4);
      for (var n = 0; n < e.length; n++) {
        var r = e[n],
          i = r.event;
        r = r.listeners;
        a: {
          var a = void 0;
          if (t)
            for (var o = r.length - 1; 0 <= o; o--) {
              var s = r[o],
                c = s.instance,
                l = s.currentTarget;
              if (((s = s.listener), c !== a && i.isPropagationStopped())) break a;
              (ni(i, s, l), (a = c));
            }
          else
            for (o = 0; o < r.length; o++) {
              if (
                ((s = r[o]),
                (c = s.instance),
                (l = s.currentTarget),
                (s = s.listener),
                c !== a && i.isPropagationStopped())
              )
                break a;
              (ni(i, s, l), (a = c));
            }
        }
      }
      if (Ze) throw ((e = Qe), (Ze = !1), (Qe = null), e);
    }
    function ii(e, t) {
      var n = t[Pi];
      n === void 0 && (n = t[Pi] = new Set());
      var r = e + `__bubble`;
      n.has(r) || (ci(t, e, 2, !1), n.add(r));
    }
    function ai(e, t, n) {
      var r = 0;
      (t && (r |= 4), ci(n, e, r, t));
    }
    var oi = `_reactListening` + Math.random().toString(36).slice(2);
    function si(e) {
      if (!e[oi]) {
        ((e[oi] = !0),
          i.forEach(function (t) {
            t !== `selectionchange` && (ti.has(t) || ai(t, !1, e), ai(t, !0, e));
          }));
        var t = e.nodeType === 9 ? e : e.ownerDocument;
        t === null || t[oi] || ((t[oi] = !0), ai(`selectionchange`, !1, t));
      }
    }
    function ci(e, t, n, r) {
      switch (_n(t)) {
        case 1:
          var i = fn;
          break;
        case 4:
          i = pn;
          break;
        default:
          i = mn;
      }
      ((n = i.bind(null, t, n, e)),
        (i = void 0),
        !Ke || (t !== `touchstart` && t !== `touchmove` && t !== `wheel`) || (i = !0),
        r
          ? i === void 0
            ? e.addEventListener(t, n, !0)
            : e.addEventListener(t, n, {
                capture: !0,
                passive: i,
              })
          : i === void 0
            ? e.addEventListener(t, n, !1)
            : e.addEventListener(t, n, {
                passive: i,
              }));
    }
    function li(e, t, n, r, i) {
      var a = r;
      if (!(t & 1) && !(t & 2) && r !== null)
        a: for (;;) {
          if (r === null) return;
          var o = r.tag;
          if (o === 3 || o === 4) {
            var s = r.stateNode.containerInfo;
            if (s === i || (s.nodeType === 8 && s.parentNode === i)) break;
            if (o === 4)
              for (o = r.return; o !== null;) {
                var c = o.tag;
                if (
                  (c === 3 || c === 4) &&
                  ((c = o.stateNode.containerInfo),
                  c === i || (c.nodeType === 8 && c.parentNode === i))
                )
                  return;
                o = o.return;
              }
            for (; s !== null;) {
              if (((o = Li(s)), o === null)) return;
              if (((c = o.tag), c === 5 || c === 6)) {
                r = a = o;
                continue a;
              }
              s = s.parentNode;
            }
          }
          r = r.return;
        }
      We(function () {
        var r = a,
          i = Pe(n),
          o = [];
        a: {
          var s = Yr.get(e);
          if (s !== void 0) {
            var c = Dn,
              l = e;
            switch (e) {
              case `keypress`:
                if (Sn(n) === 0) break a;
              case `keydown`:
              case `keyup`:
                c = Gn;
                break;
              case `focusin`:
                ((l = `focus`), (c = In));
                break;
              case `focusout`:
                ((l = `blur`), (c = In));
                break;
              case `beforeblur`:
              case `afterblur`:
                c = In;
                break;
              case `click`:
                if (n.button === 2) break a;
              case `auxclick`:
              case `dblclick`:
              case `mousedown`:
              case `mousemove`:
              case `mouseup`:
              case `mouseout`:
              case `mouseover`:
              case `contextmenu`:
                c = Pn;
                break;
              case `drag`:
              case `dragend`:
              case `dragenter`:
              case `dragexit`:
              case `dragleave`:
              case `dragover`:
              case `dragstart`:
              case `drop`:
                c = Fn;
                break;
              case `touchcancel`:
              case `touchend`:
              case `touchmove`:
              case `touchstart`:
                c = qn;
                break;
              case Gr:
              case Kr:
              case qr:
                c = Ln;
                break;
              case Jr:
                c = Jn;
                break;
              case `scroll`:
                c = kn;
                break;
              case `wheel`:
                c = Yn;
                break;
              case `copy`:
              case `cut`:
              case `paste`:
                c = Rn;
                break;
              case `gotpointercapture`:
              case `lostpointercapture`:
              case `pointercancel`:
              case `pointerdown`:
              case `pointermove`:
              case `pointerout`:
              case `pointerover`:
              case `pointerup`:
                c = Kn;
            }
            var u = !!(t & 4),
              d = !u && e === `scroll`,
              f = u ? (s === null ? null : s + `Capture`) : s;
            u = [];
            for (var p = r, m; p !== null;) {
              m = p;
              var h = m.stateNode;
              if (
                (m.tag === 5 &&
                  h !== null &&
                  ((m = h), f !== null && ((h = Ge(p, f)), h != null && u.push(ui(p, h, m)))),
                d)
              )
                break;
              p = p.return;
            }
            0 < u.length &&
              ((s = new c(s, l, null, n, i)),
              o.push({
                event: s,
                listeners: u,
              }));
          }
        }
        if (!(t & 7)) {
          a: {
            if (
              ((s = e === `mouseover` || e === `pointerover`),
              (c = e === `mouseout` || e === `pointerout`),
              s && n !== Ne && (l = n.relatedTarget || n.fromElement) && (Li(l) || l[Ni]))
            )
              break a;
            if (
              (c || s) &&
              ((s =
                i.window === i
                  ? i
                  : (s = i.ownerDocument)
                    ? s.defaultView || s.parentWindow
                    : window),
              c
                ? ((l = n.relatedTarget || n.toElement),
                  (c = r),
                  (l = l ? Li(l) : null),
                  l !== null &&
                    ((d = nt(l)), l !== d || (l.tag !== 5 && l.tag !== 6)) &&
                    (l = null))
                : ((c = null), (l = r)),
              c !== l)
            ) {
              if (
                ((u = Pn),
                (h = `onMouseLeave`),
                (f = `onMouseEnter`),
                (p = `mouse`),
                (e === `pointerout` || e === `pointerover`) &&
                  ((u = Kn), (h = `onPointerLeave`), (f = `onPointerEnter`), (p = `pointer`)),
                (d = c == null ? s : zi(c)),
                (m = l == null ? s : zi(l)),
                (s = new u(h, p + `leave`, c, n, i)),
                (s.target = d),
                (s.relatedTarget = m),
                (h = null),
                Li(i) === r &&
                  ((u = new u(f, p + `enter`, l, n, i)),
                  (u.target = m),
                  (u.relatedTarget = d),
                  (h = u)),
                (d = h),
                c && l)
              )
                b: {
                  for (u = c, f = l, p = 0, m = u; m; m = fi(m)) p++;
                  for (m = 0, h = f; h; h = fi(h)) m++;
                  for (; 0 < p - m;) ((u = fi(u)), p--);
                  for (; 0 < m - p;) ((f = fi(f)), m--);
                  for (; p--;) {
                    if (u === f || (f !== null && u === f.alternate)) break b;
                    ((u = fi(u)), (f = fi(f)));
                  }
                  u = null;
                }
              else u = null;
              (c !== null && pi(o, s, c, u, !1), l !== null && d !== null && pi(o, d, l, u, !0));
            }
          }
          a: {
            if (
              ((s = r ? zi(r) : window),
              (c = s.nodeName && s.nodeName.toLowerCase()),
              c === `select` || (c === `input` && s.type === `file`))
            )
              var g = hr;
            else if (lr(s)) {
              if (gr) g = Tr;
              else {
                g = Cr;
                var _ = Sr;
              }
            } else
              (c = s.nodeName) &&
                c.toLowerCase() === `input` &&
                (s.type === `checkbox` || s.type === `radio`) &&
                (g = wr);
            if ((g &&= g(e, r))) {
              ur(o, g, n, i);
              break a;
            }
            (_ && _(e, s, r),
              e === `focusout` &&
                (_ = s._wrapperState) &&
                _.controlled &&
                s.type === `number` &&
                z(s, `number`, s.value));
          }
          switch (((_ = r ? zi(r) : window), e)) {
            case `focusin`:
              (lr(_) || _.contentEditable === `true`) && ((Fr = _), (Ir = r), (Lr = null));
              break;
            case `focusout`:
              Lr = Ir = Fr = null;
              break;
            case `mousedown`:
              Rr = !0;
              break;
            case `contextmenu`:
            case `mouseup`:
            case `dragend`:
              ((Rr = !1), zr(o, n, i));
              break;
            case `selectionchange`:
              if (Pr) break;
            case `keydown`:
            case `keyup`:
              zr(o, n, i);
          }
          var v;
          if (Zn)
            b: {
              switch (e) {
                case `compositionstart`:
                  var y = `onCompositionStart`;
                  break b;
                case `compositionend`:
                  y = `onCompositionEnd`;
                  break b;
                case `compositionupdate`:
                  y = `onCompositionUpdate`;
                  break b;
              }
              y = void 0;
            }
          else
            ar
              ? rr(e, n) && (y = `onCompositionEnd`)
              : e === `keydown` && n.keyCode === 229 && (y = `onCompositionStart`);
          (y &&
            (er &&
              n.locale !== `ko` &&
              (ar || y !== `onCompositionStart`
                ? y === `onCompositionEnd` && ar && (v = xn())
                : ((vn = i), (yn = `value` in vn ? vn.value : vn.textContent), (ar = !0))),
            (_ = di(r, y)),
            0 < _.length &&
              ((y = new zn(y, e, null, n, i)),
              o.push({
                event: y,
                listeners: _,
              }),
              v ? (y.data = v) : ((v = ir(n)), v !== null && (y.data = v)))),
            (v = $n ? or(e, n) : sr(e, n)) &&
              ((r = di(r, `onBeforeInput`)),
              0 < r.length &&
                ((i = new zn(`onBeforeInput`, `beforeinput`, null, n, i)),
                o.push({
                  event: i,
                  listeners: r,
                }),
                (i.data = v))));
        }
        ri(o, t);
      });
    }
    function ui(e, t, n) {
      return {
        instance: e,
        listener: t,
        currentTarget: n,
      };
    }
    function di(e, t) {
      for (var n = t + `Capture`, r = []; e !== null;) {
        var i = e,
          a = i.stateNode;
        (i.tag === 5 &&
          a !== null &&
          ((i = a),
          (a = Ge(e, n)),
          a != null && r.unshift(ui(e, a, i)),
          (a = Ge(e, t)),
          a != null && r.push(ui(e, a, i))),
          (e = e.return));
      }
      return r;
    }
    function fi(e) {
      if (e === null) return null;
      do e = e.return;
      while (e && e.tag !== 5);
      return e || null;
    }
    function pi(e, t, n, r, i) {
      for (var a = t._reactName, o = []; n !== null && n !== r;) {
        var s = n,
          c = s.alternate,
          l = s.stateNode;
        if (c !== null && c === r) break;
        (s.tag === 5 &&
          l !== null &&
          ((s = l),
          i
            ? ((c = Ge(n, a)), c != null && o.unshift(ui(n, c, s)))
            : i || ((c = Ge(n, a)), c != null && o.push(ui(n, c, s)))),
          (n = n.return));
      }
      o.length !== 0 &&
        e.push({
          event: t,
          listeners: o,
        });
    }
    var mi = /\r\n?/g,
      hi = /\u0000|\uFFFD/g;
    function gi(e) {
      return (typeof e == `string` ? e : `` + e)
        .replace(
          mi,
          `
`,
        )
        .replace(hi, ``);
    }
    function _i(e, t, n) {
      if (((t = gi(t)), gi(e) !== t && n)) throw Error(r(425));
    }
    function vi() {}
    var yi = null,
      bi = null;
    function xi(e, t) {
      return (
        e === `textarea` ||
        e === `noscript` ||
        typeof t.children == `string` ||
        typeof t.children == `number` ||
        (typeof t.dangerouslySetInnerHTML == `object` &&
          t.dangerouslySetInnerHTML !== null &&
          t.dangerouslySetInnerHTML.__html != null)
      );
    }
    var Si = typeof setTimeout == `function` ? setTimeout : void 0,
      Ci = typeof clearTimeout == `function` ? clearTimeout : void 0,
      wi = typeof Promise == `function` ? Promise : void 0,
      Ti =
        typeof queueMicrotask == `function`
          ? queueMicrotask
          : wi === void 0
            ? Si
            : function (e) {
                return wi.resolve(null).then(e).catch(Ei);
              };
    function Ei(e) {
      setTimeout(function () {
        throw e;
      });
    }
    function Di(e, t) {
      var n = t,
        r = 0;
      do {
        var i = n.nextSibling;
        if ((e.removeChild(n), i && i.nodeType === 8)) {
          if (((n = i.data), n === `/$`)) {
            if (r === 0) {
              (e.removeChild(i), ln(t));
              return;
            }
            r--;
          } else (n !== `$` && n !== `$?` && n !== `$!`) || r++;
        }
        n = i;
      } while (n);
      ln(t);
    }
    function Oi(e) {
      for (; e != null; e = e.nextSibling) {
        var t = e.nodeType;
        if (t === 1 || t === 3) break;
        if (t === 8) {
          if (((t = e.data), t === `$` || t === `$!` || t === `$?`)) break;
          if (t === `/$`) return null;
        }
      }
      return e;
    }
    function ki(e) {
      e = e.previousSibling;
      for (var t = 0; e;) {
        if (e.nodeType === 8) {
          var n = e.data;
          if (n === `$` || n === `$!` || n === `$?`) {
            if (t === 0) return e;
            t--;
          } else n === `/$` && t++;
        }
        e = e.previousSibling;
      }
      return null;
    }
    var Ai = Math.random().toString(36).slice(2),
      ji = `__reactFiber$` + Ai,
      Mi = `__reactProps$` + Ai,
      Ni = `__reactContainer$` + Ai,
      Pi = `__reactEvents$` + Ai,
      Fi = `__reactListeners$` + Ai,
      Ii = `__reactHandles$` + Ai;
    function Li(e) {
      var t = e[ji];
      if (t) return t;
      for (var n = e.parentNode; n;) {
        if ((t = n[Ni] || n[ji])) {
          if (((n = t.alternate), t.child !== null || (n !== null && n.child !== null)))
            for (e = ki(e); e !== null;) {
              if ((n = e[ji])) return n;
              e = ki(e);
            }
          return t;
        }
        ((e = n), (n = e.parentNode));
      }
      return null;
    }
    function Ri(e) {
      return (
        (e = e[ji] || e[Ni]),
        !e || (e.tag !== 5 && e.tag !== 6 && e.tag !== 13 && e.tag !== 3) ? null : e
      );
    }
    function zi(e) {
      if (e.tag === 5 || e.tag === 6) return e.stateNode;
      throw Error(r(33));
    }
    function Bi(e) {
      return e[Mi] || null;
    }
    var Vi = [],
      Hi = -1;
    function Ui(e) {
      return {
        current: e,
      };
    }
    function Wi(e) {
      0 > Hi || ((e.current = Vi[Hi]), (Vi[Hi] = null), Hi--);
    }
    function Gi(e, t) {
      (Hi++, (Vi[Hi] = e.current), (e.current = t));
    }
    var Ki = {},
      qi = Ui(Ki),
      Ji = Ui(!1),
      Yi = Ki;
    function Xi(e, t) {
      var n = e.type.contextTypes;
      if (!n) return Ki;
      var r = e.stateNode;
      if (r && r.__reactInternalMemoizedUnmaskedChildContext === t)
        return r.__reactInternalMemoizedMaskedChildContext;
      var i = {},
        a;
      for (a in n) i[a] = t[a];
      return (
        r &&
          ((e = e.stateNode),
          (e.__reactInternalMemoizedUnmaskedChildContext = t),
          (e.__reactInternalMemoizedMaskedChildContext = i)),
        i
      );
    }
    function Zi(e) {
      return ((e = e.childContextTypes), e != null);
    }
    function Qi() {
      (Wi(Ji), Wi(qi));
    }
    function $i(e, t, n) {
      if (qi.current !== Ki) throw Error(r(168));
      (Gi(qi, t), Gi(Ji, n));
    }
    function ea(e, t, n) {
      var i = e.stateNode;
      if (((t = t.childContextTypes), typeof i.getChildContext != `function`)) return n;
      for (var a in ((i = i.getChildContext()), i))
        if (!(a in t)) throw Error(r(108, ce(e) || `Unknown`, a));
      return L({}, n, i);
    }
    function ta(e) {
      return (
        (e = ((e = e.stateNode) && e.__reactInternalMemoizedMergedChildContext) || Ki),
        (Yi = qi.current),
        Gi(qi, e),
        Gi(Ji, Ji.current),
        !0
      );
    }
    function na(e, t, n) {
      var i = e.stateNode;
      if (!i) throw Error(r(169));
      (n
        ? ((e = ea(e, t, Yi)),
          (i.__reactInternalMemoizedMergedChildContext = e),
          Wi(Ji),
          Wi(qi),
          Gi(qi, e))
        : Wi(Ji),
        Gi(Ji, n));
    }
    var ra = null,
      ia = !1,
      aa = !1;
    function oa(e) {
      ra === null ? (ra = [e]) : ra.push(e);
    }
    function sa(e) {
      ((ia = !0), oa(e));
    }
    function ca() {
      if (!aa && ra !== null) {
        aa = !0;
        var e = 0,
          t = Rt;
        try {
          var n = ra;
          for (Rt = 1; e < n.length; e++) {
            var r = n[e];
            do r = r(!0);
            while (r !== null);
          }
          ((ra = null), (ia = !1));
        } catch (t) {
          throw (ra !== null && (ra = ra.slice(e + 1)), ct(mt, ca), t);
        } finally {
          ((Rt = t), (aa = !1));
        }
      }
      return null;
    }
    var la = [],
      ua = 0,
      da = null,
      fa = 0,
      pa = [],
      ma = 0,
      ha = null,
      ga = 1,
      _a = ``;
    function va(e, t) {
      ((la[ua++] = fa), (la[ua++] = da), (da = e), (fa = t));
    }
    function ya(e, t, n) {
      ((pa[ma++] = ga), (pa[ma++] = _a), (pa[ma++] = ha), (ha = e));
      var r = ga;
      e = _a;
      var i = 32 - St(r) - 1;
      ((r &= ~(1 << i)), (n += 1));
      var a = 32 - St(t) + i;
      if (30 < a) {
        var o = i - (i % 5);
        ((a = (r & ((1 << o) - 1)).toString(32)),
          (r >>= o),
          (i -= o),
          (ga = (1 << (32 - St(t) + i)) | (n << i) | r),
          (_a = a + e));
      } else ((ga = (1 << a) | (n << i) | r), (_a = e));
    }
    function ba(e) {
      e.return !== null && (va(e, 1), ya(e, 1, 0));
    }
    function xa(e) {
      for (; e === da;) ((da = la[--ua]), (la[ua] = null), (fa = la[--ua]), (la[ua] = null));
      for (; e === ha;)
        ((ha = pa[--ma]),
          (pa[ma] = null),
          (_a = pa[--ma]),
          (pa[ma] = null),
          (ga = pa[--ma]),
          (pa[ma] = null));
    }
    var Sa = null,
      Ca = null,
      wa = !1,
      Ta = null;
    function Ea(e, t) {
      var n = eu(5, null, null, 0);
      ((n.elementType = `DELETED`),
        (n.stateNode = t),
        (n.return = e),
        (t = e.deletions),
        t === null ? ((e.deletions = [n]), (e.flags |= 16)) : t.push(n));
    }
    function Da(e, t) {
      switch (e.tag) {
        case 5:
          var n = e.type;
          return (
            (t = t.nodeType !== 1 || n.toLowerCase() !== t.nodeName.toLowerCase() ? null : t),
            t !== null && ((e.stateNode = t), (Sa = e), (Ca = Oi(t.firstChild)), !0)
          );
        case 6:
          return (
            (t = e.pendingProps === `` || t.nodeType !== 3 ? null : t),
            t !== null && ((e.stateNode = t), (Sa = e), (Ca = null), !0)
          );
        case 13:
          return (
            (t = t.nodeType === 8 ? t : null),
            t !== null &&
              ((n =
                ha === null
                  ? null
                  : {
                      id: ga,
                      overflow: _a,
                    }),
              (e.memoizedState = {
                dehydrated: t,
                treeContext: n,
                retryLane: 1073741824,
              }),
              (n = eu(18, null, null, 0)),
              (n.stateNode = t),
              (n.return = e),
              (e.child = n),
              (Sa = e),
              (Ca = null),
              !0)
          );
        default:
          return !1;
      }
    }
    function Oa(e) {
      return !!(e.mode & 1) && !(e.flags & 128);
    }
    function ka(e) {
      if (wa) {
        var t = Ca;
        if (t) {
          var n = t;
          if (!Da(e, t)) {
            if (Oa(e)) throw Error(r(418));
            t = Oi(n.nextSibling);
            var i = Sa;
            t && Da(e, t) ? Ea(i, n) : ((e.flags = (e.flags & -4097) | 2), (wa = !1), (Sa = e));
          }
        } else {
          if (Oa(e)) throw Error(r(418));
          ((e.flags = (e.flags & -4097) | 2), (wa = !1), (Sa = e));
        }
      }
    }
    function Aa(e) {
      for (e = e.return; e !== null && e.tag !== 5 && e.tag !== 3 && e.tag !== 13;) e = e.return;
      Sa = e;
    }
    function ja(e) {
      if (e !== Sa) return !1;
      if (!wa) return (Aa(e), (wa = !0), !1);
      var t;
      if (
        ((t = e.tag !== 3) &&
          !(t = e.tag !== 5) &&
          ((t = e.type), (t = t !== `head` && t !== `body` && !xi(e.type, e.memoizedProps))),
        (t &&= Ca))
      ) {
        if (Oa(e)) throw (Ma(), Error(r(418)));
        for (; t;) (Ea(e, t), (t = Oi(t.nextSibling)));
      }
      if ((Aa(e), e.tag === 13)) {
        if (((e = e.memoizedState), (e = e === null ? null : e.dehydrated), !e))
          throw Error(r(317));
        a: {
          for (e = e.nextSibling, t = 0; e;) {
            if (e.nodeType === 8) {
              var n = e.data;
              if (n === `/$`) {
                if (t === 0) {
                  Ca = Oi(e.nextSibling);
                  break a;
                }
                t--;
              } else (n !== `$` && n !== `$!` && n !== `$?`) || t++;
            }
            e = e.nextSibling;
          }
          Ca = null;
        }
      } else Ca = Sa ? Oi(e.stateNode.nextSibling) : null;
      return !0;
    }
    function Ma() {
      for (var e = Ca; e;) e = Oi(e.nextSibling);
    }
    function Na() {
      ((Ca = Sa = null), (wa = !1));
    }
    function Pa(e) {
      Ta === null ? (Ta = [e]) : Ta.push(e);
    }
    var Fa = C.ReactCurrentBatchConfig;
    function Ia(e, t, n) {
      if (((e = n.ref), e !== null && typeof e != `function` && typeof e != `object`)) {
        if (n._owner) {
          if (((n = n._owner), n)) {
            if (n.tag !== 1) throw Error(r(309));
            var i = n.stateNode;
          }
          if (!i) throw Error(r(147, e));
          var a = i,
            o = `` + e;
          return t !== null &&
            t.ref !== null &&
            typeof t.ref == `function` &&
            t.ref._stringRef === o
            ? t.ref
            : ((t = function (e) {
                var t = a.refs;
                e === null ? delete t[o] : (t[o] = e);
              }),
              (t._stringRef = o),
              t);
        }
        if (typeof e != `string`) throw Error(r(284));
        if (!n._owner) throw Error(r(290, e));
      }
      return e;
    }
    function La(e, t) {
      throw (
        (e = Object.prototype.toString.call(t)),
        Error(
          r(
            31,
            e === `[object Object]` ? `object with keys {` + Object.keys(t).join(`, `) + `}` : e,
          ),
        )
      );
    }
    function Ra(e) {
      var t = e._init;
      return t(e._payload);
    }
    function za(e) {
      function t(t, n) {
        if (e) {
          var r = t.deletions;
          r === null ? ((t.deletions = [n]), (t.flags |= 16)) : r.push(n);
        }
      }
      function n(n, r) {
        if (!e) return null;
        for (; r !== null;) (t(n, r), (r = r.sibling));
        return null;
      }
      function i(e, t) {
        for (e = new Map(); t !== null;)
          (t.key === null ? e.set(t.index, t) : e.set(t.key, t), (t = t.sibling));
        return e;
      }
      function a(e, t) {
        return ((e = ru(e, t)), (e.index = 0), (e.sibling = null), e);
      }
      function o(t, n, r) {
        return (
          (t.index = r),
          e
            ? ((r = t.alternate),
              r === null ? ((t.flags |= 2), n) : ((r = r.index), r < n ? ((t.flags |= 2), n) : r))
            : ((t.flags |= 1048576), n)
        );
      }
      function s(t) {
        return (e && t.alternate === null && (t.flags |= 2), t);
      }
      function c(e, t, n, r) {
        return t === null || t.tag !== 6
          ? ((t = su(n, e.mode, r)), (t.return = e), t)
          : ((t = a(t, n)), (t.return = e), t);
      }
      function l(e, t, n, r) {
        var i = n.type;
        return i === E
          ? d(e, t, n.props.children, r, n.key)
          : t !== null &&
              (t.elementType === i ||
                (typeof i == `object` && i && i.$$typeof === F && Ra(i) === t.type))
            ? ((r = a(t, n.props)), (r.ref = Ia(e, t, n)), (r.return = e), r)
            : ((r = iu(n.type, n.key, n.props, null, e.mode, r)),
              (r.ref = Ia(e, t, n)),
              (r.return = e),
              r);
      }
      function u(e, t, n, r) {
        return t === null ||
          t.tag !== 4 ||
          t.stateNode.containerInfo !== n.containerInfo ||
          t.stateNode.implementation !== n.implementation
          ? ((t = cu(n, e.mode, r)), (t.return = e), t)
          : ((t = a(t, n.children || [])), (t.return = e), t);
      }
      function d(e, t, n, r, i) {
        return t === null || t.tag !== 7
          ? ((t = au(n, e.mode, r, i)), (t.return = e), t)
          : ((t = a(t, n)), (t.return = e), t);
      }
      function f(e, t, n) {
        if ((typeof t == `string` && t !== ``) || typeof t == `number`)
          return ((t = su(`` + t, e.mode, n)), (t.return = e), t);
        if (typeof t == `object` && t) {
          switch (t.$$typeof) {
            case w:
              return (
                (n = iu(t.type, t.key, t.props, null, e.mode, n)),
                (n.ref = Ia(e, null, t)),
                (n.return = e),
                n
              );
            case T:
              return ((t = cu(t, e.mode, n)), (t.return = e), t);
            case F:
              var r = t._init;
              return f(e, r(t._payload), n);
          }
          if (ye(t) || te(t)) return ((t = au(t, e.mode, n, null)), (t.return = e), t);
          La(e, t);
        }
        return null;
      }
      function p(e, t, n, r) {
        var i = t === null ? null : t.key;
        if ((typeof n == `string` && n !== ``) || typeof n == `number`)
          return i === null ? c(e, t, `` + n, r) : null;
        if (typeof n == `object` && n) {
          switch (n.$$typeof) {
            case w:
              return n.key === i ? l(e, t, n, r) : null;
            case T:
              return n.key === i ? u(e, t, n, r) : null;
            case F:
              return ((i = n._init), p(e, t, i(n._payload), r));
          }
          if (ye(n) || te(n)) return i === null ? d(e, t, n, r, null) : null;
          La(e, n);
        }
        return null;
      }
      function m(e, t, n, r, i) {
        if ((typeof r == `string` && r !== ``) || typeof r == `number`)
          return ((e = e.get(n) || null), c(t, e, `` + r, i));
        if (typeof r == `object` && r) {
          switch (r.$$typeof) {
            case w:
              return ((e = e.get(r.key === null ? n : r.key) || null), l(t, e, r, i));
            case T:
              return ((e = e.get(r.key === null ? n : r.key) || null), u(t, e, r, i));
            case F:
              var a = r._init;
              return m(e, t, n, a(r._payload), i);
          }
          if (ye(r) || te(r)) return ((e = e.get(n) || null), d(t, e, r, i, null));
          La(t, r);
        }
        return null;
      }
      function h(r, a, s, c) {
        for (
          var l = null, u = null, d = a, h = (a = 0), g = null;
          d !== null && h < s.length;
          h++
        ) {
          d.index > h ? ((g = d), (d = null)) : (g = d.sibling);
          var _ = p(r, d, s[h], c);
          if (_ === null) {
            d === null && (d = g);
            break;
          }
          (e && d && _.alternate === null && t(r, d),
            (a = o(_, a, h)),
            u === null ? (l = _) : (u.sibling = _),
            (u = _),
            (d = g));
        }
        if (h === s.length) return (n(r, d), wa && va(r, h), l);
        if (d === null) {
          for (; h < s.length; h++)
            ((d = f(r, s[h], c)),
              d !== null && ((a = o(d, a, h)), u === null ? (l = d) : (u.sibling = d), (u = d)));
          return (wa && va(r, h), l);
        }
        for (d = i(r, d); h < s.length; h++)
          ((g = m(d, r, h, s[h], c)),
            g !== null &&
              (e && g.alternate !== null && d.delete(g.key === null ? h : g.key),
              (a = o(g, a, h)),
              u === null ? (l = g) : (u.sibling = g),
              (u = g)));
        return (
          e &&
            d.forEach(function (e) {
              return t(r, e);
            }),
          wa && va(r, h),
          l
        );
      }
      function g(a, s, c, l) {
        var u = te(c);
        if (typeof u != `function`) throw Error(r(150));
        if (((c = u.call(c)), c == null)) throw Error(r(151));
        for (
          var d = (u = null), h = s, g = (s = 0), _ = null, v = c.next();
          h !== null && !v.done;
          g++, v = c.next()
        ) {
          h.index > g ? ((_ = h), (h = null)) : (_ = h.sibling);
          var y = p(a, h, v.value, l);
          if (y === null) {
            h === null && (h = _);
            break;
          }
          (e && h && y.alternate === null && t(a, h),
            (s = o(y, s, g)),
            d === null ? (u = y) : (d.sibling = y),
            (d = y),
            (h = _));
        }
        if (v.done) return (n(a, h), wa && va(a, g), u);
        if (h === null) {
          for (; !v.done; g++, v = c.next())
            ((v = f(a, v.value, l)),
              v !== null && ((s = o(v, s, g)), d === null ? (u = v) : (d.sibling = v), (d = v)));
          return (wa && va(a, g), u);
        }
        for (h = i(a, h); !v.done; g++, v = c.next())
          ((v = m(h, a, g, v.value, l)),
            v !== null &&
              (e && v.alternate !== null && h.delete(v.key === null ? g : v.key),
              (s = o(v, s, g)),
              d === null ? (u = v) : (d.sibling = v),
              (d = v)));
        return (
          e &&
            h.forEach(function (e) {
              return t(a, e);
            }),
          wa && va(a, g),
          u
        );
      }
      function _(e, r, i, o) {
        if (
          (typeof i == `object` && i && i.type === E && i.key === null && (i = i.props.children),
          typeof i == `object` && i)
        ) {
          switch (i.$$typeof) {
            case w:
              a: {
                for (var c = i.key, l = r; l !== null;) {
                  if (l.key === c) {
                    if (((c = i.type), c === E)) {
                      if (l.tag === 7) {
                        (n(e, l.sibling), (r = a(l, i.props.children)), (r.return = e), (e = r));
                        break a;
                      }
                    } else if (
                      l.elementType === c ||
                      (typeof c == `object` && c && c.$$typeof === F && Ra(c) === l.type)
                    ) {
                      (n(e, l.sibling),
                        (r = a(l, i.props)),
                        (r.ref = Ia(e, l, i)),
                        (r.return = e),
                        (e = r));
                      break a;
                    }
                    n(e, l);
                    break;
                  }
                  (t(e, l), (l = l.sibling));
                }
                i.type === E
                  ? ((r = au(i.props.children, e.mode, o, i.key)), (r.return = e), (e = r))
                  : ((o = iu(i.type, i.key, i.props, null, e.mode, o)),
                    (o.ref = Ia(e, r, i)),
                    (o.return = e),
                    (e = o));
              }
              return s(e);
            case T:
              a: {
                for (l = i.key; r !== null;) {
                  if (r.key === l) {
                    if (
                      r.tag === 4 &&
                      r.stateNode.containerInfo === i.containerInfo &&
                      r.stateNode.implementation === i.implementation
                    ) {
                      (n(e, r.sibling), (r = a(r, i.children || [])), (r.return = e), (e = r));
                      break a;
                    }
                    n(e, r);
                    break;
                  }
                  (t(e, r), (r = r.sibling));
                }
                ((r = cu(i, e.mode, o)), (r.return = e), (e = r));
              }
              return s(e);
            case F:
              return ((l = i._init), _(e, r, l(i._payload), o));
          }
          if (ye(i)) return h(e, r, i, o);
          if (te(i)) return g(e, r, i, o);
          La(e, i);
        }
        return (typeof i == `string` && i !== ``) || typeof i == `number`
          ? ((i = `` + i),
            r !== null && r.tag === 6
              ? (n(e, r.sibling), (r = a(r, i)), (r.return = e), (e = r))
              : (n(e, r), (r = su(i, e.mode, o)), (r.return = e), (e = r)),
            s(e))
          : n(e, r);
      }
      return _;
    }
    var Ba = za(!0),
      Va = za(!1),
      Ha = Ui(null),
      Ua = null,
      Wa = null,
      Ga = null;
    function Ka() {
      Ga = Wa = Ua = null;
    }
    function qa(e) {
      var t = Ha.current;
      (Wi(Ha), (e._currentValue = t));
    }
    function Ja(e, t, n) {
      for (; e !== null;) {
        var r = e.alternate;
        if (
          ((e.childLanes & t) === t
            ? r !== null && (r.childLanes & t) !== t && (r.childLanes |= t)
            : ((e.childLanes |= t), r !== null && (r.childLanes |= t)),
          e === n)
        )
          break;
        e = e.return;
      }
    }
    function Ya(e, t) {
      ((Ua = e),
        (Ga = Wa = null),
        (e = e.dependencies),
        e !== null &&
          e.firstContext !== null &&
          ((e.lanes & t) !== 0 && (zs = !0), (e.firstContext = null)));
    }
    function Xa(e) {
      var t = e._currentValue;
      if (Ga !== e) {
        if (
          ((e = {
            context: e,
            memoizedValue: t,
            next: null,
          }),
          Wa === null)
        ) {
          if (Ua === null) throw Error(r(308));
          ((Wa = e),
            (Ua.dependencies = {
              lanes: 0,
              firstContext: e,
            }));
        } else Wa = Wa.next = e;
      }
      return t;
    }
    var Za = null;
    function Qa(e) {
      Za === null ? (Za = [e]) : Za.push(e);
    }
    function $a(e, t, n, r) {
      var i = t.interleaved;
      return (
        i === null ? ((n.next = n), Qa(t)) : ((n.next = i.next), (i.next = n)),
        (t.interleaved = n),
        eo(e, r)
      );
    }
    function eo(e, t) {
      e.lanes |= t;
      var n = e.alternate;
      for (n !== null && (n.lanes |= t), n = e, e = e.return; e !== null;)
        ((e.childLanes |= t),
          (n = e.alternate),
          n !== null && (n.childLanes |= t),
          (n = e),
          (e = e.return));
      return n.tag === 3 ? n.stateNode : null;
    }
    var to = !1;
    function no(e) {
      e.updateQueue = {
        baseState: e.memoizedState,
        firstBaseUpdate: null,
        lastBaseUpdate: null,
        shared: {
          pending: null,
          interleaved: null,
          lanes: 0,
        },
        effects: null,
      };
    }
    function ro(e, t) {
      ((e = e.updateQueue),
        t.updateQueue === e &&
          (t.updateQueue = {
            baseState: e.baseState,
            firstBaseUpdate: e.firstBaseUpdate,
            lastBaseUpdate: e.lastBaseUpdate,
            shared: e.shared,
            effects: e.effects,
          }));
    }
    function io(e, t) {
      return {
        eventTime: e,
        lane: t,
        tag: 0,
        payload: null,
        callback: null,
        next: null,
      };
    }
    function ao(e, t, n) {
      var r = e.updateQueue;
      if (r === null) return null;
      if (((r = r.shared), Jc & 2)) {
        var i = r.pending;
        return (
          i === null ? (t.next = t) : ((t.next = i.next), (i.next = t)),
          (r.pending = t),
          eo(e, n)
        );
      }
      return (
        (i = r.interleaved),
        i === null ? ((t.next = t), Qa(r)) : ((t.next = i.next), (i.next = t)),
        (r.interleaved = t),
        eo(e, n)
      );
    }
    function oo(e, t, n) {
      if (((t = t.updateQueue), t !== null && ((t = t.shared), n & 4194240))) {
        var r = t.lanes;
        ((r &= e.pendingLanes), (n |= r), (t.lanes = n), Lt(e, n));
      }
    }
    function so(e, t) {
      var n = e.updateQueue,
        r = e.alternate;
      if (r !== null && ((r = r.updateQueue), n === r)) {
        var i = null,
          a = null;
        if (((n = n.firstBaseUpdate), n !== null)) {
          do {
            var o = {
              eventTime: n.eventTime,
              lane: n.lane,
              tag: n.tag,
              payload: n.payload,
              callback: n.callback,
              next: null,
            };
            (a === null ? (i = a = o) : (a = a.next = o), (n = n.next));
          } while (n !== null);
          a === null ? (i = a = t) : (a = a.next = t);
        } else i = a = t;
        ((n = {
          baseState: r.baseState,
          firstBaseUpdate: i,
          lastBaseUpdate: a,
          shared: r.shared,
          effects: r.effects,
        }),
          (e.updateQueue = n));
        return;
      }
      ((e = n.lastBaseUpdate),
        e === null ? (n.firstBaseUpdate = t) : (e.next = t),
        (n.lastBaseUpdate = t));
    }
    function co(e, t, n, r) {
      var i = e.updateQueue;
      to = !1;
      var a = i.firstBaseUpdate,
        o = i.lastBaseUpdate,
        s = i.shared.pending;
      if (s !== null) {
        i.shared.pending = null;
        var c = s,
          l = c.next;
        ((c.next = null), o === null ? (a = l) : (o.next = l), (o = c));
        var u = e.alternate;
        u !== null &&
          ((u = u.updateQueue),
          (s = u.lastBaseUpdate),
          s !== o && (s === null ? (u.firstBaseUpdate = l) : (s.next = l), (u.lastBaseUpdate = c)));
      }
      if (a !== null) {
        var d = i.baseState;
        ((o = 0), (u = l = c = null), (s = a));
        do {
          var f = s.lane,
            p = s.eventTime;
          if ((r & f) === f) {
            u !== null &&
              (u = u.next =
                {
                  eventTime: p,
                  lane: 0,
                  tag: s.tag,
                  payload: s.payload,
                  callback: s.callback,
                  next: null,
                });
            a: {
              var m = e,
                h = s;
              switch (((f = t), (p = n), h.tag)) {
                case 1:
                  if (((m = h.payload), typeof m == `function`)) {
                    d = m.call(p, d, f);
                    break a;
                  }
                  d = m;
                  break a;
                case 3:
                  m.flags = (m.flags & -65537) | 128;
                case 0:
                  if (
                    ((m = h.payload), (f = typeof m == `function` ? m.call(p, d, f) : m), f == null)
                  )
                    break a;
                  d = L({}, d, f);
                  break a;
                case 2:
                  to = !0;
              }
            }
            s.callback !== null &&
              s.lane !== 0 &&
              ((e.flags |= 64), (f = i.effects), f === null ? (i.effects = [s]) : f.push(s));
          } else
            ((p = {
              eventTime: p,
              lane: f,
              tag: s.tag,
              payload: s.payload,
              callback: s.callback,
              next: null,
            }),
              u === null ? ((l = u = p), (c = d)) : (u = u.next = p),
              (o |= f));
          if (((s = s.next), s === null)) {
            if (((s = i.shared.pending), s === null)) break;
            ((f = s),
              (s = f.next),
              (f.next = null),
              (i.lastBaseUpdate = f),
              (i.shared.pending = null));
          }
        } while (1);
        if (
          (u === null && (c = d),
          (i.baseState = c),
          (i.firstBaseUpdate = l),
          (i.lastBaseUpdate = u),
          (t = i.shared.interleaved),
          t !== null)
        ) {
          i = t;
          do ((o |= i.lane), (i = i.next));
          while (i !== t);
        } else a === null && (i.shared.lanes = 0);
        ((nl |= o), (e.lanes = o), (e.memoizedState = d));
      }
    }
    function lo(e, t, n) {
      if (((e = t.effects), (t.effects = null), e !== null))
        for (t = 0; t < e.length; t++) {
          var i = e[t],
            a = i.callback;
          if (a !== null) {
            if (((i.callback = null), (i = n), typeof a != `function`)) throw Error(r(191, a));
            a.call(i);
          }
        }
    }
    var uo = {},
      fo = Ui(uo),
      po = Ui(uo),
      mo = Ui(uo);
    function ho(e) {
      if (e === uo) throw Error(r(174));
      return e;
    }
    function go(e, t) {
      switch ((Gi(mo, t), Gi(po, e), Gi(fo, uo), (e = t.nodeType), e)) {
        case 9:
        case 11:
          t = (t = t.documentElement) ? t.namespaceURI : Se(null, ``);
          break;
        default:
          ((e = e === 8 ? t.parentNode : t),
            (t = e.namespaceURI || null),
            (e = e.tagName),
            (t = Se(t, e)));
      }
      (Wi(fo), Gi(fo, t));
    }
    function _o() {
      (Wi(fo), Wi(po), Wi(mo));
    }
    function vo(e) {
      ho(mo.current);
      var t = ho(fo.current),
        n = Se(t, e.type);
      t !== n && (Gi(po, e), Gi(fo, n));
    }
    function yo(e) {
      po.current === e && (Wi(fo), Wi(po));
    }
    var bo = Ui(0);
    function xo(e) {
      for (var t = e; t !== null;) {
        if (t.tag === 13) {
          var n = t.memoizedState;
          if (n !== null && ((n = n.dehydrated), n === null || n.data === `$?` || n.data === `$!`))
            return t;
        } else if (t.tag === 19 && t.memoizedProps.revealOrder !== void 0) {
          if (t.flags & 128) return t;
        } else if (t.child !== null) {
          ((t.child.return = t), (t = t.child));
          continue;
        }
        if (t === e) break;
        for (; t.sibling === null;) {
          if (t.return === null || t.return === e) return null;
          t = t.return;
        }
        ((t.sibling.return = t.return), (t = t.sibling));
      }
      return null;
    }
    var So = [];
    function Co() {
      for (var e = 0; e < So.length; e++) So[e]._workInProgressVersionPrimary = null;
      So.length = 0;
    }
    var wo = C.ReactCurrentDispatcher,
      To = C.ReactCurrentBatchConfig,
      Eo = 0,
      Do = null,
      Oo = null,
      ko = null,
      Ao = !1,
      jo = !1,
      Mo = 0,
      No = 0;
    function Po() {
      throw Error(r(321));
    }
    function Fo(e, t) {
      if (t === null) return !1;
      for (var n = 0; n < t.length && n < e.length; n++) if (!Dr(e[n], t[n])) return !1;
      return !0;
    }
    function Io(e, t, n, i, a, o) {
      if (
        ((Eo = o),
        (Do = t),
        (t.memoizedState = null),
        (t.updateQueue = null),
        (t.lanes = 0),
        (wo.current = e === null || e.memoizedState === null ? ys : bs),
        (e = n(i, a)),
        jo)
      ) {
        o = 0;
        do {
          if (((jo = !1), (Mo = 0), 25 <= o)) throw Error(r(301));
          ((o += 1), (ko = Oo = null), (t.updateQueue = null), (wo.current = xs), (e = n(i, a)));
        } while (jo);
      }
      if (
        ((wo.current = vs),
        (t = Oo !== null && Oo.next !== null),
        (Eo = 0),
        (ko = Oo = Do = null),
        (Ao = !1),
        t)
      )
        throw Error(r(300));
      return e;
    }
    function Lo() {
      var e = Mo !== 0;
      return ((Mo = 0), e);
    }
    function Ro() {
      var e = {
        memoizedState: null,
        baseState: null,
        baseQueue: null,
        queue: null,
        next: null,
      };
      return (ko === null ? (Do.memoizedState = ko = e) : (ko = ko.next = e), ko);
    }
    function zo() {
      if (Oo === null) {
        var e = Do.alternate;
        e = e === null ? null : e.memoizedState;
      } else e = Oo.next;
      var t = ko === null ? Do.memoizedState : ko.next;
      if (t !== null) ((ko = t), (Oo = e));
      else {
        if (e === null) throw Error(r(310));
        ((Oo = e),
          (e = {
            memoizedState: Oo.memoizedState,
            baseState: Oo.baseState,
            baseQueue: Oo.baseQueue,
            queue: Oo.queue,
            next: null,
          }),
          ko === null ? (Do.memoizedState = ko = e) : (ko = ko.next = e));
      }
      return ko;
    }
    function Bo(e, t) {
      return typeof t == `function` ? t(e) : t;
    }
    function Vo(e) {
      var t = zo(),
        n = t.queue;
      if (n === null) throw Error(r(311));
      n.lastRenderedReducer = e;
      var i = Oo,
        a = i.baseQueue,
        o = n.pending;
      if (o !== null) {
        if (a !== null) {
          var s = a.next;
          ((a.next = o.next), (o.next = s));
        }
        ((i.baseQueue = a = o), (n.pending = null));
      }
      if (a !== null) {
        ((o = a.next), (i = i.baseState));
        var c = (s = null),
          l = null,
          u = o;
        do {
          var d = u.lane;
          if ((Eo & d) === d)
            (l !== null &&
              (l = l.next =
                {
                  lane: 0,
                  action: u.action,
                  hasEagerState: u.hasEagerState,
                  eagerState: u.eagerState,
                  next: null,
                }),
              (i = u.hasEagerState ? u.eagerState : e(i, u.action)));
          else {
            var f = {
              lane: d,
              action: u.action,
              hasEagerState: u.hasEagerState,
              eagerState: u.eagerState,
              next: null,
            };
            (l === null ? ((c = l = f), (s = i)) : (l = l.next = f), (Do.lanes |= d), (nl |= d));
          }
          u = u.next;
        } while (u !== null && u !== o);
        (l === null ? (s = i) : (l.next = c),
          Dr(i, t.memoizedState) || (zs = !0),
          (t.memoizedState = i),
          (t.baseState = s),
          (t.baseQueue = l),
          (n.lastRenderedState = i));
      }
      if (((e = n.interleaved), e !== null)) {
        a = e;
        do ((o = a.lane), (Do.lanes |= o), (nl |= o), (a = a.next));
        while (a !== e);
      } else a === null && (n.lanes = 0);
      return [t.memoizedState, n.dispatch];
    }
    function Ho(e) {
      var t = zo(),
        n = t.queue;
      if (n === null) throw Error(r(311));
      n.lastRenderedReducer = e;
      var i = n.dispatch,
        a = n.pending,
        o = t.memoizedState;
      if (a !== null) {
        n.pending = null;
        var s = (a = a.next);
        do ((o = e(o, s.action)), (s = s.next));
        while (s !== a);
        (Dr(o, t.memoizedState) || (zs = !0),
          (t.memoizedState = o),
          t.baseQueue === null && (t.baseState = o),
          (n.lastRenderedState = o));
      }
      return [o, i];
    }
    function Uo() {}
    function Wo(e, t) {
      var n = Do,
        i = zo(),
        a = t(),
        o = !Dr(i.memoizedState, a);
      if (
        (o && ((i.memoizedState = a), (zs = !0)),
        (i = i.queue),
        ns(qo.bind(null, n, i, e), [e]),
        i.getSnapshot !== t || o || (ko !== null && ko.memoizedState.tag & 1))
      ) {
        if (((n.flags |= 2048), Zo(9, Ko.bind(null, n, i, a, t), void 0, null), Yc === null))
          throw Error(r(349));
        Eo & 30 || Go(n, t, a);
      }
      return a;
    }
    function Go(e, t, n) {
      ((e.flags |= 16384),
        (e = {
          getSnapshot: t,
          value: n,
        }),
        (t = Do.updateQueue),
        t === null
          ? ((t = {
              lastEffect: null,
              stores: null,
            }),
            (Do.updateQueue = t),
            (t.stores = [e]))
          : ((n = t.stores), n === null ? (t.stores = [e]) : n.push(e)));
    }
    function Ko(e, t, n, r) {
      ((t.value = n), (t.getSnapshot = r), Jo(t) && Yo(e));
    }
    function qo(e, t, n) {
      return n(function () {
        Jo(t) && Yo(e);
      });
    }
    function Jo(e) {
      var t = e.getSnapshot;
      e = e.value;
      try {
        var n = t();
        return !Dr(e, n);
      } catch {
        return !0;
      }
    }
    function Yo(e) {
      var t = eo(e, 1);
      t !== null && Sl(t, e, 1, -1);
    }
    function Xo(e) {
      var t = Ro();
      return (
        typeof e == `function` && (e = e()),
        (t.memoizedState = t.baseState = e),
        (e = {
          pending: null,
          interleaved: null,
          lanes: 0,
          dispatch: null,
          lastRenderedReducer: Bo,
          lastRenderedState: e,
        }),
        (t.queue = e),
        (e = e.dispatch = ms.bind(null, Do, e)),
        [t.memoizedState, e]
      );
    }
    function Zo(e, t, n, r) {
      return (
        (e = {
          tag: e,
          create: t,
          destroy: n,
          deps: r,
          next: null,
        }),
        (t = Do.updateQueue),
        t === null
          ? ((t = {
              lastEffect: null,
              stores: null,
            }),
            (Do.updateQueue = t),
            (t.lastEffect = e.next = e))
          : ((n = t.lastEffect),
            n === null
              ? (t.lastEffect = e.next = e)
              : ((r = n.next), (n.next = e), (e.next = r), (t.lastEffect = e))),
        e
      );
    }
    function Qo() {
      return zo().memoizedState;
    }
    function $o(e, t, n, r) {
      var i = Ro();
      ((Do.flags |= e), (i.memoizedState = Zo(1 | t, n, void 0, r === void 0 ? null : r)));
    }
    function es(e, t, n, r) {
      var i = zo();
      r = r === void 0 ? null : r;
      var a = void 0;
      if (Oo !== null) {
        var o = Oo.memoizedState;
        if (((a = o.destroy), r !== null && Fo(r, o.deps))) {
          i.memoizedState = Zo(t, n, a, r);
          return;
        }
      }
      ((Do.flags |= e), (i.memoizedState = Zo(1 | t, n, a, r)));
    }
    function ts(e, t) {
      return $o(8390656, 8, e, t);
    }
    function ns(e, t) {
      return es(2048, 8, e, t);
    }
    function rs(e, t) {
      return es(4, 2, e, t);
    }
    function is(e, t) {
      return es(4, 4, e, t);
    }
    function as(e, t) {
      if (typeof t == `function`)
        return (
          (e = e()),
          t(e),
          function () {
            t(null);
          }
        );
      if (t != null)
        return (
          (e = e()),
          (t.current = e),
          function () {
            t.current = null;
          }
        );
    }
    function os(e, t, n) {
      return ((n = n == null ? null : n.concat([e])), es(4, 4, as.bind(null, t, e), n));
    }
    function ss() {}
    function cs(e, t) {
      var n = zo();
      t = t === void 0 ? null : t;
      var r = n.memoizedState;
      return r !== null && t !== null && Fo(t, r[1]) ? r[0] : ((n.memoizedState = [e, t]), e);
    }
    function ls(e, t) {
      var n = zo();
      t = t === void 0 ? null : t;
      var r = n.memoizedState;
      return r !== null && t !== null && Fo(t, r[1])
        ? r[0]
        : ((e = e()), (n.memoizedState = [e, t]), e);
    }
    function us(e, t, n) {
      return Eo & 21
        ? (Dr(n, t) || ((n = Nt()), (Do.lanes |= n), (nl |= n), (e.baseState = !0)), t)
        : (e.baseState && ((e.baseState = !1), (zs = !0)), (e.memoizedState = n));
    }
    function ds(e, t) {
      var n = Rt;
      ((Rt = n !== 0 && 4 > n ? n : 4), e(!0));
      var r = To.transition;
      To.transition = {};
      try {
        (e(!1), t());
      } finally {
        ((Rt = n), (To.transition = r));
      }
    }
    function fs() {
      return zo().memoizedState;
    }
    function ps(e, t, n) {
      var r = xl(e);
      if (
        ((n = {
          lane: r,
          action: n,
          hasEagerState: !1,
          eagerState: null,
          next: null,
        }),
        hs(e))
      )
        gs(t, n);
      else if (((n = $a(e, t, n, r)), n !== null)) {
        var i = bl();
        (Sl(n, e, r, i), _s(n, t, r));
      }
    }
    function ms(e, t, n) {
      var r = xl(e),
        i = {
          lane: r,
          action: n,
          hasEagerState: !1,
          eagerState: null,
          next: null,
        };
      if (hs(e)) gs(t, i);
      else {
        var a = e.alternate;
        if (
          e.lanes === 0 &&
          (a === null || a.lanes === 0) &&
          ((a = t.lastRenderedReducer), a !== null)
        )
          try {
            var o = t.lastRenderedState,
              s = a(o, n);
            if (((i.hasEagerState = !0), (i.eagerState = s), Dr(s, o))) {
              var c = t.interleaved;
              (c === null ? ((i.next = i), Qa(t)) : ((i.next = c.next), (c.next = i)),
                (t.interleaved = i));
              return;
            }
          } catch {}
        ((n = $a(e, t, i, r)), n !== null && ((i = bl()), Sl(n, e, r, i), _s(n, t, r)));
      }
    }
    function hs(e) {
      var t = e.alternate;
      return e === Do || (t !== null && t === Do);
    }
    function gs(e, t) {
      jo = Ao = !0;
      var n = e.pending;
      (n === null ? (t.next = t) : ((t.next = n.next), (n.next = t)), (e.pending = t));
    }
    function _s(e, t, n) {
      if (n & 4194240) {
        var r = t.lanes;
        ((r &= e.pendingLanes), (n |= r), (t.lanes = n), Lt(e, n));
      }
    }
    var vs = {
        readContext: Xa,
        useCallback: Po,
        useContext: Po,
        useEffect: Po,
        useImperativeHandle: Po,
        useInsertionEffect: Po,
        useLayoutEffect: Po,
        useMemo: Po,
        useReducer: Po,
        useRef: Po,
        useState: Po,
        useDebugValue: Po,
        useDeferredValue: Po,
        useTransition: Po,
        useMutableSource: Po,
        useSyncExternalStore: Po,
        useId: Po,
        unstable_isNewReconciler: !1,
      },
      ys = {
        readContext: Xa,
        useCallback: function (e, t) {
          return ((Ro().memoizedState = [e, t === void 0 ? null : t]), e);
        },
        useContext: Xa,
        useEffect: ts,
        useImperativeHandle: function (e, t, n) {
          return ((n = n == null ? null : n.concat([e])), $o(4194308, 4, as.bind(null, t, e), n));
        },
        useLayoutEffect: function (e, t) {
          return $o(4194308, 4, e, t);
        },
        useInsertionEffect: function (e, t) {
          return $o(4, 2, e, t);
        },
        useMemo: function (e, t) {
          var n = Ro();
          return ((t = t === void 0 ? null : t), (e = e()), (n.memoizedState = [e, t]), e);
        },
        useReducer: function (e, t, n) {
          var r = Ro();
          return (
            (t = n === void 0 ? t : n(t)),
            (r.memoizedState = r.baseState = t),
            (e = {
              pending: null,
              interleaved: null,
              lanes: 0,
              dispatch: null,
              lastRenderedReducer: e,
              lastRenderedState: t,
            }),
            (r.queue = e),
            (e = e.dispatch = ps.bind(null, Do, e)),
            [r.memoizedState, e]
          );
        },
        useRef: function (e) {
          var t = Ro();
          return (
            (e = {
              current: e,
            }),
            (t.memoizedState = e)
          );
        },
        useState: Xo,
        useDebugValue: ss,
        useDeferredValue: function (e) {
          return (Ro().memoizedState = e);
        },
        useTransition: function () {
          var e = Xo(!1),
            t = e[0];
          return ((e = ds.bind(null, e[1])), (Ro().memoizedState = e), [t, e]);
        },
        useMutableSource: function () {},
        useSyncExternalStore: function (e, t, n) {
          var i = Do,
            a = Ro();
          if (wa) {
            if (n === void 0) throw Error(r(407));
            n = n();
          } else {
            if (((n = t()), Yc === null)) throw Error(r(349));
            Eo & 30 || Go(i, t, n);
          }
          a.memoizedState = n;
          var o = {
            value: n,
            getSnapshot: t,
          };
          return (
            (a.queue = o),
            ts(qo.bind(null, i, o, e), [e]),
            (i.flags |= 2048),
            Zo(9, Ko.bind(null, i, o, n, t), void 0, null),
            n
          );
        },
        useId: function () {
          var e = Ro(),
            t = Yc.identifierPrefix;
          if (wa) {
            var n = _a,
              r = ga;
            ((n = (r & ~(1 << (32 - St(r) - 1))).toString(32) + n),
              (t = `:` + t + `R` + n),
              (n = Mo++),
              0 < n && (t += `H` + n.toString(32)),
              (t += `:`));
          } else ((n = No++), (t = `:` + t + `r` + n.toString(32) + `:`));
          return (e.memoizedState = t);
        },
        unstable_isNewReconciler: !1,
      },
      bs = {
        readContext: Xa,
        useCallback: cs,
        useContext: Xa,
        useEffect: ns,
        useImperativeHandle: os,
        useInsertionEffect: rs,
        useLayoutEffect: is,
        useMemo: ls,
        useReducer: Vo,
        useRef: Qo,
        useState: function () {
          return Vo(Bo);
        },
        useDebugValue: ss,
        useDeferredValue: function (e) {
          return us(zo(), Oo.memoizedState, e);
        },
        useTransition: function () {
          return [Vo(Bo)[0], zo().memoizedState];
        },
        useMutableSource: Uo,
        useSyncExternalStore: Wo,
        useId: fs,
        unstable_isNewReconciler: !1,
      },
      xs = {
        readContext: Xa,
        useCallback: cs,
        useContext: Xa,
        useEffect: ns,
        useImperativeHandle: os,
        useInsertionEffect: rs,
        useLayoutEffect: is,
        useMemo: ls,
        useReducer: Ho,
        useRef: Qo,
        useState: function () {
          return Ho(Bo);
        },
        useDebugValue: ss,
        useDeferredValue: function (e) {
          var t = zo();
          return Oo === null ? (t.memoizedState = e) : us(t, Oo.memoizedState, e);
        },
        useTransition: function () {
          return [Ho(Bo)[0], zo().memoizedState];
        },
        useMutableSource: Uo,
        useSyncExternalStore: Wo,
        useId: fs,
        unstable_isNewReconciler: !1,
      };
    function Ss(e, t) {
      if (e && e.defaultProps) {
        for (var n in ((t = L({}, t)), (e = e.defaultProps), e)) t[n] === void 0 && (t[n] = e[n]);
        return t;
      }
      return t;
    }
    function Cs(e, t, n, r) {
      ((t = e.memoizedState),
        (n = n(r, t)),
        (n = n == null ? t : L({}, t, n)),
        (e.memoizedState = n),
        e.lanes === 0 && (e.updateQueue.baseState = n));
    }
    var ws = {
      isMounted: function (e) {
        return (e = e._reactInternals) ? nt(e) === e : !1;
      },
      enqueueSetState: function (e, t, n) {
        e = e._reactInternals;
        var r = bl(),
          i = xl(e),
          a = io(r, i);
        ((a.payload = t),
          n != null && (a.callback = n),
          (t = ao(e, a, i)),
          t !== null && (Sl(t, e, i, r), oo(t, e, i)));
      },
      enqueueReplaceState: function (e, t, n) {
        e = e._reactInternals;
        var r = bl(),
          i = xl(e),
          a = io(r, i);
        ((a.tag = 1),
          (a.payload = t),
          n != null && (a.callback = n),
          (t = ao(e, a, i)),
          t !== null && (Sl(t, e, i, r), oo(t, e, i)));
      },
      enqueueForceUpdate: function (e, t) {
        e = e._reactInternals;
        var n = bl(),
          r = xl(e),
          i = io(n, r);
        ((i.tag = 2),
          t != null && (i.callback = t),
          (t = ao(e, i, r)),
          t !== null && (Sl(t, e, r, n), oo(t, e, r)));
      },
    };
    function Ts(e, t, n, r, i, a, o) {
      return (
        (e = e.stateNode),
        typeof e.shouldComponentUpdate == `function`
          ? e.shouldComponentUpdate(r, a, o)
          : t.prototype && t.prototype.isPureReactComponent
            ? !Or(n, r) || !Or(i, a)
            : !0
      );
    }
    function Es(e, t, n) {
      var r = !1,
        i = Ki,
        a = t.contextType;
      return (
        typeof a == `object` && a
          ? (a = Xa(a))
          : ((i = Zi(t) ? Yi : qi.current),
            (r = t.contextTypes),
            (a = (r = r != null) ? Xi(e, i) : Ki)),
        (t = new t(n, a)),
        (e.memoizedState = t.state !== null && t.state !== void 0 ? t.state : null),
        (t.updater = ws),
        (e.stateNode = t),
        (t._reactInternals = e),
        r &&
          ((e = e.stateNode),
          (e.__reactInternalMemoizedUnmaskedChildContext = i),
          (e.__reactInternalMemoizedMaskedChildContext = a)),
        t
      );
    }
    function Ds(e, t, n, r) {
      ((e = t.state),
        typeof t.componentWillReceiveProps == `function` && t.componentWillReceiveProps(n, r),
        typeof t.UNSAFE_componentWillReceiveProps == `function` &&
          t.UNSAFE_componentWillReceiveProps(n, r),
        t.state !== e && ws.enqueueReplaceState(t, t.state, null));
    }
    function Os(e, t, n, r) {
      var i = e.stateNode;
      ((i.props = n), (i.state = e.memoizedState), (i.refs = {}), no(e));
      var a = t.contextType;
      (typeof a == `object` && a
        ? (i.context = Xa(a))
        : ((a = Zi(t) ? Yi : qi.current), (i.context = Xi(e, a))),
        (i.state = e.memoizedState),
        (a = t.getDerivedStateFromProps),
        typeof a == `function` && (Cs(e, t, a, n), (i.state = e.memoizedState)),
        typeof t.getDerivedStateFromProps == `function` ||
          typeof i.getSnapshotBeforeUpdate == `function` ||
          (typeof i.UNSAFE_componentWillMount != `function` &&
            typeof i.componentWillMount != `function`) ||
          ((t = i.state),
          typeof i.componentWillMount == `function` && i.componentWillMount(),
          typeof i.UNSAFE_componentWillMount == `function` && i.UNSAFE_componentWillMount(),
          t !== i.state && ws.enqueueReplaceState(i, i.state, null),
          co(e, n, i, r),
          (i.state = e.memoizedState)),
        typeof i.componentDidMount == `function` && (e.flags |= 4194308));
    }
    function ks(e, t) {
      try {
        var n = ``,
          r = t;
        do ((n += oe(r)), (r = r.return));
        while (r);
        var i = n;
      } catch (e) {
        i =
          `
Error generating stack: ` +
          e.message +
          `
` +
          e.stack;
      }
      return {
        value: e,
        source: t,
        stack: i,
        digest: null,
      };
    }
    function As(e, t, n) {
      return {
        value: e,
        source: null,
        stack: n ?? null,
        digest: t ?? null,
      };
    }
    function js(e, t) {
      try {
        console.error(t.value);
      } catch (e) {
        setTimeout(function () {
          throw e;
        });
      }
    }
    var Ms = typeof WeakMap == `function` ? WeakMap : Map;
    function Ns(e, t, n) {
      ((n = io(-1, n)),
        (n.tag = 3),
        (n.payload = {
          element: null,
        }));
      var r = t.value;
      return (
        (n.callback = function () {
          (ul || ((ul = !0), (dl = r)), js(e, t));
        }),
        n
      );
    }
    function Ps(e, t, n) {
      ((n = io(-1, n)), (n.tag = 3));
      var r = e.type.getDerivedStateFromError;
      if (typeof r == `function`) {
        var i = t.value;
        ((n.payload = function () {
          return r(i);
        }),
          (n.callback = function () {
            js(e, t);
          }));
      }
      var a = e.stateNode;
      return (
        a !== null &&
          typeof a.componentDidCatch == `function` &&
          (n.callback = function () {
            (js(e, t),
              typeof r != `function` && (fl === null ? (fl = new Set([this])) : fl.add(this)));
            var n = t.stack;
            this.componentDidCatch(t.value, {
              componentStack: n === null ? `` : n,
            });
          }),
        n
      );
    }
    function Fs(e, t, n) {
      var r = e.pingCache;
      if (r === null) {
        r = e.pingCache = new Ms();
        var i = new Set();
        r.set(t, i);
      } else ((i = r.get(t)), i === void 0 && ((i = new Set()), r.set(t, i)));
      i.has(n) || (i.add(n), (e = ql.bind(null, e, t, n)), t.then(e, e));
    }
    function Is(e) {
      do {
        var t;
        if (
          ((t = e.tag === 13) && ((t = e.memoizedState), (t = t === null || t.dehydrated !== null)),
          t)
        )
          return e;
        e = e.return;
      } while (e !== null);
      return null;
    }
    function Ls(e, t, n, r, i) {
      return e.mode & 1
        ? ((e.flags |= 65536), (e.lanes = i), e)
        : (e === t
            ? (e.flags |= 65536)
            : ((e.flags |= 128),
              (n.flags |= 131072),
              (n.flags &= -52805),
              n.tag === 1 &&
                (n.alternate === null ? (n.tag = 17) : ((t = io(-1, 1)), (t.tag = 2), ao(n, t, 1))),
              (n.lanes |= 1)),
          e);
    }
    var Rs = C.ReactCurrentOwner,
      zs = !1;
    function Bs(e, t, n, r) {
      t.child = e === null ? Va(t, null, n, r) : Ba(t, e.child, n, r);
    }
    function Vs(e, t, n, r, i) {
      n = n.render;
      var a = t.ref;
      return (
        Ya(t, i),
        (r = Io(e, t, n, r, a, i)),
        (n = Lo()),
        e !== null && !zs
          ? ((t.updateQueue = e.updateQueue), (t.flags &= -2053), (e.lanes &= ~i), sc(e, t, i))
          : (wa && n && ba(t), (t.flags |= 1), Bs(e, t, r, i), t.child)
      );
    }
    function Hs(e, t, n, r, i) {
      if (e === null) {
        var a = n.type;
        return typeof a == `function` &&
          !tu(a) &&
          a.defaultProps === void 0 &&
          n.compare === null &&
          n.defaultProps === void 0
          ? ((t.tag = 15), (t.type = a), Us(e, t, a, r, i))
          : ((e = iu(n.type, null, r, t, t.mode, i)),
            (e.ref = t.ref),
            (e.return = t),
            (t.child = e));
      }
      if (((a = e.child), (e.lanes & i) === 0)) {
        var o = a.memoizedProps;
        if (((n = n.compare), (n = n === null ? Or : n), n(o, r) && e.ref === t.ref))
          return sc(e, t, i);
      }
      return ((t.flags |= 1), (e = ru(a, r)), (e.ref = t.ref), (e.return = t), (t.child = e));
    }
    function Us(e, t, n, r, i) {
      if (e !== null) {
        var a = e.memoizedProps;
        if (Or(a, r) && e.ref === t.ref) {
          if (((zs = !1), (t.pendingProps = r = a), (e.lanes & i) !== 0))
            e.flags & 131072 && (zs = !0);
          else return ((t.lanes = e.lanes), sc(e, t, i));
        }
      }
      return Ks(e, t, n, r, i);
    }
    function Ws(e, t, n) {
      var r = t.pendingProps,
        i = r.children,
        a = e === null ? null : e.memoizedState;
      if (r.mode === `hidden`) {
        if (!(t.mode & 1))
          ((t.memoizedState = {
            baseLanes: 0,
            cachePool: null,
            transitions: null,
          }),
            Gi($c, Qc),
            (Qc |= n));
        else {
          if (!(n & 1073741824))
            return (
              (e = a === null ? n : a.baseLanes | n),
              (t.lanes = t.childLanes = 1073741824),
              (t.memoizedState = {
                baseLanes: e,
                cachePool: null,
                transitions: null,
              }),
              (t.updateQueue = null),
              Gi($c, Qc),
              (Qc |= e),
              null
            );
          ((t.memoizedState = {
            baseLanes: 0,
            cachePool: null,
            transitions: null,
          }),
            (r = a === null ? n : a.baseLanes),
            Gi($c, Qc),
            (Qc |= r));
        }
      } else
        (a === null ? (r = n) : ((r = a.baseLanes | n), (t.memoizedState = null)),
          Gi($c, Qc),
          (Qc |= r));
      return (Bs(e, t, i, n), t.child);
    }
    function Gs(e, t) {
      var n = t.ref;
      ((e === null && n !== null) || (e !== null && e.ref !== n)) &&
        ((t.flags |= 512), (t.flags |= 2097152));
    }
    function Ks(e, t, n, r, i) {
      var a = Zi(n) ? Yi : qi.current;
      return (
        (a = Xi(t, a)),
        Ya(t, i),
        (n = Io(e, t, n, r, a, i)),
        (r = Lo()),
        e !== null && !zs
          ? ((t.updateQueue = e.updateQueue), (t.flags &= -2053), (e.lanes &= ~i), sc(e, t, i))
          : (wa && r && ba(t), (t.flags |= 1), Bs(e, t, n, i), t.child)
      );
    }
    function qs(e, t, n, r, i) {
      if (Zi(n)) {
        var a = !0;
        ta(t);
      } else a = !1;
      if ((Ya(t, i), t.stateNode === null)) (oc(e, t), Es(t, n, r), Os(t, n, r, i), (r = !0));
      else if (e === null) {
        var o = t.stateNode,
          s = t.memoizedProps;
        o.props = s;
        var c = o.context,
          l = n.contextType;
        typeof l == `object` && l ? (l = Xa(l)) : ((l = Zi(n) ? Yi : qi.current), (l = Xi(t, l)));
        var u = n.getDerivedStateFromProps,
          d = typeof u == `function` || typeof o.getSnapshotBeforeUpdate == `function`;
        (d ||
          (typeof o.UNSAFE_componentWillReceiveProps != `function` &&
            typeof o.componentWillReceiveProps != `function`) ||
          ((s !== r || c !== l) && Ds(t, o, r, l)),
          (to = !1));
        var f = t.memoizedState;
        ((o.state = f),
          co(t, r, o, i),
          (c = t.memoizedState),
          s !== r || f !== c || Ji.current || to
            ? (typeof u == `function` && (Cs(t, n, u, r), (c = t.memoizedState)),
              (s = to || Ts(t, n, s, r, f, c, l))
                ? (d ||
                    (typeof o.UNSAFE_componentWillMount != `function` &&
                      typeof o.componentWillMount != `function`) ||
                    (typeof o.componentWillMount == `function` && o.componentWillMount(),
                    typeof o.UNSAFE_componentWillMount == `function` &&
                      o.UNSAFE_componentWillMount()),
                  typeof o.componentDidMount == `function` && (t.flags |= 4194308))
                : (typeof o.componentDidMount == `function` && (t.flags |= 4194308),
                  (t.memoizedProps = r),
                  (t.memoizedState = c)),
              (o.props = r),
              (o.state = c),
              (o.context = l),
              (r = s))
            : (typeof o.componentDidMount == `function` && (t.flags |= 4194308), (r = !1)));
      } else {
        ((o = t.stateNode),
          ro(e, t),
          (s = t.memoizedProps),
          (l = t.type === t.elementType ? s : Ss(t.type, s)),
          (o.props = l),
          (d = t.pendingProps),
          (f = o.context),
          (c = n.contextType),
          typeof c == `object` && c
            ? (c = Xa(c))
            : ((c = Zi(n) ? Yi : qi.current), (c = Xi(t, c))));
        var p = n.getDerivedStateFromProps;
        ((u = typeof p == `function` || typeof o.getSnapshotBeforeUpdate == `function`) ||
          (typeof o.UNSAFE_componentWillReceiveProps != `function` &&
            typeof o.componentWillReceiveProps != `function`) ||
          ((s !== d || f !== c) && Ds(t, o, r, c)),
          (to = !1),
          (f = t.memoizedState),
          (o.state = f),
          co(t, r, o, i));
        var m = t.memoizedState;
        s !== d || f !== m || Ji.current || to
          ? (typeof p == `function` && (Cs(t, n, p, r), (m = t.memoizedState)),
            (l = to || Ts(t, n, l, r, f, m, c) || !1)
              ? (u ||
                  (typeof o.UNSAFE_componentWillUpdate != `function` &&
                    typeof o.componentWillUpdate != `function`) ||
                  (typeof o.componentWillUpdate == `function` && o.componentWillUpdate(r, m, c),
                  typeof o.UNSAFE_componentWillUpdate == `function` &&
                    o.UNSAFE_componentWillUpdate(r, m, c)),
                typeof o.componentDidUpdate == `function` && (t.flags |= 4),
                typeof o.getSnapshotBeforeUpdate == `function` && (t.flags |= 1024))
              : (typeof o.componentDidUpdate != `function` ||
                  (s === e.memoizedProps && f === e.memoizedState) ||
                  (t.flags |= 4),
                typeof o.getSnapshotBeforeUpdate != `function` ||
                  (s === e.memoizedProps && f === e.memoizedState) ||
                  (t.flags |= 1024),
                (t.memoizedProps = r),
                (t.memoizedState = m)),
            (o.props = r),
            (o.state = m),
            (o.context = c),
            (r = l))
          : (typeof o.componentDidUpdate != `function` ||
              (s === e.memoizedProps && f === e.memoizedState) ||
              (t.flags |= 4),
            typeof o.getSnapshotBeforeUpdate != `function` ||
              (s === e.memoizedProps && f === e.memoizedState) ||
              (t.flags |= 1024),
            (r = !1));
      }
      return Js(e, t, n, r, a, i);
    }
    function Js(e, t, n, r, i, a) {
      Gs(e, t);
      var o = !!(t.flags & 128);
      if (!r && !o) return (i && na(t, n, !1), sc(e, t, a));
      ((r = t.stateNode), (Rs.current = t));
      var s = o && typeof n.getDerivedStateFromError != `function` ? null : r.render();
      return (
        (t.flags |= 1),
        e !== null && o
          ? ((t.child = Ba(t, e.child, null, a)), (t.child = Ba(t, null, s, a)))
          : Bs(e, t, s, a),
        (t.memoizedState = r.state),
        i && na(t, n, !0),
        t.child
      );
    }
    function Ys(e) {
      var t = e.stateNode;
      (t.pendingContext
        ? $i(e, t.pendingContext, t.pendingContext !== t.context)
        : t.context && $i(e, t.context, !1),
        go(e, t.containerInfo));
    }
    function Xs(e, t, n, r, i) {
      return (Na(), Pa(i), (t.flags |= 256), Bs(e, t, n, r), t.child);
    }
    var Zs = {
      dehydrated: null,
      treeContext: null,
      retryLane: 0,
    };
    function Qs(e) {
      return {
        baseLanes: e,
        cachePool: null,
        transitions: null,
      };
    }
    function $s(e, t, n) {
      var r = t.pendingProps,
        i = bo.current,
        a = !1,
        o = !!(t.flags & 128),
        s;
      if (
        ((s = o) || (s = e !== null && e.memoizedState === null ? !1 : !!(i & 2)),
        s ? ((a = !0), (t.flags &= -129)) : (e === null || e.memoizedState !== null) && (i |= 1),
        Gi(bo, i & 1),
        e === null)
      )
        return (
          ka(t),
          (e = t.memoizedState),
          e !== null && ((e = e.dehydrated), e !== null)
            ? ((t.lanes = t.mode & 1 ? (e.data === `$!` ? 8 : 1073741824) : 1), null)
            : ((o = r.children),
              (e = r.fallback),
              a
                ? ((r = t.mode),
                  (a = t.child),
                  (o = {
                    mode: `hidden`,
                    children: o,
                  }),
                  !(r & 1) && a !== null
                    ? ((a.childLanes = 0), (a.pendingProps = o))
                    : (a = ou(o, r, 0, null)),
                  (e = au(e, r, n, null)),
                  (a.return = t),
                  (e.return = t),
                  (a.sibling = e),
                  (t.child = a),
                  (t.child.memoizedState = Qs(n)),
                  (t.memoizedState = Zs),
                  e)
                : ec(t, o))
        );
      if (((i = e.memoizedState), i !== null && ((s = i.dehydrated), s !== null)))
        return nc(e, t, o, r, s, i, n);
      if (a) {
        ((a = r.fallback), (o = t.mode), (i = e.child), (s = i.sibling));
        var c = {
          mode: `hidden`,
          children: r.children,
        };
        return (
          !(o & 1) && t.child !== i
            ? ((r = t.child), (r.childLanes = 0), (r.pendingProps = c), (t.deletions = null))
            : ((r = ru(i, c)), (r.subtreeFlags = i.subtreeFlags & 14680064)),
          s === null ? ((a = au(a, o, n, null)), (a.flags |= 2)) : (a = ru(s, a)),
          (a.return = t),
          (r.return = t),
          (r.sibling = a),
          (t.child = r),
          (r = a),
          (a = t.child),
          (o = e.child.memoizedState),
          (o =
            o === null
              ? Qs(n)
              : {
                  baseLanes: o.baseLanes | n,
                  cachePool: null,
                  transitions: o.transitions,
                }),
          (a.memoizedState = o),
          (a.childLanes = e.childLanes & ~n),
          (t.memoizedState = Zs),
          r
        );
      }
      return (
        (a = e.child),
        (e = a.sibling),
        (r = ru(a, {
          mode: `visible`,
          children: r.children,
        })),
        !(t.mode & 1) && (r.lanes = n),
        (r.return = t),
        (r.sibling = null),
        e !== null &&
          ((n = t.deletions), n === null ? ((t.deletions = [e]), (t.flags |= 16)) : n.push(e)),
        (t.child = r),
        (t.memoizedState = null),
        r
      );
    }
    function ec(e, t) {
      return (
        (t = ou(
          {
            mode: `visible`,
            children: t,
          },
          e.mode,
          0,
          null,
        )),
        (t.return = e),
        (e.child = t)
      );
    }
    function tc(e, t, n, r) {
      return (
        r !== null && Pa(r),
        Ba(t, e.child, null, n),
        (e = ec(t, t.pendingProps.children)),
        (e.flags |= 2),
        (t.memoizedState = null),
        e
      );
    }
    function nc(e, t, n, i, a, o, s) {
      if (n)
        return t.flags & 256
          ? ((t.flags &= -257), (i = As(Error(r(422)))), tc(e, t, s, i))
          : t.memoizedState === null
            ? ((o = i.fallback),
              (a = t.mode),
              (i = ou(
                {
                  mode: `visible`,
                  children: i.children,
                },
                a,
                0,
                null,
              )),
              (o = au(o, a, s, null)),
              (o.flags |= 2),
              (i.return = t),
              (o.return = t),
              (i.sibling = o),
              (t.child = i),
              t.mode & 1 && Ba(t, e.child, null, s),
              (t.child.memoizedState = Qs(s)),
              (t.memoizedState = Zs),
              o)
            : ((t.child = e.child), (t.flags |= 128), null);
      if (!(t.mode & 1)) return tc(e, t, s, null);
      if (a.data === `$!`) {
        if (((i = a.nextSibling && a.nextSibling.dataset), i)) var c = i.dgst;
        return ((i = c), (o = Error(r(419))), (i = As(o, i, void 0)), tc(e, t, s, i));
      }
      if (((c = (s & e.childLanes) !== 0), zs || c)) {
        if (((i = Yc), i !== null)) {
          switch (s & -s) {
            case 4:
              a = 2;
              break;
            case 16:
              a = 8;
              break;
            case 64:
            case 128:
            case 256:
            case 512:
            case 1024:
            case 2048:
            case 4096:
            case 8192:
            case 16384:
            case 32768:
            case 65536:
            case 131072:
            case 262144:
            case 524288:
            case 1048576:
            case 2097152:
            case 4194304:
            case 8388608:
            case 16777216:
            case 33554432:
            case 67108864:
              a = 32;
              break;
            case 536870912:
              a = 268435456;
              break;
            default:
              a = 0;
          }
          ((a = (a & (i.suspendedLanes | s)) === 0 ? a : 0),
            a !== 0 && a !== o.retryLane && ((o.retryLane = a), eo(e, a), Sl(i, e, a, -1)));
        }
        return (Il(), (i = As(Error(r(421)))), tc(e, t, s, i));
      }
      return a.data === `$?`
        ? ((t.flags |= 128), (t.child = e.child), (t = Yl.bind(null, e)), (a._reactRetry = t), null)
        : ((e = o.treeContext),
          (Ca = Oi(a.nextSibling)),
          (Sa = t),
          (wa = !0),
          (Ta = null),
          e !== null &&
            ((pa[ma++] = ga),
            (pa[ma++] = _a),
            (pa[ma++] = ha),
            (ga = e.id),
            (_a = e.overflow),
            (ha = t)),
          (t = ec(t, i.children)),
          (t.flags |= 4096),
          t);
    }
    function rc(e, t, n) {
      e.lanes |= t;
      var r = e.alternate;
      (r !== null && (r.lanes |= t), Ja(e.return, t, n));
    }
    function ic(e, t, n, r, i) {
      var a = e.memoizedState;
      a === null
        ? (e.memoizedState = {
            isBackwards: t,
            rendering: null,
            renderingStartTime: 0,
            last: r,
            tail: n,
            tailMode: i,
          })
        : ((a.isBackwards = t),
          (a.rendering = null),
          (a.renderingStartTime = 0),
          (a.last = r),
          (a.tail = n),
          (a.tailMode = i));
    }
    function ac(e, t, n) {
      var r = t.pendingProps,
        i = r.revealOrder,
        a = r.tail;
      if ((Bs(e, t, r.children, n), (r = bo.current), r & 2)) ((r = (r & 1) | 2), (t.flags |= 128));
      else {
        if (e !== null && e.flags & 128)
          a: for (e = t.child; e !== null;) {
            if (e.tag === 13) e.memoizedState !== null && rc(e, n, t);
            else if (e.tag === 19) rc(e, n, t);
            else if (e.child !== null) {
              ((e.child.return = e), (e = e.child));
              continue;
            }
            if (e === t) break a;
            for (; e.sibling === null;) {
              if (e.return === null || e.return === t) break a;
              e = e.return;
            }
            ((e.sibling.return = e.return), (e = e.sibling));
          }
        r &= 1;
      }
      if ((Gi(bo, r), !(t.mode & 1))) t.memoizedState = null;
      else
        switch (i) {
          case `forwards`:
            for (n = t.child, i = null; n !== null;)
              ((e = n.alternate), e !== null && xo(e) === null && (i = n), (n = n.sibling));
            ((n = i),
              n === null
                ? ((i = t.child), (t.child = null))
                : ((i = n.sibling), (n.sibling = null)),
              ic(t, !1, i, n, a));
            break;
          case `backwards`:
            for (n = null, i = t.child, t.child = null; i !== null;) {
              if (((e = i.alternate), e !== null && xo(e) === null)) {
                t.child = i;
                break;
              }
              ((e = i.sibling), (i.sibling = n), (n = i), (i = e));
            }
            ic(t, !0, n, null, a);
            break;
          case `together`:
            ic(t, !1, null, null, void 0);
            break;
          default:
            t.memoizedState = null;
        }
      return t.child;
    }
    function oc(e, t) {
      !(t.mode & 1) && e !== null && ((e.alternate = null), (t.alternate = null), (t.flags |= 2));
    }
    function sc(e, t, n) {
      if (
        (e !== null && (t.dependencies = e.dependencies), (nl |= t.lanes), (n & t.childLanes) === 0)
      )
        return null;
      if (e !== null && t.child !== e.child) throw Error(r(153));
      if (t.child !== null) {
        for (e = t.child, n = ru(e, e.pendingProps), t.child = n, n.return = t; e.sibling !== null;)
          ((e = e.sibling), (n = n.sibling = ru(e, e.pendingProps)), (n.return = t));
        n.sibling = null;
      }
      return t.child;
    }
    function cc(e, t, n) {
      switch (t.tag) {
        case 3:
          (Ys(t), Na());
          break;
        case 5:
          vo(t);
          break;
        case 1:
          Zi(t.type) && ta(t);
          break;
        case 4:
          go(t, t.stateNode.containerInfo);
          break;
        case 10:
          var r = t.type._context,
            i = t.memoizedProps.value;
          (Gi(Ha, r._currentValue), (r._currentValue = i));
          break;
        case 13:
          if (((r = t.memoizedState), r !== null))
            return r.dehydrated === null
              ? (n & t.child.childLanes) === 0
                ? (Gi(bo, bo.current & 1), (e = sc(e, t, n)), e === null ? null : e.sibling)
                : $s(e, t, n)
              : (Gi(bo, bo.current & 1), (t.flags |= 128), null);
          Gi(bo, bo.current & 1);
          break;
        case 19:
          if (((r = (n & t.childLanes) !== 0), e.flags & 128)) {
            if (r) return ac(e, t, n);
            t.flags |= 128;
          }
          if (
            ((i = t.memoizedState),
            i !== null && ((i.rendering = null), (i.tail = null), (i.lastEffect = null)),
            Gi(bo, bo.current),
            r)
          )
            break;
          return null;
        case 22:
        case 23:
          return ((t.lanes = 0), Ws(e, t, n));
      }
      return sc(e, t, n);
    }
    var lc = function (e, t) {
        for (var n = t.child; n !== null;) {
          if (n.tag === 5 || n.tag === 6) e.appendChild(n.stateNode);
          else if (n.tag !== 4 && n.child !== null) {
            ((n.child.return = n), (n = n.child));
            continue;
          }
          if (n === t) break;
          for (; n.sibling === null;) {
            if (n.return === null || n.return === t) return;
            n = n.return;
          }
          ((n.sibling.return = n.return), (n = n.sibling));
        }
      },
      uc = function (e, t, n, r) {
        var i = e.memoizedProps;
        if (i !== r) {
          ((e = t.stateNode), ho(fo.current));
          var o = null;
          switch (n) {
            case `input`:
              ((i = me(e, i)), (r = me(e, r)), (o = []));
              break;
            case `select`:
              ((i = L({}, i, {
                value: void 0,
              })),
                (r = L({}, r, {
                  value: void 0,
                })),
                (o = []));
              break;
            case `textarea`:
              ((i = be(e, i)), (r = be(e, r)), (o = []));
              break;
            default:
              typeof i.onClick != `function` && typeof r.onClick == `function` && (e.onclick = vi);
          }
          je(n, r);
          var s;
          for (u in ((n = null), i))
            if (!r.hasOwnProperty(u) && i.hasOwnProperty(u) && i[u] != null) {
              if (u === `style`) {
                var c = i[u];
                for (s in c) c.hasOwnProperty(s) && ((n ||= {}), (n[s] = ``));
              } else
                u !== `dangerouslySetInnerHTML` &&
                  u !== `children` &&
                  u !== `suppressContentEditableWarning` &&
                  u !== `suppressHydrationWarning` &&
                  u !== `autoFocus` &&
                  (a.hasOwnProperty(u) ? (o ||= []) : (o ||= []).push(u, null));
            }
          for (u in r) {
            var l = r[u];
            if (((c = i?.[u]), r.hasOwnProperty(u) && l !== c && (l != null || c != null))) {
              if (u === `style`) {
                if (c) {
                  for (s in c)
                    !c.hasOwnProperty(s) || (l && l.hasOwnProperty(s)) || ((n ||= {}), (n[s] = ``));
                  for (s in l) l.hasOwnProperty(s) && c[s] !== l[s] && ((n ||= {}), (n[s] = l[s]));
                } else (n || ((o ||= []), o.push(u, n)), (n = l));
              } else
                u === `dangerouslySetInnerHTML`
                  ? ((l = l ? l.__html : void 0),
                    (c = c ? c.__html : void 0),
                    l != null && c !== l && (o ||= []).push(u, l))
                  : u === `children`
                    ? (typeof l != `string` && typeof l != `number`) || (o ||= []).push(u, `` + l)
                    : u !== `suppressContentEditableWarning` &&
                      u !== `suppressHydrationWarning` &&
                      (a.hasOwnProperty(u)
                        ? (l != null && u === `onScroll` && ii(`scroll`, e),
                          o || c === l || (o = []))
                        : (o ||= []).push(u, l));
            }
          }
          n && (o ||= []).push(`style`, n);
          var u = o;
          (t.updateQueue = u) && (t.flags |= 4);
        }
      },
      dc = function (e, t, n, r) {
        n !== r && (t.flags |= 4);
      };
    function fc(e, t) {
      if (!wa)
        switch (e.tailMode) {
          case `hidden`:
            t = e.tail;
            for (var n = null; t !== null;) (t.alternate !== null && (n = t), (t = t.sibling));
            n === null ? (e.tail = null) : (n.sibling = null);
            break;
          case `collapsed`:
            n = e.tail;
            for (var r = null; n !== null;) (n.alternate !== null && (r = n), (n = n.sibling));
            r === null
              ? t || e.tail === null
                ? (e.tail = null)
                : (e.tail.sibling = null)
              : (r.sibling = null);
        }
    }
    function pc(e) {
      var t = e.alternate !== null && e.alternate.child === e.child,
        n = 0,
        r = 0;
      if (t)
        for (var i = e.child; i !== null;)
          ((n |= i.lanes | i.childLanes),
            (r |= i.subtreeFlags & 14680064),
            (r |= i.flags & 14680064),
            (i.return = e),
            (i = i.sibling));
      else
        for (i = e.child; i !== null;)
          ((n |= i.lanes | i.childLanes),
            (r |= i.subtreeFlags),
            (r |= i.flags),
            (i.return = e),
            (i = i.sibling));
      return ((e.subtreeFlags |= r), (e.childLanes = n), t);
    }
    function mc(e, t, n) {
      var i = t.pendingProps;
      switch ((xa(t), t.tag)) {
        case 2:
        case 16:
        case 15:
        case 0:
        case 11:
        case 7:
        case 8:
        case 12:
        case 9:
        case 14:
          return (pc(t), null);
        case 1:
          return (Zi(t.type) && Qi(), pc(t), null);
        case 3:
          return (
            (i = t.stateNode),
            _o(),
            Wi(Ji),
            Wi(qi),
            Co(),
            i.pendingContext && ((i.context = i.pendingContext), (i.pendingContext = null)),
            (e === null || e.child === null) &&
              (ja(t)
                ? (t.flags |= 4)
                : e === null ||
                  (e.memoizedState.isDehydrated && !(t.flags & 256)) ||
                  ((t.flags |= 1024), Ta !== null && (El(Ta), (Ta = null)))),
            pc(t),
            null
          );
        case 5:
          yo(t);
          var o = ho(mo.current);
          if (((n = t.type), e !== null && t.stateNode != null))
            (uc(e, t, n, i, o), e.ref !== t.ref && ((t.flags |= 512), (t.flags |= 2097152)));
          else {
            if (!i) {
              if (t.stateNode === null) throw Error(r(166));
              return (pc(t), null);
            }
            if (((e = ho(fo.current)), ja(t))) {
              ((i = t.stateNode), (n = t.type));
              var s = t.memoizedProps;
              switch (((i[ji] = t), (i[Mi] = s), (e = !!(t.mode & 1)), n)) {
                case `dialog`:
                  (ii(`cancel`, i), ii(`close`, i));
                  break;
                case `iframe`:
                case `object`:
                case `embed`:
                  ii(`load`, i);
                  break;
                case `video`:
                case `audio`:
                  for (o = 0; o < ei.length; o++) ii(ei[o], i);
                  break;
                case `source`:
                  ii(`error`, i);
                  break;
                case `img`:
                case `image`:
                case `link`:
                  (ii(`error`, i), ii(`load`, i));
                  break;
                case `details`:
                  ii(`toggle`, i);
                  break;
                case `input`:
                  (he(i, s), ii(`invalid`, i));
                  break;
                case `select`:
                  ((i._wrapperState = {
                    wasMultiple: !!s.multiple,
                  }),
                    ii(`invalid`, i));
                  break;
                case `textarea`:
                  (V(i, s), ii(`invalid`, i));
              }
              for (var c in (je(n, s), (o = null), s))
                if (s.hasOwnProperty(c)) {
                  var l = s[c];
                  c === `children`
                    ? typeof l == `string`
                      ? i.textContent !== l &&
                        (!0 !== s.suppressHydrationWarning && _i(i.textContent, l, e),
                        (o = [`children`, l]))
                      : typeof l == `number` &&
                        i.textContent !== `` + l &&
                        (!0 !== s.suppressHydrationWarning && _i(i.textContent, l, e),
                        (o = [`children`, `` + l]))
                    : a.hasOwnProperty(c) && l != null && c === `onScroll` && ii(`scroll`, i);
                }
              switch (n) {
                case `input`:
                  (fe(i), ve(i, s, !0));
                  break;
                case `textarea`:
                  (fe(i), H(i));
                  break;
                case `select`:
                case `option`:
                  break;
                default:
                  typeof s.onClick == `function` && (i.onclick = vi);
              }
              ((i = o), (t.updateQueue = i), i !== null && (t.flags |= 4));
            } else {
              ((c = o.nodeType === 9 ? o : o.ownerDocument),
                e === `http://www.w3.org/1999/xhtml` && (e = U(n)),
                e === `http://www.w3.org/1999/xhtml`
                  ? n === `script`
                    ? ((e = c.createElement(`div`)),
                      (e.innerHTML = `<script><\/script>`),
                      (e = e.removeChild(e.firstChild)))
                    : typeof i.is == `string`
                      ? (e = c.createElement(n, {
                          is: i.is,
                        }))
                      : ((e = c.createElement(n)),
                        n === `select` &&
                          ((c = e), i.multiple ? (c.multiple = !0) : i.size && (c.size = i.size)))
                  : (e = c.createElementNS(e, n)),
                (e[ji] = t),
                (e[Mi] = i),
                lc(e, t, !1, !1),
                (t.stateNode = e));
              a: {
                switch (((c = Me(n, i)), n)) {
                  case `dialog`:
                    (ii(`cancel`, e), ii(`close`, e), (o = i));
                    break;
                  case `iframe`:
                  case `object`:
                  case `embed`:
                    (ii(`load`, e), (o = i));
                    break;
                  case `video`:
                  case `audio`:
                    for (o = 0; o < ei.length; o++) ii(ei[o], e);
                    o = i;
                    break;
                  case `source`:
                    (ii(`error`, e), (o = i));
                    break;
                  case `img`:
                  case `image`:
                  case `link`:
                    (ii(`error`, e), ii(`load`, e), (o = i));
                    break;
                  case `details`:
                    (ii(`toggle`, e), (o = i));
                    break;
                  case `input`:
                    (he(e, i), (o = me(e, i)), ii(`invalid`, e));
                    break;
                  case `option`:
                    o = i;
                    break;
                  case `select`:
                    ((e._wrapperState = {
                      wasMultiple: !!i.multiple,
                    }),
                      (o = L({}, i, {
                        value: void 0,
                      })),
                      ii(`invalid`, e));
                    break;
                  case `textarea`:
                    (V(e, i), (o = be(e, i)), ii(`invalid`, e));
                    break;
                  default:
                    o = i;
                }
                for (s in (je(n, o), (l = o), l))
                  if (l.hasOwnProperty(s)) {
                    var u = l[s];
                    s === `style`
                      ? ke(e, u)
                      : s === `dangerouslySetInnerHTML`
                        ? ((u = u ? u.__html : void 0), u != null && we(e, u))
                        : s === `children`
                          ? typeof u == `string`
                            ? (n !== `textarea` || u !== ``) && Te(e, u)
                            : typeof u == `number` && Te(e, `` + u)
                          : s !== `suppressContentEditableWarning` &&
                            s !== `suppressHydrationWarning` &&
                            s !== `autoFocus` &&
                            (a.hasOwnProperty(s)
                              ? u != null && s === `onScroll` && ii(`scroll`, e)
                              : u != null && S(e, s, u, c));
                  }
                switch (n) {
                  case `input`:
                    (fe(e), ve(e, i, !1));
                    break;
                  case `textarea`:
                    (fe(e), H(e));
                    break;
                  case `option`:
                    i.value != null && e.setAttribute(`value`, `` + le(i.value));
                    break;
                  case `select`:
                    ((e.multiple = !!i.multiple),
                      (s = i.value),
                      s == null
                        ? i.defaultValue != null && B(e, !!i.multiple, i.defaultValue, !0)
                        : B(e, !!i.multiple, s, !1));
                    break;
                  default:
                    typeof o.onClick == `function` && (e.onclick = vi);
                }
                switch (n) {
                  case `button`:
                  case `input`:
                  case `select`:
                  case `textarea`:
                    i = !!i.autoFocus;
                    break a;
                  case `img`:
                    i = !0;
                    break a;
                  default:
                    i = !1;
                }
              }
              i && (t.flags |= 4);
            }
            t.ref !== null && ((t.flags |= 512), (t.flags |= 2097152));
          }
          return (pc(t), null);
        case 6:
          if (e && t.stateNode != null) dc(e, t, e.memoizedProps, i);
          else {
            if (typeof i != `string` && t.stateNode === null) throw Error(r(166));
            if (((n = ho(mo.current)), ho(fo.current), ja(t))) {
              if (
                ((i = t.stateNode),
                (n = t.memoizedProps),
                (i[ji] = t),
                (s = i.nodeValue !== n) && ((e = Sa), e !== null))
              )
                switch (e.tag) {
                  case 3:
                    _i(i.nodeValue, n, !!(e.mode & 1));
                    break;
                  case 5:
                    !0 !== e.memoizedProps.suppressHydrationWarning &&
                      _i(i.nodeValue, n, !!(e.mode & 1));
                }
              s && (t.flags |= 4);
            } else
              ((i = (n.nodeType === 9 ? n : n.ownerDocument).createTextNode(i)),
                (i[ji] = t),
                (t.stateNode = i));
          }
          return (pc(t), null);
        case 13:
          if (
            (Wi(bo),
            (i = t.memoizedState),
            e === null || (e.memoizedState !== null && e.memoizedState.dehydrated !== null))
          ) {
            if (wa && Ca !== null && t.mode & 1 && !(t.flags & 128))
              (Ma(), Na(), (t.flags |= 98560), (s = !1));
            else if (((s = ja(t)), i !== null && i.dehydrated !== null)) {
              if (e === null) {
                if (!s) throw Error(r(318));
                if (((s = t.memoizedState), (s = s === null ? null : s.dehydrated), !s))
                  throw Error(r(317));
                s[ji] = t;
              } else (Na(), !(t.flags & 128) && (t.memoizedState = null), (t.flags |= 4));
              (pc(t), (s = !1));
            } else (Ta !== null && (El(Ta), (Ta = null)), (s = !0));
            if (!s) return t.flags & 65536 ? t : null;
          }
          return t.flags & 128
            ? ((t.lanes = n), t)
            : ((i = i !== null),
              i !== (e !== null && e.memoizedState !== null) &&
                i &&
                ((t.child.flags |= 8192),
                t.mode & 1 && (e === null || bo.current & 1 ? el === 0 && (el = 3) : Il())),
              t.updateQueue !== null && (t.flags |= 4),
              pc(t),
              null);
        case 4:
          return (_o(), e === null && si(t.stateNode.containerInfo), pc(t), null);
        case 10:
          return (qa(t.type._context), pc(t), null);
        case 17:
          return (Zi(t.type) && Qi(), pc(t), null);
        case 19:
          if ((Wi(bo), (s = t.memoizedState), s === null)) return (pc(t), null);
          if (((i = !!(t.flags & 128)), (c = s.rendering), c === null)) {
            if (i) fc(s, !1);
            else {
              if (el !== 0 || (e !== null && e.flags & 128))
                for (e = t.child; e !== null;) {
                  if (((c = xo(e)), c !== null)) {
                    for (
                      t.flags |= 128,
                        fc(s, !1),
                        i = c.updateQueue,
                        i !== null && ((t.updateQueue = i), (t.flags |= 4)),
                        t.subtreeFlags = 0,
                        i = n,
                        n = t.child;
                      n !== null;
                    )
                      ((s = n),
                        (e = i),
                        (s.flags &= 14680066),
                        (c = s.alternate),
                        c === null
                          ? ((s.childLanes = 0),
                            (s.lanes = e),
                            (s.child = null),
                            (s.subtreeFlags = 0),
                            (s.memoizedProps = null),
                            (s.memoizedState = null),
                            (s.updateQueue = null),
                            (s.dependencies = null),
                            (s.stateNode = null))
                          : ((s.childLanes = c.childLanes),
                            (s.lanes = c.lanes),
                            (s.child = c.child),
                            (s.subtreeFlags = 0),
                            (s.deletions = null),
                            (s.memoizedProps = c.memoizedProps),
                            (s.memoizedState = c.memoizedState),
                            (s.updateQueue = c.updateQueue),
                            (s.type = c.type),
                            (e = c.dependencies),
                            (s.dependencies =
                              e === null
                                ? null
                                : {
                                    lanes: e.lanes,
                                    firstContext: e.firstContext,
                                  })),
                        (n = n.sibling));
                    return (Gi(bo, (bo.current & 1) | 2), t.child);
                  }
                  e = e.sibling;
                }
              s.tail !== null &&
                ft() > cl &&
                ((t.flags |= 128), (i = !0), fc(s, !1), (t.lanes = 4194304));
            }
          } else {
            if (!i) {
              if (((e = xo(c)), e !== null)) {
                if (
                  ((t.flags |= 128),
                  (i = !0),
                  (n = e.updateQueue),
                  n !== null && ((t.updateQueue = n), (t.flags |= 4)),
                  fc(s, !0),
                  s.tail === null && s.tailMode === `hidden` && !c.alternate && !wa)
                )
                  return (pc(t), null);
              } else
                2 * ft() - s.renderingStartTime > cl &&
                  n !== 1073741824 &&
                  ((t.flags |= 128), (i = !0), fc(s, !1), (t.lanes = 4194304));
            }
            s.isBackwards
              ? ((c.sibling = t.child), (t.child = c))
              : ((n = s.last), n === null ? (t.child = c) : (n.sibling = c), (s.last = c));
          }
          return s.tail === null
            ? (pc(t), null)
            : ((t = s.tail),
              (s.rendering = t),
              (s.tail = t.sibling),
              (s.renderingStartTime = ft()),
              (t.sibling = null),
              (n = bo.current),
              Gi(bo, i ? (n & 1) | 2 : n & 1),
              t);
        case 22:
        case 23:
          return (
            Ml(),
            (i = t.memoizedState !== null),
            e !== null && (e.memoizedState !== null) !== i && (t.flags |= 8192),
            i && t.mode & 1
              ? Qc & 1073741824 && (pc(t), t.subtreeFlags & 6 && (t.flags |= 8192))
              : pc(t),
            null
          );
        case 24:
          return null;
        case 25:
          return null;
      }
      throw Error(r(156, t.tag));
    }
    function hc(e, t) {
      switch ((xa(t), t.tag)) {
        case 1:
          return (
            Zi(t.type) && Qi(),
            (e = t.flags),
            e & 65536 ? ((t.flags = (e & -65537) | 128), t) : null
          );
        case 3:
          return (
            _o(),
            Wi(Ji),
            Wi(qi),
            Co(),
            (e = t.flags),
            e & 65536 && !(e & 128) ? ((t.flags = (e & -65537) | 128), t) : null
          );
        case 5:
          return (yo(t), null);
        case 13:
          if ((Wi(bo), (e = t.memoizedState), e !== null && e.dehydrated !== null)) {
            if (t.alternate === null) throw Error(r(340));
            Na();
          }
          return ((e = t.flags), e & 65536 ? ((t.flags = (e & -65537) | 128), t) : null);
        case 19:
          return (Wi(bo), null);
        case 4:
          return (_o(), null);
        case 10:
          return (qa(t.type._context), null);
        case 22:
        case 23:
          return (Ml(), null);
        case 24:
          return null;
        default:
          return null;
      }
    }
    var gc = !1,
      _c = !1,
      vc = typeof WeakSet == `function` ? WeakSet : Set,
      G = null;
    function yc(e, t) {
      var n = e.ref;
      if (n !== null) {
        if (typeof n == `function`)
          try {
            n(null);
          } catch (n) {
            Kl(e, t, n);
          }
        else n.current = null;
      }
    }
    function bc(e, t, n) {
      try {
        n();
      } catch (n) {
        Kl(e, t, n);
      }
    }
    var xc = !1;
    function Sc(e, t) {
      if (((yi = dn), (e = jr()), Mr(e))) {
        if (`selectionStart` in e)
          var n = {
            start: e.selectionStart,
            end: e.selectionEnd,
          };
        else
          a: {
            n = ((n = e.ownerDocument) && n.defaultView) || window;
            var i = n.getSelection && n.getSelection();
            if (i && i.rangeCount !== 0) {
              n = i.anchorNode;
              var a = i.anchorOffset,
                o = i.focusNode;
              i = i.focusOffset;
              try {
                (n.nodeType, o.nodeType);
              } catch {
                n = null;
                break a;
              }
              var s = 0,
                c = -1,
                l = -1,
                u = 0,
                d = 0,
                f = e,
                p = null;
              b: for (;;) {
                for (
                  var m;
                  f !== n || (a !== 0 && f.nodeType !== 3) || (c = s + a),
                    f !== o || (i !== 0 && f.nodeType !== 3) || (l = s + i),
                    f.nodeType === 3 && (s += f.nodeValue.length),
                    (m = f.firstChild) !== null;
                )
                  ((p = f), (f = m));
                for (;;) {
                  if (f === e) break b;
                  if (
                    (p === n && ++u === a && (c = s),
                    p === o && ++d === i && (l = s),
                    (m = f.nextSibling) !== null)
                  )
                    break;
                  ((f = p), (p = f.parentNode));
                }
                f = m;
              }
              n =
                c === -1 || l === -1
                  ? null
                  : {
                      start: c,
                      end: l,
                    };
            } else n = null;
          }
        n ||= {
          start: 0,
          end: 0,
        };
      } else n = null;
      for (
        bi = {
          focusedElem: e,
          selectionRange: n,
        },
          dn = !1,
          G = t;
        G !== null;
      )
        if (((t = G), (e = t.child), t.subtreeFlags & 1028 && e !== null))
          ((e.return = t), (G = e));
        else
          for (; G !== null;) {
            t = G;
            try {
              var h = t.alternate;
              if (t.flags & 1024)
                switch (t.tag) {
                  case 0:
                  case 11:
                  case 15:
                    break;
                  case 1:
                    if (h !== null) {
                      var g = h.memoizedProps,
                        _ = h.memoizedState,
                        v = t.stateNode;
                      v.__reactInternalSnapshotBeforeUpdate = v.getSnapshotBeforeUpdate(
                        t.elementType === t.type ? g : Ss(t.type, g),
                        _,
                      );
                    }
                    break;
                  case 3:
                    var y = t.stateNode.containerInfo;
                    y.nodeType === 1
                      ? (y.textContent = ``)
                      : y.nodeType === 9 && y.documentElement && y.removeChild(y.documentElement);
                    break;
                  case 5:
                  case 6:
                  case 4:
                  case 17:
                    break;
                  default:
                    throw Error(r(163));
                }
            } catch (e) {
              Kl(t, t.return, e);
            }
            if (((e = t.sibling), e !== null)) {
              ((e.return = t.return), (G = e));
              break;
            }
            G = t.return;
          }
      return ((h = xc), (xc = !1), h);
    }
    function Cc(e, t, n) {
      var r = t.updateQueue;
      if (((r = r === null ? null : r.lastEffect), r !== null)) {
        var i = (r = r.next);
        do {
          if ((i.tag & e) === e) {
            var a = i.destroy;
            ((i.destroy = void 0), a !== void 0 && bc(t, n, a));
          }
          i = i.next;
        } while (i !== r);
      }
    }
    function wc(e, t) {
      if (((t = t.updateQueue), (t = t === null ? null : t.lastEffect), t !== null)) {
        var n = (t = t.next);
        do {
          if ((n.tag & e) === e) {
            var r = n.create;
            n.destroy = r();
          }
          n = n.next;
        } while (n !== t);
      }
    }
    function Tc(e) {
      var t = e.ref;
      if (t !== null) {
        var n = e.stateNode;
        switch (e.tag) {
          case 5:
            e = n;
            break;
          default:
            e = n;
        }
        typeof t == `function` ? t(e) : (t.current = e);
      }
    }
    function Ec(e) {
      var t = e.alternate;
      (t !== null && ((e.alternate = null), Ec(t)),
        (e.child = null),
        (e.deletions = null),
        (e.sibling = null),
        e.tag === 5 &&
          ((t = e.stateNode),
          t !== null && (delete t[ji], delete t[Mi], delete t[Pi], delete t[Fi], delete t[Ii])),
        (e.stateNode = null),
        (e.return = null),
        (e.dependencies = null),
        (e.memoizedProps = null),
        (e.memoizedState = null),
        (e.pendingProps = null),
        (e.stateNode = null),
        (e.updateQueue = null));
    }
    function Dc(e) {
      return e.tag === 5 || e.tag === 3 || e.tag === 4;
    }
    function Oc(e) {
      a: for (;;) {
        for (; e.sibling === null;) {
          if (e.return === null || Dc(e.return)) return null;
          e = e.return;
        }
        for (
          e.sibling.return = e.return, e = e.sibling;
          e.tag !== 5 && e.tag !== 6 && e.tag !== 18;
        ) {
          if (e.flags & 2 || e.child === null || e.tag === 4) continue a;
          ((e.child.return = e), (e = e.child));
        }
        if (!(e.flags & 2)) return e.stateNode;
      }
    }
    function kc(e, t, n) {
      var r = e.tag;
      if (r === 5 || r === 6)
        ((e = e.stateNode),
          t
            ? n.nodeType === 8
              ? n.parentNode.insertBefore(e, t)
              : n.insertBefore(e, t)
            : (n.nodeType === 8
                ? ((t = n.parentNode), t.insertBefore(e, n))
                : ((t = n), t.appendChild(e)),
              (n = n._reactRootContainer),
              n != null || t.onclick !== null || (t.onclick = vi)));
      else if (r !== 4 && ((e = e.child), e !== null))
        for (kc(e, t, n), e = e.sibling; e !== null;) (kc(e, t, n), (e = e.sibling));
    }
    function Ac(e, t, n) {
      var r = e.tag;
      if (r === 5 || r === 6) ((e = e.stateNode), t ? n.insertBefore(e, t) : n.appendChild(e));
      else if (r !== 4 && ((e = e.child), e !== null))
        for (Ac(e, t, n), e = e.sibling; e !== null;) (Ac(e, t, n), (e = e.sibling));
    }
    var jc = null,
      Mc = !1;
    function Nc(e, t, n) {
      for (n = n.child; n !== null;) (Pc(e, t, n), (n = n.sibling));
    }
    function Pc(e, t, n) {
      if (bt && typeof bt.onCommitFiberUnmount == `function`)
        try {
          bt.onCommitFiberUnmount(yt, n);
        } catch {}
      switch (n.tag) {
        case 5:
          _c || yc(n, t);
        case 6:
          var r = jc,
            i = Mc;
          ((jc = null),
            Nc(e, t, n),
            (jc = r),
            (Mc = i),
            jc !== null &&
              (Mc
                ? ((e = jc),
                  (n = n.stateNode),
                  e.nodeType === 8 ? e.parentNode.removeChild(n) : e.removeChild(n))
                : jc.removeChild(n.stateNode)));
          break;
        case 18:
          jc !== null &&
            (Mc
              ? ((e = jc),
                (n = n.stateNode),
                e.nodeType === 8 ? Di(e.parentNode, n) : e.nodeType === 1 && Di(e, n),
                ln(e))
              : Di(jc, n.stateNode));
          break;
        case 4:
          ((r = jc),
            (i = Mc),
            (jc = n.stateNode.containerInfo),
            (Mc = !0),
            Nc(e, t, n),
            (jc = r),
            (Mc = i));
          break;
        case 0:
        case 11:
        case 14:
        case 15:
          if (!_c && ((r = n.updateQueue), r !== null && ((r = r.lastEffect), r !== null))) {
            i = r = r.next;
            do {
              var a = i,
                o = a.destroy;
              ((a = a.tag), o !== void 0 && (a & 2 || a & 4) && bc(n, t, o), (i = i.next));
            } while (i !== r);
          }
          Nc(e, t, n);
          break;
        case 1:
          if (!_c && (yc(n, t), (r = n.stateNode), typeof r.componentWillUnmount == `function`))
            try {
              ((r.props = n.memoizedProps), (r.state = n.memoizedState), r.componentWillUnmount());
            } catch (e) {
              Kl(n, t, e);
            }
          Nc(e, t, n);
          break;
        case 21:
          Nc(e, t, n);
          break;
        case 22:
          n.mode & 1
            ? ((_c = (r = _c) || n.memoizedState !== null), Nc(e, t, n), (_c = r))
            : Nc(e, t, n);
          break;
        default:
          Nc(e, t, n);
      }
    }
    function Fc(e) {
      var t = e.updateQueue;
      if (t !== null) {
        e.updateQueue = null;
        var n = e.stateNode;
        (n === null && (n = e.stateNode = new vc()),
          t.forEach(function (t) {
            var r = Xl.bind(null, e, t);
            n.has(t) || (n.add(t), t.then(r, r));
          }));
      }
    }
    function Ic(e, t) {
      var n = t.deletions;
      if (n !== null)
        for (var i = 0; i < n.length; i++) {
          var a = n[i];
          try {
            var o = e,
              s = t,
              c = s;
            a: for (; c !== null;) {
              switch (c.tag) {
                case 5:
                  ((jc = c.stateNode), (Mc = !1));
                  break a;
                case 3:
                  ((jc = c.stateNode.containerInfo), (Mc = !0));
                  break a;
                case 4:
                  ((jc = c.stateNode.containerInfo), (Mc = !0));
                  break a;
              }
              c = c.return;
            }
            if (jc === null) throw Error(r(160));
            (Pc(o, s, a), (jc = null), (Mc = !1));
            var l = a.alternate;
            (l !== null && (l.return = null), (a.return = null));
          } catch (e) {
            Kl(a, t, e);
          }
        }
      if (t.subtreeFlags & 12854) for (t = t.child; t !== null;) (Lc(t, e), (t = t.sibling));
    }
    function Lc(e, t) {
      var n = e.alternate,
        i = e.flags;
      switch (e.tag) {
        case 0:
        case 11:
        case 14:
        case 15:
          if ((Ic(t, e), Rc(e), i & 4)) {
            try {
              (Cc(3, e, e.return), wc(3, e));
            } catch (t) {
              Kl(e, e.return, t);
            }
            try {
              Cc(5, e, e.return);
            } catch (t) {
              Kl(e, e.return, t);
            }
          }
          break;
        case 1:
          (Ic(t, e), Rc(e), i & 512 && n !== null && yc(n, n.return));
          break;
        case 5:
          if ((Ic(t, e), Rc(e), i & 512 && n !== null && yc(n, n.return), e.flags & 32)) {
            var a = e.stateNode;
            try {
              Te(a, ``);
            } catch (t) {
              Kl(e, e.return, t);
            }
          }
          if (i & 4 && ((a = e.stateNode), a != null)) {
            var o = e.memoizedProps,
              s = n === null ? o : n.memoizedProps,
              c = e.type,
              l = e.updateQueue;
            if (((e.updateQueue = null), l !== null))
              try {
                (c === `input` && o.type === `radio` && o.name != null && ge(a, o), Me(c, s));
                var u = Me(c, o);
                for (s = 0; s < l.length; s += 2) {
                  var d = l[s],
                    f = l[s + 1];
                  d === `style`
                    ? ke(a, f)
                    : d === `dangerouslySetInnerHTML`
                      ? we(a, f)
                      : d === `children`
                        ? Te(a, f)
                        : S(a, d, f, u);
                }
                switch (c) {
                  case `input`:
                    _e(a, o);
                    break;
                  case `textarea`:
                    xe(a, o);
                    break;
                  case `select`:
                    var p = a._wrapperState.wasMultiple;
                    a._wrapperState.wasMultiple = !!o.multiple;
                    var m = o.value;
                    m == null
                      ? p !== !!o.multiple &&
                        (o.defaultValue == null
                          ? B(a, !!o.multiple, o.multiple ? [] : ``, !1)
                          : B(a, !!o.multiple, o.defaultValue, !0))
                      : B(a, !!o.multiple, m, !1);
                }
                a[Mi] = o;
              } catch (t) {
                Kl(e, e.return, t);
              }
          }
          break;
        case 6:
          if ((Ic(t, e), Rc(e), i & 4)) {
            if (e.stateNode === null) throw Error(r(162));
            ((a = e.stateNode), (o = e.memoizedProps));
            try {
              a.nodeValue = o;
            } catch (t) {
              Kl(e, e.return, t);
            }
          }
          break;
        case 3:
          if ((Ic(t, e), Rc(e), i & 4 && n !== null && n.memoizedState.isDehydrated))
            try {
              ln(t.containerInfo);
            } catch (t) {
              Kl(e, e.return, t);
            }
          break;
        case 4:
          (Ic(t, e), Rc(e));
          break;
        case 13:
          (Ic(t, e),
            Rc(e),
            (a = e.child),
            a.flags & 8192 &&
              ((o = a.memoizedState !== null),
              (a.stateNode.isHidden = o),
              !o || (a.alternate !== null && a.alternate.memoizedState !== null) || (sl = ft())),
            i & 4 && Fc(e));
          break;
        case 22:
          if (
            ((d = n !== null && n.memoizedState !== null),
            e.mode & 1 ? ((_c = (u = _c) || d), Ic(t, e), (_c = u)) : Ic(t, e),
            Rc(e),
            i & 8192)
          ) {
            if (((u = e.memoizedState !== null), (e.stateNode.isHidden = u) && !d && e.mode & 1))
              for (G = e, d = e.child; d !== null;) {
                for (f = G = d; G !== null;) {
                  switch (((p = G), (m = p.child), p.tag)) {
                    case 0:
                    case 11:
                    case 14:
                    case 15:
                      Cc(4, p, p.return);
                      break;
                    case 1:
                      yc(p, p.return);
                      var h = p.stateNode;
                      if (typeof h.componentWillUnmount == `function`) {
                        ((i = p), (n = p.return));
                        try {
                          ((t = i),
                            (h.props = t.memoizedProps),
                            (h.state = t.memoizedState),
                            h.componentWillUnmount());
                        } catch (e) {
                          Kl(i, n, e);
                        }
                      }
                      break;
                    case 5:
                      yc(p, p.return);
                      break;
                    case 22:
                      if (p.memoizedState !== null) {
                        Hc(f);
                        continue;
                      }
                  }
                  m === null ? Hc(f) : ((m.return = p), (G = m));
                }
                d = d.sibling;
              }
            a: for (d = null, f = e; ;) {
              if (f.tag === 5) {
                if (d === null) {
                  d = f;
                  try {
                    ((a = f.stateNode),
                      u
                        ? ((o = a.style),
                          typeof o.setProperty == `function`
                            ? o.setProperty(`display`, `none`, `important`)
                            : (o.display = `none`))
                        : ((c = f.stateNode),
                          (l = f.memoizedProps.style),
                          (s = l != null && l.hasOwnProperty(`display`) ? l.display : null),
                          (c.style.display = Oe(`display`, s))));
                  } catch (t) {
                    Kl(e, e.return, t);
                  }
                }
              } else if (f.tag === 6) {
                if (d === null)
                  try {
                    f.stateNode.nodeValue = u ? `` : f.memoizedProps;
                  } catch (t) {
                    Kl(e, e.return, t);
                  }
              } else if (
                ((f.tag !== 22 && f.tag !== 23) || f.memoizedState === null || f === e) &&
                f.child !== null
              ) {
                ((f.child.return = f), (f = f.child));
                continue;
              }
              if (f === e) break a;
              for (; f.sibling === null;) {
                if (f.return === null || f.return === e) break a;
                (d === f && (d = null), (f = f.return));
              }
              (d === f && (d = null), (f.sibling.return = f.return), (f = f.sibling));
            }
          }
          break;
        case 19:
          (Ic(t, e), Rc(e), i & 4 && Fc(e));
          break;
        case 21:
          break;
        default:
          (Ic(t, e), Rc(e));
      }
    }
    function Rc(e) {
      var t = e.flags;
      if (t & 2) {
        try {
          a: {
            for (var n = e.return; n !== null;) {
              if (Dc(n)) {
                var i = n;
                break a;
              }
              n = n.return;
            }
            throw Error(r(160));
          }
          switch (i.tag) {
            case 5:
              var a = i.stateNode;
              (i.flags & 32 && (Te(a, ``), (i.flags &= -33)), Ac(e, Oc(e), a));
              break;
            case 3:
            case 4:
              var o = i.stateNode.containerInfo;
              kc(e, Oc(e), o);
              break;
            default:
              throw Error(r(161));
          }
        } catch (t) {
          Kl(e, e.return, t);
        }
        e.flags &= -3;
      }
      t & 4096 && (e.flags &= -4097);
    }
    function zc(e, t, n) {
      ((G = e), Bc(e, t, n));
    }
    function Bc(e, t, n) {
      for (var r = !!(e.mode & 1); G !== null;) {
        var i = G,
          a = i.child;
        if (i.tag === 22 && r) {
          var o = i.memoizedState !== null || gc;
          if (!o) {
            var s = i.alternate,
              c = (s !== null && s.memoizedState !== null) || _c;
            s = gc;
            var l = _c;
            if (((gc = o), (_c = c) && !l))
              for (G = i; G !== null;)
                ((o = G),
                  (c = o.child),
                  (o.tag === 22 && o.memoizedState !== null) || c === null
                    ? Uc(i)
                    : ((c.return = o), (G = c)));
            for (; a !== null;) ((G = a), Bc(a, t, n), (a = a.sibling));
            ((G = i), (gc = s), (_c = l));
          }
          Vc(e, t, n);
        } else i.subtreeFlags & 8772 && a !== null ? ((a.return = i), (G = a)) : Vc(e, t, n);
      }
    }
    function Vc(e) {
      for (; G !== null;) {
        var t = G;
        if (t.flags & 8772) {
          var n = t.alternate;
          try {
            if (t.flags & 8772)
              switch (t.tag) {
                case 0:
                case 11:
                case 15:
                  _c || wc(5, t);
                  break;
                case 1:
                  var i = t.stateNode;
                  if (t.flags & 4 && !_c) {
                    if (n === null) i.componentDidMount();
                    else {
                      var a =
                        t.elementType === t.type ? n.memoizedProps : Ss(t.type, n.memoizedProps);
                      i.componentDidUpdate(
                        a,
                        n.memoizedState,
                        i.__reactInternalSnapshotBeforeUpdate,
                      );
                    }
                  }
                  var o = t.updateQueue;
                  o !== null && lo(t, o, i);
                  break;
                case 3:
                  var s = t.updateQueue;
                  if (s !== null) {
                    if (((n = null), t.child !== null))
                      switch (t.child.tag) {
                        case 5:
                          n = t.child.stateNode;
                          break;
                        case 1:
                          n = t.child.stateNode;
                      }
                    lo(t, s, n);
                  }
                  break;
                case 5:
                  var c = t.stateNode;
                  if (n === null && t.flags & 4) {
                    n = c;
                    var l = t.memoizedProps;
                    switch (t.type) {
                      case `button`:
                      case `input`:
                      case `select`:
                      case `textarea`:
                        l.autoFocus && n.focus();
                        break;
                      case `img`:
                        l.src && (n.src = l.src);
                    }
                  }
                  break;
                case 6:
                  break;
                case 4:
                  break;
                case 12:
                  break;
                case 13:
                  if (t.memoizedState === null) {
                    var u = t.alternate;
                    if (u !== null) {
                      var d = u.memoizedState;
                      if (d !== null) {
                        var f = d.dehydrated;
                        f !== null && ln(f);
                      }
                    }
                  }
                  break;
                case 19:
                case 17:
                case 21:
                case 22:
                case 23:
                case 25:
                  break;
                default:
                  throw Error(r(163));
              }
            _c || (t.flags & 512 && Tc(t));
          } catch (e) {
            Kl(t, t.return, e);
          }
        }
        if (t === e) {
          G = null;
          break;
        }
        if (((n = t.sibling), n !== null)) {
          ((n.return = t.return), (G = n));
          break;
        }
        G = t.return;
      }
    }
    function Hc(e) {
      for (; G !== null;) {
        var t = G;
        if (t === e) {
          G = null;
          break;
        }
        var n = t.sibling;
        if (n !== null) {
          ((n.return = t.return), (G = n));
          break;
        }
        G = t.return;
      }
    }
    function Uc(e) {
      for (; G !== null;) {
        var t = G;
        try {
          switch (t.tag) {
            case 0:
            case 11:
            case 15:
              var n = t.return;
              try {
                wc(4, t);
              } catch (e) {
                Kl(t, n, e);
              }
              break;
            case 1:
              var r = t.stateNode;
              if (typeof r.componentDidMount == `function`) {
                var i = t.return;
                try {
                  r.componentDidMount();
                } catch (e) {
                  Kl(t, i, e);
                }
              }
              var a = t.return;
              try {
                Tc(t);
              } catch (e) {
                Kl(t, a, e);
              }
              break;
            case 5:
              var o = t.return;
              try {
                Tc(t);
              } catch (e) {
                Kl(t, o, e);
              }
          }
        } catch (e) {
          Kl(t, t.return, e);
        }
        if (t === e) {
          G = null;
          break;
        }
        var s = t.sibling;
        if (s !== null) {
          ((s.return = t.return), (G = s));
          break;
        }
        G = t.return;
      }
    }
    var Wc = Math.ceil,
      Gc = C.ReactCurrentDispatcher,
      Kc = C.ReactCurrentOwner,
      qc = C.ReactCurrentBatchConfig,
      Jc = 0,
      Yc = null,
      Xc = null,
      Zc = 0,
      Qc = 0,
      $c = Ui(0),
      el = 0,
      tl = null,
      nl = 0,
      rl = 0,
      il = 0,
      al = null,
      ol = null,
      sl = 0,
      cl = 1 / 0,
      ll = null,
      ul = !1,
      dl = null,
      fl = null,
      pl = !1,
      ml = null,
      hl = 0,
      gl = 0,
      _l = null,
      vl = -1,
      yl = 0;
    function bl() {
      return Jc & 6 ? ft() : vl === -1 ? (vl = ft()) : vl;
    }
    function xl(e) {
      return e.mode & 1
        ? Jc & 2 && Zc !== 0
          ? Zc & -Zc
          : Fa.transition === null
            ? ((e = Rt),
              e === 0 ? ((e = window.event), (e = e === void 0 ? 16 : _n(e.type)), e) : e)
            : (yl === 0 && (yl = Nt()), yl)
        : 1;
    }
    function Sl(e, t, n, i) {
      if (50 < gl) throw ((gl = 0), (_l = null), Error(r(185)));
      (Ft(e, n, i),
        (!(Jc & 2) || e !== Yc) &&
          (e === Yc && (!(Jc & 2) && (rl |= n), el === 4 && Ol(e, Zc)),
          Cl(e, i),
          n === 1 && Jc === 0 && !(t.mode & 1) && ((cl = ft() + 500), ia && ca())));
    }
    function Cl(e, t) {
      var n = e.callbackNode;
      jt(e, t);
      var r = kt(e, e === Yc ? Zc : 0);
      if (r === 0) (n !== null && lt(n), (e.callbackNode = null), (e.callbackPriority = 0));
      else if (((t = r & -r), e.callbackPriority !== t)) {
        if ((n != null && lt(n), t === 1))
          (e.tag === 0 ? sa(kl.bind(null, e)) : oa(kl.bind(null, e)),
            Ti(function () {
              !(Jc & 6) && ca();
            }),
            (n = null));
        else {
          switch (zt(r)) {
            case 1:
              n = mt;
              break;
            case 4:
              n = ht;
              break;
            case 16:
              n = gt;
              break;
            case 536870912:
              n = vt;
              break;
            default:
              n = gt;
          }
          n = Ql(n, wl.bind(null, e));
        }
        ((e.callbackPriority = t), (e.callbackNode = n));
      }
    }
    function wl(e, t) {
      if (((vl = -1), (yl = 0), Jc & 6)) throw Error(r(327));
      var n = e.callbackNode;
      if (Wl() && e.callbackNode !== n) return null;
      var i = kt(e, e === Yc ? Zc : 0);
      if (i === 0) return null;
      if (i & 30 || (i & e.expiredLanes) !== 0 || t) t = Ll(e, i);
      else {
        t = i;
        var a = Jc;
        Jc |= 2;
        var o = Fl();
        (Yc !== e || Zc !== t) && ((ll = null), (cl = ft() + 500), Nl(e, t));
        do
          try {
            zl();
            break;
          } catch (t) {
            Pl(e, t);
          }
        while (1);
        (Ka(),
          (Gc.current = o),
          (Jc = a),
          Xc === null ? ((Yc = null), (Zc = 0), (t = el)) : (t = 0));
      }
      if (t !== 0) {
        if ((t === 2 && ((a = Mt(e)), a !== 0 && ((i = a), (t = Tl(e, a)))), t === 1))
          throw ((n = tl), Nl(e, 0), Ol(e, i), Cl(e, ft()), n);
        if (t === 6) Ol(e, i);
        else {
          if (
            ((a = e.current.alternate),
            !(i & 30) &&
              !Dl(a) &&
              ((t = Ll(e, i)),
              t === 2 && ((o = Mt(e)), o !== 0 && ((i = o), (t = Tl(e, o)))),
              t === 1))
          )
            throw ((n = tl), Nl(e, 0), Ol(e, i), Cl(e, ft()), n);
          switch (((e.finishedWork = a), (e.finishedLanes = i), t)) {
            case 0:
            case 1:
              throw Error(r(345));
            case 2:
              Hl(e, ol, ll);
              break;
            case 3:
              if ((Ol(e, i), (i & 130023424) === i && ((t = sl + 500 - ft()), 10 < t))) {
                if (kt(e, 0) !== 0) break;
                if (((a = e.suspendedLanes), (a & i) !== i)) {
                  (bl(), (e.pingedLanes |= e.suspendedLanes & a));
                  break;
                }
                e.timeoutHandle = Si(Hl.bind(null, e, ol, ll), t);
                break;
              }
              Hl(e, ol, ll);
              break;
            case 4:
              if ((Ol(e, i), (i & 4194240) === i)) break;
              for (t = e.eventTimes, a = -1; 0 < i;) {
                var s = 31 - St(i);
                ((o = 1 << s), (s = t[s]), s > a && (a = s), (i &= ~o));
              }
              if (
                ((i = a),
                (i = ft() - i),
                (i =
                  (120 > i
                    ? 120
                    : 480 > i
                      ? 480
                      : 1080 > i
                        ? 1080
                        : 1920 > i
                          ? 1920
                          : 3e3 > i
                            ? 3e3
                            : 4320 > i
                              ? 4320
                              : 1960 * Wc(i / 1960)) - i),
                10 < i)
              ) {
                e.timeoutHandle = Si(Hl.bind(null, e, ol, ll), i);
                break;
              }
              Hl(e, ol, ll);
              break;
            case 5:
              Hl(e, ol, ll);
              break;
            default:
              throw Error(r(329));
          }
        }
      }
      return (Cl(e, ft()), e.callbackNode === n ? wl.bind(null, e) : null);
    }
    function Tl(e, t) {
      var n = al;
      return (
        e.current.memoizedState.isDehydrated && (Nl(e, t).flags |= 256),
        (e = Ll(e, t)),
        e !== 2 && ((t = ol), (ol = n), t !== null && El(t)),
        e
      );
    }
    function El(e) {
      ol === null ? (ol = e) : ol.push.apply(ol, e);
    }
    function Dl(e) {
      for (var t = e; ;) {
        if (t.flags & 16384) {
          var n = t.updateQueue;
          if (n !== null && ((n = n.stores), n !== null))
            for (var r = 0; r < n.length; r++) {
              var i = n[r],
                a = i.getSnapshot;
              i = i.value;
              try {
                if (!Dr(a(), i)) return !1;
              } catch {
                return !1;
              }
            }
        }
        if (((n = t.child), t.subtreeFlags & 16384 && n !== null)) ((n.return = t), (t = n));
        else {
          if (t === e) break;
          for (; t.sibling === null;) {
            if (t.return === null || t.return === e) return !0;
            t = t.return;
          }
          ((t.sibling.return = t.return), (t = t.sibling));
        }
      }
      return !0;
    }
    function Ol(e, t) {
      for (
        t &= ~il, t &= ~rl, e.suspendedLanes |= t, e.pingedLanes &= ~t, e = e.expirationTimes;
        0 < t;
      ) {
        var n = 31 - St(t),
          r = 1 << n;
        ((e[n] = -1), (t &= ~r));
      }
    }
    function kl(e) {
      if (Jc & 6) throw Error(r(327));
      Wl();
      var t = kt(e, 0);
      if (!(t & 1)) return (Cl(e, ft()), null);
      var n = Ll(e, t);
      if (e.tag !== 0 && n === 2) {
        var i = Mt(e);
        i !== 0 && ((t = i), (n = Tl(e, i)));
      }
      if (n === 1) throw ((n = tl), Nl(e, 0), Ol(e, t), Cl(e, ft()), n);
      if (n === 6) throw Error(r(345));
      return (
        (e.finishedWork = e.current.alternate),
        (e.finishedLanes = t),
        Hl(e, ol, ll),
        Cl(e, ft()),
        null
      );
    }
    function Al(e, t) {
      var n = Jc;
      Jc |= 1;
      try {
        return e(t);
      } finally {
        ((Jc = n), Jc === 0 && ((cl = ft() + 500), ia && ca()));
      }
    }
    function jl(e) {
      ml !== null && ml.tag === 0 && !(Jc & 6) && Wl();
      var t = Jc;
      Jc |= 1;
      var n = qc.transition,
        r = Rt;
      try {
        if (((qc.transition = null), (Rt = 1), e)) return e();
      } finally {
        ((Rt = r), (qc.transition = n), (Jc = t), !(Jc & 6) && ca());
      }
    }
    function Ml() {
      ((Qc = $c.current), Wi($c));
    }
    function Nl(e, t) {
      ((e.finishedWork = null), (e.finishedLanes = 0));
      var n = e.timeoutHandle;
      if ((n !== -1 && ((e.timeoutHandle = -1), Ci(n)), Xc !== null))
        for (n = Xc.return; n !== null;) {
          var r = n;
          switch ((xa(r), r.tag)) {
            case 1:
              ((r = r.type.childContextTypes), r != null && Qi());
              break;
            case 3:
              (_o(), Wi(Ji), Wi(qi), Co());
              break;
            case 5:
              yo(r);
              break;
            case 4:
              _o();
              break;
            case 13:
              Wi(bo);
              break;
            case 19:
              Wi(bo);
              break;
            case 10:
              qa(r.type._context);
              break;
            case 22:
            case 23:
              Ml();
          }
          n = n.return;
        }
      if (
        ((Yc = e),
        (Xc = e = ru(e.current, null)),
        (Zc = Qc = t),
        (el = 0),
        (tl = null),
        (il = rl = nl = 0),
        (ol = al = null),
        Za !== null)
      ) {
        for (t = 0; t < Za.length; t++)
          if (((n = Za[t]), (r = n.interleaved), r !== null)) {
            n.interleaved = null;
            var i = r.next,
              a = n.pending;
            if (a !== null) {
              var o = a.next;
              ((a.next = i), (r.next = o));
            }
            n.pending = r;
          }
        Za = null;
      }
      return e;
    }
    function Pl(e, t) {
      do {
        var n = Xc;
        try {
          if ((Ka(), (wo.current = vs), Ao)) {
            for (var i = Do.memoizedState; i !== null;) {
              var a = i.queue;
              (a !== null && (a.pending = null), (i = i.next));
            }
            Ao = !1;
          }
          if (
            ((Eo = 0),
            (ko = Oo = Do = null),
            (jo = !1),
            (Mo = 0),
            (Kc.current = null),
            n === null || n.return === null)
          ) {
            ((el = 1), (tl = t), (Xc = null));
            break;
          }
          a: {
            var o = e,
              s = n.return,
              c = n,
              l = t;
            if (
              ((t = Zc),
              (c.flags |= 32768),
              typeof l == `object` && l && typeof l.then == `function`)
            ) {
              var u = l,
                d = c,
                f = d.tag;
              if (!(d.mode & 1) && (f === 0 || f === 11 || f === 15)) {
                var p = d.alternate;
                p
                  ? ((d.updateQueue = p.updateQueue),
                    (d.memoizedState = p.memoizedState),
                    (d.lanes = p.lanes))
                  : ((d.updateQueue = null), (d.memoizedState = null));
              }
              var m = Is(s);
              if (m !== null) {
                ((m.flags &= -257), Ls(m, s, c, o, t), m.mode & 1 && Fs(o, u, t), (t = m), (l = u));
                var h = t.updateQueue;
                if (h === null) {
                  var g = new Set();
                  (g.add(l), (t.updateQueue = g));
                } else h.add(l);
                break a;
              }
              if (!(t & 1)) {
                (Fs(o, u, t), Il());
                break a;
              }
              l = Error(r(426));
            } else if (wa && c.mode & 1) {
              var _ = Is(s);
              if (_ !== null) {
                (!(_.flags & 65536) && (_.flags |= 256), Ls(_, s, c, o, t), Pa(ks(l, c)));
                break a;
              }
            }
            ((o = l = ks(l, c)),
              el !== 4 && (el = 2),
              al === null ? (al = [o]) : al.push(o),
              (o = s));
            do {
              switch (o.tag) {
                case 3:
                  ((o.flags |= 65536), (t &= -t), (o.lanes |= t));
                  var v = Ns(o, l, t);
                  so(o, v);
                  break a;
                case 1:
                  c = l;
                  var y = o.type,
                    b = o.stateNode;
                  if (
                    !(o.flags & 128) &&
                    (typeof y.getDerivedStateFromError == `function` ||
                      (b !== null &&
                        typeof b.componentDidCatch == `function` &&
                        (fl === null || !fl.has(b))))
                  ) {
                    ((o.flags |= 65536), (t &= -t), (o.lanes |= t));
                    var x = Ps(o, c, t);
                    so(o, x);
                    break a;
                  }
              }
              o = o.return;
            } while (o !== null);
          }
          Vl(n);
        } catch (e) {
          ((t = e), Xc === n && n !== null && (Xc = n = n.return));
          continue;
        }
        break;
      } while (1);
    }
    function Fl() {
      var e = Gc.current;
      return ((Gc.current = vs), e === null ? vs : e);
    }
    function Il() {
      ((el === 0 || el === 3 || el === 2) && (el = 4),
        Yc === null || (!(nl & 268435455) && !(rl & 268435455)) || Ol(Yc, Zc));
    }
    function Ll(e, t) {
      var n = Jc;
      Jc |= 2;
      var i = Fl();
      (Yc !== e || Zc !== t) && ((ll = null), Nl(e, t));
      do
        try {
          Rl();
          break;
        } catch (t) {
          Pl(e, t);
        }
      while (1);
      if ((Ka(), (Jc = n), (Gc.current = i), Xc !== null)) throw Error(r(261));
      return ((Yc = null), (Zc = 0), el);
    }
    function Rl() {
      for (; Xc !== null;) Bl(Xc);
    }
    function zl() {
      for (; Xc !== null && !ut();) Bl(Xc);
    }
    function Bl(e) {
      var t = Zl(e.alternate, e, Qc);
      ((e.memoizedProps = e.pendingProps), t === null ? Vl(e) : (Xc = t), (Kc.current = null));
    }
    function Vl(e) {
      var t = e;
      do {
        var n = t.alternate;
        if (((e = t.return), t.flags & 32768)) {
          if (((n = hc(n, t)), n !== null)) {
            ((n.flags &= 32767), (Xc = n));
            return;
          }
          if (e !== null) ((e.flags |= 32768), (e.subtreeFlags = 0), (e.deletions = null));
          else {
            ((el = 6), (Xc = null));
            return;
          }
        } else if (((n = mc(n, t, Qc)), n !== null)) {
          Xc = n;
          return;
        }
        if (((t = t.sibling), t !== null)) {
          Xc = t;
          return;
        }
        Xc = t = e;
      } while (t !== null);
      el === 0 && (el = 5);
    }
    function Hl(e, t, n) {
      var r = Rt,
        i = qc.transition;
      try {
        ((qc.transition = null), (Rt = 1), Ul(e, t, n, r));
      } finally {
        ((qc.transition = i), (Rt = r));
      }
      return null;
    }
    function Ul(e, t, n, i) {
      do Wl();
      while (ml !== null);
      if (Jc & 6) throw Error(r(327));
      n = e.finishedWork;
      var a = e.finishedLanes;
      if (n === null) return null;
      if (((e.finishedWork = null), (e.finishedLanes = 0), n === e.current)) throw Error(r(177));
      ((e.callbackNode = null), (e.callbackPriority = 0));
      var o = n.lanes | n.childLanes;
      if (
        (It(e, o),
        e === Yc && ((Xc = Yc = null), (Zc = 0)),
        (!(n.subtreeFlags & 2064) && !(n.flags & 2064)) ||
          pl ||
          ((pl = !0),
          Ql(gt, function () {
            return (Wl(), null);
          })),
        (o = !!(n.flags & 15990)),
        n.subtreeFlags & 15990 || o)
      ) {
        ((o = qc.transition), (qc.transition = null));
        var s = Rt;
        Rt = 1;
        var c = Jc;
        ((Jc |= 4),
          (Kc.current = null),
          Sc(e, n),
          Lc(n, e),
          Nr(bi),
          (dn = !!yi),
          (bi = yi = null),
          (e.current = n),
          zc(n, e, a),
          dt(),
          (Jc = c),
          (Rt = s),
          (qc.transition = o));
      } else e.current = n;
      if (
        (pl && ((pl = !1), (ml = e), (hl = a)),
        (o = e.pendingLanes),
        o === 0 && (fl = null),
        xt(n.stateNode, i),
        Cl(e, ft()),
        t !== null)
      )
        for (i = e.onRecoverableError, n = 0; n < t.length; n++)
          ((a = t[n]),
            i(a.value, {
              componentStack: a.stack,
              digest: a.digest,
            }));
      if (ul) throw ((ul = !1), (e = dl), (dl = null), e);
      return (
        hl & 1 && e.tag !== 0 && Wl(),
        (o = e.pendingLanes),
        o & 1 ? (e === _l ? gl++ : ((gl = 0), (_l = e))) : (gl = 0),
        ca(),
        null
      );
    }
    function Wl() {
      if (ml !== null) {
        var e = zt(hl),
          t = qc.transition,
          n = Rt;
        try {
          if (((qc.transition = null), (Rt = 16 > e ? 16 : e), ml === null)) var i = !1;
          else {
            if (((e = ml), (ml = null), (hl = 0), Jc & 6)) throw Error(r(331));
            var a = Jc;
            for (Jc |= 4, G = e.current; G !== null;) {
              var o = G,
                s = o.child;
              if (G.flags & 16) {
                var c = o.deletions;
                if (c !== null) {
                  for (var l = 0; l < c.length; l++) {
                    var u = c[l];
                    for (G = u; G !== null;) {
                      var d = G;
                      switch (d.tag) {
                        case 0:
                        case 11:
                        case 15:
                          Cc(8, d, o);
                      }
                      var f = d.child;
                      if (f !== null) ((f.return = d), (G = f));
                      else
                        for (; G !== null;) {
                          d = G;
                          var p = d.sibling,
                            m = d.return;
                          if ((Ec(d), d === u)) {
                            G = null;
                            break;
                          }
                          if (p !== null) {
                            ((p.return = m), (G = p));
                            break;
                          }
                          G = m;
                        }
                    }
                  }
                  var h = o.alternate;
                  if (h !== null) {
                    var g = h.child;
                    if (g !== null) {
                      h.child = null;
                      do {
                        var _ = g.sibling;
                        ((g.sibling = null), (g = _));
                      } while (g !== null);
                    }
                  }
                  G = o;
                }
              }
              if (o.subtreeFlags & 2064 && s !== null) ((s.return = o), (G = s));
              else
                b: for (; G !== null;) {
                  if (((o = G), o.flags & 2048))
                    switch (o.tag) {
                      case 0:
                      case 11:
                      case 15:
                        Cc(9, o, o.return);
                    }
                  var v = o.sibling;
                  if (v !== null) {
                    ((v.return = o.return), (G = v));
                    break b;
                  }
                  G = o.return;
                }
            }
            var y = e.current;
            for (G = y; G !== null;) {
              s = G;
              var b = s.child;
              if (s.subtreeFlags & 2064 && b !== null) ((b.return = s), (G = b));
              else
                b: for (s = y; G !== null;) {
                  if (((c = G), c.flags & 2048))
                    try {
                      switch (c.tag) {
                        case 0:
                        case 11:
                        case 15:
                          wc(9, c);
                      }
                    } catch (e) {
                      Kl(c, c.return, e);
                    }
                  if (c === s) {
                    G = null;
                    break b;
                  }
                  var x = c.sibling;
                  if (x !== null) {
                    ((x.return = c.return), (G = x));
                    break b;
                  }
                  G = c.return;
                }
            }
            if (((Jc = a), ca(), bt && typeof bt.onPostCommitFiberRoot == `function`))
              try {
                bt.onPostCommitFiberRoot(yt, e);
              } catch {}
            i = !0;
          }
          return i;
        } finally {
          ((Rt = n), (qc.transition = t));
        }
      }
      return !1;
    }
    function Gl(e, t, n) {
      ((t = ks(n, t)),
        (t = Ns(e, t, 1)),
        (e = ao(e, t, 1)),
        (t = bl()),
        e !== null && (Ft(e, 1, t), Cl(e, t)));
    }
    function Kl(e, t, n) {
      if (e.tag === 3) Gl(e, e, n);
      else
        for (; t !== null;) {
          if (t.tag === 3) {
            Gl(t, e, n);
            break;
          }
          if (t.tag === 1) {
            var r = t.stateNode;
            if (
              typeof t.type.getDerivedStateFromError == `function` ||
              (typeof r.componentDidCatch == `function` && (fl === null || !fl.has(r)))
            ) {
              ((e = ks(n, e)),
                (e = Ps(t, e, 1)),
                (t = ao(t, e, 1)),
                (e = bl()),
                t !== null && (Ft(t, 1, e), Cl(t, e)));
              break;
            }
          }
          t = t.return;
        }
    }
    function ql(e, t, n) {
      var r = e.pingCache;
      (r !== null && r.delete(t),
        (t = bl()),
        (e.pingedLanes |= e.suspendedLanes & n),
        Yc === e &&
          (Zc & n) === n &&
          (el === 4 || (el === 3 && (Zc & 130023424) === Zc && 500 > ft() - sl)
            ? Nl(e, 0)
            : (il |= n)),
        Cl(e, t));
    }
    function Jl(e, t) {
      t === 0 &&
        (e.mode & 1 ? ((t = Dt), (Dt <<= 1), !(Dt & 130023424) && (Dt = 4194304)) : (t = 1));
      var n = bl();
      ((e = eo(e, t)), e !== null && (Ft(e, t, n), Cl(e, n)));
    }
    function Yl(e) {
      var t = e.memoizedState,
        n = 0;
      (t !== null && (n = t.retryLane), Jl(e, n));
    }
    function Xl(e, t) {
      var n = 0;
      switch (e.tag) {
        case 13:
          var i = e.stateNode,
            a = e.memoizedState;
          a !== null && (n = a.retryLane);
          break;
        case 19:
          i = e.stateNode;
          break;
        default:
          throw Error(r(314));
      }
      (i !== null && i.delete(t), Jl(e, n));
    }
    var Zl = function (e, t, n) {
      if (e !== null) {
        if (e.memoizedProps !== t.pendingProps || Ji.current) zs = !0;
        else {
          if ((e.lanes & n) === 0 && !(t.flags & 128)) return ((zs = !1), cc(e, t, n));
          zs = !!(e.flags & 131072);
        }
      } else ((zs = !1), wa && t.flags & 1048576 && ya(t, fa, t.index));
      switch (((t.lanes = 0), t.tag)) {
        case 2:
          var i = t.type;
          (oc(e, t), (e = t.pendingProps));
          var a = Xi(t, qi.current);
          (Ya(t, n), (a = Io(null, t, i, e, a, n)));
          var o = Lo();
          return (
            (t.flags |= 1),
            typeof a == `object` && a && typeof a.render == `function` && a.$$typeof === void 0
              ? ((t.tag = 1),
                (t.memoizedState = null),
                (t.updateQueue = null),
                Zi(i) ? ((o = !0), ta(t)) : (o = !1),
                (t.memoizedState = a.state !== null && a.state !== void 0 ? a.state : null),
                no(t),
                (a.updater = ws),
                (t.stateNode = a),
                (a._reactInternals = t),
                Os(t, i, e, n),
                (t = Js(null, t, i, !0, o, n)))
              : ((t.tag = 0), wa && o && ba(t), Bs(null, t, a, n), (t = t.child)),
            t
          );
        case 16:
          i = t.elementType;
          a: {
            switch (
              (oc(e, t),
              (e = t.pendingProps),
              (a = i._init),
              (i = a(i._payload)),
              (t.type = i),
              (a = t.tag = nu(i)),
              (e = Ss(i, e)),
              a)
            ) {
              case 0:
                t = Ks(null, t, i, e, n);
                break a;
              case 1:
                t = qs(null, t, i, e, n);
                break a;
              case 11:
                t = Vs(null, t, i, e, n);
                break a;
              case 14:
                t = Hs(null, t, i, Ss(i.type, e), n);
                break a;
            }
            throw Error(r(306, i, ``));
          }
          return t;
        case 0:
          return (
            (i = t.type),
            (a = t.pendingProps),
            (a = t.elementType === i ? a : Ss(i, a)),
            Ks(e, t, i, a, n)
          );
        case 1:
          return (
            (i = t.type),
            (a = t.pendingProps),
            (a = t.elementType === i ? a : Ss(i, a)),
            qs(e, t, i, a, n)
          );
        case 3:
          a: {
            if ((Ys(t), e === null)) throw Error(r(387));
            ((i = t.pendingProps),
              (o = t.memoizedState),
              (a = o.element),
              ro(e, t),
              co(t, i, null, n));
            var s = t.memoizedState;
            if (((i = s.element), o.isDehydrated)) {
              if (
                ((o = {
                  element: i,
                  isDehydrated: !1,
                  cache: s.cache,
                  pendingSuspenseBoundaries: s.pendingSuspenseBoundaries,
                  transitions: s.transitions,
                }),
                (t.updateQueue.baseState = o),
                (t.memoizedState = o),
                t.flags & 256)
              ) {
                ((a = ks(Error(r(423)), t)), (t = Xs(e, t, i, n, a)));
                break a;
              }
              if (i !== a) {
                ((a = ks(Error(r(424)), t)), (t = Xs(e, t, i, n, a)));
                break a;
              }
              for (
                Ca = Oi(t.stateNode.containerInfo.firstChild),
                  Sa = t,
                  wa = !0,
                  Ta = null,
                  n = Va(t, null, i, n),
                  t.child = n;
                n;
              )
                ((n.flags = (n.flags & -3) | 4096), (n = n.sibling));
            } else {
              if ((Na(), i === a)) {
                t = sc(e, t, n);
                break a;
              }
              Bs(e, t, i, n);
            }
            t = t.child;
          }
          return t;
        case 5:
          return (
            vo(t),
            e === null && ka(t),
            (i = t.type),
            (a = t.pendingProps),
            (o = e === null ? null : e.memoizedProps),
            (s = a.children),
            xi(i, a) ? (s = null) : o !== null && xi(i, o) && (t.flags |= 32),
            Gs(e, t),
            Bs(e, t, s, n),
            t.child
          );
        case 6:
          return (e === null && ka(t), null);
        case 13:
          return $s(e, t, n);
        case 4:
          return (
            go(t, t.stateNode.containerInfo),
            (i = t.pendingProps),
            e === null ? (t.child = Ba(t, null, i, n)) : Bs(e, t, i, n),
            t.child
          );
        case 11:
          return (
            (i = t.type),
            (a = t.pendingProps),
            (a = t.elementType === i ? a : Ss(i, a)),
            Vs(e, t, i, a, n)
          );
        case 7:
          return (Bs(e, t, t.pendingProps, n), t.child);
        case 8:
          return (Bs(e, t, t.pendingProps.children, n), t.child);
        case 12:
          return (Bs(e, t, t.pendingProps.children, n), t.child);
        case 10:
          a: {
            if (
              ((i = t.type._context),
              (a = t.pendingProps),
              (o = t.memoizedProps),
              (s = a.value),
              Gi(Ha, i._currentValue),
              (i._currentValue = s),
              o !== null)
            ) {
              if (Dr(o.value, s)) {
                if (o.children === a.children && !Ji.current) {
                  t = sc(e, t, n);
                  break a;
                }
              } else
                for (o = t.child, o !== null && (o.return = t); o !== null;) {
                  var c = o.dependencies;
                  if (c !== null) {
                    s = o.child;
                    for (var l = c.firstContext; l !== null;) {
                      if (l.context === i) {
                        if (o.tag === 1) {
                          ((l = io(-1, n & -n)), (l.tag = 2));
                          var u = o.updateQueue;
                          if (u !== null) {
                            u = u.shared;
                            var d = u.pending;
                            (d === null ? (l.next = l) : ((l.next = d.next), (d.next = l)),
                              (u.pending = l));
                          }
                        }
                        ((o.lanes |= n),
                          (l = o.alternate),
                          l !== null && (l.lanes |= n),
                          Ja(o.return, n, t),
                          (c.lanes |= n));
                        break;
                      }
                      l = l.next;
                    }
                  } else if (o.tag === 10) s = o.type === t.type ? null : o.child;
                  else if (o.tag === 18) {
                    if (((s = o.return), s === null)) throw Error(r(341));
                    ((s.lanes |= n),
                      (c = s.alternate),
                      c !== null && (c.lanes |= n),
                      Ja(s, n, t),
                      (s = o.sibling));
                  } else s = o.child;
                  if (s !== null) s.return = o;
                  else
                    for (s = o; s !== null;) {
                      if (s === t) {
                        s = null;
                        break;
                      }
                      if (((o = s.sibling), o !== null)) {
                        ((o.return = s.return), (s = o));
                        break;
                      }
                      s = s.return;
                    }
                  o = s;
                }
            }
            (Bs(e, t, a.children, n), (t = t.child));
          }
          return t;
        case 9:
          return (
            (a = t.type),
            (i = t.pendingProps.children),
            Ya(t, n),
            (a = Xa(a)),
            (i = i(a)),
            (t.flags |= 1),
            Bs(e, t, i, n),
            t.child
          );
        case 14:
          return (
            (i = t.type),
            (a = Ss(i, t.pendingProps)),
            (a = Ss(i.type, a)),
            Hs(e, t, i, a, n)
          );
        case 15:
          return Us(e, t, t.type, t.pendingProps, n);
        case 17:
          return (
            (i = t.type),
            (a = t.pendingProps),
            (a = t.elementType === i ? a : Ss(i, a)),
            oc(e, t),
            (t.tag = 1),
            Zi(i) ? ((e = !0), ta(t)) : (e = !1),
            Ya(t, n),
            Es(t, i, a),
            Os(t, i, a, n),
            Js(null, t, i, !0, e, n)
          );
        case 19:
          return ac(e, t, n);
        case 22:
          return Ws(e, t, n);
      }
      throw Error(r(156, t.tag));
    };
    function Ql(e, t) {
      return ct(e, t);
    }
    function $l(e, t, n, r) {
      ((this.tag = e),
        (this.key = n),
        (this.sibling =
          this.child =
          this.return =
          this.stateNode =
          this.type =
          this.elementType =
            null),
        (this.index = 0),
        (this.ref = null),
        (this.pendingProps = t),
        (this.dependencies = this.memoizedState = this.updateQueue = this.memoizedProps = null),
        (this.mode = r),
        (this.subtreeFlags = this.flags = 0),
        (this.deletions = null),
        (this.childLanes = this.lanes = 0),
        (this.alternate = null));
    }
    function eu(e, t, n, r) {
      return new $l(e, t, n, r);
    }
    function tu(e) {
      return ((e = e.prototype), !(!e || !e.isReactComponent));
    }
    function nu(e) {
      if (typeof e == `function`) return +!!tu(e);
      if (e != null) {
        if (((e = e.$$typeof), e === j)) return 11;
        if (e === P) return 14;
      }
      return 2;
    }
    function ru(e, t) {
      var n = e.alternate;
      return (
        n === null
          ? ((n = eu(e.tag, t, e.key, e.mode)),
            (n.elementType = e.elementType),
            (n.type = e.type),
            (n.stateNode = e.stateNode),
            (n.alternate = e),
            (e.alternate = n))
          : ((n.pendingProps = t),
            (n.type = e.type),
            (n.flags = 0),
            (n.subtreeFlags = 0),
            (n.deletions = null)),
        (n.flags = e.flags & 14680064),
        (n.childLanes = e.childLanes),
        (n.lanes = e.lanes),
        (n.child = e.child),
        (n.memoizedProps = e.memoizedProps),
        (n.memoizedState = e.memoizedState),
        (n.updateQueue = e.updateQueue),
        (t = e.dependencies),
        (n.dependencies =
          t === null
            ? null
            : {
                lanes: t.lanes,
                firstContext: t.firstContext,
              }),
        (n.sibling = e.sibling),
        (n.index = e.index),
        (n.ref = e.ref),
        n
      );
    }
    function iu(e, t, n, i, a, o) {
      var s = 2;
      if (((i = e), typeof e == `function`)) tu(e) && (s = 1);
      else if (typeof e == `string`) s = 5;
      else
        a: switch (e) {
          case E:
            return au(n.children, a, o, t);
          case D:
            ((s = 8), (a |= 8));
            break;
          case O:
            return ((e = eu(12, n, t, a | 2)), (e.elementType = O), (e.lanes = o), e);
          case M:
            return ((e = eu(13, n, t, a)), (e.elementType = M), (e.lanes = o), e);
          case N:
            return ((e = eu(19, n, t, a)), (e.elementType = N), (e.lanes = o), e);
          case I:
            return ou(n, a, o, t);
          default:
            if (typeof e == `object` && e)
              switch (e.$$typeof) {
                case k:
                  s = 10;
                  break a;
                case A:
                  s = 9;
                  break a;
                case j:
                  s = 11;
                  break a;
                case P:
                  s = 14;
                  break a;
                case F:
                  ((s = 16), (i = null));
                  break a;
              }
            throw Error(r(130, e == null ? e : typeof e, ``));
        }
      return ((t = eu(s, n, t, a)), (t.elementType = e), (t.type = i), (t.lanes = o), t);
    }
    function au(e, t, n, r) {
      return ((e = eu(7, e, r, t)), (e.lanes = n), e);
    }
    function ou(e, t, n, r) {
      return (
        (e = eu(22, e, r, t)),
        (e.elementType = I),
        (e.lanes = n),
        (e.stateNode = {
          isHidden: !1,
        }),
        e
      );
    }
    function su(e, t, n) {
      return ((e = eu(6, e, null, t)), (e.lanes = n), e);
    }
    function cu(e, t, n) {
      return (
        (t = eu(4, e.children === null ? [] : e.children, e.key, t)),
        (t.lanes = n),
        (t.stateNode = {
          containerInfo: e.containerInfo,
          pendingChildren: null,
          implementation: e.implementation,
        }),
        t
      );
    }
    function lu(e, t, n, r, i) {
      ((this.tag = t),
        (this.containerInfo = e),
        (this.finishedWork = this.pingCache = this.current = this.pendingChildren = null),
        (this.timeoutHandle = -1),
        (this.callbackNode = this.pendingContext = this.context = null),
        (this.callbackPriority = 0),
        (this.eventTimes = Pt(0)),
        (this.expirationTimes = Pt(-1)),
        (this.entangledLanes =
          this.finishedLanes =
          this.mutableReadLanes =
          this.expiredLanes =
          this.pingedLanes =
          this.suspendedLanes =
          this.pendingLanes =
            0),
        (this.entanglements = Pt(0)),
        (this.identifierPrefix = r),
        (this.onRecoverableError = i),
        (this.mutableSourceEagerHydrationData = null));
    }
    function uu(e, t, n, r, i, a, o, s, c) {
      return (
        (e = new lu(e, t, n, s, c)),
        t === 1 ? ((t = 1), !0 === a && (t |= 8)) : (t = 0),
        (a = eu(3, null, null, t)),
        (e.current = a),
        (a.stateNode = e),
        (a.memoizedState = {
          element: r,
          isDehydrated: n,
          cache: null,
          transitions: null,
          pendingSuspenseBoundaries: null,
        }),
        no(a),
        e
      );
    }
    function du(e, t, n) {
      var r = 3 < arguments.length && arguments[3] !== void 0 ? arguments[3] : null;
      return {
        $$typeof: T,
        key: r == null ? null : `` + r,
        children: e,
        containerInfo: t,
        implementation: n,
      };
    }
    function fu(e) {
      if (!e) return Ki;
      e = e._reactInternals;
      a: {
        if (nt(e) !== e || e.tag !== 1) throw Error(r(170));
        var t = e;
        do {
          switch (t.tag) {
            case 3:
              t = t.stateNode.context;
              break a;
            case 1:
              if (Zi(t.type)) {
                t = t.stateNode.__reactInternalMemoizedMergedChildContext;
                break a;
              }
          }
          t = t.return;
        } while (t !== null);
        throw Error(r(171));
      }
      if (e.tag === 1) {
        var n = e.type;
        if (Zi(n)) return ea(e, n, t);
      }
      return t;
    }
    function pu(e, t, n, r, i, a, o, s, c) {
      return (
        (e = uu(n, r, !0, e, i, a, o, s, c)),
        (e.context = fu(null)),
        (n = e.current),
        (r = bl()),
        (i = xl(n)),
        (a = io(r, i)),
        (a.callback = t ?? null),
        ao(n, a, i),
        (e.current.lanes = i),
        Ft(e, i, r),
        Cl(e, r),
        e
      );
    }
    function mu(e, t, n, r) {
      var i = t.current,
        a = bl(),
        o = xl(i);
      return (
        (n = fu(n)),
        t.context === null ? (t.context = n) : (t.pendingContext = n),
        (t = io(a, o)),
        (t.payload = {
          element: e,
        }),
        (r = r === void 0 ? null : r),
        r !== null && (t.callback = r),
        (e = ao(i, t, o)),
        e !== null && (Sl(e, i, o, a), oo(e, i, o)),
        o
      );
    }
    function hu(e) {
      if (((e = e.current), !e.child)) return null;
      switch (e.child.tag) {
        case 5:
          return e.child.stateNode;
        default:
          return e.child.stateNode;
      }
    }
    function gu(e, t) {
      if (((e = e.memoizedState), e !== null && e.dehydrated !== null)) {
        var n = e.retryLane;
        e.retryLane = n !== 0 && n < t ? n : t;
      }
    }
    function _u(e, t) {
      (gu(e, t), (e = e.alternate) && gu(e, t));
    }
    function vu() {
      return null;
    }
    var yu =
      typeof reportError == `function`
        ? reportError
        : function (e) {
            console.error(e);
          };
    function bu(e) {
      this._internalRoot = e;
    }
    ((xu.prototype.render = bu.prototype.render =
      function (e) {
        var t = this._internalRoot;
        if (t === null) throw Error(r(409));
        mu(e, t, null, null);
      }),
      (xu.prototype.unmount = bu.prototype.unmount =
        function () {
          var e = this._internalRoot;
          if (e !== null) {
            this._internalRoot = null;
            var t = e.containerInfo;
            (jl(function () {
              mu(null, e, null, null);
            }),
              (t[Ni] = null));
          }
        }));
    function xu(e) {
      this._internalRoot = e;
    }
    xu.prototype.unstable_scheduleHydration = function (e) {
      if (e) {
        var t = Ut();
        e = {
          blockedOn: null,
          target: e,
          priority: t,
        };
        for (var n = 0; n < Qt.length && t !== 0 && t < Qt[n].priority; n++);
        (Qt.splice(n, 0, e), n === 0 && rn(e));
      }
    };
    function Su(e) {
      return !(!e || (e.nodeType !== 1 && e.nodeType !== 9 && e.nodeType !== 11));
    }
    function Cu(e) {
      return !(
        !e ||
        (e.nodeType !== 1 &&
          e.nodeType !== 9 &&
          e.nodeType !== 11 &&
          (e.nodeType !== 8 || e.nodeValue !== ` react-mount-point-unstable `))
      );
    }
    function wu() {}
    function Tu(e, t, n, r, i) {
      if (i) {
        if (typeof r == `function`) {
          var a = r;
          r = function () {
            var e = hu(o);
            a.call(e);
          };
        }
        var o = pu(t, r, e, 0, null, !1, !1, ``, wu);
        return (
          (e._reactRootContainer = o),
          (e[Ni] = o.current),
          si(e.nodeType === 8 ? e.parentNode : e),
          jl(),
          o
        );
      }
      for (; (i = e.lastChild);) e.removeChild(i);
      if (typeof r == `function`) {
        var s = r;
        r = function () {
          var e = hu(c);
          s.call(e);
        };
      }
      var c = uu(e, 0, !1, null, null, !1, !1, ``, wu);
      return (
        (e._reactRootContainer = c),
        (e[Ni] = c.current),
        si(e.nodeType === 8 ? e.parentNode : e),
        jl(function () {
          mu(t, c, n, r);
        }),
        c
      );
    }
    function Eu(e, t, n, r, i) {
      var a = n._reactRootContainer;
      if (a) {
        var o = a;
        if (typeof i == `function`) {
          var s = i;
          i = function () {
            var e = hu(o);
            s.call(e);
          };
        }
        mu(t, o, e, i);
      } else o = Tu(n, t, e, i, r);
      return hu(o);
    }
    ((Bt = function (e) {
      switch (e.tag) {
        case 3:
          var t = e.stateNode;
          if (t.current.memoizedState.isDehydrated) {
            var n = Ot(t.pendingLanes);
            n !== 0 && (Lt(t, n | 1), Cl(t, ft()), !(Jc & 6) && ((cl = ft() + 500), ca()));
          }
          break;
        case 13:
          (jl(function () {
            var t = eo(e, 1);
            t !== null && Sl(t, e, 1, bl());
          }),
            _u(e, 1));
      }
    }),
      (Vt = function (e) {
        if (e.tag === 13) {
          var t = eo(e, 134217728);
          (t !== null && Sl(t, e, 134217728, bl()), _u(e, 134217728));
        }
      }),
      (Ht = function (e) {
        if (e.tag === 13) {
          var t = xl(e),
            n = eo(e, t);
          (n !== null && Sl(n, e, t, bl()), _u(e, t));
        }
      }),
      (Ut = function () {
        return Rt;
      }),
      (Wt = function (e, t) {
        var n = Rt;
        try {
          return ((Rt = e), t());
        } finally {
          Rt = n;
        }
      }),
      (Fe = function (e, t, n) {
        switch (t) {
          case `input`:
            if ((_e(e, n), (t = n.name), n.type === `radio` && t != null)) {
              for (n = e; n.parentNode;) n = n.parentNode;
              for (
                n = n.querySelectorAll(`input[name=` + JSON.stringify(`` + t) + `][type="radio"]`),
                  t = 0;
                t < n.length;
                t++
              ) {
                var i = n[t];
                if (i !== e && i.form === e.form) {
                  var a = Bi(i);
                  if (!a) throw Error(r(90));
                  (pe(i), _e(i, a));
                }
              }
            }
            break;
          case `textarea`:
            xe(e, n);
            break;
          case `select`:
            ((t = n.value), t != null && B(e, !!n.multiple, t, !1));
        }
      }),
      (Ve = Al),
      (He = jl));
    var Du = {
        usingClientEntryPoint: !1,
        Events: [Ri, zi, Bi, ze, Be, Al],
      },
      Ou = {
        findFiberByHostInstance: Li,
        bundleType: 0,
        version: `18.3.1`,
        rendererPackageName: `react-dom`,
      },
      ku = {
        bundleType: Ou.bundleType,
        version: Ou.version,
        rendererPackageName: Ou.rendererPackageName,
        rendererConfig: Ou.rendererConfig,
        overrideHookState: null,
        overrideHookStateDeletePath: null,
        overrideHookStateRenamePath: null,
        overrideProps: null,
        overridePropsDeletePath: null,
        overridePropsRenamePath: null,
        setErrorHandler: null,
        setSuspenseHandler: null,
        scheduleUpdate: null,
        currentDispatcherRef: C.ReactCurrentDispatcher,
        findHostInstanceByFiber: function (e) {
          return ((e = ot(e)), e === null ? null : e.stateNode);
        },
        findFiberByHostInstance: Ou.findFiberByHostInstance || vu,
        findHostInstancesForRefresh: null,
        scheduleRefresh: null,
        scheduleRoot: null,
        setRefreshHandler: null,
        getCurrentFiber: null,
        reconcilerVersion: `18.3.1-next-f1338f8080-20240426`,
      };
    if (typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ < `u`) {
      var Au = __REACT_DEVTOOLS_GLOBAL_HOOK__;
      if (!Au.isDisabled && Au.supportsFiber)
        try {
          ((yt = Au.inject(ku)), (bt = Au));
        } catch {}
    }
    ((e.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED = Du),
      (e.createPortal = function (e, t) {
        var n = 2 < arguments.length && arguments[2] !== void 0 ? arguments[2] : null;
        if (!Su(t)) throw Error(r(200));
        return du(e, t, null, n);
      }),
      (e.createRoot = function (e, t) {
        if (!Su(e)) throw Error(r(299));
        var n = !1,
          i = ``,
          a = yu;
        return (
          t != null &&
            (!0 === t.unstable_strictMode && (n = !0),
            t.identifierPrefix !== void 0 && (i = t.identifierPrefix),
            t.onRecoverableError !== void 0 && (a = t.onRecoverableError)),
          (t = uu(e, 1, !1, null, null, n, !1, i, a)),
          (e[Ni] = t.current),
          si(e.nodeType === 8 ? e.parentNode : e),
          new bu(t)
        );
      }),
      (e.findDOMNode = function (e) {
        if (e == null) return null;
        if (e.nodeType === 1) return e;
        var t = e._reactInternals;
        if (t === void 0)
          throw typeof e.render == `function`
            ? Error(r(188))
            : ((e = Object.keys(e).join(`,`)), Error(r(268, e)));
        return ((e = ot(t)), (e = e === null ? null : e.stateNode), e);
      }),
      (e.flushSync = function (e) {
        return jl(e);
      }),
      (e.hydrate = function (e, t, n) {
        if (!Cu(t)) throw Error(r(200));
        return Eu(null, e, t, !0, n);
      }),
      (e.hydrateRoot = function (e, t, n) {
        if (!Su(e)) throw Error(r(405));
        var i = (n != null && n.hydratedSources) || null,
          a = !1,
          o = ``,
          s = yu;
        if (
          (n != null &&
            (!0 === n.unstable_strictMode && (a = !0),
            n.identifierPrefix !== void 0 && (o = n.identifierPrefix),
            n.onRecoverableError !== void 0 && (s = n.onRecoverableError)),
          (t = pu(t, null, e, 1, n ?? null, a, !1, o, s)),
          (e[Ni] = t.current),
          si(e),
          i)
        )
          for (e = 0; e < i.length; e++)
            ((n = i[e]),
              (a = n._getVersion),
              (a = a(n._source)),
              t.mutableSourceEagerHydrationData == null
                ? (t.mutableSourceEagerHydrationData = [n, a])
                : t.mutableSourceEagerHydrationData.push(n, a));
        return new xu(t);
      }),
      (e.render = function (e, t, n) {
        if (!Cu(t)) throw Error(r(200));
        return Eu(null, e, t, !1, n);
      }),
      (e.unmountComponentAtNode = function (e) {
        if (!Cu(e)) throw Error(r(40));
        return e._reactRootContainer
          ? (jl(function () {
              Eu(null, null, e, !1, function () {
                ((e._reactRootContainer = null), (e[Ni] = null));
              });
            }),
            !0)
          : !1;
      }),
      (e.unstable_batchedUpdates = Al),
      (e.unstable_renderSubtreeIntoContainer = function (e, t, n, i) {
        if (!Cu(n)) throw Error(r(200));
        if (e == null || e._reactInternals === void 0) throw Error(r(38));
        return Eu(e, t, n, !1, i);
      }),
      (e.version = `18.3.1-next-f1338f8080-20240426`));
  }),
  _ = s((e, t) => {
    function n() {
      if (!(
        typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ > `u` ||
        typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE != `function`
      ))
        try {
          __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(n);
        } catch (e) {
          console.error(e);
        }
    }
    (n(), (t.exports = g()));
  }),
  v = s((e) => {
    var t = _();
    ((e.createRoot = t.createRoot), (e.hydrateRoot = t.hydrateRoot));
  }),
  y = u(p(), 1),
  b = v(),
  x = `modulepreload`,
  S = function (e) {
    return `/` + e;
  },
  C = {},
  w = function (e, t, n) {
    let r = Promise.resolve();
    if (t && t.length > 0) {
      let e = document.getElementsByTagName(`link`),
        i = document.querySelector(`meta[property=csp-nonce]`),
        a = i?.nonce || i?.getAttribute(`nonce`);
      function o(e) {
        return Promise.all(
          e.map((e) =>
            Promise.resolve(e).then(
              (e) => ({
                status: `fulfilled`,
                value: e,
              }),
              (e) => ({
                status: `rejected`,
                reason: e,
              }),
            ),
          ),
        );
      }
      function s(e) {
        return import.meta.resolve ? import.meta.resolve(e) : new URL(e, import.meta.url).href;
      }
      r = o(
        t.map((t) => {
          if (((t = S(t, n)), (t = s(t)), t in C)) return;
          C[t] = !0;
          let r = t.endsWith(`.css`);
          for (let n = e.length - 1; n >= 0; n--) {
            let i = e[n];
            if (i.href === t && (!r || i.rel === `stylesheet`)) return;
          }
          let i = document.createElement(`link`);
          if (
            ((i.rel = r ? `stylesheet` : x),
            r || (i.as = `script`),
            (i.crossOrigin = ``),
            (i.href = t),
            a && i.setAttribute(`nonce`, a),
            document.head.appendChild(i),
            r)
          )
            return new Promise((e, n) => {
              (i.addEventListener(`load`, e),
                i.addEventListener(`error`, () => n(Error(`Unable to preload CSS for ${t}`))));
            });
        }),
      );
    }
    function i(e) {
      let t = new Event(`vite:preloadError`, {
        cancelable: !0,
      });
      if (((t.payload = e), window.dispatchEvent(t), !t.defaultPrevented)) throw e;
    }
    return r.then((t) => {
      for (let e of t || []) e.status === `rejected` && i(e.reason);
      return e().catch(i);
    });
  },
  T = /^(?:[a-z][a-z0-9+.-]*:|[\\/]{2})/i,
  E = /^[\\/]{2}/;
function D(e, t) {
  return t + e.replace(/\\/g, `/`);
}
var O = `popstate`;
function k(e) {
  return (
    typeof e == `object` &&
    !!e &&
    `pathname` in e &&
    `search` in e &&
    `hash` in e &&
    `state` in e &&
    `key` in e
  );
}
function A(e = {}) {
  function t(e, t) {
    let n = t.state?.masked,
      { pathname: r, search: i, hash: a } = n || e.location;
    return F(
      ``,
      {
        pathname: r,
        search: i,
        hash: a,
      },
      (t.state && t.state.usr) || null,
      (t.state && t.state.key) || `default`,
      n
        ? {
            pathname: e.location.pathname,
            search: e.location.search,
            hash: e.location.hash,
          }
        : void 0,
    );
  }
  function n(e, t) {
    return typeof t == `string` ? t : I(t);
  }
  return te(t, n, null, e);
}
function j(e, t) {
  if (e === !1 || e == null) throw Error(t);
}
function M(e, t) {
  if (!e) {
    typeof console < `u` && console.warn(t);
    try {
      throw Error(t);
    } catch {}
  }
}
function N() {
  return Math.random().toString(36).substring(2, 10);
}
function P(e, t) {
  return {
    usr: e.state,
    key: e.key,
    idx: t,
    masked: e.mask
      ? {
          pathname: e.pathname,
          search: e.search,
          hash: e.hash,
        }
      : void 0,
  };
}
function F(e, t, n = null, r, i) {
  return {
    pathname: typeof e == `string` ? e : e.pathname,
    search: ``,
    hash: ``,
    ...(typeof t == `string` ? ee(t) : t),
    state: n,
    key: (t && t.key) || r || N(),
    mask: i,
  };
}
function I({ pathname: e = `/`, search: t = ``, hash: n = `` }) {
  return (
    t && t !== `?` && (e += t.charAt(0) === `?` ? t : `?` + t),
    n && n !== `#` && (e += n.charAt(0) === `#` ? n : `#` + n),
    e
  );
}
function ee(e) {
  let t = {};
  if (e) {
    let n = e.indexOf(`#`);
    n >= 0 && ((t.hash = e.substring(n)), (e = e.substring(0, n)));
    let r = e.indexOf(`?`);
    (r >= 0 && ((t.search = e.substring(r)), (e = e.substring(0, r))), e && (t.pathname = e));
  }
  return t;
}
function te(e, t, n, r = {}) {
  let { window: i = document.defaultView, v5Compat: a = !1 } = r,
    o = i.history,
    s = `POP`,
    c = null,
    l = u();
  l ??
    ((l = 0),
    o.replaceState(
      {
        ...o.state,
        idx: l,
      },
      ``,
    ));
  function u() {
    return (
      o.state || {
        idx: null,
      }
    ).idx;
  }
  function d() {
    s = `POP`;
    let e = u(),
      t = e == null ? null : e - l;
    ((l = e),
      c &&
        c({
          action: s,
          location: h.location,
          delta: t,
        }));
  }
  function f(e, t) {
    s = `PUSH`;
    let r = k(e) ? e : F(h.location, e, t);
    (n && n(r, e), (l = u() + 1));
    let d = P(r, l),
      f = h.createHref(r.mask || r);
    try {
      o.pushState(d, ``, f);
    } catch (e) {
      if (e instanceof DOMException && e.name === `DataCloneError`) throw e;
      i.location.assign(f);
    }
    a &&
      c &&
      c({
        action: s,
        location: h.location,
        delta: 1,
      });
  }
  function p(e, t) {
    s = `REPLACE`;
    let r = k(e) ? e : F(h.location, e, t);
    (n && n(r, e), (l = u()));
    let i = P(r, l),
      d = h.createHref(r.mask || r);
    (o.replaceState(i, ``, d),
      a &&
        c &&
        c({
          action: s,
          location: h.location,
          delta: 0,
        }));
  }
  function m(e) {
    return L(i, e);
  }
  let h = {
    get action() {
      return s;
    },
    get location() {
      return e(i, o);
    },
    listen(e) {
      if (c) throw Error(`A history only accepts one active listener`);
      return (
        i.addEventListener(O, d),
        (c = e),
        () => {
          (i.removeEventListener(O, d), (c = null));
        }
      );
    },
    createHref(e) {
      return t(i, e);
    },
    createURL: m,
    encodeLocation(e) {
      let t = m(e);
      return {
        pathname: t.pathname,
        search: t.search,
        hash: t.hash,
      };
    },
    push: f,
    replace: p,
    go(e) {
      return o.go(e);
    },
  };
  return h;
}
function L(e, t, n = !1) {
  let r = `http://localhost`;
  (e && (r = e.location.origin === `null` ? e.location.href : e.location.origin),
    j(r, `No window.location.(origin|href) available to create URL`));
  let i = typeof t == `string` ? t : I(t);
  return ((i = i.replace(/ $/, `%20`)), !n && E.test(i) && (i = r + i), new URL(i, r));
}
function ne(e, t, n = `/`) {
  return re(e, t, n, !1);
}
function re(e, t, n, r, i) {
  let a = B((typeof t == `string` ? ee(t) : t).pathname || `/`, n);
  if (a == null) return null;
  let o = i ?? ie(e),
    s = null,
    c = ye(a);
  for (let e = 0; s == null && e < o.length; ++e) s = ge(o[e], c, r);
  return s;
}
function ie(e) {
  let t = ae(e);
  return (se(t), t);
}
function ae(e, t = [], n = [], r = ``, i = !1) {
  let a = (e, a, o = i, s) => {
    let c = {
      relativePath: s === void 0 ? e.path || `` : s,
      caseSensitive: e.caseSensitive === !0,
      childrenIndex: a,
      route: e,
    };
    if (c.relativePath.startsWith(`/`)) {
      if (!c.relativePath.startsWith(r) && o) return;
      (j(
        c.relativePath.startsWith(r),
        `Absolute route path "${c.relativePath}" nested under path "${r}" is not valid. An absolute child route path must start with the combined path of all its parent routes.`,
      ),
        (c.relativePath = c.relativePath.slice(r.length)));
    }
    let l = we([r, c.relativePath]),
      u = n.concat(c);
    (e.children &&
      e.children.length > 0 &&
      (j(
        e.index !== !0,
        `Index routes must not have child routes. Please remove all child routes from route path "${l}".`,
      ),
      ae(e.children, t, u, l, o)),
      !(e.path == null && !e.index) &&
        t.push({
          path: l,
          score: me(l, e.index),
          routesMeta: u.map((e, t) => {
            let [n, r] = z(e.relativePath, e.caseSensitive, t === u.length - 1);
            return {
              ...e,
              matcher: n,
              compiledParams: r,
            };
          }),
        }));
  };
  return (
    e.forEach((e, t) => {
      if (e.path === `` || !e.path?.includes(`?`)) a(e, t);
      else for (let n of oe(e.path)) a(e, t, !0, n);
    }),
    t
  );
}
function oe(e) {
  let t = e.split(`/`);
  if (t.length === 0) return [];
  let [n, ...r] = t,
    i = n.endsWith(`?`),
    a = n.replace(/\?$/, ``);
  if (r.length === 0) return i ? [a, ``] : [a];
  let o = oe(r.join(`/`)),
    s = [];
  return (
    s.push(...o.map((e) => (e === `` ? a : [a, e].join(`/`)))),
    i && s.push(...o),
    s.map((t) => (e.startsWith(`/`) && t === `` ? `/` : t))
  );
}
function se(e) {
  e.sort((e, t) =>
    e.score === t.score
      ? he(
          e.routesMeta.map((e) => e.childrenIndex),
          t.routesMeta.map((e) => e.childrenIndex),
        )
      : t.score - e.score,
  );
}
var ce = /^:[\w-]+$/,
  le = 3,
  ue = 2,
  de = 1,
  fe = 10,
  pe = -2,
  R = (e) => e === `*`;
function me(e, t) {
  let n = e.split(`/`),
    r = n.length;
  return (
    n.some(R) && (r += pe),
    t && (r += ue),
    n.filter((e) => !R(e)).reduce((e, t) => e + (ce.test(t) ? le : t === `` ? de : fe), r)
  );
}
function he(e, t) {
  return e.length === t.length && e.slice(0, -1).every((e, n) => e === t[n])
    ? e[e.length - 1] - t[t.length - 1]
    : 0;
}
function ge(e, t, n = !1) {
  let { routesMeta: r } = e,
    i = {},
    a = `/`,
    o = [];
  for (let e = 0; e < r.length; ++e) {
    let s = r[e],
      c = e === r.length - 1,
      l = a === `/` ? t : t.slice(a.length) || `/`,
      u = {
        path: s.relativePath,
        caseSensitive: s.caseSensitive,
        end: c,
      },
      d = s.matcher && s.compiledParams ? ve(u, l, s.matcher, s.compiledParams) : _e(u, l),
      f = s.route;
    if (
      (!d &&
        c &&
        n &&
        !r[r.length - 1].route.index &&
        (d = _e(
          {
            path: s.relativePath,
            caseSensitive: s.caseSensitive,
            end: !1,
          },
          l,
        )),
      !d)
    )
      return null;
    (Object.assign(i, d.params),
      o.push({
        params: i,
        pathname: we([a, d.pathname]),
        pathnameBase: Ee(we([a, d.pathnameBase])),
        route: f,
      }),
      d.pathnameBase !== `/` && (a = we([a, d.pathnameBase])));
  }
  return o;
}
function _e(e, t) {
  typeof e == `string` &&
    (e = {
      path: e,
      caseSensitive: !1,
      end: !0,
    });
  let [n, r] = z(e.path, e.caseSensitive, e.end);
  return ve(e, t, n, r);
}
function ve(e, t, n, r) {
  let i = t.match(n);
  if (!i) return null;
  let a = i[0],
    o = a.replace(/(.)\/+$/, `$1`),
    s = i.slice(1);
  return {
    params: r.reduce((e, { paramName: t, isOptional: n }, r) => {
      if (t === `*`) {
        let e = s[r] || ``;
        o = a.slice(0, a.length - e.length).replace(/(.)\/+$/, `$1`);
      }
      let i = s[r];
      return ((e[t] = n && !i ? void 0 : (i || ``).replace(/%2F/g, `/`)), e);
    }, {}),
    pathname: a,
    pathnameBase: o,
    pattern: e,
  };
}
function z(e, t = !1, n = !0) {
  M(
    e === `*` || !e.endsWith(`*`) || e.endsWith(`/*`),
    `Route path "${e}" will be treated as if it were "${e.replace(/\*$/, `/*`)}" because the \`*\` character must always follow a \`/\` in the pattern. To get rid of this warning, please change the route path to "${e.replace(/\*$/, `/*`)}".`,
  );
  let r = [],
    i =
      `^` +
      e
        .replace(/\/*\*?$/, ``)
        .replace(/^\/*/, `/`)
        .replace(/[\\.*+^${}|()[\]]/g, `\\$&`)
        .replace(/\/:([\w-]+)(\?)?/g, (e, t, n, i, a) => {
          if (
            (r.push({
              paramName: t,
              isOptional: n != null,
            }),
            n)
          ) {
            let t = a.charAt(i + e.length);
            return t && t !== `/` ? `/([^\\/]*)` : `(?:/([^\\/]*))?`;
          }
          return `/([^\\/]+)`;
        })
        .replace(/\/([\w-]+)\?(\/|$)/g, `(/$1)?$2`);
  return (
    e.endsWith(`*`)
      ? (r.push({
          paramName: `*`,
        }),
        (i += e === `*` || e === `/*` ? `(.*)$` : `(?:\\/(.+)|\\/*)$`))
      : n
        ? (i += `\\/*$`)
        : e !== `` && e !== `/` && (i += `(?:(?=\\/|$))`),
    [new RegExp(i, t ? void 0 : `i`), r]
  );
}
function ye(e) {
  try {
    return e
      .split(`/`)
      .map((e) => decodeURIComponent(e).replace(/\//g, `%2F`))
      .join(`/`);
  } catch (t) {
    return (
      M(
        !1,
        `The URL path "${e}" could not be decoded because it is a malformed URL segment. This is probably due to a bad percent encoding (${t}).`,
      ),
      e
    );
  }
}
function B(e, t) {
  if (t === `/`) return e;
  if (!e.toLowerCase().startsWith(t.toLowerCase())) return null;
  let n = t.endsWith(`/`) ? t.length - 1 : t.length,
    r = e.charAt(n);
  return r && r !== `/` ? null : e.slice(n) || `/`;
}
function be(e, t = `/`) {
  let { pathname: n, search: r = ``, hash: i = `` } = typeof e == `string` ? ee(e) : e,
    a;
  return (
    n ? ((n = Ce(n)), (a = n.startsWith(`/`) ? V(n.substring(1), `/`) : V(n, t))) : (a = t),
    {
      pathname: a,
      search: De(r),
      hash: Oe(i),
    }
  );
}
function V(e, t) {
  let n = Te(t).split(`/`);
  return (
    e.split(`/`).forEach((e) => {
      e === `..` ? n.length > 1 && n.pop() : e !== `.` && n.push(e);
    }),
    n.length > 1 ? n.join(`/`) : `/`
  );
}
function xe(e, t, n, r) {
  return `Cannot include a '${e}' character in a manually specified \`to.${t}\` field [${JSON.stringify(r)}].  Please separate it out to the \`to.${n}\` field. Alternatively you may provide the full path as a string in <Link to="..."> and the router will parse it for you.`;
}
function H(e) {
  return e.filter((e, t) => t === 0 || (e.route.path && e.route.path.length > 0));
}
function U(e) {
  let t = H(e);
  return t.map((e, n) => (n === t.length - 1 ? e.pathname : e.pathnameBase));
}
function Se(e, t, n, r = !1) {
  let i;
  typeof e == `string`
    ? (i = ee(e))
    : ((i = {
        ...e,
      }),
      j(!i.pathname || !i.pathname.includes(`?`), xe(`?`, `pathname`, `search`, i)),
      j(!i.pathname || !i.pathname.includes(`#`), xe(`#`, `pathname`, `hash`, i)),
      j(!i.search || !i.search.includes(`#`), xe(`#`, `search`, `hash`, i)));
  let a = e === `` || i.pathname === ``,
    o = a ? `/` : i.pathname,
    s;
  if (o == null) s = n;
  else {
    let e = t.length - 1;
    if (!r && o.startsWith(`..`)) {
      let t = o.split(`/`);
      for (; t[0] === `..`;) (t.shift(), --e);
      i.pathname = t.join(`/`);
    }
    s = e >= 0 ? t[e] : `/`;
  }
  let c = be(i, s),
    l = o && o !== `/` && o.endsWith(`/`),
    u = (a || o === `.`) && n.endsWith(`/`);
  return (!c.pathname.endsWith(`/`) && (l || u) && (c.pathname += `/`), c);
}
var Ce = (e) => e.replace(/[\\/]{2,}/g, `/`),
  we = (e) => Ce(e.join(`/`)),
  Te = (e) => e.replace(/\/+$/, ``),
  Ee = (e) => Te(e).replace(/^\/*/, `/`),
  De = (e) => (!e || e === `?` ? `` : e.startsWith(`?`) ? e : `?` + e),
  Oe = (e) => (!e || e === `#` ? `` : e.startsWith(`#`) ? e : `#` + e),
  ke = class {
    constructor(e, t, n, r = !1) {
      ((this.status = e),
        (this.statusText = t || ``),
        (this.internal = r),
        n instanceof Error ? ((this.data = n.toString()), (this.error = n)) : (this.data = n));
    }
  };
function Ae(e) {
  return (
    e != null &&
    typeof e.status == `number` &&
    typeof e.statusText == `string` &&
    typeof e.internal == `boolean` &&
    `data` in e
  );
}
function je(e) {
  return we(e.map((e) => e.route.path).filter(Boolean)) || `/`;
}
var Me =
  typeof window < `u` && window.document !== void 0 && window.document.createElement !== void 0;
function Ne(e, t) {
  let n = e;
  if (typeof n != `string` || !T.test(n))
    return {
      absoluteURL: void 0,
      isExternal: !1,
      to: n,
    };
  let r = n,
    i = !1;
  if (Me)
    try {
      let e = new URL(window.location.href),
        r = E.test(n) ? new URL(D(n, e.protocol)) : new URL(n),
        a = B(r.pathname, t);
      r.origin === e.origin && a != null ? (n = a + r.search + r.hash) : (i = !0);
    } catch {
      M(
        !1,
        `<Link to="${n}"> contains an invalid URL which will probably break when clicked - please update to a valid URL path.`,
      );
    }
  return {
    absoluteURL: r,
    isExternal: i,
    to: n,
  };
}
Object.getOwnPropertyNames(Object.prototype).sort().join(`\0`);
var Pe = [`POST`, `PUT`, `PATCH`, `DELETE`];
new Set(Pe);
var Fe = [`GET`, ...Pe];
new Set(Fe);
var Ie = [
  `about:`,
  `blob:`,
  `chrome:`,
  `chrome-untrusted:`,
  `content:`,
  `data:`,
  `devtools:`,
  `file:`,
  `filesystem:`,
  `javascript:`,
];
function Le(e) {
  try {
    return Ie.includes(new URL(e).protocol);
  } catch {
    return !1;
  }
}
var Re = y.createContext(null);
Re.displayName = `DataRouter`;
var ze = y.createContext(null);
ze.displayName = `DataRouterState`;
var Be = y.createContext(!1);
function Ve() {
  return y.useContext(Be);
}
var He = y.createContext({
  isTransitioning: !1,
});
He.displayName = `ViewTransition`;
var Ue = y.createContext(new Map());
Ue.displayName = `Fetchers`;
var We = y.createContext(null);
We.displayName = `Await`;
var Ge = y.createContext(null);
Ge.displayName = `Navigation`;
var Ke = y.createContext(null);
Ke.displayName = `Location`;
var qe = y.createContext({
  outlet: null,
  matches: [],
  isDataRoute: !1,
});
qe.displayName = `Route`;
var Je = y.createContext(null);
Je.displayName = `RouteError`;
var Ye = `REACT_ROUTER_ERROR`,
  Xe = `REDIRECT`,
  Ze = `ROUTE_ERROR_RESPONSE`;
function Qe(e) {
  if (e.startsWith(`${Ye}:${Xe}:{`))
    try {
      let t = JSON.parse(e.slice(28));
      if (
        typeof t == `object` &&
        t &&
        typeof t.status == `number` &&
        typeof t.statusText == `string` &&
        typeof t.location == `string` &&
        typeof t.reloadDocument == `boolean` &&
        typeof t.replace == `boolean`
      )
        return t;
    } catch {}
}
function $e(e) {
  if (e.startsWith(`${Ye}:${Ze}:{`))
    try {
      let t = JSON.parse(e.slice(40));
      if (
        typeof t == `object` &&
        t &&
        typeof t.status == `number` &&
        typeof t.statusText == `string`
      )
        return new ke(t.status, t.statusText, t.data);
    } catch {}
}
function et(e, { relative: t } = {}) {
  j(tt(), `useHref() may be used only in the context of a <Router> component.`);
  let { basename: n, navigator: r } = y.useContext(Ge),
    {
      hash: i,
      pathname: a,
      search: o,
    } = st(e, {
      relative: t,
    }),
    s = a;
  return (
    n !== `/` && (s = a === `/` ? n : we([n, a])),
    r.createHref({
      pathname: s,
      search: o,
      hash: i,
    })
  );
}
function tt() {
  return y.useContext(Ke) != null;
}
function nt() {
  return (
    j(tt(), `useLocation() may be used only in the context of a <Router> component.`),
    y.useContext(Ke).location
  );
}
var rt = `You should call navigate() in a React.useEffect(), not when your component is first rendered.`;
function it(e) {
  y.useContext(Ge).static || y.useLayoutEffect(e);
}
function at() {
  let { isDataRoute: e } = y.useContext(qe);
  return e ? wt() : ot();
}
function ot() {
  j(tt(), `useNavigate() may be used only in the context of a <Router> component.`);
  let e = y.useContext(Re),
    { basename: t, navigator: n } = y.useContext(Ge),
    { matches: r } = y.useContext(qe),
    { pathname: i } = nt(),
    a = JSON.stringify(U(r)),
    o = y.useRef(!1);
  return (
    it(() => {
      o.current = !0;
    }),
    y.useCallback(
      (r, s = {}) => {
        if ((M(o.current, rt), !o.current)) return;
        if (typeof r == `number`) {
          n.go(r);
          return;
        }
        let c = Se(r, JSON.parse(a), i, s.relative === `path`);
        (e == null && t !== `/` && (c.pathname = c.pathname === `/` ? t : we([t, c.pathname])),
          (s.replace ? n.replace : n.push)(c, s.state, s));
      },
      [t, n, a, i, e],
    )
  );
}
y.createContext(null);
function st(e, { relative: t } = {}) {
  let { matches: n } = y.useContext(qe),
    { pathname: r } = nt(),
    i = JSON.stringify(U(n));
  return y.useMemo(() => Se(e, JSON.parse(i), r, t === `path`), [e, i, r, t]);
}
function ct(e, t) {
  return lt(e, t);
}
function lt(e, t, n) {
  j(tt(), `useRoutes() may be used only in the context of a <Router> component.`);
  let { navigator: r } = y.useContext(Ge),
    { matches: i } = y.useContext(qe),
    a = i[i.length - 1],
    o = a ? a.params : {},
    s = a ? a.pathname : `/`,
    c = a ? a.pathnameBase : `/`,
    l = a && a.route;
  {
    let e = (l && l.path) || ``;
    Et(
      s,
      !l || e.endsWith(`*`) || e.endsWith(`*?`),
      `You rendered descendant <Routes> (or called \`useRoutes()\`) at "${s}" (under <Route path="${e}">) but the parent route path has no trailing "*". This means if you navigate deeper, the parent won't match anymore and therefore the child routes will never render.

Please change the parent <Route path="${e}"> to <Route path="${e === `/` ? `*` : `${e}/*`}">.`,
    );
  }
  let u = nt(),
    d;
  if (t) {
    let e = typeof t == `string` ? ee(t) : t;
    (j(
      c === `/` || e.pathname?.startsWith(c),
      `When overriding the location using \`<Routes location>\` or \`useRoutes(routes, location)\`, the location pathname must begin with the portion of the URL pathname that was matched by all parent routes. The current pathname base is "${c}" but pathname "${e.pathname}" was given in the \`location\` prop.`,
    ),
      (d = e));
  } else d = u;
  let f = d.pathname || `/`,
    p = f;
  if (c !== `/`) {
    let e = c.replace(/^\//, ``).split(`/`);
    p = `/` + f.replace(/^\//, ``).split(`/`).slice(e.length).join(`/`);
  }
  let m =
    n && n.state.matches.length
      ? n.state.matches.map((e) =>
          Object.assign(e, {
            route: n.manifest[e.route.id] || e.route,
          }),
        )
      : ne(e, {
          pathname: p,
        });
  (M(l || m != null, `No routes matched location "${d.pathname}${d.search}${d.hash}" `),
    M(
      m == null ||
        m[m.length - 1].route.element !== void 0 ||
        m[m.length - 1].route.Component !== void 0 ||
        m[m.length - 1].route.lazy !== void 0,
      `Matched leaf route at location "${d.pathname}${d.search}${d.hash}" does not have an element or Component. This means it will render an <Outlet /> with a null value by default resulting in an "empty" page.`,
    ));
  let h = gt(
    m &&
      m.map((e) =>
        Object.assign({}, e, {
          params: Object.assign({}, o, e.params),
          pathname: we([
            c,
            r.encodeLocation
              ? r.encodeLocation(
                  e.pathname.replace(/%/g, `%25`).replace(/\?/g, `%3F`).replace(/#/g, `%23`),
                ).pathname
              : e.pathname,
          ]),
          pathnameBase:
            e.pathnameBase === `/`
              ? c
              : we([
                  c,
                  r.encodeLocation
                    ? r.encodeLocation(
                        e.pathnameBase
                          .replace(/%/g, `%25`)
                          .replace(/\?/g, `%3F`)
                          .replace(/#/g, `%23`),
                      ).pathname
                    : e.pathnameBase,
                ]),
        }),
      ),
    i,
    n,
  );
  return t && h
    ? y.createElement(
        Ke.Provider,
        {
          value: {
            location: {
              pathname: `/`,
              search: ``,
              hash: ``,
              state: null,
              key: `default`,
              mask: void 0,
              ...d,
            },
            navigationType: `POP`,
          },
        },
        h,
      )
    : h;
}
function ut() {
  let e = Ct(),
    t = Ae(e) ? `${e.status} ${e.statusText}` : e instanceof Error ? e.message : JSON.stringify(e),
    n = e instanceof Error ? e.stack : null,
    r = `rgba(200,200,200, 0.5)`,
    i = {
      padding: `0.5rem`,
      backgroundColor: r,
    },
    a = {
      padding: `2px 4px`,
      backgroundColor: r,
    },
    o = null;
  return (
    console.error(`Error handled by React Router default ErrorBoundary:`, e),
    (o = y.createElement(
      y.Fragment,
      null,
      y.createElement(`p`, null, `💿 Hey developer 👋`),
      y.createElement(
        `p`,
        null,
        `You can provide a way better UX than this when your app throws errors by providing your own `,
        y.createElement(
          `code`,
          {
            style: a,
          },
          `ErrorBoundary`,
        ),
        ` or`,
        ` `,
        y.createElement(
          `code`,
          {
            style: a,
          },
          `errorElement`,
        ),
        ` prop on your route.`,
      ),
    )),
    y.createElement(
      y.Fragment,
      null,
      y.createElement(`h2`, null, `Unexpected Application Error!`),
      y.createElement(
        `h3`,
        {
          style: {
            fontStyle: `italic`,
          },
        },
        t,
      ),
      n
        ? y.createElement(
            `pre`,
            {
              style: i,
            },
            n,
          )
        : null,
      o,
    )
  );
}
var dt = y.createElement(ut, null),
  ft = class extends y.Component {
    constructor(e) {
      (super(e),
        (this.state = {
          location: e.location,
          revalidation: e.revalidation,
          error: e.error,
        }));
    }
    static getDerivedStateFromError(e) {
      return {
        error: e,
      };
    }
    static getDerivedStateFromProps(e, t) {
      return t.location !== e.location || (t.revalidation !== `idle` && e.revalidation === `idle`)
        ? {
            error: e.error,
            location: e.location,
            revalidation: e.revalidation,
          }
        : {
            error: e.error === void 0 ? t.error : e.error,
            location: t.location,
            revalidation: e.revalidation || t.revalidation,
          };
    }
    componentDidCatch(e, t) {
      this.props.onError
        ? this.props.onError(e, t)
        : console.error(`React Router caught the following error during render`, e);
    }
    render() {
      let e = this.state.error;
      if (
        this.context &&
        typeof e == `object` &&
        e &&
        `digest` in e &&
        typeof e.digest == `string`
      ) {
        let t = $e(e.digest);
        t && (e = t);
      }
      let t =
        e === void 0
          ? this.props.children
          : y.createElement(
              qe.Provider,
              {
                value: this.props.routeContext,
              },
              y.createElement(Je.Provider, {
                value: e,
                children: this.props.component,
              }),
            );
      return this.context
        ? y.createElement(
            mt,
            {
              error: e,
            },
            t,
          )
        : t;
    }
  };
ft.contextType = Be;
var pt = new WeakMap();
function mt({ children: e, error: t }) {
  let { basename: n } = y.useContext(Ge);
  if (typeof t == `object` && t && `digest` in t && typeof t.digest == `string`) {
    let e = Qe(t.digest);
    if (e) {
      let r = pt.get(t);
      if (r) throw r;
      let i = Ne(e.location, n),
        a = i.absoluteURL || i.to;
      if (Le(a)) throw Error(`Invalid redirect location`);
      if (Me && !pt.get(t)) {
        if (i.isExternal || e.reloadDocument) window.location.href = a;
        else {
          let n = Promise.resolve().then(() =>
            window.__reactRouterDataRouter.navigate(i.to, {
              replace: e.replace,
            }),
          );
          throw (pt.set(t, n), n);
        }
      }
      return y.createElement(`meta`, {
        httpEquiv: `refresh`,
        content: `0;url=${a}`,
      });
    }
  }
  return e;
}
function ht({ routeContext: e, match: t, children: n }) {
  let r = y.useContext(Re);
  return (
    r &&
      r.static &&
      r.staticContext &&
      (t.route.errorElement || t.route.ErrorBoundary) &&
      (r.staticContext._deepestRenderedBoundaryId = t.route.id),
    y.createElement(
      qe.Provider,
      {
        value: e,
      },
      n,
    )
  );
}
function gt(e, t = [], n) {
  let r = n?.state;
  if (e == null) {
    if (!r) return null;
    if (r.errors) e = r.matches;
    else if (t.length === 0 && !r.initialized && r.matches.length > 0) e = r.matches;
    else return null;
  }
  let i = e,
    a = r?.errors;
  if (a != null) {
    let e = i.findIndex((e) => e.route.id && a?.[e.route.id] !== void 0);
    (j(
      e >= 0,
      `Could not find a matching route for errors on route IDs: ${Object.keys(a).join(`,`)}`,
    ),
      (i = i.slice(0, Math.min(i.length, e + 1))));
  }
  let o = !1,
    s = -1;
  if (n && r) {
    o = r.renderFallback;
    for (let e = 0; e < i.length; e++) {
      let t = i[e];
      if (((t.route.HydrateFallback || t.route.hydrateFallbackElement) && (s = e), t.route.id)) {
        let { loaderData: e, errors: a } = r,
          c = t.route.loader && !e.hasOwnProperty(t.route.id) && (!a || a[t.route.id] === void 0);
        if (t.route.lazy || c) {
          (n.isStatic && (o = !0), (i = s >= 0 ? i.slice(0, s + 1) : [i[0]]));
          break;
        }
      }
    }
  }
  let c = n?.onError,
    l =
      r && c
        ? (e, t) => {
            c(e, {
              location: r.location,
              params: r.matches?.[0]?.params ?? {},
              pattern: je(r.matches),
              errorInfo: t,
            });
          }
        : void 0;
  return i.reduceRight((e, n, c) => {
    let u,
      d = !1,
      f = null,
      p = null;
    r &&
      ((u = a && n.route.id ? a[n.route.id] : void 0),
      (f = n.route.errorElement || dt),
      o &&
        (s < 0 && c === 0
          ? (Et(
              `route-fallback`,
              !1,
              'No `HydrateFallback` element provided to render during initial hydration',
            ),
            (d = !0),
            (p = null))
          : s === c && ((d = !0), (p = n.route.hydrateFallbackElement || null))));
    let m = t.concat(i.slice(0, c + 1)),
      h = () => {
        let t;
        return (
          (t = u
            ? f
            : d
              ? p
              : n.route.Component
                ? y.createElement(n.route.Component, null)
                : n.route.element
                  ? n.route.element
                  : e),
          y.createElement(ht, {
            match: n,
            routeContext: {
              outlet: e,
              matches: m,
              isDataRoute: r != null,
            },
            children: t,
          })
        );
      };
    return r && (n.route.ErrorBoundary || n.route.errorElement || c === 0)
      ? y.createElement(ft, {
          location: r.location,
          revalidation: r.revalidation,
          component: f,
          error: u,
          children: h(),
          routeContext: {
            outlet: null,
            matches: m,
            isDataRoute: !0,
          },
          onError: l,
        })
      : h();
  }, null);
}
function _t(e) {
  return `${e} must be used within a data router.  See https://reactrouter.com/en/main/routers/picking-a-router.`;
}
function vt(e) {
  let t = y.useContext(Re);
  return (j(t, _t(e)), t);
}
function yt(e) {
  let t = y.useContext(ze);
  return (j(t, _t(e)), t);
}
function bt(e) {
  let t = y.useContext(qe);
  return (j(t, _t(e)), t);
}
function xt(e) {
  let t = bt(e),
    n = t.matches[t.matches.length - 1];
  return (j(n.route.id, `${e} can only be used on routes that contain a unique "id"`), n.route.id);
}
function St() {
  return xt(`useRouteId`);
}
function Ct() {
  let e = y.useContext(Je),
    t = yt(`useRouteError`),
    n = xt(`useRouteError`);
  return e === void 0 ? t.errors?.[n] : e;
}
function wt() {
  let { router: e } = vt(`useNavigate`),
    t = xt(`useNavigate`),
    n = y.useRef(!1);
  return (
    it(() => {
      n.current = !0;
    }),
    y.useCallback(
      async (r, i = {}) => {
        (M(n.current, rt),
          n.current &&
            (typeof r == `number`
              ? await e.navigate(r)
              : await e.navigate(r, {
                  fromRouteId: t,
                  ...i,
                })));
      },
      [e, t],
    )
  );
}
var Tt = {};
function Et(e, t, n) {
  !t && !Tt[e] && ((Tt[e] = !0), M(!1, n));
}
y.memo(Dt);
function Dt({ routes: e, manifest: t, future: n, state: r, isStatic: i, onError: a }) {
  return lt(e, void 0, {
    manifest: t,
    state: r,
    isStatic: i,
    onError: a,
    future: n,
  });
}
function Ot({ to: e, replace: t, state: n, relative: r }) {
  j(tt(), `<Navigate> may be used only in the context of a <Router> component.`);
  let { static: i } = y.useContext(Ge);
  M(
    !i,
    `<Navigate> must not be used on the initial render in a <StaticRouter>. This is a no-op, but you should modify your code so the <Navigate> is only ever rendered in response to some user interaction or state change.`,
  );
  let { matches: a } = y.useContext(qe),
    { pathname: o } = nt(),
    s = at(),
    c = Se(e, U(a), o, r === `path`),
    l = JSON.stringify(c);
  return (
    y.useEffect(() => {
      s(JSON.parse(l), {
        replace: t,
        state: n,
        relative: r,
      });
    }, [s, l, r, t, n]),
    null
  );
}
function kt(e) {
  j(
    !1,
    `A <Route> is only ever to be used as the child of <Routes> element, never rendered directly. Please wrap your <Route> in a <Routes>.`,
  );
}
function At({
  basename: e = `/`,
  children: t = null,
  location: n,
  navigationType: r = `POP`,
  navigator: i,
  static: a = !1,
  useTransitions: o,
}) {
  j(
    !tt(),
    `You cannot render a <Router> inside another <Router>. You should never have more than one in your app.`,
  );
  let s = e.replace(/^\/*/, `/`),
    c = y.useMemo(
      () => ({
        basename: s,
        navigator: i,
        static: a,
        useTransitions: o,
        future: {},
      }),
      [s, i, a, o],
    );
  typeof n == `string` && (n = ee(n));
  let {
      pathname: l = `/`,
      search: u = ``,
      hash: d = ``,
      state: f = null,
      key: p = `default`,
      mask: m,
    } = n,
    h = y.useMemo(() => {
      let e = B(l, s);
      return e == null
        ? null
        : {
            location: {
              pathname: e,
              search: u,
              hash: d,
              state: f,
              key: p,
              mask: m,
            },
            navigationType: r,
          };
    }, [s, l, u, d, f, p, r, m]);
  return (
    M(
      h != null,
      `<Router basename="${s}"> is not able to match the URL "${l}${u}${d}" because it does not start with the basename, so the <Router> won't render anything.`,
    ),
    h == null
      ? null
      : y.createElement(
          Ge.Provider,
          {
            value: c,
          },
          y.createElement(Ke.Provider, {
            children: t,
            value: h,
          }),
        )
  );
}
function jt({ children: e, location: t }) {
  return ct(Mt(e), t);
}
y.Component;
function Mt(e, t = []) {
  let n = [];
  return (
    y.Children.forEach(e, (e, r) => {
      if (!y.isValidElement(e)) return;
      let i = [...t, r];
      if (e.type === y.Fragment) {
        n.push.apply(n, Mt(e.props.children, i));
        return;
      }
      (j(
        e.type === kt,
        `[${typeof e.type == `string` ? e.type : e.type.name}] is not a <Route> component. All component children of <Routes> must be a <Route> or <React.Fragment>`,
      ),
        j(!e.props.index || !e.props.children, `An index route cannot have child routes.`));
      let a = {
        id: e.props.id || i.join(`-`),
        caseSensitive: e.props.caseSensitive,
        element: e.props.element,
        Component: e.props.Component,
        index: e.props.index,
        path: e.props.path,
        middleware: e.props.middleware,
        loader: e.props.loader,
        action: e.props.action,
        hydrateFallbackElement: e.props.hydrateFallbackElement,
        HydrateFallback: e.props.HydrateFallback,
        errorElement: e.props.errorElement,
        ErrorBoundary: e.props.ErrorBoundary,
        hasErrorBoundary:
          e.props.hasErrorBoundary === !0 ||
          e.props.ErrorBoundary != null ||
          e.props.errorElement != null,
        shouldRevalidate: e.props.shouldRevalidate,
        handle: e.props.handle,
        lazy: e.props.lazy,
      };
      (e.props.children && (a.children = Mt(e.props.children, i)), n.push(a));
    }),
    n
  );
}
var Nt = `get`,
  Pt = `application/x-www-form-urlencoded`;
function Ft(e) {
  return typeof HTMLElement < `u` && e instanceof HTMLElement;
}
function It(e) {
  return Ft(e) && e.tagName.toLowerCase() === `button`;
}
function Lt(e) {
  return Ft(e) && e.tagName.toLowerCase() === `form`;
}
function Rt(e) {
  return Ft(e) && e.tagName.toLowerCase() === `input`;
}
function zt(e) {
  return !!(e.metaKey || e.altKey || e.ctrlKey || e.shiftKey);
}
function Bt(e, t) {
  return e.button === 0 && (!t || t === `_self`) && !zt(e);
}
var Vt = null;
function Ht() {
  if (Vt === null)
    try {
      (new FormData(document.createElement(`form`), 0), (Vt = !1));
    } catch {
      Vt = !0;
    }
  return Vt;
}
var Ut = new Set([`application/x-www-form-urlencoded`, `multipart/form-data`, `text/plain`]);
function Wt(e) {
  return e != null && !Ut.has(e)
    ? (M(
        !1,
        `"${e}" is not a valid \`encType\` for \`<Form>\`/\`<fetcher.Form>\` and will default to "${Pt}"`,
      ),
      null)
    : e;
}
function Gt(e, t) {
  let n, r, i, a, o;
  if (Lt(e)) {
    let o = e.getAttribute(`action`);
    ((r = o ? B(o, t) : null),
      (n = e.getAttribute(`method`) || Nt),
      (i = Wt(e.getAttribute(`enctype`)) || Pt),
      (a = new FormData(e)));
  } else if (It(e) || (Rt(e) && (e.type === `submit` || e.type === `image`))) {
    let o = e.form;
    if (o == null)
      throw Error(`Cannot submit a <button> or <input type="submit"> without a <form>`);
    let s = e.getAttribute(`formaction`) || o.getAttribute(`action`);
    if (
      ((r = s ? B(s, t) : null),
      (n = e.getAttribute(`formmethod`) || o.getAttribute(`method`) || Nt),
      (i = Wt(e.getAttribute(`formenctype`)) || Wt(o.getAttribute(`enctype`)) || Pt),
      (a = new FormData(o, e)),
      !Ht())
    ) {
      let { name: t, type: n, value: r } = e;
      if (n === `image`) {
        let e = t ? `${t}.` : ``;
        (a.append(`${e}x`, `0`), a.append(`${e}y`, `0`));
      } else t && a.append(t, r);
    }
  } else if (Ft(e))
    throw Error(
      `Cannot submit element that is not <form>, <button>, or <input type="submit|image">`,
    );
  else ((n = Nt), (r = null), (i = Pt), (o = e));
  return (
    a && i === `text/plain` && ((o = a), (a = void 0)),
    {
      action: r,
      method: n.toLowerCase(),
      encType: i,
      formData: a,
      body: o,
    }
  );
}
Object.getOwnPropertyNames(Object.prototype).sort().join(`\0`);
function Kt(e, t) {
  if (e === !1 || e == null) throw Error(t);
}
function qt(e, t, n, r) {
  let i =
    typeof e == `string`
      ? new URL(e, typeof window > `u` ? `server://singlefetch/` : window.location.origin)
      : e;
  return (
    (i.pathname = n
      ? i.pathname.endsWith(`/`)
        ? `${i.pathname}_.${r}`
        : `${i.pathname}.${r}`
      : i.pathname === `/`
        ? `_root.${r}`
        : t && B(i.pathname, t) === `/`
          ? `${Te(t)}/_root.${r}`
          : `${Te(i.pathname)}.${r}`),
    i
  );
}
async function Jt(e, t) {
  if (e.id in t) return t[e.id];
  try {
    let n = await w(() => import(e.module), []);
    return ((t[e.id] = n), n);
  } catch (t) {
    return (
      console.error(`Error loading route module \`${e.module}\`, reloading page...`),
      console.error(t),
      window.__reactRouterContext && window.__reactRouterContext.isSpaMode,
      window.location.reload(),
      new Promise(() => {})
    );
  }
}
function Yt(e) {
  return e != null && typeof e.page == `string`;
}
function Xt(e) {
  return e == null
    ? !1
    : e.href == null
      ? e.rel === `preload` && typeof e.imageSrcSet == `string` && typeof e.imageSizes == `string`
      : typeof e.rel == `string` && typeof e.href == `string`;
}
async function Zt(e, t, n) {
  return nn(
    (
      await Promise.all(
        e.map(async (e) => {
          let r = t.routes[e.route.id];
          if (r) {
            let e = await Jt(r, n);
            return e.links ? e.links() : [];
          }
          return [];
        }),
      )
    )
      .flat(1)
      .filter(Xt)
      .filter((e) => e.rel === `stylesheet` || e.rel === `preload`)
      .map((e) =>
        e.rel === `stylesheet`
          ? {
              ...e,
              rel: `prefetch`,
              as: `style`,
            }
          : {
              ...e,
              rel: `prefetch`,
            },
      ),
  );
}
function Qt(e, t, n, r, i, a) {
  let o = (e, t) => !n[t] || e.route.id !== n[t].route.id,
    s = (e, t) =>
      n[t].pathname !== e.pathname ||
      (n[t].route.path?.endsWith(`*`) && n[t].params[`*`] !== e.params[`*`]);
  return a === `assets`
    ? t.filter((e, t) => o(e, t) || s(e, t))
    : a === `data`
      ? t.filter((t, a) => {
          let c = r.routes[t.route.id];
          if (!c || !c.hasLoader) return !1;
          if (o(t, a) || s(t, a)) return !0;
          if (t.route.shouldRevalidate) {
            let r = t.route.shouldRevalidate({
              currentUrl: new URL(i.pathname + i.search + i.hash, window.origin),
              currentParams: n[0]?.params || {},
              nextUrl: new URL(e, window.origin),
              nextParams: t.params,
              defaultShouldRevalidate: !0,
            });
            if (typeof r == `boolean`) return r;
          }
          return !0;
        })
      : [];
}
function $t(e, t, { includeHydrateFallback: n } = {}) {
  return en(
    e
      .map((e) => {
        let r = t.routes[e.route.id];
        if (!r) return [];
        let i = [r.module];
        return (
          r.clientActionModule && (i = i.concat(r.clientActionModule)),
          r.clientLoaderModule && (i = i.concat(r.clientLoaderModule)),
          n && r.hydrateFallbackModule && (i = i.concat(r.hydrateFallbackModule)),
          r.imports && (i = i.concat(r.imports)),
          i
        );
      })
      .flat(1),
  );
}
function en(e) {
  return [...new Set(e)];
}
function tn(e) {
  let t = {},
    n = Object.keys(e).sort();
  for (let r of n) t[r] = e[r];
  return t;
}
function nn(e, t) {
  let n = new Set(),
    r = new Set(t);
  return e.reduce((e, i) => {
    if (t && !Yt(i) && i.as === `script` && i.href && r.has(i.href)) return e;
    let a = JSON.stringify(tn(i));
    return (
      n.has(a) ||
        (n.add(a),
        e.push({
          key: a,
          link: i,
        })),
      e
    );
  }, []);
}
function rn() {
  let e = y.useContext(Re);
  return (Kt(e, `You must render this element inside a <DataRouterContext.Provider> element`), e);
}
function an() {
  let e = y.useContext(ze);
  return (
    Kt(e, `You must render this element inside a <DataRouterStateContext.Provider> element`),
    e
  );
}
var on = y.createContext(void 0);
on.displayName = `FrameworkContext`;
function sn() {
  let e = y.useContext(on);
  return (Kt(e, `You must render this element inside a <HydratedRouter> element`), e);
}
function cn(e, t) {
  let n = y.useContext(on),
    [r, i] = y.useState(!1),
    [a, o] = y.useState(!1),
    { onFocus: s, onBlur: c, onMouseEnter: l, onMouseLeave: u, onTouchStart: d } = t,
    f = y.useRef(null);
  (y.useEffect(() => {
    if ((e === `render` && o(!0), e === `viewport`)) {
      let e = new IntersectionObserver(
        (e) => {
          e.forEach((e) => {
            o(e.isIntersecting);
          });
        },
        {
          threshold: 0.5,
        },
      );
      return (
        f.current && e.observe(f.current),
        () => {
          e.disconnect();
        }
      );
    }
  }, [e]),
    y.useEffect(() => {
      if (r) {
        let e = setTimeout(() => {
          o(!0);
        }, 100);
        return () => {
          clearTimeout(e);
        };
      }
    }, [r]));
  let p = () => {
      i(!0);
    },
    m = () => {
      (i(!1), o(!1));
    };
  return n
    ? e === `intent`
      ? [
          a,
          f,
          {
            onFocus: ln(s, p),
            onBlur: ln(c, m),
            onMouseEnter: ln(l, p),
            onMouseLeave: ln(u, m),
            onTouchStart: ln(d, p),
          },
        ]
      : [a, f, {}]
    : [!1, f, {}];
}
function ln(e, t) {
  return (n) => {
    (e && e(n), n.defaultPrevented || t(n));
  };
}
function un({ page: e, ...t }) {
  let n = Ve(),
    { nonce: r } = sn(),
    { router: i } = rn(),
    a = y.useMemo(() => ne(i.routes, e, i.basename), [i.routes, e, i.basename]);
  return a
    ? (t.nonce == null &&
        r &&
        (t = {
          ...t,
          nonce: r,
        }),
      n
        ? y.createElement(fn, {
            page: e,
            matches: a,
            ...t,
          })
        : y.createElement(pn, {
            page: e,
            matches: a,
            ...t,
          }))
    : null;
}
function dn(e) {
  let { manifest: t, routeModules: n } = sn(),
    [r, i] = y.useState([]);
  return (
    y.useEffect(() => {
      let r = !1;
      return (
        Zt(e, t, n).then((e) => {
          r || i(e);
        }),
        () => {
          r = !0;
        }
      );
    }, [e, t, n]),
    r
  );
}
function fn({ page: e, matches: t, ...n }) {
  let r = nt(),
    { future: i } = sn(),
    { basename: a } = rn(),
    o = y.useMemo(() => {
      if (e === r.pathname + r.search + r.hash) return [];
      let n = qt(e, a, i.v8_trailingSlashAwareDataRequests, `rsc`),
        o = !1,
        s = [];
      for (let e of t)
        typeof e.route.shouldRevalidate == `function` ? (o = !0) : s.push(e.route.id);
      return (
        o && s.length > 0 && n.searchParams.set(`_routes`, s.join(`,`)),
        [n.pathname + n.search]
      );
    }, [a, i.v8_trailingSlashAwareDataRequests, e, r, t]);
  return y.createElement(
    y.Fragment,
    null,
    o.map((e) =>
      y.createElement(`link`, {
        key: e,
        rel: `prefetch`,
        as: `fetch`,
        href: e,
        ...n,
      }),
    ),
  );
}
function pn({ page: e, matches: t, ...n }) {
  let r = nt(),
    { future: i, manifest: a, routeModules: o } = sn(),
    { basename: s } = rn(),
    { loaderData: c, matches: l } = an(),
    u = y.useMemo(() => Qt(e, t, l, a, r, `data`), [e, t, l, a, r]),
    d = y.useMemo(() => Qt(e, t, l, a, r, `assets`), [e, t, l, a, r]),
    f = y.useMemo(() => {
      if (e === r.pathname + r.search + r.hash) return [];
      let n = new Set(),
        l = !1;
      if (
        (t.forEach((e) => {
          let t = a.routes[e.route.id];
          !t ||
            !t.hasLoader ||
            ((!u.some((t) => t.route.id === e.route.id) &&
              e.route.id in c &&
              o[e.route.id]?.shouldRevalidate) ||
            t.hasClientLoader
              ? (l = !0)
              : n.add(e.route.id));
        }),
        n.size === 0)
      )
        return [];
      let d = qt(e, s, i.v8_trailingSlashAwareDataRequests, `data`);
      return (
        l &&
          n.size > 0 &&
          d.searchParams.set(
            `_routes`,
            t
              .filter((e) => n.has(e.route.id))
              .map((e) => e.route.id)
              .join(`,`),
          ),
        [d.pathname + d.search]
      );
    }, [s, i.v8_trailingSlashAwareDataRequests, c, r, a, u, t, e, o]),
    p = y.useMemo(() => $t(d, a), [d, a]),
    m = dn(d);
  return y.createElement(
    y.Fragment,
    null,
    f.map((e) =>
      y.createElement(`link`, {
        key: e,
        rel: `prefetch`,
        as: `fetch`,
        href: e,
        ...n,
      }),
    ),
    p.map((e) =>
      y.createElement(`link`, {
        key: e,
        rel: `modulepreload`,
        href: e,
        ...n,
      }),
    ),
    m.map(({ key: e, link: t }) =>
      y.createElement(`link`, {
        key: e,
        nonce: n.nonce,
        ...t,
        crossOrigin: t.crossOrigin ?? n.crossOrigin,
      }),
    ),
  );
}
function mn(...e) {
  return (t) => {
    e.forEach((e) => {
      typeof e == `function` ? e(t) : e != null && (e.current = t);
    });
  };
}
y.Component;
var hn =
  typeof window < `u` && window.document !== void 0 && window.document.createElement !== void 0;
try {
  hn && (window.__reactRouterVersion = `7.18.2`);
} catch {}
function gn({ basename: e, children: t, useTransitions: n, window: r }) {
  let i = y.useRef();
  i.current ??= A({
    window: r,
    v5Compat: !0,
  });
  let a = i.current,
    [o, s] = y.useState({
      action: a.action,
      location: a.location,
    }),
    c = y.useCallback(
      (e) => {
        n === !1 ? s(e) : y.startTransition(() => s(e));
      },
      [n],
    );
  return (
    y.useLayoutEffect(() => a.listen(c), [a, c]),
    y.createElement(At, {
      basename: e,
      children: t,
      location: o.location,
      navigationType: o.action,
      navigator: a,
      useTransitions: n,
    })
  );
}
var _n = y.forwardRef(function (
  {
    onClick: e,
    discover: t = `render`,
    prefetch: n = `none`,
    relative: r,
    reloadDocument: i,
    replace: a,
    mask: o,
    state: s,
    target: c,
    to: l,
    preventScrollReset: u,
    viewTransition: d,
    defaultShouldRevalidate: f,
    ...p
  },
  m,
) {
  let { basename: h, navigator: g, useTransitions: _ } = y.useContext(Ge),
    v = typeof l == `string` && T.test(l),
    b = Ne(l, h);
  l = b.to;
  let x = et(l, {
      relative: r,
    }),
    S = nt(),
    C = null;
  if (o) {
    let e = Se(o, [], S.mask ? S.mask.pathname : `/`, !0);
    (h !== `/` && (e.pathname = e.pathname === `/` ? h : we([h, e.pathname])),
      (C = g.createHref(e)));
  }
  let [w, E, D] = cn(n, p),
    O = Sn(l, {
      replace: a,
      mask: o,
      state: s,
      target: c,
      preventScrollReset: u,
      relative: r,
      viewTransition: d,
      defaultShouldRevalidate: f,
      useTransitions: _,
    });
  function k(t) {
    (e && e(t), t.defaultPrevented || O(t));
  }
  let A = !(b.isExternal || i),
    j = y.createElement(`a`, {
      ...p,
      ...D,
      href: (A ? C : void 0) || b.absoluteURL || x,
      onClick: A ? k : e,
      ref: mn(m, E),
      target: c,
      'data-discover': !v && t === `render` ? `true` : void 0,
    });
  return w && !v
    ? y.createElement(
        y.Fragment,
        null,
        j,
        y.createElement(un, {
          page: x,
        }),
      )
    : j;
});
_n.displayName = `Link`;
var vn = y.forwardRef(function (
  {
    'aria-current': e = `page`,
    caseSensitive: t = !1,
    className: n = ``,
    end: r = !1,
    style: i,
    to: a,
    viewTransition: o,
    children: s,
    ...c
  },
  l,
) {
  let u = st(a, {
      relative: c.relative,
    }),
    d = nt(),
    f = y.useContext(ze),
    { navigator: p, basename: m } = y.useContext(Ge),
    h = f != null && Dn(u) && o === !0,
    g = p.encodeLocation ? p.encodeLocation(u).pathname : u.pathname,
    _ = d.pathname,
    v = f && f.navigation && f.navigation.location ? f.navigation.location.pathname : null;
  (t || ((_ = _.toLowerCase()), (v = v ? v.toLowerCase() : null), (g = g.toLowerCase())),
    v && m && (v = B(v, m) || v));
  let b = g !== `/` && g.endsWith(`/`) ? g.length - 1 : g.length,
    x = _ === g || (!r && _.startsWith(g) && _.charAt(b) === `/`),
    S = v != null && (v === g || (!r && v.startsWith(g) && v.charAt(g.length) === `/`)),
    C = {
      isActive: x,
      isPending: S,
      isTransitioning: h,
    },
    w = x ? e : void 0,
    T;
  T =
    typeof n == `function`
      ? n(C)
      : [n, x ? `active` : null, S ? `pending` : null, h ? `transitioning` : null]
          .filter(Boolean)
          .join(` `);
  let E = typeof i == `function` ? i(C) : i;
  return y.createElement(
    _n,
    {
      ...c,
      'aria-current': w,
      className: T,
      ref: l,
      style: E,
      to: a,
      viewTransition: o,
    },
    typeof s == `function` ? s(C) : s,
  );
});
vn.displayName = `NavLink`;
var yn = y.forwardRef(
  (
    {
      discover: e = `render`,
      fetcherKey: t,
      navigate: n,
      reloadDocument: r,
      replace: i,
      state: a,
      method: o = Nt,
      action: s,
      onSubmit: c,
      relative: l,
      preventScrollReset: u,
      viewTransition: d,
      defaultShouldRevalidate: f,
      ...p
    },
    m,
  ) => {
    let { useTransitions: h } = y.useContext(Ge),
      g = Tn(),
      _ = En(s, {
        relative: l,
      }),
      v = o.toLowerCase() === `get` ? `get` : `post`,
      b = typeof s == `string` && T.test(s);
    return y.createElement(`form`, {
      ref: m,
      method: v,
      action: _,
      onSubmit: r
        ? c
        : (e) => {
            if ((c && c(e), e.defaultPrevented)) return;
            e.preventDefault();
            let r = e.nativeEvent.submitter,
              s = r?.getAttribute(`formmethod`) || o,
              p = () =>
                g(r || e.currentTarget, {
                  fetcherKey: t,
                  method: s,
                  navigate: n,
                  replace: i,
                  state: a,
                  relative: l,
                  preventScrollReset: u,
                  viewTransition: d,
                  defaultShouldRevalidate: f,
                });
            h && n !== !1 ? y.startTransition(() => p()) : p();
          },
      ...p,
      'data-discover': !b && e === `render` ? `true` : void 0,
    });
  },
);
yn.displayName = `Form`;
function bn(e) {
  return `${e} must be used within a data router.  See https://reactrouter.com/en/main/routers/picking-a-router.`;
}
function xn(e) {
  let t = y.useContext(Re);
  return (j(t, bn(e)), t);
}
function Sn(
  e,
  {
    target: t,
    replace: n,
    mask: r,
    state: i,
    preventScrollReset: a,
    relative: o,
    viewTransition: s,
    defaultShouldRevalidate: c,
    useTransitions: l,
  } = {},
) {
  let u = at(),
    d = nt(),
    f = st(e, {
      relative: o,
    });
  return y.useCallback(
    (p) => {
      if (Bt(p, t)) {
        p.preventDefault();
        let t = n === void 0 ? I(d) === I(f) : n,
          m = () =>
            u(e, {
              replace: t,
              mask: r,
              state: i,
              preventScrollReset: a,
              relative: o,
              viewTransition: s,
              defaultShouldRevalidate: c,
            });
        l ? y.startTransition(() => m()) : m();
      }
    },
    [d, u, f, n, r, i, t, e, a, o, s, c, l],
  );
}
var Cn = 0,
  wn = () => `__${String(++Cn)}__`;
function Tn() {
  let { router: e } = xn(`useSubmit`),
    { basename: t } = y.useContext(Ge),
    n = St(),
    r = e.fetch,
    i = e.navigate;
  return y.useCallback(
    async (e, a = {}) => {
      let { action: o, method: s, encType: c, formData: l, body: u } = Gt(e, t);
      if (a.navigate === !1) {
        let e = a.fetcherKey || wn();
        await r(e, n, a.action || o, {
          defaultShouldRevalidate: a.defaultShouldRevalidate,
          preventScrollReset: a.preventScrollReset,
          formData: l,
          body: u,
          formMethod: a.method || s,
          formEncType: a.encType || c,
          flushSync: a.flushSync,
        });
      } else
        await i(a.action || o, {
          defaultShouldRevalidate: a.defaultShouldRevalidate,
          preventScrollReset: a.preventScrollReset,
          formData: l,
          body: u,
          formMethod: a.method || s,
          formEncType: a.encType || c,
          replace: a.replace,
          state: a.state,
          fromRouteId: n,
          flushSync: a.flushSync,
          viewTransition: a.viewTransition,
        });
    },
    [r, i, t, n],
  );
}
function En(e, { relative: t } = {}) {
  let { basename: n } = y.useContext(Ge),
    r = y.useContext(qe);
  j(r, `useFormAction must be used inside a RouteContext`);
  let [i] = r.matches.slice(-1),
    a = {
      ...st(e || `.`, {
        relative: t,
      }),
    },
    o = nt();
  if (e == null) {
    a.search = o.search;
    let e = new URLSearchParams(a.search),
      t = e.getAll(`index`);
    if (t.some((e) => e === ``)) {
      (e.delete(`index`), t.filter((e) => e).forEach((t) => e.append(`index`, t)));
      let n = e.toString();
      a.search = n ? `?${n}` : ``;
    }
  }
  return (
    (!e || e === `.`) &&
      i.route.index &&
      (a.search = a.search ? a.search.replace(/^\?/, `?index&`) : `?index`),
    n !== `/` && (a.pathname = a.pathname === `/` ? n : we([n, a.pathname])),
    I(a)
  );
}
function Dn(e, { relative: t } = {}) {
  let n = y.useContext(He);
  j(
    n != null,
    "`useViewTransitionState` must be used within `react-router-dom`'s `RouterProvider`.  Did you accidentally import `RouterProvider` from `react-router`?",
  );
  let { basename: r } = xn(`useViewTransitionState`),
    i = st(e, {
      relative: t,
    });
  if (!n.isTransitioning) return !1;
  let a = B(n.currentLocation.pathname, r) || n.currentLocation.pathname,
    o = B(n.nextLocation.pathname, r) || n.nextLocation.pathname;
  return _e(i.pathname, o) != null || _e(i.pathname, a) != null;
}
var On = (0, y.createContext)({
    transformPagePoint: (e) => e,
    isStatic: !1,
    reducedMotion: `never`,
  }),
  kn = (0, y.createContext)({}),
  An = (0, y.createContext)(null),
  jn = typeof document < `u`,
  Mn = jn ? y.useLayoutEffect : y.useEffect,
  Nn = (0, y.createContext)({
    strict: !1,
  }),
  Pn = (e) => e.replace(/([a-z])([A-Z])/g, `$1-$2`).toLowerCase(),
  Fn = `data-` + Pn(`framerAppearId`);
function In(e, t, n, r) {
  let { visualElement: i } = (0, y.useContext)(kn),
    a = (0, y.useContext)(Nn),
    o = (0, y.useContext)(An),
    s = (0, y.useContext)(On).reducedMotion,
    c = (0, y.useRef)();
  ((r ||= a.renderer),
    !c.current &&
      r &&
      (c.current = r(e, {
        visualState: t,
        parent: i,
        props: n,
        presenceContext: o,
        blockInitialAnimation: o ? o.initial === !1 : !1,
        reducedMotionConfig: s,
      })));
  let l = c.current;
  (0, y.useInsertionEffect)(() => {
    l && l.update(n, o);
  });
  let u = (0, y.useRef)(!!(n[Fn] && !window.HandoffComplete));
  return (
    Mn(() => {
      l && (l.render(), u.current && l.animationState && l.animationState.animateChanges());
    }),
    (0, y.useEffect)(() => {
      l &&
        (l.updateFeatures(),
        !u.current && l.animationState && l.animationState.animateChanges(),
        u.current && ((u.current = !1), (window.HandoffComplete = !0)));
    }),
    l
  );
}
function Ln(e) {
  return e && typeof e == `object` && Object.prototype.hasOwnProperty.call(e, `current`);
}
function Rn(e, t, n) {
  return (0, y.useCallback)(
    (r) => {
      (r && e.mount && e.mount(r),
        t && (r ? t.mount(r) : t.unmount()),
        n && (typeof n == `function` ? n(r) : Ln(n) && (n.current = r)));
    },
    [t],
  );
}
function zn(e) {
  return typeof e == `string` || Array.isArray(e);
}
function Bn(e) {
  return typeof e == `object` && !!e && typeof e.start == `function`;
}
var Vn = [`animate`, `whileInView`, `whileFocus`, `whileHover`, `whileTap`, `whileDrag`, `exit`],
  Hn = [`initial`, ...Vn];
function Un(e) {
  return Bn(e.animate) || Hn.some((t) => zn(e[t]));
}
function Wn(e) {
  return !!(Un(e) || e.variants);
}
function Gn(e, t) {
  if (Un(e)) {
    let { initial: t, animate: n } = e;
    return {
      initial: t === !1 || zn(t) ? t : void 0,
      animate: zn(n) ? n : void 0,
    };
  }
  return e.inherit === !1 ? {} : t;
}
function Kn(e) {
  let { initial: t, animate: n } = Gn(e, (0, y.useContext)(kn));
  return (0, y.useMemo)(
    () => ({
      initial: t,
      animate: n,
    }),
    [qn(t), qn(n)],
  );
}
function qn(e) {
  return Array.isArray(e) ? e.join(` `) : e;
}
var Jn = {
    animation: [
      `animate`,
      `variants`,
      `whileHover`,
      `whileTap`,
      `exit`,
      `whileInView`,
      `whileFocus`,
      `whileDrag`,
    ],
    exit: [`exit`],
    drag: [`drag`, `dragControls`],
    focus: [`whileFocus`],
    hover: [`whileHover`, `onHoverStart`, `onHoverEnd`],
    tap: [`whileTap`, `onTap`, `onTapStart`, `onTapCancel`],
    pan: [`onPan`, `onPanStart`, `onPanSessionStart`, `onPanEnd`],
    inView: [`whileInView`, `onViewportEnter`, `onViewportLeave`],
    layout: [`layout`, `layoutId`],
  },
  Yn = {};
for (let e in Jn)
  Yn[e] = {
    isEnabled: (t) => Jn[e].some((e) => !!t[e]),
  };
function Xn(e) {
  for (let t in e)
    Yn[t] = {
      ...Yn[t],
      ...e[t],
    };
}
var Zn = (0, y.createContext)({}),
  Qn = (0, y.createContext)({}),
  $n = Symbol.for(`motionComponentSymbol`);
function er({
  preloadedFeatures: e,
  createVisualElement: t,
  useRender: n,
  useVisualState: r,
  Component: i,
}) {
  e && Xn(e);
  function a(a, o) {
    let s,
      c = {
        ...(0, y.useContext)(On),
        ...a,
        layoutId: tr(a),
      },
      { isStatic: l } = c,
      u = Kn(a),
      d = r(a, l);
    if (!l && jn) {
      u.visualElement = In(i, d, c, t);
      let n = (0, y.useContext)(Qn),
        r = (0, y.useContext)(Nn).strict;
      u.visualElement && (s = u.visualElement.loadFeatures(c, r, e, n));
    }
    return y.createElement(
      kn.Provider,
      {
        value: u,
      },
      s && u.visualElement
        ? y.createElement(s, {
            visualElement: u.visualElement,
            ...c,
          })
        : null,
      n(i, a, Rn(d, u.visualElement, o), d, l, u.visualElement),
    );
  }
  let o = (0, y.forwardRef)(a);
  return ((o[$n] = i), o);
}
function tr({ layoutId: e }) {
  let t = (0, y.useContext)(Zn).id;
  return t && e !== void 0 ? t + `-` + e : e;
}
function nr(e) {
  function t(t, n = {}) {
    return er(e(t, n));
  }
  if (typeof Proxy > `u`) return t;
  let n = new Map();
  return new Proxy(t, {
    get: (e, r) => (n.has(r) || n.set(r, t(r)), n.get(r)),
  });
}
var rr = [
  `animate`,
  `circle`,
  `defs`,
  `desc`,
  `ellipse`,
  `g`,
  `image`,
  `line`,
  `filter`,
  `marker`,
  `mask`,
  `metadata`,
  `path`,
  `pattern`,
  `polygon`,
  `polyline`,
  `rect`,
  `stop`,
  `switch`,
  `symbol`,
  `svg`,
  `text`,
  `tspan`,
  `use`,
  `view`,
];
function ir(e) {
  return typeof e != `string` || e.includes(`-`) ? !1 : !!(rr.indexOf(e) > -1 || /[A-Z]/.test(e));
}
var ar = {};
function or(e) {
  Object.assign(ar, e);
}
var sr = [
    `transformPerspective`,
    `x`,
    `y`,
    `z`,
    `translateX`,
    `translateY`,
    `translateZ`,
    `scale`,
    `scaleX`,
    `scaleY`,
    `rotate`,
    `rotateX`,
    `rotateY`,
    `rotateZ`,
    `skew`,
    `skewX`,
    `skewY`,
  ],
  cr = new Set(sr);
function lr(e, { layout: t, layoutId: n }) {
  return (
    cr.has(e) || e.startsWith(`origin`) || ((t || n !== void 0) && (!!ar[e] || e === `opacity`))
  );
}
var ur = (e) => !!(e && e.getVelocity),
  dr = {
    x: `translateX`,
    y: `translateY`,
    z: `translateZ`,
    transformPerspective: `perspective`,
  },
  fr = sr.length;
function pr(e, { enableHardwareAcceleration: t = !0, allowTransformNone: n = !0 }, r, i) {
  let a = ``;
  for (let t = 0; t < fr; t++) {
    let n = sr[t];
    if (e[n] !== void 0) {
      let t = dr[n] || n;
      a += `${t}(${e[n]}) `;
    }
  }
  return (
    t && !e.z && (a += `translateZ(0)`),
    (a = a.trim()),
    i ? (a = i(e, r ? `` : a)) : n && r && (a = `none`),
    a
  );
}
var mr = (e) => (t) => typeof t == `string` && t.startsWith(e),
  hr = mr(`--`),
  gr = mr(`var(--`),
  _r = /var\s*\(\s*--[\w-]+(\s*,\s*(?:(?:[^)(]|\((?:[^)(]+|\([^)(]*\))*\))*)+)?\s*\)/g,
  vr = (e, t) => (t && typeof e == `number` ? t.transform(e) : e),
  yr = (e, t, n) => Math.min(Math.max(n, e), t),
  br = {
    test: (e) => typeof e == `number`,
    parse: parseFloat,
    transform: (e) => e,
  },
  xr = {
    ...br,
    transform: (e) => yr(0, 1, e),
  },
  Sr = {
    ...br,
    default: 1,
  },
  Cr = (e) => Math.round(e * 1e5) / 1e5,
  wr = /(-)?([\d]*\.?[\d])+/g,
  Tr =
    /(#[0-9a-f]{3,8}|(rgb|hsl)a?\((-?[\d\.]+%?[,\s]+){2}(-?[\d\.]+%?)\s*[\,\/]?\s*[\d\.]*%?\))/gi,
  Er =
    /^(#[0-9a-f]{3,8}|(rgb|hsl)a?\((-?[\d\.]+%?[,\s]+){2}(-?[\d\.]+%?)\s*[\,\/]?\s*[\d\.]*%?\))$/i;
function Dr(e) {
  return typeof e == `string`;
}
var Or = (e) => ({
    test: (t) => Dr(t) && t.endsWith(e) && t.split(` `).length === 1,
    parse: parseFloat,
    transform: (t) => `${t}${e}`,
  }),
  kr = Or(`deg`),
  Ar = Or(`%`),
  W = Or(`px`),
  jr = Or(`vh`),
  Mr = Or(`vw`),
  Nr = {
    ...Ar,
    parse: (e) => Ar.parse(e) / 100,
    transform: (e) => Ar.transform(e * 100),
  },
  Pr = {
    ...br,
    transform: Math.round,
  },
  Fr = {
    borderWidth: W,
    borderTopWidth: W,
    borderRightWidth: W,
    borderBottomWidth: W,
    borderLeftWidth: W,
    borderRadius: W,
    radius: W,
    borderTopLeftRadius: W,
    borderTopRightRadius: W,
    borderBottomRightRadius: W,
    borderBottomLeftRadius: W,
    width: W,
    maxWidth: W,
    height: W,
    maxHeight: W,
    size: W,
    top: W,
    right: W,
    bottom: W,
    left: W,
    padding: W,
    paddingTop: W,
    paddingRight: W,
    paddingBottom: W,
    paddingLeft: W,
    margin: W,
    marginTop: W,
    marginRight: W,
    marginBottom: W,
    marginLeft: W,
    rotate: kr,
    rotateX: kr,
    rotateY: kr,
    rotateZ: kr,
    scale: Sr,
    scaleX: Sr,
    scaleY: Sr,
    scaleZ: Sr,
    skew: kr,
    skewX: kr,
    skewY: kr,
    distance: W,
    translateX: W,
    translateY: W,
    translateZ: W,
    x: W,
    y: W,
    z: W,
    perspective: W,
    transformPerspective: W,
    opacity: xr,
    originX: Nr,
    originY: Nr,
    originZ: W,
    zIndex: Pr,
    fillOpacity: xr,
    strokeOpacity: xr,
    numOctaves: Pr,
  };
function Ir(e, t, n, r) {
  let { style: i, vars: a, transform: o, transformOrigin: s } = e,
    c = !1,
    l = !1,
    u = !0;
  for (let e in t) {
    let n = t[e];
    if (hr(e)) {
      a[e] = n;
      continue;
    }
    let r = Fr[e],
      d = vr(n, r);
    if (cr.has(e)) {
      if (((c = !0), (o[e] = d), !u)) continue;
      n !== (r.default || 0) && (u = !1);
    } else e.startsWith(`origin`) ? ((l = !0), (s[e] = d)) : (i[e] = d);
  }
  if (
    (t.transform || (c || r ? (i.transform = pr(e.transform, n, u, r)) : (i.transform &&= `none`)),
    l)
  ) {
    let { originX: e = `50%`, originY: t = `50%`, originZ: n = 0 } = s;
    i.transformOrigin = `${e} ${t} ${n}`;
  }
}
var Lr = () => ({
  style: {},
  transform: {},
  transformOrigin: {},
  vars: {},
});
function Rr(e, t, n) {
  for (let r in t) !ur(t[r]) && !lr(r, n) && (e[r] = t[r]);
}
function zr({ transformTemplate: e }, t, n) {
  return (0, y.useMemo)(() => {
    let r = Lr();
    return (
      Ir(
        r,
        t,
        {
          enableHardwareAcceleration: !n,
        },
        e,
      ),
      Object.assign({}, r.vars, r.style)
    );
  }, [t]);
}
function Br(e, t, n) {
  let r = e.style || {},
    i = {};
  return (Rr(i, r, e), Object.assign(i, zr(e, t, n)), e.transformValues ? e.transformValues(i) : i);
}
function Vr(e, t, n) {
  let r = {},
    i = Br(e, t, n);
  return (
    e.drag &&
      e.dragListener !== !1 &&
      ((r.draggable = !1),
      (i.userSelect = i.WebkitUserSelect = i.WebkitTouchCallout = `none`),
      (i.touchAction = e.drag === !0 ? `none` : `pan-${e.drag === `x` ? `y` : `x`}`)),
    e.tabIndex === void 0 && (e.onTap || e.onTapStart || e.whileTap) && (r.tabIndex = 0),
    (r.style = i),
    r
  );
}
var Hr = new Set(
  `animate.exit.variants.initial.style.values.variants.transition.transformTemplate.transformValues.custom.inherit.onBeforeLayoutMeasure.onAnimationStart.onAnimationComplete.onUpdate.onDragStart.onDrag.onDragEnd.onMeasureDragConstraints.onDirectionLock.onDragTransitionEnd._dragX._dragY.onHoverStart.onHoverEnd.onViewportEnter.onViewportLeave.globalTapTarget.ignoreStrict.viewport`.split(
    `.`,
  ),
);
function Ur(e) {
  return (
    e.startsWith(`while`) ||
    (e.startsWith(`drag`) && e !== `draggable`) ||
    e.startsWith(`layout`) ||
    e.startsWith(`onTap`) ||
    e.startsWith(`onPan`) ||
    e.startsWith(`onLayout`) ||
    Hr.has(e)
  );
}
function Wr(e) {
  var t = {};
  return function (n) {
    return (t[n] === void 0 && (t[n] = e(n)), t[n]);
  };
}
var Gr = o(() => {}),
  Kr = c({
    default: () => Jr,
  }),
  qr,
  Jr,
  Yr = o(() => {
    (Gr(),
      (qr =
        /^((children|dangerouslySetInnerHTML|key|ref|autoFocus|defaultValue|defaultChecked|innerHTML|suppressContentEditableWarning|suppressHydrationWarning|valueLink|accept|acceptCharset|accessKey|action|allow|allowUserMedia|allowPaymentRequest|allowFullScreen|allowTransparency|alt|async|autoComplete|autoPlay|capture|cellPadding|cellSpacing|challenge|charSet|checked|cite|classID|className|cols|colSpan|content|contentEditable|contextMenu|controls|controlsList|coords|crossOrigin|data|dateTime|decoding|default|defer|dir|disabled|disablePictureInPicture|download|draggable|encType|form|formAction|formEncType|formMethod|formNoValidate|formTarget|frameBorder|headers|height|hidden|high|href|hrefLang|htmlFor|httpEquiv|id|inputMode|integrity|is|keyParams|keyType|kind|label|lang|list|loading|loop|low|marginHeight|marginWidth|max|maxLength|media|mediaGroup|method|min|minLength|multiple|muted|name|nonce|noValidate|open|optimum|pattern|placeholder|playsInline|poster|preload|profile|radioGroup|readOnly|referrerPolicy|rel|required|reversed|role|rows|rowSpan|sandbox|scope|scoped|scrolling|seamless|selected|shape|size|sizes|slot|span|spellCheck|src|srcDoc|srcLang|srcSet|start|step|style|summary|tabIndex|target|title|type|useMap|value|width|wmode|wrap|about|datatype|inlist|prefix|property|resource|typeof|vocab|autoCapitalize|autoCorrect|autoSave|color|inert|itemProp|itemScope|itemType|itemID|itemRef|on|results|security|unselectable|accentHeight|accumulate|additive|alignmentBaseline|allowReorder|alphabetic|amplitude|arabicForm|ascent|attributeName|attributeType|autoReverse|azimuth|baseFrequency|baselineShift|baseProfile|bbox|begin|bias|by|calcMode|capHeight|clip|clipPathUnits|clipPath|clipRule|colorInterpolation|colorInterpolationFilters|colorProfile|colorRendering|contentScriptType|contentStyleType|cursor|cx|cy|d|decelerate|descent|diffuseConstant|direction|display|divisor|dominantBaseline|dur|dx|dy|edgeMode|elevation|enableBackground|end|exponent|externalResourcesRequired|fill|fillOpacity|fillRule|filter|filterRes|filterUnits|floodColor|floodOpacity|focusable|fontFamily|fontSize|fontSizeAdjust|fontStretch|fontStyle|fontVariant|fontWeight|format|from|fr|fx|fy|g1|g2|glyphName|glyphOrientationHorizontal|glyphOrientationVertical|glyphRef|gradientTransform|gradientUnits|hanging|horizAdvX|horizOriginX|ideographic|imageRendering|in|in2|intercept|k|k1|k2|k3|k4|kernelMatrix|kernelUnitLength|kerning|keyPoints|keySplines|keyTimes|lengthAdjust|letterSpacing|lightingColor|limitingConeAngle|local|markerEnd|markerMid|markerStart|markerHeight|markerUnits|markerWidth|mask|maskContentUnits|maskUnits|mathematical|mode|numOctaves|offset|opacity|operator|order|orient|orientation|origin|overflow|overlinePosition|overlineThickness|panose1|paintOrder|pathLength|patternContentUnits|patternTransform|patternUnits|pointerEvents|points|pointsAtX|pointsAtY|pointsAtZ|preserveAlpha|preserveAspectRatio|primitiveUnits|r|radius|refX|refY|renderingIntent|repeatCount|repeatDur|requiredExtensions|requiredFeatures|restart|result|rotate|rx|ry|scale|seed|shapeRendering|slope|spacing|specularConstant|specularExponent|speed|spreadMethod|startOffset|stdDeviation|stemh|stemv|stitchTiles|stopColor|stopOpacity|strikethroughPosition|strikethroughThickness|string|stroke|strokeDasharray|strokeDashoffset|strokeLinecap|strokeLinejoin|strokeMiterlimit|strokeOpacity|strokeWidth|surfaceScale|systemLanguage|tableValues|targetX|targetY|textAnchor|textDecoration|textRendering|textLength|to|transform|u1|u2|underlinePosition|underlineThickness|unicode|unicodeBidi|unicodeRange|unitsPerEm|vAlphabetic|vHanging|vIdeographic|vMathematical|values|vectorEffect|version|vertAdvY|vertOriginX|vertOriginY|viewBox|viewTarget|visibility|widths|wordSpacing|writingMode|x|xHeight|x1|x2|xChannelSelector|xlinkActuate|xlinkArcrole|xlinkHref|xlinkRole|xlinkShow|xlinkTitle|xlinkType|xmlBase|xmlns|xmlnsXlink|xmlLang|xmlSpace|y|y1|y2|yChannelSelector|z|zoomAndPan|for|class|autofocus)|(([Dd][Aa][Tt][Aa]|[Aa][Rr][Ii][Aa]|x)-.*))$/),
      (Jr = Wr(function (e) {
        return (
          qr.test(e) || (e.charCodeAt(0) === 111 && e.charCodeAt(1) === 110 && e.charCodeAt(2) < 91)
        );
      })));
  }),
  Xr = (e) => !Ur(e);
function Zr(e) {
  e && (Xr = (t) => (t.startsWith(`on`) ? !Ur(t) : e(t)));
}
try {
  Zr((Yr(), d(Kr)).default);
} catch {}
function Qr(e, t, n) {
  let r = {};
  for (let i in e)
    (i !== `values` || typeof e.values != `object`) &&
      (Xr(i) || (n === !0 && Ur(i)) || (!t && !Ur(i)) || (e.draggable && i.startsWith(`onDrag`))) &&
      (r[i] = e[i]);
  return r;
}
function $r(e, t, n) {
  return typeof e == `string` ? e : W.transform(t + n * e);
}
function ei(e, t, n) {
  return `${$r(t, e.x, e.width)} ${$r(n, e.y, e.height)}`;
}
var ti = {
    offset: `stroke-dashoffset`,
    array: `stroke-dasharray`,
  },
  ni = {
    offset: `strokeDashoffset`,
    array: `strokeDasharray`,
  };
function ri(e, t, n = 1, r = 0, i = !0) {
  e.pathLength = 1;
  let a = i ? ti : ni;
  e[a.offset] = W.transform(-r);
  let o = W.transform(t),
    s = W.transform(n);
  e[a.array] = `${o} ${s}`;
}
function ii(
  e,
  {
    attrX: t,
    attrY: n,
    attrScale: r,
    originX: i,
    originY: a,
    pathLength: o,
    pathSpacing: s = 1,
    pathOffset: c = 0,
    ...l
  },
  u,
  d,
  f,
) {
  if ((Ir(e, l, u, f), d)) {
    e.style.viewBox && (e.attrs.viewBox = e.style.viewBox);
    return;
  }
  ((e.attrs = e.style), (e.style = {}));
  let { attrs: p, style: m, dimensions: h } = e;
  (p.transform && (h && (m.transform = p.transform), delete p.transform),
    h &&
      (i !== void 0 || a !== void 0 || m.transform) &&
      (m.transformOrigin = ei(h, i === void 0 ? 0.5 : i, a === void 0 ? 0.5 : a)),
    t !== void 0 && (p.x = t),
    n !== void 0 && (p.y = n),
    r !== void 0 && (p.scale = r),
    o !== void 0 && ri(p, o, s, c, !1));
}
var ai = () => ({
    ...Lr(),
    attrs: {},
  }),
  oi = (e) => typeof e == `string` && e.toLowerCase() === `svg`;
function si(e, t, n, r) {
  let i = (0, y.useMemo)(() => {
    let n = ai();
    return (
      ii(
        n,
        t,
        {
          enableHardwareAcceleration: !1,
        },
        oi(r),
        e.transformTemplate,
      ),
      {
        ...n.attrs,
        style: {
          ...n.style,
        },
      }
    );
  }, [t]);
  if (e.style) {
    let t = {};
    (Rr(t, e.style, e),
      (i.style = {
        ...t,
        ...i.style,
      }));
  }
  return i;
}
function ci(e = !1) {
  return (t, n, r, { latestValues: i }, a) => {
    let o = (ir(t) ? si : Vr)(n, i, a, t),
      s = {
        ...Qr(n, typeof t == `string`, e),
        ...o,
        ref: r,
      },
      { children: c } = n,
      l = (0, y.useMemo)(() => (ur(c) ? c.get() : c), [c]);
    return (0, y.createElement)(t, {
      ...s,
      children: l,
    });
  };
}
function li(e, { style: t, vars: n }, r, i) {
  Object.assign(e.style, t, i && i.getProjectionStyles(r));
  for (let t in n) e.style.setProperty(t, n[t]);
}
var ui = new Set([
  `baseFrequency`,
  `diffuseConstant`,
  `kernelMatrix`,
  `kernelUnitLength`,
  `keySplines`,
  `keyTimes`,
  `limitingConeAngle`,
  `markerHeight`,
  `markerWidth`,
  `numOctaves`,
  `targetX`,
  `targetY`,
  `surfaceScale`,
  `specularConstant`,
  `specularExponent`,
  `stdDeviation`,
  `tableValues`,
  `viewBox`,
  `gradientTransform`,
  `pathLength`,
  `startOffset`,
  `textLength`,
  `lengthAdjust`,
]);
function di(e, t, n, r) {
  li(e, t, void 0, r);
  for (let n in t.attrs) e.setAttribute(ui.has(n) ? n : Pn(n), t.attrs[n]);
}
function fi(e, t) {
  let { style: n } = e,
    r = {};
  for (let i in n) (ur(n[i]) || (t.style && ur(t.style[i])) || lr(i, e)) && (r[i] = n[i]);
  return r;
}
function pi(e, t) {
  let n = fi(e, t);
  for (let r in e)
    if (ur(e[r]) || ur(t[r])) {
      let t = sr.indexOf(r) === -1 ? r : `attr` + r.charAt(0).toUpperCase() + r.substring(1);
      n[t] = e[r];
    }
  return n;
}
function mi(e, t, n, r = {}, i = {}) {
  return (
    typeof t == `function` && (t = t(n === void 0 ? e.custom : n, r, i)),
    typeof t == `string` && (t = e.variants && e.variants[t]),
    typeof t == `function` && (t = t(n === void 0 ? e.custom : n, r, i)),
    t
  );
}
function hi(e) {
  let t = (0, y.useRef)(null);
  return (t.current === null && (t.current = e()), t.current);
}
var gi = (e) => Array.isArray(e),
  _i = (e) => !!(e && typeof e == `object` && e.mix && e.toValue),
  vi = (e) => (gi(e) ? e[e.length - 1] || 0 : e);
function yi(e) {
  let t = ur(e) ? e.get() : e;
  return _i(t) ? t.toValue() : t;
}
function bi({ scrapeMotionValuesFromProps: e, createRenderState: t, onMount: n }, r, i, a) {
  let o = {
    latestValues: Si(r, i, a, e),
    renderState: t(),
  };
  return (n && (o.mount = (e) => n(r, e, o)), o);
}
var xi = (e) => (t, n) => {
  let r = (0, y.useContext)(kn),
    i = (0, y.useContext)(An),
    a = () => bi(e, t, r, i);
  return n ? a() : hi(a);
};
function Si(e, t, n, r) {
  let i = {},
    a = r(e, {});
  for (let e in a) i[e] = yi(a[e]);
  let { initial: o, animate: s } = e,
    c = Un(e),
    l = Wn(e);
  t &&
    l &&
    !c &&
    e.inherit !== !1 &&
    (o === void 0 && (o = t.initial), s === void 0 && (s = t.animate));
  let u = n ? n.initial === !1 : !1;
  u ||= o === !1;
  let d = u ? s : o;
  return (
    d &&
      typeof d != `boolean` &&
      !Bn(d) &&
      (Array.isArray(d) ? d : [d]).forEach((t) => {
        let n = mi(e, t);
        if (!n) return;
        let { transitionEnd: r, transition: a, ...o } = n;
        for (let e in o) {
          let t = o[e];
          if (Array.isArray(t)) {
            let e = u ? t.length - 1 : 0;
            t = t[e];
          }
          t !== null && (i[e] = t);
        }
        for (let e in r) i[e] = r[e];
      }),
    i
  );
}
var Ci = (e) => e,
  wi = class {
    constructor() {
      ((this.order = []), (this.scheduled = new Set()));
    }
    add(e) {
      if (!this.scheduled.has(e)) return (this.scheduled.add(e), this.order.push(e), !0);
    }
    remove(e) {
      let t = this.order.indexOf(e);
      t !== -1 && (this.order.splice(t, 1), this.scheduled.delete(e));
    }
    clear() {
      ((this.order.length = 0), this.scheduled.clear());
    }
  };
function Ti(e) {
  let t = new wi(),
    n = new wi(),
    r = 0,
    i = !1,
    a = !1,
    o = new WeakSet(),
    s = {
      schedule: (e, a = !1, s = !1) => {
        let c = s && i,
          l = c ? t : n;
        return (a && o.add(e), l.add(e) && c && i && (r = t.order.length), e);
      },
      cancel: (e) => {
        (n.remove(e), o.delete(e));
      },
      process: (c) => {
        if (i) {
          a = !0;
          return;
        }
        if (((i = !0), ([t, n] = [n, t]), n.clear(), (r = t.order.length), r))
          for (let n = 0; n < r; n++) {
            let r = t.order[n];
            (r(c), o.has(r) && (s.schedule(r), e()));
          }
        ((i = !1), a && ((a = !1), s.process(c)));
      },
    };
  return s;
}
var Ei = [`prepare`, `read`, `update`, `preRender`, `render`, `postRender`],
  Di = 40;
function Oi(e, t) {
  let n = !1,
    r = !0,
    i = {
      delta: 0,
      timestamp: 0,
      isProcessing: !1,
    },
    a = Ei.reduce((e, t) => ((e[t] = Ti(() => (n = !0))), e), {}),
    o = (e) => a[e].process(i),
    s = () => {
      let a = performance.now();
      ((n = !1),
        (i.delta = r ? 1e3 / 60 : Math.max(Math.min(a - i.timestamp, Di), 1)),
        (i.timestamp = a),
        (i.isProcessing = !0),
        Ei.forEach(o),
        (i.isProcessing = !1),
        n && t && ((r = !1), e(s)));
    },
    c = () => {
      ((n = !0), (r = !0), i.isProcessing || e(s));
    };
  return {
    schedule: Ei.reduce((e, t) => {
      let r = a[t];
      return ((e[t] = (e, t = !1, i = !1) => (n || c(), r.schedule(e, t, i))), e);
    }, {}),
    cancel: (e) => Ei.forEach((t) => a[t].cancel(e)),
    state: i,
    steps: a,
  };
}
var {
    schedule: ki,
    cancel: Ai,
    state: ji,
    steps: Mi,
  } = Oi(typeof requestAnimationFrame < `u` ? requestAnimationFrame : Ci, !0),
  Ni = {
    useVisualState: xi({
      scrapeMotionValuesFromProps: pi,
      createRenderState: ai,
      onMount: (e, t, { renderState: n, latestValues: r }) => {
        (ki.read(() => {
          try {
            n.dimensions = typeof t.getBBox == `function` ? t.getBBox() : t.getBoundingClientRect();
          } catch {
            n.dimensions = {
              x: 0,
              y: 0,
              width: 0,
              height: 0,
            };
          }
        }),
          ki.render(() => {
            (ii(
              n,
              r,
              {
                enableHardwareAcceleration: !1,
              },
              oi(t.tagName),
              e.transformTemplate,
            ),
              di(t, n));
          }));
      },
    }),
  },
  Pi = {
    useVisualState: xi({
      scrapeMotionValuesFromProps: fi,
      createRenderState: Lr,
    }),
  };
function Fi(e, { forwardMotionProps: t = !1 }, n, r) {
  return {
    ...(ir(e) ? Ni : Pi),
    preloadedFeatures: n,
    useRender: ci(t),
    createVisualElement: r,
    Component: e,
  };
}
function Ii(
  e,
  t,
  n,
  r = {
    passive: !0,
  },
) {
  return (e.addEventListener(t, n, r), () => e.removeEventListener(t, n));
}
var Li = (e) =>
  e.pointerType === `mouse` ? typeof e.button != `number` || e.button <= 0 : e.isPrimary !== !1;
function Ri(e, t = `page`) {
  return {
    point: {
      x: e[t + `X`],
      y: e[t + `Y`],
    },
  };
}
var zi = (e) => (t) => Li(t) && e(t, Ri(t));
function Bi(e, t, n, r) {
  return Ii(e, t, zi(n), r);
}
var Vi = (e, t) => (n) => t(e(n)),
  Hi = (...e) => e.reduce(Vi);
function Ui(e) {
  let t = null;
  return () =>
    t === null &&
    ((t = e),
    () => {
      t = null;
    });
}
var Wi = Ui(`dragHorizontal`),
  Gi = Ui(`dragVertical`);
function Ki(e) {
  let t = !1;
  if (e === `y`) t = Gi();
  else if (e === `x`) t = Wi();
  else {
    let e = Wi(),
      n = Gi();
    e && n
      ? (t = () => {
          (e(), n());
        })
      : (e && e(), n && n());
  }
  return t;
}
function qi() {
  let e = Ki(!0);
  return !e || (e(), !1);
}
var Ji = class {
  constructor(e) {
    ((this.isMounted = !1), (this.node = e));
  }
  update() {}
};
function Yi(e, t) {
  let n = `pointer` + (t ? `enter` : `leave`),
    r = `onHover` + (t ? `Start` : `End`);
  return Bi(
    e.current,
    n,
    (n, i) => {
      if (n.pointerType === `touch` || qi()) return;
      let a = e.getProps();
      (e.animationState && a.whileHover && e.animationState.setActive(`whileHover`, t),
        a[r] && ki.update(() => a[r](n, i)));
    },
    {
      passive: !e.getProps()[r],
    },
  );
}
var Xi = class extends Ji {
    mount() {
      this.unmount = Hi(Yi(this.node, !0), Yi(this.node, !1));
    }
    unmount() {}
  },
  Zi = class extends Ji {
    constructor() {
      (super(...arguments), (this.isActive = !1));
    }
    onFocus() {
      let e = !1;
      try {
        e = this.node.current.matches(`:focus-visible`);
      } catch {
        e = !0;
      }
      !e ||
        !this.node.animationState ||
        (this.node.animationState.setActive(`whileFocus`, !0), (this.isActive = !0));
    }
    onBlur() {
      !this.isActive ||
        !this.node.animationState ||
        (this.node.animationState.setActive(`whileFocus`, !1), (this.isActive = !1));
    }
    mount() {
      this.unmount = Hi(
        Ii(this.node.current, `focus`, () => this.onFocus()),
        Ii(this.node.current, `blur`, () => this.onBlur()),
      );
    }
    unmount() {}
  },
  Qi = (e, t) => (t ? e === t || Qi(e, t.parentElement) : !1);
function $i(e, t) {
  if (!t) return;
  let n = new PointerEvent(`pointer` + e);
  t(n, Ri(n));
}
var ea = class extends Ji {
    constructor() {
      (super(...arguments),
        (this.removeStartListeners = Ci),
        (this.removeEndListeners = Ci),
        (this.removeAccessibleListeners = Ci),
        (this.startPointerPress = (e, t) => {
          if (this.isPressing) return;
          this.removeEndListeners();
          let n = this.node.getProps(),
            r = Bi(
              window,
              `pointerup`,
              (e, t) => {
                if (!this.checkPressEnd()) return;
                let { onTap: n, onTapCancel: r, globalTapTarget: i } = this.node.getProps();
                ki.update(() => {
                  !i && !Qi(this.node.current, e.target) ? r && r(e, t) : n && n(e, t);
                });
              },
              {
                passive: !(n.onTap || n.onPointerUp),
              },
            ),
            i = Bi(window, `pointercancel`, (e, t) => this.cancelPress(e, t), {
              passive: !(n.onTapCancel || n.onPointerCancel),
            });
          ((this.removeEndListeners = Hi(r, i)), this.startPress(e, t));
        }),
        (this.startAccessiblePress = () => {
          let e = Ii(this.node.current, `keydown`, (e) => {
              if (e.key !== `Enter` || this.isPressing) return;
              let t = (e) => {
                e.key !== `Enter` ||
                  !this.checkPressEnd() ||
                  $i(`up`, (e, t) => {
                    let { onTap: n } = this.node.getProps();
                    n && ki.update(() => n(e, t));
                  });
              };
              (this.removeEndListeners(),
                (this.removeEndListeners = Ii(this.node.current, `keyup`, t)),
                $i(`down`, (e, t) => {
                  this.startPress(e, t);
                }));
            }),
            t = Ii(this.node.current, `blur`, () => {
              this.isPressing && $i(`cancel`, (e, t) => this.cancelPress(e, t));
            });
          this.removeAccessibleListeners = Hi(e, t);
        }));
    }
    startPress(e, t) {
      this.isPressing = !0;
      let { onTapStart: n, whileTap: r } = this.node.getProps();
      (r && this.node.animationState && this.node.animationState.setActive(`whileTap`, !0),
        n && ki.update(() => n(e, t)));
    }
    checkPressEnd() {
      return (
        this.removeEndListeners(),
        (this.isPressing = !1),
        this.node.getProps().whileTap &&
          this.node.animationState &&
          this.node.animationState.setActive(`whileTap`, !1),
        !qi()
      );
    }
    cancelPress(e, t) {
      if (!this.checkPressEnd()) return;
      let { onTapCancel: n } = this.node.getProps();
      n && ki.update(() => n(e, t));
    }
    mount() {
      let e = this.node.getProps(),
        t = Bi(
          e.globalTapTarget ? window : this.node.current,
          `pointerdown`,
          this.startPointerPress,
          {
            passive: !(e.onTapStart || e.onPointerStart),
          },
        ),
        n = Ii(this.node.current, `focus`, this.startAccessiblePress);
      this.removeStartListeners = Hi(t, n);
    }
    unmount() {
      (this.removeStartListeners(), this.removeEndListeners(), this.removeAccessibleListeners());
    }
  },
  ta = new WeakMap(),
  na = new WeakMap(),
  ra = (e) => {
    let t = ta.get(e.target);
    t && t(e);
  },
  ia = (e) => {
    e.forEach(ra);
  };
function aa({ root: e, ...t }) {
  let n = e || document;
  na.has(n) || na.set(n, {});
  let r = na.get(n),
    i = JSON.stringify(t);
  return (
    r[i] ||
      (r[i] = new IntersectionObserver(ia, {
        root: e,
        ...t,
      })),
    r[i]
  );
}
function oa(e, t, n) {
  let r = aa(t);
  return (
    ta.set(e, n),
    r.observe(e),
    () => {
      (ta.delete(e), r.unobserve(e));
    }
  );
}
var sa = {
    some: 0,
    all: 1,
  },
  ca = class extends Ji {
    constructor() {
      (super(...arguments), (this.hasEnteredView = !1), (this.isInView = !1));
    }
    startObserver() {
      this.unmount();
      let { viewport: e = {} } = this.node.getProps(),
        { root: t, margin: n, amount: r = `some`, once: i } = e,
        a = {
          root: t ? t.current : void 0,
          rootMargin: n,
          threshold: typeof r == `number` ? r : sa[r],
        };
      return oa(this.node.current, a, (e) => {
        let { isIntersecting: t } = e;
        if (this.isInView === t || ((this.isInView = t), i && !t && this.hasEnteredView)) return;
        (t && (this.hasEnteredView = !0),
          this.node.animationState && this.node.animationState.setActive(`whileInView`, t));
        let { onViewportEnter: n, onViewportLeave: r } = this.node.getProps(),
          a = t ? n : r;
        a && a(e);
      });
    }
    mount() {
      this.startObserver();
    }
    update() {
      if (typeof IntersectionObserver > `u`) return;
      let { props: e, prevProps: t } = this.node;
      [`amount`, `margin`, `root`].some(la(e, t)) && this.startObserver();
    }
    unmount() {}
  };
function la({ viewport: e = {} }, { viewport: t = {} } = {}) {
  return (n) => e[n] !== t[n];
}
var ua = {
  inView: {
    Feature: ca,
  },
  tap: {
    Feature: ea,
  },
  focus: {
    Feature: Zi,
  },
  hover: {
    Feature: Xi,
  },
};
function da(e, t) {
  if (!Array.isArray(t)) return !1;
  let n = t.length;
  if (n !== e.length) return !1;
  for (let r = 0; r < n; r++) if (t[r] !== e[r]) return !1;
  return !0;
}
function fa(e) {
  let t = {};
  return (e.values.forEach((e, n) => (t[n] = e.get())), t);
}
function pa(e) {
  let t = {};
  return (e.values.forEach((e, n) => (t[n] = e.getVelocity())), t);
}
function ma(e, t, n) {
  let r = e.getProps();
  return mi(r, t, n === void 0 ? r.custom : n, fa(e), pa(e));
}
var ha = Ci,
  ga = Ci,
  _a = (e) => e * 1e3,
  va = (e) => e / 1e3,
  ya = {
    current: !1,
  },
  ba = (e) => Array.isArray(e) && typeof e[0] == `number`;
function xa(e) {
  return !!(!e || (typeof e == `string` && Ca[e]) || ba(e) || (Array.isArray(e) && e.every(xa)));
}
var Sa = ([e, t, n, r]) => `cubic-bezier(${e}, ${t}, ${n}, ${r})`,
  Ca = {
    linear: `linear`,
    ease: `ease`,
    easeIn: `ease-in`,
    easeOut: `ease-out`,
    easeInOut: `ease-in-out`,
    circIn: Sa([0, 0.65, 0.55, 1]),
    circOut: Sa([0.55, 0, 1, 0.45]),
    backIn: Sa([0.31, 0.01, 0.66, -0.59]),
    backOut: Sa([0.33, 1.53, 0.69, 0.99]),
  };
function wa(e) {
  if (e) return ba(e) ? Sa(e) : Array.isArray(e) ? e.map(wa) : Ca[e];
}
function Ta(
  e,
  t,
  n,
  { delay: r = 0, duration: i, repeat: a = 0, repeatType: o = `loop`, ease: s, times: c } = {},
) {
  let l = {
    [t]: n,
  };
  c && (l.offset = c);
  let u = wa(s);
  return (
    Array.isArray(u) && (l.easing = u),
    e.animate(l, {
      delay: r,
      duration: i,
      easing: Array.isArray(u) ? `linear` : u,
      fill: `both`,
      iterations: a + 1,
      direction: o === `reverse` ? `alternate` : `normal`,
    })
  );
}
function Ea(e, { repeat: t, repeatType: n = `loop` }) {
  return e[t && n !== `loop` && t % 2 == 1 ? 0 : e.length - 1];
}
var Da = (e, t, n) => (((1 - 3 * n + 3 * t) * e + (3 * n - 6 * t)) * e + 3 * t) * e,
  Oa = 1e-7,
  ka = 12;
function Aa(e, t, n, r, i) {
  let a,
    o,
    s = 0;
  do ((o = t + (n - t) / 2), (a = Da(o, r, i) - e), a > 0 ? (n = o) : (t = o));
  while (Math.abs(a) > Oa && ++s < ka);
  return o;
}
function ja(e, t, n, r) {
  if (e === t && n === r) return Ci;
  let i = (t) => Aa(t, 0, 1, e, n);
  return (e) => (e === 0 || e === 1 ? e : Da(i(e), t, r));
}
var Ma = ja(0.42, 0, 1, 1),
  Na = ja(0, 0, 0.58, 1),
  Pa = ja(0.42, 0, 0.58, 1),
  Fa = (e) => Array.isArray(e) && typeof e[0] != `number`,
  Ia = (e) => (t) => (t <= 0.5 ? e(2 * t) / 2 : (2 - e(2 * (1 - t))) / 2),
  La = (e) => (t) => 1 - e(1 - t),
  Ra = (e) => 1 - Math.sin(Math.acos(e)),
  za = La(Ra),
  Ba = Ia(Ra),
  Va = ja(0.33, 1.53, 0.69, 0.99),
  Ha = La(Va),
  Ua = {
    linear: Ci,
    easeIn: Ma,
    easeInOut: Pa,
    easeOut: Na,
    circIn: Ra,
    circInOut: Ba,
    circOut: za,
    backIn: Ha,
    backInOut: Ia(Ha),
    backOut: Va,
    anticipate: (e) => ((e *= 2) < 1 ? 0.5 * Ha(e) : 0.5 * (2 - 2 ** (-10 * (e - 1)))),
  },
  Wa = (e) => {
    if (Array.isArray(e)) {
      ga(e.length === 4, `Cubic bezier arrays must contain four numerical values.`);
      let [t, n, r, i] = e;
      return ja(t, n, r, i);
    }
    return typeof e == `string` ? (ga(Ua[e] !== void 0, `Invalid easing type '${e}'`), Ua[e]) : e;
  },
  Ga = (e, t) => (n) =>
    !!(
      (Dr(n) && Er.test(n) && n.startsWith(e)) ||
      (t && Object.prototype.hasOwnProperty.call(n, t))
    ),
  Ka = (e, t, n) => (r) => {
    if (!Dr(r)) return r;
    let [i, a, o, s] = r.match(wr);
    return {
      [e]: parseFloat(i),
      [t]: parseFloat(a),
      [n]: parseFloat(o),
      alpha: s === void 0 ? 1 : parseFloat(s),
    };
  },
  qa = (e) => yr(0, 255, e),
  Ja = {
    ...br,
    transform: (e) => Math.round(qa(e)),
  },
  Ya = {
    test: Ga(`rgb`, `red`),
    parse: Ka(`red`, `green`, `blue`),
    transform: ({ red: e, green: t, blue: n, alpha: r = 1 }) =>
      `rgba(` +
      Ja.transform(e) +
      `, ` +
      Ja.transform(t) +
      `, ` +
      Ja.transform(n) +
      `, ` +
      Cr(xr.transform(r)) +
      `)`,
  };
function Xa(e) {
  let t = ``,
    n = ``,
    r = ``,
    i = ``;
  return (
    e.length > 5
      ? ((t = e.substring(1, 3)),
        (n = e.substring(3, 5)),
        (r = e.substring(5, 7)),
        (i = e.substring(7, 9)))
      : ((t = e.substring(1, 2)),
        (n = e.substring(2, 3)),
        (r = e.substring(3, 4)),
        (i = e.substring(4, 5)),
        (t += t),
        (n += n),
        (r += r),
        (i += i)),
    {
      red: parseInt(t, 16),
      green: parseInt(n, 16),
      blue: parseInt(r, 16),
      alpha: i ? parseInt(i, 16) / 255 : 1,
    }
  );
}
var Za = {
    test: Ga(`#`),
    parse: Xa,
    transform: Ya.transform,
  },
  Qa = {
    test: Ga(`hsl`, `hue`),
    parse: Ka(`hue`, `saturation`, `lightness`),
    transform: ({ hue: e, saturation: t, lightness: n, alpha: r = 1 }) =>
      `hsla(` +
      Math.round(e) +
      `, ` +
      Ar.transform(Cr(t)) +
      `, ` +
      Ar.transform(Cr(n)) +
      `, ` +
      Cr(xr.transform(r)) +
      `)`,
  },
  $a = {
    test: (e) => Ya.test(e) || Za.test(e) || Qa.test(e),
    parse: (e) => (Ya.test(e) ? Ya.parse(e) : Qa.test(e) ? Qa.parse(e) : Za.parse(e)),
    transform: (e) => (Dr(e) ? e : e.hasOwnProperty(`red`) ? Ya.transform(e) : Qa.transform(e)),
  },
  eo = (e, t, n) => -n * e + n * t + e;
function to(e, t, n) {
  return (
    n < 0 && (n += 1),
    n > 1 && --n,
    n < 1 / 6 ? e + (t - e) * 6 * n : n < 1 / 2 ? t : n < 2 / 3 ? e + (t - e) * (2 / 3 - n) * 6 : e
  );
}
function no({ hue: e, saturation: t, lightness: n, alpha: r }) {
  ((e /= 360), (t /= 100), (n /= 100));
  let i = 0,
    a = 0,
    o = 0;
  if (!t) i = a = o = n;
  else {
    let r = n < 0.5 ? n * (1 + t) : n + t - n * t,
      s = 2 * n - r;
    ((i = to(s, r, e + 1 / 3)), (a = to(s, r, e)), (o = to(s, r, e - 1 / 3)));
  }
  return {
    red: Math.round(i * 255),
    green: Math.round(a * 255),
    blue: Math.round(o * 255),
    alpha: r,
  };
}
var ro = (e, t, n) => {
    let r = e * e;
    return Math.sqrt(Math.max(0, n * (t * t - r) + r));
  },
  io = [Za, Ya, Qa],
  ao = (e) => io.find((t) => t.test(e));
function oo(e) {
  let t = ao(e);
  ga(!!t, `'${e}' is not an animatable color. Use the equivalent color code instead.`);
  let n = t.parse(e);
  return (t === Qa && (n = no(n)), n);
}
var so = (e, t) => {
  let n = oo(e),
    r = oo(t),
    i = {
      ...n,
    };
  return (e) => (
    (i.red = ro(n.red, r.red, e)),
    (i.green = ro(n.green, r.green, e)),
    (i.blue = ro(n.blue, r.blue, e)),
    (i.alpha = eo(n.alpha, r.alpha, e)),
    Ya.transform(i)
  );
};
function co(e) {
  return isNaN(e) && Dr(e) && (e.match(wr)?.length || 0) + (e.match(Tr)?.length || 0) > 0;
}
var lo = {
    regex: _r,
    countKey: `Vars`,
    token: '${v}',
    parse: Ci,
  },
  uo = {
    regex: Tr,
    countKey: `Colors`,
    token: '${c}',
    parse: $a.parse,
  },
  fo = {
    regex: wr,
    countKey: `Numbers`,
    token: '${n}',
    parse: br.parse,
  };
function po(e, { regex: t, countKey: n, token: r, parse: i }) {
  let a = e.tokenised.match(t);
  a &&
    ((e[`num` + n] = a.length),
    (e.tokenised = e.tokenised.replace(t, r)),
    e.values.push(...a.map(i)));
}
function mo(e) {
  let t = e.toString(),
    n = {
      value: t,
      tokenised: t,
      values: [],
      numVars: 0,
      numColors: 0,
      numNumbers: 0,
    };
  return (n.value.includes(`var(--`) && po(n, lo), po(n, uo), po(n, fo), n);
}
function ho(e) {
  return mo(e).values;
}
function go(e) {
  let { values: t, numColors: n, numVars: r, tokenised: i } = mo(e),
    a = t.length;
  return (e) => {
    let t = i;
    for (let i = 0; i < a; i++)
      t =
        i < r
          ? t.replace(lo.token, e[i])
          : i < r + n
            ? t.replace(uo.token, $a.transform(e[i]))
            : t.replace(fo.token, Cr(e[i]));
    return t;
  };
}
var _o = (e) => (typeof e == `number` ? 0 : e);
function vo(e) {
  let t = ho(e);
  return go(e)(t.map(_o));
}
var yo = {
    test: co,
    parse: ho,
    createTransformer: go,
    getAnimatableNone: vo,
  },
  bo = (e, t) => (n) => `${n > 0 ? t : e}`;
function xo(e, t) {
  return typeof e == `number`
    ? (n) => eo(e, t, n)
    : $a.test(e)
      ? so(e, t)
      : e.startsWith(`var(`)
        ? bo(e, t)
        : wo(e, t);
}
var So = (e, t) => {
    let n = [...e],
      r = n.length,
      i = e.map((e, n) => xo(e, t[n]));
    return (e) => {
      for (let t = 0; t < r; t++) n[t] = i[t](e);
      return n;
    };
  },
  Co = (e, t) => {
    let n = {
        ...e,
        ...t,
      },
      r = {};
    for (let i in n) e[i] !== void 0 && t[i] !== void 0 && (r[i] = xo(e[i], t[i]));
    return (e) => {
      for (let t in r) n[t] = r[t](e);
      return n;
    };
  },
  wo = (e, t) => {
    let n = yo.createTransformer(t),
      r = mo(e),
      i = mo(t);
    return r.numVars === i.numVars && r.numColors === i.numColors && r.numNumbers >= i.numNumbers
      ? Hi(So(r.values, i.values), n)
      : (ha(
          !0,
          `Complex values '${e}' and '${t}' too different to mix. Ensure all colors are of the same type, and that each contains the same quantity of number and color values. Falling back to instant transition.`,
        ),
        bo(e, t));
  },
  To = (e, t, n) => {
    let r = t - e;
    return r === 0 ? 1 : (n - e) / r;
  },
  Eo = (e, t) => (n) => eo(e, t, n);
function Do(e) {
  return typeof e == `number`
    ? Eo
    : typeof e == `string`
      ? $a.test(e)
        ? so
        : wo
      : Array.isArray(e)
        ? So
        : typeof e == `object`
          ? Co
          : Eo;
}
function Oo(e, t, n) {
  let r = [],
    i = n || Do(e[0]),
    a = e.length - 1;
  for (let n = 0; n < a; n++) {
    let a = i(e[n], e[n + 1]);
    (t && (a = Hi(Array.isArray(t) ? t[n] || Ci : t, a)), r.push(a));
  }
  return r;
}
function ko(e, t, { clamp: n = !0, ease: r, mixer: i } = {}) {
  let a = e.length;
  if ((ga(a === t.length, `Both input and output ranges must be the same length`), a === 1))
    return () => t[0];
  e[0] > e[a - 1] && ((e = [...e].reverse()), (t = [...t].reverse()));
  let o = Oo(t, r, i),
    s = o.length,
    c = (t) => {
      let n = 0;
      if (s > 1) for (; n < e.length - 2 && !(t < e[n + 1]); n++);
      let r = To(e[n], e[n + 1], t);
      return o[n](r);
    };
  return n ? (t) => c(yr(e[0], e[a - 1], t)) : c;
}
function Ao(e, t) {
  let n = e[e.length - 1];
  for (let r = 1; r <= t; r++) {
    let i = To(0, t, r);
    e.push(eo(n, 1, i));
  }
}
function jo(e) {
  let t = [0];
  return (Ao(t, e.length - 1), t);
}
function Mo(e, t) {
  return e.map((e) => e * t);
}
function No(e, t) {
  return e.map(() => t || Pa).splice(0, e.length - 1);
}
function Po({ duration: e = 300, keyframes: t, times: n, ease: r = `easeInOut` }) {
  let i = Fa(r) ? r.map(Wa) : Wa(r),
    a = {
      done: !1,
      value: t[0],
    },
    o = ko(Mo(n && n.length === t.length ? n : jo(t), e), t, {
      ease: Array.isArray(i) ? i : No(t, i),
    });
  return {
    calculatedDuration: e,
    next: (t) => ((a.value = o(t)), (a.done = t >= e), a),
  };
}
function Fo(e, t) {
  return t ? (1e3 / t) * e : 0;
}
var Io = 5;
function Lo(e, t, n) {
  let r = Math.max(t - Io, 0);
  return Fo(n - e(r), t - r);
}
var Ro = 0.001,
  zo = 0.01,
  Bo = 0.05;
function Vo({ duration: e = 800, bounce: t = 0.25, velocity: n = 0, mass: r = 1 }) {
  let i, a;
  ha(e <= _a(10), `Spring duration must be 10 seconds or less`);
  let o = 1 - t;
  ((o = yr(Bo, 1, o)),
    (e = yr(zo, 10, va(e))),
    o < 1
      ? ((i = (t) => {
          let r = t * o,
            i = r * e,
            a = r - n,
            s = Wo(t, o),
            c = Math.exp(-i);
          return Ro - (a / s) * c;
        }),
        (a = (t) => {
          let r = t * o * e,
            a = r * n + n,
            s = o ** 2 * t ** 2 * e,
            c = Math.exp(-r),
            l = Wo(t ** 2, o);
          return ((-i(t) + Ro > 0 ? -1 : 1) * ((a - s) * c)) / l;
        }))
      : ((i = (t) => -0.001 + Math.exp(-t * e) * ((t - n) * e + 1)),
        (a = (t) => Math.exp(-t * e) * ((n - t) * (e * e)))));
  let s = 5 / e,
    c = Uo(i, a, s);
  if (((e = _a(e)), isNaN(c)))
    return {
      stiffness: 100,
      damping: 10,
      duration: e,
    };
  {
    let t = c ** 2 * r;
    return {
      stiffness: t,
      damping: o * 2 * Math.sqrt(r * t),
      duration: e,
    };
  }
}
var Ho = 12;
function Uo(e, t, n) {
  let r = n;
  for (let n = 1; n < Ho; n++) r -= e(r) / t(r);
  return r;
}
function Wo(e, t) {
  return e * Math.sqrt(1 - t * t);
}
var Go = [`duration`, `bounce`],
  Ko = [`stiffness`, `damping`, `mass`];
function qo(e, t) {
  return t.some((t) => e[t] !== void 0);
}
function Jo(e) {
  let t = {
    velocity: 0,
    stiffness: 100,
    damping: 10,
    mass: 1,
    isResolvedFromDuration: !1,
    ...e,
  };
  if (!qo(e, Ko) && qo(e, Go)) {
    let n = Vo(e);
    ((t = {
      ...t,
      ...n,
      mass: 1,
    }),
      (t.isResolvedFromDuration = !0));
  }
  return t;
}
function Yo({ keyframes: e, restDelta: t, restSpeed: n, ...r }) {
  let i = e[0],
    a = e[e.length - 1],
    o = {
      done: !1,
      value: i,
    },
    {
      stiffness: s,
      damping: c,
      mass: l,
      duration: u,
      velocity: d,
      isResolvedFromDuration: f,
    } = Jo({
      ...r,
      velocity: -va(r.velocity || 0),
    }),
    p = d || 0,
    m = c / (2 * Math.sqrt(s * l)),
    h = a - i,
    g = va(Math.sqrt(s / l)),
    _ = Math.abs(h) < 5;
  ((n ||= _ ? 0.01 : 2), (t ||= _ ? 0.005 : 0.5));
  let v;
  if (m < 1) {
    let e = Wo(g, m);
    v = (t) => {
      let n = Math.exp(-m * g * t);
      return a - n * (((p + m * g * h) / e) * Math.sin(e * t) + h * Math.cos(e * t));
    };
  } else if (m === 1) v = (e) => a - Math.exp(-g * e) * (h + (p + g * h) * e);
  else {
    let e = g * Math.sqrt(m * m - 1);
    v = (t) => {
      let n = Math.exp(-m * g * t),
        r = Math.min(e * t, 300);
      return a - (n * ((p + m * g * h) * Math.sinh(r) + e * h * Math.cosh(r))) / e;
    };
  }
  return {
    calculatedDuration: (f && u) || null,
    next: (e) => {
      let r = v(e);
      if (f) o.done = e >= u;
      else {
        let i = p;
        e !== 0 && (i = m < 1 ? Lo(v, e, r) : 0);
        let s = Math.abs(i) <= n,
          c = Math.abs(a - r) <= t;
        o.done = s && c;
      }
      return ((o.value = o.done ? a : r), o);
    },
  };
}
function Xo({
  keyframes: e,
  velocity: t = 0,
  power: n = 0.8,
  timeConstant: r = 325,
  bounceDamping: i = 10,
  bounceStiffness: a = 500,
  modifyTarget: o,
  min: s,
  max: c,
  restDelta: l = 0.5,
  restSpeed: u,
}) {
  let d = e[0],
    f = {
      done: !1,
      value: d,
    },
    p = (e) => (s !== void 0 && e < s) || (c !== void 0 && e > c),
    m = (e) => (s === void 0 ? c : c === void 0 || Math.abs(s - e) < Math.abs(c - e) ? s : c),
    h = n * t,
    g = d + h,
    _ = o === void 0 ? g : o(g);
  _ !== g && (h = _ - d);
  let v = (e) => -h * Math.exp(-e / r),
    y = (e) => _ + v(e),
    b = (e) => {
      let t = v(e),
        n = y(e);
      ((f.done = Math.abs(t) <= l), (f.value = f.done ? _ : n));
    },
    x,
    S,
    C = (e) => {
      p(f.value) &&
        ((x = e),
        (S = Yo({
          keyframes: [f.value, m(f.value)],
          velocity: Lo(y, e, f.value),
          damping: i,
          stiffness: a,
          restDelta: l,
          restSpeed: u,
        })));
    };
  return (
    C(0),
    {
      calculatedDuration: null,
      next: (e) => {
        let t = !1;
        return (
          !S && x === void 0 && ((t = !0), b(e), C(e)),
          x !== void 0 && e > x ? S.next(e - x) : (!t && b(e), f)
        );
      },
    }
  );
}
var Zo = (e) => {
  let t = ({ timestamp: t }) => e(t);
  return {
    start: () => ki.update(t, !0),
    stop: () => Ai(t),
    now: () => (ji.isProcessing ? ji.timestamp : performance.now()),
  };
};
function Qo(e) {
  let t = 0,
    n = e.next(t);
  for (; !n.done && t < 2e4;) ((t += 50), (n = e.next(t)));
  return t >= 2e4 ? 1 / 0 : t;
}
var $o = {
  decay: Xo,
  inertia: Xo,
  tween: Po,
  keyframes: Po,
  spring: Yo,
};
function es({
  autoplay: e = !0,
  delay: t = 0,
  driver: n = Zo,
  keyframes: r,
  type: i = `keyframes`,
  repeat: a = 0,
  repeatDelay: o = 0,
  repeatType: s = `loop`,
  onPlay: c,
  onStop: l,
  onComplete: u,
  onUpdate: d,
  ...f
}) {
  let p = 1,
    m = !1,
    h,
    g,
    _ = () => {
      g = new Promise((e) => {
        h = e;
      });
    };
  _();
  let v,
    y = $o[i] || Po,
    b;
  y !== Po &&
    typeof r[0] != `number` &&
    ((b = ko([0, 100], r, {
      clamp: !1,
    })),
    (r = [0, 100]));
  let x = y({
      ...f,
      keyframes: r,
    }),
    S;
  s === `mirror` &&
    (S = y({
      ...f,
      keyframes: [...r].reverse(),
      velocity: -(f.velocity || 0),
    }));
  let C = `idle`,
    w = null,
    T = null,
    E = null;
  x.calculatedDuration === null && a && (x.calculatedDuration = Qo(x));
  let { calculatedDuration: D } = x,
    O = 1 / 0,
    k = 1 / 0;
  D !== null && ((O = D + o), (k = O * (a + 1) - o));
  let A = 0,
    j = (e) => {
      if (T === null) return;
      (p > 0 && (T = Math.min(T, e)),
        p < 0 && (T = Math.min(e - k / p, T)),
        (A = w === null ? Math.round(e - T) * p : w));
      let n = A - t * (p >= 0 ? 1 : -1),
        i = p >= 0 ? n < 0 : n > k;
      ((A = Math.max(n, 0)), C === `finished` && w === null && (A = k));
      let c = A,
        l = x;
      if (a) {
        let e = Math.min(A, k) / O,
          t = Math.floor(e),
          n = e % 1;
        (!n && e >= 1 && (n = 1),
          n === 1 && t--,
          (t = Math.min(t, a + 1)),
          t % 2 && (s === `reverse` ? ((n = 1 - n), o && (n -= o / O)) : s === `mirror` && (l = S)),
          (c = yr(0, 1, n) * O));
      }
      let u = i
        ? {
            done: !1,
            value: r[0],
          }
        : l.next(c);
      b && (u.value = b(u.value));
      let { done: f } = u;
      !i && D !== null && (f = p >= 0 ? A >= k : A <= 0);
      let m = w === null && (C === `finished` || (C === `running` && f));
      return (d && d(u.value), m && P(), u);
    },
    M = () => {
      (v && v.stop(), (v = void 0));
    },
    N = () => {
      ((C = `idle`), M(), h(), _(), (T = E = null));
    },
    P = () => {
      ((C = `finished`), u && u(), M(), h());
    },
    F = () => {
      if (m) return;
      v ||= n(j);
      let e = v.now();
      (c && c(),
        w === null ? (!T || C === `finished`) && (T = e) : (T = e - w),
        C === `finished` && _(),
        (E = T),
        (w = null),
        (C = `running`),
        v.start());
    };
  e && F();
  let I = {
    then(e, t) {
      return g.then(e, t);
    },
    get time() {
      return va(A);
    },
    set time(e) {
      ((e = _a(e)), (A = e), w !== null || !v || p === 0 ? (w = e) : (T = v.now() - e / p));
    },
    get duration() {
      return va(x.calculatedDuration === null ? Qo(x) : x.calculatedDuration);
    },
    get speed() {
      return p;
    },
    set speed(e) {
      e === p || !v || ((p = e), (I.time = va(A)));
    },
    get state() {
      return C;
    },
    play: F,
    pause: () => {
      ((C = `paused`), (w = A));
    },
    stop: () => {
      ((m = !0), C !== `idle` && ((C = `idle`), l && l(), N()));
    },
    cancel: () => {
      (E !== null && j(E), N());
    },
    complete: () => {
      C = `finished`;
    },
    sample: (e) => ((T = 0), j(e)),
  };
  return I;
}
function ts(e) {
  let t;
  return () => (t === void 0 && (t = e()), t);
}
var ns = ts(() => Object.hasOwnProperty.call(Element.prototype, `animate`)),
  rs = new Set([`opacity`, `clipPath`, `filter`, `transform`, `backgroundColor`]),
  is = 10,
  as = 2e4,
  os = (e, t) => t.type === `spring` || e === `backgroundColor` || !xa(t.ease);
function ss(e, t, { onUpdate: n, onComplete: r, ...i }) {
  if (!(
    ns() &&
    rs.has(t) &&
    !i.repeatDelay &&
    i.repeatType !== `mirror` &&
    i.damping !== 0 &&
    i.type !== `inertia`
  ))
    return !1;
  let a = !1,
    o,
    s,
    c = !1,
    l = () => {
      s = new Promise((e) => {
        o = e;
      });
    };
  l();
  let { keyframes: u, duration: d = 300, ease: f, times: p } = i;
  if (os(t, i)) {
    let e = es({
        ...i,
        repeat: 0,
        delay: 0,
      }),
      t = {
        done: !1,
        value: u[0],
      },
      n = [],
      r = 0;
    for (; !t.done && r < as;) ((t = e.sample(r)), n.push(t.value), (r += is));
    ((p = void 0), (u = n), (d = r - is), (f = `linear`));
  }
  let m = Ta(e.owner.current, t, u, {
      ...i,
      duration: d,
      ease: f,
      times: p,
    }),
    h = () => {
      ((c = !1), m.cancel());
    },
    g = () => {
      ((c = !0), ki.update(h), o(), l());
    };
  return (
    (m.onfinish = () => {
      c || (e.set(Ea(u, i)), r && r(), g());
    }),
    {
      then(e, t) {
        return s.then(e, t);
      },
      attachTimeline(e) {
        return ((m.timeline = e), (m.onfinish = null), Ci);
      },
      get time() {
        return va(m.currentTime || 0);
      },
      set time(e) {
        m.currentTime = _a(e);
      },
      get speed() {
        return m.playbackRate;
      },
      set speed(e) {
        m.playbackRate = e;
      },
      get duration() {
        return va(d);
      },
      play: () => {
        a || (m.play(), Ai(h));
      },
      pause: () => m.pause(),
      stop: () => {
        if (((a = !0), m.playState === `idle`)) return;
        let { currentTime: t } = m;
        if (t) {
          let n = es({
            ...i,
            autoplay: !1,
          });
          e.setWithVelocity(n.sample(t - is).value, n.sample(t).value, is);
        }
        g();
      },
      complete: () => {
        c || m.finish();
      },
      cancel: g,
    }
  );
}
function cs({ keyframes: e, delay: t, onUpdate: n, onComplete: r }) {
  let i = () => (
    n && n(e[e.length - 1]),
    r && r(),
    {
      time: 0,
      speed: 1,
      duration: 0,
      play: Ci,
      pause: Ci,
      stop: Ci,
      then: (e) => (e(), Promise.resolve()),
      cancel: Ci,
      complete: Ci,
    }
  );
  return t
    ? es({
        keyframes: [0, 1],
        duration: 0,
        delay: t,
        onComplete: i,
      })
    : i();
}
var ls = {
    type: `spring`,
    stiffness: 500,
    damping: 25,
    restSpeed: 10,
  },
  us = (e) => ({
    type: `spring`,
    stiffness: 550,
    damping: e === 0 ? 2 * Math.sqrt(550) : 30,
    restSpeed: 10,
  }),
  ds = {
    type: `keyframes`,
    duration: 0.8,
  },
  fs = {
    type: `keyframes`,
    ease: [0.25, 0.1, 0.35, 1],
    duration: 0.3,
  },
  ps = (e, { keyframes: t }) =>
    t.length > 2 ? ds : cr.has(e) ? (e.startsWith(`scale`) ? us(t[1]) : ls) : fs,
  ms = (e, t) =>
    e !== `zIndex` &&
    !!(
      typeof t == `number` ||
      Array.isArray(t) ||
      (typeof t == `string` && (yo.test(t) || t === `0`) && !t.startsWith(`url(`))
    ),
  hs = new Set([`brightness`, `contrast`, `saturate`, `opacity`]);
function gs(e) {
  let [t, n] = e.slice(0, -1).split(`(`);
  if (t === `drop-shadow`) return e;
  let [r] = n.match(wr) || [];
  if (!r) return e;
  let i = n.replace(r, ``),
    a = +!!hs.has(t);
  return (r !== n && (a *= 100), t + `(` + a + i + `)`);
}
var _s = /([a-z-]*)\(.*?\)/g,
  vs = {
    ...yo,
    getAnimatableNone: (e) => {
      let t = e.match(_s);
      return t ? t.map(gs).join(` `) : e;
    },
  },
  ys = {
    ...Fr,
    color: $a,
    backgroundColor: $a,
    outlineColor: $a,
    fill: $a,
    stroke: $a,
    borderColor: $a,
    borderTopColor: $a,
    borderRightColor: $a,
    borderBottomColor: $a,
    borderLeftColor: $a,
    filter: vs,
    WebkitFilter: vs,
  },
  bs = (e) => ys[e];
function xs(e, t) {
  let n = bs(e);
  return (n !== vs && (n = yo), n.getAnimatableNone ? n.getAnimatableNone(t) : void 0);
}
var Ss = (e) => /^0[^.\s]+$/.test(e);
function Cs(e) {
  if (typeof e == `number`) return e === 0;
  if (e !== null) return e === `none` || e === `0` || Ss(e);
}
function ws(e, t, n, r) {
  let i = ms(t, n),
    a;
  a = Array.isArray(n) ? [...n] : [null, n];
  let o = r.from === void 0 ? e.get() : r.from,
    s,
    c = [];
  for (let e = 0; e < a.length; e++)
    (a[e] === null && (a[e] = e === 0 ? o : a[e - 1]),
      Cs(a[e]) && c.push(e),
      typeof a[e] == `string` && a[e] !== `none` && a[e] !== `0` && (s = a[e]));
  if (i && c.length && s)
    for (let e = 0; e < c.length; e++) {
      let n = c[e];
      a[n] = xs(t, s);
    }
  return a;
}
function Ts({
  when: e,
  delay: t,
  delayChildren: n,
  staggerChildren: r,
  staggerDirection: i,
  repeat: a,
  repeatType: o,
  repeatDelay: s,
  from: c,
  elapsed: l,
  ...u
}) {
  return !!Object.keys(u).length;
}
function Es(e, t) {
  return e[t] || e.default || e;
}
var Ds = {
    skipAnimations: !1,
  },
  Os =
    (e, t, n, r = {}) =>
    (i) => {
      let a = Es(r, e) || {},
        o = a.delay || r.delay || 0,
        { elapsed: s = 0 } = r;
      s -= _a(o);
      let c = ws(t, e, n, a),
        l = c[0],
        u = c[c.length - 1],
        d = ms(e, l),
        f = ms(e, u);
      ha(
        d === f,
        `You are trying to animate ${e} from "${l}" to "${u}". ${l} is not an animatable value - to enable this animation set ${l} to a value animatable to ${u} via the \`style\` property.`,
      );
      let p = {
        keyframes: c,
        velocity: t.getVelocity(),
        ease: `easeOut`,
        ...a,
        delay: -s,
        onUpdate: (e) => {
          (t.set(e), a.onUpdate && a.onUpdate(e));
        },
        onComplete: () => {
          (i(), a.onComplete && a.onComplete());
        },
      };
      if (
        (Ts(a) ||
          (p = {
            ...p,
            ...ps(e, p),
          }),
        p.duration && (p.duration = _a(p.duration)),
        p.repeatDelay && (p.repeatDelay = _a(p.repeatDelay)),
        !d || !f || ya.current || a.type === !1 || Ds.skipAnimations)
      )
        return cs(
          ya.current
            ? {
                ...p,
                delay: 0,
              }
            : p,
        );
      if (
        !r.isHandoff &&
        t.owner &&
        t.owner.current instanceof HTMLElement &&
        !t.owner.getProps().onUpdate
      ) {
        let n = ss(t, e, p);
        if (n) return n;
      }
      return es(p);
    };
function ks(e) {
  return !!(ur(e) && e.add);
}
var As = (e) => /^\-?\d*\.?\d+$/.test(e);
function js(e, t) {
  e.indexOf(t) === -1 && e.push(t);
}
function Ms(e, t) {
  let n = e.indexOf(t);
  n > -1 && e.splice(n, 1);
}
var Ns = class {
    constructor() {
      this.subscriptions = [];
    }
    add(e) {
      return (js(this.subscriptions, e), () => Ms(this.subscriptions, e));
    }
    notify(e, t, n) {
      let r = this.subscriptions.length;
      if (r) {
        if (r === 1) this.subscriptions[0](e, t, n);
        else
          for (let i = 0; i < r; i++) {
            let r = this.subscriptions[i];
            r && r(e, t, n);
          }
      }
    }
    getSize() {
      return this.subscriptions.length;
    }
    clear() {
      this.subscriptions.length = 0;
    }
  },
  Ps = (e) => !isNaN(parseFloat(e)),
  Fs = {
    current: void 0,
  },
  Is = class {
    constructor(e, t = {}) {
      ((this.version = `10.18.0`),
        (this.timeDelta = 0),
        (this.lastUpdated = 0),
        (this.canTrackVelocity = !1),
        (this.events = {}),
        (this.updateAndNotify = (e, t = !0) => {
          ((this.prev = this.current), (this.current = e));
          let { delta: n, timestamp: r } = ji;
          (this.lastUpdated !== r &&
            ((this.timeDelta = n),
            (this.lastUpdated = r),
            ki.postRender(this.scheduleVelocityCheck)),
            this.prev !== this.current &&
              this.events.change &&
              this.events.change.notify(this.current),
            this.events.velocityChange && this.events.velocityChange.notify(this.getVelocity()),
            t && this.events.renderRequest && this.events.renderRequest.notify(this.current));
        }),
        (this.scheduleVelocityCheck = () => ki.postRender(this.velocityCheck)),
        (this.velocityCheck = ({ timestamp: e }) => {
          e !== this.lastUpdated &&
            ((this.prev = this.current),
            this.events.velocityChange && this.events.velocityChange.notify(this.getVelocity()));
        }),
        (this.hasAnimated = !1),
        (this.prev = this.current = e),
        (this.canTrackVelocity = Ps(this.current)),
        (this.owner = t.owner));
    }
    onChange(e) {
      return this.on(`change`, e);
    }
    on(e, t) {
      this.events[e] || (this.events[e] = new Ns());
      let n = this.events[e].add(t);
      return e === `change`
        ? () => {
            (n(),
              ki.read(() => {
                this.events.change.getSize() || this.stop();
              }));
          }
        : n;
    }
    clearListeners() {
      for (let e in this.events) this.events[e].clear();
    }
    attach(e, t) {
      ((this.passiveEffect = e), (this.stopPassiveEffect = t));
    }
    set(e, t = !0) {
      !t || !this.passiveEffect
        ? this.updateAndNotify(e, t)
        : this.passiveEffect(e, this.updateAndNotify);
    }
    setWithVelocity(e, t, n) {
      (this.set(t), (this.prev = e), (this.timeDelta = n));
    }
    jump(e) {
      (this.updateAndNotify(e),
        (this.prev = e),
        this.stop(),
        this.stopPassiveEffect && this.stopPassiveEffect());
    }
    get() {
      return (Fs.current && Fs.current.push(this), this.current);
    }
    getPrevious() {
      return this.prev;
    }
    getVelocity() {
      return this.canTrackVelocity
        ? Fo(parseFloat(this.current) - parseFloat(this.prev), this.timeDelta)
        : 0;
    }
    start(e) {
      return (
        this.stop(),
        new Promise((t) => {
          ((this.hasAnimated = !0),
            (this.animation = e(t)),
            this.events.animationStart && this.events.animationStart.notify());
        }).then(() => {
          (this.events.animationComplete && this.events.animationComplete.notify(),
            this.clearAnimation());
        })
      );
    }
    stop() {
      (this.animation &&
        (this.animation.stop(),
        this.events.animationCancel && this.events.animationCancel.notify()),
        this.clearAnimation());
    }
    isAnimating() {
      return !!this.animation;
    }
    clearAnimation() {
      delete this.animation;
    }
    destroy() {
      (this.clearListeners(), this.stop(), this.stopPassiveEffect && this.stopPassiveEffect());
    }
  };
function Ls(e, t) {
  return new Is(e, t);
}
var Rs = (e) => (t) => t.test(e),
  zs = [
    br,
    W,
    Ar,
    kr,
    Mr,
    jr,
    {
      test: (e) => e === `auto`,
      parse: (e) => e,
    },
  ],
  Bs = (e) => zs.find(Rs(e)),
  Vs = [...zs, $a, yo],
  Hs = (e) => Vs.find(Rs(e));
function Us(e, t, n) {
  e.hasValue(t) ? e.getValue(t).set(n) : e.addValue(t, Ls(n));
}
function Ws(e, t) {
  let n = ma(e, t),
    { transitionEnd: r = {}, transition: i = {}, ...a } = n ? e.makeTargetAnimatable(n, !1) : {};
  a = {
    ...a,
    ...r,
  };
  for (let t in a) Us(e, t, vi(a[t]));
}
function Gs(e, t, n) {
  let r = Object.keys(t).filter((t) => !e.hasValue(t)),
    i = r.length;
  if (i)
    for (let a = 0; a < i; a++) {
      let i = r[a],
        o = t[i],
        s = null;
      (Array.isArray(o) && (s = o[0]),
        s === null && (s = n[i] ?? e.readValue(i) ?? t[i]),
        s != null &&
          (typeof s == `string` && (As(s) || Ss(s))
            ? (s = parseFloat(s))
            : !Hs(s) && yo.test(o) && (s = xs(i, o)),
          e.addValue(
            i,
            Ls(s, {
              owner: e,
            }),
          ),
          n[i] === void 0 && (n[i] = s),
          s !== null && e.setBaseTarget(i, s)));
    }
}
function Ks(e, t) {
  if (t) return (t[e] || t.default || t).from;
}
function qs(e, t, n) {
  let r = {};
  for (let i in e) {
    let e = Ks(i, t);
    if (e !== void 0) r[i] = e;
    else {
      let e = n.getValue(i);
      e && (r[i] = e.get());
    }
  }
  return r;
}
function Js({ protectedKeys: e, needsAnimating: t }, n) {
  let r = e.hasOwnProperty(n) && t[n] !== !0;
  return ((t[n] = !1), r);
}
function Ys(e, t) {
  let n = e.get();
  if (Array.isArray(t)) {
    for (let e = 0; e < t.length; e++) if (t[e] !== n) return !0;
  } else return n !== t;
}
function Xs(e, t, { delay: n = 0, transitionOverride: r, type: i } = {}) {
  let {
      transition: a = e.getDefaultTransition(),
      transitionEnd: o,
      ...s
    } = e.makeTargetAnimatable(t),
    c = e.getValue(`willChange`);
  r && (a = r);
  let l = [],
    u = i && e.animationState && e.animationState.getState()[i];
  for (let t in s) {
    let r = e.getValue(t),
      i = s[t];
    if (!r || i === void 0 || (u && Js(u, t))) continue;
    let o = {
      delay: n,
      elapsed: 0,
      ...Es(a || {}, t),
    };
    if (window.HandoffAppearAnimations) {
      let n = e.getProps()[Fn];
      if (n) {
        let e = window.HandoffAppearAnimations(n, t, r, ki);
        e !== null && ((o.elapsed = e), (o.isHandoff = !0));
      }
    }
    let d = !o.isHandoff && !Ys(r, i);
    if (
      (o.type === `spring` && (r.getVelocity() || o.velocity) && (d = !1),
      r.animation && (d = !1),
      d)
    )
      continue;
    r.start(
      Os(
        t,
        r,
        i,
        e.shouldReduceMotion && cr.has(t)
          ? {
              type: !1,
            }
          : o,
      ),
    );
    let f = r.animation;
    (ks(c) && (c.add(t), f.then(() => c.remove(t))), l.push(f));
  }
  return (
    o &&
      Promise.all(l).then(() => {
        o && Ws(e, o);
      }),
    l
  );
}
function Zs(e, t, n = {}) {
  let r = ma(e, t, n.custom),
    { transition: i = e.getDefaultTransition() || {} } = r || {};
  n.transitionOverride && (i = n.transitionOverride);
  let a = r ? () => Promise.all(Xs(e, r, n)) : () => Promise.resolve(),
    o =
      e.variantChildren && e.variantChildren.size
        ? (r = 0) => {
            let { delayChildren: a = 0, staggerChildren: o, staggerDirection: s } = i;
            return Qs(e, t, a + r, o, s, n);
          }
        : () => Promise.resolve(),
    { when: s } = i;
  if (s) {
    let [e, t] = s === `beforeChildren` ? [a, o] : [o, a];
    return e().then(() => t());
  }
  return Promise.all([a(), o(n.delay)]);
}
function Qs(e, t, n = 0, r = 0, i = 1, a) {
  let o = [],
    s = (e.variantChildren.size - 1) * r,
    c = i === 1 ? (e = 0) => e * r : (e = 0) => s - e * r;
  return (
    Array.from(e.variantChildren)
      .sort($s)
      .forEach((e, r) => {
        (e.notify(`AnimationStart`, t),
          o.push(
            Zs(e, t, {
              ...a,
              delay: n + c(r),
            }).then(() => e.notify(`AnimationComplete`, t)),
          ));
      }),
    Promise.all(o)
  );
}
function $s(e, t) {
  return e.sortNodePosition(t);
}
function ec(e, t, n = {}) {
  e.notify(`AnimationStart`, t);
  let r;
  if (Array.isArray(t)) {
    let i = t.map((t) => Zs(e, t, n));
    r = Promise.all(i);
  } else if (typeof t == `string`) r = Zs(e, t, n);
  else {
    let i = typeof t == `function` ? ma(e, t, n.custom) : t;
    r = Promise.all(Xs(e, i, n));
  }
  return r.then(() => e.notify(`AnimationComplete`, t));
}
var tc = [...Vn].reverse(),
  nc = Vn.length;
function rc(e) {
  return (t) => Promise.all(t.map(({ animation: t, options: n }) => ec(e, t, n)));
}
function ic(e) {
  let t = rc(e),
    n = sc(),
    r = !0,
    i = (t, n) => {
      let r = ma(e, n);
      if (r) {
        let { transition: e, transitionEnd: n, ...i } = r;
        t = {
          ...t,
          ...i,
          ...n,
        };
      }
      return t;
    };
  function a(n) {
    t = n(e);
  }
  function o(a, o) {
    let s = e.getProps(),
      c = e.getVariantContext(!0) || {},
      l = [],
      u = new Set(),
      d = {},
      f = 1 / 0;
    for (let t = 0; t < nc; t++) {
      let p = tc[t],
        m = n[p],
        h = s[p] === void 0 ? c[p] : s[p],
        g = zn(h),
        _ = p === o ? m.isActive : null;
      _ === !1 && (f = t);
      let v = h === c[p] && h !== s[p] && g;
      if (
        (v && r && e.manuallyAnimateOnMount && (v = !1),
        (m.protectedKeys = {
          ...d,
        }),
        (!m.isActive && _ === null) || (!h && !m.prevProp) || Bn(h) || typeof h == `boolean`)
      )
        continue;
      let y = ac(m.prevProp, h) || (p === o && m.isActive && !v && g) || (t > f && g),
        b = !1,
        x = Array.isArray(h) ? h : [h],
        S = x.reduce(i, {});
      _ === !1 && (S = {});
      let { prevResolvedValues: C = {} } = m,
        w = {
          ...C,
          ...S,
        },
        T = (e) => {
          ((y = !0), u.has(e) && ((b = !0), u.delete(e)), (m.needsAnimating[e] = !0));
        };
      for (let e in w) {
        let t = S[e],
          n = C[e];
        if (d.hasOwnProperty(e)) continue;
        let r = !1;
        ((r = gi(t) && gi(n) ? !da(t, n) : t !== n),
          r
            ? t === void 0
              ? u.add(e)
              : T(e)
            : t !== void 0 && u.has(e)
              ? T(e)
              : (m.protectedKeys[e] = !0));
      }
      ((m.prevProp = h),
        (m.prevResolvedValues = S),
        m.isActive &&
          (d = {
            ...d,
            ...S,
          }),
        r && e.blockInitialAnimation && (y = !1),
        y &&
          (!v || b) &&
          l.push(
            ...x.map((e) => ({
              animation: e,
              options: {
                type: p,
                ...a,
              },
            })),
          ));
    }
    if (u.size) {
      let t = {};
      (u.forEach((n) => {
        let r = e.getBaseTarget(n);
        r !== void 0 && (t[n] = r);
      }),
        l.push({
          animation: t,
        }));
    }
    let p = !!l.length;
    return (
      r && (s.initial === !1 || s.initial === s.animate) && !e.manuallyAnimateOnMount && (p = !1),
      (r = !1),
      p ? t(l) : Promise.resolve()
    );
  }
  function s(t, r, i) {
    var a;
    if (n[t].isActive === r) return Promise.resolve();
    ((a = e.variantChildren) == null || a.forEach((e) => e.animationState?.setActive(t, r)),
      (n[t].isActive = r));
    let s = o(i, t);
    for (let e in n) n[e].protectedKeys = {};
    return s;
  }
  return {
    animateChanges: o,
    setActive: s,
    setAnimateFunction: a,
    getState: () => n,
  };
}
function ac(e, t) {
  return typeof t == `string` ? t !== e : Array.isArray(t) ? !da(t, e) : !1;
}
function oc(e = !1) {
  return {
    isActive: e,
    protectedKeys: {},
    needsAnimating: {},
    prevResolvedValues: {},
  };
}
function sc() {
  return {
    animate: oc(!0),
    whileInView: oc(),
    whileHover: oc(),
    whileTap: oc(),
    whileDrag: oc(),
    whileFocus: oc(),
    exit: oc(),
  };
}
var cc = class extends Ji {
    constructor(e) {
      (super(e), (e.animationState ||= ic(e)));
    }
    updateAnimationControlsSubscription() {
      let { animate: e } = this.node.getProps();
      (this.unmount(), Bn(e) && (this.unmount = e.subscribe(this.node)));
    }
    mount() {
      this.updateAnimationControlsSubscription();
    }
    update() {
      let { animate: e } = this.node.getProps(),
        { animate: t } = this.node.prevProps || {};
      e !== t && this.updateAnimationControlsSubscription();
    }
    unmount() {}
  },
  lc = 0,
  uc = {
    animation: {
      Feature: cc,
    },
    exit: {
      Feature: class extends Ji {
        constructor() {
          (super(...arguments), (this.id = lc++));
        }
        update() {
          if (!this.node.presenceContext) return;
          let { isPresent: e, onExitComplete: t, custom: n } = this.node.presenceContext,
            { isPresent: r } = this.node.prevPresenceContext || {};
          if (!this.node.animationState || e === r) return;
          let i = this.node.animationState.setActive(`exit`, !e, {
            custom: n ?? this.node.getProps().custom,
          });
          t && !e && i.then(() => t(this.id));
        }
        mount() {
          let { register: e } = this.node.presenceContext || {};
          e && (this.unmount = e(this.id));
        }
        unmount() {}
      },
    },
  },
  dc = (e, t) => Math.abs(e - t);
function fc(e, t) {
  let n = dc(e.x, t.x),
    r = dc(e.y, t.y);
  return Math.sqrt(n ** 2 + r ** 2);
}
var pc = class {
  constructor(e, t, { transformPagePoint: n, contextWindow: r, dragSnapToOrigin: i = !1 } = {}) {
    if (
      ((this.startEvent = null),
      (this.lastMoveEvent = null),
      (this.lastMoveEventInfo = null),
      (this.handlers = {}),
      (this.contextWindow = window),
      (this.updatePoint = () => {
        if (!(this.lastMoveEvent && this.lastMoveEventInfo)) return;
        let e = gc(this.lastMoveEventInfo, this.history),
          t = this.startEvent !== null,
          n =
            fc(e.offset, {
              x: 0,
              y: 0,
            }) >= 3;
        if (!t && !n) return;
        let { point: r } = e,
          { timestamp: i } = ji;
        this.history.push({
          ...r,
          timestamp: i,
        });
        let { onStart: a, onMove: o } = this.handlers;
        (t || (a && a(this.lastMoveEvent, e), (this.startEvent = this.lastMoveEvent)),
          o && o(this.lastMoveEvent, e));
      }),
      (this.handlePointerMove = (e, t) => {
        ((this.lastMoveEvent = e),
          (this.lastMoveEventInfo = mc(t, this.transformPagePoint)),
          ki.update(this.updatePoint, !0));
      }),
      (this.handlePointerUp = (e, t) => {
        this.end();
        let { onEnd: n, onSessionEnd: r, resumeAnimation: i } = this.handlers;
        if ((this.dragSnapToOrigin && i && i(), !(this.lastMoveEvent && this.lastMoveEventInfo)))
          return;
        let a = gc(
          e.type === `pointercancel` ? this.lastMoveEventInfo : mc(t, this.transformPagePoint),
          this.history,
        );
        (this.startEvent && n && n(e, a), r && r(e, a));
      }),
      !Li(e))
    )
      return;
    ((this.dragSnapToOrigin = i),
      (this.handlers = t),
      (this.transformPagePoint = n),
      (this.contextWindow = r || window));
    let a = mc(Ri(e), this.transformPagePoint),
      { point: o } = a,
      { timestamp: s } = ji;
    this.history = [
      {
        ...o,
        timestamp: s,
      },
    ];
    let { onSessionStart: c } = t;
    (c && c(e, gc(a, this.history)),
      (this.removeListeners = Hi(
        Bi(this.contextWindow, `pointermove`, this.handlePointerMove),
        Bi(this.contextWindow, `pointerup`, this.handlePointerUp),
        Bi(this.contextWindow, `pointercancel`, this.handlePointerUp),
      )));
  }
  updateHandlers(e) {
    this.handlers = e;
  }
  end() {
    (this.removeListeners && this.removeListeners(), Ai(this.updatePoint));
  }
};
function mc(e, t) {
  return t
    ? {
        point: t(e.point),
      }
    : e;
}
function hc(e, t) {
  return {
    x: e.x - t.x,
    y: e.y - t.y,
  };
}
function gc({ point: e }, t) {
  return {
    point: e,
    delta: hc(e, vc(t)),
    offset: hc(e, _c(t)),
    velocity: G(t, 0.1),
  };
}
function _c(e) {
  return e[0];
}
function vc(e) {
  return e[e.length - 1];
}
function G(e, t) {
  if (e.length < 2)
    return {
      x: 0,
      y: 0,
    };
  let n = e.length - 1,
    r = null,
    i = vc(e);
  for (; n >= 0 && ((r = e[n]), !(i.timestamp - r.timestamp > _a(t)));) n--;
  if (!r)
    return {
      x: 0,
      y: 0,
    };
  let a = va(i.timestamp - r.timestamp);
  if (a === 0)
    return {
      x: 0,
      y: 0,
    };
  let o = {
    x: (i.x - r.x) / a,
    y: (i.y - r.y) / a,
  };
  return (o.x === 1 / 0 && (o.x = 0), o.y === 1 / 0 && (o.y = 0), o);
}
function yc(e) {
  return e.max - e.min;
}
function bc(e, t = 0, n = 0.01) {
  return Math.abs(e - t) <= n;
}
function xc(e, t, n, r = 0.5) {
  ((e.origin = r),
    (e.originPoint = eo(t.min, t.max, e.origin)),
    (e.scale = yc(n) / yc(t)),
    (bc(e.scale, 1, 1e-4) || isNaN(e.scale)) && (e.scale = 1),
    (e.translate = eo(n.min, n.max, e.origin) - e.originPoint),
    (bc(e.translate) || isNaN(e.translate)) && (e.translate = 0));
}
function Sc(e, t, n, r) {
  (xc(e.x, t.x, n.x, r ? r.originX : void 0), xc(e.y, t.y, n.y, r ? r.originY : void 0));
}
function Cc(e, t, n) {
  ((e.min = n.min + t.min), (e.max = e.min + yc(t)));
}
function wc(e, t, n) {
  (Cc(e.x, t.x, n.x), Cc(e.y, t.y, n.y));
}
function Tc(e, t, n) {
  ((e.min = t.min - n.min), (e.max = e.min + yc(t)));
}
function Ec(e, t, n) {
  (Tc(e.x, t.x, n.x), Tc(e.y, t.y, n.y));
}
function Dc(e, { min: t, max: n }, r) {
  return (
    t !== void 0 && e < t
      ? (e = r ? eo(t, e, r.min) : Math.max(e, t))
      : n !== void 0 && e > n && (e = r ? eo(n, e, r.max) : Math.min(e, n)),
    e
  );
}
function Oc(e, t, n) {
  return {
    min: t === void 0 ? void 0 : e.min + t,
    max: n === void 0 ? void 0 : e.max + n - (e.max - e.min),
  };
}
function kc(e, { top: t, left: n, bottom: r, right: i }) {
  return {
    x: Oc(e.x, n, i),
    y: Oc(e.y, t, r),
  };
}
function Ac(e, t) {
  let n = t.min - e.min,
    r = t.max - e.max;
  return (
    t.max - t.min < e.max - e.min && ([n, r] = [r, n]),
    {
      min: n,
      max: r,
    }
  );
}
function jc(e, t) {
  return {
    x: Ac(e.x, t.x),
    y: Ac(e.y, t.y),
  };
}
function Mc(e, t) {
  let n = 0.5,
    r = yc(e),
    i = yc(t);
  return (
    i > r ? (n = To(t.min, t.max - r, e.min)) : r > i && (n = To(e.min, e.max - i, t.min)),
    yr(0, 1, n)
  );
}
function Nc(e, t) {
  let n = {};
  return (
    t.min !== void 0 && (n.min = t.min - e.min),
    t.max !== void 0 && (n.max = t.max - e.min),
    n
  );
}
var Pc = 0.35;
function Fc(e = Pc) {
  return (
    e === !1 ? (e = 0) : e === !0 && (e = Pc),
    {
      x: Ic(e, `left`, `right`),
      y: Ic(e, `top`, `bottom`),
    }
  );
}
function Ic(e, t, n) {
  return {
    min: Lc(e, t),
    max: Lc(e, n),
  };
}
function Lc(e, t) {
  return typeof e == `number` ? e : e[t] || 0;
}
var Rc = () => ({
    translate: 0,
    scale: 1,
    origin: 0,
    originPoint: 0,
  }),
  zc = () => ({
    x: Rc(),
    y: Rc(),
  }),
  Bc = () => ({
    min: 0,
    max: 0,
  }),
  Vc = () => ({
    x: Bc(),
    y: Bc(),
  });
function Hc(e) {
  return [e(`x`), e(`y`)];
}
function Uc({ top: e, left: t, right: n, bottom: r }) {
  return {
    x: {
      min: t,
      max: n,
    },
    y: {
      min: e,
      max: r,
    },
  };
}
function Wc({ x: e, y: t }) {
  return {
    top: t.min,
    right: e.max,
    bottom: t.max,
    left: e.min,
  };
}
function Gc(e, t) {
  if (!t) return e;
  let n = t({
      x: e.left,
      y: e.top,
    }),
    r = t({
      x: e.right,
      y: e.bottom,
    });
  return {
    top: n.y,
    left: n.x,
    bottom: r.y,
    right: r.x,
  };
}
function Kc(e) {
  return e === void 0 || e === 1;
}
function qc({ scale: e, scaleX: t, scaleY: n }) {
  return !Kc(e) || !Kc(t) || !Kc(n);
}
function Jc(e) {
  return qc(e) || Yc(e) || e.z || e.rotate || e.rotateX || e.rotateY;
}
function Yc(e) {
  return Xc(e.x) || Xc(e.y);
}
function Xc(e) {
  return e && e !== `0%`;
}
function Zc(e, t, n) {
  return n + t * (e - n);
}
function Qc(e, t, n, r, i) {
  return (i !== void 0 && (e = Zc(e, i, r)), Zc(e, n, r) + t);
}
function $c(e, t = 0, n = 1, r, i) {
  ((e.min = Qc(e.min, t, n, r, i)), (e.max = Qc(e.max, t, n, r, i)));
}
function el(e, { x: t, y: n }) {
  ($c(e.x, t.translate, t.scale, t.originPoint), $c(e.y, n.translate, n.scale, n.originPoint));
}
function tl(e, t, n, r = !1) {
  let i = n.length;
  if (!i) return;
  t.x = t.y = 1;
  let a, o;
  for (let s = 0; s < i; s++) {
    ((a = n[s]), (o = a.projectionDelta));
    let i = a.instance;
    (i && i.style && i.style.display === `contents`) ||
      (r &&
        a.options.layoutScroll &&
        a.scroll &&
        a !== a.root &&
        sl(e, {
          x: -a.scroll.offset.x,
          y: -a.scroll.offset.y,
        }),
      o && ((t.x *= o.x.scale), (t.y *= o.y.scale), el(e, o)),
      r && Jc(a.latestValues) && sl(e, a.latestValues));
  }
  ((t.x = nl(t.x)), (t.y = nl(t.y)));
}
function nl(e) {
  return Number.isInteger(e) || e > 1.0000000000001 || e < 0.999999999999 ? e : 1;
}
function rl(e, t) {
  ((e.min += t), (e.max += t));
}
function il(e, t, [n, r, i]) {
  let a = t[i] === void 0 ? 0.5 : t[i],
    o = eo(e.min, e.max, a);
  $c(e, t[n], t[r], o, t.scale);
}
var al = [`x`, `scaleX`, `originX`],
  ol = [`y`, `scaleY`, `originY`];
function sl(e, t) {
  (il(e.x, t, al), il(e.y, t, ol));
}
function cl(e, t) {
  return Uc(Gc(e.getBoundingClientRect(), t));
}
function ll(e, t, n) {
  let r = cl(e, n),
    { scroll: i } = t;
  return (i && (rl(r.x, i.offset.x), rl(r.y, i.offset.y)), r);
}
var ul = ({ current: e }) => (e ? e.ownerDocument.defaultView : null),
  dl = new WeakMap(),
  fl = class {
    constructor(e) {
      ((this.openGlobalLock = null),
        (this.isDragging = !1),
        (this.currentDirection = null),
        (this.originPoint = {
          x: 0,
          y: 0,
        }),
        (this.constraints = !1),
        (this.hasMutatedConstraints = !1),
        (this.elastic = Vc()),
        (this.visualElement = e));
    }
    start(e, { snapToCursor: t = !1 } = {}) {
      let { presenceContext: n } = this.visualElement;
      if (n && n.isPresent === !1) return;
      let r = (e) => {
          let { dragSnapToOrigin: n } = this.getProps();
          (n ? this.pauseAnimation() : this.stopAnimation(),
            t && this.snapToCursor(Ri(e, `page`).point));
        },
        i = (e, t) => {
          let { drag: n, dragPropagation: r, onDragStart: i } = this.getProps();
          if (
            n &&
            !r &&
            (this.openGlobalLock && this.openGlobalLock(),
            (this.openGlobalLock = Ki(n)),
            !this.openGlobalLock)
          )
            return;
          ((this.isDragging = !0),
            (this.currentDirection = null),
            this.resolveConstraints(),
            this.visualElement.projection &&
              ((this.visualElement.projection.isAnimationBlocked = !0),
              (this.visualElement.projection.target = void 0)),
            Hc((e) => {
              let t = this.getAxisMotionValue(e).get() || 0;
              if (Ar.test(t)) {
                let { projection: n } = this.visualElement;
                if (n && n.layout) {
                  let r = n.layout.layoutBox[e];
                  r && (t = yc(r) * (parseFloat(t) / 100));
                }
              }
              this.originPoint[e] = t;
            }),
            i && ki.update(() => i(e, t), !1, !0));
          let { animationState: a } = this.visualElement;
          a && a.setActive(`whileDrag`, !0);
        },
        a = (e, t) => {
          let {
            dragPropagation: n,
            dragDirectionLock: r,
            onDirectionLock: i,
            onDrag: a,
          } = this.getProps();
          if (!n && !this.openGlobalLock) return;
          let { offset: o } = t;
          if (r && this.currentDirection === null) {
            ((this.currentDirection = ml(o)),
              this.currentDirection !== null && i && i(this.currentDirection));
            return;
          }
          (this.updateAxis(`x`, t.point, o),
            this.updateAxis(`y`, t.point, o),
            this.visualElement.render(),
            a && a(e, t));
        },
        o = (e, t) => this.stop(e, t),
        s = () =>
          Hc(
            (e) =>
              this.getAnimationState(e) === `paused` &&
              this.getAxisMotionValue(e).animation?.play(),
          ),
        { dragSnapToOrigin: c } = this.getProps();
      this.panSession = new pc(
        e,
        {
          onSessionStart: r,
          onStart: i,
          onMove: a,
          onSessionEnd: o,
          resumeAnimation: s,
        },
        {
          transformPagePoint: this.visualElement.getTransformPagePoint(),
          dragSnapToOrigin: c,
          contextWindow: ul(this.visualElement),
        },
      );
    }
    stop(e, t) {
      let n = this.isDragging;
      if ((this.cancel(), !n)) return;
      let { velocity: r } = t;
      this.startAnimation(r);
      let { onDragEnd: i } = this.getProps();
      i && ki.update(() => i(e, t));
    }
    cancel() {
      this.isDragging = !1;
      let { projection: e, animationState: t } = this.visualElement;
      (e && (e.isAnimationBlocked = !1),
        this.panSession && this.panSession.end(),
        (this.panSession = void 0));
      let { dragPropagation: n } = this.getProps();
      (!n && this.openGlobalLock && (this.openGlobalLock(), (this.openGlobalLock = null)),
        t && t.setActive(`whileDrag`, !1));
    }
    updateAxis(e, t, n) {
      let { drag: r } = this.getProps();
      if (!n || !pl(e, r, this.currentDirection)) return;
      let i = this.getAxisMotionValue(e),
        a = this.originPoint[e] + n[e];
      (this.constraints && this.constraints[e] && (a = Dc(a, this.constraints[e], this.elastic[e])),
        i.set(a));
    }
    resolveConstraints() {
      let { dragConstraints: e, dragElastic: t } = this.getProps(),
        n =
          this.visualElement.projection && !this.visualElement.projection.layout
            ? this.visualElement.projection.measure(!1)
            : this.visualElement.projection?.layout,
        r = this.constraints;
      (e && Ln(e)
        ? (this.constraints ||= this.resolveRefConstraints())
        : (this.constraints = e && n ? kc(n.layoutBox, e) : !1),
        (this.elastic = Fc(t)),
        r !== this.constraints &&
          n &&
          this.constraints &&
          !this.hasMutatedConstraints &&
          Hc((e) => {
            this.getAxisMotionValue(e) &&
              (this.constraints[e] = Nc(n.layoutBox[e], this.constraints[e]));
          }));
    }
    resolveRefConstraints() {
      let { dragConstraints: e, onMeasureDragConstraints: t } = this.getProps();
      if (!e || !Ln(e)) return !1;
      let n = e.current;
      ga(
        n !== null,
        "If `dragConstraints` is set as a React ref, that ref must be passed to another component's `ref` prop.",
      );
      let { projection: r } = this.visualElement;
      if (!r || !r.layout) return !1;
      let i = ll(n, r.root, this.visualElement.getTransformPagePoint()),
        a = jc(r.layout.layoutBox, i);
      if (t) {
        let e = t(Wc(a));
        ((this.hasMutatedConstraints = !!e), e && (a = Uc(e)));
      }
      return a;
    }
    startAnimation(e) {
      let {
          drag: t,
          dragMomentum: n,
          dragElastic: r,
          dragTransition: i,
          dragSnapToOrigin: a,
          onDragTransitionEnd: o,
        } = this.getProps(),
        s = this.constraints || {},
        c = Hc((o) => {
          if (!pl(o, t, this.currentDirection)) return;
          let c = (s && s[o]) || {};
          a &&
            (c = {
              min: 0,
              max: 0,
            });
          let l = r ? 200 : 1e6,
            u = r ? 40 : 1e7,
            d = {
              type: `inertia`,
              velocity: n ? e[o] : 0,
              bounceStiffness: l,
              bounceDamping: u,
              timeConstant: 750,
              restDelta: 1,
              restSpeed: 10,
              ...i,
              ...c,
            };
          return this.startAxisValueAnimation(o, d);
        });
      return Promise.all(c).then(o);
    }
    startAxisValueAnimation(e, t) {
      let n = this.getAxisMotionValue(e);
      return n.start(Os(e, n, 0, t));
    }
    stopAnimation() {
      Hc((e) => this.getAxisMotionValue(e).stop());
    }
    pauseAnimation() {
      Hc((e) => this.getAxisMotionValue(e).animation?.pause());
    }
    getAnimationState(e) {
      return this.getAxisMotionValue(e).animation?.state;
    }
    getAxisMotionValue(e) {
      let t = `_drag` + e.toUpperCase(),
        n = this.visualElement.getProps();
      return n[t] || this.visualElement.getValue(e, (n.initial ? n.initial[e] : void 0) || 0);
    }
    snapToCursor(e) {
      Hc((t) => {
        let { drag: n } = this.getProps();
        if (!pl(t, n, this.currentDirection)) return;
        let { projection: r } = this.visualElement,
          i = this.getAxisMotionValue(t);
        if (r && r.layout) {
          let { min: n, max: a } = r.layout.layoutBox[t];
          i.set(e[t] - eo(n, a, 0.5));
        }
      });
    }
    scalePositionWithinConstraints() {
      if (!this.visualElement.current) return;
      let { drag: e, dragConstraints: t } = this.getProps(),
        { projection: n } = this.visualElement;
      if (!Ln(t) || !n || !this.constraints) return;
      this.stopAnimation();
      let r = {
        x: 0,
        y: 0,
      };
      Hc((e) => {
        let t = this.getAxisMotionValue(e);
        if (t) {
          let n = t.get();
          r[e] = Mc(
            {
              min: n,
              max: n,
            },
            this.constraints[e],
          );
        }
      });
      let { transformTemplate: i } = this.visualElement.getProps();
      ((this.visualElement.current.style.transform = i ? i({}, ``) : `none`),
        n.root && n.root.updateScroll(),
        n.updateLayout(),
        this.resolveConstraints(),
        Hc((t) => {
          if (!pl(t, e, null)) return;
          let n = this.getAxisMotionValue(t),
            { min: i, max: a } = this.constraints[t];
          n.set(eo(i, a, r[t]));
        }));
    }
    addListeners() {
      if (!this.visualElement.current) return;
      dl.set(this.visualElement, this);
      let e = this.visualElement.current,
        t = Bi(e, `pointerdown`, (e) => {
          let { drag: t, dragListener: n = !0 } = this.getProps();
          t && n && this.start(e);
        }),
        n = () => {
          let { dragConstraints: e } = this.getProps();
          Ln(e) && (this.constraints = this.resolveRefConstraints());
        },
        { projection: r } = this.visualElement,
        i = r.addEventListener(`measure`, n);
      (r && !r.layout && (r.root && r.root.updateScroll(), r.updateLayout()), n());
      let a = Ii(window, `resize`, () => this.scalePositionWithinConstraints()),
        o = r.addEventListener(`didUpdate`, ({ delta: e, hasLayoutChanged: t }) => {
          this.isDragging &&
            t &&
            (Hc((t) => {
              let n = this.getAxisMotionValue(t);
              n && ((this.originPoint[t] += e[t].translate), n.set(n.get() + e[t].translate));
            }),
            this.visualElement.render());
        });
      return () => {
        (a(), t(), i(), o && o());
      };
    }
    getProps() {
      let e = this.visualElement.getProps(),
        {
          drag: t = !1,
          dragDirectionLock: n = !1,
          dragPropagation: r = !1,
          dragConstraints: i = !1,
          dragElastic: a = Pc,
          dragMomentum: o = !0,
        } = e;
      return {
        ...e,
        drag: t,
        dragDirectionLock: n,
        dragPropagation: r,
        dragConstraints: i,
        dragElastic: a,
        dragMomentum: o,
      };
    }
  };
function pl(e, t, n) {
  return (t === !0 || t === e) && (n === null || n === e);
}
function ml(e, t = 10) {
  let n = null;
  return (Math.abs(e.y) > t ? (n = `y`) : Math.abs(e.x) > t && (n = `x`), n);
}
var hl = class extends Ji {
    constructor(e) {
      (super(e),
        (this.removeGroupControls = Ci),
        (this.removeListeners = Ci),
        (this.controls = new fl(e)));
    }
    mount() {
      let { dragControls: e } = this.node.getProps();
      (e && (this.removeGroupControls = e.subscribe(this.controls)),
        (this.removeListeners = this.controls.addListeners() || Ci));
    }
    unmount() {
      (this.removeGroupControls(), this.removeListeners());
    }
  },
  gl = (e) => (t, n) => {
    e && ki.update(() => e(t, n));
  },
  _l = class extends Ji {
    constructor() {
      (super(...arguments), (this.removePointerDownListener = Ci));
    }
    onPointerDown(e) {
      this.session = new pc(e, this.createPanHandlers(), {
        transformPagePoint: this.node.getTransformPagePoint(),
        contextWindow: ul(this.node),
      });
    }
    createPanHandlers() {
      let { onPanSessionStart: e, onPanStart: t, onPan: n, onPanEnd: r } = this.node.getProps();
      return {
        onSessionStart: gl(e),
        onStart: gl(t),
        onMove: n,
        onEnd: (e, t) => {
          (delete this.session, r && ki.update(() => r(e, t)));
        },
      };
    }
    mount() {
      this.removePointerDownListener = Bi(this.node.current, `pointerdown`, (e) =>
        this.onPointerDown(e),
      );
    }
    update() {
      this.session && this.session.updateHandlers(this.createPanHandlers());
    }
    unmount() {
      (this.removePointerDownListener(), this.session && this.session.end());
    }
  };
function vl() {
  let e = (0, y.useContext)(An);
  if (e === null) return [!0, null];
  let { isPresent: t, onExitComplete: n, register: r } = e,
    i = (0, y.useId)();
  return ((0, y.useEffect)(() => r(i), []), !t && n ? [!1, () => n && n(i)] : [!0]);
}
var yl = {
  hasAnimatedSinceResize: !0,
  hasEverUpdated: !1,
};
function bl(e, t) {
  return t.max === t.min ? 0 : (e / (t.max - t.min)) * 100;
}
var xl = {
    correct: (e, t) => {
      if (!t.target) return e;
      if (typeof e == `string`) {
        if (W.test(e)) e = parseFloat(e);
        else return e;
      }
      return `${bl(e, t.target.x)}% ${bl(e, t.target.y)}%`;
    },
  },
  Sl = {
    correct: (e, { treeScale: t, projectionDelta: n }) => {
      let r = e,
        i = yo.parse(e);
      if (i.length > 5) return r;
      let a = yo.createTransformer(e),
        o = typeof i[0] == `number` ? 0 : 1,
        s = n.x.scale * t.x,
        c = n.y.scale * t.y;
      ((i[0 + o] /= s), (i[1 + o] /= c));
      let l = eo(s, c, 0.5);
      return (
        typeof i[2 + o] == `number` && (i[2 + o] /= l),
        typeof i[3 + o] == `number` && (i[3 + o] /= l),
        a(i)
      );
    },
  },
  Cl = class extends y.Component {
    componentDidMount() {
      let { visualElement: e, layoutGroup: t, switchLayoutGroup: n, layoutId: r } = this.props,
        { projection: i } = e;
      (or(Tl),
        i &&
          (t.group && t.group.add(i),
          n && n.register && r && n.register(i),
          i.root.didUpdate(),
          i.addEventListener(`animationComplete`, () => {
            this.safeToRemove();
          }),
          i.setOptions({
            ...i.options,
            onExitComplete: () => this.safeToRemove(),
          })),
        (yl.hasEverUpdated = !0));
    }
    getSnapshotBeforeUpdate(e) {
      let { layoutDependency: t, visualElement: n, drag: r, isPresent: i } = this.props,
        a = n.projection;
      return a
        ? ((a.isPresent = i),
          r || e.layoutDependency !== t || t === void 0 ? a.willUpdate() : this.safeToRemove(),
          e.isPresent !== i &&
            (i
              ? a.promote()
              : a.relegate() ||
                ki.postRender(() => {
                  let e = a.getStack();
                  (!e || !e.members.length) && this.safeToRemove();
                })),
          null)
        : null;
    }
    componentDidUpdate() {
      let { projection: e } = this.props.visualElement;
      e &&
        (e.root.didUpdate(),
        queueMicrotask(() => {
          !e.currentAnimation && e.isLead() && this.safeToRemove();
        }));
    }
    componentWillUnmount() {
      let { visualElement: e, layoutGroup: t, switchLayoutGroup: n } = this.props,
        { projection: r } = e;
      r &&
        (r.scheduleCheckAfterUnmount(),
        t && t.group && t.group.remove(r),
        n && n.deregister && n.deregister(r));
    }
    safeToRemove() {
      let { safeToRemove: e } = this.props;
      e && e();
    }
    render() {
      return null;
    }
  };
function wl(e) {
  let [t, n] = vl(),
    r = (0, y.useContext)(Zn);
  return y.createElement(Cl, {
    ...e,
    layoutGroup: r,
    switchLayoutGroup: (0, y.useContext)(Qn),
    isPresent: t,
    safeToRemove: n,
  });
}
var Tl = {
    borderRadius: {
      ...xl,
      applyTo: [
        `borderTopLeftRadius`,
        `borderTopRightRadius`,
        `borderBottomLeftRadius`,
        `borderBottomRightRadius`,
      ],
    },
    borderTopLeftRadius: xl,
    borderTopRightRadius: xl,
    borderBottomLeftRadius: xl,
    borderBottomRightRadius: xl,
    boxShadow: Sl,
  },
  El = [`TopLeft`, `TopRight`, `BottomLeft`, `BottomRight`],
  Dl = El.length,
  Ol = (e) => (typeof e == `string` ? parseFloat(e) : e),
  kl = (e) => typeof e == `number` || W.test(e);
function Al(e, t, n, r, i, a) {
  i
    ? ((e.opacity = eo(0, n.opacity === void 0 ? 1 : n.opacity, Ml(r))),
      (e.opacityExit = eo(t.opacity === void 0 ? 1 : t.opacity, 0, Nl(r))))
    : a &&
      (e.opacity = eo(
        t.opacity === void 0 ? 1 : t.opacity,
        n.opacity === void 0 ? 1 : n.opacity,
        r,
      ));
  for (let i = 0; i < Dl; i++) {
    let a = `border${El[i]}Radius`,
      o = jl(t, a),
      s = jl(n, a);
    (o !== void 0 || s !== void 0) &&
      ((o ||= 0),
      (s ||= 0),
      o === 0 || s === 0 || kl(o) === kl(s)
        ? ((e[a] = Math.max(eo(Ol(o), Ol(s), r), 0)), (Ar.test(s) || Ar.test(o)) && (e[a] += `%`))
        : (e[a] = s));
  }
  (t.rotate || n.rotate) && (e.rotate = eo(t.rotate || 0, n.rotate || 0, r));
}
function jl(e, t) {
  return e[t] === void 0 ? e.borderRadius : e[t];
}
var Ml = Pl(0, 0.5, za),
  Nl = Pl(0.5, 0.95, Ci);
function Pl(e, t, n) {
  return (r) => (r < e ? 0 : r > t ? 1 : n(To(e, t, r)));
}
function Fl(e, t) {
  ((e.min = t.min), (e.max = t.max));
}
function Il(e, t) {
  (Fl(e.x, t.x), Fl(e.y, t.y));
}
function Ll(e, t, n, r, i) {
  return ((e -= t), (e = Zc(e, 1 / n, r)), i !== void 0 && (e = Zc(e, 1 / i, r)), e);
}
function Rl(e, t = 0, n = 1, r = 0.5, i, a = e, o = e) {
  if (
    (Ar.test(t) && ((t = parseFloat(t)), (t = eo(o.min, o.max, t / 100) - o.min)),
    typeof t != `number`)
  )
    return;
  let s = eo(a.min, a.max, r);
  (e === a && (s -= t), (e.min = Ll(e.min, t, n, s, i)), (e.max = Ll(e.max, t, n, s, i)));
}
function zl(e, t, [n, r, i], a, o) {
  Rl(e, t[n], t[r], t[i], t.scale, a, o);
}
var Bl = [`x`, `scaleX`, `originX`],
  Vl = [`y`, `scaleY`, `originY`];
function Hl(e, t, n, r) {
  (zl(e.x, t, Bl, n ? n.x : void 0, r ? r.x : void 0),
    zl(e.y, t, Vl, n ? n.y : void 0, r ? r.y : void 0));
}
function Ul(e) {
  return e.translate === 0 && e.scale === 1;
}
function Wl(e) {
  return Ul(e.x) && Ul(e.y);
}
function Gl(e, t) {
  return e.x.min === t.x.min && e.x.max === t.x.max && e.y.min === t.y.min && e.y.max === t.y.max;
}
function Kl(e, t) {
  return (
    Math.round(e.x.min) === Math.round(t.x.min) &&
    Math.round(e.x.max) === Math.round(t.x.max) &&
    Math.round(e.y.min) === Math.round(t.y.min) &&
    Math.round(e.y.max) === Math.round(t.y.max)
  );
}
function ql(e) {
  return yc(e.x) / yc(e.y);
}
var Jl = class {
  constructor() {
    this.members = [];
  }
  add(e) {
    (js(this.members, e), e.scheduleRender());
  }
  remove(e) {
    if ((Ms(this.members, e), e === this.prevLead && (this.prevLead = void 0), e === this.lead)) {
      let e = this.members[this.members.length - 1];
      e && this.promote(e);
    }
  }
  relegate(e) {
    let t = this.members.findIndex((t) => e === t);
    if (t === 0) return !1;
    let n;
    for (let e = t; e >= 0; e--) {
      let t = this.members[e];
      if (t.isPresent !== !1) {
        n = t;
        break;
      }
    }
    return n ? (this.promote(n), !0) : !1;
  }
  promote(e, t) {
    let n = this.lead;
    if (e !== n && ((this.prevLead = n), (this.lead = e), e.show(), n)) {
      (n.instance && n.scheduleRender(),
        e.scheduleRender(),
        (e.resumeFrom = n),
        t && (e.resumeFrom.preserveOpacity = !0),
        n.snapshot &&
          ((e.snapshot = n.snapshot),
          (e.snapshot.latestValues = n.animationValues || n.latestValues)),
        e.root && e.root.isUpdating && (e.isLayoutDirty = !0));
      let { crossfade: r } = e.options;
      r === !1 && n.hide();
    }
  }
  exitAnimationComplete() {
    this.members.forEach((e) => {
      let { options: t, resumingFrom: n } = e;
      (t.onExitComplete && t.onExitComplete(),
        n && n.options.onExitComplete && n.options.onExitComplete());
    });
  }
  scheduleRender() {
    this.members.forEach((e) => {
      e.instance && e.scheduleRender(!1);
    });
  }
  removeLeadSnapshot() {
    this.lead && this.lead.snapshot && (this.lead.snapshot = void 0);
  }
};
function Yl(e, t, n) {
  let r = ``,
    i = e.x.translate / t.x,
    a = e.y.translate / t.y;
  if (
    ((i || a) && (r = `translate3d(${i}px, ${a}px, 0) `),
    (t.x !== 1 || t.y !== 1) && (r += `scale(${1 / t.x}, ${1 / t.y}) `),
    n)
  ) {
    let { rotate: e, rotateX: t, rotateY: i } = n;
    (e && (r += `rotate(${e}deg) `),
      t && (r += `rotateX(${t}deg) `),
      i && (r += `rotateY(${i}deg) `));
  }
  let o = e.x.scale * t.x,
    s = e.y.scale * t.y;
  return ((o !== 1 || s !== 1) && (r += `scale(${o}, ${s})`), r || `none`);
}
var Xl = (e, t) => e.depth - t.depth,
  Zl = class {
    constructor() {
      ((this.children = []), (this.isDirty = !1));
    }
    add(e) {
      (js(this.children, e), (this.isDirty = !0));
    }
    remove(e) {
      (Ms(this.children, e), (this.isDirty = !0));
    }
    forEach(e) {
      (this.isDirty && this.children.sort(Xl), (this.isDirty = !1), this.children.forEach(e));
    }
  };
function Ql(e, t) {
  let n = performance.now(),
    r = ({ timestamp: i }) => {
      let a = i - n;
      a >= t && (Ai(r), e(a - t));
    };
  return (ki.read(r, !0), () => Ai(r));
}
function $l(e) {
  window.MotionDebug && window.MotionDebug.record(e);
}
function eu(e) {
  return e instanceof SVGElement && e.tagName !== `svg`;
}
function tu(e, t, n) {
  let r = ur(e) ? e : Ls(e);
  return (r.start(Os(``, r, t, n)), r.animation);
}
var nu = [``, `X`, `Y`, `Z`],
  ru = {
    visibility: `hidden`,
  },
  iu = 1e3,
  au = 0,
  ou = {
    type: `projectionFrame`,
    totalNodes: 0,
    resolvedTargetDeltas: 0,
    recalculatedProjection: 0,
  };
function su({
  attachResizeListener: e,
  defaultParent: t,
  measureScroll: n,
  checkIsScrollRoot: r,
  resetTransform: i,
}) {
  return class {
    constructor(e = {}, n = t?.()) {
      ((this.id = au++),
        (this.animationId = 0),
        (this.children = new Set()),
        (this.options = {}),
        (this.isTreeAnimating = !1),
        (this.isAnimationBlocked = !1),
        (this.isLayoutDirty = !1),
        (this.isProjectionDirty = !1),
        (this.isSharedProjectionDirty = !1),
        (this.isTransformDirty = !1),
        (this.updateManuallyBlocked = !1),
        (this.updateBlockedByResize = !1),
        (this.isUpdating = !1),
        (this.isSVG = !1),
        (this.needsReset = !1),
        (this.shouldResetTransform = !1),
        (this.treeScale = {
          x: 1,
          y: 1,
        }),
        (this.eventHandlers = new Map()),
        (this.hasTreeAnimated = !1),
        (this.updateScheduled = !1),
        (this.projectionUpdateScheduled = !1),
        (this.checkUpdateFailed = () => {
          this.isUpdating && ((this.isUpdating = !1), this.clearAllSnapshots());
        }),
        (this.updateProjection = () => {
          ((this.projectionUpdateScheduled = !1),
            (ou.totalNodes = ou.resolvedTargetDeltas = ou.recalculatedProjection = 0),
            this.nodes.forEach(uu),
            this.nodes.forEach(_u),
            this.nodes.forEach(vu),
            this.nodes.forEach(du),
            $l(ou));
        }),
        (this.hasProjected = !1),
        (this.isVisible = !0),
        (this.animationProgress = 0),
        (this.sharedNodes = new Map()),
        (this.latestValues = e),
        (this.root = n ? n.root || n : this),
        (this.path = n ? [...n.path, n] : []),
        (this.parent = n),
        (this.depth = n ? n.depth + 1 : 0));
      for (let e = 0; e < this.path.length; e++) this.path[e].shouldResetTransform = !0;
      this.root === this && (this.nodes = new Zl());
    }
    addEventListener(e, t) {
      return (
        this.eventHandlers.has(e) || this.eventHandlers.set(e, new Ns()),
        this.eventHandlers.get(e).add(t)
      );
    }
    notifyListeners(e, ...t) {
      let n = this.eventHandlers.get(e);
      n && n.notify(...t);
    }
    hasListeners(e) {
      return this.eventHandlers.has(e);
    }
    mount(t, n = this.root.hasTreeAnimated) {
      if (this.instance) return;
      ((this.isSVG = eu(t)), (this.instance = t));
      let { layoutId: r, layout: i, visualElement: a } = this.options;
      if (
        (a && !a.current && a.mount(t),
        this.root.nodes.add(this),
        this.parent && this.parent.children.add(this),
        n && (i || r) && (this.isLayoutDirty = !0),
        e)
      ) {
        let n,
          r = () => (this.root.updateBlockedByResize = !1);
        e(t, () => {
          ((this.root.updateBlockedByResize = !0),
            n && n(),
            (n = Ql(r, 250)),
            yl.hasAnimatedSinceResize &&
              ((yl.hasAnimatedSinceResize = !1), this.nodes.forEach(gu)));
        });
      }
      (r && this.root.registerSharedNode(r, this),
        this.options.animate !== !1 &&
          a &&
          (r || i) &&
          this.addEventListener(
            `didUpdate`,
            ({ delta: e, hasLayoutChanged: t, hasRelativeTargetChanged: n, layout: r }) => {
              if (this.isTreeAnimationBlocked()) {
                ((this.target = void 0), (this.relativeTarget = void 0));
                return;
              }
              let i = this.options.transition || a.getDefaultTransition() || Tu,
                { onLayoutAnimationStart: o, onLayoutAnimationComplete: s } = a.getProps(),
                c = !this.targetLayout || !Kl(this.targetLayout, r) || n,
                l = !t && n;
              if (
                this.options.layoutRoot ||
                (this.resumeFrom && this.resumeFrom.instance) ||
                l ||
                (t && (c || !this.currentAnimation))
              ) {
                (this.resumeFrom &&
                  ((this.resumingFrom = this.resumeFrom),
                  (this.resumingFrom.resumingFrom = void 0)),
                  this.setAnimationOrigin(e, l));
                let t = {
                  ...Es(i, `layout`),
                  onPlay: o,
                  onComplete: s,
                };
                ((a.shouldReduceMotion || this.options.layoutRoot) &&
                  ((t.delay = 0), (t.type = !1)),
                  this.startAnimation(t));
              } else
                (t || gu(this),
                  this.isLead() && this.options.onExitComplete && this.options.onExitComplete());
              this.targetLayout = r;
            },
          ));
    }
    unmount() {
      (this.options.layoutId && this.willUpdate(), this.root.nodes.remove(this));
      let e = this.getStack();
      (e && e.remove(this),
        this.parent && this.parent.children.delete(this),
        (this.instance = void 0),
        Ai(this.updateProjection));
    }
    blockUpdate() {
      this.updateManuallyBlocked = !0;
    }
    unblockUpdate() {
      this.updateManuallyBlocked = !1;
    }
    isUpdateBlocked() {
      return this.updateManuallyBlocked || this.updateBlockedByResize;
    }
    isTreeAnimationBlocked() {
      return this.isAnimationBlocked || (this.parent && this.parent.isTreeAnimationBlocked()) || !1;
    }
    startUpdate() {
      this.isUpdateBlocked() ||
        ((this.isUpdating = !0), this.nodes && this.nodes.forEach(yu), this.animationId++);
    }
    getTransformTemplate() {
      let { visualElement: e } = this.options;
      return e && e.getProps().transformTemplate;
    }
    willUpdate(e = !0) {
      if (((this.root.hasTreeAnimated = !0), this.root.isUpdateBlocked())) {
        this.options.onExitComplete && this.options.onExitComplete();
        return;
      }
      if ((!this.root.isUpdating && this.root.startUpdate(), this.isLayoutDirty)) return;
      this.isLayoutDirty = !0;
      for (let e = 0; e < this.path.length; e++) {
        let t = this.path[e];
        ((t.shouldResetTransform = !0),
          t.updateScroll(`snapshot`),
          t.options.layoutRoot && t.willUpdate(!1));
      }
      let { layoutId: t, layout: n } = this.options;
      if (t === void 0 && !n) return;
      let r = this.getTransformTemplate();
      ((this.prevTransformTemplateValue = r ? r(this.latestValues, ``) : void 0),
        this.updateSnapshot(),
        e && this.notifyListeners(`willUpdate`));
    }
    update() {
      if (((this.updateScheduled = !1), this.isUpdateBlocked())) {
        (this.unblockUpdate(), this.clearAllSnapshots(), this.nodes.forEach(pu));
        return;
      }
      (this.isUpdating || this.nodes.forEach(mu),
        (this.isUpdating = !1),
        this.nodes.forEach(hu),
        this.nodes.forEach(cu),
        this.nodes.forEach(lu),
        this.clearAllSnapshots());
      let e = performance.now();
      ((ji.delta = yr(0, 1e3 / 60, e - ji.timestamp)),
        (ji.timestamp = e),
        (ji.isProcessing = !0),
        Mi.update.process(ji),
        Mi.preRender.process(ji),
        Mi.render.process(ji),
        (ji.isProcessing = !1));
    }
    didUpdate() {
      this.updateScheduled || ((this.updateScheduled = !0), queueMicrotask(() => this.update()));
    }
    clearAllSnapshots() {
      (this.nodes.forEach(fu), this.sharedNodes.forEach(bu));
    }
    scheduleUpdateProjection() {
      this.projectionUpdateScheduled ||
        ((this.projectionUpdateScheduled = !0), ki.preRender(this.updateProjection, !1, !0));
    }
    scheduleCheckAfterUnmount() {
      ki.postRender(() => {
        this.isLayoutDirty ? this.root.didUpdate() : this.root.checkUpdateFailed();
      });
    }
    updateSnapshot() {
      this.snapshot || !this.instance || (this.snapshot = this.measure());
    }
    updateLayout() {
      if (
        !this.instance ||
        (this.updateScroll(),
        !(this.options.alwaysMeasureLayout && this.isLead()) && !this.isLayoutDirty)
      )
        return;
      if (this.resumeFrom && !this.resumeFrom.instance)
        for (let e = 0; e < this.path.length; e++) this.path[e].updateScroll();
      let e = this.layout;
      ((this.layout = this.measure(!1)),
        (this.layoutCorrected = Vc()),
        (this.isLayoutDirty = !1),
        (this.projectionDelta = void 0),
        this.notifyListeners(`measure`, this.layout.layoutBox));
      let { visualElement: t } = this.options;
      t && t.notify(`LayoutMeasure`, this.layout.layoutBox, e ? e.layoutBox : void 0);
    }
    updateScroll(e = `measure`) {
      let t = !!(this.options.layoutScroll && this.instance);
      (this.scroll &&
        this.scroll.animationId === this.root.animationId &&
        this.scroll.phase === e &&
        (t = !1),
        t &&
          (this.scroll = {
            animationId: this.root.animationId,
            phase: e,
            isRoot: r(this.instance),
            offset: n(this.instance),
          }));
    }
    resetTransform() {
      if (!i) return;
      let e = this.isLayoutDirty || this.shouldResetTransform,
        t = this.projectionDelta && !Wl(this.projectionDelta),
        n = this.getTransformTemplate(),
        r = n ? n(this.latestValues, ``) : void 0,
        a = r !== this.prevTransformTemplateValue;
      e &&
        (t || Jc(this.latestValues) || a) &&
        (i(this.instance, r), (this.shouldResetTransform = !1), this.scheduleRender());
    }
    measure(e = !0) {
      let t = this.measurePageBox(),
        n = this.removeElementScroll(t);
      return (
        e && (n = this.removeTransform(n)),
        ku(n),
        {
          animationId: this.root.animationId,
          measuredBox: t,
          layoutBox: n,
          latestValues: {},
          source: this.id,
        }
      );
    }
    measurePageBox() {
      let { visualElement: e } = this.options;
      if (!e) return Vc();
      let t = e.measureViewportBox(),
        { scroll: n } = this.root;
      return (n && (rl(t.x, n.offset.x), rl(t.y, n.offset.y)), t);
    }
    removeElementScroll(e) {
      let t = Vc();
      Il(t, e);
      for (let n = 0; n < this.path.length; n++) {
        let r = this.path[n],
          { scroll: i, options: a } = r;
        if (r !== this.root && i && a.layoutScroll) {
          if (i.isRoot) {
            Il(t, e);
            let { scroll: n } = this.root;
            n && (rl(t.x, -n.offset.x), rl(t.y, -n.offset.y));
          }
          (rl(t.x, i.offset.x), rl(t.y, i.offset.y));
        }
      }
      return t;
    }
    applyTransform(e, t = !1) {
      let n = Vc();
      Il(n, e);
      for (let e = 0; e < this.path.length; e++) {
        let r = this.path[e];
        (!t &&
          r.options.layoutScroll &&
          r.scroll &&
          r !== r.root &&
          sl(n, {
            x: -r.scroll.offset.x,
            y: -r.scroll.offset.y,
          }),
          Jc(r.latestValues) && sl(n, r.latestValues));
      }
      return (Jc(this.latestValues) && sl(n, this.latestValues), n);
    }
    removeTransform(e) {
      let t = Vc();
      Il(t, e);
      for (let e = 0; e < this.path.length; e++) {
        let n = this.path[e];
        if (!n.instance || !Jc(n.latestValues)) continue;
        qc(n.latestValues) && n.updateSnapshot();
        let r = Vc();
        (Il(r, n.measurePageBox()),
          Hl(t, n.latestValues, n.snapshot ? n.snapshot.layoutBox : void 0, r));
      }
      return (Jc(this.latestValues) && Hl(t, this.latestValues), t);
    }
    setTargetDelta(e) {
      ((this.targetDelta = e), this.root.scheduleUpdateProjection(), (this.isProjectionDirty = !0));
    }
    setOptions(e) {
      this.options = {
        ...this.options,
        ...e,
        crossfade: e.crossfade === void 0 || e.crossfade,
      };
    }
    clearMeasurements() {
      ((this.scroll = void 0),
        (this.layout = void 0),
        (this.snapshot = void 0),
        (this.prevTransformTemplateValue = void 0),
        (this.targetDelta = void 0),
        (this.target = void 0),
        (this.isLayoutDirty = !1));
    }
    forceRelativeParentToResolveTarget() {
      this.relativeParent &&
        this.relativeParent.resolvedRelativeTargetAt !== ji.timestamp &&
        this.relativeParent.resolveTargetDelta(!0);
    }
    resolveTargetDelta(e = !1) {
      let t = this.getLead();
      ((this.isProjectionDirty ||= t.isProjectionDirty),
        (this.isTransformDirty ||= t.isTransformDirty),
        (this.isSharedProjectionDirty ||= t.isSharedProjectionDirty));
      let n = !!this.resumingFrom || this !== t;
      if (!(
        e ||
        (n && this.isSharedProjectionDirty) ||
        this.isProjectionDirty ||
        this.parent?.isProjectionDirty ||
        this.attemptToResolveRelativeTarget
      ))
        return;
      let { layout: r, layoutId: i } = this.options;
      if (!(!this.layout || !(r || i))) {
        if (
          ((this.resolvedRelativeTargetAt = ji.timestamp),
          !this.targetDelta && !this.relativeTarget)
        ) {
          let e = this.getClosestProjectingParent();
          e && e.layout && this.animationProgress !== 1
            ? ((this.relativeParent = e),
              this.forceRelativeParentToResolveTarget(),
              (this.relativeTarget = Vc()),
              (this.relativeTargetOrigin = Vc()),
              Ec(this.relativeTargetOrigin, this.layout.layoutBox, e.layout.layoutBox),
              Il(this.relativeTarget, this.relativeTargetOrigin))
            : (this.relativeParent = this.relativeTarget = void 0);
        }
        if (!(!this.relativeTarget && !this.targetDelta)) {
          if (
            (this.target || ((this.target = Vc()), (this.targetWithTransforms = Vc())),
            this.relativeTarget &&
            this.relativeTargetOrigin &&
            this.relativeParent &&
            this.relativeParent.target
              ? (this.forceRelativeParentToResolveTarget(),
                wc(this.target, this.relativeTarget, this.relativeParent.target))
              : this.targetDelta
                ? (this.resumingFrom
                    ? (this.target = this.applyTransform(this.layout.layoutBox))
                    : Il(this.target, this.layout.layoutBox),
                  el(this.target, this.targetDelta))
                : Il(this.target, this.layout.layoutBox),
            this.attemptToResolveRelativeTarget)
          ) {
            this.attemptToResolveRelativeTarget = !1;
            let e = this.getClosestProjectingParent();
            e &&
            !!e.resumingFrom == !!this.resumingFrom &&
            !e.options.layoutScroll &&
            e.target &&
            this.animationProgress !== 1
              ? ((this.relativeParent = e),
                this.forceRelativeParentToResolveTarget(),
                (this.relativeTarget = Vc()),
                (this.relativeTargetOrigin = Vc()),
                Ec(this.relativeTargetOrigin, this.target, e.target),
                Il(this.relativeTarget, this.relativeTargetOrigin))
              : (this.relativeParent = this.relativeTarget = void 0);
          }
          ou.resolvedTargetDeltas++;
        }
      }
    }
    getClosestProjectingParent() {
      if (!(!this.parent || qc(this.parent.latestValues) || Yc(this.parent.latestValues)))
        return this.parent.isProjecting() ? this.parent : this.parent.getClosestProjectingParent();
    }
    isProjecting() {
      return !!(
        (this.relativeTarget || this.targetDelta || this.options.layoutRoot) &&
        this.layout
      );
    }
    calcProjection() {
      let e = this.getLead(),
        t = !!this.resumingFrom || this !== e,
        n = !0;
      if (
        ((this.isProjectionDirty || this.parent?.isProjectionDirty) && (n = !1),
        t && (this.isSharedProjectionDirty || this.isTransformDirty) && (n = !1),
        this.resolvedRelativeTargetAt === ji.timestamp && (n = !1),
        n)
      )
        return;
      let { layout: r, layoutId: i } = this.options;
      if (
        ((this.isTreeAnimating = !!(
          (this.parent && this.parent.isTreeAnimating) ||
          this.currentAnimation ||
          this.pendingAnimation
        )),
        this.isTreeAnimating || (this.targetDelta = this.relativeTarget = void 0),
        !this.layout || !(r || i))
      )
        return;
      Il(this.layoutCorrected, this.layout.layoutBox);
      let a = this.treeScale.x,
        o = this.treeScale.y;
      (tl(this.layoutCorrected, this.treeScale, this.path, t),
        e.layout &&
          !e.target &&
          (this.treeScale.x !== 1 || this.treeScale.y !== 1) &&
          (e.target = e.layout.layoutBox));
      let { target: s } = e;
      if (!s) {
        this.projectionTransform &&
          ((this.projectionDelta = zc()),
          (this.projectionTransform = `none`),
          this.scheduleRender());
        return;
      }
      this.projectionDelta ||
        ((this.projectionDelta = zc()), (this.projectionDeltaWithTransform = zc()));
      let c = this.projectionTransform;
      (Sc(this.projectionDelta, this.layoutCorrected, s, this.latestValues),
        (this.projectionTransform = Yl(this.projectionDelta, this.treeScale)),
        (this.projectionTransform !== c || this.treeScale.x !== a || this.treeScale.y !== o) &&
          ((this.hasProjected = !0),
          this.scheduleRender(),
          this.notifyListeners(`projectionUpdate`, s)),
        ou.recalculatedProjection++);
    }
    hide() {
      this.isVisible = !1;
    }
    show() {
      this.isVisible = !0;
    }
    scheduleRender(e = !0) {
      if ((this.options.scheduleRender && this.options.scheduleRender(), e)) {
        let e = this.getStack();
        e && e.scheduleRender();
      }
      this.resumingFrom && !this.resumingFrom.instance && (this.resumingFrom = void 0);
    }
    setAnimationOrigin(e, t = !1) {
      let n = this.snapshot,
        r = n ? n.latestValues : {},
        i = {
          ...this.latestValues,
        },
        a = zc();
      ((!this.relativeParent || !this.relativeParent.options.layoutRoot) &&
        (this.relativeTarget = this.relativeTargetOrigin = void 0),
        (this.attemptToResolveRelativeTarget = !t));
      let o = Vc(),
        s = (n ? n.source : void 0) !== (this.layout ? this.layout.source : void 0),
        c = this.getStack(),
        l = !c || c.members.length <= 1,
        u = !!(s && !l && this.options.crossfade === !0 && !this.path.some(wu));
      this.animationProgress = 0;
      let d;
      ((this.mixTargetDelta = (t) => {
        let n = t / 1e3;
        (xu(a.x, e.x, n),
          xu(a.y, e.y, n),
          this.setTargetDelta(a),
          this.relativeTarget &&
            this.relativeTargetOrigin &&
            this.layout &&
            this.relativeParent &&
            this.relativeParent.layout &&
            (Ec(o, this.layout.layoutBox, this.relativeParent.layout.layoutBox),
            Cu(this.relativeTarget, this.relativeTargetOrigin, o, n),
            d && Gl(this.relativeTarget, d) && (this.isProjectionDirty = !1),
            (d ||= Vc()),
            Il(d, this.relativeTarget)),
          s && ((this.animationValues = i), Al(i, r, this.latestValues, n, u, l)),
          this.root.scheduleUpdateProjection(),
          this.scheduleRender(),
          (this.animationProgress = n));
      }),
        this.mixTargetDelta(this.options.layoutRoot ? 1e3 : 0));
    }
    startAnimation(e) {
      (this.notifyListeners(`animationStart`),
        this.currentAnimation && this.currentAnimation.stop(),
        this.resumingFrom &&
          this.resumingFrom.currentAnimation &&
          this.resumingFrom.currentAnimation.stop(),
        (this.pendingAnimation &&= (Ai(this.pendingAnimation), void 0)),
        (this.pendingAnimation = ki.update(() => {
          ((yl.hasAnimatedSinceResize = !0),
            (this.currentAnimation = tu(0, iu, {
              ...e,
              onUpdate: (t) => {
                (this.mixTargetDelta(t), e.onUpdate && e.onUpdate(t));
              },
              onComplete: () => {
                (e.onComplete && e.onComplete(), this.completeAnimation());
              },
            })),
            this.resumingFrom && (this.resumingFrom.currentAnimation = this.currentAnimation),
            (this.pendingAnimation = void 0));
        })));
    }
    completeAnimation() {
      this.resumingFrom &&
        ((this.resumingFrom.currentAnimation = void 0),
        (this.resumingFrom.preserveOpacity = void 0));
      let e = this.getStack();
      (e && e.exitAnimationComplete(),
        (this.resumingFrom = this.currentAnimation = this.animationValues = void 0),
        this.notifyListeners(`animationComplete`));
    }
    finishAnimation() {
      (this.currentAnimation &&
        (this.mixTargetDelta && this.mixTargetDelta(iu), this.currentAnimation.stop()),
        this.completeAnimation());
    }
    applyTransformsToTarget() {
      let e = this.getLead(),
        { targetWithTransforms: t, target: n, layout: r, latestValues: i } = e;
      if (!(!t || !n || !r)) {
        if (
          this !== e &&
          this.layout &&
          r &&
          Au(this.options.animationType, this.layout.layoutBox, r.layoutBox)
        ) {
          n = this.target || Vc();
          let t = yc(this.layout.layoutBox.x);
          ((n.x.min = e.target.x.min), (n.x.max = n.x.min + t));
          let r = yc(this.layout.layoutBox.y);
          ((n.y.min = e.target.y.min), (n.y.max = n.y.min + r));
        }
        (Il(t, n), sl(t, i), Sc(this.projectionDeltaWithTransform, this.layoutCorrected, t, i));
      }
    }
    registerSharedNode(e, t) {
      (this.sharedNodes.has(e) || this.sharedNodes.set(e, new Jl()),
        this.sharedNodes.get(e).add(t));
      let n = t.options.initialPromotionConfig;
      t.promote({
        transition: n ? n.transition : void 0,
        preserveFollowOpacity:
          n && n.shouldPreserveFollowOpacity ? n.shouldPreserveFollowOpacity(t) : void 0,
      });
    }
    isLead() {
      let e = this.getStack();
      return !e || e.lead === this;
    }
    getLead() {
      let { layoutId: e } = this.options;
      return (e && this.getStack()?.lead) || this;
    }
    getPrevLead() {
      let { layoutId: e } = this.options;
      return e ? this.getStack()?.prevLead : void 0;
    }
    getStack() {
      let { layoutId: e } = this.options;
      if (e) return this.root.sharedNodes.get(e);
    }
    promote({ needsReset: e, transition: t, preserveFollowOpacity: n } = {}) {
      let r = this.getStack();
      (r && r.promote(this, n),
        e && ((this.projectionDelta = void 0), (this.needsReset = !0)),
        t &&
          this.setOptions({
            transition: t,
          }));
    }
    relegate() {
      let e = this.getStack();
      return e ? e.relegate(this) : !1;
    }
    resetRotation() {
      let { visualElement: e } = this.options;
      if (!e) return;
      let t = !1,
        { latestValues: n } = e;
      if (((n.rotate || n.rotateX || n.rotateY || n.rotateZ) && (t = !0), !t)) return;
      let r = {};
      for (let t = 0; t < nu.length; t++) {
        let i = `rotate` + nu[t];
        n[i] && ((r[i] = n[i]), e.setStaticValue(i, 0));
      }
      e.render();
      for (let t in r) e.setStaticValue(t, r[t]);
      e.scheduleRender();
    }
    getProjectionStyles(e) {
      if (!this.instance || this.isSVG) return;
      if (!this.isVisible) return ru;
      let t = {
          visibility: ``,
        },
        n = this.getTransformTemplate();
      if (this.needsReset)
        return (
          (this.needsReset = !1),
          (t.opacity = ``),
          (t.pointerEvents = yi(e?.pointerEvents) || ``),
          (t.transform = n ? n(this.latestValues, ``) : `none`),
          t
        );
      let r = this.getLead();
      if (!this.projectionDelta || !this.layout || !r.target) {
        let t = {};
        return (
          this.options.layoutId &&
            ((t.opacity = this.latestValues.opacity === void 0 ? 1 : this.latestValues.opacity),
            (t.pointerEvents = yi(e?.pointerEvents) || ``)),
          this.hasProjected &&
            !Jc(this.latestValues) &&
            ((t.transform = n ? n({}, ``) : `none`), (this.hasProjected = !1)),
          t
        );
      }
      let i = r.animationValues || r.latestValues;
      (this.applyTransformsToTarget(),
        (t.transform = Yl(this.projectionDeltaWithTransform, this.treeScale, i)),
        n && (t.transform = n(i, t.transform)));
      let { x: a, y: o } = this.projectionDelta;
      ((t.transformOrigin = `${a.origin * 100}% ${o.origin * 100}% 0`),
        (t.opacity = r.animationValues
          ? r === this
            ? (i.opacity ?? this.latestValues.opacity ?? 1)
            : this.preserveOpacity
              ? this.latestValues.opacity
              : i.opacityExit
          : r === this
            ? i.opacity === void 0
              ? ``
              : i.opacity
            : i.opacityExit === void 0
              ? 0
              : i.opacityExit));
      for (let e in ar) {
        if (i[e] === void 0) continue;
        let { correct: n, applyTo: a } = ar[e],
          o = t.transform === `none` ? i[e] : n(i[e], r);
        if (a) {
          let e = a.length;
          for (let n = 0; n < e; n++) t[a[n]] = o;
        } else t[e] = o;
      }
      return (
        this.options.layoutId &&
          (t.pointerEvents = r === this ? yi(e?.pointerEvents) || `` : `none`),
        t
      );
    }
    clearSnapshot() {
      this.resumeFrom = this.snapshot = void 0;
    }
    resetTree() {
      (this.root.nodes.forEach((e) => e.currentAnimation?.stop()),
        this.root.nodes.forEach(pu),
        this.root.sharedNodes.clear());
    }
  };
}
function cu(e) {
  e.updateLayout();
}
function lu(e) {
  let t = e.resumeFrom?.snapshot || e.snapshot;
  if (e.isLead() && e.layout && t && e.hasListeners(`didUpdate`)) {
    let { layoutBox: n, measuredBox: r } = e.layout,
      { animationType: i } = e.options,
      a = t.source !== e.layout.source;
    i === `size`
      ? Hc((e) => {
          let r = a ? t.measuredBox[e] : t.layoutBox[e],
            i = yc(r);
          ((r.min = n[e].min), (r.max = r.min + i));
        })
      : Au(i, t.layoutBox, n) &&
        Hc((r) => {
          let i = a ? t.measuredBox[r] : t.layoutBox[r],
            o = yc(n[r]);
          ((i.max = i.min + o),
            e.relativeTarget &&
              !e.currentAnimation &&
              ((e.isProjectionDirty = !0),
              (e.relativeTarget[r].max = e.relativeTarget[r].min + o)));
        });
    let o = zc();
    Sc(o, n, t.layoutBox);
    let s = zc();
    a ? Sc(s, e.applyTransform(r, !0), t.measuredBox) : Sc(s, n, t.layoutBox);
    let c = !Wl(o),
      l = !1;
    if (!e.resumeFrom) {
      let r = e.getClosestProjectingParent();
      if (r && !r.resumeFrom) {
        let { snapshot: i, layout: a } = r;
        if (i && a) {
          let o = Vc();
          Ec(o, t.layoutBox, i.layoutBox);
          let s = Vc();
          (Ec(s, n, a.layoutBox),
            Kl(o, s) || (l = !0),
            r.options.layoutRoot &&
              ((e.relativeTarget = s), (e.relativeTargetOrigin = o), (e.relativeParent = r)));
        }
      }
    }
    e.notifyListeners(`didUpdate`, {
      layout: n,
      snapshot: t,
      delta: s,
      layoutDelta: o,
      hasLayoutChanged: c,
      hasRelativeTargetChanged: l,
    });
  } else if (e.isLead()) {
    let { onExitComplete: t } = e.options;
    t && t();
  }
  e.options.transition = void 0;
}
function uu(e) {
  (ou.totalNodes++,
    e.parent &&
      (e.isProjecting() || (e.isProjectionDirty = e.parent.isProjectionDirty),
      (e.isSharedProjectionDirty ||= !!(
        e.isProjectionDirty ||
        e.parent.isProjectionDirty ||
        e.parent.isSharedProjectionDirty
      )),
      (e.isTransformDirty ||= e.parent.isTransformDirty)));
}
function du(e) {
  e.isProjectionDirty = e.isSharedProjectionDirty = e.isTransformDirty = !1;
}
function fu(e) {
  e.clearSnapshot();
}
function pu(e) {
  e.clearMeasurements();
}
function mu(e) {
  e.isLayoutDirty = !1;
}
function hu(e) {
  let { visualElement: t } = e.options;
  (t && t.getProps().onBeforeLayoutMeasure && t.notify(`BeforeLayoutMeasure`), e.resetTransform());
}
function gu(e) {
  (e.finishAnimation(),
    (e.targetDelta = e.relativeTarget = e.target = void 0),
    (e.isProjectionDirty = !0));
}
function _u(e) {
  e.resolveTargetDelta();
}
function vu(e) {
  e.calcProjection();
}
function yu(e) {
  e.resetRotation();
}
function bu(e) {
  e.removeLeadSnapshot();
}
function xu(e, t, n) {
  ((e.translate = eo(t.translate, 0, n)),
    (e.scale = eo(t.scale, 1, n)),
    (e.origin = t.origin),
    (e.originPoint = t.originPoint));
}
function Su(e, t, n, r) {
  ((e.min = eo(t.min, n.min, r)), (e.max = eo(t.max, n.max, r)));
}
function Cu(e, t, n, r) {
  (Su(e.x, t.x, n.x, r), Su(e.y, t.y, n.y, r));
}
function wu(e) {
  return e.animationValues && e.animationValues.opacityExit !== void 0;
}
var Tu = {
    duration: 0.45,
    ease: [0.4, 0, 0.1, 1],
  },
  Eu = (e) => typeof navigator < `u` && navigator.userAgent.toLowerCase().includes(e),
  Du = Eu(`applewebkit/`) && !Eu(`chrome/`) ? Math.round : Ci;
function Ou(e) {
  ((e.min = Du(e.min)), (e.max = Du(e.max)));
}
function ku(e) {
  (Ou(e.x), Ou(e.y));
}
function Au(e, t, n) {
  return e === `position` || (e === `preserve-aspect` && !bc(ql(t), ql(n), 0.2));
}
var ju = su({
    attachResizeListener: (e, t) => Ii(e, `resize`, t),
    measureScroll: () => ({
      x: document.documentElement.scrollLeft || document.body.scrollLeft,
      y: document.documentElement.scrollTop || document.body.scrollTop,
    }),
    checkIsScrollRoot: () => !0,
  }),
  Mu = {
    current: void 0,
  },
  Nu = su({
    measureScroll: (e) => ({
      x: e.scrollLeft,
      y: e.scrollTop,
    }),
    defaultParent: () => {
      if (!Mu.current) {
        let e = new ju({});
        (e.mount(window),
          e.setOptions({
            layoutScroll: !0,
          }),
          (Mu.current = e));
      }
      return Mu.current;
    },
    resetTransform: (e, t) => {
      e.style.transform = t === void 0 ? `none` : t;
    },
    checkIsScrollRoot: (e) => window.getComputedStyle(e).position === `fixed`,
  }),
  Pu = {
    pan: {
      Feature: _l,
    },
    drag: {
      Feature: hl,
      ProjectionNode: Nu,
      MeasureLayout: wl,
    },
  },
  Fu = /var\((--[a-zA-Z0-9-_]+),? ?([a-zA-Z0-9 ()%#.,-]+)?\)/;
function Iu(e) {
  let t = Fu.exec(e);
  if (!t) return [,];
  let [, n, r] = t;
  return [n, r];
}
var Lu = 4;
function Ru(e, t, n = 1) {
  ga(
    n <= Lu,
    `Max CSS variable fallback depth detected in property "${e}". This may indicate a circular fallback dependency.`,
  );
  let [r, i] = Iu(e);
  if (!r) return;
  let a = window.getComputedStyle(t).getPropertyValue(r);
  if (a) {
    let e = a.trim();
    return As(e) ? parseFloat(e) : e;
  }
  return gr(i) ? Ru(i, t, n + 1) : i;
}
function zu(e, { ...t }, n) {
  let r = e.current;
  if (!(r instanceof Element))
    return {
      target: t,
      transitionEnd: n,
    };
  ((n &&= {
    ...n,
  }),
    e.values.forEach((e) => {
      let t = e.get();
      if (!gr(t)) return;
      let n = Ru(t, r);
      n && e.set(n);
    }));
  for (let e in t) {
    let i = t[e];
    if (!gr(i)) continue;
    let a = Ru(i, r);
    a && ((t[e] = a), (n ||= {}), n[e] === void 0 && (n[e] = i));
  }
  return {
    target: t,
    transitionEnd: n,
  };
}
var Bu = new Set([
    `width`,
    `height`,
    `top`,
    `left`,
    `right`,
    `bottom`,
    `x`,
    `y`,
    `translateX`,
    `translateY`,
  ]),
  Vu = (e) => Bu.has(e),
  Hu = (e) => Object.keys(e).some(Vu),
  Uu = (e) => e === br || e === W,
  Wu = (e, t) => parseFloat(e.split(`, `)[t]),
  Gu =
    (e, t) =>
    (n, { transform: r }) => {
      if (r === `none` || !r) return 0;
      let i = r.match(/^matrix3d\((.+)\)$/);
      if (i) return Wu(i[1], t);
      {
        let t = r.match(/^matrix\((.+)\)$/);
        return t ? Wu(t[1], e) : 0;
      }
    },
  Ku = new Set([`x`, `y`, `z`]),
  qu = sr.filter((e) => !Ku.has(e));
function Ju(e) {
  let t = [];
  return (
    qu.forEach((n) => {
      let r = e.getValue(n);
      r !== void 0 && (t.push([n, r.get()]), r.set(+!!n.startsWith(`scale`)));
    }),
    t.length && e.render(),
    t
  );
}
var Yu = {
  width: ({ x: e }, { paddingLeft: t = `0`, paddingRight: n = `0` }) =>
    e.max - e.min - parseFloat(t) - parseFloat(n),
  height: ({ y: e }, { paddingTop: t = `0`, paddingBottom: n = `0` }) =>
    e.max - e.min - parseFloat(t) - parseFloat(n),
  top: (e, { top: t }) => parseFloat(t),
  left: (e, { left: t }) => parseFloat(t),
  bottom: ({ y: e }, { top: t }) => parseFloat(t) + (e.max - e.min),
  right: ({ x: e }, { left: t }) => parseFloat(t) + (e.max - e.min),
  x: Gu(4, 13),
  y: Gu(5, 14),
};
((Yu.translateX = Yu.x), (Yu.translateY = Yu.y));
var Xu = (e, t, n) => {
    let r = t.measureViewportBox(),
      i = t.current,
      a = getComputedStyle(i),
      { display: o } = a,
      s = {};
    (o === `none` && t.setStaticValue(`display`, e.display || `block`),
      n.forEach((e) => {
        s[e] = Yu[e](r, a);
      }),
      t.render());
    let c = t.measureViewportBox();
    return (
      n.forEach((n) => {
        let r = t.getValue(n);
        (r && r.jump(s[n]), (e[n] = Yu[n](c, a)));
      }),
      e
    );
  },
  Zu = (e, t, n = {}, r = {}) => {
    ((t = {
      ...t,
    }),
      (r = {
        ...r,
      }));
    let i = Object.keys(t).filter(Vu),
      a = [],
      o = !1,
      s = [];
    if (
      (i.forEach((i) => {
        let c = e.getValue(i);
        if (!e.hasValue(i)) return;
        let l = n[i],
          u = Bs(l),
          d = t[i],
          f;
        if (gi(d)) {
          let e = d.length,
            t = +(d[0] === null);
          ((l = d[t]), (u = Bs(l)));
          for (let n = t; n < e && d[n] !== null; n++)
            f
              ? ga(Bs(d[n]) === f, `All keyframes must be of the same type`)
              : ((f = Bs(d[n])),
                ga(
                  f === u || (Uu(u) && Uu(f)),
                  `Keyframes must be of the same dimension as the current value`,
                ));
        } else f = Bs(d);
        if (u !== f) {
          if (Uu(u) && Uu(f)) {
            let e = c.get();
            (typeof e == `string` && c.set(parseFloat(e)),
              typeof d == `string`
                ? (t[i] = parseFloat(d))
                : Array.isArray(d) && f === W && (t[i] = d.map(parseFloat)));
          } else
            u?.transform && f?.transform && (l === 0 || d === 0)
              ? l === 0
                ? c.set(f.transform(l))
                : (t[i] = u.transform(d))
              : ((o ||= ((a = Ju(e)), !0)),
                s.push(i),
                (r[i] = r[i] === void 0 ? t[i] : r[i]),
                c.jump(d));
        }
      }),
      s.length)
    ) {
      let n = s.indexOf(`height`) >= 0 ? window.pageYOffset : null,
        i = Xu(t, e, s);
      return (
        a.length &&
          a.forEach(([t, n]) => {
            e.getValue(t).set(n);
          }),
        e.render(),
        jn &&
          n !== null &&
          window.scrollTo({
            top: n,
          }),
        {
          target: i,
          transitionEnd: r,
        }
      );
    }
    return {
      target: t,
      transitionEnd: r,
    };
  };
function Qu(e, t, n, r) {
  return Hu(t)
    ? Zu(e, t, n, r)
    : {
        target: t,
        transitionEnd: r,
      };
}
var $u = (e, t, n, r) => {
    let i = zu(e, t, r);
    return ((t = i.target), (r = i.transitionEnd), Qu(e, t, n, r));
  },
  ed = {
    current: null,
  },
  td = {
    current: !1,
  };
function nd() {
  if (((td.current = !0), jn)) {
    if (window.matchMedia) {
      let e = window.matchMedia(`(prefers-reduced-motion)`),
        t = () => (ed.current = e.matches);
      (e.addListener(t), t());
    } else ed.current = !1;
  }
}
function rd(e, t, n) {
  let { willChange: r } = t;
  for (let i in t) {
    let a = t[i],
      o = n[i];
    if (ur(a)) (e.addValue(i, a), ks(r) && r.add(i));
    else if (ur(o))
      (e.addValue(
        i,
        Ls(a, {
          owner: e,
        }),
      ),
        ks(r) && r.remove(i));
    else if (o !== a) {
      if (e.hasValue(i)) {
        let t = e.getValue(i);
        !t.hasAnimated && t.set(a);
      } else {
        let t = e.getStaticValue(i);
        e.addValue(
          i,
          Ls(t === void 0 ? a : t, {
            owner: e,
          }),
        );
      }
    }
  }
  for (let r in n) t[r] === void 0 && e.removeValue(r);
  return t;
}
var id = new WeakMap(),
  ad = Object.keys(Yn),
  od = ad.length,
  sd = [
    `AnimationStart`,
    `AnimationComplete`,
    `Update`,
    `BeforeLayoutMeasure`,
    `LayoutMeasure`,
    `LayoutAnimationStart`,
    `LayoutAnimationComplete`,
  ],
  cd = Hn.length,
  ld = class {
    constructor(
      { parent: e, props: t, presenceContext: n, reducedMotionConfig: r, visualState: i },
      a = {},
    ) {
      ((this.current = null),
        (this.children = new Set()),
        (this.isVariantNode = !1),
        (this.isControllingVariants = !1),
        (this.shouldReduceMotion = null),
        (this.values = new Map()),
        (this.features = {}),
        (this.valueSubscriptions = new Map()),
        (this.prevMotionValues = {}),
        (this.events = {}),
        (this.propEventSubscriptions = {}),
        (this.notifyUpdate = () => this.notify(`Update`, this.latestValues)),
        (this.render = () => {
          this.current &&
            (this.triggerBuild(),
            this.renderInstance(this.current, this.renderState, this.props.style, this.projection));
        }),
        (this.scheduleRender = () => ki.render(this.render, !1, !0)));
      let { latestValues: o, renderState: s } = i;
      ((this.latestValues = o),
        (this.baseTarget = {
          ...o,
        }),
        (this.initialValues = t.initial
          ? {
              ...o,
            }
          : {}),
        (this.renderState = s),
        (this.parent = e),
        (this.props = t),
        (this.presenceContext = n),
        (this.depth = e ? e.depth + 1 : 0),
        (this.reducedMotionConfig = r),
        (this.options = a),
        (this.isControllingVariants = Un(t)),
        (this.isVariantNode = Wn(t)),
        this.isVariantNode && (this.variantChildren = new Set()),
        (this.manuallyAnimateOnMount = !!(e && e.current)));
      let { willChange: c, ...l } = this.scrapeMotionValuesFromProps(t, {});
      for (let e in l) {
        let t = l[e];
        o[e] !== void 0 && ur(t) && (t.set(o[e], !1), ks(c) && c.add(e));
      }
    }
    scrapeMotionValuesFromProps(e, t) {
      return {};
    }
    mount(e) {
      ((this.current = e),
        id.set(e, this),
        this.projection && !this.projection.instance && this.projection.mount(e),
        this.parent &&
          this.isVariantNode &&
          !this.isControllingVariants &&
          (this.removeFromVariantTree = this.parent.addVariantChild(this)),
        this.values.forEach((e, t) => this.bindToMotionValue(t, e)),
        td.current || nd(),
        (this.shouldReduceMotion =
          this.reducedMotionConfig === `never`
            ? !1
            : this.reducedMotionConfig === `always` || ed.current),
        this.parent && this.parent.children.add(this),
        this.update(this.props, this.presenceContext));
    }
    unmount() {
      (id.delete(this.current),
        this.projection && this.projection.unmount(),
        Ai(this.notifyUpdate),
        Ai(this.render),
        this.valueSubscriptions.forEach((e) => e()),
        this.removeFromVariantTree && this.removeFromVariantTree(),
        this.parent && this.parent.children.delete(this));
      for (let e in this.events) this.events[e].clear();
      for (let e in this.features) this.features[e].unmount();
      this.current = null;
    }
    bindToMotionValue(e, t) {
      let n = cr.has(e),
        r = t.on(`change`, (t) => {
          ((this.latestValues[e] = t),
            this.props.onUpdate && ki.update(this.notifyUpdate, !1, !0),
            n && this.projection && (this.projection.isTransformDirty = !0));
        }),
        i = t.on(`renderRequest`, this.scheduleRender);
      this.valueSubscriptions.set(e, () => {
        (r(), i());
      });
    }
    sortNodePosition(e) {
      return !this.current || !this.sortInstanceNodePosition || this.type !== e.type
        ? 0
        : this.sortInstanceNodePosition(this.current, e.current);
    }
    loadFeatures({ children: e, ...t }, n, r, i) {
      let a, o;
      for (let e = 0; e < od; e++) {
        let n = ad[e],
          { isEnabled: r, Feature: i, ProjectionNode: s, MeasureLayout: c } = Yn[n];
        (s && (a = s),
          r(t) && (!this.features[n] && i && (this.features[n] = new i(this)), c && (o = c)));
      }
      if ((this.type === `html` || this.type === `svg`) && !this.projection && a) {
        this.projection = new a(this.latestValues, this.parent && this.parent.projection);
        let {
          layoutId: e,
          layout: n,
          drag: r,
          dragConstraints: o,
          layoutScroll: s,
          layoutRoot: c,
        } = t;
        this.projection.setOptions({
          layoutId: e,
          layout: n,
          alwaysMeasureLayout: !!r || (o && Ln(o)),
          visualElement: this,
          scheduleRender: () => this.scheduleRender(),
          animationType: typeof n == `string` ? n : `both`,
          initialPromotionConfig: i,
          layoutScroll: s,
          layoutRoot: c,
        });
      }
      return o;
    }
    updateFeatures() {
      for (let e in this.features) {
        let t = this.features[e];
        t.isMounted ? t.update() : (t.mount(), (t.isMounted = !0));
      }
    }
    triggerBuild() {
      this.build(this.renderState, this.latestValues, this.options, this.props);
    }
    measureViewportBox() {
      return this.current ? this.measureInstanceViewportBox(this.current, this.props) : Vc();
    }
    getStaticValue(e) {
      return this.latestValues[e];
    }
    setStaticValue(e, t) {
      this.latestValues[e] = t;
    }
    makeTargetAnimatable(e, t = !0) {
      return this.makeTargetAnimatableFromInstance(e, this.props, t);
    }
    update(e, t) {
      ((e.transformTemplate || this.props.transformTemplate) && this.scheduleRender(),
        (this.prevProps = this.props),
        (this.props = e),
        (this.prevPresenceContext = this.presenceContext),
        (this.presenceContext = t));
      for (let t = 0; t < sd.length; t++) {
        let n = sd[t];
        this.propEventSubscriptions[n] &&
          (this.propEventSubscriptions[n](), delete this.propEventSubscriptions[n]);
        let r = e[`on` + n];
        r && (this.propEventSubscriptions[n] = this.on(n, r));
      }
      ((this.prevMotionValues = rd(
        this,
        this.scrapeMotionValuesFromProps(e, this.prevProps),
        this.prevMotionValues,
      )),
        this.handleChildMotionValue && this.handleChildMotionValue());
    }
    getProps() {
      return this.props;
    }
    getVariant(e) {
      return this.props.variants ? this.props.variants[e] : void 0;
    }
    getDefaultTransition() {
      return this.props.transition;
    }
    getTransformPagePoint() {
      return this.props.transformPagePoint;
    }
    getClosestVariantNode() {
      return this.isVariantNode ? this : this.parent ? this.parent.getClosestVariantNode() : void 0;
    }
    getVariantContext(e = !1) {
      if (e) return this.parent ? this.parent.getVariantContext() : void 0;
      if (!this.isControllingVariants) {
        let e = (this.parent && this.parent.getVariantContext()) || {};
        return (this.props.initial !== void 0 && (e.initial = this.props.initial), e);
      }
      let t = {};
      for (let e = 0; e < cd; e++) {
        let n = Hn[e],
          r = this.props[n];
        (zn(r) || r === !1) && (t[n] = r);
      }
      return t;
    }
    addVariantChild(e) {
      let t = this.getClosestVariantNode();
      if (t)
        return (t.variantChildren && t.variantChildren.add(e), () => t.variantChildren.delete(e));
    }
    addValue(e, t) {
      (t !== this.values.get(e) && (this.removeValue(e), this.bindToMotionValue(e, t)),
        this.values.set(e, t),
        (this.latestValues[e] = t.get()));
    }
    removeValue(e) {
      this.values.delete(e);
      let t = this.valueSubscriptions.get(e);
      (t && (t(), this.valueSubscriptions.delete(e)),
        delete this.latestValues[e],
        this.removeValueFromRenderState(e, this.renderState));
    }
    hasValue(e) {
      return this.values.has(e);
    }
    getValue(e, t) {
      if (this.props.values && this.props.values[e]) return this.props.values[e];
      let n = this.values.get(e);
      return (
        n === void 0 &&
          t !== void 0 &&
          ((n = Ls(t, {
            owner: this,
          })),
          this.addValue(e, n)),
        n
      );
    }
    readValue(e) {
      return this.latestValues[e] !== void 0 || !this.current
        ? this.latestValues[e]
        : (this.getBaseTargetFromProps(this.props, e) ??
            this.readValueFromInstance(this.current, e, this.options));
    }
    setBaseTarget(e, t) {
      this.baseTarget[e] = t;
    }
    getBaseTarget(e) {
      let { initial: t } = this.props,
        n = typeof t == `string` || typeof t == `object` ? mi(this.props, t)?.[e] : void 0;
      if (t && n !== void 0) return n;
      let r = this.getBaseTargetFromProps(this.props, e);
      return r !== void 0 && !ur(r)
        ? r
        : this.initialValues[e] !== void 0 && n === void 0
          ? void 0
          : this.baseTarget[e];
    }
    on(e, t) {
      return (this.events[e] || (this.events[e] = new Ns()), this.events[e].add(t));
    }
    notify(e, ...t) {
      this.events[e] && this.events[e].notify(...t);
    }
  },
  ud = class extends ld {
    sortInstanceNodePosition(e, t) {
      return e.compareDocumentPosition(t) & 2 ? 1 : -1;
    }
    getBaseTargetFromProps(e, t) {
      return e.style ? e.style[t] : void 0;
    }
    removeValueFromRenderState(e, { vars: t, style: n }) {
      (delete t[e], delete n[e]);
    }
    makeTargetAnimatableFromInstance(
      { transition: e, transitionEnd: t, ...n },
      { transformValues: r },
      i,
    ) {
      let a = qs(n, e || {}, this);
      if ((r && ((t &&= r(t)), (n &&= r(n)), (a &&= r(a))), i)) {
        Gs(this, n, a);
        let e = $u(this, n, a, t);
        ((t = e.transitionEnd), (n = e.target));
      }
      return {
        transition: e,
        transitionEnd: t,
        ...n,
      };
    }
  };
function dd(e) {
  return window.getComputedStyle(e);
}
var fd = class extends ud {
    constructor() {
      (super(...arguments), (this.type = `html`));
    }
    readValueFromInstance(e, t) {
      if (cr.has(t)) {
        let e = bs(t);
        return (e && e.default) || 0;
      }
      {
        let n = dd(e),
          r = (hr(t) ? n.getPropertyValue(t) : n[t]) || 0;
        return typeof r == `string` ? r.trim() : r;
      }
    }
    measureInstanceViewportBox(e, { transformPagePoint: t }) {
      return cl(e, t);
    }
    build(e, t, n, r) {
      Ir(e, t, n, r.transformTemplate);
    }
    scrapeMotionValuesFromProps(e, t) {
      return fi(e, t);
    }
    handleChildMotionValue() {
      this.childSubscription && (this.childSubscription(), delete this.childSubscription);
      let { children: e } = this.props;
      ur(e) &&
        (this.childSubscription = e.on(`change`, (e) => {
          this.current && (this.current.textContent = `${e}`);
        }));
    }
    renderInstance(e, t, n, r) {
      li(e, t, n, r);
    }
  },
  pd = class extends ud {
    constructor() {
      (super(...arguments), (this.type = `svg`), (this.isSVGTag = !1));
    }
    getBaseTargetFromProps(e, t) {
      return e[t];
    }
    readValueFromInstance(e, t) {
      if (cr.has(t)) {
        let e = bs(t);
        return (e && e.default) || 0;
      }
      return ((t = ui.has(t) ? t : Pn(t)), e.getAttribute(t));
    }
    measureInstanceViewportBox() {
      return Vc();
    }
    scrapeMotionValuesFromProps(e, t) {
      return pi(e, t);
    }
    build(e, t, n, r) {
      ii(e, t, n, this.isSVGTag, r.transformTemplate);
    }
    renderInstance(e, t, n, r) {
      di(e, t, n, r);
    }
    mount(e) {
      ((this.isSVGTag = oi(e.tagName)), super.mount(e));
    }
  },
  md = (e, t) =>
    ir(e)
      ? new pd(t, {
          enableHardwareAcceleration: !1,
        })
      : new fd(t, {
          enableHardwareAcceleration: !0,
        }),
  hd = {
    layout: {
      ProjectionNode: Nu,
      MeasureLayout: wl,
    },
  },
  gd = {
    ...uc,
    ...ua,
    ...Pu,
    ...hd,
  },
  _d = nr((e, t) => Fi(e, t, gd, md));
function vd() {
  let e = (0, y.useRef)(!1);
  return (
    Mn(
      () => (
        (e.current = !0),
        () => {
          e.current = !1;
        }
      ),
      [],
    ),
    e
  );
}
function yd() {
  let e = vd(),
    [t, n] = (0, y.useState)(0),
    r = (0, y.useCallback)(() => {
      e.current && n(t + 1);
    }, [t]);
  return [(0, y.useCallback)(() => ki.postRender(r), [r]), t];
}
var bd = class extends y.Component {
  getSnapshotBeforeUpdate(e) {
    let t = this.props.childRef.current;
    if (t && e.isPresent && !this.props.isPresent) {
      let e = this.props.sizeRef.current;
      ((e.height = t.offsetHeight || 0),
        (e.width = t.offsetWidth || 0),
        (e.top = t.offsetTop),
        (e.left = t.offsetLeft));
    }
    return null;
  }
  componentDidUpdate() {}
  render() {
    return this.props.children;
  }
};
function xd({ children: e, isPresent: t }) {
  let n = (0, y.useId)(),
    r = (0, y.useRef)(null),
    i = (0, y.useRef)({
      width: 0,
      height: 0,
      top: 0,
      left: 0,
    });
  return (
    (0, y.useInsertionEffect)(() => {
      let { width: e, height: a, top: o, left: s } = i.current;
      if (t || !r.current || !e || !a) return;
      r.current.dataset.motionPopId = n;
      let c = document.createElement(`style`);
      return (
        document.head.appendChild(c),
        c.sheet &&
          c.sheet.insertRule(`
          [data-motion-pop-id="${n}"] {
            position: absolute !important;
            width: ${e}px !important;
            height: ${a}px !important;
            top: ${o}px !important;
            left: ${s}px !important;
          }
        `),
        () => {
          document.head.removeChild(c);
        }
      );
    }, [t]),
    y.createElement(
      bd,
      {
        isPresent: t,
        childRef: r,
        sizeRef: i,
      },
      y.cloneElement(e, {
        ref: r,
      }),
    )
  );
}
var Sd = ({
  children: e,
  initial: t,
  isPresent: n,
  onExitComplete: r,
  custom: i,
  presenceAffectsLayout: a,
  mode: o,
}) => {
  let s = hi(Cd),
    c = (0, y.useId)(),
    l = (0, y.useMemo)(
      () => ({
        id: c,
        initial: t,
        isPresent: n,
        custom: i,
        onExitComplete: (e) => {
          s.set(e, !0);
          for (let e of s.values()) if (!e) return;
          r && r();
        },
        register: (e) => (s.set(e, !1), () => s.delete(e)),
      }),
      a ? void 0 : [n],
    );
  return (
    (0, y.useMemo)(() => {
      s.forEach((e, t) => s.set(t, !1));
    }, [n]),
    y.useEffect(() => {
      !n && !s.size && r && r();
    }, [n]),
    o === `popLayout` &&
      (e = y.createElement(
        xd,
        {
          isPresent: n,
        },
        e,
      )),
    y.createElement(
      An.Provider,
      {
        value: l,
      },
      e,
    )
  );
};
function Cd() {
  return new Map();
}
function wd(e) {
  return (0, y.useEffect)(() => () => e(), []);
}
var Td = (e) => e.key || ``;
function Ed(e, t) {
  e.forEach((e) => {
    let n = Td(e);
    t.set(n, e);
  });
}
function Dd(e) {
  let t = [];
  return (
    y.Children.forEach(e, (e) => {
      (0, y.isValidElement)(e) && t.push(e);
    }),
    t
  );
}
var Od = ({
  children: e,
  custom: t,
  initial: n = !0,
  onExitComplete: r,
  exitBeforeEnter: i,
  presenceAffectsLayout: a = !0,
  mode: o = `sync`,
}) => {
  ga(!i, `Replace exitBeforeEnter with mode='wait'`);
  let s = (0, y.useContext)(Zn).forceRender || yd()[0],
    c = vd(),
    l = Dd(e),
    u = l,
    d = (0, y.useRef)(new Map()).current,
    f = (0, y.useRef)(u),
    p = (0, y.useRef)(new Map()).current,
    m = (0, y.useRef)(!0);
  if (
    (Mn(() => {
      ((m.current = !1), Ed(l, p), (f.current = u));
    }),
    wd(() => {
      ((m.current = !0), p.clear(), d.clear());
    }),
    m.current)
  )
    return y.createElement(
      y.Fragment,
      null,
      u.map((e) =>
        y.createElement(
          Sd,
          {
            key: Td(e),
            isPresent: !0,
            initial: n ? void 0 : !1,
            presenceAffectsLayout: a,
            mode: o,
          },
          e,
        ),
      ),
    );
  u = [...u];
  let h = f.current.map(Td),
    g = l.map(Td),
    _ = h.length;
  for (let e = 0; e < _; e++) {
    let t = h[e];
    g.indexOf(t) === -1 && !d.has(t) && d.set(t, void 0);
  }
  return (
    o === `wait` && d.size && (u = []),
    d.forEach((e, n) => {
      if (g.indexOf(n) !== -1) return;
      let i = p.get(n);
      if (!i) return;
      let m = h.indexOf(n),
        _ = e;
      (_ ||
        ((_ = y.createElement(
          Sd,
          {
            key: Td(i),
            isPresent: !1,
            onExitComplete: () => {
              d.delete(n);
              let e = Array.from(p.keys()).filter((e) => !g.includes(e));
              if (
                (e.forEach((e) => p.delete(e)),
                (f.current = l.filter((t) => {
                  let r = Td(t);
                  return r === n || e.includes(r);
                })),
                !d.size)
              ) {
                if (c.current === !1) return;
                (s(), r && r());
              }
            },
            custom: t,
            presenceAffectsLayout: a,
            mode: o,
          },
          i,
        )),
        d.set(n, _)),
        u.splice(m, 0, _));
    }),
    (u = u.map((e) => {
      let t = e.key;
      return d.has(t)
        ? e
        : y.createElement(
            Sd,
            {
              key: Td(e),
              isPresent: !0,
              presenceAffectsLayout: a,
              mode: o,
            },
            e,
          );
    })),
    y.createElement(y.Fragment, null, d.size ? u : u.map((e) => (0, y.cloneElement)(e)))
  );
};
function kd({ children: e, isValidProp: t, ...n }) {
  (t && Zr(t),
    (n = {
      ...(0, y.useContext)(On),
      ...n,
    }),
    (n.isStatic = hi(() => n.isStatic)));
  let r = (0, y.useMemo)(
    () => n,
    [JSON.stringify(n.transition), n.transformPagePoint, n.reducedMotion],
  );
  return y.createElement(
    On.Provider,
    {
      value: r,
    },
    e,
  );
}
var Ad = new Map(),
  jd = new Map(),
  Md = `site-youtube-video-candidates-v1`,
  Nd = 6048e5,
  Pd = 80;
function Fd(e, t = {}) {
  let n = e.trim().toLowerCase(),
    r = t.track?.trim().toLowerCase() || ``,
    i = t.artist?.trim().toLowerCase() || ``;
  return !n && !r && !i ? `` : [n, r, i].join(`::`);
}
function Id(e) {
  let t = [...(Array.isArray(e?.videoIds) ? e.videoIds : []), e?.videoId]
    .map((e) => (typeof e == `string` ? e.trim() : ``))
    .filter((e) => /^[a-zA-Z0-9_-]{11}$/.test(e));
  return [...new Set(t)];
}
function Ld() {
  try {
    return typeof window < `u` && window.localStorage !== void 0;
  } catch {
    return !1;
  }
}
function Rd() {
  if (!Ld()) return {};
  try {
    let e = window.localStorage.getItem(Md);
    if (!e) return {};
    let t = JSON.parse(e);
    return t && typeof t == `object` && !Array.isArray(t) ? t : {};
  } catch {
    return {};
  }
}
function zd(e) {
  if (Ld())
    try {
      let t = Object.fromEntries(
        Object.entries(e)
          .sort((e, t) => t[1].cachedAt - e[1].cachedAt)
          .slice(0, Pd),
      );
      window.localStorage.setItem(Md, JSON.stringify(t));
    } catch {}
}
function Bd(e) {
  if (Ad.has(e)) return Ad.get(e) ?? [];
  let t = Rd(),
    n = t[e];
  if (!n || typeof n.cachedAt != `number`) return null;
  if (Date.now() - n.cachedAt > Nd) return (delete t[e], zd(t), null);
  let r = Id({
    videoIds: n.videoIds,
  });
  return (Ad.set(e, r), r);
}
function Vd(e, t) {
  Ad.set(e, t);
  let n = Rd();
  ((n[e] = {
    videoIds: t,
    cachedAt: Date.now(),
  }),
    zd(n));
}
function Hd(e, t = {}) {
  let n = t.track?.trim() || ``,
    r = t.artist?.trim() || ``,
    i = Fd(e, t);
  if (!i) return Promise.resolve([]);
  let a = Bd(i);
  if (a) return Promise.resolve(a);
  let o = jd.get(i);
  if (o) return o;
  let s = (async () => {
    let t = new URLSearchParams({
      query: e,
    });
    (n && t.set(`track`, n), r && t.set(`artist`, r));
    let a = await fetch(`/.netlify/functions/getYoutubeVideo?${t.toString()}`);
    if (!a.ok) throw Error(`YouTube API error: ${a.status}`);
    let o = Id(await a.json());
    return (Vd(i, o), o);
  })();
  return (
    jd.set(i, s),
    s.finally(() => {
      jd.delete(i);
    })
  );
}
var Ud = async (e, t = {}) => (Fd(e, t) && (await Hd(e, t))[0]) || null,
  Gd = async (e, t = {}) => {
    let n = Fd(e, t);
    if (!(!n || Ad.has(n) || jd.has(n)))
      try {
        await Hd(e, t);
      } catch {}
  };
function Kd(e) {
  let t = e.trim();
  if (!t) return null;
  if (/^[a-zA-Z0-9_-]{11}$/.test(t)) return t;
  try {
    let e = new URL(t);
    if (e.hostname === `youtu.be`) {
      let t = e.pathname.replace(/^\/+/, ``).split(`/`)[0];
      return /^[a-zA-Z0-9_-]{11}$/.test(t) ? t : null;
    }
    if (e.hostname.includes(`youtube.com`)) {
      let t = e.searchParams.get(`v`);
      if (t && /^[a-zA-Z0-9_-]{11}$/.test(t)) return t;
      let n = e.pathname.split(`/`).filter(Boolean),
        r = n[n.length - 1];
      return /^[a-zA-Z0-9_-]{11}$/.test(r) ? r : null;
    }
  } catch {
    return null;
  }
  return null;
}
var qd = s((e) => {
    var t = p(),
      n = Symbol.for(`react.element`),
      r = Symbol.for(`react.fragment`),
      i = Object.prototype.hasOwnProperty,
      a = t.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner,
      o = {
        key: !0,
        ref: !0,
        __self: !0,
        __source: !0,
      };
    function s(e, t, r) {
      var s,
        c = {},
        l = null,
        u = null;
      for (s in (r !== void 0 && (l = `` + r),
      t.key !== void 0 && (l = `` + t.key),
      t.ref !== void 0 && (u = t.ref),
      t))
        i.call(t, s) && !o.hasOwnProperty(s) && (c[s] = t[s]);
      if (e && e.defaultProps)
        for (s in ((t = e.defaultProps), t)) c[s] === void 0 && (c[s] = t[s]);
      return {
        $$typeof: n,
        type: e,
        key: l,
        ref: u,
        props: c,
        _owner: a.current,
      };
    }
    ((e.Fragment = r), (e.jsx = s), (e.jsxs = s));
  }),
  Jd = s((e, t) => {
    t.exports = qd();
  }),
  K = Jd(),
  audioComponents = createAudioComponents(y, K.jsx),
  useAudio = audioComponents.useAudio,
  AudioProvider = audioComponents.AudioProvider;
function Of(e) {
  return !!e?.timestamps?.paused;
}
function kf(e) {
  return !e?.listening_to_spotify || !e.spotify ? !1 : !Of(e.spotify);
}
function Af(e, t = Date.now(), n = 15e3) {
  return !kf(e) || !e?.spotify ? !1 : Number(e.spotify.timestamps?.end || 0) > t - n;
}
var jf = `/.netlify/functions/getSiteSnapshot`,
  Mf = `cheatinformer-site-snapshot`,
  Nf = 1500,
  Pf = 2e4,
  Ff = 6e4,
  If = null,
  Lf = null,
  Rf = null,
  zf = 0;
function Bf(e) {
  let t = e.presence;
  if (!t?.success || !t.data?.listening_to_spotify || !t.data.spotify) {
    let n = Number(e.updatedAt?.presence || 0);
    if (!(n <= 0 || Date.now() - n > Ff)) return e;
    let r = (t?.data?.activities || []).filter((e) => e?.type !== 0);
    return r.length === (t?.data?.activities || []).length
      ? e
      : {
          ...e,
          presence: t && {
            ...t,
            data: {
              ...t.data,
              activities: r,
            },
          },
        };
  }
  let n = Number(t.data.spotify.timestamps?.end || 0),
    r = Number(e.updatedAt?.presence || 0),
    i = Date.now(),
    a = Of(t.data.spotify),
    o = n > 0 && i > n + 15e3,
    s = r > 0 && i - r > 9e4,
    c = r <= 0 || i - r > Ff;
  if (!a && !o && !s && !c) return e;
  let l = c ? t.data.activities.filter((e) => e?.type !== 0) : t.data.activities;
  return {
    ...e,
    presence: {
      ...t,
      data: {
        ...t.data,
        activities: l,
        listening_to_spotify: a || o || s ? !1 : t.data.listening_to_spotify,
        spotify: a || o || s ? null : t.data.spotify,
      },
    },
  };
}
function Vf(e) {
  if (!e || typeof e != `object`) return !1;
  let t = e;
  return `profile` in t && `presence` in t && `recentActivities` in t && `gameInfo` in t;
}
function Hf(e) {
  try {
    localStorage.setItem(Mf, JSON.stringify(e));
  } catch {}
}
function Uf(e) {
  if (!e) return null;
  let t = Bf(e);
  return (
    (If = {
      ...t,
      recentActivities: Array.isArray(t.recentActivities) ? t.recentActivities : [],
      recentSongs: Array.isArray(t.recentSongs) ? t.recentSongs : [],
      recentClips: Array.isArray(t.recentClips) ? t.recentClips : [],
      gameInfo: Array.isArray(t.gameInfo) ? t.gameInfo : [],
      robloxProfile: t.robloxProfile && typeof t.robloxProfile == `object` ? t.robloxProfile : null,
      gameActivity: t.gameActivity && typeof t.gameActivity == `object` ? t.gameActivity : null,
    }),
    Hf(If),
    If
  );
}
async function Wf(e = !1, t) {
  let n = Rf || Lf;
  if (n) return n;
  if (e && If && Date.now() - zf < Pf) return If;
  let r = typeof AbortController < `u` ? new AbortController() : null,
    i = r && t ? window.setTimeout(() => r.abort(), t) : null,
    a = (async () => {
      let t = await fetch(e ? `${jf}?refresh=1` : jf, {
        cache: `no-store`,
        signal: r?.signal,
      });
      if (!t.ok) throw Error(`Site snapshot API error: ${t.status}`);
      let n = await t.json();
      return Vf(n) ? Uf(n) : null;
    })();
  e ? (Rf = a) : (Lf = a);
  try {
    let t = await a;
    return (e && t && (zf = Date.now()), t);
  } finally {
    (i != null && window.clearTimeout(i), e ? (Rf = null) : (Lf = null));
  }
}
function Gf() {
  if (If) return If;
  try {
    let e = localStorage.getItem(Mf);
    if (!e) return null;
    let t = JSON.parse(e);
    return Vf(t) ? Uf(t) : null;
  } catch {
    return null;
  }
}
async function Kf() {
  let e = Gf();
  if (e) return e;
  try {
    return await Wf(!1, Nf);
  } catch {
    return null;
  }
}
async function qf(e = !1) {
  try {
    return await Wf(e);
  } catch {
    return Gf();
  }
}
function Jf(e) {
  let t = Gf();
  return !t &&
    !e.profile &&
    !e.presence &&
    !e.recentActivities &&
    !e.recentSongs &&
    !e.recentClips &&
    !e.gameInfo &&
    !e.robloxProfile &&
    !e.gameActivity
    ? null
    : Uf({
        profile: e.profile ?? t?.profile ?? null,
        presence: e.presence ?? t?.presence ?? null,
        recentActivities: e.recentActivities ?? t?.recentActivities ?? [],
        recentSongs: e.recentSongs ?? t?.recentSongs ?? [],
        recentClips: e.recentClips ?? t?.recentClips ?? [],
        gameInfo: e.gameInfo ?? t?.gameInfo ?? [],
        robloxProfile: e.robloxProfile ?? t?.robloxProfile ?? null,
        gameActivity: e.gameActivity ?? t?.gameActivity ?? null,
        updatedAt: {
          ...(t?.updatedAt || {}),
          ...(e.updatedAt || {}),
        },
      });
}
function Yf(e = !0) {
  return qf(e);
}
function Xf(e) {
  return e?.user?.display_name || e?.user?.global_name || e?.user?.username || `iTake`;
}
var Zf = () =>
    window.matchMedia(`(pointer: coarse)`).matches ||
    /Android|iPhone|iPad|iPod|Mobile/i.test(window.navigator.userAgent),
  EntryGate = ({ onEnter: e }) => {
    let {
        primePlayer: t,
        isPlayerPrimingReady: n,
        isAudioDisabled: r,
        disableAudioForever: i,
      } = useAudio(),
      o = (0, y.useMemo)(() => Xf(Gf()?.profile), []),
      s = Zf() && !n && !r;
    return (0, K.jsx)(_d.main, {
      className: `enter-gate ${s ? `is-waiting` : ``}`,
      initial: {
        opacity: 0,
      },
      animate: {
        opacity: 1,
      },
      exit: {
        opacity: 0,
      },
      transition: {
        duration: 0.28,
        ease: `easeOut`,
      },
      onClick: () => {
        t();
        e();
      },
      role: `button`,
      tabIndex: 0,
      onKeyDown: (event) => {
        if (event.key === `Enter` || event.key === ` `) {
          event.preventDefault();
          t();
          e();
        }
      },
      children: (0, K.jsxs)(`section`, {
        className: `enter-gate__content`,
        'aria-label': `Enter site`,
        children: [
          (0, K.jsx)(`p`, {
            className: `enter-gate__mark`,
            children: `cheatinformer`,
          }),
          (0, K.jsx)(`h1`, {
            children: o,
          }),
          (0, K.jsx)(`p`, {
            children: s ? `preparing audio` : `click to enter`,
          }),
          (0, K.jsx)(`button`, {
            type: `button`,
            className: `enter-gate__silent`,
            onClick: (t) => {
              (t.preventDefault(),
                t.stopPropagation(),
                i(),
                e({
                  silent: !0,
                }));
            },
            onPointerDown: (e) => e.stopPropagation(),
            onKeyDown: (e) => e.stopPropagation(),
            children: `Click to enter without audio`,
          }),
        ],
      }),
    });
  },
  $f = {
    xmlns: `http://www.w3.org/2000/svg`,
    width: 24,
    height: 24,
    viewBox: `0 0 24 24`,
    fill: `none`,
    stroke: `currentColor`,
    strokeWidth: 2,
    strokeLinecap: `round`,
    strokeLinejoin: `round`,
  },
  ep = (e) =>
    e
      .replace(/([a-z0-9])([A-Z])/g, `$1-$2`)
      .toLowerCase()
      .trim(),
  tp = (e, t) => {
    let n = (0, y.forwardRef)(
      (
        {
          color: n = `currentColor`,
          size: r = 24,
          strokeWidth: i = 2,
          absoluteStrokeWidth: a,
          className: o = ``,
          children: s,
          ...c
        },
        l,
      ) =>
        (0, y.createElement)(
          `svg`,
          {
            ref: l,
            ...$f,
            width: r,
            height: r,
            stroke: n,
            strokeWidth: a ? (Number(i) * 24) / Number(r) : i,
            className: [`lucide`, `lucide-${ep(e)}`, o].join(` `),
            ...c,
          },
          [...t.map(([e, t]) => (0, y.createElement)(e, t)), ...(Array.isArray(s) ? s : [s])],
        ),
    );
    return ((n.displayName = `${e}`), n);
  },
  np = tp(`X`, [
    [
      `path`,
      {
        d: `M18 6 6 18`,
        key: `1bl5f8`,
      },
    ],
    [
      `path`,
      {
        d: `m6 6 12 12`,
        key: `d8bk6v`,
      },
    ],
  ]),
  rp = {
    isTouchDevice: !1,
    supportsHover: !0,
    prefersReducedMotion: !1,
    hasSaveDataEnabled: !1,
    hardwareConcurrency: null,
    deviceMemory: null,
    effectiveConnectionType: null,
    webglRenderer: null,
    isHardwareAccelerationLikelyDisabled: !1,
    performanceModeReason: null,
    shouldShowPerformanceModeToast: !1,
    tier: `high`,
    isLowEndDevice: !1,
    isLowPerformanceMode: !1,
    shouldReduceMotion: !1,
    shouldDisableHeavyEffects: !1,
    shouldDisableMouseTrail: !1,
    shouldUseStaticBackground: !1,
  },
  ip =
    /(swiftshader|llvmpipe|software|softpipe|lavapipe|basic render|microsoft basic render|mesa offscreen|apple software renderer)/i,
  ap = 30,
  op = 2500,
  sp = 12,
  cp = 2,
  lp = 1250,
  up = null,
  dp = !1,
  fp = !1,
  pp = !1,
  mp = null,
  hp = 0,
  gp = 0,
  _p = 0,
  vp = 0,
  yp = 0,
  bp = new Set();
function xp() {
  bp.forEach((e) => e());
}
function Sp(e = 0) {
  ((hp = e), (gp = e), (_p = 0), (vp = 0));
}
function Cp(e = !1) {
  (typeof window < `u` && mp !== null && window.cancelAnimationFrame(mp),
    (mp = null),
    e && ((yp = 0), Sp()));
}
function wp() {
  pp || typeof document > `u` || (document.addEventListener(`visibilitychange`, Op), (pp = !0));
}
function Tp(e) {
  let t = vp > 0 ? (_p * 1e3) / vp : 0;
  ((yp = _p >= sp && t > 0 && t < ap ? yp + 1 : 0),
    Sp(e),
    !(dp || fp || yp < cp) && ((fp = !0), Cp(!0), (up = null), xp()));
}
function Ep() {
  typeof window > `u` ||
    typeof document > `u` ||
    document.hidden ||
    dp ||
    fp ||
    mp !== null ||
    (mp = window.requestAnimationFrame(Dp));
}
function Dp(e) {
  if (((mp = null), typeof document > `u` || document.hidden || dp || fp)) {
    Cp(!0);
    return;
  }
  if (gp === 0) {
    (Sp(e), Ep());
    return;
  }
  let t = e - hp;
  if (((hp = e), t <= 0)) {
    Ep();
    return;
  }
  if (t > lp) {
    (Cp(!0), Sp(e), Ep());
    return;
  }
  ((_p += 1), (vp += t), e - gp >= op && Tp(e), Ep());
}
function Op() {
  if (!(typeof document > `u`)) {
    if (document.hidden) {
      Cp(!0);
      return;
    }
    Ep();
  }
}
function kp() {
  typeof window > `u` ||
    typeof document > `u` ||
    (wp(), !(document.hidden || dp || fp) && (gp === 0 && Sp(window.performance.now()), Ep()));
}
function Ap() {
  try {
    let e = document.createElement(`canvas`),
      t = {
        antialias: !1,
        depth: !1,
        failIfMajorPerformanceCaveat: !1,
        powerPreference: `high-performance`,
        preserveDrawingBuffer: !1,
        stencil: !1,
      },
      n = e.getContext(`webgl`, t) || e.getContext(`experimental-webgl`, t);
    if (!n || typeof n != `object` || !(`getParameter` in n)) return null;
    let r = n,
      i = r.getExtension(`WEBGL_debug_renderer_info`),
      a = i ? r.getParameter(i.UNMASKED_RENDERER_WEBGL) : r.getParameter(r.RENDERER);
    return (
      r.getExtension(`WEBGL_lose_context`)?.loseContext?.(),
      (typeof a == `string` && a.trim()) || null
    );
  } catch {
    return null;
  }
}
var jp = () => {
    if (up) return up;
    if (typeof window > `u`) return rp;
    let e = window.navigator,
      t = e.connection ?? e.mozConnection ?? e.webkitConnection ?? null,
      n = window.matchMedia(`(prefers-reduced-motion: reduce)`).matches,
      r =
        `ontouchstart` in window ||
        e.maxTouchPoints > 0 ||
        window.matchMedia(`(pointer: coarse)`).matches,
      i = window.matchMedia(`(hover: hover)`).matches && !r,
      a = typeof e.hardwareConcurrency == `number` ? e.hardwareConcurrency : null,
      o = typeof e.deviceMemory == `number` ? e.deviceMemory : null,
      s = !!t?.saveData,
      c = t?.effectiveType ?? null,
      l = Ap(),
      u = !!(l && ip.test(l)),
      d = null;
    (dp ||
      (u
        ? (d = `hardware-acceleration`)
        : n
          ? (d = `reduced-motion`)
          : s
            ? (d = `save-data`)
            : fp && (d = `low-fps`)),
      !dp && !u && !n && !s && !fp ? kp() : Cp(!0));
    let f = d ? `disabled` : `high`,
      p = f === `disabled`,
      m = dp ? !1 : n || f !== `high`,
      h = dp ? !1 : n || p;
    return (
      (up = {
        isTouchDevice: r,
        supportsHover: i,
        prefersReducedMotion: n,
        hasSaveDataEnabled: s,
        hardwareConcurrency: a,
        deviceMemory: o,
        effectiveConnectionType: c,
        webglRenderer: l,
        isHardwareAccelerationLikelyDisabled: u,
        performanceModeReason: d,
        shouldShowPerformanceModeToast: d === `hardware-acceleration` || d === `low-fps`,
        tier: f,
        isLowEndDevice: !1,
        isLowPerformanceMode: p,
        shouldReduceMotion: m,
        shouldDisableHeavyEffects: h,
        shouldDisableMouseTrail: r || h,
        shouldUseStaticBackground: !dp && p,
      }),
      up
    );
  },
  Mp = () => {
    dp || ((dp = !0), Cp(!0), (up = null), xp());
  },
  Np = () => {
    dp && ((dp = !1), (up = null), xp());
  },
  Pp = (e) => (
    bp.add(e),
    () => {
      bp.delete(e);
    }
  ),
  Fp = () => (0, y.useSyncExternalStore)(Pp, jp, () => rp);
function Ip(e) {
  switch (e.performanceModeReason) {
    case `hardware-acceleration`:
      return {
        title: `Reduced effects enabled`,
        description: `Your browser appears to be using software rendering, so some heavier visuals were reduced. Enabling hardware acceleration should restore the full effect.`,
      };
    case `low-fps`:
      return {
        title: `Reduced effects enabled`,
        description: `Your frame rate dropped below 30 FPS broseph 💔💔, some heavier visuals were reduced automatically to keep things smooth and cool!`,
      };
    default:
      return {
        title: `Reduced effects enabled`,
        description: `Some heavier visuals were reduced automatically to keep the experience smooth on this device.`,
      };
  }
}
var Lp = () => {
    let [e, t] = (0, y.useState)(!1),
      n = Fp(),
      r = Ip(n),
      i = () => {
        Mp();
      };
    return e || !n.shouldShowPerformanceModeToast || n.isTouchDevice
      ? null
      : (0, K.jsx)(`aside`, {
          className: `performance-toast fixed right-4 top-4 z-[130] w-[min(25rem,calc(100vw-2rem))]`,
          role: `status`,
          'aria-live': `polite`,
          children: (0, K.jsxs)(`div`, {
            className: `flex items-start gap-3`,
            children: [
              (0, K.jsxs)(`div`, {
                className: `min-w-0 flex-1`,
                children: [
                  (0, K.jsx)(`p`, {
                    className: `text-sm font-semibold text-amber-300`,
                    children: r.title,
                  }),
                  (0, K.jsxs)(`p`, {
                    className: `mt-1 text-sm leading-5 text-zinc-400`,
                    children: [
                      r.description,
                      ` `,
                      (0, K.jsx)(`span`, {
                        role: `button`,
                        tabIndex: 0,
                        onClick: i,
                        onKeyDown: (e) => {
                          (e.key === `Enter` || e.key === ` `) && (e.preventDefault(), i());
                        },
                        className: `performance-toast__action`,
                        children: `Click here to enable full experience (Possible lag!!)`,
                      }),
                    ],
                  }),
                ],
              }),
              (0, K.jsx)(`button`, {
                type: `button`,
                onClick: () => t(!0),
                className: `performance-toast__close inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-lg text-zinc-400`,
                'aria-label': `Dismiss low performance mode notice`,
                children: (0, K.jsx)(np, {
                  className: `h-4 w-4`,
                }),
              }),
            ],
          }),
        });
  },
  Rp = null,
  zp = null,
  Bp = 14;
async function Vp(e = !0) {
  if (!e && Rp && Rp.assetProxyVersion === Bp) return Rp;
  if (zp) return zp;
  zp = (async () => {
    let e = `/.netlify/functions/getRobloxAvatar3d?refresh=1&_=${Date.now()}`,
      t = await fetch(e, {
        cache: `no-store`,
      });
    if (!t.ok) {
      let e = await t.json().catch(() => null);
      throw Error(e?.error || `Roblox avatar 3d failed (${t.status})`);
    }
    let n = await t.json();
    return ((Rp = n), n);
  })();
  try {
    return await zp;
  } finally {
    zp = null;
  }
}
var LazyRobloxAvatar = y.lazy(() => import('./roblox-renderer.js'));
function ZC(props) {
  return K.jsx(y.Suspense, {
    fallback: null,
    children: K.jsx(LazyRobloxAvatar, props),
  });
}
var $C = `cheatinformer-visual-effects-mode`,
  ew = new Set(),
  tw = `normal`,
  nw = !1;
function rw(e) {
  return e === `normal`;
}
function iw() {
  if (typeof window > `u`) return `normal`;
  try {
    let e = window.localStorage.getItem($C);
    return e === `lockedin` ? (window.localStorage.removeItem($C), `normal`) : rw(e) ? e : `normal`;
  } catch {
    return `normal`;
  }
}
function aw() {
  (typeof document < `u` && delete document.documentElement.dataset.effectsMode, Np());
}
function ow() {
  ew.forEach((e) => e());
}
function sw() {
  nw ||= ((tw = iw()), !0);
}
function cw() {
  (sw(), aw(), ow());
}
function lw() {
  return (sw(), tw);
}
function uw(e) {
  return (
    ew.add(e),
    () => {
      ew.delete(e);
    }
  );
}
function dw() {
  return (0, y.useSyncExternalStore)(uw, lw, () => `normal`);
}
var fw = async () => {
    let e = await fetch(`/.netlify/functions/views?_=${Date.now()}`, {
      cache: `no-store`,
    });
    if (!e.ok) throw Error(`Failed to fetch views`);
    return (await e.json()).views;
  },
  pw = `cheatinformer_viewed`,
  mw = !1,
  hw = () => {
    mw ||
      sessionStorage.getItem(pw) ||
      ((mw = !0),
      fetch(`/.netlify/functions/views?_=${Date.now()}`, {
        method: `POST`,
        cache: `no-store`,
        keepalive: !0,
      })
        .then((e) => {
          e.ok ? sessionStorage.setItem(pw, `1`) : (mw = !1);
        })
        .catch(() => {
          mw = !1;
        }));
  },
  LazyMainProfile = (0, y.lazy)(() => w(() => import(`./profile.js`), []));
function SiteApp() {
  let e = nt(),
    t = Fp(),
    [n, r] = (0, y.useState)(!1);
  return (
    (0, y.useEffect)(() => {
      hw();
    }, []),
    (0, y.useEffect)(() => {
      let e = document.documentElement;
      (delete e.dataset.theme, (e.style.colorScheme = `dark`));
    }, []),
    (0, y.useEffect)(() => {
      cw();
    }, []),
    (0, y.useEffect)(
      () => (
        (document.documentElement.dataset.performanceMode = t.isLowPerformanceMode
          ? `low`
          : t.tier),
        () => {
          delete document.documentElement.dataset.performanceMode;
        }
      ),
      [t.isLowPerformanceMode, t.tier],
    ),
    (0, K.jsx)(AudioProvider, {
      children: (0, K.jsx)(kd, {
        reducedMotion: t.shouldReduceMotion ? `always` : `never`,
        children: (0, K.jsx)(Od, {
          mode: `wait`,
          children: n
            ? (0, K.jsxs)(
                y.Suspense,
                {
                  fallback: (0, K.jsx)(`div`, {
                    className: `min-h-screen w-full`,
                    style: {
                      background: `var(--background)`,
                    },
                  }),
                  children: [
                    (0, K.jsx)(Lp, {}),
                    (0, K.jsxs)(jt, {
                      location: e,
                      children: [
                        (0, K.jsx)(kt, {
                          path: `/`,
                          element: (0, K.jsx)(LazyMainProfile, {}),
                        }),
                        (0, K.jsx)(kt, {
                          path: `/activity`,
                          element: (0, K.jsx)(Ot, {
                            to: `/`,
                            replace: !0,
                          }),
                        }),
                        (0, K.jsx)(kt, {
                          path: `/music`,
                          element: (0, K.jsx)(Ot, {
                            to: `/`,
                            replace: !0,
                          }),
                        }),
                        (0, K.jsx)(kt, {
                          path: `/roblox`,
                          element: (0, K.jsx)(Ot, {
                            to: `/#roblox`,
                            replace: !0,
                          }),
                        }),
                        (0, K.jsx)(kt, {
                          path: `/links`,
                          element: (0, K.jsx)(Ot, {
                            to: `/#connect`,
                            replace: !0,
                          }),
                        }),
                        (0, K.jsx)(kt, {
                          path: `/profile`,
                          element: (0, K.jsx)(Ot, {
                            to: `/`,
                            replace: !0,
                          }),
                        }),
                        (0, K.jsx)(kt, {
                          path: `*`,
                          element: (0, K.jsx)(Ot, {
                            to: `/`,
                            replace: !0,
                          }),
                        }),
                      ],
                    }),
                  ],
                },
                `site`,
              )
            : (0, K.jsx)(
                EntryGate,
                {
                  onEnter: () => r(!0),
                },
                `enter`,
              ),
        }),
      }),
    })
  );
}
var vw = `/assets/itake-avatar.jpeg`;
function yw(e, t, n) {
  let r = document.head.querySelector(`link[rel="${e}"]`);
  (r || ((r = document.createElement(`link`)), (r.rel = e), document.head.appendChild(r)),
    (r.type = n),
    (r.href = t));
}
function bw() {
  let { hostname: e } = window.location;
  e !== `localhost` &&
    e !== `127.0.0.1` &&
    (yw(`icon`, vw, `image/jpeg`), yw(`apple-touch-icon`, vw, `image/jpeg`));
}
async function mountApp() {
  (bw(),
    await Kf(),
    (0, b.createRoot)(document.getElementById(`root`)).render(
      (0, K.jsx)(y.StrictMode, {
        children: (0, K.jsx)(gn, {
          future: {
            v7_startTransition: !0,
            v7_relativeSplatPath: !0,
          },
          children: (0, K.jsx)(SiteApp, {}),
        }),
      }),
    ),
    Yf(!1));
}
mountApp();
export {
  y as React,
  K as jsxRuntime,
  _ as C,
  nt as S,
  u as T,
  Gd as _,
  Fp as a,
  _d as b,
  qf as c,
  Yf as d,
  Af as f,
  Kd as g,
  Jd as h,
  Vp as i,
  Gf as l,
  useAudio as m,
  dw as n,
  np as o,
  kf as p,
  ZC as r,
  tp as s,
  fw as t,
  Jf as u,
  Ud as v,
  p as w,
  _n as x,
  Od as y,
};
