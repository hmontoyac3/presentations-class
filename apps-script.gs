/**
 * Backend de los formularios · Persuasive Presentations 20941
 *
 * MONTAJE, una vez:
 *  1. Crea una hoja de cálculo nueva en Google Sheets.
 *  2. Extensiones > Apps Script. Borra lo que haya y pega esto.
 *  3. Implementar > Nueva implementación > Aplicación web.
 *       Ejecutar como: yo
 *       Quién tiene acceso: cualquier usuario
 *  4. Copia la URL que acaba en /exec y pégala en f/form.js, variable ENDPOINT.
 *
 * Crea una pestaña por formulario automáticamente, con encabezados.
 */

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
    var row = head.map(function (h) {
      return h === 'timestamp' ? new Date() : (data[h] !== undefined ? data[h] : '');
    });
    sh.appendRow(row);
    return ok({ ok: true });
  } catch (err) {
    return ok({ ok: false, error: String(err) });
  } finally {
    lock.releaseLock();
  }
}

function doGet() {
  return ok({ ok: true, alive: true });
}

function ok(obj) {
  return ContentService.createTextOutput(JSON.stringify(obj))
    .setMimeType(ContentService.MimeType.JSON);
}
