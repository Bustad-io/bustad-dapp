import { ethers, Signer } from "ethers";
import { BustadTokenAddress, CrowdsaleAddress } from "../../config";
import CrowdsaleDef from '../../contracts/Crowdsale.sol/Crowdsale.json';
import BustadTokenDef from '../../contracts/BustadToken.sol/BustadToken.json';

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

export function getProvider(): ethers.providers.Web3Provider {
  return provider;
}

export function getContracts() {
  const signer = getSigner();

  return {
    crowdsale: new ethers.Contract(CrowdsaleAddress, CrowdsaleDef.abi, signer),
    bustadToken: new ethers.Contract(BustadTokenAddress, BustadTokenDef.abi, signer)
  }
}
