import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Mail, Lock, User, ArrowRight } from 'lucide-react';
import { Link, useSearchParams, useNavigate } from 'react-router-dom';
import { StaticGrid } from '../components/StaticGrid';
import { useAuth } from '../contexts/AuthContext';
import { trackEvent } from '../services/analytics';

export const Auth = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { signInMock } = useAuth();
  const [isLogin, setIsLogin] = useState(searchParams.get('mode') !== 'register');
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [error, setError] = useState(searchParams.get('message') || '');
  const [success, setSuccess] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    if (isLogin) {
      try {
        if (formData.email === 'filipi.hadji.dsg@gmail.com' && formData.password === 'Greg1314@') {
          signInMock(formData.email, 'Filipi Hadji', 'admin');
        } else {
          signInMock(formData.email, formData.fullName);
        }
        
        setSuccess('Login realizado com sucesso! Redirecionando...');
        
        // Redirect after a short delay to show success message
        setTimeout(() => {
          const redirect = searchParams.get('redirect') || '';
          const targetPath = redirect.startsWith('/') ? redirect : `/${redirect}`;
          navigate(targetPath || '/');
        }, 1500);
      } catch (err: any) {
        setError(err.message || 'Email ou senha incorretos.');
      }
    } else {
      // Registration
      if (formData.password !== formData.confirmPassword) {
        setError('As senhas não coincidem.');
        return;
      }
      if (formData.password.length < 6) {
        setError('A senha deve ter pelo menos 6 caracteres.');
        return;
      }

      try {
        signInMock(formData.email, formData.fullName);
        setSuccess('Conta criada com sucesso! Redirecionando...');
        setTimeout(() => {
          navigate('/');
        }, 1500);
      } catch (err: any) {
        setError(err.message || 'Erro ao criar conta.');
      }
    }
  };

  return (
    <div className="bg-[#0A0A0A] text-white min-h-screen pt-32 pb-20 px-4 relative overflow-hidden">
      <StaticGrid />
      <div className="container-custom max-w-md mx-auto relative z-10">
        <div className="text-center mb-10">
          <h1 className="text-3xl font-display font-bold mb-2">
            {isLogin ? 'Bem-vindo de volta' : 'Crie sua conta'}
          </h1>
          <p className="text-gray-400">
            {isLogin 
              ? 'Entre para continuar sua jornada de aprendizado.' 
              : 'Comece a dominar Linux e DevOps hoje mesmo.'}
          </p>
        </div>

        <div className="bg-[#1A1A1A] border border-white/10 rounded-2xl p-8 shadow-2xl">
          {/* Tabs */}
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

          <form onSubmit={handleSubmit} className="space-y-6">
            {error && <p className="text-red-500 text-xs font-bold bg-red-500/10 p-3 rounded-lg border border-red-500/20">{error}</p>}
            {success && <p className="text-green-500 text-xs font-bold bg-green-500/10 p-3 rounded-lg border border-green-500/20">{success}</p>}

            {!isLogin && (
              <div className="space-y-2">
                <label className="text-xs font-bold text-gray-400 uppercase tracking-wider">Seu nome</label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" size={18} />
                  <input
                    type="text"
                    required
                    placeholder="Seu nome"
                    value={formData.fullName}
                    onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                    className="w-full bg-[#0D0D0D] border border-white/10 rounded-xl py-3 pl-10 pr-4 focus:border-primary outline-none text-white transition-all"
                  />
                </div>
              </div>
            )}

            <div className="space-y-2">
              <label className="text-xs font-bold text-gray-400 uppercase tracking-wider">Endereço de Email</label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" size={18} />
                <input
                  type="email"
                  required
                  placeholder="nome@exemplo.com"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full bg-[#0D0D0D] border border-white/10 rounded-xl py-3 pl-10 pr-4 focus:border-primary outline-none text-white transition-all"
                />
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <label className="text-xs font-bold text-gray-400 uppercase tracking-wider">Senha</label>
                {isLogin && (
                  <button type="button" className="text-xs text-primary hover:underline">Esqueceu a senha?</button>
                )}
              </div>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" size={18} />
                <input
                  type="password"
                  required
                  placeholder="••••••••"
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  className="w-full bg-[#0D0D0D] border border-white/10 rounded-xl py-3 pl-10 pr-4 focus:border-primary outline-none text-white transition-all"
                />
              </div>
              {!isLogin && <p className="text-[10px] text-gray-500">Mínimo de 6 caracteres.</p>}
            </div>

            {!isLogin && (
              <div className="space-y-2">
                <label className="text-xs font-bold text-gray-400 uppercase tracking-wider">Repetir Senha</label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" size={18} />
                  <input
                    type="password"
                    required
                    placeholder="••••••••"
                    value={formData.confirmPassword}
                    onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                    className="w-full bg-[#0D0D0D] border border-white/10 rounded-xl py-3 pl-10 pr-4 focus:border-primary outline-none text-white transition-all"
                  />
                </div>
              </div>
            )}

            <button
              type="submit"
              className="w-full bg-primary hover:bg-primary/90 text-white py-4 rounded-xl font-bold flex items-center justify-center gap-2 transition-all transform hover:scale-[1.02]"
            >
              {isLogin ? 'Entrar' : 'Criar Conta'} <ArrowRight size={18} />
            </button>
          </form>
        </div>

        <p className="text-center mt-8 text-sm text-gray-500">
          Ao continuar, você concorda com nossos{' '}
          <Link to="/terms" className="text-primary hover:underline">Termos de Serviço</Link> e{' '}
          <Link to="/privacy" className="text-primary hover:underline">Política de Privacidade</Link>.
        </p>
      </div>
    </div>
  );
};
