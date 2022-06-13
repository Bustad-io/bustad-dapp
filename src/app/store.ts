import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import counterReducer from '../features/counter/counterSlice';
import currencyChoiceReducer from '../features/currencyChoice/currencyChoiceSlice';

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    currencyChoice: currencyChoiceReducer,
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
