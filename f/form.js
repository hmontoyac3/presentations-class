/* núcleo compartido de los formularios · Persuasive Presentations 20941 */

/* Pega aquí la URL del Web App de Apps Script (acaba en /exec) */
var ENDPOINT = 'https://script.google.com/macros/s/AKfycbzMqKFcjnvkifQkto1nDnXd3naMoFKoXxsPnSCK_W5zbtz2nIDAETfoTR7NQfnaM-vaNQ/exec';

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

  /* Campos que se repiten envío tras envío (el voto de inversión son nueve):
     data-remember guarda el valor y lo repone, para que solo se teclee una vez. */
  form.querySelectorAll('[data-remember]').forEach(function (el) {
    var key = 'bsk_r_' + (el.getAttribute('data-remember') || el.name);
    try {
      var v = localStorage.getItem(key);
      if (v) el.value = v;
    } catch (e) {}
    el.addEventListener('change', function () {
      try { localStorage.setItem(key, el.value.trim()); } catch (e) {}
    });
  });

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

  function markSent() {
    /* data-repeat: formularios que la misma persona envía varias veces (el voto
       de inversión son nueve). No se marca como hecho, si no se bloquearían. */
    if (!form.hasAttribute('data-repeat')) {
      try {
        var m = location.pathname.match(/([^\/]+)\.html$/);
        if (m) localStorage.setItem('bsk_done_' + m[1], String(Date.now()));
      } catch (e) {}
    }
    document.body.classList.add('sent');
  }

  function markFailed() {
    document.body.classList.add('failed');
    send.disabled = false;
    send.textContent = 'Send again';
  }

  form.addEventListener('submit', function (e) {
    e.preventDefault();
    if (!check()) return;
    document.body.classList.remove('failed');
    send.disabled = true;
    send.textContent = 'Sending…';
    var payload = collect();
    if (!ENDPOINT) {
      document.body.classList.add('unwired');
      send.disabled = false;
      send.textContent = 'Send';
      return;
    }

    /*
     * Apps Script Web Apps queue and serialise executions: with 30-50 people
     * submitting inside the same minute, a single request can sit for a long
     * time before Apps Script even starts running it. Waiting on fetch() for
     * that response is what made the page feel frozen — "no deja submit".
     *
     * sendBeacon hands the request to the browser and returns immediately:
     * it is queued and delivered in the background, survives the student
     * tapping away to the next form, and never blocks the UI. It cannot read
     * the response, so we treat "the browser accepted the beacon" as success
     * — which is the honest signal here, since the alternative (fetch) gave
     * no stronger guarantee in practice, only a much longer wait.
     */
    var body = JSON.stringify(payload);
    if (navigator.sendBeacon) {
      var blob = new Blob([body], { type: 'text/plain;charset=utf-8' });
      if (navigator.sendBeacon(ENDPOINT, blob)) {
        markSent();
        return;
      }
    }

    /* Fallback for browsers without sendBeacon: fetch with a hard timeout,
       so a slow Apps Script queue degrades to "assume it went through"
       rather than to an indefinite spinner. */
    var timedOut = false;
    var controller = typeof AbortController !== 'undefined' ? new AbortController() : null;
    var timer = setTimeout(function () {
      timedOut = true;
      if (controller) controller.abort();
      markSent();
    }, 8000);

    fetch(ENDPOINT, {
      method: 'POST',
      /* text/plain evita el preflight, que Apps Script no responde */
      headers: { 'Content-Type': 'text/plain;charset=utf-8' },
      body: body,
      signal: controller ? controller.signal : undefined
    }).then(function () {
      clearTimeout(timer);
      if (!timedOut) markSent();
    }).catch(function () {
      clearTimeout(timer);
      if (!timedOut) markFailed();
    });
  });
})();
