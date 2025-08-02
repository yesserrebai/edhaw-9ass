'use client';

import { useEffect, useRef } from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { useTheme } from '../contexts/ThemeContext';
import type { Report } from '../types/types';
import { Chart, registerables } from 'chart.js';

Chart.register(...registerables);

/**
 * Props pour le composant ReportChart
 */
interface ReportChartProps {
  /** Liste des rapports de coupures à afficher dans le graphique */
  reports: Report[];
}

/**
 * Composant de graphique pour les rapports de coupures
 * 
 * Ce composant affiche un graphique en barres des rapports de coupures
 * en utilisant Chart.js. Il s'adapte automatiquement au thème clair/sombre.
 * 
 * Fonctionnalités :
 * - Graphique en barres interactif
 * - Adaptation automatique aux thèmes
 * - Affichage des données par catégorie temporelle
 * - État vide avec icône et message
 * - Couleurs dynamiques selon le thème
 * 
 * @component
 * @example
 * ```tsx
 * <ReportChart reports={reportsList} />
 * ```
 * 
 * @param {ReportChartProps} props - Les props du composant
 * @returns {JSX.Element} Le composant de graphique
 */
export default function ReportChart({ reports }: ReportChartProps) {
  const { t } = useLanguage();
  const { resolvedTheme } = useTheme();
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const chartRef = useRef<Chart | null>(null);

  /**
   * Initialise et met à jour le graphique Chart.js
   * 
   * Cette fonction :
   * 1. Détruit le graphique existant si nécessaire
   * 2. Prépare les données pour l'affichage
   * 3. Configure les couleurs selon le thème
   * 4. Crée un nouveau graphique avec les options appropriées
   */
  useEffect(() => {
    if (!canvasRef.current) return;

    // Détruire le graphique existant
    if (chartRef.current) {
      chartRef.current.destroy();
    }

    const ctx = canvasRef.current.getContext('2d');
    if (!ctx) return;

    // Préparer les données pour l'affichage
    const timeCategories = ['now', 'recent', 'earlier', 'muchEarlier'];
    const data = timeCategories.map(
      category =>
        reports.filter(report => report.timeCategory === category).length
    );

    // Couleurs adaptées au thème
    const textColor = resolvedTheme === 'dark' ? '#f3f4f6' : '#1e293b';
    const gridColor = resolvedTheme === 'dark' ? '#374151' : '#e2e8f0';

    // Créer le nouveau graphique
    chartRef.current = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: timeCategories.map(category => t(`outage.${category}`)),
        datasets: [
          {
            label: t('chart.title'),
            data: data,
            backgroundColor:
              resolvedTheme === 'dark'
                ? ['#3b82f6', '#8b5cf6', '#06b6d4', '#10b981']
                : ['#60a5fa', '#a78bfa', '#22d3ee', '#34d399'],
            borderColor:
              resolvedTheme === 'dark'
                ? ['#1d4ed8', '#7c3aed', '#0891b2', '#059669']
                : ['#2563eb', '#7c3aed', '#0891b2', '#059669'],
            borderWidth: 2,
            borderRadius: 8,
            borderSkipped: false,
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            display: false,
          },
          title: {
            display: true,
            text: t('chart.title'),
            color: textColor,
            font: {
              size: 18,
              weight: 'bold',
            },
          },
        },
        scales: {
          y: {
            beginAtZero: true,
            grid: {
              color: gridColor,
            },
            ticks: {
              color: textColor,
              font: {
                size: 12,
              },
            },
          },
          x: {
            grid: {
              color: gridColor,
            },
            ticks: {
              color: textColor,
              font: {
                size: 12,
              },
            },
          },
        },
      },
    });

    // Nettoyer le graphique lors du démontage
    return () => {
      if (chartRef.current) {
        chartRef.current.destroy();
      }
    };
  }, [reports, t, resolvedTheme]);

  // État vide - aucun rapport disponible
  if (reports.length === 0) {
    return (
      <div className="p-6 bg-white/90 dark:bg-gray-800/90 rounded-xl border border-slate-200 dark:border-gray-700 shadow-sm backdrop-blur-sm">
        <h2 className="text-xl font-semibold mb-4 text-slate-900 dark:text-gray-200">
          {t('chart.title')}
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
                d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
              />
            </svg>
            <p className="mt-2 text-slate-600 dark:text-gray-400 font-semibold">
              {t('chart.noData')}
            </p>
          </div>
        </div>
      </div>
    );
  }

  // Graphique avec données
  return (
    <div className="p-6 bg-white/90 dark:bg-gray-800/90 rounded-xl border border-slate-200 dark:border-gray-700 shadow-sm backdrop-blur-sm">
      <h2 className="text-xl font-semibold mb-4 text-slate-900 dark:text-gray-200">
        {t('chart.title')}
      </h2>
      <div className="h-64">
        <canvas ref={canvasRef} />
      </div>
    </div>
  );
}
