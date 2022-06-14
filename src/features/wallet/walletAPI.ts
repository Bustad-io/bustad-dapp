import { ethers, Signer } from "ethers";

const provider = new ethers.providers.Web3Provider((window as any).ethereum)

export function connectWallet() {
  return new Promise<void>((resolve) => {
    provider.send("eth_requestAccounts", []).then(() => resolve());
  }
  );
}

export function getAddress(signer: Signer) {
  return new Promise<string>((resolve) => signer.getAddress().then(address => resolve(address))
  );
}

export function getSigner(): Signer {
  return provider.getSigner()  
}
