# 🐳 Docker Guide - Edhaw-9ass

## 📋 **Vue d'ensemble**

Ce projet supporte plusieurs configurations Docker pour différents environnements :

- **Node.js** : Pour le développement et la production
- **Nginx** : Pour servir l'application statique en production
- **Docker Compose** : Pour orchestrer les services

## 🚀 **Démarrage Rapide**

### Développement avec Docker Compose

```bash
# Démarrer l'environnement de développement
pnpm docker:compose-dev

# Ou avec docker-compose directement
docker-compose up app-dev
```

### Production avec Nginx

```bash
# Construire et démarrer avec Nginx
pnpm docker:compose-prod

# Ou manuellement
pnpm docker:build-nginx
pnpm docker:run-nginx
```

## 🛠 **Commandes Docker**

### Build des Images

```bash
# Build Node.js
pnpm docker:build

# Build Nginx
pnpm docker:build-nginx

# Build avec Docker Compose
docker-compose build
```

### Exécution

```bash
# Node.js (port 3000)
pnpm docker:run

# Nginx (port 80)
pnpm docker:run-nginx

# Tous les services
pnpm docker:compose
```

### Maintenance

```bash
# Nettoyer Docker
pnpm docker:clean

# Voir les logs
docker-compose logs -f

# Arrêter les services
docker-compose down
```

## 📁 **Structure des Fichiers**

```
├── Dockerfile              # Image Node.js
├── Dockerfile.nginx        # Image Nginx
├── docker-compose.yml      # Orchestration
├── nginx.conf             # Configuration Nginx
├── .dockerignore          # Fichiers ignorés
└── .github/workflows/     # CI/CD
    ├── ci-cd.yml         # Pipeline principal
    └── deploy.yml        # Déploiement releases
```

## 🔧 **Configurations**

### Node.js (Dockerfile)

- **Base** : `node:18-alpine`
- **Port** : 3000
- **User** : `nextjs` (non-root)
- **Optimisations** : Multi-stage build

### Nginx (Dockerfile.nginx)

- **Base** : `nginx:alpine`
- **Port** : 80
- **Features** : Gzip, cache, sécurité
- **Health check** : `/health`

### Docker Compose

- **app-dev** : Développement avec hot reload
- **app-prod** : Production Node.js
- **app-nginx** : Production Nginx

## 🔒 **Sécurité**

### Headers de Sécurité

```nginx
X-Frame-Options: SAMEORIGIN
X-XSS-Protection: 1; mode=block
X-Content-Type-Options: nosniff
Referrer-Policy: no-referrer-when-downgrade
Content-Security-Policy: default-src 'self' http: https: data: blob: 'unsafe-inline'
```

### Bonnes Pratiques

- ✅ User non-root
- ✅ Images minimales (Alpine)
- ✅ Multi-stage builds
- ✅ Health checks
- ✅ Security headers
- ✅ Cache optimisé

## 🚀 **CI/CD**

### GitHub Actions

Le pipeline automatique inclut :

1. **Tests** : Lint, type-check, unit tests
2. **Build** : Images Docker optimisées
3. **Security** : Scan Trivy
4. **Deploy** : Staging/Production

### Déploiement

```bash
# Staging (branche develop)
git push origin develop

# Production (branche main)
git push origin main

# Release
git tag v1.0.0
git push origin v1.0.0
```

## 📊 **Monitoring**

### Health Check

```bash
# Vérifier la santé
curl http://localhost/health

# Logs Nginx
docker-compose logs app-nginx
```

### Métriques

- **Performance** : Gzip compression
- **Cache** : Assets statiques
- **Sécurité** : Headers configurés
- **Disponibilité** : Health checks

## 🔧 **Troubleshooting**

### Problèmes Courants

1. **Port déjà utilisé**

   ```bash
   docker-compose down
   docker-compose up -d
   ```

2. **Build échoue**

   ```bash
   pnpm clean
   docker system prune -f
   pnpm docker:build
   ```

3. **Permissions**
   ```bash
   sudo chown -R $USER:$USER .
   ```

### Logs

```bash
# Logs en temps réel
docker-compose logs -f app-nginx

# Logs spécifiques
docker logs edhaw-9ass-nginx
```

## 📚 **Ressources**

- [Docker Documentation](https://docs.docker.com/)
- [Nginx Configuration](https://nginx.org/en/docs/)
- [GitHub Actions](https://docs.github.com/en/actions)
- [Next.js Docker](https://nextjs.org/docs/deployment#docker-image)

---

**🎯 Prêt pour la production !**
