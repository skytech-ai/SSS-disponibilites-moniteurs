# Disponibilités des moniteurs

Petite application web statique pour gérer les disponibilités des moniteurs aux entraînements du vendredi.

## Déploiement sur GitHub Pages

1. Créez un nouveau dépôt GitHub, par exemple `disponibilites-moniteurs`.
2. Ajoutez le fichier `index.html` à la racine du dépôt.
3. Dans le dépôt, ouvrez **Settings > Pages**.
4. Dans **Build and deployment**, choisissez **Deploy from a branch**.
5. Sélectionnez la branche `main` et le dossier `/(root)`, puis **Save**.
6. GitHub affichera ensuite l'adresse publique du site.

## Données

Les disponibilités sont stockées dans Supabase. La page contient uniquement l'URL du projet et la clé publique/publishable Supabase ; aucune clé `service_role` ne doit être utilisée côté navigateur.
