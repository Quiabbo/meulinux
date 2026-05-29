import os, re, glob

files = glob.glob('/Users/filipihadji/Documents/Meu Linux/meulinux---encontre-o-linux-ideal-11/src/components/*Simulator.tsx')

# Match githubusercontent and meulinux.com image links
# Ex: https://raw.githubusercontent.com/.../icon.png -> /assets/icon.png
pattern1 = re.compile(r'https://raw\.githubusercontent\.com/[a-zA-Z0-9_/-]+/([^/\"\']+\.(?:png|svg|jpg|jpeg|webp))')
pattern2 = re.compile(r'https://meulinux\.com/(?:[a-zA-Z0-9_/-]+/)?([^/\"\']+\.(?:png|svg|jpg|jpeg|webp))')

for file in files:
    with open(file, 'r', encoding='utf-8') as f:
        content = f.read()
    
    new_content = pattern1.sub(r'/assets/\1', content)
    new_content = pattern2.sub(r'/assets/\1', new_content)
    
    if content != new_content:
        with open(file, 'w', encoding='utf-8') as f:
            f.write(new_content)
        print(f'Atualizado: {os.path.basename(file)}')
