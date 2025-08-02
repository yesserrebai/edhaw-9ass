'use client';

import { useEffect } from 'react';

/**
 * Composant pour initialiser le thème côté client
 * Ce composant s'exécute uniquement côté client et applique le thème
 * avant que le reste de l'application ne se charge
 */
export default function ThemeInitializer() {
  useEffect(() => {
    try {
      const savedTheme = localStorage.getItem('theme') || 'light';
      const root = document.documentElement;

      // Supprime les classes existantes
      root.classList.remove('light', 'dark');

      // Détermine le thème résolu
      let resolvedTheme = savedTheme;
      if (savedTheme === 'system') {
        resolvedTheme = window.matchMedia('(prefers-color-scheme: dark)')
          .matches
          ? 'dark'
          : 'light';
      }

      // Ajoute la nouvelle classe
      root.classList.add(resolvedTheme);

      // Met à jour l'attribut data-theme pour l'accessibilité
      root.setAttribute('data-theme', resolvedTheme);

      // Pour Tailwind CSS, nous devons aussi ajouter/retirer la classe 'dark' sur le html
      if (resolvedTheme === 'dark') {
        root.classList.add('dark');
      } else {
        root.classList.remove('dark');
      }
    } catch (e) {
      // Gère silencieusement les erreurs
    }
  }, []);

  return null;
}
