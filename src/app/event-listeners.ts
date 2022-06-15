import { connectWalletAsync } from "../features/wallet/walletSlice";
import { AppDispatch } from "./store";


declare let window: any;

export default function AddAccountChangeListener(dispatch: AppDispatch) {
    window.ethereum.on('accountsChanged', (accounts: string[]) => {
        dispatch(connectWalletAsync());
    });
}