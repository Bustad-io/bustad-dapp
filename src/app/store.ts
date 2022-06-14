import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import counterReducer from '../features/counter/counterSlice';
import currencyChoiceReducer from '../features/currencyChoice/currencyChoiceSlice';
import walletReducer from '../features/wallet/walletSlice';
import AddAccountChangeListener from './event-listeners';

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    currencyChoice: currencyChoiceReducer,
    wallet: walletReducer,
  },
});

AddAccountChangeListener(store.dispatch);

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
