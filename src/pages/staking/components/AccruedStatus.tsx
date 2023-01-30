import { Incentive } from '../../../types/IncentiveType';
import { useAppSelector } from '../../../app/hooks';
import { selectAccruedPerIncentiveList, selectUserStakes } from '../../../features/incentive/incentiveSlice';
import { NumberPostfixFormatter } from '../../../utils/format';

interface Props {
    incentive: Incentive
}

export function AccruedStatus({ incentive }: Props) {    
    const userStakes = useAppSelector(selectUserStakes);
    const accruedPerIncentiveList = useAppSelector(selectAccruedPerIncentiveList);
    const staked = userStakes.find(x => x.incentiveId === Number(incentive.id));    
    const accrued = accruedPerIncentiveList.find(x => x.incentiveId === incentive.id);

    if(staked) {
        return (
            <div className='flex space-x-2'>
                <span className='text-EmeraldGreen font-semibold text-xs'>Accrued</span>
                <div className='bg-EmeraldGreen text-white font-semibold text-xs flex items-center px-2 rounded-lg'>{NumberPostfixFormatter(accrued?.accrued ?? 0)}</div>
            </div>
        );
    }
    return <></>;
}