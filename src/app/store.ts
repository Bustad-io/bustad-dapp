import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import counterReducer from '../features/counter/counterSlice';
import currencyChoiceReducer from '../features/currencyChoice/currencyChoiceSlice';
import walletReducer from '../features/wallet/walletSlice';
import minterReducer from '../features/minter/minterSlice';
import dialogReducer from '../features/dialog/dialogSlice';

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    currencyChoice: currencyChoiceReducer,
    wallet: walletReducer,
    minter: minterReducer,
    dialog: dialogReducer
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
