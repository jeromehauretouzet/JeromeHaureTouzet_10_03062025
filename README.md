# Projet Argent Bank - Application Bancaire Front-End

Ce projet Argent Bank est le front-end d'une application bancaire.
Elle a été développée avec React, TypeScript, Vite, React Router et Redux Toolkit.

## Aperçu

L'application permet aux utilisateurs de se connecter, de visualiser leur profil, de modifier leur pseudonyme, et de se déconnecter.
Elle interagit avec un serveur back-end pour la gestion des données utilisateur et l'authentification.

## Prérequis

Avant de commencer, installer :

- Node.js
- Le serveur back-end Argent Bank (https://github.com/OpenClassrooms-Student-Center/ArgentBank-Backend)
- Exécuter le serveur back-end (npm run dev:server)

## Installation

Pour installer et lancer le projet en local, suivez ces étapes :

1.  **Cloner le dépôt :**

    ```bash
    git clone https://github.com/jeromehauretouzet/JeromeHaureTouzet_10_03062025.git
    cd JeromeHaureTouzet_10_03062025
    ```

2.  **Naviguer dans le dossier du projet :**
    Rendez vous dans le dossier principal: ` ArgentBank-Frontend`:

    ```bash
    cd ArgentBank-Frontend
    ```

3.  **Installer les dépendances du projet :**
    ```bash
    npm install
    ```

## Lancement du Projet en Mode Développement

Lancer le serveur de développement local :

1.  **Démarrer le serveur Vite :**
    ```bash
    npm run dev
    ```
2.  **Ouvrir l'application dans le navigateur :**
    Ouvrir l'application dans le navigateur à cette adresse : `http://localhost:5173/`

## Structure de l'application web (Principaux dossiers de `src/`)

- **`assets/`** : Contient les images, favicon, etc.
- **`components/`** : Contient les composants React réutilisables
- **`features/`** : Contient les "slices" Redux pour la gestion de l'état
- **`pages/`** : Contient les composants pour les différentes pages de l'application
- **`router/`** : Contient la configuration du routage de l'application (`AppRouter.tsx`).
- **`services/`** : Fonctions pour les appels API avec Axios
- **`store/`** : Contient la configuration du store Redux (`store.ts`).
- **`styles/`** : Contient les fichiers SCSS/CSS
- **`main.tsx`** : Le point de départ de l'exécution de l'application

## Technologies Clés

- React
- TypeScript
- Vite
- React Router DOM
- Redux Toolkit
- Axios
- Sass/CSS
