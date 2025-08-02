# Guide de Développement - Edhaw 9as

## 🚀 Démarrage Rapide

### Prérequis
```bash
# Vérifier Node.js (18+)
node --version

# Vérifier pnpm
pnpm --version

# Vérifier Git
git --version
```

### Installation
```bash
# Cloner le projet
git clone https://github.com/votre-username/edhaw-9ass.git
cd edhaw-9ass

# Installer les dépendances
pnpm install

# Lancer en développement
pnpm dev
```

## 🛠️ Workflow de Développement

### 1. **Création d'une Feature**
```bash
# Créer une nouvelle branche
git checkout -b feature/nom-de-la-feature

# Développer la feature
# ... code ...

# Tester
pnpm test
pnpm test:e2e

# Commiter avec un message conventionnel
git commit -m "feat: ajouter nouvelle fonctionnalité"

# Pousser la branche
git push origin feature/nom-de-la-feature
```

### 2. **Standards de Code**

#### TypeScript
```typescript
// ✅ Bon - Types explicites
interface UserProps {
  name: string;
  age: number;
  email?: string;
}

// ❌ Éviter - Types implicites
const user = { name: "John", age: 30 };
```

#### React Components
```typescript
// ✅ Bon - Composant fonctionnel avec JSDoc
/**
 * Composant d'affichage utilisateur
 * 
 * @param {UserProps} props - Les props du composant
 * @returns {JSX.Element} Le composant utilisateur
 */
export default function User({ name, age, email }: UserProps): JSX.Element {
  return (
    <div className="user-card">
      <h2>{name}</h2>
      <p>Age: {age}</p>
      {email && <p>Email: {email}</p>}
    </div>
  );
}
```

#### Tailwind CSS
```typescript
// ✅ Bon - Classes organisées
const buttonClasses = [
  'px-4',
  'py-2',
  'bg-blue-500',
  'hover:bg-blue-600',
  'text-white',
  'rounded-lg',
  'transition-colors'
].join(' ');

// ❌ Éviter - Classes en ligne longues
<button className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition-colors">
```

### 3. **Tests**

#### Tests Unitaires
```typescript
// src/__tests__/User.test.tsx
import { render, screen } from '@testing-library/react';
import User from '../components/User';

describe('User Component', () => {
  test('should render user information', () => {
    const userProps = {
      name: 'John Doe',
      age: 30,
      email: 'john@example.com'
    };

    render(<User {...userProps} />);

    expect(screen.getByText('John Doe')).toBeInTheDocument();
    expect(screen.getByText('Age: 30')).toBeInTheDocument();
    expect(screen.getByText('Email: john@example.com')).toBeInTheDocument();
  });

  test('should not render email when not provided', () => {
    const userProps = {
      name: 'John Doe',
      age: 30
    };

    render(<User {...userProps} />);

    expect(screen.queryByText(/Email:/)).not.toBeInTheDocument();
  });
});
```

#### Tests E2E
```typescript
// tests/e2e/user-flow.spec.ts
import { test, expect } from '@playwright/test';

test('user can complete full flow', async ({ page }) => {
  await page.goto('/');
  
  // Attendre la géolocalisation
  await expect(page.locator('[data-testid="location-success"]')).toBeVisible();
  
  // Cliquer sur le bouton de signalement
  await page.click('[data-testid="outage-button"]');
  
  // Sélectionner une catégorie
  await page.click('text=Maintenant');
  
  // Vérifier que le rapport apparaît
  await expect(page.locator('[data-testid="report-table"]')).toContainText('Maintenant');
});
```

## 📁 Structure des Fichiers

### Organisation des Composants
```
src/components/
├── ui/                    # Composants UI de base
│   ├── Button.tsx
│   ├── Input.tsx
│   └── Card.tsx
├── forms/                 # Composants de formulaires
│   ├── LocationForm.tsx
│   └── ReportForm.tsx
├── layout/               # Composants de mise en page
│   ├── Header.tsx
│   ├── Footer.tsx
│   └── Sidebar.tsx
└── features/             # Composants spécifiques aux features
    ├── outage/
    │   ├── OutageButton.tsx
    │   └── OutageList.tsx
    └── reports/
        ├── ReportChart.tsx
        └── ReportTable.tsx
```

### Organisation des Tests
```
src/__tests__/
├── components/           # Tests des composants
│   ├── ui/
│   ├── forms/
│   └── features/
├── contexts/            # Tests des contextes
├── utils/               # Tests des utilitaires
└── setup.ts            # Configuration des tests
```

## 🔧 Configuration

### ESLint
```json
// .eslintrc.json
{
  "extends": [
    "next/core-web-vitals",
    "@typescript-eslint/recommended",
    "prettier"
  ],
  "rules": {
    "@typescript-eslint/no-unused-vars": "error",
    "@typescript-eslint/explicit-function-return-type": "warn",
    "prefer-const": "error",
    "no-console": "warn"
  }
}
```

### Prettier
```json
// .prettierrc
{
  "semi": true,
  "trailingComma": "es5",
  "singleQuote": true,
  "printWidth": 80,
  "tabWidth": 2
}
```

### Husky
```json
// .husky/pre-commit
#!/bin/sh
. "$(dirname "$0")/_/husky.sh"

pnpm lint-staged
```

## 🧪 Bonnes Pratiques de Test

### 1. **Arrange-Act-Assert Pattern**
```typescript
test('should add report to list', () => {
  // Arrange
  const initialReports = [];
  const newReport = { id: 1, message: 'Test report' };
  
  // Act
  const updatedReports = addReport(initialReports, newReport);
  
  // Assert
  expect(updatedReports).toHaveLength(1);
  expect(updatedReports[0]).toEqual(newReport);
});
```

### 2. **Tests Isolés**
```typescript
// ✅ Bon - Test isolé
test('should format date correctly', () => {
  const date = new Date('2024-01-15T10:30:00Z');
  const formatted = formatDate(date);
  expect(formatted).toBe('15/01/2024 10:30');
});

// ❌ Éviter - Test dépendant d'autres tests
let sharedState = [];

test('should add item', () => {
  sharedState.push('item');
  expect(sharedState).toHaveLength(1);
});
```

### 3. **Mocks Appropriés**
```typescript
// Mock des APIs externes
jest.mock('../utils/api', () => ({
  fetchLocation: jest.fn().mockResolvedValue({
    latitude: 36.8065,
    longitude: 10.1815,
    address: 'Tunis, Tunisia'
  })
}));
```

## 🎨 Guidelines UI/UX

### 1. **Accessibilité**
```typescript
// ✅ Bon - Accessible
<button
  aria-label="Signaler une coupure"
  onClick={handleReport}
  className="outage-button"
>
  <Icon name="warning" />
  Signaler
</button>

// ❌ Éviter - Pas accessible
<div onClick={handleReport} className="outage-button">
  Signaler
</div>
```

### 2. **Responsive Design**
```typescript
// ✅ Bon - Classes responsive
<div className="
  w-full 
  md:w-1/2 
  lg:w-1/3 
  p-4 
  md:p-6 
  lg:p-8
">
  Content
</div>
```

### 3. **Thèmes**
```typescript
// ✅ Bon - Support des thèmes
<div className="
  bg-white 
  dark:bg-gray-800 
  text-gray-900 
  dark:text-gray-100
">
  Content
</div>
```

## 🔄 Git Workflow

### 1. **Commits Conventionnels**
```bash
# Types de commits
feat: nouvelle fonctionnalité
fix: correction de bug
docs: documentation
style: formatage
refactor: refactoring
test: ajout de tests
chore: tâches de maintenance
```

### 2. **Branches**
```bash
# Branches principales
main          # Production
develop       # Développement
feature/*     # Nouvelles fonctionnalités
bugfix/*      # Corrections de bugs
hotfix/*      # Corrections urgentes
```

### 3. **Pull Requests**
```markdown
## Description
Brève description des changements

## Type de changement
- [ ] Bug fix
- [ ] Nouvelle fonctionnalité
- [ ] Breaking change
- [ ] Documentation

## Tests
- [ ] Tests unitaires passent
- [ ] Tests E2E passent
- [ ] Build réussit

## Checklist
- [ ] Code formaté avec Prettier
- [ ] ESLint sans erreurs
- [ ] Documentation mise à jour
- [ ] Tests ajoutés si nécessaire
```

## 🚀 Déploiement

### 1. **Environnements**
```bash
# Development
pnpm dev

# Staging
pnpm build
pnpm start

# Production
docker build -t edhaw-9ass .
docker run -p 3000:3000 edhaw-9ass
```

### 2. **Variables d'Environnement**
```env
# .env.local
NEXT_PUBLIC_APP_NAME=Edhaw 9as
NEXT_PUBLIC_APP_DESCRIPTION=Application de signalement de coupures d'électricité
NODE_ENV=development
```

### 3. **CI/CD Pipeline**
```yaml
# .github/workflows/ci.yml
name: CI/CD
on: [push, pull_request]

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: '18'
      - run: pnpm install
      - run: pnpm lint
      - run: pnpm test
      - run: pnpm test:e2e
      - run: pnpm build
```

## 🔍 Debugging

### 1. **Logs de Développement**
```typescript
// ✅ Bon - Logs conditionnels
if (process.env.NODE_ENV === 'development') {
  console.log('Debug info:', data);
}

// ❌ Éviter - Logs en production
console.log('Debug info:', data);
```

### 2. **React DevTools**
```typescript
// Profiling des composants
import { Profiler } from 'react';

function onRenderCallback(id, phase, actualDuration) {
  console.log(`Component ${id} took ${actualDuration}ms to render`);
}

<Profiler id="App" onRender={onRenderCallback}>
  <App />
</Profiler>
```

### 3. **Tests de Performance**
```typescript
// Test de performance
test('should render within performance budget', () => {
  const start = performance.now();
  
  render(<ComplexComponent />);
  
  const end = performance.now();
  const duration = end - start;
  
  expect(duration).toBeLessThan(100); // 100ms max
});
```

## 📚 Ressources

### Documentation
- [Next.js Documentation](https://nextjs.org/docs)
- [React Documentation](https://react.dev)
- [TypeScript Handbook](https://www.typescriptlang.org/docs)
- [Tailwind CSS](https://tailwindcss.com/docs)
- [Jest Documentation](https://jestjs.io/docs)
- [Playwright Documentation](https://playwright.dev)

### Outils
- [React DevTools](https://chrome.google.com/webstore/detail/react-developer-tools)
- [Redux DevTools](https://chrome.google.com/webstore/detail/redux-devtools)
- [ESLint](https://eslint.org)
- [Prettier](https://prettier.io)

---

Ce guide est maintenu à jour avec les meilleures pratiques de développement. 