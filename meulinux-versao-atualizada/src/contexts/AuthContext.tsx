import React, { createContext, useContext, useEffect, useState } from 'react';

export interface User {
  id: string;
  email: string;
}

export interface Profile {
  id: string;
  full_name: string;
  email: string;
  role: 'user' | 'admin';
  registration_date?: string;
  last_seen_at?: string;
}

interface AuthContextType {
  session: any | null;
  user: User | null;
  profile: Profile | null;
  loading: boolean;
  signOut: () => Promise<void>;
  signInMock: (email: string, fullName?: string, role?: 'user' | 'admin') => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [profile, setProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Load local stored session/user
    try {
      const stored = localStorage.getItem('meulinux_current_user');
      if (stored) {
        const parsed = JSON.parse(stored);
        setUser(parsed.user);
        setProfile(parsed.profile);
      }
    } catch (err) {
      console.error('Error loading stored user:', err);
    } finally {
      setLoading(false);
    }
  }, []);

  const signInMock = (email: string, fullName?: string, role: 'user' | 'admin' = 'user') => {
    const id = Math.random().toString(36).substr(2, 9);
    const mockUser: User = { id, email };
    const mockProfile: Profile = {
      id,
      email,
      full_name: fullName || email.split('@')[0],
      role,
      registration_date: new Date().toISOString(),
      last_seen_at: new Date().toISOString()
    };
    setUser(mockUser);
    setProfile(mockProfile);
    localStorage.setItem('meulinux_current_user', JSON.stringify({ user: mockUser, profile: mockProfile }));
  };

  const signOut = async () => {
    setUser(null);
    setProfile(null);
    localStorage.removeItem('meulinux_current_user');
  };

  const session = user ? { user } : null;

  return (
    <AuthContext.Provider value={{ session, user, profile, loading, signOut, signInMock }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
