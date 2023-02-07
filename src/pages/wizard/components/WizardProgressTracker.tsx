import { useLocation, useNavigate } from 'react-router-dom';


export function WizardProgressTracker() {
    const location = useLocation();
    const navigate = useNavigate();

    const trackingList = [
        {
            label: 'Choose',
            path: '/mint/wallet-selection'            
        },
        {
            label: 'Connect',
            path: '/mint/connect'
        },
        {
            label: 'Fund',
            path: '/mint/funding'
        },
        {
            label: 'Mint',
            path: '/mint',
            query: '?showProgress=true'
        }
    ];

    const activeIndex = trackingList.findIndex(x => x.path === location.pathname);

    function TrackerPoint({ isActive, label, path, query, isFirst = false}: {isActive: boolean, label: string, path: string, isFirst?: boolean, query?: string }) {
        function onClick() {
            if(isActive) {                
                navigate({
                    pathname: path,
                    search: query
                });
            }
        }

        return (
            <div className='relative flex flex-col items-center z-10 w-[85px]' onClick={onClick}>
                <div className={`rounded-full border-2 bg-Coral h-[26px] w-[26px] flex justify-center items-center z-10 ${isActive ? 'border-Tuscanyapprox cursor-pointer' : 'border-[#DF813C]'}`}>
                <div className={`rounded-full h-[18px] w-[18px] ${isActive ? 'bg-Tuscanyapprox' : ''}`}/>
                </div>                
                {!isFirst && <div className={`absolute border-[2px] border-b-0 border-x-0 border-Tuscanyapprox w-[93px] -bottom-[12px] h-full right-8 ${isActive ? 'border-Tuscanyapprox' : 'border-[#DF813C]'}`} />}
                <div className={`text-white z-10 text-xs ${isActive && 'cursor-pointer'}`}>{label}</div>
            </div>
        )
    }

    return (
        <div className='flex justify-between'>
            {trackingList.map((data,index) => <TrackerPoint key={index} isActive={activeIndex >= index} label={data.label} path={data.path} query={data.query} isFirst={index===0}></TrackerPoint>)}
        </div>
    )
}