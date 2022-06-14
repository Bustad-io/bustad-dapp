import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';
import { connectWallet } from './walletAPI';

export type WalletStatus = 'connected' | 'not_connected' | 'failed_to_connect';

export interface WalletState {  
  status: WalletStatus;  
  account: string | null
}

const initialState: WalletState = {  
  status: 'not_connected',    
  account: null
};

export const connectWalletAsync = createAsyncThunk(
  'wallet/connectWallet',
  async () => {    
    const accounts = await connectWallet();    

    return {    
      account: accounts[0]
    }
  }
);

export const walletSlice = createSlice({
  name: 'wallet',
  initialState,  
  reducers: {
    setAccount: (state, action: PayloadAction<string>) => {      
      state.account = action.payload
    }
  },
  extraReducers: (builder) => {
    builder      
      .addCase(connectWalletAsync.fulfilled, (state, action) => {
        state.status = 'connected';        
        state.account = action.payload.account;
      })
      .addCase(connectWalletAsync.rejected, (state) => {
        state.status = 'failed_to_connect';
      });
  },
});

export const { setAccount } = walletSlice.actions;

export const selectAccount = (state: RootState) => state.wallet.account;
export const selectWalletStatus = (state: RootState) => state.wallet.status;

export default walletSlice.reducer;
