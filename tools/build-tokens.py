#!/usr/bin/env python3
"""Generate shared/tokens.css + shared/tokens.json from brand-data.json (the SSOT).
Rerun after any token change: python3 tools/build-tokens.py && python3 tools/sync-brand-data.py
"""
import json, collections, datetime

d = json.load(open('shared/brand-data.json'), object_pairs_hook=collections.OrderedDict)
T = d['tokens']
ver = d['meta'].get('version', '?')

CANON = ['forest','forestDeep','green','sage','walnut','orange','mint','cream','charcoal']
slug = {'forest':'heritage-green','forestDeep':'pine','green':'field-green','sage':'sage',
        'walnut':'walnut','orange':'signal-orange','mint':'mist','cream':'cream','charcoal':'ink'}

css = []
css.append(f"/* Billiard Factory design tokens · v{ver} · generated from brand-data.json — do not edit by hand. */")
css.append(":root{")
css.append("  /* ---- colour (9 values · 60/30/7/3 law: Cream+Mist 60 · Heritage+photo 30 · Walnut 7 · Orange 3) ---- */")
for k in CANON:
    t = T['color'][k]
    pms = f" · PMS {t['pms']}" if t.get('pms') else ''
    css.append(f"  --bf-{slug[k]}:{t['value']};  /* {t['name']}{pms} */")
css.append("")
css.append("  /* ---- type families ---- */")
for k, v in T['type'].items():
    css.append(f"  --bf-font-{k}:{v['stack']};")
css.append("")
css.append("  /* ---- type scale ---- */")
for s in T['scale']:
    n = s['name'].lower()
    css.append(f"  --bf-type-{n}-size:{s['size']};")
    css.append(f"  --bf-type-{n}-weight:{s['weight']};")
    css.append(f"  --bf-type-{n}-tracking:{s['tracking'] or '0'};")
    if s.get('leading'):  css.append(f"  --bf-type-{n}-leading:{s['leading']};")
css.append("")
if T.get('typography', {}).get('paragraphSpacing'):
    css.append(f"  --bf-paragraph-space:{T['typography']['paragraphSpacing']};")
css.append("  /* ---- spacing (4/8px base) · radius · rules ---- */")
grid = T.get('grid', {})
for name, val in grid.get('space', {}).items():
    css.append(f"  --bf-space-{name}:{val};")
for name, val in grid.get('radius', {}).items():
    css.append(f"  --bf-radius-{name}:{val};")
for name, val in grid.get('rule', {}).items():
    css.append(f"  --bf-rule-{name}:{val};")
motion = T.get('motion', {})
if motion:
    css.append("")
    css.append("  /* ---- motion ---- */")
    for name, val in motion.get('durations', {}).items():
        css.append(f"  --bf-dur-{name}:{val};")
    for name, val in motion.get('easings', {}).items():
        css.append(f"  --bf-ease-{name}:{val};")
css.append("}")
open('shared/tokens.css','w').write("\n".join(css) + "\n")

out = collections.OrderedDict()
out['$meta'] = {"brand":"Billiard Factory","version":ver,"generated":str(datetime.date.today()),
                "source":"shared/brand-data.json"}
out['color'] = {slug[k]: {kk: T['color'][k].get(kk) for kk in ('value','name','role','rgb','cmyk','pms') if T['color'][k].get(kk)} for k in CANON}
out['proportionLaw'] = T.get('proportionLaw')
out['type'] = T.get('type')
out['scale'] = T.get('scale')
if T.get('grid'): out['grid'] = T['grid']
if T.get('motion'): out['motion'] = T['motion']
json.dump(out, open('shared/tokens.json','w'), ensure_ascii=False, indent=2)
print('tokens.css:', len("\n".join(css)), 'bytes · tokens.json written')
