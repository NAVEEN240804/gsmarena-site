window.suggestmeyes_loaded = !0,
location.hostname,
$gsm = {
  tag: function(e, t, n, s) {
    var i = document.createElement(e);
    for (var o in t) i.setAttribute(o, t[o]);
    return n && (i.innerHTML = n),
    s && s.appendChild(i),
    i
  },
  hasClass: function(e, t) {
    if (e) return e.classList && t ? e.classList.contains(t) : new RegExp("(\\s|^)" + t + "(\\s|$)").test(e.className)
  },
  addClass: function(e, t) {
    if (e) return e.classList && t ? e.classList.add(t) : void($gsm.hasClass(e, t) || (e.className += " " + t))
  },
  removeClass: function(e, t) {
    if (e) return e.classList && t ? e.classList.remove(t) : void(e.className = e.className.replace(new RegExp("(\\s+|^)" + t + "(\\s+|$)"), " "))
  },
  toggleClass: function(e, t, n) {
    if (e) {
      if (e.classList && t) return e.classList.toggle(t, n);
      void 0 === n && (n = !$gsm.hasClass(e, t)),
      n ? $gsm.addClass(e, t) : $gsm.removeClass(e, t)
    }
  },
  isMobile: "undefined" != typeof MOBILE_SITE && MOBILE_SITE,
  addEventListener: function(e, t, n, s) {
    for (var i = t.split(/\s+/), o = 0; o < i.length; o++) window.addEventListener ? e.addEventListener(i[o], n, s) : e.attachEvent("on" + i[o], n)
  },
  dispatchEvent: function(e, t, n) {
    let s;
    try {
      n && (s = new CustomEvent(e, {
        detail: n
      }))
    } catch(e) {} finally {
      s || (s = new Event(e)),
      t.dispatchEvent(s)
    }
  },
  onload: function(e) {
    function t() {
      n || (n = !0, e())
    }
    var n = !1;
    $gsm.addEventListener(document, "DOMContentLoaded", t),
    $gsm.addEventListener(window, "load", t)
  },
  xhr: function(type, url, callback, data, fail, noParse, withCredentials) {
    var request;
    if (window.XMLHttpRequest) request = new XMLHttpRequest;
    else if (window.ActiveXObject) try {
      request = new ActiveXObject("Msxml2.XMLHTTP")
    } catch(e) {
      try {
        request = new ActiveXObject("Microsoft.XMLHTTP")
      } catch(e) {
        return
      }
    }
    if (data) {
      var arr = [];
      for (var k in data) arr.push(k + "=" + data[k]);
      url += "?" + arr.join("&")
    }
    withCredentials && (request.withCredentials = withCredentials),
    request.open(type, url, !0),
    request.onreadystatechange = function() {
      var data;
      if (4 == request.readyState && 200 == request.status) if (noParse) callback(request.responseText);
      else {
        if (window.JSON) try {
          data = JSON.parse(request.responseText)
        } catch(e) {
          fail && fail(null, e)
        } else data = eval("(" + request.responseText + ")");
        callback(data)
      } else 4 == request.readyState && (request.status > 400 || 0 == request.status) && fail && fail(request)
    };
    try {
      request.send()
    } catch(e) {
      fail(request, e)
    }
  },
  draggable: function(e, t, n, s, i) {
    let o,
    a,
    r,
    l,
    c = !1,
    d = "";
    const u = function(t) {
      c = !0,
      o = t.screenX,
      a = t.screenY,
      r = t.screenX,
      l = t.screenY,
      d = document.body.style.userSelect,
      document.body.style.userSelect = "none",
      s && s.call(e, o, a)
    };
    e.addEventListener("mousedown", u);
    const g = function(n) {
      c && (i ? (r += n.screenX - r, l += n.screenY - l, t.call(e, r - o, l - a)) : (t.call(e, n.screenX - o, n.screenY - a), o = n.screenX, a = n.screenY))
    };
    document.addEventListener("mousemove", g);
    const h = function(t) {
      c && (c = !1, n && (i ? (r += t.screenX - r, l += t.screenY - l, n.call(e, r - o, l - a)) : n.call(e, t.screenX - o, t.screenY - a)), document.body.style.userSelect = d)
    };
    document.addEventListener("mouseup", h, !0),
    e.addEventListener("touchstart",
    function(e) {
      u({
        screenX: e.touches[0].clientX,
        screenY: e.touches[0].clientY
      })
    }),
    document.addEventListener("touchmove",
    function(e) {
      g({
        screenX: e.touches[0].clientX,
        screenY: e.touches[0].clientY
      })
    }),
    document.addEventListener("touchend",
    function() {
      h({
        screenX: i ? r: 0,
        screenY: i ? l: 0
      })
    })
  },
  setCookie: function(e, t, n, s, i) {
    if (n) {
      var o = new Date;
      o.setTime(o.getTime() + 24 * n * 60 * 60 * 1e3);
      var a = "; expires=" + o.toGMTString()
    } else a = "";
    document.cookie = e + "=" + t + a + "; path=" + (s || "/") + (i ? "; domain=" + i: "")
  },
  getCookie: function(e) {
    for (var t = e + "=",
    n = document.cookie.split(";"), s = 0; s < n.length; s++) {
      for (var i = n[s];
      " " == i.charAt(0);) i = i.substring(1);
      if (0 == i.indexOf(t)) return i.substring(t.length, i.length)
    }
    return ""
  },
  ensureCSS: function(e, t, n) {
    t = t || "";
    const s = document.querySelector('link[rel=stylesheet][href*="' + e + '"]');
    if (s) n && n();
    else {
      const s = new Date,
      i = s.getMonth() + "-" + s.getDate(),
      o = e + (t ? "?v=" + t + i: ""),
      a = $gsm.tag("link", {
        rel: "stylesheet",
        href: o
      },
      "", document.head);
      n && (a.onload = n)
    }
  },
  _ensureJSLoadingScripts: {},
  ensureJS: function(e, t, n) {
    t = t || "";
    const s = document.querySelector('script[src*="' + e + '"]');
    if (s) n && (e in $gsm._ensureJSLoadingScripts ? $gsm._ensureJSLoadingScripts[e].push(n) : n());
    else {
      const s = new Date,
      i = s.getMonth() + "-" + s.getDate(),
      o = e + (t ? "?v=" + t + i: ""),
      a = $gsm.tag("script", {
        src: o
      },
      "", document.head),
      r = [];
      n && r.push(n),
      $gsm._ensureJSLoadingScripts[e] = r,
      a.onload = function() {
        const t = $gsm._ensureJSLoadingScripts[e];
        if (t) for (const e of t) e();
        delete $gsm._ensureJSLoadingScripts[e]
      }
    }
  },
  loadModules: function() {
    "undefined" != typeof MODULES_TO_LOAD && $gsm.xhr("GET", MODULES_TO_LOAD,
    function(e) {
      $gsm.LOADED_MODULES = e,
      $gsm.__loaded && $gsm.__insertModules()
    },
    {},
    null, !0)
  },
  __insertModules: function() {
    var html = document.createElement("html");
    html.innerHTML = $gsm.LOADED_MODULES,
    $gsm.LOADED_MODULES = null;
    for (var contentContainers = html.querySelectorAll("[data-module]"), i = 0; i < contentContainers.length; i++) {
      var container = contentContainers[i],
      module = container.getAttribute("data-module"),
      target = document.querySelector('.dynamic[data-module="' + module + '"]');
      target && (target.innerHTML = container.innerHTML)
    }
    for (var scripts = html.querySelectorAll("script"), i = 0; i < scripts.length; i++) eval(scripts[i].innerHTML)
  },
  validateForm: function(e) {
    var t = document.querySelector(e);
    if (t) {
      var n = Array.prototype.slice.call(t.querySelectorAll("input[required]")),
      s = t.querySelector("input[type=submit]"),
      i = function(e) {
        var t = n.every(function(e) {
          return e.checkValidity && e.checkValidity()
        });
        t ? s.removeAttribute("disabled") : s.setAttribute("disabled", "disabled")
      };
      i(),
      t.addEventListener("input", i)
    }
  },
  beacon: function(e) {
    var t = new URL(e),
    n = new FormData;
    t.searchParams.forEach(function(e, t) {
      n.append(t, e)
    }),
    t.search = "",
    navigator.sendBeacon && navigator.sendBeacon(t.href, n) || $gsm.xhr("GET", e,
    function() {},
    null,
    function() {},
    !0)
  },
  timeToMinutes: function(e) {
    const t = e.split(/:/g);
    if (t.length >= 2 && t.length <= 3) {
      let e = 60 * parseInt(t[0], 10) + parseInt(t[1], 10);
      return 3 == t.length && (e += parseInt(t[2], 10) / 60),
      e
    }
    console.error("$gsm.timeToMinutes: wrong time format! (" + e + ")")
  },
  minutesToHours: function(e, t) {
    const n = Math.floor(e / 60),
    s = t ? Math.floor(e % 60) : Math.round(e % 60),
    i = Math.round(e % 1 * 60);
    return n + ":" + (s < 10 ? "0": "") + s + (t ? ":" + (i < 10 ? "0": "") + i: "")
  },
  LOGO: ASSETS_BASE_URL + "i/logo.svg",
  LOGO_FALLBACK: ASSETS_BASE_URL + "i/logo-fallback.gif"
},
$gsm.onload(function() {
  $gsm.__loaded = !0,
  $gsm.LOADED_MODULES && $gsm.__insertModules()
}),
$gsm.loadModules(),
$gsm.onload(function() {
  const e = document.querySelectorAll("#switch-version");
  for (let t = 0; t < e.length; t++) e[t].onclick = function(e) {
    e.preventDefault(),
    e.stopPropagation();
    const t = location.pathname.replace(/^\//, "") + location.search + location.hash,
    n = location.host.replace(/^(www|m)\./, "");
    $gsm.isMobile ? ($gsm.setCookie("sSiteVersion", "desktop", 100, "/", n), window.location = DESKTOP_BASE_URL + t) : ($gsm.setCookie("sSiteVersion", "mobile", 100, "/", n), window.location = MOBILE_BASE_URL + t)
  }
}),
"bind" in Object &&
function(e, t) {
  "use strict";
  function n(e) {
    this.callback = e,
    this.ticking = !1
  }
  function s(t) {
    return t && void 0 !== e && (t === e || t.nodeType)
  }
  function i(e) {
    if (arguments.length <= 0) throw new Error("Missing arguments in extend function");
    var t, n, o = e || {};
    for (n = 1; n < arguments.length; n++) {
      var a = arguments[n] || {};
      for (t in a) o[t] = "object" != typeof o[t] || s(o[t]) ? o[t] || a[t] : i(o[t], a[t])
    }
    return o
  }
  function o(e) {
    return e === Object(e) ? e: {
      down: e,
      up: e
    }
  }
  function a(e, t) {
    t = i(t, a.options),
    this.lastKnownScrollY = 0,
    this.elem = e,
    this.debouncer = new n(this.update.bind(this)),
    this.tolerance = o(t.tolerance),
    this.classes = t.classes,
    this.offset = t.offset,
    this.scroller = t.scroller,
    this.initialised = !1,
    this.onPin = t.onPin,
    this.onUnpin = t.onUnpin,
    this.onTop = t.onTop,
    this.onNotTop = t.onNotTop
  }
  var r = {
    bind: !!
    function() {}.bind,
    classList: "classList" in t.documentElement,
    rAF: !!(e.requestAnimationFrame || e.webkitRequestAnimationFrame || e.mozRequestAnimationFrame)
  };
  e.requestAnimationFrame = e.requestAnimationFrame || e.webkitRequestAnimationFrame || e.mozRequestAnimationFrame,
  n.prototype = {
    constructor: n,
    update: function() {
      this.callback && this.callback(),
      this.ticking = !1
    },
    requestTick: function() {
      this.ticking || (requestAnimationFrame(this.rafCallback || (this.rafCallback = this.update.bind(this))), this.ticking = !0)
    },
    handleEvent: function() {
      this.requestTick()
    }
  },
  a.prototype = {
    constructor: a,
    init: function() {
      return a.cutsTheMustard ? (this.elem.classList.add(this.classes.initial), setTimeout(this.attachEvent.bind(this), 100), this) : void 0
    },
    destroy: function() {
      var e = this.classes;
      this.initialised = !1,
      this.elem.classList.remove(e.unpinned, e.pinned, e.top, e.initial),
      this.scroller.removeEventListener("scroll", this.debouncer, !1)
    },
    attachEvent: function() {
      this.initialised || (this.lastKnownScrollY = this.getScrollY(), this.initialised = !0, this.scroller.addEventListener("scroll", this.debouncer, !1), this.debouncer.handleEvent())
    },
    unpin: function() {
      var e = this.elem.classList,
      t = this.classes; (e.contains(t.pinned) || !e.contains(t.unpinned)) && (e.add(t.unpinned), e.remove(t.pinned), this.onUnpin && this.onUnpin.call(this))
    },
    pin: function() {
      var e = this.elem.classList,
      t = this.classes;
      e.contains(t.unpinned) && (e.remove(t.unpinned), e.add(t.pinned), this.onPin && this.onPin.call(this))
    },
    top: function() {
      var e = this.elem.classList,
      t = this.classes;
      e.contains(t.top) || (e.add(t.top), e.remove(t.notTop), this.onTop && this.onTop.call(this))
    },
    notTop: function() {
      var e = this.elem.classList,
      t = this.classes;
      e.contains(t.notTop) || (e.add(t.notTop), e.remove(t.top), this.onNotTop && this.onNotTop.call(this))
    },
    getScrollY: function() {
      return void 0 !== this.scroller.pageYOffset ? this.scroller.pageYOffset: void 0 !== this.scroller.scrollTop ? this.scroller.scrollTop: (t.documentElement || t.body.parentNode || t.body).scrollTop
    },
    getViewportHeight: function() {
      return e.innerHeight || t.documentElement.clientHeight || t.body.clientHeight
    },
    getDocumentHeight: function() {
      var e = t.body,
      n = t.documentElement;
      return Math.max(e.scrollHeight, n.scrollHeight, e.offsetHeight, n.offsetHeight, e.clientHeight, n.clientHeight)
    },
    getElementHeight: function(e) {
      return Math.max(e.scrollHeight, e.offsetHeight, e.clientHeight)
    },
    getScrollerHeight: function() {
      return this.scroller === e || this.scroller === t.body ? this.getDocumentHeight() : this.getElementHeight(this.scroller)
    },
    isOutOfBounds: function(e) {
      var t = 0 > e,
      n = e + this.getViewportHeight() > this.getScrollerHeight();
      return t || n
    },
    toleranceExceeded: function(e, t) {
      return Math.abs(e - this.lastKnownScrollY) >= this.tolerance[t]
    },
    shouldUnpin: function(e, t) {
      var n = e > this.lastKnownScrollY,
      s = e >= this.offset;
      return n && s && t
    },
    shouldPin: function(e, t) {
      var n = e < this.lastKnownScrollY,
      s = e <= this.offset;
      return n && t || s
    },
    update: function() {
      var e = this.getScrollY(),
      t = e > this.lastKnownScrollY ? "down": "up",
      n = this.toleranceExceeded(e, t);
      this.isOutOfBounds(e) || (e <= this.offset ? this.top() : this.notTop(), this.shouldUnpin(e, n) ? this.unpin() : this.shouldPin(e, n) && this.pin(), this.lastKnownScrollY = e)
    }
  },
  a.options = {
    tolerance: {
      up: 0,
      down: 0
    },
    offset: 0,
    scroller: e,
    classes: {
      pinned: "headroom--pinned",
      unpinned: "headroom--unpinned",
      top: "headroom--top",
      notTop: "headroom--not-top",
      initial: "headroom"
    }
  },
  a.cutsTheMustard = void 0 !== r && r.rAF && r.bind && r.classList,
  e.Headroom = a
} (window, document),
$gsm.onload(function() {
  var e = document.querySelector(".lines-button");
  e && (e.onclick = function() {
    var t = !$gsm.hasClass(e, "open");
    $gsm.toggleClass(e, "open", t),
    $gsm.toggleClass(document.querySelector("#menu"), "open", t),
    $gsm.toggleClass(document.querySelector("#header"), "open", t),
    $gsm.setCookie("sSubmenuState", t ? "open": "close", 7)
  }),
  "Headroom" in window && ($gsm.headroom = new Headroom(document.getElementById("header"), {
    tolerance: {
      down: 10,
      up: 20
    },
    offset: 52,
    classes: {
      initial: "slide",
      pinned: "slide--reset",
      unpinned: "slide--up"
    }
  }), $gsm.headroom.init());
  var t = document.querySelector(".more-reviews-list-container"),
  n = document.querySelector(".more-reviews-list-toggle");
  n && (n.onclick = function() {
    return "block" == t.style.display ? (t.style.display = "none", n.innerHTML = "&#9650;") : (t.style.display = "block", n.innerHTML = "&#9660;"),
    !1
  });
  var s = "" !== $gsm.getCookie("sLoginCookie"),
  i = document.querySelector(".specs-fans"),
  o = !1;
  "undefined" != typeof BECOME_FAN_URL && i && (i.onclick = function() {
    if (o) return ! 1;
    var e = !$gsm.hasClass(i.parentNode, "active");
    return s ? (o = !0, $gsm.xhr("GET", BECOME_FAN_URL + "&nFan=" + (e ? 1 : 0),
    function(t) {
      if (o = !1, $gsm.toggleClass(i.parentNode, "active", "1" == t && e), "1" == t) {
        var n = i.querySelector("strong"),
        s = parseInt(n.lastChild.nodeValue, 10);
        s += e ? 1 : -1,
        n.replaceChild(document.createTextNode("" + s), n.lastChild),
        i.querySelector("span").innerHTML = e ? "You're a fan": "Become a fan"
      }
    },
    null,
    function() {
      o = !1,
      $gsm.removeClass(i.parentNode, "active")
    },
    !0)) : ($gsm.addClass(i.parentNode, "not-logged"), setTimeout(function() {
      $gsm.removeClass(i.parentNode, "not-logged")
    },
    4e3)),
    !1
  });
  var a = document.querySelector("#login-active"),
  r = document.querySelector("#login-popup") || document.querySelector("#login-popup2");
  $gsm.toggleLoginPopup = function(e) {
    if (!s) {
      e.preventDefault();
      var t = "block" == r.style.display;
      r.style.display = t ? "none": "block",
      $gsm.hasClass(l, "headroom--top") || ($gsm.toggleClass(l, "slide--reset", !t), $gsm.toggleClass(l, "slide--up", t))
    }
  },
  a && (a.onclick = $gsm.toggleLoginPopup);
  var l = document.querySelector("#header"),
  c = document.querySelector("#footer-side"),
  d = document.querySelector(".adv.sticky");
  if (d) {
    var u, g = d.previousElementSibling;
    function h() {
      u = d.offsetHeight + (c ? c.offsetHeight: 0) + l.offsetHeight + 30,
      window.innerHeight < u && (d.style.position = "", d.style.top = "")
    }
    function m(e) {
      "" !== d.style.position && g.getBoundingClientRect().bottom > 0 ? (d.style.position = "", d.style.top = "") : window.innerHeight > u && "fixed" !== d.style.position && d.getBoundingClientRect().top < 10 && (d.style.position = "fixed", d.style.top = "8px"),
      "fixed" == d.style.position && (d.style.top = 8 + (l.getBoundingClientRect().bottom > 0 ? l.offsetHeight: 0) + "px")
    }
    h(),
    $gsm.addEventListener(window, "resize", h),
    $gsm.addEventListener(window, "scroll", m)
  }
}),
window.addEventListener("DOMContentLoaded",
function() {
  var e = document.querySelectorAll(".speedo");
  e && e.length && window.addEventListener("scroll",
  function() {
    for (var t = 0; e && t < e.length; t++) {
      var n = e[t];
      if (n.getClientRects()[0].bottom < window.innerHeight) {
        var s = 1.8 * parseInt(n.getAttribute("data-value"), 10);
        n.querySelector("#needle").style.transform = "rotate(" + s + "deg)"
      }
    }
  })
}),
$gsm.onload(function() {
  var e = document.querySelector(".article-info-line .social-share");
  if (e) {
    var t = e.querySelector(".share-button");
    t && (t.onclick = function() {
      return $gsm.toggleClass(e, "close"),
      !1
    },
    $gsm.addEventListener(document.body, "click",
    function(t) {
      $gsm.hasClass(t.target, "icon-share") || $gsm.addClass(e, "close")
    }))
  }
});
var ImagePopup = function() {},
showMultipic = function(e, t) {};
document.addEventListener("DOMContentLoaded",
function() {
  function e(e) {
    q[e] || (q[e] = !0, $gsm.xhr("GET", DESKTOP_BASE_URL + "counter-js.php3",
    function() {},
    {
      sF: e
    },
    null,
    function() {},
    !0))
  }
  function t(e, t) {
    I[e] = t,
    localStorage.setItem(_, JSON.stringify(I))
  }
  function n() {
    window.innerWidth < 900 || k() || "" == ue.innerHTML && $gsm.tag("div", {},
    "<pgs-ad data-pg-ad-spot='new_div-gpt-ad-300x250mid-left-mpugsmarenadesktop-0'></pgs-ad>", ue)
  }
  function s(e, t) {
    return window.getComputedStyle ? parseInt(window.getComputedStyle(e)[t], 10) : parseInt(e.currentStyle[t], 10)
  }
  function i(e) {
    var t = D.querySelector(".thumb.active"),
    n = me.offsetHeight;
    if (e) {
      var s = Math.floor(me.scrollTop / n);
      s += e
    } else s = Math.floor(t.offsetTop / n);
    me.scrollTop = s * n
  }
  function o() {
    ke = {};
    var e = document.querySelectorAll("a[onclick^='javascript:ShowImg']");
    me.innerHTML = "";
    Se = e.length;
    for (var t = 0; t < e.length; t++) {
      var s = e[t],
      i = s.getAttribute("onclick"),
      o = i.match(/ShowImg2?\(["']([^"']+?)["']\)/)[1],
      a = s.children[0].getAttribute("src"),
      r = s.children[0].getAttribute("alt");
      r = r.replace(/ - (?:[^-]|\w-\w)+$/, ""),
      r = r.replace(/^[a-z][^A-Z]/,
      function(e) {
        return e.charAt(0).toUpperCase() + e.slice(1)
      });
      var l = $gsm.tag("div", {
        class: "thumb",
        style: "background-image: url(" + a + ");"
      },
      "", me),
      c = i.match(/ShowImg2?/)[0]; (function(e, t, i) {
        l.onclick = function() {
          return g(e, t, i),
          n(),
          !1
        },
        s.onclick = l.onclick
      })(o, t, c),
      ke[o] = {
        thumbLink: l,
        bigUrl: o,
        smallUrl: a,
        alt: r,
        index: t,
        link: s
      },
      xe[t] = ke[o]
    }
  }
  function a(e) {
    if (e.requestFullscreen) {
      var t = e.requestFullscreen();
      t && t.
      catch && t.
      catch(function() {})
    } else e.mozRequestFullScreen ? e.mozRequestFullScreen() : e.webkitRequestFullscreen ? e.webkitRequestFullscreen() : e.msRequestFullscreen && e.msRequestFullscreen()
  }
  function r() {
    if (document.exitFullscreen) {
      var e = document.exitFullscreen();
      e && e.
      catch && e.
      catch(function() {})
    } else document.mozCancelFullScreen ? document.mozCancelFullScreen() : document.webkitExitFullscreen ? document.webkitExitFullscreen() : document.msExitFullscreen && document.msExitFullscreen()
  }
  function l(e) {
    e && "undefined" != typeof visualViewport && 1 != visualViewport.scale ? (D.classList.add("device-zoom-compensation"), D.style.transform = `translate($ {
      visualViewport.pageLeft - 1
    }
    px, $ {
      visualViewport.offsetTop
    }
    px) scale($ {
      visualViewport.width / D.offsetWidth
    })`) : (D.style.transform = "", D.classList.remove("device-zoom-compensation"))
  }
  function c(e) {
    R.innerHTML || (R.innerHTML = '<img src="' + ASSETS_BASE_URL + '/i/logo.svg">'),
    D.style.display = e ? "": "none",
    (Ee || Te && !location.hostname.match(/^m\./)) && (e ? a(D) : r()),
    l(e)
  }
  function d() {
    ue.innerHTML = ""
  }
  function u() {
    return we = $e = !1,
    c(!1),
    B.checked = !1,
    $gsm.removeClass(D, "multipic-mode"),
    history.replaceState({},
    "", window.location.pathname + window.location.search),
    d(),
    q = {},
    !1
  }
  function g(t, s, a) {
    if ("" != C) {
      if (W.classList.contains("multipic-compare")) {
        let e;
        if (e = void 0 !== s ? xe[s] : ke[t], "" == Ot) return Ot = t,
        e.link.classList.add("selected"),
        void(Ut.innerText = Dt[2]);
        if (t == Ot) return Ot = "",
        e.link.classList.remove("selected"),
        void(Ut.innerText = Dt[1]);
        if ("[multipic]" != t) return W.classList.remove("multipic-compare"),
        Ut.innerText = Dt[0],
        showMultipic(Ot, t)
      }
      if (c(!0), "[multipic]" == t) return D.classList.add("multipic-mode"),
      D.classList.remove("zoomable"),
      ht.src = C + ht._src,
      mt.src = C + mt._src,
      ut.src = ke[ht._src].smallUrl,
      gt.src = ke[mt._src].smallUrl,
      k(),
      n(),
      void(location.hostname.match(/^m\./) ? e("m-comparegallery") : e("comparegallery"));
      if (location.hostname.match(/^m\./) ? e("m-gallery") : e("gallery"), ke || o(), void 0 !== s) {
        var r = xe[s];
        Le = s
      } else {
        r = ke[t];
        Le = r.index
      }
      return He.src = C + t,
      Me.src = r.smallUrl,
      te.style.backgroundImage = "url(" + C + t + "), url(" + r.smallUrl + ")",
      te.style.backgroundPosition = "",
      te.style.backgroundSize = "",
      z.setAttribute("href", He.src),
      ce.innerHTML = r.alt,
      de.innerHTML = r.index + 1 + "/" + Se,
      $gsm.removeClass(D.querySelector(".thumb.active"), "active"),
      $gsm.addClass(r.thumbLink, "active"),
      i(),
      $e = !1,
      we = !!t.match(/\/camera\//),
      $gsm.removeClass(D, "zoomed-in"),
      oe.style.display = "none",
      oe.style.backgroundImage = "url(" + C + t + ")",
      Ye = 1,
      k(),
      history.replaceState({},
      "", "#image" + r.index),
      B.checked = !1,
      K.setAttribute("href", "//www.facebook.com/sharer.php?u=" + encodeURIComponent(window.location)),
      V.setAttribute("href", "https://x.com/intent/post?text=" + escape(r.alt) + "&url=" + encodeURIComponent(window.location)),
      !1
    }
    "ShowImg" == a ? ShowImg(t) : ShowImg2(t)
  }
  function h(e, t) {
    var n = Le + e;
    n = (n + Se) % Se;
    var s = xe[n];
    return t == Ae ? s: t == Ce ? s.smallUrl: t == qe ? C + s.bigUrl: void 0
  }
  function m(e, t) {
    var n = t || this.getAttribute("href").replace("#", "");
    if (!_e) {
      D.querySelector(".thumb.active"),
      t = "next" == n ? 1 : -1;
      var s = h(t, Ae).thumbLink.onclick;
      ee.style.display = "",
      ee.style.backgroundImage = "url(" + h(t, Ce) + ")";
      var i = new Image;
      i.src = h(2 * t, qe);
      var o = .5;
      return "" == ee.style.transform && (ee.style.transform = "translateX(" + 100 * ("next" == n ? 1 : -1) + "%)"),
      te.style.transition = o + "s",
      setTimeout(function() {
        te.style.transform = "translateX(" + 100 * ("next" == n ? -1 : 1) + "%)",
        ee.style.transition = o + "s",
        ee.style.transform = ""
      },
      100),
      _e = setTimeout(function() {
        _e = 0,
        te.style.transition = "",
        te.style.transform = "",
        s(),
        ee.style.transition = "",
        ee.style.display = "none"
      },
      1e3 * o + 50),
      !1
    }
  }
  function f() {
    var e = this.getAttribute("href").replace("#", "");
    return i("up" == e ? -1 : 1),
    !1
  }
  function p(e, t, n) {
    var s = [0, 0],
    i = e[0] / e[1],
    o = t[0] / t[1];
    return i > o ? (s[0] = t[0], s[1] = t[0] / i) : (s[0] = t[1] * i, s[1] = t[1]),
    n || (s[0] = Math.floor(s[0]), s[1] = Math.floor(s[1])),
    s
  }
  function v() {
    var e, t;
    We = p([He.width, He.height], [oe.offsetWidth, oe.offsetHeight]);
    try {
      var n = Math.min(We[0], We[1]);
      e = Math.round(n * te.offsetWidth / (He.height * Ye)),
      t = Math.round(n * te.offsetHeight / (He.height * Ye))
    } catch(n) {
      e = 20,
      t = 20
    }
    return ae.style.width = e + "px",
    ae.style.height = t + "px",
    [e, t]
  }
  function y(e, t) {
    Oe = Math.min(Math.max(0, e), 1),
    Ie = Math.min(Math.max(0, t), 1),
    $e ? (te.style.backgroundPosition = 100 * Oe + "% " + 100 * Ie + "%", te.style.backgroundSize = Ye * He.naturalWidth + "px " + Ye * He.naturalHeight + "px, contain") : (te.style.backgroundPosition = "center, center", te.style.backgroundSize = "contain, contain"),
    ae.style.transform = "translate(" + Math.round(Oe * (We[0] - ae.offsetWidth)) + "px, " + Math.round(Ie * (We[1] - ae.offsetHeight)) + "px)"
  }
  function b(e) {
    return Math.hypot(e[0].screenX - e[1].screenX, e[0].screenY - e[1].screenY)
  }
  function w(e) {
    return [(e[0].screenX + e[1].screenX) / 2, (e[0].screenY + e[1].screenY) / 2]
  }
  function $(e) {
    Ye = Math.min(e, Pe),
    (He.naturalWidth * e < te.offsetWidth || He.naturalHeight * e < te.offsetHeight) && P.onclick(),
    v()
  }
  function k() {
    var e, t;
    return $gsm.hasClass(D, "multipic-mode") ? (t = Y.offsetWidth - X.offsetWidth - s(Y, "paddingLeft") - 20 < vt.offsetWidth, window.innerWidth > window.innerHeight ? R.style.display = t ? "none": "": R.style.display = "none") : (X.style.visibility = "", e = !(window.innerWidth > window.innerHeight) || re.offsetHeight < Ke, ge.style.display = e ? "none": "", ue.style.display = e ? "none": "", t = Y.offsetWidth < Ve + X.offsetWidth, R.style.display = t ? "none": ""),
    e
  }
  function x() {
    setTimeout(function() {
      $e ? (v(), y(Oe, Ie)) : te.style.backgroundSize = "contain, contain",
      we = He.width > te.offsetWidth || He.height > te.offsetHeight,
      $gsm.toggleClass(D, "zoomable", we),
      !we && $e && P.onclick(),
      k() && d(),
      l(!0)
    },
    10)
  }
  function L() {
    it = (mt.naturalWidth - dt.offsetWidth) / (ht.naturalWidth - ct.offsetWidth),
    ot = (mt.naturalHeight - dt.offsetHeight) / (ht.naturalHeight - ct.offsetHeight),
    et = -ht.naturalWidth + ct.offsetWidth,
    tt = -ht.naturalHeight + ct.offsetHeight,
    nt = -mt.naturalWidth + dt.offsetWidth,
    st = -mt.naturalHeight + dt.offsetHeight
  }
  function S(e) {
    if (ht.complete && mt.complete || e) {
      e || ($gsm.removeClass(lt, "loading"), Mt = !0, L()),
      wt = -(ht.naturalWidth - ct.offsetWidth) / 2,
      $t = -(ht.naturalHeight - ct.offsetHeight) / 2,
      kt = -(mt.naturalWidth - dt.offsetWidth) / 2,
      xt = -(mt.naturalHeight - dt.offsetHeight) / 2;
      var t = window.location.hash.match(/#compare-\d+,\d+-at-(-?\d+)x(-?\d+),(-?\d+)x(-?\d+)/);
      t && (wt = parseInt(t[1], 10), $t = parseInt(t[2], 10), kt = parseInt(t[3], 10), xt = parseInt(t[4], 10)),
      M(0, 0, 0, 0)
    }
  }
  function H(e, t, n) {
    return Math.min(e, Math.max(t, n))
  }
  function M(e, t, n, s) {
    wt += e,
    $t += t,
    kt += n * it,
    xt += s * ot,
    Ht ? (Lt <= 0 ? (wt = H( - Lt / it, wt, et), kt = H(0, kt, nt + Lt)) : (wt = H(0, wt, et - Lt / it), kt = H(Lt, kt, nt)), St <= 0 ? ($t = H( - St / ot, $t, tt), xt = H(0, xt, st + St)) : ($t = H(0, $t, tt - St / ot), xt = H(St, xt, st))) : (wt = H(kt / it + ht.naturalWidth * at, wt, kt / it - ht.naturalWidth * at), $t = H(xt / ot + ht.naturalHeight * at, $t, xt / ot - ht.naturalHeight * at), kt = H(wt * it + mt.naturalWidth * at, kt, wt * it - mt.naturalWidth * at), xt = H($t * ot + mt.naturalHeight * at, xt, $t * ot - mt.naturalHeight * at), Lt = Math.round(kt - wt * it), St = Math.round(xt - $t * ot)),
    ht.style.transform = "translate(" + Math.round(wt) + "px," + Math.round($t) + "px)",
    mt.style.transform = "translate(" + Math.round(kt) + "px," + Math.round(xt) + "px)"
  }
  function E() {
    rt || history.replaceState({},
    "", Qe + "-at-" + Math.round(wt) + "x" + Math.round($t) + "," + Math.round(kt) + "x" + Math.round(xt))
  }
  function T(e, t, n) {
    let s = !0,
    i = 0;
    const o = new IntersectionObserver(function(e) {
      for (const t of e) t.isIntersecting ? i++:s || i--;
      s = !1,
      t(i, e)
    },
    n || {
      root: null,
      rootMargin: "0px",
      threshold: .49
    });
    for (const t of e) o.observe(t)
  }
  var A = !1,
  C = "";
  ImagePopup = function(e, t) {
    C = e,
    g(t)
  };
  var q = {},
  _ = "gsmarena-gallery",
  O = localStorage.getItem(_),
  I = O ? JSON.parse(O) : {},
  W = document.querySelector("#review-body") || document.querySelector("#content"),
  D = $gsm.tag("div", {
    class: "image-gallery",
    style: "display: none;",
    draggable: "false"
  },
  "", document.body);
  if (A) $gsm.tag("div", {
    style: "display: none; position: absolute; z-index: 999; background: antiquewhite; padding: 2px; max-width: 80%; font-family: auto; position: fixed; top: 0; left: 0;"
  },
  "", D);
  var U = $gsm.tag("div", {
    class: "top-row",
    draggable: "false"
  },
  "", D),
  Y = $gsm.tag("div", {
    class: "header",
    draggable: "false"
  },
  "", U),
  X = $gsm.tag("span", {
    class: "title",
    draggable: "false"
  },
  "", Y),
  R = $gsm.tag("div", {
    class: "logo",
    draggable: "false"
  },
  "", Y),
  F = $gsm.tag("div", {
    class: "buttons"
  },
  "", U),
  P = $gsm.tag("div", {
    class: "gbutton zoom",
    title: "Zoom in"
  },
  "", F),
  z = $gsm.tag("a", {
    class: "gbutton new-tab",
    title: "Open image in new tab",
    target: "_blank"
  },
  "", F),
  B = $gsm.tag("input", {
    type: "checkbox",
    id: "gallery-share-checkbox"
  },
  "", F),
  N = $gsm.tag("label", {
    class: "gbutton share",
    title: "Share image",
    for: "gallery-share-checkbox"
  },
  "", F),
  G = $gsm.tag("div", {
    class: "gbutton close",
    title: "Close gallery"
  },
  "", F),
  J = $gsm.tag("span", {
    class: "share-panel"
  },
  "", N),
  K = $gsm.tag("a", {
    class: "facebook",
    title: "Share on Facebook"
  },
  '<i class="head-icon icon-soc-fb2">', J),
  V = $gsm.tag("a", {
    class: "twitter",
    title: "Share on Twitter"
  },
  '<i class="head-icon icon-soc-twitter2">', J),
  j = $gsm.tag("div", {
    class: "bottom-row"
  },
  "", D),
  Z = $gsm.tag("div", {
    class: "left-column"
  },
  "", j),
  Q = $gsm.tag("div", {
    class: "image-container"
  },
  "", Z),
  ee = $gsm.tag("div", {
    class: "second image"
  },
  "", Q),
  te = $gsm.tag("div", {
    class: "image"
  },
  "", Q),
  ne = $gsm.tag("div", {
    class: "next-prev"
  },
  "", Q),
  se = $gsm.tag("a", {
    class: "go-left",
    href: "#prev"
  },
  "", ne),
  ie = $gsm.tag("a", {
    class: "go-right",
    href: "#next"
  },
  "", ne),
  oe = $gsm.tag("div", {
    class: "map",
    style: "display: none;"
  },
  "", te),
  ae = $gsm.tag("div", {
    class: "view"
  },
  "", oe),
  re = $gsm.tag("div", {
    class: "right-column"
  },
  "", j),
  le = $gsm.tag("div", {
    class: "image-details"
  },
  "", re),
  ce = $gsm.tag("span", {
    class: "image-text"
  },
  "", le),
  de = $gsm.tag("span", {
    class: "image-count"
  },
  "", le),
  ue = $gsm.tag("div", {
    class: "ad"
  },
  "", re),
  ge = $gsm.tag("div", {
    class: "thumb-gallery"
  },
  "", re),
  he = $gsm.tag("a", {
    class: "go-up",
    href: "#up"
  },
  "&#9650;", ge),
  me = $gsm.tag("div", {
    class: "thumbs"
  },
  "", ge),
  fe = $gsm.tag("a", {
    class: "go-down",
    href: "#down"
  },
  "&#9660;", ge),
  pe = document.querySelector(".article-info-name"),
  ve = document.querySelector("#gallery .normal-text h2"),
  ye = document.querySelector("#content h1.section");
  X.innerHTML = (pe || ve || ye || {
    innerHTML: ""
  }).innerHTML;
  var be = !1,
  we = !1,
  $e = !1,
  ke = !1,
  xe = [],
  Le = 0,
  Se = 0,
  He = new Image,
  Me = new Image;
  o();
  var Ee = /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream,
  Te = /Android/.test(navigator.userAgent);
  Ee && (D.style.touchAction = "unset"),
  G.onclick = u,
  He.onload = function() {
    x(),
    te.style.backgroundImage = "url(" + h(0, qe) + ")"
  };
  var Ae = 0,
  Ce = 1,
  qe = 2,
  _e = 0;
  ie.onclick = m,
  se.onclick = m,
  $gsm.addEventListener(document, "keyup",
  function(e) {
    "none" != D.style.display && (27 == e.which ? u() : 37 != e.which && 39 != e.which || m(null, 37 == e.which ? "prev": "next"))
  }),
  fe.onclick = f,
  he.onclick = f,
  P.onclick = function(e) {
    if ($e = !$e, $gsm.toggleClass(D, "zoomed-in"), oe.style.display = $e ? "": "none", $e) if (Ye = 1, v(), e.target == P) y(.5, .5);
    else {
      var t = p([He.width, He.height], [te.clientWidth, te.clientHeight]),
      n = e.offsetX - (te.offsetWidth - t[0]) / 2,
      s = e.offsetY - (te.offsetHeight - t[1]) / 2;
      y(n / t[0], s / t[1])
    } else y(.5, .5);
    return ! 1
  };
  var Oe, Ie, We = [1, 1];
  $gsm.addEventListener(te, "click",
  function(e) {
    we && P.onclick(e),
    B.checked = !1
  }),
  $gsm.addEventListener(te, "mousemove",
  function(e) {
    if (we && $e) {
      var t = e.offsetX / te.offsetWidth,
      n = e.offsetY / te.offsetHeight;
      y(t, n)
    }
  });
  var De, Ue, Ye, Xe, Re, Fe, Pe = 4,
  ze = (Math.sqrt(window.devicePixelRatio || 1), 0),
  Be = 0,
  Ne = 0,
  Ge = 0,
  Je = 0;
  $gsm.addEventListener(te, "touchstart",
  function(e) {
    ze = e.touches[0].clientX,
    Be = e.touches[0].clientY,
    2 == e.touches.length && (Xe = Ye, De = b(e.touches), Ue = w(e.touches)),
    B.checked = !1
  }),
  $gsm.addEventListener(te, "touchmove",
  function(e) {
    if ($e) {
      if (1 == e.touches.length) Ee || e.preventDefault(),
      dx = (ze - e.touches[0].clientX) / (He.height * Ye),
      dy = (Be - e.touches[0].clientY) / (He.height * Ye),
      ze = e.touches[0].clientX,
      Be = e.touches[0].clientY;
      else if (2 == e.touches.length) {
        if (Ee) return;
        e.preventDefault();
        var t = w(e.touches);
        dx = (Ue[0] - t[0]) / (He.height * Ye),
        dy = (Ue[1] - t[1]) / (He.height * Ye),
        Ue = t;
        var n = b(e.touches) / De;
        $(Xe + (n - 1) * Xe)
      }
      y(Oe + dx, Ie + dy);
      var s = Date.now() - Ne + 1,
      i = 40;
      Ne = Date.now(),
      Ge = (Re - e.touches[0].clientX) / (s * i),
      Je = (Fe - e.touches[0].clientY) / (s * i),
      Re = e.touches[0].clientX,
      Fe = e.touches[0].clientY
    } else Ee || e.preventDefault(),
    Ge = e.touches[0].clientX - ze,
    te.style.transform = "translateX(" + Ge + "px)",
    ee.style.display = "",
    ee.style.backgroundImage = "url(" + h(Ge < 0 ? 1 : -1, Ce) + ")",
    ee.style.transform = "translateX(calc(" + (Ge > 0 ? "-": "") + "100%" + (Ge > 0 ? " + ": " - ") + Math.abs(Ge) + "px))"
  }),
  $gsm.addEventListener(te, "touchend",
  function(e) {
    if ($e) {
      if (1 == e.touches.length && 1 == e.changedTouches.length) return ze = e.touches[0].clientX,
      Be = e.touches[0].clientY,
      Re = ze,
      void(Fe = Be);
      var t = .8,
      n = Oe,
      s = Ie,
      i = Ge / Ye,
      o = Je / Ye;
      function a() {
        i *= t,
        o *= t,
        n += i,
        s += o,
        y(n, s),
        Math.abs(i * o) > 1e-7 && requestAnimationFrame(a)
      }
      requestAnimationFrame(a)
    } else {
      if (Math.abs(Ge / Q.offsetWidth) > .2) te.style.display = "",
      m({},
      Ge > 0 ? "prev": "next");
      else {
        0 != Ge && (ee.style.transform = "translateX(" + (Ge > 0 ? "-100%": "100%") + ")");
        var r = .3;
        te.style.transform = "",
        te.style.transition = "transform " + r + "s",
        ee.style.transition = te.style.transition,
        setTimeout(function() {
          te.style.transition = "",
          te.style.display = "",
          ee.style.transition = "",
          ee.style.transform = "",
          ee.style.display = "none"
        },
        1e3 * r)
      }
      Ge = 0
    }
  }),
  $gsm.addEventListener(te, "wheel",
  function(e) {
    e.deltaY < 0 && $(Ye + .25),
    e.deltaY > 0 && $(Ye - .25),
    y(Oe, Ie)
  });
  var Ke = 620,
  Ve = s(Y, "padding-left") + s(R, "width") + 20;
  $gsm.addEventListener(window, "resize", x),
  $gsm.addEventListener(window, "orientationchange", x);
  var je = window.location.hash.match(/#image(\d+)/);
  if (be = !!je, je) {
    var Ze = parseInt(je[1], 10);
    ke || o(),
    xe[Ze].thumbLink.onclick()
  }
  K.onclick = function() {
    var e = "//www.facebook.com/sharer.php?u=" + encodeURIComponent(window.location);
    return window.open(e, "fbookshare", "width=500,height=400,left=" + (screen.availWidth / 2 - 225) + ",top=" + (screen.availHeight / 2 - 150)),
    !1
  },
  V.onclick = function() {
    var e = "https://x.com/intent/post";
    return e += "?text=" + escape(ce.innerHTML),
    e += "&url=" + encodeURIComponent(window.location),
    window.open(e, "twitshare", "width=500,height=400,left=" + (screen.availWidth / 2 - 225) + ",top=" + (screen.availHeight / 2 - 150)),
    !1
  },
  $gsm.addEventListener(re, "click",
  function() {
    B.checked = !1
  });
  var Qe, et, tt, nt, st, it, ot, at = .2,
  rt = !("fit-to-screen-view" in I) || I["fit-to-screen-view"],
  lt = $gsm.tag("div", {
    class: "multipic" + (rt ? " fit-to-screen-view": ""),
    draggable: "false"
  },
  "", D),
  ct = $gsm.tag("div", {
    class: "left",
    draggable: "false"
  },
  "", lt),
  dt = $gsm.tag("div", {
    class: "right",
    draggable: "false"
  },
  "", lt),
  ut = $gsm.tag("img", {
    class: "preview"
  },
  "", ct),
  gt = $gsm.tag("img", {
    class: "preview"
  },
  "", dt),
  ht = $gsm.tag("img", {
    draggable: "false",
    class: "side-image"
  },
  "", ct),
  mt = $gsm.tag("img", {
    draggable: "false",
    class: "side-image"
  },
  "", dt),
  ft = $gsm.tag("span", {
    class: "label"
  },
  "", ct),
  pt = $gsm.tag("span", {
    class: "label"
  },
  "", dt),
  vt = $gsm.tag("div", {
    class: "ad-top",
    id: "crt-1097675",
    draggable: "false"
  },
  "", Y),
  yt = $gsm.tag("div", {
    class: "lock",
    draggable: "false"
  },
  "", lt),
  bt = $gsm.tag("div", {
    class: "fit-to-screen-toggle",
    draggable: "false"
  },
  "", lt),
  wt = 0,
  $t = 0,
  kt = 0,
  xt = 0,
  Lt = 0,
  St = 0,
  Ht = !0;
  $gsm.addEventListener(lt, "click",
  function() {
    B.checked = !1
  });
  var Mt = !1;
  ht.onload = function() {
    S(!1)
  },
  mt.onload = ht.onload,
  $gsm.draggable(ct,
  function(e, t) {
    Mt && (rt || (Ht ? M(e, t, e, t) : M(e, t, 0, 0), B.checked = !1))
  },
  E),
  $gsm.draggable(dt,
  function(e, t) {
    Mt && (rt || (Ht ? M(e, t, e, t) : M(0, 0, e, t), B.checked = !1))
  },
  E);
  var Et = {
    true: "Unlock to align images separately",
    false: "Lock to move images simultaneously"
  };
  yt.onclick = function() {
    $gsm.toggleClass(yt, "unlock"),
    Ht = !Ht,
    yt.setAttribute("title", Et[Ht])
  },
  yt.setAttribute("title", Et[Ht]);
  var Tt = {
    true: "Zoom in to see details",
    false: "Zoom out to see the whole image"
  };
  bt.onclick = function() {
    rt = !rt,
    t("fit-to-screen-view", rt),
    lt.classList.toggle("fit-to-screen-view", rt),
    bt.setAttribute("title", Tt[rt])
  },
  bt.setAttribute("title", Tt[rt]);
  var At = function(e) {
    if (rt) {
      var t = H((e.offsetX - (ct.offsetWidth - ht.offsetWidth) / 2) / ht.offsetWidth, 0, 1),
      n = H((e.offsetY - (ct.offsetHeight - ht.offsetHeight) / 2) / ht.offsetHeight, 0, 1);
      wt = -(ht.naturalWidth * t - ct.offsetWidth / 2),
      $t = -(ht.naturalHeight * n - ct.offsetHeight / 2),
      kt = -(mt.naturalWidth * t - dt.offsetWidth / 2),
      xt = -(mt.naturalHeight * n - dt.offsetHeight / 2),
      bt.onclick(),
      M(0, 0, 0, 0)
    }
  };
  ct.addEventListener("click", At),
  dt.addEventListener("click", At);
  var Ct = function() {
    rt || bt.onclick()
  };
  if (ct.addEventListener("dblclick", Ct), dt.addEventListener("dblclick", Ct), showMultipic = function(e, t) {
    Mt = !1,
    $gsm.addClass(lt, "loading"),
    Ht = !0,
    $gsm.removeClass(yt, "unlock"),
    ht.src = "",
    mt.src = "",
    ut.src = "",
    gt.src = "",
    ht._src = e,
    mt._src = t,
    ShowImg2("[multipic]"),
    ft.innerHTML = ke[e].alt,
    pt.innerHTML = ke[t].alt;
    var n = "translate(calc(-50% + " + ct.offsetWidth / 2 + "px), calc(-50% + " + ct.offsetHeight / 2 + "px))";
    S(!0),
    ut.style.transform = n,
    gt.style.transform = n,
    Qe = "#compare-" + ke[e].index + "," + ke[t].index,
    location.hash.match(/^#compare/) || history.replaceState({},
    "", Qe),
    Wt()
  },
  je = null, je = window.location.hash.match(/#compare-(\d+),(\d+)/), be = be || !!je, je) {
    ke || o();
    var qt = xe[parseInt(je[1], 10)],
    _t = xe[parseInt(je[2], 10)];
    showMultipic(qt.bigUrl, _t.bigUrl)
  }
  let Ot = "";
  const It = document.querySelectorAll(".image-row.comparable"),
  Wt = function() {
    const e = document.querySelectorAll(".image-row.comparable a.selected");
    for (const t of e) t.classList.remove("selected");
    Ot = ""
  },
  Dt = ["Click here to compare two photos", "Pick the first photo", "Pick another photo"],
  Ut = $gsm.tag("div", {
    class: "multipic-select-images-button"
  },
  Dt[0], W);
  Ut.onclick = function() {
    W.classList.toggle("multipic-compare") ? Ut.innerText = Dt[1] : (Wt(), Ut.innerText = Dt[0])
  },
  "undefined" != typeof IntersectionObserver && It.length > 0 && T(It,
  function(e) {
    0 == e && "" == Ot ? (Ut.style.display = "none", Wt()) : Ut.style.display = "flex"
  })
}),
document.addEventListener("DOMContentLoaded",
function() {
  for (var e = document.querySelectorAll("a[data-click"), t = 0; t < e.length; t++) {
    var n = e[t];
    n.hostname !== location.hostname && n.addEventListener("click",
    function() {
      $gsm.beacon(DESKTOP_BASE_URL + this.getAttribute("data-click"))
    })
  }
}),
document.addEventListener("DOMContentLoaded",
function() {
  for (var e = document.querySelectorAll("[data-clickmate]"), t = 0; t < e.length; t++) {
    var n = e[t],
    s = n.getAttribute("href"),
    i = "gsmarena",
    o = document.title,
    a = window.location.href,
    r = "https://shop-links.co/link?url=" + encodeURIComponent(s) + "&publisher_slug=" + i + "&article_name=" + encodeURIComponent(o) + "&article_url=" + encodeURIComponent(a) + "&exclusive=1";
    n.href = r
  }
}),
document.addEventListener("DOMContentLoaded",
function() {
  function e(e) {
    return new Promise(t = >{
      setTimeout(() = >{
        0 == e.offsetHeight ? t(!0) : t(!1)
      },
      100)
    })
  }
  function t() {
    const t = "pub_300x250 pub_300x250m pub_728x90 text-ad textAd text-ad-links ad-unit adv-mpu stickyads ads_banner AdBox text-ad-top",
    n = "width: 1px !important; height: 1px !important; position: absolute !important; left: -10000px !important; top: -1000px !important;",
    s = $gsm.tag("div", {
      class: t,
      style: n
    },
    "", document.body);
    return e(s).then(e = >!!e || fetch("https://ad.doubleclick.net/favicon.ico").then(e = >!1).
    catch(() = >!0))
  }
  function n(e) {
    let t = e >>> 0;
    const n = 214013,
    s = 2531011;
    return function() {
      return t = n * t + s >>> 0,
      t % 1e10
    }
  }
  function s(e, t) {
    const s = n(e);
    let i = "";
    for (; i.length < t;) i += s().toString();
    return i.substring(i.length - t)
  }
  function i(e, t) {
    const s = n(e),
    i = "A".charCodeAt(0),
    o = "a".charCodeAt(0);
    let a = "";
    for (; a.length < t;) {
      let e = s();
      const t = e % 2 ? i: o;
      e /= 2,
      a += String.fromCharCode(t + e % 26)
    }
    return a.substring(a.length - t)
  }
  function o(e) {
    function t() {
      return i(Math.floor(1e3 * Math.random()), 6)
    }
    const n = {
      "#subHeader3": "",
      ".subHeader2-inner": ""
    },
    s = "#subHeader3{display:none;padding:10px;background:#eee;position:relative}#subHeader3 .column,#subHeader3 .row{display:-ms-flexbox;display:flex}#subHeader3 .column{-ms-flex-direction:column;flex-direction:column}#subHeader3 h4{display:inline-block;font-size:26px;text-transform:uppercase;padding:0;margin:10px 0 3px 2px;font-size:17px;font-weight:400;font-family:Google-Oswald,Arial,sans-serif;color:#575757}#subHeader3 .pricing-info{top:13px;right:unset;max-width:380px}#subHeader3 .subHeader2-inner{display:-ms-flexbox;display:flex;background:#fff;border:1px solid #ddd;padding:0px 10px 0;font-family:Arimo,Arial,sans-serif;padding:10px}#subHeader3 .phone{-ms-flex:1;flex:1;margin:0 10px 0 0;border-right:1px solid #ddd;float:unset}#subHeader3 .phone:last-child{margin-right:0;border-right:none}#subHeader3 .name{font:200 24px Google-Oswald,Arial,sans-serif;color:var(--gsmarena-red,#d50000);margin:0 0 10px;padding:0;display:-webkit-box;-webkit-box-orient:vertical;overflow:hidden;-webkit-line-clamp:1}#subHeader3 .specs{display:inline-block;line-height:1;background-color:#999;color:#fff;font-weight:500;font-size:13px;padding:1px;text-transform:uppercase}#subHeader3 .specs:hover{background:var(--color-button-highlight-background,#d50000);text-decoration:none;animation-name:linesMoveDown;animation-duration:.35s;animation-fill-mode:both}#subHeader3 .image-link{display:block}#subHeader3 .image-link .image{-ms-transform:scale(1);transform:scale(1)}#subHeader3 .image-link:hover .image{transition:transform 1s cubic-bezier(0.26,0.695,0.375,0.965);-ms-transform:scale(1.03);transform:scale(1.03)}#subHeader3 .image{height:80px;width:80px;object-fit:contain;padding:0;float:none}#subHeader3 .description{font-family:Arimo,Arial,sans-serif;font-size:13px;line-height:130%;margin-bottom:10px;display:-webkit-box;-webkit-box-orient:vertical;overflow:hidden;-webkit-line-clamp:3}#subHeader3 .description:hover{text-decoration:none}#subHeader3 .memory{color:var(--color-quick-specs-text-and-icons,#9e9e9e);font-family:Arimo,Arial,sans-serif;font-size:14px;font-weight:700}#subHeader3 .store img{-ms-transform:scale(1);transform:scale(1)}#subHeader3 .store:hover img{transition:transform 1s cubic-bezier(0.26,0.695,0.375,0.965);-ms-transform:scale(1.03);transform:scale(1.03)}#subHeader3 .store img{max-height:25px}#subHeader3 .price{color:var(--color-button-text,#d50000);display:initial}#subHeader3 .discount,#subHeader3 .price{font-family:Google-Oswald,Arial,sans-serif}#subHeader3 .discount{color:#999;margin-right:20px}";
    let o = s;
    for (const e in n) {
      const s = e.substring(0, 1),
      i = t();
      n[e] = i,
      o = o.replaceAll(e, s + i)
    }
    $gsm.tag("style", {},
    o, document.head);
    for (const t in n) {
      let s = null;
      const i = t.substring(0, 1),
      o = t.substring(1),
      a = n[t];
      "#" == i ? e.getAttribute("id") == o && (s = e) : "." == i && e.classList.contains(o) && (s = e),
      s || (s = e.querySelector(t)),
      s && ("#" == i ? s.setAttribute("id", a) : "." == i && (s.classList.remove(o), s.classList.add(a)))
    }
  }
  function a(t) {
    function n(e) {
      for (let t = 0; t < e.length; t++) {
        const n = t + Math.floor(Math.random() * (e.length - t)),
        s = e[t];
        e[t] = e[n],
        e[n] = s
      }
    }
    const s = 3;
    let i = 0;
    try {
      const a = JSON.parse(t.replace(/,\s*\]/g, "]"));
      if (0 == a.length) return;
      n(a);
      let r = '\n<h4>GSMArena daily deals</h4>\n<div class="pricing-info left-i">\n    <button class="head-icon icon-info-outline"></button>\n    <div>These are the best offers from our affiliate partners. We may get a commission from qualifying sales.</div>\n</div>\n<div class="subHeader2-inner">\n';
      for (const e of a) {
        if (i == s) break;
        const t = e[0],
        n = e[1],
        o = e[2],
        a = e[3],
        l = e[4],
        c = e[5],
        d = e[6],
        u = e[7],
        g = e[8],
        h = (e[9], `href = "${g}"target = "_blank"rel = "noopener"`);
        r += `\n < div class = "phone column" > \n < h3 class = "name" > $ {
          t
        } < a href = "${n}"class = "specs" > Specs < /a></h3 > \n < div class = "row flex-1" > \n < a $ {
          h
        }
        class = "image-link" > \n < img src = "${o}"title = "${t}"class = "image" > \n < /a>\n        <div class="column mr-0">\n            <a ${h} class="description">${a}</a > \n < a $ {
          h
        }
        class = "memory" > $ {
          l
        } < /a>\n        </div > \n < /div>\n    <div class="d-flex justify-between">\n        <a ${h} class="store"><img src="${c}"></a > \n < a $ {
          h
        }
        class = "price" > $ {
          d
        } < /a>\n        <a ${h} class="discount">-${u}%</a > \n < /div>\n</div > \n`,
        i++
      }
      r += "</div>",
      l.innerHTML = r,
      l.style.display = "block",
      e(l).then(e = >{
        e && o(l)
      })
    } catch(e) {}
  }

  function r(e) {
    console.error("Couldn't load deals", e)
  }
  const l = document.getElementById("subHeader2") || document.getElementById("subHeader3");
  l && t().then(function(e) {
    if (!e) return;
    const t = (new Date).getHours();
    let n = $gsm.isMobile ? 1 : 2;
    $gsm.xhr("GET", `$ {
      DESKTOP_BASE_URL
    }
    $ {
      s(t, 10)
    }
    $ {
      n
    }.php3 ? sSearch = $ {
      i(t, 4)
    }`, a, null, r, !0)
  })
});