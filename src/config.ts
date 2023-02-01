import { NetworkTypes } from "./features/wallet/walletSlice";
import { ContractConfig } from "./types/ContractConfigType";

export const BustadTokenSymbol: string = process.env.REACT_APP_BUSTAD_TOKEN_SYMBOL ?? "";
export const BustadTokenDecimal: string = process.env.REACT_APP_BUSTAD_TOKEN_DECIMAL ?? "";
export const BustadTokenRoundIcon: string = process.env.REACT_APP_BUSTAD_TOKEN_ROUND_ICON ?? "";
export const GovTokenRoundIcon: string = process.env.REACT_APP_GOVERNANCE_TOKEN_ROUND_ICON ?? "";
export const GovTokenSymbol: string = process.env.REACT_APP_GOVERNANCE_TOKEN_SYMBOL ?? "";
export const GovTokenDecimal: string = process.env.REACT_APP_GOVERNANCE_TOKEN_DECIMAL ?? "";

export const explorerBaseUri: string = process.env.REACT_APP_EXPLORER_BASE_URI ?? "";
export const testExplorerBaseUri: string = process.env.REACT_APP_TEST_EXPLORER_BASE_URI ?? "";
export const infuraId: string = process.env.REACT_APP_INFURA_ID ?? "";
export const alchemyId: string = process.env.REACT_APP_ALCHEMY_ID ?? "";

export const appName: string = process.env.REACT_APP_APP_NAME ?? "";

export const coinbaseIosUrl = process.env.REACT_APP_COINBASE_IOS_URL ?? "";
export const coinbaseAndroidUrl = process.env.REACT_APP_COINBASE_ANDROID_URL ?? "";

export const IS_DEV_ENV = process.env.NODE_ENV === 'development';

export const ANALYTICS_ID_TEST = process.env.REACT_APP_ANALYTICS_ID_TEST ?? "";
export const ANALYTICS_ID = process.env.REACT_APP_ANALYTICS_ID ?? "";

export const AdminAddress: string = process.env.REACT_APP_ADMIN_ADDRESS ?? "";

export function GetConfig(network: NetworkTypes) {
    if(network === "mainnet") {
        return {
            ServiceBaseUri: process.env.REACT_APP_SERVICE_BASE_PROD_URI!
        }
    }

    return {
        ServiceBaseUri: process.env.REACT_APP_SERVICE_BASE_DEV_URI!
    }
}

export function GetContractConfig(network: NetworkTypes): ContractConfig {

    if (network === "mainnet") {
        return {
            Weth: {
                label: "ETH",
                address: process.env.REACT_APP_WETH_TOKEN_ADDRESS!,                
            },
            Usdc: {
                label: "USDC",
                address: process.env.REACT_APP_USDC_ADDRESS!,
                decimal: 6
            },
            Dai: {
                label: "DAI",
                address: process.env.REACT_APP_DAI_ADDRESS!,
                decimal: 18
            },
            Crowdsale: {
                label: "Crowdsale",
                address: process.env.REACT_APP_CROWDSALE_ADDRESS!
            },
            BustadCoin: {
                label: "BUSC",
                address: process.env.REACT_APP_BUSTAD_TOKEN_ADDRESS!
            },
            GovDist: {
                label: "GovDist",
                address: process.env.REACT_APP_GOVERNANCE_DISTRIBUTOR_ADDRESS!
            },
            GovToken: {
                label: "EIG",
                address: process.env.REACT_APP_GOVERNANCE_TOKEN_ADDRESS!
            },
            UniswapLpNft: {
                label: "Uniswap V3 LP NFT",
                address: process.env.REACT_APP_UNISWAP_LP_NFT!
            },
            UniswapPoolEthEig: {
                label: "ETH/EIG 1%",
                address: process.env.REACT_APP_UNISWAP_LP_POOL_ETH_EIG!
            },
            UniswapPoolBuscUsdc: {
                label: "BUSC/USDC 0.3%",
                address: process.env.REACT_APP_UNISWAP_LP_POOL_BUSC_USDC!
            },
            UniswapStaker: {
                label: "Uniswap V3 Staker",
                address: process.env.REACT_APP_UNISWAP_STAKER!
            }
        };
    }

    return {
        Weth: {
            label: "ETH",
            address: process.env.REACT_APP_WETH_TOKEN_GOERLI_ADDRESS!,                
        },
        Usdc: {
            label: "USDC",
            address: process.env.REACT_APP_USDC_ADDRESS_GOERLI!,
            decimal: 6
        },
        Dai: {
            label: "DAI",
            address: process.env.REACT_APP_DAI_ADDRESS_GOERLI!,
            decimal: 18
        },
        Crowdsale: {
            label: "Crowdsale",
            address: process.env.REACT_APP_CROWDSALE_ADDRESS_GOERLI!
        },
        BustadCoin: {
            label: "BUSC",
            address: process.env.REACT_APP_BUSTAD_TOKEN_ADDRESS_GOERLI!
        },
        GovDist: {
            label: "GovDist",
            address: process.env.REACT_APP_GOVERNANCE_DISTRIBUTOR_ADDRESS_GOERLI!
        },
        GovToken: {
            label: "EIG",
            address: process.env.REACT_APP_GOVERNANCE_TOKEN_ADDRESS_GOERLI!
        },
        UniswapLpNft: {
            label: "Uniswap V3 LP NFT",
            address: process.env.REACT_APP_UNISWAP_LP_NFT_GOERLI!
        },
        UniswapPoolEthEig: {
            label: "ETH/EIG 1%",
            address: process.env.REACT_APP_UNISWAP_LP_POOL_ETH_EIG_GOERLI!
        },
        UniswapPoolBuscUsdc: {
            label: "BUSC/USDC 0.3%",
            address: process.env.REACT_APP_UNISWAP_LP_POOL_BUSC_USDC_GOERLI!
        },
        UniswapStaker: {
            label: "Uniswap V3 Staker",
            address: process.env.REACT_APP_UNISWAP_STAKER_GOERLI!
        }
    }
};