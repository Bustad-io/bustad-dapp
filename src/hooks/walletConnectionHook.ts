import { useAppSelector } from "../app/hooks";
import { selectWalletStatus } from "../features/wallet/walletSlice";

export function useWalletConnection() {
    const walletStatus = useAppSelector(selectWalletStatus);

    return {
        isConnected: walletStatus === "connected"
    }
}