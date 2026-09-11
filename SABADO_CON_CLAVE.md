# El sábado va con clave

`saturday.html` ya no es el deck: es el deck **cifrado**. Sin la clave no
hay nada que leer, tampoco en «ver código fuente» ni descargando el
archivo. El navegador lo descifra en memoria cuando tú escribes la clave.

**Clave actual:** `20941-sabado`

La pide una vez por pestaña. Si recargas, no te la vuelve a pedir.

## Para cambiar la clave

```
cd ~/Documents/Teaching/Behavioral_skills_seminar_
python3 tools/cerrar_deck.py saturday.src.html saturday.html "la clave nueva"
git add -A && git commit -m "nueva clave del sabado" && git push
```

## Para editar el sábado

El original en claro es **`saturday.src.html`**, y no se sube a git. Se
edita ese, y después se vuelve a cifrar con el comando de arriba. Si
editas `saturday.html` directamente estarás editando el archivo cifrado,
que no sirve de nada.

## Cómo está cifrado

PBKDF2-HMAC-SHA256 con 300.000 iteraciones, y AES-256-GCM. Las dos cosas
las trae el navegador de serie, así que la página no carga ninguna
librería de fuera y funciona sin instalar nada.

Probar la clave a lo bruto sale caro: cada intento obliga a repetir las
300.000 iteraciones. Aun así, la seguridad real es la que tenga la clave;
una corta y adivinable no la salva el cifrado.

## Lo que esto NO tapa

1. **El historial de git.** El repositorio es público y `saturday.html`
   estuvo ahí en claro durante semanas. Cualquiera que sepa mirar el
   historial en GitHub puede sacar la versión vieja. Para cerrar eso hay
   que reescribir el historial y forzar el push, y aun así GitHub puede
   tardar en borrar los objetos antiguos.

2. **`run-sheet.html`** sigue abierto, y ahí está el plan de los dos días
   minuto a minuto. Se cierra igual:
   `python3 tools/cerrar_deck.py run-sheet.html run-sheet.html "la clave"`
   (haz antes una copia, que ese no tiene archivo `.src`).

3. **Los formularios de `f/`** siguen abiertos a propósito: son los que
   escanean los estudiantes.
