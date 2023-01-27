import { GetContractConfig } from "../config";
import { NetworkTypes } from "../features/wallet/walletSlice";

export function deepCopy(obj: object) {
  return JSON.parse(JSON.stringify(obj));
}


export function getContractByAddressHelper(address: string, network: NetworkTypes) {
  const contractConfig = GetContractConfig(network);

  for (const contractName in contractConfig) {
    const contract = contractConfig[contractName];

    if (contract.address.toLocaleUpperCase() === address.toLocaleUpperCase()) {
      return contract;
    }
  }
  return null;
}

export async function DelayerAsync(func: Promise<any>, delayBy: number) {
  const timeout = new Promise((resolve) => {
    setTimeout(() => {
      resolve('');
    }, delayBy);
  });

  return await Promise.all([timeout, func]);
}