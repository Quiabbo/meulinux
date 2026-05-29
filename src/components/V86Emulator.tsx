import React, { useEffect, useRef, useState } from 'react';
import { Play, Square, RotateCcw, Maximize, Keyboard, KeyboardOff, AlertCircle, Loader2, ChevronDown, ChevronUp } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { useTranslation } from 'react-i18next';

interface V86EmulatorProps {
  isoUrl: string;
  onClose: () => void;
}

declare global {
  interface Window {
    V86Starter: any;
  }
}

export const V86Emulator: React.FC<V86EmulatorProps> = ({ isoUrl, onClose }) => {
  const { i18n } = useTranslation();
  const isEn = i18n.language?.toLowerCase().startsWith('en');

  const containerRef = useRef<HTMLDivElement>(null);
  const screenRef = useRef<HTMLDivElement>(null);
  const emulatorRef = useRef<any>(null);
  
  const [status, setStatus] = useState<'ready' | 'downloading' | 'initializing' | 'running' | 'error'>('ready');
  const [progress, setProgress] = useState(0);
  const [error, setError] = useState<string | null>(null);
  const [isKeyboardCaptured, setIsKeyboardCaptured] = useState(false);
  const [showTechDetails, setShowTechDetails] = useState(false);
  const [logs, setLogs] = useState<string[]>([]);
  const [memorySize, setMemorySize] = useState(512 * 1024 * 1024); // 512MB

  const addLog = (msg: string) => {
    setLogs(prev => [...prev.slice(-19), `${new Date().toLocaleTimeString()}: ${msg}`]);
  };

  const loadV86Script = () => {
    return new Promise<void>((resolve, reject) => {
      if (window.V86Starter || (window as any).V86) {
        resolve();
        return;
      }
      const script = document.createElement('script');
      script.src = 'https://meulinux.com/assets/v86/libv86.js';
      script.async = true;
      script.crossOrigin = 'anonymous';
      script.onload = () => {
        addLog(isEn ? 'Script libv86.js loaded successfully.' : 'Script libv86.js carregado com sucesso.');
        if (window.V86Starter || (window as any).V86) {
          resolve();
        } else {
          reject(new Error(isEn ? 'V86Starter or V86 not found after loading script.' : 'V86Starter ou V86 não encontrados após carregar o script.'));
        }
      };
      script.onerror = () => reject(new Error(isEn ? 'Failed to load emulator script.' : 'Falha ao carregar o script do emulador em https://meulinux.com/assets/v86/libv86.js.'));
      document.head.appendChild(script);
    });
  };

  const startEmulator = async () => {
    try {
      setError(null);
      setStatus('downloading');
      addLog(isEn ? 'Starting emulator...' : 'Iniciando emulador...');

      // 1. Load Script
      await loadV86Script();

      // 2. Initialize Emulator
      setStatus('initializing');
      addLog(isEn ? 'Configuring v86...' : 'Configurando v86...');

      const settings = {
        wasm_path: 'https://meulinux.com/assets/v86/v86.wasm',
        bios: { url: 'https://cdn.jsdelivr.net/gh/copy/v86@master/bios/seabios.bin' },
        vga_bios: { url: 'https://cdn.jsdelivr.net/gh/copy/v86@master/bios/vgabios.bin' },
        cdrom: { url: isoUrl, async: true },
        screen_container: screenRef.current,
        memory_size: 128 * 1024 * 1024,
        vga_memory_size: 8 * 1024 * 1024,
        boot_order: 0x2,
        autostart: true,
      };

      // Detect constructor
      const V86Constructor = window.V86Starter || (window as any).V86;
      if (!V86Constructor) {
        throw new Error(isEn ? 'V86 constructor not found.' : 'Construtor v86 não encontrado.');
      }

      emulatorRef.current = new V86Constructor(settings);
      
      const addListener = (event: string, callback: (...args: any[]) => void) => {
        if (emulatorRef.current.add_listener) {
          emulatorRef.current.add_listener(event, callback);
        } else if (emulatorRef.current.on) {
          emulatorRef.current.on(event, callback);
        } else {
          addLog(isEn ? `Warning: Listener method not found for event ${event}` : `Aviso: Método de listener não encontrado para o evento ${event}`);
        }
      };

      addListener('download-progress', (e: any) => {
        if (e && e.loaded && e.total) {
          const pct = Math.round((e.loaded / e.total) * 100);
          setProgress(pct);
          setStatus('downloading');
        }
      });

      addListener('emulator-ready', () => {
        setStatus('running');
        addLog(isEn ? 'Emulator ready and running.' : 'Emulador pronto e rodando.');
      });

      addListener('emulator-stopped', () => {
        setStatus('ready');
        addLog(isEn ? 'Emulator stopped by system.' : 'Emulador parado pelo sistema.');
      });

      addListener('download-error', (e: any) => {
        addLog(`Download error: ${e}`);
        setError(isEn ? `Error downloading emulator files. Check your connection.` : `Erro ao carregar os arquivos do emulador. Verifique sua conexão.`);
        setStatus('error');
      });

    } catch (err: any) {
      console.error(err);
      setError(err.message || (isEn ? 'An unexpected error occurred during initialization.' : 'Ocorreu um erro inesperado na inicialização.'));
      setStatus('error');
      addLog(`ERR: ${err.message}`);
    }
  };

  const stopEmulator = () => {
    if (emulatorRef.current) {
      emulatorRef.current.destroy();
      emulatorRef.current = null;
    }
    setStatus('ready');
    setProgress(0);
    setIsKeyboardCaptured(false);
    addLog(isEn ? 'Emulator stopped.' : 'Emulador parado.');
  };

  const restartEmulator = () => {
    stopEmulator();
    startEmulator();
  };

  const toggleFullscreen = () => {
    if (containerRef.current?.requestFullscreen) {
      containerRef.current.requestFullscreen();
    }
  };

  const captureKeyboard = () => {
    if (emulatorRef.current) {
      emulatorRef.current.keyboard_set_status(true);
      setIsKeyboardCaptured(true);
      addLog(isEn ? 'Keyboard captured.' : 'Teclado capturado.');
    }
  };

  const releaseKeyboard = () => {
    if (emulatorRef.current) {
      emulatorRef.current.keyboard_set_status(false);
      setIsKeyboardCaptured(false);
      addLog(isEn ? 'Keyboard released.' : 'Teclado solto.');
    }
  };

  useEffect(() => {
    startEmulator();
    return () => {
      stopEmulator();
    };
  }, []);

  return (
    <motion.div 
      initial={{ opacity: 0, height: 0 }}
      animate={{ opacity: 1, height: 'auto' }}
      exit={{ opacity: 0, height: 0 }}
      className="bg-gray-900 rounded-3xl overflow-hidden shadow-2xl border border-white/10 my-8"
      ref={containerRef}
    >
      <div className="p-6 border-b border-white/10 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h3 className="text-xl font-bold text-white flex items-center gap-2">
            Linux TinyCore
          </h3>
          <p className="text-sm text-gray-400">
            {isEn 
              ? 'Demonstrative environment with historical graphical UI. First load can take a moment.' 
              : 'Ambiente demonstrativo com interface gráfica. Primeiro carregamento pode demorar.'}
          </p>
        </div>
        
        <div className="flex flex-wrap gap-2">
          {status === 'running' ? (
            <>
              <button 
                onClick={stopEmulator}
                className="bg-red-500/20 text-red-400 hover:bg-red-500/30 px-4 py-2 rounded-lg text-sm font-bold flex items-center gap-2 transition-all"
                aria-label={isEn ? 'Stop emulator' : 'Parar emulador'}
              >
                <Square size={16} /> {isEn ? 'Stop' : 'Parar'}
              </button>
              <button 
                onClick={restartEmulator}
                className="bg-white/10 text-white hover:bg-white/20 px-4 py-2 rounded-lg text-sm font-bold flex items-center gap-2 transition-all"
                aria-label={isEn ? 'Restart emulator' : 'Reiniciar emulador'}
              >
                <RotateCcw size={16} /> {isEn ? 'Restart' : 'Reiniciar'}
              </button>
            </>
          ) : status === 'error' ? (
            <button 
              onClick={startEmulator}
              className="bg-primary text-white hover:bg-primary/90 px-4 py-2 rounded-lg text-sm font-bold flex items-center gap-2 transition-all"
            >
              <RotateCcw size={16} /> {isEn ? 'Try again' : 'Tentar novamente'}
            </button>
          ) : null}
          
          <button 
            onClick={toggleFullscreen}
            className="bg-white/10 text-white hover:bg-white/20 px-4 py-2 rounded-lg text-sm font-bold flex items-center gap-2 transition-all"
            aria-label={isEn ? 'Fullscreen' : 'Tela cheia'}
          >
            <Maximize size={16} /> {isEn ? 'Fullscreen' : 'Tela cheia'}
          </button>
          
          <button 
            onClick={onClose}
            className="bg-white/10 text-white hover:bg-white/20 px-4 py-2 rounded-lg text-sm font-bold transition-all"
            aria-label={isEn ? 'Close panel' : 'Fechar painel'}
          >
            {isEn ? 'Close' : 'Fechar'}
          </button>
        </div>
      </div>

      <div className="relative bg-black min-h-[400px] md:min-h-[650px] flex items-center justify-center overflow-hidden">
        {/* Emulator Screen */}
        <div 
          ref={screenRef} 
          className={`w-full h-full flex items-center justify-center ${status === 'running' ? 'opacity-100' : 'opacity-0'}`}
          style={{ whiteSpace: 'pre', font: '14px monospace', lineHeight: '14px' }}
        />

        {/* Status Overlays */}
        <AnimatePresence>
          {(status === 'downloading' || status === 'initializing') && (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 flex flex-col items-center justify-center bg-black/80 z-10 p-8 text-center"
            >
              <Loader2 className="text-primary animate-spin mb-4" size={48} />
              <h4 className="text-xl font-bold text-white mb-2">
                {status === 'downloading' 
                  ? (isEn ? `Downloading ISO... ${progress}%` : `Baixando ISO... ${progress}%`)
                  : (isEn ? 'Initializing system...' : 'Inicializando sistema...')}
              </h4>
              <div className="w-full max-w-md bg-white/10 h-2 rounded-full overflow-hidden mb-4">
                <motion.div 
                  className="bg-primary h-full"
                  initial={{ width: 0 }}
                  animate={{ width: `${progress}%` }}
                />
              </div>
              <p className="text-gray-400 text-sm">
                {isEn 
                  ? 'TinyCore Linux is being loaded directly into your browser\'s RAM memory.' 
                  : 'O TinyCore Linux está sendo carregado diretamente na memória do seu navegador.'}
              </p>
            </motion.div>
          )}

          {status === 'error' && (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 flex flex-col items-center justify-center bg-black/90 z-20 p-8 text-center"
            >
              <AlertCircle className="text-red-500 mb-4" size={48} />
              <h4 className="text-xl font-bold text-white mb-2">{isEn ? 'Error starting emulator' : 'Erro ao iniciar emulador'}</h4>
              <div className="bg-red-500/10 border border-red-500/20 p-4 rounded-xl max-w-md mb-6">
                <p className="text-red-400 text-sm mb-2"><strong>URL:</strong> {isoUrl}</p>
                <p className="text-red-400 text-sm"><strong>{isEn ? 'Message:' : 'Mensagem:'}</strong> {error}</p>
              </div>
              <p className="text-gray-500 text-xs mb-4">
                {isEn 
                  ? 'See the "Technical details" accordion below for network logs and diagnostics.' 
                  : 'Veja o accordion "Detalhes técnicos" abaixo para logs de rede e diagnóstico.'}
              </p>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Mobile Warning */}
        <div className="absolute bottom-4 left-4 right-4 md:hidden bg-yellow-500/20 border border-yellow-500/50 p-2 rounded text-[10px] text-yellow-200 text-center z-30">
          {isEn
            ? 'Best experienced in landscape or desktop mode. Can be slow on mobile.'
            : 'Melhor experiência em modo paisagem ou desktop. Pode ser lento em celulares.'}
        </div>
      </div>

      <div className="p-4 bg-gray-800 flex flex-wrap items-center justify-between gap-4">
        <div className="flex gap-2">
          {!isKeyboardCaptured ? (
            <button 
              onClick={captureKeyboard}
              disabled={status !== 'running'}
              className="bg-primary text-white disabled:opacity-50 px-4 py-2 rounded-lg text-sm font-bold flex items-center gap-2 transition-all"
              aria-label={isEn ? 'Capture keyboard' : 'Capturar teclado'}
            >
              <Keyboard size={16} /> {isEn ? 'Capture keyboard' : 'Capturar teclado'}
            </button>
          ) : (
            <button 
              onClick={releaseKeyboard}
              className="bg-yellow-500 text-black px-4 py-2 rounded-lg text-sm font-bold flex items-center gap-2 transition-all animate-pulse"
              aria-label={isEn ? 'Release keyboard' : 'Soltar teclado'}
            >
              <KeyboardOff size={16} /> {isEn ? 'Release keyboard (ESC)' : 'Soltar teclado (ESC)'}
            </button>
          )}
        </div>

        <div className="flex items-center gap-4 text-xs text-gray-400">
          <span className="flex items-center gap-1">
            <div className={`w-2 h-2 rounded-full ${status === 'running' ? 'bg-green-500 shadow-[0_0_8px_rgba(34,197,94,0.6)]' : 'bg-gray-500'}`} />
            {isEn ? 'Status: ' : 'Status: '}{status === 'ready' ? (isEn ? 'Ready' : 'Pronto') : status === 'downloading' ? (isEn ? 'Downloading...' : 'Baixando...') : status === 'initializing' ? (isEn ? 'Initializing...' : 'Iniciando...') : status === 'running' ? (isEn ? 'Running' : 'Rodando') : (isEn ? 'Error' : 'Erro')}
          </span>
          <span className="hidden sm:inline">
            {isEn 
              ? 'Does not save changes on page reload.' 
              : 'Não salva alterações ao recarregar.'}
          </span>
        </div>
      </div>

      {/* Tech Details Accordion */}
      <div className="border-t border-white/10">
        <button 
          onClick={() => setShowTechDetails(!showTechDetails)}
          className="w-full p-4 flex items-center justify-between text-xs text-gray-500 hover:bg-white/5 transition-colors"
        >
          <span>{isEn ? 'Technical details and logs' : 'Detalhes técnicos e logs'}</span>
          {showTechDetails ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
        </button>
        
        <AnimatePresence>
          {showTechDetails && (
            <motion.div 
              initial={{ height: 0 }}
              animate={{ height: 'auto' }}
              exit={{ height: 0 }}
              className="overflow-hidden bg-black/50"
            >
              <div className="p-4 font-mono text-[10px] text-gray-400 max-h-40 overflow-y-auto">
                {logs.map((log, i) => (
                  <div key={i} className="mb-1">{log}</div>
                ))}
                {logs.length === 0 && <div>{isEn ? 'No logs available.' : 'Nenhum log disponível.'}</div>}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
};
