import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { 
  Lock, Save, LogOut, Edit, Settings, Users, CheckCircle, Clock, 
  BarChart3, TrendingUp, UserPlus, Target, AlertTriangle, Search,
  Heart, Trash2
} from 'lucide-react';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, 
  LineChart, Line, AreaChart, Area, Cell, PieChart, Pie
} from 'recharts';
import { DISTROS } from '../constants';
import { useAuth } from '../contexts/AuthContext';

const ADMIN_EMAIL = 'filipi.hadji.dsg@gmail.com';
const ADMIN_PASSWORD = 'Greg1314@';

export const Admin = () => {
  const { user: authUser, profile: authProfile, signOut, signInMock } = useAuth();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [activeTab, setActiveTab] = useState<'dashboard' | 'distros' | 'texts' | 'students' | 'supporters'>('dashboard');
  const [distros, setDistros] = useState(DISTROS);
  const [editingDistro, setEditingDistro] = useState<any>(null);
  const [editingTexts, setEditingTexts] = useState<any>(null);
  const [selectedPage, setSelectedPage] = useState('home');
  const [metrics, setMetrics] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [supporters, setSupporters] = useState<any[]>([]);
  const [newSupporter, setNewSupporter] = useState({ name: '', type: 'individual' });

  const pages = [
    { id: 'home', name: 'Página Inicial' },
    { id: 'sobre', name: 'Sobre' },
    { id: 'contato', name: 'Contato' }
  ];

  useEffect(() => {
    if (authProfile?.role === 'admin') {
      setIsLoggedIn(true);
      fetchMetrics();
    }
    
    const savedDistros = localStorage.getItem('meulinux_distros_override');
    if (savedDistros) {
      setDistros(JSON.parse(savedDistros));
    }
  }, [authProfile]);

  const fetchMetrics = async () => {
    setLoading(true);
    try {
      setMetrics({
        totalUsers: 147,
        active7d: 38,
        active30d: 94,
        students: [
          {
            id: 'mock-student-1',
            fullName: 'Ana Oliveira',
            email: 'ana.oliveira@gmail.com',
            registrationDate: '2026-05-10T10:00:00Z',
            lastSeenAt: '2026-05-25T15:30:00Z',
            trail_id: 'Iniciantes',
            step_id: 'introducao',
            completed_steps: 4
          },
          {
            id: 'mock-student-2',
            fullName: 'Bruno Santos',
            email: 'bruno.santos@yahoo.com.br',
            registrationDate: '2026-05-15T14:22:00Z',
            lastSeenAt: '2026-05-24T18:15:00Z',
            trail_id: 'Comandos',
            step_id: 'terminal-comandos',
            completed_steps: 2
          }
        ],
        signupsPerDay: [
          { date: '05/18', count: 4 },
          { date: '05/19', count: 3 },
          { date: '05/20', count: 5 },
          { date: '05/21', count: 2 },
          { date: '05/22', count: 8 },
          { date: '05/23', count: 6 },
          { date: '05/24', count: 4 },
          { date: '05/25', count: 7 }
        ],
        trailFunnel: [
          { trail_id: 'Iniciantes', started: 120, completed: 85 },
          { trail_id: 'Comandos', started: 95, completed: 62 },
          { trail_id: 'Redes', started: 40, completed: 18 }
        ],
        abandonmentRanking: [
          { trail_id: 'Iniciantes', step_id: 'introducao', count: 15 },
          { trail_id: 'Comandos', step_id: 'terminal-comandos', count: 12 }
        ]
      });
    } catch (err) {
      console.error('Failed to fetch metrics:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (activeTab === 'supporters') {
      fetchSupporters();
    }
  }, [activeTab]);

  const fetchSupporters = async () => {
    try {
      const saved = localStorage.getItem('meulinux_supporters');
      const list = saved ? JSON.parse(saved) : [];
      const hardcodedSupporter = {
        id: 'hardcoded-1',
        name: 'Marcos da Silva',
        amount: 'R$ 2,00',
        created_at: '2026-03-06T12:00:00Z',
        type: 'individual'
      };
      setSupporters([hardcodedSupporter, ...list]);
    } catch (err) {
      console.error('Failed to fetch supporters:', err);
    }
  };

  const handleAddSupporter = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newSupporter.name) return;

    try {
      const saved = localStorage.getItem('meulinux_supporters');
      const list = saved ? JSON.parse(saved) : [];
      const added = {
        id: Math.random().toString(36).substr(2, 9),
        name: newSupporter.name,
        type: newSupporter.type,
        amount: 'R$ 5,00',
        created_at: new Date().toISOString()
      };
      const updated = [added, ...list];
      localStorage.setItem('meulinux_supporters', JSON.stringify(updated));
      
      setNewSupporter({ name: '', type: 'individual' });
      fetchSupporters();
      alert('Apoiador adicionado com sucesso!');
    } catch (err: any) {
      alert('Erro ao adicionar apoiador: ' + err.message);
    }
  };

  const handleDeleteSupporter = async (id: string) => {
    if (!confirm('Tem certeza que deseja remover este apoiador?')) return;
    try {
      const saved = localStorage.getItem('meulinux_supporters');
      const list = saved ? JSON.parse(saved) : [];
      const filtered = list.filter((s: any) => s.id !== id);
      localStorage.setItem('meulinux_supporters', JSON.stringify(filtered));
      fetchSupporters();
    } catch (err: any) {
      alert('Erro ao remover apoiador: ' + err.message);
    }
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    // Check hardcoded credentials first
    if (email === ADMIN_EMAIL && password === ADMIN_PASSWORD) {
      signInMock(email, 'Filipi Hadji', 'admin');
      setIsLoggedIn(true);
      fetchMetrics();
      return;
    }

    setError('Credenciais inválidas');
  };

  const handleLogout = async () => {
    await signOut();
    setIsLoggedIn(false);
  };

  const saveDistros = (updatedDistros: any[]) => {
    setDistros(updatedDistros);
    localStorage.setItem('meulinux_distros_override', JSON.stringify(updatedDistros));
    alert('Alterações salvas com sucesso!');
  };

  const saveTexts = () => {
    localStorage.setItem(`meulinux_translations_${selectedPage}`, JSON.stringify(editingTexts));
    alert('Textos salvos com sucesso!');
  };

  const handleEditDistro = (distro: any) => {
    setEditingDistro({ ...distro });
  };

  const handleUpdateDistro = (e: React.FormEvent) => {
    e.preventDefault();
    const updated = distros.map(d => d.id === editingDistro.id ? editingDistro : d);
    saveDistros(updated);
    setEditingDistro(null);
  };

  const updateText = (lang: string, key: string, value: string) => {
    setEditingTexts({
      ...editingTexts,
      [lang]: {
        ...(editingTexts[lang] || {}),
        [key]: value
      }
    });
  };

  if (!isLoggedIn) {
    return (
      <div className="min-h-screen pt-20 flex items-center justify-center bg-gray-50 px-4">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white p-8 rounded-3xl shadow-2xl w-full max-w-md border border-gray-100"
        >
          <div className="text-center mb-8">
            <div className="bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 text-primary">
              <Lock size={32} />
            </div>
            <h1 className="text-2xl font-display font-bold text-dark">Painel Administrativo</h1>
            <p className="text-gray-500">Acesse para gerenciar o conteúdo do site</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-6">
            <div>
              <label className="block text-sm font-bold mb-2 uppercase tracking-wider text-gray-500">Email</label>
              <input 
                type="email" 
                className="w-full bg-gray-50 border border-gray-200 rounded-[6px] px-4 py-3 focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div>
              <label className="block text-sm font-bold mb-2 uppercase tracking-wider text-gray-500">Senha</label>
              <input 
                type="password" 
                className="w-full bg-gray-50 border border-gray-200 rounded-[6px] px-4 py-3 focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            {error && <p className="text-red-500 text-sm font-bold">{error}</p>}
            <button className="w-full bg-dark text-white py-4 rounded-[6px] font-bold text-lg hover:bg-primary transition-all shadow-lg">
              Entrar
            </button>
          </form>
        </motion.div>
      </div>
    );
  }

  const COLORS = ['#F27D26', '#141414', '#5A5A40', '#E4E3E0'];

  return (
    <div className="min-h-screen pt-20 bg-gray-50">
      <header className="bg-white border-b border-gray-200 py-6 sticky top-20 z-40">
        <div className="container mx-auto px-4 flex justify-between items-center">
          <h1 className="text-2xl font-display font-bold text-dark flex items-center gap-3">
            <Settings className="text-primary" /> Painel Admin
          </h1>
          <div className="flex items-center gap-4">
            <button 
              onClick={fetchMetrics}
              className="p-2 text-gray-400 hover:text-primary transition-colors"
              title="Atualizar Dados"
            >
              <TrendingUp size={20} className={loading ? 'animate-spin' : ''} />
            </button>
            <button 
              onClick={handleLogout}
              className="flex items-center gap-2 text-gray-500 hover:text-red-500 font-bold transition-colors"
            >
              <LogOut size={20} /> Sair
            </button>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-12">
        <div className="flex gap-4 mb-8 overflow-x-auto pb-2">
          <button 
            onClick={() => setActiveTab('dashboard')}
            className={`px-6 py-3 rounded-[6px] font-bold whitespace-nowrap transition-all ${activeTab === 'dashboard' ? 'bg-primary text-white shadow-lg' : 'bg-white text-gray-500 hover:bg-gray-100'}`}
          >
            Dashboard
          </button>
          <button 
            onClick={() => setActiveTab('distros')}
            className={`px-6 py-3 rounded-[6px] font-bold whitespace-nowrap transition-all ${activeTab === 'distros' ? 'bg-primary text-white shadow-lg' : 'bg-white text-gray-500 hover:bg-gray-100'}`}
          >
            Gerenciar Distros
          </button>
          <button 
            onClick={() => setActiveTab('texts')}
            className={`px-6 py-3 rounded-[6px] font-bold whitespace-nowrap transition-all ${activeTab === 'texts' ? 'bg-primary text-white shadow-lg' : 'bg-white text-gray-500 hover:bg-gray-100'}`}
          >
            Editar Textos
          </button>
          <button 
            onClick={() => setActiveTab('students')}
            className={`px-6 py-3 rounded-[6px] font-bold whitespace-nowrap transition-all ${activeTab === 'students' ? 'bg-primary text-white shadow-lg' : 'bg-white text-gray-500 hover:bg-gray-100'}`}
          >
            Gerenciar Alunos
          </button>
          <button 
            onClick={() => setActiveTab('supporters')}
            className={`px-6 py-3 rounded-[6px] font-bold whitespace-nowrap transition-all ${activeTab === 'supporters' ? 'bg-primary text-white shadow-lg' : 'bg-white text-gray-500 hover:bg-gray-100'}`}
          >
            Mural de Apoiadores
          </button>
        </div>

        {activeTab === 'dashboard' && metrics && (
          <div className="space-y-8">
            {/* Quick Stats */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                <div className="flex items-center gap-4 text-primary mb-2">
                  <Users size={24} />
                  <span className="text-sm font-bold uppercase tracking-wider text-gray-500">Total de Usuários</span>
                </div>
                <p className="text-3xl font-bold">{metrics.totalUsers}</p>
              </div>
              <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                <div className="flex items-center gap-4 text-green-500 mb-2">
                  <UserPlus size={24} />
                  <span className="text-sm font-bold uppercase tracking-wider text-gray-500">Ativos (7 dias)</span>
                </div>
                <p className="text-3xl font-bold">{metrics.active7d}</p>
              </div>
              <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                <div className="flex items-center gap-4 text-blue-500 mb-2">
                  <TrendingUp size={24} />
                  <span className="text-sm font-bold uppercase tracking-wider text-gray-500">Ativos (30 dias)</span>
                </div>
                <p className="text-3xl font-bold">{metrics.active30d}</p>
              </div>
              <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                <div className="flex items-center gap-4 text-orange-500 mb-2">
                  <Target size={24} />
                  <span className="text-sm font-bold uppercase tracking-wider text-gray-500">Taxa de Conversão</span>
                </div>
                <p className="text-3xl font-bold">
                  {metrics.trailFunnel.length > 0 && metrics.totalUsers > 0 
                    ? Math.round((metrics.trailFunnel.reduce((acc: any, f: any) => acc + f.completed, 0) / metrics.totalUsers) * 100) 
                    : 0}%
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Daily Registrations */}
              <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100">
                <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
                  <BarChart3 size={20} className="text-primary" /> Cadastros Diários (30 dias)
                </h3>
                <div className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={metrics.signupsPerDay}>
                      <defs>
                        <linearGradient id="colorCount" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#F27D26" stopOpacity={0.3}/>
                          <stop offset="95%" stopColor="#F27D26" stopOpacity={0}/>
                        </linearGradient>
                      </defs>
                      <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
                      <XAxis dataKey="date" axisLine={false} tickLine={false} tick={{fontSize: 12, fill: '#999'}} />
                      <YAxis axisLine={false} tickLine={false} tick={{fontSize: 12, fill: '#999'}} />
                      <Tooltip 
                        contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1)' }}
                      />
                      <Area type="monotone" dataKey="count" stroke="#F27D26" fillOpacity={1} fill="url(#colorCount)" strokeWidth={3} />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              </div>

              {/* Trail Funnel */}
              <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100">
                <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
                  <Target size={20} className="text-primary" /> Funil de Conversão por Trilha
                </h3>
                <div className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={metrics.trailFunnel} layout="vertical">
                      <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#f0f0f0" />
                      <XAxis type="number" hide />
                      <YAxis dataKey="trail_id" type="category" axisLine={false} tickLine={false} tick={{fontSize: 12, fill: '#999'}} width={100} />
                      <Tooltip 
                        cursor={{fill: 'transparent'}}
                        contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1)' }}
                      />
                      <Bar dataKey="started" name="Iniciaram" fill="#5A5A40" radius={[0, 4, 4, 0]} barSize={20} />
                      <Bar dataKey="completed" name="Concluíram" fill="#F27D26" radius={[0, 4, 4, 0]} barSize={20} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </div>

            {/* Drop-off Ranking */}
            <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100">
              <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
                <AlertTriangle size={20} className="text-orange-500" /> Ranking de Abandono (Etapas Críticas)
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
                {metrics.abandonmentRanking.map((item: any, idx: number) => (
                  <div key={idx} className="bg-gray-50 p-4 rounded-xl border border-gray-100">
                    <div className="flex justify-between items-start mb-2">
                      <span className="text-xs font-bold text-gray-400 uppercase">{item.trail_id}</span>
                      <span className="text-lg font-bold text-orange-500">{item.count}</span>
                    </div>
                    <p className="text-sm font-bold text-dark truncate">{item.step_id}</p>
                    <div className="mt-2 w-full bg-gray-200 h-1 rounded-full overflow-hidden">
                      <div 
                        className="bg-orange-500 h-full" 
                        style={{ width: `${(item.count / metrics.totalUsers) * 100}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {activeTab === 'distros' && (
          <div className="space-y-6">
            {editingDistro ? (
              <motion.div 
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="bg-white p-8 rounded-3xl shadow-xl border border-gray-100"
              >
                <div className="flex justify-between items-center mb-8">
                  <h2 className="text-2xl font-bold">Editando: {editingDistro.name}</h2>
                  <button 
                    onClick={() => setEditingDistro(null)}
                    className="text-gray-400 hover:text-dark"
                  >
                    Cancelar
                  </button>
                </div>

                <form onSubmit={handleUpdateDistro} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-bold mb-2 uppercase tracking-wider text-gray-500">Nome</label>
                      <input 
                        type="text" 
                        className="w-full bg-gray-50 border border-gray-200 rounded-[6px] px-4 py-3"
                        value={editingDistro.name}
                        onChange={(e) => setEditingDistro({...editingDistro, name: e.target.value})}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-bold mb-2 uppercase tracking-wider text-gray-500">Subtítulo</label>
                      <input 
                        type="text" 
                        className="w-full bg-gray-50 border border-gray-200 rounded-[6px] px-4 py-3"
                        value={editingDistro.subtitle}
                        onChange={(e) => setEditingDistro({...editingDistro, subtitle: e.target.value})}
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-bold mb-2 uppercase tracking-wider text-gray-500">Descrição</label>
                    <textarea 
                      rows={4}
                      className="w-full bg-gray-50 border border-gray-200 rounded-[6px] px-4 py-3 resize-none"
                      value={editingDistro.description}
                      onChange={(e) => setEditingDistro({...editingDistro, description: e.target.value})}
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div>
                      <label className="block text-sm font-bold mb-2 uppercase tracking-wider text-gray-500">Baseado em</label>
                      <input 
                        type="text" 
                        className="w-full bg-gray-50 border border-gray-200 rounded-[6px] px-4 py-3"
                        value={editingDistro.basedOn}
                        onChange={(e) => setEditingDistro({...editingDistro, basedOn: e.target.value})}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-bold mb-2 uppercase tracking-wider text-gray-500">País</label>
                      <input 
                        type="text" 
                        className="w-full bg-gray-50 border border-gray-200 rounded-[6px] px-4 py-3"
                        value={editingDistro.country}
                        onChange={(e) => setEditingDistro({...editingDistro, country: e.target.value})}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-bold mb-2 uppercase tracking-wider text-gray-500">Tamanho ISO</label>
                      <input 
                        type="text" 
                        className="w-full bg-gray-50 border border-gray-200 rounded-[6px] px-4 py-3"
                        value={editingDistro.isoSize}
                        onChange={(e) => setEditingDistro({...editingDistro, isoSize: e.target.value})}
                      />
                    </div>
                  </div>

                  <button className="w-full bg-primary text-white py-4 rounded-[6px] font-bold text-lg hover:bg-primary/90 transition-all shadow-lg flex items-center justify-center gap-2">
                    <Save size={20} /> Salvar Alterações
                  </button>
                </form>
              </motion.div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {distros.map(distro => (
                  <div key={distro.id} className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex flex-col">
                    <div className="flex items-center gap-4 mb-4">
                      <img src={distro.logo} alt={distro.name} className="w-12 h-12 object-contain" referrerPolicy="no-referrer" />
                      <div>
                        <h3 className="font-bold text-lg">{distro.name}</h3>
                        <p className="text-sm text-gray-500">{distro.id}</p>
                      </div>
                    </div>
                    <p className="text-sm text-gray-600 line-clamp-2 mb-6 flex-grow">
                      {distro.subtitle}
                    </p>
                    <button 
                      onClick={() => handleEditDistro(distro)}
                      className="w-full bg-gray-50 text-dark py-3 rounded-[6px] font-bold hover:bg-primary hover:text-white transition-all flex items-center justify-center gap-2"
                    >
                      <Edit size={16} /> Editar Conteúdo
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {activeTab === 'texts' && (
          <div className="space-y-6">
            <div className="flex gap-4 mb-8 overflow-x-auto pb-2">
              {pages.map(page => (
                <button 
                  key={page.id}
                  onClick={() => setSelectedPage(page.id)}
                  className={`px-4 py-2 rounded-[6px] text-sm font-bold whitespace-nowrap transition-all ${selectedPage === page.id ? 'bg-dark text-white' : 'bg-white text-gray-500 hover:bg-gray-100'}`}
                >
                  {page.name}
                </button>
              ))}
            </div>

            <div className="bg-white p-8 rounded-3xl shadow-xl border border-gray-100">
              <div className="flex justify-between items-center mb-8">
                <h2 className="text-2xl font-bold">Editando textos: {pages.find(p => p.id === selectedPage)?.name}</h2>
                <button 
                  onClick={saveTexts}
                  className="bg-primary text-white px-6 py-2 rounded-[6px] font-bold hover:bg-primary/90 transition-all flex items-center gap-2"
                >
                  <Save size={18} /> Salvar Tudo
                </button>
              </div>

              <div className="space-y-12">
                {['pt-BR'].map(lang => (
                  <div key={lang} className="space-y-6">
                    <h3 className="text-lg font-bold uppercase tracking-widest text-primary border-b border-primary/10 pb-2">
                      Idioma: {lang.toUpperCase()}
                    </h3>
                    <div className="grid grid-cols-1 gap-6">
                      {selectedPage === 'home' && (
                        <>
                          <div className="space-y-2">
                            <label className="text-xs font-bold text-gray-400 uppercase">Título Hero</label>
                            <input 
                              className="w-full bg-gray-50 border border-gray-200 rounded-[6px] px-4 py-3"
                              value={editingTexts[lang]?.heroTitle || ''}
                              onChange={(e) => updateText(lang, 'heroTitle', e.target.value)}
                              placeholder="Título principal da home"
                            />
                          </div>
                          <div className="space-y-2">
                            <label className="text-xs font-bold text-gray-400 uppercase">Subtítulo Hero</label>
                            <input 
                              className="w-full bg-gray-50 border border-gray-200 rounded-[6px] px-4 py-3"
                              value={editingTexts[lang]?.heroSubtitle || ''}
                              onChange={(e) => updateText(lang, 'heroSubtitle', e.target.value)}
                              placeholder="Subtítulo da home"
                            />
                          </div>
                        </>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {activeTab === 'students' && metrics && (
          <div className="space-y-6">
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-center gap-4">
              <Search className="text-gray-400" size={20} />
              <input 
                type="text" 
                placeholder="Buscar por nome ou email..."
                className="flex-grow bg-transparent border-none focus:ring-0 text-dark font-medium"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>

            <div className="bg-white rounded-3xl shadow-xl border border-gray-100 overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-gray-50 border-b border-gray-100">
                      <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-gray-500">Aluno</th>
                      <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-gray-500">Cadastro</th>
                      <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-gray-500">Último Acesso</th>
                      <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-gray-500">Trilha Atual</th>
                      <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-gray-500">Progresso</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-50">
                    {metrics.students
                      .filter((s: any) => 
                        s.fullName.toLowerCase().includes(searchTerm.toLowerCase()) || 
                        s.email.toLowerCase().includes(searchTerm.toLowerCase())
                      )
                      .map((student: any) => (
                      <tr key={student.id} className="hover:bg-gray-50 transition-colors">
                        <td className="px-6 py-4">
                          <div className="font-bold text-dark">{student.fullName}</div>
                          <div className="text-xs text-gray-500">{student.email}</div>
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-600">
                          {new Date(student.registrationDate).toLocaleDateString('pt-BR')}
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-600">
                          {student.lastSeenAt ? new Date(student.lastSeenAt).toLocaleString('pt-BR') : '-'}
                        </td>
                        <td className="px-6 py-4">
                          {student.trail_id ? (
                            <div className="flex flex-col">
                              <span className="px-3 py-1 bg-primary/10 text-primary text-xs font-bold rounded-full w-fit">
                                {student.trail_id}
                              </span>
                              <span className="text-[10px] text-gray-400 mt-1">{student.step_id}</span>
                            </div>
                          ) : (
                            <span className="text-gray-400 text-xs">Nenhuma trilha iniciada</span>
                          )}
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-3">
                            <div className="w-24 bg-gray-100 rounded-full h-2">
                              <div 
                                className="bg-primary h-full rounded-full transition-all" 
                                style={{ width: `${student.completed_steps * 10}%` }}
                              />
                            </div>
                            <span className="text-xs font-bold text-gray-500">{student.completed_steps * 10}%</span>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}
        {activeTab === 'supporters' && (
          <div className="space-y-8">
            <div className="bg-white p-8 rounded-3xl shadow-xl border border-gray-100">
              <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
                <Heart className="text-primary" /> Adicionar Novo Apoiador
              </h2>
              <form onSubmit={handleAddSupporter} className="flex flex-col md:flex-row gap-4">
                <div className="flex-grow">
                  <label className="block text-xs font-bold text-gray-400 uppercase mb-1">Nome do Apoiador</label>
                  <input 
                    type="text" 
                    className="w-full bg-gray-50 border border-gray-200 rounded-[6px] px-4 py-3"
                    placeholder="Ex: João Silva ou Nome da Empresa"
                    value={newSupporter.name}
                    onChange={(e) => setNewSupporter({...newSupporter, name: e.target.value})}
                  />
                </div>
                <div className="w-full md:w-48">
                  <label className="block text-xs font-bold text-gray-400 uppercase mb-1">Tipo</label>
                  <select 
                    className="w-full bg-gray-50 border border-gray-200 rounded-[6px] px-4 py-3"
                    value={newSupporter.type}
                    onChange={(e) => setNewSupporter({...newSupporter, type: e.target.value})}
                  >
                    <option value="individual">Individual</option>
                    <option value="company">Empresa</option>
                  </select>
                </div>
                <div className="flex items-end">
                  <button className="bg-primary text-white px-8 py-3 rounded-[6px] font-bold hover:bg-primary/90 transition-all shadow-lg">
                    Adicionar
                  </button>
                </div>
              </form>
            </div>

            <div className="bg-white rounded-3xl shadow-xl border border-gray-100 overflow-hidden">
              <div className="p-6 border-b border-gray-100">
                <h3 className="text-lg font-bold">Apoiadores Atuais ({supporters.length})</h3>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-gray-50 border-b border-gray-100">
                      <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-gray-500">Nome</th>
                      <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-gray-500">Tipo</th>
                      <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-gray-500">Valor</th>
                      <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-gray-500">Data</th>
                      <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-gray-500 text-right">Ações</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-50">
                    {supporters.map((supporter) => (
                      <tr key={supporter.id} className="hover:bg-gray-50 transition-colors">
                        <td className="px-6 py-4 font-bold text-dark">{supporter.name}</td>
                        <td className="px-6 py-4">
                          <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase ${supporter.type === 'company' ? 'bg-blue-100 text-blue-600' : 'bg-green-100 text-green-600'}`}>
                            {supporter.type === 'company' ? 'Empresa' : 'Individual'}
                          </span>
                        </td>
                        <td className="px-6 py-4 text-sm font-bold text-primary">
                          {supporter.amount || '-'}
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-500">
                          {new Date(supporter.created_at).toLocaleDateString('pt-BR')}
                        </td>
                        <td className="px-6 py-4 text-right">
                          <button 
                            onClick={() => handleDeleteSupporter(supporter.id)}
                            className="p-2 text-gray-400 hover:text-red-500 transition-colors"
                          >
                            <Trash2 size={18} />
                          </button>
                        </td>
                      </tr>
                    ))}
                    {supporters.length === 0 && (
                      <tr>
                        <td colSpan={4} className="px-6 py-12 text-center text-gray-400 italic">
                          Nenhum apoiador cadastrado ainda.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

      </main>
    </div>
  );
};
