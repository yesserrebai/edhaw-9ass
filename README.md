# Edhaw 9as - Application de Signalement de Coupures d'Électricité

## 📋 Description

**Edhaw 9as** est une application web moderne pour le signalement de coupures d'électricité en Tunisie. Elle permet aux utilisateurs de signaler des coupures en temps réel avec géolocalisation et offre des statistiques visuelles des rapports.

## ✨ Fonctionnalités

### 🎯 Fonctionnalités Principales
- **Signalement de coupures** avec géolocalisation automatique
- **Catégorisation temporelle** (Maintenant, Récemment, Plus tôt, Beaucoup plus tôt)
- **Géocodage inverse** via OpenStreetMap Nominatim
- **Statistiques visuelles** avec graphiques Chart.js
- **Tableau de rapports** avec informations détaillées
- **Support multilingue** (Français, Anglais, Arabe)
- **Thèmes adaptatifs** (Clair, Sombre, Système)
- **Interface responsive** et moderne

### 🎨 Interface Utilisateur
- **Design moderne** avec Tailwind CSS
- **Thèmes adaptatifs** avec transitions fluides
- **Composants réutilisables** et bien documentés
- **Accessibilité** optimisée
- **Animations** et effets visuels

## 🛠️ Technologies Utilisées

### Frontend
- **Next.js 15.4.2** - Framework React avec App Router
- **React 19.1.0** - Bibliothèque UI
- **TypeScript** - Typage statique
- **Tailwind CSS** - Framework CSS utilitaire
- **Chart.js** - Graphiques interactifs

### Outils de Développement
- **pnpm** - Gestionnaire de paquets rapide
- **ESLint** - Linting du code
- **Prettier** - Formatage automatique
- **Husky** - Git hooks
- **lint-staged** - Linting des fichiers modifiés

### Tests
- **Jest** - Tests unitaires et d'intégration
- **React Testing Library** - Tests de composants
- **Playwright** - Tests end-to-end

### CI/CD & Déploiement
- **Docker** - Containerisation
- **Nginx** - Serveur web
- **GitHub Actions** - CI/CD automatisé
- **Trivy** - Scan de sécurité

## 📁 Structure du Projet

```
edhaw-9ass/
├── src/
│   ├── app/                    # Pages Next.js (App Router)
│   │   ├── layout.tsx         # Layout principal
│   │   ├── page.tsx           # Page d'accueil
│   │   └── globals.css        # Styles globaux
│   ├── components/             # Composants React
│   │   ├── LocationPrompt.tsx # Demande de géolocalisation
│   │   ├── OutageButton.tsx   # Bouton de signalement
│   │   ├── ReportChart.tsx    # Graphique des rapports
│   │   ├── ReportTable.tsx    # Tableau des rapports
│   │   ├── LanguageSwitcher.tsx # Sélecteur de langue
│   │   ├── ThemeToggle.tsx    # Basculeur de thème
│   │   └── ThemeInitializer.tsx # Initialisation du thème
│   ├── contexts/              # Contextes React
│   │   ├── ThemeContext.tsx   # Gestion des thèmes
│   │   └── LanguageContext.tsx # Gestion des langues
│   ├── types/                 # Types TypeScript
│   │   ├── types.ts          # Types principaux
│   │   └── jest.d.ts         # Types Jest
│   ├── utils/                 # Utilitaires
│   │   └── timeBuckets.ts    # Utilitaires temporels
│   └── __tests__/            # Tests unitaires
├── tests/                     # Tests E2E Playwright
├── public/                    # Assets statiques
├── .github/                   # GitHub Actions
└── docs/                      # Documentation
```

## 🚀 Installation et Lancement

### Prérequis
- **Node.js** 18+ 
- **pnpm** (recommandé) ou npm
- **Git**

### Installation

```bash
# Cloner le repository
git clone https://github.com/votre-username/edhaw-9ass.git
cd edhaw-9ass

# Installer les dépendances
pnpm install

# Copier les variables d'environnement (si nécessaire)
cp .env.example .env.local
```

### Développement

```bash
# Lancer le serveur de développement
pnpm dev

# L'application sera disponible sur http://localhost:3000
```

### Tests

```bash
# Tests unitaires
pnpm test

# Tests unitaires en mode watch
pnpm test:watch

# Tests E2E
pnpm test:e2e

# Tous les tests
pnpm test:all
```

### Build et Production

```bash
# Build de production
pnpm build

# Lancer en production
pnpm start

# Linting
pnpm lint

# Formatage
pnpm format
```

## 🧪 Tests

### Tests Unitaires
- **Jest** + **React Testing Library**
- Tests des composants, contextes et utilitaires
- Couverture complète des fonctionnalités

### Tests E2E
- **Playwright** pour les tests end-to-end
- Tests des flux utilisateur complets
- Tests multi-navigateurs (Chrome, Firefox, Safari)

### Exécution des Tests
```bash
# Tests unitaires
pnpm test

# Tests E2E
pnpm test:e2e

# Tests avec couverture
pnpm test:coverage
```

## 🐳 Docker

### Build de l'Image
```bash
# Build de l'image Docker
docker build -t edhaw-9ass .

# Lancer avec Docker
docker run -p 3000:3000 edhaw-9ass
```

### Docker Compose
```bash
# Lancer avec Docker Compose
docker-compose up -d

# Arrêter les services
docker-compose down
```

## 🔧 Configuration

### Variables d'Environnement
```env
# .env.local
NEXT_PUBLIC_APP_NAME=Edhaw 9as
NEXT_PUBLIC_APP_DESCRIPTION=Application de signalement de coupures d'électricité
```

### Configuration Tailwind
- **darkMode: 'class'** - Mode sombre basé sur les classes
- **Content paths** configurés pour tous les fichiers
- **Custom colors** pour les thèmes

### Configuration ESLint
- **Règles strictes** pour la qualité du code
- **Prettier** intégré pour le formatage
- **Husky** pour les hooks Git

## 📊 Fonctionnalités Détaillées

### 🌍 Support Multilingue
- **Français** - Langue par défaut
- **Anglais** - Traduction complète
- **Arabe** - Support RTL
- **Contextes React** pour la gestion des langues
- **Persistance** des préférences

### 🎨 Système de Thèmes
- **Mode clair** - Interface claire et moderne
- **Mode sombre** - Interface sombre confortable
- **Mode système** - Suit les préférences système
- **Transitions fluides** entre les thèmes
- **Persistance** des préférences

### 📍 Géolocalisation
- **API Geolocation** du navigateur
- **Géocodage inverse** via OpenStreetMap
- **Gestion d'erreurs** complète
- **États visuels** (chargement, succès, erreur)

### 📈 Visualisation des Données
- **Chart.js** pour les graphiques
- **Graphiques en barres** interactifs
- **Adaptation automatique** aux thèmes
- **Données en temps réel**

## 🔒 Sécurité

### Bonnes Pratiques
- **Validation des données** côté client et serveur
- **Sanitisation** des entrées utilisateur
- **HTTPS** en production
- **Headers de sécurité** configurés

### Scan de Sécurité
```bash
# Scan avec Trivy
trivy image edhaw-9ass:latest
```

## 📈 Performance

### Optimisations
- **Next.js 15** avec App Router
- **Turbopack** pour le développement
- **Optimisation des images** automatique
- **Code splitting** automatique
- **Lazy loading** des composants

### Métriques
- **Lighthouse Score** > 90
- **Core Web Vitals** optimisés
- **Bundle size** minimisé

## 🤝 Contribution

### Guidelines
1. **Fork** le repository
2. **Créer** une branche feature
3. **Développer** avec les standards du projet
4. **Tester** complètement
5. **Soumettre** une Pull Request

### Standards de Code
- **TypeScript** strict
- **ESLint** + **Prettier**
- **JSDoc** pour la documentation
- **Tests** obligatoires
- **Commits** conventionnels

## 📝 Changelog

### Version 1.0.0
- ✅ Application complète fonctionnelle
- ✅ Support multilingue (FR, EN, AR)
- ✅ Thèmes clair/sombre/système
- ✅ Géolocalisation et géocodage
- ✅ Graphiques et tableaux
- ✅ Tests unitaires et E2E
- ✅ CI/CD avec GitHub Actions
- ✅ Documentation complète

## 📄 Licence

Ce projet est sous licence MIT. Voir le fichier `LICENSE` pour plus de détails.

## 👥 Équipe

- **Développeur Principal** - [Votre Nom]
- **Design** - Tailwind CSS
- **Tests** - Jest + Playwright
- **CI/CD** - GitHub Actions

## 🆘 Support

Pour toute question ou problème :
- **Issues GitHub** - Pour les bugs et features
- **Discussions** - Pour les questions générales
- **Documentation** - Complète avec JSDoc

---

**Edhaw 9as** - Révolutionner le signalement des coupures d'électricité en Tunisie 🇹🇳
