(function () {
  "use strict";

  // ── Live clock (purely decorative — reflects the visitor's local time) ──
  function pad(n) { return String(n).padStart(2, "0"); }
  function tick() {
    var now = new Date();
    var text = pad(now.getHours()) + ":" + pad(now.getMinutes()) + ":" + pad(now.getSeconds());
    var a = document.getElementById("clockText");
    var b = document.getElementById("heroClock");
    if (a) a.textContent = text;
    if (b) b.textContent = text;
  }
  tick();
  setInterval(tick, 1000);

  // ── Active nav-link highlighting via IntersectionObserver ──
  var links = Array.prototype.slice.call(document.querySelectorAll("[data-nav]"));
  var sections = links
    .map(function (l) { return document.querySelector(l.getAttribute("href")); })
    .filter(Boolean);

  if ("IntersectionObserver" in window && sections.length) {
    var map = new Map();
    sections.forEach(function (sec, i) { map.set(sec, links[i]); });

    var observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          var link = map.get(entry.target);
          if (!link) return;
          if (entry.isIntersecting) {
            links.forEach(function (l) { l.classList.remove("active"); });
            link.classList.add("active");
          }
        });
      },
      { rootMargin: "-15% 0px -70% 0px", threshold: 0 }
    );

    sections.forEach(function (sec) { observer.observe(sec); });
  }

  // ── Mobile sidebar toggle ──
  var toggle = document.getElementById("navToggle");
  var sidebar = document.getElementById("sidebar");
  var scrim = document.getElementById("navScrim");

  function closeNav() {
    sidebar.classList.remove("open");
    scrim.classList.remove("visible");
    toggle.setAttribute("aria-expanded", "false");
  }
  function openNav() {
    sidebar.classList.add("open");
    scrim.classList.add("visible");
    toggle.setAttribute("aria-expanded", "true");
  }

  if (toggle) {
    toggle.addEventListener("click", function () {
      var isOpen = sidebar.classList.contains("open");
      isOpen ? closeNav() : openNav();
    });
  }
  if (scrim) scrim.addEventListener("click", closeNav);
  links.forEach(function (l) { l.addEventListener("click", closeNav); });
})();
