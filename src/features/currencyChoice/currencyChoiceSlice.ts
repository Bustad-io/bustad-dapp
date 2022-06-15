import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';

export type OptionType = 'usdc' | 'dai' | 'eth';

export interface CurrencyOption {  
  chosen: OptionType,
  options: OptionType[]
}

const initialState: CurrencyOption = {
  chosen: 'usdc',
  options: ["usdc", "dai", "eth"]
  
};

export const currencyChoiceSlice = createSlice({
  name: 'currencyChoice',
  initialState,  
  reducers: {
    setCurrency: (state, action: PayloadAction<OptionType>) => {      
      state.chosen = action.payload
    }
  }
});

export const { setCurrency } = currencyChoiceSlice.actions;

export const selectChosenCurrency = (state: RootState) => state.currencyChoice.chosen
export const selectCurrencyOptions = (state: RootState) => state.currencyChoice.options

export default currencyChoiceSlice.reducer;
