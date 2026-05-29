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
  SkipBack, SkipForward, Heart, ThumbsDown, Repeat, Shuffle, Volume1,
  Music, Image, Download, ChevronDown
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

// Map of custom application icons (prefilled with premium fallback illustrations and high-fidelity indicators)
// Users can easily overwrite these empty strings with image/icon URLs when they wish to replace them!
const CUSTOM_ICONS = {
  files: 'filemanager-app.png',
  terminal: 'terminal-app.png',
  firefox: 'Firefox_logo,_2019.svg',
  calculator: 'calculator-app.png',
  settings: 'system-settings.png',
  ubuntu: 'icone-ubuntu.png',
  thunderbird: 'Thunderbird.png',
  rhythmbox: 'rhythmbox.png',
  libreofficewriter: 'libreoffice-writer.png',
  software: 'app-center.png',
  help: 'help-app.png',
  trash_empty: 'user-trash.png',
  trash_full: 'user-trash.png',

  // Newly introduced premium icons from meulinux.com repository
  clocks: 'clocks.png',
  videoplayer: 'totem.png',
  camera: 'cheese.png',
  characters: 'characters.png',
  calendar: 'calendar.png',
  gparted: 'gparted.png',
  language: 'language-support.png',
  libreoffice: 'libreoffice.png',
  libreofficecalc: 'libreoffice-calc.png',
  libreofficedraw: 'libreoffice-draw.png',
  libreofficeimpress: 'libreoffice-impress.png',
  remmina: 'remmina.png',
  resources: 'system-monitor.png',
  security: 'security.png',
  shotwell: 'shotwell.png',
  softwareupdater: 'software-updater.png',
  startupdisk: 'startup-disk.png',
  documentviewer: 'document-viewer.png',
  firmware: 'firmware-updater.png',
};

const AppIcon = ({ id, sizeClass = "w-10 h-10", isTrashFull = false }: { id: string; sizeClass?: string; isTrashFull?: boolean }) => {
  const [hasError, setHasError] = useState(false);

  let customUrl = CUSTOM_ICONS[id as keyof typeof CUSTOM_ICONS];
  if (id === 'trash') {
    customUrl = isTrashFull ? CUSTOM_ICONS.trash_full : CUSTOM_ICONS.trash_empty;
  }

  if (customUrl && !hasError) {
    const finalUrl = customUrl.startsWith('http') || customUrl.startsWith('/assets/') ? customUrl : `/assets/${customUrl}`;
    return (
      <img 
        src={finalUrl} 
        alt="" 
        className={`${sizeClass} object-contain hover:scale-110 transition-transform`} 
        referrerPolicy="no-referrer"
        onError={() => {
          setHasError(true);
        }}
      />
    );
  }

  // Fallbacks:
  if (id === 'files') {
    return (
      <svg className={`${sizeClass} drop-shadow-md hover:scale-110 transition-transform`} viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M6 10C6 8.34315 7.34315 7 9 7H19L24 12H39C40.6569 12 42 13.3431 42 15V38C42 39.6569 40.6569 41 39 41H9C7.34315 41 6 39.6569 6 38V10Z" fill="url(#folder_bottom_x)" />
        <path d="M6 15C6 13.3431 7.34315 12 9 12H39C40.6569 12 42 13.3431 42 15V38C42 39.6569 40.6569 41 39 41H9C7.34315 41 6 39.6569 6 38V15Z" fill="url(#folder_front_x)" />
        <path d="M12 20H36V22H12V20ZM12 26H28V28H12V26Z" fill="white" fillOpacity="0.15" />
        <defs>
          <linearGradient id="folder_bottom_x" x1="24" y1="7" x2="24" y2="41" gradientUnits="userSpaceOnUse">
            <stop stopColor="#E95420" />
            <stop offset="1" stopColor="#AE3915" />
          </linearGradient>
          <linearGradient id="folder_front_x" x1="24" y1="12" x2="24" y2="41" gradientUnits="userSpaceOnUse">
            <stop stopColor="#F87950" />
            <stop offset="1" stopColor="#E95420" />
          </linearGradient>
        </defs>
      </svg>
    );
  }
  if (id === 'terminal') {
    return (
      <svg className={`${sizeClass} drop-shadow-md hover:scale-110 transition-transform`} viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect width="40" height="40" rx="8" transform="translate(4 4)" fill="url(#term_bg_x)" />
        <rect width="38" height="38" rx="7" transform="translate(5 5)" stroke="url(#term_stroke_x)" strokeWidth="2" />
        <path d="M14 16L22 22L14 28" stroke="#34A853" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
        <line x1="24" y1="28" x2="34" y2="28" stroke="#E95420" strokeWidth="3" strokeLinecap="round" />
        <defs>
          <linearGradient id="term_bg_x" x1="24" y1="4" x2="24" y2="44" gradientUnits="userSpaceOnUse">
            <stop stopColor="#2D0922" />
            <stop offset="1" stopColor="#150510" />
          </linearGradient>
          <linearGradient id="term_stroke_x" x1="24" y1="5" x2="24" y2="43" gradientUnits="userSpaceOnUse">
            <stop stopColor="#E95420" stopOpacity="0.6" />
            <stop offset="1" stopColor="#77216F" stopOpacity="0.4" />
          </linearGradient>
        </defs>
      </svg>
    );
  }
  if (id === 'firefox') {
    return (
      <svg className={`${sizeClass} drop-shadow-md hover:scale-110 transition-transform`} viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="24" cy="24" r="18" fill="url(#globe_bg_x)" />
        <path d="M24 6C14.0589 6 6 14.0589 6 24C6 33.9411 14.0589 42 24 42C33.9411 42 42 33.9411 42 24C42 14.0589 33.9411 6 24 6Z" fill="url(#fox_body_x)" fillRule="evenodd" clipRule="evenodd" />
        <circle cx="24" cy="24" r="12" fill="url(#globe_blend_x)" />
        <path d="M15 15C13 18 12 21 12 24C12 30.6274 17.3726 36 24 36C30.6274 36 36 30.6274 36 24C36 17.3726 30.6274 12 24 12C20.5 12 18 13.5 16.5 14.5C18 15 21 15 22.5 16.5C24.5 18.5 24 21.5 21 21.5C18 21.5 15.5 19 15 15Z" fill="url(#fox_tail_x)" />
        <defs>
          <linearGradient id="globe_bg_x" x1="24" y1="6" x2="24" y2="42" gradientUnits="userSpaceOnUse">
            <stop stopColor="#0D47A1" />
            <stop offset="1" stopColor="#1976D2" />
          </linearGradient>
          <radialGradient id="globe_blend_x" cx="24" cy="24" r="12" gradientUnits="userSpaceOnUse">
            <stop stopColor="#4FC3F7" />
            <stop offset="1" stopColor="#0288D1" />
          </radialGradient>
          <linearGradient id="fox_body_x" x1="24" y1="6" x2="24" y2="42" gradientUnits="userSpaceOnUse">
            <stop stopColor="#FF6D00" />
            <stop offset="0.5" stopColor="#FF3D00" />
            <stop offset="1" stopColor="#DD2C00" />
          </linearGradient>
          <linearGradient id="fox_tail_x" x1="24" y1="12" x2="24" y2="36" gradientUnits="userSpaceOnUse">
            <stop stopColor="#FFD600" />
            <stop offset="1" stopColor="#FF6D00" />
          </linearGradient>
        </defs>
      </svg>
    );
  }
  if (id === 'calculator') {
    return (
      <svg className={`${sizeClass} drop-shadow-md hover:scale-110 transition-transform`} viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect width="40" height="40" rx="8" transform="translate(4 4)" fill="url(#calc_bg_x)" />
        <rect x="9" y="9" width="30" height="10" rx="3" fill="#111111" />
        <rect x="9" y="23" width="7" height="7" rx="2" fill="#555" />
        <rect x="19" y="23" width="7" height="7" rx="2" fill="#555" />
        <rect x="29" y="23" width="7" height="7" rx="2" fill="#E95420" />
        <rect x="9" y="33" width="7" height="7" rx="2" fill="#555" />
        <rect x="19" y="33" width="7" height="7" rx="2" fill="#555" />
        <rect x="29" y="33" width="7" height="7" rx="2" fill="#FF8F00" />
        <defs>
          <linearGradient id="calc_bg_x" x1="24" y1="4" x2="24" y2="44" gradientUnits="userSpaceOnUse">
            <stop stopColor="#424242" />
            <stop offset="1" stopColor="#212121" />
          </linearGradient>
        </defs>
      </svg>
    );
  }
  if (id === 'settings') {
    return (
      <svg className={`${sizeClass} drop-shadow-md hover:scale-110 transition-transform`} viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect width="40" height="40" rx="10" transform="translate(4 4)" fill="url(#settings_bg_x)" />
        <path d="M24 16C19.5817 16 16 19.5817 16 24C16 28.4183 19.5817 32 24 32C28.4183 32 32 28.4183 32 24C32 19.5817 28.4183 16 24 16ZM24 20C26.2091 20 28 21.7909 28 24C28 26.2091 26.2091 28 24 28C21.7909 28 20 26.2091 20 24C20 21.7909 21.7909 20 24 20Z" fill="#E0E0E0" />
        <path d="M24 10V14M24 34V38M10 24H14M34 24H38M14.1 14.1L16.9 16.9M31.1 31.1L33.9 33.9M14.1 33.9L16.9 31.1M31.1 16.9L33.9 14.1" stroke="#E0E0E0" strokeWidth="3" strokeLinecap="round" />
        <defs>
          <linearGradient id="settings_bg_x" x1="24" y1="4" x2="24" y2="44" gradientUnits="userSpaceOnUse">
            <stop stopColor="#757575" />
            <stop offset="1" stopColor="#424242" />
          </linearGradient>
        </defs>
      </svg>
    );
  }
  if (id === 'thunderbird') {
    return (
      <svg className={`${sizeClass} drop-shadow-md hover:scale-110 transition-transform`} viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect width="40" height="40" rx="8" transform="translate(4 4)" fill="#1976D2" />
        <path d="M14 17L24 27L34 17" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
        <rect x="13" y="16" width="22" height="16" rx="1.5" stroke="white" strokeWidth="2" strokeLinejoin="round" />
      </svg>
    );
  }
  if (id === 'rhythmbox') {
    return (
      <svg className={`${sizeClass} drop-shadow-md hover:scale-110 transition-transform`} viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect width="40" height="40" rx="8" transform="translate(4 4)" fill="#e52d27" />
        <circle cx="24" cy="24" r="10" fill="none" stroke="white" strokeWidth="2" />
        <circle cx="24" cy="24" r="4" fill="white" />
        <path d="M24 16V24" stroke="white" strokeWidth="2" strokeLinecap="round" />
      </svg>
    );
  }
  if (id === 'libreofficewriter') {
    return (
      <svg className={`${sizeClass} drop-shadow-md hover:scale-110 transition-transform`} viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect width="40" height="40" rx="8" transform="translate(4 4)" fill="#0277BD" />
        <rect x="15" y="13" width="18" height="22" rx="1" fill="white" />
        <line x1="18" y1="18" x2="30" y2="18" stroke="#0277BD" strokeWidth="2" strokeLinecap="round" />
        <line x1="18" y1="23" x2="30" y2="23" stroke="#0277BD" strokeWidth="2" strokeLinecap="round" />
        <line x1="18" y1="28" x2="26" y2="28" stroke="#0277BD" strokeWidth="2" strokeLinecap="round" />
      </svg>
    );
  }
  if (id === 'software') {
    return (
      <svg className={`${sizeClass} drop-shadow-md hover:scale-110 transition-transform`} viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect width="40" height="40" rx="8" transform="translate(4 4)" fill="#CE93D8" />
        <rect width="36" height="26" rx="4" transform="translate(6 14)" fill="#AB47BC" />
        <path d="M18 14V11C18 9 20 8 24 8C28 8 30 9 30 11V14" stroke="white" strokeWidth="2.5" strokeLinecap="round" />
        <circle cx="24" cy="26" r="3" fill="white" />
      </svg>
    );
  }
  if (id === 'help') {
    return (
      <svg className={`${sizeClass} drop-shadow-md hover:scale-110 transition-transform`} viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="24" cy="24" r="18" fill="url(#help_bg_x)" />
        <circle cx="24" cy="24" r="14" fill="none" stroke="white" strokeWidth="2" />
        <text x="24" y="31" fill="white" fontSize="20" fontWeight="bold" textAnchor="middle" fontFamily="sans-serif">?</text>
        <defs>
          <linearGradient id="help_bg_x" x1="24" y1="6" x2="24" y2="42" gradientUnits="userSpaceOnUse">
            <stop stopColor="#00acc1" />
            <stop offset="1" stopColor="#006064" />
          </linearGradient>
        </defs>
      </svg>
    );
  }
  if (id === 'trash') {
    return (
      <svg className={`${sizeClass} drop-shadow-md hover:scale-110 transition-transform`} viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect width="40" height="40" rx="8" transform="translate(4 4)" fill="#78909C" />
        <path d="M16 16V36C16 37.1 16.9 38 18 38H30C31.1 38 32 37.1 32 36V16H16Z" fill="#546E7A" />
        <path d="M14 16H34M21 16V13C21 11.9 21.9 11 23 11H25C26.1 11 27 11.9 27 13V16" stroke="white" strokeWidth="2.5" strokeLinecap="round" />
      </svg>
    );
  }
  return <span className="text-xl">📦</span>;
};

const renderIcon = (id: string, sizeClass = "w-10 h-10", isTrashFull?: boolean) => {
  return <AppIcon id={id} sizeClass={sizeClass} isTrashFull={isTrashFull} />;
};

// Custom High-Fidelity Folder Component using the server's correct Ubuntu Yaru Yaru folder icons
export const NautilusFolderIcon: React.FC<{ type: string; className?: string }> = ({ type = "folder", className = "" }) => {
  const normType = type.toLowerCase().trim();
  
  let iconUrl = 'folder.png';
  
  if (normType === 'desktop' || normType === 'user-desktop' || normType === 'área de trabalho') {
    iconUrl = 'user-desktop.png';
  } else if (normType === 'home' || normType === 'user-home' || normType === 'pasta pessoal') {
    iconUrl = 'user-home.png';
  } else if (normType === 'documents' || normType === 'documentos') {
    iconUrl = 'folder-documents.png';
  } else if (normType === 'downloads' || normType === 'download' || normType === 'baixas') {
    iconUrl = 'folder-download.png';
  } else if (normType === 'music' || normType === 'música' || normType === 'músicas') {
    iconUrl = 'folder-music.png';
  } else if (normType === 'pictures' || normType === 'imagens' || normType === 'imagem') {
    iconUrl = 'folder-pictures.png';
  } else if (normType === 'public' || normType === 'público' || normType === 'publicshare') {
    iconUrl = 'folder-publicshare.png';
  } else if (normType === 'templates' || normType === 'modelos') {
    iconUrl = 'folder-templates.png';
  } else if (normType === 'videos' || normType === 'vídeos') {
    iconUrl = 'folder-videos.png';
  } else if (normType === 'dropbox') {
    iconUrl = 'folder-dropbox.png';
  } else if (normType === 'remote') {
    iconUrl = 'folder-remote.png';
  } else if (normType === 'insync') {
    iconUrl = 'insync-folder.png';
  } else if (normType === 'open' || normType === 'aberta') {
    iconUrl = 'folder-open.png';
  }

  const hasWidth = className.includes('w-') || className.includes('max-w-');
  const hasHeight = className.includes('h-') || className.includes('max-h-');
  const sizeClasses = `${hasWidth ? '' : 'w-11'} ${hasHeight ? '' : 'h-11'}`;

  const finalIconUrl = iconUrl.startsWith('http') || iconUrl.startsWith('/assets/') ? iconUrl : `/assets/${iconUrl}`;

  return (
    <img 
      src={finalIconUrl} 
      alt="" 
      className={`${sizeClasses} ${className} object-contain`} 
      referrerPolicy="no-referrer"
    />
  );
};

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

interface UbuntuSimulatorProps {
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

export const UbuntuSimulator: React.FC<UbuntuSimulatorProps> = ({ onClose }) => {
  const { i18n } = useTranslation();
  const isEn = i18n.language?.toLowerCase().startsWith('en');

  // Desktop wallpaper state
  const [wallpaper, setWallpaper] = useState('/assets/Resolute%20Raccoon%20Animated%20Mascot%201920x1080.mp4');

  // Splash screen state (lasts 2 segundos)
  const [showSplash, setShowSplash] = useState(true);

  const playSyntheticUbuntuSound = () => {
    try {
      const audioCtx = new (window.AudioContext || (window as any).webkitAudioContext)();
      const now = audioCtx.currentTime;

      // Helper for drum/djembe sounds
      const playDrum = (time: number) => {
        const osc = audioCtx.createOscillator();
        const gain = audioCtx.createGain();
        
        osc.connect(gain);
        gain.connect(audioCtx.destination);
        
        osc.type = 'sine';
        osc.frequency.setValueAtTime(140, time);
        osc.frequency.exponentialRampToValueAtTime(55, time + 0.18);
        
        gain.gain.setValueAtTime(0.5, time);
        gain.gain.exponentialRampToValueAtTime(0.01, time + 0.18);
        
        osc.start(time);
        osc.stop(time + 0.2);
      };

      // Play the classic "boom boom" drum beat
      playDrum(now);
      playDrum(now + 0.28);

      // Play the warm rising classic Ubuntu chime chord starting just after the drum
      const chimeTime = now + 0.5;
      
      // F-dur pentatonic / warm chord: F3, A3, C4, F4, A4, C5 + sparkly highs
      const notes = [174.61, 220.00, 261.63, 349.23, 440.00, 523.25, 880.00, 1046.50];
      
      notes.forEach((freq, idx) => {
        const osc = audioCtx.createOscillator();
        const gain = audioCtx.createGain();
        
        osc.connect(gain);
        gain.connect(audioCtx.destination);
        
        // Slightly detune to sound thick and lush
        osc.type = idx % 2 === 0 ? 'sine' : 'triangle';
        osc.frequency.setValueAtTime(freq, chimeTime);
        
        // Individual voice gain to balance chords
        const maxVol = idx < 4 ? 0.08 : 0.04; // quieter high notes, warmer low notes
        
        gain.gain.setValueAtTime(0, chimeTime);
        // Fade in
        gain.gain.linearRampToValueAtTime(maxVol, chimeTime + 0.4 + (idx * 0.05));
        // Slow release decay
        gain.gain.exponentialRampToValueAtTime(0.0001, chimeTime + 2.8);
        
        osc.start(chimeTime);
        osc.stop(chimeTime + 3.0);
      });
      
    } catch (e) {
      console.error("Failed to generate synthetic Ubuntu start sound:", e);
    }
  };

  const playUbuntuStartupSound = () => {
    const candidates = [
      '/assets/desktop-login.ogg'
    ];

    let attempt = 0;
    
    const playNext = () => {
      if (attempt >= candidates.length) {
        // Fall back to gorgeous high-fidelity Web Audio synthesized classic Ubuntu chime!
        playSyntheticUbuntuSound();
        return;
      }
      
      const audio = new Audio(candidates[attempt]);
      audio.volume = 0.45; // balanced volume
      
      audio.play()
        .then(() => {
          console.log(`Ubuntu Startup Sound successfully playing from: ${candidates[attempt]}`);
        })
        .catch(err => {
          console.warn(`Startup Sound candidate ${attempt} failed: ${candidates[attempt]}. Trying next...`, err);
          attempt++;
          playNext();
        });
    };

    playNext();
  };

  useEffect(() => {
    const splashTimer = setTimeout(() => {
      setShowSplash(false);
    }, 2000);
    return () => clearTimeout(splashTimer);
  }, []);

  useEffect(() => {
    if (!showSplash) {
      playUbuntuStartupSound();
    }
  }, [showSplash]);

  // Simulation alert notification state
  const [showSimInfoNotify, setShowSimInfoNotify] = useState(false);

  useEffect(() => {
    if (!showSplash) {
      const timer = setTimeout(() => {
        setShowSimInfoNotify(true);
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [showSplash]);
  
  // Quick Toggles dropdown
  const [showStatusMenu, setShowStatusMenu] = useState(false);
  const [volume, setVolume] = useState(80);
  const [brightness, setBrightness] = useState(90);
  const [wifiOn, setWifiOn] = useState(true);
  const [bluetoothOn, setBluetoothOn] = useState(true);
  const [darkStyle, setDarkStyle] = useState(true);
  const [nightLight, setNightLight] = useState(false);
  const [doNotDisturb, setDoNotDisturb] = useState(false);
  const [airplaneMode, setAirplaneMode] = useState(false);
  const [powerMode, setPowerMode] = useState<'balanced' | 'power-saver'>('balanced');

  // Desktop Context Menu & Folders state
  const [showContextMenu, setShowContextMenu] = useState(false);
  const [contextMenuPos, setContextMenuPos] = useState({ x: 0, y: 0 });
  const [showArrangeSubmenu, setShowArrangeSubmenu] = useState(false);
  const [showNewFolderModal, setShowNewFolderModal] = useState(false);
  const [newFolderName, setNewFolderName] = useState('Sem Título');
  const [customDesktopFolders, setCustomDesktopFolders] = useState<string[]>([]);
  const [settingsActiveTab, setSettingsActiveTab] = useState<'appearance' | 'display' | 'desktop-icons'>('appearance');

  // Desktop selection & drag-to-select states
  const [selectedDesktopIndices, setSelectedDesktopIndices] = useState<number[]>([]);
  const [dragStart, setDragStart] = useState<{ x: number; y: number } | null>(null);
  const [dragCurrent, setDragCurrent] = useState<{ x: number; y: number } | null>(null);

  // Item specific context menu & actions
  const [showItemContextMenu, setShowItemContextMenu] = useState(false);
  const [itemContextMenuPos, setItemContextMenuPos] = useState({ x: 0, y: 0 });
  const [rightClickedItem, setRightClickedItem] = useState<{
    id: string;
    name: string;
    type: 'folder' | 'file';
    origin: 'desktop' | 'nautilus';
  } | null>(null);

  const [showRenameModal, setShowRenameModal] = useState(false);
  const [renameValue, setRenameValue] = useState('');

  const [showPropertiesModal, setShowPropertiesModal] = useState(false);
  const [propertiesItem, setPropertiesItem] = useState<{
    name: string;
    type: string;
    size: string;
    location: string;
    created: string;
  } | null>(null);
  
  // Activities / Applications menu
  const [showAppGrid, setShowAppGrid] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  // Clock time
  const [timeStr, setTimeStr] = useState('');
  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const options: Intl.DateTimeFormatOptions = { 
        month: 'short', 
        day: 'numeric', 
        hour: '2-digit', 
        minute: '2-digit',
        hour12: false
      };
      setTimeStr(now.toLocaleDateString('pt-BR', options).replace(',', ''));
    };
    updateTime();
    const interval = setInterval(updateTime, 1000 * 60);
    return () => clearInterval(interval);
  }, []);

  // Screenshot flash and notification state
  const [screenshotFlash, setScreenshotFlash] = useState(false);
  const [screenshotNotification, setScreenshotNotification] = useState<string | null>(null);

  // Clock, Calendar, and Notification states
  const [showCalendarMenu, setShowCalendarMenu] = useState(false);
  const [navDate, setNavDate] = useState(new Date());
  const [notifications, setNotifications] = useState<any[]>(() => [
    {
      id: 'welcome',
      app: 'Ubuntu',
      title: isEn ? 'Ubuntu 26.04 Simulation' : 'Simulação do Ubuntu 26.04',
      body: isEn 
        ? 'This is only an interactive web simulation so you can experience and interact with the OS before downloading.'
        : 'Esta é apenas uma simulação para que você possa experimentar e interagir antes de baixar a distribuição real.',
      time: '19:40',
      icon: 'monitor'
    }
  ]);

  // Sync screenshotNotification into central notifications list automatically
  useEffect(() => {
    if (screenshotNotification) {
      const normalizedText = screenshotNotification;
      setNotifications(prev => {
        if (prev.some(n => n.body === normalizedText)) return prev;
        
        const now = new Date();
        const timeVal = now.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' });
        
        let app = 'Ubuntu';
        let icon = 'monitor';
        let title = 'Notificação do Sistema';
        
        if (normalizedText.includes('Captura de tela')) {
          app = 'Captura de Tela';
          title = 'Mídia / Foto';
          icon = 'camera';
        } else if (normalizedText.includes('Modo avião')) {
          app = 'Configurações';
          title = 'Modo Avião';
          icon = 'airplane';
        } else if (normalizedText.includes('Teclado')) {
          app = 'Teclado';
          title = 'Layout de Entrada';
          icon = 'keyboard';
        } else if (normalizedText.includes('Pasta') || normalizedText.includes('Documento') || normalizedText.includes('restaurado')) {
          app = 'Arquivos';
          title = 'Gerenciador Nautilus';
          icon = 'folder';
        } else if (normalizedText.includes('Lixeira')) {
          app = 'Lixeira';
          title = 'Arquivos Apagados';
          icon = 'trash';
        }
        
        return [
          {
            id: Math.random().toString(),
            app,
            title,
            body: normalizedText,
            time: timeVal,
            icon
          },
          ...prev
        ];
      });
    }
  }, [screenshotNotification]);

  // Calendar days grid generation helper
  const getCalendarDays = (date: Date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    
    // First day index
    const firstDayIndex = new Date(year, month, 1).getDay();
    
    // Total days in current month
    const totalDays = new Date(year, month + 1, 0).getDate();
    
    // Total days in previous month
    const prevTotalDays = new Date(year, month, 0).getDate();
    
    const days: any[] = [];
    
    // Previous month days
    for (let i = firstDayIndex - 1; i >= 0; i--) {
      const prevDay = prevTotalDays - i;
      const dObj = new Date(year, month - 1, prevDay);
      days.push({
        day: prevDay,
        type: 'prev',
        isToday: dObj.getFullYear() === new Date().getFullYear() && dObj.getMonth() === new Date().getMonth() && dObj.getDate() === new Date().getDate(),
        dateObj: dObj
      });
    }
    
    // Current month days
    for (let i = 1; i <= totalDays; i++) {
      const dObj = new Date(year, month, i);
      days.push({
        day: i,
        type: 'current',
        isToday: dObj.getFullYear() === new Date().getFullYear() && dObj.getMonth() === new Date().getMonth() && dObj.getDate() === new Date().getDate(),
        dateObj: dObj
      });
    }
    
    // Next month days
    const totalGrid = 42;
    const nextDaysCount = totalGrid - days.length;
    for (let i = 1; i <= nextDaysCount; i++) {
      const dObj = new Date(year, month + 1, i);
      days.push({
        day: i,
        type: 'next',
        isToday: dObj.getFullYear() === new Date().getFullYear() && dObj.getMonth() === new Date().getMonth() && dObj.getDate() === new Date().getDate(),
        dateObj: dObj
      });
    }
    
    return days;
  };

  const triggerScreenshot = () => {
    setScreenshotFlash(true);
    setTimeout(() => setScreenshotFlash(false), 200);
    
    const now = new Date();
    const time = now.toLocaleTimeString(isEn ? 'en-US' : 'pt-BR');
    setScreenshotNotification(isEn 
      ? `Screenshot saved at ${time}. The file has been saved in the Pictures folder.`
      : `Captura de tela salva às ${time}. O arquivo foi salvo na pasta Imagens.`);
    
    // Auto remove notification
    setTimeout(() => {
      setScreenshotNotification(null);
    }, 5000);
  };

  const [activeDragId, setActiveDragId] = useState<string | null>(null);
  const [activeResizeId, setActiveResizeId] = useState<string | null>(null);
  const resizingRef = useRef<{
    id: string;
    direction: 'n' | 's' | 'e' | 'w' | 'nw' | 'ne' | 'sw' | 'se';
    initialX: number;
    initialY: number;
    initialWinX: number;
    initialWinY: number;
    initialWidth: number;
    initialHeight: number;
  } | null>(null);

  // HUD systems for hardware states
  const [hudType, setHudType] = useState<'volume' | 'brightness' | null>(null);
  const [hudValue, setHudValue] = useState(0);
  const hudTimeoutRef = useRef<any>(null);
  const lastBeepTimeRef = useRef(0);

  const playVolumeBeep = (vol: number) => {
    try {
      const audioCtx = new (window.AudioContext || (window as any).webkitAudioContext)();
      const oscillator = audioCtx.createOscillator();
      const gainNode = audioCtx.createGain();
      
      oscillator.type = 'sine';
      oscillator.frequency.setValueAtTime(440, audioCtx.currentTime); // Standard 440hz Alert Beep
      
      const gainVal = (vol / 100) * 0.05;
      gainNode.gain.setValueAtTime(gainVal, audioCtx.currentTime);
      gainNode.gain.exponentialRampToValueAtTime(0.0001, audioCtx.currentTime + 0.15);
      
      oscillator.connect(gainNode);
      gainNode.connect(audioCtx.destination);
      
      oscillator.start();
      oscillator.stop(audioCtx.currentTime + 0.15);
    } catch (err) {
      console.log('Web Audio is blocked or unsupported:', err);
    }
  };

  const playVolumeBeepThrottled = (vol: number) => {
    const now = Date.now();
    if (now - lastBeepTimeRef.current > 180) {
      playVolumeBeep(vol);
      lastBeepTimeRef.current = now;
    }
  };

  const handleVolumeChange = (newVal: number) => {
    setVolume(newVal);
    setHudType('volume');
    setHudValue(newVal);
    
    if (newVal > 0) {
      playVolumeBeepThrottled(newVal);
    }

    if (hudTimeoutRef.current) {
      clearTimeout(hudTimeoutRef.current);
    }
    hudTimeoutRef.current = setTimeout(() => {
      setHudType(null);
    }, 1500);
  };

  const handleBrightnessChange = (newVal: number) => {
    setBrightness(newVal);
    setHudType('brightness');
    setHudValue(newVal);

    if (hudTimeoutRef.current) {
      clearTimeout(hudTimeoutRef.current);
    }
    hudTimeoutRef.current = setTimeout(() => {
      setHudType(null);
    }, 1500);
  };

  // States for Nautilus header additions
  const [showNautilusSearch, setShowNautilusSearch] = useState(false);
  const [nautilusSearchQuery, setNautilusSearchQuery] = useState('');
  const [nautilusViewMode, setNautilusViewMode] = useState<'grid' | 'list'>('grid');
  const [showNautilusMenu, setShowNautilusMenu] = useState(false);

  // States for the newly simulated high-fidelity applications
  const [activeMailId, setActiveMailId] = useState(0);
  const [rhythmPlaying, setRhythmPlaying] = useState(false);
  const [rhythmTrack, setRhythmTrack] = useState(1); // Default to index 1 (Houdini)
  const [rhythmProgress, setRhythmProgress] = useState(0);
  const [writerText, setWriterText] = useState('Título do Documento\n\nEsta é uma simulação avançada do LibreOffice Writer.\n\nVocê pode redigir textos, apagar conteúdos, e testar botões de formatação de cabeçalho na barra superior. Todo o progresso do texto é salvo localmente em seu contêiner sandbox de forma segura!');
  const [isBold, setIsBold] = useState(false);
  const [isItalic, setIsItalic] = useState(false);
  const [isUnderline, setIsUnderline] = useState(false);
  const [installingId, setInstallingId] = useState<string | null>(null);
  const [installedAppList, setInstalledAppList] = useState<string[]>(['cowsay', 'sl']);
  const [trashItems, setTrashItems] = useState<string[]>([]);

  // Real audio engine states
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [audioCurrentTime, setAudioCurrentTime] = useState(0);
  const [audioDuration, setAudioDuration] = useState(185); // Default to 185 (3:05)
  const [rhythmShuffle, setRhythmShuffle] = useState(false);
  const [rhythmRepeat, setRhythmRepeat] = useState(false);
  const [rhythmLiked, setRhythmLiked] = useState<boolean[]>(new Array(11).fill(false));

  // High fidelity URL fallback logic for Rhythmbox
  const [rhythmAudioMode, setRhythmAudioMode] = useState<'online' | 'local'>('local');
  const [audioAttempt, setAudioAttempt] = useState(0);

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

  // Sync OS-wide volume with audio element volume
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume / 100;
    }
  }, [volume]);

  // Fast synchronous direct actions to bypass browser iframe user gesture blocks
  const playTrack = (idx: number) => {
    setRhythmTrack(idx);
    setAudioAttempt(0); // Reset retry chain on track select
    setRhythmPlaying(true);
    
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
    
    if (rhythmPlaying) {
      audio.pause();
      setRhythmPlaying(false);
    } else {
      audio.play().then(() => {
        setRhythmPlaying(true);
      }).catch(err => {
        console.warn("Playback initialization failed in gesture:", err);
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

  // Switch source immediately on mode toggle
  useEffect(() => {
    const audio = audioRef.current;
    if (audio) {
      const sources = getTrackSources(rhythmTrack);
      audio.src = sources[0];
      setAudioAttempt(0);
      audio.load();
      if (rhythmPlaying) {
        audio.play().catch(e => console.log("Re-play on mode switch deferred:", e));
      }
    }
  }, [rhythmAudioMode]);

  // Audio track state monitor and auto playback sync
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;
    
    if (rhythmPlaying) {
      audio.play().catch(err => {
        console.warn("Audio play deferred or blocked by browser gesture restriction", err);
      });
    }
  }, [rhythmTrack]);

  // Automatic source sequencer fallback on loading/playing errors
  const handleAudioError = () => {
    const audio = audioRef.current;
    if (!audio) return;
    
    const sources = getTrackSources(rhythmTrack);
    const nextAttempt = audioAttempt + 1;
    
    if (nextAttempt < sources.length) {
      console.warn(`Tentativa de reprodução [${audioAttempt}] falhou. Tentando próximo caminho: ${sources[nextAttempt]}`);
      setAudioAttempt(nextAttempt);
      audio.src = sources[nextAttempt];
      audio.load();
      if (rhythmPlaying) {
        audio.play().catch(err => {
          console.warn("Auto-play on fallback path deferred:", err);
        });
      }
    } else if (rhythmAudioMode === 'local') {
      // If we exhausted local candidates, force online fallback mode with native alert
      console.warn("Caminhos de hospedagem local indisponíveis (404/CORS). Forçando fallback online.");
      setRhythmAudioMode('online');
      setAudioAttempt(0);
      setScreenshotNotification(isEn 
        ? "⚠️ Local music files unavailable on the server (404, CORS or permissions). Rhythmbox automatically activated the Online Test Server!"
        : "⚠️ Músicas locais indisponíveis no servidor (404, CORS ou permissão). O Rhythmbox ativou automaticamente o Servidor de Testes Online!");
    }
  };

  // Handle play/pause state change separately
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;
    
    if (rhythmPlaying) {
      audio.play().catch(err => {
        console.warn("Audio play deferred or blocked by browser gesture restriction", err);
      });
    } else {
      audio.pause();
    }
  }, [rhythmPlaying]);

  // Track seeker click handler
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
    setAudioCurrentTime(newTime);
  };

  // Audio time update interval checker
  useEffect(() => {
    let interval: any;
    if (rhythmPlaying) {
      interval = setInterval(() => {
        if (audioRef.current) {
          setAudioCurrentTime(audioRef.current.currentTime);
          if (audioRef.current.duration && !isNaN(audioRef.current.duration)) {
            setAudioDuration(audioRef.current.duration);
          }
        }
      }, 500);
    }
    return () => clearInterval(interval);
  }, [rhythmPlaying]);

  // Window System State
  const [windows, setWindows] = useState<WindowData[]>([
    {
      id: 'firefox',
      title: 'Firefox Web Browser',
      icon: <Globe className="text-orange-500" size={20} />,
      isOpen: false,
      isMinimized: false,
      isMaximized: false,
      x: 100,
      y: 60,
      width: 820,
      height: 540,
      zIndex: 10,
    },
    {
      id: 'thunderbird',
      title: 'Thunderbird Mail',
      icon: <span className="text-blue-400 font-bold">✉</span>,
      isOpen: false,
      isMinimized: false,
      isMaximized: false,
      x: 140,
      y: 90,
      width: 760,
      height: 480,
      zIndex: 10,
    },
    {
      id: 'files',
      title: 'Arquivos',
      icon: <Folder className="text-amber-500 fill-amber-500" size={20} />,
      isOpen: false,
      isMinimized: false,
      isMaximized: false,
      x: 120,
      y: 80,
      width: 720,
      height: 460,
      zIndex: 10,
    },
    {
      id: 'rhythmbox',
      title: 'Rhythmbox',
      icon: <span className="text-red-500 font-bold">🎵</span>,
      isOpen: false,
      isMinimized: false,
      isMaximized: false,
      x: 190,
      y: 120,
      width: 800,
      height: 590,
      zIndex: 10,
    },
    {
      id: 'libreofficewriter',
      title: 'LibreOffice Writer',
      icon: <span className="text-blue-600 font-bold">📄</span>,
      isOpen: false,
      isMinimized: false,
      isMaximized: false,
      x: 130,
      y: 95,
      width: 780,
      height: 500,
      zIndex: 10,
    },
    {
      id: 'software',
      title: 'Central de Aplicativos (App Center)',
      icon: <span className="text-orange-500 font-bold">🛍</span>,
      isOpen: false,
      isMinimized: false,
      isMaximized: false,
      x: 150,
      y: 100,
      width: 840,
      height: 540,
      zIndex: 10,
    },
    {
      id: 'help',
      title: 'Ajuda do Ubuntu',
      icon: <HelpCircle className="text-blue-500" size={20} />,
      isOpen: false,
      isMinimized: false,
      isMaximized: false,
      x: 210,
      y: 130,
      width: 600,
      height: 440,
      zIndex: 10,
    },
    {
      id: 'terminal',
      title: 'Terminal do Ubuntu',
      icon: <TermIcon className="text-gray-200" size={20} />,
      isOpen: false,
      isMinimized: false,
      isMaximized: false,
      x: 170,
      y: 110,
      width: 660,
      height: 420,
      zIndex: 20,
    },
    {
      id: 'calculator',
      title: 'Calculadora',
      icon: <span className="font-bold text-sm bg-orange-600 px-1 rounded text-white">+-</span>,
      isOpen: false,
      isMinimized: false,
      isMaximized: false,
      x: 250,
      y: 150,
      width: 320,
      height: 450,
      zIndex: 10,
    },
    {
      id: 'settings',
      title: 'Configurações',
      icon: <SettingsIcon className="text-gray-400" size={20} />,
      isOpen: false,
      isMinimized: false,
      isMaximized: false,
      x: 220,
      y: 130,
      width: 680,
      height: 480,
      zIndex: 10,
    },
    {
      id: 'trash',
      title: 'Lixeira',
      icon: <Trash2 className="text-green-500" size={20} />,
      isOpen: false,
      isMinimized: false,
      isMaximized: false,
      x: 270,
      y: 170,
      width: 640,
      height: 420,
      zIndex: 10,
    }
  ]);

  const [topZIndex, setTopZIndex] = useState(30);

  // Bring window to top
  const focusWindow = (id: string) => {
    const nextZ = topZIndex + 1;
    setTopZIndex(nextZ);
    setWindows(prev => prev.map(w => w.id === id ? { ...w, zIndex: nextZ, isMinimized: false } : w));
  };

  const forceOpenAndFocusWindow = (id: string) => {
    const nextZ = topZIndex + 1;
    setTopZIndex(nextZ);
    setWindows(prev => prev.map(w => w.id === id ? { ...w, isOpen: true, isMinimized: false, zIndex: nextZ } : w));
  };

  // Mouse drag-to-select and keyboard selection effects
  const handleDesktopMouseDown = (e: React.MouseEvent) => {
    if (e.button !== 0) return; // Left click only
    const targetEl = e.target as HTMLElement;
    // Check if user clicked empty desktop space or catcher
    const isDesktopCatcher = targetEl.classList.contains('desktop-catcher') || targetEl.classList.contains('desktop-wallpaper-container') || e.currentTarget === e.target;
    if (!isDesktopCatcher) return;

    setSelectedDesktopIndices([]);
    setShowContextMenu(false);
    setShowItemContextMenu(false);
    setShowStatusMenu(false);
    setShowCalendarMenu(false);

    setDragStart({ x: e.clientX, y: e.clientY });
    setDragCurrent({ x: e.clientX, y: e.clientY });
  };

  useEffect(() => {
    if (!dragStart) return;

    const handleGlobalMouseMove = (e: MouseEvent) => {
      setDragCurrent({ x: e.clientX, y: e.clientY });
    };

    const handleGlobalMouseUp = () => {
      setDragStart(null);
      setDragCurrent(null);
    };

    window.addEventListener('mousemove', handleGlobalMouseMove);
    window.addEventListener('mouseup', handleGlobalMouseUp);

    return () => {
      window.removeEventListener('mousemove', handleGlobalMouseMove);
      window.removeEventListener('mouseup', handleGlobalMouseUp);
    };
  }, [dragStart]);

  // Collision calculation for mouse selection
  useEffect(() => {
    if (!dragStart || !dragCurrent) return;

    const left = Math.min(dragStart.x, dragCurrent.x);
    const top = Math.min(dragStart.y, dragCurrent.y);
    const width = Math.abs(dragStart.x - dragCurrent.x);
    const height = Math.abs(dragStart.y - dragCurrent.y);

    if (width < 4 || height < 4) return;

    const selected: number[] = [];
    customDesktopFolders.forEach((_, idx) => {
      const el = document.getElementById(`desktop-folder-${idx}`);
      if (el) {
        const rect = el.getBoundingClientRect();
        const overlaps = !(
          rect.right < left ||
          rect.left > left + width ||
          rect.bottom < top ||
          rect.top > top + height
        );
        if (overlaps) {
          selected.push(idx);
        }
      }
    });

    setSelectedDesktopIndices(selected);
  }, [dragStart, dragCurrent, customDesktopFolders]);

  // Keyboard shortcuts (Ctrl+A / Delete) on the Desktop launcher
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const activeEl = document.activeElement;
      const isInput = activeEl && (
        activeEl.tagName === 'INPUT' || 
        activeEl.tagName === 'TEXTAREA' || 
        activeEl.hasAttribute('contenteditable')
      );
      if (isInput) return;

      // Ctrl + A
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'a') {
        e.preventDefault();
        const allIndices = customDesktopFolders.map((_, i) => i);
        setSelectedDesktopIndices(allIndices);
        setScreenshotNotification(isEn 
          ? `All ${customDesktopFolders.length} items selected via Ctrl+A`
          : `Todos os ${customDesktopFolders.length} itens selecionados via Ctrl+A`);
        setTimeout(() => setScreenshotNotification(null), 3000);
      }

      // Delete (move selected elements to trash)
      if (e.key === 'Delete' && selectedDesktopIndices.length > 0) {
        e.preventDefault();
        const namesToDelete = selectedDesktopIndices.map(idx => customDesktopFolders[idx]);
        setTrashItems(prev => [...prev, ...namesToDelete]);
        setCustomDesktopFolders(prev => prev.filter((_, idx) => !selectedDesktopIndices.includes(idx)));
        setSelectedDesktopIndices([]);
        setScreenshotNotification(isEn 
          ? `${namesToDelete.length} items moved to Trash.`
          : `${namesToDelete.length} itens movidos para a Lixeira.`);
        setTimeout(() => setScreenshotNotification(null), 4500);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [customDesktopFolders, selectedDesktopIndices]);

  const handleContextMenu = (e: React.MouseEvent<HTMLDivElement>) => {
    e.preventDefault();
    const mouseX = e.clientX;
    const mouseY = e.clientY;
    
    const menuWidth = 220;
    const menuHeight = 350;
    const windowWidth = window.innerWidth;
    const windowHeight = window.innerHeight;
    
    let finalX = mouseX;
    let finalY = mouseY;
    
    if (mouseX + menuWidth > windowWidth) {
      finalX = windowWidth - menuWidth - 10;
    }
    if (mouseY + menuHeight > windowHeight) {
      finalY = windowHeight - menuHeight - 10;
    }
    
    setContextMenuPos({ x: finalX, y: finalY });
    setShowContextMenu(true);
    setShowArrangeSubmenu(false);
  };

  const handleItemContextMenu = (
    e: React.MouseEvent,
    id: string,
    name: string,
    type: 'folder' | 'file',
    origin: 'desktop' | 'nautilus'
  ) => {
    e.preventDefault();
    e.stopPropagation();
    
    setShowContextMenu(false);
    setShowArrangeSubmenu(false);

    const mouseX = e.clientX;
    const mouseY = e.clientY;
    
    const menuWidth = 220;
    const menuHeight = 350;
    const windowWidth = window.innerWidth;
    const windowHeight = window.innerHeight;
    
    let finalX = mouseX;
    let finalY = mouseY;
    
    if (mouseX + menuWidth > windowWidth) {
      finalX = windowWidth - menuWidth - 10;
    }
    if (mouseY + menuHeight > windowHeight) {
      finalY = windowHeight - menuHeight - 10;
    }

    setRightClickedItem({ id, name, type, origin });
    setItemContextMenuPos({ x: finalX, y: finalY });
    setShowItemContextMenu(true);
  };

  const handleRenameItem = () => {
    const trimmed = renameValue.trim();
    if (!trimmed || !rightClickedItem) {
      setShowRenameModal(false);
      return;
    }
    
    if (rightClickedItem.type === 'folder' && rightClickedItem.origin === 'desktop') {
      const idx = parseInt(rightClickedItem.id, 10);
      if (!isNaN(idx)) {
        setCustomDesktopFolders(prev => {
          const updated = [...prev];
          updated[idx] = trimmed;
          return updated;
        });
        setScreenshotNotification(isEn 
          ? `Folder renamed to "${trimmed}" successfully!`
          : `Pasta renomeada para "${trimmed}" com sucesso!`);
        setTimeout(() => setScreenshotNotification(null), 4500);
      }
    } else {
      setScreenshotNotification(isEn 
        ? `"${rightClickedItem.name}" renamed to "${trimmed}" (simulation).`
        : `"${rightClickedItem.name}" renomeado para "${trimmed}" (simulação).`);
      setTimeout(() => setScreenshotNotification(null), 4500);
    }
    setShowRenameModal(false);
  };

  const handleMoveToTrash = () => {
    if (!rightClickedItem) return;
    const name = rightClickedItem.name;
    
    if (rightClickedItem.origin === 'desktop') {
      const idx = parseInt(rightClickedItem.id, 10);
      if (!isNaN(idx)) {
        setCustomDesktopFolders(prev => prev.filter((_, i) => i !== idx));
      }
    }
    
    setTrashItems(prev => [...prev, name]);
    setScreenshotNotification(isEn 
      ? `"${name}" moved to Trash.`
      : `"${name}" movido para a Lixeira.`);
    setTimeout(() => setScreenshotNotification(null), 4500);
    setShowItemContextMenu(false);
  };

  const handleCompressItem = () => {
    if (!rightClickedItem) return;
    const name = rightClickedItem.name;
    const archiveName = `${name}.tar.xz`;
    
    if (rightClickedItem.origin === 'desktop') {
      setCustomDesktopFolders(prev => [...prev, archiveName]);
    }
    
    setScreenshotNotification(isEn 
      ? `"${archiveName}" created successfully!`
      : `"${archiveName}" criado com sucesso!`);
    setTimeout(() => setScreenshotNotification(null), 4500);
    setShowItemContextMenu(false);
  };

  const handleNewFolderWithItem = () => {
    if (!rightClickedItem) return;
    const name = rightClickedItem.name;
    const newName = isEn ? `New folder with ${name}` : `Nova pasta com ${name}`;
    
    if (rightClickedItem.origin === 'desktop') {
      const idx = parseInt(rightClickedItem.id, 10);
      if (!isNaN(idx)) {
        setCustomDesktopFolders(prev => {
          const copy = prev.filter((_, i) => i !== idx);
          copy.push(newName);
          return copy;
        });
      }
    } else {
      setCustomDesktopFolders(prev => [...prev, newName]);
    }
    
    setScreenshotNotification(isEn 
      ? `Folder "${newName}" created containing "${name}"!`
      : `Pasta "${newName}" criada contendo "${name}"!`);
    setTimeout(() => setScreenshotNotification(null), 4500);
    setShowItemContextMenu(false);
  };

  const handleShowProperties = () => {
    if (!rightClickedItem) return;
    
    const now = new Date();
    const formattedDate = now.toLocaleString(isEn ? 'en-US' : 'pt-BR');
    
    setPropertiesItem({
      name: rightClickedItem.name,
      type: rightClickedItem.type === 'folder' 
        ? (isEn ? 'File Folder (inode/directory)' : 'Pasta de arquivos (inode/directory)')
        : (isEn ? 'Plain Text Document (text/plain)' : 'Documento de texto (text/plain)'),
      size: rightClickedItem.type === 'folder' 
        ? (isEn ? '4.0 KB (4,096 bytes)' : '4,0 KB (4.096 bytes)')
        : '345 bytes (345 bytes)',
      location: rightClickedItem.origin === 'desktop' 
        ? (isEn ? '/home/ubuntu/Desktop' : '/home/ubuntu/Área de Trabalho')
        : `/home/ubuntu/${currentFolder}`,
      created: formattedDate,
    });
    
    setShowPropertiesModal(true);
    setShowItemContextMenu(false);
  };

  const handleCreateFolder = () => {
    const trimmed = newFolderName.trim();
    if (!trimmed) {
      setShowNewFolderModal(false);
      return;
    }
    setCustomDesktopFolders(prev => [...prev, trimmed]);
    setShowNewFolderModal(false);
    
    // Add custom notification mimicking standard snap notifier
    setScreenshotNotification(isEn 
      ? `Folder "${trimmed}" successfully created on Desktop!`
      : `Pasta "${trimmed}" criada com sucesso na Área de Trabalho!`);
    
    setTimeout(() => {
      setScreenshotNotification(null);
    }, 4500);
  };

  // Open or toggle minimalization of a window
  const toggleWindow = (id: string) => {
    setShowCalendarMenu(false);
    setShowStatusMenu(false);
    setWindows(prev => prev.map(w => {
      if (w.id === id) {
        if (!w.isOpen) {
          const nextZ = topZIndex + 1;
          setTopZIndex(nextZ);
          return { ...w, isOpen: true, isMinimized: false, zIndex: nextZ };
        } else if (w.isMinimized) {
          const nextZ = topZIndex + 1;
          setTopZIndex(nextZ);
          return { ...w, isMinimized: false, zIndex: nextZ };
        } else {
          // If active and focused, minimize. Otherwise focus.
          const isHighest = w.zIndex === Math.max(...windows.filter(win => win.isOpen && !win.isMinimized).map(win => win.zIndex));
          if (isHighest) {
            return { ...w, isMinimized: true };
          } else {
            const nextZ = topZIndex + 1;
            setTopZIndex(nextZ);
            return { ...w, zIndex: nextZ };
          }
        }
      }
      return w;
    }));
  };

  const closeWindow = (id: string, e?: React.MouseEvent) => {
    e?.stopPropagation();
    setWindows(prev => prev.map(w => w.id === id ? { ...w, isOpen: false } : w));
  };

  const minimizeWindow = (id: string, e?: React.MouseEvent) => {
    e?.stopPropagation();
    setWindows(prev => prev.map(w => w.id === id ? { ...w, isMinimized: true } : w));
  };

  const maximizeWindow = (id: string, e?: React.MouseEvent) => {
    e?.stopPropagation();
    setWindows(prev => prev.map(w => w.id === id ? { ...w, isMaximized: !w.isMaximized } : w));
  };

  // Dragging logic helper
  const draggingRef = useRef<{ id: string; offsetX: number; offsetY: number } | null>(null);

  const startDrag = (id: string, e: React.MouseEvent<HTMLDivElement>) => {
    focusWindow(id);
    const win = windows.find(w => w.id === id);
    if (!win || win.isMaximized) return;
    setActiveDragId(id);
    draggingRef.current = {
      id,
      offsetX: e.clientX - win.x,
      offsetY: e.clientY - win.y
    };
    document.addEventListener('mousemove', onDrag);
    document.addEventListener('mouseup', endDrag);
  };

  const onDrag = (e: MouseEvent) => {
    if (!draggingRef.current) return;
    const { id, offsetX, offsetY } = draggingRef.current;
    
    setWindows(prev => prev.map(w => {
      if (w.id === id) {
        // bounds inside the screen arena
        let nextX = e.clientX - offsetX;
        let nextY = e.clientY - offsetY;
        if (nextY < 28) nextY = 28; // below top bar
        return { ...w, x: nextX, y: nextY };
      }
      return w;
    }));
  };

  const endDrag = () => {
    draggingRef.current = null;
    setActiveDragId(null);
    document.removeEventListener('mousemove', onDrag);
    document.removeEventListener('mouseup', endDrag);
  };

  const startResize = (id: string, direction: 'n' | 's' | 'e' | 'w' | 'nw' | 'ne' | 'sw' | 'se', e: React.MouseEvent) => {
    e.stopPropagation();
    e.preventDefault();
    focusWindow(id);
    const win = windows.find(w => w.id === id);
    if (!win || win.isMaximized) return;
    
    setActiveResizeId(id);
    resizingRef.current = {
      id,
      direction,
      initialX: e.clientX,
      initialY: e.clientY,
      initialWinX: win.x,
      initialWinY: win.y,
      initialWidth: win.width,
      initialHeight: win.height,
    };
    
    document.addEventListener('mousemove', onResize);
    document.addEventListener('mouseup', endResize);
  };

  const onResize = (e: MouseEvent) => {
    if (!resizingRef.current) return;
    const { id, direction, initialX, initialY, initialWinX, initialWinY, initialWidth, initialHeight } = resizingRef.current;
    
    const deltaX = e.clientX - initialX;
    const deltaY = e.clientY - initialY;
    
    setWindows(prev => prev.map(w => {
      if (w.id === id) {
        let nextX = w.x;
        let nextY = w.y;
        let nextWidth = w.width;
        let nextHeight = w.height;
        
        const minW = 320;
        const minH = 240;
        
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
            if (nextY < 28) { // clamp below top bar
              const overflow = 28 - nextY;
              nextY = 28;
              nextHeight = Math.max(minH, nextHeight - overflow);
            }
          }
        }
        
        return {
          ...w,
          x: nextX,
          y: nextY,
          width: nextWidth,
          height: nextHeight
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

  // YouTube Simulator structures
  const SIM_YOUTUBE_VIDEOS = [
    {
      id: "h-g8kHclUqU",
      title: "Ubuntu 26.04 LTS: Novidades e Instalação Completa do Sistema",
      channel: "Meu Linux Portal",
      views: "154 mil visualizações",
      time: "há 2 dias",
      avatar: "🐧",
      thumbnail: "bg-gradient-to-br from-orange-600 to-purple-800"
    },
    {
      id: "jfKfPfyJRdk",
      title: "lofi hip hop radio - beats to relax/study to 💻 Focus Code",
      channel: "Lofi Girl",
      views: "45K assistindo agora",
      time: "AO VIVO",
      avatar: "🎧",
      thumbnail: "bg-gradient-to-br from-indigo-900 to-pink-700"
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
      thumbnail: "bg-gradient-to-br from-green-700 to-teal-900"
    },
    {
      id: "3v3_8W6uEno",
      title: "Como funciona a Internet? Do cabo submarino ao Wi-Fi",
      channel: "Computação Mágica",
      views: "230 mil visualizações",
      time: "há 8 meses",
      avatar: "🌐",
      thumbnail: "bg-gradient-to-br from-cyan-800 to-blue-900"
    },
    {
      id: "PtS4XgRkYtE",
      title: "Ubuntu vs Windows 11: Qual consome menos memória RAM?",
      channel: "Tech Battles BR",
      views: "312 mil visualizações",
      time: "há 3 semanas",
      avatar: "💻",
      thumbnail: "bg-gradient-to-br from-orange-700 to-rose-900"
    }
  ];

  // Firefox web simulation state (Dynamic single-tab/multi-tab array)
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

  // Auto-finish Firefox loader for custom React-rendered Google pages
  useEffect(() => {
    if (firefoxCurrentUrl.includes('google.com') && isFirefoxLoading) {
      const timer = setTimeout(() => {
        setIsFirefoxLoading(false);
      }, 400);
      return () => clearTimeout(timer);
    }
  }, [firefoxCurrentUrl, isFirefoxLoading]);

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
      title: 'Nova aba',
      url: 'about:newtab',
      history: ['about:newtab'],
      historyIndex: 0,
      loadStatus: 'newtab'
    };
    setFirefoxTabs(prev => [...prev, newTab]);
    setActiveTabId(newId);
    setFirefoxInputUrl('about:newtab');
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

      // Inject event listener script for click interception (Layer 2)
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
                      
                      // Resolve absolute URL
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
          loadStatus: (normalized.includes('google.com') || isYoutube(normalized)) ? 'direct' : 'direct'
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
            loadStatus: url === 'about:newtab' ? 'newtab' : ((url.includes('google.com') || isYoutube(url)) ? 'direct' : 'direct')
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
            loadStatus: url === 'about:newtab' ? 'newtab' : ((url.includes('google.com') || isYoutube(url)) ? 'direct' : 'direct')
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

  // Terminal commands interpreter
  const [terminalLines, setTerminalLines] = useState<string[]>([
    'Bem-vindo ao Ubuntu 26.04 LTS (GNU/Linux 6.15.2-generic x86_64)',
    '',
    ' * Documentação:  https://help.ubuntu.com',
    ' * Suporte:       https://meulinux.com',
    '',
    'DICA: Digite "help" para ver os comandos disponíveis.',
    'DICA: Experimente rodar "neofetch" ou "sudo apt install cowsay".',
    ''
  ]);
  const [currentInput, setCurrentInput] = useState('');
  const [installedApps, setInstalledApps] = useState<string[]>([]);
  const termEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    termEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [terminalLines]);

  const handleCommandSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const cmdTrim = currentInput.trim();
    if (!cmdTrim) return;

    const newLines = [...terminalLines, `ji@Resolute:~$ ${currentInput}`];
    const args = cmdTrim.split(' ');
    const command = args[0].toLowerCase();

    let reply: string[] = [];

    switch (command) {
      case 'help':
        reply = [
          'Comandos disponíveis:',
          '  help                  Mostra esta mensagem de ajuda',
          '  ls                    Lista os arquivos do diretório atual',
          '  cd <pasta>            Entra em um diretório',
          '  cat <arquivo>         Lê o conteúdo de um arquivo',
          '  neofetch / fastfetch  Informa dados do sistema e exibe logotipo em cores',
          '  clear                 Limpa o terminal',
          '  whoami                Informa o usuário logado',
          '  uname -a              Detalhes do Kernel e Arquitetura',
          '  sudo apt install <p>  Simula instalação de pacotes (ex: cowsay ou sl)',
          '  cowsay <texto>        Faz a vaca dizer algo (requer instalação)',
          '  sl                    Simula o trem a vapor (requer instalação)'
        ];
        break;
      case 'ls':
        reply = ['Área de Trabalho/  Documentos/  Downloads/  Imagens/  Música/  Vídeos/', 'readme.txt'];
        break;
      case 'whoami':
        reply = ['ji'];
        break;
      case 'uname':
        reply = ['Linux Resolute 6.19.0-6-generic #1 SMP PREEMPT_DYNAMIC Wed Apr 15 2026 x86_64 GNU/Linux'];
        break;
      case 'clear':
        setTerminalLines([]);
        setCurrentInput('');
        return;
      case 'neofetch':
      case 'fastfetch':
        reply = [
          '           .,::clooo:  ::looooo:. || ji@Resolute',
          '          .;loooooooooc .oooooooooo\' || -----------',
          '         .;looooool:\'\'\'. :oooooooooooc || OS: Ubuntu Resolute Raccoon (development b4)',
          '        ;loooool;.      \'ooooooooooo, || Host: KVM/QEMU Standard PC (Q35 + ICH9, 20)',
          '       ;clool\'           .coooooooc. ,, || Kernel: Linux 6.19.0-6-generic',
          '                                   .:oo, || Uptime: 2 mins',
          '    .;clol:,.                    ..loooo\' || Packages: 1835 (dpkg), 6 (flatpak), 13 (sn)',
          '   :ooooooooo,                  \'oooool || Shell: bash 5.3.3',
          '  \'ooooooooooo.                 loooo. || Display (QEMU Monitor): 1280x880 in 15", 7z',
          '  \'oooooooooool                coooo. || DE: GNOME 50.beta',
          '   ,looooooooc.               .loooo. || WM: Mutter (Wayland)',
          '     ...                      ;oooooc || WM Theme: Yaru',
          '                            ,oool. || Theme: Yaru [GTK2/3/4]',
          '    .cooooc.          ..\'.,\'..cooo. || Icons: Yaru [GTK2/3/4]',
          '     ;ooooo:.        ;oooooooooc. :l. || Font: Ubuntu Sans (11pt) [GTK2/3/4]',
          '      .coooooc,,..  coooooooooo. || Cursor: Yaru (24px)',
          '        .:ooooooooolc..oooooooooooo\' || Terminal: Ptyxis 50.beta',
          '          .\':loooooo; ,ooooooooooc || Terminal Font: Ubuntu Sans Mono (11pt)',
          '              ..\';;:c\' .;loooo:\' || CPU: 3 x Intel(R) Core(TM) i5-8350U (3) @ z',
          '                                 || GPU: RedHat Virtio 1.0 GPU',
          '                                 || Memory: 1.36 GiB / 4.27 GiB (32%)',
          '                                 || Swap: 0 B / 4.00 GiB (0%)',
          '                                 || Disk (/): 15.24 GiB / 34.15 GiB (45%) - ex4',
          '                                 || Local IP (enp1s0): 192.168.122.142/24',
          '                                 || Locale: en_US.UTF-8',
        ];
        break;
      case 'cat':
        if (args[1] === 'readme.txt') {
          reply = [
            '================== MEU LINUX ==================',
            'Seja bem-vindo ao portal de simulação do Ubuntu 26.04.',
            'Este projeto foi construído inteiramente na web para',
            'permitir que os usuários experimentem as novidades visuais',
            'e brinquem com ferramentas clássicas de terminal.',
            'Visite: www.meulinux.com para saber tudo sobre Linux!'
          ];
        } else if (!args[1]) {
          reply = ['Uso: cat <arquivo>. Exemplo: cat readme.txt'];
        } else {
          reply = [`cat: ${args[1]}: Arquivo ou diretório não encontrado`];
        }
        break;
      case 'cd':
        const targetDir = args[1];
        if (!targetDir || targetDir === '~' || targetDir === '.') {
          reply = [];
        } else if (['Área', 'Documentos', 'Downloads', 'Imagens', 'Música', 'Vídeos', 'Desktop', 'Documents', 'Downloads', 'Imagens/'].some(d => targetDir.toLowerCase().includes(d.toLowerCase()))) {
          reply = [];
        } else {
          reply = [`bash: cd: ${targetDir}: Arquivo ou diretório não encontrado`];
        }
        break;
      case 'sudo':
        if (args[1] === 'apt' && args[2] === 'install') {
          const pkg = args[3];
          if (!pkg) {
            reply = ['E: Você precisa especificar o pacote para instalar.'];
          } else if (installedApps.includes(pkg)) {
            reply = [`${pkg} já está na versão mais recente disponível.`];
          } else if (['cowsay', 'sl', 'neofetch'].includes(pkg)) {
            reply = [
              `Lendo listas de pacotes... Pronto`,
              `Construindo árvore de dependências... Pronto`,
              `Os seguintes NOVOS pacotes serão instalados:`,
              `  ${pkg}`,
              `0% [Conectando a archive.ubuntu.com]`,
              `32% [Baixando biblioteca de dependências]`,
              `75% [Descomprimindo arquivos]`,
              `100% [Configurando ${pkg}]`,
              `Instalação de ${pkg} concluída com sucesso!`
            ];
            setInstalledApps(prev => [...prev, pkg]);
          } else {
            reply = [
              `E: Impossível encontrar o pacote ${pkg}`,
              `Tente instalar "cowsay" ou "sl", que são suportados na simulação.`
            ];
          }
        } else {
          reply = [`[sudo] senha para ubuntu: `, 'Acesso concedido. Comando de simulação não especificado. Use "sudo apt install <pacote>"'];
        }
        break;
      case 'cowsay':
        if (!installedApps.includes('cowsay')) {
          reply = [
            'Comando \'cowsay\' não encontrado, mas pode ser instalado com:',
            'sudo apt install cowsay'
          ];
        } else {
          const text = args.slice(1).join(' ') || 'Olá, mundo Linux!';
          const underline = '_'.repeat(text.length + 2);
          const dashes = '-'.repeat(text.length + 2);
          reply = [
            `  ${underline}`,
            `  < ${text} >`,
            `  ${dashes}`,
            '         \\   ^__^',
            '          \\  (oo)\\_______',
            '             (__)\\       )\\/\\',
            '                 ||----w |',
            '                 ||     ||'
          ];
        }
        break;
      case 'sl':
        if (!installedApps.includes('sl')) {
          reply = [
            'Comando \'sl\' não encontrado, mas pode ser instalado com:',
            'sudo apt install sl'
          ];
        } else {
          reply = [
            '      ====        ___________  ___________  ',
            '  _D _|  L_Y_   |            ||           | ',
            ' [___________]  |  MEU LINUX ||  UBUNTU   | ',
            '  | u u u u |   |  __    __  ||  __   __  | ',
            '  |________|    |_(  )__(  )_||_(  )_(  )_| ',
            '  oo/ oooo/      "OO"    "OO"  "OO"   "OO"  ',
            '🚂 CHU CHU! Trem de simulação passando...'
          ];
        }
        break;
      default:
        reply = [
          `bash: ${command}: comando não encontrado`,
          'Experimente digitar "help" para ver a lista de comandos.'
        ];
    }

    setTerminalLines([...newLines, ...reply, '']);
    setCurrentInput('');
  };

  // Files Nautilus navigation State
  const [currentFolder, setCurrentFolder] = useState<string>('Home');
  const [copiedImageAlert, setCopiedImageAlert] = useState(false);

  // General calculator math logic
  const [calcDisplay, setCalcDisplay] = useState('0');
  const [calcMemory, setCalcMemory] = useState<number | null>(null);
  const [calcOp, setCalcOp] = useState<string | null>(null);
  const [calcResetOnNext, setCalcResetOnNext] = useState(false);

  const calcPress = (char: string) => {
    if ('0123456789.'.includes(char)) {
      if (calcDisplay === '0' || calcResetOnNext) {
        setCalcDisplay(char);
        setCalcResetOnNext(false);
      } else {
        if (char === '.' && calcDisplay.includes('.')) return;
        setCalcDisplay(calcDisplay + char);
      }
    } else if ('+-*/'.includes(char)) {
      setCalcMemory(parseFloat(calcDisplay));
      setCalcOp(char);
      setCalcResetOnNext(true);
    } else if (char === 'C') {
      setCalcDisplay('0');
      setCalcMemory(null);
      setCalcOp(null);
      setCalcResetOnNext(false);
    } else if (char === '=') {
      if (calcMemory !== null && calcOp) {
        const current = parseFloat(calcDisplay);
        let result = 0;
        if (calcOp === '+') result = calcMemory + current;
        if (calcOp === '-') result = calcMemory - current;
        if (calcOp === '*') result = calcMemory * current;
        if (calcOp === '/') result = calcMemory / current;
        setCalcDisplay(String(Number(result.toFixed(6))));
        setCalcMemory(null);
        setCalcOp(null);
        setCalcResetOnNext(true);
      }
    }
  };

  const wallList = [
    { name: 'Ubuntu Animado (Raccoon)', url: '/assets/Resolute%20Raccoon%20Animated%20Mascot%201920x1080.mp4' },
    { name: 'Ubuntu Estático (Raccoon)', url: '/assets/Resolute_Raccoon_Wallpaper_Color_2560x1440.png' },
    { name: 'Abstract Dark', url: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1200&q=80' },
    { name: 'Nature Forest', url: 'https://images.unsplash.com/photo-1511497584788-876760111969?auto=format&fit=crop&w=1200&q=80' },
    { name: 'Cosmo Nebula', url: 'https://images.unsplash.com/photo-1462331940025-496dfbfc7564?auto=format&fit=crop&w=1200&q=80' }
  ];

  const selectionBox = dragStart && dragCurrent ? {
    left: Math.min(dragStart.x, dragCurrent.x),
    top: Math.min(dragStart.y, dragCurrent.y),
    width: Math.abs(dragStart.x - dragCurrent.x),
    height: Math.abs(dragStart.y - dragCurrent.y),
  } : null;

  return (
    <div 
      className="fixed inset-0 z-[60] bg-black flex items-center justify-center overflow-hidden font-sans select-none text-white text-base"
      style={!wallpaper.endsWith('.mp4') ? {
        backgroundImage: `url(${wallpaper})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      } : undefined}
    >
      {/* SPLASH SCREEN */}
      <AnimatePresence>
        {showSplash && (
          <motion.div
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            className="fixed inset-0 z-[100000] bg-black flex flex-col items-center justify-between py-16 text-white font-sans select-none overflow-hidden"
          >
            {/* Top spacer to push the logo about 1/3 down */}
            <div className="flex-1 max-h-[15vh]"></div>

            {/* Center Area: Logo & Spinner */}
            <div className="flex flex-col items-center gap-24 flex-grow justify-center">
              {/* Modern Ubuntu Circle of Friends Logo in Orange */}
              <motion.div
                initial={{ scale: 0.95, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.5, ease: "easeOut" }}
              >
                <svg viewBox="24 0 80.663 128" className="w-[110px] h-[110px] md:w-[130px] md:h-[130px]" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path fill="#E95420" d="M42.443 90.31c4.611 0 8.35-3.768 8.35-8.416 0-4.648-3.739-8.416-8.35-8.416-4.612 0-8.35 3.768-8.35 8.416 0 4.648 3.738 8.416 8.35 8.416Zm34.778-18.454c4.612 0 8.35-3.768 8.35-8.416 0-4.648-3.738-8.416-8.35-8.416-4.611 0-8.35 3.768-8.35 8.416 0 4.648 3.739 8.416 8.35 8.416Zm-15.945 31.702c-6.016-1.299-11.042-5.17-13.868-10.662a11.934 11.934 0 0 1-7.14.883c3.419 8.464 10.67 14.611 19.573 16.535 1.953.422 3.943.627 5.93.614a12.107 12.107 0 0 1-2.444-7.037 20.048 20.048 0 0 1-2.048-.336l-.003.003Zm14.066 8.461c4.612 0 8.35-3.768 8.35-8.416 0-4.648-3.738-8.416-8.35-8.416-4.611 0-8.35 3.768-8.35 8.416 0 4.648 3.739 8.416 8.35 8.416Zm11.62-11.507c2.597-3.3 4.426-7.2 5.305-11.344a27.771 27.771 0 0 0-3.937-20.963 12.1 12.1 0 0 1-4.695 5.542 20.736 20.736 0 0 1 1.93 13.975 20.658 20.658 0 0 1-2.597 6.521 12.092 12.092 0 0 1 3.997 6.272l-.003-.003ZM41.8 69.824a11.785 11.785 0 0 1 3.156.256c1.361.294 2.64.813 3.812 1.549 3.76-5.45 9.826-8.72 16.399-8.842a12.213 12.213 0 0 1 2.534-6.826c-10.503-.838-20.708 4.625-25.905 13.866l.003-.003Z"/>
                </svg>
              </motion.div>

              {/* Discrete 12-Spoke GNOME/Linux boot loading spinner */}
              <div className="relative w-12 h-12 animate-[spin_1.1s_steps(12,end)_infinite]">
                {[...Array(12)].map((_, i) => (
                  <div
                    key={i}
                    className="absolute top-0 left-1/2 -translate-x-1/2 w-[3px] h=[11px] bg-white rounded-full origin-[50%_24px]"
                    style={{
                      height: '11px',
                      transform: `rotate(${i * 30}deg)`,
                      opacity: 0.15 + (i / 11) * 0.85,
                    }}
                  />
                ))}
              </div>
            </div>

            {/* Bottom Branding */}
            <div className="w-full flex justify-center items-center gap-[11px] px-4 mt-auto">
              <svg viewBox="24 0 80.663 128" className="h-[42px] w-auto" xmlns="http://www.w3.org/2000/svg">
                <path fill="#E95420" d="M104.663 0H24v128h80.663V0Z" />
                <path fill="#fff" d="M42.443 90.31c4.611 0 8.35-3.768 8.35-8.416 0-4.648-3.739-8.416-8.35-8.416-4.612 0-8.35 3.768-8.35 8.416 0 4.648 3.738 8.416 8.35 8.416Zm34.778-18.454c4.612 0 8.35-3.768 8.35-8.416 0-4.648-3.738-8.416-8.35-8.416-4.611 0-8.35 3.768-8.35 8.416 0 4.648 3.739 8.416 8.35 8.416Zm-15.945 31.702c-6.016-1.299-11.042-5.17-13.868-10.662a11.934 11.934 0 0 1-7.14.883c3.419 8.464 10.67 14.611 19.573 16.535 1.953.422 3.943.627 5.93.614a12.107 12.107 0 0 1-2.444-7.037 20.048 20.048 0 0 1-2.048-.336l-.003.003Zm14.066 8.461c4.612 0 8.35-3.768 8.35-8.416 0-4.648-3.738-8.416-8.35-8.416-4.611 0-8.35 3.768-8.35 8.416 0 4.648 3.739 8.416 8.35 8.416Zm11.62-11.507c2.597-3.3 4.426-7.2 5.305-11.344a27.771 27.771 0 0 0-3.937-20.963 12.1 12.1 0 0 1-4.695 5.542 20.736 20.736 0 0 1 1.93 13.975 20.658 20.658 0 0 1-2.597 6.521 12.092 12.092 0 0 1 3.997 6.272l-.003-.003ZM41.8 69.824a11.785 11.785 0 0 1 3.156.256c1.361.294 2.64.813 3.812 1.549 3.76-5.45 9.826-8.72 16.399-8.842a12.213 12.213 0 0 1 2.534-6.826c-10.503-.838-20.708 4.625-25.905 13.866l.003-.003Z"/>
              </svg>
              <span className="text-white text-3xl font-light tracking-wide select-none" style={{ fontFamily: "Ubuntu, system-ui, sans-serif" }}>ubuntu</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      {/* ANIMATED VIDEO WALLPAPER */}
      {wallpaper.endsWith('.mp4') && (
        <video 
          key={wallpaper}
          src={wallpaper}
          autoPlay 
          loop 
          muted 
          playsInline 
          className="absolute inset-0 w-full h-full object-cover z-0 pointer-events-none"
        />
      )}

      {/* SCREENSHOT FLASH EFFECT */}
      {screenshotFlash && (
        <div className="absolute inset-0 bg-white z-[200] opacity-100 pointer-events-none" />
      )}

      {/* NIGHT LIGHT (LUZ NOTURNA) WARM FILTER OVERLAY */}
      {nightLight && (
        <div 
          className="absolute inset-0 bg-[#f59e0b]/15 pointer-events-none mix-blend-multiply transition-all duration-300" 
          style={{ zIndex: 210 }}
        />
      )}

      {/* HARDWARE BRIGHTNESS DIMMING OVERLAY */}
      <div 
        className="absolute inset-0 bg-black pointer-events-none transition-all duration-300"
        style={{ 
          opacity: Math.max(0, (100 - brightness) / 100 * 0.70), 
          zIndex: 220 
        }}
      />

      {/* UBUNTU VOLUME/BRIGHTNESS FLOAT HUD DISPLAY */}
      <AnimatePresence>
        {hudType !== null && (
          <motion.div
            key="hardware-hud-overlay"
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 15 }}
            transition={{ duration: 0.15 }}
            className="absolute bottom-24 left-1/2 -translate-x-1/2 z-[250] bg-[#1e1e1e]/90 backdrop-blur-md border border-neutral-800 rounded-2xl p-4 w-44 flex flex-col items-center gap-3.5 shadow-2xl pointer-events-none text-white select-none"
          >
            <div className="bg-neutral-800/80 p-2.5 rounded-xl border border-white/5">
              {hudType === 'volume' ? (
                hudValue === 0 ? (
                  <VolumeX size={26} className="text-zinc-500 animate-pulse" />
                ) : (
                  <Volume2 size={26} className="text-[#e95420]" />
                )
              ) : (
                <Sun size={26} className="text-amber-500 animate-pulse" />
              )}
            </div>
            
            <div className="w-full flex flex-col gap-1.5 items-center">
              <span className="text-[10px] uppercase tracking-wider font-extrabold text-neutral-400">
                {hudType === 'volume' ? 'Volume' : 'Brilho'}
              </span>
              <div className="w-full h-1.5 bg-neutral-900 rounded-full overflow-hidden border border-white/5 p-px">
                <div 
                  className={`h-full rounded-full transition-all duration-75 ${hudType === 'volume' ? 'bg-[#e95420]' : 'bg-amber-500'}`}
                  style={{ width: `${hudValue}%` }}
                />
              </div>
              <span className="text-[10px] font-bold font-mono text-zinc-300">
                {hudValue}%
              </span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* DRAG SELECTION BOX HIGHLIGHT */}
      {selectionBox && selectionBox.width > 4 && selectionBox.height > 4 && (
        <div 
          style={{
            position: 'fixed',
            left: selectionBox.left,
            top: selectionBox.top,
            width: selectionBox.width,
            height: selectionBox.height,
            backgroundColor: 'rgba(233, 84, 32, 0.15)',
            border: '1.5px solid rgba(233, 84, 32, 0.75)',
            pointerEvents: 'none',
            zIndex: 9999,
            borderRadius: '4px'
          }}
        />
      )}

      {/* BACKGROUND CLICK & CONTEXT CATCHER LAYER (Empty desktop left and right clicks handler) */}
      <div 
        className="absolute inset-0 z-0 desktop-catcher"
        onMouseDown={handleDesktopMouseDown}
        onClick={() => {
          setShowContextMenu(false);
          setShowArrangeSubmenu(false);
          setShowItemContextMenu(false);
          setSelectedDesktopIndices([]);
        }}
        onContextMenu={(e) => {
          setShowItemContextMenu(false);
          handleContextMenu(e);
        }}
      />

      {/* CUSTOM CREATED DESKTOP FOLDER ICONS */}
      <div className="absolute left-[72px] top-[40px] bottom-[10px] w-auto flex flex-col flex-wrap gap-4 p-2 z-[10] pointer-events-none select-none">
        {customDesktopFolders.map((folderName, idx) => (
          <div 
            key={idx}
            id={`desktop-folder-${idx}`}
            onClick={(e) => {
              e.stopPropagation();
              setSelectedDesktopIndices([idx]);
            }}
            onDoubleClick={() => {
              setCurrentFolder('Desktop');
              forceOpenAndFocusWindow('files');
            }}
            onContextMenu={(e) => {
              setSelectedDesktopIndices([idx]);
              handleItemContextMenu(e, String(idx), folderName, 'folder', 'desktop');
            }}
            className={`w-20 h-22 flex flex-col items-center justify-center p-1 rounded-xl border cursor-pointer pointer-events-auto group gap-1 text-center transition-all duration-200 ${
              selectedDesktopIndices.includes(idx)
                ? 'bg-orange-600/30 border-orange-500 text-white shadow-inner shadow-orange-500/20'
                : 'hover:bg-white/10 active:bg-white/15 border border-transparent hover:border-white/10 text-neutral-300'
            }`}
            title={`Pasta: ${folderName}`}
          >
            <NautilusFolderIcon type="folder" className="w-10 h-10 group-hover:scale-105 transition-transform shrink-0" />
            <span className="text-[10px] font-medium drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.8)] truncate max-w-full px-1">{folderName}</span>
          </div>
        ))}
      </div>

      {/* UBUNTU DESKTOP RIGHT-CLICK CONTEXT MENU (Yaru GNOME styling, customizable according to darkStyle) */}
      <AnimatePresence>
        {showContextMenu && (
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.08 }}
            style={{ 
              top: contextMenuPos.y, 
              left: contextMenuPos.x,
              position: 'absolute'
            }}
            className={`w-[220px] rounded-2xl shadow-2xl border flex flex-col p-1.5 z-[120] select-none text-left font-sans ${
              darkStyle 
                ? 'bg-[#181818]/95 backdrop-blur-md border-neutral-800 text-neutral-200' 
                : 'bg-white/95 backdrop-blur-md border-zinc-200 text-zinc-800 shadow-zinc-400'
            }`}
            onClick={(e) => e.stopPropagation()}
            onContextMenu={(e) => e.preventDefault()}
          >
            {/* New Folder */}
            <button 
              onClick={() => {
                setShowContextMenu(false);
                setNewFolderName('Nova Pasta');
                setShowNewFolderModal(true);
              }}
              className={`w-full text-left text-xs px-3.5 py-2.5 rounded-xl flex items-center justify-between transition-colors ${
                darkStyle ? 'hover:bg-white/10 hover:text-white' : 'hover:bg-neutral-100 hover:text-zinc-900'
              }`}
            >
              <span>Nova Pasta</span>
            </button>

            {/* Paste (disabled) */}
            <button 
              disabled
              className="w-full text-left text-xs px-3.5 py-2.5 opacity-40 cursor-not-allowed flex items-center justify-between"
            >
              <span>Colar</span>
            </button>

            {/* Select All */}
            <button 
              onClick={() => {
                setShowContextMenu(false);
                const allIndices = customDesktopFolders.map((_, i) => i);
                setSelectedDesktopIndices(allIndices);
                setScreenshotNotification(isEn 
                  ? `All ${customDesktopFolders.length} items selected.`
                  : `Todos os ${customDesktopFolders.length} itens selecionados.`);
                setTimeout(() => setScreenshotNotification(null), 3500);
              }}
              className={`w-full text-left text-xs px-3.5 py-2.5 rounded-xl flex items-center justify-between transition-colors ${
                darkStyle ? 'hover:bg-white/10 hover:text-white' : 'hover:bg-neutral-100 hover:text-zinc-900'
              }`}
            >
              <span>Selecionar Tudo</span>
            </button>

            <div className={`h-px my-1.5 ${darkStyle ? 'bg-neutral-800/80' : 'bg-neutral-200/85'}`} />

            {/* Arrange Icons (disabled) */}
            <button 
              disabled
              className="w-full text-left text-xs px-3.5 py-2.5 opacity-40 cursor-not-allowed flex items-center justify-between"
            >
              <span>Organizar Ícones</span>
            </button>

            {/* Arrange By... (with interactive submenu) */}
            <div 
              className="relative"
              onMouseEnter={() => setShowArrangeSubmenu(true)}
              onMouseLeave={() => setShowArrangeSubmenu(false)}
            >
              <button 
                className={`w-full text-left text-xs px-3.5 py-2.5 rounded-xl flex items-center justify-between transition-colors ${
                  showArrangeSubmenu 
                    ? (darkStyle ? 'bg-white/10 text-white' : 'bg-neutral-100 text-zinc-900') 
                    : (darkStyle ? 'hover:bg-white/10 hover:text-white' : 'hover:bg-neutral-100 hover:text-zinc-900')
                }`}
              >
                <span>Organizar por...</span>
                <ChevronRight size={13} className="opacity-60" />
              </button>

              {/* Submenu render */}
              {showArrangeSubmenu && (
                <div 
                  className={`absolute left-full top-0 ml-1 w-[160px] rounded-2xl shadow-2xl border flex flex-col p-1.5 z-[130] font-sans ${
                    darkStyle 
                      ? 'bg-[#181818]/98 border-neutral-800 text-neutral-200' 
                      : 'bg-white/98 border-zinc-200 text-zinc-800 shadow-zinc-400'
                  }`}
                >
                  {['Nome', 'Tamanho', 'Tipo', 'Última modificação'].map((option, i) => (
                    <button 
                      key={i}
                      onClick={() => {
                        setShowArrangeSubmenu(false);
                        setShowContextMenu(false);
                        const transMap: Record<string, string> = {
                          'Nome': 'Name',
                          'Tamanho': 'Size',
                          'Tipo': 'Type',
                          'Última modificação': 'Last modified'
                        };
                        const optEn = transMap[option] || option;
                        setScreenshotNotification(isEn 
                          ? `Icons organized by ${optEn}.`
                          : `Ícones organizados por ${option}.`);
                        setTimeout(() => setScreenshotNotification(null), 3500);
                      }}
                      className={`w-full text-left text-xs px-3.5 py-2 rounded-xl flex items-center justify-between transition-colors ${
                        darkStyle ? 'hover:bg-white/10 hover:text-white' : 'hover:bg-neutral-100 hover:text-zinc-900'
                      }`}
                    >
                      <span>{option}</span>
                      {i === 0 && <Check size={11} className="text-orange-500 font-bold" />}
                    </button>
                  ))}
                </div>
              )}
            </div>

            <div className={`h-px my-1.5 ${darkStyle ? 'bg-neutral-800/80' : 'bg-neutral-200/85'}`} />

            {/* Show Desktop in Files */}
            <button 
              onClick={() => {
                setShowContextMenu(false);
                setCurrentFolder('Desktop');
                forceOpenAndFocusWindow('files');
              }}
              className={`w-full text-left text-xs px-3.5 py-2.5 rounded-xl flex items-center justify-between transition-colors ${
                darkStyle ? 'hover:bg-white/10 hover:text-white' : 'hover:bg-neutral-100 hover:text-zinc-900'
              }`}
            >
              <span>Mostrar Área de Trabalho em Arquivos</span>
            </button>

            {/* Open in Terminal */}
            <button 
              onClick={() => {
                setShowContextMenu(false);
                forceOpenAndFocusWindow('terminal');
              }}
              className={`w-full text-left text-xs px-3.5 py-2.5 rounded-xl flex items-center justify-between transition-colors ${
                darkStyle ? 'hover:bg-white/10 hover:text-white' : 'hover:bg-neutral-100 hover:text-zinc-900'
              }`}
            >
              <span>Abrir no Terminal</span>
            </button>

            <div className={`h-px my-1.5 ${darkStyle ? 'bg-neutral-800/80' : 'bg-neutral-200/85'}`} />

            {/* Change Background... */}
            <button 
              onClick={() => {
                setShowContextMenu(false);
                setSettingsActiveTab('appearance');
                forceOpenAndFocusWindow('settings');
              }}
              className={`w-full text-left text-xs px-3.5 py-2.5 rounded-xl flex items-center justify-between transition-colors ${
                darkStyle ? 'hover:bg-white/10 hover:text-white' : 'hover:bg-neutral-100 hover:text-zinc-900'
              }`}
            >
              <span>Alterar Plano de Fundo...</span>
            </button>

            <div className={`h-px my-1.5 ${darkStyle ? 'bg-neutral-800/80' : 'bg-neutral-200/85'}`} />

            {/* Desktop Icons Settings */}
            <button 
              onClick={() => {
                setShowContextMenu(false);
                setSettingsActiveTab('desktop-icons');
                forceOpenAndFocusWindow('settings');
              }}
              className={`w-full text-left text-xs px-3.5 py-2.5 rounded-xl flex items-center justify-between transition-colors ${
                darkStyle ? 'hover:bg-white/10 hover:text-white' : 'hover:bg-neutral-100 hover:text-zinc-900'
              }`}
            >
              <span>Configurações de Ícones</span>
            </button>

            {/* Display Settings */}
            <button 
              onClick={() => {
                setShowContextMenu(false);
                setSettingsActiveTab('display');
                forceOpenAndFocusWindow('settings');
              }}
              className={`w-full text-left text-xs px-3.5 py-2.5 rounded-xl flex items-center justify-between transition-colors ${
                darkStyle ? 'hover:bg-white/10 hover:text-white' : 'hover:bg-neutral-100 hover:text-zinc-900'
              }`}
            >
              <span>Configurações de Tela</span>
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* GTK DIALOG MODAL FOR NEW DESKTOP FOLDER CREATION */}
      <AnimatePresence>
        {showNewFolderModal && (
          <div className="absolute inset-0 bg-black/60 z-[160] flex items-center justify-center p-4 select-none">
            <motion.div 
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className={`w-full max-w-sm rounded-[18px] border flex flex-col shadow-2xl p-5 ${
                darkStyle ? 'bg-[#242424] border-neutral-700 text-white' : 'bg-white border-neutral-200 text-zinc-800'
              }`}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between pb-3 border-b border-white/5">
                <span className="text-sm font-bold">Nova Pasta</span>
                <button 
                  onClick={() => setShowNewFolderModal(false)}
                  className="rounded-full p-1 hover:bg-white/10 transition-colors text-neutral-400 hover:text-neutral-200"
                >
                  <X size={15} />
                </button>
              </div>

              <div className="py-4 space-y-2.5 text-left">
                <p className={`text-xs ${darkStyle ? 'text-neutral-300' : 'text-neutral-600'}`}>Insira o nome para a nova pasta da Área de Trabalho:</p>
                <input 
                  type="text" 
                  value={newFolderName}
                  onChange={(e) => setNewFolderName(e.target.value)}
                  className={`w-full text-xs px-3.5 py-2.5 rounded-xl border outline-none font-semibold focus:border-orange-500 transition-colors ${
                    darkStyle ? 'bg-neutral-800 border-neutral-700 text-white' : 'bg-zinc-50 border-zinc-200 text-zinc-900'
                  }`}
                  autoFocus
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      handleCreateFolder();
                    }
                  }}
                />
              </div>

              <div className="flex items-center justify-end gap-2.5 pt-3 border-t border-white/5">
                <button 
                  onClick={() => setShowNewFolderModal(false)}
                  className={`px-4 py-2 text-xs rounded-xl hover:bg-white/5 font-semibold transition-colors ${
                    darkStyle ? 'text-neutral-300' : 'text-neutral-600'
                  }`}
                >
                  Cancelar
                </button>
                <button 
                  onClick={handleCreateFolder}
                  className="bg-[#e95420] hover:bg-orange-600 active:scale-95 transition-all text-white font-bold text-xs px-4 py-2.5 rounded-xl shadow-lg"
                >
                  Criar Pasta
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* UBUNTU ITEM RIGHT-CLICK CONTEXT MENU (GNOME Dark Yaru Theme) */}
      <AnimatePresence>
        {showItemContextMenu && rightClickedItem && (
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.08 }}
            style={{ 
              top: itemContextMenuPos.y, 
              left: itemContextMenuPos.x,
              position: 'absolute'
            }}
            className={`w-[230px] rounded-2xl shadow-2xl border flex flex-col p-1.5 z-[150] select-none text-left font-sans ${
              darkStyle 
                ? 'bg-[#181818]/98 backdrop-blur-md border-neutral-800 text-neutral-200 shadow-[0_25px_50px_-12px_rgba(0,0,0,0.8)]' 
                : 'bg-white/98 backdrop-blur-md border-zinc-200 text-zinc-800 shadow-zinc-400'
            }`}
            onClick={(e) => e.stopPropagation()}
            onContextMenu={(e) => e.preventDefault()}
          >
            {/* Open */}
            <button 
              onClick={() => {
                setShowItemContextMenu(false);
                if (rightClickedItem.type === 'folder') {
                  setCurrentFolder(rightClickedItem.origin === 'desktop' ? 'Desktop' : currentFolder);
                  forceOpenAndFocusWindow('files');
                } else if (rightClickedItem.name.endsWith('.sh') || rightClickedItem.name === 'readme.txt') {
                  forceOpenAndFocusWindow('terminal');
                } else {
                  setScreenshotNotification(isEn 
                    ? `Opening "${rightClickedItem.name}"...`
                    : `Abrindo "${rightClickedItem.name}"...`);
                  setTimeout(() => setScreenshotNotification(null), 3000);
                }
              }}
              className={`w-full text-left text-xs px-3.5 py-2.5 rounded-xl flex items-center justify-between transition-colors ${
                darkStyle ? 'hover:bg-white/10 hover:text-white' : 'hover:bg-neutral-100 hover:text-zinc-900'
              }`}
            >
              <span>Abrir</span>
            </button>

            <div className={`h-px my-1 ${darkStyle ? 'bg-neutral-800/80' : 'bg-neutral-200/85'}`} />

            {/* Cut */}
            <button 
              onClick={() => {
                setShowItemContextMenu(false);
                setScreenshotNotification(isEn 
                  ? `"${rightClickedItem.name}" cut to Clipboard.`
                  : `"${rightClickedItem.name}" recortado para a Área de Transferência.`);
                setTimeout(() => setScreenshotNotification(null), 4000);
              }}
              className={`w-full text-left text-xs px-3.5 py-2.5 rounded-xl flex items-center justify-between transition-colors ${
                darkStyle ? 'hover:bg-white/10 hover:text-white' : 'hover:bg-neutral-100 hover:text-zinc-900'
              }`}
            >
              <span>Recortar</span>
            </button>

            {/* Copy */}
            <button 
              onClick={() => {
                setShowItemContextMenu(false);
                setScreenshotNotification(isEn 
                  ? `"${rightClickedItem.name}" copied to Clipboard!`
                  : `"${rightClickedItem.name}" copiado para a Área de Transferência!`);
                setTimeout(() => setScreenshotNotification(null), 4000);
              }}
              className={`w-full text-left text-xs px-3.5 py-2.5 rounded-xl flex items-center justify-between transition-colors ${
                darkStyle ? 'hover:bg-white/10 hover:text-white' : 'hover:bg-neutral-100 hover:text-zinc-900'
              }`}
            >
              <span>Copiar</span>
            </button>

            {/* Rename */}
            <button 
              onClick={() => {
                setShowItemContextMenu(false);
                setRenameValue(rightClickedItem.name);
                setShowRenameModal(true);
              }}
              className={`w-full text-left text-xs px-3.5 py-2.5 rounded-xl flex items-center justify-between transition-colors ${
                darkStyle ? 'hover:bg-white/10 hover:text-white' : 'hover:bg-neutral-100 hover:text-zinc-900'
              }`}
            >
              <span>Renomear...</span>
            </button>

            <div className={`h-px my-1 ${darkStyle ? 'bg-neutral-800/80' : 'bg-neutral-200/85'}`} />

            {/* Move to Trash */}
            <button 
              onClick={handleMoveToTrash}
              className={`w-full text-left text-xs px-3.5 py-2.5 rounded-xl flex items-center justify-between transition-colors font-semibold text-red-500 hover:bg-red-500/10`}
            >
              <span>Mover para a Lixeira</span>
            </button>

            <div className={`h-px my-1 ${darkStyle ? 'bg-neutral-800/80' : 'bg-neutral-200/85'}`} />

            {/* Compress */}
            <button 
              onClick={handleCompressItem}
              className={`w-full text-left text-xs px-3.5 py-2.5 rounded-xl flex items-center justify-between transition-colors ${
                darkStyle ? 'hover:bg-white/10 hover:text-white' : 'hover:bg-neutral-100 hover:text-zinc-900'
              }`}
            >
              <span>Compactar...</span>
            </button>

            {/* New Folder with 1 Item */}
            <button 
              onClick={handleNewFolderWithItem}
              className={`w-full text-left text-xs px-3.5 py-2.5 rounded-xl flex items-center justify-between transition-colors ${
                darkStyle ? 'hover:bg-white/10 hover:text-white' : 'hover:bg-neutral-100 hover:text-zinc-900'
              }`}
            >
              <span>Nova pasta com 1 item</span>
            </button>

            <div className={`h-px my-1 ${darkStyle ? 'bg-neutral-800/80' : 'bg-neutral-200/85'}`} />

            {/* Properties */}
            <button 
              onClick={handleShowProperties}
              className={`w-full text-left text-xs px-3.5 py-2.5 rounded-xl flex items-center justify-between transition-colors ${
                darkStyle ? 'hover:bg-white/10 hover:text-white' : 'hover:bg-neutral-100 hover:text-zinc-900'
              }`}
            >
              <span>Propriedades</span>
            </button>

            {/* Show in Files */}
            <button 
              onClick={() => {
                setShowItemContextMenu(false);
                setCurrentFolder(rightClickedItem.origin === 'desktop' ? 'Desktop' : currentFolder);
                forceOpenAndFocusWindow('files');
              }}
              className={`w-full text-left text-xs px-3.5 py-2.5 rounded-xl flex items-center justify-between transition-colors ${
                darkStyle ? 'hover:bg-white/10 hover:text-white' : 'hover:bg-neutral-100 hover:text-zinc-900'
              }`}
            >
              <span>Mostrar em Arquivos</span>
            </button>

            {/* Open in Terminal */}
            <button 
              onClick={() => {
                setShowItemContextMenu(false);
                forceOpenAndFocusWindow('terminal');
              }}
              className={`w-full text-left text-xs px-3.5 py-2.5 rounded-xl flex items-center justify-between transition-colors ${
                darkStyle ? 'hover:bg-white/10 hover:text-white' : 'hover:bg-neutral-100 hover:text-zinc-900'
              }`}
            >
              <span>Abrir no Terminal</span>
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* GTK DIALOG MODAL FOR RENAMING FILES & FOLDERS */}
      <AnimatePresence>
        {showRenameModal && rightClickedItem && (
          <div className="absolute inset-0 bg-black/60 z-[160] flex items-center justify-center p-4 select-none">
            <motion.div 
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className={`w-full max-w-sm rounded-[18px] border flex flex-col shadow-2xl p-5 ${
                darkStyle ? 'bg-[#242424] border-neutral-700 text-white' : 'bg-white border-neutral-200 text-zinc-800'
              }`}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between pb-3 border-b border-white/5">
                <span className="text-sm font-bold">Renomear</span>
                <button 
                  onClick={() => setShowRenameModal(false)}
                  className="rounded-full p-1 hover:bg-white/10 transition-colors text-neutral-400 hover:text-neutral-200"
                >
                  <X size={15} />
                </button>
              </div>

              <div className="py-4 space-y-2.5 text-left">
                <p className={`text-xs ${darkStyle ? 'text-neutral-300' : 'text-neutral-600'}`}>Insira o novo nome para "{rightClickedItem.name}":</p>
                <input 
                  type="text" 
                  value={renameValue}
                  onChange={(e) => setRenameValue(e.target.value)}
                  className={`w-full text-xs px-3.5 py-2.5 rounded-xl border outline-none font-semibold focus:border-orange-500 transition-colors ${
                    darkStyle ? 'bg-neutral-800 border-neutral-700 text-white' : 'bg-zinc-50 border-zinc-200 text-zinc-900'
                  }`}
                  autoFocus
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      handleRenameItem();
                    }
                  }}
                />
              </div>

              <div className="flex items-center justify-end gap-2.5 pt-3 border-t border-white/5">
                <button 
                  onClick={() => setShowRenameModal(false)}
                  className={`px-4 py-2 text-xs rounded-xl hover:bg-white/5 font-semibold transition-colors ${
                    darkStyle ? 'text-neutral-300' : 'text-neutral-600'
                  }`}
                >
                  Cancelar
                </button>
                <button 
                  onClick={handleRenameItem}
                  className="bg-[#e95420] hover:bg-orange-600 active:scale-95 transition-all text-white font-bold text-xs px-4 py-2.5 rounded-xl shadow-lg"
                >
                  Renomear
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* GTK DIALOG MODAL FOR PROPERTIES */}
      <AnimatePresence>
        {showPropertiesModal && propertiesItem && (
          <div className="absolute inset-0 bg-black/60 z-[160] flex items-center justify-center p-4 select-none">
            <motion.div 
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className={`w-full max-w-md rounded-[18px] border flex flex-col shadow-2xl overflow-hidden ${
                darkStyle ? 'bg-[#242424] border-neutral-700 text-white' : 'bg-white border-neutral-200 text-zinc-800'
              }`}
              onClick={(e) => e.stopPropagation()}
            >
              {/* GTK HeaderBar */}
              <div className="flex items-center justify-between px-5 py-4 border-b border-neutral-800/50 bg-[#1e1e1e]">
                <div>
                  <h5 className="text-sm font-bold truncate max-w-[280px]">Propriedades de: {propertiesItem.name}</h5>
                  <p className="text-[10px] text-neutral-400 font-light">Informações e Metadados do Sistema</p>
                </div>
                <button 
                  onClick={() => setShowPropertiesModal(false)}
                  className="rounded-full p-2 hover:bg-white/10 transition-colors text-neutral-400 hover:text-neutral-200"
                >
                  <X size={15} />
                </button>
              </div>

              {/* Tabs mimicking GNOME Properties */}
              <div className="px-5 pt-3 bg-[#1e1e1e]/60 flex gap-4 text-xs font-semibold border-b border-neutral-800/40">
                <span className="text-orange-500 border-b-2 border-orange-500 pb-2 cursor-pointer">Básico</span>
                <span className="text-neutral-400 hover:text-neutral-200 pb-2 cursor-pointer transition-colors">Permissões</span>
                <span className="text-neutral-400 hover:text-neutral-200 pb-2 cursor-pointer transition-colors font-light">Compartilhar</span>
              </div>

              {/* Details grid layout */}
              <div className="p-5 space-y-4 text-xs text-left">
                <div className="grid grid-cols-3 gap-y-3.5 items-start">
                  
                  <span className="text-neutral-450 font-semibold text-neutral-400">Nome:</span>
                  <span className="col-span-2 font-bold break-all select-all">{propertiesItem.name}</span>
                  
                  <span className="text-neutral-450 font-semibold text-neutral-400">Tipo:</span>
                  <span className="col-span-2 text-neutral-200 font-medium">{propertiesItem.type}</span>
                  
                  <span className="text-neutral-450 font-semibold text-neutral-400">Tamanho:</span>
                  <span className="col-span-2 text-neutral-200 font-mono font-bold">{propertiesItem.size}</span>
                  
                  <span className="text-neutral-450 font-semibold text-neutral-400">Localização:</span>
                  <span className="col-span-2 text-neutral-300 break-all select-all font-mono text-[10px] bg-black/20 px-2 py-1.5 rounded-md border border-neutral-800">{propertiesItem.location}</span>
                  
                  <span className="text-neutral-450 font-semibold text-neutral-400">Criado em:</span>
                  <span className="col-span-2 text-neutral-300 font-light">{propertiesItem.created}</span>
                  
                  <span className="text-neutral-450 font-semibold text-neutral-400">Acesso:</span>
                  <span className="col-span-2 text-green-500 font-semibold flex items-center gap-1.5">
                    <Check size={11} className="text-green-500" /> Leitura e Escrita Permitidas
                  </span>
                </div>
              </div>

              {/* Action buttons */}
              <div className="flex items-center justify-end px-5 py-4 border-t border-neutral-800/50 bg-[#1c1c1c]">
                <button 
                  onClick={() => setShowPropertiesModal(false)}
                  className="bg-[#e95420] hover:bg-orange-600 active:scale-95 transition-all text-white font-bold text-xs px-5 py-2.5 rounded-xl shadow-lg"
                >
                  Fechar
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* SCREENSHOT NOTIFICATION BANNER */}
      <AnimatePresence>
        {screenshotNotification && (
          <motion.div 
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -50 }}
            className="absolute top-12 left-1/2 -translate-x-1/2 z-[150] max-w-md w-full bg-[#1e1e1e] border-t-4 border-orange-600 rounded-xl shadow-2xl p-4 flex gap-3 items-start"
          >
            <div className="bg-orange-600 p-2 rounded-lg text-white">
              <Camera size={20} />
            </div>
            <div className="flex-1">
              <h5 className="font-bold text-sm text-white">Notificação do Sistema</h5>
              <p className="text-xs text-gray-300 mt-1">{screenshotNotification}</p>
            </div>
            <button 
              onClick={() => setScreenshotNotification(null)}
              className="text-gray-400 hover:text-white transition-colors"
            >
              <X size={16} />
            </button>
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
            className="absolute top-12 right-4 z-[150] max-w-sm md:max-w-md w-[320px] md:w-[380px] bg-[#1e1e1e]/95 backdrop-blur-md border-t-4 border-[#e95420] rounded-xl shadow-2xl p-4 flex gap-3.5 items-start border border-white/5 select-none"
          >
            <div className="bg-[#e95420] p-2.5 rounded-xl text-white flex-shrink-0 shadow-lg">
              <Monitor size={18} />
            </div>
            <div className="flex-1 min-w-0 pr-1">
              <h5 className="font-bold text-sm text-white leading-snug">
                {isEn ? 'Ubuntu 26.04 Simulation' : 'Simulação do Ubuntu 26.04'}
              </h5>
              <p className="text-xs text-neutral-300 mt-1.5 leading-relaxed">
                {isEn 
                  ? 'This is only an interactive web simulation of Ubuntu so you can experience and interact with it before downloading the real distribution.'
                  : 'Esta é apenas uma simulação do Ubuntu para que você possa experimentar e interagir antes de baixar a distribuição real.'}
              </p>
              <button
                onClick={() => setShowSimInfoNotify(false)}
                className="mt-3.5 bg-[#e95420] hover:bg-[#d14418] active:bg-[#b03510] text-white text-[11px] font-bold px-3.5 py-1.5 rounded-lg transition-colors cursor-pointer shadow-md inline-flex items-center justify-center"
              >
                {isEn ? 'Got it' : 'OK'}
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

      {/* 1. TOP BAR */}
      <div className="absolute top-0 left-0 right-0 h-7 bg-neutral-900/90 backdrop-blur-sm shadow flex items-center justify-between px-4 z-[90] text-xs font-semibold select-none border-b border-black/40">
        <div className="flex items-center gap-4">
          <button 
            onClick={() => {
              setShowAppGrid(!showAppGrid);
              if (showAppGrid) setSearchQuery('');
            }}
            className="flex items-center gap-1.5 px-2 py-1 rounded hover:bg-white/10 transition-colors focus:outline-none"
            title="Workspaces / Aplicativos"
          >
            {/* Workspaces Indicators mimicking GDM dynamic capsule pills */}
            <div className={`h-[5px] rounded-full transition-all duration-300 ${showAppGrid ? 'w-2 bg-neutral-500' : 'w-5 bg-white'}`} />
            <div className={`h-[5px] rounded-full transition-all duration-300 ${showAppGrid ? 'w-5 bg-white' : 'w-2 bg-neutral-500'}`} />
          </button>
        </div>

        {/* Central date clock */}
        <button 
          onClick={() => {
            setShowCalendarMenu(!showCalendarMenu);
            setShowStatusMenu(false);
          }}
          className={`px-3 py-1 rounded hover:bg-white/10 transition-colors focus:outline-none flex items-center gap-2 text-white ${showCalendarMenu ? 'bg-white/10 shadow-inner' : ''}`}
          title="Ver notificações e calendário"
        >
          <span>{timeStr || 'Carregando...'}</span>
        </button>

        {/* Right status widgets */}
        <div className="flex items-center gap-3">
          <button 
            onClick={() => {
              setShowStatusMenu(!showStatusMenu);
              setShowCalendarMenu(false);
            }}
            className={`flex items-center gap-2 px-3 py-1 rounded hover:bg-white/10 transition-colors focus:outline-none ${showStatusMenu ? 'bg-white/10' : ''}`}
          >
            {wifiOn ? <Wifi size={13} className="text-white" /> : <Wifi size={13} className="text-gray-500" />}
            {bluetoothOn && <Bluetooth size={13} className="text-white" />}
            {volume === 0 ? <VolumeX size={13} className="text-gray-500" /> : <Volume2 size={13} className="text-white" />}
            <Battery size={14} className="text-white fill-white/20" />
            <span className="text-[10px]">98%</span>
          </button>
        </div>
      </div>

      {/* 2. TRAY dropdown widget control panel */}
      <AnimatePresence>
        {showStatusMenu && (
          <motion.div 
            initial={{ opacity: 0, y: -10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.95 }}
            className="absolute top-9 right-3 w-[330px] bg-[#1a1a1a]/95 backdrop-blur-md rounded-[24px] shadow-2xl border border-white/[0.08] z-[120] p-4 text-xs font-medium text-white shadow-black/90 flex flex-col gap-3.5"
          >
            {/* Top row: Battery + top round buttons */}
            <div className="flex justify-between items-center">
              {/* Battery Pill */}
              <div className="bg-white/10 hover:bg-white/15 px-3 py-1.5 rounded-full flex items-center gap-1.5 text-[11px] font-bold text-zinc-100 transition-colors cursor-pointer">
                <Battery size={13} className="text-white fill-white/80" />
                <span>100%</span>
              </div>
              
              {/* Actions */}
              <div className="flex items-center gap-2">
                <button 
                  onClick={() => {
                    triggerScreenshot();
                    setShowStatusMenu(false);
                  }}
                  className="w-[32px] h-[32px] rounded-full bg-white/10 hover:bg-white/15 active:bg-white/20 flex items-center justify-center text-white transition-all cursor-pointer shadow-sm border border-white/5"
                  title="Captura de Tela"
                >
                  <Camera size={13} />
                </button>
                <button 
                  onClick={() => {
                    toggleWindow('settings');
                    setShowStatusMenu(false);
                  }}
                  className="w-[32px] h-[32px] rounded-full bg-white/10 hover:bg-white/15 active:bg-white/20 flex items-center justify-center text-white transition-all cursor-pointer shadow-sm border border-white/5"
                  title="Configurações do Ubuntu"
                >
                  <SettingsIcon size={13} />
                </button>
                <button 
                  onClick={() => {
                    setShowStatusMenu(false);
                    onClose();
                  }}
                  className="w-[32px] h-[32px] rounded-full bg-white/10 hover:bg-white/15 active:bg-white/20 text-white flex items-center justify-center transition-all cursor-pointer shadow-sm border border-white/5"
                  title="Desligar e Voltar"
                >
                  <Power size={13} className="text-red-400" />
                </button>
              </div>
            </div>

            {/* Sliders for sound volume & brightness */}
            <div className="flex flex-col gap-2.5 pb-2 border-b border-white/5">
              {/* Volume Slider Row */}
              <div className="flex items-center gap-3">
                <div onClick={() => handleVolumeChange(volume === 0 ? 80 : 0)} className="cursor-pointer text-zinc-300 hover:text-white transition-colors">
                  {volume === 0 ? <VolumeX size={15} /> : <Volume2 size={15} />}
                </div>
                <input 
                  type="range" 
                  min="0" 
                  max="100" 
                  value={volume}
                  onChange={(e) => handleVolumeChange(Number(e.target.value))}
                  className="flex-1 accent-[#e95420] h-1.5 bg-white/15 rounded-lg cursor-pointer hover:accent-[#df4a16] transition-all font-sans"
                />
              </div>

              {/* Brightness Slider Row */}
              <div className="flex items-center gap-3">
                <Sun size={15} className="text-zinc-300" />
                <input 
                  type="range" 
                  min="10" 
                  max="100" 
                  value={brightness}
                  onChange={(e) => handleBrightnessChange(Number(e.target.value))}
                  className="flex-1 accent-[#e95420] h-1.5 bg-white/15 rounded-lg cursor-pointer hover:accent-[#df4a16] transition-all font-sans"
                />
              </div>
            </div>

            {/* Grid of buttons (exactly like the screenshot) */}
            <div className="grid grid-cols-2 gap-2">
              {/* 1. Wi-Fi Toggle */}
              <div 
                className={`rounded-2xl flex items-center justify-between p-2.5 transition-all w-full cursor-pointer group ${
                  wifiOn 
                    ? 'bg-[#e95420] text-white hover:bg-[#df4a16] shadow-md shadow-[#e95420]/15' 
                    : 'bg-[#2D2D2D] hover:bg-neutral-800 text-zinc-300 hover:text-zinc-100'
                }`}
                onClick={() => setWifiOn(!wifiOn)}
              >
                <div className="flex items-center gap-2.5 min-w-0 flex-1">
                  <div className="p-1 rounded-lg">
                    <Wifi size={14} className={wifiOn ? 'text-white' : 'text-zinc-400'} />
                  </div>
                  <div className="text-left truncate">
                    <div className="font-bold text-[11px] leading-tight">Wi-Fi</div>
                    <div className={`text-[9px] truncate transition-colors leading-none mt-0.5 ${wifiOn ? 'text-white/80' : 'text-zinc-500'}`}>
                      {wifiOn ? 'Orion' : 'Desativado'}
                    </div>
                  </div>
                </div>
                <div className={`pl-1.5 pr-0.5 flex items-center border-l ${wifiOn ? 'border-white/20 text-white/70' : 'border-white/10 text-zinc-500'} group-hover:text-white transition-colors`}>
                  <ChevronRight size={13} className="shrink-0" />
                </div>
              </div>

              {/* 2. Bluetooth Toggle */}
              <div 
                className={`rounded-2xl flex items-center justify-between p-2.5 transition-all w-full cursor-pointer group ${
                  bluetoothOn 
                    ? 'bg-[#e95420] text-white hover:bg-[#df4a16] shadow-md shadow-[#e95420]/15' 
                    : 'bg-[#2D2D2D] hover:bg-neutral-800 text-zinc-300 hover:text-zinc-100'
                }`}
                onClick={() => setBluetoothOn(!bluetoothOn)}
              >
                <div className="flex items-center gap-2.5 min-w-0 flex-1">
                  <div className="p-1 rounded-lg">
                    <Bluetooth size={14} className={bluetoothOn ? 'text-white' : 'text-zinc-400'} />
                  </div>
                  <div className="text-left truncate">
                    <div className="font-bold text-[11px] leading-tight">Bluetooth</div>
                    <div className={`text-[9px] truncate transition-colors leading-none mt-0.5 ${bluetoothOn ? 'text-white/80' : 'text-zinc-500'}`}>
                      {bluetoothOn ? 'Ativo' : 'Desativado'}
                    </div>
                  </div>
                </div>
                <div className={`pl-1.5 pr-0.5 flex items-center border-l ${bluetoothOn ? 'border-white/20 text-white/70' : 'border-white/10 text-zinc-500'} group-hover:text-white transition-colors`}>
                  <ChevronRight size={13} className="shrink-0" />
                </div>
              </div>

              {/* 3. Power Mode Toggle */}
              <div 
                className="rounded-2xl flex items-center justify-between p-2.5 transition-all w-full cursor-pointer bg-[#2D2D2D] hover:bg-neutral-800 text-zinc-300 hover:text-zinc-100 group"
                onClick={() => setPowerMode(powerMode === 'balanced' ? 'power-saver' : 'balanced')}
              >
                <div className="flex items-center gap-2.5 min-w-0 flex-1">
                  <div className="p-1 rounded-lg">
                    <Gauge size={14} className="text-zinc-400 group-hover:text-zinc-200" />
                  </div>
                  <div className="text-left truncate">
                    <div className="font-bold text-[11px] leading-tight">Modo Energia</div>
                    <div className="text-[9px] text-zinc-500 truncate leading-none mt-0.5">
                      {powerMode === 'balanced' ? 'Equilibrado' : 'Economia'}
                    </div>
                  </div>
                </div>
                <div className="pl-1.5 pr-0.5 flex items-center border-l border-white/10 text-zinc-500 group-hover:text-zinc-200 transition-colors">
                  <ChevronRight size={13} className="shrink-0" />
                </div>
              </div>

              {/* 4. Night Light (Luz Noturna) Toggle */}
              <div 
                className={`rounded-2xl flex items-center p-2.5 transition-all w-full cursor-pointer ${
                  nightLight 
                    ? 'bg-[#e95420] text-white hover:bg-[#df4a16] shadow-md shadow-[#e95420]/15' 
                    : 'bg-[#2D2D2D] hover:bg-neutral-800 text-zinc-300 hover:text-zinc-100'
                }`}
                onClick={() => setNightLight(!nightLight)}
              >
                <div className="flex items-center gap-2.5 min-w-0">
                  <div className="p-1 rounded-lg">
                    <Sun size={14} className={nightLight ? 'text-amber-300' : 'text-zinc-400'} />
                  </div>
                  <div className="text-left">
                    <div className="font-bold text-[11px] leading-tight">Luz Noturna</div>
                    <div className={`text-[9px] transition-colors leading-none mt-0.5 ${nightLight ? 'text-white/80' : 'text-zinc-500'}`}>
                      {nightLight ? 'Ligada' : 'Inativa'}
                    </div>
                  </div>
                </div>
              </div>

              {/* 5. Dark Style (Estilo Escuro) Toggle */}
              <div 
                className={`rounded-2xl flex items-center p-2.5 transition-all w-full cursor-pointer ${
                  darkStyle 
                    ? 'bg-[#e95420] text-white hover:bg-[#df4a16] shadow-md shadow-[#e95420]/15' 
                    : 'bg-[#2D2D2D] hover:bg-neutral-800 text-zinc-300 hover:text-zinc-100'
                }`}
                onClick={() => setDarkStyle(!darkStyle)}
              >
                <div className="flex items-center gap-2.5 min-w-0">
                  <div className="p-1 rounded-lg">
                    {darkStyle ? <Moon size={14} className="text-white" /> : <Sun size={14} className="text-zinc-400" />}
                  </div>
                  <div className="text-left">
                    <div className="font-bold text-[11px] leading-tight">Estilo Escuro</div>
                    <div className={`text-[9px] transition-colors leading-none mt-0.5 ${darkStyle ? 'text-white/80' : 'text-zinc-500'}`}>
                      {darkStyle ? 'Ligado' : 'Desligado'}
                    </div>
                  </div>
                </div>
              </div>

              {/* 6. Do Not Disturb (Não Perturbe) Toggle */}
              <div 
                className={`rounded-2xl flex items-center p-2.5 transition-all w-full cursor-pointer ${
                  doNotDisturb 
                    ? 'bg-[#e95420] text-white hover:bg-[#df4a16] shadow-md shadow-[#e95420]/15' 
                    : 'bg-[#2D2D2D] hover:bg-neutral-800 text-zinc-300 hover:text-zinc-100'
                }`}
                onClick={() => setDoNotDisturb(!doNotDisturb)}
              >
                <div className="flex items-center gap-2.5 min-w-0">
                  <div className="p-1 rounded-lg">
                    <BellOff size={14} className={doNotDisturb ? 'text-white' : 'text-zinc-400'} />
                  </div>
                  <div className="text-left">
                    <div className="font-bold text-[11px] leading-tight">Não Perturbe</div>
                    <div className={`text-[9px] transition-colors leading-none mt-0.5 ${doNotDisturb ? 'text-white/80' : 'text-zinc-500'}`}>
                      {doNotDisturb ? 'Ativo' : 'Inativo'}
                    </div>
                  </div>
                </div>
              </div>

              {/* 7. Keyboard (Teclado) Toggle */}
              <div 
                className="rounded-2xl flex items-center justify-between p-2.5 transition-all w-full cursor-pointer bg-[#2D2D2D] hover:bg-neutral-800 text-zinc-300 hover:text-zinc-100 group"
                onClick={() => {
                  setScreenshotNotification(isEn ? 'Keyboard: English (US)' : 'Teclado: Português (Brasil)');
                  setTimeout(() => setScreenshotNotification(null), 2500);
                }}
              >
                <div className="flex items-center gap-2.5 min-w-0 flex-1">
                  <div className="p-1 rounded-lg">
                    <Monitor size={14} className="text-zinc-400 group-hover:text-zinc-200" />
                  </div>
                  <div className="text-left truncate">
                    <div className="font-bold text-[11px] leading-tight">Teclado</div>
                    <div className="text-[9px] text-zinc-500 truncate leading-none mt-0.5">Português</div>
                  </div>
                </div>
                <div className="pl-1.5 pr-0.5 flex items-center border-l border-white/10 text-zinc-500 group-hover:text-zinc-200 transition-colors">
                  <ChevronRight size={13} className="shrink-0" />
                </div>
              </div>

              {/* 8. Airplane Mode Toggle */}
              <div 
                className={`rounded-2xl flex items-center p-2.5 transition-all w-full cursor-pointer ${
                  airplaneMode 
                    ? 'bg-[#e95420] text-white hover:bg-[#df4a16] shadow-md shadow-[#e95420]/15' 
                    : 'bg-[#2D2D2D] hover:bg-neutral-800 text-zinc-300 hover:text-zinc-100'
                }`}
                onClick={() => {
                  const nextVal = !airplaneMode;
                  setAirplaneMode(nextVal);
                  if (nextVal) {
                    setWifiOn(false);
                    setBluetoothOn(false);
                    setScreenshotNotification(isEn ? 'Airplane mode enabled: wireless networks turned off.' : 'Modo avião ativado: redes sem fio desligadas.');
                  } else {
                    setWifiOn(true);
                    setScreenshotNotification(isEn ? 'Airplane mode disabled.' : 'Modo avião desativado.');
                  }
                  setTimeout(() => setScreenshotNotification(null), 2500);
                }}
              >
                <div className="flex items-center gap-2.5 min-w-0">
                  <div className="p-1 rounded-lg">
                    <Plane size={14} className={airplaneMode ? 'text-white' : 'text-zinc-400'} />
                  </div>
                  <div className="text-left">
                    <div className="font-bold text-[11px] leading-tight">Modo Avião</div>
                    <div className={`text-[9px] transition-colors leading-none mt-0.5 ${airplaneMode ? 'text-white/80' : 'text-zinc-500'}`}>
                      {airplaneMode ? 'Ativo' : 'Desativado'}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* CALENDAR & NOTIFICATIONS PANEL (GNOME-style central clock/calendar dropdown) */}
      <AnimatePresence>
        {showCalendarMenu && (
          <motion.div 
            initial={{ opacity: 0, y: -10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.95 }}
            className="absolute top-9 left-1/2 -translate-x-1/2 w-[660px] max-w-[95%] bg-[#1a1a1a]/95 backdrop-blur-md rounded-[24px] shadow-2xl border border-white/[0.08] z-[120] p-5 text-xs text-white shadow-black/90 grid grid-cols-1 md:grid-cols-[1.1fr_0.9fr] gap-6 divide-y md:divide-y-0 md:divide-x divide-white/[0.06]"
          >
            {/* COLUMN 1: NOTIFICATIONS SECTION */}
            <div className="flex flex-col h-[340px] md:h-[400px]">
              {/* Header */}
              <div className="flex justify-between items-center mb-3 flex-shrink-0">
                <span className="font-bold text-sm text-zinc-200">Notificações</span>
                {notifications.length > 0 && (
                  <button 
                    onClick={() => setNotifications([])}
                    className="text-[11px] text-zinc-400 hover:text-white transition-colors bg-white/5 hover:bg-white/10 px-2.5 py-1 rounded-md"
                  >
                    Limpar tudo
                  </button>
                )}
              </div>

              {/* Scrollable notifications list */}
              <div className="flex-1 overflow-y-auto pr-1 flex flex-col gap-2.5 scrollbar-thin select-text">
                {notifications.length === 0 ? (
                  <div className="flex-1 flex flex-col items-center justify-center text-zinc-500 gap-2.5">
                    <div className="bg-white/5 p-4 rounded-full border border-white/5">
                      <Bell size={36} className="text-zinc-600" />
                    </div>
                    <span className="text-zinc-500 font-medium text-xs">Nenhuma notificação recente</span>
                  </div>
                ) : (
                  notifications.map((notif) => (
                    <div 
                      key={notif.id}
                      className="bg-zinc-800/40 hover:bg-zinc-800/60 transition-all p-3 rounded-xl border border-white/[0.03] flex gap-3 relative group text-left"
                    >
                      {/* Left side app/state icon */}
                      <div className="text-[#e95420] p-2 bg-white/5 rounded-xl flex-shrink-0 flex items-center justify-center w-8 h-8 border border-white/5">
                        {notif.icon === 'camera' && <Camera size={14} />}
                        {notif.icon === 'airplane' && <Plane size={14} />}
                        {notif.icon === 'keyboard' && <Monitor size={14} />}
                        {notif.icon === 'folder' && <Folder size={14} />}
                        {notif.icon === 'trash' && <Trash2 size={14} />}
                        {notif.icon === 'monitor' && <Monitor size={14} />}
                        {notif.icon === 'ubuntu' && <Monitor size={14} className="text-[#e95420]" />}
                      </div>

                      {/* Content details */}
                      <div className="flex-1 min-w-0 pr-4">
                        <div className="flex items-center gap-1.5 justify-start text-[9px] text-zinc-400 font-bold uppercase tracking-wider mb-0.5">
                          <span>{notif.app}</span>
                          <span>•</span>
                          <span>{notif.time}</span>
                        </div>
                        <h6 className="font-bold text-xs text-white leading-tight">{notif.title}</h6>
                        <p className="text-[11px] text-zinc-300 mt-1 leading-relaxed break-words">{notif.body}</p>
                      </div>

                      {/* Individual Dismiss Button */}
                      <button 
                        onClick={(e) => {
                          e.stopPropagation();
                          setNotifications(prev => prev.filter(n => n.id !== notif.id));
                        }}
                        className="absolute top-2.5 right-2.5 p-1 text-zinc-400 hover:text-white rounded-full hover:bg-white/10 transition-colors opacity-80 md:opacity-0 md:group-hover:opacity-100"
                        title="Descartar"
                      >
                        <X size={12} />
                      </button>
                    </div>
                  ))
                )}
              </div>

              {/* Bottom control row */}
              <div className="pt-3 border-t border-white/[0.06] flex items-center justify-between mt-2 flex-shrink-0">
                <div className="flex items-center gap-2">
                  <span className="text-[11px] text-zinc-400">Não Perturbe</span>
                  <button 
                    onClick={() => setDoNotDisturb(!doNotDisturb)}
                    className={`w-9 h-5 rounded-full p-0.5 transition-colors focus:outline-none relative ${doNotDisturb ? 'bg-[#e95420]' : 'bg-zinc-700'}`}
                  >
                    <div className={`w-4 h-4 bg-white rounded-full shadow-md transition-transform duration-200 ${doNotDisturb ? 'translate-x-4' : 'translate-x-0'}`} />
                  </button>
                </div>
              </div>
            </div>

            {/* COLUMN 2: CALENDAR SECTION */}
            <div className="md:pl-6 flex flex-col h-[340px] md:h-[400px]">
              {/* Today Info Row */}
              <div className="mb-4 text-left flex-shrink-0">
                <div className="text-zinc-400 text-xs font-bold capitalize">
                  {new Date().toLocaleDateString('pt-BR', { weekday: 'long' })}
                </div>
                <div className="text-xl font-bold text-white tracking-tight mt-0.5">
                  {new Date().toLocaleDateString('pt-BR', { day: 'numeric', month: 'long', year: 'numeric' })}
                </div>
              </div>

              {/* Month selector UI */}
              <div className="flex justify-between items-center mb-3 flex-shrink-0">
                <div className="font-bold text-zinc-100 text-[13px]">
                  {(() => {
                    const monthStr = navDate.toLocaleDateString('pt-BR', { month: 'long', year: 'numeric' });
                    return monthStr.charAt(0).toUpperCase() + monthStr.slice(1);
                  })()}
                </div>
                <div className="flex items-center gap-1.5">
                  <button 
                    onClick={() => setNavDate(new Date(navDate.getFullYear(), navDate.getMonth() - 1, 1))}
                    className="p-1 rounded-lg hover:bg-white/10 text-white transition-colors focus:outline-none"
                    title="Mês anterior"
                  >
                    <ChevronLeft size={16} />
                  </button>
                  <button 
                    onClick={() => setNavDate(new Date(navDate.getFullYear(), navDate.getMonth() + 1, 1))}
                    className="p-1 rounded-lg hover:bg-white/10 text-white transition-colors focus:outline-none"
                    title="Próximo mês"
                  >
                    <ChevronRight size={16} />
                  </button>
                </div>
              </div>

              {/* Weekday Labels Grid (D, S, T, Q, Q, S, S) */}
              <div className="grid grid-cols-7 text-center text-zinc-500 font-bold mb-1.5 text-[10px] uppercase flex-shrink-0">
                {['D', 'S', 'T', 'Q', 'Q', 'S', 'S'].map((dayChar, idx) => (
                  <div key={idx} className="h-6 flex items-center justify-center">
                    {dayChar}
                  </div>
                ))}
              </div>

              {/* Grid of Days (42 cells: 7x6) */}
              <div className="grid grid-cols-7 text-center gap-y-1 flex-1 overflow-y-auto no-scrollbar">
                {getCalendarDays(navDate).map((cellObj, idx) => {
                  const isCurrentMonth = cellObj.type === 'current';
                  const isToday = cellObj.isToday;
                  
                  return (
                    <div 
                      key={idx} 
                      className="h-6.5 flex items-center justify-center relative"
                    >
                      {isToday ? (
                        <div 
                          className="w-6.5 h-6.5 rounded-full bg-[#e95420] text-white flex items-center justify-center font-bold text-[11px] shadow-sm shadow-[#e95420]/50 cursor-pointer"
                          title="Hoje"
                        >
                          {cellObj.day}
                        </div>
                      ) : (
                        <span 
                          onClick={() => {
                            if (cellObj.type === 'prev') {
                              setNavDate(new Date(navDate.getFullYear(), navDate.getMonth() - 1, 1));
                            } else if (cellObj.type === 'next') {
                              setNavDate(new Date(navDate.getFullYear(), navDate.getMonth() + 1, 1));
                            }
                          }}
                          className={`w-6.5 h-6.5 flex items-center justify-center text-[10.5px] rounded-full transition-colors cursor-pointer select-none ${
                            isCurrentMonth 
                              ? 'text-zinc-200 hover:bg-white/10' 
                              : 'text-zinc-600 opacity-40 hover:bg-white/5'
                          }`}
                        >
                          {cellObj.day}
                        </span>
                      )}
                    </div>
                  );
                })}
              </div>

              {/* Extra GNOME indicators like climate location, events tracker */}
              <div className="mt-4 pt-3 border-t border-white/[0.06] flex flex-col gap-1.5 text-left flex-shrink-0">
                <div className="bg-white/[0.03] rounded-xl p-2 border border-white/[0.02] flex items-center justify-between">
                  <span className="text-[10px] text-zinc-400">Compromissos</span>
                  <span className="text-[10px] text-zinc-300 font-semibold">Nenhum evento agendado</span>
                </div>
                <div className="flex gap-1.5">
                  <div className="bg-white/[0.03] rounded-xl p-2.5 flex-1 border border-white/[0.02] flex flex-col justify-center">
                    <span className="text-[9px] text-zinc-500 font-bold tracking-wider">Clima</span>
                    <span className="text-[10px] text-zinc-300 font-medium leading-none mt-1">Não configurado</span>
                  </div>
                  <div className="bg-white/[0.03] rounded-xl p-2.5 flex-1 border border-white/[0.02] flex flex-col justify-center">
                    <span className="text-[9px] text-zinc-500 font-bold tracking-wider font-sans">Mundo</span>
                    <span className="text-[10px] text-zinc-300 font-medium leading-none mt-1">Adicionar...</span>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 3. APP CRITICAL DOCK (Ubuntu Left Bar Launcher) */}
      <div className="absolute left-0 top-7 bottom-0 w-[56px] bg-[#111111]/95 flex flex-col justify-start items-center py-2 gap-1.5 z-[80] border-r border-black/40 shadow-2xl select-none">
        {/* APP ICONS */}
        <div className="flex flex-col gap-1.5 w-full items-center justify-start flex-1 overflow-y-auto no-scrollbar">
          {windows.map((win) => {
            const isAppOpen = win.isOpen;
            const isHighest = isAppOpen ? win.zIndex === Math.max(...windows.filter(w => w.isOpen && !w.isMinimized).map(w => w.zIndex)) : false;
            
            return (
              <button 
                key={win.id}
                onClick={() => toggleWindow(win.id)}
                className={`relative w-11 h-11 flex items-center justify-center rounded-lg hover:bg-white/10 transition-all group ${isHighest ? 'bg-white/5' : ''}`}
              >
                {/* App Indicator dot (Left side, white indicator dot representing open apps in standard Ubuntu) */}
                {isAppOpen && (
                  <span className={`absolute left-0.5 top-1/2 -translate-y-1/2 w-1 h-2 rounded-r-sm ${isHighest ? 'bg-white' : 'bg-neutral-400'}`} />
                )}
                
                {/* Actual graphic launcher representations */}
                {renderIcon(win.id, "w-9 h-9", win.id === 'trash' ? trashItems.length > 0 : false)}

                {/* Tooltip text bubble */}
                <span className="absolute left-[60px] bg-neutral-900 border border-white/10 text-white rounded px-2.5 py-1.5 text-xs font-medium whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-[100] shadow-lg">
                  {win.title}
                </span>
              </button>
            );
          })}
        </div>

        {/* Bottom pinned Ubuntu Applications Menu Launcher (Shows the custom logo) */}
        <div className="w-full flex flex-col items-center mt-auto pb-1.5 shrink-0">
          <button 
            onClick={() => {
              setShowAppGrid(!showAppGrid);
              if (showAppGrid) setSearchQuery('');
            }}
            className={`relative w-11 h-11 flex items-center justify-center rounded-lg hover:bg-white/10 transition-all group ${showAppGrid ? 'bg-white/5' : ''}`}
            title="Mostrar Aplicativos"
          >
            <img 
              src="/assets/icone-ubuntu.png" 
              alt="Mostrar Aplicativos" 
              className="w-10 h-10 object-contain hover:scale-110 active:scale-95 transition-transform"
              referrerPolicy="no-referrer"
            />
            
            {/* Tooltip text bubble for application grid launcher */}
            <span className="absolute left-[60px] bg-neutral-900 border border-white/10 text-white rounded px-2.5 py-1.5 text-xs font-medium whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-[100] shadow-lg">
              Mostrar Aplicativos
            </span>
          </button>
        </div>
      </div>

      {/* 4. ACTIVE FLOATING WINDOWS ARENA */}
      <div className="absolute left-[64px] right-2 top-10 bottom-2 overflow-hidden pointer-events-none z-40">
        {windows.map((win) => {
          if (!win.isOpen) return null;
          
          return (
            <motion.div
              key={win.id}
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ 
                scale: win.isMinimized ? 0.3 : 1, 
                opacity: win.isMinimized ? 0 : 1,
                x: win.isMaximized ? 0 : win.x,
                y: win.isMaximized ? 0 : win.y,
                width: win.isMaximized ? '100%' : win.width,
                height: win.isMaximized ? '100%' : win.height,
              }}
              transition={(win.id === activeDragId || win.id === activeResizeId) ? { type: "tween", duration: 0 } : { duration: 0.2 }}
              style={{ 
                zIndex: win.zIndex,
                pointerEvents: win.isMinimized ? 'none' : 'auto',
                position: 'absolute'
              }}
              onClick={() => focusWindow(win.id)}
              className={`rounded-xl shadow-2xl border ${darkStyle ? 'bg-[#181818] border-neutral-800 shadow-black' : 'bg-[#F3F3F3] border-neutral-300 shadow-zinc-950'} flex flex-col overflow-hidden text-left relative`}
            >
              {/* Window Resizers (only if not maximized) */}
              {!win.isMaximized && (
                <>
                  {/* Edges */}
                  <div 
                    onMouseDown={(e) => startResize(win.id, 'n', e)}
                    className="absolute top-0 left-2 right-2 h-1.5 cursor-ns-resize z-[99] hover:bg-orange-500/25 transition-colors"
                    style={{ pointerEvents: 'auto' }}
                  />
                  <div 
                    onMouseDown={(e) => startResize(win.id, 's', e)}
                    className="absolute bottom-0 left-2 right-2 h-1.5 cursor-ns-resize z-[99] hover:bg-orange-500/25 transition-colors"
                    style={{ pointerEvents: 'auto' }}
                  />
                  <div 
                    onMouseDown={(e) => startResize(win.id, 'e', e)}
                    className="absolute top-2 bottom-2 right-0 w-1.5 cursor-ew-resize z-[99] hover:bg-orange-500/25 transition-colors"
                    style={{ pointerEvents: 'auto' }}
                  />
                  <div 
                    onMouseDown={(e) => startResize(win.id, 'w', e)}
                    className="absolute top-2 bottom-2 left-0 w-1.5 cursor-ew-resize z-[99] hover:bg-orange-500/25 transition-colors"
                    style={{ pointerEvents: 'auto' }}
                  />
                  {/* Corners */}
                  <div 
                    onMouseDown={(e) => startResize(win.id, 'nw', e)}
                    className="absolute top-0 left-0 w-3 h-3 cursor-nwse-resize z-[100] hover:bg-orange-500/30 transition-colors rounded-tl-xl"
                    style={{ pointerEvents: 'auto' }}
                  />
                  <div 
                    onMouseDown={(e) => startResize(win.id, 'ne', e)}
                    className="absolute top-0 right-0 w-3 h-3 cursor-nesw-resize z-[100] hover:bg-orange-500/30 transition-colors rounded-tr-xl"
                    style={{ pointerEvents: 'auto' }}
                  />
                  <div 
                    onMouseDown={(e) => startResize(win.id, 'sw', e)}
                    className="absolute bottom-0 left-0 w-3 h-3 cursor-nesw-resize z-[100] hover:bg-orange-500/30 transition-colors rounded-bl-xl"
                    style={{ pointerEvents: 'auto' }}
                  />
                  <div 
                    onMouseDown={(e) => startResize(win.id, 'se', e)}
                    className="absolute bottom-0 right-0 w-3 h-3 cursor-nwse-resize z-[100] hover:bg-orange-500/30 transition-colors rounded-br-xl"
                    style={{ pointerEvents: 'auto' }}
                  />
                </>
              )}
              {/* Window header */}
              {win.id !== 'files' && (
                <div 
                  onMouseDown={(e) => startDrag(win.id, e)}
                  onDoubleClick={(e) => maximizeWindow(win.id, e)}
                  className={`h-11 ${darkStyle ? 'bg-[#1E1E1E] text-white border-b border-neutral-800/80 hover:bg-neutral-800/40' : 'bg-[#E6E6E6] text-neutral-800 border-b border-neutral-300/80 hover:bg-neutral-200'} px-4 flex items-center justify-between cursor-move select-none`}
                >
                  {/* Left wing icon and title text */}
                  <div className="flex items-center gap-2 text-sm font-semibold">
                    {(CUSTOM_ICONS[win.id as keyof typeof CUSTOM_ICONS] || win.id === 'trash') ? renderIcon(win.id, "w-5 h-5", win.id === 'trash' ? trashItems.length > 0 : false) : win.icon}
                    <span className="truncate max-w-[200px] md:max-w-[400px]">{win.title}</span>
                  </div>

                  {/* Right wing window control action buttons (GNOME style) */}
                  <div className="flex items-center gap-1.5">
                    <button 
                      onClick={(e) => minimizeWindow(win.id, e)}
                      className="w-5 h-5 rounded-full flex items-center justify-center bg-[#2d2d2d] hover:bg-[#3d3d3d] active:bg-[#4d4d4d] text-zinc-300 hover:text-white transition-colors"
                      title="Minimizar"
                    >
                      <Minus size={10} />
                    </button>
                    <button 
                      onClick={(e) => maximizeWindow(win.id, e)}
                      className="w-5 h-5 rounded-full flex items-center justify-center bg-[#2d2d2d] hover:bg-[#3d3d3d] active:bg-[#4d4d4d] text-zinc-300 hover:text-white transition-colors"
                      title="Maximizar"
                    >
                      <Square size={8} />
                    </button>
                    <button 
                      onClick={(e) => closeWindow(win.id, e)}
                      className="w-5 h-5 rounded-full flex items-center justify-center bg-[#2d2d2d] hover:bg-[#3d3d3d] active:bg-[#4d4d4d] text-zinc-300 hover:text-white transition-colors"
                      title="Fechar"
                    >
                      <X size={10} />
                    </button>
                  </div>
                </div>
              )}

              {/* Window Content Arena */}
              <div className={`flex-1 ${win.id === 'files' ? 'overflow-hidden flex flex-col' : 'overflow-auto'} bg-[#1A1A1A] relative text-sm`}>
                
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
                              className={`h-8 px-3.5 flex items-center gap-2 rounded-t-lg cursor-pointer transition-all max-w-[160px] relative text-[11px] ${
                                isActive 
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

                      {/* Main Address Toolbar (Firefox Style `#2b2a33`) */}
                      <div className="h-10 bg-[#2b2a33] flex items-center px-4 gap-3 border-b border-black/20 relative z-20">
                        <div className="flex items-center gap-1 text-white">
                          <button 
                            disabled={firefoxHistoryIndex === 0}
                            onClick={goBackFirefox} 
                            className={`p-1.5 rounded transition-colors ${firefoxHistoryIndex === 0 ? 'opacity-15 cursor-not-allowed text-neutral-400' : 'hover:bg-white/5 opacity-80 hover:opacity-100 text-white'}`}
                            title="Voltar"
                          >
                            <ChevronLeft size={16} />
                          </button>
                          <button 
                            disabled={firefoxHistoryIndex >= firefoxHistory.length - 1}
                            onClick={goForwardFirefox} 
                            className={`p-1.5 rounded transition-colors ${firefoxHistoryIndex >= firefoxHistory.length - 1 ? 'opacity-15 cursor-not-allowed text-neutral-400' : 'hover:bg-white/5 opacity-80 hover:opacity-100 text-white'}`}
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
                            className="w-full bg-[#1c1b22] text-xs text-white border border-white/5 hover:border-white/10 rounded-lg pl-8.5 pr-4 py-1.5 focus:outline-none focus:ring-1 ring-orange-500/50 text-left"
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
                                  
                                  <div className="h-[1px] bg-white/5 my-1" />
                                  
                                  <button 
                                    onClick={() => { setShowFirefoxPrivacyModal(true); setShowFirefoxMenu(false); }} 
                                    className="w-full flex items-center gap-3 px-4 py-2.5 text-xs text-neutral-200 hover:bg-white/5 transition-colors text-left"
                                  >
                                    <Shield size={15} className="text-green-400" /> Sobre privacidade
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
                              className="h-full w-1/3 bg-[#E95420]"
                            />
                          )}
                        </AnimatePresence>
                      </div>

                      {/* Firefox Window Content & Sandbox Emulator Workspace */}
                      <div className="flex-1 relative bg-white overflow-hidden">
                        
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
                                    <Play className="fill-white" size={13} /> YouTube
                                  </span>
                                  <span className="text-[10px] font-bold text-neutral-400 bg-zinc-800 px-2 py-0.5 rounded uppercase hidden sm:inline">Linux Sim</span>
                                </button>
                              </div>

                              {/* Search field of YouTube */}
                              <form 
                                onSubmit={(e) => { e.preventDefault(); }}
                                className="flex-1 max-w-md mx-3"
                              >
                                <div className="flex w-full items-center bg-[#121212] border border-zinc-700/80 rounded-full overflow-hidden focus-within:border-blue-500">
                                  <input 
                                    type="text" 
                                    placeholder="Pesquisar nos vídeos simulados..." 
                                    value={ytSearchQuery}
                                    onChange={(e) => setYtSearchQuery(e.target.value)}
                                    className="bg-transparent text-xs text-white px-4 py-1.5 outline-none flex-1 placeholder-zinc-500 text-left"
                                  />
                                  <button type="submit" className="bg-zinc-800/80 px-4 py-1.5 border-l border-zinc-700 text-zinc-400 hover:text-white transition-colors">
                                    <Search size={13} />
                                  </button>
                                </div>
                              </form>

                              {/* Firefox Profile avatar */}
                              <div className="flex items-center gap-2">
                                <span className="w-7 h-7 rounded-full bg-gradient-to-tr from-orange-500 to-rose-600 flex items-center justify-center font-bold text-[11px] text-white select-none shadow">
                                  U
                                </span>
                              </div>
                            </div>

                            <div className="flex-1 flex overflow-hidden">
                              {/* Sidebar */}
                              <div className="w-48 bg-[#0f0f0f] p-2 hidden md:flex flex-col gap-1 border-r border-zinc-800 text-left shrink-0">
                                <button 
                                  onClick={() => { setYtActiveVideoId(null); setYtSearchQuery(''); }}
                                  className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-xs font-medium transition-colors ${!ytActiveVideoId ? 'bg-zinc-800/70 text-white' : 'text-zinc-450 hover:bg-zinc-900 text-zinc-300'}`}
                                >
                                  <Home size={14} className="text-red-500" /> <span>Início</span>
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
                                      <div className="w-2 h-2 rounded-full bg-red-600"></div>
                                      <span className="truncate">{ch}</span>
                                    </div>
                                  ))
                                )}
                              </div>

                              {/* Content Feed area */}
                              <div className="flex-1 overflow-y-auto p-4 select-text">
                                {ytActiveVideoId ? (
                                  /* Active Video Player View (The active content itself) */
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
                                          {/* Frame player wrapper */}
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

                                          {/* Video Infos */}
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
                                                    showFirefoxToast(`Removido inscrição de ${activeVideo.channel}`);
                                                  } else {
                                                    setYtSubscribedChannels(prev => [...prev, activeVideo.channel]);
                                                    showFirefoxToast(`Inscrito com sucesso no canal ${activeVideo.channel}`);
                                                  }
                                                }}
                                                className={`ml-2 px-4 py-2 rounded-full text-xs font-bold transition-all ${
                                                  isSubscribed ? 'bg-zinc-800 text-zinc-350 hover:bg-zinc-700' : 'bg-white text-black hover:bg-zinc-200'
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
                                                className={`flex items-center gap-1 px-3 py-1 rounded-full transition-colors ${
                                                  isLiked ? 'text-blue-400 font-bold bg-neutral-700' : 'hover:bg-zinc-700 text-zinc-300'
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

                                          {/* Description description */}
                                          <div className="bg-[#1f1f1f] p-4 rounded-xl text-xs text-zinc-300 leading-relaxed text-left">
                                            <p className="font-bold text-white mb-1">{activeVideo.views} • {activeVideo.time}</p>
                                            <p className="opacity-80">
                                              Vídeo executando em modo de contêiner de alta fidelidade nativo da plataforma. O iframe de embarque direto ignora quaisquer restrições de headers por utilizar o link do player de incorporação oficial do YouTube.
                                            </p>
                                          </div>
                                        </div>

                                        {/* Right Sidebar Next Videos */}
                                        <div className="space-y-3.5 text-left select-none">
                                          <h3 className="text-xs font-extrabold text-zinc-400 uppercase tracking-widest pl-1">Próximas Recomendações</h3>
                                          <div className="space-y-2 max-h-[450px] overflow-y-auto no-scrollbar">
                                            {SIM_YOUTUBE_VIDEOS.filter(v => v.id !== activeVideo.id).map((v) => (
                                              <div 
                                                key={v.id}
                                                onClick={() => setYtActiveVideoId(v.id)}
                                                className="flex gap-2.5 hover:bg-zinc-900 p-1.5 rounded-lg cursor-pointer transition-colors group"
                                              >
                                                <div className={`w-28 shrink-0 aspect-video rounded-md overflow-hidden ${v.thumbnail} relative flex items-center justify-center text-lg`}>
                                                  <div className="absolute inset-0 bg-black/45 group-hover:bg-black/20 flex items-center justify-center">
                                                    <Play className="opacity-0 group-hover:opacity-100 transition-opacity fill-white text-white" size={14} />
                                                  </div>
                                                  {v.avatar}
                                                </div>
                                                <div className="flex-1 min-w-0">
                                                  <p className="font-bold text-xs text-white leading-tight line-clamp-2 group-hover:text-red-400 transition-colors">
                                                    {v.title}
                                                  </p>
                                                  <p className="text-[10px] text-zinc-400 mt-1">{v.channel}</p>
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
                                  /* Feed Grid View */
                                  <div>
                                    <div className="mb-5 text-left">
                                      <h2 className="text-base md:text-lg font-black text-white">Recomendações Seguras para Hoje</h2>
                                      <p className="text-xs text-zinc-400 mt-0.5">Clique em qualquer miniatura para assistir com o Media Player nativo de alta velocidade.</p>
                                    </div>

                                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                                      {SIM_YOUTUBE_VIDEOS.filter(video => 
                                        video.title.toLowerCase().includes(ytSearchQuery.toLowerCase()) || 
                                        video.channel.toLowerCase().includes(ytSearchQuery.toLowerCase())
                                      ).map((v) => (
                                        <div 
                                          key={v.id}
                                          onClick={() => setYtActiveVideoId(v.id)}
                                          className="cursor-pointer group flex flex-col gap-2 rounded-xl hover:bg-zinc-900/60 p-2.5 transition-all"
                                        >
                                          <div className={`aspect-video rounded-xl ${v.thumbnail} flex items-center justify-center text-3xl shadow-md relative overflow-hidden`}>
                                            <div className="absolute inset-0 bg-black/35 group-hover:bg-black/10 transition-colors flex items-center justify-center">
                                              <span className="w-9 h-9 bg-red-650 bg-red-600 rounded-full flex items-center justify-center text-white scale-90 group-hover:scale-100 transition-transform">
                                                <Play className="fill-white translate-x-0.5" size={12} />
                                              </span>
                                            </div>
                                            {v.avatar}
                                          </div>

                                          <div className="flex gap-2 text-left">
                                            <span className="w-8 h-8 rounded-full bg-zinc-800 text-sm flex items-center justify-center shrink-0">
                                              {v.avatar}
                                            </span>
                                            <div className="min-w-0">
                                              <h3 className="font-bold text-xs text-white line-clamp-2 leading-tight group-hover:text-red-400 transition-colors text-zinc-200">
                                                {v.title}
                                              </h3>
                                              <p className="text-[10px] text-zinc-400 mt-1">{v.channel}</p>
                                              <p className="text-[9px] text-zinc-500">{v.views} • {v.time}</p>
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

                        {/* 2. SECURITY POLICY / CORS HANDLER OVERLAY GATES */}
                        {isCORSBlocked(firefoxCurrentUrl) && !isYoutube(firefoxCurrentUrl) && (
                          <div className="absolute inset-0 z-40 flex flex-col items-center justify-center p-8 bg-[#1e1e2d] text-white text-center font-sans">
                            <div className="w-14 h-14 bg-orange-500/10 rounded-full flex items-center justify-center mb-4.5">
                              <Shield size={28} className="text-orange-500" />
                            </div>
                            <h2 className="text-base font-extrabold mb-2 text-white">Segurança de Frame do Firefox (Bloqueio CORS)</h2>
                            <p className="text-xs text-zinc-400 max-w-sm mb-6 leading-relaxed">
                              O endereço <strong>{firefoxCurrentUrl.replace('https://', '').replace('http://', '').split('/')[0]}</strong> restringe o encapsulamento externo via header <code>X-Frame-Options: SAMEORIGIN</code> para sua proteção física contra fraudes de interface.
                            </p>
                            
                            <div className="flex flex-col gap-2 w-full max-w-xs select-none">
                              <button 
                                onClick={() => window.open(firefoxCurrentUrl, '_blank')}
                                className="bg-orange-600 hover:bg-orange-700 text-white font-bold text-xs px-6 py-2.5 rounded-xl transition-all shadow-lg active:scale-95 flex items-center justify-center gap-2"
                              >
                                <span>Abrir no Firefox real original ↗</span>
                              </button>
                              <button 
                                onClick={() => navigateFirefox('https://www.google.com/search?igu=1')}
                                className="px-5 py-2 border border-zinc-700 hover:border-zinc-500 rounded-xl text-[11px] hover:bg-zinc-800 text-zinc-350 transition-colors"
                              >
                                Voltar ao Google Seguro
                              </button>
                            </div>
                          </div>
                        )}

                        {/* 3. PHYSICAL IFRAME FOR APPROVED SECURE DOMAINS */}
                        <iframe 
                          ref={firefoxIframeRef}
                          src={firefoxCurrentUrl} 
                          className={`w-full h-full border-none bg-white ${
                            isYoutube(firefoxCurrentUrl) || (isCORSBlocked(firefoxCurrentUrl) && !isYoutube(firefoxCurrentUrl))
                              ? 'hidden pointer-events-none'
                              : 'block'
                          }`}
                          title="Navegador de Internet Firefox"
                          referrerPolicy="no-referrer"
                          onLoad={stopLoadingFirefox}
                          sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts allow-storage-access-by-user-activation"
                          allow="autoplay; encrypted-media; picture-in-picture; clipboard-write; clipboard-read"
                          style={{ colorScheme: 'light' }}
                        />
                      </div>

                      {/* Toast Notification Popup */}
                    <AnimatePresence>
                      {firefoxToast.visible && (
                        <motion.div 
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: 20 }}
                          className="absolute bottom-6 right-6 bg-[#2a2a3a] border border-orange-500/50 px-4 py-2.5 rounded-lg shadow-2xl z-[60] flex items-center gap-2 text-xs text-white"
                        >
                          <Check size={14} className="text-green-500" />
                          <span>{firefoxToast.message}</span>
                        </motion.div>
                      )}
                    </AnimatePresence>

                    {/* Privacy Information Modal popup */}
                    <AnimatePresence>
                      {showFirefoxPrivacyModal && (
                        <motion.div 
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
                          className="absolute inset-0 z-[100] flex items-center justify-center bg-black/75 backdrop-blur-sm p-6"
                        >
                          <motion.div 
                            initial={{ scale: 0.9, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.9, opacity: 0 }}
                            className="bg-[#1e1e2a] border border-white/10 p-8 rounded-2xl max-w-sm shadow-2xl text-center"
                          >
                            <div className="w-14 h-14 bg-orange-600/10 rounded-full flex items-center justify-center mx-auto mb-5">
                              <Shield size={24} className="text-orange-500" />
                            </div>
                            <h3 className="text-lg font-bold text-white mb-3">Sobre privacidade</h3>
                            <p className="text-xs text-zinc-400 leading-relaxed mb-6">
                              O Navegador do simulador Ubuntu usa a tecnologia nativa de iframes segura. Seus favoritos são salvos apenas localmente em nosso contêiner e no localStorage da sua máquina sem nenhum envio para servidores externos!
                            </p>
                            <button 
                              onClick={() => setShowFirefoxPrivacyModal(false)}
                              className="w-full bg-orange-650 hover:bg-orange-700 text-white text-xs font-bold py-3 rounded-xl transition-all"
                            >
                              Entendi
                            </button>
                          </motion.div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                )}

                {/* 4b. TERMINAL UNIX SIMULATION CONTENT */}
                {win.id === 'terminal' && (
                  <div className="w-full h-full bg-[#2c0a21] text-[#dfdbd2] font-mono p-4 flex flex-col text-xs leading-relaxed select-text overflow-hidden">
                    <div className="flex-1 overflow-y-auto max-h-[calc(100%-36px)] no-scrollbar">
                      {terminalLines.map((line, i) => {
                        // 1. If it's a command submission prompt line
                        if (line.includes('ji@Resolute:~$')) {
                          const idx = line.indexOf('ji@Resolute:~$');
                          const prefix = line.substring(0, idx);
                          const cmd = line.substring(idx + 'ji@Resolute:~$'.length);
                          return (
                            <div key={i} className="whitespace-pre-wrap leading-normal">
                              {prefix}
                              <span className="text-[#34e2e2] font-bold">ji@Resolute</span>
                              <span className="text-white">:</span>
                              <span className="text-[#729fcf] font-bold">~</span>
                              <span className="text-white font-bold">$</span>
                              <span className="text-white font-mono font-medium">{cmd}</span>
                            </div>
                          );
                        }

                        // 2. If it's a dynamic fastfetch/neofetch line
                        if (line.includes('||')) {
                          const parts = line.split('||');
                          const logo = parts[0] || '';
                          const stats = parts[1] || '';
                          
                          let renderedStats = <span className="text-[#dfdbd2]">{stats}</span>;
                          if (stats) {
                            if (stats.includes(':')) {
                              const colonIdx = stats.indexOf(':');
                              const label = stats.substring(0, colonIdx);
                              const value = stats.substring(colonIdx);
                              renderedStats = (
                                <>
                                  <span className="text-[#ef2929] font-bold">{label}</span>
                                  <span className="text-[#dfdbd2]">{value}</span>
                                </>
                              );
                            } else if (stats.trim() === 'ji@Resolute') {
                              renderedStats = <span className="text-[#ef2929] font-bold">{stats.trim()}</span>;
                            } else if (stats.trim().startsWith('----')) {
                              renderedStats = <span className="text-[#dfdbd2]">{stats.trim()}</span>;
                            }
                          }

                          return (
                            <div key={i} className="flex whitespace-pre leading-tight">
                              <span className="text-[#ef2929] font-normal shrink-0">{logo}</span>
                              <span className="ml-4">{renderedStats}</span>
                            </div>
                          );
                        }

                        // Default line fallback
                        return (
                          <div key={i} className="whitespace-pre-wrap text-[#dfdbd2] leading-normal font-mono font-normal">
                            {line}
                          </div>
                        );
                      })}
                      <div ref={termEndRef} />
                    </div>
                    {/* Prompt input bar */}
                    <form onSubmit={handleCommandSubmit} className="flex items-center pt-1.5 border-t border-neutral-800/40 mt-1 shrink-0">
                      <span className="text-[#34e2e2] font-bold">ji@Resolute</span>
                      <span className="text-white">:</span>
                      <span className="text-[#729fcf] font-bold">~</span>
                      <span className="text-white font-bold mr-2">$</span>
                      <input 
                        type="text"
                        value={currentInput}
                        onChange={(e) => setCurrentInput(e.target.value)}
                        className="flex-1 bg-transparent border-none outline-none text-[#dfdbd2] font-mono font-medium focus:ring-0 p-0"
                        autoFocus
                        autoComplete="off"
                        spellCheck={false}
                      />
                    </form>
                  </div>
                )}
                {win.id === 'files' && (
                  <div className="w-full h-full flex flex-col bg-[#1C1C1C] text-white select-none">
                    
                    {/* Authentic Split GNOME Headerbar (Sidebar Header + Main Content Header) */}
                    <div className="flex h-12 border-b border-[#131313] shrink-0">
                      
                      {/* Left Header: Sidebar Header */}
                      <div 
                        onMouseDown={(e) => startDrag(win.id, e)}
                        onDoubleClick={(e) => maximizeWindow(win.id, e)}
                        className="w-52 border-r border-[#131313] flex items-center justify-between px-3 shrink-0 bg-[#212121] h-full"
                      >
                        {/* Left Search icon inside Left Header */}
                        <button 
                          onClick={() => {
                            setShowNautilusSearch(!showNautilusSearch);
                            if (showNautilusSearch) {
                              setNautilusSearchQuery('');
                            }
                          }}
                          className={`p-1.5 rounded-lg transition-colors ${showNautilusSearch ? 'bg-[#E95420] text-white font-bold' : 'text-zinc-400 hover:bg-white/10 hover:text-white'}`}
                          title="Pesquisar arquivos"
                        >
                          <Search size={14} />
                        </button>

                        <span className="text-xs font-bold text-zinc-300 tracking-wide select-none">Arquivos</span>

                        {/* Hamburger menu button on right of sidebar header */}
                        <button 
                          onClick={() => setShowNautilusMenu(!showNautilusMenu)}
                          className={`p-1.5 rounded-lg transition-colors ${showNautilusMenu ? 'bg-white/10 text-white' : 'text-zinc-450 hover:bg-white/10 hover:text-white'}`}
                          title="Opções"
                        >
                          <Menu size={14} />
                        </button>
                      </div>

                      {/* Right Header: Active folder actions, breadcrumbs, search, layout, and window controls */}
                      <div 
                        onMouseDown={(e) => startDrag(win.id, e)}
                        onDoubleClick={(e) => maximizeWindow(win.id, e)}
                        className="flex-1 flex items-center justify-between px-4 bg-[#1C1C1C] h-full"
                      >
                        {/* Navigation arrows and breadcrumbs pill */}
                        <div className="flex items-center gap-3">
                          {/* Navigation arrows: [ < ] [ > ] sitting close and distinct */}
                          <div className="flex items-center gap-1">
                            <button 
                              onClick={() => {
                                if (currentFolder !== 'Home') setCurrentFolder('Home');
                              }}
                              className={`p-1.5 rounded-lg transition-colors ${currentFolder === 'Home' ? 'opacity-20 cursor-not-allowed text-zinc-500' : 'text-zinc-200 hover:bg-white/10 hover:text-white'}`}
                              title="Voltar para a Pasta Pessoal"
                              disabled={currentFolder === 'Home'}
                            >
                              <ChevronLeft size={14} />
                            </button>
                            <button 
                              className="p-1.5 opacity-20 cursor-not-allowed rounded-lg text-zinc-500"
                              disabled
                              title="Avançar"
                            >
                              <ChevronRight size={14} />
                            </button>
                          </div>

                          {/* Beautiful integrated breadcrumbs pill: [ 🏠 Home  ⋮ ] */}
                          <div className="relative">
                            <button 
                              onClick={() => setShowNautilusMenu(!showNautilusMenu)} 
                              className="flex items-center justify-between bg-white/[0.08] hover:bg-white/[0.12] active:bg-white/[0.16] border border-white/5 pl-4 pr-3 py-1.5 rounded-lg text-xs font-bold text-zinc-200 transition-all shadow-sm shrink-0 cursor-pointer w-44 md:w-52"
                            >
                              <div className="flex items-center gap-2">
                                {currentFolder === 'Home' || currentFolder === 'Desktop' ? (
                                  <Home size={13} className="text-orange-500" />
                                ) : currentFolder === 'Recent' ? (
                                  <Clock size={13} className="text-zinc-400" />
                                ) : currentFolder === 'Starred' ? (
                                  <Star size={13} className="text-orange-400 fill-orange-400/10" />
                                ) : currentFolder === 'Trash' ? (
                                  <Trash2 size={13} className="text-zinc-400" />
                                ) : (
                                  <Folder size={13} className="text-amber-500" />
                                )}
                                <span>
                                  {currentFolder === 'Home' ? 'Home' : 
                                   currentFolder === 'Recent' ? 'Recentes' : 
                                   currentFolder === 'Starred' ? 'Favoritos' : 
                                   currentFolder === 'Trash' ? 'Lixeira' : 
                                   currentFolder === 'Desktop' ? 'Área de Trabalho' :
                                   currentFolder === 'Documents' ? 'Documentos' :
                                   currentFolder === 'Music' ? 'Música' :
                                   currentFolder === 'Pictures' ? 'Imagens' :
                                   currentFolder === 'Public' ? 'Público' :
                                   currentFolder === 'Templates' ? 'Modelos' :
                                   currentFolder === 'Videos' ? 'Vídeos' : currentFolder}
                                </span>
                              </div>
                              <MoreVertical size={13} className="text-zinc-400" />
                            </button>

                            {/* Nautilus Options Dropdown */}
                            {showNautilusMenu && (
                              <>
                                <div className="fixed inset-0 z-40" onClick={() => setShowNautilusMenu(false)} />
                                <div className="absolute left-0 mt-2 w-48 bg-[#2A2A2A] border border-white/5 rounded-xl shadow-2xl z-50 py-1.5 animate-fadeIn text-left">
                                  <button
                                    onClick={() => {
                                      setShowNautilusMenu(false);
                                      const folderName = prompt(isEn ? "Enter the name of the new folder:" : "Digite o nome da nova pasta:", isEn ? "New Folder" : "Nova Pasta");
                                      if (folderName) {
                                        setCustomDesktopFolders(prev => [...prev, folderName]);
                                        setScreenshotNotification(isEn 
                                          ? `Folder "${folderName}" created on Desktop.`
                                          : `Pasta "${folderName}" criada na Área de Trabalho.`);
                                        setTimeout(() => setScreenshotNotification(null), 3000);
                                      }
                                    }}
                                    className="w-full text-left text-xs px-4 py-2 hover:bg-[#353535] text-zinc-100 font-medium flex items-center gap-2 cursor-pointer transition-colors"
                                  >
                                    <NautilusFolderIcon type="folder" className="w-[14px] h-[14px] shrink-0 inline-block mr-1" /> Nova Pasta
                                  </button>
                                  
                                  <button
                                    onClick={() => {
                                      setShowNautilusMenu(false);
                                      const docName = prompt(isEn ? "Enter the name of the document:" : "Digite o nome do documento:", "documento.txt");
                                      if (docName) {
                                        setCustomDesktopFolders(prev => [...prev, docName]);
                                        setScreenshotNotification(isEn 
                                          ? `Document "${docName}" successfully generated.`
                                          : `Documento "${docName}" gerado com sucesso.`);
                                        setTimeout(() => setScreenshotNotification(null), 3050);
                                      }
                                    }}
                                    className="w-full text-left text-xs px-4 py-2 hover:bg-[#353535] text-zinc-100 font-medium flex items-center gap-2 cursor-pointer transition-colors"
                                  >
                                    <File size={13} className="text-zinc-400" /> Criar Documento
                                  </button>
                                  
                                  <button
                                    onClick={() => {
                                      setShowNautilusMenu(false);
                                      setNautilusViewMode(nautilusViewMode === 'grid' ? 'list' : 'grid');
                                    }}
                                    className="w-full text-left text-xs px-4 py-2 hover:bg-[#353535] text-zinc-100 font-medium flex items-center gap-2 cursor-pointer transition-colors border-t border-white/5"
                                  >
                                    {nautilusViewMode === 'grid' ? <List size={13} /> : <Grid size={13} />} 
                                    {nautilusViewMode === 'grid' ? "Ver como Lista" : "Ver como Grade"}
                                  </button>

                                  {currentFolder === 'Trash' && trashItems.length > 0 && (
                                    <button
                                      onClick={() => {
                                        setShowNautilusMenu(false);
                                        setTrashItems([]);
                                        setScreenshotNotification(isEn ? "Trash emptied successfully." : "Lixeira esvaziada com sucesso.");
                                        setTimeout(() => setScreenshotNotification(null), 3000);
                                      }}
                                      className="w-full text-left text-xs px-4 py-2 hover:bg-red-950/45 text-red-400 font-medium flex items-center gap-2 cursor-pointer transition-colors border-t border-white/5 font-semibold"
                                    >
                                      <Trash2 size={13} className="text-red-400" /> Esvaziar Lixeira
                                    </button>
                                  )}

                                  <div className="h-px bg-white/5 my-1" />

                                  <div className="px-4 py-1.5 text-[9px] uppercase tracking-wider font-bold text-zinc-400">
                                    Armazenamento
                                  </div>
                                  <div className="px-4 pb-1">
                                    <div className="h-1 bg-zinc-700 rounded-full overflow-hidden w-full">
                                      <div className="h-full bg-orange-600 rounded-full w-2/5" />
                                    </div>
                                    <span className="text-[10px] text-zinc-400 mt-1 block">42,5 GB livres de 100 GB</span>
                                  </div>
                                </div>
                              </>
                            )}
                          </div>
                        </div>

                        {/* Top bar tools (Search, View layout, options, more) & window controller */}
                        <div className="flex items-center gap-3">
                          {/* Search Button (Magnifying glass: [ 🔍 ]) */}
                          <button 
                            onClick={() => {
                              setShowNautilusSearch(!showNautilusSearch);
                              if (showNautilusSearch) {
                                setNautilusSearchQuery('');
                              }
                            }}
                            className={`p-1.5 rounded-lg transition-colors ${showNautilusSearch ? 'bg-[#E95420] text-white font-bold' : 'text-zinc-400 hover:bg-white/10 hover:text-white'}`}
                            title="Pesquisar arquivos"
                          >
                            <Search size={14} />
                          </button>

                          {/* View layout toggle button ([ ☰ ]) */}
                          <button 
                            onClick={() => setNautilusViewMode(nautilusViewMode === 'grid' ? 'list' : 'grid')}
                            className="p-1.5 hover:bg-white/10 text-zinc-400 hover:text-white rounded-lg transition-colors"
                            title={nautilusViewMode === 'grid' ? "Ver como Lista" : "Ver como Grade"}
                          >
                            <List size={14} className={nautilusViewMode === 'grid' ? "text-zinc-200" : "text-orange-500"} />
                          </button>

                          {/* Vertical divide line */}
                          <div className="w-px h-5 bg-white/10 border-l border-white/5 mx-1" />

                          {/* Menu / preferences options chevron button ([ ∨ ]) placed AFTER divide line */}
                          <button 
                            onClick={() => setShowNautilusMenu(!showNautilusMenu)}
                            className={`p-1.5 rounded-lg transition-colors ${showNautilusMenu ? 'bg-white/10 text-white' : 'text-zinc-450 hover:bg-white/10 hover:text-white'}`}
                            title="Opções"
                          >
                            <ChevronDown size={14} />
                          </button>

                          {/* Perfect Real Yaru-Dark Window Controls (Right style) */}
                          <div className="flex items-center gap-1.5">
                            <button 
                              onClick={(e) => {
                                e.stopPropagation();
                                minimizeWindow(win.id, e);
                              }}
                              className="w-5 h-5 rounded-full flex items-center justify-center bg-white/[0.08] hover:bg-white/[0.18] active:bg-white/[0.24] text-zinc-300 hover:text-white transition-colors"
                              title="Minimizar"
                            >
                              <Minus size={10} />
                            </button>
                            <button 
                              onClick={(e) => {
                                e.stopPropagation();
                                maximizeWindow(win.id, e);
                              }}
                              className="w-5 h-5 rounded-full flex items-center justify-center bg-white/[0.08] hover:bg-white/[0.18] active:bg-white/[0.24] text-zinc-300 hover:text-white transition-colors"
                              title="Maximizar"
                            >
                              <Square size={8} />
                            </button>
                            <button 
                              onClick={(e) => {
                                e.stopPropagation();
                                closeWindow(win.id, e);
                              }}
                              className="w-5 h-5 rounded-full flex items-center justify-center bg-white/[0.08] hover:bg-white/[0.18] active:bg-white/[0.24] text-zinc-300 hover:text-white transition-colors"
                              title="Fechar"
                            >
                              <X size={10} />
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Inline search input block */}
                    {showNautilusSearch && (
                      <div className="bg-[#242424] border-b border-[#131313] px-4 py-2.5 flex items-center gap-3 animate-fadeIn shrink-0">
                        <Search size={14} className="text-zinc-400 shrink-0" />
                        <input 
                          type="text"
                          value={nautilusSearchQuery}
                          onChange={(e) => setNautilusSearchQuery(e.target.value)}
                          placeholder="Pesquisar nos repositórios locais..."
                          className="flex-1 bg-transparent border-none text-xs text-white placeholder-zinc-500 focus:outline-none focus:ring-0 p-0 text-left cursor-text"
                          autoFocus
                        />
                        {nautilusSearchQuery && (
                          <button 
                            onClick={() => setNautilusSearchQuery('')}
                            className="text-zinc-400 hover:text-white text-xs px-1 hover:underline cursor-pointer font-bold"
                          >
                            Limpar
                          </button>
                        )}
                      </div>
                    )}

                    {/* Window split pane (sidebar + workspace grid) */}
                    <div className="flex-1 flex overflow-hidden">
                      {/* Left Sidebar sidebar styling */}
                      <div className="w-52 bg-[#212121] border-r border-[#131313] p-2 flex flex-col gap-0.5 text-xs text-left overflow-y-auto shrink-0 select-none">
                        
                        {/* Base system quick navigation links */}
                        <button 
                          onClick={() => {
                            setCurrentFolder('Home');
                            setNautilusSearchQuery('');
                          }}
                          className={`w-full flex items-center gap-2.5 px-3 py-1.5 rounded-lg transition-colors ${
                            currentFolder === 'Home' 
                              ? 'bg-white/10 text-white font-bold' 
                              : 'text-zinc-300 hover:bg-white/5 hover:text-white'
                          }`}
                        >
                          <Home size={14} className={currentFolder === 'Home' ? 'text-orange-500' : 'text-zinc-400'} />
                          <span>Pasta Pessoal</span>
                        </button>

                        <button 
                          onClick={() => {
                            setCurrentFolder('Recent');
                            setNautilusSearchQuery('');
                          }}
                          className={`w-full flex items-center gap-2.5 px-3 py-1.5 rounded-lg transition-colors ${
                            currentFolder === 'Recent' 
                              ? 'bg-white/10 text-white font-bold' 
                              : 'text-zinc-300 hover:bg-white/5 hover:text-white'
                          }`}
                        >
                          <Clock size={14} className="text-zinc-400" />
                          <span>Recentes</span>
                        </button>

                        <button 
                          onClick={() => {
                            setCurrentFolder('Starred');
                            setNautilusSearchQuery('');
                          }}
                          className={`w-full flex items-center gap-2.5 px-3 py-1.5 rounded-lg transition-colors ${
                            currentFolder === 'Starred' 
                              ? 'bg-white/10 text-white font-bold' 
                              : 'text-zinc-300 hover:bg-white/5 hover:text-white'
                          }`}
                        >
                          <Star size={14} className={currentFolder === 'Starred' ? 'text-orange-400 fill-orange-400/20' : 'text-zinc-400'} />
                          <span>Favoritos</span>
                        </button>

                        <button 
                          onClick={() => {
                            setCurrentFolder('Other Locations');
                            setNautilusSearchQuery('');
                            setScreenshotNotification(isEn ? "Connected to the simulated network infrastructure." : "Conectado à infraestrutura de rede simulada.");
                            setTimeout(() => setScreenshotNotification(null), 2500);
                          }}
                          className={`w-full flex items-center gap-2.5 px-3 py-1.5 rounded-lg transition-colors ${
                            currentFolder === 'Other Locations' 
                              ? 'bg-white/10 text-white font-bold' 
                              : 'text-zinc-300 hover:bg-white/5 hover:text-white'
                          }`}
                        >
                          <Globe size={14} className="text-zinc-400" />
                          <span>Rede</span>
                        </button>

                        <button 
                          onClick={() => {
                            setCurrentFolder('Trash');
                            setNautilusSearchQuery('');
                          }}
                          className={`w-full flex items-center gap-2.5 px-3 py-1.5 rounded-lg transition-colors ${
                            currentFolder === 'Trash' 
                              ? 'bg-white/10 text-white font-bold' 
                              : 'text-zinc-300 hover:bg-white/5 hover:text-white'
                          }`}
                        >
                          <Trash2 size={14} className={trashItems.length > 0 ? 'text-orange-500 fill-orange-500/10' : 'text-zinc-400'} />
                          <span>Lixeira</span>
                        </button>

                        {/* Thin divide divider line */}
                        <div className="h-px bg-white/5 my-1.5 mx-1" />

                        {/* Standard Bookmarks listed in precise design of Yaru shell */}
                        {[
                          { id: 'Documents', name: 'Documentos', type: 'documents', icon: <File size={14} className="text-zinc-400" /> },
                          { id: 'Music', name: 'Música', type: 'music', icon: <Music size={14} className="text-zinc-400" /> },
                          { id: 'Pictures', name: 'Imagens', type: 'pictures', icon: <Image size={14} className="text-zinc-400" /> },
                          { id: 'Videos', name: 'Vídeos', type: 'videos', icon: <Film size={14} className="text-zinc-400" /> },
                          { id: 'Downloads', name: 'Downloads', type: 'downloads', icon: <Download size={14} className="text-zinc-400" /> },
                        ].map((item) => (
                          <button 
                            key={item.id}
                            onClick={() => {
                              setCurrentFolder(item.id);
                              setNautilusSearchQuery('');
                            }}
                            className={`w-full flex items-center gap-2.5 px-3 py-1.5 rounded-lg transition-colors ${
                              currentFolder === item.id 
                                ? 'bg-white/10 text-white font-bold' 
                                : 'text-zinc-300 hover:bg-white/5 hover:text-white'
                            }`}
                          >
                            {item.icon}
                            <span>{item.name}</span>
                          </button>
                        ))}
                      </div>

                      {/* Right side active folder workspace */}
                      <div className="flex-1 bg-[#1C1C1C] p-6 text-left overflow-y-auto">
                        
                        {/* Nautilus Active File Search Engine Overlay */}
                        {nautilusSearchQuery.trim() !== '' ? (
                          <div className="space-y-4 animate-fadeIn">
                            <div className="pb-2 border-b border-white/5 flex items-center justify-between">
                              <h6 className="text-[11px] uppercase tracking-wider font-bold text-zinc-400">
                                Resultados da Busca por "{nautilusSearchQuery}"
                              </h6>
                              <button 
                                onClick={() => setNautilusSearchQuery('')}
                                className="text-[10px] text-orange-500 hover:underline font-bold"
                              >
                                Limpar Busca
                              </button>
                            </div>
                            
                            {(() => {
                              const simulatedFilesDataset = [
                                { name: 'Área de Trabalho', target: 'Desktop', type: 'Pasta', icon: 'desktop', size: 'Pasta de sistema' },
                                { name: 'Documentos', target: 'Documents', type: 'Pasta', icon: 'documents', size: 'Pasta de sistema' },
                                { name: 'Downloads', target: 'Downloads', type: 'Pasta', icon: 'downloads', size: 'Pasta de sistema' },
                                { name: 'Música', target: 'Music', type: 'Pasta', icon: 'music', size: 'Pasta de sistema' },
                                { name: 'Imagens', target: 'Pictures', type: 'Pasta', icon: 'pictures', size: 'Pasta de sistema' },
                                { name: 'Público', target: 'Public', type: 'Pasta', icon: 'public', size: 'Pasta de sistema' },
                                { name: 'Modelos', target: 'Templates', type: 'Pasta', icon: 'templates', size: 'Pasta de sistema' },
                                { name: 'Vídeos', target: 'Videos', type: 'Pasta', icon: 'videos', size: 'Pasta de sistema' }
                              ];
                              const filtered = simulatedFilesDataset.filter(item => 
                                item.name.toLowerCase().includes(nautilusSearchQuery.toLowerCase()) ||
                                item.type.toLowerCase().includes(nautilusSearchQuery.toLowerCase())
                              );
                              
                              if (filtered.length === 0) {
                                return (
                                  <div className="flex flex-col items-center justify-center py-12 text-zinc-500 text-center gap-2">
                                    <Search size={28} className="opacity-50" />
                                    <span className="text-sm font-semibold text-zinc-300">Nenhum resultado encontrado</span>
                                    <span className="text-xs text-zinc-400">Tente buscar termos como "Documentos", "wallpaper", ou "odt".</span>
                                  </div>
                                );
                              }
                              
                              return (
                                <div className="flex flex-col border border-white/5 rounded-xl overflow-hidden bg-black/10">
                                  <div className="grid grid-cols-3 px-4 py-2.5 bg-neutral-900/30 text-[10px] uppercase font-bold tracking-wider text-zinc-400 border-b border-white/5">
                                    <span>Nome</span>
                                    <span>Tipo</span>
                                    <span>Tamanho</span>
                                  </div>
                                  {filtered.map((item, idx) => (
                                    <div 
                                      key={idx}
                                      onClick={() => {
                                        setCurrentFolder(item.target);
                                        setNautilusSearchQuery('');
                                      }}
                                      className="grid grid-cols-3 items-center px-4 py-3 hover:bg-white/5 border-b border-white/5 text-xs text-zinc-100 cursor-pointer transition-colors group"
                                      title="Clique para ir até a pasta"
                                    >
                                      <span className="flex items-center gap-2 font-medium truncate pr-2 group-hover:text-orange-400 transition-colors">
                                        {item.icon === 'file' ? <File size={16} className="text-neutral-400" /> : <NautilusFolderIcon type={item.icon as any} className="w-5 h-5 shrink-0" />}
                                        {item.name}
                                      </span>
                                      <span className="text-zinc-400 font-medium">{item.type}</span>
                                      <span className="text-zinc-500 font-mono text-[11px]">{item.size}</span>
                                    </div>
                                  ))}
                                </div>
                              );
                            })()}
                          </div>
                        ) : (
                          <>
                             {/* 1. HOME DIRECTORY VIEW - supports both high-fidelity Grid and List visual layouts */}
                             {currentFolder === 'Home' && (
                               <>
                                 {nautilusViewMode === 'grid' ? (
                                   <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-4 gap-6 animate-fadeIn">
                                     {[
                                       { name: 'Área de Trabalho', id: 'Desktop', type: 'desktop' },
                                       { name: 'Documentos', id: 'Documents', type: 'documents' },
                                       { name: 'Downloads', id: 'Downloads', type: 'downloads' },
                                       { name: 'Música', id: 'Music', type: 'music' },
                                       { name: 'Imagens', id: 'Pictures', type: 'pictures' },
                                       { name: 'Público', id: 'Public', type: 'public' },
                                       { name: 'Modelos', id: 'Templates', type: 'templates' },
                                       { name: 'Vídeos', id: 'Videos', type: 'videos' },
                                       { name: 'snap', id: 'snap', type: 'folder' },
                                     ].map((folder) => (
                                       <button 
                                         key={folder.id}
                                         onClick={() => setCurrentFolder(folder.id)}
                                         className="flex flex-col items-center gap-2.5 p-3 hover:bg-white/5 rounded-xl transition-colors text-center group border border-transparent hover:border-white/10"
                                       >
                                         <NautilusFolderIcon type={folder.type as any} className="group-hover:scale-105 transition-transform" />
                                         <span className="text-xs text-zinc-100 font-medium truncate w-full">{folder.name}</span>
                                       </button>
                                     ))}
                                   </div>
                                 ) : (
                                   <div className="flex flex-col border border-white/5 rounded-xl overflow-hidden bg-black/10 animate-fadeIn">
                                     <div className="grid grid-cols-3 px-4 py-2.5 bg-neutral-900/30 text-[10px] uppercase font-bold tracking-wider text-zinc-400 border-b border-white/5">
                                       <span>Nome</span>
                                       <span>Tamanho</span>
                                       <span>Modificado</span>
                                     </div>
                                     {[
                                       { name: 'Área de Trabalho', id: 'Desktop', type: 'desktop', size: 'Vazia', modified: 'Hoje' },
                                       { name: 'Documentos', id: 'Documents', type: 'documents', size: 'Vazia', modified: 'Hoje' },
                                       { name: 'Downloads', id: 'Downloads', type: 'downloads', size: 'Vazia', modified: 'Ontem' },
                                       { name: 'Música', id: 'Music', type: 'music', size: 'Vazia', modified: 'Hoje' },
                                       { name: 'Imagens', id: 'Pictures', type: 'pictures', size: 'Vazia', modified: 'Hoje' },
                                       { name: 'Público', id: 'Public', type: 'public', size: 'Vazia', modified: 'Semana passada' },
                                       { name: 'Modelos', id: 'Templates', type: 'templates', size: 'Vazia', modified: 'Semana passada' },
                                       { name: 'Vídeos', id: 'Videos', type: 'videos', size: 'Vazia', modified: 'Ontem' },
                                       { name: 'snap', id: 'snap', type: 'folder', size: 'Vazia', modified: 'Semana passada' },
                                     ].map((folder) => (
                                       <div 
                                         key={folder.id}
                                         onClick={() => setCurrentFolder(folder.id)}
                                         className="grid grid-cols-3 items-center px-4 py-3 hover:bg-white/5 border-b border-white/5 text-xs text-zinc-100 cursor-pointer transition-colors"
                                       >
                                         <span className="flex items-center gap-2 font-semibold truncate pr-2">
                                           <NautilusFolderIcon type={folder.type as any} className="w-5 h-5 shrink-0" />
                                           {folder.name}
                                         </span>
                                         <span className="text-zinc-400 text-[11px] font-mono">{folder.size}</span>
                                         <span className="text-zinc-400">{folder.modified}</span>
                                       </div>
                                     ))}
                                   </div>
                                 )}
                               </>
                             )}

                        {/* Custom: SNAP DIRECTORY FOR DEBIAN/UBUNTU CONGRUENCE */}
                        {currentFolder === 'snap' && (
                          <div className="flex flex-col items-center justify-center p-8 text-center text-zinc-500 space-y-3 mt-10 animate-fadeIn">
                            <NautilusFolderIcon type="folder" className="opacity-45" />
                            <h6 className="text-sm font-semibold text-zinc-300">Pasta Vazia</h6>
                            <p className="text-xs text-zinc-400 font-light">Nenhum pacote snap instalado neste diretório.</p>
                          </div>
                        )}

                        {/* 2. RECENT */}
                        {currentFolder === 'Recent' && (
                          <div className="flex flex-col items-center justify-center p-8 text-center text-zinc-500 space-y-3 mt-10 animate-fadeIn">
                            <Clock size={34} className="text-zinc-600 opacity-60" />
                            <h6 className="text-sm font-semibold text-zinc-300">Nenhum Arquivo Recente</h6>
                            <p className="text-xs text-zinc-400 font-light">Seus arquivos acessados recentemente aparecerão aqui.</p>
                          </div>
                        )}

                        {/* 3. STARRED */}
                        {currentFolder === 'Starred' && (
                          <div className="flex flex-col items-center justify-center p-8 text-center text-zinc-500 space-y-3 mt-10">
                            <Star size={34} className="text-orange-500 fill-orange-500 opacity-60" />
                            <h6 className="text-sm font-semibold text-zinc-300 font-bold">Itens Favoritados</h6>
                            <p className="text-xs max-w-sm text-zinc-400 leading-relaxed font-light">As pastas ou arquivos marcados como favoritos no sistema operacional simulado aparecerão aqui para acesso rápido.</p>
                          </div>
                        )}

                        {/* 4. DESKTOP SHORTCUTS & SYSTEM LAUNCHERS */}
                        {currentFolder === 'Desktop' && (
                          <div className="flex flex-col items-center justify-center p-8 text-center text-zinc-500 space-y-3 mt-10 animate-fadeIn">
                            <NautilusFolderIcon type="desktop" className="opacity-45" />
                            <h6 className="text-sm font-semibold text-zinc-300">Pasta Vazia</h6>
                            <p className="text-xs text-zinc-400 font-light">Nenhum item na Área de Trabalho.</p>
                          </div>
                        )}

                        {/* 5. DOCUMENTS */}
                        {currentFolder === 'Documents' && (
                          <div className="flex flex-col items-center justify-center p-8 text-center text-zinc-500 space-y-3 mt-10 animate-fadeIn">
                            <File size={34} className="text-zinc-600 opacity-60" />
                            <h6 className="text-sm font-semibold text-zinc-300">Pasta Vazia</h6>
                            <p className="text-xs text-zinc-400 font-light">Nenhum documento encontrado nesta pasta.</p>
                          </div>
                        )}

                        {/* 6. DOWNLOADS */}
                        {currentFolder === 'Downloads' && (
                          <div className="flex flex-col items-center justify-center p-8 text-center text-zinc-500 space-y-3 mt-10">
                            <NautilusFolderIcon type="downloads" className="opacity-45" />
                            <h6 className="text-sm font-semibold text-zinc-300">Pasta Limpa</h6>
                            <p className="text-xs text-zinc-400 font-light">Não há arquivos baixados recentemente nesta simulação.</p>
                          </div>
                        )}

                        {/* 7. MUSIC & PLAYBACK */}
                        {currentFolder === 'Music' && (
                          <div className="flex flex-col items-center justify-center p-8 text-center text-zinc-500 space-y-3 mt-10 animate-fadeIn">
                            <NautilusFolderIcon type="music" className="opacity-45" />
                            <h6 className="text-sm font-semibold text-zinc-300">Pasta Vazia</h6>
                            <p className="text-xs text-zinc-400 font-light">Nenhuma canção ou arquivo de áudio encontrado.</p>
                          </div>
                        )}

                        {/* 8. PICTURES & WALLPAPER CHANGING */}
                        {currentFolder === 'Pictures' && (
                          <div className="flex flex-col items-center justify-center p-8 text-center text-zinc-500 space-y-3 mt-10 animate-fadeIn">
                            <NautilusFolderIcon type="pictures" className="opacity-45" />
                            <h6 className="text-sm font-semibold text-zinc-300">Pasta Vazia</h6>
                            <p className="text-xs text-zinc-400 font-light">Nenhum papel de parede ou imagem disponível nesta pasta.</p>
                          </div>
                        )}

                        {/* 9. VIDEOS */}
                        {currentFolder === 'Videos' && (
                          <div className="flex flex-col items-center justify-center p-8 text-center text-zinc-500 space-y-3 mt-10">
                            <NautilusFolderIcon type="videos" className="opacity-45" />
                            <h6 className="text-sm font-semibold text-zinc-300">Sem mídias digitais</h6>
                            <p className="text-xs text-zinc-400 font-medium">Não há clipes de vídeo adicionados no sistema.</p>
                          </div>
                        )}

                        {/* 10. PUBLIC */}
                        {currentFolder === 'Public' && (
                          <div className="flex flex-col items-center justify-center p-8 text-center text-zinc-500 space-y-3 mt-10 animate-fadeIn">
                            <NautilusFolderIcon type="public" className="opacity-45" />
                            <h6 className="text-sm font-semibold text-zinc-300">Pasta Vazia</h6>
                            <p className="text-xs text-zinc-400 font-light">Nenhum arquivo compartilhado publicamente.</p>
                          </div>
                        )}

                        {/* 11. TEMPLATES */}
                        {currentFolder === 'Templates' && (
                          <div className="flex flex-col items-center justify-center p-8 text-center text-zinc-500 space-y-3 mt-10 animate-fadeIn">
                            <NautilusFolderIcon type="templates" className="opacity-45" />
                            <h6 className="text-sm font-semibold text-zinc-300">Pasta Vazia</h6>
                            <p className="text-xs text-zinc-400 font-light">Nenhum modelo de arquivo disponível.</p>
                          </div>
                        )}

                        {/* 12. TRASH */}
                        {currentFolder === 'Trash' && (
                          <div className="space-y-4 animate-fadeIn">
                            <div className="flex items-center justify-between pb-2 border-b border-white/5">
                              <h6 className="text-[11px] uppercase tracking-wider font-bold text-zinc-400 flex items-center gap-1.5">
                                <Trash2 size={12} /> Arquivos Deletados ({trashItems.length})
                              </h6>
                              {trashItems.length > 0 && (
                                <button
                                  onClick={() => {
                                    setTrashItems([]);
                                    setScreenshotNotification(isEn ? "Trash emptied successfully." : "Lixeira esvaziada com sucesso.");
                                    setTimeout(() => setScreenshotNotification(null), 3000);
                                  }}
                                  className="text-[10px] uppercase font-bold text-red-500 hover:text-red-400 hover:underline transition-colors cursor-pointer"
                                >
                                  Esvaziar Lixeira
                                </button>
                              )}
                            </div>

                            {trashItems.length === 0 ? (
                              <div className="flex flex-col items-center justify-center p-8 text-center text-zinc-500 space-y-3 mt-10">
                                <img 
                                  src="/assets/user-trash.png" 
                                  alt="" 
                                  className="w-16 h-16 object-contain opacity-65 hover:scale-105 transition-transform" 
                                  referrerPolicy="no-referrer"
                                />
                                <h6 className="text-sm font-semibold text-zinc-300 font-bold">Lixeira Vazia</h6>
                                <p className="text-xs text-zinc-400 font-light">Sua lixeira está limpa.</p>
                              </div>
                            ) : (
                              <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-4 gap-6">
                                {trashItems.map((file, idx) => (
                                  <div 
                                    key={idx}
                                    className="flex flex-col items-center gap-2.5 p-3 hover:bg-white/5 rounded-xl transition-colors text-center group border border-transparent hover:border-white/10 select-none cursor-pointer"
                                    title={`Arquivo na Lixeira: ${file}`}
                                  >
                                    <File size={36} className="text-neutral-400 opacity-75" />
                                    <span className="text-xs text-zinc-200 font-medium truncate w-full" style={{ textDecoration: 'line-through' }}>{file}</span>
                                    <button 
                                      onClick={(e) => {
                                        e.stopPropagation();
                                        setTrashItems(prev => prev.filter((_, i) => i !== idx));
                                        setCustomDesktopFolders(prev => [...prev, file]);
                                        setScreenshotNotification(isEn ? `"${file}" restored to Desktop.` : `"${file}" restaurado para a Área de Trabalho.`);
                                        setTimeout(() => setScreenshotNotification(null), 4000);
                                      }}
                                      className="text-[10px] text-[#e95420] hover:underline font-bold mt-1"
                                    >
                                      Restaurar
                                    </button>
                                  </div>
                                ))}
                              </div>
                            )}
                          </div>
                        )}

                        {/* 13. OTHER LOCATIONS */}
                        {currentFolder === 'Other Locations' && (
                          <div className="space-y-4">
                            <h6 className="text-[11px] uppercase tracking-wider font-bold text-zinc-400">Sistemas e Dispositivos de Rede:</h6>
                            <div className="p-4 bg-neutral-900/40 border border-neutral-800 rounded-xl space-y-3">
                              <div className="flex items-center justify-between text-xs pb-2 border-b border-white/5">
                                <span className="font-semibold text-zinc-100 flex items-center gap-2">
                                  <HardDrive size={15} className="text-neutral-400" /> Armazenamento do S.O. (256 GB NVMe)
                                </span>
                                <span className="text-neutral-400">125 GB livres</span>
                              </div>
                              <div className="flex items-center justify-between text-xs">
                                <span className="font-semibold text-zinc-100 flex items-center gap-2">
                                  <Globe size={15} className="text-neutral-400" /> Servidor Web meulinux.com
                                </span>
                                <span className="text-green-500 font-bold">● Conectado</span>
                              </div>
                            </div>
                          </div>
                        )}

                          </>
                        )}
                      </div>
                    </div>
                  </div>
                )}

                {/* 4d. CALCULATOR GRAPHIC SIMULATION CONTENT */}
                {win.id === 'calculator' && (
                  <div className="w-full h-full bg-[#111111] text-white flex flex-col p-6 space-y-5 font-mono">
                    <div className="bg-[#222] border border-white/10 rounded-xl p-4 text-right text-3xl font-bold truncate h-16 flex items-center justify-end">
                      {calcDisplay}
                    </div>
                    
                    <div className="grid grid-cols-4 gap-3 flex-1 text-lg font-bold">
                      {['C', '/', '*', '-'].map((c) => (
                        <button 
                          key={c}
                          onClick={() => calcPress(c)}
                          className="bg-zinc-800 hover:bg-zinc-700/80 rounded-xl p-3 text-orange-500 text-center transition-colors"
                        >
                          {c}
                        </button>
                      ))}
                      {['7', '8', '9', '+'].map((c) => (
                        <button 
                          key={c}
                          onClick={() => calcPress(c)}
                          className={`${c === '+' ? 'bg-zinc-800 text-orange-500' : 'bg-zinc-900'} hover:bg-zinc-700/80 rounded-xl p-3 text-center transition-colors`}
                        >
                          {c}
                        </button>
                      ))}
                      {['4', '5', '6', '='].map((c) => (
                        <button 
                          key={c}
                          onClick={() => calcPress(c)}
                          className={`${c === '=' ? 'row-span-2 bg-orange-600 text-white' : 'bg-zinc-900'} hover:bg-zinc-700/80 rounded-xl p-3 text-center transition-colors`}
                        >
                          {c}
                        </button>
                      ))}
                      {['1', '2', '3'].map((c) => (
                        <button 
                          key={c}
                          onClick={() => calcPress(c)}
                          className="bg-zinc-900 hover:bg-zinc-700/80 rounded-xl p-3 text-center transition-colors"
                        >
                          {c}
                        </button>
                      ))}
                      <button 
                        onClick={() => calcPress('0')}
                        className="col-span-2 bg-zinc-900 hover:bg-zinc-700/80 rounded-xl p-3 text-center transition-colors"
                      >
                        0
                      </button>
                      <button 
                        onClick={() => calcPress('.')}
                        className="bg-zinc-900 hover:bg-zinc-700/80 rounded-xl p-3 text-center transition-colors"
                      >
                        .
                      </button>
                    </div>
                  </div>
                )}

                {/* 4e. SYSTEM SETTINGS PANELS */}
                {win.id === 'settings' && (
                  <div className="w-full h-full flex bg-[#1E1E1E] text-white">
                    {/* Settings Sidebar */}
                    <div className="w-48 bg-[#1A1A1A] border-r border-neutral-800 p-3 space-y-1.5 text-xs text-left shrink-0">
                      <div className="text-[10px] text-zinc-500 uppercase font-bold px-2.5 pb-2">Configurações</div>
                      
                      <button 
                        onClick={() => setSettingsActiveTab('appearance')}
                        className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-left text-xs ${
                          settingsActiveTab === 'appearance' ? 'bg-[#e95420]/20 text-orange-400 font-bold' : 'text-zinc-400 hover:bg-white/5'
                        }`}
                      >
                        <Monitor size={15} />
                        <span>Aparência</span>
                      </button>

                      <button 
                        onClick={() => setSettingsActiveTab('desktop-icons')}
                        className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-left text-xs ${
                          settingsActiveTab === 'desktop-icons' ? 'bg-[#e95420]/20 text-orange-400 font-bold' : 'text-zinc-400 hover:bg-white/5'
                        }`}
                      >
                        <Grid size={15} />
                        <span>Área de Trabalho</span>
                      </button>

                      <button 
                        onClick={() => setSettingsActiveTab('display')}
                        className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-left text-xs ${
                          settingsActiveTab === 'display' ? 'bg-[#e95420]/20 text-orange-400 font-bold' : 'text-zinc-400 hover:bg-white/5'
                        }`}
                      >
                        <Monitor size={15} />
                        <span>Telas & Resolução</span>
                      </button>
                      
                      <div className="h-px bg-neutral-800 my-2" />

                      <button 
                        className="w-full flex items-center gap-2.5 px-3 py-2 opacity-50 rounded-lg text-left text-zinc-500 cursor-not-allowed text-xs"
                        disabled
                        title="Em Breve"
                      >
                        <Wifi size={15} />
                        <span>Rede & Wifi</span>
                      </button>

                      <button 
                        className="w-full flex items-center gap-2.5 px-3 py-2 opacity-50 rounded-lg text-left text-zinc-500 cursor-not-allowed text-xs"
                        disabled
                        title="Em Breve"
                      >
                        <SettingsIcon size={15} />
                        <span>Sobre o Sistema</span>
                      </button>
                    </div>

                    {/* Settings panels render */}
                    <div className="flex-1 bg-[#151515] p-6 text-left space-y-6 overflow-y-auto">
                      {settingsActiveTab === 'appearance' && (
                        <>
                          <div>
                            <h4 className="text-lg font-bold">Aparência do Sistema</h4>
                            <p className="text-xs text-zinc-500">Altere o comportamento visual, papéis de parede e temas do ecossistema Ubuntu 26.04.</p>
                          </div>

                          {/* Theme toggle styles */}
                          <div className="space-y-3">
                            <h6 className="text-[11px] uppercase tracking-wider font-bold text-zinc-400">Estilo Geral (Dark/Light)</h6>
                            <div className="flex gap-4">
                              <button 
                                onClick={() => setDarkStyle(false)}
                                className={`flex-1 p-4 border rounded-xl flex flex-col items-center gap-2 ${!darkStyle ? 'border-orange-600 bg-[#E6E6E6] text-zinc-900' : 'border-zinc-800 bg-[#222]'}`}
                              >
                                <Sun size={20} className={!darkStyle ? "text-orange-655" : "text-gray-400"} />
                                <span className="text-xs font-bold">Estilo Claro</span>
                              </button>

                              <button 
                                onClick={() => setDarkStyle(true)}
                                className={`flex-1 p-4 border rounded-xl flex flex-col items-center gap-2 ${darkStyle ? 'border-orange-600 bg-zinc-900' : 'border-zinc-300 bg-white text-zinc-650'}`}
                              >
                                <Moon size={20} className="text-orange-500" />
                                <span className="text-xs font-bold">Estilo Escuro</span>
                              </button>
                            </div>
                          </div>

                          {/* Wallpaper preview option settings */}
                          <div className="space-y-3">
                            <h6 className="text-[11px] uppercase tracking-wider font-bold text-zinc-400">Papel de Parede Ativo</h6>
                            <div className="grid grid-cols-2 gap-3">
                              {wallList.map((wall, i) => (
                                <button 
                                  key={i}
                                  onClick={() => setWallpaper(wall.url)}
                                  className={`flex items-center gap-3 p-2 rounded-xl bg-neutral-900 hover:bg-neutral-800 border ${wallpaper === wall.url ? 'border-orange-600' : 'border-neutral-800'}`}
                                >
                                  {wall.url.endsWith('.mp4') ? (
                                    <video src={wall.url} className="w-12 h-8 rounded object-cover" muted loop autoPlay playsInline />
                                  ) : (
                                    <img src={wall.url} alt="" className="w-12 h-8 rounded object-cover" referrerPolicy="no-referrer" />
                                  )}
                                  <span className="text-xs font-bold truncate">{wall.name}</span>
                                </button>
                              ))}
                            </div>
                          </div>
                        </>
                      )}

                      {settingsActiveTab === 'desktop-icons' && (
                        <>
                          <div>
                            <h4 className="text-lg font-bold">Configurações de Ícones</h4>
                            <p className="text-xs text-zinc-500">Ajuste como os elementos são exibidos na sua área de trabalho de forma simulada.</p>
                          </div>
                          
                          <div className="space-y-4">
                            <div className="flex items-center justify-between p-3.5 bg-neutral-900 rounded-xl border border-neutral-800">
                              <div>
                                <h6 className="text-xs font-bold text-white">Mostrar Lixeira na área de trabalho</h6>
                                <p className="text-[10px] text-zinc-500 mt-0.5 font-light">Mostra ou esconde o atalho para arquivos deletados.</p>
                              </div>
                              <input type="checkbox" defaultChecked className="accent-orange-600 cursor-pointer" />
                            </div>
                            
                            <div className="flex items-center justify-between p-3.5 bg-neutral-900 rounded-xl border border-neutral-800">
                              <div>
                                <h6 className="text-xs font-bold text-white">Mostrar Pasta Pessoal</h6>
                                <p className="text-[10px] text-zinc-500 mt-0.5 font-light">Atalho rápido para todos os seus arquivos pessoais (/home/usuario).</p>
                              </div>
                              <input type="checkbox" defaultChecked className="accent-orange-600 cursor-pointer" />
                            </div>

                            <div className="p-3.5 bg-neutral-900 rounded-xl border border-neutral-800 space-y-2">
                              <h6 className="text-xs font-bold text-white">Tamanho dos Ícones na Área de Trabalho</h6>
                              <div className="flex gap-2">
                                <button className="px-3 py-1 bg-orange-600/20 text-orange-500 text-[10px] font-bold border border-orange-500/35 rounded-lg">Pequeno</button>
                                <button className="px-3 py-1 bg-neutral-800 hover:bg-neutral-700 text-neutral-300 text-[10px] rounded-lg transition-colors">Normal (Médio)</button>
                                <button className="px-3 py-1 bg-neutral-800 hover:bg-neutral-700 text-neutral-300 text-[10px] rounded-lg transition-colors">Grande</button>
                              </div>
                            </div>
                          </div>
                        </>
                      )}

                      {settingsActiveTab === 'display' && (
                        <>
                          <div>
                            <h4 className="text-lg font-bold">Configurações de Exibição / Telas</h4>
                            <p className="text-xs text-zinc-500">Gerencie a resolução espacial, orientação física e taxa de atualização do seu monitor.</p>
                          </div>

                          <div className="space-y-4">
                            <div className="flex items-center justify-between p-3.5 bg-neutral-900 rounded-xl border border-neutral-800">
                              <div>
                                <h6 className="text-xs font-bold text-white">Resolução de Tela</h6>
                                <p className="text-[10px] text-zinc-500 mt-0.5 font-light">Pixels de largura por altura e proporção da tela.</p>
                              </div>
                              <select className="bg-neutral-800 text-xs px-2.5 py-1.5 rounded-lg border border-neutral-700 font-semibold outline-none focus:border-orange-500">
                                <option>1920 x 1080 (16:9)</option>
                                <option>1366 x 768 (16:9)</option>
                                <option>1280 x 800 (16:10)</option>
                                <option>1024 x 768 (4:3)</option>
                              </select>
                            </div>
                            
                            <div className="flex items-center justify-between p-3.5 bg-neutral-900 rounded-xl border border-neutral-800">
                              <div>
                                <h6 className="text-xs font-bold text-white">Taxa de Atualização</h6>
                                <p className="text-[10px] text-zinc-500 mt-0.5 font-light font-sans">Frequência com que o monitor redesenha as imagens.</p>
                              </div>
                              <select className="bg-neutral-800 text-xs px-2.5 py-1.5 rounded-lg border border-neutral-700 font-semibold outline-none focus:border-orange-500">
                                <option>144 Hz</option>
                                <option>120 Hz</option>
                                <option>60 Hz</option>
                              </select>
                            </div>

                            <div className="flex items-center justify-between p-3.5 bg-neutral-900 rounded-xl border border-neutral-800">
                              <div>
                                <h6 className="text-xs font-bold text-white">Orientação Física</h6>
                                <p className="text-[10px] text-zinc-500 mt-0.5 font-light">Girar tela para modo retrato ou paisagem.</p>
                              </div>
                              <select className="bg-neutral-800 text-xs px-2.5 py-1.5 rounded-lg border border-neutral-700 font-semibold outline-none focus:border-orange-500">
                                <option>Paisagem (Padrão)</option>
                                <option>Retrato</option>
                                <option>Paisagem Invertido</option>
                              </select>
                            </div>
                          </div>
                        </>
                      )}
                    </div>
                  </div>
                )}

                {/* 4f. THUNDERBIRD MAIL CONTROLLER */}
                {win.id === 'thunderbird' && (
                  <div className="w-full h-full flex bg-[#1e1e1e] text-white overflow-hidden select-none">
                    {/* Folders List Sidebar */}
                    <div className="w-44 bg-[#141414] border-r border-[#2d2d2d] p-3 text-left flex flex-col justify-between shrink-0">
                      <div className="space-y-1.5">
                        <div className="text-[10px] font-bold text-neutral-500 uppercase px-2 mb-2 tracking-wider">Thunderbird</div>
                        <button className="w-full text-left px-2.5 py-1.5 rounded-lg bg-orange-650/15 text-orange-400 text-xs font-bold flex items-center gap-2">
                          <span>📥</span> Caixa de Entrada
                        </button>
                        <button className="w-full text-left px-2.5 py-1.5 rounded-lg text-neutral-400 hover:bg-white/5 text-xs flex items-center gap-2">
                          <span>📤</span> Enviados
                        </button>
                        <button className="w-full text-left px-2.5 py-1.5 rounded-lg text-neutral-400 hover:bg-white/5 text-xs flex items-center gap-2">
                          <span>📝</span> Rascunhos
                        </button>
                        <button className="w-full text-left px-2.5 py-1.5 rounded-lg text-neutral-400 hover:bg-white/5 text-xs flex items-center gap-2">
                          <span>🚫</span> Spam
                        </button>
                      </div>
                      <div className="p-2 border-t border-[#2d2d2d] text-[10px] text-neutral-400">
                        ji@resolute.org
                      </div>
                    </div>

                    {/* Email List Grid */}
                    <div className="w-64 border-r border-[#2d2d2d] bg-[#1a1a1a] flex flex-col shrink-0">
                      <div className="p-3 border-b border-[#2d2d2d] flex items-center justify-between shrink-0">
                        <span className="text-xs font-bold">Mensagens</span>
                        <span className="text-[9px] bg-orange-660/20 text-orange-400 px-1.5 py-0.5 rounded-full font-bold">3 Novas</span>
                      </div>
                      <div className="flex-1 overflow-y-auto divide-y divide-[#2a2a2a] no-scrollbar">
                        {[
                          { id: 0, sender: 'Linus Torvalds', subject: 'Kernel Linux & Resolute Raccoon', date: 'Hoje' },
                          { id: 1, sender: 'Canonical Team', subject: 'Boas-vindas ao Ubuntu b4 Release', date: 'Ontem' },
                          { id: 2, sender: 'Filipi Hadji', subject: 'Artigo no Portal Meu Linux', date: '18 Mai' }
                        ].map((mail) => (
                          <button
                            key={mail.id}
                            onClick={() => setActiveMailId(mail.id)}
                            className={`w-full p-3 text-left text-xs transition-colors flex flex-col gap-1 ${activeMailId === mail.id ? 'bg-orange-650/20 border-l-2 border-orange-600' : 'hover:bg-white/5'}`}
                          >
                            <div className="flex justify-between items-center">
                              <span className="font-bold text-neutral-200 truncate pr-2">{mail.sender}</span>
                              <span className="text-[9px] text-neutral-500 shrink-0">{mail.date}</span>
                            </div>
                            <span className="text-neutral-400 font-medium truncate">{mail.subject}</span>
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Active Email View Pane */}
                    <div className="flex-1 bg-[#161616] flex flex-col min-w-0">
                      {activeMailId === 0 && (
                        <div className="p-6 text-left space-y-4 flex flex-col h-full overflow-y-auto">
                          <div className="border-b border-[#2d2d2d] pb-4 shrink-0">
                            <h4 className="text-sm font-bold text-neutral-100">Kernel Linux & Resolute Raccoon</h4>
                            <div className="flex items-center gap-2 mt-2">
                              <div className="w-7 h-7 rounded-full bg-neutral-700 font-semibold text-xs flex items-center justify-center text-orange-400 shrink-0">L</div>
                              <div>
                                <div className="text-xs font-bold">Linus Torvalds <span className="text-[10px] text-neutral-500 font-normal">&lt;torvalds@linux-foundation.org&gt;</span></div>
                                <div className="text-[10px] text-neutral-500">Para: ji@resolute.org</div>
                              </div>
                            </div>
                          </div>
                          <p className="text-xs leading-relaxed text-neutral-300 font-sans whitespace-pre-wrap flex-1 select-text">
                            Olá desenvolvedor,

Estive experimentando a sua simulação do Ubuntu 26.04 Resolute Raccoon e fiquei extremamente surpreso com a velocidade! A integração do terminal com fastfetch e o gerenciador Nautilus em React ficou limpa e elegante.

Continue aperfeiçoando o sistema! O software livre agradece.

Abraços,
Linus Torvalds
                          </p>
                        </div>
                      )}
                      {activeMailId === 1 && (
                        <div className="p-6 text-left space-y-4 flex flex-col h-full overflow-y-auto">
                          <div className="border-b border-[#2d2d2d] pb-4 shrink-0">
                            <h4 className="text-sm font-bold text-neutral-100">Boas-vindas ao Ubuntu b4 Release</h4>
                            <div className="flex items-center gap-2 mt-2">
                              <div className="w-7 h-7 rounded-full bg-orange-650/30 font-semibold text-xs flex items-center justify-center text-orange-500 shrink-0">C</div>
                              <div>
                                <div className="text-xs font-bold">Canonical Desktop Team <span className="text-[10px] text-neutral-500 font-normal">&lt;team@canonical.com&gt;</span></div>
                                <div className="text-[10px] text-neutral-500">Para: ji@resolute.org</div>
                              </div>
                            </div>
                          </div>
                          <p className="text-xs leading-relaxed text-neutral-300 font-sans whitespace-pre-wrap flex-1 select-text">
                            Prezado Usuário,

Esta é a compilação b4 (Beta 4) do Ubuntu 26.04 "Resolute Raccoon".

Nesta edição, focamos na unificação das tecnologias web progressivas com o ecossistema GNOME 50, gerando alta portabilidade e permitindo que qualquer navegador emule o visual corporativo com fidelidade.

Para relatar bugs, use a central de feedback em ajuda do sistema.

Com carinho,
Canonical Desktop Team
                          </p>
                        </div>
                      )}
                      {activeMailId === 2 && (
                        <div className="p-6 text-left space-y-4 flex flex-col h-full overflow-y-auto">
                          <div className="border-b border-[#2d2d2d] pb-4 shrink-0">
                            <h4 className="text-sm font-bold text-neutral-100">Artigo no Portal Meu Linux</h4>
                            <div className="flex items-center gap-2 mt-2">
                              <div className="w-7 h-7 rounded-full bg-emerald-900/40 font-semibold text-xs flex items-center justify-center text-emerald-400 shrink-0">ML</div>
                              <div>
                                <div className="text-xs font-bold">Portal Meu Linux <span className="text-[10px] text-neutral-500 font-normal">&lt;contato@meulinux.com&gt;</span></div>
                                <div className="text-[10px] text-neutral-500">Para: ji@resolute.org</div>
                              </div>
                            </div>
                          </div>
                          <p className="text-xs leading-relaxed text-neutral-300 font-sans whitespace-pre-wrap flex-1 select-text">
                            Fala, galera do Meu Linux Portal!

Acabamos de postar uma matéria cobrindo este simulador. Comentamos sobre os atalhos reais, o funcionamento das páginas através do proxy AllOrigins e como os desenvolvedores conseguiram manter o terminal funcional com suporte para cowsay e sl.

Visite nosso site no navegador Firefox e deixe seu comentário lá!

Atenciosamente,
Filipi Hadji - Editor Chefe
                          </p>
                        </div>
                      )}
                    </div>
                  </div>
                )}

                {/* 4g. RHYTHMBOX AUDIO PLAYER */}
                {win.id === 'rhythmbox' && (
                  <div className="w-full h-full flex flex-col bg-[#111214] text-white overflow-hidden select-none relative font-sans">
                    {/* Audio playback is handled globally to keep playing in the background */}

                    {/* Top simulated navigation bar */}
                    <div className="px-5 py-3 bg-[#16171a] border-b border-white/[0.04] flex items-center justify-between shrink-0">
                      <div className="flex items-center gap-3">
                        <button 
                          className="w-8 h-8 rounded-full bg-white/5 hover:bg-white/10 active:scale-95 transition-all flex items-center justify-center text-white"
                          title="Voltar"
                        >
                          <ChevronLeft size={16} />
                        </button>
                      </div>
                      <div className="text-xs text-zinc-400 font-medium flex items-center gap-2.5">
                        Sua biblioteca / <span className="text-white font-bold">Radical Optimism</span>
                      </div>
                    </div>

                    {/* Main contents split window */}
                    <div className="flex-1 flex overflow-hidden min-h-0 bg-[#0e0f11]">
                      {/* Left Column: Cover & Album Title */}
                      <div className="w-[42%] p-6 flex flex-col items-center justify-center border-r border-white/[0.03] bg-[#121316]/55 flex-shrink-0 text-center">
                        <div className="w-48 h-48 md:w-56 md:h-56 rounded-2xl overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.8)] border border-white/[0.08] relative group transition-transform duration-300 hover:scale-[1.02]">
                          <img 
                            src="/assets/Dua Lipa/cd_cover.jpg" 
                            alt="Radical Optimism Cover" 
                            className="w-full h-full object-cover"
                            referrerPolicy="no-referrer"
                          />
                          <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                            <button 
                              onClick={togglePlay}
                              className="w-14 h-14 rounded-full bg-[#e95420] text-white shadow-lg flex items-center justify-center scale-90 group-hover:scale-100 transition-transform active:scale-95 pl-1 animate-pulse"
                            >
                              {rhythmPlaying ? '⏸' : '▶'}
                            </button>
                          </div>
                        </div>

                        <div className="mt-5 text-left w-full px-2">
                          <h3 className="text-lg md:text-xl font-black text-white tracking-tight truncate leading-tight">
                            Radical Optimism
                          </h3>
                          <p className="text-xs font-bold text-zinc-400 uppercase tracking-widest mt-1">
                            DUA LIPA
                          </p>
                        </div>
                      </div>

                      {/* Right Column: Tracks Playlist list */}
                      <div className="flex-1 p-6 overflow-y-auto no-scrollbar">
                        <div className="space-y-1">
                          {DUA_LIPA_ALBUM_TRAILER.map((track, idx) => {
                            const isCurrent = rhythmTrack === idx;
                            return (
                              <button
                                key={track.id}
                                onClick={() => playTrack(idx)}
                                className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl transition-all ${
                                  isCurrent 
                                    ? 'bg-[#e95420]/10 border border-[#e95420]/20' 
                                    : 'hover:bg-white/[0.04] border border-transparent'
                                }`}
                              >
                                <div className="flex items-center gap-4 min-w-0 pr-4">
                                  {/* Order Index indicator */}
                                  <span className={`w-5 text-center font-semibold text-xs shrink-0 ${isCurrent ? 'text-[#e95420]' : 'text-zinc-500'}`}>
                                    {isCurrent && rhythmPlaying ? (
                                      <div className="flex items-center justify-center gap-0.5 h-3">
                                        <div className="w-0.5 bg-[#e95420] rounded-full animate-bounce" style={{ height: '70%', animationDelay: '0s' }} />
                                        <div className="w-0.5 bg-[#e95420] rounded-full animate-bounce" style={{ height: '100%', animationDelay: '0.15s' }} />
                                        <div className="w-0.5 bg-[#e95420] rounded-full animate-bounce" style={{ height: '50%', animationDelay: '0.3s' }} />
                                      </div>
                                    ) : (
                                      track.id
                                    )}
                                  </span>

                                  {/* Cover small thumb fallback */}
                                  <div className="text-left truncate">
                                    <p className={`text-xs font-bold truncate leading-snug ${isCurrent ? 'text-[#e95420]' : 'text-neutral-200'}`}>
                                      {track.title}
                                    </p>
                                    <p className="text-[10px] text-zinc-500 font-medium leading-none mt-0.5">
                                      Tocou {track.plays} vezes
                                    </p>
                                  </div>
                                </div>

                                <div className="flex items-center gap-3">
                                  {/* Liked indicator */}
                                  <button
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      const updated = [...rhythmLiked];
                                      updated[idx] = !updated[idx];
                                      setRhythmLiked(updated);
                                    }}
                                    className={`p-1 hover:scale-115 transition-all hover:bg-white/5 rounded-full ${rhythmLiked[idx] ? 'text-red-500' : 'text-zinc-500 hover:text-zinc-300'}`}
                                  >
                                    <Heart size={12} fill={rhythmLiked[idx] ? "currentColor" : "none"} />
                                  </button>
                                  <span className="text-zinc-500 text-[10px] font-mono shrink-0 w-8 text-right">
                                    {track.duration}
                                  </span>
                                </div>
                              </button>
                            );
                          })}
                        </div>
                      </div>
                    </div>

                    {/* Track Seeker Progress Bar */}
                    <div 
                      onClick={handleProgressClick}
                      className="w-full bg-zinc-800 h-1 cursor-pointer hover:h-1.5 transition-all relative group shrink-0"
                      title="Clique para avançar/retroceder"
                    >
                      <div 
                        className="absolute h-full left-0 top-0 bg-[#e95420]" 
                        style={{ width: `${(audioCurrentTime / (audioDuration || 1)) * 100}%` }}
                      ></div>
                      <div 
                        className="absolute w-3 h-3 rounded-full bg-white border-2 border-[#e95420] -top-1 opacity-0 group-hover:opacity-100 transition-opacity shadow-md pointer-events-none"
                        style={{ left: `calc(${(audioCurrentTime / (audioDuration || 1)) * 100}% - 6px)` }}
                      ></div>
                    </div>

                    {/* Bottom playback audio controls dashboard */}
                    <div className="px-5 py-4 bg-[#141518] border-t border-white/[0.04] grid grid-cols-3 items-center gap-4 shrink-0">
                      {/* Left Side Controls + Time details */}
                      <div className="flex items-center justify-start gap-4">
                        {/* Audio track control buttons */}
                        <div className="flex items-center gap-2">
                          <button 
                            onClick={prevTrack}
                            className="p-1 rounded-full text-zinc-400 hover:text-white hover:bg-white/5 transition-all"
                            title="Voltar Faixa"
                          >
                            <SkipBack size={15} />
                          </button>
                          <button 
                            onClick={togglePlay}
                            className="w-8 h-8 rounded-full bg-white hover:bg-neutral-100 text-black flex items-center justify-center transition-transform active:scale-95 cursor-pointer pl-0.5"
                            title={rhythmPlaying ? "Pausar" : "Tocar"}
                          >
                            {rhythmPlaying ? '⏸' : '▶'}
                          </button>
                          <button 
                            onClick={nextTrack}
                            className="p-1 rounded-full text-zinc-400 hover:text-white hover:bg-white/5 transition-all"
                            title="Próxima Faixa"
                          >
                            <SkipForward size={15} />
                          </button>
                        </div>

                        {/* Clock duration meter */}
                        <div className="text-[10px] text-zinc-400 font-mono flex items-center gap-1.5 bg-black/10 px-2 py-1 rounded-lg border border-white/[0.01]">
                          <span>
                            {Math.floor(audioCurrentTime / 60)}:{(Math.floor(audioCurrentTime % 60) < 10 ? '0' : '')}{Math.floor(audioCurrentTime % 60)}
                          </span>
                          <span className="text-zinc-600">/</span>
                          <span>{DUA_LIPA_ALBUM_TRAILER[rhythmTrack].duration}</span>
                        </div>
                      </div>

                      {/* Center Track Information bar */}
                      <div className="flex justify-center">
                        <div className="bg-[#1c1d22] border border-white/[0.05] rounded-full pl-2 pr-4 py-1.5 flex items-center gap-3 max-w-full shadow-inner shadow-black/80">
                          <img 
                            src="/assets/Dua Lipa/cd_cover.jpg" 
                            alt="" 
                            className="w-7 h-7 rounded-full object-cover border border-white/[0.1] flex-shrink-0 animate-[spin_8s_linear_infinite]"
                            style={{ animationPlayState: rhythmPlaying ? 'running' : 'paused' }}
                            referrerPolicy="no-referrer"
                          />
                          <div className="text-left truncate min-w-0">
                            <span className="text-[10.5px] font-bold text-white block leading-none truncate pr-2">
                              {DUA_LIPA_ALBUM_TRAILER[rhythmTrack].title}
                            </span>
                            <span className="text-[8.5px] text-zinc-400 block leading-none mt-1 uppercase font-bold tracking-wider">
                              DUA LIPA
                            </span>
                          </div>
                          <div className="h-4 w-[1px] bg-white/[0.06] flex-shrink-0" />
                          <div className="flex items-center gap-1.5 flex-shrink-0">
                            <button
                              onClick={() => {
                                const updated = [...rhythmLiked];
                                updated[rhythmTrack] = !updated[rhythmTrack];
                                setRhythmLiked(updated);
                              }}
                              className={`hover:scale-110 transition-transform ${rhythmLiked[rhythmTrack] ? 'text-red-500' : 'text-zinc-400 hover:text-zinc-200'}`}
                            >
                              <Heart size={11} fill={rhythmLiked[rhythmTrack] ? "currentColor" : "none"} />
                            </button>
                            <button className="text-zinc-400 hover:text-zinc-200 hover:scale-110 transition-transform">
                              <ThumbsDown size={11} />
                            </button>
                          </div>
                        </div>
                      </div>

                      {/* Right utility buttons: VOLUME, LOOP, SHUFFLE */}
                      <div className="flex justify-end items-center gap-4">
                        {/* Fake volume bar */}
                        <div className="flex items-center gap-2">
                          <Volume1 size={13} className="text-zinc-400" />
                          <div className="w-16 h-1 bg-zinc-700/80 rounded-full relative overflow-hidden group">
                            <div className="absolute top-0 bottom-0 left-0 bg-[#e95420] w-[80%] rounded-full" />
                          </div>
                        </div>

                        <div className="flex items-center gap-1.5">
                          <button
                            onClick={() => setRhythmRepeat(!rhythmRepeat)}
                            className={`p-1.5 rounded-lg transition-colors ${rhythmRepeat ? 'text-[#e95420] bg-[#e95420]/10' : 'text-zinc-400 hover:text-zinc-200'}`}
                            title="Repetir faixa"
                          >
                            <Repeat size={13} />
                          </button>
                          <button
                            onClick={() => setRhythmShuffle(!rhythmShuffle)}
                            className={`p-1.5 rounded-lg transition-colors ${rhythmShuffle ? 'text-[#e95420] bg-[#e95420]/10' : 'text-zinc-400 hover:text-zinc-200'}`}
                            title="Embaralhar"
                          >
                            <Shuffle size={13} />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* 4h. LIBREOFFICE WRITER DOCUMENT EDITOR */}
                {win.id === 'libreofficewriter' && (
                  <div className="w-full h-full flex flex-col bg-[#ececec] text-neutral-900 select-text overflow-hidden">
                    {/* Toolbar row 1 */}
                    <div className="h-10 bg-[#f4f4f4] border-b border-neutral-300 px-3 flex items-center gap-4 shrink-0 text-xs select-none">
                      <span className="font-bold text-blue-700">LibreOffice Writer</span>
                      <div className="h-4 w-[1px] bg-neutral-300" />
                      <div className="flex items-center gap-1 bg-neutral-200 p-1 rounded">
                        <button 
                          onClick={() => setIsBold(!isBold)}
                          className={`w-5 h-5 flex items-center justify-center rounded font-bold hover:bg-neutral-350 ${isBold ? 'bg-neutral-350 text-black shadow-sm' : 'text-neutral-700'}`}
                        >
                          B
                        </button>
                        <button 
                          onClick={() => setIsItalic(!isItalic)}
                          className={`w-5 h-5 flex items-center justify-center rounded italic hover:bg-neutral-350 ${isItalic ? 'bg-neutral-350 text-black shadow-sm' : 'text-neutral-700'}`}
                        >
                          I
                        </button>
                        <button 
                          onClick={() => setIsUnderline(!isUnderline)}
                          className={`w-5 h-5 flex items-center justify-center rounded underline hover:bg-neutral-350 ${isUnderline ? 'bg-neutral-350 text-black shadow-sm' : 'text-neutral-700'}`}
                        >
                          U
                        </button>
                      </div>

                      <div className="h-4 w-[1px] bg-neutral-300" />
                      <div className="text-[10px] text-neutral-500">Fonte: Ubuntu Sans (11pt)</div>
                    </div>

                    {/* Paper Document Layout frame */}
                    <div className="flex-1 bg-[#cfcfcf] p-4 overflow-y-auto flex justify-center">
                      <div className="max-w-2xl w-full bg-white h-fit min-h-[460px] shadow-lg rounded p-8 border border-neutral-300 flex flex-col text-left">
                        <textarea
                          value={writerText}
                          onChange={(e) => setWriterText(e.target.value)}
                          className={`w-full flex-1 resize-none bg-transparent outline-none border-none p-0 focus:ring-0 text-sm leading-relaxed text-neutral-800 font-sans ${isBold ? 'font-bold' : ''} ${isItalic ? 'italic' : ''} ${isUnderline ? 'underline' : ''}`}
                          placeholder="Comece a redigir o seu texto aqui..."
                          spellCheck={false}
                        />
                      </div>
                    </div>
                  </div>
                )}

                {/* 4i. SOFTWARE APP CENTER */}
                {win.id === 'software' && (
                  <div className="w-full h-full flex bg-[#1E1E1E] text-white overflow-hidden select-none">
                    {/* Sidebar section */}
                    <div className="w-44 bg-[#161616] border-r border-[#2d2d2d] p-3 text-left space-y-1 shrink-0">
                      <div className="text-[10px] font-bold text-neutral-500 uppercase px-2 mb-2 tracking-wider">App Hub</div>
                      <button className="w-full text-left px-2.5 py-1.5 rounded-lg bg-orange-655/15 text-orange-400 text-xs font-bold flex items-center gap-2">
                        <span>🛍️</span> Explorar
                      </button>
                      <button className="w-full text-left px-2.5 py-1.5 rounded-lg text-neutral-400 hover:bg-white/5 text-xs flex items-center gap-2">
                        <span>📦</span> Instalados ({installedAppList.length})
                      </button>
                    </div>

                    {/* App Grid content area */}
                    <div className="flex-1 p-5 overflow-y-auto text-left space-y-5 bg-[#121212]">
                      <div>
                        <h4 className="text-sm font-bold text-neutral-100">Biblioteca Resolute Raccoon</h4>
                        <p className="text-[10px] text-neutral-500 mt-1">Repositório oficial para builds rápidas e pacotes deb emulados.</p>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        {[
                          { id: 'cowsay', name: 'cowsay', desc: 'A vaca falante do terminal', status: 'Instalado' },
                          { id: 'sl', name: 'sl (Steam Locomotive)', desc: 'Prevenção de typos com trens a vapor', status: 'Instalado' },
                          { id: 'vscode', name: 'VS Code Editor', desc: 'Completo IDE integrado na nuvem', status: 'Disponível' },
                          { id: 'spotify', name: 'Spotify Desktop', desc: 'Acesso instantâneo a streamings', status: 'Disponível' }
                        ].map((app) => {
                          const isInst = installedAppList.includes(app.id);
                          return (
                            <div key={app.id} className="p-3.5 bg-[#1E1E1E] border border-neutral-800 rounded-xl flex items-center justify-between gap-3 shadow hover:border-neutral-700 transition-colors">
                              <div className="text-left min-w-0 flex-1">
                                <span className="text-xs font-bold text-orange-400 block truncate">{app.name}</span>
                                <p className="text-[10px] text-neutral-400 mt-0.5 truncate">{app.desc}</p>
                              </div>
                              <button
                                onClick={() => {
                                  if (isInst) return;
                                  setInstallingId(app.id);
                                  setTimeout(() => {
                                    setInstalledAppList(prev => [...prev, app.id]);
                                    setInstallingId(null);
                                  }, 1200);
                                }}
                                disabled={isInst || installingId !== null}
                                className={`px-2.5 py-1 text-[10px] font-bold rounded-lg transition-all shrink-0 ${isInst ? 'bg-neutral-800 text-neutral-500' : 'bg-orange-600 hover:bg-orange-700 text-white active:scale-95'}`}
                              >
                                {installingId === app.id ? 'Instalando...' : isInst ? 'Adquirido' : 'Instalar'}
                              </button>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                )}

                {/* 4j. HELP CENTER */}
                {win.id === 'help' && (
                  <div className="w-full h-full flex flex-col bg-[#1E1E1E] text-white p-5 overflow-y-auto text-left space-y-4 select-text">
                    <div className="border-b border-[#2d2d2d] pb-3 shrink-0">
                      <h4 className="text-sm font-bold text-neutral-100">Ajuda & Guia de Atalhos</h4>
                      <p className="text-[10px] text-neutral-500 mt-1">Documentação simplificada e teclas de atalho configuradas no simulador de Ubuntu 26.04.</p>
                    </div>

                    <div className="space-y-3">
                      <h5 className="text-xs font-bold text-orange-400">Atalhos Globais do Sistema</h5>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                        <div className="p-3 bg-neutral-900 border border-neutral-800 rounded-xl">
                          <kbd className="bg-neutral-800 px-1.5 py-0.5 rounded text-orange-400 font-bold border border-white/5 font-mono text-[10px]">Alt + Tab</kbd>
                          <p className="text-neutral-400 text-[10px] mt-1.5">Alterna rapidamente o foco entre os aplicativos suspensos.</p>
                        </div>
                        <div className="p-3 bg-neutral-900 border border-neutral-800 rounded-xl">
                          <kbd className="bg-neutral-800 px-1.5 py-0.5 rounded text-orange-400 font-bold border border-white/5 font-mono text-[10px]">Ctrl + Alt + T</kbd>
                          <p className="text-neutral-400 text-[10px] mt-1.5">Dispara instantaneamente o emulador de terminal Ptyxis.</p>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-2 pt-2">
                      <h5 className="text-xs font-bold text-orange-400">Ambiente de Testes</h5>
                      <p className="text-xs text-neutral-300 leading-relaxed font-sans">
                        O Ubuntu 26.04 LTS "Resolute Raccoon" é a próxima build empresarial de longo prazo. Esta emulação em React foi projetada para demonstrar a fidelidade estética, funcionamento de logs locais no container, navegação web de alto desempenho e utilitários clássicos de console como Cowsay e Fastfetch.
                      </p>
                    </div>
                  </div>
                )}

                {/* 4k. TRASH RECYCLE BIN */}
                {win.id === 'trash' && (
                  <div className="w-full h-full flex flex-col bg-[#1E1E1E] text-white overflow-hidden select-none">
                    {/* Header bar row */}
                    <div className="bg-[#181818] border-b border-[#2c2c2c] px-4 py-2 flex items-center justify-between shrink-0 text-xs shadow-sm">
                      <span className="text-neutral-300">Lixeira ({trashItems.length} arquivos)</span>
                      {trashItems.length > 0 && (
                        <button
                          onClick={() => setTrashItems([])}
                          className="bg-red-600 hover:bg-red-700 text-white font-bold px-2.5 py-1 rounded-lg transition-colors text-[10px] active:scale-95"
                        >
                          Esvaziar Lixeira
                        </button>
                      )}
                    </div>

                    <div className="flex-1 bg-[#121212] p-5 overflow-y-auto">
                      {trashItems.length === 0 ? (
                        <div className="h-full flex flex-col items-center justify-center text-center space-y-2 opacity-50">
                          <img 
                            src="/assets/user-trash.png" 
                            alt="" 
                            className="w-14 h-14 object-contain opacity-65 hover:scale-105 transition-transform" 
                            referrerPolicy="no-referrer"
                          />
                          <p className="text-xs font-bold text-neutral-400">Lixeira limpa!</p>
                        </div>
                      ) : (
                        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                          {trashItems.map((file, i) => (
                            <div key={i} className="p-3 bg-neutral-900 border border-neutral-800 rounded-xl flex items-center gap-2.5 shadow text-xs">
                              <span className="text-lg">📄</span>
                              <div className="text-left truncate flex-1 min-w-0">
                                <p className="font-semibold text-neutral-200 truncate">{file}</p>
                                <p className="text-[9px] text-neutral-500 uppercase mt-0.5">Excluído</p>
                              </div>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                )}

              </div>
            </motion.div>
          );
        })}
      </div>

      {/* 5. GIGANTIC ALL APPLICATIONS GRID COMPONENT OVERLAY */}
      <AnimatePresence>
        {showAppGrid && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => {
              setShowAppGrid(false);
              setSearchQuery('');
            }}
            className="absolute inset-0 bg-black/85 backdrop-blur-md z-[75] flex items-center justify-center p-8 pt-16"
          >
            <div 
              onClick={(e) => e.stopPropagation()}
              className="max-w-4xl w-full flex flex-col items-center gap-8 text-center"
            >
              {/* Search input input bar */}
              <div className="max-w-md w-full bg-neutral-800/80 border border-white/10 rounded-2xl px-4 py-3 flex items-center gap-3 shadow-xl focus-within:border-orange-600">
                <Search size={18} className="text-gray-400" />
                <input 
                  type="text" 
                  placeholder="Pesquisar aplicativos..." 
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="bg-transparent border-none outline-none text-white text-sm w-full font-medium"
                  autoFocus
                />
              </div>

              {/* Grid of launchable apps based on search query */}
              <div className="grid grid-cols-3 sm:grid-cols-5 gap-6 sm:gap-8 w-full p-4 justify-items-center">
                {windows
                  .filter(w => w.title.toLowerCase().includes(searchQuery.toLowerCase()))
                  .map((win) => (
                    <button 
                      key={win.id}
                      onClick={() => {
                        toggleWindow(win.id);
                        setShowAppGrid(false);
                        setSearchQuery('');
                      }}
                      className="flex flex-col items-center gap-3 hover:bg-white/5 p-4 rounded-2xl w-28 group transition-colors"
                    >
                      <div className="w-16 h-16 rounded-2xl bg-neutral-800 border border-white/5 flex items-center justify-center shadow-lg group-hover:scale-105 transition-transform">
                        {renderIcon(win.id, "w-10 h-10", win.id === 'trash' ? trashItems.length > 0 : false)}
                      </div>
                      <span className="text-xs font-semibold text-gray-200 group-hover:text-white truncate w-full">{win.title}</span>
                    </button>
                  ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

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
    </div>
  );
};
