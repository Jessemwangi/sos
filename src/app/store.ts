import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import counterReducer from '../features/counter/counterSlice';
import userSlice from '../features/userSlice';
import profileSlice from '../features/ProfileSlice';
import sosButtonSlice from '../features/sosButtonSlice';
import manageRecipientsSlice from '../features/manageRecipientsSlice';

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    userSlice: userSlice,
    profile: profileSlice,
    activeSOS: sosButtonSlice,
    manageRecipients: manageRecipientsSlice,
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
