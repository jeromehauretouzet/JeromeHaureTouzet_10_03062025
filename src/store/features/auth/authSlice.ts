import { createSlice } from '@reduxjs/toolkit';

// --- State Authentification ---
type AuthState = {
  isAuthenticated: boolean;                                     // --- L'utilisateur est-il connecté ? (true/false)
  token: string | null;                                         // --- Le jeton JWT reçu du backend après une connexion réussie
  error: string | null;                                         // --- Un message d'erreur si la connexion échoue
};

// --- Initial State Authentification
const initialState: AuthState = {
  isAuthenticated: false,                                       // --- Au début, personne n'est connecté
  token: null,                                                  // --- Pas de token au début
  error: null,                                                  // --- Pas d'erreur au début
};

// --- Création du Slice d'Authentification ---
const authSlice = createSlice({
  name: 'auth',                                                 // --- Nom de la slice
  initialState,                                                 // --- Etat initial
  reducers: {                                                   
    
    loginSuccess(state, action) {                               // --- Reducer: connexion réussie

      state.isAuthenticated = true;                             // --- L'utilisateur est authentifié
      state.token = action.payload.token;                       // --- On stocke le token reçu dans le payload de l'action
      state.error = null;                                       // --- On efface les erreurs possibles

      if (action.payload.rememberMe && state.token) {           // --- Sauvegarder le token dans localstorage uniquement si remember me ---
        localStorage.setItem('authToken', state.token);         
      } else {
        localStorage.removeItem('authToken');
      }

    },
 
    loginFailure(state, action) {                               // --- Reducer: Echec de connexion
      state.isAuthenticated = false;                            // --- L'utilisateur n'est pas authentifié
      state.token = null;                                       // --- Pas de token
      state.error = action.payload.error;                       // --- Erreur d'authentification
    },

    logout(state) {                                             // --- Reducer: Déconnexion
      state.isAuthenticated = false;                            // --- L'utilisateur n'est plus authentifié
      state.token = null;                                       // --- On efface le token
      state.error = null;                                       // --- On efface les erreurs possibles

      localStorage.removeItem('authToken');                     // --- Supprimer le token du localStorage
    }
  } 
});

// --- Exporter les actions de notre slice d'authentification
export const { loginSuccess, loginFailure, logout } = authSlice.actions;

// --- Exporter le reducer  pour notre store
export default authSlice.reducer;