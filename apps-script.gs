/**
 * Backend de los formularios · Persuasive Presentations 20941
 *
 * Hace dos cosas con una sola URL:
 *   POST  → guarda una respuesta en la pestaña de su formulario
 *   GET   → devuelve las respuestas de un formulario, para el deck
 *
 * PERMISOS: en el editor, engranaje de Configuración del proyecto >
 * marca "Mostrar archivo de manifiesto appsscript.json", abre ese
 * archivo y pega el contenido de appsscript.json de este repo. Limita
 * el permiso a la hoja a la que está pegado el script y nada más.
 *
 * LA PANTALLA DE "GOOGLE HASN'T VERIFIED THIS APP" es normal: es tu
 * propio script pidiéndote permiso. Advanced > Go to ... (unsafe) >
 * Allow. Tus estudiantes NUNCA la ven: ellos solo mandan datos a una
 * URL, sin cuenta y sin autorizar nada.
 *
 * MONTAJE, una vez:
 *  1. Hoja de cálculo nueva en Google Sheets.
 *  2. Extensiones > Apps Script. Borra todo y pega esto.
 *  3. Implementar > Nueva implementación > Aplicación web
 *       Ejecutar como: yo
 *       Quién tiene acceso: cualquier usuario
 *  4. Copia la URL que acaba en /exec y pégala en DOS sitios:
 *       - f/form.js         variable ENDPOINT   (para guardar)
 *       - index.html        variable ENDPOINT   (para leer en vivo)
 *
 * El GET nunca devuelve correos: se filtran aquí, en el servidor.
 */

var PRIVATE = ['email', 'correo', 'mail'];

function doPost(e) {
  var lock = LockService.getScriptLock();
  lock.waitLock(20000);
  try {
    var data = JSON.parse(e.postData.contents);
    var slot = String(data.slot || 'sin-slot').replace(/[^\w-]/g, '');
    delete data.slot;

    var ss = SpreadsheetApp.getActiveSpreadsheet();
    var sh = ss.getSheetByName(slot) || ss.insertSheet(slot);

    var keys = Object.keys(data);
    if (sh.getLastRow() === 0) {
      sh.appendRow(['timestamp'].concat(keys));
      sh.setFrozenRows(1);
    }
    var head = sh.getRange(1, 1, 1, sh.getLastColumn()).getValues()[0];
    keys.forEach(function (k) {
      if (head.indexOf(k) === -1) { sh.getRange(1, head.length + 1).setValue(k); head.push(k); }
    });
    sh.appendRow(head.map(function (h) {
      return h === 'timestamp' ? new Date() : (data[h] !== undefined ? data[h] : '');
    }));
    return json({ ok: true });
  } catch (err) {
    return json({ ok: false, error: String(err) });
  } finally {
    lock.releaseLock();
  }
}

function doGet(e) {
  try {
    var slot = String((e && e.parameter && e.parameter.slot) || '').replace(/[^\w-]/g, '');
    if (!slot) return json({ ok: true, alive: true });

    var sh = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(slot);
    if (!sh || sh.getLastRow() < 2) return json({ ok: true, rows: [] });

    var vals = sh.getRange(1, 1, sh.getLastRow(), sh.getLastColumn()).getValues();
    var head = vals[0].map(function (h) { return String(h); });

    /* columnas que no salen nunca */
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

function json(obj) {
  return ContentService.createTextOutput(JSON.stringify(obj))
    .setMimeType(ContentService.MimeType.JSON);
}
