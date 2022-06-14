export function calculateToAmount(fromAmount: number, rate: number, isStableCoin: boolean, ethUsdPrice: number) {
    if(isStableCoin) {
        return fromAmount * rate;
    }

    return rate * fromAmount * ethUsdPrice;
}


export function calculateFromAmount(toAmount: number, rate: number, isStableCoin: boolean, ethUsdPrice: number) {
    if(isStableCoin) {
        return toAmount / rate;
    }

    return toAmount /  (rate * ethUsdPrice);
}