// src/components/TimeSelector.tsx
'use client';
import { useState } from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import type { Report } from '../types/types';

/**
 * Props pour le composant OutageButton
 */
interface OutageButtonProps {
  /** Callback appelé quand une catégorie temporelle est sélectionnée */
  // eslint-disable-next-line no-unused-vars
  onSelect: (_timeCategory: Report['timeCategory']) => void;
}

/**
 * Composant de bouton de signalement de coupure
 * 
 * Ce composant affiche un bouton principal pour signaler une coupure
 * et un menu déroulant avec les options temporelles disponibles.
 * 
 * Fonctionnalités :
 * - Bouton principal avec icône d'alerte
 * - Menu déroulant avec options temporelles
 * - Animations et effets hover
 * - Support des thèmes clair/sombre
 * 
 * @component
 * @example
 * ```tsx
 * <OutageButton onSelect={(category) => console.log(category)} />
 * ```
 * 
 * @param {OutageButtonProps} props - Les props du composant
 * @returns {JSX.Element} Le composant de bouton de signalement
 */
export default function OutageButton({ onSelect }: OutageButtonProps) {
  const { t } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  
  /**
   * Catégories temporelles disponibles pour les coupures
   */
  const timeCategories: Report['timeCategory'][] = [
    'now',
    'recent',
    'earlier',
    'muchEarlier',
  ];
  
  /**
   * Gère la sélection d'une catégorie temporelle
   * 
   * @param {Report['timeCategory']} category - La catégorie sélectionnée
   */
  const handleSelect = (category: Report['timeCategory']) => {
    onSelect(category);
    setIsOpen(false);
  };
  
  return (
    <div className="mb-4">
      {/* Bouton principal de signalement */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="bg-gradient-to-r from-red-500 to-rose-600 hover:from-red-600 hover:to-rose-700 dark:from-red-600 dark:to-rose-700 dark:hover:from-red-700 dark:hover:to-rose-800 text-white rounded-xl transition-all duration-200 font-semibold px-6 py-3 shadow-lg hover:shadow-xl transform hover:scale-105"
      >
        <div className="flex items-center space-x-2">
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
              d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z"
            />
          </svg>
          <span>{t('outage.reportButton')}</span>
        </div>
      </button>

      {/* Menu déroulant avec options temporelles */}
      {isOpen && (
        <div className="mt-3 p-4 bg-white/90 dark:bg-gray-800/90 border border-slate-200 dark:border-gray-700 rounded-xl shadow-lg backdrop-blur-sm">
          <p className="text-sm text-slate-800 dark:text-gray-400 mb-4 font-semibold">
            {t('outage.selectTime')}
          </p>
          <div className="space-y-2">
            {timeCategories.map(category => (
              <button
                key={category}
                onClick={() => handleSelect(category)}
                className="w-full text-left px-4 py-3 hover:bg-gradient-to-r hover:from-slate-50 hover:to-blue-50 dark:hover:from-gray-700 dark:hover:to-gray-600 rounded-lg transition-all duration-200 text-slate-800 dark:text-gray-200 font-semibold hover:shadow-sm"
              >
                {t(`outage.${category}`)}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
