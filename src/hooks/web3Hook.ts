import { Contract } from "ethers";
import { useAppSelector } from "../app/hooks";
import { selectChosenCurrency } from "../features/currencyChoice/currencyChoiceSlice";
import { selectChainId, selectWalletStatus } from "../features/wallet/walletSlice";
import { Contracts, getContracts } from "../providers/web3.provider";
import { chainId, network } from "../config";

export interface ExtendedContracts extends Contracts  {
    chosenCurrencyContract: Contract | null
}

export function useWeb3Connector() {
    const walletStatus = useAppSelector(selectWalletStatus);
    const chosenCurrency = useAppSelector(selectChosenCurrency);
    const walletChainId = useAppSelector(selectChainId);

    const correctChain = chainId === walletChainId;
    const networkName = network;    

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
        chosenCurrencyContract,
        correctChain,
        networkName
    }
}