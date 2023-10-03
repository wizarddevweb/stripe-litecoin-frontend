import { configureStore } from "@reduxjs/toolkit";

import appReducer from "./reducers/appReducer";

export const store = configureStore({
  reducer: {
    app: appReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});
