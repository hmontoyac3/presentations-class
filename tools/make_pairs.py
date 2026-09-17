# -*- coding: utf-8 -*-
"""Reparte cada clase en grupos de 4 para el bloque de teoria del viernes.
NO son los equipos del proyecto: son deliberadamente otra gente, para que por
la tarde hayan hablado con quien no les va a tocar de equipo.

Publica f/groups.json con {hash del apellido: grupo}. Los nombres NO salen de
aqui: el repo es publico y en el fichero solo hay hashes."""
import csv, json, unicodedata, random, collections, os

SIZE = 4
HERE = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))

def norm(s):
    s = unicodedata.normalize('NFD', s.lower())
    return ''.join(c for c in s if c.isalpha() and ord(c) < 128)

def h(s):                                   # fnv1a + finalizador, 8 hex
    x = 2166136261
    for ch in s:
        x ^= ord(ch); x = (x * 16777619) & 0xFFFFFFFF
    x ^= x >> 16; x = (x * 0x85ebca6b) & 0xFFFFFFFF
    x ^= x >> 13; x = (x * 0xc2b2ae35) & 0xFFFFFFFF
    x ^= x >> 16
    return '%08x' % x

rows = list(csv.DictReader(open(os.path.join(HERE, 'teams_paste.tsv')), delimiter='\t'))
out, report = {}, []

for cls in ('fin', 'afm'):
    people = [r for r in rows if r['class'] == cls]
    # mezclar rompiendo el equipo de proyecto: round-robin sobre la lista de
    # equipos, para que ningun grupo de teoria repita companeros de equipo
    byteam = collections.defaultdict(list)
    for r in people:
        byteam[r['team']].append(r)
    rnd = random.Random(20941)
    for t in byteam.values():
        rnd.shuffle(t)
    order = []
    while any(byteam.values()):
        for t in sorted(byteam, key=int):
            if byteam[t]:
                order.append(byteam[t].pop())
    n = max(1, round(len(order) / SIZE))
    groups = collections.defaultdict(list)
    for i, r in enumerate(order):
        groups[i % n + 1].append(r)
    for g, members in groups.items():
        for i, r in enumerate(members):
            out.setdefault(cls, {})[h(norm(r['name'].split()[-1]))] = [g, 'AB'[i % 2]]
    sizes = sorted(len(v) for v in groups.values())
    same = sum(1 for m in groups.values()
               for i, a in enumerate(m) for b in m[i+1:] if a['team'] == b['team'])
    report.append(f'{cls}: {len(people)} personas, {n} grupos, tamanos {sizes[0]}-{sizes[-1]}, '
                  f'parejas que comparten equipo de proyecto: {same}')

json.dump(out, open(os.path.join(HERE, 'f', 'groups.json'), 'w'), separators=(',', ':'))
print('\n'.join(report))
print('-> f/groups.json  (solo hashes, sin nombres)')
