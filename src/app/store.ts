import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import HomePageReducer from './components/HomePage/HomePageSlice';

export const store = configureStore({
  reducer: {
    homePage: HomePageReducer,
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
