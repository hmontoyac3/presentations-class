# -*- coding: utf-8 -*-
"""Reparte cada clase en 9 equipos, mezclando procedencias.
Salida: CSV local (name,team,class) para pegar en la pestaña `teams` de la hoja.
Los nombres NO entran en el repositorio: es público."""
import openpyxl, io, random, unicodedata

wb = openpyxl.load_workbook('ISCRITTI_20941_2026-2027.xlsx', read_only=True)
ws = wb.active
rows = list(ws.iter_rows(values_only=True))
hdr = [str(c).strip() if c else '' for c in rows[1]]
ix = {h: i for i, h in enumerate(hdr)}
data = [r for r in rows[2:] if r and r[0]]

def tidy(s):
    s = ' '.join(str(s or '').split())
    return s.title()

CLASSES = [('44', 'fin'), ('41', 'afm')]
out_rows = []
summary = []

for cls, tag in CLASSES:
    sub = [r for r in data if str(r[ix['Classe Lezione']]) == cls]
    # mezclar por procedencia: se ordena por (viene de fuera, universidad previa)
    # y se reparte en round-robin, para que ningún equipo quede monocorde
    def key(r):
        return (str(r[ix['Estero']] or ''), str(r[ix['Universita Prov']] or ''), str(r[ix['Cognome']] or ''))
    sub.sort(key=key)
    rnd = random.Random(20941)          # determinista: mismo reparto cada vez
    # rotar dentro de cada bloque de 9 para que el orden alfabético no mande
    teams = [[] for _ in range(9)]
    for n, r in enumerate(sub):
        teams[n % 9].append(r)
    for t in teams:
        rnd.shuffle(t)
    sizes = []
    for tno, members in enumerate(teams, start=1):
        sizes.append(len(members))
        for r in members:
            name = tidy(r[ix['Nome']]) + ' ' + tidy(r[ix['Cognome']])
            out_rows.append((name, str(tno), tag))
    summary.append((cls, tag, len(sub), sizes))

    with io.open('teams_%s.csv' % tag, 'w', encoding='utf-8') as f:
        f.write('name,team,class\n')
        for name, tno, tg in out_rows:
            if tg == tag:
                f.write('"%s",%s,%s\n' % (name.replace('"', ''), tno, tg))

# TSV único para pegar de golpe en la pestaña `teams`
with io.open('teams_paste.tsv', 'w', encoding='utf-8') as f:
    f.write('name\tteam\tclass\n')
    for name, tno, tag in out_rows:
        f.write('%s\t%s\t%s\n' % (name, tno, tag))

for cls, tag, n, sizes in summary:
    print('clase %s (%s): %d estudiantes → equipos de %s' % (cls, tag, n, sizes))
print('filas totales:', len(out_rows))
