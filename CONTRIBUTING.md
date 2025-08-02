# Guide de Contribution - Edhaw-9ass

## 🚀 Comment Contribuer

### Prérequis

- Node.js 18+
- pnpm (recommandé) ou npm
- Git

### Installation

```bash
# Cloner le projet
git clone https://github.com/votre-username/edhaw-9ass.git
cd edhaw-9ass

# Installer pnpm (si pas déjà installé)
npm install -g pnpm

# Installer les dépendances
pnpm install

# Démarrer le serveur de développement
pnpm dev
```

### Scripts Disponibles

```bash
# Développement
pnpm dev          # Démarrer le serveur de développement
pnpm build        # Construire pour la production
pnpm start        # Démarrer le serveur de production

# Qualité du Code
pnpm lint         # Vérifier le code avec ESLint
pnpm lint:fix     # Corriger automatiquement les erreurs ESLint
pnpm format       # Formater le code avec Prettier
pnpm format:check # Vérifier le formatage
pnpm type-check   # Vérifier les types TypeScript

# Tests
pnpm test         # Exécuter les tests Jest (unitaires)
pnpm test:watch   # Exécuter les tests Jest en mode watch
pnpm test:coverage # Exécuter les tests Jest avec couverture
pnpm test:e2e     # Exécuter les tests Playwright (E2E)
pnpm test:e2e:ui  # Interface graphique pour les tests E2E
pnpm test:e2e:headed # Tests E2E avec navigateurs visibles
pnpm test:e2e:debug # Tests E2E en mode debug

# Vite (Alternative à Next.js)
pnpm vite:dev     # Démarrer Vite en développement
pnpm vite:build   # Construire avec Vite
pnpm vite:preview # Prévisualiser le build Vite

# Maintenance
pnpm clean        # Nettoyer le cache et node_modules
pnpm reinstall    # Réinstaller toutes les dépendances
```

### Workflow de Contribution

1. **Fork** le projet
2. **Créer** une branche pour votre fonctionnalité
   ```bash
   git checkout -b feature/nom-de-la-fonctionnalite
   ```
3. **Développer** votre fonctionnalité
4. **Tester** votre code
   ```bash
   pnpm test
   pnpm test:e2e
   pnpm lint
   pnpm type-check
   ```
5. **Commiter** vos changements
   ```bash
   git add .
   git commit -m "feat: ajouter nouvelle fonctionnalité"
   ```
6. **Pousser** vers votre fork
   ```bash
   git push origin feature/nom-de-la-fonctionnalite
   ```
7. **Créer** une Pull Request

### Standards de Code

- Utiliser **TypeScript** pour tout nouveau code
- Suivre les conventions **ESLint** et **Prettier**
- Écrire des **tests** pour les nouvelles fonctionnalités
- Documenter les nouvelles APIs
- Utiliser des **commits conventionnels**

### Structure du Projet

```
src/
├── app/           # Pages Next.js (App Router)
├── components/    # Composants React réutilisables
├── types/         # Définitions TypeScript
├── utils/         # Fonctions utilitaires
└── __tests__/     # Tests unitaires Jest

tests/
└── e2e/          # Tests E2E Playwright
```

### Tests

Les tests sont organisés comme suit :

- **Tests unitaires** : `src/__tests__/` (Jest)
- **Tests E2E** : `tests/e2e/` (Playwright)
- **Tests d'intégration** : `src/tests/` (Jest)

### Déploiement

Le projet est configuré pour le déploiement sur :

- **Vercel** (recommandé)
- **Netlify**
- **Railway**

## 🤝 Besoin d'Aide ?

- Ouvrir une **Issue** pour les bugs
- Créer une **Discussion** pour les questions
- Rejoindre notre **Discord** pour le chat en direct

Merci de contribuer à Edhaw-9ass ! 🌟
