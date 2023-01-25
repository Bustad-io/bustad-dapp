import { DateNowEpoch, StringToEpoch } from '../../../utils/date';

interface Props {
    startDate: string;
    endDate: string;
    isActivelyEnded: boolean;
}

export function ProgramActiveStatus({ startDate, endDate, isActivelyEnded }: Props) {
    const isActive = StringToEpoch(startDate) < DateNowEpoch() && StringToEpoch(endDate) > DateNowEpoch();

    const isComingSoon = StringToEpoch(startDate) > DateNowEpoch();
    const isEnded = StringToEpoch(endDate) < DateNowEpoch() || isActivelyEnded;

    const label = isActive
        ? 'Active'
        : (isComingSoon
            ? 'Coming soon'
            : (isEnded
                ? 'Ended'
                : 'Unknown'));

    const dotComponent = isActive
        ? <span className='h-2 w-2 bg-[#40B66B] inline-block rounded-full'></span>
        : (isComingSoon ? <span className='h-2 w-2 bg-[#FCC934] inline-block rounded-full'></span>
            : (isEnded
                ? <span className='h-2 w-2 bg-[#E93939] inline-block rounded-full'></span>
                : <span className='h-2 w-2 bg-[#E93939] inline-block rounded-full'></span>));

    return (
        <div className='bg-[#E8ECFB] flex items-center space-x-1 p-[3px] rounded-[7px] max-w-max'>
            {dotComponent}
            <span className='font-medium text-xs'>{label}</span>
        </div>
    );
}