import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';
import { parseToNumber } from '../../utils/format';
import { getContracts } from '../wallet/walletAPI';

export interface MinterState {  
  rate: number;
  ETHPrice: number;
  mintingFee: number;
}

const initialState: MinterState = {  
  rate: 0,
  ETHPrice: 0,
  mintingFee: 0
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

export const selectRate = (state: RootState) => state.minter.rate;
export const selectEthPrice = (state: RootState) => state.minter.ETHPrice;
export const selectMintingFee = (state: RootState) => state.minter.mintingFee;


export default minterSlice.reducer;
