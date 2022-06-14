import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Signer } from 'ethers';
import { RootState } from '../../app/store';
import { connectWallet, getSigner } from './walletAPI';

export type WalletStatus = 'connected' | 'not_connected' | 'failed_to_connect';

export interface WalletState {  
  status: WalletStatus;
  signer: Signer | null;  
  account: string | null
}

const initialState: WalletState = {  
  status: 'not_connected',  
  signer: null,
  account: null
};

export const connectWalletAsync = createAsyncThunk(
  'wallet/connectWallet',
  async () => {    
    const accounts = await connectWallet();
    const signer = getSigner();    

    return {
      signer,
      account: accounts[0]
    }
  }
);

export const walletSlice = createSlice({
  name: 'wallet',
  initialState,  
  reducers: {
    /* setStatus: (state, action: PayloadAction<MintButtonStateStatus>) => {      
      state.status = action.payload
    } */
  },
  extraReducers: (builder) => {
    builder      
      .addCase(connectWalletAsync.fulfilled, (state, action) => {
        state.status = 'connected';
        state.signer = action.payload.signer;
        state.account = action.payload.account;
      })
      .addCase(connectWalletAsync.rejected, (state) => {
        state.status = 'failed_to_connect';
      });
  },
});

/* export const { setStatus } = walletSlice.actions;

*/
export const selectAccount = (state: RootState) => state.wallet.account;

export default walletSlice.reducer;
