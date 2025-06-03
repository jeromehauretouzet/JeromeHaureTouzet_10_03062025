import React from 'react'
import ReactDOM from 'react-dom/client'
import { Provider } from 'react-redux';
import { store } from './store/store';
import './styles/main.scss'
import App from './App.tsx'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    {/* L'exécution de App produit le Virtual DOM */}
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
)

/*
- C'est le point de départ de l'exécution de l'application
  on cible l'élément <div id="root"> dans index.html pour insérer le composant principal: AppRouter
*/
