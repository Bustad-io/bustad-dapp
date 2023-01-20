import { useAppSelector } from "../app/hooks";
import { GetContractConfig } from "../config";
import { selectNetwork } from '../features/wallet/walletSlice';

export function useContractConfig() {
  const network = useAppSelector(selectNetwork);

  const contractConfig = GetContractConfig(network);

  const getContractByAddress = (address: string) => {

    for (const contractName in contractConfig) {
      const contract = contractConfig[contractName];

      if (contract.address.toLocaleUpperCase() === address.toLocaleUpperCase()) {
        return contract;
      }
    }
    return null;
  }


  return {
    getContractByAddress,
    contracts: contractConfig
  }
}