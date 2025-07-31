function showBatteryPopup() {}
document.addEventListener("DOMContentLoaded",
function() {
	const e = document.querySelector("#battery-popover");
	if (!e) return;
	const t = 1854,
	n = 'Automated by <a href="http://www.smartviser.com" target="_blank" rel="nofollow">  <img src="' + ASSETS_BASE_URL + 'i/bat-img/smartviser-93x15px.png" alt="SmartViser"></a>';
	let o,
	a,
	s,
	r = "";
	showBatteryPopup = function(l, i) {
		if (l.target.classList.contains("v2")) {
			if ("v2" != r) {
				r = "v2",
				e.innerHTML = "",
				o && (o.remove(), o = null),
				"id" in e.dataset || (e.dataset.id = i),
				"batteryreview" in e.dataset || (e.dataset.batteryreview = l.target.getAttribute("href"));
				const t = function() {
					e.classList.add("battery-endurance-widget");
					const t = Object.assign([], BatteryEnduranceWidget.SLIDERS),
					n = l.target.dataset.battery2.split(/_/g);
					if (n.length == t.length) {
						for (let e = 0; e < t.length; e++) t[e].value = $gsm.timeToMinutes(n[e]);
						new BatteryEnduranceWidget(e, null, t, "popover")
					} else console.error("BatteryEnduranceWidget: didn't get enough data! Got " + n.length + ", needed " + t.length + "!")
				};
				s || (s = $gsm.tag("link", {
					rel: "stylesheet",
					href: ASSETS_BASE_URL + "css/" + ($gsm.isMobile ? "m/": "") + "batterytest2.css?v=16"
				},
				"", document.head)),
				a ? t() : (a = $gsm.tag("script", {
					src: ASSETS_BASE_URL + "js/batterytest2.js?v=25"
				},
				"", document.head), a.onload = t)
			}
			e.style.display = "initial"
		} else "v1" != r ? (r = "v1", e.innerHTML = "", e.classList.remove("battery-endurance-widget"), s && (s.remove(), s = null), $gsm.xhr("GET", "battery-popup.php3",
		function(a) {
			e.innerHTML = a,
			e.style.display = "initial",
			o || (o = $gsm.tag("script", {
				src: ASSETS_BASE_URL + "js/battery-endurance.js?v=15"
			},
			"", e));
			const s = document.querySelector(".review-header .help-review a"),
			r = s && parseInt(s.getAttribute("href").match(/-(\d+)\.php/)[1], 10);
			if (r >= t) {
				const t = e.querySelector(".button-position.button-gray"),
				o = $gsm.tag("span", {
					class: "smartviser"
				},
				n);
				t.parentElement.insertBefore(o, t);
				const a = e.querySelector("h3.h3");
				$gsm.removeClass(a, "center")
			}
		},
		{
			idPhone: i
		},
		function() {},
		!0)) : e.style.display = "none" == e.style.display ? "initial": "none";
		l.preventDefault(),
		l.stopPropagation()
	},
	$gsm.addEventListener(e, "click",
	function(e) {
		e.stopPropagation()
	}),
	$gsm.addEventListener(document, "click",
	function() {
		e.style.display = "none"
	})
}),
$gsm.onload(function() {
	function e(e) {
		for (var t = n,
		o = r.querySelectorAll("tr"), a = 0; a < o.length; a++) {
			var s = o[a];
			"" !== window.location.hash && s.hasAttribute("data-spec-optional") || (e && s.classList.contains("tr-toggle") || (t += s.offsetHeight))
		}
		return t
	}
	var t = .3,
	n = 0;
	location.href.match(/www\./) && (n = 2);
	var o = document.querySelector(".link-network-detail"),
	a = document.querySelector(".expandable-table");
	if (a && !o && ($gsm.tag("a", {
		class: "expand-toggle",
		title: "Expand/collapse the Network section"
	},
	"", a.querySelector("tr").firstElementChild), o = a.querySelector("tr:first-child")), o) {
		for (var s = document.querySelectorAll(".tr-toggle"), r = o.parentElement;
		"TABLE" !== r.nodeName;) r = r.parentElement;
		var l = r.querySelector("th"),
		i = getComputedStyle(l),
		c = getComputedStyle(r),
		d = 1.5 * parseFloat(i.fontSize);
		r.style.maxHeight = r.offsetHeight - parseFloat(c.borderTop) - parseFloat(c.borderBottom) + "px";
		var u = !1;
		o.onclick = function(n) {
			if ("TH" !== n.target.tagName) return n.preventDefault(),
			n.stopPropagation(),
			!u && (u = !0, $gsm.hasClass(o, "collapse") ? (r.style.transition = "", setTimeout(function() {
				for (var n = 0; n < s.length; n++) s[n].style.display = "" != window.location.hash && s[n].hasAttribute("data-spec-optional") ? "none": "table-row";
				var o = e();
				r.style.transition = t + "s",
				r.style.maxHeight = o + "px",
				$gsm.setCookie("networkVisible", "1"),
				setTimeout(function() {
					r.style.transition = "",
					r.style.maxHeight = "",
					u = !1
				},
				1e3 * t)
			},
			10)) : (r.style.transition = "", r.style.maxHeight = r.offsetHeight + "px", $gsm.setCookie("networkVisible", "0"), setTimeout(function() {
				var n = Math.max(e(!0), d);
				r.style.transition = t + "s",
				r.style.maxHeight = n + "px",
				u = !1
			},
			10)), $gsm.toggleClass(o, "collapse"), !1)
		}
	}
}),
function() {
	function e(e) {
		for (var t = {},
		n = new Array(e.length), o = 0; o < e.length; o++) for (var a = e[o], s = {},
		r = 0; r < a.length; r++) {
			var l = a[r].toLowerCase();
			l in s || (t[l] = (t[l] || 0) + 1, s[l] = !0)
		}
		for (o = 0; o < e.length; o++) {
			n[o] = new Array(a.length);
			var c;
			for (a = e[o], r = 0; r < a.length; r++) n[o][r] = t[a[r].toLowerCase()] >= e.length;
			e: for (r = 0; r < a.length; r++) if (a[r].match(/^\s*\(\s*$/)) {
				n[o][r] = !1;
				for (var d = 1; r + d < a.length && !a[r + d].match(/^\s*\)\s*$/);) {
					if (!n[o][r + d]) continue e;
					d++
				}
				n[o][r] = !0,
				n[o][r + d] = !0,
				r += d + 1
			} else a[r].match(/^\s*,\s*$/) && r > 0 || a[r].match(/&\w+;/) && r > 0 ? (a[r - 1] += a[r], a[r] = "", n[o][r] = !1, r++) : (c = a[r].match(i)) ? n[o][r] = c[0].length !== a[r].length: "" == a[r] && (n[o][r] = !1)
		}
		return n
	}
	function t(e) {
		if (!e) return c;
		var t = e.querySelector("[data-spec]");
		if (!t) return c;
		var n = t.getAttribute("data-spec");
		return g[n] || c
	}
	function n(n) {
		i = t(n);
		var o = [].slice.call(n.querySelectorAll(".nfo"), 0);
		if (o = o.filter(function(e) {
			return e.innerHTML.match(/\S/)
		}), !(o.length < 2)) {
			var a = [];
			o[0].innerHTML != o[1].innerHTML || o[2] && o[0].innerHTML != o[2].innerHTML || (a = [[o[0].innerHTML], [o[1].innerHTML]], o[2] && a.push([o[2].innerHTML])),
			a.length || (a = o.map(function(e) {
				return e.innerHTML.split(i)
			}));
			for (var s = e(a), r = 0; r < o.length; r++) {
				for (var l = a[r], c = 0; c < l.length; c++) s[r][c] && (l[c] = '<span class="diff-dim">' + l[c] + "</span>");
				o[r].innerHTML = l.join("")
			}
		}
	}
	function o() {
		if ($gsm.addClass(h, "on"), !$gsm.hasClass(m, "diff-ran")) {
			$gsm.addClass(m, "diff-ran"),
			$gsm.addClass(m, "diff-show");
			for (var e = m.querySelectorAll("tr"), t = m.querySelector("#specs-start") ? 2 : 0; t < e.length; t++) n(e[t])
		}
	}
	function a(e) {
		for (var t = e.querySelectorAll(".diff-dim"), n = 0; n < t.length; n++) {
			for (var o = t[n], a = o.childNodes; a.length;) o.parentElement.insertBefore(a[0], o);
			o.parentElement.removeChild(o)
		}
	}
	function s() {
		var e = f.join(",");
		$gsm.hasClass(h, "on") && (e = "diff-" + e),
		e.match(/^\*(,\*)*$/) ? history.replaceState({},
		"", window.location.pathname + window.location.search) : history.replaceState({},
		"", "#" + e)
	}
	function r() {
		var e, t = this.getAttribute("data-version") || this.value,
		o = parseInt(this.getAttribute("data-column"), 10);
		f[o] = t,
		e = "*" == t ? v[o] : y[o][t];
		for (var r = document.querySelectorAll(".compare-candidate.compare-col"), l = document.querySelectorAll(".changed[data-spec]"), i = 0; i < l.length; i++) {
			var c = l[i];
			if (o === parseInt(c.getAttribute("data-column"), 10)) {
				var d = c.getAttribute("data-spec");
				c.innerHTML = v[o][d],
				$gsm.removeClass(c, "changed")
			}
		}
		for (var c in e) if (!c.match(/^_/)) {
			var u = document.querySelectorAll('[data-spec="' + c + '"]');
			if (u.length) {
				var g = u[0].parentElement;
				a(g),
				c in v[o] || (v[o][c] = u[Math.min(o, u.length - 1)].innerHTML);
				i = 0;
				do {
					u[Math.min(o, u.length - 1) + i].innerHTML = e[c], u[Math.min(o, u.length - 1) + i].setAttribute("data-column", o), "*" != t && $gsm.addClass(u[o + i], "changed"), i += r.length
				} while ( r . length && o + i < u . length );
				$gsm.hasClass(h, "on") && n(g)
			}
		}
		s();
		for (i = 0; i < S.length; i++) S[i].style.display = "*" != f[0] && S[i].hasAttribute("data-spec-optional") ? "none": "table-row";
		if (r.length) {
			var p = document.querySelectorAll("[data-spec-optional]");
			for (i = 0; i < p.length; i++) $gsm.toggleClass(p[i].children[o + 1], "hide", "*" !== f[o]);
			for (i = 0; i < p.length; i++) {
				c = p[i];
				for (var w = !0,
				b = 0; b < c.childElementCount; b++) {
					var $ = c.children[b];
					$gsm.hasClass($, "ttl") || (w = w && ($gsm.hasClass($, "hide") || $.innerHTML.match(/^\s*$/)))
				}
				c.style.display = w ? "none": ""
			}
			A = e._color;
			var L = document.querySelectorAll('.nfo.changed[data-column="' + o + '"]');
			for (i = 0; i < L.length; i++) L[i].setAttribute("data-color", e._color);
			this.setAttribute("data-color", A),
			$gsm.toggleClass(this, "active", "*" !== this.value)
		} else $gsm.removeClass(m, A),
		A = e._color,
		$gsm.addClass(m, A),
		$gsm.removeClass(document.querySelector(".tab[data-version].active"), "active"),
		$gsm.addClass(this, "active");
		"*" !== t && $gsm.xhr("GET", DESKTOP_BASE_URL + "counter-js.php3?sF=version&idSiteVer=" + (window.location.hostname.match(/^m\./) ? "1": "0"),
		function() {}),
		$gsm.setCookie("tabs-used", "1", 90)
	}
	function l() {
		var e = 1e3;
		if (w.length) {
			var t = 1,
			n = 1;
			M = setInterval(function() {
				m.className = "color" + t % C,
				$gsm.removeClass(w[t - n], "active"),
				$gsm.addClass(w[t], "active"),
				0 == n ? n = -1 : t == w.length - 1 && (n = 0),
				t += n,
				t < 0 && clearInterval(M)
			},
			e / (2 * w.length))
		}
	}
	var i, c = /(\s*[,;]\s*|(?:&\w+;)|(?:<br>)\s*)/gm,
	d = /(\s*[,()]\s*)/,
	u = /(\s*(?:[,()]|(?:\n*<br>\n*))\s*)/,
	g = {
		nettech: /([/]) / ,
		net2g: /((?:\s+[/ - ]\s + ) | ( ? :^GSM) | ( ? :^CDMA)) / , net3g: /([/ - ] | ( ? :^HS[A - Z] + ) | ( ? :^CDMA\d * )) / , net4g: /(\s*[,;-]|(?:LTE band )\s*)/, displaysize: d, displayresolution: d, cam1modules: u, cam2modules: u, sim: /(\s*(?: or )\s*)/, internalmemory: /(\s*(?:(?: or )|[,;])\s*)/, price: /@@@@@@@@@/
	},
	m = document.querySelector("#specs-list"), h = document.querySelector(".diff-toggle");h && (h.onclick = function(e) {
		$gsm.hasClass(m, "diff-ran") ? ($gsm.toggleClass(h, "on"), $gsm.toggleClass(m, "diff-show")) : (o(), $gsm.xhr("GET", DESKTOP_BASE_URL + "counter-js.php3",
		function() {},
		{
			sF: window.location.hostname.match(/^m\./) ? "cmp-diff-m": "cmp-diff"
		},
		function() {},
		!0)),
		s()
	}), $gsm.onload(function() {
		window.location.hash.match(/^#diff-$/) && h.onclick()
	});
	var f = [];
	if ("undefined" != typeof SPEC_VERSIONS) {
		var p = document.querySelector('a[href^="compare"]');
		p && (p.onclick = function(e) {
			e.stopPropagation(),
			e.preventDefault(),
			window.location = this.href + window.location.hash
		});
		for (var v = [], y = [], S = (m = document.querySelector("#specs-list"), document.querySelectorAll(".tr-toggle")), w = document.querySelectorAll(".specs-tabs .tab"), b = 0; b < w.length; b++) w[b].onclick = r,
		w[b].setAttribute("data-column", 0);
		if (!w.length) {
			var $ = document.querySelectorAll(".version-select");
			for (b = 0; b < $.length; b++) $[b].onchange = r
		}
		var A = "",
		L = 0,
		C = 6;
		window.location.host.match(/^www\./) ? v._color = "": (v._color = "color0", L++);
		for (b = 0; b < SPEC_VERSIONS.length; b++) {
			for (var E = SPEC_VERSIONS[b], T = {},
			q = 0; q < E.length; q++) {
				var _ = E[q][1];
				_._column = b,
				_._name = E[q][0],
				_._color = "color" + L,
				_._index = q + 1,
				L = (L + 1) % C,
				T[_._name] = _
			}
			y.push(T),
			v.push({}),
			f.push("*")
		}
		var H, M, x = document.querySelector(".specs-tabs .swiper-wrapper");
		if (w.length && w[w.length - 1].offsetLeft + w[w.length - 1].offsetWidth > x.offsetWidth) {
			for (b = 0; b < w.length; b++) $gsm.addClass(w[b], "swiper-slide");
			var k = function() {
				H = new Swiper(".specs-tabs", {
					slidesPerView: "auto",
					spaceBetween: 0,
					slidesOffsetAfter: 200
				});
				var e = window.location.hash.match(/#(.+)/);
				if (e) {
					e = e[1].split(",")[0];
					var t = y[0][e]._index;
					w[t].offsetLeft + w[t].offsetWidth > x.offsetWidth && H.slideTo(t)
				}
			};
			if ("undefined" == typeof Swiper) {
				var B = $gsm.tag("script", {
					src: ASSETS_BASE_URL + "js/m/swiper.js"
				},
				"", m);
				B.onload = k
			} else k()
		}
		$gsm.onload(function() {
			var e = window.location.hash.match(/#(diff-)?(.+)/);
			if (e) for (var t = (e[2] || e[1]).split(","), n = 0; n < t.length; n++) {
				var o = document.querySelector('.version-select[data-column="' + n + '"]');
				if (o) o.value = t[n],
				"" == o.value && (o.value = "*"),
				o.onchange();
				else {
					var a = document.querySelector('.specs-tabs .tab[data-version="' + t[n] + '"]');
					a && a.onclick()
				}
			}
			e || $gsm.getCookie("tabs-used") || setTimeout(l, 2e3),
			e && "diff-" == e[1] && h.onclick()
		})
	}
} (),
function() {
	const e = function() {
		for (var e = document.querySelectorAll(".compare-candidate h3"), t = 0, n = 0; n < e.length; n++) {
			const o = e[n].querySelector("a") || e[n],
			a = o.offsetHeight + parseInt(getComputedStyle(e[n]).paddingBottom, 10) + parseInt(getComputedStyle(e[n]).paddingTop, 10);
			a > t && (t = a)
		}
		for (n = 0; n < e.length; n++) e[n].offsetHeight !== t && (e[n].style.height = t + "px")
	};
	e(),
	document.addEventListener("DOMContentLoaded", e)
} (), document.addEventListener("DOMContentLoaded",
function() {
	const e = document.querySelector("#specs-list"),
	t = document.querySelector(".compare-candidates");
	if (!e || !t) return;
	const n = document.querySelectorAll([".size-compare-3d .gray-button", ".review-comparisons .gray-button"].join(",")),
	o = 3,
	a = "dim-column-",
	s = function(n) {
		for (let n = 1; n <= o; n++) e.classList.remove(a + n),
		t.classList.remove(a + n);
		if (n > 0) {
			const o = a + n;
			e.classList.add(o),
			t.classList.add(o)
		}
	};
	for (const e of n) {
		const t = e.dataset.columns ? e.dataset.columns.split("") : [];
		2 != t.length && console.error("3D size up highlight: data-columns should have two elements, got " + t.length);
		for (let n = 1; n <= 3; n++) - 1 == t.indexOf("" + n) && (e.onmouseenter = s.bind(e, n), e.onmouseleave = s.bind(e, 0))
	}
});