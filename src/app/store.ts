import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';

import userSlice from '../features/userSlice';
import profileSlice from '../features/profileSlice';
import sosButtonSlice from '../features/sosButtonSlice';
import manageRecipientsSlice from '../features/manageRecipientsSlice';
import headerSlice from '../features/headerSlice';
import { firestoreApi } from './services/firestoreAPI';
import { sosSignalApi } from '../features/sosMenuSlice';


export const store = configureStore({
  reducer: {
    user: userSlice,
    profile: profileSlice,
    sosButton: sosButtonSlice,
    manageRecipients: manageRecipientsSlice,
    header: headerSlice,
    [firestoreApi.reducerPath]: firestoreApi.reducer,
    [sosSignalApi.reducerPath]: sosSignalApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(firestoreApi.middleware).concat(sosSignalApi.middleware),
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
