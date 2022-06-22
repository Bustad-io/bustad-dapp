import { fetchAccountAsync, fetchAllowanceAsync, fetchBalanceAsync, resetWallet, setWalletProvider } from "../features/wallet/walletSlice";
import { web3Modal } from "../providers/web3.provider";
import { AppDispatch } from "./store";

export function AddWeb3EventListeners(dispatch: AppDispatch) {
  web3Modal.on("accountsChanged", async (accounts: string[]) => {
    await dispatch(fetchAccountAsync());
    await dispatch(fetchBalanceAsync());
    await dispatch(fetchAllowanceAsync());
  });

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
    await dispatch(resetWallet());
  });
}