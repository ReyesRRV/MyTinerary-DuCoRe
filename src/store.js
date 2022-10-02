import { configureStore } from "@reduxjs/toolkit";
import citiesAPI from "./features/citiesAPI";
import itineraryAPI from "./features/itineraryAPI";
import userAPI from "./features/usersAPI";
import { commentsAPI } from "./features/commentsAPI";
import { activitiesAPI } from "./features/activitiesAPI";

export default configureStore({
  reducer: {
    [citiesAPI.reducerPath]: citiesAPI.reducer,
    [itineraryAPI.reducerPath]: itineraryAPI.reducer,
    [userAPI.reducerPath]: userAPI.reducer,
    [activitiesAPI.reducerPath]: activitiesAPI.reducer,
    [commentsAPI.reducerPath]: commentsAPI.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
    .concat(citiesAPI.middleware)
    .concat(itineraryAPI.middleware)
    .concat(userAPI.middleware)
    .concat(activitiesAPI.middleware)
    .concat(commentsAPI.middleware),
});
