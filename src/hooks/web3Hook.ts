import { Contract } from "ethers";
import { useAppSelector } from "../app/hooks";
import { selectChosenCurrency } from "../features/currencyChoice/currencyChoiceSlice";
import { selectNetwork, selectWalletStatus } from "../features/wallet/walletSlice";
import { Contracts, getContracts } from "../providers/web3.provider";

export interface ExtendedContracts extends Contracts  {
    chosenCurrencyContract: Contract | null
}

export function useWeb3Connector() {
    const walletStatus = useAppSelector(selectWalletStatus);
    const chosenCurrency = useAppSelector(selectChosenCurrency);
    const network = useAppSelector(selectNetwork);
    
    const contracts = getContracts(network, walletStatus === "connected");    

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
        chosenCurrencyContract,        
        networkName: network
    }
}