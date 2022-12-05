export const CrowdsaleAddress: string = process.env.REACT_APP_CROWDSALE_ADDRESS ?? "";
export const BustadTokenAddress: string = process.env.REACT_APP_BUSTAD_TOKEN_ADDRESS ?? "";
export const BustadTokenSymbol: string = process.env.REACT_APP_BUSTAD_TOKEN_SYMBOL ?? "";
export const BustadTokenDecimal: string = process.env.REACT_APP_BUSTAD_TOKEN_DECIMAL ?? "";
export const BustadTokenRoundIcon: string = process.env.REACT_APP_BUSTAD_TOKEN_ROUND_ICON ?? "";
export const GovTokenRoundIcon: string = process.env.REACT_APP_GOVERNANCE_TOKEN_ROUND_ICON ?? "";
export const GovDistAddress: string = process.env.REACT_APP_GOVERNANCE_DISTRIBUTOR_ADDRESS ?? "";
export const GovTokenAddress: string = process.env.REACT_APP_GOVERNANCE_TOKEN_ADDRESS ?? "";
export const GovTokenSymbol: string = process.env.REACT_APP_GOVERNANCE_TOKEN_SYMBOL ?? "";
export const GovTokenDecimal: string = process.env.REACT_APP_GOVERNANCE_TOKEN_DECIMAL ?? "";

export const explorerBaseUri: string = process.env.REACT_APP_EXPLORER_BASE_URI ?? "";
export const infuraId: string = process.env.REACT_APP_INFURA_ID ?? "";
export const network: string = process.env.REACT_APP_NETWORK ?? "";
export const appName: string = process.env.REACT_APP_APP_NAME ?? "";
export const chainId: number = Number(process.env.REACT_APP_CHAIN_ID) ?? 0;

export const coinbaseIosUrl = process.env.REACT_APP_COINBASE_IOS_URL ?? "";
export const coinbaseAndroidUrl = process.env.REACT_APP_COINBASE_ANDROID_URL ?? "";

export const IS_DEV_ENV = process.env.NODE_ENV === 'development';

const DaiAddress: string = process.env.REACT_APP_DAI_ADDRESS ?? "";
const UsdcAddress: string = process.env.REACT_APP_USDC_ADDRESS ?? "";

const DaiDecimal: number = Number(process.env.REACT_APP_DAI_DECIMAL) ?? 0;
const UsdcDecimal: number = Number(process.env.REACT_APP_USDC_DECIMAL) ?? 0;

export const CoinContractConfig = {
    usdc: {
        address: UsdcAddress,
        decimal: UsdcDecimal
    },
    dai: {
        address: DaiAddress,
        decimal: DaiDecimal
    }
}