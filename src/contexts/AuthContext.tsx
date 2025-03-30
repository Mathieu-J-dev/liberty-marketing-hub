
import React, { createContext, useContext, useState, useEffect } from 'react';

type User = {
  id: string;
  name: string;
  email: string;
  membershipLevel: 'free' | 'premium' | 'vip';
};

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Essayer de récupérer l'utilisateur du localStorage au chargement
  const [user, setUser] = useState<User | null>(() => {
    const savedUser = localStorage.getItem('user');
    return savedUser ? JSON.parse(savedUser) : null;
  });
  
  const isAuthenticated = !!user;

  // Fonction de connexion simulée
  const login = async (email: string, password: string): Promise<boolean> => {
    // Simuler une validation de connexion
    if (email && password.length >= 6) {
      // Créer un utilisateur simulé
      const newUser: User = {
        id: '123456',
        name: email.split('@')[0],
        email,
        membershipLevel: 'premium'
      };
      
      // Enregistrer dans localStorage et mettre à jour l'état
      localStorage.setItem('user', JSON.stringify(newUser));
      setUser(newUser);
      return true;
    }
    return false;
  };

  // Fonction de déconnexion
  const logout = () => {
    localStorage.removeItem('user');
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, isAuthenticated, login, logout }}>
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
