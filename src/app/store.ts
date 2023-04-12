import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import profileSlice from '../features/profileSlice';
import sosButtonSlice from '../features/sosButtonSlice';
import manageRecipientsSlice, { manageRecipientsApi } from '../features/manageRecipientsSlice';
import headerSlice from '../features/headerSlice';
import customTextSlice from '../features/customTextSlice';
import signalSlice from '../features/signalSlice';
import { profileApi } from '../features/profileApi';
import { sosSignalApi } from '../features/sosMenuSlice';
import { customTextApi, } from '../features/customTextSlice';
import manageSignalSlice, { signalsListApi } from '../features/manageSignalSlice';

export const store = configureStore({
  reducer: {
    profile: profileSlice,
    sosButton: sosButtonSlice,
    manageRecipients: manageRecipientsSlice,
    header: headerSlice,
    customText: customTextSlice,
    manageSignals: manageSignalSlice,
    signal: signalSlice,
    [profileApi.reducerPath]: profileApi.reducer,
    [sosSignalApi.reducerPath]: sosSignalApi.reducer,
    [customTextApi.reducerPath]: customTextApi.reducer,
    [signalsListApi.reducerPath]: signalsListApi.reducer,
    [manageRecipientsApi.reducerPath]: manageRecipientsApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(profileApi.middleware).concat(sosSignalApi.middleware).concat(customTextApi.middleware).concat(signalsListApi.middleware).concat(manageRecipientsApi.middleware)
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
