import { useAppSelector } from "../app/hooks";
import { selectAccount, selectWalletProvider, selectWalletStatus } from "../features/wallet/walletSlice";

export function useWalletConnection() {
    const walletStatus = useAppSelector(selectWalletStatus);
    const walletProvider = useAppSelector(selectWalletProvider);
    const account = useAppSelector(selectAccount);

    const firstAccountPart = account?.slice(0, 6);
    const lastAccountPart = account?.slice(38, 42);    

    return {
        isConnected: walletStatus === "connected",
        isMetaMask: walletProvider === "metamask",
        isCoinbase: walletProvider === "coinbase",
        isWalletConnect: walletProvider === "wallet_connect",
        truncatedAddress: `${firstAccountPart}...${lastAccountPart}`,
        address: account,
    }
}