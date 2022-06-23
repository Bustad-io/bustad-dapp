import { Contract, ethers, Signer } from "ethers";
import Web3Modal from "web3modal";
import { BustadTokenAddress, CrowdsaleAddress, CoinContractConfig, GovDistAddress, GovTokenAddress, infuraId, network, appName } from "../config";
import CrowdsaleDef from '../contracts/Crowdsale.sol/Crowdsale.json';
import BustadTokenDef from '../contracts/BustadToken.sol/BustadToken.json';
import GovTokenDef from '../contracts/governance/GovernanceToken.sol/GovernanceToken.json';
import DaiDef from '../contracts/Crowdsale.sol/IERC20Extended.json';
import UsdcDef from '../contracts/Crowdsale.sol/IERC20Extended.json';
import GovDistDef from '../contracts/governance/GovernanceDistributor.sol/GovernanceDistributor.json';
import WalletConnectProvider from "@walletconnect/web3-provider";
import CoinbaseWalletSDK from '@coinbase/wallet-sdk';

export interface Contracts {
  crowdsale: Contract;
  bustadToken: Contract;
  dai: Contract;
  usdc: Contract;
  govDist: Contract;
  govToken: Contract;
}

const providerOptions = {
  walletconnect: {
    package: WalletConnectProvider,
    options: {
      infuraId: infuraId
    }
  },
  coinbasewallet: {
    package: CoinbaseWalletSDK,
    options: {
      appName: appName,
      infuraId: infuraId
    }
  }
};

export const web3Modal = new Web3Modal({
  network: network,
  cacheProvider: true,
  providerOptions
});

let library: ethers.providers.Web3Provider;
let provider: any;

export async function connectWallet() {
  provider = await web3Modal.connect();
  library = new ethers.providers.Web3Provider(provider);  
}

export function getSigner(): Signer {
  return library.getSigner()
}

export function getLibrary(): ethers.providers.Web3Provider {
  return library;
}

export function getProvider() {
  return provider;
}

export function getContracts(useSigner = false): Contracts {
  const providerOrSigner = useSigner ? getSigner() : getLibrary();

  return {
    crowdsale: new ethers.Contract(CrowdsaleAddress, CrowdsaleDef.abi, providerOrSigner),
    bustadToken: new ethers.Contract(BustadTokenAddress, BustadTokenDef.abi, providerOrSigner),
    govToken: new ethers.Contract(GovTokenAddress, GovTokenDef.abi, providerOrSigner),
    govDist: new ethers.Contract(GovDistAddress, GovDistDef.abi, providerOrSigner),
    dai: new ethers.Contract(CoinContractConfig.dai.address, DaiDef.abi, providerOrSigner),
    usdc: new ethers.Contract(CoinContractConfig.usdc.address, UsdcDef.abi, providerOrSigner)
  }
}
