import { connectWalletAsync, fetchAllowanceAsync, fetchBalanceAsync } from "../features/wallet/walletSlice";
import { AppDispatch } from "./store";


declare let window: any;

export default function AddAccountChangeListener(dispatch: AppDispatch) {
    window.ethereum.on('accountsChanged', async (accounts: string[]) => {
        await dispatch(connectWalletAsync());
        await dispatch(fetchBalanceAsync());
        await dispatch(fetchAllowanceAsync());
    });
}