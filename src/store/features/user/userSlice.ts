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
    }
  }
});

// --- Exporter les actions de notre slice profil utilisateur
export const { getProfileSuccess, getProfileFailure } = userProfileSlice.actions;

// Exporter le reducer pour notre store
export default userProfileSlice.reducer;