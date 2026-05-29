import React, { useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';

const TRANSLATION_MAP: Record<string, string> = {
  // Shell / Desktop
  "Atividades": "Activities",
  "Atividade": "Activity",
  "Aplicativos": "Apps",
  "Iniciador": "Launcher",
  "Menu Iniciar": "Start Menu",
  "Menu": "Menu",
  "Pesquisar": "Search",
  "Pesquisa": "Search",
  "Configurações Rápidas": "Quick Settings",
  "Configurações rápidas": "Quick Settings",
  "Sinal de Wi-Fi": "Wi-Fi signal",
  "Notificação do Sistema": "System Notification",
  "Captura de tela salva": "Screenshot saved",
  "Captura de tela": "Screen Capture / Screenshot",
  "Mídia / Foto": "Media / Photo",
  "Teclado": "Keyboard",
  "Layout de Entrada": "Input Layout",

  // Core App Names
  "Arquivos": "Files",
  "Navegador": "Web Browser",
  "Navegador Web Firefox": "Firefox Web Browser",
  "Navegador Google Chrome": "Google Chrome",
  "Calculadora": "Calculator",
  "Configurações": "Settings",
  "Configurações do Sistema": "System Settings",
  "Painel de Controle": "Control Panel",
  "Terminal": "Terminal",
  "Ajuda do Ubuntu": "Ubuntu Help",
  "Ajuda": "Help",
  "Central de Aplicativos (App Center)": "App Center",
  "Central de Aplicativos": "App Center",
  "Lixeira": "Trash",

  // Nautilus / File manager Sidebar & Folder structures
  "Pasta Pessoal": "Home",
  "Pasta pessoal": "Home",
  "Área de Trabalho": "Desktop",
  "Área de trabalho": "Desktop",
  "Documentos": "Documents",
  "Imagens": "Pictures",
  "Imagem": "Picture",
  "Músicas": "Music",
  "Música": "Music",
  "Vídeos": "Videos",
  "Downloads": "Downloads",
  "Download": "Download",
  "Modelos": "Templates",
  "Público": "Public",
  "Público Compartilhado": "Public Share",
  "Dispositivos": "Devices",
  "Meu Computador": "My Computer",
  "Computador": "Computer",
  "Rede": "Network",
  "Remoto": "Remote",
  "Lixeira Vazia": "Trash is Empty",
  "Sua lixeira está limpa.": "Your trash is clean.",
  "Lixeira limpa!": "Trash cleared!",
  "Lixeira esvaziada com sucesso.": "Trash emptied successfully.",
  "Esvaziar Lixeira": "Empty Trash",
  "Esvaziar lixeira": "Empty trash",
  "Esvaziar": "Empty",
  "Mover para a Lixeira": "Move to Trash",
  "Mover para a lixeira": "Move to trash",
  "Restaurar item": "Restore item",
  "Restaurar": "Restore",
  "Abrir no Terminal": "Open in Terminal",
  "Criar Nova Pasta": "Create New Folder",
  "Nova Pasta": "New Folder",
  "Nova pasta": "New folder",
  "Pasta sem título": "Untitled folder",
  "Sem Título": "Untitled",
  "Sem título": "Untitled",
  "Propriedades": "Properties",
  "Excluir": "Delete",
  "Renomear": "Rename",
  "Renomear...": "Rename...",
  "Atualizar": "Update",

  // Right clicks, modals, dialogs
  "Nova Pasta...": "New Folder...",
  "Organizar Área de Trabalho": "Organize Desktop",
  "Organizar por nome": "Organize by name",
  "Organizar por tipo": "Organize by type",
  "Organizar por tamanho": "Organize by size",
  "Alterar plano de fundo...": "Change Desktop Wallpaper...",
  "Alterar plano de fundo": "Change Desktop Wallpaper",
  "Alterar Plano de Fundo": "Change Desktop Wallpaper",
  "Informações da simulação": "Simulation Information",
  "Esta é apenas uma simulação": "This is only an interactive web simulation",
  "Fechar": "Close",
  "Minimizar": "Minimize",
  "Maximizar": "Maximize",
  "Restaurar painel": "Restore Panel",
  "Fechar painel": "Close",
  "Parar": "Stop",
  "Reiniciar": "Restart",
  "Tentar novamente": "Try again",
  "Cancelar": "Cancel",
  "Confirmar": "Confirm",
  "Sucesso": "Success",
  "Erro": "Error",
  "Salvar": "Save",
  "Salvo": "Saved",
  "Abrir": "Open",
  "Novo": "New",
  "Mais": "More",
  "Menos": "Less",

  // Settings App panels
  "Aparência": "Appearance",
  "Fundo": "Background",
  "Informações do Sistema": "About",
  "Tela": "Display",
  "Resolução": "Resolution",
  "Brilho & Bloqueio": "Brightness & Lock",
  "Brilho e Bloqueio": "Brightness & Lock",
  "Estilo Escuro": "Dark Style",
  "Luz Noturna": "Night Light",
  "Não Perturbe": "Do Not Disturb",
  "Modo avião": "Airplane Mode",
  "Modo Avião": "Airplane Mode",
  "Bluetooth": "Bluetooth",
  "Notificações": "Notifications",
  "Bateria": "Battery",
  "Som": "Sound",
  "Dispositivo de Saída": "Output Device",
  "Volume do som": "Sound Volume",
  "Privacidade": "Privacy",
  "Sobre": "About",
  "Acessibilidade": "Accessibility",
  "Mostrar Lixeira na área de trabalho": "Show Trash on Desktop",
  "Ícones da Área de Trabalho": "Desktop Icons",
  "Tamanho do Ícone": "Icon Size",
  "Padrão": "Default",
  "Grande": "Large",
  "Pequeno": "Small",

  // System actions & Quick menus
  "Terminar sessão": "Shut Down / Log Out",
  "Terminar Sessão": "Shut Down / Log Out",
  "Desligar": "Power Off",
  "Desligar...": "Power Off...",
  "Reiniciar...": "Restart...",
  "Suspender": "Suspend",
  "Bloquear": "Lock",
  "Status": "Status",
  "Pronto": "Ready",
  "Carregando...": "Loading...",
  "Instalado": "Installed",
  "Instalar": "Install",
  "Remover": "Remove",
  "Volume": "Volume",
  "Brilho": "Brightness",
  "Conectado": "Connected",
  "Desconectado": "Disconnected",

  // Mint-specific Mint Menu Categories
  "Ferramentas": "Tools",
  "Administração": "Administration",
  "Preferências": "Preferences",
  "Acessórios": "Accessories",
  "Internet": "Internet",
  "Escritório": "Office",
  "Som e Vídeo": "Sound & Video",
  "Gráficos": "Graphics",
  "Todos os Aplicativos": "All Applications",
  "Todos os aplicativos": "All Applications",
  "Sair": "Log Out",
  "Desligar o Computador": "Shut Down",
  "Reiniciar o Computador": "Restart",
  "Suspender o Computador": "Suspend",

  // ChromeOS-specific Strings
  "Pesquisar no seu dispositivo, aplicativos, web...": "Search your device, apps, web...",
  "Aumentar volume": "Volume Up",
  "Diminuir volume": "Volume Down",
  "Brilho da tela": "Screen Brightness",

  // Rhythmbox
  "Músicas em reprodução": "Playing tracks",
  "Músicas adicionadas": "Added tracks",
  "Artista": "Artist",
  "Álbum": "Album",
  "Duração": "Duration",
  "Execuções": "Plays",
  "Lista de reprodução": "Playlist",
  "Playlist sem título": "Untitled playlist",
  "Nova de reprodução": "New Playlist",

  // General simulation info blocks
  "Esta é apenas uma simulação para que você possa experimentar e interagir antes de baixar a distribuição real.": "This is purely an interactive simulator so you can experience and interact with the OS before downloading the real distribution.",
  "Esta é uma simulação avançada": "This is an advanced simulation",
  "Todo o progresso do texto é salvo localmente de forma segura!": "All text progress is saved locally inside your sandbox container securely!",
  "Experimente o Ubuntu Linux diretamente no seu navegador!": "Experience Ubuntu Linux directly in your web browser!",
  "Simulador interativo de alta fidelidade": "High-fidelity interactive simulator",
  "Melhor experiência em modo paisagem ou desktop. Pode ser lento em celulares.": "Best experienced in landscape or desktop mode. Can be slow on mobile phones."
};

const translateNode = (node: Node) => {
  if (node.nodeType === Node.TEXT_NODE) {
    const original = node.nodeValue || '';
    const trimmed = original.trim();
    if (trimmed && TRANSLATION_MAP[trimmed]) {
      node.nodeValue = original.replace(trimmed, TRANSLATION_MAP[trimmed]);
    } else if (trimmed) {
      let updated = original;
      let changed = false;
      for (const [key, val] of Object.entries(TRANSLATION_MAP)) {
        if (key.length > 3 && updated.includes(key)) {
          // Use search/replace to match specific words/phrases safely
          updated = updated.replaceAll(key, val);
          changed = true;
        }
      }
      if (changed) {
        node.nodeValue = updated;
      }
    }
  }
};

const walkAndTranslate = (root: Node) => {
  if (root.nodeName === 'SCRIPT' || root.nodeName === 'STYLE' || root.nodeName === 'IFRAME') {
    return;
  }
  translateNode(root);
  if (root.childNodes) {
    root.childNodes.forEach(walkAndTranslate);
  }
};

interface SimulatorTranslatorProps {
  children: React.ReactNode;
}

export const SimulatorTranslator: React.FC<SimulatorTranslatorProps> = ({ children }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { i18n } = useTranslation();
  const isEn = i18n.language?.toLowerCase().startsWith('en');

  useEffect(() => {
    if (!isEn || !containerRef.current) return;

    const observe = () => {
      if (containerRef.current) {
        observer.observe(containerRef.current, {
          childList: true,
          subtree: true,
          characterData: true,
        });
      }
    };

    const observer = new MutationObserver((mutations) => {
      // Disconnect temporarily to prevent infinite loop on characterData updates
      observer.disconnect();
      
      mutations.forEach((mutation) => {
        if (mutation.type === 'characterData') {
          translateNode(mutation.target);
        } else if (mutation.type === 'childList') {
          mutation.addedNodes.forEach((node) => {
            walkAndTranslate(node);
          });
        }
      });
      
      observe();
    });

    // Run initial walkthrough
    walkAndTranslate(containerRef.current);
    observe();

    return () => {
      observer.disconnect();
    };
  }, [isEn]);

  return (
    <div ref={containerRef} className="contents w-full h-full">
      {children}
    </div>
  );
};
