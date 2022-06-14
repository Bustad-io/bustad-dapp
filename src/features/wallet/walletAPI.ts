import { ethers, Signer } from "ethers";

const provider = new ethers.providers.Web3Provider((window as any).ethereum)

export function connectWallet() {
  return new Promise<string[]>((resolve) => {
    provider.send("eth_requestAccounts", []).then((res) => resolve(res));
  }
  );
}

export function getSigner(): Signer {
  return provider.getSigner()  
}
