import { NetworkTypes } from "./features/wallet/walletSlice";

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


export const GetContractConfig = (network: NetworkTypes) => {

    if (network === "mainnet") {
        return {
            usdc: {
                address: UsdcAddress,
                decimal: UsdcDecimal
            },
            dai: {
                address: DaiAddress,
                decimal: DaiDecimal
            },
            crowdsale: {
                address: CrowdsaleAddress
            },
            BustadCoin: {
                address: BustadTokenAddress
            },
            GovDist: {
                address: GovDistAddress
            },
            GovToken: {
                address: GovTokenAddress
            },
            UniswapLpNft: {
                address: UniswapLpNftAddress
            }
        };
    }

    return {
        usdc: {
            address: UsdcGoerliAddress,
            decimal: UsdcDecimal
        },
        dai: {
            address: DaiGoerliAddress,
            decimal: DaiDecimal
        },
        crowdsale: {
            address: CrowdsaleGoerliAddress
        },
        BustadCoin: {
            address: BustadTokenGoerliAddress
        },
        GovDist: {
            address: GovDistGoerliAddress
        },
        GovToken: {
            address: GovTokenGoerliAddress
        },
        UniswapLpNft: {
            address: UniswapLpNftGoerliAddress
        }
    }
};