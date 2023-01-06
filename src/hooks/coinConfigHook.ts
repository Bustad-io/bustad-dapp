import { useAppSelector } from "../app/hooks";
import { CoinContractConfig } from "../config";
import { selectChosenCurrency } from "../features/currencyChoice/currencyChoiceSlice";

export function useCoinConfig() {    
    const chosenCurrency = useAppSelector(selectChosenCurrency);

    switch(chosenCurrency) {
        case "dai": 
        return {
          address: CoinContractConfig.dai.address,
          decimal: CoinContractConfig.dai.decimal,
        }                
        case "usdc": 
        return {
          address: CoinContractConfig.usdc.address,
          decimal: CoinContractConfig.usdc.decimal,
        }          
      }  
}