PROYECTAR EL SEMINARIO DESDE OTRO ORDENADOR
===========================================

OPCION 1 · CON INTERNET (la buena, no necesitas esta carpeta)
-------------------------------------------------------------
Abre Chrome en el ordenador que sea y escribe:

  helenamontoyacalero.com/presentations-class/index.html?teach      <- VIERNES
  helenamontoyacalero.com/presentations-class/saturday.html?teach   <- SABADO
  helenamontoyacalero.com/presentations-class/run-sheet.html        <- guion minuto a minuto

EL ?teach AL FINAL ES OBLIGATORIO. Sin eso desaparecen tus notas y el
panel de datos en vivo, y no te avisa de nada.

No hay que instalar nada. Los videos salen de YouTube solos.
Los QR, los datos en vivo y la lista de equipos funcionan igual.


OPCION 2 · SIN INTERNET (para eso es esta carpeta)
--------------------------------------------------
Copia la carpeta entera al otro ordenador. Despues, en la Terminal:

  cd ruta/de/SEMINARIO_USB
  python3 -m http.server 8000

y en Chrome:  localhost:8000/index.html?teach

Asi los videos salen de la carpeta media/ y no dependen de YouTube ni
de la red del aula. PROBADO: los cuatro videos y los datos en vivo
funcionan por esta via.

Lo unico que necesita internet, aqui y en la opcion 1, son los datos en
vivo de los formularios, porque viven en la hoja de calculo. Si el aula
se queda sin red, el deck sigue entero y los videos tambien; solo las
slides de resultados se quedan esperando.

Si no puedes abrir una Terminal: haz doble clic en index.html. Todo se
ve y se navega, los videos de media/ se reproducen, pero los QR y los
datos en vivo no.


LO IMPRESCINDIBLE EN CLASE
--------------------------
  flechas o espacio   pasar de slide y revelar por pasos
  N                   tus notas
  D                   panel de datos en vivo (el boton dice "Votos")
  t minuscula         arrancar y parar el cronometro de un ejercicio
  T mayuscula         reiniciar ese cronometro
  R                   cambiar las respuestas que se proyectan
  Home / End          primera y ultima slide

Pantalla completa NO tiene tecla propia: es la del navegador.
  Mac      ctrl + cmd + F
  Windows  F11

Para ir directo a una slide, escribe su numero en la direccion:
  .../index.html?teach#53

Los videos NO arrancan solos: hay que darle al play.
Un clic en el lado derecho de la pantalla tambien avanza, y en el
izquierdo retrocede. Sobre un video no, para que puedas darle al play.
