# Archivos de vídeo y audio

Vacía a propósito: aquí no hay nada versionado, porque son archivos grandes y de
terceros. Se descargan a mano y se dejan con **estos nombres exactos**.

| Archivo | Qué es | Dónde sale |
|---|---|---|
| `rosling.mp4` | Hans Rosling, 200 países, 200 años, BBC. 4 min | TIP 3a |
| `reagan.mp3` | Reagan, discurso a la nación, 28 enero 1986. 4 min | Reagan |
| `bombas.mp4` | Bombas en Shark Tank, temporada 6 | Bombas |

## Cómo funciona

Cada slide con vídeo lleva una etiqueta así:

```html
<div class="media" data-file="media/rosling.mp4" data-yt="jbkSRLYSojo"></div>
```

El deck intenta el archivo local primero. **Si no está, cae al vídeo de YouTube
sin decir nada**, así que la clase se puede dar sin haber descargado nada.

El archivo local es mejor en un aula, por tres razones que se notan justo en el
peor momento: no depende de la wifi de Bocconi, no mete anuncios antes del clip,
y no se puede quedar «no disponible en este país» ni «el propietario no permite
incrustarlo».

Para `reagan.mp3`, si el archivo está sale un reproductor de **audio**, sin
imagen, que es lo que se quiere: obliga a escuchar. Si no está, el respaldo de
YouTube trae imagen.

## Detalles del reproductor

- Se monta al entrar en la slide y **se destruye al salir**, así que el sonido se
  corta solo al avanzar. No hay que acordarse de pausar.
- Un clic en el reproductor **ya no salta de slide**. Antes cualquier clic en la
  pantalla avanzaba, así que darle al play te cambiaba la slide.
- Con el foco en el reproductor, la barra espaciadora es play y pausa, no avanzar.
  Las flechas siguen navegando siempre.

## Los identificadores de YouTube

Los tres están **sin verificar**: se pusieron desde un entorno sin acceso a
YouTube. Hay que abrir las tres slides con el proyector una vez antes del
viernes. Para Reagan hay dos alternativas si la primera falla: `OkJZDxX4w6k` y
`ynuDA8A42Ic`.
