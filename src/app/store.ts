import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import currencyChoiceReducer from '../features/currencyChoice/currencyChoiceSlice';
import walletReducer from '../features/wallet/walletSlice';
import minterReducer from '../features/minter/minterSlice';
import dialogReducer from '../features/dialog/dialogSlice';
import wizardReducer from '../features/wizard/wizardSlice';
import adminReducer from '../features/admin/adminSlice';

import { AddWeb3EventListeners } from '../app/event-listeners';


export const store = configureStore({
  reducer: {    
    currencyChoice: currencyChoiceReducer,
    wallet: walletReducer,
    minter: minterReducer,
    dialog: dialogReducer,
    wizard: wizardReducer,
    admin: adminReducer
  },
});

const state = store.getState();

AddWeb3EventListeners(store.dispatch, state.wallet.network);

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
