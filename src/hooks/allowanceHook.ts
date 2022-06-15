import { useAppSelector } from "../app/hooks";
import { OptionType, selectChosenCurrency } from "../features/currencyChoice/currencyChoiceSlice";
import { selectWalletAllowance, WalletAllowance } from "../features/wallet/walletSlice";

export function useWalletAllowance() {
    const chosenCurrency: OptionType = useAppSelector(selectChosenCurrency);
    const walletAllowance: WalletAllowance = useAppSelector(selectWalletAllowance);

    return chosenCurrency !== 'eth' ? walletAllowance[chosenCurrency] : Number.MAX_VALUE;    
}