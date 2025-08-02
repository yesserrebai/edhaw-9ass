'use client';

import React from 'react';
import { useTheme } from '../contexts/ThemeContext';
import { useLanguage } from '../contexts/LanguageContext';

/**
 * Props pour le composant ThemeToggle
 */
interface ThemeToggleProps {
  /** Classes CSS personnalisées (optionnel) */
  className?: string;
  /** Taille du bouton (optionnel) */
  size?: 'sm' | 'md' | 'lg';
  /** Variante du bouton (optionnel) */
  variant?: 'icon' | 'button' | 'select';
  /** Afficher le texte (optionnel) */
  showText?: boolean;
  /** Position fixe (optionnel) */
  fixed?: boolean;
}

/**
 * Composant de basculement de thème
 *
 * @param props - Props du composant
 * @returns Composant de basculement de thème
 *
 * @example
 * ```tsx
 * // Bouton simple
 * <ThemeToggle />
 *
 * // Bouton avec texte
 * <ThemeToggle showText variant="button" />
 *
 * // Sélecteur de thème
 * <ThemeToggle variant="select" />
 * ```
 */
export default function ThemeToggle({
  className = '',
  size = 'md',
  variant = 'icon',
  showText = false,
  fixed = false,
}: ThemeToggleProps) {
  const { theme, setTheme, resolvedTheme, toggleTheme } = useTheme();
  const { t } = useLanguage();

  /**
   * Classes de taille
   */
  const sizeClasses = {
    sm: 'p-1.5 text-sm',
    md: 'p-2 text-base',
    lg: 'p-3 text-lg',
  };

  /**
   * Classes de position fixe
   */
  const fixedClasses = fixed ? 'fixed top-4 right-4 z-50' : '';

  /**
   * Classes de base
   */
  const baseClasses = `
    rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2
    bg-gray-200 hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600
    text-gray-700 dark:text-gray-200
    ${sizeClasses[size]}
    ${fixedClasses}
    ${className}
  `.trim();

  /**
   * Icônes pour les thèmes
   */
  const icons = {
    light: (
      <svg
        className="w-5 h-5"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"
        />
      </svg>
    ),
    dark: (
      <svg
        className="w-5 h-5"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
        />
      </svg>
    ),
    system: (
      <svg
        className="w-5 h-5"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
        />
      </svg>
    ),
  };

  /**
   * Icônes Unicode pour les options du select
   */
  const unicodeIcons = {
    light: '☀️',
    dark: '🌙',
    system: '💻',
  };

  /**
   * Rendu du bouton icône
   */
  const renderIconButton = () => (
    <button
      onClick={toggleTheme}
      className={baseClasses}
      aria-label={t('theme.toggle')}
      title={t('theme.toggle')}
    >
      {resolvedTheme === 'dark' ? icons.light : icons.dark}
    </button>
  );

  /**
   * Rendu du bouton avec texte
   */
  const renderTextButton = () => (
    <button
      onClick={toggleTheme}
      className={`${baseClasses} flex items-center gap-2`}
      aria-label={t('theme.toggle')}
    >
      {resolvedTheme === 'dark' ? icons.light : icons.dark}
      {showText && (
        <span>
          {resolvedTheme === 'dark'
            ? t('theme.switchToLight')
            : t('theme.switchToDark')}
        </span>
      )}
    </button>
  );

  /**
   * Rendu du sélecteur de thème
   */
  const renderSelect = () => (
    <select
      value={theme}
      onChange={e => setTheme(e.target.value as 'light' | 'dark' | 'system')}
      className={`${baseClasses} cursor-pointer`}
      aria-label={t('theme.select')}
    >
      <option value="light">
        {unicodeIcons.light} {t('theme.light')}
      </option>
      <option value="dark">
        {unicodeIcons.dark} {t('theme.dark')}
      </option>
      <option value="system">
        {unicodeIcons.system} {t('theme.system')}
      </option>
    </select>
  );

  // Rendu basé sur la variante
  switch (variant) {
    case 'button':
      return renderTextButton();
    case 'select':
      return renderSelect();
    case 'icon':
    default:
      return renderIconButton();
  }
}
