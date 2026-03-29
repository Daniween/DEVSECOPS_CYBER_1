# CVE_TABLE.md

> Ce fichier récapitule toutes les vulnérabilités identifiées et corrigées pour le TP DevSecOps.
> Les preuves sont dans le dossier `preuve`.

---

## Vulnérabilités des dépendances

| Vulnérabilité | Référence (CVE / Advisory) | Correctif appliqué (commande exacte) | Gravité | OWASP Top-10 (2021) | Preuve (fichiers dans `preuve/`) |
|---|---:|---|---|---|---|
| Injection de commande / ReDoS dans **lodash** | GHSA-35jh-r3h4-6jhm / GHSA-29mw-wpgm-hmr9 | `npm install lodash@4.17.21` | ÉLEVÉE | A03:2021 - Injection / A04:2021 - Conception non sécurisée | `preuve/npm_audit_pre.json` → `preuve/npm_audit_post.json` ; `preuve/snyk_post.json` |
| XSS / RCE via **serialize-javascript** | GHSA-h9rv-jmmf-4pgx / GHSA-hxcc-f52p-wc94 | `npm install serialize-javascript@3.1.0` | ÉLEVÉE | A03:2021 - Injection | `preuve/npm_audit_pre.json` → `preuve/npm_audit_post.json` ; `preuve/trivy_post.json` |
| Prototype pollution & failles crypto dans **node-forge** | GHSA-5rrq-pxf6-6jx5, GHSA-2r2c-g63r-vccr, GHSA-x4jg-mjrx-434g, GHSA-cfm4-qjh2-4765 | `npm install node-forge@1.3.1` | ÉLEVÉE | A02:2021 - Échecs cryptographiques / A08:2021 - Échecs d'intégrité logicielle | `preuve/snyk_post.json` ; `preuve/npm_audit_post.json` |

---

## Vulnérabilités de code (correction manuelle)

| Vulnérabilité | Fichier / Emplacement | Correctif appliqué (description & extrait) | Gravité | OWASP Top-10 (2021) | Preuve |
|---|---:|---|---|---|---|
| Exécution de code via `lodash.template()` | `routes/user.js` | Remplacement de `_.template()` par un remplacement de chaîne sécurisé (ex : `const out = safeTemplateReplace(templateString, data)`) | CRITIQUE | A03:2021 - Injection | `preuve/git_show_replace_lodash_template.txt` ; `preuve/npm_start_post.txt` |
| Sérialisation non sécurisée (option `unsafe: true`) | `utils/serializer.js` | Suppression de l'option `unsafe: true` et utilisation d'une fonction de sérialisation sûre (ex : `JSON.stringify`) | ÉLEVÉE | A03:2021 - Injection | `preuve/git_show_serializer_fix.txt` ; `preuve/npm_audit_post.json` |

---

## Secrets / Fuites de données

| Vulnérabilité | Fichier | Correctif appliqué (commande exacte) | Gravité | OWASP Top-10 (2021) | Preuve |
|---|---:|---|---|---|---|
| Secret commité (.env) | `.env` | `git rm --cached .env` + ajout `.env` dans `.gitignore` ; commit dédié | ÉLEVÉE | A01:2021 - Contrôle d'accès défaillant | `preuve/remove_secrets_commit.txt` ; `preuve/gitleaks_pre.json` → `preuve/gitleaks_post.json` |
| Clé publique/privée commise | `private-node.pem` / `private-node.pem.pub` | `git rm --cached private-node.pem private-node.pem.pub` + `.gitignore` + note dans README sur rotation de clés | ÉLEVÉE | A01:2021 - Contrôle d'accès défaillant | `preuve/remove_secrets_commit.txt` ; `preuve/gitleaks_post.json` |

---

## Résumé des correctifs appliqués

```bash
# 1) ajouts fichiers privé dans le.gitignore
- private-node.pem.pub 
- .env
- private-node.pem

# 2) Scan 

npm audit 
npm audit fix 

# 3) Mise à jour des dépendances vulnérables
npm install lodash@4.17.21
npm install node-forge@1.3.1
npm install serialize-javascript@3.1.0


# 4) Vérifications et logs génération des preuves
npm audit --json > preuve/npm_audit_post.json

snyk test --json > preuve/snyk_post.json || true

trivy fs --format json -o preuve/trivy_post.json . || true

gitleaks detect --report-format json --report-path preuve/gitleaks_post.json || true
