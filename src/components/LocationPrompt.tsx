'use client';

import { useEffect, useState } from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import type { Location } from '../types/types';

/**
 * Props pour le composant LocationPrompt
 */
interface LocationPromptProps {
  /** Callback appelé quand la localisation est récupérée avec succès */
  // eslint-disable-next-line no-unused-vars
  onLocationSet: (_location: Location) => void;
}

/**
 * États possibles pour la récupération de localisation
 */
type LocationStatus = 'idle' | 'requesting' | 'success' | 'error';

/**
 * Composant de demande de localisation utilisateur
 * 
 * Ce composant gère la récupération de la géolocalisation de l'utilisateur
 * et l'obtention de l'adresse via l'API Nominatim d'OpenStreetMap.
 * 
 * Fonctionnalités :
 * - Demande de permission de géolocalisation
 * - Récupération des coordonnées GPS
 * - Géocodage inverse pour obtenir l'adresse
 * - Affichage des différents états (chargement, succès, erreur)
 * 
 * @component
 * @example
 * ```tsx
 * <LocationPrompt onLocationSet={(location) => console.log(location)} />
 * ```
 * 
 * @param {LocationPromptProps} props - Les props du composant
 * @returns {JSX.Element | null} Le composant de demande de localisation ou null
 */
export default function LocationPrompt({ onLocationSet }: LocationPromptProps) {
  const { t } = useLanguage();
  const [status, setStatus] = useState<LocationStatus>('idle');

  /**
   * Effectue la récupération de la localisation
   * 
   * Cette fonction :
   * 1. Vérifie la disponibilité de l'API de géolocalisation
   * 2. Demande les coordonnées GPS à l'utilisateur
   * 3. Effectue un géocodage inverse pour obtenir l'adresse
   * 4. Met à jour le statut et appelle le callback
   */
  useEffect(() => {
    if (status !== 'idle') return;
    setStatus('requesting');
    
    if (!navigator.geolocation) {
      alert(t('location.error'));
      setStatus('error');
      return;
    }
    
    navigator.geolocation.getCurrentPosition(
      async position => {
        try {
          const { latitude, longitude } = position.coords;
          const response = await fetch(
            `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}&zoom=18&addressdetails=1`
          );
          if (!response.ok) throw new Error(t('location.geocodingError'));
          const data = await response.json();
          const address = data.display_name || 'Adresse inconnue';
          const locationData: Location = { latitude, longitude, address };
          onLocationSet(locationData);
          setStatus('success');
        } catch {
          alert(t('location.geocodingError'));
          setStatus('error');
        }
      },
      () => {
        alert(t('location.error'));
        setStatus('error');
      }
    );
  }, [onLocationSet, status, t]);

  // État de chargement
  if (status === 'requesting') {
    return (
      <div className="p-4 bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 border border-blue-200 dark:border-blue-700 rounded-xl shadow-sm backdrop-blur-sm">
        <div className="flex items-center space-x-3">
          <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-blue-600 dark:border-blue-400"></div>
          <p className="text-blue-800 dark:text-blue-300 font-semibold">
            {t('location.requesting')}
          </p>
        </div>
      </div>
    );
  }
  
  // État de succès
  if (status === 'success') {
    return (
      <div className="p-4 bg-gradient-to-r from-emerald-50 to-green-50 dark:from-green-900/20 dark:to-emerald-900/20 border border-emerald-200 dark:border-green-700 rounded-xl shadow-sm backdrop-blur-sm">
        <div className="flex items-center space-x-3">
          <div className="flex-shrink-0">
            <svg
              className="h-5 w-5 text-emerald-600 dark:text-green-400"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                fillRule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                clipRule="evenodd"
              />
            </svg>
          </div>
          <p className="text-emerald-800 dark:text-green-300 font-semibold">
            Localisation récupérée avec succès !
          </p>
        </div>
      </div>
    );
  }
  
  // État d'erreur
  if (status === 'error') {
    return (
      <div className="p-4 bg-gradient-to-r from-red-50 to-rose-50 dark:from-red-900/20 dark:to-rose-900/20 border border-red-200 dark:border-red-700 rounded-xl shadow-sm backdrop-blur-sm">
        <div className="flex items-center space-x-3">
          <div className="flex-shrink-0">
            <svg
              className="h-5 w-5 text-red-600 dark:text-red-400"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                fillRule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                clipRule="evenodd"
              />
            </svg>
          </div>
          <p className="text-red-800 dark:text-red-300 font-semibold">
            Erreur lors de la récupération de la localisation.
          </p>
        </div>
      </div>
    );
  }
  
  return null;
}
