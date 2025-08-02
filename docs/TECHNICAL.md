# Documentation Technique - Edhaw 9as

## 🏗️ Architecture

### Architecture Générale
L'application suit une architecture **modulaire** basée sur Next.js 15 avec App Router :

```
┌─────────────────────────────────────────────────────────────┐
│                    Frontend (Next.js)                      │
├─────────────────────────────────────────────────────────────┤
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐        │
│  │   Pages     │  │ Components  │  │  Contexts   │        │
│  │  (App Router)│  │  (Reusable) │  │  (State Mgmt)│        │
│  └─────────────┘  └─────────────┘  └─────────────┘        │
├─────────────────────────────────────────────────────────────┤
│                    External APIs                           │
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐        │
│  │ Geolocation │  │ Nominatim   │  │ Chart.js    │        │
│  │   Browser   │  │ OpenStreetMap│  │  Charts     │        │
│  └─────────────┘  └─────────────┘  └─────────────┘        │
└─────────────────────────────────────────────────────────────┘
```

### Patterns Utilisés

#### 1. **Context Pattern** (State Management)
```typescript
// ThemeContext.tsx
const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children, defaultTheme = 'light' }) {
  // Gestion centralisée du thème
}
```

#### 2. **Custom Hooks Pattern**
```typescript
// useTheme hook
export function useTheme(): ThemeContextType {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
}
```

#### 3. **Component Composition Pattern**
```typescript
// Composants réutilisables avec props typées
interface LocationPromptProps {
  onLocationSet: (location: Location) => void;
}
```

#### 4. **Effect Pattern** (Side Effects)
```typescript
// Gestion des effets de bord avec useEffect
useEffect(() => {
  // Logique de géolocalisation
  // Nettoyage automatique
}, [dependencies]);
```

## 🎯 Décisions Techniques

### 1. **Next.js 15 avec App Router**
**Pourquoi ?**
- **Performance** : App Router avec streaming SSR
- **SEO** : Rendu côté serveur optimisé
- **DX** : Développement plus simple avec les layouts
- **Futur** : Support officiel de React 19

### 2. **TypeScript Strict**
**Pourquoi ?**
- **Sécurité** : Détection d'erreurs à la compilation
- **DX** : Autocomplétion et refactoring
- **Maintenance** : Code plus robuste
- **Documentation** : Types comme documentation

### 3. **Tailwind CSS**
**Pourquoi ?**
- **Productivité** : Développement rapide
- **Consistance** : Design system intégré
- **Performance** : CSS purgé automatiquement
- **Thèmes** : Support natif du mode sombre

### 4. **Context API vs Redux**
**Pourquoi Context API ?**
- **Simplicité** : Pas de boilerplate
- **Bundle size** : Plus léger
- **React Native** : Compatible
- **Suffisant** : État simple de l'application

### 5. **Jest + Playwright**
**Pourquoi cette combinaison ?**
- **Jest** : Tests unitaires rapides
- **Playwright** : Tests E2E robustes
- **Couverture** : Tests complets
- **CI/CD** : Intégration facile

## 🔧 Configuration Détaillée

### ESLint Configuration
```javascript
// .eslintrc.json
{
  "extends": [
    "next/core-web-vitals",
    "@typescript-eslint/recommended",
    "prettier"
  ],
  "rules": {
    "@typescript-eslint/no-unused-vars": "error",
    "prefer-const": "error",
    "no-console": "warn"
  }
}
```

### Tailwind Configuration
```javascript
// tailwind.config.js
module.exports = {
  darkMode: 'class', // Mode sombre basé sur les classes
  content: [
    './src/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        // Couleurs personnalisées
      }
    }
  }
}
```

### Jest Configuration
```javascript
// jest.config.js
module.exports = {
  testEnvironment: 'jsdom',
  setupFilesAfterEnv: ['<rootDir>/src/__tests__/setup.ts'],
  moduleNameMapping: {
    '^@/(.*)$': '<rootDir>/src/$1',
  }
}
```

## 📊 Gestion d'État

### Architecture de l'État
```
┌─────────────────────────────────────────────────────────────┐
│                    Application State                       │
├─────────────────────────────────────────────────────────────┤
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐        │
│  │   Theme     │  │  Language   │  │   Reports   │        │
│  │  Context    │  │  Context    │  │   State     │        │
│  │             │  │             │  │             │        │
│  │ • theme     │  │ • language  │  │ • reports[] │        │
│  │ • setTheme  │  │ • setLang   │  │ • addReport │        │
│  │ • toggle    │  │ • t()       │  │ • clear     │        │
│  └─────────────┘  └─────────────┘  └─────────────┘        │
└─────────────────────────────────────────────────────────────┘
```

### Flux de Données
1. **User Action** → Component
2. **Component** → Context Hook
3. **Context Hook** → State Update
4. **State Update** → Re-render
5. **Re-render** → UI Update

## 🧪 Stratégie de Tests

### Tests Unitaires (Jest)
```typescript
// Structure des tests
describe('Component', () => {
  beforeEach(() => {
    // Setup
  });

  test('should render correctly', () => {
    // Arrange
    // Act
    // Assert
  });
});
```

### Tests E2E (Playwright)
```typescript
// Structure des tests E2E
test('user can report outage', async ({ page }) => {
  await page.goto('/');
  await page.click('[data-testid="outage-button"]');
  // Assertions
});
```

### Couverture de Tests
- **Composants** : 100% des composants testés
- **Contextes** : 100% des contextes testés
- **Utilitaires** : 100% des utilitaires testés
- **E2E** : Flux principaux testés

## 🔒 Sécurité

### Bonnes Pratiques Implémentées
1. **Validation des Entrées**
   ```typescript
   // Validation des coordonnées GPS
   if (latitude < -90 || latitude > 90) {
     throw new Error('Invalid latitude');
   }
   ```

2. **Sanitisation des Données**
   ```typescript
   // Échappement des données utilisateur
   const sanitizedAddress = address.replace(/[<>]/g, '');
   ```

3. **Headers de Sécurité**
   ```typescript
   // next.config.js
   const securityHeaders = [
     {
       key: 'X-Frame-Options',
       value: 'DENY'
     }
   ];
   ```

## 📈 Performance

### Optimisations Implémentées
1. **Code Splitting**
   - Next.js App Router automatique
   - Lazy loading des composants

2. **Image Optimization**
   - Next.js Image component
   - Formats modernes (WebP)

3. **Bundle Optimization**
   - Tree shaking automatique
   - Minification en production

4. **Caching**
   - Static generation
   - CDN ready

### Métriques de Performance
- **First Contentful Paint** : < 1.5s
- **Largest Contentful Paint** : < 2.5s
- **Cumulative Layout Shift** : < 0.1
- **First Input Delay** : < 100ms

## 🌐 API Integration

### OpenStreetMap Nominatim
```typescript
// Géocodage inverse
const response = await fetch(
  `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`
);
```

### Browser Geolocation API
```typescript
// Géolocalisation
navigator.geolocation.getCurrentPosition(
  (position) => {
    // Success callback
  },
  (error) => {
    // Error callback
  }
);
```

## 🔄 CI/CD Pipeline

### GitHub Actions Workflow
```yaml
# .github/workflows/ci.yml
name: CI/CD Pipeline
on: [push, pull_request]

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
      - run: pnpm install
      - run: pnpm test
      - run: pnpm test:e2e
      - run: pnpm build
```

### Docker Pipeline
```dockerfile
# Dockerfile
FROM node:18-alpine AS base
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production

FROM base AS build
COPY . .
RUN npm run build

FROM base AS production
COPY --from=build /app/.next ./.next
EXPOSE 3000
CMD ["npm", "start"]
```

## 📚 Documentation

### JSDoc Standards
```typescript
/**
 * Composant de demande de localisation utilisateur
 * 
 * Ce composant gère la récupération de la géolocalisation
 * et l'obtention de l'adresse via l'API Nominatim.
 * 
 * @component
 * @example
 * ```tsx
 * <LocationPrompt onLocationSet={(location) => console.log(location)} />
 * ```
 * 
 * @param {LocationPromptProps} props - Les props du composant
 * @returns {JSX.Element | null} Le composant ou null
 */
```

### Structure de Documentation
- **README.md** : Vue d'ensemble du projet
- **TECHNICAL.md** : Documentation technique détaillée
- **JSDoc** : Documentation inline du code
- **Tests** : Documentation des comportements

## 🚀 Déploiement

### Environnements
- **Development** : `localhost:3000`
- **Staging** : Vercel Preview
- **Production** : Vercel

### Variables d'Environnement
```env
# Production
NEXT_PUBLIC_APP_NAME=Edhaw 9as
NEXT_PUBLIC_APP_DESCRIPTION=Application de signalement de coupures d'électricité

# Development
NODE_ENV=development
```

## 🔮 Roadmap Technique

### Court Terme (1-2 mois)
- [ ] **PWA** : Service Worker pour offline
- [ ] **Notifications** : Push notifications
- [ ] **Analytics** : Google Analytics 4
- [ ] **Monitoring** : Sentry pour les erreurs

### Moyen Terme (3-6 mois)
- [ ] **Backend** : API REST avec Prisma
- [ ] **Base de données** : PostgreSQL
- [ ] **Authentification** : NextAuth.js
- [ ] **Real-time** : WebSockets

### Long Terme (6+ mois)
- [ ] **Mobile** : React Native
- [ ] **AI** : Détection automatique des patterns
- [ ] **API publique** : Documentation OpenAPI
- [ ] **Microservices** : Architecture distribuée

---

Cette documentation technique est maintenue à jour avec chaque évolution du projet. 