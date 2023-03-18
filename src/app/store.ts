import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import userSlice from '../features/userSlice';
import profileSlice from '../features/ProfileSlice';
import sosButtonSlice from '../features/sosButtonSlice';
import manageRecipientsSlice from '../features/manageRecipientsSlice';
import headerSlice from '../features/headerSlice';
import firestoreDataSlice, { firestoreApi } from '../features/firestoreDataSlice';
import firestoreProfileSlice, {firestoreProfileApi} from '../features/firestoreProfileSlice';



export const store = configureStore({
  reducer: {
    userSlice: userSlice,
    profile: profileSlice,
    sosButton: sosButtonSlice,
    manageRecipients: manageRecipientsSlice,
    header: headerSlice,
    firestoreData: firestoreDataSlice,
    firestoreProfileData : firestoreProfileSlice,
    [firestoreApi.reducerPath]: firestoreApi.reducer,
    [firestoreProfileApi.reducerPath]: firestoreProfileApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(firestoreApi.middleware).concat(firestoreProfileApi.middleware),
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
