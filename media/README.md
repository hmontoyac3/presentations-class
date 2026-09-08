# Archivos de vídeo y audio

Vacía a propósito: son archivos grandes y de terceros, así que no van al
repositorio. Se descargan una vez y se dejan con **estos nombres exactos**.

| Archivo | Qué es | Dónde sale |
|---|---|---|
| `rosling.mp4` | Hans Rosling, 200 países, 200 años, BBC. 4 min | TIP 3a |
| `bombas.mp4` | Bombas en Shark Tank, temporada 6 | Bombas |
| `ikea.mp4` | IKEA, *Lamp*, 2002, de Spike Jonze. 60 s | TIP 2 |
| `marriott.mp4` | Marriott + Starwood, 2015. Arne Sorenson | Una operación, cuatro audiencias |

## Por qué el archivo local y no YouTube

El deck intenta el archivo primero y, si no está, cae al vídeo incrustado de
YouTube. Pero **algunos clips tienen la incrustación desactivada por su
propietario**: en esos, darle al play no reproduce, abre YouTube en otra
pestaña. Contra eso no hay parámetro que valga.

Con el archivo en `media/` eso desaparece: sale el reproductor del navegador,
dentro de la slide, y además deja de depender de la wifi del aula y de los
anuncios.

**Comprobado**: con el archivo presente, la slide monta un `<video>` nativo y
reproduce sin que aparezca ningún iframe de YouTube.

## Cómo descargarlos

Una vez, en el Terminal:

```bash
brew install yt-dlp
```

Y después, desde esta carpeta:

```bash
cd ~/Documents/Teaching/Behavioral_skills_seminar_/media

# Rosling · BBC
yt-dlp -f "bv*[height<=720][ext=mp4]+ba[ext=m4a]/b[ext=mp4]" \
       -o rosling.mp4 "https://www.youtube.com/watch?v=jbkSRLYSojo"

# Marriott + Starwood
yt-dlp -f "bv*[height<=720][ext=mp4]+ba[ext=m4a]/b[ext=mp4]" \
       -o marriott.mp4 "https://www.youtube.com/watch?v=DDR_EBNuK3M"

# Bombas · Shark Tank
yt-dlp -f "bv*[height<=720][ext=mp4]+ba[ext=m4a]/b[ext=mp4]" \
       -o bombas.mp4 "https://www.youtube.com/watch?v=WpPhs7OipzQ"

# IKEA · Lamp, el anuncio de TIP 2
yt-dlp -f "bv*[height<=720][ext=mp4]+ba[ext=m4a]/b[ext=mp4]" \
       -o ikea.mp4 "https://www.youtube.com/watch?v=jU-cori12KU"
```

De los cuatro, el de IKEA es el que **sí se ha comprobado que se deja
incrustar**: cargado dentro de una página real muestra el reproductor y el
vídeo correcto, sin error. Así que ese funciona aunque no lo descargues.

Si alguno da error de formato, `yt-dlp -F <url>` lista lo que hay y se elige
otro. Y si el vídeo no es el trozo correcto, se busca otro y se cambia solo el
identificador del `data-yt` en la etiqueta `.media` de esa slide, en
`index.html`.

720p sobra para proyectar y pesa la cuarta parte que 1080p.

## Ojo: no se suben al repositorio

`.gitignore` no los excluye todavía por nombre, pero **no los subas**: son de
terceros y pesan. Si quieres que git los ignore, añade `media/*.mp4` y
`media/*.mp3`.

## Detalles del reproductor

- Se monta al entrar en la slide y **se destruye al salir**, así que el sonido se
  corta solo al avanzar.
- Un clic en el reproductor **no salta de slide**, y con el foco puesto en él la
  barra espaciadora es play y pausa. Las flechas siguen navegando siempre.
- `reagan.mp3` sale como reproductor de audio, sin imagen, que es lo que se
  quiere ahí. Si falta y tira del respaldo de YouTube, entonces sí hay imagen.
