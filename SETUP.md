# Datos en vivo en el deck: cómo montarlo

**Por qué Google y no Microsoft.** Microsoft Forms no da un CSV público sin autenticación. Google Sheets sí: se publica una hoja concreta como CSV y la página la lee. Es el único camino limpio.

**Y un aviso importante:** el fetch **no funciona en la vista previa de claude.ai**, porque ahí una política de seguridad bloquea las peticiones externas. Funciona cuando despliegues `deck_friday.html` en GitHub Pages. En la vista previa verás los marcadores y el modo manual del panel D, que es el plan B.

---

## Montaje, una vez

### 1. Los formularios en Google Forms

Un formulario por momento de captura, o uno solo con secciones. Da igual: lo que importa es a qué hoja escriben.

### 2. Una hoja auxiliar por cada slot, con solo las columnas necesarias

Esto no es opcional y resuelve dos problemas a la vez.

En el libro de respuestas, crea una hoja nueva por slot y usa `QUERY` para traer **solo** las columnas que la slide necesita:

| Slot | Fórmula, ajustando las letras a tus columnas |
|---|---|
| `companies` | `=QUERY(Respuestas!A:F, "select C, D, E")` |
| `timing` | `=QUERY(Respuestas!A:F, "select F")` |
| `stories` | `=QUERY(Respuestas!A:F, "select C, D, E")` |
| `asymmetry` | `=QUERY(Respuestas!A:F, "select C, D, E, F")` |

**Los dos problemas que resuelve:**

- **Privacidad.** La hoja publicada es legible por cualquiera que tenga la URL. Si publicas la hoja de respuestas entera, publicas los correos institucionales y, en el caso del ejercicio de tríos, los nombres. Con la hoja auxiliar solo sale lo que hace falta.
- **Limpieza del recuento.** Si la página escanea todas las columnas, mezcla cosas: probando el parser, los rangos de tiempo aparecían contados como si fueran empresas. Hay un filtro de seguridad en el código, pero lo correcto es no darle basura que filtrar.

Para `stories`, si quieres que salgan los nombres en pantalla, inclúyelos; si no, empieza la selección en la columna de la idea.

### 3. Publicar cada hoja auxiliar como CSV

`Archivo > Compartir > Publicar en la web` → eliges **la hoja auxiliar**, no «todo el documento» → formato **CSV** → Publicar → copias la URL.

Queda con esta forma:
`https://docs.google.com/spreadsheets/d/e/2PACX-.../pub?gid=123456&single=true&output=csv`

### 4. Pegar las URLs en el deck

Abre `deck_friday.html` y busca el bloque `var LIVE = {`. Está al principio del script:

```js
var LIVE = {
  companies: '',   // QR 1 · dónde te gustaría trabajar
  timing:    '',   // QR 1 · cuánto tiempo se tarda
  stories:   '',   // QR 3 · nombres / idea / conflicto
  asymmetry: ''    // QR 7 · cuatro números
};
```

Pega cada URL entre las comillas. Los slots que dejes vacíos siguen funcionando en modo manual.

### 5. Desplegar en GitHub Pages

Repo nuevo, subes `deck_friday.html` (renómbralo `index.html` si quieres una URL corta), `Settings > Pages > Deploy from branch > main`. En un par de minutos tienes la URL.

---

## Cómo se comporta en clase

- **Refresca cada 8 segundos**, y solo mientras estás en una slide que usa datos. No hay peticiones de fondo el resto del tiempo.
- **Indicador abajo a la derecha:** `● en vivo` en verde si está leyendo bien, `● sin datos` en rojo si falla. Si no aparece nada, esa slide no usa datos en vivo.
- **Si falla la red, se queda con lo último que leyó** en vez de quedarse en blanco.
- **Tecla R** en la slide de las dos historias: saca otra pareja al azar.
- **El panel D sigue ahí** como plan B: si el CSV no responde, pegas a mano y sigues.

## Qué slots quedan pendientes

`companies`, `timing`, `stories` y `asymmetry` están implementados. Los otros momentos de captura (por qué dejaste de escuchar, el gráfico, la versión A o B, la frase de post-its, y los dos del No Small Talk) siguen en modo manual o proyectando la vista de la herramienta. Se pueden añadir con el mismo patrón cuando decidas cuáles quieres en vivo.

## Prueba antes del 11 de septiembre

Rellena tú misma cada formulario dos o tres veces, despliega, y abre la URL de Pages en el móvil y en el portátil. Lo que hay que verificar es que las URLs CSV responden con permiso de origen cruzado: Google lo da en contenido publicado, pero es lo único de todo el montaje que depende de un tercero y conviene comprobarlo con tiempo, no el viernes por la mañana.
