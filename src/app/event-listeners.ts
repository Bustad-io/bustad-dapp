import { disconnectWallet, fetchAllowanceAsync, fetchBalanceAsync, fetchGovernanceDistributorShareAsync, NetworkTypes, setAccount, setNetwork, setWalletProvider } from "../features/wallet/walletSlice";
import { getProvider, getWeb3Modal } from "../providers/web3.provider";
import { AppDispatch } from "./store";

export function AddAccountsChangedListener(dispatch: AppDispatch) {
  const provider = getProvider();

  provider.on("accountsChanged", async (accounts: string[]) => {
    dispatch(setAccount(accounts[0]));
    await dispatch(fetchBalanceAsync());
    await dispatch(fetchAllowanceAsync());
  });

  provider.on("chainChanged", async (chainId: string) => {        
    dispatch(setNetwork(chainId.substring(2) === '1' ? 'mainnet' : 'goerli'))
    await dispatch(fetchBalanceAsync());
    await dispatch(fetchAllowanceAsync());
    await dispatch(fetchGovernanceDistributorShareAsync());
  });
}

export function AddWeb3EventListeners(dispatch: AppDispatch, network: NetworkTypes) {  
  const web3Modal = getWeb3Modal(network);

  web3Modal.on("connect", async (info) => {
    if (info.isCoinbaseWallet === true) {
      await dispatch(setWalletProvider('coinbase'));
    } else if (info.isMetaMask === true) {
      await dispatch(setWalletProvider('metamask'));
    } else if (info.bridge === 'https://bridge.walletconnect.org') {
      await dispatch(setWalletProvider('wallet_connect'));
    }
  });

  web3Modal.on("disconnect", async () => {    
    await dispatch(disconnectWallet());
  });
}