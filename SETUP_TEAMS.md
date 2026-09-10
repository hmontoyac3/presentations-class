# Los equipos y el sorteo de nombres

## Por qué esto no vive en el repositorio

Los nueve equipos de cada clase se generan desde `ISCRITTI_20941_2026-2027.xlsx`,
que son **nombres de estudiantes**. Este repositorio es público, así que esos
nombres no se suben: viven en la **hoja de cálculo, que es privada**, y el deck
del sábado los lee desde ahí en tiempo real por el mismo endpoint que los
formularios.

`teams_fin.csv`, `teams_afm.csv` y `teams_paste.tsv` están en `.gitignore`.

## Un solo paso antes del viernes

1. Abre la hoja de cálculo donde caen los formularios.
2. Crea una pestaña nueva llamada exactamente **`teams`**.
3. Abre `teams_paste.tsv`, selecciona todo y pégalo en la celda **A1**.
   Son 168 filas más la cabecera, y las columnas ya salen separadas.

La cabecera tiene que quedar así, en minúsculas:

| name | team | class |
|---|---|---|
| Nombre Apellido | 1 | fin |

`class` es `fin` para la clase 44 y `afm` para la 41. El deck filtra por la
clase que tengas seleccionada con los botones de abajo, así que el sorteo de FIN
nunca saca a alguien de AFM.

## El reparto

| Clase | Estudiantes | Equipos |
|---|---|---|
| 44 · FIN | 89 | ocho de 10 y uno de 9 |
| 41 · AFM | 79 | siete de 9 y dos de 8 |

Se reparte mezclando procedencias: se ordena por si vienen de fuera y por
universidad previa, y se reparte en round-robin, de manera que ningún equipo
queda monocorde. El reparto es **determinista** (semilla fija), así que
`tools/make_teams.py` da siempre los mismos equipos.

**Si falta gente el día del seminario, los equipos no se tocan.** Se quedan los
nueve con el número de integrantes que sea. Reorganizar en el momento cuesta
quince minutos y rompe todo lo que depende del número de equipo.

## Cómo encuentran su equipo el viernes

En la slide 67 el reparto es: **el número lo da el móvil, el sitio lo da la
pantalla.**

Cada uno abre el enlace del día y entra en **Find your team**, la última
entrada de la lista, bajo «If you need it». Escribe su apellido y le sale un número del 1 al 9. La
pantalla, mientras tanto, muestra las nueve zonas de la sala, así que sabe a
dónde ir sin que nadie tenga que leer una lista en voz alta.

No va por Blackboard a propósito: para FIN es su primer fin de semana en Bocconi
y no todos lo tienen configurado. Y proyectar 89 nombres no se lee desde la fila
doce.

`f/teams.html` tampoco contiene los nombres: los pide a la pestaña `teams` al
cargar, igual que el sorteo del sábado. El buscador ignora mayúsculas y acentos,
y encuentra por apellido o por nombre de pila. Arranca en Finance, así que en
AFM hay que tocar el botón de la clase.

**Si se cae la red**, tú tienes la lista impresa y cantas los números por filas.

### El mapa de la sala no va en orden, y es a propósito

La fila de en medio va **6 · 5 · 4**, no 4-5-6:

```
      1   2   3
      6   5   4
      7   8   9
```

Así cada pareja del ensayo cruzado del sábado queda **pegada**: 1 con 2, 3 con
4 (uno encima del otro), 5 con 6, y el trío 7-8-9 comparte la fila de abajo.
Con el orden correlativo, el 3 y el 4 quedan en esquinas opuestas y el sábado a
la una y cuarto tienes a media sala cruzando el aula con las sillas.

Si cambias las parejas del ensayo, cambia también este mapa.

## El sorteo de nombres del sábado

En la slide de comentarios (sesión 7), el botón **Draw two names** saca dos
personas de la clase **excluyendo al equipo que está presentando**, que es para
lo que sirve la columna `team`. Se puede pulsar las veces que haga falta: si
alguien no está en la sala, vuelves a pulsar.

Si esa persona ya había mandado el formulario 17 para ese equipo, debajo de su
nombre aparece **lo que escribió**, así que no se queda en blanco.

**Si la pestaña `teams` no está puesta**, el sorteo no se rompe: cae al plan B y
sortea entre quienes ya han votado a ese equipo, usando el nombre que
escribieron en el formulario 17. Funciona igual, pero solo puede sacar a gente
que ya haya votado.

## Volver a generarlos

```
python3 tools/make_teams.py
```

Lee el Excel, escribe los tres archivos locales y no toca nada más.
