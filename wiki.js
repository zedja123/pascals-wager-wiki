(function () {
  var idx = window.WIKI_INDEX || [];
  var q = document.getElementById('q'), res = document.getElementById('results');
  function esc(s) { return String(s).replace(/[&<>"]/g, function (c) { return {'&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;'}[c]; }); }
  function run() {
    var t = q.value.trim().toLowerCase();
    if (t.length < 2) { res.hidden = true; res.innerHTML = ''; return; }
    var words = t.split(/\s+/), hits = [];
    for (var i = 0; i < idx.length; i++) {
      var e = idx[i], hay = (e[1] + ' ' + (e[3] || '')).toLowerCase(), ok = true;
      for (var w = 0; w < words.length; w++) if (hay.indexOf(words[w]) < 0) { ok = false; break; }
      if (ok) { hits.push([e[1].toLowerCase().indexOf(words[0]) === 0 ? 0 : (e[4] ? 1 : 2), e]); }
    }
    hits.sort(function (a, b) { return a[0] - b[0]; });
    res.innerHTML = hits.length ? hits.slice(0, 60).map(function (h) {
      var e = h[1]; return '<li><a href="' + e[0] + '">' + esc(e[1]) + '<small>' + esc(e[2]) + '</small></a></li>';
    }).join('') : '<li class="none">No page or section matches.</li>';
    res.hidden = false;
  }
  if (q) {
    q.addEventListener('input', run);
    q.addEventListener('keydown', function (ev) {
      if (ev.key === 'Enter') { var a = res.querySelector('a'); if (a) location.href = a.getAttribute('href'); }
      if (ev.key === 'Escape') { q.value = ''; run(); }
    });
    document.addEventListener('click', function (ev) { if (!ev.target.closest('.search')) res.hidden = true; });
  }
  var menus = Array.prototype.slice.call(document.querySelectorAll('.menu details'));
  menus.forEach(function (d) { d.addEventListener('toggle', function () { if (d.open) menus.forEach(function (o) { if (o !== d) o.open = false; }); }); });
  document.addEventListener('click', function (ev) { if (!ev.target.closest('.menu')) menus.forEach(function (d) { d.open = false; }); });
})();
