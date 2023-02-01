interface Props {
    isStarted: boolean;
    isEnded: boolean;
    isComingSoon: boolean;    
}

export function ProgramActiveStatus({ isComingSoon, isEnded, isStarted }: Props) {    
    const label = isStarted
        ? 'Open'
        : (isComingSoon
            ? 'Coming soon'
            : (isEnded
                ? 'Ended'
                : 'Unknown'));

    const dotComponent = isStarted
        ? <span className='h-2 w-2 bg-EmeraldGreen inline-block rounded-full'></span>
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