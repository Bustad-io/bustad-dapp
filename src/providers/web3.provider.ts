import { Contract, ethers, Signer } from "ethers";
import Web3Modal from "web3modal";
import { infuraId, appName, GovTokenSymbol, GovTokenDecimal, BustadTokenRoundIcon, BustadTokenSymbol, BustadTokenDecimal, GovTokenRoundIcon, alchemyId, GetContractConfig } from "../config";
import CrowdsaleDef from '../contracts/Crowdsale.sol/Crowdsale.json';
import BustadTokenDef from '../contracts/BustadToken.sol/BustadToken.json';
import GovTokenDef from '../contracts/governance/GovernanceToken.sol/GovernanceToken.json';
import DaiDef from '../contracts/Crowdsale.sol/IERC20Extended.json';
import UsdcDef from '../contracts/Crowdsale.sol/IERC20Extended.json';
import UniswapLpNftDef from '../contracts/NonfungiblePositionManager.sol/NonfungiblePositionManager.json';
import GovDistDef from '../contracts/governance/GovernanceDistributor.sol/GovernanceDistributor.json';
import WalletConnectProvider from "@walletconnect/web3-provider";
import CoinbaseWalletSDK from '@coinbase/wallet-sdk';
import { NetworkTypes } from "../features/wallet/walletSlice";

export interface Contracts {
  crowdsale: Contract;
  bustadToken: Contract;
  dai: Contract;
  usdc: Contract;
  govDist: Contract;
  govToken: Contract;
  uniswapLpNft: Contract;
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

export type WalletType = 'coinbasewallet' | 'walletconnect' | 'injected';

export const COINBASE_WALLET: WalletType = 'coinbasewallet';
export const WALLET_CONNECT: WalletType = 'walletconnect';
export const METAMASK: WalletType = 'injected';

export const getWeb3Modal = (network: NetworkTypes) => new Web3Modal({
  network: network,
  cacheProvider: true,
  providerOptions
});

let library: ethers.providers.Web3Provider;
let provider: any;

export function getDefaultProvider(network: NetworkTypes) {
  return ethers.getDefaultProvider(network, {
    infura: infuraId,
    alchemy: alchemyId
  });
}

export async function connectWallet(network: NetworkTypes, walletName?: WalletType) {
  const web3Modal = getWeb3Modal(network);

  provider = !!walletName ? await web3Modal.connectTo(walletName) : await web3Modal.connect();
  library = new ethers.providers.Web3Provider(provider, "any");
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

export function getContracts(network: NetworkTypes, useSigner = false, ): Contracts {
  const providerOrSigner = useSigner ? getSigner() : getDefaultProvider(network);
  const contractConfig = GetContractConfig(network);

  return {
    crowdsale: new ethers.Contract(contractConfig.crowdsale.address, CrowdsaleDef.abi, providerOrSigner),
    bustadToken: new ethers.Contract(contractConfig.BustadCoin.address, BustadTokenDef.abi, providerOrSigner),
    govToken: new ethers.Contract(contractConfig.GovToken.address, GovTokenDef.abi, providerOrSigner),
    govDist: new ethers.Contract(contractConfig.GovDist.address, GovDistDef.abi, providerOrSigner),
    dai: new ethers.Contract(contractConfig.dai.address, DaiDef.abi, providerOrSigner),
    usdc: new ethers.Contract(contractConfig.usdc.address, UsdcDef.abi, providerOrSigner),
    uniswapLpNft: new ethers.Contract(contractConfig.UniswapLpNft.address, UniswapLpNftDef.abi, providerOrSigner),
  }
}

export async function addGovTokenToWallet(network: NetworkTypes) {
  const contractConfig = GetContractConfig(network);
  await provider.request({
    method: 'wallet_watchAsset',
    params: {
      type: 'ERC20',
      options: {
        address: contractConfig.GovToken.address,
        symbol: GovTokenSymbol,
        decimals: GovTokenDecimal,
        image: GovTokenRoundIcon
      },
    },
  });
}

export async function addBustadToWallet(network: NetworkTypes) {
  const contractConfig = GetContractConfig(network);
  await provider.request({
    method: 'wallet_watchAsset',
    params: {
      type: 'ERC20',
      options: {
        address: contractConfig.BustadCoin.address,
        symbol: BustadTokenSymbol,
        decimals: BustadTokenDecimal,
        image: BustadTokenRoundIcon
      },
    },
  });
}

