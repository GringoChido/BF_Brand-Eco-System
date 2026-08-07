import json
d = open('shared/brand-data.json').read().strip()
json.loads(d)  # validate
open('shared/brand-data.js','w').write('/* AUTO-GENERATED from brand-data.json · the Single Source of Truth. */\nwindow.BF_DATA = ' + d + ';\n')
print('synced', len(d), 'bytes')
