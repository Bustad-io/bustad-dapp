import { Contract, ethers, Signer } from "ethers";
import { BustadTokenAddress, CrowdsaleAddress, CoinContractConfig } from "../../config";
import CrowdsaleDef from '../../contracts/Crowdsale.sol/Crowdsale.json';
import BustadTokenDef from '../../contracts/BustadToken.sol/BustadToken.json';
import DaiDef from '../../contracts/Crowdsale.sol/IERC20Extended.json';
import UsdcDef from '../../contracts/Crowdsale.sol/IERC20Extended.json';

const provider = new ethers.providers.Web3Provider((window as any).ethereum)

export interface Contracts {
  crowdsale: Contract;
  bustadToken: Contract;
  dai: Contract;
  usdc: Contract;
}

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

export function getContracts(useSigner = false): Contracts {
  const providerOrSigner = useSigner ? getSigner() : getProvider();

  return {
    crowdsale: new ethers.Contract(CrowdsaleAddress, CrowdsaleDef.abi, providerOrSigner),
    bustadToken: new ethers.Contract(BustadTokenAddress, BustadTokenDef.abi, providerOrSigner),
    dai: new ethers.Contract(CoinContractConfig.dai.address, DaiDef.abi, providerOrSigner),
    usdc: new ethers.Contract(CoinContractConfig.usdc.address, UsdcDef.abi, providerOrSigner),
  }
}
