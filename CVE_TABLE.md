\# 📋 CVE\_TABLE.md



Ce tableau résume les vulnérabilités détectées et corrigées dans le projet.



| Vulnérabilité                                  | Référence (CVE / Advisory)             | Correctif appliqué (commande / version)                                | Gravité (CVSS / label) | OWASP Top-10 (2021)              |

|-----------------------------------------------|----------------------------------------|------------------------------------------------------------------------|-------------------------|----------------------------------|

| Injection de commande via templates            | CVE-2021-23337                          | `npm install lodash@4.17.21 --save`                                    | HIGH                    | A1: Broken Access Control        |

| ReDoS via fonctions `toNumber`, `trim`, etc.   | CVE-2020-28500                          | Inclus dans la mise à jour lodash 4.17.21                              | MEDIUM                  | A6: Vulnerable and Outdated Components |

| DoS via parsing de tableaux dans `qs`          | CVE-2025-15284                          | `npm install qs@6.14.1 --save`                                         | HIGH                    | A1 / A6                          |

| Signature forgeable - vérif incorrecte         | CVE-2022-24771                          | `npm install node-forge@1.3.2 --save`                                  | HIGH                    | A3: Injection                    |

| Open redirect dans node-forge                  | CVE-2022-0122                           | Inclus dans `node-forge@1.3.2`                                         | MEDIUM                  | A10: Server-Side Request Forgery |

| Integer overflow dans node-forge               | CVE-2025-66030                          | Inclus dans `node-forge@1.3.2`                                         | HIGH                    | A1 / A6                          |

| Prototype Pollution dans debug API             | GHSA-5rrq-pxf6-6jx5                     | Inclus dans `node-forge@1.3.2`                                         | LOW                     | A6: Vulnerable and Outdated Components |

| XSS via regex dans `serialize-javascript`      | CVE-2019-16769                          | `npm install serialize-javascript@3.1.0 --save`                        | MEDIUM                  | A7: Identification \& Auth Failures |

| Code injection via `deleteFunctions`           | CVE-2020-7660                           | Inclus dans `serialize-javascript@3.1.0`                               | HIGH                    | A1 / A3                          |

| Fuite de clé privée (secret dans Git)          | N/A (Secret détecté via Trivy/Gitleaks)| `git rm --cached private-node.pem` + ajout `.gitignore`               | HIGH                    | A2: Cryptographic Failures       |



---



\### 📸 Preuves de correction :

\- Tous les correctifs ont été \*\*poussés sur la branche `fix/security-levanawizman`\*\*

\- Les fichiers CI (`.github/workflows/\*.yml`) sont en place

\- Les scans Trivy, Gitleaks et Snyk passent en \*\*vert dans GitHub Actions\*\*

\- Résultat final de `trivy` local après correction : ✅ 0 vulnérabilité





