# Antes de entrar al aula

## Los dos que arruinan el día entero si se olvidan

0. **Abre el deck por su dirección web, no haciendo doble clic al archivo.**
   `helenamontoyacalero.com/presentations-class/index.html?teach` y
   `.../saturday.html?teach`. Desde `file://` los vídeos de YouTube dan
   «Error 153», porque el navegador no le manda referente. El deck te avisa en
   pantalla si te pasa, y **debajo de cada vídeo hay un enlace directo a
   YouTube** que funciona siempre, así que nunca te quedas sin nada.

1. **La URL acaba en `?teach`.** Sin eso desaparecen las notas y el panel de datos, y no avisa. Comprueba que abajo a la derecha se ven los botones **Notas** y **Votos**.
2. **AFM: pulsa el botón AFM.** Arranca en FIN por defecto. Si no lo cambias proyectas la fecha, el horario, la lista de reclutadores, el hecho aburrido y el brief de la otra clase. Verifica que la primera slide dice **18 September**.

## Las teclas, mientras das clase

| | |
|---|---|
| `→` `espacio` | avanzar. En las slides por pasos saca el paso siguiente antes de cambiar de slide |
| `←` | atrás, paso a paso también |
| `t` | **cronómetro**: arranca y pausa. Está en las quince slides de ejercicio, arriba a la derecha |
| `T` | vuelve a poner el tiempo entero |
| `r` | en la cosecha de TIP 2, otra pareja. En el sábado, otras frases en el debrief |
| `]` `[` | **solo el sábado**: siguiente / anterior equipo en el ciclo de pitches |
| `n` `d` | notas y panel de datos |

El cronómetro se reinicia solo al cambiar de slide, así que cada ejercicio
empieza limpio. Al llegar a cero no se para: sigue contando en rojo con un más
delante, para que veas cuánto te has pasado. Un clic en él hace lo mismo que `t`
y no avanza de slide.

## Los dos decks

| | |
|---|---|
| Viernes | `index.html?teach` · 88 slides · sesiones 1–3 |
| Sábado | `saturday.html?teach` · 38 slides · sesiones 4–8 |

Son archivos separados a propósito: el sábado empieza en la slide 1 y no hay que
recorrer el viernes entero para llegar.

**El ciclo de pitches** (sesión 7) son tres slides que se repiten nueve veces:
pitch 30 → lista corta 31 → comentarios 32. Desde la de comentarios vuelves al pitch
con `←` dos veces, y `]` pasa al equipo siguiente. El número grande que se
proyecta es el contador, y va de 1 a 9.

En la de comentarios, **Draw two names** saca dos personas de la clase que no
sean del equipo que presenta. Se puede pulsar las veces que haga falta. Depende
de la pestaña `teams` de la hoja: ver `SETUP_TEAMS.md`.

## Falta rellenar

- [x] ~~Nueve equipos por clase~~ — hechos con `tools/make_teams.py`. FIN: ocho de 10 y uno de 9. AFM: siete de 9 y dos de 8. **Si falta gente, no se reorganizan**
- [ ] **Pegar `teams_paste.tsv` en la pestaña `teams`** de la hoja. Sin eso el sorteo de nombres del sábado cae al plan B. Ver `SETUP_TEAMS.md`
- [ ] **Vaciar la bandeja el viernes por la noche**: nueve correos, uno por equipo, con el problema elegido. Es lo único que te llevas del viernes
- [ ] Los ejemplos reales para el **recap** (slide 37 del sábado) — se apuntan en el break de las 16.15, no antes
- [x] ~~Los cuatro vídeos descargados~~ — están en `media/`, en H.264 y con faststart. Se reproducen desde el disco, sin internet
- [ ] Darles al play una vez con el proyector, para comprobar sonido y volumen
- [ ] La lista de los nueve equipos **impresa**, como respaldo por si se cae la red en la slide 67
- [ ] `ENDPOINT` en `f/form.js`, en `index.html` y en `saturday.html`, si quieres datos en vivo

## Al probar los formularios tú misma

Cada envío deja marcado ese formulario **en ese teléfono**, y al volver muestra «you already answered this one» en vez del formulario. Para desbloquearlos todos:

`.../presentations-class/f/?reset`

O el botón que aparece abajo del índice cuando hay alguno respondido. Hazlo antes del viernes o llegarás con tus propias pruebas marcadas.

Es una guarda por dispositivo, no un candado: borrando datos del sitio o en incógnito se salta. Sirve para evitar envíos dobles y para que el índice quede limpio.

## Material físico

- [ ] Una hoja A4 por equipo para interrogar el problema, el sábado a las 9.10
- [ ] El vaso con los papelitos, para sortear el orden de los pitches delante de ellos a las 14.10

## Comprobar el jueves

- [ ] Abrir las páginas de `f/` desde el móvil (17 en la lista; «Find your team» va la última, bajo *If you need it*). **Los formularios 13, 16 y 18 ya no se usan** y están en `parked/`
- [ ] **Borrar las dos filas de prueba de la pestaña `q17`** (equipos 1 y 2). Ojo: `q17` cambió de campos, así que las filas viejas no tienen `voter` ni `myteam`
- [ ] **Borrar entera la pestaña `q11`** y después ejecutar `limpiarCache()` a mano en el editor de Apps Script. El formulario 11 cambió de campos: la pestaña tiene una fila de prueba mía y dos columnas muertas (`opening`, `form`). Al borrarla se regenera limpia con el primer envío real
- [ ] Rellenar dos formularios y comprobar que el indicador se pone verde
- [ ] Probar el **form 17 dos veces seguidas** desde el mismo móvil: tiene que dejarte, porque el voto se emite nueve veces
- [ ] Probar **`f/teams.html`** desde el móvil, en las dos clases: es donde cada uno encuentra su número el viernes
- [ ] El botón **Draw two names** probado una vez, con la pestaña `teams` ya puesta
