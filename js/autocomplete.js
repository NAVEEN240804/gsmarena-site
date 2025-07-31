function Autocomplete(t, e, s, i, o) {
    function n(t, e) {
      return e.contains(t)
    }
    if (this.field = document.getElementById(t), this.wrapper = document.getElementById(e) || document.querySelector(e), this.full = s, this.hideImages = !!o, i) this.position = i;
    else {
      const t = e.match(/\d$/);
      this.position = t ? t[0] : ""
    }
    this.MAKER_ID = 0,
    this.PHONE_ID = 1,
    this.PHONE_NAME = 2,
    this.SEARCH_STR = 3,
    this.THUMB = 4,
    this.NAME_OVERRIDE = 5;
    const h = 37,
    a = 39,
    l = 38,
    c = 40,
    r = 27,
    p = 13;
    Autocomplete.prototype.listURL = AUTOCOMPLETE_LIST_URL,
    AUTOCOMPLETE_GLOBAL_DATA[this.globalDataName] = {},
    this.div = $gsm.tag("div", {
      class: "autocomplete autocomplete-search autocomplete-small autocomplete-hide"
    },
    "", this.wrapper),
    this.parent = this.div,
    this.position && this.div.classList.add("autocomplete-compare"),
    this.reviewsDiv = $gsm.tag("div", {
      class: "reviews-results float-left"
    },
    "", this.div),
    $gsm.tag("span", {
      class: "autocomplete-desc"
    },
    "Reviews", this.reviewsDiv),
    this.reviewsList = $gsm.tag("ul", {},
    "", this.reviewsDiv);
    const d = $gsm.tag("li", {
      class: "permanent"
    },
    "", this.reviewsList);
    this.reviewsMore = $gsm.tag("a", {
      class: "more-news-link more-news-link-small",
      href: "#"
    },
    "More review results", d),
    this.phonesDiv = $gsm.tag("div", {
      class: "phone-results"
    },
    "", this.div),
    this.phoneLabel = $gsm.tag("span", {
      class: "autocomplete-desc"
    },
    "Last visited", this.phonesDiv),
    this.phonesList = $gsm.tag("ul", {
      class: "autocomplete-last-searched"
    },
    "", this.phonesDiv),
    this.full && (this.phonesMoreLi = $gsm.tag("li", {
      class: "permanent",
      style: "display: none;"
    },
    "", this.phonesList), this.phonesMore = $gsm.tag("a", {
      class: "more-news-link more-news-link-small",
      href: "#"
    },
    "More device results", this.phonesMoreLi)),
    this.newsDiv = $gsm.tag("div", {
      class: "news-results float-left"
    },
    "", this.div),
    $gsm.tag("span", {
      class: "autocomplete-desc"
    },
    "News", this.newsDiv),
    this.newsList = $gsm.tag("ul", {},
    "", this.newsDiv);
    const u = $gsm.tag("li", {
      class: "permanent"
    },
    "", this.newsList);
    this.newsMore = $gsm.tag("a", {
      class: "more-news-link more-news-link-small",
      href: "#"
    },
    "More news results", u);
    const m = this.field.parentNode;
    this.position || (this.searchButtons = $gsm.tag("div", {
      class: "search-buttons"
    },
    "", m), this.goButton = $gsm.tag("a", {
      class: "go",
      href: "#"
    },
    "Go", this.searchButtons), this.advancedButton = $gsm.tag("a", {
      class: "advanced",
      href: "search.php3"
    },
    "Advanced", this.searchButtons)),
    i || (this.quickSearchButton = document.querySelector("#quick-search-button")),
    this.loadRecentPhones(),
    $gsm.addEventListener(document, "click",
    function(t) {
      n(t.target, this.parent) || this.hide()
    }.bind(this), !0),
    $gsm.addEventListener(document, "touchend",
    function(t) {
      n(t.target, this.parent) || this.div.classList.contains("autocomplete-hide") || this.hide()
    }.bind(this), !0),
    this.field.onclick = function() {
      this.list ? this.searchPhones() : this.loadList(),
      this.searchButtons && (this.searchButtons.style.display = "initial"),
      this.position || (this.quickSearchButton.style.display = "none")
    }.bind(this),
    this.field.onkeyup = function(t) {
      const e = this.field.value,
      s = this.div.querySelector(".autocomplete-selected");
      if (s && s.classList.remove("autocomplete-selected"), t.which != c) if (t.which != l) {
        if (t.which == h || t.which == a) {
          if (!this.full) return;
          if (!s) return;
          if (0 == e.length) return void s.classList.add("autocomplete-selected");
          const i = [this.reviewsList, this.phonesList, this.newsList],
          o = s.closest("ul");
          let n = 0;
          for (; n < o.childElementCount && o.children[n].firstChild != s; n++);
          const a = t.which == h ? -1 : 1;
          let l = i.indexOf(o);
          do {
            l = (i.length + l + a) % i.length
          } while ( 0 == i [ l ].childElementCount);
          return n = Math.min(n, i[l].childElementCount - 1),
          i[l].children[n].firstChild.classList.add("autocomplete-selected"),
          void t.preventDefault()
        }
        t.which != r ? e.length >= 1 ? (this.searchPhones(), this.searchNewsAndReviews()) : this.showRecentPhones() : this.hide()
      } else {
        if (s) {
          let t = s.parentNode.previousSibling;
          t || (t = s.parentNode.parentNode.lastChild),
          t.firstChild.classList.add("autocomplete-selected"),
          t.firstChild.scrollIntoViewIfNeeded()
        } else this.phonesMore ? this.phonesMore.classList.add("autocomplete-selected") : s.parentNode.parentNode.lastChild.classList("autocomplete-selected");
        t.preventDefault()
      } else {
        if (s) {
          let t = s.parentNode.nextSibling;
          t || (t = s.closest("ul").firstChild),
          t.firstChild.classList.add("autocomplete-selected"),
          t.scrollIntoViewIfNeeded()
        } else this.phonesList.firstChild && (this.phonesList.firstChild.firstChild.classList.add("autocomplete-selected"), this.phonesList.firstChild.scrollIntoViewIfNeeded());
        t.preventDefault()
      }
    }.bind(this),
    this.field.onkeydown = function(t) {
      const e = this.div.querySelector(".autocomplete-selected");
      if (t.which == p) {
        if (e) return t.preventDefault(),
        t.stopPropagation(),
        "#" == e.getAttribute("href") ? void e.onclick(t) : void(window.location = e.href);
        if (this.ignoreEnterForSearch || this.field.length < AUTOCOMPLETE_NEWS_REVIEWS_MIN_LENGTH || !this.full) return t.preventDefault(),
        void t.stopPropagation()
      }
    }.bind(this),
    this.phonesMore && (this.phonesMore.onclick = function(t) {
      t.preventDefault(),
      t.stopPropagation();
      const e = this.field.parentNode.closest("form");
      e.submit()
    }.bind(this)),
    this.goButton && (this.goButton.onclick = this.phonesMore.onclick),
    this.newsMore.onclick = function(t) {
      t.preventDefault(),
      t.stopPropagation(),
      window.location = "news.php3?sSearch=" + this.field.value
    }.bind(this),
    this.reviewsMore.onclick = function(t) {
      t.preventDefault(),
      t.stopPropagation(),
      window.location = "reviews.php3?sSearch=" + this.field.value
    }.bind(this),
    document.activeElement != this.field && "" === this.field.value || "" === this.field.getAttribute("value") && (this.loadList(), this.searchNewsAndReviews()),
    document.body.classList.contains("app") && (this.pagination = $gsm.tag("div", {
      class: "pagination"
    },
    {},
    this.phonesDiv), this.phonesList.addEventListener("scrollend",
    function() {
      const t = this.pagination.querySelector(".active");
      t && t.classList.remove("active");
      const e = Math.round(this.phonesList.scrollLeft / this.phonesList.offsetWidth);
      this.pagination.children[e].classList.add("active")
    }.bind(this)))
  }
  "undefined" == typeof AUTOCOMPLETE_MAX_LINES && (AUTOCOMPLETE_MAX_LINES = 5),
  "undefined" == typeof AUTOCOMPLETE_MAX_SCROLL_LINES && (AUTOCOMPLETE_MAX_SCROLL_LINES = 20),
  "undefined" == typeof AUTOCOMPLETE_NEWS_REVIEWS_TIMEOUT && (AUTOCOMPLETE_NEWS_REVIEWS_TIMEOUT = 1e3),
  "undefined" == typeof AUTOCOMPLETE_NEWS_REVIEWS_MIN_LENGTH && (AUTOCOMPLETE_NEWS_REVIEWS_MIN_LENGTH = 2),
  "undefined" == typeof AUTOCOMPLETE_THUMB_URL && (AUTOCOMPLETE_THUMB_URL = CDN2_BASE_URL + "vv/bigpic/"),
  "undefined" == typeof NEWS_REVIEWS_URL && (NEWS_REVIEWS_URL = "search-json.php3"),
  "undefined" == typeof AUTOCOMPLETE_RECENT_URL && (AUTOCOMPLETE_RECENT_URL = "history-json.php3");
  const AUTOCOMPLETE_GLOBAL_DATA = {};
  Autocomplete.prototype.globalDataName = "autocomplete",
  Autocomplete.prototype._getGlobalData = function() {
    return AUTOCOMPLETE_GLOBAL_DATA[this.globalDataName]
  },
  Autocomplete.prototype._copyInstanceValues = function() {
    this.list = this._getGlobalData().list,
    this.makers = this._getGlobalData().makers,
    this.nameToIndex = this._getGlobalData().nameToIndex
  },
  Autocomplete.prototype._parseData = function(t) {
    let e;
    try {
      e = JSON.parse(t)
    } catch(t) {
      return
    }
    this._getGlobalData().makers = e[0],
    this._getGlobalData().list = e[1];
    const s = {};
    for (let t = 0; t < e[1].length; t++) {
      const i = e[1][t],
      o = (void 0 !== i[this.NAME_OVERRIDE] && i[this.NAME_OVERRIDE] || i[this.PHONE_NAME]).toLowerCase(),
      n = e[0][i[this.MAKER_ID]].toLowerCase() + " " + o;
      n in s || (s[n] = t)
    }
    this._getGlobalData().nameToIndex = s,
    this._copyInstanceValues()
  },
  Autocomplete.prototype.loadList = function(t) {
    if (this._getGlobalData().loaded && !this.list) return this._copyInstanceValues(),
    void("function" == typeof t && t());
    this._getGlobalData().loading || (this._getGlobalData().loading = !0, this._getGlobalData().loaded = !1, $gsm.xhr("GET", this.listURL,
    function(e) {
      this._parseData(e),
      this._getGlobalData().loading = !1,
      this._getGlobalData().loaded = !0,
      window.location.search.match(new RegExp("sSearch" + this.position + "=")) || this.searchPhones(),
      "function" == typeof t && t()
    }.bind(this), null,
    function() {},
    !0), "" === this.field.value && this.showRecentPhones())
  },
  Autocomplete.prototype.loadRecentPhones = function() {
    const t = localStorage.getItem("recentPhones");
    let e = [];
    try {
      t && (e = JSON.parse(t))
    } catch(t) {
      localStorage.removeItem("recentPhones")
    }
    if ("undefined" != typeof HISTORY_ITEM_URL) {
      const t = {
        href: HISTORY_ITEM_URL,
        src: HISTORY_ITEM_IMAGE,
        text: HISTORY_ITEM_NAME,
        id: HISTORY_ITEM_ID
      };
      let s = 0;
      for (; s < e.length;) e[s].id == t.id || e[s].href == t.href ? e.splice(s, 1) : s++;
      e.unshift(t),
      e.splice(AUTOCOMPLETE_MAX_LINES),
      localStorage.setItem("recentPhones", JSON.stringify(e))
    }
    this._getGlobalData().recent = e
  },
  Autocomplete.prototype.setList = function(t, e) {
    let s = 0,
    i = t.firstChild;
    for (; i && s < e.length;) {
      if (i.classList.contains("permanent")) {
        i = i.nextElementSibling;
        continue
      }
      const t = i.querySelector("a");
      if (t.getAttribute("href") != e[s].href) {
        const o = i.querySelector("img"),
        n = i.querySelector("span");
        t.href = e[s].href,
        o.src = e[s].src,
        o.alt = e[s].text,
        n.innerText = e[s].text
      }
      s++,
      i = i.nextElementSibling
    }
    for (; i && t.childElementCount > e.length;) {
      if (i.classList.contains("permanent")) {
        i = i.nextElementSibling;
        continue
      }
      const t = i.nextElementSibling;
      i.remove(),
      i = t
    }
    for (; s < e.length;) {
      const i = $gsm.tag("li", {},
      ""),
      o = $gsm.tag("a", {
        href: e[s].href
      },
      "", i);
      $gsm.tag("img", {
        loading: "lazy",
        src: this.hideImages ? "": e[s].src,
        alt: e[s].text
      },
      "", o),
      $gsm.tag("span", {},
      e[s].text, o),
      t.appendChild(i),
      s++
    }
    const o = t.querySelectorAll(".permanent");
    for (let e of o) t.appendChild(e);
    if (document.body.classList.contains("app")) {
      this.pagination.innerHTML = "",
      $gsm.tag("span", {
        class: "active"
      },
      "", this.pagination);
      const t = Math.round(this.phonesList.scrollWidth / this.phonesList.offsetWidth);
      for (let e = 1; e < t; e++) $gsm.tag("span", {},
      "", this.pagination);
      this.phonesList.scrollLeft = 0
    }
  },
  Autocomplete.prototype._makePhoneName = function(t, e) {
    const s = this.makers[t[this.MAKER_ID]],
    i = void 0 === t[this.NAME_OVERRIDE] || e ? t[this.PHONE_NAME] : t[this.NAME_OVERRIDE] || t[this.PHONE_NAME];
    return s + " " + i
  },
  Autocomplete.prototype._makePhoneURL = function(t) {
    if (t.href) return t.href;
    let e = this._makePhoneName(t, !0);
    return e = e.toLowerCase().replace(/\s+|-|\/|\./g, "_"),
    e += "-" + t[this.PHONE_ID] + ".php",
    e
  },
  Autocomplete.prototype._makeCompareURL = function(t) {
    let e = window.location.search;
    return e || (e = "?"),
    e = e.replace(new RegExp("&?idPhone" + this.position + "=\\d+"), ""),
    "?" != e.charAt(e.length - 1) && (e += "&"),
    e += "idPhone" + this.position + "=",
    e += t.id || t[this.PHONE_ID],
    window.location.pathname + e + window.location.hash
  },
  Autocomplete.prototype.makePhone = function(t) {
    return {
      href: this.full ? this._makePhoneURL(t) : this._makeCompareURL(t),
      src: t.src || AUTOCOMPLETE_THUMB_URL + t[this.THUMB],
      text: t.text || this._makePhoneName(t)
    }
  },
  Autocomplete.prototype._makeSearchName = function(t) {
    return this._makePhoneName(t).toLowerCase()
  },
  Autocomplete.prototype._makeSearchString = function(t) {
    const e = this.makers[t[this.MAKER_ID]],
    s = e + " " + t[this.SEARCH_STR];
    return s.toLowerCase()
  },
  Autocomplete.prototype.searchPhones = function() {
    function t(t) {
      return t.replace(/^\s*(.*?)\s*$/, "$1")
    }
    function e(t) {
      return t.replace(/[/\ - \\ ^ $ * +?. () | [\] {}] / g,
      "\\$&")
    }
    function s(t, e) {
      for (let s = 0; s < t.length; s++) if (!e.match(t[s])) return ! 1;
      return ! 0
    }
    const i = t(this.field.value).toLowerCase();
    if (0 == i.length) return void this.showRecentPhones();
    if (!this.list) return;
    const o = i.split(/\s+/g),
    n = [],
    h = [];
    for (let t = 0; t < o.length; t++) {
      const s = e(o[t]),
      i = s.match(/^\w/),
      a = s.match(/\w$/);
      n.push(new RegExp((i ? "\\b": "") + s)),
      h.push(new RegExp((i ? "\\b": "") + s + (a ? "\\b": "")))
    }
    this.phonesList.classList.remove("autocomplete-last-searched"),
    this.phonesMore && (this.phonesMoreLi.style.display = ""),
    this.show();
    const a = [];
    let l = !1;
    if (i in this.nameToIndex) {
      const t = this.list[this.nameToIndex[i]];
      a.push(this.makePhone(t))
    }
    for (let t = 0; t < this.list.length; t++) {
      const e = this.list[t],
      i = this._makeSearchName(e),
      o = this._makeSearchString(e);
      if (s(n, i) || o && s(h, o)) {
        const t = this.makePhone(e);
        0 != a.length && a[0].href == t.href || a.push(t)
      }
      if (this.full) {
        if (a.length >= AUTOCOMPLETE_MAX_LINES) break
      } else if (a.length >= AUTOCOMPLETE_MAX_SCROLL_LINES) {
        l = !0;
        break
      }
    }
    this.phoneLabel.innerHTML = this.full ? "Devices": (l ? "More than ": "") + a.length + " devices found",
    this.setList(this.phonesList, a)
  },
  Autocomplete.prototype.searchNewsAndReviews = function() {
    if (!this.full) return;
    this.setList(this.newsList, []),
    this.setList(this.reviewsList, []);
    const t = this.field.value,
    e = NEWS_REVIEWS_URL + "?sSearch=" + encodeURIComponent(t);
    t.length < AUTOCOMPLETE_NEWS_REVIEWS_MIN_LENGTH || (clearTimeout(this.newsReviewsTimeout), this.newsReviewsTimeout = setTimeout(function() {
      t.length >= 1 && $gsm.xhr("GET", e,
      function(t) {
        0 != this.field.value.length && (this.div.classList.add("autocomplete-large"), this.div.classList.remove("autocomplete-small"), t.news.splice(AUTOCOMPLETE_MAX_LINES), t.reviews.splice(AUTOCOMPLETE_MAX_LINES), this.setList(this.newsList, t.news), this.setList(this.reviewsList, t.reviews))
      }.bind(this))
    }.bind(this), AUTOCOMPLETE_NEWS_REVIEWS_TIMEOUT))
  },
  Autocomplete.prototype.showRecentPhones = function(t) {
    this.loadRecentPhones();
    const e = this._getGlobalData().recent,
    s = [];
    for (let i = 0; i < Math.min(e.length, AUTOCOMPLETE_MAX_LINES); i++)("function" != typeof t || t(e[i])) && s.push(this.makePhone(e[i]));
    0 != s.length && (this.setList(this.phonesList, s), this.phoneLabel.innerHTML = "Last visited", this.phonesList.classList.add("autocomplete-last-searched"), this.div.classList.remove("autocomplete-large"), this.div.classList.add("autocomplete-small"), this.phonesMore && (this.phonesMoreLi.style.display = "none"), this.show())
  },
  Autocomplete.prototype.hide = function() {
    this.div.classList.add("autocomplete-hide"),
    this.searchButtons && (this.searchButtons.style.display = "none"),
    !this.position && this.quickSearchButton && (this.quickSearchButton.style.display = "")
  },
  Autocomplete.prototype.show = function() {
    this.div.classList.remove("autocomplete-hide"),
    this.searchButtons && (this.searchButtons.style.display = "initial"),
    !this.position && this.quickSearchButton && (this.quickSearchButton.style.display = "none")
  };