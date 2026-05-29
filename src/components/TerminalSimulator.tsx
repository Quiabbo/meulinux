import React, { useState, useEffect, useRef } from 'react';
import { Terminal as TerminalIcon, ChevronRight, Info } from 'lucide-react';

interface TerminalSimulatorProps {
  prompt: string;
  expectedCommands: string[];
  hint: string;
  onSuccess: () => void;
}

export const TerminalSimulator: React.FC<TerminalSimulatorProps> = ({ 
  prompt, 
  expectedCommands, 
  hint, 
  onSuccess 
}) => {
  const [input, setInput] = useState('');
  const [history, setHistory] = useState<{ type: 'input' | 'output' | 'error' | 'hint', text: string }[]>([]);
  const [isSuccess, setIsSuccess] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [history]);

  const handleCommand = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isSuccess) return;

    const newHistory = [...history, { type: 'input' as const, text: `${prompt} ${input}` }];
    
    if (expectedCommands.includes(input.trim())) {
      newHistory.push({ type: 'output' as const, text: 'Command executed successfully.' });
      setIsSuccess(true);
      onSuccess();
    } else {
      newHistory.push({ type: 'error' as const, text: `bash: ${input.split(' ')[0]}: command not found or incorrect usage.` });
      newHistory.push({ type: 'hint' as const, text: `💡 Hint: ${hint}` });
    }

    setHistory(newHistory);
    setInput('');
  };

  return (
    <div className="bg-[#0D0D0D] rounded-lg border border-white/10 overflow-hidden font-mono text-sm shadow-2xl">
      {/* Terminal Header */}
      <div className="bg-[#1A1A1A] px-4 py-2 flex items-center justify-between border-bottom border-white/5">
        <div className="flex items-center gap-2">
          <TerminalIcon size={16} className="text-primary" />
          <span className="text-gray-400 text-xs">Linux Terminal Simulator</span>
        </div>
        <div className="flex gap-1.5">
          <div className="w-3 h-3 rounded-full bg-[#FF5F56]"></div>
          <div className="w-3 h-3 rounded-full bg-[#FFBD2E]"></div>
          <div className="w-3 h-3 rounded-full bg-[#27C93F]"></div>
        </div>
      </div>

      {/* Terminal Body */}
      <div 
        ref={scrollRef}
        className="p-4 h-64 overflow-y-auto custom-scrollbar flex flex-col gap-1"
      >
        <div className="text-gray-500 mb-2">Welcome to LinuxCorp Terminal v1.0.4</div>
        
        {history.map((item, index) => (
          <div key={index} className={`
            ${item.type === 'input' ? 'text-white' : ''}
            ${item.type === 'output' ? 'text-green-400' : ''}
            ${item.type === 'error' ? 'text-red-400' : ''}
            ${item.type === 'hint' ? 'text-yellow-400 italic flex items-center gap-2' : ''}
          `}>
            {item.type === 'hint' && <Info size={14} />}
            {item.text}
          </div>
        ))}

        {!isSuccess && (
          <form onSubmit={handleCommand} className="flex items-center gap-2">
            <span className="text-primary font-bold">{prompt}</span>
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              className="bg-transparent border-none outline-none flex-grow text-white"
              autoFocus
              spellCheck={false}
              autoComplete="off"
            />
          </form>
        )}

        {isSuccess && (
          <div className="text-green-400 font-bold mt-2 flex items-center gap-2">
            <ChevronRight size={16} />
            Challenge Complete!
          </div>
        )}
      </div>
    </div>
  );
};
