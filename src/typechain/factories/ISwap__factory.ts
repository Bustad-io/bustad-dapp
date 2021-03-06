/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */

import { Contract, Signer, utils } from "ethers";
import { Provider } from "@ethersproject/providers";
import type { ISwap, ISwapInterface } from "../ISwap";

const _abi = [
  {
    inputs: [
      {
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
      {
        internalType: "address",
        name: "toToken",
        type: "address",
      },
    ],
    name: "estimateETHSwap",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "toToken",
        type: "address",
      },
    ],
    name: "swapETH",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "payable",
    type: "function",
  },
];

export class ISwap__factory {
  static readonly abi = _abi;
  static createInterface(): ISwapInterface {
    return new utils.Interface(_abi) as ISwapInterface;
  }
  static connect(address: string, signerOrProvider: Signer | Provider): ISwap {
    return new Contract(address, _abi, signerOrProvider) as ISwap;
  }
}
