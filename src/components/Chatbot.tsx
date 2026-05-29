import React, { useState, useEffect, useRef } from 'react';
import { MessageSquare, X, Send, Bot } from 'lucide-react';
import { GoogleGenAI } from '@google/genai';
import { DISTROS } from '../constants';
import { motion, AnimatePresence } from 'motion/react';
import { useLanguage } from '../contexts/LanguageContext';

const chatbotTranslations = {
  'pt-BR': {
    welcome: 'Olá! Sou o assistente do meuLinux. Como posso te ajudar a encontrar a distro Linux ideal?',
    greeting_response: 'Olá! Como posso te ajudar hoje com o Linux?',
    recommendation_response: 'Para iniciantes, recomendo o **Linux Mint** ou **Ubuntu**. Se quiser algo mais específico, use nossa ferramenta **Distro Match**! Sabia que você pode testar o Ubuntu, Linux Mint, Chrome OS Flex e TinyCore de forma 100% interativa direto no seu navegador com os nossos simuladores de alta fidelidade antes de baixá-los?',
    error_response: 'Desculpe, tive um problema ao processar sua pergunta.',
    general_error: 'Ops! Ocorreu um erro. Tente novamente mais tarde.',
    support_title: 'Suporte meuLinux',
    typing: 'Digitando...',
    placeholder: 'Sua pergunta...',
    system_instruction: `Você é o assistente virtual do site meuLinux.com.br. 
          Seu objetivo é ajudar usuários a escolherem ou aprenderem sobre distribuições Linux.
          Você tem acesso aos seguintes dados de distros: {distros}.
          Informe aos usuários que eles podem testar as distribuições Linux diretamente no navegador antes de baixá-las! Temos simuladores interativos de altíssima fidelidade perfeitos para experimentar o sistema operacional e tirar dúvidas antes do download.
          Atualmente oferecemos simuladores online para:
          - Ubuntu (/simulador/ubuntu)
          - Linux Mint (/simulador/mint)
          - TinyCore Linux (/simulador/tinycore)
          - Chrome OS Flex (/simulador/chromeos)
          Recomende ativamente usá-los se o usuário estiver em dúvida ou quiser experimentar as distros!
          Responda de forma amigável, técnica mas acessível. 
          Se não souber algo, recomende que o usuário use a ferramenta Distro Match no site.
          Use Markdown para formatar suas respostas.
          Responda no idioma: Português.`
  }
};

export const Chatbot = () => {
  const { lang } = useLanguage();
  const t = chatbotTranslations['pt-BR'];
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<{ role: 'user' | 'bot'; text: string }[]>([
    { role: 'bot', text: t.welcome }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Update initial message if language changes and it's the only message
    if (messages.length === 1 && messages[0].role === 'bot') {
      setMessages([{ role: 'bot', text: t.welcome }]);
    }
  }, [lang, t.welcome]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userText = input;
    setInput('');
    setMessages(prev => [...prev, { role: 'user', text: userText }]);
    setIsLoading(true);

    try {
      // Basic local responses for common questions
      const lowerText = userText.toLowerCase();
      const greetings = {
        'pt-BR': ['olá', 'oi', 'bom dia']
      };
      
      const recommendations = {
        'pt-BR': ['qual distro', 'recomenda', 'melhor distro']
      };

      if (greetings['pt-BR'].some(g => lowerText.includes(g))) {
        setMessages(prev => [...prev, { role: 'bot', text: t.greeting_response }]);
        setIsLoading(false);
        return;
      }

      if (recommendations['pt-BR'].some(r => lowerText.includes(r))) {
        setMessages(prev => [...prev, { role: 'bot', text: t.recommendation_response }]);
        setIsLoading(false);
        return;
      }

      const apiKey = import.meta.env.VITE_GEMINI_API_KEY || '';
      const ai = new GoogleGenAI({ apiKey });
      const response = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: [{ role: 'user', parts: [{ text: userText }] }],
        config: {
          systemInstruction: t.system_instruction.replace('{distros}', JSON.stringify(DISTROS)),
        }
      });

      const botText = response.text || t.error_response;
      setMessages(prev => [...prev, { role: 'bot', text: botText }]);
    } catch (error) {
      console.error('Chatbot error:', error);
      setMessages(prev => [...prev, { role: 'bot', text: t.general_error }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            className="bg-white w-80 md:w-96 h-[500px] rounded-2xl shadow-2xl flex flex-col overflow-hidden mb-4 border border-gray-100"
          >
            {/* Header */}
            <div className="bg-dark text-white p-4 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Bot className="text-primary" />
                <span className="font-bold">{t.support_title}</span>
              </div>
              <button onClick={() => setIsOpen(false)} className="hover:text-primary transition-colors">
                <X size={20} />
              </button>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {messages.map((msg, i) => (
                <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`max-w-[80%] p-3 rounded-2xl text-sm ${
                    msg.role === 'user' 
                      ? 'bg-primary text-white rounded-tr-none' 
                      : 'bg-gray-100 text-dark rounded-tl-none'
                  }`}>
                    {msg.text}
                  </div>
                </div>
              ))}
              {isLoading && (
                <div className="flex justify-start">
                  <div className="bg-gray-100 p-3 rounded-2xl rounded-tl-none animate-pulse">
                    {t.typing}
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <div className="p-4 border-t">
              <div className="flex gap-2">
                <input
                  type="text"
                  placeholder={t.placeholder}
                  className="flex-1 bg-gray-50 border border-gray-200 rounded-[6px] px-4 py-2 text-sm focus:outline-none focus:border-primary"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                />
                <button 
                  onClick={handleSend}
                  disabled={isLoading}
                  className="bg-primary text-white p-2 rounded-[6px] hover:bg-primary/90 transition-colors disabled:opacity-50"
                >
                  <Send size={18} />
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <button
        onClick={() => setIsOpen(!isOpen)}
        className="bg-primary text-white p-4 rounded-[6px] shadow-lg hover:scale-110 transition-transform flex items-center justify-center"
      >
        <MessageSquare />
      </button>
    </div>
  );
};
