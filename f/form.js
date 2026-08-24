/* núcleo compartido de los formularios · Persuasive Presentations 20941 */

/* Pega aquí la URL del Web App de Apps Script (acaba en /exec) */
var ENDPOINT = '';

(function () {
  var form = document.querySelector('form');
  if (!form) return;

  /* recuerda el correo entre formularios */
  var mail = form.querySelector('input[type=email]');
  if (mail) {
    try { mail.value = localStorage.getItem('bsk_mail') || ''; } catch (e) {}
    mail.addEventListener('change', function () {
      try { localStorage.setItem('bsk_mail', mail.value.trim()); } catch (e) {}
    });
  }

  /* botones de opción única y múltiple */
  form.querySelectorAll('[data-group]').forEach(function (g) {
    var multi = g.hasAttribute('data-multi');
    var max = parseInt(g.getAttribute('data-max') || '0', 10);
    g.querySelectorAll('button.opt, .scale button').forEach(function (b) {
      b.type = 'button';
      b.setAttribute('aria-pressed', 'false');
      b.addEventListener('click', function () {
        var on = b.getAttribute('aria-pressed') === 'true';
        if (!multi) {
          g.querySelectorAll('[aria-pressed]').forEach(function (o) { o.setAttribute('aria-pressed', 'false'); });
          b.setAttribute('aria-pressed', on ? 'false' : 'true');
        } else {
          var n = g.querySelectorAll('[aria-pressed=true]').length;
          if (!on && max && n >= max) return;
          b.setAttribute('aria-pressed', on ? 'false' : 'true');
        }
        check();
      });
    });
  });

  /* contadores de caracteres */
  form.querySelectorAll('[data-count]').forEach(function (i) {
    var out = document.getElementById(i.getAttribute('data-count'));
    var lim = i.getAttribute('maxlength');
    var upd = function () { if (out) out.textContent = i.value.length + (lim ? ' / ' + lim : ''); };
    i.addEventListener('input', function () { upd(); check(); });
    upd();
  });

  var send = form.querySelector('.send');
  function collect() {
    var out = { slot: form.getAttribute('data-slot') };
    form.querySelectorAll('[data-group]').forEach(function (g) {
      var picked = [];
      g.querySelectorAll('[aria-pressed=true]').forEach(function (b) {
        picked.push(b.getAttribute('data-val') || b.textContent.trim());
      });
      out[g.getAttribute('data-group')] = picked.join(' | ');
    });
    form.querySelectorAll('input[name], textarea[name]').forEach(function (i) {
      out[i.getAttribute('name')] = i.value.trim();
    });
    return out;
  }
  function check() {
    var d = collect(), ok = true;
    form.querySelectorAll('[data-required]').forEach(function (el) {
      var k = el.getAttribute('data-group') || el.getAttribute('name');
      if (!d[k]) ok = false;
    });
    if (send) send.disabled = !ok;
    return ok;
  }
  check();

  form.addEventListener('submit', function (e) {
    e.preventDefault();
    if (!check()) return;
    document.body.classList.remove('failed');
    send.disabled = true;
    send.textContent = 'Sending…';
    var payload = collect();
    if (!ENDPOINT) {
      try {
        var mm = location.pathname.match(/([^\/]+)\.html$/);
        if (mm) localStorage.setItem('bsk_done_' + mm[1], String(Date.now()));
      } catch (e) {}
      document.body.classList.add('sent'); return;
    }
    fetch(ENDPOINT, {
      method: 'POST',
      /* text/plain evita el preflight, que Apps Script no responde */
      headers: { 'Content-Type': 'text/plain;charset=utf-8' },
      body: JSON.stringify(payload)
    }).then(function () {
      try {
        var m = location.pathname.match(/([^\/]+)\.html$/);
        if (m) localStorage.setItem('bsk_done_' + m[1], String(Date.now()));
      } catch (e) {}
      document.body.classList.add('sent');
    }).catch(function () {
      document.body.classList.add('failed');
      send.disabled = false;
      send.textContent = 'Send again';
    });
  });
})();
