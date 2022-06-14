import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Signer } from 'ethers';
import { RootState } from '../../app/store';
import { connectWallet, getAddress, getSigner } from './walletAPI';

export type WalletStatus = 'connected' | 'not_connected' | 'failed_to_connect';

export interface WalletState {  
  status: WalletStatus;
  signer: Signer | null;
  address: string | null
}

const initialState: WalletState = {  
  status: 'not_connected',
  address: null,
  signer: null
};

export const connectWalletAsync = createAsyncThunk(
  'wallet/connectWallet',
  async () => {    
    await connectWallet();
    const signer = getSigner();
    const address = await getAddress(signer);

    return {
      signer,
      address
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
        state.address = action.payload.address;
      })
      .addCase(connectWalletAsync.rejected, (state) => {
        state.status = 'failed_to_connect';
      });
  },
});

/* export const { setStatus } = walletSlice.actions;

export const selectStatus = (state: RootState) => state.mintButton.status; */

export default walletSlice.reducer;
