import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';

import userSlice from '../features/userSlice';
import profileSlice from '../features/profileSlice';
import sosButtonSlice from '../features/sosButtonSlice';
import manageRecipientsSlice from '../features/manageRecipientsSlice';
import headerSlice from '../features/headerSlice';
import customTextSlice from '../features/customTextSlice';
import signalSlice from '../features/signalSlice';
import { firestoreApi } from './services/firestoreAPI';
import { sosSignalApi } from '../features/sosMenuSlice';
import { customTextApi, } from '../features/customTextSlice';
import manageSignalSlice, { signalsListApi } from '../features/manageSignalSlice';



export const store = configureStore({
  reducer: {
    user: userSlice,
    profile: profileSlice,
    sosButton: sosButtonSlice,
    manageRecipients: manageRecipientsSlice,
    header: headerSlice,
    customText: customTextSlice,
    manageSignals: manageSignalSlice,
    signal: signalSlice,
    [firestoreApi.reducerPath]: firestoreApi.reducer,
    [sosSignalApi.reducerPath]: sosSignalApi.reducer,
    [customTextApi.reducerPath]: customTextApi.reducer,
    [signalsListApi.reducerPath]: signalsListApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(firestoreApi.middleware).concat(sosSignalApi.middleware).concat(customTextApi.middleware).concat(signalsListApi.middleware),
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
