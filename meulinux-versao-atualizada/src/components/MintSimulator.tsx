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
  RotateCcw, MoreVertical, Lock, AlertCircle, StarOff, Home,
  SkipBack, SkipForward, Heart, ThumbsDown, Repeat, Shuffle, Volume1,
  Music, Image, Download, ChevronDown, Printer, Network
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

// Mint Distribution Asset Constants
const PORTY_MINT_WALLPAPER = '/assets/wallpaper-2.webp';
const PORTY_MINT_SPLASH_LOGO = '/assets/Linux_Mint_logo_without_wordmark.svg_.png';

// Fallback high quality links (Conectados diretamente aos repositórios oficiais do GitHub do Linux Mint)
const MINT_WALLPAPER = PORTY_MINT_WALLPAPER;
const MINT_SPLASH_LOGO = PORTY_MINT_SPLASH_LOGO;
const MINT_APPS_DIR = '/assets/';
const MINT_CATEGORIES_DIR = '/assets/';
const MINT_PLACES_DIR = '/assets/';

// Specific Mint-Y App Icons mapping
const MINT_ICONS = {
  nemo: '/assets/folder (1).png',
  terminal: 'utilities-terminal.svg',
  firefox: '/assets/firefox.png',
  calculator: '/assets/accessories-calculator.png',
  settings: '/assets/preferences-desktop-theme.png',
  rhythmbox: '/assets/rhythmbox (2).png',
  mintinstall: '/assets/mintinstall.png',
  xed: '/assets/accessories-text-editor.png',
  mintupdate: '/assets/mintupdate.png',
  pix: '/assets/pix.png',
  logo: 'linux-mint-icon.svg'
};

// UI Component for Nemo Folder Icons (Sand Theme Accent Mint-Y style)
const NemoFolderIcon: React.FC<{ type: string; className?: string }> = ({ type = "folder", className = "w-12 h-12" }) => {
  const [hasError, setHasError] = useState(false);
  const normType = type.toLowerCase().trim();

  const iconUrl = (() => {
    let iconFile = 'folder (1).png';
    if (normType === 'desktop' || normType === 'user-desktop' || normType === 'área de trabalho') {
      iconFile = 'user-desktop (1).png';
    } else if (normType === 'home' || normType === 'user-home' || normType === 'pasta pessoal') {
      iconFile = 'user-home.png';
    } else if (normType === 'documents' || normType === 'documentos') {
      iconFile = 'folder-documents (1).png';
    } else if (normType === 'downloads' || normType === 'download' || normType === 'baixas') {
      iconFile = 'folder-download (1).png';
    } else if (normType === 'music' || normType === 'música' || normType === 'músicas') {
      iconFile = 'folder-music (1).png';
    } else if (normType === 'pictures' || normType === 'imagens' || normType === 'imagem') {
      iconFile = 'folder-pictures (1).png';
    } else if (normType === 'public' || normType === 'público' || normType === 'publicshare') {
      iconFile = 'folder-publicshare.png';
    } else if (normType === 'templates' || normType === 'modelos') {
      iconFile = 'folder-templates (1).png';
    } else if (normType === 'videos' || normType === 'vídeos') {
      iconFile = 'folder-videos (1).png';
    } else if (normType === 'trash' || normType === 'lixeira' || normType === 'user-trash') {
      iconFile = 'user-trash.png';
    } else if (normType === 'computer' || normType === 'computador') {
      iconFile = 'folder (1).png';
    }
    return `/assets/${iconFile}`;
  })();

  if (!hasError) {
    return (
      <img
        src={iconUrl}
        alt=""
        className={`${className} object-contain`}
        referrerPolicy="no-referrer"
        onError={() => setHasError(true)}
      />
    );
  }

  // Pure SVG high quality fallbacks styled in elegant Sand Gold / Soft Tan Accent (#b5a473)
  return (
    <svg className={`${className} drop-shadow-sm`} viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M6 10C6 8.34315 7.34315 7 9 7H19L24 12H39C40.6569 12 42 13.3431 42 15V38C42 39.6569 40.6569 41 39 41H9C7.34315 41 6 39.6569 6 38V10Z" fill="url(#mint_folder_back)" />
      <path d="M6 15C6 13.3431 7.34315 12 9 12H39C40.6569 12 42 13.3431 42 15V38C42 39.6569 40.6569 41 39 41H9C7.34315 41 6 39.6569 6 38V15Z" fill="url(#mint_folder_front)" />
      {normType === 'desktop' && <rect x="18" y="20" width="12" height="8" rx="1.5" stroke="white" strokeWidth="2" strokeOpacity="0.8" />}
      {normType === 'music' && <circle cx="21" cy="27" r="2.5" fill="white" fillOpacity="0.8" />}
      {normType === 'downloads' && <path d="M24 18V28M20 24L24 28L28 24" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />}
      <defs>
        <linearGradient id="mint_folder_back" x1="24" y1="7" x2="24" y2="41" gradientUnits="userSpaceOnUse">
          <stop stopColor="#816b47" />
          <stop offset="1" stopColor="#675333" />
        </linearGradient>
        <linearGradient id="mint_folder_front" x1="24" y1="12" x2="24" y2="41" gradientUnits="userSpaceOnUse">
          <stop stopColor="#bfa675" />
          <stop offset="1" stopColor="#9a8153" />
        </linearGradient>
      </defs>
    </svg>
  );
};

// Dedicated Component to load and crop the multi-size utilities-terminal.svg from meuLinux.com
const TerminalSvgIcon: React.FC<{ className?: string; fallbackUrl: string }> = ({ className = "w-10 h-10" }) => {
  return (
    <div className={`${className} overflow-hidden relative shrink-0 select-none hover:scale-105 transition-all duration-300`}>
      <img
        src="/assets/utilities-terminal.svg"
        alt="Terminal"
        className="absolute max-w-none max-h-none"
        referrerPolicy="no-referrer"
        style={{
          width: '187.5%', // 480 / 256
          height: '117.1872%', // 300 / 256
          left: '-6.25%', // -16 / 256
          top: '-10.9375%', // -28 / 256
        }}
      />
    </div>
  );
};

// Application Icon Component with fallback support
const MintAppIcon: React.FC<{ id: string; className?: string }> = ({ id, className = "w-10 h-10" }) => {
  const [hasError, setHasError] = useState(false);
  const rawUrl = MINT_ICONS[id as keyof typeof MINT_ICONS];
  const iconUrl = rawUrl ? (rawUrl.startsWith('http') ? rawUrl : `/assets/${rawUrl.split('/').pop()}`) : undefined;

  if (iconUrl && !hasError) {
    if (id === 'terminal' && iconUrl.includes('utilities-terminal.svg')) {
      return (
        <TerminalSvgIcon
          className={className}
          fallbackUrl="/assets/gnome-terminal.png"
        />
      );
    }

    return (
      <img
        src={iconUrl}
        alt=""
        className={`${className} object-contain hover:scale-105 transition-transform`}
        referrerPolicy="no-referrer"
        onError={() => setHasError(true)}
      />
    );
  }

  // Elegant static fallbacks with Mint Theme Accent colors
  const items: Record<string, { icon: React.ReactNode, bg: string }> = {
    nemo: { icon: <Folder size={20} className="text-white" />, bg: "bg-emerald-600" },
    terminal: { icon: <TermIcon size={20} className="text-white" />, bg: "bg-zinc-800" },
    firefox: { icon: <Globe size={20} className="text-white" />, bg: "bg-blue-600" },
    calculator: { icon: <span className="text-white text-xs font-mono font-bold">123</span>, bg: "bg-slate-700" },
    settings: { icon: <SettingsIcon size={20} className="text-white" />, bg: "bg-slate-600" },
    mintinstall: { icon: <Download size={20} className="text-white" />, bg: "bg-emerald-700" },
    rhythmbox: { icon: <Music size={20} className="text-white" />, bg: "bg-rose-600" },
    xed: { icon: <File size={20} className="text-white" />, bg: "bg-teal-600" },
    mintupdate: { icon: <RotateCw size={20} className="text-white" />, bg: "bg-emerald-500" },
    pix: { icon: <Image size={20} className="text-white" />, bg: "bg-cyan-600" }
  };

  const current = items[id] || { icon: <Folder size={20} />, bg: "bg-[#87cf3e]" };

  return (
    <div className={`${className} rounded-xl ${current.bg} flex items-center justify-center shadow-md select-none hover:scale-105 transition-all`}>
      {current.icon}
    </div>
  );
};

// Music Data mapping (reusing exact songs of Ubuntu for continuity and client request)
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

interface MintSimulatorProps {
  onClose: () => void;
}

interface WindowData {
  id: string;
  title: string;
  icon: React.ReactNode;
  isOpen: boolean;
  isMinimized: boolean;
  isMaximized: boolean;
  x: number;
  y: number;
  width: number;
  height: number;
  zIndex: number;
}

export const MintSimulator: React.FC<MintSimulatorProps> = ({ onClose }) => {
  const { i18n } = useTranslation();
  const isEn = i18n.language === 'en';

  // Simulator States
  const [showSplash, setShowSplash] = useState(true);
  const [showSimInfoNotify, setShowSimInfoNotify] = useState(false);
  const [bgWallpaper, setBgWallpaper] = useState(MINT_WALLPAPER);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [desktopIconSize, setDesktopIconSize] = useState<'sm' | 'md' | 'lg'>('md');
  const [showNotification, setShowNotification] = useState<string | null>(null);

  // Mint Menu (Cinnamon Start Menu) state
  const [isMintMenuOpen, setIsMintMenuOpen] = useState(false);
  const [menuSearch, setMenuSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  // Opened app Windows state
  const [windows, setWindows] = useState<WindowData[]>([
    { id: 'nemo', title: 'Nemo - Arquivos', icon: <NemoFolderIcon type="folder" className="w-[14px] h-[14px]" />, isOpen: false, isMinimized: false, isMaximized: false, x: 120, y: 70, width: 780, height: 500, zIndex: 10 },
    { id: 'firefox', title: 'Navegador Web Firefox', icon: <Globe size={13} className="text-orange-400" />, isOpen: false, isMinimized: false, isMaximized: false, x: 140, y: 80, width: 900, height: 580, zIndex: 11 },
    { id: 'terminal', title: 'Terminal do Cinnamon', icon: <MintAppIcon id="terminal" className="w-[14px] h-[14px]" />, isOpen: false, isMinimized: false, isMaximized: false, x: 200, y: 150, width: 700, height: 430, zIndex: 12 },
    { id: 'rhythmbox', title: 'Rhythmbox', icon: <MintAppIcon id="rhythmbox" className="w-[14px] h-[14px]" />, isOpen: false, isMinimized: false, isMaximized: false, x: 180, y: 100, width: 850, height: 530, zIndex: 13 },
    { id: 'calculator', title: 'Calculadora', icon: <MintAppIcon id="calculator" className="w-[14px] h-[14px]" />, isOpen: false, isMinimized: false, isMaximized: false, x: 340, y: 120, width: 280, height: 400, zIndex: 14 },
    { id: 'xed', title: 'Editor de Textos Xed', icon: <MintAppIcon id="xed" className="w-[14px] h-[14px]" />, isOpen: false, isMinimized: false, isMaximized: false, x: 240, y: 110, width: 620, height: 450, zIndex: 15 },
    { id: 'settings', title: 'Configurações de Tema', icon: <MintAppIcon id="settings" className="w-[14px] h-[14px]" />, isOpen: false, isMinimized: false, isMaximized: false, x: 300, y: 100, width: 520, height: 420, zIndex: 16 }
  ]);
  const [topZ, setTopZ] = useState(16);

  // Nemo Folder Navigation
  const [nemoFolder, setNemoFolder] = useState('Home');
  const [nemoView, setNemoView] = useState<'grid' | 'list'>('grid');
  const [nemoSearch, setNemoSearch] = useState('');
  const [showNemoSearchInput, setShowNemoSearchInput] = useState(false);
  const [customFolders, setCustomFolders] = useState<string[]>([]);

  // Rhythmbox Music Player State
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [currentTrackIndex, setCurrentTrackIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [trackVolume, setTrackVolume] = useState(80);
  const [isMuted, setIsMuted] = useState(false);
  const [musicProgress, setMusicProgress] = useState(0);
  const [rhythmboxActiveView, setRhythmboxActiveView] = useState('songs');
  const [audioAttempt, setAudioAttempt] = useState(0);
  const [rhythmAudioMode, setRhythmAudioMode] = useState<'online' | 'local'>('local');
  const [audioDuration, setAudioDuration] = useState(185);

  // Cinnamon Terminal interactive console
  const [terminalHistory, setTerminalHistory] = useState<string[]>([]);
  const [terminalInput, setTerminalInput] = useState('');
  const termEndRef = useRef<HTMLDivElement>(null);

  // System status tray indicators states
  const [showTrayVolume, setShowTrayVolume] = useState(false);
  const [trayVolume, setTrayVolume] = useState(70);
  const [showTrayCalendar, setShowTrayCalendar] = useState(false);
  const [systemTime, setSystemTime] = useState('');
  const [systemDate, setSystemDate] = useState('');

  // Xed Text Editor content state
  const [xedText, setXedText] = useState('');
  const [xedActiveMenu, setXedActiveMenu] = useState<'arquivo' | 'editar' | 'exibir' | 'ajuda' | null>(null);
  const [xedFontSize, setXedFontSize] = useState<number>(14);
  const [xedTheme, setXedTheme] = useState<'dark' | 'light'>('dark');

  // Desktop context menu state
  const [contextMenu, setContextMenu] = useState<{ x: number; y: number; isOpen: boolean } | null>(null);

  // Firefox web simulation state
  interface FirefoxTab {
    id: string;
    title: string;
    url: string;
    history: string[];
    historyIndex: number;
    srcdoc?: string;
    loadStatus: 'direct' | 'srcdoc' | 'fallback' | 'newtab';
  }

  const [firefoxTabs, setFirefoxTabs] = useState<FirefoxTab[]>([
    {
      id: 'tab-1',
      title: 'Google',
      url: 'https://www.google.com/search?igu=1',
      history: ['https://www.google.com/search?igu=1'],
      historyIndex: 0,
      loadStatus: 'direct'
    }
  ]);
  const [activeTabId, setActiveTabId] = useState('tab-1');

  // Sync state derived from the active tab
  const activeTab = firefoxTabs.find(t => t.id === activeTabId) || firefoxTabs[0];
  const firefoxCurrentUrl = activeTab.url;
  const firefoxHistory = activeTab.history;
  const firefoxHistoryIndex = activeTab.historyIndex;

  const [firefoxInputUrl, setFirefoxInputUrl] = useState('https://www.google.com/search?igu=1');
  const [isFirefoxLoading, setIsFirefoxLoading] = useState(false);
  const [showFirefoxMenu, setShowFirefoxMenu] = useState(false);
  const [showFirefoxPrivacyModal, setShowFirefoxPrivacyModal] = useState(false);

  // YouTube simulation states
  const [ytSearchQuery, setYtSearchQuery] = useState('');
  const [ytActiveVideoId, setYtActiveVideoId] = useState<string | null>(null);
  const [ytLikedVideos, setYtLikedVideos] = useState<string[]>([]);
  const [ytSubscribedChannels, setYtSubscribedChannels] = useState<string[]>([]);

  const [firefoxFavorites, setFirefoxFavorites] = useState<{ name: string; url: string }[]>(() => {
    try {
      const saved = localStorage.getItem('quiabbo_browser_favorites');
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.error(e);
    }
    return [
      { name: 'Google', url: 'https://www.google.com/search?igu=1' },
      { name: 'DuckDuckGo', url: 'https://html.duckduckgo.com/html/' },
      { name: 'Wikipedia', url: 'https://pt.m.wikipedia.org/' },
      { name: 'Meu Linux', url: 'https://meulinux.com' }
    ];
  });
  const [firefoxToast, setFirefoxToast] = useState<{ message: string; visible: boolean }>({ message: '', visible: false });

  const firefoxIframeRef = useRef<HTMLIFrameElement>(null);
  const firefoxMenuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (firefoxMenuRef.current && !firefoxMenuRef.current.contains(e.target as Node)) {
        setShowFirefoxMenu(false);
      }
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  useEffect(() => {
    const closeMenu = () => {
      setContextMenu(null);
    };
    window.addEventListener('click', closeMenu);
    return () => window.removeEventListener('click', closeMenu);
  }, []);

  const handleDesktopContextMenu = (e: React.MouseEvent) => {
    e.preventDefault();
    setContextMenu({
      x: e.clientX,
      y: e.clientY,
      isOpen: true
    });
  };

  const showFirefoxToast = (message: string) => {
    setFirefoxToast({ message, visible: true });
    setTimeout(() => setFirefoxToast({ message: '', visible: false }), 2000);
  };

  const isCORSBlocked = (url: string) => {
    const lower = url.toLowerCase();
    if (lower.includes('google.com') && !lower.includes('igu=1')) return true;
    if (lower.includes('facebook.com')) return true;
    if (lower.includes('github.com')) return true;
    if (lower.includes('instagram.com')) return true;
    if (lower.includes('twitter.com') || lower.includes('x.com')) return true;
    if (lower.includes('linkedin.com')) return true;
    if (lower.includes('reddit.com')) return true;
    if (lower.includes('netflix.com') || lower.includes('netflix')) return true;
    if (lower.includes('amazon.com')) return true;
    if (lower.includes('twitch.tv')) return true;
    return false;
  };

  const isYoutube = (url: string) => {
    const lower = url.toLowerCase();
    return lower.includes('youtube.com') || lower.includes('youtu.be');
  };

  const getFavicon = (url: string) => {
    try {
      if (!url || url === 'about:newtab') return 'firefox_browser_logo_icon_152991.png';
      const parsed = new URL(url);
      return `https://www.google.com/s2/favicons?sz=32&domain=${parsed.hostname}`;
    } catch {
      return 'https://www.google.com/s2/favicons?sz=32&domain=google.com';
    }
  };

  const getTabTitle = (url: string) => {
    try {
      if (!url || url === 'about:newtab') return 'Nova aba';
      const parsed = new URL(url);
      if (parsed.hostname.includes('google.com')) return 'Google';
      if (parsed.hostname.includes('youtube.com') || parsed.hostname.includes('youtu.be')) return 'YouTube Sim';
      if (parsed.hostname.includes('wikipedia.org')) return 'Wikipedia';
      if (parsed.hostname.includes('meulinux.com')) return 'Meu Linux Portal';
      if (parsed.hostname.includes('duckduckgo.com')) return 'DuckDuckGo';
      return parsed.hostname.replace('www.', '');
    } catch (e) {
      if (url.includes('google.com')) return 'Google';
      if (url.includes('youtube.com') || url.includes('youtu.be')) return 'YouTube Sim';
      if (url.includes('meulinux.com')) return 'Meu Linux Portal';
      if (url === 'about:newtab') return 'Nova aba';
      return 'Pesquisa';
    }
  };

  const openNewFirefoxTab = () => {
    const newId = `tab-${Date.now()}`;
    const newTab: FirefoxTab = {
      id: newId,
      title: 'Google',
      url: 'https://www.google.com/search?igu=1',
      history: ['https://www.google.com/search?igu=1'],
      historyIndex: 0,
      loadStatus: 'direct'
    };
    setFirefoxTabs(prev => [...prev, newTab]);
    setActiveTabId(newId);
    setFirefoxInputUrl('https://www.google.com/search?igu=1');
    setYtActiveVideoId(null);
  };

  const closeFirefoxTab = (tabIdToClose: string) => {
    if (firefoxTabs.length <= 1) return;
    const closedIndex = firefoxTabs.findIndex(t => t.id === tabIdToClose);
    const newTabs = firefoxTabs.filter(t => t.id !== tabIdToClose);
    setFirefoxTabs(newTabs);

    // If we closed the active tab, switch active tab
    if (activeTabId === tabIdToClose) {
      const nextActiveIndex = Math.max(0, closedIndex - 1);
      const nextTab = newTabs[nextActiveIndex];
      setActiveTabId(nextTab.id);
      setFirefoxInputUrl(nextTab.url);

      if (!nextTab.url.includes('youtube.com') && !nextTab.url.includes('youtu.be')) {
        setYtActiveVideoId(null);
      }
    }
  };

  const fetchPageViaProxy = async (url: string, tabId: string) => {
    setIsFirefoxLoading(true);
    try {
      const rawUrl = `https://api.allorigins.win/raw?url=${encodeURIComponent(url)}`;
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 8000); // 8 seconds timeout

      const response = await fetch(rawUrl, { signal: controller.signal });
      clearTimeout(timeoutId);

      if (!response.ok) {
        throw new Error(`Proxy status: ${response.status}`);
      }
      const htmlText = await response.text();
      if (!htmlText || htmlText.trim().length === 0) {
        throw new Error("Empty proxy content");
      }

      // Inject <base> tag after <head>
      let modifiedHtml = htmlText;
      const baseTag = `<base href="${url}">`;

      if (modifiedHtml.includes('<head>')) {
        modifiedHtml = modifiedHtml.replace('<head>', `<head>${baseTag}`);
      } else if (modifiedHtml.includes('<HEAD>')) {
        modifiedHtml = modifiedHtml.replace('<HEAD>', `<HEAD>${baseTag}`);
      } else {
        modifiedHtml = baseTag + modifiedHtml;
      }

      // Inject event listener script for click interception
      const clickScript = `
        <script>
          (function() {
            var installClickDetector = function() {
              document.addEventListener('click', function(e) {
                var target = e.target.closest('a');
                if (target) {
                  var href = target.getAttribute('href');
                  if (href) {
                     var trimmed = href.trim();
                     if (trimmed && !trimmed.startsWith('#') && !trimmed.startsWith('javascript:')) {
                       e.preventDefault();
                       e.stopPropagation();
                       
                       var helper = document.createElement('a');
                       helper.href = href;
                       var absoluteUrl = helper.href;
                       
                       window.parent.postMessage({
                         type: 'FIREFOX_NAVIGATE',
                         url: absoluteUrl
                       }, '*');
                     }
                  }
                }
              }, true);
            };
            if (document.readyState === 'loading') {
              document.addEventListener('DOMContentLoaded', installClickDetector);
            } else {
              installClickDetector();
            }
          })();
        </script>
      `;

      if (modifiedHtml.includes('</body>')) {
        modifiedHtml = modifiedHtml.replace('</body>', `${clickScript}</body>`);
      } else if (modifiedHtml.includes('</BODY>')) {
        modifiedHtml = modifiedHtml.replace('</BODY>', `${clickScript}</BODY>`);
      } else {
        modifiedHtml = modifiedHtml + clickScript;
      }

      setFirefoxTabs(prev => prev.map(tab => {
        if (tab.id === tabId) {
          return {
            ...tab,
            srcdoc: modifiedHtml,
            loadStatus: 'srcdoc' as const
          };
        }
        return tab;
      }));
    } catch (err) {
      console.error("AllOrigins proxy fetch error:", err);
      setFirefoxTabs(prev => prev.map(tab => {
        if (tab.id === tabId) {
          return {
            ...tab,
            loadStatus: 'fallback' as const
          };
        }
        return tab;
      }));
    } finally {
      setIsFirefoxLoading(false);
    }
  };

  const navigateFirefox = (url: string) => {
    let normalized = url.trim();
    if (!normalized) return;

    if (normalized === 'about:newtab') {
      setFirefoxTabs(prev => prev.map(tab => {
        if (tab.id === activeTabId) {
          const newHistory = tab.history.slice(0, tab.historyIndex + 1);
          newHistory.push(normalized);
          return {
            ...tab,
            url: normalized,
            title: 'Nova aba',
            history: newHistory,
            historyIndex: newHistory.length - 1,
            srcdoc: undefined,
            loadStatus: 'newtab' as const
          };
        }
        return tab;
      }));
      setFirefoxInputUrl('about:newtab');
      setIsFirefoxLoading(false);
      setYtActiveVideoId(null);
      return;
    }

    if (!normalized.startsWith('http://') && !normalized.startsWith('https://')) {
      if (normalized.includes('.') && !normalized.includes(' ')) {
        normalized = 'https://' + normalized;
      } else {
        normalized = `https://www.google.com/search?q=${encodeURIComponent(normalized)}&igu=1`;
      }
    }

    const isGoogleHome = (u: string) => {
      const lower = u.toLowerCase().trim().replace('http://', '').replace('https://', '').replace('www.', '');
      return lower === 'google.com.br' || lower === 'google.com' || lower === 'google.com.br/' || lower === 'google.com/' || lower.includes('google.com.br/search?igu=1') || lower.includes('google.com/search?igu=1');
    };
    if (isGoogleHome(normalized)) {
      normalized = 'https://www.google.com/search?igu=1';
    }

    setFirefoxTabs(prev => prev.map(tab => {
      if (tab.id === activeTabId) {
        const newHistory = tab.history.slice(0, tab.historyIndex + 1);
        newHistory.push(normalized);
        return {
          ...tab,
          url: normalized,
          title: getTabTitle(normalized),
          history: newHistory,
          historyIndex: newHistory.length - 1,
          srcdoc: undefined,
          loadStatus: 'direct' as const
        };
      }
      return tab;
    }));

    setFirefoxInputUrl(normalized);

    if (normalized.includes('youtube.com') || normalized.includes('youtu.be')) {
      setYtActiveVideoId(null);
      setIsFirefoxLoading(false);
      return;
    }

    if (normalized.includes('google.com')) {
      setIsFirefoxLoading(true);
      if (firefoxIframeRef.current) {
        firefoxIframeRef.current.src = normalized;
      }
      return;
    }

    fetchPageViaProxy(normalized, activeTabId);
  };

  const goBackFirefox = () => {
    const tabToUpdate = firefoxTabs.find(t => t.id === activeTabId);
    if (tabToUpdate && tabToUpdate.historyIndex > 0) {
      const newIndex = tabToUpdate.historyIndex - 1;
      const url = tabToUpdate.history[newIndex];

      setFirefoxTabs(prev => prev.map(tab => {
        if (tab.id === activeTabId) {
          return {
            ...tab,
            url,
            title: getTabTitle(url),
            historyIndex: newIndex,
            srcdoc: undefined,
            loadStatus: url === 'about:newtab' ? 'newtab' : 'direct'
          };
        }
        return tab;
      }));
      setFirefoxInputUrl(url);

      if (!url.includes('youtube.com') && !url.includes('youtu.be')) {
        setYtActiveVideoId(null);
      }

      if (url === 'about:newtab') {
        setIsFirefoxLoading(false);
      } else if (url.includes('google.com')) {
        setIsFirefoxLoading(true);
        if (firefoxIframeRef.current) firefoxIframeRef.current.src = url;
      } else {
        fetchPageViaProxy(url, activeTabId);
      }
    }
  };

  const goForwardFirefox = () => {
    const tabToUpdate = firefoxTabs.find(t => t.id === activeTabId);
    if (tabToUpdate && tabToUpdate.historyIndex < tabToUpdate.history.length - 1) {
      const newIndex = tabToUpdate.historyIndex + 1;
      const url = tabToUpdate.history[newIndex];

      setFirefoxTabs(prev => prev.map(tab => {
        if (tab.id === activeTabId) {
          return {
            ...tab,
            url,
            title: getTabTitle(url),
            historyIndex: newIndex,
            srcdoc: undefined,
            loadStatus: url === 'about:newtab' ? 'newtab' : 'direct'
          };
        }
        return tab;
      }));
      setFirefoxInputUrl(url);

      if (!url.includes('youtube.com') && !url.includes('youtu.be')) {
        setYtActiveVideoId(null);
      }

      if (url === 'about:newtab') {
        setIsFirefoxLoading(false);
      } else if (url.includes('google.com')) {
        setIsFirefoxLoading(true);
        if (firefoxIframeRef.current) firefoxIframeRef.current.src = url;
      } else {
        fetchPageViaProxy(url, activeTabId);
      }
    }
  };

  const reloadFirefox = () => {
    if (firefoxCurrentUrl === 'about:newtab') return;
    setIsFirefoxLoading(true);
    if (firefoxCurrentUrl.includes('google.com')) {
      if (firefoxIframeRef.current) {
        firefoxIframeRef.current.src = firefoxCurrentUrl;
      }
    } else {
      fetchPageViaProxy(firefoxCurrentUrl, activeTabId);
    }
  };

  const stopLoadingFirefox = () => {
    setIsFirefoxLoading(false);
  };

  const toggleFirefoxFavorite = () => {
    const isFavorite = firefoxFavorites.some(f => f.url === firefoxCurrentUrl);
    let newFavorites;
    if (isFavorite) {
      newFavorites = firefoxFavorites.filter(f => f.url !== firefoxCurrentUrl);
      showFirefoxToast('Removido dos favoritos');
    } else {
      const domain = firefoxCurrentUrl.replace('https://', '').replace('http://', '').split('/')[0];
      newFavorites = [...firefoxFavorites, { name: domain, url: firefoxCurrentUrl }];
      showFirefoxToast('Adicionado aos favoritos');
    }
    setFirefoxFavorites(newFavorites);
    localStorage.setItem('quiabbo_browser_favorites', JSON.stringify(newFavorites));
    setShowFirefoxMenu(false);
  };

  const copyFirefoxUrl = () => {
    navigator.clipboard.writeText(firefoxCurrentUrl);
    showFirefoxToast('URL copiada');
    setShowFirefoxMenu(false);
  };

  const openFirefoxInNewTab = () => {
    window.open(firefoxCurrentUrl, '_blank', 'noopener,noreferrer');
    setShowFirefoxMenu(false);
  };

  const SIM_YOUTUBE_VIDEOS = [
    {
      id: "h-g8kHclUqU",
      title: "Ubuntu 26.04 LTS: Novidades e Instalação Completa do Sistema",
      channel: "Meu Linux Portal",
      views: "154 mil visualizações",
      time: "há 2 dias",
      avatar: "🐧",
      thumbnail: "bg-gradient-to-br from-[#87cf3e]/70 to-zinc-900"
    },
    {
      id: "jfKfPfyJRdk",
      title: "lofi hip hop radio - beats to relax/study to 💻 Focus Code",
      channel: "Lofi Girl",
      views: "45K assistindo agora",
      time: "AO VIVO",
      avatar: "🎧",
      thumbnail: "bg-gradient-to-br from-[#87cf3e]/50 to-pink-700"
    },
    {
      id: "dQw4w9WgXcQ",
      title: "Rick Astley - Never Gonna Give You Up (Official Video Classic)",
      channel: "RickAstleyVEVO",
      views: "1.4B visualizações",
      time: "há 14 anos",
      avatar: "🎤",
      thumbnail: "bg-gradient-to-br from-amber-700 to-yellow-500"
    },
    {
      id: "V1y-ZsDUNWg",
      title: "O que é Linux? Uma explicação simples, rápida e didática",
      channel: "Linux Descomplicado",
      views: "850 mil visualizações",
      time: "há 1 ano",
      avatar: "🤖",
      thumbnail: "bg-gradient-to-br from-green-700 to-zinc-805"
    },
    {
      id: "3v3_8W6uEno",
      title: "Como funciona a Internet? Do cabo submarino ao Wi-Fi",
      channel: "Computação Mágica",
      views: "230 mil visualizações",
      time: "há 8 meses",
      avatar: "🌐",
      thumbnail: "bg-gradient-to-br from-[#87cf3e]/40 to-blue-950"
    }
  ];

  useEffect(() => {
    const handleMsg = (e: MessageEvent) => {
      if (e.data && e.data.type === 'FIREFOX_NAVIGATE') {
        const urlObj = e.data.url;
        navigateFirefox(urlObj);
      }
    };
    window.addEventListener('message', handleMsg);
    return () => window.removeEventListener('message', handleMsg);
  }, [activeTabId, firefoxTabs]);

  // Auto-finish Firefox loader for custom React-rendered Google pages
  useEffect(() => {
    if (firefoxCurrentUrl.includes('google.com') && isFirefoxLoading) {
      const timer = setTimeout(() => {
        setIsFirefoxLoading(false);
      }, 400);
      return () => clearTimeout(timer);
    }
  }, [firefoxCurrentUrl, isFirefoxLoading]);

  // Dragging windows states
  const [dragInfo, setDragInfo] = useState<{ id: string; startX: number; startY: number; windowX: number; windowY: number } | null>(null);
  const [resizeInfo, setResizeInfo] = useState<{ id: string; startWidth: number; startHeight: number; startX: number; startY: number; startWinX: number; startWinY: number; direction: string } | null>(null);

  // Launch startup sound (sine sound simulating classic Linux Mint boot sound)
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowSplash(false);
      triggerSystemSound(600, 0.1, 0.4);
    }, 2200);
    return () => clearTimeout(timer);
  }, []);

  // Show simulation info notification 1 second after desktop loads
  useEffect(() => {
    if (!showSplash) {
      const timer = setTimeout(() => {
        setShowSimInfoNotify(true);
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [showSplash]);

  // Sync clocks
  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setSystemTime(now.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' }));
      setSystemDate(now.toLocaleDateString('pt-BR', { weekday: 'short', day: '2-digit', month: 'short' }).replace('.', ''));
    };
    updateTime();
    const interval = setInterval(updateTime, 60000);
    return () => clearInterval(interval);
  }, []);

  // Terminal scroll helper
  useEffect(() => {
    if (termEndRef.current) {
      termEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [terminalHistory]);

  // Build dynamic candidates list for audio sources based on selected mode
  const getTrackSources = (trackIdx: number) => {
    const file = DUA_LIPA_ALBUM_TRAILER[trackIdx].file;
    const baseName = file.substring(0, file.lastIndexOf('.')); // "01 End Of An Era"

    // Standard test tracks with perfect CORS policies and full accessibility
    const demoUrl = `https://www.soundhelix.com/examples/mp3/SoundHelix-Song-${(trackIdx % 16) + 1}.mp3`;

    if (rhythmAudioMode === 'online') {
      return [demoUrl];
    }

    // We automatically generate candidates, prioritizing .mp3 then .m4a
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

    // Reliable final fallback online track (SoundHelix)
    sources.push(demoUrl);

    return sources;
  };

  // Sync volume with HTML5 audio
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = isMuted ? 0 : trackVolume / 100;
    }
  }, [trackVolume, isMuted]);

  // Fast synchronous direct actions to bypass browser iframe user gesture blocks
  const playTrack = (idx: number) => {
    setCurrentTrackIndex(idx);
    setAudioAttempt(0); // Reset retry chain on track select
    setIsPlaying(true);

    const audio = audioRef.current;
    if (audio) {
      const sources = getTrackSources(idx);
      audio.src = sources[0]; // Start with the first candidate format/path
      audio.load();
      audio.play().catch(err => {
        console.warn("Direct play failed during gesture, will fallback:", err);
      });
    }
  };

  const togglePlay = () => {
    const audio = audioRef.current;
    if (!audio) return;

    if (isPlaying) {
      audio.pause();
      setIsPlaying(false);
    } else {
      audio.play().then(() => {
        setIsPlaying(true);
      }).catch(err => {
        console.warn("Playback initialization failed in gesture:", err);
        setIsPlaying(true);
      });
    }
  };

  const nextTrack = () => {
    const nextIdx = (currentTrackIndex + 1) % DUA_LIPA_ALBUM_TRAILER.length;
    playTrack(nextIdx);
  };

  const prevTrack = () => {
    const prevIdx = (currentTrackIndex - 1 + DUA_LIPA_ALBUM_TRAILER.length) % DUA_LIPA_ALBUM_TRAILER.length;
    playTrack(prevIdx);
  };

  // Switch source immediately on mode toggle
  useEffect(() => {
    const audio = audioRef.current;
    if (audio) {
      const sources = getTrackSources(currentTrackIndex);
      audio.src = sources[0];
      setAudioAttempt(0);
      audio.load();
      if (isPlaying) {
        audio.play().catch(e => console.log("Re-play on mode switch deferred:", e));
      }
    }
  }, [rhythmAudioMode]);

  // Monitor playback status changes and apply sync
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    if (isPlaying) {
      audio.play().catch(err => {
        console.warn("Audio play deferred or blocked by browser gesture restriction", err);
      });
    } else {
      audio.pause();
    }
  }, [isPlaying]);

  // Audio track state monitor and auto playback sync
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    if (isPlaying) {
      audio.play().catch(err => {
        console.warn("Audio play deferred or blocked by browser gesture restriction", err);
      });
    }
  }, [currentTrackIndex]);

  // Automatic source sequencer fallback on loading/playing errors
  const handleAudioError = () => {
    const audio = audioRef.current;
    if (!audio) return;

    const sources = getTrackSources(currentTrackIndex);
    const nextAttempt = audioAttempt + 1;

    if (nextAttempt < sources.length) {
      console.warn(`Tentativa de reprodução [${audioAttempt}] falhou. Tentando próximo caminho: ${sources[nextAttempt]}`);
      setAudioAttempt(nextAttempt);
      audio.src = sources[nextAttempt];
      audio.load();
      if (isPlaying) {
        audio.play().catch(err => {
          console.warn("Auto-play on fallback path deferred:", err);
        });
      }
    } else if (rhythmAudioMode === 'local') {
      // If we exhausted local candidates, force online fallback mode
      console.warn("Caminhos de hospedagem local indisponíveis (404/CORS). Forçando fallback online.");
      setRhythmAudioMode('online');
      setAudioAttempt(0);
      alertFeedback(isEn
        ? "⚠️ Server music files unavailable. Rhythmbox activated the Online Test Server!"
        : "⚠️ Músicas do servidor indisponíveis. O Rhythmbox ativou o Servidor de Testes Online!");
    }
  };

  // Progress click handler
  const handleProgressClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const audio = audioRef.current;
    if (!audio) return;
    const duration = audio.duration || audioDuration;
    if (!duration || isNaN(duration)) return;

    const rect = e.currentTarget.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const ratio = Math.max(0, Math.min(1, clickX / rect.width));
    const newTime = ratio * duration;

    audio.currentTime = newTime;
    setCurrentTime(newTime);
  };

  // Audio time update interval checker
  useEffect(() => {
    let interval: any;
    if (isPlaying) {
      interval = setInterval(() => {
        if (audioRef.current) {
          setCurrentTime(audioRef.current.currentTime);
          if (audioRef.current.duration && !isNaN(audioRef.current.duration)) {
            setAudioDuration(audioRef.current.duration);
          }
        }
      }, 500);
    }
    return () => clearInterval(interval);
  }, [isPlaying]);

  // Safe chime synth sound
  const triggerSystemSound = (frequency = 440, duration = 0.2, volume = 0.3) => {
    try {
      const audioCtx = new (window.AudioContext || (window as any).webkitAudioContext)();
      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();
      osc.connect(gain);
      gain.connect(audioCtx.destination);
      osc.frequency.setValueAtTime(frequency, audioCtx.currentTime);
      gain.gain.setValueAtTime(volume, audioCtx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.0001, audioCtx.currentTime + duration);
      osc.start();
      osc.stop(audioCtx.currentTime + duration);
    } catch (e) {
      console.log('Audio disabled by browser protection.', e);
    }
  };

  // Alert notifier function
  const alertFeedback = (msg: string) => {
    setShowNotification(msg);
    triggerSystemSound(800, 0.1, 0.15);
    setTimeout(() => setShowNotification(null), 3000);
  };

  // Window Controls Helper
  const openWindow = (id: string) => {
    setIsMintMenuOpen(false);
    setWindows(prev => prev.map(w => {
      if (w.id === id) {
        setTopZ(t => t + 1);
        return { ...w, isOpen: true, isMinimized: false, zIndex: topZ + 1 };
      }
      return w;
    }));
  };

  const closeWindow = (id: string, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    setWindows(prev => prev.map(w => w.id === id ? { ...w, isOpen: false } : w));
    if (id === 'rhythmbox') setIsPlaying(false);
  };

  const minimizeWindow = (id: string, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    setWindows(prev => prev.map(w => w.id === id ? { ...w, isMinimized: true } : w));
  };

  const maximizeWindow = (id: string, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    setWindows(prev => prev.map(w => w.id === id ? { ...w, isMaximized: !w.isMaximized } : w));
  };

  const focusWindow = (id: string) => {
    setTopZ(t => t + 1);
    setWindows(prev => prev.map(w => w.id === id ? { ...w, isMinimized: false, zIndex: topZ + 1 } : w));
  };

  // Drag Windows Implementation
  const handleDragStart = (id: string, e: React.MouseEvent) => {
    const win = windows.find(w => w.id === id);
    if (!win || win.isMaximized) return;
    focusWindow(id);
    setDragInfo({
      id,
      startX: e.clientX,
      startY: e.clientY,
      windowX: win.x,
      windowY: win.y
    });
    e.preventDefault();
  };

  const handleResizeStart = (id: string, direction: string, e: React.MouseEvent) => {
    const win = windows.find(w => w.id === id);
    if (!win || win.isMaximized) return;
    focusWindow(id);
    setResizeInfo({
      id,
      startX: e.clientX,
      startY: e.clientY,
      startWidth: win.width,
      startHeight: win.height,
      startWinX: win.x,
      startWinY: win.y,
      direction
    });
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDragMove = (e: React.MouseEvent) => {
    if (dragInfo) {
      const dx = e.clientX - dragInfo.startX;
      const dy = e.clientY - dragInfo.startY;
      setWindows(prev => prev.map(w => {
        if (w.id === dragInfo.id) {
          return {
            ...w,
            x: dragInfo.windowX + dx,
            y: Math.max(0, dragInfo.windowY + dy)
          };
        }
        return w;
      }));
    } else if (resizeInfo) {
      const dx = e.clientX - resizeInfo.startX;
      const dy = e.clientY - resizeInfo.startY;
      setWindows(prev => prev.map(w => {
        if (w.id === resizeInfo.id) {
          let newWidth = w.width;
          let newHeight = w.height;
          let newX = w.x;
          let newY = w.y;

          if (resizeInfo.direction.includes('e')) {
            newWidth = Math.max(250, resizeInfo.startWidth + dx);
          }
          if (resizeInfo.direction.includes('s')) {
            newHeight = Math.max(200, resizeInfo.startHeight + dy);
          }
          if (resizeInfo.direction.includes('w')) {
            const potentialWidth = resizeInfo.startWidth - dx;
            if (potentialWidth >= 250) {
              newWidth = potentialWidth;
              newX = resizeInfo.startWinX + dx;
            }
          }
          if (resizeInfo.direction.includes('n')) {
            const potentialHeight = resizeInfo.startHeight - dy;
            if (potentialHeight >= 200) {
              newHeight = potentialHeight;
              newY = Math.max(0, resizeInfo.startWinY + dy);
            }
          }

          return {
            ...w,
            width: newWidth,
            height: newHeight,
            x: newX,
            y: newY
          };
        }
        return w;
      }));
    }
  };

  const handleDragEnd = () => {
    setDragInfo(null);
    setResizeInfo(null);
  };

  // Mint Menu (Cinnamon Start Menu) applications categories & listings
  const ALL_MINT_APPS = [
    { id: 'nemo', name: 'Nemo', command: 'nemo', desc: 'Gerenciador de arquivos clássico do Mint', cat: 'accessories', keywords: 'pasta home arquivos docs' },
    { id: 'terminal', name: 'Terminal do Cinnamon', command: 'terminal', desc: 'Acesse o terminal do sistema', cat: 'system', keywords: 'bash prompt console comando' },
    { id: 'rhythmbox', name: 'Rhythmbox', command: 'rhythmbox', desc: 'Gere suas músicas e playlists', cat: 'media', keywords: 'audio mp3 cancoes som player player' },
    { id: 'firefox', name: 'Firefox', command: 'firefox', desc: 'Navegue na rede mundial com segurança', cat: 'internet', keywords: 'web browse internet sites' },
    { id: 'calculator', name: 'Calculadora', command: 'calc', desc: 'Realize cálculos matemáticos simples', cat: 'accessories', keywords: 'conta calcular soma' },
    { id: 'settings', name: 'Configurações de Tema', command: 'settings', desc: 'Adorne seu plano de fundo e visual', cat: 'preferences', keywords: 'visual cor contraste modo dark' },
    { id: 'mintinstall', name: 'Gerenciador de Aplicativos', command: 'mintinstall', desc: 'Instale programas e softwares extras', cat: 'system', keywords: 'app software loja snap' },
    { id: 'xed', name: 'Editor de Textos Xed', command: 'xed', desc: 'Edite arquivos de textos planos simples', cat: 'accessories', keywords: 'escrever notas txt' },
    { id: 'mintupdate', name: 'Gerenciador de Atualizações', command: 'mintupdate', desc: 'Mantenha o Linux Mint seguro e atualizado', cat: 'system', keywords: 'update upgrades seguranca' },
    { id: 'pix', name: 'Organizador de Fotos Pix', command: 'pix', desc: 'Visualize e edite sua galeria de fotos', cat: 'media', keywords: 'fotos imagens png jpg' }
  ];

  // Cinnamon interactive shell terminal execution parser
  const parseTerminalCommand = (line: string) => {
    const clean = line.trim();
    if (clean === '') return;

    setTerminalHistory(prev => [...prev, `user@linuxmint-cinnamon:~$ ${clean}`]);

    const parts = clean.split(' ');
    const cmd = parts[0].toLowerCase();
    const arg = parts.slice(1).join(' ');

    switch (cmd) {
      case 'help':
        setTerminalHistory(prev => [
          ...prev,
          'Comandos disponíveis:',
          '  help               - Mostra este aviso explicativo',
          '  ls                 - Lista arquivos dretórios locais',
          '  clear              - Limpa todo o histórico de comandos',
          '  neofetch / fastfetch - Exibe detalhes do Linux Mint Cinnamon',
          '  sudo apt update    - Simula atualizações dos pacotes',
          '  uname -a           - Exibe detalhes do Kernel Linux',
          '  cowsay <mensagem>  - Retorna uma vaquinha respondendo'
        ]);
        break;
      case 'ls':
        setTerminalHistory(prev => [
          ...prev,
          'Área de Trabalho/  Documentos/  Downloads/  Música/  Imagens/  Vídeos/'
        ]);
        break;
      case 'clear':
        setTerminalHistory([]);
        break;
      case 'neofetch':
      case 'fastfetch':
        setTerminalHistory(prev => [
          ...prev,
          '              ..-,             user@linuxmint-cinnamon',
          '             y::::y            -----------------------',
          '            y:::::y            OS: Linux Mint 21.3 Cinnamon',
          '           y::::::y            Host: MeuLinux Virtual Box v1.2',
          '          y:::::::y            Kernel: 6.5.0-cinnamon-generic',
          '    \'-..-\' \`\`\`\`\`\`\` \'-..-\'      Uptime: 20 mins',
          '   y::::::::::::::::::::y      Shell: bash 5.1.16',
          ' r::::::::::::::::::::::r     Resolution: 1920x1080',
          'r::::::::::::::::::::::::r    DE: Cinnamon 6.0.4',
          'y::::::::::::::::::::::::y    WM: Muffin',
          ' y::::::::::::::::::::::y     Theme: Mint-Y (Elegant-Green)',
          '  s::::::::::::::::::::s      Terminal: cinnamon-terminal',
          '   \`s::::::::::::::::s\`      CPU: AMD Ryzen 7 simulated vCPU',
          '     \`\`s::::::::::s\`\`        Memory: 2.1 GiB / 8.0 GiB',
          '        \`\`\`\`\`\`\`'
        ]);
        break;
      case 'uname':
        if (arg === '-a') {
          setTerminalHistory(prev => [...prev, 'Linux linuxmint-cinnamon 6.5.0-cinnamon-generic #1 SMP PREEMPT_DYNAMIC GNU/Linux']);
        } else {
          setTerminalHistory(prev => [...prev, 'Linux']);
        }
        break;
      case 'sudo':
        if (arg && arg.includes('apt update')) {
          setTerminalHistory(prev => [
            ...prev,
            '[sudo] senha para user: *******',
            'Atingido:1 https://meulinux.com/assets/mint-packages noble InRelease',
            'Obter:2 https://security.ubuntu.com/ubuntu noble-security InRelease [121 kB]',
            'Baixados 121 kB em 1.5s (80 kB/s)',
            'Lendo listas de pacotes... Pronto',
            'Construindo árvore de dependências... Pronto',
            'Todos os pacotes estão atualizados!'
          ]);
        } else {
          setTerminalHistory(prev => [...prev, 'Comando sudo simulado apenas para: sudo apt update']);
        }
        break;
      case 'cowsay':
        if (!arg) {
          setTerminalHistory(prev => [...prev, 'Muuu! Escreva algo para me ver falar! Ex: cowsay Olá Mint']);
        } else {
          setTerminalHistory(prev => [
            ...prev,
            `  _____________`,
            ` < ${arg} >`,
            `  -------------`,
            `         \\   ^__^`,
            `          \\  (oo)\\_______`,
            `             (__)\\       )\\/\\`,
            `                 ||----w |`,
            `                 ||     ||`
          ]);
        }
        break;
      default:
        setTerminalHistory(prev => [...prev, `bash: ${cmd}: comando não reconhecido na simulação. Digite 'help'.`]);
        break;
    }
  };

  const handleTerminalSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    parseTerminalCommand(terminalInput);
    setTerminalInput('');
  };

  // Setup Cinnamon active list based on menu inputs
  const getFilteredApps = () => {
    let list = ALL_MINT_APPS;
    if (selectedCategory !== 'all') {
      list = list.filter(a => a.cat === selectedCategory);
    }
    if (menuSearch.trim() !== '') {
      list = ALL_MINT_APPS.filter(a =>
        a.name.toLowerCase().includes(menuSearch.toLowerCase()) ||
        a.desc.toLowerCase().includes(menuSearch.toLowerCase()) ||
        a.keywords.toLowerCase().includes(menuSearch.toLowerCase())
      );
    }
    return list;
  };

  const menuCategories = [
    { id: 'all', label: 'Todos os aplicativos', icon: '/assets/applications-other.png' },
    { id: 'accessories', label: 'Acessórios', icon: '/assets/applications-accessories.png' },
    { id: 'media', label: 'Som e Vídeo', icon: '/assets/applications-multimedia.png' },
    { id: 'internet', label: 'Internet', icon: '/assets/applications-internet.png' },
    { id: 'system', label: 'Sistema', icon: '/assets/applications-system.png' },
    { id: 'preferences', label: 'Preferências', icon: '/assets/preferences-desktop.png' }
  ];

  return (
    <div
      className="w-full h-full relative overflow-hidden flex flex-col select-none font-sans text-white/95"
      style={{
        backgroundImage: `url(${bgWallpaper})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundColor: '#1b1b1b'
      }}
      onMouseMove={handleDragMove}
      onMouseUp={handleDragEnd}
    >
      {/* 1. INITIAL SPLASH SCREEN (ELEGANT LINUX MINT THEME WITH SMOOTH FADE OUT) */}
      <AnimatePresence>
        {showSplash && (
          <motion.div
            key="mint-splash"
            exit={{ opacity: 0, scale: 1.05 }}
            transition={{ duration: 0.6 }}
            className="absolute inset-0 z-[1000] bg-[#1d201e] flex flex-col items-center justify-center p-6 text-center"
          >
            <div className="max-w-md w-full flex flex-col items-center">
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 1 }}
                className="w-48 h-48 flex items-center justify-center relative"
              >
                <img
                  src={MINT_SPLASH_LOGO}
                  alt="Linux Mint"
                  className="max-h-full max-w-full object-contain relative z-20"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-emerald-500/10 blur-3xl rounded-full scale-125 z-10 animate-pulse" />
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 2. REAL TIME FLOATING MULTI-ACTION SYSTEM NOTIFICATION OVERLAY */}
      <AnimatePresence>
        {showNotification && (
          <motion.div
            initial={{ opacity: 0, y: -50, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.95 }}
            className="absolute top-12 left-1/2 transform -translate-x-1/2 z-[999] bg-[#22252a]/95 border border-white/5 text-[13px] font-semibold text-white px-5 py-3 rounded-lg shadow-2xl flex items-center gap-2.5 backdrop-blur-md"
          >
            <div className="w-2 h-2 rounded-full bg-[#87cf3e] shadow-[0_0_8px_#87cf3e]" />
            <span>{showNotification}</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* SIMULATION SYSTEM WELCOME NOTIFICATION BANNER */}
      <AnimatePresence>
        {showSimInfoNotify && (
          <motion.div
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 100 }}
            transition={{ type: "spring", stiffness: 120, damping: 16 }}
            className="absolute top-12 right-4 z-[150] max-w-sm md:max-w-md w-[320px] md:w-[380px] bg-[#2d2d2d]/95 backdrop-blur-md border-t-4 border-[#87cf3e] rounded-xl shadow-2xl p-4 flex gap-3.5 items-start border border-black/40 select-none text-white"
          >
            <div className="bg-[#87cf3e] p-2.5 rounded-xl text-neutral-900 flex-shrink-0 shadow-lg">
              <Monitor size={18} />
            </div>
            <div className="flex-1 min-w-0 pr-1 text-left">
              <h5 className="font-bold text-sm leading-snug">
                {isEn ? 'Linux Mint 22 Simulation' : 'Simulação do Linux Mint 22'}
              </h5>
              <p className="text-xs text-neutral-300 mt-1.5 leading-relaxed font-medium">
                {isEn
                  ? 'This is only an interactive web simulation of Linux Mint so you can experience and interact with it before downloading the real distribution.'
                  : 'Esta é apenas uma simulação do Linux Mint para que você possa experimentar e interagir antes de baixar a distribuição real.'}
              </p>
              <button
                onClick={() => setShowSimInfoNotify(false)}
                className="mt-3.5 bg-[#87cf3e] hover:bg-[#74be2e] active:bg-[#5f9c24] text-neutral-900 text-[11px] font-extrabold px-4 py-1.5 rounded-md transition-colors cursor-pointer shadow-md inline-flex items-center justify-center font-sans"
              >
                {isEn ? 'Got it' : 'Entendi'}
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

      {/* 3. CORE DESKTOP GRID CONTAINER */}
      <div
        className="flex-1 w-full relative p-4 flex flex-col gap-3 items-start content-start flex-wrap z-10"
        onProjectContextMenu={handleDesktopContextMenu}
        onClick={() => {
          setIsMintMenuOpen(false);
          setShowTrayVolume(false);
          setShowTrayCalendar(false);
        }}
      >
        {/* Pinned Desktop Launchers (Classic Cinnamon layout: Pasta Pessoal, Lixeira, + Requested Apps) */}
        {[
          { icon: <NemoFolderIcon type="home" className="w-10 h-10" />, label: 'Pasta Pessoal', id: 'nemo', action: () => { setNemoFolder('Home'); openWindow('nemo'); } },
          { icon: <NemoFolderIcon type="trash" className="w-10 h-10" />, label: 'Lixeira', id: 'nemo_trash', action: () => { setNemoFolder('Trash'); openWindow('nemo'); } },
          { icon: <MintAppIcon id="rhythmbox" className="w-10 h-10" />, label: 'Rhythmbox', id: 'rhythmbox_sc', action: () => openWindow('rhythmbox') },
          { icon: <MintAppIcon id="calculator" className="w-10 h-10" />, label: 'Calculadora', id: 'calculator_sc', action: () => openWindow('calculator') },
          { icon: <MintAppIcon id="xed" className="w-10 h-10" />, label: 'Editor de Textos', id: 'xed_sc', action: () => openWindow('xed') },
          { icon: <MintAppIcon id="terminal" className="w-10 h-10" />, label: 'Terminal', id: 'terminal_sc', action: () => openWindow('terminal') },
        ].map((launcher) => (
          <button
            key={launcher.id}
            onDoubleClick={launcher.action}
            onTouchStart={launcher.action}
            className="flex flex-col items-center gap-1.5 p-2 rounded-lg hover:bg-white/[0.08] active:bg-white/[0.12] border border-transparent hover:border-white/5 text-center group transition-all w-20 select-none outline-none focus:bg-white/[0.06]"
          >
            <div className="group-hover:scale-105 transition-transform">
              {launcher.icon}
            </div>
            <span
              className={`text-slate-100 drop-shadow-md text-xs font-semibold leading-tight line-clamp-2 ${desktopIconSize === 'sm' ? 'text-[11px]' : desktopIconSize === 'lg' ? 'text-sm' : 'text-xs'
                }`}
            >
              {launcher.label}
            </span>
          </button>
        ))}

        {/* Custom Cinnamon right-click context menu */}
        {contextMenu && contextMenu.isOpen && (
          <div
            className="absolute bg-[#2a2d33] border border-black/50 rounded-[4px] shadow-2xl py-1.5 w-56 z-[9999] text-[11px] text-zinc-100 select-none animate-fadeIn font-sans"
            style={{ left: `${contextMenu.x}px`, top: `${contextMenu.y}px` }}
            onClick={(e) => e.stopPropagation()}
            onContextMenu={(e) => e.preventDefault()}
          >
            <button
              onClick={() => { openWindow('nemo'); setContextMenu(null); }}
              className="w-full text-left px-3.5 py-1.5 hover:bg-[#87cf3e] hover:text-black transition-colors flex items-center gap-2.5"
            >
              <Folder size={13} className="text-[#87cf3e]" />
              <span>Abrir Pasta Pessoal</span>
            </button>
            <button
              onClick={() => { openWindow('terminal'); setContextMenu(null); }}
              className="w-full text-left px-3.5 py-1.5 hover:bg-[#87cf3e] hover:text-black transition-colors flex items-center gap-2.5"
            >
              <TermIcon size={13} className="text-zinc-400" />
              <span>Abrir no Terminal</span>
            </button>

            <div className="h-[1px] bg-white/5 my-1" />

            <button
              onClick={() => {
                triggerSystemSound(700, 0.05, 0.1);
                setContextMenu(null);
                alertFeedback(isEn ? "Icons automatically aligned to the Cinnamon grid." : "Ícones alinhados à grade do Cinnamon automaticamente.");
              }}
              className="w-full text-left px-3.5 py-1.5 hover:bg-[#87cf3e] hover:text-black transition-colors flex items-center gap-2.5"
            >
              <Grid size={13} className="text-zinc-400" />
              <span>Organizar Área de Trabalho</span>
            </button>

            <div className="h-[1px] bg-white/5 my-1" />

            <button
              onClick={() => { openWindow('settings'); setContextMenu(null); }}
              className="w-full text-left px-3.5 py-1.5 hover:bg-[#87cf3e] hover:text-black transition-colors flex items-center gap-2.5"
            >
              <SettingsIcon size={13} className="text-[#87cf3e]" />
              <span>Alterar Plano de Fundo</span>
            </button>

            <button
              onClick={() => {
                setContextMenu(null);
                alertFeedback(isEn
                  ? "Linux Mint 22 'Wilma'\nCinnamon Desktop 6.2\nCPU: Emulated Intel Core CPU\nRAM: 4.0 GB (Web Sandbox Platform)"
                  : "Linux Mint 22 'Wilma'\nCinnamon Desktop 6.2\nCPU: Emulated Virtual Intel Core\nRAM: 4.0 GB (Web Sandbox Platform)");
              }}
              className="w-full text-left px-3.5 py-1.5 hover:bg-[#87cf3e] hover:text-black transition-colors flex items-center gap-2.5"
            >
              <Monitor size={13} className="text-zinc-400" />
              <span>Propriedades do Sistema</span>
            </button>
          </div>
        )}
      </div>

      {/* 4. DRAGGABLE & ACTIVED APPLICATION WINDOWS */}
      {windows.map((win) => {
        if (!win.isOpen) return null;
        return (
          <div
            key={win.id}
            className={`absolute rounded-xl overflow-hidden shadow-2xl bg-[#2b2e33] border border-white/5 flex flex-col animate-fadeIn select-none ${win.isMaximized ? 'inset-0 !w-full !h-[calc(100%-48px)] !top-0 !left-0 !transform-none rounded-none' : ''
              } ${win.isMinimized ? 'hidden' : ''}`}
            style={{
              left: win.isMaximized ? 0 : `${win.x}px`,
              top: win.isMaximized ? 0 : `${win.y}px`,
              width: win.isMaximized ? '100%' : `${win.width}px`,
              height: win.isMaximized ? '100%' : `${win.height}px`,
              zIndex: win.zIndex,
            }}
            onClick={() => focusWindow(win.id)}
          >
            {/* Window Resizing Handles (only when not maximized) */}
            {!win.isMaximized && (
              <>
                {/* Edges */}
                <div
                  onMouseDown={(e) => handleResizeStart(win.id, 'w', e)}
                  className="absolute left-0 top-0 w-1 h-full cursor-w-resize z-[100]"
                />
                <div
                  onMouseDown={(e) => handleResizeStart(win.id, 'e', e)}
                  className="absolute right-0 top-0 w-1 h-full cursor-e-resize z-[100]"
                />
                <div
                  onMouseDown={(e) => handleResizeStart(win.id, 'n', e)}
                  className="absolute left-0 top-0 h-1 w-full cursor-n-resize z-[100]"
                />
                <div
                  onMouseDown={(e) => handleResizeStart(win.id, 's', e)}
                  className="absolute left-0 bottom-0 h-1.5 w-full cursor-s-resize z-[100]"
                />
                {/* Corners */}
                <div
                  onMouseDown={(e) => handleResizeStart(win.id, 'nw', e)}
                  className="absolute left-0 top-0 w-2.5 h-2.5 cursor-nw-resize z-[102]"
                />
                <div
                  onMouseDown={(e) => handleResizeStart(win.id, 'ne', e)}
                  className="absolute right-0 top-0 w-2.5 h-2.5 cursor-ne-resize z-[102]"
                />
                <div
                  onMouseDown={(e) => handleResizeStart(win.id, 'sw', e)}
                  className="absolute left-0 bottom-0 w-2.5 h-2.5 cursor-sw-resize z-[102]"
                />
                <div
                  onMouseDown={(e) => handleResizeStart(win.id, 'se', e)}
                  className="absolute right-0 bottom-0 w-3.5 h-3.5 cursor-se-resize z-[102]"
                />
              </>
            )}

            {/* Window Header bar */}
            <div
              onMouseDown={(e) => handleDragStart(win.id, e)}
              onDoubleClick={(e) => maximizeWindow(win.id, e)}
              className="h-10 px-4 bg-[#232629] shrink-0 border-b border-black/10 flex items-center justify-between cursor-move text-white"
            >
              <div className="flex items-center gap-2 text-xs font-semibold">
                {win.icon}
                <span className="truncate max-w-[200px] text-zinc-200">{win.title}</span>
              </div>

              {/* Cinnamon Mint-Y GTK Windows buttons (min, max, close) */}
              <div className="flex items-center gap-1.5">
                <button
                  onClick={(e) => minimizeWindow(win.id, e)}
                  className="w-5 h-5 rounded-full flex items-center justify-center bg-white/[0.05] hover:bg-white/[0.15] text-zinc-300 transition-colors"
                  title="Minimizar"
                >
                  <Minus size={11} />
                </button>
                <button
                  onClick={(e) => maximizeWindow(win.id, e)}
                  className="w-5 h-5 rounded-full flex items-center justify-center bg-white/[0.05] hover:bg-white/[0.15] text-zinc-300 transition-colors"
                  title={win.isMaximized ? "Restaurar" : "Maximizar"}
                >
                  {win.isMaximized ? <Minimize2 size={10} /> : <Square size={9} />}
                </button>
                <button
                  onClick={(e) => closeWindow(win.id, e)}
                  className="w-5 h-5 rounded-full flex items-center justify-center bg-white/[0.05] hover:bg-white/[0.15] text-zinc-300 transition-colors"
                  title="Fechar"
                >
                  <X size={11} />
                </button>
              </div>
            </div>

            {/* Window Content Handler */}
            <div className="flex-1 bg-[#1e2124] overflow-hidden flex flex-col relative">

              {/* WINDOW A: NEMO FILE EXPLORER */}
              {win.id === 'nemo' && (
                <div className="w-full h-full flex flex-col bg-[#1a1c1e] text-zinc-100 select-none">
                  {/* Nemo Toolbar (Breadcrumbs + Actions) */}
                  <div className="h-12 bg-[#232629]/95 border-b border-black/15 flex items-center justify-between px-4 shrink-0 gap-3">
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => setNemoFolder('Home')}
                        className={`p-1.5 rounded hover:bg-white/5 transition-colors ${nemoFolder === 'Home' ? 'opacity-30 cursor-default' : 'text-[#87cf3e]'}`}
                      >
                        <ChevronLeft size={16} />
                      </button>
                      <button className="p-1.5 rounded hover:bg-white/5 text-zinc-500 opacity-20 cursor-not-allowed">
                        <ChevronRight size={16} />
                      </button>

                      {/* Interactive Path Breadcrumb bar */}
                      <div className="flex items-center border border-white/5 rounded px-2.5 py-1 text-xs bg-black/10 text-zinc-300 font-medium">
                        <Home size={12} className="text-[#87cf3e] mr-1.5 shrink-0" />
                        <span>/ home / user / {nemoFolder}</span>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      {/* Search bar Nemo toggle */}
                      <button
                        onClick={() => setShowNemoSearchInput(!showNemoSearchInput)}
                        className={`p-1.5 rounded transition-all ${showNemoSearchInput ? 'bg-[#87cf3e] text-black font-bold' : 'text-zinc-300 hover:bg-white/5'}`}
                      >
                        <Search size={14} />
                      </button>

                      <div className="h-4 w-px bg-white/10" />

                      {/* Folder Grid/List Display mode buttons */}
                      <button
                        onClick={() => setNemoFolder('grid')}
                        className={`p-1.5 rounded ${nemoView === 'grid' ? 'text-[#87cf3e] bg-white/[0.04]' : 'text-zinc-400'}`}
                      >
                        <Grid size={14} />
                      </button>
                      <button
                        onClick={() => setNemoView('list')}
                        className={`p-1.5 rounded ${nemoView === 'list' ? 'text-[#87cf3e] bg-white/[0.04]' : 'text-zinc-400'}`}
                      >
                        <List size={14} />
                      </button>
                    </div>
                  </div>

                  {/* Nemo Folder/Search Sub-menu */}
                  {showNemoSearchInput && (
                    <div className="px-4 py-2 bg-[#1a1a1c] border-b border-white/5 flex items-center gap-2">
                      <Search size={12} className="text-zinc-450 shrink-0" />
                      <input
                        type="text"
                        placeholder="Pesquisar arquivos e pastas..."
                        value={nemoSearch}
                        onChange={(e) => setNemoSearch(e.target.value)}
                        className="flex-1 bg-transparent border-none text-xs text-white placeholder-zinc-500 focus:outline-none focus:ring-0 p-0"
                        autoFocus
                      />
                      {nemoSearch && (
                        <button onClick={() => setMenuSearch('')} className="text-xs text-[#87cf3e] hover:underline font-bold">Limpar</button>
                      )}
                    </div>
                  )}

                  {/* Windows body: Split-Pane Sidebar + Workspace */}
                  <div className="flex-1 flex overflow-hidden">
                    {/* Nemo Left Sidebar Panel */}
                    <div className="w-48 bg-[#232629] border-r border-black/15 py-3 px-2 flex flex-col gap-0.5 text-xs text-left overflow-y-auto shrink-0 select-none text-zinc-300">
                      <div className="px-3.5 pb-1 text-[9px] font-bold text-zinc-500 uppercase tracking-widest leading-none">Dispositivos</div>
                      {[
                        { id: 'Computador', name: 'Computador', type: 'computer' },
                        { id: 'Home', name: 'Pasta Pessoal', type: 'home' },
                      ].map((sidebarItem) => (
                        <button
                          key={sidebarItem.id}
                          onClick={() => { setNemoFolder(sidebarItem.id); setNemoSearch(''); }}
                          className={`w-full flex items-center gap-2 px-3 py-1.5 rounded-md transition-colors ${nemoFolder === sidebarItem.id ? 'bg-white/[0.07] text-[#87cf3e] font-bold' : 'hover:bg-white/[0.04]'}`}
                        >
                          <NemoFolderIcon type={sidebarItem.type} className="w-4 h-4" />
                          <span className="truncate">{sidebarItem.name}</span>
                        </button>
                      ))}

                      <div className="h-px bg-white/5 my-2 mx-2" />
                      <div className="px-3.5 pb-1 text-[9px] font-bold text-zinc-500 uppercase tracking-widest leading-none">Marcadores</div>
                      {[
                        { id: 'Documents', name: 'Documentos', type: 'documents' },
                        { id: 'Music', name: 'Músicas', type: 'music' },
                        { id: 'Pictures', name: 'Imagens', type: 'pictures' },
                        { id: 'Downloads', name: 'Downloads', type: 'downloads' },
                        { id: 'Videos', name: 'Vídeos', type: 'videos' },
                        { id: 'Trash', name: 'Lixeira', type: 'trash' }
                      ].map((bookmark) => {
                        return (
                          <button
                            key={bookmark.id}
                            onClick={() => { setNemoFolder(bookmark.id); setNemoSearch(''); }}
                            className={`w-full flex items-center gap-2 px-3 py-1.5 rounded-md transition-colors ${nemoFolder === bookmark.id ? 'bg-white/[0.07] text-[#87cf3e] font-bold' : 'hover:bg-white/[0.04]'}`}
                          >
                            <NemoFolderIcon type={bookmark.type} className="w-4 h-4" />
                            <span className="truncate">{bookmark.name}</span>
                          </button>
                        );
                      })}
                    </div>

                    {/* Nemo Content Workspace Grid */}
                    <div className="flex-grow p-5 overflow-y-auto bg-[#1b1c1e] text-left">
                      {nemoFolder === 'Trash' ? (
                        <div className="flex flex-col items-center justify-center py-12 text-zinc-500 gap-3 animate-fadeIn">
                          <Trash2 size={44} className="opacity-30 text-[#87cf3e]" />
                          <h6 className="text-sm font-semibold text-zinc-300">Lixeira Limpa</h6>
                          <p className="text-xs text-zinc-400">Nenhum item deletado nesta simulação.</p>
                        </div>
                      ) : (
                        <div>
                          {nemoView === 'grid' ? (
                            <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-4 gap-6 animate-fadeIn">
                              {[
                                { name: 'Área de Trabalho', id: 'Desktop', type: 'desktop' },
                                { name: 'Documentos', id: 'Documents', type: 'documents' },
                                { name: 'Downloads', id: 'Downloads', type: 'downloads' },
                                { name: 'Músicas', id: 'Music', type: 'music' },
                                { name: 'Imagens', id: 'Pictures', type: 'pictures' },
                                { name: 'Modelos', id: 'Templates', type: 'templates' },
                                { name: 'Vídeos', id: 'Videos', type: 'videos' },
                              ].map((folder) => (
                                <button
                                  key={folder.id}
                                  onClick={() => setNemoFolder(folder.id)}
                                  className="flex flex-col items-center gap-2 p-3 hover:bg-white/[0.04] rounded-lg transition-colors text-center group border border-transparent hover:border-white/5"
                                >
                                  <NemoFolderIcon type={folder.type} className="w-13 h-13 group-hover:scale-105 transition-transform" />
                                  <span className="text-xs text-zinc-200 mt-1 truncate w-full font-medium">{folder.name}</span>
                                </button>
                              ))}
                            </div>
                          ) : (
                            <div className="flex flex-col border border-white/5 rounded overflow-hidden bg-black/10 animate-fadeIn text-xs">
                              <div className="grid grid-cols-3 px-4 py-2 bg-neutral-900/40 font-bold text-zinc-400 border-b border-white/5 text-[10px] uppercase tracking-wider">
                                <span>Nome</span>
                                <span>Tamanho</span>
                                <span>Modificado</span>
                              </div>
                              {[
                                { name: 'Área de Trabalho', id: 'Desktop', type: 'desktop', size: '2 itens', mod: 'Hoje' },
                                { name: 'Documentos', id: 'Documents', type: 'documents', size: 'Vazia', mod: 'Hoje' },
                                { name: 'Downloads', id: 'Downloads', type: 'downloads', size: 'Vazia', mod: 'Ontem' },
                                { name: 'Músicas', id: 'Music', type: 'music', size: 'Dua Lipa Album', mod: 'Hoje' },
                                { name: 'Imagens', id: 'Pictures', type: 'pictures', size: '1 item', mod: 'Hoje' },
                                { name: 'Modelos', id: 'Templates', type: 'templates', size: 'Vazio', mod: 'Semana passada' },
                                { name: 'Vídeos', id: 'Videos', type: 'videos', size: 'Vazio', mod: 'Ontem' },
                              ].map((folder) => (
                                <div
                                  key={folder.id}
                                  onClick={() => setNemoFolder(folder.id)}
                                  className="grid grid-cols-3 items-center px-4 py-2.5 hover:bg-white/[0.04] border-b border-white/5 text-zinc-100 cursor-pointer"
                                >
                                  <span className="flex items-center gap-2 font-medium">
                                    <NemoFolderIcon type={folder.type} className="w-5 h-5" />
                                    {folder.name}
                                  </span>
                                  <span className="text-zinc-400 text-[11px] font-mono">{folder.size}</span>
                                  <span className="text-zinc-400">{folder.mod}</span>
                                </div>
                              ))}
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              )}

              {/* WINDOW B: CINNAMON INTERACTIVE TERMINAL */}
              {win.id === 'terminal' && (
                <div
                  className="w-full h-full p-4 flex flex-col font-mono text-xs text-emerald-400 bg-black text-left overflow-y-auto"
                  onClick={() => termEndRef.current?.focus()}
                >
                  <div className="space-y-1">
                    {terminalHistory.map((line, ix) => (
                      <div key={ix} className="whitespace-pre-wrap leading-relaxed">{line}</div>
                    ))}
                  </div>

                  <form onSubmit={handleTerminalSubmit} className="flex items-center mt-2">
                    <span className="text-zinc-300 mr-2">user@linuxmint-cinnamon:~$</span>
                    <input
                      type="text"
                      ref={() => termEndRef.current}
                      value={terminalInput}
                      onChange={(e) => setTerminalInput(e.target.value)}
                      className="flex-1 bg-transparent border-none text-emerald-400 focus:outline-none focus:ring-0 p-0 font-mono text-xs select-text"
                      autoFocus
                      autoComplete="off"
                      spellCheck={false}
                    />
                  </form>
                  <div ref={termEndRef} />
                </div>
              )}

              {/* WINDOW C: RHYTHMBOX (MUSIC PLAYER) */}
              {win.id === 'rhythmbox' && (
                <div className="w-full h-full flex bg-[#1e2022] text-zinc-100 select-none">
                  {/* Left Playlists Sidebar */}
                  <div className="w-48 bg-[#282a2d] border-r border-[#151719] py-4 px-2.5 flex flex-col justify-between text-xs">
                    <div className="space-y-4 text-left">
                      <div className="px-3.5 text-[10px] uppercase font-bold text-zinc-500 tracking-wider">Biblioteca</div>
                      <div className="space-y-0.5">
                        <button
                          onClick={() => setRhythmboxActiveView('songs')}
                          className={`w-full text-left px-3 py-1.5 rounded-md flex items-center gap-2 ${rhythmboxActiveView === 'songs' ? 'bg-[#87cf3e]/15 text-[#87cf3e] font-bold' : 'hover:bg-white/[0.04] text-zinc-300'}`}
                        >
                          <Music size={13} /> Canções
                        </button>
                        <button
                          className="w-full text-left px-3 py-1.5 rounded-md text-zinc-400 opacity-60 flex items-center gap-2 cursor-default"
                          disabled
                        >
                          <Clock size={13} /> Recentes
                        </button>
                      </div>

                      <div className="px-3.5 pt-3 text-[10px] uppercase font-bold text-zinc-500 tracking-wider">Playlists</div>
                      <div className="space-y-0.5">
                        <button
                          onClick={() => alertFeedback(isEn ? 'New Playlist created.' : 'Nova Playlist criada.')}
                          className="w-full text-left px-3 py-1.5 rounded-md hover:bg-white/[0.04] text-[#87cf3e] font-semibold flex items-center gap-2"
                        >
                          <Plus size={13} /> Nova Playlist
                        </button>
                      </div>
                    </div>

                    <div className="bg-black/15 p-3 rounded-lg text-left text-[11px] text-zinc-400 space-y-1 border border-white/5">
                      <div className="font-semibold text-zinc-200">Rhythmbox 3.0</div>
                      <div>Cinnamon Integration Engine Active</div>
                    </div>
                  </div>

                  {/* Right audio details grid & controller pane */}
                  <div className="flex-grow flex flex-col overflow-hidden bg-[#1f2124]">
                    {/* Header bar: Tracker seeker & song summary */}
                    <div className="p-4 bg-[#282a2d] border-b border-[#151719] flex items-center justify-between shrink-0 gap-8">
                      {/* Left controls */}
                      <div className="flex items-center gap-3">
                        <button
                          onClick={prevTrack}
                          className="p-2 bg-white/[0.04] hover:bg-white/[0.08] text-zinc-300 hover:text-white rounded-full transition-all active:scale-95"
                        >
                          <SkipBack size={15} />
                        </button>
                        <button
                          onClick={togglePlay}
                          className="p-3 bg-[#87cf3e] text-black hover:bg-[#87cf3e]/90 rounded-full transition-all shadow-md active:scale-95 flex items-center justify-center font-bold"
                        >
                          {isPlaying ? <span className="font-mono text-xs">▮▮</span> : <Play size={16} className="fill-current translate-x-px" />}
                        </button>
                        <button
                          onClick={nextTrack}
                          className="p-2 bg-white/[0.04] hover:bg-white/[0.08] text-zinc-300 hover:text-white rounded-full transition-all active:scale-95"
                        >
                          <SkipForward size={15} />
                        </button>
                      </div>

                      {/* Middle: Active Track Progress Slider */}
                      <div className="flex-grow max-w-md text-center space-y-1.5">
                        <div className="text-xs font-semibold text-zinc-200 truncate leading-none">
                          {DUA_LIPA_ALBUM_TRAILER[currentTrackIndex]?.title} - Dua Lipa
                        </div>
                        <div className="flex items-center gap-3 text-[10px] text-zinc-400 font-mono">
                          <span>{Math.floor(currentTime / 60)}:{(Math.floor(currentTime) % 60).toString().padStart(2, '0')}</span>
                          <div
                            onClick={handleProgressClick}
                            className="flex-grow h-1.5 bg-black/30 rounded-full overflow-hidden relative border border-white/5 cursor-pointer"
                          >
                            <div
                              className="h-full bg-[#87cf3e] rounded-full transition-all"
                              style={{
                                width: `${(() => {
                                  const duration = audioRef.current?.duration || audioDuration;
                                  if (!duration) return 0;
                                  return (currentTime / duration) * 100;
                                })()}%`
                              }}
                            />
                          </div>
                          <span>
                            {(() => {
                              const dur = audioRef.current?.duration || audioDuration;
                              if (!dur || isNaN(dur)) return DUA_LIPA_ALBUM_TRAILER[currentTrackIndex]?.duration;
                              return `${Math.floor(dur / 60)}:${Math.floor(dur % 60).toString().padStart(2, '0')}`;
                            })()}
                          </span>
                        </div>
                      </div>

                      {/* Right Volume triggers */}
                      <div className="flex items-center gap-2 max-w-[120px]">
                        <button onClick={() => setIsMuted(!isMuted)} className="text-zinc-450 hover:text-white transition-colors">
                          {isMuted ? <VolumeX size={15} /> : <Volume2 size={15} />}
                        </button>
                        <input
                          type="range"
                          min="0"
                          max="100"
                          value={isMuted ? 0 : trackVolume}
                          onChange={(e) => { setTrackVolume(Number(e.target.value)); setIsMuted(false); }}
                          className="w-16 accent-[#87cf3e] cursor-pointer h-1 rounded bg-zinc-800"
                        />
                      </div>
                    </div>

                    {/* Main songs table viewer */}
                    <div className="flex-grow p-4 overflow-y-auto text-left">
                      <table className="w-full text-xs text-left text-zinc-300 font-medium">
                        <thead>
                          <tr className="border-b border-white/5 bg-black/10 text-zinc-400 text-[10px] uppercase font-bold tracking-wider">
                            <th className="py-2.5 px-3 rounded-l-md w-12 text-center">Nº</th>
                            <th className="py-2.5 px-3">Título da Canção</th>
                            <th className="py-2.5 px-3 w-32">Duração</th>
                            <th className="py-2.5 px-3 rounded-r-md w-32 text-right">Plays</th>
                          </tr>
                        </thead>
                        <tbody>
                          {DUA_LIPA_ALBUM_TRAILER.map((track, i) => {
                            const active = i === currentTrackIndex;
                            return (
                              <tr
                                key={track.id}
                                onClick={() => {
                                  playTrack(i);
                                }}
                                className={`border-b border-white/[0.03] hover:bg-white/[0.04] cursor-pointer transition-colors ${active ? 'bg-[#87cf3e]/10 text-white font-bold' : ''}`}
                              >
                                <td className="py-3 px-3 text-center text-zinc-500 font-mono text-[11px]">
                                  {active && isPlaying ? <div className="w-2 h-2 rounded-full bg-[#87cf3e] shadow-[0_0_8px_#87cf3e] mx-auto animate-pulse" /> : track.id}
                                </td>
                                <td className={`py-3 px-3 ${active ? 'text-[#87cf3e]' : ''}`}>{track.title}</td>
                                <td className="py-3 px-3 italic font-mono text-[11px] text-zinc-400">{track.duration}</td>
                                <td className="py-3 px-3 rounded-r-md text-right font-mono text-[11px] text-zinc-500">{track.plays}</td>
                              </tr>
                            );
                          })}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              )}

              {/* WINDOW D: FULL COMPONENT CALCULATOR */}
              {win.id === 'calculator' && (
                <div className="w-full h-full p-4 flex flex-col bg-[#1e2022] text-zinc-100 select-none">
                  {/* Active Output display */}
                  <div className="bg-black/25 border border-white/5 rounded-lg p-4 text-right overflow-hidden mb-4 shadow-inner shrink-0">
                    <div className="text-[10px] uppercase tracking-wider font-bold text-zinc-500 leading-none mb-1">Resultado</div>
                    <div className="text-2xl font-mono text-[#87cf3e] truncate">0,000</div>
                  </div>

                  {/* Grid of keys */}
                  <div className="flex-grow grid grid-cols-4 gap-2 text-xs font-bold">
                    {['C', '(', ')', '/', '7', '8', '9', 'X', '4', '5', '6', '-', '1', '2', '3', '+', '0', ',', '%', '='].map((key, i) => {
                      const isClear = key === 'C';
                      const isEval = key === '=';
                      const isAccent = ['/', 'X', '-', '+', '='].includes(key);

                      return (
                        <button
                          key={i}
                          onClick={() => triggerSystemSound(520, 0.08, 0.2)}
                          className={`rounded-lg active:scale-95 transition-all text-center flex items-center justify-center font-semibold ${isClear ? 'bg-red-500/20 text-red-400 hover:bg-red-500/30' :
                              isEval ? 'bg-[#87cf3e] text-black hover:bg-[#87cf3e]/90 font-bold' :
                                isAccent ? 'bg-white/[0.08] hover:bg-white/[0.14] text-[#87cf3e]' :
                                  'bg-white/[0.04] hover:bg-white/[0.08] text-zinc-200'
                            }`}
                        >
                          {key}
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* WINDOW E: MINT SYSTEM PREFERENCES */}
              {win.id === 'settings' && (
                <div className="w-full h-full flex bg-[#1e2022] text-zinc-150 select-none text-xs">
                  {/* Left settings control list */}
                  <div className="w-40 bg-[#232629] border-r border-black/15 py-3 px-2 flex flex-col text-left text-zinc-300">
                    <span className="px-3 pb-1.5 text-[10px] font-bold text-zinc-500 uppercase tracking-widest">Temas</span>
                    <button className="w-full text-left px-3 py-1.5 rounded-lg bg-[#87cf3e]/10 text-[#87cf3e] font-bold flex items-center gap-2">
                      <Sun size={13} /> Área de Trabalho
                    </button>
                  </div>

                  {/* Panel parameters adjuster */}
                  <div className="flex-1 p-5 overflow-y-auto text-left space-y-6">
                    <h5 className="text-sm font-bold text-white border-b border-white/5 pb-2">Aparência do Linux Mint Cinnamon</h5>

                    {/* Dark/Light mode trigger */}
                    <div className="flex items-center justify-between py-1 bg-black/10 p-3 rounded-lg border border-white/5">
                      <div>
                        <div className="font-semibold text-zinc-200">Tema do Cinnamon</div>
                        <div className="text-[10px] text-zinc-400 leading-none mt-1">Alternar contraste claro e escuro</div>
                      </div>
                      <button
                        onClick={() => {
                          setIsDarkMode(!isDarkMode);
                          alertFeedback(isEn
                            ? `${!isDarkMode ? 'Dark' : 'Light'} theme active.`
                            : `Tema ${!isDarkMode ? 'Escuro' : 'Claro'} ativo.`);
                        }}
                        className={`px-3 py-1.5 rounded font-bold transition-all ${isDarkMode ? 'bg-[#87cf3e] text-black' : 'bg-white/10 text-white'}`}
                      >
                        {isDarkMode ? 'Dark' : 'Light'}
                      </button>
                    </div>

                    {/* Icon Sizer panel */}
                    <div className="flex items-center justify-between py-1 bg-black/10 p-3 rounded-lg border border-white/5">
                      <div>
                        <div className="font-semibold text-zinc-200">Tamanho dos Ícones na Tela</div>
                        <div className="text-[10px] text-zinc-400 leading-none mt-1">Calibre o zoom dos launchers</div>
                      </div>
                      <div className="flex items-center gap-1">
                        {(['sm', 'md', 'lg'] as const).map(sz => (
                          <button
                            key={sz}
                            onClick={() => {
                              setDesktopIconSize(sz);
                              triggerSystemSound(400, 0.05, 0.1);
                            }}
                            className={`px-2.5 py-1 rounded text-[10px] uppercase font-bold transition-all ${desktopIconSize === sz ? 'bg-[#87cf3e] text-black' : 'bg-white/5 text-zinc-300'}`}
                          >
                            {sz}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Choose Wallpaper options */}
                    <div>
                      <div className="font-semibold text-zinc-200 mb-2">Selecione o Plano de Fundo</div>
                      <div className="grid grid-cols-2 gap-3">
                        {[
                          { name: 'Mint Classic Green', url: MINT_WALLPAPER },
                          { name: 'Dark Abstract Cosmic', url: 'Resolute%20Raccoon%20Animated%20Mascot%202560x1440.mp4' },
                          { name: 'Nordic Forest Hills', url: 'https://picsum.photos/seed/forest/1200/800' },
                          { name: 'Elegant Minimalist Wave', url: 'https://picsum.photos/seed/wave/1200/800' }
                        ].map((wp, ix) => {
                          const active = bgWallpaper === wp.url;
                          return (
                            <button
                              key={ix}
                              onClick={() => {
                                setBgWallpaper(wp.url);
                                alertFeedback(isEn ? 'Wallpaper changed.' : 'Papel de parede modificado.');
                              }}
                              className={`p-1.5 rounded-lg border text-left flex items-center gap-2 bg-black/15 transition-all text-[11px] ${active ? 'border-[#87cf3e] bg-[#87cf3e]/5 text-white' : 'border-white/5 hover:border-white/10 text-zinc-400'}`}
                            >
                              <div className="w-8 h-8 rounded bg-cover" style={{ backgroundImage: `url(${wp.url.endsWith('.mp4') ? 'https://picsum.photos/200' : wp.url})` }} />
                              <span className="truncate flex-1 font-semibold">{wp.name}</span>
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* WINDOW G: LINUX MINT TEXT EDITOR (XED) */}
              {win.id === 'xed' && (
                <div className="w-full h-full flex flex-col bg-[#1e2022] text-zinc-100 font-sans">
                  {/* Menu bar */}
                  <div className="h-8 bg-[#232629] border-b border-black/15 flex items-center px-3 gap-1/2 text-[11.5px] text-zinc-300 relative select-none">
                    {/* ARQUIVO DROPDOWN CONTAINER */}
                    <div className="relative">
                      <button
                        onClick={() => setXedActiveMenu(prev => prev === 'arquivo' ? null : 'arquivo')}
                        className={`px-3 py-1 rounded hover:bg-white/5 transition-colors cursor-pointer ${xedActiveMenu === 'arquivo' ? 'bg-[#87cf3e]/15 text-[#87cf3e] font-semibold' : ''}`}
                      >
                        Arquivo
                      </button>
                      {xedActiveMenu === 'arquivo' && (
                        <div className="absolute left-0 mt-1 w-52 bg-[#2d3135] border border-black/30 rounded-lg shadow-xl py-1 z-[150] text-[#eee] select-none text-xs">
                          <button
                            onClick={() => {
                              setXedText('');
                              setXedActiveMenu(null);
                              alertFeedback(isEn ? 'Created new blank text document.' : 'Novo documento de texto em branco criado.');
                            }}
                            className="w-full text-left px-3 py-1.5 hover:bg-[#87cf3e]/15 hover:text-[#87cf3e] flex justify-between items-center transition-all"
                          >
                            <span>Novo Documento</span>
                            <span className="text-[10px] text-zinc-500 font-mono">Ctrl+N</span>
                          </button>
                          <button
                            onClick={() => {
                              setXedText(isEn
                                ? '===============================\n   WELCOME TO LINUX MINT\n===============================\n\nThis is the classic Linux Mint Cinnamon simulator created in high-performance React.\n\nSimulator Features:\n- Interactive Cinnamon terminals (try neofetch or cowsay)\n- Fully integrated and stateful Nemo File Explorer\n- Rhythmbox music player with stylable songs\n- Real mouse-based window resize & movements!\n- Changeable original Mint wallpaper\n- Simulated premium Firefox browser'
                                : '===============================\n   BEM-VINDO AO LINUX MINT\n===============================\n\nEste é o simulador clássico do Linux Mint Cinnamon criado em React de alto desempenho.\n\nRecursos do Simulador:\n- Terminais Cinnamon interativos (tente digitar neofetch ou cowsay)\n- Nemo File Explorer integrado e stateful\n- Player de música Rhythmbox com canções estilizáveis\n- Redimensionador real de janelas com o mouse!\n- Papel de parede Mint original alternável\n- Navegador Firefox premium simulado');
                              setXedActiveMenu(null);
                              alertFeedback(isEn ? 'Tips and info successfully loaded.' : 'Dicas e informações carregadas com sucesso.');
                            }}
                            className="w-full text-left px-3 py-1.5 hover:bg-[#87cf3e]/15 hover:text-[#87cf3e] flex justify-between items-center transition-all"
                          >
                            <span>Carregar Dicas</span>
                            <span className="text-[10px] text-zinc-500 font-mono">Dicas</span>
                          </button>
                          <button
                            onClick={() => {
                              const element = document.createElement("a");
                              const file = new Blob([xedText], { type: 'text/plain' });
                              element.href = URL.createObjectURL(file);
                              element.download = "nota-mint.txt";
                              document.body.appendChild(element);
                              element.click();
                              document.body.removeChild(element);
                              setXedActiveMenu(null);
                              alertFeedback(isEn ? 'Downloading nota-mint.txt to your disk.' : 'Salvando nota-mint.txt em seu disco.');
                            }}
                            className="w-full text-left px-3 py-1.5 hover:bg-[#87cf3e]/15 hover:text-[#87cf3e] flex justify-between items-center transition-all"
                          >
                            <span>Salvar em Arquivo</span>
                            <span className="text-[10px] text-zinc-500 font-mono">Ctrl+S</span>
                          </button>
                          <div className="h-px bg-white/5 my-1" />
                          <button
                            onClick={() => {
                              closeWindow('xed');
                              setXedActiveMenu(null);
                            }}
                            className="w-full text-left px-3 py-1.5 hover:bg-rose-500/10 hover:text-rose-400 flex justify-between items-center transition-all"
                          >
                            <span>Sair</span>
                            <span className="text-[10px] text-zinc-500 font-mono">Alt+F4</span>
                          </button>
                        </div>
                      )}
                    </div>

                    {/* EDITAR DROPDOWN CONTAINER */}
                    <div className="relative">
                      <button
                        onClick={() => setXedActiveMenu(prev => prev === 'editar' ? null : 'editar')}
                        className={`px-3 py-1 rounded hover:bg-white/5 transition-colors cursor-pointer ${xedActiveMenu === 'editar' ? 'bg-[#87cf3e]/15 text-[#87cf3e] font-semibold' : ''}`}
                      >
                        Editar
                      </button>
                      {xedActiveMenu === 'editar' && (
                        <div className="absolute left-0 mt-1 w-52 bg-[#2d3135] border border-black/30 rounded-lg shadow-xl py-1 z-[150] text-[#eee] select-none text-xs">
                          <button
                            onClick={() => {
                              setXedText('');
                              setXedActiveMenu(null);
                            }}
                            className="w-full text-left px-3 py-1.5 hover:bg-[#87cf3e]/15 hover:text-[#87cf3e] flex justify-between items-center transition-all"
                          >
                            <span>Limpar Tudo</span>
                            <span className="text-[10px] text-zinc-500 font-mono">Del</span>
                          </button>
                          <button
                            onClick={() => {
                              const timestamp = `\n--- REGISTRO: ${new Date().toLocaleString()} ---\n`;
                              setXedText(prev => prev + timestamp);
                              setXedActiveMenu(null);
                            }}
                            className="w-full text-left px-3 py-1.5 hover:bg-[#87cf3e]/15 hover:text-[#87cf3e] flex justify-between items-center transition-all"
                          >
                            <span>Inserir Data e Hora</span>
                            <span className="text-[10px] text-zinc-500 font-mono">F5</span>
                          </button>
                          <div className="h-px bg-white/5 my-1" />
                          <button
                            onClick={() => {
                              setXedText(prev => prev.toUpperCase());
                              setXedActiveMenu(null);
                            }}
                            className="w-full text-left px-3 py-1.5 hover:bg-[#87cf3e]/15 hover:text-[#87cf3e] flex justify-between items-center transition-all"
                          >
                            <span>Converter MAIÚSCULAS</span>
                            <span className="text-[10px] text-zinc-500 font-mono">UP</span>
                          </button>
                          <button
                            onClick={() => {
                              setXedText(prev => prev.toLowerCase());
                              setXedActiveMenu(null);
                            }}
                            className="w-full text-left px-3 py-1.5 hover:bg-[#87cf3e]/15 hover:text-[#87cf3e] flex justify-between items-center transition-all"
                          >
                            <span>Converter minúsculas</span>
                            <span className="text-[10px] text-zinc-500 font-mono">down</span>
                          </button>
                        </div>
                      )}
                    </div>

                    {/* EXIBIR DROPDOWN CONTAINER */}
                    <div className="relative">
                      <button
                        onClick={() => setXedActiveMenu(prev => prev === 'exibir' ? null : 'exibir')}
                        className={`px-3 py-1 rounded hover:bg-white/5 transition-colors cursor-pointer ${xedActiveMenu === 'exibir' ? 'bg-[#87cf3e]/15 text-[#87cf3e] font-semibold' : ''}`}
                      >
                        Exibir
                      </button>
                      {xedActiveMenu === 'exibir' && (
                        <div className="absolute left-0 mt-1 w-52 bg-[#2d3135] border border-black/30 rounded-lg shadow-xl py-1 z-[150] text-[#eee] select-none text-xs">
                          <button
                            onClick={() => {
                              setXedFontSize(f => Math.min(36, f + 2));
                            }}
                            className="w-full text-left px-3 py-1.5 hover:bg-[#87cf3e]/15 hover:text-[#87cf3e] flex justify-between items-center transition-all"
                          >
                            <span>Aumentar Fonte</span>
                            <span className="text-[10px] text-zinc-500 font-mono">Ctrl +</span>
                          </button>
                          <button
                            onClick={() => {
                              setXedFontSize(f => Math.max(10, f - 2));
                            }}
                            className="w-full text-left px-3 py-1.5 hover:bg-[#87cf3e]/15 hover:text-[#87cf3e] flex justify-between items-center transition-all"
                          >
                            <span>Diminuir Fonte</span>
                            <span className="text-[10px] text-zinc-500 font-mono">Ctrl -</span>
                          </button>
                          <button
                            onClick={() => {
                              setXedFontSize(14);
                            }}
                            className="w-full text-left px-3 py-1.5 hover:bg-[#87cf3e]/15 hover:text-[#87cf3e] flex justify-between items-center transition-all"
                          >
                            <span>Tamanho Padrão (14px)</span>
                            <span className="text-[10px] text-zinc-500 font-mono">Ctrl+0</span>
                          </button>
                          <div className="h-px bg-white/5 my-1" />
                          <button
                            onClick={() => {
                              setXedTheme(prev => prev === 'dark' ? 'light' : 'dark');
                            }}
                            className="w-full text-left px-3 py-1.5 hover:bg-[#87cf3e]/15 hover:text-[#87cf3e] flex justify-between items-center transition-all"
                          >
                            <span>Tema: {xedTheme === 'dark' ? 'Modo Claro' : 'Modo Escuro'}</span>
                            <span className="text-[10px] text-zinc-500 font-mono">T</span>
                          </button>
                        </div>
                      )}
                    </div>

                    {/* AJUDA DROPDOWN CONTAINER */}
                    <div className="relative">
                      <button
                        onClick={() => setXedActiveMenu(prev => prev === 'ajuda' ? null : 'ajuda')}
                        className={`px-3 py-1 rounded hover:bg-white/5 transition-colors cursor-pointer ${xedActiveMenu === 'ajuda' ? 'bg-[#87cf3e]/15 text-[#87cf3e] font-semibold' : ''}`}
                      >
                        Ajuda
                      </button>
                      {xedActiveMenu === 'ajuda' && (
                        <div className="absolute left-0 mt-1 w-52 bg-[#2d3135] border border-black/30 rounded-lg shadow-xl py-1 z-[150] text-[#eee] select-none text-xs">
                          <button
                            onClick={() => {
                              setXedText(isEn
                                ? `===============================\n  XED TEXT EDITOR SHORTCUTS\n===============================\n\nIn the simulated Xed, you have access to the following quick commands:\n\n- File > New Document: Creates a blank document\n- File > Save to File: Downloads a real .txt file with your text!\n- Edit > Insert Date and Time: Inserts current timestamp\n- View > Zoom: Adjust the letter spacing/size in the view menu\n- View > Toggle Theme: Choose between dark background or classic light`
                                : `===============================\n  ATALHOS DO EDITOR DE TEXTO XED\n===============================\n\nNo Xed simulado, você tem acesso aos seguintes comandos rápidos:\n\n- Arquivo > Novo Documento: Cria um documento em branco\n- Arquivo > Salvar em Arquivo: Baixa um .txt real com o conteúdo digitado!\n- Editar > Inserir Data e Hora: Insere carimbo de data atual\n- Exibir > Zoom: Ajuste o tamanho da letra no menu de exibição\n- Exibir > Alternar Tema: Escolha entre fundo escuro ou clássico claro`);
                              setXedActiveMenu(null);
                              alertFeedback(isEn ? 'Editor shortcuts tutorial loaded.' : 'Tutorial de atalhos e dicas inserido.');
                            }}
                            className="w-full text-left px-3 py-1.5 hover:bg-[#87cf3e]/15 hover:text-[#87cf3e] flex justify-between items-center transition-all"
                          >
                            <span>Atalhos Úteis e Ajuda</span>
                            <span className="text-[10px] text-zinc-500 font-mono">F1</span>
                          </button>
                          <button
                            onClick={() => {
                              alertFeedback(isEn
                                ? 'About Xed: Version 3.4.2 (Linux Mint standard text editor). Developed for simplicity.'
                                : 'Sobre o Xed: Versão 3.4.2 (Linux Mint standard text editor). Desenvolvido para simplicidade.');
                              setXedActiveMenu(null);
                            }}
                            className="w-full text-left px-3 py-1.5 hover:bg-[#87cf3e]/15 hover:text-[#87cf3e] flex justify-between items-center transition-all"
                          >
                            <span>Sobre o Xed...</span>
                            <span className="text-[10px] text-zinc-500 font-mono">Info</span>
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                  {/* Text area */}
                  <textarea
                    value={xedText}
                    onChange={(e) => setXedText(e.target.value)}
                    style={{ fontSize: `${xedFontSize}px` }}
                    className={`flex-grow w-full p-4 outline-none resize-none border-none font-mono leading-relaxed transition-colors ${xedTheme === 'dark'
                        ? 'bg-[#18191b] text-zinc-200'
                        : 'bg-zinc-50 text-slate-900 border-t border-zinc-200 shadow-inner'
                      }`}
                    placeholder="Comece a digitar suas notas aqui..."
                    spellCheck={false}
                    onClick={() => setXedActiveMenu(null)}
                  />
                  {/* Status Bar */}
                  <div className="h-6 bg-[#232629] border-t border-black/10 flex items-center justify-between px-3 text-[10px] text-zinc-400 font-mono">
                    <span>Linha {xedText.split('\n').length}, Coluna {xedText.length}</span>
                    <span>UTF-8 • {xedTheme === 'dark' ? 'Tema Escuro' : 'Tema Claro'}</span>
                  </div>
                </div>
              )}

              {/* WINDOW F: INTEGRATED STATEFUL FIREFOX WEB BROWSER */}
              {win.id === 'firefox' && (
                <div className="w-full h-full flex flex-col bg-[#1c1b22] select-none relative font-sans">

                  {/* Authentic Firefox rounded-float Tab Bar */}
                  <div className="h-9 bg-[#1c1b22] flex items-end px-3 gap-1.5 border-b border-black/20 text-xs text-zinc-300">
                    {firefoxTabs.map((tab) => {
                      const isActive = tab.id === activeTabId;
                      return (
                        <div
                          key={tab.id}
                          onClick={() => {
                            setActiveTabId(tab.id);
                            setFirefoxInputUrl(tab.url);
                          }}
                          className={`h-8 px-3.5 flex items-center gap-2 rounded-t-lg cursor-pointer transition-all max-w-[160px] relative text-[11px] ${isActive
                              ? 'bg-[#2b2a33] text-white font-semibold shadow-inner border-t border-white/5'
                              : 'text-zinc-400 hover:bg-white/5 hover:text-white'
                            }`}
                        >
                          <Globe size={11} className={`${isActive ? 'text-orange-400' : 'text-zinc-500'}`} />
                          <span className="truncate pr-4 leading-none">{getTabTitle(tab.url)}</span>
                          {firefoxTabs.length > 1 && (
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                closeFirefoxTab(tab.id);
                              }}
                              className="absolute right-1.5 top-1/2 -translate-y-1/2 text-zinc-500 hover:text-white hover:bg-white/10 rounded-full p-0.5"
                            >
                              <X size={10} />
                            </button>
                          )}
                        </div>
                      );
                    })}
                    <button
                      onClick={openNewFirefoxTab}
                      className="p-1 mb-1 hover:bg-zinc-800 rounded text-zinc-400 hover:text-white transition-colors"
                      title="Abrir nova aba"
                    >
                      <Plus size={13} />
                    </button>
                  </div>

                  {/* Main Address Toolbar */}
                  <div className="h-10 bg-[#2b2a33] flex items-center px-4 gap-3 border-b border-black/20 relative z-20">
                    <div className="flex items-center gap-1 text-white">
                      <button
                        disabled={firefoxHistoryIndex === 0}
                        onClick={goBackFirefox}
                        className={`p-1.5 rounded transition-colors ${firefoxHistoryIndex === 0 ? 'opacity-15 cursor-not-allowed text-neutral-450' : 'hover:bg-white/5 opacity-80 hover:opacity-100 text-white'}`}
                        title="Voltar"
                      >
                        <ChevronLeft size={16} />
                      </button>
                      <button
                        disabled={firefoxHistoryIndex >= firefoxHistory.length - 1}
                        onClick={goForwardFirefox}
                        className={`p-1.5 rounded transition-colors ${firefoxHistoryIndex >= firefoxHistory.length - 1 ? 'opacity-15 cursor-not-allowed text-neutral-450' : 'hover:bg-white/5 opacity-80 hover:opacity-100 text-white'}`}
                        title="Avançar"
                      >
                        <ChevronRight size={16} />
                      </button>
                      <button
                        onClick={isFirefoxLoading ? stopLoadingFirefox : reloadFirefox}
                        className="p-1.5 hover:bg-white/5 rounded transition-colors opacity-80 hover:opacity-100 text-white"
                        title={isFirefoxLoading ? "Parar" : "Recarregar"}
                      >
                        {isFirefoxLoading ? <X size={15} /> : <RotateCcw size={15} />}
                      </button>
                      <button
                        onClick={() => navigateFirefox('https://www.google.com/search?igu=1')}
                        className="p-1.5 hover:bg-white/5 rounded transition-colors opacity-80 hover:opacity-100 text-white"
                        title="Página Inicial"
                      >
                        <Home size={14} />
                      </button>
                    </div>

                    <form
                      onSubmit={(e) => { e.preventDefault(); navigateFirefox(firefoxInputUrl); }}
                      className="flex-1 relative"
                    >
                      <Lock size={11} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-green-400 opacity-80" />
                      <input
                        type="text"
                        value={firefoxInputUrl}
                        onChange={(e) => setFirefoxInputUrl(e.target.value)}
                        onFocus={(e) => e.target.select()}
                        className="w-full bg-[#1c1b22] text-xs text-white border border-white/5 hover:border-white/10 rounded-lg pl-8.5 pr-4 py-1.5 focus:outline-none focus:ring-1 ring-[#87cf3e]/50 text-left"
                        placeholder="Pesquisar com o Google ou digitar endereço URL"
                      />
                    </form>

                    <div className="flex items-center gap-2 relative" ref={firefoxMenuRef}>
                      <button
                        onClick={() => setShowFirefoxMenu(!showFirefoxMenu)}
                        className={`p-1.5 rounded transition-colors text-white ${showFirefoxMenu ? 'bg-white/10' : 'hover:bg-white/5'}`}
                      >
                        <MoreVertical size={16} />
                      </button>

                      <AnimatePresence>
                        {showFirefoxMenu && (
                          <motion.div
                            initial={{ opacity: 0, scale: 0.95, y: 10 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.95, y: 10 }}
                            className="absolute right-0 top-full mt-2 w-56 bg-[#1e1e2a] border border-white/10 rounded-xl shadow-2xl z-50 overflow-hidden text-left"
                          >
                            <div className="py-1">
                              <button
                                onClick={toggleFirefoxFavorite}
                                className="w-full flex items-center gap-3 px-4 py-2.5 text-xs text-neutral-200 hover:bg-white/5 transition-colors text-left"
                              >
                                {firefoxFavorites.some(f => f.url === firefoxCurrentUrl) ? <StarOff size={15} className="text-yellow-500" /> : <Star size={15} className="text-neutral-400" />}
                                {firefoxFavorites.some(f => f.url === firefoxCurrentUrl) ? 'Remover dos favoritos' : 'Adicionar aos favoritos'}
                              </button>
                              <button
                                onClick={copyFirefoxUrl}
                                className="w-full flex items-center gap-3 px-4 py-2.5 text-xs text-neutral-200 hover:bg-white/5 transition-colors text-left"
                              >
                                <Copy size={15} className="text-neutral-400" /> Copiar URL
                              </button>
                              <button
                                onClick={openFirefoxInNewTab}
                                className="w-full flex items-center gap-3 px-4 py-2.5 text-xs text-neutral-200 hover:bg-white/5 transition-colors text-left"
                              >
                                <ExternalLink size={15} className="text-neutral-400" /> Abrir no navegador real
                              </button>

                              <div className="h-[1px] bg-white/5 my-1" />

                              <button
                                onClick={() => navigateFirefox('https://www.google.com/search?igu=1')}
                                className="w-full flex items-center gap-3 px-4 py-2.5 text-xs text-neutral-200 hover:bg-white/5 transition-colors text-left"
                              >
                                <Home size={15} className="text-neutral-400" /> Página inicial
                              </button>
                              <button
                                onClick={reloadFirefox}
                                className="w-full flex items-center gap-3 px-4 py-2.5 text-xs text-neutral-200 hover:bg-white/5 transition-colors text-left"
                              >
                                <RotateCcw size={15} className="text-neutral-400" /> Recarregar
                              </button>
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  </div>

                  {/* Loading Progress Ribbon */}
                  <div className="h-[2px] w-full bg-white/5 overflow-hidden">
                    <AnimatePresence>
                      {isFirefoxLoading && (
                        <motion.div
                          initial={{ x: '-100%' }}
                          animate={{ x: '100%' }}
                          transition={{ repeat: Infinity, duration: 1.5, ease: 'linear' }}
                          className="h-full w-1/3 bg-[#87cf3e]"
                        />
                      )}
                    </AnimatePresence>
                  </div>

                  {/* Firefox Window Content */}
                  <div className="flex-1 relative bg-white overflow-hidden text-neutral-800">

                    {/* 1. STATEFUL PREMIUM YOUTUBE CLONE SIMULATOR */}
                    {isYoutube(firefoxCurrentUrl) && (
                      <div className="absolute inset-0 z-40 bg-[#0f0f0f] text-white flex flex-col font-sans overflow-y-auto">
                        {/* Simulator header bar */}
                        <div className="h-14 border-b border-zinc-800 flex items-center justify-between px-4 bg-[#0f0f0f] shrink-0">
                          <div className="flex items-center gap-2">
                            <button
                              onClick={() => setYtActiveVideoId(null)}
                              className="flex items-center gap-1.5 focus:outline-none hover:opacity-90 active:scale-95 transition-all"
                            >
                              <span className="bg-red-600 text-white font-black px-2.5 py-1.5 rounded-lg text-xs tracking-tighter flex items-center gap-1">
                                <Play className="fill-white animate-pulse" size={13} /> YouTube
                              </span>
                              <span className="text-[10px] font-bold text-neutral-400 bg-zinc-800 px-2 py-0.5 rounded uppercase hidden sm:inline">Linux Sim</span>
                            </button>
                          </div>

                          {/* Search field of YouTube */}
                          <form
                            onSubmit={(e) => { e.preventDefault(); }}
                            className="flex-1 max-w-md mx-3"
                          >
                            <div className="flex w-full items-center bg-[#121212] border border-zinc-700/80 rounded-full overflow-hidden focus-within:border-[#87cf3e]">
                              <input
                                type="text"
                                placeholder="Pesquisar nos vídeos simulados..."
                                value={ytSearchQuery}
                                onChange={(e) => setYtSearchQuery(e.target.value)}
                                className="bg-transparent text-xs text-white px-4 py-1.5 outline-none flex-1 placeholder-zinc-500 text-left"
                              />
                              <button type="submit" className="bg-zinc-805 px-4 py-1.5 border-l border-zinc-700 text-zinc-400 hover:text-white transition-colors">
                                <Search size={13} />
                              </button>
                            </div>
                          </form>

                          {/* Firefox Profile avatar */}
                          <div className="flex items-center gap-2">
                            <span className="w-7 h-7 rounded-full bg-gradient-to-tr from-[#87cf3e] to-emerald-700 flex items-center justify-center font-bold text-[11px] text-zinc-900 select-none shadow">
                              M
                            </span>
                          </div>
                        </div>

                        <div className="flex-1 flex overflow-hidden">
                          {/* Sidebar */}
                          <div className="w-48 bg-[#0f0f0f] p-2 hidden md:flex flex-col gap-1 border-r border-zinc-800 text-left shrink-0">
                            <button
                              onClick={() => { setYtActiveVideoId(null); setYtSearchQuery(''); }}
                              className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-xs font-medium transition-colors ${!ytActiveVideoId ? 'bg-zinc-800/70 text-white' : 'text-zinc-400 hover:bg-zinc-900 text-zinc-300'}`}
                            >
                              <Home size={14} className="text-[#87cf3e]" /> <span>Início</span>
                            </button>
                            <button
                              onClick={() => setYtActiveVideoId('dQw4w9WgXcQ')}
                              className="w-full flex items-center gap-3 px-3 py-2 rounded-lg text-xs font-medium text-zinc-300 hover:bg-zinc-900 transition-colors"
                            >
                              <Play size={14} className="text-orange-500" /> <span>Clássico Astley</span>
                            </button>

                            <div className="h-[1px] bg-zinc-800/80 my-3" />
                            <div className="px-3 py-1 text-[9px] uppercase font-bold tracking-wider text-zinc-500">Inscrições</div>
                            {ytSubscribedChannels.length === 0 ? (
                              <div className="px-3 py-1.5 text-[10px] text-zinc-500 leading-snug">Seus canais favoritos aparecerão aqui.</div>
                            ) : (
                              ytSubscribedChannels.map((ch, idx) => (
                                <div key={idx} className="flex items-center gap-2 px-3 py-1 text-xs text-zinc-350 hover:bg-zinc-900 rounded-lg cursor-pointer">
                                  <div className="w-2 h-2 rounded-full bg-[#87cf3e]"></div>
                                  <span className="truncate">{ch}</span>
                                </div>
                              ))
                            )}
                          </div>

                          {/* Content Feed area */}
                          <div className="flex-1 overflow-y-auto p-4 select-text">
                            {ytActiveVideoId ? (
                              /* Active Video Player */
                              (() => {
                                const activeVideo = SIM_YOUTUBE_VIDEOS.find(v => v.id === ytActiveVideoId) || {
                                  id: ytActiveVideoId,
                                  title: 'Vídeo Carregado do Navegador',
                                  channel: 'Navegador Integrado',
                                  views: '930 mil visualizações',
                                  time: 'há 1 hora',
                                  avatar: '👤',
                                  thumbnail: 'bg-zinc-800'
                                };
                                const isLiked = ytLikedVideos.includes(activeVideo.id);
                                const isSubscribed = ytSubscribedChannels.includes(activeVideo.channel);

                                return (
                                  <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                                    {/* Main Column */}
                                    <div className="lg:col-span-2 space-y-4">
                                      <div className="w-full aspect-video rounded-xl overflow-hidden bg-black shadow-2xl relative border border-zinc-800">
                                        <iframe
                                          src={`https://www.youtube.com/embed/${activeVideo.id}?autoplay=1`}
                                          className="w-full h-full border-none bg-black"
                                          title="YouTube Safe Embed Player"
                                          referrerPolicy="no-referrer"
                                          allow="autoplay; encrypted-media; gyroscope; picture-in-picture; clipboard-write; clipboard-read"
                                          allowFullScreen
                                        />
                                      </div>

                                      <h1 className="text-base md:text-lg font-bold text-white leading-snug">{activeVideo.title}</h1>

                                      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-zinc-800 pb-4 select-none">
                                        <div className="flex items-center gap-3">
                                          <span className="w-10 h-10 rounded-full bg-zinc-800 text-xl flex items-center justify-center">
                                            {activeVideo.avatar}
                                          </span>
                                          <div className="text-left">
                                            <p className="font-bold text-xs text-white leading-none">{activeVideo.channel}</p>
                                            <p className="text-[10px] text-zinc-400 mt-1">115K inscritos</p>
                                          </div>

                                          <button
                                            onClick={() => {
                                              if (isSubscribed) {
                                                setYtSubscribedChannels(prev => prev.filter(c => c !== activeVideo.channel));
                                                showFirefoxToast(`Removida inscrição de ${activeVideo.channel}`);
                                              } else {
                                                setYtSubscribedChannels(prev => [...prev, activeVideo.channel]);
                                                showFirefoxToast(`Inscrito com sucesso no canal ${activeVideo.channel}`);
                                              }
                                            }}
                                            className={`ml-2 px-4 py-2 rounded-full text-xs font-bold transition-all ${isSubscribed ? 'bg-zinc-805 text-zinc-350 hover:bg-zinc-700' : 'bg-white text-black hover:bg-zinc-200'
                                              }`}
                                          >
                                            {isSubscribed ? 'Inscrito' : 'Inscrever-se'}
                                          </button>
                                        </div>

                                        <div className="flex items-center gap-1.5 bg-zinc-800 p-1.5 rounded-full text-xs">
                                          <button
                                            onClick={() => {
                                              if (isLiked) {
                                                setYtLikedVideos(prev => prev.filter(v => v !== activeVideo.id));
                                              } else {
                                                setYtLikedVideos(prev => [...prev, activeVideo.id]);
                                                showFirefoxToast("Vídeo adicionado à lista de Gostei!");
                                              }
                                            }}
                                            className={`flex items-center gap-1 px-3 py-1 rounded-full transition-colors ${isLiked ? 'text-blue-400 font-bold bg-neutral-700' : 'hover:bg-zinc-700 text-zinc-300'
                                              }`}
                                          >
                                            👍 {isLiked ? 'Gostou' : 'Gostei'}
                                          </button>
                                          <span className="text-zinc-600">|</span>
                                          <button
                                            onClick={() => {
                                              navigator.clipboard.writeText(`https://www.youtube.com/watch?v=${activeVideo.id}`);
                                              showFirefoxToast("Link de compartilhamento copiado!");
                                            }}
                                            className="px-3 py-1 rounded-full hover:bg-zinc-700 text-zinc-300 transition-colors"
                                          >
                                            Compartilhar
                                          </button>
                                        </div>
                                      </div>

                                      <div className="bg-[#1f1f1f] p-4 rounded-xl text-xs text-zinc-300 leading-relaxed text-left">
                                        <p className="font-bold mb-1">{activeVideo.views} • {activeVideo.time}</p>
                                        <p>Este é um vídeo reproduzido de forma segura no ambiente sandbox do Linux Mint. Aproveite a performance emulada de áudio e aceleração gráfica digital.</p>
                                      </div>
                                    </div>

                                    {/* Sidebar Suggestions Column */}
                                    <div className="space-y-4">
                                      <h3 className="font-bold text-sm text-left border-l-2 border-[#87cf3e] pl-2">Próximos vídeos sugeridos</h3>
                                      <div className="space-y-3.5">
                                        {SIM_YOUTUBE_VIDEOS.filter(v => v.id !== activeVideo.id).map((v) => (
                                          <div
                                            key={v.id}
                                            onClick={() => setYtActiveVideoId(v.id)}
                                            className="flex gap-3 cursor-pointer group hover:bg-white/5 p-1 rounded-lg transition-all"
                                          >
                                            <div className={`w-24 aspect-video rounded-md ${v.thumbnail} shrink-0`} />
                                            <div className="text-left select-none">
                                              <h4 className="text-xs font-bold leading-tight line-clamp-2 group-hover:text-[#87cf3e] transition-colors">{v.title}</h4>
                                              <p className="text-[10px] text-zinc-400 mt-0.5">{v.channel}</p>
                                              <p className="text-[9px] text-zinc-500">{v.views}</p>
                                            </div>
                                          </div>
                                        ))}
                                      </div>
                                    </div>
                                  </div>
                                );
                              })()
                            ) : (
                              /* Home List Grid */
                              <div className="space-y-6">
                                <div className="flex items-center gap-3">
                                  <span className="text-xl">🔥</span>
                                  <h2 className="text-base font-bold tracking-tight text-white m-0">Recomendações para você</h2>
                                </div>

                                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                                  {SIM_YOUTUBE_VIDEOS.filter(video =>
                                    ytSearchQuery === '' ||
                                    video.title.toLowerCase().includes(ytSearchQuery.toLowerCase()) ||
                                    video.channel.toLowerCase().includes(ytSearchQuery.toLowerCase())
                                  ).map((v) => (
                                    <div
                                      key={v.id}
                                      onClick={() => setYtActiveVideoId(v.id)}
                                      className="cursor-pointer group hover:scale-[1.01] transition-all flex flex-col bg-zinc-900/40 p-2 rounded-xl border border-zinc-800/20 hover:border-zinc-700/50"
                                    >
                                      <div className={`w-full aspect-video rounded-lg ${v.thumbnail} flex items-center justify-center text-white font-extrabold text-2xl relative shadow-md group-hover:shadow-[#87cf3e]/5`}>
                                        <Play className="opacity-0 group-hover:opacity-100 transition-opacity bg-black/60 p-2 rounded-full fill-white" size={40} />
                                        <span className="absolute bottom-2 right-2 bg-black px-1.5 py-0.5 text-[9px] rounded font-bold tracking-widest">{v.time === 'AO VIVO' ? 'AO VIVO' : '12:04'}</span>
                                      </div>
                                      <div className="flex gap-3 mt-3 px-1 text-left">
                                        <span className="w-8 h-8 rounded-full bg-zinc-800 flex items-center justify-center shrink-0 self-start text-base">
                                          {v.avatar}
                                        </span>
                                        <div>
                                          <h4 className="text-xs font-bold line-clamp-2 leading-snug text-white group-hover:text-[#87cf3e] transition-all">{v.title}</h4>
                                          <p className="text-[10px] text-zinc-400 mt-1">{v.channel}</p>
                                          <p className="text-[9px] text-zinc-500 mt-0.5">{v.views} • {v.time}</p>
                                        </div>
                                      </div>
                                    </div>
                                  ))}
                                </div>
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    )}

                    {/* 2. NOVA ABA HOMEPAGE WITH SHORTCUTS */}
                    {firefoxCurrentUrl === 'about:newtab' && (
                      <div className="absolute inset-0 bg-[#1c1b22] text-zinc-200 overflow-y-auto px-6 py-12 flex flex-col items-center">
                        <div className="w-full max-w-xl flex flex-col items-center">

                          {/* Firefox Floating Logo */}
                          <div className="flex items-center gap-3 mb-8">
                            <img
                              src="/assets/firefox.png"
                              alt="Firefox Logo"
                              className="w-16 h-16 object-contain spin-slow"
                            />
                            <div className="text-left">
                              <h1 className="text-3xl font-extrabold tracking-tight text-white mb-0 font-sans">Firefox</h1>
                              <p className="text-neutral-400 text-xs font-semibold">Cinnamon Sandbox Edition</p>
                            </div>
                          </div>

                          {/* Center Search Container */}
                          <form
                            onSubmit={(e) => { e.preventDefault(); navigateFirefox(firefoxInputUrl); }}
                            className="w-full mb-10"
                          >
                            <div className="w-full flex items-center bg-[#2b2a33] border border-white/5 focus-within:ring-1 focus-within:ring-[#87cf3e]/30 rounded-xl overflow-hidden shadow-inner p-1">
                              <input
                                type="text"
                                placeholder="Pesquisar com o Google..."
                                value={firefoxInputUrl === 'about:newtab' ? '' : firefoxInputUrl}
                                onChange={(e) => setFirefoxInputUrl(e.target.value)}
                                className="bg-transparent text-sm text-white px-4 py-2 outline-none flex-1 placeholder-neutral-500 text-left"
                              />
                              <button type="submit" className="bg-[#87cf3e] hover:bg-[#97df4e] text-black text-xs font-bold px-5 py-2 rounded-lg transition-colors flex items-center gap-1">
                                <Search size={13} className="text-black" /> Pesquisar
                              </button>
                            </div>
                          </form>

                          {/* Speed Dial Pin Grids */}
                          <h3 className="font-bold text-xs text-neutral-400 text-left self-start uppercase tracking-wider mb-3">Favoritos Rápidos</h3>
                          <div className="grid grid-cols-4 gap-4 w-full">
                            {firefoxFavorites.map((fav, i) => (
                              <button
                                key={i}
                                onClick={() => navigateFirefox(fav.url)}
                                className="bg-[#2b2a33]/60 hover:bg-[#2b2a33] p-3.5 rounded-xl border border-white/5 hover:border-white/10 text-center flex flex-col items-center gap-2 transition-all group hover:-translate-y-1"
                              >
                                <div className="w-10 h-10 rounded-lg bg-[#22212a] flex items-center justify-center shadow-md relative overflow-hidden group-hover:scale-105 transition-transform">
                                  <img
                                    src={getFavicon(fav.url)}
                                    alt={fav.name}
                                    className="w-5 h-5 object-contain"
                                    onError={(e) => {
                                      e.currentTarget.src = "/assets/firefox.png";
                                    }}
                                  />
                                </div>
                                <span className="text-[10px] font-bold text-white truncate w-full group-hover:text-[#87cf3e] transition-colors">{fav.name}</span>
                              </button>
                            ))}
                          </div>
                        </div>
                      </div>
                    )}

                    {/* 3. CORS SAME-ORIGIN HEADER ERROR PAGE */}
                    {isCORSBlocked(firefoxCurrentUrl) && !isYoutube(firefoxCurrentUrl) && (
                      <div className="absolute inset-0 z-10 bg-zinc-50 flex flex-col items-center justify-center p-8 select-text">
                        <div className="max-w-md text-center">
                          <AlertCircle size={44} className="text-red-500 mx-auto mb-4 animate-bounce" />
                          <h2 className="text-lg font-bold text-zinc-900 mb-2">Restrição de Incorporação Segura (X-Frame-Options)</h2>
                          <p className="text-xs text-zinc-600 leading-relaxed mb-6">
                            O endereço <strong className="text-zinc-900">{firefoxCurrentUrl.replace('https://', '').replace('http://', '').split('/')[0]}</strong> restringe o encapsulamento externo via header <code>X-Frame-Options: SAMEORIGIN</code> para sua proteção física contra fraudes de interface.
                          </p>
                          <div className="flex gap-2 justify-center">
                            <button
                              onClick={() => navigateFirefox('https://www.google.com/search?igu=1')}
                              className="px-4 py-2 border border-zinc-300 rounded-lg text-xs font-semibold text-zinc-700 bg-white hover:bg-zinc-50 transition-colors"
                            >
                              Voltar ao Google
                            </button>
                            <button
                              onClick={() => window.open(firefoxCurrentUrl, '_blank')}
                              className="px-4 py-2 rounded-lg text-xs font-semibold text-white bg-[#87cf3e] hover:bg-[#97df4e] text-black transition-colors flex items-center gap-1.5"
                            >
                              <ExternalLink size={13} /> Abrir em outra aba real
                            </button>
                          </div>
                        </div>
                      </div>
                    )}

                    {/* 4. IFRAME REAL EMBEDDING (FALLBACK FOR WEB BROWSING) */}
                    {!isYoutube(firefoxCurrentUrl) && firefoxCurrentUrl !== 'about:newtab' && (
                      <div className="w-full h-full relative bg-white">
                        {activeTab.loadStatus === 'srcdoc' && activeTab.srcdoc ? (
                          <iframe
                            srcDoc={activeTab.srcdoc}
                            className="w-full h-full border-0"
                            title="Firefox Proxied Safe Sandbox Web"
                            sandbox="allow-scripts allow-same-origin allow-forms allow-popups"
                          />
                        ) : (
                          <iframe
                            ref={firefoxIframeRef}
                            src={firefoxCurrentUrl}
                            className="w-full h-full border-none bg-white"
                            title="Firefox Sandbox Web view"
                            onLoad={() => setIsFirefoxLoading(false)}
                            onError={() => {
                              setIsFirefoxLoading(false);
                              setFirefoxTabs(prev => prev.map(tab => {
                                if (tab.id === activeTabId) {
                                  return { ...tab, loadStatus: 'fallback' as const };
                                }
                                return tab;
                              }));
                            }}
                            sandbox="allow-scripts allow-same-origin allow-forms allow-popups"
                            referrerPolicy="no-referrer"
                            style={{ colorScheme: 'light' }}
                          />
                        )}

                        {/* Loading cover */}
                        {isFirefoxLoading && (
                          <div className="absolute inset-0 bg-white/60 flex items-center justify-center z-10">
                            <div className="flex flex-col items-center gap-2">
                              <div className="w-8 h-8 rounded-full border-2 border-[#87cf3e] border-t-transparent animate-spin" />
                              <span className="text-[10px] uppercase tracking-wider font-bold text-zinc-500">Conectando...</span>
                            </div>
                          </div>
                        )}
                      </div>
                    )}
                  </div>

                  {/* Firefox Prompt Toast Overlay */}
                  {firefoxToast.visible && (
                    <div className="absolute bottom-4 left-1/2 -translate-y-1/2 -translate-x-1/2 bg-[#1c1b22] border border-white/10 px-4 py-2 rounded-lg text-zinc-200 text-xs shadow-2xl flex items-center gap-2 z-[99999] pointer-events-none select-none">
                      <Check size={14} className="text-[#87cf3e]" />
                      <span>{firefoxToast.message}</span>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        );
      })}

      {/* 5. CINNAMON START MENU (MINT MENU POPUP) */}
      <AnimatePresence>
        {isMintMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: 15, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.98 }}
            className="absolute bottom-[49px] left-1 w-[610px] h-[480px] rounded-[6px] z-[90] bg-[#2d2d2d] border border-black/40 shadow-2xl overflow-hidden flex flex-row backdrop-blur-lg select-none text-white text-xs animate-fadeIn"
          >
            {/* Column 1: Leftmost narrow vertical Favorites/Actions Toolbar */}
            <div className="p-2 pr-1 flex flex-col shrink-0 h-full justify-center">
              <div className="w-[60px] h-full bg-[#323232] border border-black/85 rounded-[4px] py-4 flex flex-col justify-between items-center shrink-0 shadow-lg">
                {/* Favorites Applications */}
                <div className="flex flex-col gap-[14px] items-center w-full">
                  <button
                    onClick={() => { openWindow('firefox'); setIsMintMenuOpen(false); }}
                    className="w-10 h-10 rounded-[4px] hover:bg-white/[0.08] flex items-center justify-center transition-all group duration-155"
                    title="Navegador de Internet Firefox"
                  >
                    <MintAppIcon id="firefox" className="w-7 h-7" />
                  </button>
                  <button
                    onClick={() => { openWindow('settings'); setIsMintMenuOpen(false); }}
                    className="w-10 h-10 rounded-[4px] hover:bg-white/[0.08] flex items-center justify-center transition-all group duration-155"
                    title="Configurações do Tema (Instalações)"
                  >
                    <MintAppIcon id="mintinstall" className="w-7 h-7" />
                  </button>
                  <button
                    onClick={() => { openWindow('settings'); setIsMintMenuOpen(false); }}
                    className="w-10 h-10 rounded-[4px] hover:bg-white/[0.08] flex items-center justify-center transition-all group duration-155"
                    title="Definições do Sistema"
                  >
                    <MintAppIcon id="settings" className="w-7 h-7" />
                  </button>
                  <button
                    onClick={() => { openWindow('terminal'); setIsMintMenuOpen(false); }}
                    className="w-10 h-10 rounded-[4px] hover:bg-white/[0.08] flex items-center justify-center transition-all group duration-155"
                    title="Terminal do Cinnamon"
                  >
                    <MintAppIcon id="terminal" className="w-7 h-7" />
                  </button>
                  <button
                    onClick={() => { setNemoFolder('Home'); openWindow('nemo'); setIsMintMenuOpen(false); }}
                    className="w-10 h-10 rounded-[4px] hover:bg-white/[0.08] flex items-center justify-center transition-all group duration-155"
                    title="Gerenciador de Arquivos Nemo"
                  >
                    <MintAppIcon id="nemo" className="w-7 h-7" />
                  </button>
                </div>

                {/* System Session Actions */}
                <div className="flex flex-col gap-[14px] items-center w-full mb-1">
                  <button
                    onClick={() => { setIsMintMenuOpen(false); alertFeedback(isEn ? 'Simulation locked. Press any key to return.' : 'Simulação trancada. Digite qualquer tecla para voltar.'); }}
                    className="w-10 h-10 rounded-[4px] hover:bg-white/[0.08] text-zinc-300 hover:text-white flex items-center justify-center transition-all hover:scale-105 duration-155"
                    title="Bloquear sala de usuário"
                  >
                    <Lock size={16} />
                  </button>
                  <button
                    onClick={() => { setIsMintMenuOpen(false); onClose(); }}
                    className="w-10 h-10 rounded-[4px] hover:bg-white/[0.08] text-zinc-300 hover:text-white flex items-center justify-center transition-all hover:scale-105 duration-155"
                    title="Sair do simulador"
                  >
                    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4M16 17l5-5-5-5M21 12H9" />
                    </svg>
                  </button>
                  <button
                    onClick={() => { setIsMintMenuOpen(false); alertFeedback(isEn ? 'Shutting down virtual system...' : 'Desligando sistema virtual...'); }}
                    className="w-10 h-10 rounded-[4px] hover:bg-[#bf2d2d] text-zinc-300 hover:text-white flex items-center justify-center transition-all hover:scale-105 duration-155"
                    title="Desligar sistema"
                  >
                    <Power size={16} />
                  </button>
                </div>
              </div>
            </div>

            {/* Right-side Content area */}
            <div className="flex-1 h-full flex flex-col overflow-hidden">
              {/* Top Search inputs section */}
              <div className="p-3 flex items-center shrink-0">
                <div className="w-full bg-black/20 border border-white/10 rounded-[3px] px-2.5 py-1.5 flex items-center justify-between gap-2 transition-all focus-within:border-[#2187e7] focus-within:ring-1 focus-within:ring-[#2187e7]/30">
                  <input
                    type="text"
                    placeholder="Pesquisar aplicativos..."
                    value={menuSearch}
                    onChange={(e) => {
                      setMenuSearch(e.target.value);
                      if (e.target.value) setSelectedCategory('all');
                    }}
                    className="flex-grow bg-transparent border-none text-xs text-white placeholder-zinc-500 focus:outline-none focus:ring-0 p-0"
                    autoFocus
                  />
                  <Search size={14} className="text-zinc-400 shrink-0" />
                </div>
              </div>

              {/* Main split pane layout with Categories Panel and Apps List */}
              <div className="flex-grow flex overflow-hidden">
                {/* Column 2: Categories rail list on the left */}
                <div className="w-[185px] p-2 flex flex-col gap-0.5 text-left overflow-y-auto no-scrollbar overflow-x-hidden shrink-0 select-none text-zinc-300 font-medium h-full">
                  {menuCategories.map((cat) => (
                    <button
                      key={cat.id}
                      onClick={() => { setSelectedCategory(cat.id); setMenuSearch(''); }}
                      className={`w-full text-left px-2.5 py-1.5 rounded-[4px] transition-colors flex items-center gap-2 truncate ${selectedCategory === cat.id && !menuSearch ? 'bg-[#4d4d4d] text-white font-medium shadow-inner' : 'hover:bg-white/[0.04]'}`}
                    >
                      <img
                        src={cat.icon}
                        alt=""
                        className="w-5 h-5 object-contain shrink-0"
                        referrerPolicy="no-referrer"
                      />
                      <span className="truncate text-[11px]">{cat.label}</span>
                    </button>
                  ))}
                </div>

                {/* Column 3: Apps Listings right pane */}
                <div className="flex-1 p-3 overflow-y-auto no-scrollbar overflow-x-hidden flex flex-col gap-1 text-left h-full">
                  {getFilteredApps().length === 0 ? (
                    <div className="flex flex-col items-center justify-center py-24 text-zinc-500 text-center gap-2">
                      <Search size={22} className="opacity-40" />
                      <span>Nenhum aplicativo encontrado</span>
                    </div>
                  ) : (
                    getFilteredApps().map(app => (
                      <button
                        key={app.id}
                        onClick={() => openWindow(app.id)}
                        className="w-full text-left p-2 rounded-[4px] hover:bg-white/[0.05] flex items-center gap-3 transition-colors group"
                      >
                        <MintAppIcon id={app.id} className="w-8 h-8 shrink-0" />
                        <div>
                          <div className="font-bold text-zinc-100 group-hover:text-white transition-colors">{app.name}</div>
                          <div className="text-[10px] text-zinc-400 truncate w-72 leading-none mt-1">{app.desc}</div>
                        </div>
                      </button>
                    ))
                  )}
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 6. BOTTOM PANELS (CINNAMON DESKTOP TASKBAR / SYSTEM CONTROL PANEL) */}
      <div
        className="h-12 w-full bg-[#313131] shrink-0 border-t border-black/25 flex items-center justify-between px-3 relative z-95 shadow-2xl text-white text-xs select-none"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Left indicators */}
        <div className="flex-1 h-full flex items-center gap-1.5 overflow-hidden">
          {/* Mint Menu Button */}
          <button
            onClick={() => {
              setIsMintMenuOpen(!isMintMenuOpen);
              triggerSystemSound(580, 0.04, 0.15);
            }}
            className={`h-10 w-10 rounded-[3px] flex items-center justify-center transition-all cursor-pointer shrink-0 ${isMintMenuOpen ? 'bg-white/[0.12] shadow-inner' : 'hover:bg-white/[0.06] active:bg-white/[0.1]'
              }`}
            title="Menu do Linux Mint"
          >
            <div className="w-6 h-6 flex items-center justify-center">
              <img
                src="/assets/linux-mint-icon.svg"
                alt="LM"
                className="w-[21px] h-[21px] object-contain brightness-0 invert"
                referrerPolicy="no-referrer"
              />
            </div>
          </button>

          {/* Thin dividing spacing line */}
          <div className="w-px h-6 bg-white/10 mx-0.5 shrink-0" />

          {/* Quick task launch shortcuts panel */}
          <div className="flex items-center gap-[4px] shrink-0">
            {[
              { id: 'nemo', title: 'Arquivos Nemo', action: () => { setNemoFolder('Home'); openWindow('nemo'); } },
              { id: 'firefox', title: 'Navegador Firefox', action: () => openWindow('firefox') },
              { id: 'terminal', title: 'Cinnamon Terminal', action: () => openWindow('terminal') },
            ].map((sc) => (
              <button
                key={sc.id}
                onClick={sc.action}
                className="p-1 hover:bg-white/[0.06] active:bg-white/[0.1] rounded transition-all shrink-0"
                title={sc.title}
              >
                <MintAppIcon id={sc.id} className="w-[25px] h-[25px] object-contain" />
              </button>
            ))}
          </div>

          {/* Subtle vertical divide line */}
          <div className="w-px h-6 bg-white/5 mx-1.5 shrink-0" />

          {/* Cinnamon active window listing */}
          <div className="flex-1 flex items-center justify-start gap-1 pb-px px-1 overflow-x-auto no-scrollbar h-full">
            {windows.map((win) => {
              if (!win.isOpen) return null;
              const active = topZ === win.zIndex && !win.isMinimized;
              return (
                <button
                  key={win.id}
                  onClick={() => {
                    if (active) {
                      minimizeWindow(win.id);
                    } else {
                      focusWindow(win.id);
                    }
                    triggerSystemSound(300, 0.04, 0.05);
                  }}
                  className={`h-[38px] px-3.5 rounded transition-all flex items-center gap-2 max-w-[150px] truncate select-none border-b-2 text-left shrink-0 active:scale-95 ${active ? 'bg-white/[0.07] border-[#87cf3e] text-white font-bold' : 'hover:bg-white/[0.03] border-transparent text-zinc-400'
                    }`}
                >
                  {win.icon}
                  <span className="text-[11px] truncate leading-none mb-px">{win.title.split(' ')[0]}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Right status system tray */}
        <div className="flex items-center gap-[1px] h-full">
          {/* Document Printer indicator */}
          <button
            onClick={() => alertFeedback(isEn ? 'Virtual printer ready. No pending print jobs.' : 'Impressora virtual ativa. Nenhuma tarefa de impressão pendente.')}
            className="p-1 hover:bg-white/[0.05] active:bg-white/[0.08] rounded text-zinc-200 hover:text-white"
            title="Impressora Cinnamon"
          >
            <Printer size={15} />
          </button>

          {/* Network indicator */}
          <button
            onClick={() => alertFeedback(isEn ? 'Wired Network connected: 1 Gbit/s.' : 'Rede Cabeada conectada: 1 Gbit/s.')}
            className="p-1 hover:bg-white/[0.05] active:bg-white/[0.08] rounded text-zinc-200 hover:text-white"
            title="Conexão com Fio Ativa"
          >
            <Network size={14} />
          </button>

          {/* Tray volume indicator */}
          <div className="relative">
            <button
              onClick={() => {
                setShowTrayVolume(!showTrayVolume);
                setShowTrayCalendar(false);
              }}
              className={`p-1 rounded flex items-center justify-center ${showTrayVolume ? 'bg-white/[0.08] text-[#87cf3e] font-bold' : 'hover:bg-white/[0.05] text-zinc-200 hover:text-white'}`}
              title="Volume de Som"
            >
              {trayVolume === 0 ? <VolumeX size={15} /> : <Volume2 size={15} />}
            </button>
            {showTrayVolume && (
              <div className="absolute bottom-12 right-0 bg-[#22252a] border border-white/5 rounded-lg p-3 w-40 shadow-2xl flex items-center gap-2.5 z-[120]">
                <VolumeX size={13} className="text-zinc-400" />
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={trayVolume}
                  onChange={(e) => setTrayVolume(Number(e.target.value))}
                  className="w-full accent-[#87cf3e] h-1.5 bg-zinc-805 cursor-pointer rounded"
                />
                <span className="text-[10px] font-mono font-bold text-zinc-300">{trayVolume}%</span>
              </div>
            )}
          </div>

          {/* Clock */}
          <div className="relative h-full flex items-center">
            <button
              onClick={() => {
                setShowTrayCalendar(!showTrayCalendar);
                setShowTrayVolume(false);
              }}
              className={`h-full px-2 rounded flex items-center justify-center transition-all cursor-pointer ${showTrayCalendar ? 'bg-white/[0.08]' : 'hover:bg-white/[0.05]'
                }`}
              title={`Exibir Calendário (${systemDate})`}
            >
              <span className="text-[11px] font-bold tracking-wide text-white leading-none mb-px">
                {systemTime}
              </span>
            </button>

            {/* Calendar popover calendar dropdown */}
            {showTrayCalendar && (
              <div className="absolute bottom-12 right-0 bg-[#22252a]/95 border border-white/5 rounded-xl shadow-2xl p-4 w-60 z-[120] animate-fadeIn backdrop-blur-md">
                <div className="flex items-center justify-between pb-3 border-b border-white/5">
                  <span className="font-bold text-sm text-zinc-150">Calendário Cinnamon</span>
                  <span className="text-[10px] uppercase font-bold tracking-wider text-[#87cf3e]">Hoje</span>
                </div>
                <div className="py-2.5 text-center text-xs text-zinc-300">
                  <div className="font-semibold text-white mb-2">{new Date().toLocaleDateString('pt-BR', { weekday: 'long', day: 'numeric', month: 'long' })}</div>
                  <div className="grid grid-cols-7 gap-1 font-mono text-[9px] text-zinc-500 font-bold uppercase tracking-wider mb-2">
                    {['D', 'S', 'T', 'Q', 'Q', 'S', 'S'].map((d, ix) => <span key={ix}>{d}</span>)}
                  </div>
                  <div className="grid grid-cols-7 gap-1 text-[11px] font-semibold text-zinc-300">
                    {Array.from({ length: 31 }, (_, i) => {
                      const day = i + 1;
                      const isToday = day === new Date().getDate();
                      return (
                        <span
                          key={i}
                          className={`p-1 aspect-square rounded-full flex items-center justify-center ${isToday ? 'bg-[#87cf3e] text-black font-extrabold shadow-md' : 'hover:bg-white/5'
                            }`}
                        >
                          {day}
                        </span>
                      );
                    })}
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Show Desktop Corner Bar */}
          <div
            onClick={() => {
              const allCurrentlyMinimized = windows.every(w => !w.isOpen || w.isMinimized);
              setWindows(prev => prev.map(w => ({
                ...w,
                isMinimized: !allCurrentlyMinimized ? true : false
              })));
              triggerSystemSound(300, 0.04, 0.05);
            }}
            className="h-[38px] w-[14px] bg-[#3e3e42] border border-black/85 hover:bg-white/[0.08] active:bg-white/[0.12] ml-1 rounded-[1.5px] shadow-inner transition-colors cursor-pointer shrink-0"
            title="Mostrar Área de Trabalho"
          />
        </div>

      </div>

      {/* Global persistent audio element for Rhythmbox playback */}
      <audio
        ref={audioRef}
        src={getTrackSources(currentTrackIndex)[audioAttempt] || `https://www.soundhelix.com/examples/mp3/SoundHelix-Song-${(currentTrackIndex % 16) + 1}.mp3`}
        preload="auto"
        onError={handleAudioError}
        onTimeUpdate={() => {
          if (audioRef.current) {
            setCurrentTime(audioRef.current.currentTime);
          }
        }}
        onLoadedMetadata={() => {
          if (audioRef.current) {
            setAudioDuration(audioRef.current.duration || 185);
          }
        }}
        onEnded={() => {
          nextTrack();
        }}
      />

    </div>
  );
};