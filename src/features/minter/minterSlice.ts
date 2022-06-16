import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';
import { parseToNumber } from '../../utils/format';
import { getContracts } from '../wallet/walletAPI';

export interface MinterState {  
  rate: number;
  ETHPrice: number;
}

const initialState: MinterState = {  
  rate: 0,
  ETHPrice: 0
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
    const res = await crowdsale.callStatic.getLatestETHPrice();
    return {
      price: parseToNumber(res)
    }
  }
);

export const minterSlice = createSlice({
  name: 'minter',
  initialState,  
  reducers: {
    
  },
  extraReducers: (builder) => {
    builder      
      .addCase(fetchRateAsync.fulfilled, (state, action) => {
        state.rate = action.payload.rate;        
      })
      .addCase(fetchEthPriceAsync.fulfilled, (state, action) => {
        state.ETHPrice = action.payload.price;        
      });
    }
  }
);

export const selectRate = (state: RootState) => state.minter.rate;
export const selectEthPrice = (state: RootState) => state.minter.ETHPrice;


export default minterSlice.reducer;
