import { Contract } from "ethers";
import { useAppSelector } from "../app/hooks";
import { selectChosenCurrency } from "../features/currencyChoice/currencyChoiceSlice";
import { Contracts, getContracts } from "../features/wallet/walletAPI";
import { selectWalletStatus } from "../features/wallet/walletSlice";

export interface ExtendedContracts extends Contracts  {
    chosenCurrencyContract: Contract | null
}

export function useWeb3Connector() {
    const walletStatus = useAppSelector(selectWalletStatus);
    const chosenCurrency = useAppSelector(selectChosenCurrency);

    const contracts = getContracts(walletStatus === "connected");

    let chosenCurrencyContract;

    switch(chosenCurrency) {
        case "dai": 
        chosenCurrencyContract = contracts.dai;
          break;
        case "usdc": 
        chosenCurrencyContract = contracts.usdc;
          break;
          default: 
          chosenCurrencyContract = null;          
      }    

    return {
        contracts,
        chosenCurrencyContract
    }
}