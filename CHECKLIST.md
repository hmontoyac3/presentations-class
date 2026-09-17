# Antes de entrar al aula

> **AFM 18 de septiembre · el viernes es una versión nueva.** El deck del
> viernes se rehízo entero alrededor del ciclo experiencia → principio →
> práctica → feedback → repetición. Son **116 slides: 85 en el recorrido y 31
> en reserva** (de la 86 a la 116, se llega escribiendo `#93` en la dirección).
> El minutado está en `run-sheet.html`. **El sábado todavía no está rehecho.**
>
> Lo que cambia para ti, en corto:
>
> - **Va en negro.** El deck fuerza el tema oscuro, no hereda el del ordenador
>   del aula. Con `?light` vuelve al claro, que es lo que hay que usar para
>   imprimir o si el proyector lava los negros.
> - **Diez equipos en AFM**, no nueve. Nueve de 8 y uno de 7. Hay que volver a
>   pegar `teams_paste.tsv` en la pestaña `teams` de la hoja.
> - **Tres formularios nuevos**: 22 (qué fue lo difícil), 23 (misma información,
>   otra audiencia) y 24 (recuperación). Ya están en `f/` y en el índice.
> - **Ya no hacen falta papelitos.** El ejercicio de generar y agrupar con
>   notas sueltas está en la reserva.
> - **Esta noche, antes del viernes:** subir los cinco artículos a Blackboard
>   con el número de equipo al lado, y decidir qué audiencia y qué decisión
>   lleva cada uno. Es lo único que bloquea el sábado.
> - **La demostración en vivo de la slide 61** la haces tú y no necesita
>   preparación: el texto exacto y cómo hacer cada versión están en las notas.


## Los dos que arruinan el día entero si se olvidan

0. **Abre el deck por su dirección web, no haciendo doble clic al archivo.**
   `helenamontoyacalero.com/presentations-class/index.html?teach` y
   `.../saturday.html?teach`. Desde `file://` los vídeos de YouTube dan
   «Error 153», porque el navegador no le manda referente. El deck te avisa en
   pantalla si te pasa, y **debajo de cada vídeo hay un enlace directo a
   YouTube** que funciona siempre, así que nunca te quedas sin nada.

1. **Los dos decks piden clave**, una vez por pestaña, y la clave es la letra **`ñ`**. Los formularios de `f/` siguen abiertos, que son los de ellos. Todo en `DECKS_CON_CLAVE.md`
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
| Viernes | `index.html?teach` · 116 slides (85 + 31 de reserva) · sesiones 1–3 |
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

- [x] ~~Equipos~~ — hechos con `tools/make_teams.py`. FIN: nueve equipos, ocho de 10 y uno de 9. **AFM: diez equipos**, nueve de 8 y uno de 7, porque son cinco artículos y dos equipos por artículo. **Si falta gente, no se reorganizan**
- [ ] **Pegar `teams_paste.tsv` en la pestaña `teams`** de la hoja. Sin eso el sorteo de nombres del sábado cae al plan B. Ver `SETUP_TEAMS.md`
- [ ] **Subir los cinco artículos a Blackboard** el viernes por la noche, con el número de equipo al lado. En AFM ya no hay correo por equipo: no eligen problema, reciben artículo
- [ ] **Decidir la audiencia y la decisión de cada artículo**, que se las das el sábado por la mañana
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

- [x] ~~Papelitos para el ejercicio de TIP 4~~ — **ya no hacen falta**. Ese ejercicio está en la reserva (slides 96–97). Lo que se hace en su lugar, el sprint de la slide 63, va en el papel que cada uno lleve encima
- [ ] Una hoja A4 por equipo para interrogar el problema, el sábado a las 9.10
- [ ] El vaso con los papelitos, para sortear el orden de los pitches delante de ellos a las 14.10

## Comprobar el jueves

- [ ] Abrir las páginas de `f/` desde el móvil. **Los del viernes son ahora nueve**, en este orden: 1, 2, **22**, **23** · **24**, 3, 11 · 7, 10. Los que quedan bajo «Only if I ask for it» sólo se usan si recuperas un bloque de la reserva
- [ ] **Probar los tres nuevos**, `q22`, `q23` y `q24`, y comprobar que crean su pestaña en la hoja al primer envío. **Los formularios 13, 16 y 18 ya no se usan** y están en `parked/`
- [ ] **Borrar las dos filas de prueba de la pestaña `q17`** (equipos 1 y 2). Ojo: `q17` cambió de campos, así que las filas viejas no tienen `voter` ni `myteam`
- [ ] **Borrar las filas de prueba de `q19` y `q17`**: tres firmas `__TEST__ Firma 1/4/7` en `q19` y cuatro votos de `__TEST__ Helena Prueba` en `q17`. Son mías, de probar la parrilla de los nueve nombres y el recordatorio del formulario 20
- [ ] **Borrar enteras las pestañas `q11` y `q6`** y después ejecutar `limpiarCache()` a mano en el editor de Apps Script, UNA sola vez al final. Los dos formularios cambiaron de campos: `q11` tiene una fila de prueba mía y dos columnas muertas (`opening`, `form`), y `q6` tiene tres respuestas de prueba y le falta la columna `names`. Al borrarlas se regeneran limpias con el primer envío real
- [ ] Rellenar dos formularios y comprobar que el indicador se pone verde
- [ ] Probar el **form 17 dos veces seguidas** desde el mismo móvil: tiene que dejarte, porque el voto se emite nueve veces
- [ ] Probar **`f/teams.html`** desde el móvil, en las dos clases: es donde cada uno encuentra su número el viernes
- [ ] El botón **Draw two names** probado una vez, con la pestaña `teams` ya puesta
