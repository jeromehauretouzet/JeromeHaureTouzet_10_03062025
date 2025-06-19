import { createSlice } from '@reduxjs/toolkit';

// --- Données Profil utilisateur ---
type UserProfileData = {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  userName: string;
  createdAt: string;
  updatedAt: string;
};

// --- State Profil utilisateur ---
type UserProfileState = {
  profile: UserProfileData | null;
  error: string | null;
};

// --- Initial State Authentification ---
const initialState: UserProfileState = {
  profile: null,
  error: null,
};

// --- Création du Slice pour le Profil Utilisateur ---
const userProfileSlice = createSlice({
  name: 'userProfile',                                                          // --- Nom du slice ---
  initialState,                                                                 // --- État initial ---
  reducers: {

    getProfileSuccess(state, action) {                                          // --- Reducer: Récupérer profil utilisateur ---
      state.profile = action.payload;                                           // --- Informations profile utilisateur ---
      state.error = null;
    },

    getProfileFailure(state, action) {
      state.profile = null;                                                     // --- Pas de profil ---
      state.error = action.payload.error;                                       // --- Erreur d'accès au profil utilisateur---
    },

    updateUsernameSuccess(state, action) {
      if (state.profile) {
        state.profile.userName = action.payload.userName;                       // --- Mettre à jour le pseudo ---
      }
      state.error = null;
    },

    updateUsernameFailure(state, action) {
      state.error = action.payload.error;                                       // --- Erreur lors de la mise à jour ---
    },

    clearUserProfile(state) {                                                   // --- Effacer le profil (utile au logout) ---
        state.profile = null;
        state.error = null;
    },

    clearProfileError(state) {                                                 // --- Effacer l'erreur (utile lors d'un cancel) ---
      state.error = null;
    }
  }
});

// --- Exporter les actions de notre slice profil utilisateur
export const { 
  getProfileSuccess, getProfileFailure,
  updateUsernameSuccess, updateUsernameFailure, clearUserProfile, clearProfileError
} = userProfileSlice.actions;

// Exporter le reducer pour notre store
export default userProfileSlice.reducer;