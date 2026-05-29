import { PostInstallGuide } from './postInstallData';

export const POST_INSTALL_TRANSLATIONS: Record<string, PostInstallGuide[]> = {
  'pt-BR': [
    {
        "nome": "Ubuntu",
        "base": "Debian",
        "gerenciador_pacotes": "APT",
        "comandos_atualizacao": "sudo apt update && sudo apt upgrade -y",
        "explicacao_atualizacao": "Este comando atualiza a lista de pacotes e instala as novas versões disponíveis. O Ubuntu é a porta de entrada para muitos no Linux.",
        "drivers_adicionais": "Vá em 'Software e Atualizações' > 'Drivers Adicionais'. O Ubuntu facilita muito a instalação de drivers NVIDIA e outros proprietários.",
        "codecs_multimidia": "sudo apt install ubuntu-restricted-extras -y",
        "explicacao_codecs": "Instala codecs para MP3, MP4 e fontes da Microsoft.",
        "software_essencial": {
            "navegador": "Firefox (padrão). Para Chrome: baixe o .deb no site oficial.",
            "office": "LibreOffice (padrão).",
            "outros": "VLC, GIMP, Spotify (via Snap ou APT)."
        },
        "personalizacao": "Usa GNOME. Explore as Extensões do GNOME e as configurações de aparência.",
        "loja_aplicativos": "Ubuntu Software (Snap Store)."
    },
    {
        "nome": "Debian",
        "base": "Independente",
        "gerenciador_pacotes": "APT",
        "comandos_atualizacao": "sudo apt update && sudo apt upgrade -y",
        "explicacao_atualizacao": "O Debian foca em estabilidade. Este comando mantém seu sistema 'Stable' seguro.",
        "drivers_adicionais": "Certifique-se de ter 'non-free' e 'contrib' no seu sources.list para instalar drivers proprietários.",
        "codecs_multimidia": "sudo apt install libavcodec-extra -y",
        "explicacao_codecs": "Instala codecs extras para suporte multimídia completo.",
        "software_essencial": {
            "navegador": "Firefox ESR (padrão).",
            "office": "LibreOffice.",
            "outros": "VLC, GIMP."
        },
        "personalizacao": "Depende do ambiente escolhido (GNOME, KDE, XFCE).",
        "loja_aplicativos": "GNOME Software ou Synaptic."
    },
    {
        "nome": "Linux Mint",
        "base": "Ubuntu/Debian",
        "gerenciador_pacotes": "APT",
        "comandos_atualizacao": "sudo apt update && sudo apt upgrade -y",
        "explicacao_atualizacao": "O Mint possui um excelente Gerenciador de Atualizações gráfico, mas o terminal é sempre mais rápido.",
        "drivers_adicionais": "Use o 'Gerenciador de Drivers' do Mint. É um dos melhores do mundo Linux.",
        "codecs_multimidia": "sudo apt install mint-meta-codecs -y",
        "explicacao_codecs": "Instala todos os codecs necessários para uma experiência multimídia completa.",
        "software_essencial": {
            "navegador": "Firefox (padrão).",
            "office": "LibreOffice.",
            "outros": "VLC, GIMP, Spotify."
        },
        "personalizacao": "Cinnamon é o padrão. Explore os 'Applets' e 'Desklets'.",
        "loja_aplicativos": "Gerenciador de Aplicativos do Mint."
    },
    {
        "nome": "Fedora",
        "base": "Independente",
        "gerenciador_pacotes": "DNF",
        "comandos_atualizacao": "sudo dnf upgrade --refresh",
        "explicacao_atualizacao": "O Fedora traz as tecnologias mais recentes. Este comando atualiza tudo.",
        "drivers_adicionais": "Habilite os repositórios RPM Fusion para drivers NVIDIA e multimídia.",
        "codecs_multimidia": "sudo dnf groupinstall multimedia --setop=\"install_weak_deps=False\" --skip-broken",
        "explicacao_codecs": "Instala os grupos de pacotes multimídia do RPM Fusion.",
        "software_essencial": {
            "navegador": "Firefox (padrão).",
            "office": "LibreOffice.",
            "outros": "VLC, GIMP."
        },
        "personalizacao": "GNOME puro. Use o 'Ajustes do GNOME' (GNOME Tweaks).",
        "loja_aplicativos": "GNOME Software."
    },
    {
        "nome": "Kali Linux",
        "base": "Debian",
        "gerenciador_pacotes": "APT",
        "comandos_atualizacao": "sudo apt update && sudo apt full-upgrade -y",
        "explicacao_atualizacao": "Como é uma distro rolling release, o 'full-upgrade' é essencial.",
        "drivers_adicionais": "Drivers para placas Wi-Fi e GPUs são essenciais para pentest.",
        "codecs_multimidia": "sudo apt install libavcodec-extra -y",
        "explicacao_codecs": "Codecs padrão Debian.",
        "software_essencial": {
            "navegador": "Firefox (padrão).",
            "office": "Geralmente não é o foco, mas pode instalar LibreOffice.",
            "outros": "Burp Suite, Nmap, Metasploit (já vêm)."
        },
        "personalizacao": "XFCE é o padrão. Muito leve e funcional.",
        "loja_aplicativos": "Geralmente via terminal (APT)."
    },
    {
        "nome": "Arch Linux",
        "base": "Independente",
        "gerenciador_pacotes": "Pacman",
        "comandos_atualizacao": "sudo pacman -Syu",
        "explicacao_atualizacao": "Sincroniza e atualiza todo o sistema. Arch é rolling release.",
        "drivers_adicionais": "Instale os pacotes `nvidia` ou `mesa` conforme sua GPU.",
        "codecs_multimidia": "sudo pacman -S gst-plugins-good gst-plugins-bad gst-plugins-ugly gst-libav",
        "explicacao_codecs": "Plugins GStreamer para suporte total.",
        "software_essencial": {
            "navegador": "Firefox ou Chromium.",
            "office": "LibreOffice.",
            "outros": "Use o AUR (Arch User Repository) para quase tudo."
        },
        "personalizacao": "Você escolhe! KDE, GNOME, i3...",
        "loja_aplicativos": "Pacman (terminal) ou Pamac (GUI)."
    },
    {
        "nome": "Zorin OS",
        "base": "Ubuntu",
        "gerenciador_pacotes": "APT",
        "comandos_atualizacao": "sudo apt update && sudo apt upgrade -y",
        "explicacao_atualizacao": "Mantém seu Zorin estável e seguro.",
        "drivers_adicionais": "Use a ferramenta de drivers do Zorin nas configurações.",
        "codecs_multimidia": "sudo apt install zorin-os-restricted-extras -y",
        "explicacao_codecs": "Codecs multimídia otimizados para o Zorin.",
        "software_essencial": {
            "navegador": "Firefox (padrão).",
            "office": "LibreOffice.",
            "outros": "VLC, GIMP."
        },
        "personalizacao": "Zorin Appearance é a ferramenta chave para mudar o visual.",
        "loja_aplicativos": "Zorin Software Store."
    },
    {
        "nome": "Pop!_OS",
        "base": "Ubuntu",
        "gerenciador_pacotes": "APT",
        "comandos_atualizacao": "sudo apt update && sudo apt full-upgrade -y",
        "explicacao_atualizacao": "O Pop!_OS recomenda o full-upgrade para melhor compatibilidade.",
        "drivers_adicionais": "Se você baixou a ISO da NVIDIA, os drivers já estão lá!",
        "codecs_multimidia": "sudo apt install ubuntu-restricted-extras -y",
        "explicacao_codecs": "Codecs padrão Ubuntu.",
        "software_essencial": {
            "navegador": "Firefox (padrão).",
            "office": "LibreOffice.",
            "outros": "VLC, GIMP."
        },
        "personalizacao": "COSMIC Desktop. Explore o Auto-tiling!",
        "loja_aplicativos": "Pop!_Shop."
    }
  ]
};
