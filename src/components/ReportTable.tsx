'use client';

import { useLanguage } from '../contexts/LanguageContext';
import type { Report } from '../types/types';

/**
 * Props pour le composant ReportTable
 */
interface ReportTableProps {
  /** Liste des rapports de coupures à afficher dans le tableau */
  reports: Report[];
}

/**
 * Composant de tableau pour les rapports de coupures
 * 
 * Ce composant affiche un tableau des rapports de coupures avec
 * toutes les informations pertinentes. Il s'adapte automatiquement
 * au thème clair/sombre.
 * 
 * Fonctionnalités :
 * - Tableau responsive avec en-têtes
 * - Affichage des informations détaillées
 * - Badges colorés pour les catégories
 * - État vide avec icône et message
 * - Effets hover sur les lignes
 * - Support des thèmes clair/sombre
 * 
 * @component
 * @example
 * ```tsx
 * <ReportTable reports={reportsList} />
 * ```
 * 
 * @param {ReportTableProps} props - Les props du composant
 * @returns {JSX.Element} Le composant de tableau
 */
export default function ReportTable({ reports }: ReportTableProps) {
  const { t } = useLanguage();

  // État vide - aucun rapport disponible
  if (reports.length === 0) {
    return (
      <div className="p-6 bg-white/90 dark:bg-gray-800/90 rounded-xl border border-slate-200 dark:border-gray-700 shadow-sm backdrop-blur-sm">
        <h2 className="text-xl font-semibold mb-4 text-slate-900 dark:text-gray-200">
          {t('reports.title')}
        </h2>
        <div className="flex items-center justify-center h-48">
          <div className="text-center">
            <svg
              className="mx-auto h-12 w-12 text-slate-400 dark:text-gray-500"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
              />
            </svg>
            <p className="mt-2 text-slate-600 dark:text-gray-400 font-semibold">
              {t('reports.noReports')}
            </p>
          </div>
        </div>
      </div>
    );
  }

  // Tableau avec données
  return (
    <div className="p-6 bg-white/90 dark:bg-gray-800/90 rounded-xl border border-slate-200 dark:border-gray-700 shadow-sm backdrop-blur-sm">
      <h2 className="text-xl font-semibold mb-4 text-slate-900 dark:text-gray-200">
        {t('reports.title')}
      </h2>
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-slate-200 dark:divide-gray-700">
          {/* En-têtes du tableau */}
          <thead className="bg-gradient-to-r from-slate-50 to-blue-50 dark:from-gray-700 dark:to-gray-800">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-slate-700 dark:text-gray-300 uppercase tracking-wider">
                {t('reports.table.time')}
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-slate-700 dark:text-gray-300 uppercase tracking-wider">
                {t('reports.table.category')}
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-slate-700 dark:text-gray-300 uppercase tracking-wider">
                {t('reports.table.address')}
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-slate-700 dark:text-gray-300 uppercase tracking-wider">
                {t('reports.table.coordinates')}
              </th>
            </tr>
          </thead>
          {/* Corps du tableau */}
          <tbody className="bg-white/50 dark:bg-gray-800/50 divide-y divide-slate-200 dark:divide-gray-700">
            {reports.map((report, index) => (
              <tr
                key={index}
                className="hover:bg-gradient-to-r hover:from-slate-50 hover:to-blue-50 dark:hover:from-gray-700 dark:hover:to-gray-600 transition-colors duration-200"
              >
                {/* Horodatage du rapport */}
                <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-800 dark:text-gray-300">
                  {new Date(report.timestamp).toLocaleString()}
                </td>
                {/* Catégorie temporelle avec badge */}
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gradient-to-r from-blue-100 to-indigo-100 dark:from-blue-900 dark:to-indigo-900 text-blue-800 dark:text-blue-200">
                    {t(`outage.${report.timeCategory}`)}
                  </span>
                </td>
                {/* Adresse du rapport */}
                <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-800 dark:text-gray-300">
                  {report.location.address}
                </td>
                {/* Coordonnées GPS */}
                <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-600 dark:text-gray-400">
                  {report.location.latitude.toFixed(6)},{' '}
                  {report.location.longitude.toFixed(6)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
