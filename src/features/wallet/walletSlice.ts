import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AppThunk, RootState } from '../../app/store';
import { formatUnitToNumber, parseToNumber } from '../../utils/format';
import { CoinContractConfig } from '../../config';
import { connectWallet, getContracts, getProvider, getSigner, web3Modal } from '../../providers/web3.provider';

export type WalletStatus = 'connected' | 'not_connected' | 'failed_to_connect' | 'loading';

export interface WalletState {  
  status: WalletStatus;  
  account: string | null;  
  balance: WalletBalance;
  allowance: WalletAllowance;
  governance: WalletGovernance;
}

export interface WalletBalance {
  loading: boolean;
  eth: number;
  bustadToken: number;
  dai: number;
  usdc: number;
  govToken: number;
}

export interface WalletAllowance {  
  dai: number;
  usdc: number;
}

export interface WalletGovernance {
  distributionShare: number;
}

const initialState: WalletState = {  
  status: 'not_connected',    
  account: null,
  governance: {
    distributionShare: 0
  },
  allowance: {
    dai: 0,
    usdc: 0
  },  
  balance: {
    loading: false,
    eth: 0,
    bustadToken: 0,
    dai: 0,
    usdc: 0,
    govToken: 0
  }
};

export const fetchGovernanceDistributorShareAsync = createAsyncThunk(
  'wallet/fetchGovernanceDistributorShare',
  async (_, {getState}) => {
    const state = getState() as RootState;

    if(state.wallet.status !== 'connected') {
      throw Error('Wallet not connected');
    }

    const { govDist } = getContracts();    

    const distAmount = await govDist.getGovTokenShareForUser(state.wallet.account);

    return {
      distributionShare: parseToNumber(distAmount)
    }
  }
);

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
        dai: formatUnitToNumber(daiAllowance, CoinContractConfig.dai.decimal),
        usdc: formatUnitToNumber(usdcAllowance, CoinContractConfig.usdc.decimal),
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

    if(!state.wallet.account) {      
      throw Error('Account not connected');
    }

    const provider =  getProvider();  

    const { bustadToken, govToken, dai, usdc } = getContracts();

    const ethBalance = await provider.getBalance(state.wallet.account!);
    const bustadBalance = await bustadToken.balanceOf(state.wallet.account);
    const govBalance = await govToken.balanceOf(state.wallet.account);
    const daiBalance = await dai.balanceOf(state.wallet.account);    
    const usdcBalance = await usdc.balanceOf(state.wallet.account);    

    return {          
      balance: {
        loading: false,
        eth: parseToNumber(ethBalance),
        bustadToken: parseToNumber(bustadBalance),
        govToken: parseToNumber(govBalance),
        dai: formatUnitToNumber(daiBalance, CoinContractConfig.dai.decimal),
        usdc: formatUnitToNumber(usdcBalance, CoinContractConfig.usdc.decimal),
      }      
    }
  }
);

export const connectWalletAsync = createAsyncThunk(
  'wallet/connectWallet',
  async () => {    
    await connectWallet();    
  }
);

export const fetchAccountAsync = createAsyncThunk(
  'wallet/fetchAccount',
  async () => {    
    const signer = getSigner();
    const account = await signer.getAddress();        
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
    },
    resetWallet: (state) => {            
      state.status = initialState.status;
      state.account = initialState.status;      
      state.allowance = initialState.allowance;
      state.balance = initialState.balance;
      state.governance = initialState.governance;      
    }
  },
  extraReducers: (builder) => {
    builder      
      .addCase(connectWalletAsync.fulfilled, (state, action) => {
        state.status = 'connected';                
      })
      .addCase(connectWalletAsync.pending, (state) => {
        state.status = 'loading';        
      })
      .addCase(connectWalletAsync.rejected, (state) => {
        state.status = 'failed_to_connect';
      })
      .addCase(fetchAccountAsync.fulfilled, (state, action) => {
        state.account = action.payload.account;
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
      })
      .addCase(fetchGovernanceDistributorShareAsync.fulfilled, (state, action) => {                
        state.governance.distributionShare = action.payload.distributionShare;
      });
  },
});

export const disconnectWallet =
  (): AppThunk =>
  (dispatch) => {        
    web3Modal.clearCachedProvider();
    dispatch(resetWallet());
  };

export const { setAccount, resetWallet } = walletSlice.actions;

export const selectAccount = (state: RootState) => state.wallet.account;
export const selectWalletStatus = (state: RootState) => state.wallet.status;
export const selectWalletBalance = (state: RootState) => state.wallet.balance;
export const selectWalletAllowance = (state: RootState) => state.wallet.allowance;
export const selectWalletGovernanceDistributionShare = (state: RootState) => state.wallet.governance.distributionShare;

export default walletSlice.reducer;
