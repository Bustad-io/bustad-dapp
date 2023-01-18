import { useContractConfig } from '../../../hooks/contractConfigHook';
import { Incentive } from '../../../types/IncentiveType';
import { useNavigate } from 'react-router-dom';
import { StringToUtcEpoch } from '../../../utils/date';

interface Props {
    incentive: Incentive
}

export function IncentiveItem({ incentive }: Props) {
    const { getContractByAddress } = useContractConfig();
    const navigate = useNavigate();

    const incentivePoolLabel = getContractByAddress(incentive.poolAddress)?.label;

    const startTimeFormatted = `${new Date(incentive.startTime).toLocaleDateString()} ${new Date(incentive.startTime).toLocaleTimeString([], { timeStyle: 'short' })}`
    const endTimeFormatted = `${new Date(incentive.endTime).toLocaleDateString()} ${new Date(incentive.endTime).toLocaleTimeString([], { timeStyle: 'short' })}`

    const isExpired = Date.now() > StringToUtcEpoch(incentive.endTime);    

    function onNavigate() {
        navigate(`/admin/reward/${incentive.id}`);
    }

    return (
        <div className={`cursor-pointer flex flex-col bg-white px-2 py-2 rounded ${incentive.activelyEnded ? 'opacity-75' : ''}`} onClick={onNavigate}>
            {incentive.activelyEnded ? <div className='text-xs text-red-500'>Ended</div> : isExpired ? <div className='text-xs text-yellow-500'>Expired</div> : <div className='text-xs text-green-500'>Active</div>}
            <div className='font-semibold'>{incentivePoolLabel}</div>
            <div className='text-xs'>{startTimeFormatted} - {endTimeFormatted}</div>
        </div>
    );
}