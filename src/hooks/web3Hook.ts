import { Contract, ContractInterface, getDefaultProvider } from "ethers";
import { useAppSelector } from "../app/hooks";
import { selectChosenCurrency } from "../features/currencyChoice/currencyChoiceSlice";
import { selectNetwork, selectWalletStatus } from "../features/wallet/walletSlice";
import { Contracts, getContracts, getSigner } from "../providers/web3.provider";

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
      
      function connectContractInstance(address: string, abi: ContractInterface, useSigner: boolean = false) {
        const providerOrSigner = useSigner ? getSigner() : getDefaultProvider(network);
        return new Contract(address, abi, providerOrSigner)
      }

    return {        
        contracts,
        chosenCurrencyContract,
        connectContractInstance,
        networkName: network
    }
}