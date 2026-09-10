# Los cuatro vídeos

Están descargados y listos. **No se suben al repositorio** (`.gitignore`), porque
son material de terceros: viven solo en tu máquina.

| Archivo | Qué es | Dura | Slide |
|---|---|---|---|
| `bombas.mp4` | Bombas en Shark Tank | 5:14 | 26 |
| `ikea.mp4` | IKEA, *Lamp*, 2002 | 1:01 | 30 |
| `rosling.mp4` | Hans Rosling, 200 países, BBC | 4:47 | 44 |
| `marriott.mp4` | Marriott + Starwood, 2015 | 1:02 | 54 |

Los cuatro son **H.264 + AAC**, que es lo que reproduce cualquier navegador, y
llevan el índice al principio del archivo para que arranquen al instante.

## Cómo los usa el deck

Si el archivo está, se reproduce **desde el disco**: sin internet, sin YouTube y
sin depender del wifi del aula. Si no está, cae al reproductor de YouTube, y
debajo de cada vídeo hay además un enlace directo por si todo lo demás falla.

Abriendo el deck **como archivo** (`file://`) los vídeos locales funcionan y los
de YouTube no. Abriéndolo **por su dirección web** funcionan los dos. Con los
cuatro archivos ya descargados, las dos formas te sirven.

## Si alguna vez hay que rehacerlos

Hace falta `yt-dlp` (ya instalado con `python3 -m pip install yt-dlp`) y
`ffmpeg`. Los dos pasos importan: el primero fuerza H.264, y el segundo mueve el
índice al principio. Sin el segundo, el navegador se queda cargando para siempre.

```bash
cd media
python3 -m yt_dlp \
  -f "bv*[vcodec^=avc1][height<=720]+ba[acodec^=mp4a]/b[vcodec^=avc1]" \
  --merge-output-format mp4 -o "bombas.%(ext)s" \
  "https://www.youtube.com/watch?v=WpPhs7OipzQ"

ffmpeg -y -i bombas.mp4 -c copy -movflags +faststart _b.mp4 && mv _b.mp4 bombas.mp4
```

Los identificadores: `WpPhs7OipzQ` Bombas · `jU-cori12KU` IKEA ·
`jbkSRLYSojo` Rosling · `DDR_EBNuK3M` Marriott.

## Una trampa que ya me comí

Descargados sin forzar códec, tres salieron en **AV1**, que muchos navegadores no
decodifican. Y sin `+movflags faststart`, el índice queda al final del archivo y
el reproductor se queda colgado sin dar ningún error. Si algún día un vídeo
"carga y no pasa nada", es una de esas dos cosas.
