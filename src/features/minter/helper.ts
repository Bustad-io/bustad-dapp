export function calculateToAmount(fromAmount: number, rate: number, isStableCoin: boolean, ethUsdPrice: number, mintingFee: number) {
    if(isStableCoin) {        
        return (fromAmount * rate) - (fromAmount * rate * mintingFee);
    }    
    return (rate * fromAmount * ethUsdPrice) - (rate * fromAmount * ethUsdPrice * mintingFee);
}


export function calculateFromAmount(toAmount: number, rate: number, isStableCoin: boolean, ethUsdPrice: number, mintingFee: number) {
    if(isStableCoin) {        
        return toAmount / (rate - (rate * mintingFee));
    }
    return toAmount / ((rate * ethUsdPrice) - (rate * ethUsdPrice * mintingFee));
}