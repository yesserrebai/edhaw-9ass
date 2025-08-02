'use client';
import { useState } from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { useTheme } from '../contexts/ThemeContext';
import LocationPrompt from '../components/LocationPrompt';
import OutageButton from '../components/OutageButton';
import ReportChart from '../components/ReportChart';
import ReportTable from '../components/ReportTable';
import LanguageSwitcher from '../components/LanguageSwitcher';
import ThemeToggle from '../components/ThemeToggle';
import { Location, Report } from '../types/types';

/**
 * Page principale de l'application Edhaw 9as
 * 
 * Cette page gère l'interface utilisateur principale pour le signalement de coupures d'électricité.
 * Elle inclut :
 * - La gestion de la localisation utilisateur
 * - Le signalement de coupures
 * - L'affichage des statistiques et rapports
 * - La gestion des thèmes (clair/sombre)
 * - Le support multilingue
 * 
 * @component
 * @example
 * ```tsx
 * <HomePage />
 * ```
 * 
 * @returns {JSX.Element} La page principale de l'application
 */
export default function HomePage() {
  const { t } = useLanguage();
  const { resolvedTheme } = useTheme();
  const [location, setLocation] = useState<Location | null>(null);
  const [reports, setReports] = useState<Report[]>([]);

  /**
   * Soumet un rapport de coupure
   * 
   * @param {Report['timeCategory']} timeCategory - La catégorie temporelle de la coupure
   * @throws {Error} Si la localisation n'est pas définie
   */
  const submitReport = (timeCategory: Report['timeCategory']) => {
    if (!location) return alert('Location not set');

    const report: Report = {
      timestamp: new Date().toISOString(),
      timeCategory,
      location,
    };

    setReports(prev => [...prev, report]);
  };

  // Classes conditionnelles basées sur le thème résolu avec des couleurs plus user-friendly
  const containerClasses =
    resolvedTheme === 'dark'
      ? 'min-h-screen bg-gray-900 text-gray-100'
      : 'min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 text-slate-900';

  return (
    <div className={containerClasses}>
      <div className="container mx-auto p-4">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
              {t('app.title')}
            </h1>
            <p className="text-slate-700 dark:text-gray-300 mt-1 font-medium">
              {t('app.description')}
            </p>
          </div>
          <div className="flex items-center gap-4">
            <LanguageSwitcher />
            <ThemeToggle variant="icon" size="md" />
          </div>
        </div>

        <div className="space-y-6">
          <LocationPrompt onLocationSet={setLocation} />
          {location && <OutageButton onSelect={submitReport} />}
          <ReportChart reports={reports} />
          <ReportTable reports={reports} />
        </div>
      </div>
    </div>
  );
}
