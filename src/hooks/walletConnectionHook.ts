import { useAppSelector } from "../app/hooks";
import { selectWalletProvider, selectWalletStatus } from "../features/wallet/walletSlice";

export function useWalletConnection() {
    const walletStatus = useAppSelector(selectWalletStatus);
    const walletProvider = useAppSelector(selectWalletProvider);

    return {
        isConnected: walletStatus === "connected",
        isMetaMask: walletProvider === "metamask",
        isCoinbase: walletProvider === "coinbase",
        isWalletConnect: walletProvider === "wallet_connect",
    }
}