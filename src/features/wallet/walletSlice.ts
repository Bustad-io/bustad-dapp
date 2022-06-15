import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';
import { parseToNumber, toEther } from '../../utils/format';
import { connectWallet, getContracts, getProvider } from './walletAPI';
import { Dai } from '../../typechain/Dai.d';

export type WalletStatus = 'connected' | 'not_connected' | 'failed_to_connect' | 'loading';

export interface WalletState {  
  status: WalletStatus;  
  account: string | null;  
  balance: WalletBalance;
}

export interface WalletBalance {
  eth: number;
  bustadToken: number;
  dai: number;
  usdc: number;
}

const initialState: WalletState = {  
  status: 'not_connected',    
  account: null,
  balance: {
    eth: 0,
    bustadToken: 0,
    dai: 0,
    usdc: 0
  }
};

export const connectWalletAsync = createAsyncThunk(
  'wallet/connectWallet',
  async () => {
    const provider =  getProvider();

    const accounts = await connectWallet();
    const account = accounts[0];

    const { bustadToken } = getContracts();

    const ethBalance = await provider.getBalance(account);
    const bustadBalance = await bustadToken.balanceOf(account);

    return {    
      account,
      balance: {
        eth: parseToNumber(ethBalance),
        bustadToken: parseToNumber(bustadBalance),
        usdc: 0,
        dai: 0
      }      
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
        state.balance = action.payload.balance;
      })
      .addCase(connectWalletAsync.pending, (state) => {
        state.status = 'loading';        
      })
      .addCase(connectWalletAsync.rejected, (state) => {
        state.status = 'failed_to_connect';
      });
  },
});

export const { setAccount } = walletSlice.actions;

export const selectAccount = (state: RootState) => state.wallet.account;
export const selectWalletStatus = (state: RootState) => state.wallet.status;
export const selectWalletBalance = (state: RootState) => state.wallet.balance;

export default walletSlice.reducer;
