import { configureStore } from '@reduxjs/toolkit';

import authSliceReducer from './features/auth/authSlice';
import userSliceReducer from './features/user/userSlice';

export const store = configureStore({
  reducer: {
    auth: authSliceReducer,
    userProfile: userSliceReducer,
  },
});

/*
- Ce fichier configure le store Redux global de l'application.
*/