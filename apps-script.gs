/**
 * Backend de los formularios · Persuasive Presentations 20941
 *
 * POST → guarda una respuesta en la pestaña de su formulario
 * GET  → devuelve las respuestas de un formulario, para el deck
 *
 * PENSADO PARA 80 ENVÍOS A LA VEZ. La versión anterior serializaba
 * cada escritura con un lock de 20 s: medido con 15 envíos simultáneos,
 * el último esperó 22 segundos. Ahora la ruta normal es
 * getProperty + appendRow, sin lock, y solo se bloquea la primera
 * escritura de cada formulario (cuando hay que crear la cabecera).
 *
 * MONTAJE
 *  1. Hoja de cálculo nueva. Extensiones > Apps Script. Pega esto.
 *  2. Configuración del proyecto > "Mostrar appsscript.json" y pega
 *     el appsscript.json del repo (limita el permiso a esta hoja).
 *  3. Implementar > Nueva implementación > Aplicación web
 *       Ejecutar como: yo · Acceso: cualquier usuario
 *  4. La URL /exec va en f/form.js y en index.html.
 *
 * SI YA LO DESPLEGASTE Y ESTÁS ACTUALIZANDO ESTE CÓDIGO:
 *   Implementar > Gestionar implementaciones > el lápiz de editar >
 *   Versión: "Nueva versión" > Implementar.
 *   NO uses "Nueva implementación": eso te da una URL distinta y
 *   tendrías que volver a pegarla en los dos archivos.
 *
 * El GET nunca devuelve correos: se filtran aquí, en el servidor.
 */

var PRIVATE = ['email', 'correo', 'mail'];

function doPost(e) {
  try {
    var data = JSON.parse(e.postData.contents);
    var slot = String(data.slot || 'sin-slot').replace(/[^\w-]/g, '');
    delete data.slot;

    var keys = Object.keys(data);
    var props = PropertiesService.getScriptProperties();
    var pkey = 'hdr_' + slot;
    var head = null;
    var cached = props.getProperty(pkey);
    if (cached) { try { head = JSON.parse(cached); } catch (err) { head = null; } }

    var missing = head ? keys.filter(function (k) { return head.indexOf(k) === -1; }) : keys;

    /* ruta lenta y con lock: solo la primera vez de cada formulario,
       o si aparece un campo nuevo */
    if (!head || missing.length) {
      var lock = LockService.getScriptLock();
      lock.waitLock(15000);
      try {
        var ss = SpreadsheetApp.getActiveSpreadsheet();
        var sh = ss.getSheetByName(slot) || ss.insertSheet(slot);
        if (sh.getLastRow() === 0) {
          head = ['timestamp'].concat(keys);
          sh.appendRow(head);
          sh.setFrozenRows(1);
        } else {
          head = sh.getRange(1, 1, 1, sh.getLastColumn()).getValues()[0].map(String);
          keys.forEach(function (k) {
            if (head.indexOf(k) === -1) { sh.getRange(1, head.length + 1).setValue(k); head.push(k); }
          });
        }
        props.setProperty(pkey, JSON.stringify(head));
      } finally {
        lock.releaseLock();
      }
    }

    /* ruta normal: sin lock, una sola llamada de escritura */
    var sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(slot);
    sheet.appendRow(head.map(function (h) {
      return h === 'timestamp' ? new Date() : (data[h] !== undefined ? data[h] : '');
    }));
    return json({ ok: true });
  } catch (err) {
    return json({ ok: false, error: String(err) });
  }
}

function doGet(e) {
  try {
    var slot = String((e && e.parameter && e.parameter.slot) || '').replace(/[^\w-]/g, '');
    if (!slot) return json({ ok: true, alive: true });

    var sh = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(slot);
    if (!sh || sh.getLastRow() < 2) return json({ ok: true, n: 0, rows: [] });

    var vals = sh.getRange(1, 1, sh.getLastRow(), sh.getLastColumn()).getValues();
    var head = vals[0].map(String);

    var keep = [];
    head.forEach(function (h, i) {
      var low = h.toLowerCase();
      var priv = PRIVATE.some(function (p) { return low.indexOf(p) > -1; });
      if (!priv && low !== 'timestamp') keep.push(i);
    });

    var rows = vals.map(function (r) {
      return keep.map(function (i) { return String(r[i] === null ? '' : r[i]); });
    });
    return json({ ok: true, n: rows.length - 1, rows: rows });
  } catch (err) {
    return json({ ok: false, error: String(err) });
  }
}

/** Borra la cabecera cacheada. Úsalo si cambias los campos de un
 *  formulario, o después de borrar pestañas de prueba.
 *  Ejecútalo a mano desde el editor. */
function limpiarCache() {
  PropertiesService.getScriptProperties().deleteAllProperties();
  return 'cache borrada';
}
