export interface Incentive {
 id?: number;
 startTime: string;
 endTime: string;
 refundeeAddress: string;
 rewardTokenAddress: string;
 poolAddress: string;
 activelyEnded: boolean;
 onChainIncentiveId: string;
 rewardAmount: number;
 token0: string;
 token1: string;
 poolFee: number;
}

export type IncentiveArray = [string, string, number, number, string];