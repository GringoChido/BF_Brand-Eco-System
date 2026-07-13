/* =============================================================
 *  BILLIARD FACTORY · SITE REVIEW OVERLAY
 *  One-tag embed on any draft site:
 *
 *    <script src="/shared/review.js" defer
 *            data-site="franchise"
 *            data-token="…SITE_FEEDBACK_TOKEN…"></script>
 *
 *  A gold "Leave feedback" tab sits bottom-right. Click it, the
 *  cursor becomes a crosshair; click any element and a card takes
 *  a note + your name (remembered per browser). Each pin POSTs to
 *  the Engine Room's /api/site-feedback and becomes an unassigned
 *  task on the site's workstream — resolution happens THERE, so
 *  pins here are append-only: no reviewer edit or delete. Every
 *  reviewer sees every open pin (GET on load); a pin disappears
 *  when its task is done or archived in the Engine Room.
 *
 *  data-site      which draft site this is (default 'franchise')
 *  data-endpoint  override the intake URL (default: prod dashboard)
 *  data-token     bearer for SITE_FEEDBACK_TOKEN (omit while unset)
 *  Loads its sibling review.css itself — keep the two files together.
 * ============================================================= */
(function () {
  "use strict";
  if (window.__bfReviewLoaded) return;
  window.__bfReviewLoaded = true;

  var script = document.currentScript;
  var SITE = (script && script.dataset.site) || "franchise";
  var ENDPOINT = (script && script.dataset.endpoint) ||
    "https://bfspringdashboard.netlify.app/api/site-feedback";
  var TOKEN = (script && script.dataset.token) || "";
  var PAGE_URL = location.origin + location.pathname;
  var NAME_KEY = "bf-review-name";

  /* sibling stylesheet, resolved from this script's own URL */
  var link = document.createElement("link");
  link.rel = "stylesheet";
  link.href = (script ? script.src.replace(/review\.js(\?.*)?$/, "review.css") : "review.css");
  document.head.appendChild(link);

  function h(tag, className, text) {
    var el = document.createElement(tag);
    if (className) el.className = className;
    if (text != null) el.textContent = text;
    return el;
  }

  function headers(json) {
    var out = {};
    if (json) out["Content-Type"] = "application/json";
    if (TOKEN) out["Authorization"] = "Bearer " + TOKEN;
    return out;
  }

  /* ---- selector: shortest stable CSS path to the element ------ */
  function cssPath(el) {
    var parts = [];
    while (el && el.nodeType === 1 && el !== document.body) {
      if (el.id) { parts.unshift("#" + CSS.escape(el.id)); return parts.join(" > "); }
      var tag = el.tagName.toLowerCase();
      var i = 1, sib = el;
      while ((sib = sib.previousElementSibling)) {
        if (sib.tagName === el.tagName) i++;
      }
      parts.unshift(tag + ":nth-of-type(" + i + ")");
      el = el.parentElement;
    }
    parts.unshift("body");
    return parts.join(" > ");
  }

  /* ---- root + tab --------------------------------------------- */
  var root = h("div", "bfr-root");
  var pinLayer = h("div", "bfr-pin-layer");
  var tab = h("button", "bfr-tab");
  tab.type = "button";
  tab.setAttribute("aria-label", "Leave feedback on this page");
  var tabText = h("span", null, "Leave feedback");
  var tabCount = h("span", "bfr-count", "0");
  tabCount.hidden = true;
  tab.appendChild(tabText);
  tab.appendChild(tabCount);
  root.appendChild(pinLayer);
  root.appendChild(tab);

  var pins = [];        // {id, selector, note, reviewer, viewport, createdAt}
  var picking = false;
  var card = null;
  var hoverRing = null;
  var hint = null;

  function setCount() {
    tabCount.textContent = String(pins.length);
    tabCount.hidden = pins.length === 0;
  }

  function closeCard() {
    if (card) { card.remove(); card = null; }
  }

  /* ---- pick mode ----------------------------------------------- */
  function stopPicking() {
    picking = false;
    document.documentElement.classList.remove("bfr-picking");
    tab.classList.remove("bfr-armed");
    tabText.textContent = "Leave feedback";
    if (hoverRing) { hoverRing.remove(); hoverRing = null; }
    if (hint) { hint.remove(); hint = null; }
  }

  function startPicking() {
    closeCard();
    picking = true;
    document.documentElement.classList.add("bfr-picking");
    tab.classList.add("bfr-armed");
    tabText.textContent = "Click the spot…";
    hint = h("div", "bfr-hint");
    hint.innerHTML = "Click anything to pin a note — <b>Esc</b> cancels";
    root.appendChild(hint);
  }

  tab.addEventListener("click", function () {
    picking ? stopPicking() : startPicking();
  });

  document.addEventListener("mouseover", function (e) {
    if (!picking || root.contains(e.target)) return;
    var r = e.target.getBoundingClientRect();
    if (!hoverRing) { hoverRing = h("div", "bfr-hover-ring"); root.appendChild(hoverRing); }
    hoverRing.style.left = (r.left + scrollX - 3) + "px";
    hoverRing.style.top = (r.top + scrollY - 3) + "px";
    hoverRing.style.width = (r.width + 6) + "px";
    hoverRing.style.height = (r.height + 6) + "px";
  }, true);

  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape") { stopPicking(); closeCard(); }
  });

  document.addEventListener("click", function (e) {
    if (!picking || root.contains(e.target)) return;
    e.preventDefault();
    e.stopPropagation();
    var target = e.target;
    stopPicking();
    openComposeCard(target, e.pageX, e.pageY);
  }, true);

  /* ---- cards ---------------------------------------------------- */
  function placeCard(el, x, y) {
    el.style.visibility = "hidden";
    root.appendChild(el);
    var w = el.offsetWidth, hgt = el.offsetHeight;
    var left = Math.min(Math.max(8 + scrollX, x + 14), scrollX + innerWidth - w - 8);
    var top = y + 14;
    if (top + hgt > scrollY + innerHeight) top = y - hgt - 14; // flip above the click
    top = Math.max(8 + scrollY, top);
    el.style.left = left + "px";
    el.style.top = top + "px";
    el.style.visibility = "";
  }

  function openComposeCard(target, x, y) {
    closeCard();
    var selector = cssPath(target);
    card = h("div", "bfr-card");
    card.appendChild(h("h4", null, "Pin a note here"));
    var where = h("p", "bfr-where", selector);
    where.title = selector;
    card.appendChild(where);

    var noteLabel = h("label", null, "What should change?");
    var note = h("textarea");
    note.placeholder = "Say what you see and what you'd rather see…";
    var nameLabel = h("label", null, "Your name");
    var name = h("input");
    name.value = localStorage.getItem(NAME_KEY) || "";
    name.placeholder = "So we know who to ask";

    var actions = h("div", "bfr-actions");
    var send = h("button", "bfr-btn bfr-btn-go", "Pin it");
    send.type = "button";
    var cancel = h("button", "bfr-btn bfr-btn-quiet", "Cancel");
    cancel.type = "button";
    cancel.addEventListener("click", closeCard);
    actions.appendChild(send);
    actions.appendChild(cancel);

    card.appendChild(noteLabel); card.appendChild(note);
    card.appendChild(nameLabel); card.appendChild(name);
    card.appendChild(actions);
    placeCard(card, x, y);
    note.focus();

    send.addEventListener("click", function () {
      var noteVal = note.value.trim();
      if (!noteVal) { note.focus(); return; }
      send.disabled = true;
      send.textContent = "Pinning…";
      var reviewer = name.value.trim();
      if (reviewer) localStorage.setItem(NAME_KEY, reviewer);
      fetch(ENDPOINT, {
        method: "POST",
        headers: headers(true),
        body: JSON.stringify({
          site: SITE,
          pageUrl: PAGE_URL,
          selector: selector,
          note: noteVal,
          reviewer: reviewer || null,
          viewport: innerWidth + "x" + innerHeight,
        }),
      }).then(function (res) {
        if (!res.ok) throw new Error("HTTP " + res.status);
        return res.json();
      }).then(function (data) {
        pins.push({ id: data.id, selector: selector, note: noteVal,
          reviewer: reviewer || null, createdAt: new Date().toISOString() });
        renderPins();
        card.textContent = "";
        card.appendChild(h("p", "bfr-ok", "Pinned. It's on the board — thank you."));
        setTimeout(closeCard, 1600);
      }).catch(function (err) {
        send.disabled = false;
        send.textContent = "Pin it";
        var msg = card.querySelector(".bfr-error") || card.appendChild(h("p", "bfr-error"));
        msg.textContent = "Couldn't save the pin (" + err.message + "). Try again?";
      });
    });
  }

  function openViewCard(pin, x, y) {
    closeCard();
    card = h("div", "bfr-card");
    card.appendChild(h("h4", null, "Reviewer note"));
    card.appendChild(h("p", "bfr-note", pin.note));
    var meta = h("p", "bfr-meta");
    var who = h("b", null, pin.reviewer || "Unsigned");
    meta.appendChild(who);
    var when = pin.createdAt ? new Date(pin.createdAt) : null;
    meta.appendChild(document.createTextNode(
      (when ? " · " + when.toLocaleDateString(undefined, { month: "short", day: "numeric" }) : "") +
      (pin.viewport ? " · " + pin.viewport : "") +
      " · resolved in the Engine Room"));
    card.appendChild(meta);
    var actions = h("div", "bfr-actions");
    var ok = h("button", "bfr-btn bfr-btn-quiet", "Close");
    ok.type = "button";
    ok.addEventListener("click", closeCard);
    actions.appendChild(ok);
    card.appendChild(actions);
    placeCard(card, x, y);
  }

  /* ---- render pins ---------------------------------------------- */
  function renderPins() {
    pinLayer.textContent = "";
    pins.forEach(function (pin, i) {
      var el = pin.selector ? document.querySelector(pin.selector) : null;
      if (!el) return; // markup moved on — the task still lives on the board
      var r = el.getBoundingClientRect();
      var dot = h("button", "bfr-pin");
      dot.type = "button";
      dot.setAttribute("aria-label", "Reviewer note " + (i + 1));
      dot.appendChild(h("span", null, String(i + 1)));
      dot.style.left = (r.right + scrollX - 10) + "px";
      dot.style.top = (r.top + scrollY - 12) + "px";
      dot.addEventListener("click", function (e) {
        openViewCard(pin, e.pageX, e.pageY);
      });
      pinLayer.appendChild(dot);
    });
    setCount();
  }

  var resizeTimer;
  addEventListener("resize", function () {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(renderPins, 180);
  });
  // Draft sites animate in; re-measure once the entrance settles.
  addEventListener("load", function () { setTimeout(renderPins, 1200); });

  function loadPins() {
    fetch(ENDPOINT + "?site=" + encodeURIComponent(SITE) +
          "&pageUrl=" + encodeURIComponent(PAGE_URL), { headers: headers(false) })
      .then(function (res) { return res.ok ? res.json() : { pins: [] }; })
      .then(function (data) { pins = data.pins || []; renderPins(); })
      .catch(function () { /* offline / unconfigured — pinning still works */ });
  }

  function boot() {
    document.body.appendChild(root);
    loadPins();
  }
  document.readyState === "loading"
    ? document.addEventListener("DOMContentLoaded", boot)
    : boot();
})();
