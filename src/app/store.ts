import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import counterReducer from '../features/counter/counterSlice';
import userSlice  from '../features/userSlice';
import  profileSlice  from '../features/Profile';

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    userSlice: userSlice,
    profile:profileSlice
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
