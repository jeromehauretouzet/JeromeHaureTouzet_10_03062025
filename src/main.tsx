import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { store } from './store/store';
import './styles/main.scss';
import AppRouter from './router/AppRouter.tsx';
import { loginSuccess } from './store/features/auth/authSlice';


let token = localStorage.getItem('authToken');                          // --- Vérifier le token au chargement de l'application ---

if (!token) {
  token = sessionStorage.getItem('authToken');
}

if (token) {
  store.dispatch(loginSuccess({ token: token, rememberMe: true }));       // --- MAJ du store: l'utilisateur est connecté
}                                                                         // --- la connexion doit persister

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    {/* L'exécution de App produit le Virtual DOM */}
    <Provider store={store}>
      <AppRouter />
    </Provider>
  </React.StrictMode>
)

/*
- C'est le point de départ de l'exécution de l'application
  on cible l'élément <div id="root"> dans index.html pour insérer le composant principal: AppRouter
*/
