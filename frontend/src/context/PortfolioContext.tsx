import React, { createContext, useContext, useEffect, useState, useCallback } from 'react';
import { PortfolioBundle, Publication } from '../types/portfolio';
import { fallbackPortfolioData } from '../data/fallbackSeed';

interface PortfolioContextType {
  data: PortfolioBundle;
  isLoading: boolean;
  isBackendOnline: boolean;
  theme: 'light' | 'dark';
  toggleTheme: () => void;
  searchOpen: boolean;
  setSearchOpen: (open: boolean) => void;
  selectedResearchAreaFilter: string | null;
  setSelectedResearchAreaFilter: (slug: string | null) => void;
  activeCitationPub: Publication | null;
  setActiveCitationPub: (pub: Publication | null) => void;
  refetch: () => Promise<void>;
}

const PortfolioContext = createContext<PortfolioContextType | undefined>(undefined);

const API_BASE_URL = 'http://127.0.0.1:8000';

export const PortfolioProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [data, setData] = useState<PortfolioBundle>(fallbackPortfolioData);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isBackendOnline, setIsBackendOnline] = useState<boolean>(false);
  const [theme, setTheme] = useState<'light' | 'dark'>('light');
  const [searchOpen, setSearchOpen] = useState<boolean>(false);
  const [selectedResearchAreaFilter, setSelectedResearchAreaFilter] = useState<string | null>(null);
  const [activeCitationPub, setActiveCitationPub] = useState<Publication | null>(null);

  // Initialize theme from localStorage or system preference
  useEffect(() => {
    const savedTheme = localStorage.getItem('academic_theme') as 'light' | 'dark' | null;
    const initialTheme = savedTheme || 'light';
    setTheme(initialTheme);
    if (initialTheme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, []);

  const toggleTheme = () => {
    setTheme(prev => {
      const next = prev === 'light' ? 'dark' : 'light';
      localStorage.setItem('academic_theme', next);
      if (next === 'dark') {
        document.documentElement.classList.add('dark');
      } else {
        document.documentElement.classList.remove('dark');
      }
      return next;
    });
  };

  const fetchBundle = useCallback(async () => {
    try {
      setIsLoading(true);
      const res = await fetch(`${API_BASE_URL}/api/v1/portfolio-bundle/`, {
        headers: { 'Accept': 'application/json' },
      });
      if (!res.ok) {
        throw new Error(`Server responded with ${res.status}`);
      }
      const json: PortfolioBundle = await res.json();
      if (json && json.site_config) {
        setData(json);
        setIsBackendOnline(true);
      }
    } catch (err) {
      console.warn("Backend API offline or unreachable, using rich fallback seed data:", err);
      setIsBackendOnline(false);
      setData(fallbackPortfolioData);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchBundle();
  }, [fetchBundle]);

  // Global Cmd+K / Ctrl+K shortcut listener
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setSearchOpen(prev => !prev);
      }
      if (e.key === 'Escape') {
        setSearchOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <PortfolioContext.Provider
      value={{
        data,
        isLoading,
        isBackendOnline,
        theme,
        toggleTheme,
        searchOpen,
        setSearchOpen,
        selectedResearchAreaFilter,
        setSelectedResearchAreaFilter,
        activeCitationPub,
        setActiveCitationPub,
        refetch: fetchBundle,
      }}
    >
      {children}
    </PortfolioContext.Provider>
  );
};

export const usePortfolio = () => {
  const context = useContext(PortfolioContext);
  if (!context) {
    throw new Error('usePortfolio must be used within a PortfolioProvider');
  }
  return context;
};
