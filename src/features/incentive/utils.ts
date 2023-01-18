import { Incentive } from '../../types/IncentiveType';
import { StringToUtcEpoch } from '../../utils/date';

export function SortIncentiveByDate(a: Incentive, b: Incentive) {    
    return StringToUtcEpoch(b.startTime) - StringToUtcEpoch(a.startTime)
}
