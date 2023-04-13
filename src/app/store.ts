import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import profileSlice, { profileApi } from '../features/profileSlice';
import headerSlice from '../features/headerSlice';
import manageRecipientsSlice, { manageRecipientsApi } from '../features/manageRecipientsSlice';
import customTextSlice, { customTextApi } from '../features/customTextSlice';
import signalHistorySlice, { signalHistoryApi } from '../features/signalHistorySlice';
import dashboardSlice from '../features/dashboardSlice';
import manageSignalSlice, { signalsListApi } from '../features/manageSignalSlice';


export const store = configureStore({
  reducer: {
    profile: profileSlice,
    manageRecipients: manageRecipientsSlice,
    header: headerSlice,
    customText: customTextSlice,
    manageSignals: manageSignalSlice,
    sosSignal: signalHistorySlice,
    dashboard: dashboardSlice,
    [profileApi.reducerPath]: profileApi.reducer,
    [signalHistoryApi.reducerPath]: signalHistoryApi.reducer,
    [customTextApi.reducerPath]: customTextApi.reducer,
    [signalsListApi.reducerPath]: signalsListApi.reducer,
    [manageRecipientsApi.reducerPath]: manageRecipientsApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(profileApi.middleware).concat(signalHistoryApi.middleware).concat(customTextApi.middleware).concat(signalsListApi.middleware).concat(manageRecipientsApi.middleware)
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
