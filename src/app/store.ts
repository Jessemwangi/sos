import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';

import userSlice from '../features/userSlice';
import profileSlice from '../features/profileSlice';
import sosButtonSlice from '../features/sosButtonSlice';
import manageRecipientsSlice from '../features/manageRecipientsSlice';
import headerSlice from '../features/headerSlice';
import { firestoreApi } from './services/firestoreAPI';
import profileSlice2 from '../features/profileSlice2';



export const store = configureStore({
  reducer: {
    user: userSlice,
    profile: profileSlice,
    profile2: profileSlice2,
    sosButton: sosButtonSlice,
    manageRecipients: manageRecipientsSlice,
    header: headerSlice,
    [firestoreApi.reducerPath]: firestoreApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(firestoreApi.middleware),
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
