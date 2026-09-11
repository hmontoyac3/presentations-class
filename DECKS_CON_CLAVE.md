# Los dos decks van con clave

`index.html` y `saturday.html` ya no son los decks: son los decks
**cifrados**. Sin la clave no hay nada que leer, tampoco en «ver código
fuente» ni descargando el archivo. El navegador los descifra en memoria
cuando tú escribes la clave.

**La clave de los dos decks es `ñ`.** Una sola letra, la del teclado
español. Se escribe en un segundo delante de la clase, que es de lo que
se trata.

La pide una vez por pestaña. Si recargas, no te la vuelve a pedir.

Los formularios de `f/` siguen abiertos **a propósito**: son los que
escanean los estudiantes, y la página de la clave enlaza ahí por si algún
estudiante llega al deck por error.

## Para cambiar una clave

```
cd ~/Documents/Teaching/Behavioral_skills_seminar_
python3 tools/cerrar_deck.py index.src.html    index.html    "la clave nueva"
python3 tools/cerrar_deck.py saturday.src.html saturday.html "la clave nueva"
python3 tools/cerrar_deck.py index.src.html    ~/Desktop/SEMINARIO_USB/index.html    "la clave nueva"
python3 tools/cerrar_deck.py saturday.src.html ~/Desktop/SEMINARIO_USB/saturday.html "la clave nueva"
git add -A && git commit -m "nuevas claves" && git push
```

## Para editar los decks

Los originales en claro son **`index.src.html`** y **`saturday.src.html`**,
y no se suben a git. Se editan esos, y después se vuelven a cifrar con el
comando de arriba. Si editas `index.html` o `saturday.html` directamente
estarás editando el archivo cifrado, que no sirve de nada.

## Cómo están cifrados

PBKDF2-HMAC-SHA256 con 300.000 iteraciones, y AES-256-GCM. Las dos cosas
las trae el navegador de serie, así que la página no carga ninguna
librería de fuera y funciona sin instalar nada.

Probar la clave a lo bruto sale caro: cada intento obliga a repetir las
300.000 iteraciones. Aun así, **la seguridad real es la que tenga la
clave**, y `ñ` es una sola letra: para a quien llegue a la URL por
casualidad y a nadie más. Es una puerta cerrada, no una caja fuerte. Si
en algún momento quieres que lo sea de verdad, cámbiala con el comando
de arriba.

## Lo que esto NO tapa

1. **El historial de git.** El repositorio es público y los dos decks
   estuvieron ahí en claro durante semanas. Cualquiera que sepa mirar el
   historial en GitHub puede sacar una versión vieja. Para cerrar eso hay
   que reescribir el historial y forzar el push, y aun así GitHub puede
   tardar en borrar los objetos antiguos.

2. **`run-sheet.html`** sigue abierto, y ahí está el plan de los dos días
   minuto a minuto. Se cierra igual:
   `python3 tools/cerrar_deck.py run-sheet.html run-sheet.html "la clave"`
   (haz antes una copia, que ese no tiene archivo `.src`).
