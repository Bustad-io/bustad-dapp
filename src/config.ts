export const CrowdsaleAddress: string = process.env.REACT_APP_CROWDSALE_ADDRESS ?? "";
export const BustadTokenAddress: string = process.env.REACT_APP_BUSTAD_TOKEN_ADDRESS ?? "";

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