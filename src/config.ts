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

const DaiDecimal: number = Number(process.env.REACT_APP_DAI_DECIMAL) ?? 0;
const UsdcDecimal: number = Number(process.env.REACT_APP_USDC_DECIMAL) ?? 0;

const CrowdsaleAddress: string = process.env.REACT_APP_CROWDSALE_ADDRESS ?? "";
const BustadTokenAddress: string = process.env.REACT_APP_BUSTAD_TOKEN_ADDRESS ?? "";
const GovDistAddress: string = process.env.REACT_APP_GOVERNANCE_DISTRIBUTOR_ADDRESS ?? "";
const GovTokenAddress: string = process.env.REACT_APP_GOVERNANCE_TOKEN_ADDRESS ?? "";
const DaiAddress: string = process.env.REACT_APP_DAI_ADDRESS ?? "";
const UsdcAddress: string = process.env.REACT_APP_USDC_ADDRESS ?? "";

const CrowdsaleGoerliAddress: string = process.env.REACT_APP_CROWDSALE_ADDRESS_GOERLI ?? "";
const BustadTokenGoerliAddress: string = process.env.REACT_APP_BUSTAD_TOKEN_ADDRESS_GOERLI ?? "";
const GovDistGoerliAddress: string = process.env.REACT_APP_GOVERNANCE_DISTRIBUTOR_ADDRESS_GOERLI ?? "";
const GovTokenGoerliAddress: string = process.env.REACT_APP_GOVERNANCE_TOKEN_ADDRESS_GOERLI ?? "";

const DaiGoerliAddress: string = process.env.REACT_APP_DAI_ADDRESS_GOERLI ?? "";
const UsdcGoerliAddress: string = process.env.REACT_APP_USDC_ADDRESS_GOERLI ?? "";

const UniswapLpNftGoerliAddress: string = process.env.REACT_APP_UNISWAP_LP_NFT_GOERLI ?? "";
const UniswapLpNftAddress: string = process.env.REACT_APP_UNISWAP_LP_NFT ?? "";
const UniswapStakerAddress: string = process.env.REACT_APP_UNISWAP_STAKER ?? "";
const UniswapStakerGoerliAddress: string = process.env.REACT_APP_UNISWAP_STAKER_GOERLI ?? "";

export const AdminAddress: string = process.env.REACT_APP_ADMIN_ADDRESS ?? "";

export const WETHGoerliAddress: string = process.env.REACT_APP_WETH_TOKEN_GOERLI_ADDRESS ?? "";
export const WETHAddress: string = process.env.REACT_APP_WETH_TOKEN_ADDRESS ?? "";

export const ServiceBaseUri: string = process.env.REACT_APP_SERVICE_BASE_URI ?? "";

const UniswapLpPoolEthEigAddress: string = process.env.REACT_APP_UNISWAP_LP_POOL_ETH_EIG ?? "";
const UniswapLpPoolEthEigGoerliAddress: string = process.env.REACT_APP_UNISWAP_LP_POOL_ETH_EIG_GOERLI ?? "";
const UniswapLpPoolBuscUsdcAddress: string = process.env.REACT_APP_UNISWAP_LP_POOL_BUSC_USDC ?? "";
const UniswapLpPoolBuscUsdcGoerliAddress: string = process.env.REACT_APP_UNISWAP_LP_POOL_BUSC_USDC_GOERLI ?? "";


export function GetContractConfig(network: NetworkTypes): ContractConfig {

    if (network === "mainnet") {
        return {
            Weth: {
                label: "ETH",
                address: WETHAddress,                
            },
            Usdc: {
                label: "USDC",
                address: UsdcAddress,
                decimal: UsdcDecimal
            },
            Dai: {
                label: "DAI",
                address: DaiAddress,
                decimal: DaiDecimal
            },
            Crowdsale: {
                label: "Crowdsale",
                address: CrowdsaleAddress
            },
            BustadCoin: {
                label: "BUSC",
                address: BustadTokenAddress
            },
            GovDist: {
                label: "GovDist",
                address: GovDistAddress
            },
            GovToken: {
                label: "EIG",
                address: GovTokenAddress
            },
            UniswapLpNft: {
                label: "Uniswap V3 LP NFT",
                address: UniswapLpNftAddress
            },
            UniswapPoolEthEig: {
                label: "ETH/EIG 1%",
                address: UniswapLpPoolEthEigAddress
            },
            UniswapPoolBuscUsdc: {
                label: "BUSC/USDC 0.3%",
                address: UniswapLpPoolBuscUsdcAddress
            },
            UniswapStaker: {
                label: "Uniswap V3 Staker",
                address: UniswapStakerAddress
            }
        };
    }

    return {
        Weth: {
            label: "ETH",
            address: WETHGoerliAddress,                
        },
        Usdc: {
            label: "USDC",
            address: UsdcGoerliAddress,
            decimal: UsdcDecimal
        },
        Dai: {
            label: "DAI",
            address: DaiGoerliAddress,
            decimal: DaiDecimal
        },
        Crowdsale: {
            label: "Crowdsale",
            address: CrowdsaleGoerliAddress
        },
        BustadCoin: {
            label: "BUSC",
            address: BustadTokenGoerliAddress
        },
        GovDist: {
            label: "GovDist",
            address: GovDistGoerliAddress
        },
        GovToken: {
            label: "EIG",
            address: GovTokenGoerliAddress
        },
        UniswapLpNft: {
            label: "Uniswap V3 LP NFT",
            address: UniswapLpNftGoerliAddress
        },
        UniswapPoolEthEig: {
            label: "ETH/EIG 1%",
            address: UniswapLpPoolEthEigGoerliAddress
        },
        UniswapPoolBuscUsdc: {
            label: "BUSC/USDC 0.3%",
            address: UniswapLpPoolBuscUsdcGoerliAddress
        },
        UniswapStaker: {
            label: "Uniswap V3 Staker",
            address: UniswapStakerGoerliAddress
        }
    }
};