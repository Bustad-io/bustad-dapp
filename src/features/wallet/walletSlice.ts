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
  allowance: WalletAllowance;
}

export interface WalletBalance {
  loading: boolean;
  eth: number;
  bustadToken: number;
  dai: number;
  usdc: number;
}

export interface WalletAllowance {  
  dai: number;
  usdc: number;
}

const initialState: WalletState = {  
  status: 'not_connected',    
  account: null,
  allowance: {
    dai: 0,
    usdc: 0
  },  
  balance: {
    loading: false,
    eth: 0,
    bustadToken: 0,
    dai: 0,
    usdc: 0
  }
};

export const fetchAllowanceAsync = createAsyncThunk(
  'wallet/fetchAllowance',
  async (_, {getState}) => {
    const state = getState() as RootState;

    if(state.wallet.status !== 'connected') {
      throw Error('Wallet not connected');
    }

    const { dai, usdc, crowdsale } = getContracts();    

    const daiAllowance = await dai.allowance(state.wallet.account, crowdsale.address);
    const usdcAllowance = await usdc.allowance(state.wallet.account, crowdsale.address);    

    return {          
      allowance: {
        dai: parseToNumber(daiAllowance),
        usdc: parseToNumber(usdcAllowance),
      }
    }
  }
);

export const fetchBalanceAsync = createAsyncThunk(
  'wallet/fetchBalance',
  async (_, {getState}) => {    
    const state = getState() as RootState;

    if(state.wallet.status !== 'connected') {
      throw Error('Wallet not connected');
    }

    const provider =  getProvider();  

    const { bustadToken, dai } = getContracts();

    const ethBalance = await provider.getBalance(state.wallet.account!);
    const bustadBalance = await bustadToken.balanceOf(state.wallet.account);    
    const daiBalance = await dai.balanceOf(state.wallet.account);    

    return {          
      balance: {
        loading: false,
        eth: parseToNumber(ethBalance),
        bustadToken: parseToNumber(bustadBalance),
        dai: parseToNumber(daiBalance),
        usdc: 0,
      }      
    }
  }
);

export const connectWalletAsync = createAsyncThunk(
  'wallet/connectWallet',
  async () => {    
    const accounts = await connectWallet();
    const account = accounts[0];    
    return {    
      account      
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
      .addCase(connectWalletAsync.pending, (state) => {
        state.status = 'loading';        
      })
      .addCase(connectWalletAsync.rejected, (state) => {
        state.status = 'failed_to_connect';
      })
      .addCase(fetchBalanceAsync.fulfilled, (state, action) => {          
        state.balance = action.payload.balance;
      })
      .addCase(fetchBalanceAsync.pending, (state) => {                
        state.balance.loading = true;
      })
      .addCase(fetchBalanceAsync.rejected, (state) => {                
        state.balance.loading = false;
      })
      .addCase(fetchAllowanceAsync.fulfilled, (state, action) => {          
        state.allowance = action.payload.allowance;
      });
  },
});

export const { setAccount } = walletSlice.actions;

export const selectAccount = (state: RootState) => state.wallet.account;
export const selectWalletStatus = (state: RootState) => state.wallet.status;
export const selectWalletBalance = (state: RootState) => state.wallet.balance;
export const selectWalletAllowance = (state: RootState) => state.wallet.allowance;

export default walletSlice.reducer;
