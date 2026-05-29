import os, glob

files = glob.glob('/Users/filipihadji/Documents/Meu Linux/meulinux---encontre-o-linux-ideal-11/src/components/*Simulator.tsx')

for file in files:
    with open(file, 'r', encoding='utf-8') as f:
        content = f.read()
    
    new_content = content.replace('https://meulinux.com/assets/musicas/', '/assets/')
    new_content = new_content.replace('https://meulinux.com/assets/Musicas/', '/assets/')
    new_content = new_content.replace('https://meulinux.com/musicas/', '/assets/')
    new_content = new_content.replace('http://meulinux.com/musicas/', '/assets/')
    
    new_content = new_content.replace('const MINT_APPS_DIR = \'https://raw.githubusercontent.com/linuxmint/mint-y-icons/master/usr/share/icons/Mint-Y/apps/96/\';', 'const MINT_APPS_DIR = \'/assets/\';')
    new_content = new_content.replace('const MINT_CATEGORIES_DIR = \'https://raw.githubusercontent.com/linuxmint/mint-y-icons/master/usr/share/icons/Mint-Y/categories/96/\';', 'const MINT_CATEGORIES_DIR = \'/assets/\';')
    new_content = new_content.replace('const MINT_PLACES_DIR = \'https://raw.githubusercontent.com/linuxmint/mint-y-icons/master/usr/share/icons/Mint-Y-Sand/places/96/\';', 'const MINT_PLACES_DIR = \'/assets/\';')
    
    if content != new_content:
        with open(file, 'w', encoding='utf-8') as f:
            f.write(new_content)
        print(f'Atualizado áudio e vars: {os.path.basename(file)}')
