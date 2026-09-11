#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Cierra un deck con contraseña.

  python3 tools/cerrar_deck.py saturday.src.html saturday.html "la clave"

Lee el deck en claro y escribe en su lugar una página pequeña que solo
contiene el deck CIFRADO. Sin la contraseña no hay nada que leer: ni en
el HTML, ni en «ver código fuente», ni descargando el archivo. El
navegador descifra en memoria con la clave que tú escribes y entonces,
y solo entonces, aparece el deck.

Cifrado: PBKDF2-HMAC-SHA256, 300.000 iteraciones, y AES-256-GCM. Las dos
cosas las trae el navegador de serie (WebCrypto), así que la página no
carga ninguna librería de fuera.

IMPORTANTE: el archivo en claro (saturday.src.html) NO se sube a git.
Está en .gitignore. Es el original y el que hay que editar.
"""
import base64, json, os, sys
from cryptography.hazmat.primitives.ciphers.aead import AESGCM
from cryptography.hazmat.primitives.kdf.pbkdf2 import PBKDF2HMAC
from cryptography.hazmat.primitives import hashes

ITER = 300_000

LOADER = """<!doctype html>
<html lang="es"><head><meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<meta name="robots" content="noindex,nofollow">
<title>__TITLE__</title>
<style>
  :root { --paper:#f7f8fa; --ink:#14161a; --ink-soft:#4a5058; --ink-faint:#8b929c;
          --rule:#d9dde3; --blue:#1a3a6b; --crimson:#8b1a1a; }
  * { box-sizing: border-box; }
  html,body { height:100%; }
  body { margin:0; background:var(--paper); color:var(--ink);
         font-family:-apple-system,BlinkMacSystemFont,"Segoe UI",Helvetica,Arial,sans-serif;
         display:flex; align-items:center; justify-content:center; padding:24px; }
  .box { width:100%; max-width:420px; }
  .eyebrow { font-family:ui-monospace,SFMono-Regular,Menlo,monospace; font-size:11px;
             letter-spacing:.18em; text-transform:uppercase; color:var(--ink-faint); margin-bottom:10px; }
  h1 { font-family:Georgia,'Times New Roman',serif; font-weight:600; font-size:27px;
       line-height:1.2; margin:0 0 8px; }
  p { font-size:15px; line-height:1.45; color:var(--ink-soft); margin:0 0 20px; }
  label { display:block; font-size:13px; font-weight:600; margin-bottom:6px; }
  input { width:100%; padding:13px 14px; font-size:17px; border:1px solid var(--rule);
          border-radius:0; background:#fff; color:var(--ink); }
  input:focus { outline:none; border-color:var(--blue); box-shadow:0 0 0 3px rgba(26,58,107,.12); }
  button { width:100%; margin-top:12px; padding:14px; font-size:16px; font-weight:600;
           border:0; background:var(--blue); color:#fff; cursor:pointer; }
  button[disabled] { background:var(--ink-faint); cursor:default; }
  .err { margin-top:12px; font-size:14px; color:var(--crimson); min-height:20px; }
  .note { margin-top:22px; font-family:ui-monospace,SFMono-Regular,Menlo,monospace;
          font-size:11px; line-height:1.5; color:var(--ink-faint); }
</style>
</head><body>
<div class="box">
  <div class="eyebrow">Persuasive Presentations · 20941</div>
  <h1>__TITLE__</h1>
  <p>Este material es para el aula. Escribe la clave para abrirlo.</p>
  <form id="f">
    <label for="k">Clave</label>
    <input id="k" type="password" autocomplete="current-password" autofocus>
    <button id="go" type="submit">Abrir</button>
  </form>
  <div class="err" id="e"></div>
  <div class="note">Si eres estudiante del seminario, lo tuyo está en<br>
    <a href="f/" style="color:var(--blue)">helenamontoyacalero.com/presentations-class/f/</a></div>
</div>
<script>
var P = __PAYLOAD__;
var b2a = function (b) { var s=''; var v=new Uint8Array(b);
  for (var i=0;i<v.length;i++) s+=String.fromCharCode(v[i]); return s; };
var a2b = function (s) { var v=new Uint8Array(s.length);
  for (var i=0;i<s.length;i++) v[i]=s.charCodeAt(i); return v; };

async function abrir(clave) {
  var enc = new TextEncoder();
  var base = await crypto.subtle.importKey('raw', enc.encode(clave), 'PBKDF2', false, ['deriveKey']);
  var key = await crypto.subtle.deriveKey(
    { name:'PBKDF2', salt:a2b(atob(P.s)), iterations:P.it, hash:'SHA-256' },
    base, { name:'AES-GCM', length:256 }, false, ['decrypt']);
  var claro = await crypto.subtle.decrypt(
    { name:'AES-GCM', iv:a2b(atob(P.iv)) }, key, a2b(atob(P.c)));
  return new TextDecoder().decode(claro);
}

document.getElementById('f').addEventListener('submit', async function (ev) {
  ev.preventDefault();
  var b = document.getElementById('go'), e = document.getElementById('e');
  var clave = document.getElementById('k').value;
  if (!clave) return;
  b.disabled = true; b.textContent = 'Abriendo…'; e.textContent = '';
  try {
    var html = await abrir(clave);
    try { sessionStorage.setItem('bsk_k', clave); } catch (x) {}
    /* document.write y no innerHTML: el deck lleva sus scripts dentro y
       con innerHTML no se ejecutarian. El hash de la URL se conserva. */
    document.open(); document.write(html); document.close();
  } catch (x) {
    b.disabled = false; b.textContent = 'Abrir';
    e.textContent = 'Esa clave no es.';
    document.getElementById('k').select();
  }
});

/* Si ya la escribiste en esta pestaña, no te la vuelve a pedir al recargar. */
(async function () {
  var g; try { g = sessionStorage.getItem('bsk_k'); } catch (x) {}
  if (!g) return;
  try {
    var html = await abrir(g);
    document.open(); document.write(html); document.close();
  } catch (x) { try { sessionStorage.removeItem('bsk_k'); } catch (y) {} }
})();
</script>
</body></html>
"""

def main():
    if len(sys.argv) != 4:
        print(__doc__); sys.exit(1)
    src, dst, clave = sys.argv[1], sys.argv[2], sys.argv[3]
    html = open(src, encoding='utf-8').read()

    title = 'Sábado'
    import re
    m = re.search(r'<title>(.*?)</title>', html, re.S)
    if m: title = m.group(1).strip()

    salt, iv = os.urandom(16), os.urandom(12)
    kdf = PBKDF2HMAC(algorithm=hashes.SHA256(), length=32, salt=salt, iterations=ITER)
    key = kdf.derive(clave.encode('utf-8'))
    ct = AESGCM(key).encrypt(iv, html.encode('utf-8'), None)

    payload = json.dumps({
        's': base64.b64encode(salt).decode(),
        'iv': base64.b64encode(iv).decode(),
        'c': base64.b64encode(ct).decode(),
        'it': ITER,
    })
    out = LOADER.replace('__PAYLOAD__', payload).replace('__TITLE__', title)
    open(dst, 'w', encoding='utf-8').write(out)
    print('%s -> %s   (%.0f KB en claro, %.0f KB cifrado)'
          % (src, dst, len(html)/1024, len(out)/1024))

if __name__ == '__main__':
    main()
