import React, { useState, useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { motion, AnimatePresence } from 'motion/react';
import { GoogleGenAI } from '@google/genai';
import { 
  X, Square, Minus, Search, Wifi, Volume2, Battery, HelpCircle, Home, 
  RotateCcw, Trash, Plus, FileText, Settings as IconSettings, Play, Pause,
  VolumeX, ChevronLeft, ChevronRight, ChevronUp, Check, Sparkles, Folder, Image, HardDrive, MapPin, 
  Camera as IconCamera, Moon, Sun, Info, ArrowLeft, Maximize2, Palette,
  Globe, Star, StarOff, Lock, MoreVertical, ExternalLink, Shield, Copy,
  Power, ChevronDown, Bell, BellOff, Share2, Eye, EyeOff, Bluetooth
} from 'lucide-react';

// Real-time sound generator for authentic Chrome OS interface feedback
const playChromeChime = (volumeLevel = 75) => {
  try {
    const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
    if (!AudioContextClass) return;
    const ctx = new AudioContextClass();
    const time = ctx.currentTime;
    
    const volumeMultiplier = volumeLevel / 100;

    // First chime
    const osc1 = ctx.createOscillator();
    const gain1 = ctx.createGain();
    osc1.type = 'sine';
    osc1.frequency.setValueAtTime(523.25, time); // C5
    gain1.gain.setValueAtTime(0, time);
    gain1.gain.linearRampToValueAtTime(0.15 * volumeMultiplier, time + 0.05);
    gain1.gain.exponentialRampToValueAtTime(0.0001, time + 0.4);
    osc1.connect(gain1);
    gain1.connect(ctx.destination);
    osc1.start(time);
    osc1.stop(time + 0.4);

    // Second chime (harmonized slightly later)
    const osc2 = ctx.createOscillator();
    const gain2 = ctx.createGain();
    osc2.type = 'sine';
    osc2.frequency.setValueAtTime(659.25, time + 0.1); // E5
    gain2.gain.setValueAtTime(0, time + 0.1);
    gain2.gain.linearRampToValueAtTime(0.12 * volumeMultiplier, time + 0.15);
    gain2.gain.exponentialRampToValueAtTime(0.0001, time + 0.5);
    osc2.connect(gain2);
    gain2.connect(ctx.destination);
    osc2.start(time + 0.1);
    osc2.stop(time + 0.5);
  } catch (e) {
    console.warn("Chime failed", e);
  }
};

// Beautiful high fidelity SVG renderers for authentic Google Logos
const ChromeLogo: React.FC<{ size?: number }> = ({ size = 48 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className="shrink-0 pointer-events-none">
    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.42 0-8-3.58-8-8 0-.49.05-.98.14-1.45l5.52 9.56C10.51 19.82 11.24 20 12 20zm7.14-4.82l-5.52-9.56c1.17.65 1.9 1.83 1.9 3.03l.03 2.11L19.14 15.18z" fill="#4285F4"/>
    <circle cx="12" cy="12" r="4" fill="#1A73E8"/>
    <path fillRule="evenodd" clipRule="evenodd" d="M12 2C7.03 2 2.85 5.64 2.14 10.38L7.66 19.94C10.22 21.2 13.56 20.8 15.68 18.9L10.16 9.34C10.5 8.1 11.2 7.1 12.2 6.5l5.54 9.58c1.3-1.4 1.92-3.4 1.4-5.46L13.62 1.08C13.08 1.03 12.54 1 12 1z" fill="#EA4335"/>
    <path fillRule="evenodd" clipRule="evenodd" d="M22 12c0 2.22-.72 4.26-1.93 5.92L14.55 8.35c.78-.96 1.92-1.55 3.11-1.55h1c.5 0 1 .1 1.44.3L22 12z" fill="#FBBC05"/>
    <path d="M12 6.8c1.35 0 2.58.55 3.48 1.44l4.1-4.1C17.6 2.16 14.95 1 12 1 7.42 1 3.56 3.84 2.1 7.9L7.3 16.9C7.1 15.4 7 13.7 7 12c0-2.87 2.24-5.2 5-5.2z" fill="#34A853"/>
  </svg>
);

const YouTubeLogo: React.FC<{ size?: number }> = ({ size = 48 }) => (
  <svg width={size} height={size} viewBox="0 0 48 48" fill="none">
    <ellipse cx="24" cy="24" rx="22" ry="22" fill="#FFFFFF" stroke="#E6E6E6" strokeWidth="1" />
    <path d="M34 19c-.3-1.2-1.3-2.2-2.5-2.5C29.3 16 24 16 24 16s-5.3 0-7.5.5c-1.2.3-2.2 1.3-2.5 2.5C13.5 21.2 13.5 24 13.5 24s0 2.8.5 5c.3 1.2 1.3 2.2 2.5 2.5 2.2.5 7.5.5 7.5.5s5.3 0 7.5-.5c1.2-.3 2.2-1.3 2.5-2.5.5-2.2.5-5 .5-2.5s0-2.8-.5-5z" fill="#FF0000" />
    <path d="M21 21v6l5-3-5-3z" fill="#FFFFFF" />
  </svg>
);

const GmailLogo: React.FC<{ size?: number }> = ({ size = 48 }) => (
  <svg width={size} height={size} viewBox="0 0 48 48" fill="none">
    <ellipse cx="24" cy="24" rx="22" ry="22" fill="#FFFFFF" stroke="#E6E6E6" strokeWidth="1" />
    <path d="M15 17v14h3V21l6 4.5 6-4.5v10h3V17l-9 6.75L15 17z" fill="#EA4335" />
    <path d="M15 17v2.5l9 6.75 9-6.75V17c0-1.1-.9-2-2-2H17c-1.1 0-2 .9-2 2z" fill="#4285F4" opacity="0.15" />
    <path d="M33 17v14h2c.55 0 1-.45 1-1V18c0-.55-.45-1-1-1h-2z" fill="#FBBC05" />
    <path d="M15 31V17h-2c-.55 0-1 .45-1 1v12c0 .55.45 1 1 1h2z" fill="#34A853" />
  </svg>
);

const GoogleMeetLogo: React.FC<{ size?: number }> = ({ size = 48 }) => (
  <svg width={size} height={size} viewBox="0 0 48 48" fill="none">
    <ellipse cx="24" cy="24" rx="22" ry="22" fill="#FFFFFF" stroke="#E6E6E6" strokeWidth="1" />
    <path d="M16 20v8c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2v-8c0-1.1-.9-2-2-2h-8c-1.1 0-2 .9-2 2z" fill="#34A853" />
    <path d="M30 20l4-3v14l-4-3v-8z" fill="#4285F4" />
    <path d="M22 18h4v4h-4z" fill="#FF0000" style={{ mixBlendMode: 'multiply' }} opacity="0.8" />
    <circle cx="20" cy="24" r="2" fill="#FBBC05" />
  </svg>
);

const GoogleCalendarLogo: React.FC<{ size?: number }> = ({ size = 48 }) => {
  const currentDay = new Date().getDate();
  return (
    <svg width={size} height={size} viewBox="0 0 48 48" fill="none">
      <ellipse cx="24" cy="24" rx="22" ry="22" fill="#FFFFFF" stroke="#E6E6E6" strokeWidth="1" />
      <rect x="14" y="14" width="20" height="20" rx="3" fill="#4285F4" />
      <rect x="14" y="14" width="20" height="6" fill="#F4F4F4" opacity="0.2" />
      <text x="24" y="30" fill="#FFFFFF" fontSize="11" fontWeight="bold" textAnchor="middle" fontFamily="sans-serif">
        {currentDay}
      </text>
    </svg>
  );
};

const FilesLogo: React.FC<{ size?: number }> = ({ size = 48 }) => (
  <svg width={size} height={size} viewBox="0 0 48 48" fill="none">
    <ellipse cx="24" cy="24" rx="22" ry="22" fill="#FFFFFF" stroke="#E6E6E6" strokeWidth="1" />
    <path d="M14 18c0-1.1.9-2 2-2h6l3 3h7c1.1 0 2 .9 2 2v11c0 1.1-.9 2-2 2H16c-1.1 0-2-.9-2-2V18z" fill="#1A73E8" />
    <rect x="16" y="21" width="16" height="9" rx="1.5" fill="#FFFFFF" opacity="0.2" />
  </svg>
);

const DocsLogo: React.FC<{ size?: number }> = ({ size = 48 }) => (
  <svg width={size} height={size} viewBox="0 0 48 48" fill="none">
    <ellipse cx="24" cy="24" rx="22" ry="22" fill="#FFFFFF" stroke="#E6E6E6" strokeWidth="1" />
    <rect x="15" y="14" width="18" height="20" rx="2" fill="#4285F4" />
    <path d="M29 14l4 4h-4v-4z" fill="#F4F4F4" opacity="0.5" />
    <line x1="19" y1="20" x2="27" y2="20" stroke="#FFFFFF" strokeWidth="2" strokeLinecap="round" />
    <line x1="19" y1="24" x2="29" y2="24" stroke="#FFFFFF" strokeWidth="2" strokeLinecap="round" />
    <line x1="19" y1="28" x2="26" y2="28" stroke="#FFFFFF" strokeWidth="2" strokeLinecap="round" />
  </svg>
);

const WebStoreLogo: React.FC<{ size?: number }> = ({ size = 48 }) => (
  <img 
    src="/assets/Google_Chrome_Web_Store_icon_2022.svg.png" 
    alt="Chrome Web Store" 
    className="object-contain pointer-events-none select-none"
    style={{ width: size, height: size }}
    referrerPolicy="no-referrer"
  />
);

const SheetsLogo: React.FC<{ size?: number }> = ({ size = 48 }) => (
  <svg width={size} height={size} viewBox="0 0 48 48" fill="none">
    <ellipse cx="24" cy="24" rx="22" ry="22" fill="#FFFFFF" stroke="#E6E6E6" strokeWidth="1" />
    <rect x="15" y="14" width="18" height="20" rx="2" fill="#0F9D58" />
    <rect x="19" y="19" width="10" height="10" fill="#FFFFFF" opacity="0.2" />
    <line x1="24" y1="19" x2="24" y2="29" stroke="#FFFFFF" opacity="0.5" />
    <line x1="19" y1="24" x2="29" y2="24" stroke="#FFFFFF" opacity="0.5" />
  </svg>
);

const KeepLogo: React.FC<{ size?: number }> = ({ size = 48 }) => (
  <svg width={size} height={size} viewBox="0 0 48 48" fill="none">
    <ellipse cx="24" cy="24" rx="22" ry="22" fill="#FFFFFF" stroke="#E6E6E6" strokeWidth="1" />
    <path d="M24 14a6 6 0 00-6 6c0 2.5 1.5 4.5 3 5.5v2.5h6v-2.5c1.5-1 3-3 3-5.5a6 6 0 00-6-6z" fill="#F4B400" />
    <rect x="21" y="29" width="6" height="2" rx="0.5" fill="#9AA0A6" />
    <rect x="22" y="32" width="4" height="2" rx="0.5" fill="#5F6368" />
  </svg>
);

const CameraLogo: React.FC<{ size?: number }> = ({ size = 48 }) => (
  <svg width={size} height={size} viewBox="0 0 48 48" fill="none">
    <ellipse cx="24" cy="24" rx="22" ry="22" fill="#FFFFFF" stroke="#E6E6E6" strokeWidth="1" />
    <rect x="15" y="17" width="18" height="14" rx="2" fill="#4285F4" />
    <path d="M21 17l1.5-3h3l1.5 3h-6z" fill="#1A73E8" />
    <circle cx="24" cy="24" r="4.5" fill="#FFFFFF" opacity="0.9" />
    <circle cx="24" cy="24" r="2.5" fill="#34A853" />
  </svg>
);

const SettingsLogo: React.FC<{ size?: number }> = ({ size = 48 }) => (
  <svg width={size} height={size} viewBox="0 0 48 48" fill="none">
    <ellipse cx="24" cy="24" rx="22" ry="22" fill="#FFFFFF" stroke="#E6E6E6" strokeWidth="1" />
    <path d="M24 16a8 8 0 100 16 8 8 0 000-16zm0 12c-2.2 0-4-1.8-4-4s1.8-4 4-4 4 1.8 4 4-1.8 4-4 4z" fill="#5F6368" />
    <path d="M26.5 13h-5l-.5 2.5a6.5 6.5 0 00-1.2.7l-2.3-1.3-3.5 3.5 1.3 2.3c-.3.4-.5.8-.7 1.2l-2.5.5v5l2.5.5c.2.4.4.8.7 1.2l-1.3 2.3 3.5 3.5 2.3-1.3c.4.3.8.5 1.2.7l.5 2.5h5l.5-2.5c.4-.2.8-.4 1.2-.7l2.3 1.3 3.5-3.5-1.3-2.3c.3-.4.5-.8.7-1.2l2.5-.5v-5l-2.5-.5c-.2-.4-.4-.8-.7-1.2l1.3-2.3-3.5-3.5-2.3 1.3c-.4-.3-.8-.5-1.2-.7l-.5-2.5z" fill="#9AA0A6" opacity="0.4" />
  </svg>
);

const SlidesLogo: React.FC<{ size?: number }> = ({ size = 48 }) => (
  <svg width={size} height={size} viewBox="0 0 48 48" fill="none">
    <ellipse cx="24" cy="24" rx="22" ry="22" fill="#FFFFFF" stroke="#E6E6E6" strokeWidth="1" />
    <rect x="15" y="14" width="18" height="20" rx="2" fill="#F4B400" />
    <rect x="18" y="18" width="12" height="9" fill="#FFFFFF" opacity="0.25" />
    <circle cx="21" cy="22" r="1.5" fill="#FFFFFF" />
  </svg>
);

const GeminiLogo: React.FC<{ size?: number }> = ({ size = 48 }) => (
  <svg width={size} height={size} viewBox="0 0 48 48" fill="none">
    <ellipse cx="24" cy="24" rx="22" ry="22" fill="#FFFFFF" stroke="#E6E6E6" strokeWidth="1" />
    <path
      d="M24 14C24 19.5 28.5 24 34 24C28.5 24 24 28.5 24 34C24 28.5 19.5 24 14 24C19.5 24 24 19.5 24 14Z"
      fill="url(#gemini_grad)"
    />
    <defs>
      <linearGradient id="gemini_grad" x1="14" y1="14" x2="34" y2="34" gradientUnits="userSpaceOnUse">
        <stop offset="0%" stopColor="#4285F4" />
        <stop offset="50%" stopColor="#9B51E0" />
        <stop offset="100%" stopColor="#EA4335" />
      </linearGradient>
    </defs>
  </svg>
);

const PlayMusicLogo: React.FC<{ size?: number }> = ({ size = 48 }) => (
  <svg width={size} height={size} viewBox="0 0 48 48" fill="none">
    <ellipse cx="24" cy="24" rx="22" ry="22" fill="#FFFFFF" stroke="#E6E6E6" strokeWidth="1" />
    <circle cx="24" cy="24" r="11" fill="#FF0000" />
    <circle cx="24" cy="24" r="5" fill="#000000" />
    <path d="M22 21l5 3-5 3v-6z" fill="#FFFFFF" />
  </svg>
);

const CalculatorLogo: React.FC<{ size?: number }> = ({ size = 48 }) => (
  <svg width={size} height={size} viewBox="0 0 48 48" fill="none">
    <ellipse cx="24" cy="24" rx="22" ry="22" fill="#FFFFFF" stroke="#E6E6E6" strokeWidth="1" />
    <rect x="15" y="14" width="18" height="20" rx="3" fill="#34A853" />
    <rect x="17" y="16" width="14" height="6" rx="1.5" fill="#202124" />
    <text x="28" y="20.5" fill="#00E676" fontSize="5" fontWeight="bold" fontFamily="monospace" textAnchor="end">1337</text>
    <circle cx="19" cy="26" r="1.5" fill="#FFFFFF" opacity="0.8" />
    <circle cx="24" cy="26" r="1.5" fill="#FFFFFF" opacity="0.8" />
    <circle cx="29" cy="26" r="1.5" fill="#FFFFFF" opacity="0.8" />
    <circle cx="19" cy="31" r="1.5" fill="#FFFFFF" opacity="0.8" />
    <circle cx="24" cy="31" r="1.5" fill="#FFFFFF" opacity="0.8" />
    <rect x="27.5" y="29.5" width="3" height="3" rx="0.8" fill="#FBBC05" />
  </svg>
);

const MapsLogo: React.FC<{ size?: number }> = ({ size = 48 }) => (
  <svg width={size} height={size} viewBox="0 0 48 48" fill="none">
    <ellipse cx="24" cy="24" rx="22" ry="22" fill="#FFFFFF" stroke="#E6E6E6" strokeWidth="1" />
    <path d="M19 15c-3 0-5 2.5-5 5.5s5 12.5 5 12.5 5-9.5 5-12.5-2-5.5-5-5.5zm0 7.5a2 2 0 110-4 2 2 0 010 4z" fill="#4285F4" />
    <path d="M29 17.5c-2.5 0-4.5 2-4.5 4.5s4 10 4 10 4.5-7.5 4.5-10c0-2.5-2-4.5-4.5-4.5z" fill="#34A853" />
  </svg>
);

const DiagnosticsLogo: React.FC<{ size?: number }> = ({ size = 48 }) => (
  <svg width={size} height={size} viewBox="0 0 48 48" fill="none">
    <ellipse cx="24" cy="24" rx="22" ry="22" fill="#FFFFFF" stroke="#E6E6E6" strokeWidth="1" />
    <rect x="15" y="15" width="18" height="18" rx="2" fill="#00796B" />
    <path d="M18 25l3.5-5 2.5 3.5L28 18" stroke="#FFFFFF" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" fill="none" />
  </svg>
);

const DiagnosticsLogoMini: React.FC<{ size?: number }> = ({ size = 20 }) => (
  <div className="w-5 h-5 rounded-full bg-[#00796B]/20 flex items-center justify-center p-0.5">
    <svg width={size} height={size} viewBox="0 0 48 48" fill="none" className="text-[#00796B]">
      <path d="M18 25l3.5-5 2.5 3.5L28 18" stroke="currentColor" strokeWidth="5.5" strokeLinecap="round" strokeLinejoin="round" fill="none" />
    </svg>
  </div>
);

const ChromeOSAppIcon: React.FC<{ id: string; size?: number; fallback: React.ReactNode }> = ({ id, size = 48, fallback }) => {
  const [useFallback, setUseFallback] = useState(false);

  const fileMap: { [key: string]: string } = {
    chrome: 'chrome.png',
    webstore: 'chrome_alt.png',
    gmail: 'gmail.png',
    calendar: 'calendar.png',
    meet: 'meet.png',
    docs: 'docs.png',
    slides: 'slides.png',
    sheets: 'sheets.png',
    files: 'files.png',
    camera: 'camera.png',
    settings: 'settings.png',
    calculator: 'calculator.png',
    chat: 'chat.png',
    drive: 'drive.png',
    forms: 'forms.png',
    youtube: 'youtube.png',
    keep: 'keep.png',
    maps: 'maps.png',
    explore: 'explore.png',
    canvas: 'canvas.png'
  };

  let url = '';
  if (id === 'gemini' || id === 'calculator') {
    const isGemini = id === 'gemini';
    url = isGemini 
      ? '/assets/gemini.webp'
      : '/assets/calculator.png';
    
    if (useFallback) {
      return (
        <div 
          className="w-full h-full rounded-full !bg-white flex items-center justify-center p-1.5 overflow-hidden"
          style={{ maxWidth: size, maxHeight: size, backgroundColor: '#ffffff' }}
        >
          {fallback}
        </div>
      );
    }

    return (
      <div 
        className="w-full h-full rounded-full !bg-white flex items-center justify-center p-0.5 overflow-hidden"
        style={{ maxWidth: size, maxHeight: size, backgroundColor: '#ffffff' }}
      >
        <img 
          src={url} 
          alt="" 
          className="w-[75%] h-[75%] object-contain pointer-events-none select-none"
          onError={() => setUseFallback(true)}
          referrerPolicy="no-referrer"
        />
      </div>
    );
  } else if (id === 'youtube') {
    url = '/assets/youtube-svgrepo-com.svg';
  } else if (id === 'keep') {
    url = '/assets/google-keep-svgrepo-com.svg';
  } else if (id === 'notebooklm') {
    url = '/assets/notebook-lm.svg';
  } else if (id === 'webstore') {
    url = '/assets/chrome.png';
  } else {
    const filename = fileMap[id];
    if (useFallback || !filename) {
      return <>{fallback}</>;
    }
    url = `/assets/${filename}`;
  }

  return (
    <img 
      src={url} 
      alt="" 
      className={`w-full h-full object-contain pointer-events-none ${id === 'notebooklm' ? 'brightness-0 invert' : ''}`}
      style={{ maxWidth: size, maxHeight: size }}
      onError={() => setUseFallback(true)}
      referrerPolicy="no-referrer"
    />
  );
};

interface ChromeApp {
  id: string;
  name: string;
  category: string;
  logo: React.ReactNode;
}

interface WindowInstance {
  id: string;
  title: string;
  isMaximized: boolean;
  x: number;
  y: number;
  width: number;
  height: number;
  zIndex: number;
  isMinimized?: boolean;
}

export const ChromeOSSimulator: React.FC<{ onClose: () => void }> = ({ onClose }) => {
  const { i18n } = useTranslation();
  const isEn = i18n.language === 'en';

  const [isBooting, setIsBooting] = useState(true);
  const [launcherOpen, setLauncherOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [activePage, setActivePage] = useState<'p1' | 'p2'>('p1');
  const [openWindows, setOpenWindows] = useState<WindowInstance[]>([]);
  const [activeWindowId, setActiveWindowId] = useState<string | null>(null);
  const [quickSettingsOpen, setQuickSettingsOpen] = useState(false);
  const [calendarOpen, setCalendarOpen] = useState(false);
  const [tasks, setTasks] = useState<{ id: string; text: string; completed: boolean }[]>([
    { id: '1', text: 'Estudar Linux no projeto meuLinux', completed: false },
    { id: '2', text: 'Configurar meu simulador do ChromeOS', completed: true },
    { id: '3', text: 'Experimentar o NotebookLM', completed: false },
  ]);
  const [newTaskInput, setNewTaskInput] = useState('');
  const [notifications, setNotifications] = useState<{ id: string; title: string; desc: string; time: string }[]>([
    { id: '1', title: 'meuLinux Update', desc: 'Versão mais recente do Kernel e do ChromeOS Flex simulada.', time: 'agora' },
    { id: '2', title: 'Dica do Sistema', desc: 'Clique duas vezes em um ícone para iniciar um aplicativo.', time: '12m atrás' }
  ]);

  const handleToggleTask = (taskId: string) => {
    setTasks(prev => prev.map(t => t.id === taskId ? { ...t, completed: !t.completed } : t));
  };

  const handleAddTask = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTaskInput.trim()) return;
    setTasks(prev => [
      ...prev,
      { id: Date.now().toString(), text: newTaskInput.trim(), completed: false }
    ]);
    setNewTaskInput('');
  };

  const [isDarkMode, setIsDarkMode] = useState(false);
  const [volume, setVolume] = useState(75);
  const [brightness, setBrightness] = useState(100);
  const [settingsTab, setSettingsTab] = useState<'rede' | 'dispositivo' | 'personalizacao' | 'sobre'>('dispositivo');

  // Key Event Hooks for physical shortcuts: Alt+Up/Down (Volume) and Alt+Right/Left (Brightness)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (document.activeElement?.tagName === 'INPUT' || document.activeElement?.tagName === 'TEXTAREA' || (document.activeElement as HTMLElement)?.isContentEditable) {
        return;
      }

      if (e.key === 'VolumeUp' || e.key === 'AudioVolumeUp' || (e.altKey && e.key === 'ArrowUp')) {
        e.preventDefault();
        setVolume(prev => {
          const nv = Math.min(100, prev + 5);
          showChromeToast(`Volume: ${nv}%`);
          return nv;
        });
      } else if (e.key === 'VolumeDown' || e.key === 'AudioVolumeDown' || (e.altKey && e.key === 'ArrowDown')) {
        e.preventDefault();
        setVolume(prev => {
          const nv = Math.max(0, prev - 5);
          showChromeToast(`Volume: ${nv}%`);
          return nv;
        });
      }

      if (e.key === 'BrightnessUp' || (e.altKey && e.key === 'ArrowRight')) {
        e.preventDefault();
        setBrightness(prev => {
          const nb = Math.min(100, prev + 5);
          showChromeToast(isEn ? `Brightness: ${nb}%` : `Brilho: ${nb}%`);
          return nb;
        });
      } else if (e.key === 'BrightnessDown' || (e.altKey && e.key === 'ArrowLeft')) {
        e.preventDefault();
        setBrightness(prev => {
          const nb = Math.max(10, prev - 5);
          showChromeToast(isEn ? `Brightness: ${nb}%` : `Brilho: ${nb}%`);
          return nb;
        });
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const [wifiEnabled, setWifiEnabled] = useState(true);
  const [bluetoothEnabled, setBluetoothEnabled] = useState(true);
  const [dndEnabled, setDndEnabled] = useState(false);
  const [nightLightEnabled, setNightLightEnabled] = useState(false);
  const [nearbyShareEnabled, setNearbyShareEnabled] = useState(false);
  const [screenshotFlash, setScreenshotFlash] = useState(false);
  const [calendarViewDate, setCalendarViewDate] = useState(() => new Date());
  const [currentTime, setCurrentTime] = useState(() => {
    const now = new Date();
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    return `${hours}:${minutes}`;
  });
  const [focusedSection, setFocusedSection] = useState('browser');
  const [systemAlert, setSystemAlert] = useState<string | null>(null);
  const [showSimNotice, setShowSimNotice] = useState(true);
  const [searchSuggestions] = useState(['Docs', 'YouTube', 'Chrome', 'Calculator', 'Gmail']);
  
  // App specific states
  interface ChromeTab {
    id: string;
    title: string;
    url: string;
    history: string[];
    historyIndex: number;
    srcdoc?: string;
    loadStatus: 'direct' | 'srcdoc' | 'fallback' | 'newtab';
  }

  const [chromeTabs, setChromeTabs] = useState<ChromeTab[]>([
    {
      id: 'tab-1',
      title: 'Google',
      url: 'https://www.google.com/search?igu=1',
      history: ['https://www.google.com/search?igu=1'],
      historyIndex: 0,
      loadStatus: 'direct'
    }
  ]);
  const [activeChromeTabId, setActiveChromeTabId] = useState('tab-1');
  const [isChromeLoading, setIsChromeLoading] = useState(false);
  const [chromeFavorites, setChromeFavorites] = useState<{ name: string; url: string }[]>(() => {
    try {
      const saved = localStorage.getItem('quiabbo_chrome_favorites');
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.error(e);
    }
    return [
      { name: 'Google', url: 'https://www.google.com/search?igu=1' },
      { name: 'Meu Linux', url: 'https://meulinux.com' },
      { name: 'YouTube', url: 'https://youtube.com' }
    ];
  });
  const [chromeToast, setChromeToast] = useState<{ message: string; visible: boolean }>({ message: '', visible: false });

  // Sync state derived from active tab
  const activeChromeTab = chromeTabs.find(t => t.id === activeChromeTabId) || chromeTabs[0];
  const chromeCurrentUrl = activeChromeTab.url;
  const chromeHistory = activeChromeTab.history;
  const chromeHistoryIndex = activeChromeTab.historyIndex;

  const [browserInputUrl, setBrowserInputUrl] = useState('https://www.google.com/search?igu=1');
  const [showChromeMenu, setShowChromeMenu] = useState(false);
  const [showChromePrivacyModal, setShowChromePrivacyModal] = useState(false);
  const [chromeGoogleAppsOpen, setChromeGoogleAppsOpen] = useState(false);
  const chromeMenuRef = useRef<HTMLDivElement>(null);
  const chromeAppsMenuRef = useRef<HTMLDivElement>(null);

  // Legacy bindings for backward compatibility
  const browserHistory = chromeHistory;
  const browserHistIdx = chromeHistoryIndex;

  // YouTube simulator states inside browser
  const SIM_YOUTUBE_VIDEOS = [
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
      id: "h-g8kHclUqU",
      title: "ChromeOS v124: Novidades Completas e Como Instalar em Qualquer PC",
      channel: "Meu Linux Portal",
      views: "185 mil visualizações",
      time: "há 2 dias",
      avatar: "🐧",
      thumbnail: "bg-gradient-to-br from-blue-600 to-indigo-800"
    },
    {
      id: "jfKfPfyJRdk",
      title: "lofi hip hop radio - beats to relax/study to 💻 Focus Code",
      channel: "Lofi Girl",
      views: "48K assistindo agora",
      time: "AO VIVO",
      avatar: "🎧",
      thumbnail: "bg-gradient-to-br from-indigo-950 to-pink-700"
    },
    {
      id: "V1y-ZsDUNWg",
      title: "O que é ChromeOS Flex? Uma explicação simples, rápida e didática",
      channel: "Meu Linux Portal",
      views: "72 mil visualizações",
      time: "há 1 mês",
      avatar: "🌐",
      thumbnail: "bg-gradient-to-br from-emerald-600 to-teal-800"
    }
  ];

  const [ytSearchQuery, setYtSearchQuery] = useState('');
  const [ytActiveVideoId, setYtActiveVideoId] = useState<string | null>(null);
  const [ytLikedVideos, setYtLikedVideos] = useState<string[]>([]);
  const [ytSubscribedChannels, setYtSubscribedChannels] = useState<string[]>([]);

  // NotebookLM states
  const [notebookLmMessages, setNotebookLmMessages] = useState<{ sender: 'user' | 'ai'; text: string }[]>([
    { sender: 'ai', text: 'Olá! Sou seu guia de fontes NotebookLM. Posso responder qualquer dúvida baseada nas fontes e documentos carregados ao lado!' }
  ]);
  const [notebookLmInput, setNotebookLmInput] = useState('');
  const [notebookLmTypingText, setNotebookLmTypingText] = useState(false);
  const [notebookSelectedDoc, setNotebookSelectedDoc] = useState<'doc1' | 'doc2' | 'doc3'>('doc1');

  // Gemini application states
  const [geminiMessages, setGeminiMessages] = useState<{ sender: 'user' | 'gemini'; text: string }[]>([
    { sender: 'gemini', text: 'Olá! Sou o Gemini, a inteligência artificial do Google. Como posso te apoiar com sua produtividade e dúvidas de tecnologia hoje?' }
  ]);
  const [geminiInput, setGeminiInput] = useState('');
  const [isGeminiLoading, setIsGeminiLoading] = useState(false);

  const notebookLmDocuments = {
    doc1: {
      title: "Guia de Sobrevivência Linux.txt",
      size: "4.2 KB",
      content: "O Linux é estruturado em torno do Kernel (núcleo) e de utilitários de sistema (GNU). Suas maiores vantagens incluem o gerenciamento supremo de memória virtual, isolamento de processos por namespaces cgroups, e empacotamento modular de softwares que dispensam reboots complexos no ecossistema."
    },
    doc2: {
      title: "ChromeOS Flex Benchmarks.pdf",
      size: "8.5 KB",
      content: "Resultados obtidos em hardware antigo (Intel i3 de 4ª Geração, 4GB RAM) demonstram inicialização em 12 segundos usando ChromeOS Flex, contra 48 segundos no sistema tradicional de arquivos pesados. O consumo de energia foi reduzido em média 35% durante reprodução de mídia."
    },
    doc3: {
      title: "Minhas Anotações Rápidas",
      size: "1.1 KB",
      content: "Ideias do Projeto:\n- Criar um simulador de browser de alta fidelidade rodando em iframe isolado.\n- Substituir os ícones de terceiros por SVGs limpos e oficiais em branco/preto.\n- Implementar suporte nativo a ferramentas de IA."
    }
  };

  const askNotebookLm = (promptText: string) => {
    if (!promptText.trim()) return;
    setNotebookLmMessages(prev => [...prev, { sender: 'user', text: promptText }]);
    setNotebookLmInput('');
    setNotebookLmTypingText(true);

    setTimeout(() => {
      let reply = "Interessante! Analisando os documentos adicionados, encontrei informações relevantes:\n\n";
      const lower = promptText.toLowerCase();

      if (lower.includes('resumo') || lower.includes('tópicos')) {
        reply += "• **Eficiência de Recursos**: ChromeOS Flex reduz o consumo em 35% e inicializa em 12s.\n• **Kernel Isolado**: O Linux isola namespaces e cgroups, permitindo estabilidade de servidor.\n• **Integração Web**: A otimização direta pelo navegador otimiza as tarefas em PCs legados.";
      } else if (lower.includes('desempenho') || lower.includes('diferenças') || lower.includes('benchmark')) {
        reply += "Conforme o documento **ChromeOS Flex Benchmarks.pdf**, a velocidade foi de **12s** versus **48s** em hardware obsoleto, poupando energia e estendendo a via útil de notebooks antigos de forma expressiva.";
      } else if (lower.includes('kernel')) {
        reply += "No **Guia de Sobrevivência Linux.txt**, o Kernel é definido como o núcleo central do sistema, responsável por gerenciar a comunicação entre o hardware e o software de forma isolada e altamente estável.";
      } else {
        reply += "Com base nas suas fontes de dados, esse tópico destaca a arquitetura modular e segura dos sistemas Linux simulados na plataforma. Deseja que eu elabore um plano detalhado com base nessas referências?";
      }

      setNotebookLmMessages(prev => [...prev, { sender: 'ai', text: reply }]);
      setNotebookLmTypingText(false);
    }, 1200);
  };

  const askGemini = async (promptText: string) => {
    if (!promptText.trim() || isGeminiLoading) return;
    setGeminiMessages(prev => [...prev, { sender: 'user', text: promptText }]);
    setGeminiInput('');
    setIsGeminiLoading(true);

    try {
      const apiKey = import.meta.env.VITE_GEMINI_API_KEY || '';
      if (apiKey) {
        const ai = new GoogleGenAI({ apiKey });
        const response = await ai.models.generateContent({
          model: 'gemini-3.5-flash',
          contents: [{ role: 'user', parts: [{ text: promptText }] }],
          config: {
            systemInstruction: 'Você é o Google Gemini integrado de alto desempenho no Chromebook Simulator (sistema rodando o Chrome OS). Ofereça respostas em português muito úteis, técnicas mas simples e amigáveis baseadas em Linux, Chrome OS, e o meuLinux.'
          }
        });
        const ansText = response.text || 'Não consegui formular uma resposta no momento.';
        setGeminiMessages(prev => [...prev, { sender: 'gemini', text: ansText }]);
      } else {
        setTimeout(() => {
          let reply = '';
          const lower = promptText.toLowerCase();
          if (lower.includes('chrome') || lower.includes('flex')) {
            reply = 'O **Chrome OS Flex** é o sistema leve do Google projetado para restaurar de forma completa PCs antigos. Ele foca em velocidade extrema, segurança nativa e operação focada na nuvem. Ele inicializa em menos de 12 segundos!';
          } else if (lower.includes('linux') || lower.includes('mint') || lower.includes('ubuntu')) {
            reply = 'O Chrome OS é baseado no Kernel Linux! Ele conta com o suporte de contêiner integrado Crostini, permitindo que você ative um terminal de sistema do Debian original e execute ferramentas de desenvolvimento como VSCode, Python e NodeJS diretamente no Chromebook!';
          } else if (lower.includes('olá') || lower.includes('oi') || lower.includes('bom dia') || lower.includes('boa tarde')) {
            reply = 'Olá! Sou o Gemini, seu assistente inteligente integrado do Chrome OS. É fantástico ter você testando o simulador. Como posso impulsionar suas tarefas ou tirar dúvidas técnicas hoje?';
          } else {
            reply = `Recebi sua mensagem: "${promptText}"! No simulador offline, posso te ajudar a descobrir e dominar tudo sobre a leveza do Chrome OS, a versatilidade de rodar aplicativos Linux na máquina, ou recursos de acessibilidade.`;
          }
          setGeminiMessages(prev => [...prev, { sender: 'gemini', text: reply }]);
        }, 1200);
      }
    } catch (err) {
      console.error(err);
      setGeminiMessages(prev => [...prev, { sender: 'gemini', text: 'Houve um erro de conexão ao consultar a inteligência do Gemini. Você ainda pode testar simuladamente perguntando sobre Chrome OS, Flex, ou Linux!' }]);
    } finally {
      setIsGeminiLoading(false);
    }
  };

  const showChromeToast = (message: string) => {
    setChromeToast({ message, visible: true });
    setTimeout(() => setChromeToast({ message: '', visible: false }), 2000);
  };

  const getChromeTabTitle = (url: string) => {
    try {
      if (!url || url === 'chrome://newtab' || url === 'about:newtab') return 'Nova guia';
      const parsed = new URL(url);
      if (parsed.hostname.includes('google.com')) return 'Google';
      if (parsed.hostname.includes('youtube.com') || parsed.hostname.includes('youtu.be')) return 'YouTube Sim';
      if (parsed.hostname.includes('wikipedia.org')) return 'Wikipedia';
      if (parsed.hostname.includes('meulinux.com')) return 'Meu Linux Portal';
      if (parsed.hostname.includes('duckduckgo.com')) return 'DuckDuckGo';
      return parsed.hostname.replace('www.', '');
    } catch {
      return url.length > 20 ? url.substring(0, 20) + '...' : url;
    }
  };

  const getChromeFavicon = (url: string) => {
    try {
      if (!url || url === 'chrome://newtab' || url === 'about:newtab') return '/assets/chrome.png';
      const parsed = new URL(url);
      return `https://www.google.com/s2/favicons?sz=32&domain=${parsed.hostname}`;
    } catch {
      return '/assets/chrome.png';
    }
  };

  const fetchChromePageViaProxy = async (url: string, tabId: string) => {
    setIsChromeLoading(true);
    try {
      const rawUrl = `https://api.allorigins.win/raw?url=${encodeURIComponent(url)}`;
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 8000);
      
      const response = await fetch(rawUrl, { signal: controller.signal });
      clearTimeout(timeoutId);
      
      if (!response.ok) throw new Error();
      const htmlText = await response.text();
      if (!htmlText || htmlText.trim().length === 0) throw new Error();

      let modifiedHtml = htmlText;
      const baseTag = `<base href="${url}">`;
      
      if (modifiedHtml.includes('<head>')) {
        modifiedHtml = modifiedHtml.replace('<head>', `<head>${baseTag}`);
      } else if (modifiedHtml.includes('<HEAD>')) {
        modifiedHtml = modifiedHtml.replace('<HEAD>', `<HEAD>${baseTag}`);
      } else {
        modifiedHtml = baseTag + modifiedHtml;
      }

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
                       window.parent.postMessage({
                         type: 'CHROME_NAVIGATE',
                         url: helper.href
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
        modifiedHtml = modifiedHtml.replace('</body>', clickScript + '</body>');
      } else if (modifiedHtml.includes('</BODY>')) {
        modifiedHtml = modifiedHtml.replace('</BODY>', clickScript + '</BODY>');
      } else {
        modifiedHtml = modifiedHtml + clickScript;
      }

      setChromeTabs(prev => prev.map(tab => {
        if (tab.id === tabId) {
          return { ...tab, srcdoc: modifiedHtml, loadStatus: 'srcdoc' };
        }
        return tab;
      }));
    } catch {
      setChromeTabs(prev => prev.map(tab => {
        if (tab.id === tabId) return { ...tab, loadStatus: 'fallback' };
        return tab;
      }));
    } finally {
      setIsChromeLoading(false);
    }
  };

  const navigateChrome = (url: string) => {
    let normalized = url.trim();
    if (!normalized) return;

    const isGoogleHome = (u: string) => {
      const lower = u.toLowerCase().trim().replace('http://', '').replace('https://', '').replace('www.', '');
      return lower === 'chrome://newtab' || lower === 'about:newtab' || lower === 'google.com.br' || lower === 'google.com' || lower === 'google.com.br/' || lower === 'google.com/' || lower.includes('google.com.br/search?igu=1') || lower.includes('google.com/search?igu=1');
    };
    
    if (isGoogleHome(normalized)) {
      normalized = 'https://www.google.com/search?igu=1';
      setChromeTabs(prev => prev.map(tab => {
        if (tab.id === activeChromeTabId) {
          const newHistory = tab.history.slice(0, tab.historyIndex + 1);
          newHistory.push(normalized);
          return {
            ...tab,
            url: normalized,
            title: 'Google',
            history: newHistory,
            historyIndex: newHistory.length - 1,
            srcdoc: undefined,
            loadStatus: 'direct'
          };
        }
        return tab;
      }));
      setBrowserInputUrl('https://www.google.com/search?igu=1');
      return;
    }

    if (!normalized.startsWith('http://') && !normalized.startsWith('https://')) {
      if (normalized.includes('.') && !normalized.includes(' ')) {
        normalized = 'https://' + normalized;
      } else {
        normalized = `https://www.google.com/search?q=${encodeURIComponent(normalized)}&igu=1`;
      }
    }

    if (isGoogleHome(normalized)) {
      normalized = 'https://www.google.com/search?igu=1';
    }

    setChromeTabs(prev => prev.map(tab => {
      if (tab.id === activeChromeTabId) {
        const newHistory = tab.history.slice(0, tab.historyIndex + 1);
        newHistory.push(normalized);
        return {
          ...tab,
          url: normalized,
          title: getChromeTabTitle(normalized),
          history: newHistory,
          historyIndex: newHistory.length - 1,
          srcdoc: undefined,
          loadStatus: 'direct'
        };
      }
      return tab;
    }));
    
    setBrowserInputUrl(normalized);

    if (normalized.includes('google.com')) {
      setIsChromeLoading(true);
      return;
    }

    fetchChromePageViaProxy(normalized, activeChromeTabId);
  };

  const goBackChrome = () => {
    const tabToUpdate = chromeTabs.find(t => t.id === activeChromeTabId);
    if (tabToUpdate && tabToUpdate.historyIndex > 0) {
      const newIndex = tabToUpdate.historyIndex - 1;
      const url = tabToUpdate.history[newIndex];
      
      setChromeTabs(prev => prev.map(tab => {
        if (tab.id === activeChromeTabId) {
          return {
            ...tab,
            url,
            title: getChromeTabTitle(url),
            historyIndex: newIndex,
            srcdoc: undefined,
            loadStatus: 'direct'
          };
        }
        return tab;
      }));
      setBrowserInputUrl(url);
      
      if (url.includes('google.com')) {
        setIsChromeLoading(true);
      } else {
        fetchChromePageViaProxy(url, activeChromeTabId);
      }
    }
  };

  const goForwardChrome = () => {
    const tabToUpdate = chromeTabs.find(t => t.id === activeChromeTabId);
    if (tabToUpdate && tabToUpdate.historyIndex < tabToUpdate.history.length - 1) {
      const newIndex = tabToUpdate.historyIndex + 1;
      const url = tabToUpdate.history[newIndex];
      
      setChromeTabs(prev => prev.map(tab => {
        if (tab.id === activeChromeTabId) {
          return {
            ...tab,
            url,
            title: getChromeTabTitle(url),
            historyIndex: newIndex,
            srcdoc: undefined,
            loadStatus: 'direct'
          };
        }
        return tab;
      }));
      setBrowserInputUrl(url);
      
      if (url.includes('google.com')) {
        setIsChromeLoading(true);
      } else {
        fetchChromePageViaProxy(url, activeChromeTabId);
      }
    }
  };

  const reloadChrome = () => {
    setIsChromeLoading(true);
    if (chromeCurrentUrl.includes('google.com')) {
      setTimeout(() => setIsChromeLoading(false), 600);
    } else {
      fetchChromePageViaProxy(chromeCurrentUrl, activeChromeTabId);
    }
  };

  const openNewChromeTab = () => {
    const newTabId = `chrome-tab-${Date.now()}`;
    const newTab: ChromeTab = {
      id: newTabId,
      title: 'Google',
      url: 'https://www.google.com/search?igu=1',
      history: ['https://www.google.com/search?igu=1'],
      historyIndex: 0,
      loadStatus: 'direct'
    };
    setChromeTabs(prev => [...prev, newTab]);
    setActiveChromeTabId(newTabId);
    setBrowserInputUrl('https://www.google.com/search?igu=1');
  };

  const closeChromeTab = (tabIdToClose: string) => {
    if (chromeTabs.length <= 1) return;
    const closedIndex = chromeTabs.findIndex(t => t.id === tabIdToClose);
    const newTabs = chromeTabs.filter(t => t.id !== tabIdToClose);
    setChromeTabs(newTabs);

    if (activeChromeTabId === tabIdToClose) {
      const nextActiveIndex = Math.max(0, closedIndex - 1);
      const nextTab = newTabs[nextActiveIndex];
      setActiveChromeTabId(nextTab.id);
      setBrowserInputUrl(nextTab.url);
    }
  };

  const toggleChromeFavorite = () => {
    const isFavorite = chromeFavorites.some(f => f.url === chromeCurrentUrl);
    let newFavorites;
    if (isFavorite) {
      newFavorites = chromeFavorites.filter(f => f.url !== chromeCurrentUrl);
      showChromeToast(isEn ? 'Removed from bookmarks' : 'Removido dos favoritos');
    } else {
      const domain = chromeCurrentUrl.replace('https://', '').replace('http://', '').split('/')[0];
      newFavorites = [...chromeFavorites, { name: domain || 'Nova Página', url: chromeCurrentUrl }];
      showChromeToast(isEn ? 'Added to bookmarks' : 'Adicionado aos favoritos');
    }
    setChromeFavorites(newFavorites);
    localStorage.setItem('quiabbo_chrome_favorites', JSON.stringify(newFavorites));
  };

  // Sync back browserInputUrl when tab is switched
  useEffect(() => {
    setBrowserInputUrl(chromeCurrentUrl);
  }, [chromeCurrentUrl, activeChromeTabId]);

  // Auto-finish chrome loader for custom React-rendered Google pages
  useEffect(() => {
    if (chromeCurrentUrl.includes('google.com') && isChromeLoading) {
      const timer = setTimeout(() => {
        setIsChromeLoading(false);
      }, 400);
      return () => clearTimeout(timer);
    }
  }, [chromeCurrentUrl, isChromeLoading]);

  useEffect(() => {
    const handleChromeMsg = (e: MessageEvent) => {
      if (e.data && e.data.type === 'CHROME_NAVIGATE') {
        const urlObj = e.data.url;
        navigateChrome(urlObj);
      }
    };
    window.addEventListener('message', handleChromeMsg);
    return () => window.removeEventListener('message', handleChromeMsg);
  }, [activeChromeTabId, chromeTabs]);
  const [calcDisplay, setCalcDisplay] = useState('0');
  const [notes, setNotes] = useState<{ id: number; title: string; content: string; color: string }[]>([
    { id: 1, title: 'Lista de Compras', content: 'SSD de 240GB\nMemória DDR4 8GB\nCase de HD Externo', color: '#fff9c4' },
    { id: 2, title: 'Dica do Chrome OS', content: 'O Chrome OS Flex roda liso em computadores antigos e inicia em segundos!', color: '#e1f5fe' }
  ]);
  const [editingNoteId, setEditingNoteId] = useState<number | null>(null);
  const [noteTitleInput, setNoteTitleInput] = useState('');
  const [noteContentInput, setNoteContentInput] = useState('');
  
  // Files simulator states
  const [filePath, setFilePath] = useState<string[]>(['Meus Arquivos']);
  const [selectedFileItem, setSelectedFileItem] = useState<string | null>(null);
  const filesList = [
    { name: 'Documento Importante.pdf', size: '2.4 MB', type: 'pdf', icon: <FileText size={18} className="text-blue-500" /> },
    { name: 'Foto de Viagem.jpg', size: '4.1 MB', type: 'image', icon: <Image size={18} className="text-green-500" /> },
    { name: 'Trabalho de Biologia.gdoc', size: '1 KB', type: 'gdoc', icon: <FileText size={18} className="text-blue-400" /> },
    { name: 'Planilha Financeira.gsheet', size: '1 KB', type: 'gsheet', icon: <FileText size={18} className="text-emerald-500" /> }
  ];

  const desktopRef = useRef<HTMLDivElement>(null);
  const topZIndex = useRef(10);

  useEffect(() => {
    // Elegant fade state - precisely 2 seconds as requested
    const timer = setTimeout(() => {
      setIsBooting(false);
      playChromeChime(volume);
    }, 2000);

    // Keep clock in 24h format
    const clockInterval = setInterval(() => {
      const now = new Date();
      const hours = String(now.getHours()).padStart(2, '0');
      const minutes = String(now.getMinutes()).padStart(2, '0');
      setCurrentTime(`${hours}:${minutes}`);
    }, 1000);

    // Handler for closing chrome options menu on click outside
    const handleClickOutside = (event: MouseEvent) => {
      if (chromeMenuRef.current && !chromeMenuRef.current.contains(event.target as Node)) {
        setShowChromeMenu(false);
      }
      if (chromeAppsMenuRef.current && !chromeAppsMenuRef.current.contains(event.target as Node)) {
        setChromeGoogleAppsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      clearTimeout(timer);
      clearInterval(clockInterval);
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const triggerAlert = (msg: string) => {
    setSystemAlert(msg);
    setTimeout(() => setSystemAlert(null), 3500);
  };

  const getFooterDateString = () => {
    const daysOfWeek = ['Dom.', 'Seg.', 'Ter.', 'Qua.', 'Qui.', 'Sex.', 'Sáb.'];
    const months = ['jan.', 'fev.', 'mar.', 'abr.', 'mai.', 'jun.', 'jul.', 'ago.', 'set.', 'out.', 'nov.', 'dez.'];
    const now = new Date();
    const dayName = daysOfWeek[now.getDay()];
    const day = now.getDate();
    const monthName = months[now.getMonth()];
    return `${dayName}, ${day} de ${monthName} | 100% - Carregada`;
  };

  const masterApps: ChromeApp[] = [
    // Page 1
    { id: 'gemini', name: 'Gemini', category: 'Produtividade', logo: <ChromeOSAppIcon id="gemini" size={44} fallback={<Sparkles size={18} className="text-[#8ab4f8]" />} /> },
    { id: 'youtube', name: 'YouTube', category: 'Lazer', logo: <ChromeOSAppIcon id="youtube" size={48} fallback={<YouTubeLogo size={48} />} /> },
    { id: 'gmail', name: 'Gmail', category: 'Mensagens', logo: <ChromeOSAppIcon id="gmail" size={48} fallback={<GmailLogo size={48} />} /> },
    { id: 'calendar', name: 'Agenda', category: 'Produtividade', logo: <ChromeOSAppIcon id="calendar" size={44} fallback={<GoogleCalendarLogo size={44} />} /> },
    { id: 'meet', name: 'Google Meet', category: 'Trabalho', logo: <ChromeOSAppIcon id="meet" size={44} fallback={<GoogleMeetLogo size={44} />} /> },
    { id: 'chrome', name: 'Chrome', category: 'Navegação', logo: <ChromeOSAppIcon id="chrome" size={44} fallback={<ChromeLogo size={44} />} /> },
    { id: 'webstore', name: 'Web Store', category: 'Navegação', logo: <ChromeOSAppIcon id="webstore" size={44} fallback={<WebStoreLogo size={44} />} /> },
    { id: 'docs', name: 'Docs', category: 'Escritório', logo: <ChromeOSAppIcon id="docs" size={44} fallback={<DocsLogo size={44} />} /> },
    { id: 'slides', name: 'Apresentações', category: 'Escritório', logo: <ChromeOSAppIcon id="slides" size={44} fallback={<SlidesLogo size={44} />} /> },
    { id: 'sheets', name: 'Planilhas', category: 'Escritório', logo: <ChromeOSAppIcon id="sheets" size={44} fallback={<SheetsLogo size={44} />} /> },
    { id: 'keep', name: 'Google Keep', category: 'Anotações', logo: <ChromeOSAppIcon id="keep" size={44} fallback={<KeepLogo size={44} />} /> },
    { id: 'calculator', name: 'Calculadora', category: 'Utilidade', logo: <ChromeOSAppIcon id="calculator" size={44} fallback={<CalculatorLogo size={44} />} /> },
    // Page 2
    { id: 'files', name: 'Arquivos', category: 'Utilidade', logo: <ChromeOSAppIcon id="files" size={44} fallback={<FilesLogo size={44} />} /> },
    { id: 'music', name: 'YT Music', category: 'Lazer', logo: <ChromeOSAppIcon id="music" size={44} fallback={<PlayMusicLogo size={44} />} /> },
    { id: 'camera', name: 'Câmera', category: 'Lazer', logo: <ChromeOSAppIcon id="camera" size={44} fallback={<CameraLogo size={44} />} /> },
    { id: 'maps', name: 'Google Maps', category: 'Navegação', logo: <ChromeOSAppIcon id="maps" size={44} fallback={<MapsLogo size={44} />} /> },
    { id: 'settings', name: 'Configurações', category: 'Utilidade', logo: <ChromeOSAppIcon id="settings" size={44} fallback={<SettingsLogo size={44} />} /> },
    { id: 'diagnostics', name: 'Diagnósticos', category: 'Utilidade', logo: <ChromeOSAppIcon id="diagnostics" size={44} fallback={<DiagnosticsLogo size={44} />} /> },
    { id: 'notebooklm', name: 'NotebookLM', category: 'Produtividade', logo: <ChromeOSAppIcon id="notebooklm" size={44} fallback={<DocsLogo size={44} />} /> }
  ];

  // Filtering based on search query
  const filteredApps = searchQuery.trim() === '' 
    ? (activePage === 'p1' ? masterApps.slice(0, 12) : masterApps.slice(12))
    : masterApps.filter(a => a.name.toLowerCase().includes(searchQuery.toLowerCase()) || a.category.toLowerCase().includes(searchQuery.toLowerCase()));

  const closeWindow = (id: string, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    setOpenWindows(openWindows.filter(w => w.id !== id));
    if (activeWindowId === id) {
      const remaining = openWindows.filter(w => w.id !== id);
      if (remaining.length > 0) {
        const sorted = [...remaining].sort((a, b) => b.zIndex - a.zIndex);
        setActiveWindowId(sorted[0].id);
      } else {
        setActiveWindowId(null);
      }
    }
  };

  const minimizeWindow = (id: string, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    setOpenWindows(prev => {
      const updated = prev.map(w => w.id === id ? { ...w, isMinimized: true } : w);
      if (activeWindowId === id) {
        const remaining = updated.filter(w => !w.isMinimized);
        if (remaining.length > 0) {
          const sorted = [...remaining].sort((a, b) => b.zIndex - a.zIndex);
          setTimeout(() => setActiveWindowId(sorted[0].id), 0);
        } else {
          setTimeout(() => setActiveWindowId(null), 0);
        }
      }
      return updated;
    });
  };

  const launchApp = (appId: string, customTitle?: string) => {
    const existing = openWindows.find(w => w.id === appId);
    setLauncherOpen(false);

    // Dynamic scale positioning inside desktop grid container
    const dWidth = desktopRef.current?.clientWidth || 850;
    const dHeight = desktopRef.current?.clientHeight || 550;
    const offset = openWindows.length * 30;

    const isCalc = appId === 'calculator';
    const winWidth = isCalc ? 250 : Math.min(800, dWidth - 40);
    const winHeight = isCalc ? 385 : Math.min(500, dHeight - 60);

    if (existing) {
      // If the window is currently active and NOT minimized, click on shelf will minimize it!
      if (activeWindowId === appId && !existing.isMinimized) {
        minimizeWindow(appId);
        return;
      }

      // Bring existing to front and restore it/unminimize it
      topZIndex.current += 1;
      setOpenWindows(prev => prev.map(w => w.id === appId ? { ...w, zIndex: topZIndex.current, isMinimized: false } : w));
      setActiveWindowId(appId);
      return;
    }

    const appNameMap: { [key: string]: string } = {
       gemini: 'Google Gemini',
       chrome: 'Navegador Google Chrome',
       youtube: 'YouTube Web',
       gmail: 'Google Gmail Inbox',
       meet: 'Google Meet',
       calendar: 'Agenda Google',
       keep: 'Google Keep Notes',
       files: 'Gerenciador de Arquivos',
       music: 'YouTube Music Player',
       camera: 'Câmera Chromebook',
       maps: 'Google Maps Interativo',
       settings: 'Configurações do ChromeOS',
       calculator: 'Calculadora de Sistema',
       diagnostics: 'Diagnósticos do Computador',
       webstore: 'Chrome Web Store',
       docs: 'Google Documentos (Docs)',
       sheets: 'Google Planilhas (Sheets)',
       slides: 'Google Slides',
       notebooklm: 'NotebookLM AI Assistant'
     };

    topZIndex.current += 1;
    const newWin: WindowInstance = {
      id: appId,
      title: customTitle || appNameMap[appId] || appId.toUpperCase(),
      isMaximized: appId !== 'calculator' && (appId === 'chrome' || dWidth < 768),
      x: Math.max(20, (dWidth - winWidth) / 2 + offset),
      y: Math.max(30, (dHeight - winHeight) / 2 + offset),
      width: winWidth,
      height: winHeight,
      zIndex: topZIndex.current,
      isMinimized: false
    };

    setOpenWindows([...openWindows, newWin]);
    setActiveWindowId(appId);
  };

  const toggleMaximize = (id: string) => {
    setOpenWindows(openWindows.map(w => w.id === id ? { ...w, isMaximized: !w.isMaximized } : w));
  };

  const handleDragStart = (id: string, e: React.MouseEvent<HTMLDivElement>) => {
    const win = openWindows.find(w => w.id === id);
    if (!win || win.isMaximized) return;

    // Set active
    topZIndex.current += 1;
    setOpenWindows(openWindows.map(w => w.id === id ? { ...w, zIndex: topZIndex.current } : w));
    setActiveWindowId(id);

    const startX = e.clientX;
    const startY = e.clientY;
    const initialX = win.x;
    const initialY = win.y;

    const handleMouseMove = (mvEvent: MouseEvent) => {
      const dx = mvEvent.clientX - startX;
      const dy = mvEvent.clientY - startY;

      setOpenWindows(curr => curr.map(w => w.id === id ? {
        ...w,
        x: initialX + dx,
        y: initialY + dy
      } : w));
    };

    const handleMouseUp = () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseup', handleMouseUp);
  };

  const handleResizeStart = (id: string, dir: 's' | 'e' | 'se', e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
    e.preventDefault();
    const win = openWindows.find(w => w.id === id);
    if (!win || win.isMaximized) return;

    // Set active/bring to front
    topZIndex.current += 1;
    setOpenWindows(openWindows.map(w => w.id === id ? { ...w, zIndex: topZIndex.current } : w));
    setActiveWindowId(id);

    const startX = e.clientX;
    const startY = e.clientY;
    const initialWidth = win.width;
    const initialHeight = win.height;

    const handleMouseMove = (mvEvent: MouseEvent) => {
      const dx = mvEvent.clientX - startX;
      const dy = mvEvent.clientY - startY;

      setOpenWindows(curr => curr.map(w => {
        if (w.id === id) {
          let newWidth = w.width;
          let newHeight = w.height;

          if (dir === 'e' || dir === 'se') {
            newWidth = Math.max(320, initialWidth + dx);
          }
          if (dir === 's' || dir === 'se') {
            newHeight = Math.max(220, initialHeight + dy);
          }

          return {
            ...w,
            width: newWidth,
            height: newHeight
          };
        }
        return w;
      }));
    };

    const handleMouseUp = () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseup', handleMouseUp);
  };

  // Browser navigation proxy utility
  const visitUrl = (url: string) => {
    navigateChrome(url);
  };

  // Calculator processor
  const handleCalcBtn = (char: string) => {
    if (char === 'C') {
      setCalcDisplay('0');
    } else if (char === '=') {
      try {
        // Safe evaluation simulation
        const result = eval(calcDisplay.replace(/x/g, '*').replace(/÷/g, '/'));
        setCalcDisplay(String(result));
      } catch (e) {
        setCalcDisplay('Erro');
      }
    } else {
      if (calcDisplay === '0' || calcDisplay === 'Erro') {
        setCalcDisplay(char);
      } else {
        setCalcDisplay(calcDisplay + char);
      }
    }
  };

  // Google Keep helper
  const addKeepNote = () => {
    if (!noteTitleInput.trim() && !noteContentInput.trim()) return;
    const colors = ['#fff9c4', '#e1f5fe', '#e8f5e9', '#f8bbd0', '#e8eaf6'];
    const randomColor = colors[Math.floor(Math.random() * colors.length)];
    
    if (editingNoteId !== null) {
      setNotes(notes.map(n => n.id === editingNoteId ? { ...n, title: noteTitleInput, content: noteContentInput } : n));
      setEditingNoteId(null);
    } else {
      setNotes([...notes, {
        id: Date.now(),
        title: noteTitleInput || 'Nota Sem Título',
        content: noteContentInput,
        color: randomColor
      }]);
    }
    setNoteTitleInput('');
    setNoteContentInput('');
  };

  const deleteKeepNote = (id: number) => {
    setNotes(notes.filter(n => n.id !== id));
  };

  return (
    <div 
      style={{ filter: `brightness(${brightness}%)` }}
      className={`w-full h-full relative overflow-hidden select-none font-sans ${isDarkMode ? 'dark bg-[#121318] text-white' : 'bg-[#eef1f6] text-zinc-950'}`}
    >
      
      {/* Night Light eye-safe amber overlay */}
      {nightLightEnabled && (
        <div className="absolute inset-0 z-[9999] pointer-events-none bg-amber-500/8 mix-blend-multiply transition-opacity duration-500" />
      )}

      {/* Screenshot Flash animation */}
      <AnimatePresence>
        {screenshotFlash && (
          <motion.div 
            initial={{ opacity: 1 }}
            animate={{ opacity: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.35, ease: 'easeOut' }}
            className="absolute inset-0 z-[10000] pointer-events-none bg-white"
          />
        )}
      </AnimatePresence>

      {/* Dynamic Animated Chrome OS Boot Overlay */}
      <AnimatePresence>
        {isBooting && (
          <motion.div 
            className="absolute inset-0 z-[10000] bg-[#1f1f1f] flex flex-col items-center justify-center select-none"
            exit={{ opacity: 0, scale: 1.03 }}
            transition={{ duration: 0.5 }}
          >
            <motion.img 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              src="/assets/Chrome-OS-New-Boot-Screen-Feature-750x420Ativo 2.svg"
              alt="ChromeOS Logo"
              className="w-56 md:w-64 object-contain brightness-0 invert"
              referrerPolicy="no-referrer"
            />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Background Wallpaper matching original deep hue gradients */}
      <div 
        className="absolute inset-0 w-full h-full z-0 bg-cover bg-center transition-all duration-1000 pointer-events-none"
        style={{
          backgroundImage: "url('/assets/the-lonely-rock-chrome-os-light-2560x1600.jpg')",
        }}
      />

      {/* CORE DESKTOP AREA / WINDOW MANAGEMENT */}
      <div 
        ref={desktopRef}
        className="absolute top-0 bottom-[48px] left-0 right-0 z-10 p-3"
        onClick={() => {
          setLauncherOpen(false);
          setQuickSettingsOpen(false);
        }}
      >
        {/* Dynamic Alert Banner */}
        <AnimatePresence>
          {systemAlert && (
            <motion.div 
              initial={{ y: -50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -50, opacity: 0 }}
              className="absolute top-4 left-1/2 -translate-x-1/2 z-[999] px-4 py-2 bg-[#202124] text-white rounded-full text-xs font-semibold shadow-2xl flex items-center gap-2 border border-white/10"
            >
              <DiagnosticsLogoMini size={14} />
              {systemAlert}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Windows Rendering */}
        <AnimatePresence>
          {openWindows.map((win) => {
            const isWindowActive = activeWindowId === win.id;
            return (
              <motion.div
                key={win.id}
                style={{
                  zIndex: win.zIndex,
                  width: win.isMaximized ? '100%' : win.width,
                  height: win.isMaximized ? '100%' : win.height,
                  left: win.isMaximized ? 0 : win.x,
                  top: win.isMaximized ? 0 : win.y,
                  position: 'absolute',
                  pointerEvents: win.isMinimized ? 'none' : 'auto'
                }}
                className={`rounded-xl overflow-hidden shadow-2xl flex flex-col border transition-shadow duration-300 ${
                  isDarkMode 
                    ? (isWindowActive ? 'bg-[#1e1f22] border-white/25 text-white' : 'bg-[#1e1f22] border-white/10 text-white')
                    : (isWindowActive ? 'bg-white border-zinc-400 text-zinc-900' : 'bg-white border-zinc-200 text-zinc-900')
                }`}
                initial={{ scale: 0.94, opacity: 0 }}
                animate={{ scale: win.isMinimized ? 0.3 : 1, opacity: win.isMinimized ? 0 : 1 }}
                exit={{ scale: 0.94, opacity: 0 }}
                transition={{ duration: 0.2 }}
                onClick={(e) => {
                  e.stopPropagation();
                  topZIndex.current += 1;
                  setOpenWindows(prev => prev.map(w => w.id === win.id ? { ...w, zIndex: topZIndex.current } : w));
                  setActiveWindowId(win.id);
                }}
              >
                {/* Window TitleBar */}
                {win.id !== 'chrome' && (
                  <div 
                    className={`px-4 py-3 shrink-0 flex items-center justify-between cursor-move select-none ${
                      isDarkMode ? 'bg-[#2b2d31]' : 'bg-[#f0f4f9]'
                    }`}
                    onDoubleClick={() => win.id !== 'calculator' && toggleMaximize(win.id)}
                    onMouseDown={(e) => handleDragStart(win.id, e)}
                  >
                    <div className="flex items-center gap-2.5">
                      {masterApps.find(a => a.id === win.id)?.logo || <ChromeLogo size={20} />}
                      <span className="text-xs font-medium tracking-wide truncate max-w-[200px] md:max-w-[400px]">
                        {win.title}
                      </span>
                    </div>

                    {/* Windows System Control Controls */}
                    <div className="flex items-center gap-3" onMouseDown={(e) => e.stopPropagation()}>
                      <button 
                        onClick={(e) => minimizeWindow(win.id, e)}
                        className={`p-1 rounded-full transition-colors ${isDarkMode ? 'hover:bg-white/10 text-zinc-300' : 'hover:bg-zinc-200 text-zinc-600'}`}
                        title="Minimizar"
                      >
                        <Minus size={15} />
                      </button>
                      {win.id !== 'calculator' && (
                        <button 
                          onClick={(e) => { e.stopPropagation(); toggleMaximize(win.id); }}
                          className={`p-1 rounded-full transition-colors ${isDarkMode ? 'hover:bg-white/10 text-zinc-300' : 'hover:bg-zinc-200 text-zinc-600'}`}
                          title={win.isMaximized ? 'Restaurar' : 'Maximizar'}
                        >
                          <Square size={12} />
                        </button>
                      )}
                      <button 
                        onClick={(e) => closeWindow(win.id, e)}
                        className={`p-1 rounded-full transition-colors ${isDarkMode ? 'hover:bg-white/10 text-zinc-300' : 'hover:bg-zinc-200 text-zinc-600'}`}
                        title="Fechar"
                      >
                        <X size={14} />
                      </button>
                    </div>
                  </div>
                )}

                {/* WINDOW CORE INNER VIEWPORT */}
                <div className="flex-grow w-full h-full min-h-0 overflow-auto relative">
                  
                  {win.id === 'chrome' && (
                    <div className="w-full h-full flex flex-col relative select-none bg-[#1c1b22] text-zinc-300 font-sans">
                      {/* Chrome Tab Bar (Firefox style rounded-float design from Linux Mint) */}
                      <div 
                        className="h-10 bg-[#1c1b22] flex items-end px-3 gap-1.5 border-b border-black/20 text-xs text-zinc-300 relative shrink-0"
                        onMouseDown={(e) => {
                          if (e.target === e.currentTarget) {
                            handleDragStart(win.id, e);
                          }
                        }}
                        onDoubleClick={(e) => {
                          if (e.target === e.currentTarget) {
                            toggleMaximize(win.id);
                          }
                        }}
                      >
                        {/* Chrome Tabs navigation loop mapped to Firefox style */}
                        <div className="flex items-end gap-1.5 overflow-x-auto no-scrollbar max-w-[calc(100%-140px)]">
                          {chromeTabs.map((tab) => {
                            const isActive = tab.id === activeChromeTabId;
                            return (
                              <div
                                key={tab.id}
                                onClick={() => {
                                  setActiveChromeTabId(tab.id);
                                  setBrowserInputUrl(tab.url);
                                }}
                                className={`h-8 px-3.5 flex items-center gap-2 rounded-t-lg cursor-pointer transition-all max-w-[160px] min-w-[70px] relative text-[11px] ${
                                  isActive 
                                    ? 'bg-[#2b2a33] text-white font-semibold shadow-inner border-t border-white/5' 
                                    : 'text-zinc-400 hover:bg-white/5 hover:text-white'
                                }`}
                              >
                                <Globe size={11} className={`${isActive ? 'text-orange-400' : 'text-zinc-500'}`} />
                                <span className="truncate pr-4 leading-none select-none">{tab.title}</span>
                                {chromeTabs.length > 1 && (
                                  <button 
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      closeChromeTab(tab.id);
                                    }}
                                    className="absolute right-1.5 top-1/2 -translate-y-1/2 text-zinc-500 hover:text-white hover:bg-white/10 rounded-full p-0.5"
                                  >
                                    <X size={10} />
                                  </button>
                                )}
                              </div>
                            );
                          })}
                          
                          {/* Add Tab Button */}
                          <button 
                            onClick={openNewChromeTab}
                            className="p-1 mb-1 hover:bg-zinc-800 rounded text-zinc-400 hover:text-white transition-colors"
                            title="Nova guia"
                          >
                            <Plus size={13} />
                          </button>
                        </div>

                        {/* Draggable spacer block to drag the window */}
                        <div 
                          className="flex-grow h-8 self-center" 
                          onMouseDown={(e) => handleDragStart(win.id, e)}
                          onDoubleClick={() => toggleMaximize(win.id)}
                        />

                        {/* Integrated Window control buttons right inside the Tab Bar */}
                        <div className="flex items-center gap-1.5 px-2 mb-1.5 shrink-0" onMouseDown={(e) => e.stopPropagation()}>
                          <button 
                            onClick={(e) => minimizeWindow(win.id, e)}
                            className="p-1.5 rounded-full hover:bg-white/10 text-zinc-300 transition-colors"
                            title="Minimizar"
                          >
                            <Minus size={13} />
                          </button>
                          <button 
                            onClick={(e) => { e.stopPropagation(); toggleMaximize(win.id); }}
                            className="p-1.5 rounded-full hover:bg-white/10 text-zinc-300 transition-colors"
                            title={win.isMaximized ? 'Restaurar' : 'Maximizar'}
                          >
                            <Square size={10} />
                          </button>
                          <button 
                            onClick={(e) => closeWindow(win.id, e)}
                            className="p-1.5 rounded-full hover:bg-white/10 text-zinc-300 transition-colors"
                            title="Fechar"
                          >
                            <X size={12} />
                          </button>
                        </div>
                      </div>

                      {/* Main Address Toolbar */}
                      <div className="h-10 bg-[#2b2a33] flex items-center px-4 gap-3 border-b border-black/20 relative z-40">
                        <div className="flex items-center gap-1 text-white">
                          <button 
                            disabled={chromeHistoryIndex <= 0}
                            onClick={goBackChrome}
                            className={`p-1.5 rounded transition-colors ${
                              chromeHistoryIndex <= 0 ? 'opacity-15 cursor-not-allowed text-neutral-500' : 'hover:bg-white/5 opacity-80 hover:opacity-100 text-white'
                            }`}
                            title="Voltar"
                          >
                            <ChevronLeft size={16} />
                          </button>
                          <button 
                            disabled={chromeHistoryIndex >= chromeHistory.length - 1}
                            onClick={goForwardChrome}
                            className={`p-1.5 rounded transition-colors ${
                              chromeHistoryIndex >= chromeHistory.length - 1 ? 'opacity-15 cursor-not-allowed text-neutral-500' : 'hover:bg-white/5 opacity-80 hover:opacity-100 text-white'
                            }`}
                            title="Avançar"
                          >
                            <ChevronRight size={16} />
                          </button>
                          <button 
                            onClick={reloadChrome} 
                            className="p-1.5 hover:bg-white/5 rounded transition-colors opacity-80 hover:opacity-100 text-white"
                            title="Recarregar"
                          >
                            <RotateCcw size={15} className={isChromeLoading ? "animate-spin text-green-400" : ""} />
                          </button>
                          <button 
                            onClick={() => navigateChrome('https://google.com')} 
                            className="p-1.5 hover:bg-white/5 rounded transition-colors opacity-80 hover:opacity-100 text-white"
                            title="Página Inicial"
                          >
                            <Home size={14} />
                          </button>
                        </div>

                        {/* URL input */}
                        <form 
                          onSubmit={(e) => { e.preventDefault(); navigateChrome(browserInputUrl); }}
                          className="flex-1 relative"
                        >
                          <Lock size={11} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-green-400 opacity-80" />
                          <input 
                            type="text" 
                            className="w-full bg-[#1c1b22] text-xs text-white border border-white/5 hover:border-white/10 rounded-lg pl-8.5 pr-8 py-1.5 focus:outline-none focus:ring-1 ring-[#87cf3e]/50 text-left"
                            value={browserInputUrl}
                            onChange={(e) => setBrowserInputUrl(e.target.value)}
                            onFocus={(e) => e.target.select()}
                            placeholder="Pesquisar com o Google ou digitar endereço URL"
                            title="Digite a URL"
                          />
                          {/* Bookmark Star Indicator */}
                          <button 
                            type="button"
                            onClick={toggleChromeFavorite}
                            className="absolute right-3 top-1/2 -translate-y-1/2 transition-colors text-zinc-400 hover:text-yellow-400"
                            title="Adicionar aos Favoritos"
                          >
                            {chromeFavorites.some(f => f.url === chromeCurrentUrl) ? (
                              <Star size={11} fill="#eab308" className="text-yellow-500 hover:scale-110 active:scale-95 transition-transform" />
                            ) : (
                              <Star size={11} className="hover:scale-110 active:scale-95 transition-transform" />
                            )}
                          </button>
                        </form>

                        {/* Settings Trigger Ref */}
                        <div className="relative" ref={chromeMenuRef}>
                          <button 
                            onClick={() => setShowChromeMenu(!showChromeMenu)}
                            className={`p-1.5 rounded transition-colors text-white ${showChromeMenu ? 'bg-white/10' : 'hover:bg-white/5'}`}
                            title="Personalização"
                          >
                            <MoreVertical size={16} />
                          </button>
                          <AnimatePresence>
                            {showChromeMenu && (
                              <motion.div
                                initial={{ opacity: 0, scale: 0.95, y: 10 }}
                                animate={{ opacity: 1, scale: 1, y: 0 }}
                                exit={{ opacity: 0, scale: 0.95, y: 10 }}
                                className="absolute right-0 top-full mt-2 w-56 bg-[#1e1e2a] border border-white/10 rounded-xl shadow-2xl z-50 overflow-hidden text-left"
                              >
                                <div className="py-1 flex flex-col">
                                  <button 
                                    onClick={() => {
                                      toggleChromeFavorite();
                                      setShowChromeMenu(false);
                                    }} 
                                    className="w-full flex items-center gap-3 px-4 py-2.5 text-xs text-neutral-200 hover:bg-white/5 transition-colors text-left"
                                  >
                                    {chromeFavorites.some(f => f.url === chromeCurrentUrl) ? (
                                      <StarOff size={15} className="text-yellow-400 shrink-0" />
                                    ) : (
                                      <Star size={15} className="text-zinc-400 shrink-0" />
                                    )}
                                    <span>
                                      {chromeFavorites.some(f => f.url === chromeCurrentUrl) ? 'Remover dos Favoritos' : 'Adicionar aos Favoritos'}
                                    </span>
                                  </button>
                                  <button 
                                    onClick={() => {
                                      navigator.clipboard.writeText(chromeCurrentUrl);
                                      showChromeToast(isEn ? 'URL copied to clipboard!' : 'URL copiada para a área de transferência!');
                                      setShowChromeMenu(false);
                                    }} 
                                    className="w-full flex items-center gap-3 px-4 py-2.5 text-xs text-neutral-200 hover:bg-white/5 transition-colors text-left font-sans"
                                  >
                                    <Copy size={15} className="text-zinc-400 shrink-0" />
                                    <span>Copiar URL</span>
                                  </button>
                                  <button 
                                    onClick={() => {
                                      window.open(chromeCurrentUrl, '_blank');
                                      setShowChromeMenu(false);
                                    }} 
                                    className="w-full flex items-center gap-3 px-4 py-2.5 text-xs text-neutral-200 hover:bg-white/5 transition-colors text-left font-sans"
                                  >
                                    <ExternalLink size={15} className="text-zinc-400 shrink-0" />
                                    <span>Abrir no navegador real ↗</span>
                                  </button>
                                  <div className="h-[1px] bg-white/5 my-1" />
                                  <button 
                                    onClick={() => {
                                      navigateChrome('https://google.com');
                                      setShowChromeMenu(false);
                                    }} 
                                    className="w-full flex items-center gap-3 px-4 py-2.5 text-xs text-neutral-200 hover:bg-white/5 transition-colors text-left font-sans"
                                  >
                                    <Home size={15} className="text-neutral-400 shrink-0" />
                                    <span>Página Inicial</span>
                                  </button>
                                  <button 
                                    onClick={() => {
                                      reloadChrome();
                                      setShowChromeMenu(false);
                                    }} 
                                    className="w-full flex items-center gap-3 px-4 py-2.5 text-xs text-neutral-200 hover:bg-white/5 transition-colors text-left font-sans"
                                  >
                                    <RotateCcw size={15} className="text-neutral-400 shrink-0" />
                                    <span>Recarregar página</span>
                                  </button>
                                </div>
                              </motion.div>
                            )}
                          </AnimatePresence>
                        </div>
                      </div>

                      {/* Loading Progress Ribbon in Mint Green flavor */}
                      <div className="h-[2px] w-full bg-white/5 overflow-hidden shrink-0 relative z-10">
                        <AnimatePresence>
                          {isChromeLoading && (
                            <motion.div 
                              initial={{ x: '-100%' }}
                              animate={{ x: '100%' }}
                              transition={{ repeat: Infinity, duration: 1.5, ease: 'linear' }}
                              className="h-full w-1/3 bg-[#87cf3e]"
                            />
                          )}
                        </AnimatePresence>
                      </div>

                      {/* Content Area */}
                      <div className="flex-1 w-full bg-white relative overflow-hidden flex flex-col">
                        
                        {/* Chrome Loader Overlay */}
                        {isChromeLoading && (
                          <div className="absolute inset-0 bg-white/60 z-30 flex items-center justify-center backdrop-blur-[1px]">
                            <div className="flex flex-col items-center gap-2">
                              <div className="w-7 h-7 border-2 border-blue-500 border-t-transparent rounded-full animate-spin" />
                              <span className="text-xs text-zinc-600 font-medium">Carregando página segura...</span>
                            </div>
                          </div>
                        )}

                        {/* Content router */}
                        { false ? (
                          <div className="flex-1 w-full overflow-y-auto py-14 px-6 flex flex-col items-center justify-start no-scrollbar bg-white text-zinc-800">
                            {/* Chrome OS Google Homepage Logo */}
                            <h2 className="text-5xl font-semibold flex items-center gap-0.5 mb-8 tracking-tight font-sans select-none">
                              <span className="text-[#4285F4]">G</span>
                              <span className="text-[#EA4335]">o</span>
                              <span className="text-[#FBBC05]">o</span>
                              <span className="text-[#4285F4]">g</span>
                              <span className="text-[#34A853]">l</span>
                              <span className="text-[#EA4335]">e</span>
                            </h2>
                            
                            {/* Mega Search Bar */}
                            <div className="w-full max-w-xl rounded-full px-5 py-3 flex items-center shadow-sm border mb-6 transition-all bg-white border-[#dadce0] hover:shadow-md focus-within:shadow-md focus-within:border-transparent">
                              <Search size={16} className="text-zinc-400 mr-3.5" />
                              <input 
                                type="text"
                                placeholder="Pesquise no Google ou digite um URL"
                                className="bg-transparent w-full focus:outline-none text-xs text-zinc-800 placeholder-zinc-400 font-sans"
                                onKeyDown={(e) => {
                                  if (e.key === 'Enter') {
                                    navigateChrome(`https://google.com/search?q=${encodeURIComponent((e.target as HTMLInputElement).value)}`);
                                  }
                                }}
                              />
                            </div>

                            {/* Standard light Google buttons */}
                            <div className="flex items-center gap-3 mb-6">
                              <button 
                                onClick={() => navigateChrome('https://google.com/search?q=meuLinux')}
                                className="text-[11px] font-sans font-medium px-4 py-2 border rounded-md transition-all active:scale-95 bg-[#f8f9fa] text-zinc-700 border-[#dadce0] hover:bg-[#f1f3f4] cursor-pointer"
                              >
                                Pesquisa Google
                              </button>
                              <button 
                                onClick={() => navigateChrome('https://meulinux.com')}
                                className="text-[11px] font-sans font-medium px-4 py-2 border rounded-md transition-all active:scale-95 bg-[#f8f9fa] text-zinc-700 border-[#dadce0] hover:bg-[#f1f3f4] cursor-pointer"
                              >
                                Estou com sorte
                              </button>
                            </div>

                            <div className="text-[11px] font-sans mb-8 text-zinc-500">
                              Disponibilizado pelo Google em: <span className="text-[#1a0dab] hover:underline cursor-pointer">Portuguese (Brasil)</span>
                            </div>

                            {/* Circular dynamic shortcuts */}
                            <div className="grid grid-cols-4 sm:grid-cols-6 gap-6 max-w-lg w-full justify-items-center">
                              {[
                                { name: 'Google', url: 'https://www.google.com/search?igu=1', logo: '/assets/chrome.png' },
                                { name: 'meuLinux', url: 'https://meulinux.com', icon: 'mL', color: 'bg-emerald-600' },
                                { name: 'YouTube', url: 'https://youtube.com', logo: '/assets/youtube.png' },
                                { name: 'Wikipedia', url: 'https://wikipedia.org', icon: 'W', color: 'bg-zinc-700' },
                                { name: 'Docs', url: 'https://docs.google.com', logo: '/assets/docs.png' },
                                { name: 'Configurações', url: 'chrome://settings', icon: '⚙', color: 'bg-[#5f6368]' }
                              ].map((sc, index) => (
                                <button
                                  key={index}
                                  onClick={() => navigateChrome(sc.url)}
                                  className="flex flex-col items-center gap-1.5 group cursor-pointer"
                                >
                                  <div className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold text-white transition-all shadow-sm group-hover:scale-105 active:scale-95 ${
                                    sc.color 
                                      ? sc.color 
                                      : 'bg-zinc-100 text-zinc-700 border border-zinc-200'
                                  }`}>
                                    {sc.logo ? (
                                      <img src={sc.logo} className="w-5 h-5 object-contain" alt="" />
                                    ) : (
                                      <span>{sc.icon}</span>
                                    )}
                                  </div>
                                  <span className="text-[10px] text-center truncate max-w-[70px] font-sans text-zinc-500 group-hover:text-zinc-800">{sc.name}</span>
                                </button>
                              ))}
                            </div>
                          </div>
                        ) : (chromeCurrentUrl.includes('google.com/search?q=') || chromeCurrentUrl.includes('q=')) ? (
                          // High-fidelity Google Search Results mockup page styled 100% in perfect LIGHT mode
                          <div className="flex-1 w-full overflow-y-auto no-scrollbar flex flex-col justify-between select-text bg-white text-zinc-800 border-t border-zinc-100">
                            <div>
                              <div className="p-4 sticky top-0 z-10 flex items-center gap-4 bg-white border-b border-[#dadce0]">
                                <h3 
                                  onClick={() => navigateChrome('https://www.google.com/search?igu=1')}
                                  className="text-base font-bold flex items-center gap-0.5 mr-2 select-none cursor-pointer hover:opacity-80 font-sans"
                                >
                                  <span className="text-[#4285F4]">G</span>
                                  <span className="text-[#EA4335]">o</span>
                                  <span className="text-[#FBBC05]">o</span>
                                  <span className="text-[#4285F4]">g</span>
                                  <span className="text-[#34A853]">l</span>
                                  <span className="text-[#EA4335]">e</span>
                                </h3>
                                <div className="flex-1 max-w-md rounded-full px-4 py-1.5 flex items-center shadow-sm transition-all focus-within:shadow-md border bg-white border-[#dadce0] text-zinc-900">
                                  <input 
                                    type="text" 
                                    className="bg-transparent w-full focus:outline-none text-xs text-zinc-900 font-sans"
                                    key={activeChromeTab.url}
                                    defaultValue={decodeURIComponent(activeChromeTab.url.split('q=')[1] || '').split('&')[0]}
                                    onKeyDown={(e) => {
                                      if (e.key === 'Enter') {
                                        navigateChrome(`https://google.com/search?q=${encodeURIComponent((e.target as HTMLInputElement).value)}`);
                                      }
                                    }}
                                  />
                                </div>
                              </div>
                              <div className="max-w-2xl px-6 py-4 flex flex-col gap-6 font-sans">
                                <p className="text-[11px] text-zinc-500 pb-1">
                                  Cerca de 1.420.000 resultados (0,14 segundos)
                                </p>
                                
                                {/* Option 1: meulinux.com */}
                                <div className="flex flex-col gap-1 p-3 rounded-lg border border-transparent transition-colors hover:bg-zinc-50 hover:border-zinc-100">
                                  <div className="text-[10px] flex items-center gap-1.5 text-zinc-500">
                                    <span className="bg-[#87cf3e]/20 text-emerald-500 font-extrabold px-1 rounded text-[8px]">mL</span>
                                    <span>https://meulinux.com</span>
                                  </div>
                                  <h4 
                                    onClick={() => navigateChrome('https://meulinux.com')}
                                    className="text-sm font-bold hover:underline cursor-pointer text-[#1a0dab]"
                                  >
                                    meuLinux — Simplificando o Linux desde 2020
                                  </h4>
                                  <p className="text-xs leading-relaxed text-zinc-600">
                                    Venha experimentar os simuladores de Linux online de alta velocidade, encontre códigos, guias rápidos, apostilas PDF gratuitas e muito mais.
                                  </p>
                                </div>

                                {/* Option 2: Mint github */}
                                <div className="flex flex-col gap-1 p-3 rounded-lg border border-transparent transition-colors hover:bg-zinc-50 hover:border-zinc-100">
                                  <div className="text-[10px] flex items-center gap-1.5 text-zinc-500">
                                    <span>https://github.com/linuxmint</span>
                                  </div>
                                  <h4 
                                    onClick={() => navigateChrome('https://github.com/linuxmint')}
                                    className="text-sm font-bold hover:underline cursor-pointer text-[#1a0dab]"
                                  >
                                    Linux Mint GitHub — Open Source Operating System Projects
                                  </h4>
                                  <p className="text-xs leading-relaxed text-zinc-600">
                                    Browse the current public source code repositories for the Linux Mint Operating System, standard desktop apps, Cinnamon Desk, Nemo Files and Firefox themes!
                                  </p>
                                </div>

                                {/* Option 3: Wikipedia */}
                                <div className="flex flex-col gap-1 p-3 rounded-lg border border-transparent transition-colors hover:bg-zinc-50 hover:border-zinc-100">
                                  <div className="text-[10px] flex items-center gap-1.5 text-zinc-500">
                                    <span>https://pt.wikipedia.org/wiki/ChromeOS</span>
                                  </div>
                                  <h4 
                                    onClick={() => navigateChrome('https://pt.wikipedia.org/wiki/ChromeOS')}
                                    className="text-sm font-bold hover:underline cursor-pointer text-[#1a0dab]"
                                  >
                                    ChromeOS (sistema operacional) — Wikipédia, a enciclopédia livre
                                  </h4>
                                  <p className="text-xs leading-relaxed text-zinc-600">
                                    ChromeOS é um sistema operacional baseado em Linux desenvolvido pelo Google. Ele é derivado do ChromiumOS gratuito e usa o navegador Google Chrome como interface de usuário primária.
                                  </p>
                                </div>

                                {/* Option 4: Custom Query Result */}
                                {decodeURIComponent(activeChromeTab.url.split('q=')[1] || '').split('&')[0] && (
                                  <div className="flex flex-col gap-1 p-3 rounded-lg border border-transparent transition-colors hover:bg-zinc-50 hover:border-zinc-100 animate-fadeIn">
                                    <div className="text-[10px] flex items-center gap-1.5 text-zinc-500">
                                      <span>https://www.google.com/search?q={decodeURIComponent(activeChromeTab.url.split('q=')[1] || '').split('&')[0]}</span>
                                    </div>
                                    <h4 
                                      className="text-sm font-bold hover:underline cursor-pointer text-[#1a0dab]"
                                      onClick={() => {
                                        showChromeToast(isEn 
                                          ? `Loading additional results for "${decodeURIComponent(activeChromeTab.url.split('q=')[1] || '').split('&')[0]}".`
                                          : `Carregando resultados adicionais para "${decodeURIComponent(activeChromeTab.url.split('q=')[1] || '').split('&')[0]}".`);
                                      }}
                                    >
                                      Resultados complementares para o termo "{decodeURIComponent(activeChromeTab.url.split('q=')[1] || '').split('&')[0]}"
                                    </h4>
                                    <p className="text-xs leading-relaxed text-zinc-600">
                                      Confira guias, tutoriais de instalação e dicas relevantes da comunidade sobre {decodeURIComponent(activeChromeTab.url.split('q=')[1] || '').split('&')[0]}. Acesse códigos originais e tutoriais passo a passo.
                                    </p>
                                  </div>
                                )}
                              </div>
                            </div>

                            {/* Bottom Google Footer Mock mimicking Google Search footer in gorgeous Light mode */}
                            <div className="mt-8 border-t border-zinc-200 bg-[#f2f2f2] text-zinc-600 text-[11px] py-3.5 px-6 flex flex-wrap items-center justify-between gap-4 font-sans select-none shrink-0">
                              <div className="flex items-center gap-4">
                                <span className="hover:underline cursor-pointer">Brasil</span>
                                <span className="text-zinc-300">•</span>
                                <span className="text-zinc-500">Ipiranga, São Paulo - SP</span>
                              </div>
                              <div className="flex items-center gap-5">
                                <span className="hover:underline cursor-pointer">Ajuda</span>
                                <span className="hover:underline cursor-pointer">Enviar feedback</span>
                                <span className="hover:underline cursor-pointer">Privacidade</span>
                                <span className="hover:underline cursor-pointer">Termos</span>
                                <span className="flex items-center gap-1.5 cursor-pointer hover:text-zinc-900 group">
                                  <span>Tema escuro: desativado</span>
                                  <span className="text-amber-500 font-bold group-hover:scale-110 transition-transform">☀️</span>
                                </span>
                              </div>
                            </div>
                          </div>
                        ) : (activeChromeTab.url.includes('youtube.com') || activeChromeTab.url.includes('youtu.be')) ? (
                          <div className="absolute inset-0 z-40 bg-[#0f0f0f] text-white flex flex-col font-sans overflow-y-auto select-text">
                            {/* Simulator header bar */}
                            <div className="h-14 border-b border-zinc-900 bg-[#0f0f0f] flex items-center justify-between px-4 shrink-0">
                              <div className="flex items-center gap-2">
                                <button 
                                  onClick={() => {
                                    setYtActiveVideoId(null);
                                    setChromeTabs(prev => prev.map(tab => {
                                      if (tab.id === activeChromeTabId) {
                                        return { ...tab, url: 'https://youtube.com', title: 'YouTube' };
                                      }
                                      return tab;
                                    }));
                                    setBrowserInputUrl('https://youtube.com');
                                  }} 
                                  className="flex items-center gap-1.5 focus:outline-none hover:opacity-90 active:scale-95 transition-all text-left"
                                >
                                  <span className="bg-red-600 text-white font-black px-2.5 py-1.5 rounded-lg text-xs tracking-tighter flex items-center gap-1">
                                    <Play className="fill-white" size={13} /> YouTube
                                  </span>
                                  <span className="text-[10px] font-bold text-neutral-450 bg-zinc-800 px-2 py-0.5 rounded uppercase hidden sm:inline">Linux Sim</span>
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
                                  <button type="button" className="bg-zinc-800 px-4 py-1.5 border-l border-zinc-700 text-zinc-400 hover:text-white transition-colors">
                                    <Search size={13} />
                                  </button>
                                </div>
                              </form>

                              {/* Profile avatar */}
                              <div className="flex items-center gap-2">
                                <span className="w-7 h-7 rounded-full bg-gradient-to-tr from-blue-500 to-indigo-600 flex items-center justify-center font-bold text-[11px] text-white select-none shadow">
                                  C
                                </span>
                              </div>
                            </div>

                            <div className="flex-grow flex min-h-0 overflow-hidden">
                              {/* Sidebar */}
                              <div className="w-48 bg-[#0f0f0f] p-2 hidden md:flex flex-col gap-1 border-r border-zinc-800 text-left shrink-0 select-none">
                                <button 
                                  onClick={() => { 
                                    setYtActiveVideoId(null); 
                                    setYtSearchQuery(''); 
                                    setChromeTabs(prev => prev.map(tab => {
                                      if (tab.id === activeChromeTabId) {
                                        return { ...tab, url: 'https://youtube.com', title: 'YouTube' };
                                      }
                                      return tab;
                                    }));
                                    setBrowserInputUrl('https://youtube.com');
                                  }}
                                  className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-xs font-medium transition-colors ${!ytActiveVideoId ? 'bg-zinc-800/70 text-white font-semibold' : 'text-zinc-400 hover:bg-white/5 text-zinc-300'}`}
                                >
                                  <Home size={14} className="text-red-500" /> <span>Início</span>
                                </button>
                                <button 
                                  onClick={() => {
                                    setYtActiveVideoId('dQw4w9WgXcQ');
                                    setChromeTabs(prev => prev.map(tab => {
                                      if (tab.id === activeChromeTabId) {
                                        return { ...tab, url: 'https://youtube.com/watch?v=dQw4w9WgXcQ', title: 'Rick Astley - Never Gonna Give You Up' };
                                      }
                                      return tab;
                                    }));
                                    setBrowserInputUrl('https://youtube.com/watch?v=dQw4w9WgXcQ');
                                  }}
                                  className="w-full flex items-center gap-3 px-3 py-2 rounded-lg text-xs font-medium text-zinc-300 hover:bg-white/5 transition-colors"
                                >
                                  <Play size={14} className="text-amber-500" /> <span>Clássico Astley</span>
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
                              <div className="flex-1 overflow-y-auto p-4 select-text max-h-full">
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
                                                    showChromeToast(isEn ? `Unsubscribed from ${activeVideo.channel}` : `Removido inscrição de ${activeVideo.channel}`);
                                                  } else {
                                                    setYtSubscribedChannels(prev => [...prev, activeVideo.channel]);
                                                    showChromeToast(isEn ? `Successfully subscribed to ${activeVideo.channel}` : `Inscrito com sucesso no canal ${activeVideo.channel}`);
                                                  }
                                                }}
                                                className={`ml-2 px-4 py-2 rounded-full text-xs font-bold transition-all ${
                                                  isSubscribed ? 'bg-zinc-800 text-zinc-350 hover:bg-zinc-700' : 'bg-white text-black hover:bg-zinc-200'
                                                }`}
                                              >
                                                {isSubscribed ? (isEn ? 'Subscribed' : 'Inscrito') : (isEn ? 'Subscribe' : 'Inscrever-se')}
                                              </button>
                                            </div>

                                            <div className="flex items-center gap-1.5 bg-zinc-800 p-1.5 rounded-full text-xs">
                                              <button 
                                                onClick={() => {
                                                  if (isLiked) {
                                                    setYtLikedVideos(prev => prev.filter(v => v !== activeVideo.id));
                                                  } else {
                                                    setYtLikedVideos(prev => [...prev, activeVideo.id]);
                                                    showChromeToast(isEn ? "Video added to Liked playlist!" : "Vídeo adicionado à lista de Gostei!");
                                                  }
                                                }}
                                                className={`flex items-center gap-1 px-3 py-1 rounded-full transition-colors ${
                                                  isLiked ? 'text-blue-400 font-bold bg-zinc-700' : 'hover:bg-zinc-700 text-zinc-300'
                                                }`}
                                              >
                                                👍 {isLiked ? (isEn ? 'Liked' : 'Gostou') : (isEn ? 'Like' : 'Gotei')}
                                              </button>
                                              <span className="text-zinc-600">|</span>
                                              <button 
                                                onClick={() => {
                                                  navigator.clipboard.writeText(`https://www.youtube.com/watch?v=${activeVideo.id}`);
                                                  showChromeToast(isEn ? "Share link copied!" : "Link de compartilhamento copiado!");
                                                }}
                                                className="px-3 py-1 rounded-full hover:bg-zinc-700 text-zinc-300 transition-colors"
                                              >
                                                {isEn ? 'Share' : 'Compartilhar'}
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
                                                onClick={() => {
                                                  setYtActiveVideoId(v.id);
                                                  setChromeTabs(prev => prev.map(tab => {
                                                    if (tab.id === activeChromeTabId) {
                                                      return { ...tab, url: `https://youtube.com/watch?v=${v.id}`, title: v.title };
                                                    }
                                                    return tab;
                                                  }));
                                                  setBrowserInputUrl(`https://youtube.com/watch?v=${v.id}`);
                                                }}
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
                                  /* Standard YouTube Video Feed grid */
                                  <div className="space-y-5">
                                    <div className="flex items-center justify-between border-b border-zinc-850 pb-3">
                                      <h2 className="text-sm font-bold text-zinc-250">Recomendações do Sistema para Você</h2>
                                      <span className="text-[10px] text-[#00E676] bg-green-950/45 px-2 py-0.5 rounded font-mono">LIVE FEED</span>
                                    </div>

                                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 select-none">
                                      {SIM_YOUTUBE_VIDEOS.filter(v => {
                                        if (!ytSearchQuery) return true;
                                        return v.title.toLowerCase().includes(ytSearchQuery.toLowerCase()) || 
                                               v.channel.toLowerCase().includes(ytSearchQuery.toLowerCase());
                                      }).map((v) => (
                                        <div 
                                          key={v.id}
                                          onClick={() => {
                                            setYtActiveVideoId(v.id);
                                            setChromeTabs(prev => prev.map(tab => {
                                              if (tab.id === activeChromeTabId) {
                                                return { ...tab, url: `https://youtube.com/watch?v=${v.id}`, title: v.title };
                                              }
                                              return tab;
                                            }));
                                            setBrowserInputUrl(`https://youtube.com/watch?v=${v.id}`);
                                          }}
                                          className="flex flex-col gap-2 bg-[#161617]/50 border border-white/[0.03] hover:border-white/5 rounded-xl p-2.5 cursor-pointer hover:bg-[#1c1d1f] transition-all group"
                                        >
                                          <div className={`aspect-video rounded-lg w-full ${v.thumbnail} relative flex items-center justify-center text-3xl overflow-hidden shadow-inner`}>
                                            <div className="absolute inset-0 bg-black/40 group-hover:bg-black/10 transition-all flex items-center justify-center">
                                              <Play className="opacity-0 group-hover:opacity-100 scale-90 group-hover:scale-110 transition-all fill-white text-white" size={24} />
                                            </div>
                                            {v.avatar}
                                            {v.time === 'AO VIVO' && (
                                              <div className="absolute top-2 left-2 bg-red-600 text-white text-[8px] font-black px-1.5 py-0.5 rounded uppercase tracking-wider">AO VIVO</div>
                                            )}
                                          </div>
                                          
                                          <div className="flex gap-2.5 mt-1 text-left">
                                            <span className="w-8 h-8 rounded-full bg-zinc-800 flex items-center justify-center text-sm shrink-0 shadow-md">
                                              {v.avatar}
                                            </span>
                                            <div className="min-w-0">
                                              <h3 className="font-bold text-xs text-zinc-200 group-hover:text-red-400 leading-tight transition-colors line-clamp-2">
                                                {v.title}
                                              </h3>
                                              <p className="text-[10px] text-zinc-450 font-medium mt-1 leading-none">{v.channel}</p>
                                              <div className="flex gap-1 items-center text-[9px] text-zinc-500 mt-1 leading-none">
                                                <span>{v.views}</span>
                                                <span>•</span>
                                                <span>{v.time}</span>
                                              </div>
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
                        ) : activeChromeTab.loadStatus === 'srcdoc' && activeChromeTab.srcdoc ? (
                          <iframe 
                            srcDoc={activeChromeTab.srcdoc}
                            sandbox="allow-scripts allow-same-origin allow-forms allow-popups"
                            referrerPolicy="no-referrer"
                            className="w-full h-full bg-white border-none"
                            title="Navegador Iframe Proxied"
                            onLoad={() => setIsChromeLoading(false)}
                            style={{ colorScheme: 'light' }}
                          />
                        ) : activeChromeTab.loadStatus === 'fallback' ? (
                          // Beautiful page sandbox fallback with iframe open direct alternate
                          <div className="flex-1 w-full bg-[#121318] flex flex-col items-center justify-center p-6 text-center">
                            <Info size={44} className="text-zinc-500 mb-4" />
                            <h3 className="text-sm font-bold text-white mb-2">Restrição de Iframe Externa</h3>
                            <p className="text-xs text-zinc-400 max-w-md mb-6 leading-relaxed">
                              O site <strong className="text-zinc-300">{activeChromeTab.url}</strong> bloqueia carregamentos embutidos (sandbox/CORS).
                              Deseja carregar a página diretamente no iframe nativo simulado do Chrome OS ou abrir em uma nova janela real?
                            </p>
                            <div className="flex items-center gap-3">
                              <button 
                                onClick={() => {
                                  setChromeTabs(prev => prev.map(tab => {
                                    if (tab.id === activeChromeTabId) {
                                      return { ...tab, loadStatus: 'direct' };
                                    }
                                    return tab;
                                  }));
                                }}
                                className="px-4 py-2 bg-zinc-800 hover:bg-zinc-700 font-bold rounded-lg text-xs text-zinc-200 transition-all select-none"
                              >
                                Forçar Iframe Direto
                              </button>
                              <a 
                                href={activeChromeTab.url} 
                                target="_blank" 
                                rel="noreferrer"
                                className="px-4 py-2 bg-blue-600 hover:bg-blue-700 font-bold rounded-lg text-xs text-white transition-all select-none"
                              >
                                Abrir em Nova Guia Real
                              </a>
                            </div>
                          </div>
                        ) : (
                          // Direct iframe load representation
                          <div className="relative w-full h-full bg-[#ffffff] overflow-hidden" style={{ colorScheme: 'light' }}>
                            <iframe 
                              src={activeChromeTab.url}
                              className="w-full h-full bg-[#ffffff] border-none"
                              title="Chrome Direct Core"
                              sandbox="allow-scripts allow-same-origin allow-forms allow-popups"
                              onLoad={() => setIsChromeLoading(false)}
                              style={{ colorScheme: 'light' }}
                            />
                            
                            {/* High-fidelity custom Google overlay layer */}
                            {chromeCurrentUrl.includes('google.com') && (
                              <div 
                                className="absolute top-[1px] right-[1px] h-[58px] px-6 z-40 flex items-center gap-4 select-none bg-[#ffffff] text-[#202124] border-b border-zinc-100"
                                ref={chromeAppsMenuRef}
                              >
                                {!chromeCurrentUrl.includes('q=') && (
                                  <>
                                    <button 
                                      onClick={() => navigateChrome('https://gmail.com')}
                                      className="text-xs hover:underline hidden sm:inline-block font-sans !text-[#202124] hover:!text-black font-medium"
                                    >
                                      Gmail
                                    </button>
                                    <button 
                                      onClick={() => navigateChrome('https://google.com/search?q=imagens')}
                                      className="text-xs hover:underline mr-1 hidden sm:inline-block font-sans !text-[#202124] hover:!text-black font-medium"
                                    >
                                      Imagens
                                    </button>
                                  </>
                                )}
                                
                                {/* 9-dot grid button */}
                                <button 
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    setChromeGoogleAppsOpen(!chromeGoogleAppsOpen);
                                  }}
                                  className="p-2 rounded-full transition-colors flex items-center justify-center hover:bg-black/5 !text-[#5f6368] hover:!text-black"
                                  title="Google Apps"
                                >
                                  <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                                    <path d="M4 8h4V4H4v4zm6 12h4v-4h-4v4zm-6 0h4v-4H4v4zm0-6h4v-4H4v4zm6 0h4v-4h-4v4zm6-10v4h4V4h-4zm-6 4h4V4h-4v4zm6 6h4v-4h-4v4zm0 6h4v-4h-4v4z" />
                                  </svg>
                                </button>

                                {/* Blue Login button */}
                                <button 
                                  onClick={() => showChromeToast(isEn ? 'Session started as Chrome OS Guest' : 'Sessão iniciada como Convidado Chrome OS')}
                                  className="bg-[#1a73e8] hover:bg-blue-700 text-white font-sans font-semibold text-xs px-4 py-1.5 rounded-md hover:shadow-sm active:scale-95 transition-all text-center leading-relaxed h-[30px] flex items-center"
                                >
                                  {isEn ? 'Sign in' : 'Fazer login'}
                                </button>

                                {/* Custom Dropdown for Google Apps */}
                                <AnimatePresence>
                                  {chromeGoogleAppsOpen && (
                                    <motion.div
                                      initial={{ opacity: 0, scale: 0.95, y: -10 }}
                                      animate={{ opacity: 1, scale: 1, y: 0 }}
                                      exit={{ opacity: 0, scale: 0.95, y: -10 }}
                                      className="absolute right-4 top-[54px] w-72 bg-white border border-zinc-200 text-zinc-800 rounded-2xl shadow-2xl p-4 z-50 grid grid-cols-3 gap-y-4 gap-x-1.5 text-center"
                                    >
                                      {[
                                        { id: 'google', name: 'Pesquisa', url: 'https://google.com', logo: '/assets/chrome.png' },
                                        { id: 'chrome', name: 'Chrome', url: 'chrome://newtab', logo: '/assets/chrome.png' },
                                        { id: 'youtube', name: 'YouTube', url: 'https://youtube.com', logo: '/assets/youtube-svgrepo-com.svg' },
                                        { id: 'gmail', name: 'Gmail', url: 'https://gmail.com', logo: '/assets/gmail.png' },
                                        { id: 'meet', name: 'Google Meet', url: 'https://meet.google.com', logo: '/assets/meet.png' },
                                        { id: 'calendar', name: 'Agenda', url: 'https://calendar.google.com', logo: '/assets/calendar.png' },
                                        { id: 'drive', name: 'Drive', url: 'https://drive.google.com', logo: '/assets/drive.png' },
                                        { id: 'docs', name: 'Docs', url: 'https://docs.google.com', logo: '/assets/docs.png' },
                                        { id: 'sheets', name: 'Planilhas', url: 'https://sheets.google.com', logo: '/assets/sheets.png' },
                                        { id: 'slides', name: 'Apresentações', url: 'https://slides.google.com', logo: '/assets/slides.png' },
                                        { id: 'keep', name: 'Keep', url: 'https://keep.google.com', logo: '/assets/google-keep-svgrepo-com.svg' },
                                        { id: 'webstore', name: 'Web Store', url: 'https://chrome.google.com/webstore', logo: '/assets/chrome.png' },
                                      ].map((sc) => (
                                        <button
                                          key={sc.id}
                                          onClick={() => {
                                            setChromeGoogleAppsOpen(false);
                                            if (['youtube', 'gmail', 'meet', 'calendar', 'docs', 'sheets', 'slides', 'keep'].includes(sc.id)) {
                                              launchApp(sc.id);
                                            } else {
                                              navigateChrome(sc.url);
                                            }
                                          }}
                                          className="flex flex-col items-center gap-1 group cursor-pointer hover:scale-105 active:scale-95 transition-all text-left"
                                        >
                                          <div className="w-11 h-11 rounded-xl flex items-center justify-center p-1.5 transition-all bg-zinc-100 group-hover:bg-zinc-200">
                                            <img src={sc.logo} className="w-6 h-6 object-contain pointer-events-none select-none" alt="" />
                                          </div>
                                          <span className="text-[10px] font-sans font-medium line-clamp-1 text-center truncate max-w-[66px] text-zinc-700 group-hover:text-black">{sc.name}</span>
                                        </button>
                                      ))}
                                      <div className="col-span-3 h-[1px] my-1 bg-zinc-150" />
                                      <button 
                                        onClick={() => {
                                          setChromeGoogleAppsOpen(false);
                                          navigateChrome('https://about.google/products/');
                                        }}
                                        className="col-span-3 text-[10px] font-semibold py-1.5 rounded-full border border-zinc-200 text-blue-600 hover:bg-zinc-50 transition-all text-center font-sans tracking-wide"
                                      >
                                        Mais do Google
                                      </button>
                                    </motion.div>
                                  )}
                                </AnimatePresence>
                              </div>
                            )}
                          </div>
                        )}
                      </div>

                      {/* Toast notification centered over browser content */}
                      <AnimatePresence>
                        {chromeToast.visible && (
                          <motion.div 
                            initial={{ opacity: 0, y: 15 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: 15 }}
                            className="absolute bottom-4 left-1/2 -translate-x-1/2 px-4 py-2 bg-[#202124] border border-white/5 shadow-2xl rounded-full text-xs text-blue-400 font-medium z-50 flex items-center gap-1.5"
                          >
                            <Check size={12} className="text-[#00E676]" />
                            <span>{chromeToast.message}</span>
                          </motion.div>
                        )}
                      </AnimatePresence>

                      {/* Privacy Information Modal popup */}
                      <AnimatePresence>
                        {showChromePrivacyModal && (
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
                              className="bg-[#2d2e30] border border-white/10 p-8 rounded-2xl max-w-sm shadow-2xl text-center"
                            >
                              <div className="w-14 h-14 bg-blue-600/10 rounded-full flex items-center justify-center mx-auto mb-5">
                                <Shield size={24} className="text-[#1a73e8]" />
                              </div>
                              <h3 className="text-base font-bold text-white mb-3">Sobre Privacidade e Segurança</h3>
                              <p className="text-xs text-zinc-400 leading-relaxed mb-6">
                                O Navegador Chromium do meuLinux ChromeOS Flex opera com tecnologia de isolamento sandboxed. Seus favoritos e histórico são armazenados estritamente local no localStorage sem transferência externa, garantindo performance e privacidade de dados.
                              </p>
                              <button 
                                onClick={() => setShowChromePrivacyModal(false)}
                                className="w-full bg-[#1a73e8] hover:bg-[#1557b0] text-white text-xs font-bold py-2.5 rounded-xl transition-all shadow-lg active:scale-95 select-none"
                              >
                                Entendi
                              </button>
                            </motion.div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  )}

                  {/* APP: YOUTUBE */}
                  {win.id === 'youtube' && (
                    <div className="w-full h-full bg-[#0f0f0f] flex flex-col p-4 text-white">
                      <div className="flex items-center gap-2 mb-4 border-b border-white/10 pb-3">
                        <YouTubeLogo size={24} />
                        <span className="font-bold tracking-tight text-white font-sans text-sm">YouTube Premium Simulator</span>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 select-text">
                        <div className="aspect-video bg-black rounded-lg overflow-hidden relative flex items-center justify-center border border-white/5">
                          <iframe 
                            src="https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=1&mute=1" 
                            className="w-full h-full absolute inset-0" 
                            title="YouTube video player" 
                            allow="autoplay; encrypted-media"
                            allowFullScreen
                          />
                        </div>
                        <div>
                          <h4 className="text-sm font-bold mb-1">Rick Astley - Never Gonna Give You Up (Official Video)</h4>
                          <p className="text-[11px] text-zinc-400 mb-4">1.4 Bilhões de visualizações · há 14 anos</p>
                          <div className="p-3 bg-white/5 rounded-lg border border-white/5 text-xs">
                            <p className="font-bold mb-1 text-zinc-100 font-sans">Sobre esta Transmissão</p>
                            <p className="text-zinc-400 text-[11px] leading-relaxed font-sans">
                              Sua conexão do Chromebook está simulada em modo de alta fidelidade nativo. O player carrega sem anúncios ou banners intrusivos para seu teste prático.
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* APP: GMAIL */}
                  {win.id === 'gmail' && (
                    <div className="w-full h-full bg-[#16171a] flex">
                      <div className="w-1/4 shrink-0 bg-[#212327] p-2 flex flex-col gap-1 border-r border-white/5">
                        <button className="w-full py-2 bg-[#ea4335]/15 hover:bg-[#ea4335]/25 border border-[#ea4335]/30 rounded-lg text-[11px] text-rose-400 font-extrabold flex items-center justify-center gap-1.5">
                          <Plus size={14} /> Escrever
                        </button>
                        <div className="mt-4 text-[10px] text-zinc-500 uppercase font-extrabold px-2">Categorias Inboxes</div>
                        <button className="w-full py-1.5 font-bold text-left px-2 rounded hover:bg-white/5 text-xs text-white bg-white/5">Recebidos (5)</button>
                        <button className="w-full py-1.5 font-normal text-left px-2 rounded hover:bg-white/5 text-xs text-zinc-400">Enviados</button>
                        <button className="w-full py-1.5 font-normal text-left px-2 rounded hover:bg-white/5 text-xs text-zinc-400">Rascunhos</button>
                      </div>
                      <div className="flex-1 overflow-auto p-3 flex flex-col gap-2">
                        <div className="text-xs font-bold text-zinc-400 border-b border-white/5 pb-2 mb-1">Suas Mensagens de Entrada</div>
                        <div className="p-2.5 bg-white/5 rounded border border-white/5 hover:bg-white/10 cursor-pointer">
                          <div className="flex items-center justify-between gap-2 mb-0.5">
                            <span className="font-bold text-xs text-[#4285F4]">Google Cloud Enterprise</span>
                            <span className="text-[9px] text-zinc-500">12:45 PM</span>
                          </div>
                          <div className="text-[11px] font-bold text-white mb-0.5">Seu Chromebook Chrome OS Flex está ativo!</div>
                          <div className="text-[10px] text-zinc-400 truncate">Parabéns por testar o Chrome OS Flex conosco no meuLinux. Seu sistema está rodando sem gargalos...</div>
                        </div>
                        <div className="p-2.5 bg-white/5 rounded border border-white/5 hover:bg-white/10 cursor-pointer">
                          <div className="flex items-center justify-between gap-2 mb-0.5">
                            <span className="font-bold text-xs text-[#34A853]">Filipi (Criador do meuLinux)</span>
                            <span className="text-[9px] text-zinc-500">Ontem</span>
                          </div>
                          <div className="text-[11px] font-semibold text-white mb-0.5">Mural de Distros e Simulador</div>
                          <div className="text-[10px] text-zinc-400 truncate">Obrigado pelo feedback sobre os ícones agrupados! Foi ótima a ideia de colocar apenas um terminal grande...</div>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* APP: CALENDAR */}
                  {win.id === 'calendar' && (
                    <div className="w-full h-full bg-[#18191c] p-4 flex flex-col">
                      <div className="flex items-center justify-between gap-4 border-b border-white/10 pb-3 mb-4">
                        <div className="flex items-center gap-2">
                          <div className="p-1 px-3 bg-[#1a73e8] text-white rounded font-bold text-sm">Calendário</div>
                          <h4 className="text-white text-xs font-semibold">Maio de 2026</h4>
                        </div>
                        <button onClick={() => triggerAlert('Compromisso rápido inserido para o dia.')} className="bg-white/5 hover:bg-white/10 text-white font-bold text-xs px-3 py-1.5 rounded border border-white/10">Novo Evento +</button>
                      </div>
                      <div className="grid grid-cols-7 gap-1 text-center font-bold text-[10px] text-zinc-400 uppercase mb-2">
                        <span>Dom</span><span>Seg</span><span>Ter</span><span>Qua</span><span>Qui</span><span>Sexta</span><span>Sab</span>
                      </div>
                      <div className="grid grid-cols-7 gap-1 flex-1 text-xs">
                        {Array.from({ length: 31 }).map((_, i) => {
                          const num = i + 1;
                          const isSpecial = num === 22 || num === 28;
                          return (
                            <div key={i} className={`p-1 bg-white/5 rounded-lg aspect-square min-h-[40px] flex flex-col justify-between border ${isSpecial ? 'border-blue-500/50 bg-[#1a73e8]/10' : 'border-transparent'}`}>
                              <span className={`text-[10px] ${isSpecial ? 'text-[#1a73e8] font-bold bg-white w-4 h-4 rounded-full flex items-center justify-center mx-auto' : 'text-zinc-300'}`}>{num}</span>
                              {isSpecial && <span className="text-[8px] text-blue-400 truncate tracking-tighter">Estudar mL</span>}
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  )}

                  {/* APP: GOOGLE MEET */}
                  {win.id === 'meet' && (
                    <div className="w-full h-full bg-[#202124] flex flex-col p-4 text-white">
                      <div className="text-center py-6">
                        <GoogleMeetLogo size={52} />
                        <h3 className="text-base font-bold text-white mt-4 mb-1">Reunião em Vídeo Premium do Chromebook</h3>
                        <p className="text-xs text-zinc-400 max-w-sm mx-auto mb-6">Inicie videoconferências sem travamentos direto no seu navegador com suporte acelerado.</p>
                        
                        <div className="flex items-center justify-center gap-3">
                          <button 
                            onClick={() => triggerAlert('Vídeo Chamada iniciada. Compartilhe o link com amigos.')}
                            className="bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs py-2.5 px-6 rounded-lg shadow"
                          >
                            Nova Reunião
                          </button>
                          <input 
                            type="text" 
                            placeholder="Digite o código ou link" 
                            className="bg-white/5 border border-white/10 text-xs px-3 py-2.5 rounded-lg w-48 text-white focus:outline-none"
                          />
                        </div>
                      </div>
                    </div>
                  )}

                  {/* APP: GOOGLE KEEP */}
                  {win.id === 'keep' && (
                    <div className="w-full h-full bg-[#202124] p-3 flex flex-col gap-3">
                      <div className="p-3 bg-white/5 border border-white/10 rounded-xl max-w-lg mx-auto w-full flex flex-col gap-2">
                        <input 
                          type="text" 
                          placeholder="Título da nota..." 
                          className="bg-transparent text-sm font-bold text-white border-none focus:outline-none w-full"
                          value={noteTitleInput}
                          onChange={(e) => setNoteTitleInput(e.target.value)}
                        />
                        <textarea 
                          placeholder="Criar uma nota..." 
                          className="bg-transparent text-xs text-zinc-300 border-none focus:outline-none w-full h-12 resize-none"
                          value={noteContentInput}
                          onChange={(e) => setNoteContentInput(e.target.value)}
                        />
                        <div className="flex justify-end">
                          <button 
                            onClick={addKeepNote}
                            className="bg-yellow-600 hover:bg-yellow-700 text-white font-bold text-[11px] px-3 py-1 rounded-lg transition-all"
                          >
                            {editingNoteId !== null ? 'Salvar' : 'Adicionar Note'}
                          </button>
                        </div>
                      </div>

                      <div className="flex-grow overflow-auto grid grid-cols-2 md:grid-cols-3 gap-2 pb-4">
                        {notes.map(note => (
                          <div 
                            key={note.id} 
                            style={{ backgroundColor: note.color }}
                            className="p-3.5 rounded-xl text-zinc-950 flex flex-col justify-between h-28 relative shadow"
                          >
                            <div>
                              <h5 className="font-bold text-xs mb-1 truncate">{note.title}</h5>
                              <p className="text-[10.5px] whitespace-pre-line text-zinc-800 line-clamp-3 leading-normal">{note.content}</p>
                            </div>
                            <div className="flex items-center justify-end gap-1.5 shrink-0 mt-2">
                              <button 
                                onClick={() => {
                                  setEditingNoteId(note.id);
                                  setNoteTitleInput(note.title);
                                  setNoteContentInput(note.content);
                                }} 
                                className="p-1 text-zinc-700 hover:bg-black/10 rounded" title="Editar"
                              >
                                &bull;&bull;&bull;
                              </button>
                              <button 
                                onClick={() => deleteKeepNote(note.id)} 
                                className="p-1 text-rose-800 hover:bg-black/10 rounded" title="Excluir"
                              >
                                <Trash size={12} />
                              </button>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* APP: FILES MANAGEMENT */}
                  {win.id === 'files' && (
                    <div className="w-full h-full bg-[#18191c] flex">
                      <div className="w-1/4 bg-[#202124] p-2 flex flex-col gap-1 border-r border-white/5">
                        <div className="text-[10px] text-zinc-500 font-extrabold uppercase px-2 mb-2">Dispositivos</div>
                        <button className="w-full py-1.5 text-left text-xs font-bold text-white px-2 rounded bg-white/5 flex items-center gap-1.5">
                          <Folder size={14} className="text-blue-500" /> Meus Arquivos
                        </button>
                        <button className="w-full py-1.5 text-left text-xs font-normal text-zinc-400 px-2 rounded hover:bg-white/5 flex items-center gap-1.5">
                          <HardDrive size={14} className="text-zinc-500" /> Google Drive
                        </button>
                        <button className="w-full py-1.5 text-left text-xs font-normal text-zinc-400 px-2 rounded hover:bg-white/5 flex items-center gap-1.5">
                          <Trash size={14} className="text-zinc-500" /> Lixeira
                        </button>
                      </div>
                      <div className="flex-1 p-3 flex flex-col">
                        <div className="flex items-center justify-between text-[11px] text-zinc-400 border-b border-white/5 pb-2 mb-2 shrink-0">
                          <span>Nome do Arquivo</span>
                          <span>Tamanho</span>
                        </div>
                        <div className="flex-1 overflow-auto flex flex-col gap-1">
                          {filesList.map((file, idx) => (
                            <div 
                              key={idx}
                              onClick={() => setSelectedFileItem(file.name)}
                              className={`p-2 rounded flex items-center justify-between text-xs cursor-pointer hover:bg-white/5 ${selectedFileItem === file.name ? 'bg-[#1a73e8]/20 text-blue-400 border border-blue-500/20' : 'border border-transparent'}`}
                            >
                              <div className="flex items-center gap-2">
                                {file.icon}
                                <span className={selectedFileItem === file.name ? 'font-bold' : 'text-zinc-200'}>{file.name}</span>
                              </div>
                              <span className="text-[10px] text-zinc-500">{file.size}</span>
                            </div>
                          ))}
                        </div>
                        {selectedFileItem && (
                          <div className="mt-3 p-2 bg-white/5 rounded border border-white/5 flex items-center justify-between shrink-0">
                            <span className="text-[10px] text-zinc-400 truncate">Selecionado: <strong>{selectedFileItem}</strong></span>
                            <button 
                              onClick={() => {
                                triggerAlert(`"${selectedFileItem}" aberto na sandbox.`);
                              }} 
                              className="px-3 py-1 bg-[#1a73e8] hover:bg-[#1a73e8]/90 text-white font-bold text-[10px] rounded"
                            >
                              Abrir no Chrome
                            </button>
                          </div>
                        )}
                      </div>
                    </div>
                  )}

                  {/* APP: YT MUSIC */}
                  {win.id === 'music' && (
                    <div className="w-full h-full bg-[#111111] p-4 flex flex-col justify-between text-white">
                      <div className="flex items-center justify-between border-b border-white/5 pb-2">
                        <span className="font-extrabold tracking-wide text-rose-500 text-xs uppercase">YT MUSIC DECK</span>
                        <DiagnosticsLogoMini size={14} />
                      </div>
                      <div className="text-center py-6 flex-1 flex flex-col items-center justify-center">
                        <div className="w-24 h-24 rounded-full bg-gradient-to-tr from-rose-600 to-black p-1 shadow-xl animate-pulse flex items-center justify-center mb-4">
                          <PlayMusicLogo size={70} />
                        </div>
                        <h4 className="text-sm font-bold mb-0.5">Lofi Chill Beats para Desenvolvedores</h4>
                        <p className="text-[10px] text-zinc-400">meuLinux Radio ao Vivo</p>
                      </div>
                      <div className="p-2 border-t border-white/5 flex items-center justify-between px-4 shrink-0 bg-black/40 rounded-xl">
                        <button className="p-1 hover:bg-white/5 text-zinc-300 rounded"><VolumeX size={15} /></button>
                        <div className="flex items-center gap-3">
                          <button className="text-zinc-500 hover:text-white">&larr;</button>
                          <button onClick={() => triggerAlert('Audio player ao vivo carregando...')} className="w-8 h-8 rounded-full bg-white text-black flex items-center justify-center"><Play size={16} className="ml-0.5 text-black" /></button>
                          <button className="text-zinc-500 hover:text-white">&rarr;</button>
                        </div>
                        <span className="text-[9px] text-[#00E676] font-mono">LIVE FEED</span>
                      </div>
                    </div>
                  )}

                  {/* APP: CAMERA */}
                  {win.id === 'camera' && (
                    <div className="w-full h-full bg-[#000000] flex flex-col items-center justify-center relative p-4 text-white">
                      <div className="border border-white/10 rounded-2xl w-full max-w-sm h-64 bg-zinc-900 flex flex-col items-center justify-center relative overflow-hidden">
                        <IconCamera size={42} className="text-zinc-600 mb-2 animate-bounce" />
                        <span className="text-xs text-zinc-500 text-center px-6">Para usar sua câmera física, habilite as permissões. Caso contrário, veja a nossa pre-visualizador de alta velocidade.</span>
                        <div className="absolute top-2 left-2 px-2 py-0.5 rounded bg-rose-600 text-white font-mono text-[8px] uppercase tracking-wide">DETECÇÃO DE HARDWARE</div>
                      </div>
                      <button 
                        onClick={() => triggerAlert('Captura emulada com sucesso.')}
                        className="mt-4 bg-[#4285f4] hover:bg-[#4285f4]/90 text-white text-xs font-bold py-2 px-6 rounded-full shadow-lg flex items-center gap-1"
                      >
                        <IconCamera size={15} /> Tirar Foto
                      </button>
                    </div>
                  )}

                  {/* APP: INTERACTIVE MAPS */}
                  {win.id === 'maps' && (
                    <div className="w-full h-full bg-[#18191c] flex flex-col">
                      <div className="p-2 bg-[#202124] flex items-center gap-2 border-b border-white/5 shrink-0 text-xs">
                        <MapPin size={14} className="text-rose-500 shrink-0" />
                        <span className="text-zinc-200 font-bold truncate">Chromebook Maps: São Paulo, Brasil</span>
                      </div>
                      <div className="flex-1 bg-zinc-950 p-4 relative flex items-center justify-center">
                        <iframe 
                          src="https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d117094.49818839082!2d-46.6833593099039!3d-23.58284687570494!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1spt-BR!2sbr!4v1703240000000!5m2!1spt-BR!2sbr" 
                          className="w-full h-full absolute inset-0 border-none brightness-75 select-none pointer-events-auto"
                          allowFullScreen
                          loading="lazy"
                        />
                      </div>
                    </div>
                  )}

                  {/* APP: SETTINGS PANEL */}
                  {win.id === 'settings' && (
                    <div className="w-full h-full bg-[#1c1d21] flex text-zinc-200 font-sans">
                      <div className="w-1/4 bg-[#232429] p-2 flex flex-col gap-1 border-r border-white/5 text-xs select-none">
                        <div className="text-[10px] text-zinc-500 font-extrabold uppercase px-2 mb-2">Painel de Controle</div>
                        
                        <button 
                          onClick={() => setSettingsTab('rede')}
                          className={`w-full py-1.5 text-left rounded px-2 flex items-center gap-1.5 transition-all ${
                            settingsTab === 'rede' ? 'text-white bg-white/10 font-bold' : 'hover:bg-white/5'
                          }`}
                        >
                          <Wifi size={13} className="text-blue-400" /> Rede Sem Fio
                        </button>
                        
                        <button 
                          onClick={() => setSettingsTab('dispositivo')}
                          className={`w-full py-1.5 text-left rounded px-2 flex items-center gap-1.5 transition-all ${
                            settingsTab === 'dispositivo' ? 'text-white bg-white/10 font-bold' : 'hover:bg-white/5'
                          }`}
                        >
                          <IconSettings size={13} className="text-purple-400" /> Dispositivos
                        </button>
                        
                        <button 
                          onClick={() => setSettingsTab('personalizacao')}
                          className={`w-full py-1.5 text-left rounded px-2 flex items-center gap-1.5 transition-all ${
                            settingsTab === 'personalizacao' ? 'text-white bg-white/10 font-bold' : 'hover:bg-white/5'
                          }`}
                        >
                          <Palette size={13} className="text-yellow-400" /> Personalização
                        </button>
                        
                        <button 
                          onClick={() => setSettingsTab('sobre')}
                          className={`w-full py-1.5 text-left rounded px-2 flex items-center gap-1.5 transition-all ${
                            settingsTab === 'sobre' ? 'text-white bg-white/10 font-bold' : 'hover:bg-white/5'
                          }`}
                        >
                          <Info size={13} className="text-emerald-400" /> Sobre o Chrome OS
                        </button>
                      </div>

                      <div className="flex-1 p-4 overflow-auto flex flex-col gap-4 text-xs select-none">
                        {settingsTab === 'rede' && (
                          <div className="flex flex-col gap-3">
                            <div className="p-3 bg-white/5 rounded-xl border border-white/5 flex items-center justify-between">
                              <div>
                                <h5 className="font-bold text-white">Status da Rede</h5>
                                <p className="text-[10px] text-zinc-400">Ative ou remova o acesso à internet simulado.</p>
                              </div>
                              <button 
                                onClick={() => setWifiEnabled(!wifiEnabled)}
                                className={`px-4 py-1.5 font-bold text-[10px] rounded transition-all ${
                                  wifiEnabled ? 'bg-red-600 hover:bg-red-700 text-white' : 'bg-[#4285f4] hover:bg-[#4285f4]/90 text-white'
                                }`}
                              >
                                {wifiEnabled ? 'Desconectar' : 'Conectar'}
                              </button>
                            </div>
                            {wifiEnabled && (
                              <div className="p-3 bg-white/5 rounded-xl border border-white/5">
                                <h5 className="font-bold text-white mb-2 text-xs">Redes Disponíveis</h5>
                                <div className="flex items-center justify-between p-2 py-1.5 bg-white/5 rounded text-[10px] font-mono">
                                  <span>📶 meuLinux_5G (Conectado)</span>
                                  <span className="text-emerald-400 font-bold">Excelente</span>
                                </div>
                              </div>
                            )}
                          </div>
                        )}

                        {settingsTab === 'dispositivo' && (
                          <div className="flex flex-col gap-3">
                            {/* VOLUME CONFIGURATION ROW */}
                            <div className="p-4.5 bg-white/5 rounded-xl border border-white/5 flex flex-col gap-3 text-left">
                              <div>
                                <h5 className="font-bold text-white text-xs">Áudio & Alto-falantes (Volume)</h5>
                                <p className="text-[10px] text-zinc-400 font-normal">Clique nos botões de menos (-) ou mais (+) para calibrar o volume.</p>
                              </div>
                              <div className="flex items-center gap-3">
                                <button 
                                  onClick={() => setVolume(v => Math.max(0, v - 10))}
                                  className="w-8 h-8 rounded-lg bg-white/10 hover:bg-white/15 text-white flex items-center justify-center font-bold text-sm active:scale-95 transition-all"
                                  title="Baixar Volume"
                                >
                                  -
                                </button>
                                <div className="flex-grow h-2 bg-white/10 rounded-full overflow-hidden relative">
                                  <div className="bg-[#8ab4f8] h-full transition-all" style={{ width: `${volume}%` }} />
                                  <input 
                                    type="range"
                                    min="0"
                                    max="100"
                                    value={volume}
                                    onChange={(e) => setVolume(Number(e.target.value))}
                                    className="absolute inset-0 opacity-0 cursor-pointer w-full h-full"
                                  />
                                </div>
                                <button 
                                  onClick={() => setVolume(v => Math.min(100, v + 10))}
                                  className="w-8 h-8 rounded-lg bg-white/10 hover:bg-white/15 text-white flex items-center justify-center font-bold text-sm active:scale-95 transition-all"
                                  title="Aumentar Volume"
                                >
                                  +
                                </button>
                                <span className="text-[10px] font-bold text-zinc-300 w-8 text-right font-mono">{volume}%</span>
                              </div>
                            </div>

                            {/* BRIGHTNESS CONFIGURATION ROW */}
                            <div className="p-4.5 bg-white/5 rounded-xl border border-white/5 flex flex-col gap-3 text-left">
                              <div>
                                <h5 className="font-bold text-white text-xs">Tela & Luminosidade (Brilho)</h5>
                                <p className="text-[10px] text-zinc-450 text-zinc-400">Clique nos botões de menos (-) ou mais (+) para ajustar a luminosidade.</p>
                              </div>
                              <div className="flex items-center gap-3">
                                <button 
                                  onClick={() => setBrightness(b => Math.max(10, b - 10))}
                                  className="w-8 h-8 rounded-lg bg-white/10 hover:bg-white/15 text-white flex items-center justify-center font-bold text-sm active:scale-95 transition-all"
                                  title="Baixar Luminosidade"
                                >
                                  -
                                </button>
                                <div className="flex-grow h-2 bg-white/10 rounded-full overflow-hidden relative">
                                  <div className="bg-yellow-400 h-full transition-all" style={{ width: `${brightness}%` }} />
                                  <input 
                                    type="range"
                                    min="10"
                                    max="100"
                                    value={brightness}
                                    onChange={(e) => setBrightness(Number(e.target.value))}
                                    className="absolute inset-0 opacity-0 cursor-pointer w-full h-full"
                                  />
                                </div>
                                <button 
                                  onClick={() => setBrightness(b => Math.min(100, b + 10))}
                                  className="w-8 h-8 rounded-lg bg-white/10 hover:bg-white/15 text-white flex items-center justify-center font-bold text-sm active:scale-95 transition-all"
                                  title="Aumentar Luminosidade"
                                >
                                  +
                                </button>
                                <span className="text-[10px] font-bold text-zinc-300 w-8 text-right font-mono">{brightness}%</span>
                              </div>
                            </div>
                          </div>
                        )}

                        {settingsTab === 'personalizacao' && (
                          <div className="flex flex-col gap-3">
                            <div className="p-3 bg-white/5 rounded-xl border border-white/5 flex items-center justify-between">
                              <div>
                                <h5 className="font-bold text-white font-sans text-xs">Visual e Modos de Cor</h5>
                                <p className="text-[10px] text-zinc-400">Mudar entre Modo Escuro e Modo Claro instantaneamente.</p>
                              </div>
                              <button 
                                onClick={() => setIsDarkMode(!isDarkMode)}
                                className="px-4 py-1.5 bg-[#4285f4] hover:bg-[#4285f4]/90 text-white font-bold text-[10px] rounded"
                              >
                                {isDarkMode ? 'Ativar Modo Claro' : 'Ativar Modo Escuro'}
                              </button>
                            </div>
                          </div>
                        )}

                        {settingsTab === 'sobre' && (
                          <div className="p-3 bg-white/5 rounded-xl border border-white/5">
                            <h4 className="font-bold text-white text-sm mb-1">Informações do Chromebook</h4>
                            <p className="text-[11px] text-zinc-400 leading-relaxed mb-3">O Chrome OS Flex é projetado para trazer velocidades e estabilidade absurdas a Macs e PCs legados de forma simples.</p>
                            <div className="grid grid-cols-2 gap-2 text-[10px] text-zinc-400 font-mono">
                              <div>CPU: Intel/AMD Emulator Virtual</div>
                              <div>Arquitetura: x86-64 Clássico</div>
                              <div>Desenvolvido: Google Enterprise</div>
                              <div>Tema Inicial: Escuro Dinâmico</div>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  )}

                  {/* APP: SYSTEM DIAGNOSTICS */}
                  {win.id === 'diagnostics' && (
                    <div className="w-full h-full bg-[#121318] p-4 text-zinc-200">
                      <div className="flex items-center gap-2 mb-4">
                        <DiagnosticsLogo size={28} />
                        <div>
                          <h4 className="text-sm font-bold text-white">Diagnósticos do Dispositivo Chromebook</h4>
                          <p className="text-[10px] text-zinc-400">Monitor de Recursos e Termoestáticos em Tempo Real</p>
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        <div className="p-3 bg-[#1e1f22] rounded-xl border border-white/5">
                          <div className="flex items-center justify-between text-xs font-bold text-white mb-2">
                            <span>Uso da CPU (Emulado)</span>
                            <span className="text-[#00E676]">22%</span>
                          </div>
                          <div className="w-full bg-zinc-800 h-2 rounded-full overflow-hidden">
                            <div className="bg-[#00E676] h-full" style={{ width: '22%' }} />
                          </div>
                        </div>

                        <div className="p-3 bg-[#1e1f22] rounded-xl border border-white/5">
                          <div className="flex items-center justify-between text-xs font-bold text-white mb-2">
                            <span>Memória RAM (Emulada)</span>
                            <span className="text-blue-400">1.8GB / 4.0GB</span>
                          </div>
                          <div className="w-full bg-zinc-800 h-2 rounded-full overflow-hidden">
                            <div className="bg-blue-400 h-full" style={{ width: '45%' }} />
                          </div>
                        </div>
                      </div>

                      <div className="mt-4 p-3.5 bg-[#00796B]/10 rounded-xl border border-[#00796B]/20 flex items-center justify-between text-xs">
                        <p className="text-zinc-300 leading-normal max-w-sm">
                          Sua máquina e hardware de contêiner foram aprovados em todos os testes de compatibilidade do Chrome OS Flex!
                        </p>
                        <button onClick={() => triggerAlert('Todos os testes finalizados com êxito.')} className="px-4 py-1.5 bg-[#00796B] hover:bg-[#00796B]/80 rounded font-bold text-white text-[11px]">Rodar Diagnóstico</button>
                      </div>
                    </div>
                  )}

                  {/* APP: CALCULATOR */}
                  {win.id === 'calculator' && (
                    <div className="w-full h-full bg-[#2b2d31] flex flex-col p-3 gap-2.5 select-none overflow-hidden">
                      <div className="bg-[#121318] p-3.5 rounded-xl text-right text-white font-mono text-xl truncate tracking-tight shrink-0">{calcDisplay}</div>
                      <div className="grid grid-cols-4 gap-1.5 flex-grow">
                        {['C', '÷', 'x', 'Del', '7', '8', '9', '-', '4', '5', '6', '+', '1', '2', '3', '=', '0', '.'].map((char) => (
                          <button
                            key={char}
                            onClick={() => handleCalcBtn(char)}
                            className={`rounded-xl text-xs font-bold font-mono transition-transform active:scale-95 flex items-center justify-center ${
                              char === 'C' ? 'bg-rose-500/20 text-rose-400 hover:bg-rose-500/30' :
                              char === '=' ? 'bg-emerald-500 text-black font-extrabold col-span-2 hover:bg-emerald-400' :
                              ['÷', 'x', '-', '+'].includes(char) ? 'bg-[#ff9800]/20 text-[#ff9800] hover:bg-[#ff9800]/30' :
                              'bg-white/5 hover:bg-white/10 text-white'
                            }`}
                          >
                            {char}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* APP: CHROME WEB STORE */}
                  {win.id === 'webstore' && (
                    <div className="w-full h-full bg-[#121318] p-4 text-zinc-200">
                      <div className="flex items-center justify-between border-b border-white/10 pb-3 mb-4 shrink-0">
                        <div className="flex items-center gap-2">
                          <WebStoreLogo size={28} />
                          <div>
                            <h4 className="text-sm font-bold text-white">Chrome Web Store</h4>
                            <p className="text-[10px] text-zinc-400">Adicione plugins e extensões ao seu navegador simulado</p>
                          </div>
                        </div>
                        <button className="bg-blue-600 hover:bg-blue-700 text-white font-bold text-[10px] px-3 py-1.5 rounded-lg">Gerenciar Extensões</button>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        <div className="p-3 bg-[#1e1f22] rounded-xl border border-white/5 flex flex-col justify-between">
                          <div>
                            <h5 className="font-bold text-white text-xs mb-1">Cores Dinâmicas para Devs</h5>
                            <p className="text-[10px] text-zinc-400 leading-normal mb-3">Deixe as janelas com cores do terminal verde escuro.</p>
                          </div>
                          <button onClick={() => {
                            setIsDarkMode(true);
                            triggerAlert('Visual escuro de alta aceleração ativado.');
                          }} className="w-full py-1 bg-blue-600 hover:bg-blue-700 rounded text-[10px] font-bold text-white">Instalar Extensão</button>
                        </div>

                        <div className="p-3 bg-[#1e1f22] rounded-xl border border-white/5 flex flex-col justify-between">
                          <div>
                            <h5 className="font-bold text-white text-xs mb-1">Mute-All Audio Blocker</h5>
                            <p className="text-[10px] text-zinc-400 leading-normal mb-3">Silenciar de forma absoluta todos os bipes e chimes do Chromebook.</p>
                          </div>
                          <button onClick={() => {
                            setVolume(0);
                            triggerAlert('Audio do Chromebook silenciado.');
                          }} className="w-full py-1 bg-zinc-700 hover:bg-zinc-600 rounded text-[10px] font-bold text-white">Instalar Extensão</button>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* APP: GOOGLE DOCS */}
                  {win.id === 'docs' && (
                    <div className="w-full h-full bg-[#121318] p-3 flex flex-col">
                      <div className="p-2 border-b border-white/5 bg-[#202124] flex items-center justify-between shrink-0 mb-3 text-xs">
                        <span className="font-bold text-white text-xs">Google Documentos Sem Título.gdoc</span>
                        <div className="flex gap-2">
                          <button onClick={() => triggerAlert('Documento salvo na nuvem.')} className="px-3 py-1 bg-[#1a73e8] text-white rounded-[4px] font-bold text-[11px]">Salvar Drive</button>
                        </div>
                      </div>
                      <textarea 
                        className="flex-1 w-full bg-white text-zinc-950 p-4 border border-zinc-300 rounded-lg text-xs leading-relaxed focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none font-sans"
                        placeholder="Comece a escrever seu relatório de TI ou trabalho escolar no Docs..."
                        defaultValue="===============================\n   RELATÓRIO DE IMPACTO CHROME OS FLEX\n===============================\n\nO Chrome OS Flex permite que computadores antigos e laptops defasados tenham uma nova vida útil, consumindo até 40% menos recursos e prolongando a autonomia da bateria em atividades focadas na Web."
                      />
                    </div>
                  )}

                  {/* APP: GOOGLE SHEETS */}
                  {win.id === 'sheets' && (
                    <div className="w-full h-full bg-[#121318] p-3 flex flex-col">
                      <div className="p-2 bg-[#202124] flex items-center justify-between border-b border-white/5 shrink-0 mb-3 text-xs">
                        <span className="font-bold text-white">Planilha Trimestral de Redução de Resíduos.gsheet</span>
                        <span className="text-[9px] text-[#00E676] bg-green-950/40 p-1 rounded font-mono">ESTÁVEL</span>
                      </div>
                      <div className="flex-grow overflow-auto grid grid-cols-5 bg-zinc-800 gap-[1px] p-[1px] text-[11px] font-mono rounded-lg">
                        {Array.from({ length: 25 }).map((_, idx) => {
                          const col = String.fromCharCode(65 + (idx % 5));
                          const row = Math.floor(idx / 5) + 1;
                          const isHeader = row === 1;
                          return (
                            <div 
                              key={idx} 
                              className={`p-1.5 focus:outline-none focus:ring-1 focus:ring-emerald-500 overflow-hidden truncate ${isHeader ? 'bg-zinc-700 text-zinc-300 font-bold text-center' : 'bg-zinc-900 text-zinc-100'}`}
                              contentEditable={!isHeader}
                              suppressContentEditableWarning
                            >
                              {isHeader ? col : (row === 2 ? (col === 'A' ? 'Chromebook' : (col === 'B' ? 'Simulador' : 'Fiel')) : '')}
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  )}

                  {/* APP: GOOGLE SLIDES */}
                  {win.id === 'slides' && (
                    <div className="w-full h-full bg-[#121318] p-3 flex flex-col">
                      <div className="p-2 bg-[#202124] flex items-center justify-between border-b border-white/5 shrink-0 mb-3 text-xs">
                        <span className="font-bold text-white">Apresentação Institucional.gslides</span>
                        <button onClick={() => triggerAlert('Modo de exibição offline ativado.')} className="px-3 py-1 bg-yellow-600 hover:bg-yellow-700 text-white font-bold rounded text-[11px]">Apresentar ↗</button>
                      </div>
                      <div className="flex-1 bg-gradient-to-tr from-yellow-100 to-amber-200 text-zinc-950 rounded-xl p-6 flex flex-col justify-between shadow-inner select-none">
                        <div>
                          <h4 className="text-lg font-bold">meuLinux: Simplificando Desktops</h4>
                          <p className="text-xs text-zinc-700 mt-1 max-w-sm">Uma visão interativa das distribuições Linux mais famosas direto de qualquer navegador web.</p>
                        </div>
                        <div className="text-[10px] text-zinc-500 font-mono">Slide 1 de 1 · Editado há instantes</div>
                      </div>
                    </div>
                  )}

                  {/* APP: NOTEBOOKLM AI PRODUTIVIDADE */}
                  {win.id === 'notebooklm' && (
                    <div className="w-full h-full bg-[#131314] flex flex-col font-sans select-text">
                      {/* Top Bar of NotebookLM */}
                      <div className="h-12 border-b border-white/10 flex items-center justify-between px-4 shrink-0 bg-[#1e1f20]">
                        <div className="flex items-center gap-2">
                          <span className="p-1 px-2 rounded-lg bg-blue-600/20 text-blue-400 font-black text-xs">
                             NotebookLM
                          </span>
                          <span className="text-[10px] bg-white/10 px-2 py-0.5 rounded text-zinc-350">Guia Inteligente</span>
                        </div>
                        <div className="flex items-center gap-3">
                          <button 
                            onClick={() => {
                              setNotebookLmMessages([
                                { sender: 'ai', text: 'Olá! Sou seu guia de fontes NotebookLM. Posso responder qualquer dúvida baseada nas fontes e documentos carregados ao lado!' }
                              ]);
                              triggerAlert('Histórico limpo com sucesso.');
                            }}
                            className="p-1 rounded hover:bg-white/5 text-zinc-400 hover:text-white transition-colors"
                            title="Limpar Conversa"
                          >
                            <RotateCcw size={14} />
                          </button>
                        </div>
                      </div>

                      {/* Main Workspace split into columns */}
                      <div className="flex-grow flex min-h-0 overflow-hidden">
                        {/* Left column: Source documents selection */}
                        <div className="w-1/3 border-r border-white/10 bg-[#111213] p-3 flex flex-col gap-2.5 overflow-y-auto shrink-0 select-none">
                          <h3 className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest px-1">Seus Documentos de Fonte (3)</h3>
                          
                          {Object.entries(notebookLmDocuments).map(([key, doc]) => {
                            const isSelected = notebookSelectedDoc === key;
                            return (
                              <div
                                key={key}
                                onClick={() => setNotebookSelectedDoc(key as 'doc1' | 'doc2' | 'doc3')}
                                className={`p-3 rounded-xl border transition-all cursor-pointer text-left flex flex-col gap-1 ${
                                  isSelected 
                                    ? 'bg-blue-600/10 border-blue-500/50 shadow-inner' 
                                    : 'bg-[#1c1d1f]/40 border-white/5 hover:bg-[#1c1d1f]/80 hover:border-white/10'
                                }`}
                              >
                                <div className="flex items-center justify-between gap-1.5">
                                  <div className="flex items-center gap-1.5 min-w-0">
                                    <FileText size={14} className={isSelected ? 'text-blue-400' : 'text-zinc-500'} />
                                    <span className={`text-xs font-bold truncate ${isSelected ? 'text-white' : 'text-zinc-350'}`}>
                                      {doc.title}
                                    </span>
                                  </div>
                                  <span className="text-[8px] font-mono text-zinc-500 shrink-0">{doc.size}</span>
                                </div>
                                <p className="text-[10px] text-zinc-400 leading-relaxed line-clamp-2">
                                  {doc.content}
                                </p>
                              </div>
                            );
                          })}

                          <div className="mt-auto border border-white/5 border-dashed rounded-xl p-3 bg-white/[0.01] text-center flex flex-col items-center gap-1.5">
                            <Sparkles size={16} className="text-blue-400 animate-pulse" />
                            <p className="text-[9px] text-zinc-400 font-bold uppercase tracking-wider">Modo Copiloto Ativo</p>
                            <p className="text-[10px] text-zinc-500 leading-snug">Todas as respostas estão sintonizadas com o seu material local.</p>
                          </div>
                        </div>

                        {/* Right column: Interactive ChatGPT / Agent interface */}
                        <div className="flex-1 bg-[#131416] flex flex-col min-h-0 relative">
                          {/* Messages bubble feed */}
                          <div className="flex-grow overflow-y-auto p-4 space-y-4 no-scrollbar">
                            {notebookLmMessages.map((msg, idx) => {
                              const isAI = msg.sender === 'ai';
                              return (
                                <div key={idx} className={`flex gap-3 text-left max-w-[85%] ${isAI ? 'mr-auto' : 'ml-auto flex-row-reverse'}`}>
                                  <span className={`w-7 h-7 rounded-lg text-xs font-bold flex items-center justify-center shrink-0 shadow ${
                                    isAI ? 'bg-gradient-to-tr from-blue-600 to-indigo-700 text-white' : 'bg-zinc-805 bg-zinc-850 bg-zinc-800 text-zinc-200'
                                  }`}>
                                    {isAI ? 'AI' : 'U'}
                                  </span>
                                  <div className={`p-3 rounded-2xl text-[11px] leading-relaxed shadow-sm whitespace-pre-wrap ${
                                    isAI ? 'bg-[#1e1f20]/90 text-zinc-200 border border-white/5' : 'bg-blue-600 text-white font-medium'
                                  }`}>
                                    {msg.text}
                                  </div>
                                </div>
                              );
                            })}

                            {notebookLmTypingText && (
                              <div className="flex gap-3 text-left max-w-sm mr-auto">
                                <span className="w-7 h-7 rounded-lg text-xs font-bold flex items-center justify-center shrink-0 bg-gradient-to-tr from-blue-600 to-indigo-700 text-white shadow">
                                  AI
                                </span>
                                <div className="p-3 bg-[#1e1f20]/90 text-zinc-400 border border-white/5 rounded-2xl text-xs flex items-center gap-2 select-none shrink-0">
                                  <div className="flex gap-1">
                                    <span className="w-1.5 h-1.5 rounded-full bg-blue-500 animate-bounce delay-100" />
                                    <span className="w-1.5 h-1.5 rounded-full bg-blue-500 animate-bounce delay-300" />
                                    <span className="w-1.5 h-1.5 rounded-full bg-blue-500 animate-bounce delay-500" />
                                  </div>
                                  <span>Analisando fontes...</span>
                                </div>
                              </div>
                            )}
                          </div>

                          {/* Quick Suggestion Prompts */}
                          <div className="px-4 py-1.5 flex flex-wrap gap-2 shrink-0 select-none border-t border-white/[0.04] bg-[#0f1011]">
                            <button 
                              onClick={() => askNotebookLm('Gere um resumo em tópicos')}
                              className="px-3 py-1 bg-white/5 hover:bg-white/10 text-[10px] text-zinc-300 rounded-full border border-white/5 transition-all"
                            >
                              📋 Resumo em tópicos
                            </button>
                            <button 
                              onClick={() => askNotebookLm('Explicar diferenças de desempenho')}
                              className="px-3 py-1 bg-white/5 hover:bg-white/10 text-[10px] text-zinc-300 rounded-full border border-white/5 transition-all"
                            >
                              ⚡ Benchmarks de velocidade
                            </button>
                            <button 
                              onClick={() => askNotebookLm('O que é o Kernel?')}
                              className="px-3 py-1 bg-white/5 hover:bg-white/10 text-[10px] text-zinc-300 rounded-full border border-white/5 transition-all"
                            >
                              🐧 Conceito de Kernel
                            </button>
                          </div>

                          {/* Input field wrapper */}
                          <div className="p-3.5 bg-[#0e0f10] border-t border-white/10 shrink-0">
                            <form 
                              onSubmit={(e) => {
                                e.preventDefault();
                                askNotebookLm(notebookLmInput);
                              }}
                              className="flex items-center bg-[#1c1d1f] border border-white/10 rounded-full overflow-hidden focus-within:border-blue-500"
                            >
                              <input 
                                type="text"
                                placeholder={`Faça uma pergunta sobre "${notebookLmDocuments[notebookSelectedDoc].title}"...`}
                                value={notebookLmInput}
                                onChange={(e) => setNotebookLmInput(e.target.value)}
                                className="flex-1 bg-transparent text-xs text-white px-4 py-2.5 outline-none placeholder-zinc-500 text-left"
                              />
                              <button 
                                type="submit" 
                                className="bg-blue-600 text-white font-bold text-xs px-5 py-2.5 hover:bg-blue-700 transition-colors shrink-0"
                              >
                                Perguntar
                              </button>
                            </form>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* APP: GEMINI AI ASSISTANT */}
                  {win.id === 'gemini' && (
                    <div className="w-full h-full bg-[#131314] flex flex-col font-sans select-text">
                      {/* Top Bar of Gemini */}
                      <div className="h-14 border-b border-white/[0.06] flex items-center justify-between px-5 shrink-0 bg-[#1e1f20]">
                        <div className="flex items-center gap-2.5 text-left">
                          <img 
                            src="/assets/gemini.webp" 
                            className="w-5 h-5 object-contain" 
                            alt="Gemini Icon"
                          />
                          <div className="flex flex-col">
                            <span className="text-sm font-bold text-white leading-tight flex items-center gap-1.5">
                              Gemini <span className="text-[9px] bg-gradient-to-r from-blue-400 to-[#caa5fe] text-white px-1.5 py-0.5 rounded-full uppercase tracking-wider font-semibold">3.5 Flash</span>
                            </span>
                            <span className="text-[9px] text-zinc-400">Inteligência Artificial Integrada</span>
                          </div>
                        </div>
                        <div className="flex items-center gap-3">
                          <button 
                            onClick={() => {
                              setGeminiMessages([
                                { sender: 'gemini', text: 'Olá! Sou o Gemini, a inteligência artificial do Google. Como posso te apoiar com sua produtividade e dúvidas de tecnologia hoje?' }
                              ]);
                              triggerAlert('Histórico do Gemini limpo com sucesso.');
                            }}
                            className="p-1.5 rounded-lg hover:bg-white/5 text-zinc-400 hover:text-white transition-colors"
                            title="Reiniciar conversa"
                          >
                            <RotateCcw size={14} />
                          </button>
                        </div>
                      </div>

                      {/* Main Workspace */}
                      <div className="flex-1 bg-[#131314] flex flex-col min-h-0 relative">
                        {/* Messages Flow */}
                        <div className="flex-grow overflow-y-auto p-5 space-y-5 no-scrollbar">
                          {geminiMessages.map((msg, idx) => {
                            const isUser = msg.sender === 'user';
                            return (
                              <div key={idx} className={`flex gap-3 text-left max-w-[85%] ${isUser ? 'ml-auto flex-row-reverse' : 'mr-auto'}`}>
                                <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 shadow-sm border ${
                                  isUser 
                                    ? 'bg-[#2c3e50] text-zinc-200 border-white/5' 
                                    : 'bg-white/5 border-white/[0.08]'
                                }`}>
                                  {isUser ? (
                                    <span className="text-[8px] font-bold">VOCÊ</span>
                                  ) : (
                                    <img 
                                      src="/assets/gemini.webp" 
                                      className="w-4 h-4 object-contain" 
                                      alt="Gemini Avatar"
                                    />
                                  )}
                                </div>
                                <div className={`p-3.5 rounded-2xl text-[11px] leading-relaxed shadow-sm whitespace-pre-wrap ${
                                  isUser 
                                    ? 'bg-[#1a73e8] text-white font-medium' 
                                    : 'bg-[#1e1f20]/90 text-zinc-200 border border-white/5'
                                }`}>
                                  {msg.text}
                                </div>
                              </div>
                            );
                          })}

                          {isGeminiLoading && (
                            <div className="flex gap-3 text-left max-w-sm mr-auto">
                              <div className="w-8 h-8 rounded-full flex items-center justify-center shrink-0 shadow-sm border bg-white/5 border-white/[0.08]">
                                <img 
                                  src="/assets/gemini.webp" 
                                  className="w-4 h-4 object-contain" 
                                  alt="Gemini Loading Avatar"
                                />
                              </div>
                              <div className="p-3.5 bg-[#1e1f20]/90 text-zinc-400 border border-white/5 rounded-2xl text-xs flex items-center gap-2 select-none shrink-0">
                                <span className="w-1.5 h-1.5 rounded-full bg-blue-500 animate-bounce delay-100" />
                                <span className="w-1.5 h-1.5 rounded-full bg-[#caa5fe] animate-bounce delay-300" />
                                <span className="w-1.5 h-1.5 rounded-full bg-blue-500 animate-bounce delay-500" />
                                <span className="text-[10px] font-medium font-mono text-zinc-400">Gemini está pensando...</span>
                              </div>
                            </div>
                          )}
                        </div>

                        {/* Suggestions */}
                        <div className="px-5 py-2.5 flex flex-wrap gap-2 shrink-0 select-none border-t border-white/[0.04] bg-[#0f1011]">
                          <button 
                            type="button"
                            onClick={() => askGemini('Como funciona o ChromeOS Flex?')}
                            className="px-3.5 py-1.5 bg-white/5 hover:bg-white/10 text-[10px] text-zinc-300 rounded-full border border-white/5 transition-all outline-none"
                          >
                            💻 Como funciona o ChromeOS Flex?
                          </button>
                          <button 
                            type="button"
                            onClick={() => askGemini('Dá para usar o terminal do Linux no Chromebook?')}
                            className="px-3.5 py-1.5 bg-white/5 hover:bg-white/10 text-[10px] text-zinc-300 rounded-full border border-white/5 transition-all outline-none"
                          >
                            🐧 Terminal Linux Crostini
                          </button>
                          <button 
                            type="button"
                            onClick={() => askGemini('Me fale sobre o projeto meuLinux.')}
                            className="px-3.5 py-1.5 bg-white/5 hover:bg-white/10 text-[10px] text-zinc-300 rounded-full border border-white/5 transition-all outline-none"
                          >
                            ❤️ Projeto meuLinux
                          </button>
                        </div>

                        {/* Input container */}
                        <div className="p-4 bg-[#0e0f10] border-t border-white/[0.06] shrink-0">
                          <form 
                            onSubmit={(e) => {
                              e.preventDefault();
                              if (geminiInput.trim()) {
                                askGemini(geminiInput);
                              }
                            }}
                            className="flex items-center bg-[#1c1d1f] border border-white/10 rounded-full overflow-hidden focus-within:border-[#8ab4f8] transition-all"
                          >
                            <input 
                              type="text"
                              placeholder="Fale com o Gemini (e.g., sobre o ChromeOS ou Linux)..."
                              value={geminiInput}
                              onChange={(e) => setGeminiInput(e.target.value)}
                              className="flex-1 bg-transparent text-xs text-white px-5 py-3 outline-none placeholder-zinc-500 text-left"
                            />
                            <button 
                              type="submit" 
                              disabled={isGeminiLoading}
                              className="bg-[#1a73e8] hover:bg-[#1557b0] disabled:opacity-50 text-white font-bold text-xs px-6 py-3 transition-colors shrink-0 flex items-center gap-1.5"
                            >
                              <Sparkles size={14} />
                              <span>Enviar</span>
                            </button>
                          </form>
                        </div>
                      </div>
                    </div>
                  )}

                </div>

                {/* Resize handles */}
                {!win.isMaximized && (
                  <>
                    {/* Right handle */}
                    <div 
                      className="absolute top-0 right-0 w-2 h-full cursor-ew-resize z-[9999]"
                      onMouseDown={(e) => handleResizeStart(win.id, 'e', e)}
                    />
                    {/* Bottom handle */}
                    <div 
                      className="absolute bottom-0 left-0 h-2 w-full cursor-ns-resize z-[9999]"
                      onMouseDown={(e) => handleResizeStart(win.id, 's', e)}
                    />
                    {/* Bottom right corner handle */}
                    <div 
                      className="absolute bottom-0 right-0 w-4 h-4 cursor-nwse-resize z-[10000] rounded-tl"
                      onMouseDown={(e) => handleResizeStart(win.id, 'se', e)}
                    />
                  </>
                )}
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>

      {/* CORE ROUNDED APPLICATION LAUNCHER PANEL (Precise match of overlay in screenshot) */}
      <AnimatePresence>
        {launcherOpen && (
          <motion.div 
            className="absolute inset-[10px] bottom-[58px] z-40 rounded-3xl overflow-hidden shadow-2xl flex flex-col items-center py-6 px-4 md:px-8 border border-white/5"
            style={{
              background: 'radial-gradient(circle at 50% 10%, rgba(30, 31, 34, 0.96) 0%, rgba(20, 21, 24, 0.98) 100%)',
              backdropFilter: 'blur(30px)'
            }}
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 50, opacity: 0 }}
            transition={{ type: 'spring', damping: 25, stiffness: 220 }}
            onClick={(e) => {
              // Avoid closing on interior click
              e.stopPropagation();
            }}
          >
            {/* Top Indicator Line */}
            <div className="w-12 h-1 bg-white/20 rounded-full mb-6 shrink-0" />

            {/* Rounded Search bar precisely styled like Google Search with assistant mic */}
            <div className="w-full max-w-2xl bg-white text-zinc-850 rounded-full py-3.5 px-6 flex items-center shadow-xl border border-gray-200 shrink-0 select-none">
              <img 
                src="/assets/google-icon-logo-svgrepo-com.svg" 
                className="w-5 h-5 mr-3.5 shrink-0 select-none pointer-events-none" 
                alt="Google" 
              />

              <input 
                type="text"
                placeholder="Search your device, apps, settings, web..."
                className="bg-transparent !bg-none w-full focus:outline-none border-none text-base text-zinc-850 font-sans tracking-wide placeholder-zinc-400"
                style={{ backgroundColor: 'transparent', outline: 'none', border: 'none', boxShadow: 'none' }}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />

              {/* Google Mic colorful Assistant Icon */}
              <button onClick={() => triggerAlert("O Google Assistente de IA do meuLinux está ouvindo...")} className="shrink-0 ml-3 hover:scale-110 active:scale-95 transition-transform" title="Pesquisa por voz">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                  <path d="M12 14c1.66 0 3-1.34 3-3V5c0-1.66-1.34-3-3-3S9 3.34 9 5v6c0 1.66 1.34 3 3 3z" fill="#4285F4"/>
                  <path d="M17 11c0 2.76-2.24 5-5 5s-5-2.24-5-5H5c0 3.53 2.61 6.43 6 6.92V21h2v-3.08c3.39-.49 6-3.39 6-6.92h-2z" fill="#34A853"/>
                </svg>
              </button>
            </div>

            {/* Quick Suggestions Pills (below search precisely like screenshot with icons next to text) */}
            <div className="w-full max-w-2xl flex flex-wrap items-center justify-center gap-2.5 mt-5 shrink-0 px-2 select-none">
              {searchSuggestions.map((pill) => {
                const mapId: { [key: string]: string } = { Docs: 'docs', YouTube: 'youtube', Chrome: 'chrome', Calculator: 'calculator', Gmail: 'gmail' };
                const associatedId = mapId[pill] || 'chrome';
                const smallIconFallback = <div className="w-3.5 h-3.5 rounded-full bg-blue-500" />;
                return (
                  <button
                    key={pill}
                    onClick={() => launchApp(associatedId)}
                    className="pl-2.5 pr-4 py-1.5 bg-[#2d2e30]/80 hover:bg-[#323336]/90 border border-white/[0.04] text-[#f1f3f4] hover:text-white hover:border-white/10 active:scale-95 rounded-full text-xs font-medium flex items-center gap-2 transition-all shadow-sm"
                  >
                    <div className="w-4 h-4 shrink-0 flex items-center justify-center">
                      <ChromeOSAppIcon id={associatedId} size={16} fallback={smallIconFallback} />
                    </div>
                    <span>{pill}</span>
                  </button>
                );
              })}
            </div>

            {/* Master Grid of Apps (high fidelity circular shapes from original) */}
            <div className="flex-grow w-full max-w-4xl overflow-y-auto mt-8 px-4 flex flex-col justify-start no-scrollbar">
              <div className="grid grid-cols-3 sm:grid-cols-5 md:grid-cols-5 gap-y-6 gap-x-4 justify-items-center">
                {filteredApps.map((app) => (
                  <button
                    key={app.id}
                    onClick={() => launchApp(app.id)}
                    className="group bg-transparent flex flex-col items-center text-center shrink-0 w-24 hover:scale-105 active:scale-95 transition-all select-none"
                  >
                    <div className="w-16 h-16 rounded-full bg-white/5 group-hover:bg-white/10 hover:shadow-xl hover:shadow-black/20 border border-white/5 flex items-center justify-center p-1 transition-all">
                      {app.logo}
                    </div>
                    <span className="text-[11px] font-medium tracking-wide text-zinc-300 mt-2.5 group-hover:text-white line-clamp-1">
                      {app.name}
                    </span>
                  </button>
                ))}
              </div>

              {filteredApps.length === 0 && (
                <div className="text-zinc-500 text-xs text-center py-12">Nenhum aplicativo do Chromebook encontrado.</div>
              )}
            </div>

            {/* Side dots vertical control pagination (screenshot has 2 circular indicators) */}
            {searchQuery.trim() === '' && (
              <div className="flex items-center gap-3 shrink-0 py-3 mt-4">
                <button 
                  onClick={() => setActivePage('p1')}
                  className={`w-2.5 h-2.5 rounded-full transition-all ${activePage === 'p1' ? 'bg-white scale-125' : 'bg-white/30 hover:bg-white/50'}`}
                />
                <button 
                  onClick={() => setActivePage('p2')}
                  className={`w-2.5 h-2.5 rounded-full transition-all ${activePage === 'p2' ? 'bg-white scale-125' : 'bg-white/30 hover:bg-white/50'}`}
                />
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      {/* SYSTEM QUICK SETTINGS DIALOG (Wi-Fi, Bluetooth, battery status) */}
      <AnimatePresence>
        {quickSettingsOpen && (
          <motion.div 
            className="absolute bottom-[58px] right-[10px] z-50 w-[310px] bg-[#0c1824]/90 border border-white/10 rounded-[28px] shadow-2xl p-4.5 flex flex-col gap-4 text-zinc-100 select-none pb-5"
            style={{ backdropFilter: 'blur(30px)' }}
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 30, opacity: 0 }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Top Bar (Header Row): Profile avatar, Username pill, Power, Lock, Settings circular buttons, collapse caret */}
            <div className="flex items-center justify-between gap-1 pb-1">
              <div className="flex items-center gap-2">
                {/* Unsplash beautiful high-res male avatar to resemble the screenshot */}
                <img 
                  src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&h=100&fit=crop&crop=face" 
                  alt="Perfil" 
                  className="w-8 h-8 rounded-full object-cover border border-white/20 shadow-md"
                  referrerPolicy="no-referrer"
                />
                
                {/* Sair / Abmelden button label */}
                <button 
                  onClick={onClose}
                  className="bg-white/10 hover:bg-white/15 active:scale-95 text-[11px] text-zinc-200 font-medium px-3.5 py-1.5 rounded-full transition-all tracking-wide border border-white/5"
                >
                  Sair
                </button>
              </div>

              {/* Utility buttons power lock settings */}
              <div className="flex items-center gap-1.5">
                <button 
                  onClick={() => {
                    setIsBooting(true);
                    setQuickSettingsOpen(false);
                    setTimeout(() => setIsBooting(false), 2200);
                  }}
                  className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/15 text-zinc-200 hover:text-white flex items-center justify-center transition-all active:scale-90"
                  title="Desligar"
                >
                  <Power size={14} />
                </button>
                <button 
                  onClick={() => triggerAlert("Sua sessão foi bloqueada de forma simulada.")}
                  className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/15 text-zinc-200 hover:text-white flex items-center justify-center transition-all active:scale-90"
                  title="Bloquear"
                >
                  <Lock size={14} />
                </button>
                <button 
                  onClick={() => {
                    setQuickSettingsOpen(false);
                    launchApp('settings');
                  }}
                  className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/15 text-zinc-200 hover:text-white flex items-center justify-center transition-all active:scale-90"
                  title="Configurações"
                >
                  <IconSettings size={14} />
                </button>

                {/* Drop Down Arrow */}
                <button
                  onClick={() => setQuickSettingsOpen(false)}
                  className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/15 text-zinc-200 hover:text-white flex items-center justify-center transition-all active:scale-90 ml-0.5"
                  title="Minimizar painel"
                >
                  <ChevronDown size={14} />
                </button>
              </div>
            </div>

            {/* Grid of Switches: Wi-Fi, Bluetooth, DND, Screenshot, Nearby Share, Night light */}
            <div className="grid grid-cols-3 gap-y-4 gap-x-2 text-center text-[10px] font-semibold mt-1">
              
              {/* Wi-Fi Switch */}
              <div className="flex flex-col items-center gap-1">
                <button 
                  onClick={() => setWifiEnabled(!wifiEnabled)}
                  className={`w-[48px] h-[48px] rounded-full flex items-center justify-center transition-all active:scale-90 ${
                    wifiEnabled 
                      ? 'bg-[#8ab4f8] text-[#1c1d21] hover:bg-[#a9c7fa] shadow-lg shadow-[#8ab4f8]/20' 
                      : 'bg-[#2c3d52]/50 text-zinc-300 border border-white/5 hover:bg-[#2c3d52]/75'
                  }`}
                  title={wifiEnabled ? 'Desativar Wi-Fi' : 'Ativar Wi-Fi'}
                >
                  <Wifi size={18} />
                </button>
                <span className="text-[10px] text-zinc-100 font-medium leading-none mt-1 select-none">Wi-Fi</span>
                <span className="text-[9px] text-zinc-400 font-normal truncate max-w-[85px] mt-0.5">
                  {wifiEnabled ? 'meuLinux_5G' : 'Desativado'}
                </span>
              </div>

              {/* Bluetooth Switch */}
              <div className="flex flex-col items-center gap-1">
                <button 
                  onClick={() => setBluetoothEnabled(!bluetoothEnabled)}
                  className={`w-[48px] h-[48px] rounded-full flex items-center justify-center transition-all active:scale-90 ${
                    bluetoothEnabled 
                      ? 'bg-[#8ab4f8] text-[#1c1d21] hover:bg-[#a9c7fa] shadow-lg shadow-[#8ab4f8]/20' 
                      : 'bg-[#2c3d52]/50 text-zinc-300 border border-white/5 hover:bg-[#2c3d52]/75'
                  }`}
                  title={bluetoothEnabled ? 'Desativar Bluetooth' : 'Ativar Bluetooth'}
                >
                  <Bluetooth size={18} />
                </button>
                <span className="text-[10px] text-zinc-100 font-medium leading-none mt-1 select-none">Bluetooth</span>
                <span className="text-[9px] text-zinc-400 font-normal truncate max-w-[85px] mt-0.5">
                  {bluetoothEnabled ? 'Conectado' : 'Desativado'}
                </span>
              </div>

              {/* Do Not Disturb Switch */}
              <div className="flex flex-col items-center gap-1">
                <button 
                  onClick={() => setDndEnabled(!dndEnabled)}
                  className={`w-[48px] h-[48px] rounded-full flex items-center justify-center transition-all active:scale-90 ${
                    dndEnabled 
                      ? 'bg-[#8ab4f8] text-[#1c1d21] hover:bg-[#a9c7fa] shadow-lg shadow-[#8ab4f8]/20' 
                      : 'bg-[#2c3d52]/50 text-zinc-300 border border-white/5 hover:bg-[#2c3d52]/75'
                  }`}
                  title={dndEnabled ? 'Desativar Não Perturbe' : 'Ativar Não Perturbe'}
                >
                  {dndEnabled ? <BellOff size={18} /> : <Bell size={18} />}
                </button>
                <span className="text-[10px] text-zinc-100 font-medium leading-none mt-1 select-none">Não perturbe</span>
                <span className="text-[9px] text-zinc-400 font-normal truncate max-w-[85px] mt-0.5">
                  {dndEnabled ? 'Ativo (1 app)' : 'Silencioso'}
                </span>
              </div>

              {/* Screenshot Switch */}
              <div className="flex flex-col items-center gap-1">
                <button 
                  onClick={() => {
                    setScreenshotFlash(true);
                    setTimeout(() => setScreenshotFlash(false), 250);
                    triggerAlert("A tela inteira foi capturada! Arquivo screenshot.png salvo em Downloads.");
                    playChromeChime(volume);
                  }}
                  className="w-[48px] h-[48px] rounded-full flex items-center justify-center transition-all bg-[#2c3d52]/50 text-zinc-200 border border-white/5 hover:bg-[#2c3d52]/75 active:scale-90"
                  title="Capturar tela"
                >
                  <IconCamera size={18} />
                </button>
                <span className="text-[10px] text-zinc-100 font-medium leading-none mt-1 select-none">Captura</span>
                <span className="text-[9px] text-zinc-400 font-normal truncate max-w-[85px] mt-0.5">Atalho rápido</span>
              </div>

              {/* Nearby Share Switch */}
              <div className="flex flex-col items-center gap-1">
                <button 
                  onClick={() => setNearbyShareEnabled(!nearbyShareEnabled)}
                  className={`w-[48px] h-[48px] rounded-full flex items-center justify-center transition-all active:scale-90 ${
                    nearbyShareEnabled 
                      ? 'bg-[#8ab4f8] text-[#1c1d21] hover:bg-[#a9c7fa] shadow-lg shadow-[#8ab4f8]/20' 
                      : 'bg-[#2c3d52]/50 text-zinc-300 border border-white/5 hover:bg-[#2c3d52]/75'
                  }`}
                  title={nearbyShareEnabled ? 'Desativar Compartilhamento' : 'Ativar Compartilhamento'}
                >
                  <Share2 size={18} />
                </button>
                <span className="text-[10px] text-zinc-100 font-medium leading-none mt-1 select-none">Compartilhar</span>
                <span className="text-[9px] text-zinc-400 font-normal truncate max-w-[85px] mt-0.5">
                  {nearbyShareEnabled ? 'Ativo' : 'Desativado'}
                </span>
              </div>

              {/* Night Light Switch */}
              <div className="flex flex-col items-center gap-1">
                <button 
                  onClick={() => setNightLightEnabled(!nightLightEnabled)}
                  className={`w-[48px] h-[48px] rounded-full flex items-center justify-center transition-all active:scale-90 ${
                    nightLightEnabled 
                      ? 'bg-[#8ab4f8] text-[#1c1d21] hover:bg-[#a9c7fa] shadow-lg shadow-[#8ab4f8]/20' 
                      : 'bg-[#2c3d52]/50 text-zinc-300 border border-white/5 hover:bg-[#2c3d52]/75'
                  }`}
                  title={nightLightEnabled ? 'Desativar Luz Noturna' : 'Ativar Luz Noturna'}
                >
                  <Moon size={18} />
                </button>
                <span className="text-[10px] text-zinc-100 font-medium leading-none mt-1 select-none">Luz noturna</span>
                <span className="text-[9px] text-zinc-400 font-normal truncate max-w-[85px] mt-0.5">
                  {nightLightEnabled ? 'Ativada (Quente)' : 'Desativada'}
                </span>
              </div>

            </div>

            {/* Slider for volume: Clean Custom Design with speaker icon and arrow expander */}
            <div className="flex flex-col gap-1 mt-1 text-xs">
              <div className="flex items-center gap-3">
                <button 
                  onClick={() => setVolume(v => v === 0 ? 75 : 0)}
                  className={`w-9 h-9 rounded-full flex items-center justify-center shrink-0 transition-all ${
                    volume > 0 
                      ? 'bg-[#8ab4f8] text-[#1c1d21] hover:bg-[#a9c7fa]' 
                      : 'bg-[#2c3d52]/50 text-zinc-400 border border-white/5'
                  }`}
                >
                  {volume === 0 ? <VolumeX size={15} /> : <Volume2 size={15} />}
                </button>

                {/* Styled slider overlay track */}
                <div className="flex-grow h-1.5 rounded-full bg-white/10 relative overflow-hidden flex items-center">
                  <div 
                    className="h-full bg-[#8ab4f8] rounded-full transition-all duration-75" 
                    style={{ width: `${volume}%` }}
                  />
                  <input 
                    type="range" 
                    min="0" 
                    max="100" 
                    className="absolute inset-0 opacity-0 cursor-pointer w-full h-full"
                    value={volume}
                    onChange={(e) => setVolume(Number(e.target.value))}
                  />
                </div>

                <div className="text-[10px] text-zinc-300 font-bold font-sans w-6 text-right select-none">{volume}%</div>

                <button 
                  onClick={() => triggerAlert("Controles avançados de canais de áudio.")}
                  className="w-9 h-9 rounded-full bg-[#2c3d52]/50 border border-white/5 text-zinc-300 hover:bg-[#2c3d52]/75 flex items-center justify-center transition-all grow-0 shrink-0 select-none"
                  title="Configurar áudio"
                >
                  <ChevronRight size={15} />
                </button>
              </div>
            </div>

            {/* Slider for brightness: Clean Custom Design with sun icon */}
            <div className="flex flex-col gap-1 text-xs">
              <div className="flex items-center gap-3">
                <button 
                  className="w-9 h-9 rounded-full bg-[#2c3d52]/50 border border-white/5 text-zinc-300 flex items-center justify-center shrink-0"
                  disabled
                >
                  <Sun size={15} />
                </button>

                {/* Styled slider overlay track */}
                <div className="flex-grow h-1.5 rounded-full bg-white/10 relative overflow-hidden flex items-center">
                  <div 
                    className="h-full bg-[#8ab4f8] rounded-full transition-all duration-75" 
                    style={{ width: `${brightness}%` }}
                  />
                  <input 
                    type="range" 
                    min="10" 
                    max="100" 
                    className="absolute inset-0 opacity-0 cursor-pointer w-full h-full"
                    value={brightness}
                    onChange={(e) => setBrightness(Number(e.target.value))}
                  />
                </div>

                <div className="text-[10px] text-zinc-300 font-bold font-sans w-6 text-right select-none">{brightness}%</div>

                <span className="w-9 shrink-0" />
              </div>
            </div>

            {/* Bottom info banner (Portuguese, dynamic, battery state matching high-res output) */}
            <div className="flex items-center justify-between text-[11px] text-[#8ab4f8] font-semibold leading-none tracking-normal font-sans border-t border-white/10 pt-3 mt-1 pb-1">
              <span>{getFooterDateString()}</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* SYSTEM CALENDAR & TASKS DIALOG (Dark Mode version matching user request) */}
      <AnimatePresence>
        {calendarOpen && (
          <motion.div 
            className="absolute bottom-[58px] right-[10px] z-50 w-[320px] flex flex-col gap-3 text-zinc-100 select-none pb-2 max-h-[80vh] overflow-y-auto no-scrollbar font-sans"
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 30, opacity: 0 }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* CARD 0: NOTIFICATIONS */}
            <div className="bg-[#1e1f22]/95 border border-white/10 rounded-2xl p-4 shadow-2xl backdrop-blur-md">
              <div className="flex items-center justify-between mb-3 text-xs md:text-sm font-semibold select-none">
                <div className="flex items-center gap-2">
                  <span className="w-5 h-5 rounded-full bg-blue-500/10 text-blue-400 flex items-center justify-center font-bold">🔔</span>
                  <span className="text-zinc-250 font-sans">{isEn ? 'Notifications' : 'Notificações'}</span>
                </div>
                {notifications.length > 0 && (
                  <button 
                    onClick={() => setNotifications([])}
                    className="text-[10px] text-blue-400 hover:text-blue-300 font-sans hover:underline cursor-pointer"
                  >
                    {isEn ? 'Clear all' : 'Limpar tudo'}
                  </button>
                )}
              </div>

              {notifications.length === 0 ? (
                <div className="text-center py-4 text-zinc-500 text-[11px] font-sans">
                  {isEn ? 'No new notifications at the moment' : 'Nenhuma notificação nova no momento'}
                </div>
              ) : (
                <div className="space-y-2.5 max-h-[140px] overflow-y-auto no-scrollbar text-left">
                  {notifications.map((notif) => {
                    const titleTrans = notif.id === '1' 
                      ? notif.title 
                      : (isEn ? 'System Tip' : notif.title);
                    const descTrans = notif.id === '1'
                      ? (isEn ? 'Latest Kernel and ChromeOS Flex version simulated.' : notif.desc)
                      : (isEn ? 'Double click an icon to launch an app.' : notif.desc);
                    const timeTrans = notif.id === '1'
                      ? (isEn ? 'now' : notif.time)
                      : (isEn ? '12m ago' : notif.time);

                    return (
                      <div 
                        key={notif.id}
                        className="p-2 bg-white/5 border border-white/5 rounded-xl flex flex-col gap-0.5 relative group hover:bg-white/10 transition-colors"
                      >
                        <button 
                          onClick={(e) => {
                            e.stopPropagation();
                            setNotifications(p => p.filter(n => n.id !== notif.id));
                          }}
                          className="absolute right-2 top-2 text-zinc-500 hover:text-white opacity-0 group-hover:opacity-100 transition-opacity text-[10px]"
                          title={isEn ? "Remove" : "Remover"}
                        >
                          ✕
                        </button>
                        <div className="flex justify-between items-center pr-3">
                          <span className="font-bold text-[11px] text-zinc-200 truncate font-sans">{titleTrans}</span>
                          <span className="text-[9px] text-zinc-500 shrink-0 font-sans">{timeTrans}</span>
                        </div>
                        <p className="text-[10px] text-zinc-400 leading-relaxed font-sans pr-2">
                          {descTrans}
                        </p>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>

            {/* CARD 2: CALENDAR */}
            <div className="bg-[#1e1f22]/95 border border-white/10 rounded-2xl p-4 shadow-2xl backdrop-blur-md">
              {/* Header: Month and scrolling chevrons */}
              <div className="flex items-center justify-between mb-4">
                <span className="text-sm font-semibold tracking-wide text-zinc-100 font-sans capitalize">
                  {calendarViewDate.toLocaleString('pt-BR', { month: 'long', year: 'numeric' })}
                </span>
                <div className="flex items-center gap-3">
                  <span 
                    onClick={() => setCalendarViewDate(new Date())}
                    className="w-6 h-6 rounded-lg bg-white/5 flex items-center justify-center text-zinc-300 hover:text-white cursor-pointer hover:bg-white/10 text-xs"
                    title="Hoje"
                  >
                    📅
                  </span>
                  <div className="flex items-center gap-1.5">
                    <button 
                      onClick={() => setCalendarViewDate(new Date(calendarViewDate.getFullYear(), calendarViewDate.getMonth() - 1, 1))}
                      className="p-1 rounded-full hover:bg-white/5 text-zinc-400 hover:text-white transition-colors cursor-pointer" 
                      title="Mês anterior"
                    >
                      <ChevronUp size={16} />
                    </button>
                    <button 
                      onClick={() => setCalendarViewDate(new Date(calendarViewDate.getFullYear(), calendarViewDate.getMonth() + 1, 1))}
                      className="p-1 rounded-full hover:bg-white/5 text-zinc-400 hover:text-white transition-colors cursor-pointer" 
                      title="Próximo mês"
                    >
                      <ChevronDown size={16} />
                    </button>
                  </div>
                </div>
              </div>

              {/* Days header: D S T Q Q S S */}
              <div className="grid grid-cols-7 gap-y-2 mb-2 text-center text-[10px] font-bold text-zinc-400 tracking-wider">
                {['D', 'S', 'T', 'Q', 'Q', 'S', 'S'].map((day, i) => (
                  <div key={i} className="h-6 flex items-center justify-center font-sans">{day}</div>
                ))}
              </div>

              {/* Calendar Grid: Dynamic calculations */}
              <div className="grid grid-cols-7 gap-y-2.5 text-center text-xs">
                {(() => {
                  const year = calendarViewDate.getFullYear();
                  const month = calendarViewDate.getMonth();
                  const firstDay = new Date(year, month, 1);
                  const startDayOfWeek = firstDay.getDay(); // 0 = Sunday
                  const totalDays = new Date(year, month + 1, 0).getDate();
                  const totalDaysPrev = new Date(year, month, 0).getDate();
                  
                  const cells: { num: number; isCurrentMonth: boolean; isCurrentDay: boolean }[] = [];
                  
                  // Previous month padding
                  for (let i = startDayOfWeek - 1; i >= 0; i--) {
                    cells.push({
                      num: totalDaysPrev - i,
                      isCurrentMonth: false,
                      isCurrentDay: false
                    });
                  }
                  
                  // Current month days
                  const today = new Date();
                  for (let d = 1; d <= totalDays; d++) {
                    const isToday = today.getDate() === d && today.getMonth() === month && today.getFullYear() === year;
                    cells.push({
                      num: d,
                      isCurrentMonth: true,
                      isCurrentDay: isToday
                    });
                  }
                  
                  // Next month padding to complete 42 cells (6 rows)
                  let nextMonthDay = 1;
                  while (cells.length < 42) {
                    cells.push({
                      num: nextMonthDay++,
                      isCurrentMonth: false,
                      isCurrentDay: false
                    });
                  }
                  
                  return cells.map((d, index) => (
                    <div key={index} className="flex justify-center items-center">
                      <button 
                        type="button"
                        className={`w-7 h-7 rounded-full flex items-center justify-center font-sans font-medium hover:bg-white/10 active:scale-95 transition-all text-[11px] cursor-pointer ${
                          d.isCurrentDay 
                            ? 'bg-blue-600 text-white font-bold shadow-lg shadow-blue-500/25 ring-2 ring-blue-500/55' 
                            : d.isCurrentMonth
                              ? 'text-zinc-100'
                              : 'text-zinc-600 opacity-30 font-light'
                        }`}
                      >
                        {d.num}
                      </button>
                    </div>
                  ));
                })()}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* SIMULATION WARNING NOTIFICATION (CHROME OS THEME) */}
      <AnimatePresence>
        {showSimNotice && (
          <motion.div 
            className="absolute bottom-[58px] right-[10px] z-[45] w-[340px] bg-[#1e1f22]/95 border border-white/10 rounded-2xl shadow-2xl p-4 flex flex-col gap-3 text-zinc-100 select-none font-sans"
            style={{ backdropFilter: 'blur(20px)' }}
            initial={{ x: 100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: 100, opacity: 0 }}
            transition={{ type: "spring", stiffness: 120, damping: 16 }}
          >
            {/* Header row */}
            <div className="flex items-center justify-between text-[11px] font-bold text-zinc-400">
              <div className="flex items-center gap-2">
                <Shield size={12} className="text-[#1a73e8]" />
                <span className="uppercase tracking-widest text-[9px]">
                  {isEn ? 'System Advisory' : 'Aviso do Sistema'}
                </span>
              </div>
              <button 
                onClick={() => setShowSimNotice(false)}
                className="hover:bg-white/10 p-1 rounded-full transition-colors text-zinc-400 hover:text-white"
              >
                <X size={13} />
              </button>
            </div>

            {/* Body row */}
            <div className="flex gap-3.5 items-start mt-0.5">
              <div className="bg-blue-600/10 p-2.5 rounded-full flex-shrink-0 flex items-center justify-center border border-blue-500/20">
                <img 
                  src="/assets/google-icon-logo-svgrepo-com.svg" 
                  className="w-5 h-5 pointer-events-none select-none" 
                  alt="ChromeOS Logo Logo" 
                />
              </div>
              <div className="flex-1 min-w-0">
                <h4 className="font-bold text-xs text-white leading-normal">
                  {isEn ? 'ChromeOS Flex Simulator' : 'Simulador ChromeOS Flex'}
                </h4>
                <p className="text-[11px] text-zinc-300 mt-1 leading-relaxed">
                  {isEn 
                    ? 'This is only an interactive web simulation so you can experience and interact with it before downloading the real distribution completely for free and safely.'
                    : 'Esta é apenas uma simulação para que você possa experimentar e interagir antes de baixar a distribuição real de forma totalmente gratuita e segura.'}
                </p>
              </div>
            </div>

            {/* Bottom Actions Row */}
            <div className="flex justify-end gap-2 mt-1">
              <button 
                onClick={() => {
                  setShowSimNotice(false);
                }}
                className="bg-[#1a73e8] hover:bg-[#1557b0] text-white text-[10px] font-bold px-4 py-1.5 rounded-full transition-all active:scale-95 shadow-md font-sans leading-none"
              >
                {isEn ? 'Got it!' : 'Certo, entendi!'}
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* CORE BOTTOM TASKBAR / SHELF */}
      <div 
        className="absolute bottom-0 left-0 right-0 h-[48px] z-50 bg-[#1c1d21]/90 shadow-2xl flex items-center justify-between px-3 select-none border-t border-white/5"
        onClick={(e) => {
          // Prevent desktop interaction
          e.stopPropagation();
        }}
      >
        {/* Left Double-Circle Launcher Button */}
        <div className="flex items-center">
          <button 
            onClick={() => setLauncherOpen(!launcherOpen)}
            className="w-9 h-9 rounded-full bg-white/10 hover:bg-white/15 flex items-center justify-center active:scale-90 transition-all focus:outline-none"
            title="Google Launcher"
          >
            <img 
              src="/assets/google-icon-logo-svgrepo-com.svg" 
              className="w-5 h-5 brightness-0 invert pointer-events-none select-none" 
              alt="Google Chrome OS Launcher" 
            />
          </button>
        </div>

        {/* Middle Centralized Docked Shelf Apps */}
        <div className="flex items-center gap-1.5 shrink-0 max-w-[75%] md:max-w-[85%] overflow-x-auto h-full no-scrollbar">
          {['gemini', 'chrome', 'files', 'notebooklm', 'gmail', 'youtube', 'calendar', 'meet', 'keep', 'settings'].map((id) => {
            const isWindowOpen = openWindows.some(w => w.id === id);
            const isWindowActive = activeWindowId === id;
            const logo = masterApps.find(a => a.id === id)?.logo;
            return (
              <button 
                key={id}
                onClick={() => launchApp(id)}
                className={`w-[40px] h-9 rounded-lg flex flex-col items-center justify-center relative hover:bg-white/5 active:scale-90 transition-all ${
                  isWindowActive ? 'bg-white/10 border-b-2 border-blue-500' : ''
                }`}
              >
                <div className="w-[28px] h-[28px] flex items-center justify-center">
                  {logo}
                </div>
                {isWindowOpen && !isWindowActive && (
                  <div className="absolute bottom-[2px] w-1 h-1 rounded-full bg-white/60 animate-bounce" />
                )}
              </button>
            );
          })}
        </div>

        {/* Right Status Tray (Battery, Wi-Fi, time) */}
        <div className="flex items-center">
          <div 
            className="h-9 rounded-full font-sans text-xs flex items-center p-0.5 border border-white/5 bg-white/10 text-white"
          >
            {/* Icons Button (Quick Settings Trigger) */}
            <button 
              onClick={(e) => {
                e.stopPropagation();
                setQuickSettingsOpen(!quickSettingsOpen);
                setCalendarOpen(false); // Close calendar
              }}
              className={`h-full rounded-l-full flex items-center gap-1.5 px-3 transition-all hover:bg-white/10 active:scale-95 cursor-pointer ${
                quickSettingsOpen ? 'bg-[#8ab4f8] text-[#202124] hover:bg-[#a9c7fa] rounded-full' : ''
              }`}
              title="Configurações rápidas"
            >
              <div className="flex items-center gap-1.5">
                {wifiEnabled ? (
                  <Wifi size={13} className={quickSettingsOpen ? 'text-[#202124]' : 'text-zinc-300'} />
                ) : (
                  <VolumeX size={13} className={quickSettingsOpen ? 'text-[#202124]' : 'text-zinc-350'} />
                )}
                <Volume2 size={13} className={quickSettingsOpen ? 'text-[#202124]' : 'text-zinc-300'} />
                <Battery size={13} className={quickSettingsOpen ? 'text-[#202124]' : 'text-zinc-300'} />
              </div>
            </button>

            {/* Separator line */}
            <div className="w-px h-3.5 shrink-0 bg-white/15" />

            {/* Clock Button (Calendar and Tasks Trigger) */}
            <button 
              onClick={(e) => {
                e.stopPropagation();
                setCalendarOpen(!calendarOpen);
                setQuickSettingsOpen(false); // Close quick settings
              }}
              className={`h-full rounded-r-full flex items-center px-3.5 transition-all hover:bg-white/10 active:scale-95 cursor-pointer ${
                calendarOpen ? 'bg-[#8ab4f8] text-[#202124] hover:bg-[#a9c7fa] rounded-full' : ''
              }`}
              title="Calendário e Tarefas"
            >
              <span className={`font-semibold tracking-tighter uppercase ${calendarOpen ? 'text-[#202124]' : 'text-zinc-100'}`}>
                {currentTime}
              </span>
            </button>
          </div>
        </div>
      </div>

    </div>
  );
};
