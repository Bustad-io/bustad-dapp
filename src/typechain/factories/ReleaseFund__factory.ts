/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */

import { Signer, utils, Contract, ContractFactory, Overrides } from "ethers";
import { Provider, TransactionRequest } from "@ethersproject/providers";
import type { ReleaseFund, ReleaseFundInterface } from "../ReleaseFund";

const _abi = [
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "address",
        name: "receiver",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
    ],
    name: "FundWithdrawn",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "uint256",
        name: "remainingAmount",
        type: "uint256",
      },
    ],
    name: "RefundRemaining",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "snapshotId",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "refundAllowedAt",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "withdrawAllowedAt",
        type: "uint256",
      },
    ],
    name: "ReleaseFundInitialised",
    type: "event",
  },
  {
    inputs: [],
    name: "bustadToken",
    outputs: [
      {
        internalType: "contract BustadToken",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "account",
        type: "address",
      },
    ],
    name: "checkHasWithdrawnFund",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "govToken",
    outputs: [
      {
        internalType: "contract GovernanceToken",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "govTokenSnapshopId",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    name: "hasWithdrawnFunds",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "_govTokenSnapshopId",
        type: "uint256",
      },
      {
        internalType: "contract GovernanceToken",
        name: "_govToken",
        type: "address",
      },
      {
        internalType: "contract BustadToken",
        name: "_bustadToken",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "_refundAllowedAt",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "_withdrawAllowedAt",
        type: "uint256",
      },
    ],
    name: "init",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "isInitialized",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "parentTreasury",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "refundAllowedAt",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "refundRemaining",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "releasedAmount",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "remainingAmount",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "account",
        type: "address",
      },
    ],
    name: "shareAmountFor",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "withdraw",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "withdrawAllowedAt",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
];

const _bytecode =
  "0x60806040526000600460146101000a81548160ff02191690831515021790555034801561002b57600080fd5b506118f18061003b6000396000f3fe608060405234801561001057600080fd5b50600436106100f55760003560e01c80635545c3d411610097578063a50a1fe611610066578063a50a1fe614610250578063ac4f444f1461026e578063cd1e6ce31461028c578063dff5bf8d146102aa576100f5565b80635545c3d4146101dc578063595651251461020c5780639dd22a3e1461022a5780639e1c029514610246576100f5565b8063179b720f116100d3578063179b720f14610166578063392e53cd146101965780633ccfd60b146101b457806345d30a17146101be576100f5565b806303461642146100fa57806305268cff1461012a5780631074778614610148575b600080fd5b610114600480360381019061010f91906110be565b6102c8565b6040516101219190611104565b60405180910390f35b610132610440565b60405161013f919061117e565b60405180910390f35b610150610466565b60405161015d9190611104565b60405180910390f35b610180600480360381019061017b91906110be565b61046c565b60405161018d91906111b4565b60405180910390f35b61019e6104c2565b6040516101ab91906111b4565b60405180910390f35b6101bc6104d5565b005b6101c66109cd565b6040516101d39190611104565b60405180910390f35b6101f660048036038101906101f191906110be565b6109d3565b60405161020391906111b4565b60405180910390f35b6102146109f3565b60405161022191906111de565b60405180910390f35b610244600480360381019061023f91906112a1565b610a19565b005b61024e610c3d565b005b610258610f29565b6040516102659190611104565b60405180910390f35b610276610fdb565b6040516102839190611104565b60405180910390f35b610294610fe1565b6040516102a19190611104565b60405180910390f35b6102b2610fe7565b6040516102bf919061133d565b60405180910390f35b600080600560009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16634ee2cd7e846000546040518363ffffffff1660e01b815260040161032a929190611358565b60206040518083038186803b15801561034257600080fd5b505afa158015610356573d6000803e3d6000fd5b505050506040513d601f19601f8201168201806040525081019061037a9190611396565b90506000600560009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1663981b24d06000546040518263ffffffff1660e01b81526004016103db9190611104565b60206040518083038186803b1580156103f357600080fd5b505afa158015610407573d6000803e3d6000fd5b505050506040513d601f19601f8201168201806040525081019061042b9190611396565b9050610437828261100d565b92505050919050565b600560009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1681565b60025481565b6000600760008373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060009054906101000a900460ff169050919050565b600460149054906101000a900460ff1681565b6000339050436003541061051e576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040161051590611420565b60405180910390fd5b6000600560009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16634ee2cd7e836000546040518363ffffffff1660e01b815260040161057f929190611358565b60206040518083038186803b15801561059757600080fd5b505afa1580156105ab573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906105cf9190611396565b1161060f576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016106069061148c565b60405180910390fd5b60001515600760008373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060009054906101000a900460ff161515146106a2576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401610699906114f8565b60405180910390fd5b6000600660009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff166370a08231306040518263ffffffff1660e01b81526004016106ff91906111de565b60206040518083038186803b15801561071757600080fd5b505afa15801561072b573d6000803e3d6000fd5b505050506040513d601f19601f8201168201806040525081019061074f9190611396565b1161078f576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040161078690611564565b60405180910390fd5b600061079a826102c8565b905080600660009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff166370a08231306040518263ffffffff1660e01b81526004016107f891906111de565b60206040518083038186803b15801561081057600080fd5b505afa158015610824573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906108489190611396565b11610888576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040161087f906115d0565b60405180910390fd5b6001600760008473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060006101000a81548160ff021916908315150217905550600660009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1663a9059cbb83836040518363ffffffff1660e01b815260040161093d929190611358565b602060405180830381600087803b15801561095757600080fd5b505af115801561096b573d6000803e3d6000fd5b505050506040513d601f19601f8201168201806040525081019061098f919061161c565b507fa692503bc54c9f1d1483729b6058a24987097ff492084b1a8adf8cae08e4fb4382826040516109c1929190611358565b60405180910390a15050565b60015481565b60076020528060005260406000206000915054906101000a900460ff1681565b600460009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1681565b60001515600460149054906101000a900460ff16151514610a6f576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401610a6690611695565b60405180910390fd5b6001600460146101000a81548160ff0219169083151502179055508273ffffffffffffffffffffffffffffffffffffffff166370a08231306040518263ffffffff1660e01b8152600401610ac391906111de565b60206040518083038186803b158015610adb57600080fd5b505afa158015610aef573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190610b139190611396565b6001819055508460008190555083600560006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff16021790555082600660006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff160217905550816002819055508060038190555033600460006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff1602179055507f14eee4ebb0bc9912305327cd0b10ae4de0375af6caa1d99e532e0314c9c8d0f7600154600054600254600354604051610c2e94939291906116b5565b60405180910390a15050505050565b6002544311610c81576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401610c7890611746565b60405180910390fd5b6000600660009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff166370a08231306040518263ffffffff1660e01b8152600401610cde91906111de565b60206040518083038186803b158015610cf657600080fd5b505afa158015610d0a573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190610d2e9190611396565b11610d6e576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401610d65906117b2565b60405180910390fd5b6000600660009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff166370a08231306040518263ffffffff1660e01b8152600401610dcb91906111de565b60206040518083038186803b158015610de357600080fd5b505afa158015610df7573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190610e1b9190611396565b9050600660009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1663a9059cbb600460009054906101000a900473ffffffffffffffffffffffffffffffffffffffff16836040518363ffffffff1660e01b8152600401610e9c929190611358565b602060405180830381600087803b158015610eb657600080fd5b505af1158015610eca573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190610eee919061161c565b507f7ba30e07bb61e64c1c3f13fb106d39c2ed54ea573c83844066e9422e4680f1f981604051610f1e9190611104565b60405180910390a150565b6000600560009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff166370a08231306040518263ffffffff1660e01b8152600401610f8691906111de565b60206040518083038186803b158015610f9e57600080fd5b505afa158015610fb2573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190610fd69190611396565b905090565b60005481565b60035481565b600660009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1681565b60008082670de0b6b3a7640000856110259190611801565b61102f919061188a565b9050670de0b6b3a7640000600154826110489190611801565b611052919061188a565b91505092915050565b600080fd5b600073ffffffffffffffffffffffffffffffffffffffff82169050919050565b600061108b82611060565b9050919050565b61109b81611080565b81146110a657600080fd5b50565b6000813590506110b881611092565b92915050565b6000602082840312156110d4576110d361105b565b5b60006110e2848285016110a9565b91505092915050565b6000819050919050565b6110fe816110eb565b82525050565b600060208201905061111960008301846110f5565b92915050565b6000819050919050565b600061114461113f61113a84611060565b61111f565b611060565b9050919050565b600061115682611129565b9050919050565b60006111688261114b565b9050919050565b6111788161115d565b82525050565b6000602082019050611193600083018461116f565b92915050565b60008115159050919050565b6111ae81611199565b82525050565b60006020820190506111c960008301846111a5565b92915050565b6111d881611080565b82525050565b60006020820190506111f360008301846111cf565b92915050565b611202816110eb565b811461120d57600080fd5b50565b60008135905061121f816111f9565b92915050565b600061123082611080565b9050919050565b61124081611225565b811461124b57600080fd5b50565b60008135905061125d81611237565b92915050565b600061126e82611080565b9050919050565b61127e81611263565b811461128957600080fd5b50565b60008135905061129b81611275565b92915050565b600080600080600060a086880312156112bd576112bc61105b565b5b60006112cb88828901611210565b95505060206112dc8882890161124e565b94505060406112ed8882890161128c565b93505060606112fe88828901611210565b925050608061130f88828901611210565b9150509295509295909350565b60006113278261114b565b9050919050565b6113378161131c565b82525050565b6000602082019050611352600083018461132e565b92915050565b600060408201905061136d60008301856111cf565b61137a60208301846110f5565b9392505050565b600081519050611390816111f9565b92915050565b6000602082840312156113ac576113ab61105b565b5b60006113ba84828501611381565b91505092915050565b600082825260208201905092915050565b7f5769746864726177206e6f7420616c6c6f776564207965740000000000000000600082015250565b600061140a6018836113c3565b9150611415826113d4565b602082019050919050565b60006020820190508181036000830152611439816113fd565b9050919050565b7f557365722063616e6e6f7420776974686472617720616e792066756e64730000600082015250565b6000611476601e836113c3565b915061148182611440565b602082019050919050565b600060208201905081810360008301526114a581611469565b9050919050565b7f48617320616c72656164792077697468647261776e2066756e64730000000000600082015250565b60006114e2601b836113c3565b91506114ed826114ac565b602082019050919050565b60006020820190508181036000830152611511816114d5565b9050919050565b7f46756e642062616c616e63652069732030000000000000000000000000000000600082015250565b600061154e6011836113c3565b915061155982611518565b602082019050919050565b6000602082019050818103600083015261157d81611541565b9050919050565b7f616d6f756e74207375727061737365732066756e642062616c616e6365000000600082015250565b60006115ba601d836113c3565b91506115c582611584565b602082019050919050565b600060208201905081810360008301526115e9816115ad565b9050919050565b6115f981611199565b811461160457600080fd5b50565b600081519050611616816115f0565b92915050565b6000602082840312156116325761163161105b565b5b600061164084828501611607565b91505092915050565b7f48617320616c7265616479206265656e20696e697469616c697a656400000000600082015250565b600061167f601c836113c3565b915061168a82611649565b602082019050919050565b600060208201905081810360008301526116ae81611672565b9050919050565b60006080820190506116ca60008301876110f5565b6116d760208301866110f5565b6116e460408301856110f5565b6116f160608301846110f5565b95945050505050565b7f526566756e642074696d65206e6f742072656163686564000000000000000000600082015250565b60006117306017836113c3565b915061173b826116fa565b602082019050919050565b6000602082019050818103600083015261175f81611723565b9050919050565b7f4e6f7468696e6720746f20726566756e64000000000000000000000000000000600082015250565b600061179c6011836113c3565b91506117a782611766565b602082019050919050565b600060208201905081810360008301526117cb8161178f565b9050919050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052601160045260246000fd5b600061180c826110eb565b9150611817836110eb565b9250817fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff04831182151516156118505761184f6117d2565b5b828202905092915050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052601260045260246000fd5b6000611895826110eb565b91506118a0836110eb565b9250826118b0576118af61185b565b5b82820490509291505056fea26469706673582212206d6acb98d31fb48d84519b935e7b3fb468a14f7f13c08dceb78687071facd80364736f6c63430008090033";

export class ReleaseFund__factory extends ContractFactory {
  constructor(
    ...args: [signer: Signer] | ConstructorParameters<typeof ContractFactory>
  ) {
    if (args.length === 1) {
      super(_abi, _bytecode, args[0]);
    } else {
      super(...args);
    }
  }

  deploy(
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ReleaseFund> {
    return super.deploy(overrides || {}) as Promise<ReleaseFund>;
  }
  getDeployTransaction(
    overrides?: Overrides & { from?: string | Promise<string> }
  ): TransactionRequest {
    return super.getDeployTransaction(overrides || {});
  }
  attach(address: string): ReleaseFund {
    return super.attach(address) as ReleaseFund;
  }
  connect(signer: Signer): ReleaseFund__factory {
    return super.connect(signer) as ReleaseFund__factory;
  }
  static readonly bytecode = _bytecode;
  static readonly abi = _abi;
  static createInterface(): ReleaseFundInterface {
    return new utils.Interface(_abi) as ReleaseFundInterface;
  }
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): ReleaseFund {
    return new Contract(address, _abi, signerOrProvider) as ReleaseFund;
  }
}