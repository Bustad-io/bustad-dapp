import { Incentive } from "./IncentiveType";

export interface PositionView {
    tokenId: number;
    fee: number;
    token0Label: string;
    token1Label: string;
    token0Address: string;
    token1Address: string;
}

export interface IncentivePositionsAllowance {
    allowedIncentives: Incentive[];
    deniedIncentives: Incentive[];
}