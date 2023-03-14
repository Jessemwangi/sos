import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import counterReducer from '../features/counter/counterSlice';
import userSlice from '../features/userSlice';
import profileSlice from '../features/ProfileSlice';
import sosButtonSlice from '../features/sosButtonSlice';
import manageRecipientsSlice from '../features/manageRecipientsSlice';
import headerSlice from '../features/headerSlice';
import firestoreDataSlice from '../features/firestoreDataSlice';



export const store = configureStore({
  reducer: {
    counter: counterReducer,
    userSlice: userSlice,
    profile: profileSlice,
    sosButton: sosButtonSlice,
    manageRecipients: manageRecipientsSlice,
    header: headerSlice,
    firestoreData: firestoreDataSlice
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
