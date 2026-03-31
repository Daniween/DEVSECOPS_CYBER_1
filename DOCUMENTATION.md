# Audit de Sécurité - BTS DevSecOps

**Auteur** : Gabin Capelle  
**Date** : 4 novembre 2025  
**Branche** : `fix/sercurity-GabinCapelle`

---

## Step 1 : Ajout des GitHub Actions + Scan

### 🔧 GitHub Actions configurées

- **.github/workflows/trivy-scan.yml** : Scan des vulnérabilités CVE
- **.github/workflows/snyk-scan.yml** : Scan avancé des dépendances
- **.github/workflows/gitleaks.yml** : Détection des secrets exposés

### 📊 Résultats des scans

**Trivy** : 10 CVE détectées (lodash, node-forge, serialize-javascript)  
**Snyk** : 2 CVE supplémentaires (serialize-javascript)  
**GitLeaks** : 2 secrets critiques exposés

- AWS Access Token dans `.env`
- Clé privée SSH dans `private-node.pem`

---

## Step 2 : Tableau CVE (voir [Tableau des vulnérabilité (CVE)](CVE_TABLE.mdW))

### Résumé : 16 vulnérabilités détectées

| Gravité  | Nombre |
| -------- | ------ |
| CRITICAL | 4      |
| HIGH     | 5      |
| MEDIUM   | 5      |
| LOW      | 2      |


## Step 3 : Mise à jour des dépendances

### Avant

```json
"lodash": "4.17.20",
"serialize-javascript": "2.1.0",
"node-forge": "0.10.0"
```

### Après

```json
"lodash": "^4.17.21",
"node-forge": "^1.3.1",
"serialize-javascript": "7.0.0"
```

### Commande

```bash
npm install
```

### Résultat

✅ `found 0 vulnerabilities`

---

## Step 4 : Vulnérabilités dans le code

### 🔴 1. Template Injection (CRITICAL)

**Fichier** : `routes/user.js:7`  
**Problème** : L'utilisateur peut injecter du code via `req.body.template`

```javascript
const userTemplate = req.body.template || "<%= name %>";
```

### 🔴 2. Unsafe Serialization (CRITICAL)

**Fichier** : `utils/serializer.js:4`  
**Problème** : Option `unsafe: true` permet l'injection de code

```javascript
return serialize(obj, { unsafe: true });
```

---

## Step 5 : Ajout au tableau CVE_TABLE.md

| Package | Vulnérabilité        | Correctif        | Gravité  | OWASP   |
| ------- | -------------------- | ---------------- | -------- | ------- |
| Code    | Template Injection   | Template fixe    | CRITICAL | A03     |
| Code    | Unsafe Serialization | Supprimer unsafe | CRITICAL | A03/A08 |

---

## Step 6 : Corrections appliquées

### ✅ Fix 1 : Template Injection

```javascript
// routes/user.js
const userTemplate = "<%= name %>"; // Template fixe, pas d'input utilisateur
```

### ✅ Fix 2 : Unsafe Serialization

```javascript
// routes/user.js
const { safeSerialize } = require("../utils/serializer");
const s = safeSerialize(payload);

// utils/serializer.js
function safeSerialize(obj) {
  return serialize(obj); // unsafe: true supprimé
}
```

### ✅ Fix 3 : Protection des secrets

```gitignore
.env
*.pem
```
