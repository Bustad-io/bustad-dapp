import { useAppSelector } from "../app/hooks";
import { OptionType, selectChosenCurrency } from "../features/currencyChoice/currencyChoiceSlice";
import { selectWalletBalance, WalletBalance } from "../features/wallet/walletSlice";

export function useWalletBalance() {
    const chosenCurrency: OptionType = useAppSelector(selectChosenCurrency);
    const walletBalance: WalletBalance = useAppSelector(selectWalletBalance);

    return walletBalance[chosenCurrency];    
}