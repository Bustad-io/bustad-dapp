import { fetchAccountAsync, fetchAllowanceAsync, fetchBalanceAsync } from "../features/wallet/walletSlice";
import { getWeb3ModalProvider } from "../providers/web3.provider";
import { AppDispatch } from "./store";

export function AddWeb3EventListeners(dispatch: AppDispatch) {
    const web3ModalInstance = getWeb3ModalProvider();

    web3ModalInstance.on("accountsChanged", async (accounts: string[]) => {        
        await dispatch(fetchAccountAsync());
        await dispatch(fetchBalanceAsync());
        await dispatch(fetchAllowanceAsync());
    });

    // Subscribe to chainId change
    //   web3ModalInstance.on("chainChanged", (chainId: number) => {

    //   });

    web3ModalInstance.on("connect", (info: { chainId: number }) => {
        console.log('connect', info)
    });

      web3ModalInstance.on("disconnect", (error: { code: number; message: string }) => {
        console.log('disconnect', error)
      });
}