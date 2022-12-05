import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';

export type OptionType = 'usdc' | 'dai' | 'eth';

export interface CurrencyOption {
  value: OptionType,
  img: string
}

export interface CurrencyChoice {
  chosenOption: CurrencyOption,
  options: CurrencyOption[]
}

const initialState: CurrencyChoice = {
  chosenOption: {
    value: 'eth',
    img: 'https://cryptologos.cc/logos/ethereum-eth-logo.svg?v=022'
  },
  options: [
    {
      value: 'eth',
      img: 'https://cryptologos.cc/logos/ethereum-eth-logo.svg?v=022'
    },
    {
      value: 'usdc',
      img: 'https://cryptologos.cc/logos/usd-coin-usdc-logo.svg?v=022'
    },
    {
      value: 'dai',
      img: 'https://cryptologos.cc/logos/multi-collateral-dai-dai-logo.svg?v=022'
    }
  ]
};

export const currencyChoiceSlice = createSlice({
  name: 'currencyChoice',
  initialState,
  reducers: {
    setCurrency: (state, action: PayloadAction<CurrencyOption>) => {
      state.chosenOption = action.payload
    }
  }
});

export const { setCurrency } = currencyChoiceSlice.actions;

export const selectChosenCurrency = (state: RootState) => state.currencyChoice.chosenOption.value
export const selectChosenOption = (state: RootState) => state.currencyChoice.chosenOption
export const selectCurrencyOptions = (state: RootState) => state.currencyChoice.options

export default currencyChoiceSlice.reducer;
