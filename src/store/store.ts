import { configureStore } from '@reduxjs/toolkit';
import authSliceReducer from './features/auth/authSlice';

export const store = configureStore({
  reducer: {
    auth: authSliceReducer,
  },
});

/*
- Ce fichier configure le store Redux global de l'application.
*/