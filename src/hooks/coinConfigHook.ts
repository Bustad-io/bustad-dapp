import { useAppSelector } from "../app/hooks";
import { GetContractConfig } from "../config";
import { selectChosenCurrency } from "../features/currencyChoice/currencyChoiceSlice";
import { selectNetwork } from '../features/wallet/walletSlice';

export function useCoinConfig() {    
    const chosenCurrency = useAppSelector(selectChosenCurrency);
    const network = useAppSelector(selectNetwork);
    
    const contractConfig = GetContractConfig(network);

    switch(chosenCurrency) {
        case "dai": 
        return {
          address: contractConfig.dai.address,
          decimal: contractConfig.dai.decimal,
        }                
        case "usdc": 
        return {
          address: contractConfig.usdc.address,
          decimal: contractConfig.usdc.decimal,
        }          
      }  
}