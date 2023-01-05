import ReactGA from 'react-ga';
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AppThunk, RootState } from '../../app/store';
import { formatUnitToNumber, parseToNumber } from '../../utils/format';
import { GetContractConfig } from '../../config';
import { connectWallet, getContracts, getLibrary, getSigner, WalletType, getWeb3Modal } from '../../providers/web3.provider';

export type WalletStatus = 'connected' | 'not_connected' | 'failed_to_connect' | 'loading';
export type WalletProvider = 'metamask' | 'wallet_connect' | 'coinbase' | 'none';
export type NetworkTypes = 'mainnet' | 'goerli' | 'unknown';

export interface WalletState {  
  status: WalletStatus;  
  account: string | null;  
  balance: WalletBalance;
  allowance: WalletAllowance;
  governance: WalletGovernance;
  provider: WalletProvider;
  chainId: number;
  network: NetworkTypes
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
  provider: 'none',
  chainId: 0,
  network: 'mainnet',
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

    const { govDist } = getContracts(state.wallet.network);

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
    const network = state.wallet.network;

    if(state.wallet.status !== 'connected') {
      throw Error('Wallet not connected');
    }

    const { dai, usdc, crowdsale } = getContracts(state.wallet.network);    

    const daiAllowance = await dai.allowance(state.wallet.account, crowdsale.address);
    const usdcAllowance = await usdc.allowance(state.wallet.account, crowdsale.address);    

    return {          
      allowance: {        
        dai: formatUnitToNumber(daiAllowance, GetContractConfig(network).dai.decimal),
        usdc: formatUnitToNumber(usdcAllowance, GetContractConfig(network).usdc.decimal),
      }
    }
  }
);

export const fetchBalanceAsync = createAsyncThunk(
  'wallet/fetchBalance',
  async (_, {getState}) => {    
    const state = getState() as RootState;
    const network = state.wallet.network;

    if(state.wallet.status !== 'connected') {
      throw Error('Wallet not connected');
    }

    if(!state.wallet.account) {      
      throw Error('Account not connected');
    }

    const library =  getLibrary();  

    const { bustadToken, govToken, dai, usdc } = getContracts(state.wallet.network);

    const ethBalance = await library.getBalance(state.wallet.account!);
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
        dai: formatUnitToNumber(daiBalance, GetContractConfig(network).dai.decimal),
        usdc: formatUnitToNumber(usdcBalance, GetContractConfig(network).usdc.decimal),
      }      
    }
  }
);

export const connectWalletAsync = createAsyncThunk(
  'wallet/connectWallet',
  async (walletName: WalletType | undefined, {getState}) => {    
    const state = getState() as RootState;

    await connectWallet(state.wallet.network, walletName);
    const library =  getLibrary();  
    const network = await library.getNetwork()
    
    ReactGA.event({
      category: 'Wallet',
      action: 'Connected'
    });

    const networkType: NetworkTypes = network.chainId === 1 ? 'mainnet' : 'goerli';

    return {
      chainId: network.chainId,
      network: networkType
    }
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
    setWalletProvider: (state, action: PayloadAction<WalletProvider>) => {
      state.provider = action.payload;
    },
    setAccount: (state, action: PayloadAction<string>) => {      
      state.account = action.payload      
    },
    setNetwork: (state, action: PayloadAction<NetworkTypes>) => {
      state.network = action.payload;
    },
    resetWallet: (state) => {            
      state.status = initialState.status;
      state.account = initialState.account;      
      state.allowance = initialState.allowance;
      state.balance = initialState.balance;
      state.governance = initialState.governance;
      state.provider = initialState.provider; 
    }
  },
  extraReducers: (builder) => {
    builder      
      .addCase(connectWalletAsync.fulfilled, (state, action) => {
        state.status = 'connected';                
        state.chainId = action.payload.chainId;
        state.network = action.payload.network;
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
  (dispatch, getState) => {
    const state = getState();
    const web3Modal = getWeb3Modal(state.wallet.network);

    web3Modal.clearCachedProvider();
    dispatch(resetWallet());

    ReactGA.event({
      category: 'Wallet',
      action: 'Disconnected'
    });
  };

export const { setAccount, resetWallet, setWalletProvider, setNetwork } = walletSlice.actions;

export const selectAccount = (state: RootState) => state.wallet.account;
export const selectBalanceLoading = (state: RootState) => state.wallet.balance.loading;
export const selectWalletStatus = (state: RootState) => state.wallet.status;
export const selectNetwork = (state: RootState) => state.wallet.network;
export const selectWalletBalance = (state: RootState) => state.wallet.balance;
export const selectWalletAllowance = (state: RootState) => state.wallet.allowance;
export const selectWalletGovernanceDistributionShare = (state: RootState) => state.wallet.governance.distributionShare;
export const selectWalletProvider = (state: RootState) => state.wallet.provider;
export const selectChainId = (state: RootState) => state.wallet.chainId;

export default walletSlice.reducer;
