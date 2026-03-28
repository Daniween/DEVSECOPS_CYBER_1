# Tableau des Vulnérabilités (CVE_TABLE.md)

## Vulnérabilités des Dépendances

| Vulnérabilité | Référence | Correctif appliqué | Gravité | OWASP Top-10 (2021) |
|---------------|-----------|-------------------|---------|---------------------|
| Injection de commande dans lodash | GHSA-35jh-r3h4-6jhm | `npm install lodash@^4.17.21` | ÉLEVÉE | A03:2021 - Injection |
| Déni de service par expression régulière (ReDoS) dans lodash | GHSA-29mw-wpgm-hmr9 | `npm install lodash@^4.17.21` | MODÉRÉE | A04:2021 - Conception non sécurisée |
| Cross-Site Scripting (XSS) dans serialize-javascript | GHSA-h9rv-jmmf-4pgx | `npm install serialize-javascript@^3.1.0` | MODÉRÉE | A03:2021 - Injection |
| Exécution de code à distance (RCE) dans serialize-javascript | GHSA-hxcc-f52p-wc94 | `npm install serialize-javascript@^3.1.0` | ÉLEVÉE | A03:2021 - Injection |
| Pollution de prototype dans node-forge | GHSA-5rrq-pxf6-6jx5 | `npm install node-forge@^1.3.1` | FAIBLE | A08:2021 - Échecs d'intégrité logicielle et des données |
| Problèmes cryptographiques dans node-forge | GHSA-2r2c-g63r-vccr, GHSA-x4jg-mjrx-434g, GHSA-cfm4-qjh2-4765 | `npm install node-forge@^1.3.1` | ÉLEVÉE | A02:2021 - Échecs cryptographiques |

## Vulnérabilités de Code

| Vulnérabilité | Référence | Correctif appliqué | Gravité | OWASP Top-10 (2021) |
|---------------|-----------|-------------------|---------|---------------------|
| Exécution de code à distance via lodash.template | routes/user.js | Remplacement par remplacement de chaîne sécurisé | CRITIQUE | A03:2021 - Injection |
| Sérialisation non sécurisée | utils/serializer.js | Suppression de l'option unsafe: true | ÉLEVÉE | A03:2021 - Injection |

## Secrets

| Vulnérabilité | Référence | Correctif appliqué | Gravité | OWASP Top-10 (2021) |
|---------------|-----------|-------------------|---------|---------------------|
| Secret commité (clé SSH) | private-node.pem.pub | `git rm --cached private-node.pem.pub` + .gitignore | ÉLEVÉE | A01:2021 - Contrôle d'accès défaillant |

## Résumé des Correctifs

### 1. Mise à jour des dépendances
```bash
npm install lodash@^4.17.21 serialize-javascript@^3.1.0 node-forge@^1.3.1
```

### 2. Correction du code
- **routes/user.js** : Remplacement de `lodash.template()` par remplacement de chaîne sécurisé
- **utils/serializer.js** : Suppression de l'option `unsafe: true`

### 3. Gestion des secrets
- **.gitignore** : Ajout des patterns pour exclure les fichiers de secrets
- **Suppression Git** : `git rm --cached private-node.pem.pub` (commit séparé)

## Validation

- `npm audit` : ✅ 0 vulnérabilités détectées
- Workflows GitHub Actions configurés pour valider les corrections
