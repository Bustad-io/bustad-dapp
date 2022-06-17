import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AppThunk, RootState } from '../../app/store';
import { parseToNumber } from '../../utils/format';
import { getContracts } from '../wallet/walletAPI';
import { calculateFromAmount, calculateToAmount } from './helper';
import { selectChosenCurrency } from '../currencyChoice/currencyChoiceSlice';

export interface MinterState {  
  rate: number;
  ETHPrice: number;
  mintingFee: number;
  fromAmount: string;
  toAmount: string;
}

const initialState: MinterState = {  
  rate: 0,
  ETHPrice: 0,
  mintingFee: 0,
  fromAmount: '',
  toAmount: ''
};

export const fetchRateAsync = createAsyncThunk(
  'minter/fetchRate',
  async () => {
    const { crowdsale } = getContracts();    
    const res = await crowdsale.callStatic.rate();
    return {
      rate: parseToNumber(res)
    }
  }
);

export const fetchEthPriceAsync = createAsyncThunk(
  'minter/fetchEthPrice',
  async () => {
    const { crowdsale } = getContracts();    
    const ethPrice = await crowdsale.callStatic.getLatestETHPrice();    
    
    return {
      price: parseToNumber(ethPrice),      
    }
  }
);

export const fetchMintingFeeAsync = createAsyncThunk(
  'minter/fetchMintingFee',
  async () => {
    const { bustadToken } = getContracts();        
    const fee = await bustadToken.callStatic.getMintingFee();
    
    return {      
      mintingFee: parseToNumber(fee)
    }
  }
);

export const minterSlice = createSlice({
  name: 'minter',
  initialState,  
  reducers: {
    setFromAmount: (state, action: PayloadAction<string>) => {
      state.fromAmount = action.payload;     
    },
    setToAmount: (state, action: PayloadAction<string>) => {
      state.toAmount = action.payload;     
    }
  },
  extraReducers: (builder) => {
    builder      
      .addCase(fetchRateAsync.fulfilled, (state, action) => {
        state.rate = action.payload.rate;        
      })
      .addCase(fetchEthPriceAsync.fulfilled, (state, action) => {
        state.ETHPrice = action.payload.price;        
      })
      .addCase(fetchMintingFeeAsync.fulfilled, (state, action) => {
        state.mintingFee = action.payload.mintingFee;        
      });
    }
  }
);

export const { setFromAmount, setToAmount } = minterSlice.actions;

export const selectRate = (state: RootState) => state.minter.rate;
export const selectEthPrice = (state: RootState) => state.minter.ETHPrice;
export const selectMintingFee = (state: RootState) => state.minter.mintingFee;
export const selectFromAmount = (state: RootState) => state.minter.fromAmount;
export const selectToAmount = (state: RootState) => state.minter.toAmount;

export const setFromAmountAndCalculateToAmount =
  (value: string): AppThunk =>
  (dispatch, getState) => {    
    console.log('value', value)
    const rate = selectRate(getState());
    const ethPrice = selectEthPrice(getState());
    const mintingFee = selectMintingFee(getState());
    const chosenCurrency = selectChosenCurrency(getState());
    
    const calculatedToAmount = calculateToAmount(Number(value), rate, chosenCurrency !== 'eth', ethPrice, mintingFee);

    dispatch(setFromAmount(value));
    dispatch(setToAmount(calculatedToAmount.toString()));    
  };


  export const setToAmountAndCalculateFromAmount =
  (value: string): AppThunk =>
  (dispatch, getState) => {
    const rate = selectRate(getState());
    const ethPrice = selectEthPrice(getState());
    const mintingFee = selectMintingFee(getState());
    const chosenCurrency = selectChosenCurrency(getState());

    const calculatedFromAmount = calculateFromAmount(Number(value), rate, chosenCurrency !== 'eth', ethPrice, mintingFee);

    dispatch(setToAmount(value));
    dispatch(setFromAmount(calculatedFromAmount.toString()));
  };


export default minterSlice.reducer;
