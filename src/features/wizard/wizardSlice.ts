import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';

export type WalletChoice = 'coinbase' | 'metamask';

export interface WizardState {  
  chosenWallet: WalletChoice  
}

const initialState: WizardState = {  
  chosenWallet: 'coinbase'
  
};

export const wizardSlice = createSlice({
  name: 'wizard',
  initialState,  
  reducers: {
    setChosenWallet: (state, action: PayloadAction<WalletChoice>) => {
      state.chosenWallet = action.payload;
    }
  }
});

export const { setChosenWallet } = wizardSlice.actions;

export const selectChosenWallet = (state: RootState) => state.wizard.chosenWallet;

export default wizardSlice.reducer;
