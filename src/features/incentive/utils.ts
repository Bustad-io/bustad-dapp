import { utils } from 'ethers';
import { Incentive, IncentiveArray } from '../../types/IncentiveType';
import { StringToUtcEpoch } from '../../utils/date';

export function SortIncentiveByDate(a: Incentive, b: Incentive) {
    return StringToUtcEpoch(b.startTime) - StringToUtcEpoch(a.startTime)
}

export async function generateIncentiveId(arr: IncentiveArray): Promise<string> {
    return utils.defaultAbiCoder.encode(["address", "address", "uint", "uint", "address"], arr);
}

export async function extractDataFromIncentiveId(incentiveId: string) {
    return utils.defaultAbiCoder.decode(["address", "address", "uint", "uint", "address"], incentiveId);
}