# Documentation CI/CD

## Continuous Integration (CI)

Pour reproduire les étapes de l'intégration continue (CI) à partir d'une Pull Request (PR), l'auteur de la PR doit suivre les étapes suivantes :

1. Créez une nouvelle branche à partir de la branche `main`.
2. Faites vos modifications de code sur cette nouvelle branche.
3. Une fois vos modifications terminées, faites un commit de ces modifications.
4. Push votre branche sur le dépôt distant.
5. Créez une nouvelle PR à partir de votre branche vers la branche `main`.

Lors de la création de la PR, la pipeline CI sera automatiquement déclenchée. Cette pipeline comprend les étapes suivantes :

- Checkout du code du dépôt
- Installation des dépendances du projet
- Exécution du linter pour vérifier le respect des conventions de code
- Exécution des tests pour s'assurer que le code fonctionne comme prévu
- Construction du projet, préparation pour le déploiement ou la livraison

Si toutes ces étapes sont réussies, la PR peut être fusionnée avec la branche `main`.
