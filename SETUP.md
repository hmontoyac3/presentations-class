# Montaje: guardar respuestas y verlas en vivo

Una sola cosa que montar, y sirve para las dos.

## 1. El backend, cuatro pasos

1. Crea una **hoja de cálculo nueva** en Google Sheets. Vacía, no hace falta nada dentro.
2. **Extensiones > Apps Script.** Borra lo que haya y pega el contenido de `apps-script.gs`.
3. **Implementar > Nueva implementación > Aplicación web.**
   - Ejecutar como: **yo**
   - Quién tiene acceso: **cualquier usuario**
4. Copia la URL que acaba en `/exec`.

### La pantalla de «Google hasn't verified this app»

Sale siempre, y no es un error. Es tu propio script pidiéndote permiso a ti, y Google marca como no verificada cualquier app que no haya pasado su revisión para distribución a terceros.

**Advanced** → **Go to [nombre] (unsafe)** → **Allow**.

Dos cosas que conviene saber:

- **Tus estudiantes no la ven nunca.** Con «ejecutar como: yo» y «acceso: cualquier usuario», ellos solo mandan datos a una URL: sin cuenta de Google, sin iniciar sesión, sin autorizar nada.
- **Puedes reducir el permiso que pide.** En el editor: engranaje de *Configuración del proyecto* → marca **Mostrar archivo de manifiesto appsscript.json** → abre ese archivo y pega el contenido de `appsscript.json` de este repo. Eso limita el script a la hoja a la que está pegado, en vez de a todas tus hojas. Hazlo antes de desplegar.

## 2. Pega esa URL en dos sitios

| Archivo | Variable | Para qué |
|---|---|---|
| `f/form.js` | `ENDPOINT` | que los formularios guarden |
| `index.html` | `ENDPOINT` | que el deck lea en vivo |

Es la misma URL en los dos.

## 3. Ya está

No hay que publicar hojas, ni crear pestañas, ni escribir fórmulas. El script crea una pestaña por formulario la primera vez que alguien envía algo, y añade columnas si más adelante añades campos.

---

## Qué se actualiza en vivo

Cuatro slides leen datos solas, cada 8 segundos y solo mientras están en pantalla:

| Slide | Lee de | Qué pinta |
|---|---|---|
| Dónde te gustaría | q1 | el mapa de calor de reclutadores |
| TIP 3a | q1 | el rango de tiempo más votado |
| TIP 2, cosecha | q3 | dos historias al azar, tecla `R` para otra pareja |
| La asimetría | q7 | las cuatro medias |

Indicador abajo a la derecha: **● en vivo** en verde si está leyendo, **● sin datos** en rojo si falla. Si la red se cae, se queda con lo último que leyó.

El resto de las capturas se guardan igual, solo que su reveal no está automatizado: se proyecta desde la hoja o se pega en el panel `D`.

## Privacidad

El `GET` **nunca devuelve correos**: se filtran en el servidor, en la constante `PRIVATE` del script. Así que aunque alguien adivine la URL con `?slot=q3`, no saca identidades.

## Antes del 11 de septiembre

Rellena tú misma un par de formularios, abre el deck con `?teach` y comprueba que el indicador se pone verde en las cuatro slides de arriba. Es el único punto del montaje que depende de un tercero.

Si no quieres datos en vivo, deja `ENDPOINT` vacío en `index.html`: los QR y todo lo demás funcionan igual, y las cuatro slides se quedan en modo manual.
