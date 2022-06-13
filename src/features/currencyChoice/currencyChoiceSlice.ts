import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';

export interface CurrencyOption {  
  chosen: string,
  options: string[]
}

const initialState: CurrencyOption = {
  chosen: 'USDC',
  options: ["USDC", "DAI", "ETH"]
  
};

export const currencyChoiceSlice = createSlice({
  name: 'currencyChoice',
  initialState,  
  reducers: {
    setCurrency: (state, action: PayloadAction<string>) => {      
      state.chosen = action.payload
    }
  }
});

export const { setCurrency } = currencyChoiceSlice.actions;

export const selectChosenCurrency = (state: RootState) => state.currencyChoice.chosen
export const selectCurrencyOptions = (state: RootState) => state.currencyChoice.options

export default currencyChoiceSlice.reducer;
