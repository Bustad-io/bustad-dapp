import { Incentive } from '../../types/IncentiveType';
import { IncentivePositionsAllowance, PositionView } from '../../types/StakingTypes';

export function generateIncentivePositionAllowance(positions: PositionView[], incentives: Incentive[]): IncentivePositionsAllowance {
    const allowedIncentives = incentives.filter(incentive =>
        positions.some(position => (position.token0Address === incentive.token0 && position.token1Address === incentive.token1)
            || (position.token0Address === incentive.token1 && position.token1Address === incentive.token0))
    );

    return {
        allowedIncentives,
        deniedIncentives: []
    }
}

export function getPositionByIncentive(incentive: Incentive, positions: PositionView[]): PositionView | null  {
    return positions.find(position => (position.token0Address === incentive.token0 && position.token1Address === incentive.token1)
    || (position.token0Address === incentive.token1 && position.token1Address === incentive.token0)) || null;
}