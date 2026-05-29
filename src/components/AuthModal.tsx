import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Mail, Lock, User, ArrowRight, X } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: (user: any) => void;
}

export const AuthModal = ({ isOpen, onClose, onSuccess }: AuthModalProps) => {
  const { signInMock } = useAuth();
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    setLoading(true);

    if (isLogin) {
      try {
        signInMock(formData.email);
        setSuccess('Login realizado com sucesso!');
        setTimeout(() => {
          onSuccess({ email: formData.email });
          onClose();
        }, 1000);
      } catch (err: any) {
        setError(err.message || 'Email ou senha incorretos.');
      } finally {
        setLoading(false);
      }
    } else {
      // Registration
      if (formData.password !== formData.confirmPassword) {
        setError('As senhas não coincidem.');
        setLoading(false);
        return;
      }
      if (formData.password.length < 6) {
        setError('A senha deve ter pelo menos 6 caracteres.');
        setLoading(false);
        return;
      }

      try {
        signInMock(formData.email, formData.fullName);
        setSuccess('Conta criada com sucesso!');
        setTimeout(() => {
          onSuccess({ email: formData.email });
          onClose();
        }, 1000);
      } catch (err: any) {
        setError(err.message || 'Erro ao criar conta.');
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/80 backdrop-blur-sm"
          />
          
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="relative w-full max-w-md bg-[#1A1A1A] border border-white/10 rounded-3xl p-8 shadow-2xl overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={onClose}
              className="absolute top-6 right-6 text-gray-400 hover:text-white transition-colors"
            >
              <X size={24} />
            </button>

            <div className="text-center mb-8">
              <h2 className="text-2xl font-display font-bold mb-2">
                {isLogin ? 'Bem-vindo de volta' : 'Crie sua conta'}
              </h2>
              <p className="text-sm text-gray-400">
                {isLogin 
                  ? 'Acesse conteúdos exclusivos.' 
                  : 'Junte-se à nossa comunidade.'}
              </p>
            </div>

            <div className="flex border-b border-white/5 mb-8">
              <button
                onClick={() => { setIsLogin(true); setError(''); setSuccess(''); }}
                className={`flex-1 pb-4 font-bold text-sm transition-all ${isLogin ? 'text-primary border-b-2 border-primary' : 'text-gray-500'}`}
              >
                Entrar
              </button>
              <button
                onClick={() => { setIsLogin(false); setError(''); setSuccess(''); }}
                className={`flex-1 pb-4 font-bold text-sm transition-all ${!isLogin ? 'text-primary border-b-2 border-primary' : 'text-gray-500'}`}
              >
                Criar Conta
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              {error && <p className="text-red-500 text-xs font-bold bg-red-500/10 p-3 rounded-lg border border-red-500/20">{error}</p>}
              {success && <p className="text-green-500 text-xs font-bold bg-green-500/10 p-3 rounded-lg border border-green-500/20">{success}</p>}

              {!isLogin && (
                <div className="space-y-1">
                  <label className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Seu nome</label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" size={16} />
                    <input
                      type="text"
                      required
                      placeholder="Seu nome"
                      value={formData.fullName}
                      onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                      className="w-full bg-[#0D0D0D] border border-white/10 rounded-xl py-2.5 pl-10 pr-4 focus:border-primary outline-none text-sm text-white transition-all"
                    />
                  </div>
                </div>
              )}

              <div className="space-y-1">
                <label className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Email</label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" size={16} />
                  <input
                    type="email"
                    required
                    placeholder="nome@exemplo.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full bg-[#0D0D0D] border border-white/10 rounded-xl py-2.5 pl-10 pr-4 focus:border-primary outline-none text-sm text-white transition-all"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Senha</label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" size={16} />
                  <input
                    type="password"
                    required
                    placeholder="••••••••"
                    value={formData.password}
                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                    className="w-full bg-[#0D0D0D] border border-white/10 rounded-xl py-2.5 pl-10 pr-4 focus:border-primary outline-none text-sm text-white transition-all"
                  />
                </div>
              </div>

              {!isLogin && (
                <div className="space-y-1">
                  <label className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Repetir Senha</label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" size={16} />
                    <input
                      type="password"
                      required
                      placeholder="••••••••"
                      value={formData.confirmPassword}
                      onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                      className="w-full bg-[#0D0D0D] border border-white/10 rounded-xl py-2.5 pl-10 pr-4 focus:border-primary outline-none text-sm text-white transition-all"
                    />
                  </div>
                </div>
              )}

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-primary hover:bg-primary/90 text-white py-3 rounded-xl font-bold flex items-center justify-center gap-2 transition-all transform hover:scale-[1.02] disabled:opacity-50 disabled:scale-100 mt-4"
              >
                {loading ? 'Processando...' : (isLogin ? 'Entrar' : 'Criar Conta')} <ArrowRight size={18} />
              </button>
            </form>

            <p className="text-center mt-6 text-[10px] text-gray-500">
              Ao continuar, você concorda com nossos{' '}
              <Link to="/terms" className="text-primary hover:underline">Termos</Link> e{' '}
              <Link to="/privacy" className="text-primary hover:underline">Privacidade</Link>.
            </p>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
