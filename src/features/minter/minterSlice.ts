import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';

export type WalletStatus = 'connected' | 'not_connected' | 'failed_to_connect';

export interface WalletState {  
  amountToSell: number;    
}

const initialState: WalletState = {  
  amountToSell: 0  
};

export const minterSlice = createSlice({
  name: 'minter',
  initialState,  
  reducers: {
    
  }
  }
);


export default minterSlice.reducer;
