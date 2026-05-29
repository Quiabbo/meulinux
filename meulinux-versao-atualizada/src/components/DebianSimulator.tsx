import React, { useState, useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { 
  X, Minus, Square, Minimize2, Maximize2, 
  Terminal as TermIcon, File, Folder, Globe, 
  HardDrive, Monitor, Settings as SettingsIcon, 
  Volume2, VolumeX, Wifi, Battery, Play, HelpCircle, Power, 
  Camera, Sun, Moon, Bluetooth, Bell, CornerDownLeft,
  ArrowLeft, ArrowRight, RotateCw, Search, Plus,
  Clock, Star, Trash2, Film, ChevronLeft, ChevronRight, Grid, Menu, List,
  Bookmark, Copy, ExternalLink, Shield, Check, Plane, BellOff, Gauge,
  RotateCcw, MoreVertical, Lock, ShieldAlert as ShieldCheck, AlertCircle, StarOff, Home,
  Music, Image, Download, ChevronDown, CheckCircle, Smartphone,
  Heart, SkipBack, SkipForward, Pause, Shuffle, Repeat
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

// Path prefix for genuine Debian custom icons loaded from user assets
const DEBIAN_ICONS = {
  folder: '/assets/folder (4).svg',
  documents: '/assets/folder-documents.svg',
  downloads: '/assets/folder-download.svg',
  pictures: '/assets/folder-pictures.svg',
  music: '/assets/folder-music.svg',
  videos: '/assets/folder-videos.svg',
  projects: '/assets/folder-projects.svg',
  public: '/assets/folder-publicshare.svg',
  templates: '/assets/folder-templates.svg',
  computer: '/assets/computer (4).svg',
  harddisk: '/assets/drive-harddisk.svg',
  avatar: '/assets/avatar-default.svg',
  webcam: '/assets/camera-web.svg',
  audio: '/assets/audio-headphones.svg',
  cert: '/assets/org.gnome.tweaks.svg',
  addon: '/assets/org.gnome.Extensions.svg',
  exec: '/assets/org.gnome.Console.svg',
  firmware: '/assets/org.gnome.Settings.svg',
};

// Map of Debian/Ubuntu/Lucide fallback lists
const DEBIAN_APP_ICONS: Record<string, string[]> = {
  firefox: [
    'firefox_browser_logo_icon_152991.png',
    'org.mozilla.Firefox.svg',
    'firefox.svg'
  ],
  evolution: [
    'email__org.gnome.Evolution.svg',
    'org.gnome.Evolution.svg'
  ],
  files: [
    'arquivos__org.gnome.Nautilus.svg',
    'arquivos__org.gnome.Nautilus.png',
    'org.gnome.Nautilus.svg',
    'folder.svg'
  ],
  software: [
    'software__org.gnome.Software.svg',
    'org.gnome.Software.svg'
  ],
  gedit: [
    'editor-de-texto__org.gnome.TextEditor.svg',
    'org.gnome.TextEditor.svg'
  ],
  calculator: [
    'calculadora__org.gnome.Calculator.svg',
    'org.gnome.Calculator.svg'
  ],
  rhythmbox: [
    'musica__org.gnome.Music.svg',
    'org.gnome.Music.svg'
  ],
  help: [
    'ajuda__org.gnome.Yelp.svg',
    'help.svg'
  ],
  terminal: [
    'org.gnome.Terminal.svg'
  ],
  settings: [
    'configuracoes__org.gnome.Settings.png',
    'org.gnome.Settings.svg'
  ],
  calendar: [
    'calendario__org.gnome.Calendar.svg',
    'org.gnome.Calendar.svg'
  ],
  clocks: [
    'relogios__org.gnome.clocks.svg',
    'org.gnome.clocks.svg'
  ],
  camera: [
    'camera__org.gnome.Snapshot.svg',
    'org.gnome.Cheese.svg'
  ],
  resources: [
    'org.gnome.SystemMonitor.svg'
  ]
};

// Safe and robust app icon component with automatic SVG fallbacks
const DockAppIcon: React.FC<{ src: string, alt: string, id: string; className?: string }> = ({ src, alt, id, className = "w-11 h-11" }) => {
  const rawUrls = DEBIAN_APP_ICONS[id] || [src];
  const urls = rawUrls.map(u => u.startsWith('http') || u.startsWith('/assets/') ? u : `/assets/${u}`);
  const [urlIndex, setUrlIndex] = useState(0);
  
  const getFallbackIcon = () => {
    switch (id) {
      case 'firefox':
        return <Globe className="text-blue-400 w-full h-full" />;
      case 'evolution':
        return <Bell className="text-teal-400 w-full h-full" />;
      case 'files':
        return <Folder className="text-yellow-500 w-full h-full" />;
      case 'software':
        return <Grid className="text-indigo-400 w-full h-full" />;
      case 'gedit':
        return <File className="text-emerald-400 w-full h-full" />;
      case 'calculator':
        return <Gauge className="text-purple-400 w-full h-full" />;
      case 'rhythmbox':
        return <Music className="text-cyan-400 w-full h-full" />;
      case 'help':
        return <HelpCircle className="text-blue-500 w-full h-full" />;
      case 'terminal':
        return <TermIcon className="text-green-400 w-full h-full" />;
      case 'settings':
        return <SettingsIcon className="text-zinc-400 w-full h-full" />;
      case 'calendar':
        return <Clock className="text-[#d70a53] w-full h-full" />;
      case 'clocks':
        return <Clock className="text-amber-500 w-full h-full" />;
      case 'camera':
        return <Camera className="text-rose-400 w-full h-full" />;
      case 'resources':
        return <Gauge className="text-orange-400 w-full h-full" />;
      default:
        return <Monitor className="text-zinc-500 w-full h-full" />;
    }
  };

  if (urlIndex >= urls.length) {
    return (
      <div className={`${className} flex items-center justify-center p-1.5 bg-white/5 rounded-xl border border-white/10 shrink-0`}>
        {getFallbackIcon()}
      </div>
    );
  }

  return (
    <img 
      src={urls[urlIndex]} 
      alt={alt} 
      className={`${className} object-contain pointer-events-none drop-shadow-md shrink-0 select-none`} 
      onError={() => setUrlIndex(urlIndex + 1)}
      referrerPolicy="no-referrer"
    />
  );
};

// Constant music tracks for Rhythmbox
const DUA_LIPA_ALBUM_TRAILER = [
  { id: 1, title: 'End Of An Era', file: '01 End Of An Era.mp3', duration: '3:42', plays: '245 mil' },
  { id: 2, title: 'Houdini', file: '02 Houdini.mp3', duration: '3:05', plays: '412 mil' },
  { id: 3, title: 'Training Season', file: '03 Training Season.mp3', duration: '3:29', plays: '350 mil' },
  { id: 4, title: 'These Walls', file: '04 These Walls.mp3', duration: '3:37', plays: '298 mil' },
  { id: 5, title: 'Whatcha Doing', file: '05 Whatcha Doing.mp3', duration: '3:18', plays: '180 mil' },
  { id: 6, title: 'French Exit', file: '06 French Exit.mp3', duration: '3:21', plays: '110 mil' },
  { id: 7, title: 'Illusion', file: '07 Illusion.mp3', duration: '3:08', plays: '320 mil' },
  { id: 8, title: 'Falling Forever', file: '08 Falling Forever.mp3', duration: '3:43', plays: '145 mil' },
  { id: 9, title: 'Anything For Love', file: '09 Anything For Love.mp3', duration: '2:21', plays: '90 mil' },
  { id: 10, title: 'Maria', file: '10 Maria.mp3', duration: '3:07', plays: '215 mil' }
];

// Radio stations like in Ubuntu Rhythmbox player
const RADIO_STATIONS = [
  { id: 1, title: 'Antena 1 FM Classicos', url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3', duration: 'Ao vivo', plays: 'Rádio Online' },
  { id: 2, title: 'Lofi Hip Hop Chilled', url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3', duration: 'Ao vivo', plays: 'Rádio Online' },
  { id: 3, title: 'Jovem Pan FM Hit Mix', url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3', duration: 'Ao vivo', plays: 'Rádio Online' },
  { id: 4, title: 'Metropolitana FM Dance', url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-4.mp3', duration: 'Ao vivo', plays: 'Rádio Online' },
  { id: 5, title: 'Alpha FM Lounge Club', url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-5.mp3', duration: 'Ao vivo', plays: 'Rádio Online' }
];

// Map of standard apps with Gnome look and feel
const CORE_APPS = [
  // --- Dock apps (everything up to help / settings) ---
  { id: 'firefox', name: 'Firefox ESR', icon: 'firefox_browser_logo_icon_152991.png' },
  { id: 'evolution', name: 'Evolution', icon: 'email__org.gnome.Evolution.svg' },
  { id: 'files', name: 'Arquivos', icon: 'arquivos__org.gnome.Nautilus.svg' },
  { id: 'software', name: 'Programas', icon: 'software__org.gnome.Software.svg' },
  { id: 'gedit', name: 'Editor de Texto', icon: 'editor-de-texto__org.gnome.TextEditor.svg' },
  { id: 'rhythmbox', name: 'Música', icon: 'musica__org.gnome.Music.svg' },
  { id: 'calculator', name: 'Calculadora', icon: 'calculadora__org.gnome.Calculator.svg' },
  { id: 'help', name: 'Ajuda', icon: 'ajuda__org.gnome.Yelp.svg' },
  { id: 'terminal', name: 'Terminal', icon: 'org.gnome.Terminal.svg' },
  { id: 'settings', name: 'Configurações', icon: 'configuracoes__org.gnome.Settings.png' },

  // --- Grid apps (dense applications menu matching screenshot/Adwaita suite) ---
  { id: 'contacts', name: 'Contatos', icon: 'contatos__org.gnome.Contacts.svg' },
  { id: 'weather', name: 'Meteorologia', icon: 'meteorologia__org.gnome.Weather.svg' },
  { id: 'clocks', name: 'Relógios', icon: 'relogios__org.gnome.clocks.svg' },
  { id: '2048', name: '2048', icon: '2048__org.gnome.TwentyFortyEight.svg' }, // fallback Five-or-more or input-gaming
  { id: 'maps', name: 'Mapas', icon: 'mapas__org.gnome.Maps.svg' },
  { id: 'scan', name: 'Digitalização', icon: 'digitalizador__org.gnome.SimpleScan.svg' },
  { id: 'akregator', name: 'Akregator', icon: 'akregator__akregator.svg' },
  { id: 'totem', name: 'Vídeos', icon: 'videos__org.gnome.Totem.png' },
  { id: 'camera', name: 'Câmera', icon: 'camera__org.gnome.Snapshot.svg' },
  { id: 'characters', name: 'Caracteres', icon: 'caracteres__org.gnome.Characters.svg' },
  { id: 'ark', name: 'Ark', icon: 'ark__ark.svg' },
  { id: 'tour', name: 'Tour', icon: 'tour__org.gnome.Tour.svg' },
  { id: 'brasero', name: 'Brasero', icon: 'media-optical.svg' },
  { id: 'calendar', name: 'Calendário', icon: 'calendario__org.gnome.Calendar.svg' },
  { id: 'snapshot', name: 'Captura de Tela', icon: 'captura-de-tela__org.gnome.Screenshot.svg' },
  { id: 'five_or_more', name: 'Cinco ou Mais', icon: 'cinco-ou-mais__org.gnome.five-or-more.png' },
  { id: 'tweaks', name: 'Ajustes', icon: 'org.gnome.tweaks.svg' },
  { id: 'gimp', name: 'GIMP', icon: 'org.gimp.GIMP.svg' },
  { id: 'blender', name: 'Blender', icon: 'org.blender.Blender.svg' },
  { id: 'inkscape', name: 'Inkscape', icon: 'org.inkscape.Inkscape.svg' },
  { id: 'vlc', name: 'VLC Media Player', icon: 'org.videolan.VLC.svg' },
  { id: 'discord', name: 'Discord', icon: 'com.discordapp.Discord.svg' },
  { id: 'slack', name: 'Slack', icon: 'com.slack.Slack.svg' },
  { id: 'spotify', name: 'Spotify', icon: 'com.spotify.Client.svg' },
  { id: 'vscode', name: 'VS Code', icon: 'vscode.svg' },
  { id: 'obsidian', name: 'Obsidian', icon: 'md.obsidian.Obsidian.svg' },
  { id: 'resources', name: 'Monitor do Sistema', icon: 'org.gnome.SystemMonitor.svg' },
  { id: 'thunderbird', name: 'Thunderbird', icon: 'org.mozilla.Thunderbird.svg' },
  { id: 'libreoffice_writer', name: 'LibreOffice Writer', icon: 'org.libreoffice.LibreOffice.writer.svg' },
  { id: 'libreoffice_calc', name: 'LibreOffice Calc', icon: 'org.libreoffice.LibreOffice.calc.svg' },
  { id: 'libreoffice_impress', name: 'LibreOffice Impress', icon: 'org.libreoffice.LibreOffice.impress.svg' },
  { id: 'timeshift', name: 'Timeshift', icon: 'timeshift.svg' },
  { id: 'qbittorrent', name: 'qBittorrent', icon: 'org.qbittorrent.qBittorrent.svg' },
  { id: 'audacity', name: 'Audacity', icon: 'org.audacityteam.Audacity.svg' },
  { id: 'kdenlive', name: 'Kdenlive', icon: 'org.kde.kdenlive.svg' },
  { id: 'baobab', name: 'Analisador de Disco', icon: 'org.gnome.baobab.svg' },
  { id: 'epiphany', name: 'Web (Epiphany)', icon: 'org.gnome.Epiphany.svg' },
  { id: 'evince', name: 'Visualizador PDF', icon: 'visualizador-documentos__org.gnome.Evince.svg' },
  { id: 'extensions', name: 'Extensões', icon: 'org.gnome.Extensions.svg' },
  { id: 'fonts', name: 'Fontes', icon: 'org.gnome.font-viewer.svg' },
  { id: 'logs', name: 'Logs', icon: 'org.gnome.Logs.svg' },
  { id: 'soundrecorder', name: 'Gravador de Som', icon: 'org.gnome.SoundRecorder.svg' },
];

interface WindowState {
  id: string;
  title: string;
  isOpen: boolean;
  isMaximized: boolean;
  zIndex: number;
  position: { x: number; y: number };
  size: { width: string | number; height: string | number };
}

interface FileItem {
  name: string;
  type: 'dir' | 'file';
  path: string;
  icon?: string;
  content?: string;
}

export const DebianSimulator: React.FC<{ onClose: () => void }> = ({ onClose }) => {
  const { i18n } = useTranslation();
  const currentLang = i18n.language?.toLowerCase().startsWith('en') ? 'en' : 'pt-br';

  // State
  const [booting, setBooting] = useState(true);
  const [activeWindows, setActiveWindows] = useState<WindowState[]>([]);
  const [topZIndex, setTopZIndex] = useState(10);
  const [currentWallpaper, setCurrentWallpaper] = useState('/assets/debian_13_wallpaper.svg');
  const [currentTime, setCurrentTime] = useState(new Date());
  
  // GNOME Shell state
  const [isOverviewOpen, setIsOverviewOpen] = useState(false);
  const [appSearch, setAppSearch] = useState('');
  const [menuPage, setMenuPage] = useState(0);
  const lastWheelTime = useRef(0);
  const [showStatusMenu, setShowStatusMenu] = useState(false);
  const [showCalendarMenu, setShowCalendarMenu] = useState(false);
  
  // Quick settings options
  const [wifiOn, setWifiOn] = useState(true);
  const [bluetoothOn, setBluetoothOn] = useState(true);
  const [notDisturb, setNotDisturb] = useState(false);
  const [nightLight, setNightLight] = useState(false);
  const [darkMode, setDarkMode] = useState(true);
  const [volume, setVolume] = useState(80);
  const [brightness, setBrightness] = useState(90);

  // Active terminal state
  const [terminalHistory, setTerminalHistory] = useState<string[]>([
    'Bem-vindo ao Debian GNU/Linux 13 (Trixie) simulado no meuLinux!',
    'Digite "neofetch" para informações do sistema ou "help" para ver os comandos.',
    ''
  ]);
  const [terminalInput, setTerminalInput] = useState('');
  const terminalBottomRef = useRef<HTMLDivElement>(null);

  // File Manager active directory & dynamic state
  const [fileSystem, setFileSystem] = useState<{ [path: string]: FileItem[] }>({
    '/home/usuario': [
      { name: 'Área de trabalho', type: 'dir', path: '/home/usuario/Área de trabalho', icon: DEBIAN_ICONS.projects },
      { name: 'Documentos', type: 'dir', path: '/home/usuario/Documentos', icon: DEBIAN_ICONS.documents },
      { name: 'Downloads', type: 'dir', path: '/home/usuario/Downloads', icon: DEBIAN_ICONS.downloads },
      { name: 'Imagens', type: 'dir', path: '/home/usuario/Imagens', icon: DEBIAN_ICONS.pictures },
      { name: 'Músicas', type: 'dir', path: '/home/usuario/Músicas', icon: DEBIAN_ICONS.music },
      { name: 'Vídeos', type: 'dir', path: '/home/usuario/Vídeos', icon: DEBIAN_ICONS.videos },
      { name: 'Público', type: 'dir', path: '/home/usuario/Público', icon: DEBIAN_ICONS.public },
      { name: 'Modelos', type: 'dir', path: '/home/usuario/Modelos', icon: DEBIAN_ICONS.templates },
    ],
    '/home/usuario/Documentos': [],
    '/home/usuario/Área de trabalho': [],
    '/home/usuario/Downloads': [],
    '/home/usuario/Imagens': [],
    '/home/usuario/Músicas': [],
    '/home/usuario/Vídeos': [],
    '/home/usuario/Público': [],
    '/home/usuario/Modelos': []
  });

  const [currentDirPath, setCurrentDirPath] = useState('/home/usuario');
  const [selectedFileItem, setSelectedFileItem] = useState<FileItem | null>(null);

  // Active editing text file in Text Editor
  const [editorFileName, setEditorFileName] = useState('Sem título.txt');
  const [editorContent, setEditorContent] = useState('');

  // Web Browser address & mock websites state
  const [browserUrl, setBrowserUrl] = useState('https://www.google.com/search?igu=1');
  const [browserInput, setBrowserInput] = useState('https://www.google.com/search?igu=1');
  const [browserSearchQuery, setBrowserSearchQuery] = useState('');
  const [browserHistory, setBrowserHistory] = useState<string[]>(['https://www.google.com/search?igu=1']);
  const [browserHistoryIndex, setBrowserHistoryIndex] = useState(0);
  const firefoxIframeRef = useRef<HTMLIFrameElement>(null);

  // Calculator state
  const [calcDisplay, setCalcDisplay] = useState('0');
  const [calcMemory, setCalcMemory] = useState<number | null>(null);
  const [calcOp, setCalcOp] = useState<string | null>(null);

  // Load simulate timer
  useEffect(() => {
    const timer = setTimeout(() => {
      setBooting(false);
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  // Real Audio engine states for Rhythmbox
  const [showSimInfoNotify, setShowSimInfoNotify] = useState(false);
  const [rhythmPlaying, setRhythmPlaying] = useState(false);
  const [rhythmTrack, setRhythmTrack] = useState(1); // Default to index 1 (Houdini)
  const [audioCurrentTime, setAudioCurrentTime] = useState(0);
  const [audioDuration, setAudioDuration] = useState(185); // Default to 185 (3:05)
  const [rhythmShuffle, setRhythmShuffle] = useState(false);
  const [rhythmRepeat, setRhythmRepeat] = useState(false);
  const [rhythmLiked, setRhythmLiked] = useState<boolean[]>(() => new Array(11).fill(false));
  const [rhythmAudioMode, setRhythmAudioMode] = useState<'online' | 'local'>('local');
  const [audioAttempt, setAudioAttempt] = useState(0);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  // Sync OS-wide volume with audio element volume
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume / 100;
    }
  }, [volume]);

  // Show simulation note after boot completing
  useEffect(() => {
    if (!booting) {
      const t = setTimeout(() => {
        setShowSimInfoNotify(true);
      }, 1500);
      return () => clearTimeout(t);
    }
  }, [booting]);

  // High fidelity URL fallback logic for Rhythmbox
  const getTrackSources = (trackIdx: number) => {
    const file = DUA_LIPA_ALBUM_TRAILER[trackIdx].file;
    const baseName = file.substring(0, file.lastIndexOf('.'));
    const demoUrl = `https://www.soundhelix.com/examples/mp3/SoundHelix-Song-${(trackIdx % 16) + 1}.mp3`;
    
    if (rhythmAudioMode === 'online') {
      return [demoUrl];
    }
    
    const formats = ['.mp3', '.m4a'];
    const sources: string[] = [];
    
    formats.forEach(ext => {
      const formattedFilename = `${baseName}${ext}`;
      const enc = encodeURIComponent(formattedFilename);

      // Prefer local assets first
      sources.push(`/assets/Dua Lipa/${enc}`);
      sources.push(`/assets/musicas/${enc}`);
      sources.push(`/assets/Musicas/${enc}`);
      sources.push(`./assets/musicas/${enc}`);
      sources.push(`./assets/Musicas/${enc}`);
      sources.push(`/musicas/${enc}`);
      sources.push(`/Musicas/${enc}`);

      // Fall back to hosted copies if local not available
      sources.push(`/assets/${enc}`);
      sources.push(`/assets/${enc}`);
      sources.push(`/assets/${enc}`);
      sources.push(`/assets/${enc}`);
    });
    
    sources.push(demoUrl);
    return sources;
  };

  const playTrack = (idx: number) => {
    setRhythmTrack(idx);
    setAudioAttempt(0);
    setRhythmPlaying(true);
    
    const audio = audioRef.current;
    if (audio) {
      const sources = getTrackSources(idx);
      audio.src = sources[0];
      audio.load();
      audio.play().catch(err => {
        console.warn("Direct play failed during gesture:", err);
      });
    }
  };

  const togglePlay = () => {
    const audio = audioRef.current;
    if (!audio) return;
    
    if (rhythmPlaying) {
      audio.pause();
      setRhythmPlaying(false);
    } else {
      audio.play().then(() => {
        setRhythmPlaying(true);
      }).catch(err => {
        console.warn("Playback initialization failed:", err);
        setRhythmPlaying(true);
      });
    }
  };

  const nextTrack = () => {
    const nextIdx = rhythmShuffle 
      ? Math.floor(Math.random() * DUA_LIPA_ALBUM_TRAILER.length)
      : (rhythmTrack + 1) % DUA_LIPA_ALBUM_TRAILER.length;
    playTrack(nextIdx);
  };

  const prevTrack = () => {
    const prevIdx = (rhythmTrack - 1 + DUA_LIPA_ALBUM_TRAILER.length) % DUA_LIPA_ALBUM_TRAILER.length;
    playTrack(prevIdx);
  };

  const handleAudioError = () => {
    const audio = audioRef.current;
    if (!audio) return;
    
    const sources = getTrackSources(rhythmTrack);
    const nextAttempt = audioAttempt + 1;
    
    if (nextAttempt < sources.length) {
      setAudioAttempt(nextAttempt);
      audio.src = sources[nextAttempt];
      audio.load();
      if (rhythmPlaying) {
        audio.play().catch(err => {
          console.warn("Auto-play on fallback path failed:", err);
        });
      }
    }
  };

  const handleProgressClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const width = rect.width;
    const percentage = clickX / width;
    const audio = audioRef.current;
    if (audio) {
      audio.currentTime = percentage * audioDuration;
    }
  };

  // Time updater
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  // Format date correctly in Portuguese & English
  const formatTime = () => {
    return currentTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  const formatDate = () => {
    const options: Intl.DateTimeFormatOptions = { weekday: 'short', day: 'numeric', month: 'short' };
    return currentTime.toLocaleDateString(currentLang === 'pt-br' ? 'pt-BR' : 'en-US', options);
  };

  const getFullHeaderDate = () => {
    const options: Intl.DateTimeFormatOptions = { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' };
    return currentTime.toLocaleDateString(currentLang === 'pt-br' ? 'pt-BR' : 'en-US', options);
  };

  // Launch application helper
  const openApp = (appId: string, customConfig?: Partial<WindowState>) => {
    // Close Overview when launching app
    setIsOverviewOpen(false);

    const existing = activeWindows.find(w => w.id === appId);
    if (existing) {
      // Pull to front
      const nextZ = topZIndex + 1;
      setTopZIndex(nextZ);
      setActiveWindows(activeWindows.map(w => w.id === appId ? { ...w, zIndex: nextZ, isOpen: true } : w));
      return;
    }

    const appInfo = CORE_APPS.find(a => a.id === appId) || { name: appId };
    const nextZ = topZIndex + 1;
    setTopZIndex(nextZ);

    let defaultWidth = 720;
    let defaultHeight = 480;
    if (appId === 'calculator') {
      defaultWidth = 340;
      defaultHeight = 490;
    } else if (appId === 'terminal') {
      defaultWidth = 650;
      defaultHeight = 400;
    }

    const newWindow: WindowState = {
      id: appId,
      title: appInfo.name,
      isOpen: true,
      isMaximized: false,
      zIndex: nextZ,
      position: { x: 80 + (activeWindows.length * 25), y: 60 + (activeWindows.length * 20) },
      size: { width: defaultWidth, height: defaultHeight },
      ...customConfig
    };

    setActiveWindows([...activeWindows, newWindow]);
  };

  const closeApp = (appId: string) => {
    setActiveWindows(activeWindows.filter(w => w.id !== appId));
  };

  const toggleMaximize = (appId: string) => {
    setActiveWindows(activeWindows.map(w => w.id === appId ? { ...w, isMaximized: !w.isMaximized } : w));
  };

  const navigateBrowser = (targetUrl: string) => {
    let url = targetUrl.trim();
    if (!url) return;

    if (!url.startsWith('http://') && !url.startsWith('https://')) {
      if (url.includes('.') && !url.includes(' ')) {
        url = 'https://' + url;
      } else {
        url = `https://www.google.com/search?q=${encodeURIComponent(url)}&igu=1`;
      }
    } else if (url.includes('google.com')) {
      if (!url.includes('igu=1')) {
        url = url.replace('google.com/search?', 'google.com/search?igu=1&');
        if (!url.includes('igu=1')) {
          url = url + (url.includes('?') ? '&' : '?') + 'igu=1';
        }
      }
    }

    const nextHistory = browserHistory.slice(0, browserHistoryIndex + 1);
    nextHistory.push(url);
    setBrowserHistory(nextHistory);
    setBrowserHistoryIndex(nextHistory.length - 1);
    setBrowserUrl(url);
    setBrowserInput(url);
  };

  const goBackBrowser = () => {
    if (browserHistoryIndex > 0) {
      const nextIdx = browserHistoryIndex - 1;
      setBrowserHistoryIndex(nextIdx);
      setBrowserUrl(browserHistory[nextIdx]);
      setBrowserInput(browserHistory[nextIdx]);
    }
  };

  const goForwardBrowser = () => {
    if (browserHistoryIndex < browserHistory.length - 1) {
      const nextIdx = browserHistoryIndex + 1;
      setBrowserHistoryIndex(nextIdx);
      setBrowserUrl(browserHistory[nextIdx]);
      setBrowserInput(browserHistory[nextIdx]);
    }
  };

  const goHomeBrowser = () => {
    navigateBrowser('https://www.google.com/search?igu=1');
  };

  const focusApp = (appId: string) => {
    const nextZ = topZIndex + 1;
    setTopZIndex(nextZ);
    setActiveWindows(activeWindows.map(w => w.id === appId ? { ...w, zIndex: nextZ } : w));
  };

  // Terminal bash simulator
  const executeCommand = (cmdStr: string) => {
    const trimmed = cmdStr.trim();
    if (!trimmed) return;

    const parts = trimmed.split(' ');
    const mainCmd = parts[0].toLowerCase();
    const args = parts.slice(1);

    const newHistory = [...terminalHistory, `usuario@debian:~$ ${cmdStr}`];

    switch (mainCmd) {
      case 'help':
        newHistory.push(
          'Comandos disponíveis:',
          '  neofetch      - Exibe informações do sistema com logo do Debian',
          '  ls            - Lista arquivos no diretório atual',
          '  cd <dir>      - Entra em um diretório',
          '  cat <arquivo> - Exibe o conteúdo de um arquivo de texto',
          '  uname -a      - Mostra informações do kernel',
          '  whoami        - Exibe o usuário atual',
          '  uptime        - Tempo de atividade do terminal',
          '  date          - Mostra a data e hora atual',
          '  clear         - Limpa todo o terminal'
        );
        break;
      case 'clear':
        setTerminalHistory([]);
        setTerminalInput('');
        return;
      case 'neofetch':
        newHistory.push(
          `         _,._          usuario@debian`,
          `       / \\_/ \\         --------------`,
          `      |   |   |        SO: Debian GNU/Linux Trixie (13.0)`,
          `      |   |   |        Kernel: Linux 6.12.0-amd64`,
          `       \\_ _ _/         Tempo de atividade: ${Math.floor(performance.now() / 60000) + 1} mins`,
          `         | |           Resolução: 1920x1080`,
          `        _|_|_          DE: GNOME 47.0`,
          `       (     )         Gerenciador de Janelas: Mutter (Wayland)`,
          `        \\___/          Tema: Adwaita-dark`,
          `                       Ícones: Debian-Logo-Pack`,
          `                       Terminal: GNOME Terminal`,
          `                       CPU: Intel i7-13700H @ 4.7GHz`,
          `                       GPU: Intel Iris Xe Graphics`,
          `                       Memória: 3840MiB / 16384MiB (23%)`
        );
        break;
      case 'ls':
        const filesInDir = fileSystem[currentDirPath] || [];
        if (filesInDir.length === 0) {
          newHistory.push('[Diretório Vazio]');
        } else {
          const names = filesInDir.map(f => f.type === 'dir' ? `\x1b[34m${f.name}/\x1b[0m` : f.name);
          newHistory.push(names.join('   '));
        }
        break;
      case 'cd':
        if (!args[0] || args[0] === '~') {
          setCurrentDirPath('/home/usuario');
          newHistory.push('Entrou no diretório /home/usuario');
        } else {
          const target = args[0];
          const matchedDir = (fileSystem[currentDirPath] || []).find(f => f.name.toLowerCase() === target.toLowerCase() && f.type === 'dir');
          if (matchedDir) {
            setCurrentDirPath(matchedDir.path);
            newHistory.push(`Entrou no diretório: ${matchedDir.path}`);
          } else if (target === '..') {
            if (currentDirPath === '/home/usuario') {
              newHistory.push('Já está na raiz de usuário (~).');
            } else {
              setCurrentDirPath('/home/usuario');
              newHistory.push('Retornou para ~');
            }
          } else {
            newHistory.push(`cd: pasta não encontrada: ${target}`);
          }
        }
        break;
      case 'cat':
        if (!args[0]) {
          newHistory.push('Uso: cat <nome_do_arquivo>');
        } else {
          const targetFile = (fileSystem[currentDirPath] || []).find(f => f.name.toLowerCase() === args[0].toLowerCase() && f.type === 'file');
          if (targetFile) {
            newHistory.push(targetFile.content || '');
          } else {
            newHistory.push(`cat: arquivo não encontrado: ${args[0]}`);
          }
        }
        break;
      case 'uname':
        if (args[0] === '-a') {
          newHistory.push('Linux debian 6.12.0-amd64 #1 SMP PREEMPT_DYNAMIC Debian 6.12.3-1 x86_64 GNU/Linux');
        } else {
          newHistory.push('Linux');
        }
        break;
      case 'whoami':
        newHistory.push('usuario');
        break;
      case 'uptime':
        newHistory.push(`up 1:04, 1 user, load average: 0.24, 0.15, 0.08`);
        break;
      case 'date':
        newHistory.push(new Date().toString());
        break;
      default:
        newHistory.push(`bash: comando não encontrado: ${mainCmd}. Digite "help" para ver comandos.`);
    }

    newHistory.push('');
    setTerminalHistory(newHistory);
    setTerminalInput('');
    
    setTimeout(() => {
      terminalBottomRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, 50);
  };

  // Calculator helper operations
  const handleCalcNum = (num: string) => {
    if (calcDisplay === '0') {
      setCalcDisplay(num);
    } else {
      setCalcDisplay(calcDisplay + num);
    }
  };

  const handleCalcOp = (op: string) => {
    setCalcMemory(parseFloat(calcDisplay));
    setCalcOp(op);
    setCalcDisplay('0');
  };

  const handleCalcEqual = () => {
    if (calcMemory === null || calcOp === null) return;
    const currentVal = parseFloat(calcDisplay);
    let result = 0;
    
    switch (calcOp) {
      case '+': result = calcMemory + currentVal; break;
      case '-': result = calcMemory - currentVal; break;
      case '*': result = calcMemory * currentVal; break;
      case '/': result = calcMemory / currentVal; break;
    }
    setCalcDisplay(result.toString());
    setCalcMemory(null);
    setCalcOp(null);
  };

  const clearCalc = () => {
    setCalcDisplay('0');
    setCalcMemory(null);
    setCalcOp(null);
  };

  // Drag simulation helpers
  const handleDragStart = (e: React.MouseEvent, appId: string) => {
    focusApp(appId);
    const win = activeWindows.find(w => w.id === appId);
    if (!win || win.isMaximized) return;

    const startX = e.clientX;
    const startY = e.clientY;
    const initialX = win.position.x;
    const initialY = win.position.y;

    const handleMouseMove = (moveEvent: MouseEvent) => {
      const deltaX = moveEvent.clientX - startX;
      const deltaY = moveEvent.clientY - startY;

      setActiveWindows(prev => prev.map(w => w.id === appId ? {
        ...w,
        position: {
          x: Math.max(0, Math.min(window.innerWidth - 300, initialX + deltaX)),
          y: Math.max(30, Math.min(window.innerHeight - 150, initialY + deltaY))
        }
      } : w));
    };

    const handleMouseUp = () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseup', handleMouseUp);
  };

  // Window resizing states and helpers
  const [activeResizeId, setActiveResizeId] = useState<string | null>(null);
  const resizingRef = useRef<{
    id: string;
    direction: string;
    initialX: number;
    initialY: number;
    initialWinX: number;
    initialWinY: number;
    initialWidth: number;
    initialHeight: number;
  } | null>(null);

  const startResize = (id: string, direction: 'n' | 's' | 'e' | 'w' | 'nw' | 'ne' | 'sw' | 'se', e: React.MouseEvent) => {
    e.stopPropagation();
    e.preventDefault();
    focusApp(id);
    const win = activeWindows.find(w => w.id === id);
    if (!win || win.isMaximized) return;
    
    setActiveResizeId(id);
    resizingRef.current = {
      id,
      direction,
      initialX: e.clientX,
      initialY: e.clientY,
      initialWinX: win.position.x,
      initialWinY: win.position.y,
      initialWidth: typeof win.size.width === 'number' ? win.size.width : parseInt(String(win.size.width)) || 720,
      initialHeight: typeof win.size.height === 'number' ? win.size.height : parseInt(String(win.size.height)) || 480,
    };
    
    document.addEventListener('mousemove', onResize);
    document.addEventListener('mouseup', endResize);
  };

  const onResize = (e: MouseEvent) => {
    if (!resizingRef.current) return;
    const { id, direction, initialX, initialY, initialWinX, initialWinY, initialWidth, initialHeight } = resizingRef.current;
    
    const deltaX = e.clientX - initialX;
    const deltaY = e.clientY - initialY;
    
    setActiveWindows(prev => prev.map(w => {
      if (w.id === id) {
        let nextX = w.position.x;
        let nextY = w.position.y;
        let nextWidth = typeof w.size.width === 'number' ? w.size.width : parseInt(String(w.size.width)) || 720;
        let nextHeight = typeof w.size.height === 'number' ? w.size.height : parseInt(String(w.size.height)) || 480;
        
        const minW = 280;
        const minH = 200;
        
        // Horizontal updates
        if (direction.includes('e')) {
          nextWidth = Math.max(minW, initialWidth + deltaX);
        } else if (direction.includes('w')) {
          const possibleWidth = initialWidth - deltaX;
          if (possibleWidth >= minW) {
            nextWidth = possibleWidth;
            nextX = initialWinX + deltaX;
          }
        }
        
        // Vertical updates
        if (direction.includes('s')) {
          nextHeight = Math.max(minH, initialHeight + deltaY);
        } else if (direction.includes('n')) {
          const possibleHeight = initialHeight - deltaY;
          if (possibleHeight >= minH) {
            nextHeight = possibleHeight;
            nextY = initialWinY + deltaY;
            if (nextY < 36) { // clamp below top bar which is 36px/36px in top
              const overflow = 36 - nextY;
              nextY = 36;
              nextHeight = Math.max(minH, nextHeight - overflow);
            }
          }
        }
        
        return {
          ...w,
          position: { x: nextX, y: nextY },
          size: { width: nextWidth, height: nextHeight }
        };
      }
      return w;
    }));
  };

  const endResize = () => {
    resizingRef.current = null;
    setActiveResizeId(null);
    document.removeEventListener('mousemove', onResize);
    document.removeEventListener('mouseup', endResize);
  };

  // Filter apps matching search
  const filteredApps = CORE_APPS.filter(app => 
    app.name.toLowerCase().includes(appSearch.toLowerCase())
  );

  return (
    <div className="relative w-full h-full text-white text-sm select-none font-sans overflow-hidden bg-black flex flex-col">
      {/* 1. BOOTING SPLASH SCREEN */}
      <AnimatePresence>
        {booting && (
          <motion.div 
            key="bootscreen"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="absolute inset-0 z-[10000] bg-black flex flex-col items-center justify-between py-24"
          >
            <div /> {/* Top spacer to balance the layout */}
            
            {/* Spinner placed above the logo near the center */}
            <div className="w-8 h-8 border-4 border-zinc-800 border-t-zinc-200 rounded-full animate-spin"></div>
            
            {/* Debian 13 Swirl Logo placed at the bottom portion */}
            <img 
              src="/assets/debian-logo-splashscreen.png" 
              alt="Debian 13 Swirl Logo"
              className="w-52 object-contain"
              referrerPolicy="no-referrer"
            />
          </motion.div>
        )}
      </AnimatePresence>

      {/* 2. GNOME SHELL DESKTOP ENVIRONMENT */}
      {!booting && (
        <div 
          className="relative w-full h-full flex flex-col overflow-hidden bg-cover bg-center transition-all duration-700"
          style={{ backgroundImage: `url(${currentWallpaper})` }}
          onClick={() => {
            // Close dynamic overlay menus on clicking raw background
            setShowStatusMenu(false);
            setShowCalendarMenu(false);
          }}
        >
          {/* SIMULATION SYSTEM WELCOME NOTIFICATION BANNER */}
          <AnimatePresence>
            {showSimInfoNotify && (
              <motion.div 
                initial={{ opacity: 0, x: 100 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 100 }}
                transition={{ type: "spring", stiffness: 120, damping: 16 }}
                className="absolute top-12 right-4 z-[1000] max-w-sm md:max-w-md w-[320px] md:w-[380px] bg-[#1e1e1e]/95 backdrop-blur-md border-t-4 border-[#d70a53] rounded-xl shadow-2xl p-4 flex gap-3.5 items-start border border-white/5 select-none text-white text-xs"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="bg-[#d70a53] p-2.5 rounded-xl text-white flex-shrink-0 shadow-lg">
                  <Monitor size={18} />
                </div>
                <div className="flex-1 min-w-0 pr-1 text-left">
                  <h5 className="font-bold text-sm text-white leading-snug">
                    {currentLang === 'en' ? 'Debian 13 "Trixie" Simulation' : 'Simulação do Debian 13 "Trixie"'}
                  </h5>
                  <p className="text-xs text-neutral-300 mt-1.5 leading-relaxed">
                    {currentLang === 'en' 
                      ? 'This is only an interactive web simulation of Debian, allowing you to experience the GNOME environment beforehand.'
                      : 'Esta é apenas uma simulação interativa do Debian para que você possa usufruir e testar o sistema completo no navegador.'}
                  </p>
                  <button
                    onClick={() => setShowSimInfoNotify(false)}
                    className="mt-3.5 bg-[#d70a53] hover:bg-[#b00540] active:scale-95 text-white text-[11px] font-bold px-4 py-1.5 rounded-lg transition-all cursor-pointer shadow-md inline-flex items-center justify-center"
                  >
                    {currentLang === 'en' ? 'Got it' : 'Entendi'}
                  </button>
                </div>
                <button 
                  onClick={() => setShowSimInfoNotify(false)}
                  className="text-neutral-400 hover:text-white transition-colors flex-shrink-0 p-1 rounded-full hover:bg-white/10"
                >
                  <X size={15} />
                </button>
              </motion.div>
            )}
          </AnimatePresence>

          {/* TOP BAR / PAINEL SUPERIOR */}
          <div className="h-9 bg-black/95 backdrop-blur-md flex items-center justify-between px-4 text-xs font-semibold select-none border-b border-white/5 shadow-md z-[200]">
            {/* Left Portion: Activities Button */}
            <div className="flex items-center gap-1">
              <button 
                onClick={(e) => {
                  e.stopPropagation();
                  setIsOverviewOpen(!isOverviewOpen);
                }}
                className={`px-3 py-1.5 rounded-md transition-colors ${isOverviewOpen ? 'bg-white/15' : 'hover:bg-white/10'}`}
              >
                {currentLang === 'pt-br' ? 'Atividades' : 'Activities'}
              </button>
            </div>

            {/* Center Portion: Date & Time Clock option */}
            <div>
              <button 
                onClick={(e) => {
                  e.stopPropagation();
                  setShowCalendarMenu(!showCalendarMenu);
                  setShowStatusMenu(false);
                }}
                className={`px-3 py-1.5 rounded-md transition-colors ${showCalendarMenu ? 'bg-white/15' : 'hover:bg-white/10'}`}
              >
                {formatDate()} {formatTime()}
              </button>
            </div>

            {/* Right Portion: Power/Network status menu triggers */}
            <div className="flex items-center gap-2">
              <button 
                onClick={(e) => {
                  e.stopPropagation();
                  setShowStatusMenu(!showStatusMenu);
                  setShowCalendarMenu(false);
                }}
                className={`flex items-center gap-2.5 px-3 py-1.5 rounded-full transition-colors ${showStatusMenu ? 'bg-white/15' : 'hover:bg-white/10 bg-white/5'}`}
              >
                {wifiOn ? <Wifi size={13.5} className="text-white" /> : <div className="w-[13.5px]" />}
                <Volume2 size={13.5} />
                <Battery size={13.5} />
              </button>
            </div>
          </div>

          {/* GNOME STATUS QUICK SETTINGS DROPDOWN POPUP */}
          <AnimatePresence>
            {showStatusMenu && (
              <motion.div 
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="absolute right-4 top-10 w-80 bg-[#1e1e1e]/95 backdrop-blur-xl border border-white/10 shadow-3xl rounded-2xl p-4 text-white z-[999] select-none"
                onClick={(e) => e.stopPropagation()}
              >
                {/* Action Buttons Header */}
                <div className="flex justify-between items-center mb-4">
                  <div className="font-bold flex items-center gap-2 text-zinc-300">
                    <CheckCircle size={15} className="text-[#7899af]" />
                    <span>Debian 13 Trixie</span>
                  </div>
                  <div className="flex gap-2">
                    <button 
                      onClick={() => openApp('settings')}
                      className="p-2 hover:bg-white/10 rounded-full transition-colors"
                      title={currentLang === 'pt-br' ? 'Configurações' : 'Settings'}
                    >
                      <SettingsIcon size={14} />
                    </button>
                    <button 
                      onClick={() => {
                        setShowStatusMenu(false);
                        openApp('help');
                      }}
                      className="p-2 hover:bg-white/10 rounded-full transition-colors"
                      title={currentLang === 'pt-br' ? 'Ajuda' : 'Help'}
                    >
                      <HelpCircle size={14} />
                    </button>
                    <button 
                      onClick={() => {
                        setShowStatusMenu(false);
                        onClose();
                      }}
                      className="p-2 bg-red-600/25 hover:bg-red-600/40 rounded-full text-red-400 transition-colors"
                      title={currentLang === 'pt-br' ? 'Desligar / Sair' : 'Shut Down'}
                    >
                      <Power size={14} />
                    </button>
                  </div>
                </div>

                {/* Sub-grid of toggles */}
                <div className="grid grid-cols-2 gap-2 mb-4">
                  <button 
                    onClick={() => setWifiOn(!wifiOn)}
                    className={`flex items-center gap-3 p-3 rounded-xl transition-all ${wifiOn ? 'bg-[#7899af] text-white' : 'bg-white/5 hover:bg-white/10 text-zinc-400'}`}
                  >
                    <Wifi size={16} />
                    <div className="text-left font-semibold text-xs truncate">
                      <div>Wi-Fi</div>
                      <div className="text-[10px] opacity-75">{wifiOn ? 'Conectado' : 'Desativado'}</div>
                    </div>
                  </button>

                  <button 
                    onClick={() => setBluetoothOn(!bluetoothOn)}
                    className={`flex items-center gap-3 p-3 rounded-xl transition-all ${bluetoothOn ? 'bg-[#7899af] text-white' : 'bg-white/5 hover:bg-white/10 text-zinc-400'}`}
                  >
                    <Bluetooth size={16} />
                    <div className="text-left font-semibold text-xs truncate">
                      <div>Bluetooth</div>
                      <div className="text-[10px] opacity-75">{bluetoothOn ? 'Ligado' : 'Desativado'}</div>
                    </div>
                  </button>

                  <button 
                    onClick={() => setNotDisturb(!notDisturb)}
                    className={`flex items-center gap-3 p-3 rounded-xl transition-all ${notDisturb ? 'bg-[#7899af] text-white' : 'bg-white/5 hover:bg-white/10 text-zinc-400'}`}
                  >
                    <BellOff size={16} />
                    <div className="text-left font-semibold text-xs truncate">
                      <div>Não Perturbe</div>
                      <div className="text-[10px] opacity-75">{notDisturb ? 'Ativo' : 'Inativo'}</div>
                    </div>
                  </button>

                  <button 
                    onClick={() => setNightLight(!nightLight)}
                    className={`flex items-center gap-3 p-3 rounded-xl transition-all ${nightLight ? 'bg-amber-600 text-white' : 'bg-white/5 hover:bg-white/10 text-zinc-400'}`}
                  >
                    <Moon size={16} />
                    <div className="text-left font-semibold text-xs truncate">
                      <div>Luz Noturna</div>
                      <div className="text-[10px] opacity-75">{nightLight ? 'Ativa' : 'Inativa'}</div>
                    </div>
                  </button>
                </div>

                {/* Slider adjustments (Volume and Brightness) */}
                <div className="space-y-4 pt-2 border-t border-white/10">
                  <div className="flex items-center gap-3">
                    <Volume2 size={16} className="text-zinc-400 shrink-0" />
                    <input 
                      type="range" 
                      min="0" 
                      max="100" 
                      value={volume}
                      onChange={(e) => setVolume(Number(e.target.value))}
                      className="w-full h-1 bg-white/10 rounded-lg appearance-none cursor-pointer accent-[#7899af]"
                    />
                    <span className="text-xs font-mono w-8 text-right text-zinc-400">{volume}%</span>
                  </div>

                  <div className="flex items-center gap-3">
                    <Sun size={16} className="text-zinc-400 shrink-0" />
                    <input 
                      type="range" 
                      min="10" 
                      max="100" 
                      value={brightness}
                      onChange={(e) => setBrightness(Number(e.target.value))}
                      className="w-full h-1 bg-white/10 rounded-lg appearance-none cursor-pointer accent-[#7899af]"
                    />
                    <span className="text-xs font-mono w-8 text-right text-zinc-400">{brightness}%</span>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* GNOME CALENDAR & NOTIFICATIONS POPUP */}
          <AnimatePresence>
            {showCalendarMenu && (
              <motion.div 
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="absolute left-1/2 -translate-x-1/2 top-10 w-96 bg-[#1e1e1e]/95 backdrop-blur-xl border border-white/10 shadow-3xl rounded-2xl p-4 text-white z-[999] select-none flex"
                onClick={(e) => e.stopPropagation()}
              >
                {/* Left Side: Calendar details and notifications */}
                <div className="flex-1 border-r border-white/10 pr-4">
                  <h4 className="font-extrabold text-xs text-zinc-400 mb-3 uppercase tracking-wide">
                    {currentLang === 'pt-br' ? 'Notificações' : 'Notifications'}
                  </h4>
                  <div className="space-y-3">
                    <div className="bg-white/5 p-2.5 rounded-lg border border-white/5">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="w-1.5 h-1.5 bg-blue-500 rounded-full"></span>
                        <p className="font-bold text-xs">Aviso de Sistema</p>
                      </div>
                      <p className="text-[11px] text-zinc-400 leading-relaxed">Seu Debian GNU/Linux 13 está rodando perfeitamente e seguro.</p>
                    </div>

                    <div className="bg-white/5 p-2.5 rounded-lg border border-white/5">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="w-1.5 h-1.5 bg-[#7899af] rounded-full"></span>
                        <p className="font-bold text-xs">meuLinux Dica</p>
                      </div>
                      <p className="text-[11px] text-zinc-400 leading-relaxed">Você pode salvar textos no Editor e visualizá-los diretamente no Gerenciador de Arquivos.</p>
                    </div>
                  </div>
                </div>

                {/* Right Side: Visual calendar mini placeholder */}
                <div className="w-40 pl-4 flex flex-col items-center justify-center">
                  <p className="text-3xl font-light text-zinc-200">{currentTime.getDate()}</p>
                  <p className="text-xs font-semibold text-[#7899af] uppercase mb-4">{currentTime.toLocaleString('pt-br', { month: 'short' })}</p>
                  
                  {/* Visual 7x5 mini grid represent layout */}
                  <div className="grid grid-cols-7 gap-1 text-[9px] text-zinc-500 text-center w-full">
                    <span>D</span><span>S</span><span>T</span><span>Q</span><span>Q</span><span>S</span><span>S</span>
                    <span className="text-zinc-700">26</span><span className="text-zinc-700">27</span><span className="text-zinc-700">28</span><span className="text-zinc-700">29</span><span className="text-zinc-700">30</span><span>1</span><span>2</span>
                    <span>3</span><span>4</span><span>5</span><span>6</span><span>7</span><span>8</span><span>9</span>
                    <span className="bg-[#7899af] text-white rounded-full font-bold">10</span><span>11</span><span>12</span><span>13</span><span>14</span><span>15</span><span>16</span>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* DESKTOP CONTENT AREA (Icons in background, open floating windows container) */}
          <div className="flex-1 relative overflow-hidden">
            {/* Desktop file/shortcut icons */}
            <div className="absolute top-6 left-6 flex flex-col gap-6 z-10 pointer-events-auto">
              {/* "Computador" / "Computer" */}
              <button 
                onDoubleClick={() => openApp('files')}
                onClick={() => focusApp('files')}
                className="flex flex-col items-center justify-center w-16 group outline-none"
              >
                <img 
                  src={DEBIAN_ICONS.computer} 
                  alt="Computador" 
                  className="w-11 h-11 object-contain group-hover:scale-105 transition-transform drop-shadow-lg"
                  referrerPolicy="no-referrer"
                />
                <span className="text-[11px] mt-1 text-center text-white drop-shadow-[0_2px_2px_rgba(0,0,0,0.8)] leading-tight">
                  {currentLang === 'pt-br' ? 'Meu Computador' : 'Computer'}
                </span>
              </button>

              {/* Home / "Pasta Pessoal" */}
              <button 
                onDoubleClick={() => openApp('files')}
                onClick={() => focusApp('files')}
                className="flex flex-col items-center justify-center w-16 group outline-none"
              >
                <img 
                  src={DEBIAN_ICONS.folder} 
                  alt="Pasta Pessoal" 
                  className="w-11 h-11 object-contain group-hover:scale-105 transition-transform drop-shadow-lg"
                  referrerPolicy="no-referrer"
                />
                <span className="text-[11px] mt-1 text-center text-white drop-shadow-[0_2px_2px_rgba(0,0,0,0.8)] leading-tight">
                  {currentLang === 'pt-br' ? 'Pasta pessoal' : 'Home'}
                </span>
              </button>
            </div>

            {/* FLOATING WINDOWS RENDERING MANAGER */}
            <AnimatePresence>
              {activeWindows.map((win) => {
                if (!win.isOpen) return null;

                return (
                  <motion.div 
                    key={win.id}
                    initial={{ scale: 0.92, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0.92, opacity: 0 }}
                    transition={{ duration: 0.18 }}
                    onClick={() => focusApp(win.id)}
                    style={{ 
                      zIndex: win.zIndex,
                      left: win.isMaximized ? 0 : win.position.x,
                      top: win.isMaximized ? '36px' : win.position.y,
                      width: win.isMaximized ? '100%' : win.size.width,
                      height: win.isMaximized ? 'calc(100% - 36px)' : win.size.height,
                    }}
                    className="absolute flex flex-col rounded-xl border border-[#3e3e3e]/80 shadow-3xl bg-[#242424] text-white"
                  >
                    {/* Window Resizers (only if not maximized) */}
                    {!win.isMaximized && (
                      <>
                        {/* Top */}
                        <div 
                          onMouseDown={(e) => startResize(win.id, 'n', e)}
                          className="absolute -top-1.5 left-2 right-2 h-3 cursor-ns-resize z-[100]"
                        />
                        {/* Bottom */}
                        <div 
                          onMouseDown={(e) => startResize(win.id, 's', e)}
                          className="absolute -bottom-1.5 left-2 right-2 h-3 cursor-ns-resize z-[100]"
                        />
                        {/* East (Right) */}
                        <div 
                          onMouseDown={(e) => startResize(win.id, 'e', e)}
                          className="absolute top-2 bottom-2 -right-1.5 w-3 cursor-ew-resize z-[100]"
                        />
                        {/* West (Left) */}
                        <div 
                          onMouseDown={(e) => startResize(win.id, 'w', e)}
                          className="absolute top-2 bottom-2 -left-1.5 w-3 cursor-ew-resize z-[100]"
                        />
                        {/* NW */}
                        <div 
                          onMouseDown={(e) => startResize(win.id, 'nw', e)}
                          className="absolute -top-1.5 -left-1.5 w-4 h-4 cursor-nwse-resize z-[101]"
                        />
                        {/* NE */}
                        <div 
                          onMouseDown={(e) => startResize(win.id, 'ne', e)}
                          className="absolute -top-1.5 -right-1.5 w-4 h-4 cursor-nesw-resize z-[101]"
                        />
                        {/* SW */}
                        <div 
                          onMouseDown={(e) => startResize(win.id, 'sw', e)}
                          className="absolute -bottom-1.5 -left-1.5 w-4 h-4 cursor-nesw-resize z-[101]"
                        />
                        {/* SE */}
                        <div 
                          onMouseDown={(e) => startResize(win.id, 'se', e)}
                          className="absolute -bottom-1.5 -right-1.5 w-4 h-4 cursor-nwse-resize z-[101]"
                        />
                      </>
                    )}

                    {/* Window Header / Titlebar */}
                    <div 
                      onMouseDown={(e) => handleDragStart(e, win.id)}
                      onDoubleClick={() => toggleMaximize(win.id)}
                      className="h-11 bg-[#1c1c1c] border-b border-[#2d2d2d] flex items-center justify-between px-4 select-none cursor-move shrink-0"
                    >
                      <div className="flex items-center gap-2">
                        <img 
                          src={(()=>{ const r = CORE_APPS.find(a => a.id === win.id)?.icon || DEBIAN_ICONS.exec; return r.startsWith('http') || r.startsWith('/assets/') ? r : `/assets/${r}` })()} 
                          className="w-4 h-4 object-contain pointer-events-none" 
                          alt=""
                          referrerPolicy="no-referrer"
                        />
                        <span className="text-xs font-semibold text-zinc-300 truncate tracking-wide">{win.title}</span>
                      </div>

                      {/* Header controls with stopPropagation to ensure buttons respond to clicks */}
                      <div className="flex items-center gap-2" onMouseDown={(e) => e.stopPropagation()} onClick={(e) => e.stopPropagation()} onDoubleClick={(e) => e.stopPropagation()}>
                        {/* Minimize control */}
                        <button 
                          onClick={() => closeApp(win.id)} // for simplicity we close on minimize / exit simulator style
                          className="w-6 h-6 rounded-full hover:bg-white/10 flex items-center justify-center text-zinc-400 hover:text-white transition-all"
                        >
                          <Minus size={13} />
                        </button>

                        {/* Maximize control */}
                        <button 
                          onClick={() => toggleMaximize(win.id)}
                          className="w-6 h-6 rounded-full hover:bg-white/10 flex items-center justify-center text-zinc-400 hover:text-white transition-all"
                        >
                          {win.isMaximized ? <Minimize2 size={13} /> : <Square size={10} />}
                        </button>

                        {/* Close control (standard grey hover, no red circular background) */}
                        <button 
                          onClick={() => closeApp(win.id)}
                          className="w-6 h-6 rounded-full hover:bg-white/10 flex items-center justify-center text-zinc-400 hover:text-white transition-all ml-1"
                        >
                          <X size={13} />
                        </button>
                      </div>
                    </div>

                    {/* Window body pane wrapper */}
                    <div className="flex-1 w-full overflow-hidden relative text-left select-text bg-[#242424]">
                      {/* BROWSER (FIREFOX) */}
                      {win.id === 'firefox' && (
                        <div className="w-full h-full flex flex-col bg-[#1c1c1c]">
                          {/* Navigation Bar */}
                          <div className="h-10 bg-[#2b2b2b] border-b border-zinc-800 flex items-center px-3 gap-2 shrink-0 select-none">
                            <div className="flex gap-0.5">
                              <button 
                                disabled={browserHistoryIndex === 0}
                                onClick={goBackBrowser} 
                                className={`p-1.5 rounded text-zinc-400 ${browserHistoryIndex === 0 ? 'opacity-30 cursor-not-allowed' : 'hover:bg-white/5 hover:text-white'}`}
                                title="Voltar"
                              >
                                <ArrowLeft size={13} />
                              </button>
                              <button 
                                disabled={browserHistoryIndex >= browserHistory.length - 1}
                                onClick={goForwardBrowser} 
                                className={`p-1.5 rounded text-zinc-400 ${browserHistoryIndex >= browserHistory.length - 1 ? 'opacity-30 cursor-not-allowed' : 'hover:bg-white/5 hover:text-white'}`}
                                title="Avançar"
                              >
                                <ArrowRight size={13} />
                              </button>
                              <button 
                                onClick={() => {
                                  if (firefoxIframeRef.current) {
                                    firefoxIframeRef.current.src = browserUrl;
                                  }
                                }} 
                                className="p-1.5 hover:bg-white/5 rounded text-zinc-400 hover:text-white"
                                title="Recarregar"
                              >
                                <RotateCw size={11} />
                              </button>
                              <button 
                                onClick={goHomeBrowser} 
                                className="p-1.5 hover:bg-white/5 rounded text-zinc-400 hover:text-white"
                                title="Página Inicial (Google)"
                              >
                                <Home size={13} />
                              </button>
                            </div>
                            
                            <form 
                              onSubmit={(e) => {
                                e.preventDefault();
                                navigateBrowser(browserInput);
                              }}
                              className="flex-1 relative"
                            >
                              <Lock size={10} className="absolute left-2.5 top-1/2 -translate-y-1/2 text-emerald-400" />
                              <input 
                                type="text"
                                value={browserInput}
                                onChange={(e) => setBrowserInput(e.target.value)}
                                onFocus={(e) => e.target.select()}
                                className="w-full bg-[#1c1c1c] border border-zinc-700/60 rounded pl-7 pr-3 py-1 text-xs text-zinc-300 focus:outline-none focus:ring-1 ring-[#d70a53]/50"
                                placeholder="Pesquise no Google ou digite um endereço..."
                              />
                            </form>


                          </div>

                          {/* Content frame rendering */}
                          <div className="flex-1 w-full h-full bg-white relative overflow-hidden">
                            <iframe 
                              ref={firefoxIframeRef}
                              src={browserUrl} 
                              className="w-full h-full border-none bg-white"
                              title="Navegador de Internet Firefox"
                              referrerPolicy="no-referrer"
                              sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts allow-storage-access-by-user-activation"
                              allow="autoplay; encrypted-media; picture-in-picture; clipboard-write; clipboard-read"
                              style={{ colorScheme: 'light' }}
                            />
                          </div>
                        </div>
                      )}

                      {/* FILE MANAGER (PASTA PESSOAL / ARQUIVOS) */}
                      {win.id === 'files' && (
                        <div className="w-full h-full flex bg-[#1e1e1e]">
                          {/* Sidebar Navigation */}
                          <div className="w-48 border-r border-zinc-800 p-2 space-y-1.5 shrink-0 select-none text-xs font-medium text-zinc-400">
                            <span className="px-3 py-1 font-bold text-[10px] text-zinc-600 uppercase tracking-widest block mb-1">Locais</span>
                            
                            <button 
                              onClick={() => {
                                setCurrentDirPath('/home/usuario');
                                setSelectedFileItem(null);
                              }}
                              className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-lg transition-colors ${currentDirPath === '/home/usuario' ? 'bg-white/10 text-white font-bold' : 'hover:bg-white/5'}`}
                            >
                              <Home size={13} className="text-[#7899af]" />
                              <span>Pasta pessoal</span>
                            </button>

                            <button 
                              onClick={() => {
                                setCurrentDirPath('/home/usuario/Área de trabalho');
                                setSelectedFileItem(null);
                              }}
                              className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-lg transition-colors ${currentDirPath === '/home/usuario/Área de trabalho' ? 'bg-white/10 text-white font-bold' : 'hover:bg-white/5'}`}
                            >
                              <Folder size={13} className="text-blue-400" />
                              <span>Área de trabalho</span>
                            </button>

                            <button 
                              onClick={() => {
                                setCurrentDirPath('/home/usuario/Documentos');
                                setSelectedFileItem(null);
                              }}
                              className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-lg transition-colors ${currentDirPath === '/home/usuario/Documentos' ? 'bg-white/10 text-white font-bold' : 'hover:bg-white/5'}`}
                            >
                              <Folder size={13} className="text-blue-400" />
                              <span>Documentos</span>
                            </button>

                            <button 
                              onClick={() => {
                                setCurrentDirPath('/home/usuario/Downloads');
                                setSelectedFileItem(null);
                              }}
                              className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-lg transition-colors ${currentDirPath === '/home/usuario/Downloads' ? 'bg-white/10 text-white font-bold' : 'hover:bg-white/5'}`}
                            >
                              <Folder size={13} className="text-blue-400" />
                              <span>Downloads</span>
                            </button>

                            <button 
                              onClick={() => {
                                setCurrentDirPath('/home/usuario/Imagens');
                                setSelectedFileItem(null);
                              }}
                              className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-lg transition-colors ${currentDirPath === '/home/usuario/Imagens' ? 'bg-white/10 text-white font-bold' : 'hover:bg-white/5'}`}
                            >
                              <Folder size={13} className="text-blue-400" />
                              <span>Imagens</span>
                            </button>
                          </div>

                          {/* Content Window view list */}
                          <div className="flex-1 flex flex-col bg-[#242424] overflow-hidden">
                            {/* Path Header */}
                            <div className="h-10 border-b border-zinc-800/60 flex items-center justify-between px-4 select-none shrink-0">
                              <span className="text-xs font-mono text-zinc-500">{currentDirPath}</span>
                              <span className="text-zinc-600 text-[10px]">GNOME Files</span>
                            </div>

                            {/* Folders and files list */}
                            <div className="flex-1 p-4 overflow-y-auto">
                              <div className="grid grid-cols-4 gap-4">
                                {(fileSystem[currentDirPath] || []).map((file, i) => {
                                  return (
                                    <button 
                                      key={i}
                                      onDoubleClick={() => {
                                        if (file.type === 'dir') {
                                          setCurrentDirPath(file.path);
                                          setSelectedFileItem(null);
                                        } else {
                                          // Double click document -> open in text editor
                                          setSelectedFileItem(file);
                                          if (file.name.endsWith('.txt')) {
                                            setEditorFileName(file.name);
                                            setEditorContent(file.content || '');
                                            openApp('gedit');
                                          }
                                        }
                                      }}
                                      onClick={() => setSelectedFileItem(file)}
                                      className={`flex flex-col items-center justify-center p-3 rounded-lg outline-none transition-all ${selectedFileItem?.path === file.path ? 'bg-[#7899af]/25 border border-[#7899af]/30' : 'border border-transparent hover:bg-white/5'}`}
                                    >
                                      <img 
                                        src={file.icon || (file.type === 'dir' ? DEBIAN_ICONS.folder : DEBIAN_ICONS.exec)} 
                                        alt={file.name} 
                                        className="w-12 h-12 object-contain pointer-events-none drop-shadow-md mb-2" 
                                        referrerPolicy="no-referrer"
                                      />
                                      <span className="text-xs text-center text-zinc-300 break-all truncate w-full px-1">{file.name}</span>
                                    </button>
                                  );
                                })}

                                {/* Empty folder marker */}
                                {(fileSystem[currentDirPath] || []).length === 0 && (
                                  <div className="col-span-4 py-16 text-center text-zinc-500 text-xs">
                                    [Pasta vázia]
                                  </div>
                                )}
                              </div>
                            </div>

                            {/* Dynamic Inspector footer details */}
                            {selectedFileItem && (
                              <div className="h-20 bg-[#1c1c1c] border-t border-zinc-800/80 p-3 select-none flex items-center justify-between shrink-0">
                                <div>
                                  <p className="font-extrabold text-xs text-zinc-300">{selectedFileItem.name}</p>
                                  <p className="text-[10px] text-zinc-500 uppercase font-mono mt-0.5">{selectedFileItem.type === 'dir' ? 'Diretório' : 'Arquivo de Texto'}</p>
                                </div>
                                {selectedFileItem.type === 'file' && (
                                  <button 
                                    onClick={() => {
                                      if (selectedFileItem.name.endsWith('.txt')) {
                                        setEditorFileName(selectedFileItem.name);
                                        setEditorContent(selectedFileItem.content || '');
                                        openApp('gedit');
                                      }
                                    }}
                                    className="bg-zinc-800 hover:bg-zinc-700 text-white rounded px-3 py-1.5 text-xs font-semibold transition-colors"
                                  >
                                    Abrir no Editor
                                  </button>
                                )}
                              </div>
                            )}
                          </div>
                        </div>
                      )}

                      {/* TEXT EDITOR (GEDIT) */}
                      {win.id === 'gedit' && (
                        <div className="w-full h-full flex flex-col bg-[#1e1e1e]">
                          {/* File manager Controls */}
                          <div className="h-11 bg-[#1c1c1c] border-b border-zinc-800 flex items-center justify-between px-4 shrink-0 select-none">
                            <div className="flex items-center gap-2">
                              <span className="font-bold text-xs text-[#d70a53] bg-[#d70a53]/10 border border-[#d70a53]/20 px-2 py-0.5 rounded uppercase tracking-wider">Gedit</span>
                              <input 
                                type="text"
                                value={editorFileName}
                                onChange={(e) => setEditorFileName(e.target.value)}
                                className="bg-transparent border-b border-zinc-800 focus:border-[#d70a53] outline-none text-xs font-mono font-bold text-zinc-300 w-32 px-1 focus:bg-white/5 py-0.5 rounded transition-all"
                              />
                            </div>

                            {/* Action to Save file back into current dynamic Directory filesystem */}
                            <button 
                              onClick={() => {
                                const activeDir = currentDirPath;
                                const fileItem: FileItem = {
                                  name: editorFileName,
                                  type: 'file',
                                  path: `${activeDir}/${editorFileName}`,
                                  content: editorContent,
                                  icon: DEBIAN_ICONS.exec
                                };

                                // Write to dir filesystem
                                const updatedFileList = (fileSystem[activeDir] || []).filter(f => f.name !== editorFileName);
                                updatedFileList.push(fileItem);
                                
                                setFileSystem({
                                  ...fileSystem,
                                  [activeDir]: updatedFileList
                                });

                                alert(`Arquivo "${editorFileName}" gravado com sucesso em: ${activeDir}!`);
                              }}
                              className="text-xs font-bold text-white bg-emerald-600 hover:bg-emerald-500 rounded px-3.5 py-1.5 transition-colors border border-emerald-500/10 shadow flex items-center gap-1.5"
                            >
                              <Check size={12} /> Salvar Arquivo
                            </button>
                          </div>

                          <textarea 
                            value={editorContent}
                            onChange={(e) => setEditorContent(e.target.value)}
                            className="flex-grow w-full h-full p-4 bg-[#181818] text-zinc-200 outline-none resize-none font-mono text-xs border-none focus:ring-1 focus:ring-[#d70a53]/10"
                            placeholder="Digite textos, anotações ou códigos aqui..."
                          />
                        </div>
                      )}

                      {/* CALCULATOR */}
                      {win.id === 'calculator' && (
                        <div className="w-full h-full bg-[#1e1e1e] flex flex-col p-4">
                          <div className="bg-[#151515] rounded-xl p-4 text-emerald-400 font-mono text-right text-3xl h-20 flex items-center justify-end overflow-x-auto select-none tracking-tight shadow-inner mb-4">
                            {calcDisplay}
                          </div>

                          {/* Controls Grid */}
                          <div className="flex-1 grid grid-cols-4 gap-2 text-sm select-none">
                            <button onClick={clearCalc} className="bg-zinc-800 hover:bg-zinc-700 text-red-400 font-bold rounded-xl transition-all p-3">C</button>
                            <button onClick={() => handleCalcOp('/')} className="bg-zinc-800 hover:bg-zinc-700 text-[#d70a53] font-bold rounded-xl transition-all p-3">/</button>
                            <button onClick={() => handleCalcOp('*')} className="bg-zinc-800 hover:bg-zinc-700 text-[#d70a53] font-bold rounded-xl transition-all p-3">*</button>
                            <button onClick={() => handleCalcOp('-')} className="bg-zinc-800 hover:bg-zinc-700 text-[#d70a53] font-bold rounded-xl transition-all p-3">-</button>

                            <button onClick={() => handleCalcNum('7')} className="bg-zinc-700/50 hover:bg-zinc-700 text-white rounded-xl transition-all p-3">7</button>
                            <button onClick={() => handleCalcNum('8')} className="bg-zinc-700/50 hover:bg-zinc-700 text-white rounded-xl transition-all p-3">8</button>
                            <button onClick={() => handleCalcNum('9')} className="bg-zinc-700/50 hover:bg-zinc-700 text-white rounded-xl transition-all p-3">9</button>
                            <button onClick={() => handleCalcOp('+')} className="bg-zinc-800 hover:bg-zinc-700 text-[#d70a53] font-bold rounded-xl transition-all row-span-2 p-3 flex items-center justify-center font-mono text-lg">+</button>

                            <button onClick={() => handleCalcNum('4')} className="bg-zinc-700/50 hover:bg-zinc-700 text-white rounded-xl transition-all p-3">4</button>
                            <button onClick={() => handleCalcNum('5')} className="bg-zinc-700/50 hover:bg-zinc-700 text-white rounded-xl transition-all p-3">5</button>
                            <button onClick={() => handleCalcNum('6')} className="bg-zinc-700/50 hover:bg-zinc-700 text-white rounded-xl transition-all p-3">6</button>

                            <button onClick={() => handleCalcNum('1')} className="bg-zinc-700/50 hover:bg-zinc-700 text-white rounded-xl transition-all p-3">1</button>
                            <button onClick={() => handleCalcNum('2')} className="bg-zinc-700/50 hover:bg-zinc-700 text-white rounded-xl transition-all p-3">2</button>
                            <button onClick={() => handleCalcNum('3')} className="bg-zinc-700/50 hover:bg-zinc-700 text-white rounded-xl transition-all p-3">3</button>
                            <button onClick={handleCalcEqual} className="bg-[#d70a53] hover:bg-[#b00843] text-white font-black rounded-xl transition-all row-span-2 p-3 flex items-center justify-center font-mono text-lg">=</button>

                            <button onClick={() => handleCalcNum('0')} className="bg-zinc-700/50 hover:bg-zinc-700 text-white rounded-xl transition-all col-span-2 p-3">0</button>
                            <button onClick={() => handleCalcNum('.')} className="bg-zinc-700/50 hover:bg-zinc-700 text-white rounded-xl transition-all p-3">.</button>
                          </div>
                        </div>
                      )}

                      {/* CONFIGURAÇÕES (SYSTEM SETTINGS) */}
                      {win.id === 'settings' && (
                        <div className="w-full h-full flex bg-[#1e1e1e]">
                          {/* Sidebar settings option tabs */}
                          <div className="w-52 border-r border-zinc-800 p-2 space-y-1.5 shrink-0 select-none text-xs font-semibold text-zinc-400">
                            <span className="px-3 py-1 font-extrabold text-[10px] text-zinc-600 uppercase tracking-widest block mb-1">Painel</span>
                            
                            <div className="w-full flex items-center gap-2.5 px-3 py-2 rounded-lg bg-white/10 text-white font-bold">
                              <Monitor size={13} className="text-[#d70a53]" />
                              <span>Sobre o Sistema</span>
                            </div>

                            <div className="w-full flex flex-col pt-3 space-y-2">
                              <span className="px-3 py-1 font-extrabold text-[10px] text-zinc-600 uppercase tracking-widest block">Aparência</span>
                              
                              <div className="px-3 py-1 flex flex-col gap-2">
                                <span className="text-[10px] text-zinc-500">Decorativos / Wallpapers</span>
                                <div className="flex">
                                  <button 
                                    onClick={() => setCurrentWallpaper('debian/debian_13_wallpaper.svg')}
                                    className="h-10 w-full bg-zinc-800 rounded border border-white/10 hover:border-zinc-500 overflow-hidden bg-cover"
                                    style={{ backgroundImage: `url(/assets/debian_13_wallpaper.svg)` }}
                                    title="Padrão Debian 13"
                                  />
                                </div>
                              </div>
                            </div>
                          </div>

                          {/* Diagnostic Specs Area */}
                          <div className="flex-1 p-6 bg-[#242424] overflow-y-auto">
                            <div className="max-w-md mx-auto space-y-6">
                              <div className="flex flex-col items-center text-center">
                                <img 
                                  src="https://www.debian.org/logos/openlogo-nd-100.png" 
                                  className="h-20 object-contain drop-shadow-lg mb-3" 
                                  alt="" 
                                  referrerPolicy="no-referrer"
                                />
                                <h1 className="text-xl font-black text-rose-500">Debian GNU/Linux 13</h1>
                                <p className="text-xs text-zinc-400 font-mono mt-1">Desenvolvimento ("Trixie")</p>
                              </div>

                              <div className="bg-white/5 border border-white/5 rounded-2xl p-4 space-y-4 text-xs select-text leading-relaxed font-semibold">
                                <div className="flex justify-between border-b border-white/5 pb-2">
                                  <span className="text-zinc-400">Processador</span>
                                  <span className="text-zinc-200">Intel® Core™ i7-13700H @ 4.7GHz</span>
                                </div>
                                <div className="flex justify-between border-b border-white/5 pb-2">
                                  <span className="text-zinc-400">Placa Gráfica</span>
                                  <span className="text-zinc-200">Mesa Intel® Xe Graphics (RAPTOR)</span>
                                </div>
                                <div className="flex justify-between border-b border-white/5 pb-2">
                                  <span className="text-zinc-400">Memória Física</span>
                                  <span className="text-zinc-200">16,0 GiB de RAM</span>
                                </div>
                                <div className="flex justify-between border-b border-white/5 pb-2">
                                  <span className="text-zinc-400">Tipo de Sistema</span>
                                  <span className="text-zinc-200">64 bits (x86_64)</span>
                                </div>
                                <div className="flex justify-between border-b border-white/5 pb-2">
                                  <span className="text-zinc-400">Versão do GNOME</span>
                                  <span className="text-zinc-200">GNOME 47.1</span>
                                </div>
                                <div className="flex justify-between">
                                  <span className="text-zinc-400">Kernel do Linux</span>
                                  <span className="text-zinc-200">6.12.0-amd64</span>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      )}

                      {/* TERMINAL APPS */}
                      {win.id === 'terminal' && (
                        <div className="w-full h-full flex flex-col bg-zinc-950 font-mono text-xs text-zinc-300 p-4 select-text">
                          <div className="flex-1 overflow-y-auto space-y-1.5 scrollbar-thin">
                            {terminalHistory.map((line, i) => (
                              <p key={i} className="whitespace-pre-wrap leading-relaxed">{line}</p>
                            ))}
                            <div ref={terminalBottomRef} />
                          </div>

                          <div className="flex items-center gap-1.5 shrink-0 select-none bg-zinc-900/40 p-1.5 rounded border border-white/5">
                            <span className="text-rose-500 font-bold">usuario@debian:~$</span>
                            <input 
                              type="text"
                              value={terminalInput}
                              onChange={(e) => setTerminalInput(e.target.value)}
                              onKeyDown={(e) => {
                                if (e.key === 'Enter') {
                                  executeCommand(terminalInput);
                                }
                              }}
                              className="flex-grow bg-transparent outline-none border-none text-zinc-200 font-mono text-xs focus:ring-0 p-0"
                              autoFocus
                              placeholder="Digite comandos..."
                            />
                          </div>
                        </div>
                      )}

                      {/* SYSTEM CALENDAR / CLOCKS PLACEHOLDER */}
                      {win.id === 'calendar' && (
                        <div className="w-full h-full bg-[#1e1e1e] p-6 text-zinc-300 flex flex-col justify-center items-center">
                          <Clock size={40} className="text-[#d70a53] mb-3 animate-pulse" />
                          <h3 className="text-lg font-extrabold text-white">{getFullHeaderDate()}</h3>
                          <p className="text-xs text-zinc-500 mt-1 uppercase tracking-widest">Debian GNOME Agenda</p>
                          <div className="mt-6 bg-white/5 border border-white/5 p-4 rounded-xl max-w-sm text-center text-xs">
                            Nenhum compromisso marcado para hoje. Aproveite sua navegação limpa!
                          </div>
                        </div>
                      )}

                      {/* HELPER ASSISTANT (AJUDA) */}
                      {win.id === 'help' && (
                        <div className="w-full h-full bg-[#1e1e1e] p-6 overflow-y-auto font-medium text-xs leading-relaxed text-zinc-300">
                          <h2 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                            <HelpCircle size={18} className="text-[#d70a53]" />
                            <span>Ajuda do meuLinux Debian 13</span>
                          </h2>
                          <div className="space-y-4">
                            <div className="bg-white/5 p-4 rounded-lg border border-white/5">
                              <h4 className="font-extrabold text-white mb-1.5">Como iniciar aplicativos?</h4>
                              <p className="text-zinc-400">Você pode clicar no menu "Atividades" no topo esquerdo para revelar a gaveta de aplicativos (Dock) e buscar programas instalados digitando no campo de pesquisa.</p>
                            </div>

                            <div className="bg-white/5 p-4 rounded-lg border border-white/5">
                              <h4 className="font-extrabold text-white mb-1.5">O que há de novo no Debian 13 "Trixie"?</h4>
                              <p className="text-zinc-400">Esta versão simulada inclui refinamentos visuais fantásticos do GNOME, suporte a empacotamentos Flatpak de ponta a ponta e o robusto Linux Kernel 6.12 provendo uma estabilidade espetacular.</p>
                            </div>
                          </div>
                        </div>
                      )}

                      {/* RHYTHMBOX AUDIO PLAYER */}
                      {win.id === 'rhythmbox' && (
                        <div className="w-full h-full flex flex-col bg-[#1c1c1f] text-zinc-300">
                          {/* Top Controller Ribbon */}
                          <div className="h-14 bg-[#252529] border-b border-zinc-900/80 px-4 flex items-center justify-between shrink-0 select-none">
                            <div className="flex items-center gap-3">
                              {/* Audio Mode Switcher */}
                              <div className="bg-[#18181b] p-0.5 rounded-lg border border-white/5 flex gap-1">
                                <button 
                                  onClick={() => setRhythmAudioMode('local')}
                                  className={`px-3 py-1 rounded-md text-[10px] font-black transition-all ${rhythmAudioMode === 'local' ? 'bg-[#d70a53] text-white shadow' : 'text-zinc-400 hover:text-white'}`}
                                >
                                  Servidor meuLinux
                                </button>
                                <button 
                                  onClick={() => setRhythmAudioMode('online')}
                                  className={`px-3 py-1 rounded-md text-[10px] font-black transition-all ${rhythmAudioMode === 'online' ? 'bg-[#d70a53] text-white shadow' : 'text-zinc-400 hover:text-white'}`}
                                >
                                  Radio Online
                                </button>
                              </div>
                            </div>

                            {/* Center Playing Information Area */}
                            <div className="flex flex-col items-center text-center max-w-xs md:max-w-md">
                              <span className="text-xs font-bold text-white tracking-wide truncate">
                                {rhythmAudioMode === 'local' 
                                  ? (DUA_LIPA_ALBUM_TRAILER[rhythmTrack]?.title || 'Sem título') 
                                  : (RADIO_STATIONS[rhythmTrack % RADIO_STATIONS.length]?.title || 'Estação')}
                              </span>
                              <span className="text-[10px] text-zinc-400 font-medium truncate col-span-1">
                                {rhythmAudioMode === 'local' ? 'Dua Lipa — Radical Optimism' : 'Estação de Rádio'}
                              </span>
                            </div>

                            {/* Right Audio Source State Mode */}
                            <div className="flex items-center gap-2">
                              <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse"></span>
                              <span className="text-[10px] text-zinc-400 font-mono uppercase tracking-widest">
                                {rhythmPlaying ? 'Ativo' : 'Pausado'}
                              </span>
                            </div>
                          </div>
 
                           {/* Music Body Content Area */}
                           <div className="flex-1 flex overflow-hidden">
                             {/* Left Side: Custom Albumpic Showcase */}
                             <div className="w-48 bg-[#18181b] border-r border-[#101012] p-4 flex flex-col items-center select-none overflow-y-auto shrink-0 scrollbar-none">
                               <div className="relative group w-36 h-36 rounded-xl overflow-hidden shadow-2xl border border-white/5 mb-4 shrink-0">
                                 <img 
                                   src={rhythmAudioMode === 'local' 
                                     ? "/assets/Dua Lipa/cd_cover.jpg" 
                                     : "https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?w=300&auto=format&fit=crop&q=80"
                                   } 
                                   alt="Album Cover" 
                                   className={`w-full h-full object-cover transition-transform duration-700 ${rhythmPlaying ? 'scale-105' : 'scale-100'}`}
                                 />
                                 {/* Spinning overlay if playing */}

                               </div>
 
                               <div className="w-full space-y-3.5 mt-2 shrink-0">
                                 <button 
                                   onClick={() => {
                                     const updated = [...rhythmLiked];
                                     updated[rhythmTrack] = !updated[rhythmTrack];
                                     setRhythmLiked(updated);
                                   }}
                                   className={`w-full py-1.5 rounded-lg border border-white/5 text-[10px] font-bold transition-all flex items-center justify-center gap-2 ${rhythmLiked[rhythmTrack] ? 'bg-[#d70a53]/20 text-[#d70a53] border-[#d70a53]/30' : 'bg-[#222226] text-zinc-300 hover:text-white'}`}
                                 >
                                   <Heart size={11} fill={rhythmLiked[rhythmTrack] ? 'currentColor' : 'none'} />
                                   <span>{rhythmLiked[rhythmTrack] ? 'Favoritado!' : 'Favoritar'}</span>
                                 </button>
 
                                 <div className="hidden">
                                   <span className="text-white font-bold block mb-1">Dica de áudio:</span>
                                   {rhythmAudioMode === 'local' 
                                     ? 'Seu navegador consultará o repositório do meuLinux. Caso tenha problemas de Conexão, mude para "Radio Online".' 
                                     : 'A rádio online transmite transmissões estáticas gratuitas via SoundHelix.'}
                                 </div>
                               </div>
                             </div>
 
                             {/* Right Side: Tracklist list mapping */}
                             <div className="flex-grow flex flex-col bg-[#1c1c1f] overflow-y-auto scrollbar-thin">
                               <div className="p-3 border-b border-zinc-950 bg-zinc-900/10 select-none flex items-center justify-between">
                                 <span className="text-[10px] font-extrabold uppercase tracking-widest text-zinc-500">
                                   {rhythmAudioMode === 'local' ? 'Título / Faixa' : 'Estação / Gênero'}
                                 </span>
                                 <span className="text-[10px] font-extrabold uppercase tracking-widest text-zinc-500 px-6">Duração</span>
                               </div>
 
                               <div className="flex-1 divide-y divide-zinc-900/30">
                                 {(rhythmAudioMode === 'local' ? DUA_LIPA_ALBUM_TRAILER : RADIO_STATIONS).map((track, i) => {
                                   const isActive = rhythmTrack === i;
                                   const isLiked = rhythmLiked[i];
                                   return (
                                     <div 
                                       key={i}
                                       onClick={() => playTrack(i)}
                                       className={`group px-4 py-3 cursor-pointer flex items-center justify-between transition-all ${isActive ? 'bg-[#d70a53]/10 border-l-4 border-l-[#d70a53]' : 'hover:bg-white/5'}`}
                                     >
                                       <div className="flex items-center gap-3.5 min-w-0">
                                         {/* Play icon / Track Number */}
                                         <div className="w-6 h-6 flex items-center justify-center shrink-0">
                                           {isActive && rhythmPlaying ? (
                                             /* Active wave animations */
                                             <div className="flex gap-0.5 items-end justify-center h-2.5 w-3.5 select-none">
                                               <div className="w-0.5 bg-[#d70a53] rounded animate-[bounce_1s_infinite_100ms] h-full" />
                                               <div className="w-0.5 bg-[#d70a53] rounded animate-[bounce_1s_infinite_300ms] h-3/4" />
                                               <div className="w-0.5 bg-[#d70a53] rounded animate-[bounce_1s_infinite_550ms] h-1/2" />
                                             </div>
                                           ) : (
                                             <span className={`text-[10px] font-bold ${isActive ? 'text-[#d70a53]' : 'text-zinc-500 group-hover:hidden'}`}>
                                               {String(i + 1).padStart(2, '0')}
                                             </span>
                                           )}
                                           <Play size={10} className={`hidden group-hover:block ${isActive ? 'text-[#d70a53]' : 'text-zinc-200'}`} />
                                         </div>
 
                                         {/* Track Meta inside column */}
                                         <div className="flex flex-col min-w-0">
                                           <span className={`text-xs font-bold leading-snug truncate ${isActive ? 'text-white' : 'text-zinc-200'}`}>
                                             {track.title}
                                           </span>
                                           <span className="text-[10px] text-zinc-400 truncate mt-0.5">
                                             {rhythmAudioMode === 'local' ? 'Dua Lipa — Radical Optimism' : 'Rádio FM Online'}
                                           </span>
                                         </div>
                                       </div>
 
                                       <div className="flex items-center gap-3 shrink-0 select-none">
                                         {isLiked && <Heart size={10} fill="#d70a53" className="text-[#d70a53]" />}
                                         <span className="text-[10px] font-mono font-medium text-zinc-500 group-hover:text-zinc-300">
                                           {track.duration}
                                         </span>
                                       </div>
                                     </div>
                                   );
                                 })}
                               </div>
                             </div>
                          </div>

                          {/* Bottom Controls / Player Bar */}
                          <div className="h-16 bg-[#212124] border-t border-zinc-900/90 px-5 flex items-center gap-4 select-none shrink-0">
                            {/* Media buttons group */}
                            <div className="flex items-center gap-3 shrink-0">
                              <button 
                                onClick={prevTrack} 
                                className="p-2 text-zinc-400 hover:text-white hover:bg-white/5 active:scale-90 rounded-full transition-all cursor-pointer"
                                title="Anterior"
                              >
                                <SkipBack size={15} />
                              </button>
                              
                              <button 
                                onClick={togglePlay} 
                                className="p-3 bg-[#d70a53] hover:bg-[#b00540] text-white rounded-full hover:scale-105 active:scale-95 shadow transition-all cursor-pointer flex items-center justify-center"
                                title={rhythmPlaying ? 'Pausar' : 'Reproduzir'}
                              >
                                {rhythmPlaying ? <Pause size={15} /> : <Play size={15} className="ml-0.5" />}
                              </button>

                              <button 
                                onClick={nextTrack} 
                                className="p-2 text-zinc-400 hover:text-white hover:bg-white/5 active:scale-90 rounded-full transition-all cursor-pointer"
                                title="Próxima"
                              >
                                <SkipForward size={15} />
                              </button>
                            </div>

                            {/* Shuffle / Repeat */}
                            <div className="flex items-center gap-2 shrink-0 border-r border-zinc-800 pr-4">
                              <button 
                                onClick={() => setRhythmShuffle(!rhythmShuffle)}
                                className={`p-1.5 rounded-lg transition-all ${rhythmShuffle ? 'bg-[#d70a53]/15 text-[#d70a53]' : 'text-zinc-500 hover:text-zinc-300'}`}
                                title="Modo Embaralhar"
                              >
                                <Shuffle size={12} />
                              </button>

                              <button 
                                onClick={() => setRhythmRepeat(!rhythmRepeat)}
                                className={`p-1.5 rounded-lg transition-all ${rhythmRepeat ? 'bg-[#d70a53]/15 text-[#d70a53]' : 'text-zinc-500 hover:text-zinc-300'}`}
                                title="Repetir Faixa"
                              >
                                <Repeat size={12} />
                              </button>
                            </div>

                            {/* Slider timeline element */}
                            <div className="flex-grow flex items-center gap-2 md:gap-3 text-[10px] font-mono text-zinc-500 flex-1">
                              <span>
                                {Math.floor(audioCurrentTime / 60)}:{String(Math.floor(audioCurrentTime % 60)).padStart(2, '0')}
                              </span>

                              <div 
                                onClick={handleProgressClick}
                                className="h-1.5 bg-zinc-800 rounded-full overflow-hidden cursor-pointer relative group flex-grow flex-1"
                              >
                                <div 
                                  className="absolute top-0 bottom-0 left-0 bg-[#d70a53] group-hover:bg-[#f61c6b] transition-colors"
                                  style={{ width: `${(audioCurrentTime / audioDuration) * 100}%` }}
                                />
                              </div>

                              <span>
                                {Math.floor(audioDuration / 60)}:{String(Math.floor(audioDuration % 60)).padStart(2, '0')}
                              </span>
                            </div>

                            {/* Right Speaker controls */}
                            <div className="flex items-center gap-2 shrink-0 border-l border-zinc-850 pl-4 w-24 md:w-32">
                              <Volume2 size={13} className="text-zinc-500 hover:text-zinc-300 transition-colors" />
                              <input 
                                type="range" 
                                min="0" 
                                max="100" 
                                value={volume}
                                onChange={(e) => setVolume(parseInt(e.target.value))}
                                className="w-full accent-[#d70a53] cursor-pointer h-1.5 bg-zinc-800 hover:accent-[#f61c6b]"
                                title="Volume"
                              />
                            </div>
                          </div>
                        </div>
                      )}

                      {/* GENERIC PLACEHOLDER APPS */}
                      {!['firefox', 'files', 'gedit', 'calculator', 'settings', 'terminal', 'calendar', 'help', 'rhythmbox'].includes(win.id) && (
                        <div className="w-full h-full flex flex-col items-center justify-center p-6 text-zinc-300 select-none">
                          <Monitor size={36} className="text-[#d70a53]/60 mb-3 animate-bounce" />
                          <p className="font-bold text-white text-sm">{win.title}</p>
                          <p className="text-zinc-500 text-xs mt-1">Este aplicativo está sendo simulado de forma visual.</p>
                          <button 
                            onClick={() => openApp('terminal')}
                            className="mt-6 text-xs bg-[#d70a53]/80 hover:bg-[#d70a53] text-white rounded-[6px] font-bold px-4 py-2 transition-all"
                          >
                            Ir para o Terminal
                          </button>
                        </div>
                      )}

                    </div>
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </div>

          {/* GNOME OVERVIEW (ACTIVITIES SEARCH BAR, WORKSPACES AND DOCK PANEL) */}
          <AnimatePresence>
            {isOverviewOpen && (
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="absolute inset-0 z-[500] bg-black/45 backdrop-blur-2xl flex flex-col justify-between py-8"
                onClick={() => setIsOverviewOpen(false)}
                onWheel={(e) => {
                  if (appSearch) return; // Allow normal scrolling in the search result list
                  const now = Date.now();
                  if (now - lastWheelTime.current < 450) return;
                  const totalPages = Math.ceil(CORE_APPS.length / 24);
                  
                  // Handle scroll directions (vertical and horizontal delta)
                  if (Math.abs(e.deltaY) > 8 || Math.abs(e.deltaX) > 8) {
                    if (e.deltaY > 8 || e.deltaX > 8) {
                      if (menuPage < totalPages - 1) {
                        setMenuPage(prev => prev + 1);
                        lastWheelTime.current = now;
                      }
                    } else if (e.deltaY < -8 || e.deltaX < -8) {
                      if (menuPage > 0) {
                        setMenuPage(prev => prev - 1);
                        lastWheelTime.current = now;
                      }
                    }
                  }
                }}
              >
                {/* Search string center display */}
                <div className="max-w-lg mx-auto w-full px-4 select-none shrink-0" onClick={(e) => e.stopPropagation()}>
                  <div className="relative flex items-center bg-[#252525]/90 border border-white/10 rounded-full shadow-2xl overflow-hidden focus-within:border-white/30 transition-all">
                    <Search size={18} className="text-zinc-400 ml-4 shrink-0" />
                    <input 
                      type="text" 
                      value={appSearch}
                      onChange={(e) => setAppSearch(e.target.value)}
                      placeholder={currentLang === 'pt-br' ? "Digite para pesquisar..." : "Type to search..."}
                      className="w-full bg-transparent border-none outline-none text-zinc-200 px-3 py-3 text-sm focus:ring-0"
                      autoFocus
                    />
                    {appSearch && (
                      <button 
                        onClick={() => setAppSearch('')}
                        className="p-1.5 hover:bg-white/5 rounded-full mr-3 text-zinc-400 hover:text-white"
                      >
                        <X size={14} />
                      </button>
                    )}
                  </div>
                </div>

                {/* Workspaces list switcher AND app launcher listing grid */}
                <div className="flex-1 w-full flex flex-col items-center justify-start overflow-hidden px-6 sm:px-16 py-3 gap-5">
                  
                  {/* True GNOME Workspaces switcher thumbnails at the top */}
                  <div className="flex gap-4 p-1 select-none justify-center shrink-0">
                    <div className="w-[136px] h-[78px] bg-gradient-to-r from-teal-800 to-indigo-900 border-2 border-white/30 rounded-lg shadow-2xl flex items-center justify-center relative cursor-pointer">
                      <div className="absolute inset-0 bg-cover bg-center rounded-md opacity-30" style={{ backgroundImage: `url(${currentWallpaper})` }}></div>
                    </div>
                    <div className="w-[136px] h-[78px] bg-zinc-900/80 border border-white/5 rounded-lg shadow-xl flex items-center justify-center relative opacity-50 hover:opacity-100 transition-opacity cursor-pointer">
                    </div>
                  </div>

                  {/* Program Icons Grid wrapper (horizontal sliding pager) */}
                  <div 
                    className="w-full max-w-5xl mx-auto flex-1 flex flex-col items-center justify-center select-none pb-2 relative"
                    onClick={(e) => e.stopPropagation()}
                  >
                    {!appSearch ? (
                      <div 
                        className="relative w-full flex-1 flex items-center justify-center min-h-[350px] px-8 lg:px-16"
                      >
                        {/* Left Control Arrow */}
                        {menuPage > 0 && (
                          <button
                            onClick={() => setMenuPage(prev => prev - 1)}
                            className="absolute left-0 p-2 text-zinc-400 hover:text-white hover:scale-110 active:scale-95 transition-all duration-200 z-[600] cursor-pointer bg-transparent"
                            title="Página Anterior"
                          >
                            <ChevronLeft size={28} />
                          </button>
                        )}

                        {/* Page Slider with Animation */}
                        <AnimatePresence mode="wait">
                          <motion.div
                            key={menuPage}
                            initial={{ opacity: 0, x: 30 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -30 }}
                            transition={{ duration: 0.22, ease: "easeOut" }}
                            className="w-full"
                          >
                            <div className="grid grid-cols-4 sm:grid-cols-6 md:grid-cols-8 gap-x-2.5 gap-y-5 md:gap-y-6 w-full justify-items-center">
                              {CORE_APPS.slice(menuPage * 24, (menuPage + 1) * 24).map((app) => (
                                <button 
                                  key={app.id}
                                  onClick={() => {
                                    setAppSearch('');
                                    setIsOverviewOpen(false);
                                    openApp(app.id);
                                  }}
                                  className="flex flex-col items-center justify-center text-center p-2 w-24 hover:bg-white/10 rounded-2xl border border-transparent hover:border-white/5 transition-all outline-none group cursor-pointer"
                                >
                                  <div className="relative p-1 group-hover:scale-110 transition-transform duration-300">
                                    <DockAppIcon 
                                      src={app.icon} 
                                      alt={app.name} 
                                      id={app.id}
                                      className="w-12 h-12" 
                                    />
                                  </div>
                                  <span className="text-[11px] font-medium text-zinc-300 mt-2 leading-tight line-clamp-1 truncate w-22 text-center group-hover:text-white transition-colors">{app.name}</span>
                                </button>
                              ))}
                            </div>
                          </motion.div>
                        </AnimatePresence>

                        {/* Right Control Arrow */}
                        {menuPage < Math.ceil(CORE_APPS.length / 24) - 1 && (
                          <button
                            onClick={() => setMenuPage(prev => prev + 1)}
                            className="absolute right-0 p-2 text-zinc-400 hover:text-white hover:scale-110 active:scale-95 transition-all duration-200 z-[600] cursor-pointer bg-transparent"
                            title="Próxima Página"
                          >
                            <ChevronRight size={28} />
                          </button>
                        )}
                      </div>
                    ) : (
                      /* Search Grid View - scrolls vertically if results overflow */
                      <div className="w-full max-h-[380px] overflow-y-auto custom-scrollbar px-4">
                        <div className="grid grid-cols-4 sm:grid-cols-6 md:grid-cols-8 gap-x-2.5 gap-y-5 md:gap-y-6 w-full justify-items-center">
                          {filteredApps.map((app) => (
                            <button 
                              key={app.id}
                              onClick={() => {
                                setAppSearch('');
                                setIsOverviewOpen(false);
                                openApp(app.id);
                              }}
                              className="flex flex-col items-center justify-center text-center p-2 w-24 hover:bg-white/10 rounded-2xl border border-transparent hover:border-white/5 transition-all outline-none group cursor-pointer"
                            >
                              <div className="relative p-1 group-hover:scale-110 transition-transform duration-300">
                                <DockAppIcon 
                                  src={app.icon} 
                                  alt={app.name} 
                                  id={app.id}
                                  className="w-12 h-12" 
                                />
                              </div>
                              <span className="text-[11px] font-medium text-zinc-300 mt-2 leading-tight line-clamp-1 truncate w-22 text-center group-hover:text-white transition-colors">{app.name}</span>
                            </button>
                          ))}

                          {filteredApps.length === 0 && (
                            <p className="col-span-full text-zinc-400 text-xs py-10">Nenhum programa correspondente encontrado.</p>
                          )}
                        </div>
                      </div>
                    )}
                    
                    {/* Pagination page dots */}
                    {!appSearch && (
                      <div className="flex gap-3 justify-center mt-5 shrink-0">
                        {Array.from({ length: Math.ceil(CORE_APPS.length / 24) }).map((_, idx) => (
                          <button
                            key={idx}
                            onClick={() => setMenuPage(idx)}
                            className={`h-2.5 w-2.5 rounded-full transition-all duration-300 outline-none ${menuPage === idx ? 'bg-white scale-125' : 'bg-white/25 hover:bg-white/55'}`}
                          />
                        ))}
                      </div>
                    )}
                  </div>
                </div>

                 {/* GNOME DASH (BOTTOM FLOATING DOCK OF ACTIVE APPS) */}
                 <div className="flex justify-center select-none pb-4" onClick={(e) => e.stopPropagation()}>
                   <div className="bg-[#1e1e20]/95 backdrop-blur-3xl border border-white/10 rounded-3xl p-3 shadow-2xl flex items-center gap-3.5 max-w-xs sm:max-w-md md:max-w-4xl overflow-visible">
                     {(() => {
                       const settingsIndex = CORE_APPS.findIndex(app => app.id === 'settings');
                       const dockApps = settingsIndex !== -1 ? CORE_APPS.slice(0, settingsIndex + 1) : CORE_APPS;
                       return dockApps.map((app) => (
                         <button 
                           key={app.id}
                           onClick={() => openApp(app.id)}
                           className="relative group p-1 hover:scale-110 hover:-translate-y-1 transition-all shrink-0 cursor-pointer flex-shrink-0"
                           title={app.name}
                         >
                           <DockAppIcon 
                             src={app.icon} 
                             alt={app.name} 
                             id={app.id}
                             className="w-13 h-13 md:w-14 md:h-14 pointer-events-none drop-shadow-md select-none shrink-0"
                           />
                           {/* Display Active indicator below icon if open */}
                           {activeWindows.find(w => w.id === app.id)?.isOpen && (
                             <div className="absolute bottom-0.5 left-1/2 -translate-x-1/2 w-1.5 h-1.5 bg-white/80 rounded-full"></div>
                           )}
                           
                           {/* Hover Tooltip name bubble - appears outside due to overflow-visible */}
                           <div className="absolute bottom-16 left-1/2 -translate-x-1/2 bg-[#181818]/95 backdrop-blur-lg border border-white/10 text-white rounded px-2.5 py-1 text-[10px] font-bold opacity-0 group-hover:opacity-100 transition-all shadow-xl pointer-events-none whitespace-nowrap z-[1000]">
                             {app.name}
                           </div>
                         </button>
                       ));
                     })()}
                   </div>
                 </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* GNOME MINIFIED QUICK CONSOLE DESKTOP CONTROLS */}
          <div className="absolute bottom-6 right-6 flex items-center gap-3 z-50">
            {/* Clear all window panels shortcut */}
            {activeWindows.length > 0 && (
              <button 
                onClick={() => setActiveWindows([])}
                className="bg-black/60 hover:bg-black/80 text-xs border border-white/5 text-zinc-300 font-bold px-3 py-1.5 rounded-full select-none shadow transition-all flex items-center gap-1.5"
                title="Minimizar todas"
              >
                <Minimize2 size={12} /> Despejar Janelas
              </button>
            )}
          </div>
        </div>
      )}

      {/* Global persistent audio element for Rhythmbox playback to ensure it stays mounted and plays across window toggles */}
      <audio
        ref={audioRef}
        src={getTrackSources(rhythmTrack)[audioAttempt] || `https://www.soundhelix.com/examples/mp3/SoundHelix-Song-${(rhythmTrack % 16) + 1}.mp3`}
        preload="auto"
        onError={handleAudioError}
        onTimeUpdate={() => {
          if (audioRef.current) {
            setAudioCurrentTime(audioRef.current.currentTime);
          }
        }}
        onLoadedMetadata={() => {
          if (audioRef.current) {
            setAudioDuration(audioRef.current.duration || 185);
          }
        }}
        onEnded={() => {
          if (rhythmRepeat) {
            if (audioRef.current) {
              audioRef.current.currentTime = 0;
              audioRef.current.play().catch(e => console.log(e));
            }
          } else {
            const nextIdx = rhythmShuffle 
              ? Math.floor(Math.random() * DUA_LIPA_ALBUM_TRAILER.length)
              : (rhythmTrack + 1) % DUA_LIPA_ALBUM_TRAILER.length;
            playTrack(nextIdx);
          }
        }}
      />

      {/* Real Screen Brightness Overlay */}
      <div 
        className="absolute inset-0 pointer-events-none bg-black transition-opacity duration-150 z-[99999]"
        style={{ opacity: Math.max(0, 1 - brightness / 100) * 0.82 }}
      />
    </div>
  );
};
