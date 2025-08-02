'use client';

import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react';

/**
 * Types de thèmes disponibles
 */
export type Theme = 'light' | 'dark' | 'system';

/**
 * Interface pour le contexte de thème
 */
interface ThemeContextType {
  /** Thème actuel (light, dark, ou system) */
  theme: Theme;
  /** Fonction pour changer le thème */
  // eslint-disable-next-line no-unused-vars
  setTheme: (theme: Theme) => void;
  /** Thème résolu (light ou dark) basé sur le thème actuel et les préférences système */
  resolvedTheme: 'light' | 'dark';
  /** Fonction pour basculer entre light et dark */
  toggleTheme: () => void;
}

/**
 * Props pour le provider de thème
 */
interface ThemeProviderProps {
  /** Enfants à wrapper avec le contexte de thème */
  children: ReactNode;
  /** Thème par défaut (optionnel) */
  defaultTheme?: Theme;
  /** Clé de stockage pour localStorage (optionnel) */
  storageKey?: string;
}

/**
 * Contexte de thème pour gérer les modes clair/sombre
 * 
 * Ce contexte fournit :
 * - La gestion du thème actuel (light, dark, system)
 * - Le thème résolu basé sur les préférences système
 * - La persistance des préférences dans localStorage
 * - Les fonctions pour changer et basculer les thèmes
 * 
 * @example
 * ```tsx
 * const { theme, setTheme, resolvedTheme, toggleTheme } = useTheme();
 * ```
 */
const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

/**
 * Provider pour le contexte de thème
 * 
 * Ce composant gère l'état du thème et fournit les fonctions
 * nécessaires pour manipuler les thèmes dans l'application.
 * 
 * Fonctionnalités :
 * - Gestion des thèmes light, dark et system
 * - Détection automatique des préférences système
 * - Persistance dans localStorage
 * - Application des classes CSS appropriées
 * - Écoute des changements de préférences système
 * 
 * @component
 * @example
 * ```tsx
 * <ThemeProvider defaultTheme="system" storageKey="app-theme">
 *   <App />
 * </ThemeProvider>
 * ```
 * 
 * @param {ThemeProviderProps} props - Les props du provider
 * @returns {JSX.Element} Le provider de thème
 */
export function ThemeProvider({
  children,
  defaultTheme = 'light',
  storageKey = 'theme',
}: ThemeProviderProps) {
  const [theme, setTheme] = useState<Theme>(defaultTheme);
  const [resolvedTheme, setResolvedTheme] = useState<'light' | 'dark'>('light');
  const [mounted, setMounted] = useState(false);

  /**
   * Résout le thème en tenant compte des préférences système
   * 
   * @param {Theme} currentTheme - Le thème actuel
   * @returns {'light' | 'dark'} Le thème résolu
   */
  const getResolvedTheme = (currentTheme: Theme): 'light' | 'dark' => {
    if (currentTheme === 'system') {
      return typeof window !== 'undefined' && window.matchMedia('(prefers-color-scheme: dark)').matches
        ? 'dark'
        : 'light';
    }
    return currentTheme;
  };

  /**
   * Applique le thème au document
   * 
   * Cette fonction :
   * 1. Supprime les classes existantes
   * 2. Ajoute la nouvelle classe de thème
   * 3. Met à jour l'attribut data-theme pour l'accessibilité
   * 4. Applique la classe 'dark' pour Tailwind CSS
   * 
   * @param {'light' | 'dark'} newTheme - Le thème à appliquer
   */
  const applyTheme = (newTheme: 'light' | 'dark') => {
    if (typeof document === 'undefined') return;

    const root = document.documentElement;

    // Supprime les classes existantes
    root.classList.remove('light', 'dark');

    // Ajoute la nouvelle classe
    root.classList.add(newTheme);

    // Met à jour l'attribut data-theme pour l'accessibilité
    root.setAttribute('data-theme', newTheme);

    // Pour Tailwind CSS, nous devons aussi ajouter/retirer la classe 'dark' sur le html
    // Cette classe est nécessaire pour que les variantes dark: fonctionnent
    if (newTheme === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
  };

  /**
   * Gère le changement de thème
   * 
   * @param {Theme} newTheme - Le nouveau thème à appliquer
   */
  const handleSetTheme = (newTheme: Theme) => {
    setTheme(newTheme);

    // Sauvegarde dans localStorage
    if (typeof window !== 'undefined') {
      localStorage.setItem(storageKey, newTheme);
    }

    // Applique le thème résolu
    const resolved = getResolvedTheme(newTheme);
    setResolvedTheme(resolved);
    applyTheme(resolved);
  };

  /**
   * Bascule entre light et dark
   */
  const toggleTheme = () => {
    const newTheme = resolvedTheme === 'light' ? 'dark' : 'light';
    handleSetTheme(newTheme);
  };

  // Initialisation au montage côté client
  useEffect(() => {
    setMounted(true);

    // Récupère le thème sauvegardé
    if (typeof window !== 'undefined') {
      const savedTheme = localStorage.getItem(storageKey) as Theme;
      if (savedTheme && ['light', 'dark', 'system'].includes(savedTheme)) {
        setTheme(savedTheme);
      }
    }

    // Applique le thème initial
    const initialResolvedTheme = getResolvedTheme(theme);
    setResolvedTheme(initialResolvedTheme);
    applyTheme(initialResolvedTheme);
  }, [storageKey, theme]);

  // Écoute les changements de préférences système
  useEffect(() => {
    if (theme !== 'system') return;

    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');

    const handleChange = () => {
      const newResolvedTheme = getResolvedTheme(theme);
      setResolvedTheme(newResolvedTheme);
      applyTheme(newResolvedTheme);
    };

    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, [theme]);

  // Met à jour le thème résolu quand le thème change
  useEffect(() => {
    if (!mounted) return;

    const newResolvedTheme = getResolvedTheme(theme);
    setResolvedTheme(newResolvedTheme);
    applyTheme(newResolvedTheme);
  }, [theme, mounted]);

  const value: ThemeContextType = {
    theme,
    setTheme: handleSetTheme,
    resolvedTheme,
    toggleTheme,
  };

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}

/**
 * Hook pour utiliser le contexte de thème
 * 
 * Ce hook fournit l'accès au contexte de thème et ses fonctionnalités.
 * Il doit être utilisé à l'intérieur d'un ThemeProvider.
 * 
 * @returns {ThemeContextType} Le contexte de thème
 * @throws {Error} Si utilisé en dehors d'un ThemeProvider
 * 
 * @example
 * ```tsx
 * const { theme, setTheme, resolvedTheme, toggleTheme } = useTheme();
 * ```
 */
export function useTheme(): ThemeContextType {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
}
