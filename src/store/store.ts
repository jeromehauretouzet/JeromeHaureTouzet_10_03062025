import { configureStore } from '@reduxjs/toolkit';

export const store = configureStore({
  reducer: {
    slice: (state = { property: "Le store est prêt" }) => state,
  },
});

/*
- Ce fichier configure le store Redux global de l'application.
*/