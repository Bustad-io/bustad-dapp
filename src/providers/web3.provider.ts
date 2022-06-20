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
      infuraId: infuraId,
      darkMode: false
    }
  }
};

const web3Modal = new Web3Modal({
  network: network,
  cacheProvider: false,
  providerOptions
});

let provider: ethers.providers.Web3Provider;
let web3ModalInstance: any;

export async function connectWallet() {
  web3ModalInstance = await web3Modal.connect();
  provider = new ethers.providers.Web3Provider(web3ModalInstance);  
}

export function getSigner(): Signer {
  return provider.getSigner()
}

export function getProvider(): ethers.providers.Web3Provider {
  return provider;
}

export function getWeb3ModalInstance() {
  return web3ModalInstance;
}

export function getContracts(useSigner = false): Contracts {
  const providerOrSigner = useSigner ? getSigner() : getProvider();

  return {
    crowdsale: new ethers.Contract(CrowdsaleAddress, CrowdsaleDef.abi, providerOrSigner),
    bustadToken: new ethers.Contract(BustadTokenAddress, BustadTokenDef.abi, providerOrSigner),
    govToken: new ethers.Contract(GovTokenAddress, GovTokenDef.abi, providerOrSigner),
    govDist: new ethers.Contract(GovDistAddress, GovDistDef.abi, providerOrSigner),
    dai: new ethers.Contract(CoinContractConfig.dai.address, DaiDef.abi, providerOrSigner),
    usdc: new ethers.Contract(CoinContractConfig.usdc.address, UsdcDef.abi, providerOrSigner)
  }
}
