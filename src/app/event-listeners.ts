import { fetchAccountAsync, fetchAllowanceAsync, fetchBalanceAsync, setWalletProvider } from "../features/wallet/walletSlice";
import { web3Modal } from "../providers/web3.provider";
import { AppDispatch } from "./store";

export function AddWeb3EventListeners(dispatch: AppDispatch) {    
  web3Modal.on("accountsChanged", async (accounts: string[]) => {        
      console.log('test');
        await dispatch(fetchAccountAsync());
        await dispatch(fetchBalanceAsync());
        await dispatch(fetchAllowanceAsync());
    });

    // Subscribe to chainId change
    //   web3ModalInstance.on("chainChanged", (chainId: number) => {

    //   });    

    web3Modal.on("connect", async (info) => {
      if(info.isCoinbaseWallet === true) {
        await dispatch(setWalletProvider('coinbase'));
      } else if(info.isMetaMask === true) {
        await dispatch(setWalletProvider('metamask'));
      } else if(info.bridge === 'https://bridge.walletconnect.org') {
        await dispatch(setWalletProvider('wallet_connect'));
      }                   
    });

    web3Modal.on("disconnect", (error: { code: number; message: string }) => {
        console.log('disconnect', error)
      });
}