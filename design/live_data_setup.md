# Datos en vivo

Un solo repositorio, `hmontoyac3/presentations-class`, que es a la vez la fuente
y lo que se sirve en `helenamontoyacalero.com/presentations-class/`.

| Archivo | Qué es |
|---|---|
| `index.html` | el deck del viernes. Es lo que se proyecta |
| `run-sheet.html` | el minutado |
| `f/` | el hub y las doce páginas de formulario |
| `apps-script.gs` | el backend |
| `CHECKLIST.md` | la comprobación antes de entrar al aula |
| `design/` | el material de diseño, esto incluido |

Un cambio aquí se ve en clase en cuanto GitHub Pages reconstruye, un minuto más
o menos. No hay que copiar nada a ninguna parte.

**Una trampa que ya costó un rato:** una carpeta llamada `presentations-class`
dentro del repo `hmontoyac3.github.io` queda tapada por este repositorio y no se
sirve nunca, sin dar ningún error. Si algún día parece que un cambio no sube,
comprobar primero en qué repo se está trabajando.

## Cómo funcionan los datos en vivo

Tres piezas, y las tres existen y funcionan:

1. **El hub**, en `f/`. Un índice y doce páginas de formulario, `q1-fin`,
   `q1-afm`, `q2` a `q10` y `q11`, la apertura contrastada de TIP 3. Es donde aterrizan todos los QR del deck.
2. **Un Web App de Apps Script**, el código está en `apps-script.gs` de ese repo.
   `POST` con el JSON en el cuerpo guarda una respuesta, `GET ?slot=` devuelve las
   respuestas para el deck. Está pensado para 80 envíos simultáneos: solo bloquea
   la primera escritura de cada formulario, la que crea la cabecera.
3. **El deck**, que cada 8 segundos pide el slot de la slide viva.

Dos cosas que el backend ya resuelve en el servidor, y que por tanto no hay que
vigilar desde el deck:

- **No devuelve nunca los correos.** Se filtra cualquier columna con `email`,
  `correo` o `mail` en el nombre.
- **No devuelve la columna `timestamp`.** Importa más de lo que parece: el mapa de
  calor cuenta todas las celdas como nombres de empresa, y una fecha aparecería
  proyectada como si alguien quisiera trabajar en «2026-09-11».

## Lo que hay que saber para dar la clase

- **El `ENDPOINT` está en dos archivos** de ese repo, `f/form.js` e `index.html`,
  y tienen que ser idénticos. Hoy lo son.
- **Al actualizar el Apps Script**, usar *Gestionar implementaciones* y el lápiz
  de editar, con versión nueva. *Nueva implementación* da otra URL y habría que
  volver a pegarla en los dos archivos.
- **`q1` se separa por clase** y el hub tiene dos páginas para eso. De `q2` a
  `q10` las dos clases comparten pestaña, así que hay que vaciarlas entre el
  viernes de FIN y el de AFM, o AFM ve proyectadas las respuestas de FIN.
- **`limpiarCache`** en el editor de Apps Script, si se cambian los campos de un
  formulario o se borran pestañas de prueba.
- **`f/?reset`** desbloquea los formularios en un teléfono. Cada envío queda
  marcado en ese dispositivo, así que hay que hacerlo después de probar o llegas
  a clase con tus propias pruebas marcadas.
- **Refresca cada 8 segundos**, solo en slides con datos. Indicador abajo a la
  derecha, verde `● en vivo`. Si falla la red se queda con lo último que leyó.
- **El panel D es el plan B.** Se pega a mano y la clase sigue.
- **Tecla R** en la cosecha de TIP 2: otra pareja. Ya no cambia sola.

La lista de comprobación antes de entrar al aula es `CHECKLIST.md`, en el repo de
producción. No la dupliques aquí.
