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
}